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
      // 1. Fetch room progress
      const { data: roomRows } = await sb
        .from('room_progress')
        .select('*')
        .eq('user_id', userId);

      if (Array.isArray(roomRows) && roomRows.length > 0) {
        const localRooms = new Set(AcademyState.getCompletedRooms());
        const localProg = AcademyState.getRoomProgressMap();
        const localQuestions = AcademyState.getQuestionProgress();

        roomRows.forEach(r => {
          if (r.status === 'completed') {
            localRooms.add(r.room_id);
            localProg[r.room_id] = 100;
          } else if (r.progress_pct > (localProg[r.room_id] || 0)) {
            localProg[r.room_id] = r.progress_pct;
          }

          if (Array.isArray(r.questions_solved)) {
            r.questions_solved.forEach(qKey => {
              localQuestions[qKey] = true;
            });
          }
        });

        AcademyState.safeSet(AcademyState.KEYS.ROOMS, Array.from(localRooms));
        AcademyState.safeSet(AcademyState.KEYS.ROOM_PROG, localProg);
        AcademyState.safeSet(AcademyState.KEYS.QUESTIONS, localQuestions);
      }

      // 2. Fetch lab progress
      const { data: labRows } = await sb
        .from('lab_progress')
        .select('*')
        .eq('user_id', userId);

      if (Array.isArray(labRows) && labRows.length > 0) {
        const localLabs = new Set(AcademyState.getCompletedLabs());
        labRows.forEach(l => {
          if (l.status === 'completed' || l.flag_verified) {
            localLabs.add(l.lab_id);
          }
        });
        AcademyState.safeSet(AcademyState.KEYS.LABS, Array.from(localLabs));
      }

      // Recompute local XP
      AcademyState.calculateTotalXP();

      // Notify UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('endlessus-progress-updated', {
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
      const isCompleted = AcademyState.isRoomCompleted(roomId);
      const roomProg = AcademyState.getRoomProgressMap();
      const pct = isCompleted ? 100 : (roomProg[roomId] || 0);
      const allQuestions = AcademyState.getQuestionProgress();

      // Collect questions solved for this room
      const questionsSolved = Object.keys(allQuestions).filter(
        k => k.startsWith(`${roomId}_`) && allQuestions[k] === true
      );

      const payload = {
        user_id: user.id,
        room_id: roomId,
        status: isCompleted ? 'completed' : (pct > 0 ? 'in_progress' : 'not_started'),
        progress_pct: pct,
        questions_solved: questionsSolved,
        completed_at: isCompleted ? new Date().toISOString() : null,
        last_accessed_at: new Date().toISOString()
      };

      await sb.from('room_progress').upsert(payload, { onConflict: 'user_id,room_id' });
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

    return completedRooms.length > 0 || completedLabs.length > 0 || hasQuestions;
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

      const completedRooms = (AcademyState.getCompletedRooms() || []).filter(
        id => typeof id === 'string' && (validRoomRegex.test(id) || validPsRoomRegex.test(id))
      );
      const roomProg = AcademyState.getRoomProgressMap() || {};
      const questionMap = AcademyState.getQuestionProgress() || {};
      const completedLabs = (AcademyState.getCompletedLabs() || []).filter(
        id => typeof id === 'string' && validLabRegex.test(id)
      );

      // Fetch existing server records for this user to guarantee we never regress state
      let serverRoomMap = {};
      let serverLabMap = {};
      try {
        const { data: serverRooms } = await sb.from('room_progress').select('room_id, status, progress_pct, completed_at').eq('user_id', userId);
        if (Array.isArray(serverRooms)) {
          serverRooms.forEach(r => { serverRoomMap[r.room_id] = r; });
        }
        const { data: serverLabs } = await sb.from('lab_progress').select('lab_id, status, flag_verified, completed_at').eq('user_id', userId);
        if (Array.isArray(serverLabs)) {
          serverLabs.forEach(l => { serverLabMap[l.lab_id] = l; });
        }
      } catch (err) {
        console.warn('[CALION AcademySync] Pre-migration check warning:', err.message);
      }

      // 1. Batch upsert rooms
      if (completedRooms.length > 0) {
        const roomUpserts = completedRooms.map(roomId => {
          const questionsSolved = Object.keys(questionMap).filter(
            k => k.startsWith(`${roomId}_`) && questionMap[k] === true
          );
          const existing = serverRoomMap[roomId];
          return {
            user_id: userId,
            room_id: roomId,
            status: 'completed',
            progress_pct: 100,
            questions_solved: questionsSolved,
            completed_at: (existing && existing.completed_at) || new Date().toISOString(),
            last_accessed_at: new Date().toISOString()
          };
        });

        await sb.from('room_progress').upsert(roomUpserts, { onConflict: 'user_id,room_id' });
      }

      // Also upsert in-progress rooms (NEVER overwrite completed rooms or higher server progress)
      const inProgressRoomIds = Object.keys(roomProg).filter(id => {
        if ((!validRoomRegex.test(id) && !validPsRoomRegex.test(id)) || completedRooms.includes(id) || roomProg[id] <= 0) return false;
        const existing = serverRoomMap[id];
        // If server already marked completed or has higher percentage, do not regress
        if (existing && (existing.status === 'completed' || existing.progress_pct >= roomProg[id])) {
          return false;
        }
        return true;
      });

      if (inProgressRoomIds.length > 0) {
        const ipUpserts = inProgressRoomIds.map(roomId => {
          const questionsSolved = Object.keys(questionMap).filter(
            k => k.startsWith(`${roomId}_`) && questionMap[k] === true
          );
          const safePct = Math.min(99, Math.max(1, parseInt(roomProg[roomId], 10) || 0));
          return {
            user_id: userId,
            room_id: roomId,
            status: 'in_progress',
            progress_pct: safePct,
            questions_solved: questionsSolved,
            last_accessed_at: new Date().toISOString()
          };
        });
        await sb.from('room_progress').upsert(ipUpserts, { onConflict: 'user_id,room_id' });
      }

      // 2. Batch verify labs (NEVER downgrade existing verified labs, and always verify cryptographically on server)
      if (completedLabs.length > 0) {
        for (const labId of completedLabs) {
          const existing = serverLabMap[labId];
          // If already verified on the server, skip re-verification
          if (existing && existing.status === 'completed' && existing.flag_verified) {
            continue;
          }
          const storedFlag = (typeof AcademyState !== 'undefined' && typeof AcademyState.getLabFlag === 'function')
            ? AcademyState.getLabFlag(labId)
            : null;
          if (storedFlag) {
            try {
              await sb.rpc('verify_lab_flag', { p_lab_id: labId, p_submitted_flag: storedFlag });
            } catch (rpcErr) {
              console.warn('[CALION AcademySync] Lab migration verify warning for', labId, rpcErr.message);
            }
          }
        }
      }

      // Mark migration complete for this user
      localStorage.setItem(migrationKey, 'true');
      localStorage.setItem(legacyKey, 'true');

      // Refresh server state down
      await pullServerProgress(userId);

      return {
        success: true,
        migratedRooms: completedRooms.length,
        migratedLabs: completedLabs.length
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
      const xp = AcademyState.calculateTotalXP();
      const streak = AcademyState.getStreak();

      return {
        totalRoomsCompleted: rooms.length,
        totalAvailableRooms: 45,
        totalLabsCompleted: labs.length,
        totalAvailableLabs: 13,
        totalXP: xp,
        streakDays: streak,
        completedPaths: rooms.length >= 45 ? 1 : 0,
        achievementsCount: rooms.length >= 1 ? (rooms.length >= 5 ? 2 : 1) : 0,
        preSecurityProgress: {
          total: 45,
          completed: rooms.length,
          percentage: Math.round((rooms.length / 45) * 100)
        }
      };
    }

    try {
      // 1. Room stats
      const { data: roomRows } = await sb
        .from('room_progress')
        .select('room_id, status, progress_pct, completed_at')
        .eq('user_id', userId);

      const completedRooms = (roomRows || []).filter(r => r.status === 'completed');

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

      const xp = profile ? profile.total_xp : (completedRooms.length * 50 + completedLabs.length * 75);
      const streak = profile ? profile.streak_days : AcademyState.getStreak();

      return {
        totalRoomsCompleted: completedRooms.length,
        totalAvailableRooms: 45,
        totalLabsCompleted: completedLabs.length,
        totalAvailableLabs: 13,
        totalXP: xp,
        streakDays: streak,
        completedPaths: completedRooms.length >= 45 ? 1 : 0,
        achievementsCount: (achRows || []).length,
        preSecurityProgress: {
          total: 45,
          completed: completedRooms.length,
          percentage: Math.round((completedRooms.length / 45) * 100)
        },
        rawRoomRows: roomRows || [],
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
      { id: 'pre-security-graduate', title: 'Pre Security Graduate', description: 'Achieve 100% completion across all 45 rooms in Pre Security.', icon: 'verified', required_count: 45, xp_bonus: 500, category: 'path' },
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
        if (a.id === 'pre-security-graduate') isUnlocked = rooms >= 45;
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
