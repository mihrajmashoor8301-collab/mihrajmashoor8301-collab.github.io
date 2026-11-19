/**
 * Endlessus Academy - Cloud Sync, Progress Persistence & Data Migration Engine
 * 
 * Synchronizes room, lab, and question progress between localStorage (offline-first)
 * and the dedicated Supabase backend. Handles cross-device resumption, safe
 * non-destructive local-to-cloud migration, and activity history aggregation.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./academy-auth'),
      require('./academy-state')
    );
  } else {
    root.AcademySync = factory(root.AcademyAuth, root.AcademyState);
  }
})(typeof self !== 'undefined' ? self : this, function (AcademyAuth, AcademyState) {
  'use strict';

  const CURRICULUM_ID = 'calion-academy-47-v1';
  let syncQueue = [];
  let isSyncing = false;

  // Initialize listeners when auth changes
  if (typeof window !== 'undefined' && AcademyAuth) {
    window.addEventListener('endlessus-auth-changed', async (e) => {
      if (e.detail && e.detail.isAuthenticated && e.detail.user) {
        // User just logged in: sync server progress down to local state
        await pullServerProgress(e.detail.user.id);
      }
    });

    // Also listen to local progress updates and push to server if authenticated
    window.addEventListener('endlessus-progress-updated', (e) => {
      const detail = e.detail;
      if (!detail) return;

      if (detail.type === 'room-completed' || detail.type === 'question-solved') {
        const roomId = detail.roomId;
        if (roomId) {
          pushRoomProgress(roomId);
        }
      }
    });
  }

  // Pull server progress down to local storage to enable cross-device continuity
  async function pullServerProgress(userId) {
    const sb = AcademyAuth.getClient();
    if (!sb || !userId) return;

    try {
      const snapshotKey = `calion_unverified_local_progress_${userId}`;
      if (!localStorage.getItem(snapshotKey)) {
        localStorage.setItem(snapshotKey, JSON.stringify({
          completedRooms: AcademyState.getCompletedRooms(),
          roomProgress: AcademyState.getRoomProgressMap(),
          questionProgress: AcademyState.getQuestionProgress(),
          completedLabs: AcademyState.getCompletedLabs()
        }));
      }

      const { data: xpState, error: xpStateError } = await sb.rpc('get_calion_xp_state');
      if (xpStateError || !xpState || !xpState.success) {
        throw xpStateError || new Error('Authoritative XP state is unavailable');
      }
      // 1. Fetch room progress
      const { data: roomRows } = await sb
        .from('room_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('curriculum_id', CURRICULUM_ID);

      const completedRoomSet = new Set(Array.isArray(xpState.rooms_completed) ? xpState.rooms_completed : []);
      const currentRoomProgress = {};
      (Array.isArray(roomRows) ? roomRows : []).forEach(r => {
        if (r.status !== 'completed' && Number(r.progress_pct) > 0) currentRoomProgress[r.room_id] = Math.min(99, Number(r.progress_pct));
      });
      completedRoomSet.forEach(id => { currentRoomProgress[id] = 100; });

      const verifiedQuestionSet = new Set((Array.isArray(xpState.questions_solved) ? xpState.questions_solved : [])
        .map(q => `${q.room_id}:${q.question_id}`));
      const currentQuestions = {};
      const curriculumRooms = (typeof window !== 'undefined' && window.CALION_ROOMS) || [];
      curriculumRooms.forEach(room => (room.questions || []).forEach((question, index) => {
        if (verifiedQuestionSet.has(`${room.id}:${question.id}`)) currentQuestions[`${room.id}_q${index}`] = true;
      }));
      AcademyState.safeSet(AcademyState.KEYS.ROOMS, Array.from(completedRoomSet));
      AcademyState.safeSet(AcademyState.KEYS.ROOM_PROG, currentRoomProgress);
      AcademyState.safeSet(AcademyState.KEYS.QUESTIONS, currentQuestions);

      // 2. Fetch lab progress
      const { data: labRows } = await sb
        .from('lab_progress')
        .select('*')
        .eq('user_id', userId);

      const verifiedLabs = Array.isArray(xpState.labs_completed) ? xpState.labs_completed :
        (Array.isArray(labRows) ? labRows.filter(l => l.status === 'completed' || l.flag_verified).map(l => l.lab_id) : []);
      AcademyState.safeSet(AcademyState.KEYS.LABS, verifiedLabs);

      // Recompute local XP
      // Authenticated XP display reads profiles.total_xp; local estimates remain guest-only.
      if (Number.isFinite(Number(xpState.total_xp))) {
        AcademyState.safeSet(AcademyState.KEYS.XP, Number(xpState.total_xp));
      }
      AcademyState.calculateTotalXP();

      // Notify UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('endlessus-progress-updated', {
          detail: { type: 'cloud-synced', userId }
        }));
        window.dispatchEvent(new CustomEvent('calion-progress-updated', {
          detail: { type: 'cloud-synced', userId }
        }));
      }
    } catch (e) {
      console.warn('[AcademySync] Error pulling server progress:', e);
    }
  }

  // Push single room progress to Supabase
  async function pushRoomProgress(roomId) {
    if (!AcademyAuth || !AcademyAuth.isAuthenticated()) return;
    const user = AcademyAuth.getUser();
    const sb = AcademyAuth.getClient();
    if (!user || !sb || !roomId) return;

    try {
      const roomProg = AcademyState.getRoomProgressMap();
      const pct = Math.min(99, Math.max(0, Number(roomProg[roomId]) || 0));
      const { data: existing } = await sb.from('room_progress')
        .select('status')
        .eq('user_id', user.id)
        .eq('room_id', roomId)
        .eq('curriculum_id', CURRICULUM_ID)
        .maybeSingle();

      // Only submit_calion_answer may create a verified completion or question evidence.
      // Never mirror local question keys/completion into trusted server progress.
      if (existing && existing.status === 'completed') return;

      const payload = {
        user_id: user.id,
        room_id: roomId,
        curriculum_id: CURRICULUM_ID,
        status: 'in_progress',
        progress_pct: pct,
        questions_solved: [],
        last_accessed_at: new Date().toISOString()
      };

      const { error } = await sb.from('room_progress').upsert(payload, { onConflict: 'user_id,room_id,curriculum_id' });
      if (error) throw error;
    } catch (e) {
      console.warn('[AcademySync] Error pushing room progress:', e);
    }
  }

  // Push practical lab progress to Supabase
  async function pushLabProgress(labId, completedTasks, flagVerified, submittedFlag) {
    if (!AcademyAuth || !AcademyAuth.isAuthenticated()) return;
    const user = AcademyAuth.getUser();
    const sb = AcademyAuth.getClient();
    if (!user || !sb || !labId) return;

    try {
      const isDone = Boolean(flagVerified);
      if (flagVerified && submittedFlag) {
        // Use server-side RPC to verify flag and record completion securely
        try {
          const { data: rpcRes, error } = await sb.rpc('verify_lab_flag', { p_lab_id: labId, p_submitted_flag: submittedFlag });
          if (error || !rpcRes || !rpcRes.success) {
            console.warn('[AcademySync] Lab flag verification failed via RPC:', error ? error.message : (rpcRes ? rpcRes.message : 'No response'));
          } else {
            if (Number.isFinite(Number(rpcRes.total_xp))) {
              AcademyState.safeSet(AcademyState.KEYS.XP, Number(rpcRes.total_xp));
              const profile = AcademyAuth.getProfile && AcademyAuth.getProfile();
              if (profile) profile.total_xp = Number(rpcRes.total_xp);
            }
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('calion-progress-updated', {
                detail: { type: 'verified-lab-completed', userId: user.id, labId, xpAwarded: Number(rpcRes.xp_awarded) || 0 }
              }));
            }
          }
        } catch (e) {
          console.warn('[AcademySync] RPC error during lab flag verification:', e);
        }
        // No direct upsert needed; the RPC handles insertion/updating of lab_progress
        return;
      }

      // In-progress task updates only (client cannot directly set flag_verified = true or status = 'completed')
      const payload = {
        user_id: user.id,
        lab_id: labId,
        status: 'in_progress',
        completed_tasks: Array.from(completedTasks || []),
        flag_verified: false,
        last_accessed_at: new Date().toISOString()
      };

      await sb.from('lab_progress').upsert(payload, { onConflict: 'user_id,lab_id' });
    } catch (e) {
      console.warn('[AcademySync] Error pushing lab progress:', e);
    }
  }

  // Check if unmigrated local progress exists
  function checkUnmigratedProgress(userId) {
    if (!userId) return false;
    const migrationKey = `calion_migrated_${userId}`;
    const legacyKey = `endlessus_migrated_${userId}`;
    if (localStorage.getItem(migrationKey) === 'true' || localStorage.getItem(legacyKey) === 'true') return false;

    const completedRooms = AcademyState.getCompletedRooms();
    const completedLabs = AcademyState.getCompletedLabs();
    const questions = AcademyState.getQuestionProgress();
    const hasQuestions = Object.keys(questions).some(k => questions[k] === true);
    let preservedSnapshot = null;
    try { preservedSnapshot = JSON.parse(localStorage.getItem(`calion_unverified_local_progress_${userId}`) || 'null'); } catch (_) {}

    return completedRooms.length > 0 || completedLabs.length > 0 || hasQuestions ||
      Boolean(preservedSnapshot && ((preservedSnapshot.completedRooms || []).length || Object.keys(preservedSnapshot.questionProgress || {}).length || (preservedSnapshot.completedLabs || []).length));
  }

  // Migrate local progress to cloud with consent (sanitized and validated)
  async function migrateLocalProgress(userId) {
    const sb = AcademyAuth.getClient();
    if (!sb || !userId) return { success: false, error: 'Not authenticated' };

    const migrationKey = `calion_migrated_${userId}`;
    const legacyKey = `endlessus_migrated_${userId}`;
    if (localStorage.getItem(migrationKey) === 'true' || localStorage.getItem(legacyKey) === 'true') {
      return { success: true, alreadyMigrated: true };
    }

    try {
      const validRoomRegex = /^room-[0-9]{2,}$/;
      const validPsRoomRegex = /^ps-room-[0-9]{2,}$/;
      const validLabRegex = /^lab-[a-z0-9_-]+$/;

      let localSnapshot = null;
      try { localSnapshot = JSON.parse(localStorage.getItem(`calion_unverified_local_progress_${userId}`) || 'null'); } catch (_) {}
      const completedRooms = Array.from(new Set([
        ...(AcademyState.getCompletedRooms() || []),
        ...((localSnapshot && localSnapshot.completedRooms) || [])
      ])).filter(
        id => typeof id === 'string' && (validRoomRegex.test(id) || validPsRoomRegex.test(id))
      );
      const roomProg = {
        ...((localSnapshot && localSnapshot.roomProgress) || {}),
        ...(AcademyState.getRoomProgressMap() || {})
      };
      const progressByCanonicalRoom = {};
      Object.entries(roomProg).forEach(([roomId, percentage]) => {
        const canonicalId = AcademyState.normalizeRoomId(roomId);
        progressByCanonicalRoom[canonicalId] = Math.max(progressByCanonicalRoom[canonicalId] || 0, Number(percentage) || 0);
      });
      const completedLabs = Array.from(new Set([
        ...(AcademyState.getCompletedLabs() || []),
        ...((localSnapshot && localSnapshot.completedLabs) || [])
      ])).filter(
        id => typeof id === 'string' && validLabRegex.test(id)
      );

      // Fetch existing server records for this user to guarantee we never regress state
      let serverRoomMap = {};
      try {
        const { data: serverRooms } = await sb.from('room_progress').select('room_id, status, progress_pct, completed_at').eq('user_id', userId).eq('curriculum_id', CURRICULUM_ID);
        if (Array.isArray(serverRooms)) {
          serverRooms.forEach(r => { serverRoomMap[r.room_id] = r; });
        }
      } catch (err) {
        console.warn('[CALION AcademySync] Pre-migration check warning:', err.message);
      }

      // Import local records as unverified progress only. Local solved flags and
      // completion markers are user-editable; only submit_calion_answer certifies them.
      const candidateRoomIds = new Set([...completedRooms, ...Object.keys(roomProg)]
        .map(id => AcademyState.normalizeRoomId(id))
        .filter(id => /^room-(0[1-9]|[1-3][0-9]|4[0-7])$/.test(id)));
      const inProgressRoomIds = Array.from(candidateRoomIds).filter(id => {
        if (Number(roomProg[id] || 0) <= 0 && !completedRooms.includes(id)) return false;
        const existing = serverRoomMap[id];
        if (existing && existing.status === 'completed') return false;
        const localPct = completedRooms.includes(id) ? 99 : Math.min(99, Math.max(1, progressByCanonicalRoom[id] || 1));
        if (existing && existing.progress_pct >= localPct) {
          return false;
        }
        return true;
      });

      if (inProgressRoomIds.length > 0) {
        const ipUpserts = inProgressRoomIds.map(roomId => {
          const rawPct = progressByCanonicalRoom[roomId] || 0;
          const safePct = completedRooms.includes(roomId) ? 99 : Math.min(99, Math.max(1, parseInt(rawPct, 10) || 0));
          return {
            user_id: userId,
            room_id: roomId,
            curriculum_id: CURRICULUM_ID,
            status: 'in_progress',
            progress_pct: safePct,
            questions_solved: [],
            last_accessed_at: new Date().toISOString()
          };
        });
        const { error } = await sb.from('room_progress').upsert(ipUpserts, { onConflict: 'user_id,room_id,curriculum_id' });
        if (error) throw error;
      }

      // Never replay a locally completed lab into the server XP verifier. Its age
      // cannot be established safely; a live flag submission can still earn XP.

      // Mark migration complete for this user
      localStorage.setItem(migrationKey, 'true');
      localStorage.setItem(legacyKey, 'true');

      // Refresh server state down
      await pullServerProgress(userId);

      return {
        success: true,
        migratedRooms: inProgressRoomIds.length,
        retainedLocalLabs: completedLabs.length,
        migratedLabs: 0
      };
    } catch (e) {
      console.warn('[CALION AcademySync] Migration error:', e);
      return { success: false, error: e.message };
    }
  }

  // Fetch full user statistics for profile page
  async function fetchUserStats(userId) {
    const sb = AcademyAuth.getClient();
    if (!sb || !userId) {
      // Local fallback calculation when offline or unconfigured
      const rooms = AcademyState.getCompletedRooms();
      const labs = AcademyState.getCompletedLabs();
      const curriculum = (typeof window !== 'undefined' && window.CALION_ROOMS) || [];
      const stages = (typeof window !== 'undefined' && window.CALION_STAGES) || [];
      const completedPaths = stages.filter(stage => { const p = AcademyState.getStageProgress(stage.id, curriculum); return p.total > 0 && p.completed === p.total; }).length;
      const preSecurity = AcademyState.getStageProgress('pre-security', curriculum);
      const xp = AcademyState.calculateTotalXP();
      const streak = AcademyState.getStreak();

      return {
        totalRoomsCompleted: rooms.length,
        totalAvailableRooms: curriculum.length || 47,
        totalLabsCompleted: labs.length,
        totalAvailableLabs: 13,
        totalXP: xp,
        streakDays: streak,
        completedPaths,
        achievementsCount: rooms.length >= 1 ? (rooms.length >= 5 ? 2 : 1) : 0,
        preSecurityProgress: { total: preSecurity.total, completed: preSecurity.completed, percentage: preSecurity.percentage }
      };
    }

    try {
      // 1. Room stats
      const { data: roomRows } = await sb
        .from('room_progress')
        .select('room_id, status, progress_pct, completed_at')
        .eq('user_id', userId)
        .eq('curriculum_id', CURRICULUM_ID);

      const signedInUser = AcademyAuth && AcademyAuth.getUser ? AcademyAuth.getUser() : null;
      const isOwnProfile = Boolean(signedInUser && signedInUser.id === userId);
      let xpState = null;
      if (isOwnProfile) {
        const { data, error } = await sb.rpc('get_calion_xp_state');
        if (error || !data || !data.success) return null;
        xpState = data;
      }
      const curriculum = (typeof window !== 'undefined' && window.CALION_ROOMS) || [];
      const stages = (typeof window !== 'undefined' && window.CALION_STAGES) || [];
      const canonicalRoomIds = new Set(curriculum.map(r => r.id));
      const completedRoomIds = new Set((isOwnProfile
        ? (Array.isArray(xpState.rooms_completed) ? xpState.rooms_completed : [])
        : (roomRows || []).filter(r => r.status === 'completed').map(r => r.room_id))
        .map(id => AcademyState.normalizeRoomId(id)).filter(id => canonicalRoomIds.has(id)));
      const completedPaths = stages.filter(stage => { const pathRooms = curriculum.filter(r => r.stageId === stage.id); return pathRooms.length > 0 && pathRooms.every(r => completedRoomIds.has(r.id)); }).length;
      const preSecurityRooms = curriculum.filter(r => r.stageId === 'pre-security');
      const preSecurityCompleted = preSecurityRooms.filter(r => completedRoomIds.has(r.id)).length;

      // 2. Lab stats
      const { data: labRows } = await sb
        .from('lab_progress')
        .select('lab_id, status, flag_verified, completed_at')
        .eq('user_id', userId);

      const completedLabs = (labRows || []).filter(l => l.status === 'completed' || l.flag_verified);

      // 3. User achievements count
      const { data: achRows } = await sb
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', userId);

      // 4. Profile XP and streak
      const { data: profile } = await sb
        .from('profiles')
        .select('total_xp, streak_days')
        .eq('id', userId)
        .maybeSingle();

      // Authenticated XP is always the server profile value. Local calculations are
      // provisional guest display only and must never be used as an account fallback.
      const xp = profile ? profile.total_xp : (xpState && Number.isFinite(Number(xpState.total_xp)) ? Number(xpState.total_xp) : null);
      const streak = profile ? profile.streak_days : AcademyState.getStreak();
      const verifiedRoomRows = (roomRows || []).map(r => {
        if (r.status === 'completed' && !completedRoomIds.has(AcademyState.normalizeRoomId(r.room_id))) {
          return { ...r, status: 'in_progress', progress_pct: Math.min(99, Number(r.progress_pct) || 99), questions_solved: [] };
        }
        return r;
      });

      return {
        totalRoomsCompleted: completedRoomIds.size,
        totalAvailableRooms: curriculum.length || 47,
        totalLabsCompleted: completedLabs.length,
        totalAvailableLabs: 13,
        totalXP: xp,
        streakDays: streak,
        completedPaths,
        achievementsCount: (achRows || []).length,
        preSecurityProgress: {
          total: preSecurityRooms.length,
          completed: preSecurityCompleted,
          percentage: preSecurityRooms.length ? Math.round((preSecurityCompleted / preSecurityRooms.length) * 100) : 0
        },
        rawRoomRows: verifiedRoomRows,
        rawLabRows: labRows || []
      };
    } catch (e) {
      console.warn('[AcademySync] Error fetching user stats:', e);
      return null;
    }
  }

  // Fetch all achievements with user unlock status
  async function fetchAchievementsWithStatus(userId) {
    const sb = AcademyAuth.getClient();
    const defaultAchievements = [
      { id: 'first-steps', title: 'First Steps', description: 'Complete your very first learning room.', icon: 'flag', required_count: 1, xp_bonus: 50, category: 'room' },
      { id: 'explorer', title: 'Explorer', description: 'Complete 5 learning rooms in the curriculum.', icon: 'explore', required_count: 5, xp_bonus: 100, category: 'room' },
      { id: 'dedicated-learner', title: 'Dedicated Learner', description: 'Complete 10 learning rooms.', icon: 'menu_book', required_count: 10, xp_bonus: 150, category: 'room' },
      { id: 'security-enthusiast', title: 'Security Enthusiast', description: 'Complete 25 learning rooms across the academy.', icon: 'military_tech', required_count: 25, xp_bonus: 250, category: 'room' },
      { id: 'lab-practitioner', title: 'Lab Practitioner', description: 'Successfully solve and verify your first practical terminal lab.', icon: 'terminal', required_count: 1, xp_bonus: 100, category: 'lab' },
      { id: 'lab-specialist', title: 'Lab Specialist', description: 'Complete 5 practical security labs.', icon: 'memory', required_count: 5, xp_bonus: 200, category: 'lab' },
      { id: 'lab-master', title: 'Master of the Sandbox', description: 'Conquer all 13 practical security labs.', icon: 'bolt', required_count: 13, xp_bonus: 500, category: 'lab' },
      { id: 'pre-security-graduate', title: 'Pre Security Graduate', description: 'Achieve 100% completion across all 10 Pre-Security rooms.', icon: 'verified', required_count: 10, xp_bonus: 500, category: 'path' },
      { id: 'streak-week', title: 'Consistent Operator', description: 'Maintain a 7-day daily learning streak.', icon: 'local_fire_department', required_count: 7, xp_bonus: 150, category: 'streak' }
    ];

    if (!sb || !userId) {
      // Local evaluation
      const rooms = AcademyState.getCompletedRooms().length;
      const labs = AcademyState.getCompletedLabs().length;
      const streak = AcademyState.getStreak();

      return defaultAchievements.map(a => {
        let isUnlocked = false;
        if (a.id === 'first-steps') isUnlocked = rooms >= 1;
        if (a.id === 'explorer') isUnlocked = rooms >= 5;
        if (a.id === 'dedicated-learner') isUnlocked = rooms >= 10;
        if (a.id === 'security-enthusiast') isUnlocked = rooms >= 25;
        if (a.id === 'pre-security-graduate') { const p = AcademyState.getStageProgress('pre-security'); isUnlocked = p.total > 0 && p.completed === p.total; }
        if (a.id === 'lab-practitioner') isUnlocked = labs >= 1;
        if (a.id === 'lab-specialist') isUnlocked = labs >= 5;
        if (a.id === 'lab-master') isUnlocked = labs >= 13;
        if (a.id === 'streak-week') isUnlocked = streak >= 7;

        return { ...a, unlocked: isUnlocked, unlocked_at: isUnlocked ? new Date().toISOString() : null };
      });
    }

    try {
      const { data: allDefs } = await sb.from('achievements').select('*');
      const defs = (allDefs && allDefs.length > 0) ? allDefs : defaultAchievements;

      const { data: userUnlocked } = await sb
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', userId);

      const unlockMap = {};
      (userUnlocked || []).forEach(u => {
        unlockMap[u.achievement_id] = u.unlocked_at;
      });

      return defs.map(d => ({
        ...d,
        unlocked: Boolean(unlockMap[d.id]),
        unlocked_at: unlockMap[d.id] || null
      }));
    } catch (e) {
      return defaultAchievements.map(a => ({ ...a, unlocked: false, unlocked_at: null }));
    }
  }

  // Fetch learning activity history for GitHub-style calendar
  async function fetchActivityHistory(userId) {
    const sb = AcademyAuth.getClient();
    if (!sb || !userId) {
      // Fallback: build an activity entry for today if local activity exists
      const rooms = AcademyState.getCompletedRooms();
      const today = new Date().toISOString().split('T')[0];
      const activityMap = {};
      if (rooms.length > 0) {
        activityMap[today] = rooms.length;
      }
      return { activityMap, timeline: [] };
    }

    try {
      const { data: rows } = await sb
        .from('user_activity')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(200);

      const activityMap = {}; // date -> count
      const timeline = rows || [];

      (rows || []).forEach(r => {
        const d = r.activity_date || r.created_at.split('T')[0];
        activityMap[d] = (activityMap[d] || 0) + 1;
      });

      return { activityMap, timeline };
    } catch (e) {
      return { activityMap: {}, timeline: [] };
    }
  }

  return {
    pullServerProgress,
    pushRoomProgress,
    pushLabProgress,
    checkUnmigratedProgress,
    migrateLocalProgress,
    fetchUserStats,
    fetchAchievementsWithStatus,
    fetchActivityHistory
  };
});
