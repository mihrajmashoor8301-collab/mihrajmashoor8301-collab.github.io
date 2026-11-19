/** Structural and answer-key privacy audit for the authoritative CALION curriculum. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { CALION_STAGES: stages, CALION_ROOMS: rooms, CALION_ROOM_ID_ALIASES: aliases } = require('../learning-data.js');
const state = require('../academy-state.js');
const xpMigration = fs.readFileSync(path.join(__dirname, '../supabase/migrations/202611200002_calion_authoritative_xp_ledger.sql'), 'utf8');
const buildScript = fs.readFileSync(path.join(__dirname, '../scripts/build-pages.js'), 'utf8');

const counts = Object.fromEntries(stages.map(stage => [stage.id, rooms.filter(room => room.stageId === stage.id).length]));
assert.equal(rooms.length, 47);
assert.equal(stages.length, 4);
assert.deepEqual(counts, { 'pre-security': 10, 'cyber-security': 10, 'defensive-security': 12, 'offensive-security': 15 });
assert.equal(new Set(rooms.map(room => room.id)).size, 47);
assert.deepEqual(rooms.map(room => room.id), Array.from({ length: 47 }, (_, i) => `room-${String(i + 1).padStart(2, '0')}`));

let lessonCount = 0, exactCount = 0, multipleChoiceCount = 0;
const questionIds = new Set();
for (const room of rooms) {
  assert(room.title && room.description && room.objectives?.length && room.lessons?.length, `${room.id} metadata and lessons`);
  lessonCount += room.lessons.length;
  for (const lesson of room.lessons) {
    assert(lesson.title && lesson.concept, `${room.id} lesson content`);
    for (const q of lesson.questions || []) {
      assert(!questionIds.has(q.id), `duplicate question ID ${q.id}`);
      questionIds.add(q.id);
      assert(q.question && q.explanation, `${q.id} wording/explanation`);
      assert(Array.isArray(q.hints) && q.hints.length === 3, `${q.id} progressive hints`);
      assert(!Object.hasOwn(q, 'acceptedAnswers'), `${q.id} must not ship accepted-answer strings`);
      assert(!Object.hasOwn(q, 'correctIndex'), `${q.id} must not ship a correct option index`);
      assert(!Object.hasOwn(q, 'expectedAnswer') && !Object.hasOwn(q, 'answerKey'), `${q.id} must not ship answer keys`);
      if (q.type === 'exact') {
        exactCount++;
        assert(/^[ _]+$/.test(q.visualSlots), `${q.id} mask contains only underscores and spacing`);
        assert.equal((q.visualSlots.match(/_/g) || []).length, q.answerLength, `${q.id} mask character count`);
      } else {
        multipleChoiceCount++;
        assert.equal(q.type, 'multiple-choice');
        assert(Array.isArray(q.options) && q.options.length >= 2, `${q.id} visible option set`);
      }
    }
  }
}
assert.equal(lessonCount, 141);
assert.equal(questionIds.size, 141);
assert.equal(exactCount, 61);
assert.equal(multipleChoiceCount, 80);

// The trusted DB migration has only salted digests, never answer strings or MC indexes.
const keyRows = [...xpMigration.matchAll(/\('calion-academy-47-v1','(room-\d\d)','(q-\d\d-\d+)','[a-f0-9]{32}',decode\('[a-f0-9]{64}','hex'\),(true|false),(true|false)\)/g)];
assert.equal(keyRows.length, 205, 'all existing accepted-answer aliases and MC keys stay in the private server vault');
for (const [, roomId, questionId] of keyRows) {
  assert(rooms.some(room => room.id === roomId && room.questions.some(q => q.id === questionId)), `private key maps to current question ${roomId}:${questionId}`);
}
assert(!/acceptedAnswers|correctIndex|expectedAnswer|answerKey/i.test(xpMigration), 'migration must not contain plaintext keys or option indexes');
assert(buildScript.includes('assertNoBrowserAnswerKeys(DIST_DIR)'), 'production build must fail closed on answer-key fields');
assert(buildScript.includes("'curriculum-data.js'") && buildScript.includes("'learning.js'"), 'retired answer-bearing bundles must be excluded');

for (const [legacy, canonical] of Object.entries(aliases)) {
  assert(/^ps-room-\d{2}$/.test(legacy));
  assert(rooms.some(room => room.id === canonical));
  assert.equal(state.normalizeRoomId(legacy), canonical);
}

const memory = new Map();
global.localStorage = { getItem: key => memory.has(key) ? memory.get(key) : null, setItem: (key, value) => memory.set(key, value), removeItem: key => memory.delete(key) };
memory.set(state.KEYS.ROOMS, JSON.stringify(['ps-room-01', 'room-01']));
memory.set(state.KEYS.QUESTIONS, JSON.stringify({ 'ps-room-01_q0': true, 'room-01_q0': true }));
assert.deepEqual(state.getCompletedRooms(), ['room-01']);
assert.equal(state.calculateTotalXP(), 75, 'legacy duplicate room/question aliases count once');
memory.set('calion_user_xp', JSON.stringify(3200));
assert.equal(state.calculateTotalXP(), 3200, 'historical XP is never reduced during normalization');
assert.deepEqual(JSON.parse(memory.get(state.KEYS.ROOMS)), ['ps-room-01', 'room-01'], 'current progress remains stored');
memory.set('calion_completed_rooms', JSON.stringify(['room-11']));
assert.deepEqual(state.getCompletedRooms(), ['room-01'], 'unversioned completion is preserved but excluded from current progress');
assert.deepEqual(JSON.parse(memory.get('calion_completed_rooms')), ['room-11']);
delete global.localStorage;

console.log('✓ 47 rooms, 4 paths, 141 lessons/questions (61 exact, 80 MC) verified');
console.log('✓ 205 salted server answer keys map to current questions; browser curriculum contains no key fields');
console.log('✓ Answer masks, legacy IDs, and XP preservation verified');
