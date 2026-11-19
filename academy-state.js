/**
 * Endlessus Academy - Unified State & Curriculum Progress Engine
 * 
 * Manages localStorage persistence, XP tracking, question validation,
 * and cross-page synchronization for all Academy pages.
 * 
 * Storage Keys:
 * - endlessus_completed_rooms: string[] (e.g. ["room-01", "room-02"])
 * - endlessus_room_progress: Record<string, number|object> (e.g. {"room-01": 100})
 * - endlessus_question_progress: Record<string, boolean> (e.g. {"room-01_q0": true})
 * - endlessus_completed_labs: string[] (e.g. ["lab-headers"])
 * - endlessus_user_xp: number
 * - endlessus_streak_days: number
 * - endlessus_last_active: string (ISO date)
 * - endlessus_last_room: string (e.g. "room-01")
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AcademyState = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const KEYS = {
    // Keep legacy 45-room progress intact, but never count it as completion of
    // the re-indexed 47-room curriculum.
    ROOMS: 'calion_47_completed_rooms',
    ROOM_PROG: 'calion_47_room_progress',
    QUESTIONS: 'calion_47_question_progress',
    LABS: 'calion_completed_labs',
    XP: 'calion_user_xp',
    STREAK: 'calion_streak_days',
    LAST_ACTIVE: 'calion_last_active',
    LAST_ROOM: 'calion_last_room',
    THEME: 'calion_learning_theme',
    TASKS: 'calion_47_task_progress',
    LAB_FLAGS: 'calion_lab_flags',
    LAST_POS: 'calion_47_last_position'
  };

  const LEGACY_KEYS = {
    ROOMS: 'endlessus_completed_rooms',
    ROOM_PROG: 'endlessus_room_progress',
    QUESTIONS: 'endlessus_question_progress',
    LABS: 'endlessus_completed_labs',
    XP: 'endlessus_user_xp',
    STREAK: 'endlessus_streak_days',
    LAST_ACTIVE: 'endlessus_last_active',
    LAST_ROOM: 'endlessus_last_room',
    THEME: 'endlessus_learning_theme',
    LAST_POS: 'endlessus_last_position',
    TASKS: 'endlessus_task_progress',
    LAB_FLAGS: 'endlessus_lab_flags'
  };

  function safeGet(key, defaultVal) {
    try {
      if (typeof localStorage === 'undefined') return defaultVal;
      let raw = localStorage.getItem(key);
      if (raw === null || raw === undefined || raw === '') {
        const legacyKey = key.replace('calion_', 'endlessus_');
        if (legacyKey !== key) {
          raw = localStorage.getItem(legacyKey);
        }
      }
      if (raw === null || raw === undefined || raw === '') return defaultVal;
      const parsed = JSON.parse(raw);
      return parsed !== null && parsed !== undefined ? parsed : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  function safeSet(key, val) {
    try {
      if (typeof localStorage === 'undefined') return;
      const json = JSON.stringify(val);
      localStorage.setItem(key, json);
      const legacyKey = key.replace('calion_', 'endlessus_');
      // Lab completions and XP are curriculum/history scoped. Keep their old
      // unversioned values intact instead of replacing them with current state.
      if (legacyKey !== key && key !== KEYS.LABS && key !== KEYS.XP) {
        localStorage.setItem(legacyKey, json);
      }
    } catch (e) {
      console.warn(`[CALION AcademyState] Failed to persist ${key}:`, e);
    }
  }

  function normalizeRoomId(id) {
    if (typeof id !== 'string') return id;
    const clean = id.trim().toLowerCase();
    const aliases = (typeof window !== 'undefined' && window.CALION_ROOM_ID_ALIASES) || (typeof module !== 'undefined' && module.exports ? require('./learning-data.js').CALION_ROOM_ID_ALIASES : {});
    if (aliases && aliases[clean]) return aliases[clean];
    const match = clean.match(/^(?:ps-)?room-(\d{1,2})$/) || clean.match(/^(\d{1,2})$/);
    if (!match) return clean;
    const number = Number(match[1]);
    return number >= 1 && number <= 47 ? `room-${String(number).padStart(2, '0')}` : clean;
  }

  // Calculate XP idempotently: 50 per completed room + 25 per solved question + 75 per solved lab
  function calculateTotalXP() {
    const rooms = getCompletedRooms();
    const questions = getQuestionProgress();
    const labs = getCompletedLabs();

    const roomXP = rooms.length * 50;
    const normalizedQuestionKeys = new Set();
    Object.keys(questions).forEach(key => {
      if (questions[key] !== true) return;
      const match = key.match(/^((?:ps-)?room-\d{1,2})_q(\d+)$/i);
      normalizedQuestionKeys.add(match ? `${normalizeRoomId(match[1])}_q${match[2]}` : key);
    });
    const questionXP = normalizedQuestionKeys.size * 25;
    const labXP = labs.length * 75;

    const total = roomXP + questionXP + labXP;
    const historical = Number(safeGet(KEYS.XP, 0)) || 0;
    const preserved = Math.max(historical, total);
    safeSet(KEYS.XP, preserved);
    return preserved;
  }

  function getCompletedRooms() {
    const raw = safeGet(KEYS.ROOMS, []);
    return Array.isArray(raw) ? Array.from(new Set(raw.filter(id => typeof id === 'string').map(normalizeRoomId))) : [];
  }

  function getCompletedLabs() {
    const raw = safeGet(KEYS.LABS, []);
    return Array.isArray(raw) ? raw.filter(id => typeof id === 'string') : [];
  }

  function getQuestionProgress() {
    const raw = safeGet(KEYS.QUESTIONS, {});
    return (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  }

  function getRoomProgressMap() {
    const raw = safeGet(KEYS.ROOM_PROG, {});
    return (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  }

  function isRoomCompleted(roomId) {
    if (!roomId) return false;
    return getCompletedRooms().includes(normalizeRoomId(roomId));
  }

  function isQuestionSolved(questionKey) {
    if (!questionKey) return false;
    const qMap = getQuestionProgress();
    return Boolean(qMap[questionKey]);
  }

  function setLastActiveRoom(roomId) {
    if (!roomId) return;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(KEYS.LAST_ROOM, roomId);
      }
    } catch (e) {}
  }

  function getLastActiveRoom() {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(KEYS.LAST_ROOM) || null;
      }
    } catch (e) {}
    return null;
  }

  function setLastActivePosition(roomId, taskIdx, questionIdx) {
    if (!roomId) return;
    const pos = {
      roomId: String(roomId),
      taskIdx: typeof taskIdx === 'number' ? taskIdx : 0,
      questionIdx: typeof questionIdx === 'number' ? questionIdx : 0,
      updatedAt: Date.now()
    };
    safeSet(KEYS.LAST_POS, pos);
    setLastActiveRoom(roomId);
    dispatchStateChange({ type: 'position-updated', position: pos });
  }

  function getLastActivePosition(roomsList) {
    const list = roomsList || (typeof window !== 'undefined' && (window.CALION_PRE_SECURITY_ROOMS || window.CALION_ROOMS || window.ENDLESSUS_ROOMS)) || [];
    const completedRooms = getCompletedRooms();
    const isNew = completedRooms.length === 0;

    const defaultFirstId = (list[0] && list[0].id) || 'room-01';
    let stored = safeGet(KEYS.LAST_POS, null);
    let targetRoomId = normalizeRoomId((stored && stored.roomId) || getLastActiveRoom() || defaultFirstId);
    let taskIdx = (stored && typeof stored.taskIdx === 'number') ? stored.taskIdx : 0;
    let questionIdx = (stored && typeof stored.questionIdx === 'number') ? stored.questionIdx : 0;

    // Check if currently targeted room is already completed
    if (completedRooms.includes(targetRoomId)) {
      const nextRoom = getNextIncompleteRoom(list);
      if (nextRoom && nextRoom.id !== targetRoomId) {
        targetRoomId = nextRoom.id;
        taskIdx = 0;
        questionIdx = 0;
      }
    }

    const room = list.find(r => r.id === targetRoomId || (r.legacyId && normalizeRoomId(r.legacyId) === targetRoomId)) || list[0] || {
      id: 'room-01',
      title: 'Introduction to Computers',
      stageId: 'pre-security',
      stageOrder: 1,
      tasks: [{ title: 'Von Neumann Architecture & The Execution Cycle' }]
    };

    // Stage labels
    let stageName = 'Stage 1 · Pre-Security';
    if (room.stageId === 'cyber-security' || room.stageOrder === 2) {
      stageName = 'Stage 2 · Cyber Security';
    } else if (room.stageId === 'defensive-security' || room.stageOrder === 3) {
      stageName = 'Stage 3 · Defensive Security';
    } else if (room.stageId === 'offensive-security' || room.stageOrder === 4) {
      stageName = 'Stage 4 · Offensive Security';
    }

    // Task title
    let taskTitle = `Task ${taskIdx + 1}`;
    const rTasks = room.tasks || room.lessons;
    if (rTasks && rTasks[taskIdx] && rTasks[taskIdx].title) {
      taskTitle = `Task ${taskIdx + 1}: ${rTasks[taskIdx].title.replace(/^Task\s*\d+:\s*/i, '')}`;
    }

    const isAllComplete = completedRooms.length > 0 && list.length > 0 && completedRooms.length >= list.length;
    let buttonText = 'Continue Learning';
    if (isNew) {
      buttonText = 'Start Learning';
    } else if (isAllComplete) {
      buttonText = 'Curriculum Complete (100%)';
    } else {
      buttonText = `Continue: ${room.id.toUpperCase()}`;
    }

    return {
      roomId: room.id,
      room,
      stageId: room.stageId || 'pre-security',
      stageName,
      taskIdx,
      taskTitle,
      questionIdx,
      url: `room.html?id=${room.id}#task-card-${taskIdx}`,
      buttonText,
      isNewLearner: isNew,
      isCurriculumComplete: isAllComplete
    };
  }

  function markRoomCompleted(roomId) {
    if (!roomId) return false;
    roomId = normalizeRoomId(roomId);
    const rooms = getCompletedRooms();
    let newlyCompleted = false;

    if (!rooms.includes(roomId)) {
      rooms.push(roomId);
      safeSet(KEYS.ROOMS, rooms);
      newlyCompleted = true;
    }

    const roomProg = getRoomProgressMap();
    roomProg[roomId] = 100;
    safeSet(KEYS.ROOM_PROG, roomProg);

    updateStreak();
    calculateTotalXP();
    setLastActiveRoom(roomId);
    dispatchStateChange({ type: 'room-completed', roomId, newlyCompleted });

    return newlyCompleted;
  }

  function isLabCompleted(labId) {
    if (!labId) return false;
    return getCompletedLabs().includes(labId);
  }

  function markLabCompleted(labId, submittedFlag) {
    if (!labId) return false;
    const labs = getCompletedLabs();
    let newlyCompleted = false;

    if (!labs.includes(labId)) {
      labs.push(labId);
      safeSet(KEYS.LABS, labs);
      newlyCompleted = true;
    }

    if (submittedFlag && typeof submittedFlag === 'string') {
      const flagsMap = safeGet(KEYS.LAB_FLAGS, safeGet(LEGACY_KEYS.LAB_FLAGS, {}));
      flagsMap[labId] = submittedFlag.trim().toLowerCase();
      safeSet(KEYS.LAB_FLAGS, flagsMap);
    }

    updateStreak();
    calculateTotalXP();
    dispatchStateChange({ type: 'lab-completed', labId, newlyCompleted });

    if (typeof window !== 'undefined' && window.AcademySync && typeof window.AcademySync.pushLabProgress === 'function') {
      window.AcademySync.pushLabProgress(labId, [], true, submittedFlag);
    }

    return newlyCompleted;
  }

  function getLabFlag(labId) {
    if (!labId) return null;
    const flagsMap = safeGet(KEYS.LAB_FLAGS, safeGet(LEGACY_KEYS.LAB_FLAGS, {}));
    return (flagsMap && flagsMap[labId]) || null;
  }

  function markRoomIncomplete(roomId) {
    if (!roomId) return;
    roomId = normalizeRoomId(roomId);
    let rooms = getCompletedRooms().filter(id => id !== roomId);
    safeSet(KEYS.ROOMS, rooms);

    const roomProg = getRoomProgressMap();
    delete roomProg[roomId];
    safeSet(KEYS.ROOM_PROG, roomProg);

    calculateTotalXP();
    dispatchStateChange({ type: 'room-incomplete', roomId });
  }

  function solveQuestion(roomId, qIdx, questionObj) {
    if (!roomId || qIdx === undefined || qIdx === null) return { success: false, alreadySolved: false };
    roomId = normalizeRoomId(roomId);
    const qKey = `${roomId}_q${qIdx}`;
    const qMap = getQuestionProgress();

    if (qMap[qKey]) {
      return { success: true, alreadySolved: true, xp: 0 };
    }

    qMap[qKey] = true;
    safeSet(KEYS.QUESTIONS, qMap);

    // Calculate room progress percentage
    let roomCompleted = false;
    const roomMap = (typeof window !== 'undefined' && window.ENDLESSUS_ROOM_MAP) ? window.ENDLESSUS_ROOM_MAP : null;
    if (roomMap && roomMap[roomId] && Array.isArray(roomMap[roomId].questions)) {
      const totalQ = roomMap[roomId].questions.length;
      let solvedCount = 0;
      for (let i = 0; i < totalQ; i++) {
        if (qMap[`${roomId}_q${i}`]) solvedCount++;
      }
      const pct = totalQ > 0 ? Math.round((solvedCount / totalQ) * 100) : 100;
      const roomProg = getRoomProgressMap();
      roomProg[roomId] = pct;
      safeSet(KEYS.ROOM_PROG, roomProg);

      const authenticatedLearner = typeof window !== 'undefined' && window.AcademyAuth &&
        typeof window.AcademyAuth.isAuthenticated === 'function' && window.AcademyAuth.isAuthenticated();
      if (pct === 100 && !isRoomCompleted(roomId) && !authenticatedLearner) {
        markRoomCompleted(roomId);
        roomCompleted = true;
      }
    }

    updateStreak();
    calculateTotalXP();
    setLastActiveRoom(roomId);
    dispatchStateChange({ type: 'question-solved', roomId, qIdx, qKey, roomCompleted });

    return { success: true, alreadySolved: false, xp: 25, roomCompleted };
  }

  function updateStreak() {
    try {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const lastActive = safeGet(KEYS.LAST_ACTIVE, '');
      let streak = parseInt(safeGet(KEYS.STREAK, 0), 10) || 0;

      if (!lastActive) {
        streak = 1;
      } else {
        const lastDate = new Date(lastActive);
        const diffMs = now.getTime() - lastDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          streak += 1;
        } else if (diffDays > 1) {
          streak = 1;
        }
      }

      safeSet(KEYS.LAST_ACTIVE, today);
      safeSet(KEYS.STREAK, streak);
    } catch (e) {}
  }

  function getStreak() {
    return parseInt(safeGet(KEYS.STREAK, 1), 10) || 1;
  }

  function getNextIncompleteRoom(roomsList) {
    const completed = new Set(getCompletedRooms());
    const list = roomsList || (typeof window !== 'undefined' && (window.CALION_ROOMS || window.ENDLESSUS_ROOMS)) || [];
    for (let i = 0; i < list.length; i++) {
      if (!completed.has(list[i].id)) {
        return list[i];
      }
    }
    return list[0] || null;
  }

  function getLevelProgress(levelId, roomsList) {
    const list = roomsList || (typeof window !== 'undefined' && (window.CALION_ROOMS || window.ENDLESSUS_ROOMS)) || [];
    const lvlNum = parseInt(levelId, 10);
    const roomsInLevel = list.filter(r => (typeof r.level === 'number' ? r.level : (typeof r.stageOrder === 'number' ? r.stageOrder : r.stage)) === lvlNum);
    const total = roomsInLevel.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };
    const completedRooms = new Set(getCompletedRooms());
    const completed = roomsInLevel.filter(r => completedRooms.has(r.id)).length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  }

  function getStageProgress(stageIdOrOrder, roomsList) {
    const list = roomsList || (typeof window !== 'undefined' && (window.CALION_ROOMS || window.ENDLESSUS_ROOMS)) || [];
    const roomsInStage = list.filter(r => {
      if (typeof stageIdOrOrder === 'string') {
        return r.stageId === stageIdOrOrder || r.id.startsWith(stageIdOrOrder);
      }
      if (typeof stageIdOrOrder === 'number') {
        return r.stageOrder === stageIdOrOrder || r.stage === stageIdOrOrder || r.level === stageIdOrOrder;
      }
      return false;
    });

    const total = roomsInStage.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0, rooms: [] };

    const completedRooms = new Set(getCompletedRooms());
    const completed = roomsInStage.filter(r => completedRooms.has(r.id)).length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage, rooms: roomsInStage };
  }

  function isStageUnlocked(stageIdOrOrder, roomsList) {
    // Stage 1 (Pre-Security) is always unlocked
    if (stageIdOrOrder === 'pre-security' || stageIdOrOrder === 1) return true;

    const list = roomsList || (typeof window !== 'undefined' && (window.CALION_ROOMS || window.ENDLESSUS_ROOMS)) || [];
    const completedRooms = new Set(getCompletedRooms());

    // Stage 2 (Cyber Security) unlocks when Stage 1 has >= 3 completed rooms
    if (stageIdOrOrder === 'cyber-security' || stageIdOrOrder === 2) {
      const s1Rooms = list.filter(r => r.stageId === 'pre-security' || r.stageOrder === 1);
      const s1Completed = s1Rooms.filter(r => completedRooms.has(r.id)).length;
      return s1Completed >= 3;
    }

    // Stage 3 (Defensive) and Stage 4 (Offensive) unlock when Stage 2 has >= 3 completed rooms
    if (stageIdOrOrder === 'defensive-security' || stageIdOrOrder === 3 || stageIdOrOrder === 'offensive-security' || stageIdOrOrder === 4) {
      const s2Rooms = list.filter(r => r.stageId === 'cyber-security' || r.stageOrder === 2);
      const s2Completed = s2Rooms.filter(r => completedRooms.has(r.id)).length;
      return s2Completed >= 3;
    }

    return true;
  }

  function resetAllProgress() {
    safeSet(KEYS.ROOMS, []);
    safeSet(KEYS.ROOM_PROG, {});
    safeSet(KEYS.QUESTIONS, {});
    safeSet(KEYS.LABS, []);
    safeSet(KEYS.XP, 0);
    safeSet(KEYS.STREAK, 1);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(KEYS.LAST_ROOM);
      }
    } catch (e) {}
    dispatchStateChange({ type: 'progress-reset' });
  }

  function dispatchStateChange(detail) {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof CustomEvent !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('calion-progress-updated', { detail }));
        window.dispatchEvent(new CustomEvent('endlessus-progress-updated', { detail }));
      } catch (_) {}
    }
  }

  function getTaskProgressMap() {
    const raw = safeGet(KEYS.TASKS, {});
    return (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  }

  function isTaskCompleted(roomId, taskIdx, associatedQuestionIndices) {
    if (!roomId || taskIdx === undefined) return false;
    if (isRoomCompleted(roomId)) return true;

    // If task has questions, check if all associated questions are solved
    if (Array.isArray(associatedQuestionIndices) && associatedQuestionIndices.length > 0) {
      const qMap = getQuestionProgress();
      return associatedQuestionIndices.every(qIdx => Boolean(qMap[`${roomId}_q${qIdx}`]));
    }

    // Otherwise check explicit task completion flag
    const taskMap = getTaskProgressMap();
    return Boolean(taskMap[`${roomId}_t${taskIdx}`]);
  }

  function completeTask(roomId, taskIdx) {
    if (!roomId || taskIdx === undefined) return;
    const taskMap = getTaskProgressMap();
    taskMap[`${roomId}_t${taskIdx}`] = true;
    safeSet(KEYS.TASKS, taskMap);

    updateStreak();
    setLastActiveRoom(roomId);
    dispatchStateChange({ type: 'task-completed', roomId, taskIdx });
  }

  // Cross-tab sync
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('storage', (e) => {
      if (Object.values(KEYS).includes(e.key)) {
        dispatchStateChange({ type: 'storage-sync', key: e.key });
      }
    });
  }

  return {
    KEYS,
    normalizeRoomId,
    safeGet,
    safeSet,
    calculateTotalXP,
    getCompletedRooms,
    getCompletedLabs,
    getQuestionProgress,
    getRoomProgressMap,
    getTaskProgressMap,
    isRoomCompleted,
    isLabCompleted,
    getLabFlag,
    isQuestionSolved,
    isTaskCompleted,
    completeTask,
    markRoomCompleted,
    markRoomIncomplete,
    markLabCompleted,
    solveQuestion,
    updateStreak,
    getStreak,
    setLastActiveRoom,
    getLastActiveRoom,
    setLastActivePosition,
    getLastActivePosition,
    getNextIncompleteRoom,
    getLevelProgress,
    getStageProgress,
    isStageUnlocked,
    resetAllProgress
  };
});
