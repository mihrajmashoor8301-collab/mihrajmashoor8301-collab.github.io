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
    ROOMS: 'endlessus_completed_rooms',
    ROOM_PROG: 'endlessus_room_progress',
    QUESTIONS: 'endlessus_question_progress',
    LABS: 'endlessus_completed_labs',
    XP: 'endlessus_user_xp',
    STREAK: 'endlessus_streak_days',
    LAST_ACTIVE: 'endlessus_last_active',
    LAST_ROOM: 'endlessus_last_room',
    THEME: 'endlessus_learning_theme',
    TASKS: 'endlessus_task_progress'
  };

  function safeGet(key, defaultVal) {
    try {
      if (typeof localStorage === 'undefined') return defaultVal;
      const raw = localStorage.getItem(key);
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
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn(`[AcademyState] Failed to persist ${key}:`, e);
    }
  }

  // Authoritative answer validation
  function validateAnswer(questionObj, userInput) {
    if (!questionObj || typeof userInput !== 'string') return false;
    const isCaseSensitive = Boolean(questionObj.caseSensitive);
    const shouldTrim = questionObj.trimWhitespace !== false;

    let cleanInput = userInput;
    if (shouldTrim) cleanInput = cleanInput.trim();
    if (!isCaseSensitive) cleanInput = cleanInput.toLowerCase();

    if (!cleanInput) return false;

    const accepted = (questionObj.acceptedAnswers || []).map(ans => {
      let a = String(ans);
      if (shouldTrim) a = a.trim();
      if (!isCaseSensitive) a = a.toLowerCase();
      return a;
    });

    return accepted.includes(cleanInput);
  }

  // Calculate XP idempotently: 50 per completed room + 25 per solved question + 75 per solved lab
  function calculateTotalXP() {
    const rooms = getCompletedRooms();
    const questions = getQuestionProgress();
    const labs = getCompletedLabs();

    const roomXP = rooms.length * 50;
    const questionXP = Object.keys(questions).filter(k => questions[k] === true).length * 25;
    const labXP = labs.length * 75;

    const total = roomXP + questionXP + labXP;
    safeSet(KEYS.XP, total);
    return total;
  }

  function getCompletedRooms() {
    const raw = safeGet(KEYS.ROOMS, []);
    return Array.isArray(raw) ? raw.filter(id => typeof id === 'string') : [];
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
    return getCompletedRooms().includes(roomId);
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

  function markRoomCompleted(roomId) {
    if (!roomId) return false;
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

  function markRoomIncomplete(roomId) {
    if (!roomId) return;
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

      if (pct === 100 && !isRoomCompleted(roomId)) {
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
    const list = roomsList || (typeof window !== 'undefined' && window.ENDLESSUS_ROOMS) || [];
    for (let i = 0; i < list.length; i++) {
      if (!completed.has(list[i].id)) {
        return list[i];
      }
    }
    return list[0] || null;
  }

  function getLevelProgress(levelId, roomsList) {
    const list = roomsList || (typeof window !== 'undefined' && window.ENDLESSUS_ROOMS) || [];
    const lvlNum = parseInt(levelId, 10);
    const roomsInLevel = list.filter(r => (typeof r.level === 'number' ? r.level : r.stage) === lvlNum);
    const total = roomsInLevel.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };
    const completedRooms = new Set(getCompletedRooms());
    const completed = roomsInLevel.filter(r => completedRooms.has(r.id)).length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('endlessus-progress-updated', { detail }));
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
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (Object.values(KEYS).includes(e.key)) {
        dispatchStateChange({ type: 'storage-sync', key: e.key });
      }
    });
  }

  return {
    KEYS,
    safeGet,
    safeSet,
    validateAnswer,
    calculateTotalXP,
    getCompletedRooms,
    getCompletedLabs,
    getQuestionProgress,
    getRoomProgressMap,
    getTaskProgressMap,
    isRoomCompleted,
    isQuestionSolved,
    isTaskCompleted,
    completeTask,
    markRoomCompleted,
    markRoomIncomplete,
    solveQuestion,
    updateStreak,
    getStreak,
    setLastActiveRoom,
    getLastActiveRoom,
    getNextIncompleteRoom,
    getLevelProgress,
    resetAllProgress
  };
});
