/**
 * Endlessus Pre Security Curriculum Integrity Test Suite
 * Tests all 45 rooms across Levels 0-7 for structure, continuity, question format, and visual slots.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('============================================================');
console.log('STARTING PRE SECURITY CURRICULUM INTEGRITY TEST SUITE');
console.log('============================================================\n');

// Load curriculum data
const dataFilePath = path.join(__dirname, '..', 'pre-security-data.js');
assert(fs.existsSync(dataFilePath), 'pre-security-data.js must exist');

const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Execute in a mock sandbox
const sandbox = {
  window: {},
  document: {}
};
const vm = require('vm');
vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);

const stages = sandbox.window.ENDLESSUS_STAGES || sandbox.ENDLESSUS_STAGES;
const rooms = sandbox.window.ENDLESSUS_ROOM_MAP || sandbox.ENDLESSUS_ROOM_MAP;

assert(Array.isArray(stages), 'ENDLESSUS_STAGES must be an array');
assert(typeof rooms === 'object' && rooms !== null, 'ENDLESSUS_ROOM_MAP must be an object');

const roomKeys = Object.keys(rooms);
console.log(`✓ Loaded ${stages.length} stages and ${roomKeys.length} rooms.`);

// 1. Stage Verification (Levels 0 through 7)
assert.strictEqual(stages.length, 8, `Expected exactly 8 Pre Security levels (0-7), got ${stages.length}`);
stages.forEach((st, idx) => {
  assert.strictEqual(st.id, idx, `Stage index ${idx} must have id ${idx}`);
  assert(st.title && st.title.length > 5, `Stage ${idx} must have a descriptive title`);
  assert(st.roomCount && st.roomCount > 0, `Stage ${idx} must have at least one room`);
  assert(st.icon, `Stage ${idx} must have an icon`);
});
console.log('✓ All 8 Pre Security levels (Levels 0–7) verified.');

// 2. Room Count & ID Sequencing (room-01 through room-45)
assert.strictEqual(roomKeys.length, 45, `Expected exactly 45 rooms, got ${roomKeys.length}`);

for (let i = 1; i <= 45; i++) {
  const expectedId = `room-${String(i).padStart(2, '0')}`;
  assert(rooms[expectedId], `Missing expected room ID: ${expectedId}`);
}
console.log('✓ All room IDs room-01 through room-45 are strictly indexed.');

// 3. Continuity & Sequential Linking
for (let i = 1; i <= 45; i++) {
  const currentId = `room-${String(i).padStart(2, '0')}`;
  const room = rooms[currentId];
  
  if (i < 45) {
    const expectedNext = `room-${String(i + 1).padStart(2, '0')}`;
    assert.strictEqual(room.nextRoomId, expectedNext, `${currentId} nextRoomId must be ${expectedNext}, got ${room.nextRoomId}`);
  } else {
    assert.strictEqual(room.nextRoomId, null, `Terminal room ${currentId} nextRoomId must be null`);
  }
}
console.log('✓ Continuous sequential progression verified from room-01 to room-45.');

// 4. Strict Room Content & 12-Section Architecture Check
let totalQuestions = 0;
let totalVocabulary = 0;

roomKeys.forEach(roomId => {
  const r = rooms[roomId];

  // Core metadata
  assert(r.id === roomId, `${roomId} id mismatch`);
  assert(r.title && r.title.length > 3, `${roomId} must have a valid title`);
  assert(typeof r.level === 'number' && r.level >= 0 && r.level <= 7, `${roomId} level must be between 0 and 7`);
  assert(r.levelTitle && r.levelTitle.includes('Level '), `${roomId} levelTitle must specify Level X`);
  assert(r.estimatedTime && r.estimatedTime.includes('min'), `${roomId} estimatedTime must specify minutes`);
  assert(r.difficulty, `${roomId} must specify difficulty`);

  // Section 01: Why are you here?
  assert(r.whyAreYouHere && r.whyAreYouHere.length >= 20, `${roomId} Section 1 (whyAreYouHere) must be informative`);

  // Section 02: What you'll learn
  assert(Array.isArray(r.objectives) && r.objectives.length >= 3, `${roomId} Section 2 (objectives) must have at least 3 points`);

  // Section 03: New vocabulary
  assert(Array.isArray(r.vocabulary) && r.vocabulary.length >= 3, `${roomId} Section 3 (vocabulary) must have at least 3 terms`);
  r.vocabulary.forEach(v => {
    assert(v.term && v.term.length > 0, `${roomId} vocabulary item must have term`);
    assert(v.definition && v.definition.length > 5, `${roomId} vocabulary item must have definition`);
    totalVocabulary++;
  });

  // Section 04: Core Concepts
  assert(Array.isArray(r.lessons) && r.lessons.length >= 2, `${roomId} Section 4 (lessons) must have at least 2 concept blocks`);
  r.lessons.forEach(l => {
    assert(l.title && l.title.length > 2, `${roomId} lesson must have title`);
    assert(l.content && l.content.length >= 30, `${roomId} lesson must have substantial content`);
  });

  // Section 05: Real Examples
  assert(Array.isArray(r.seeExamples) && r.seeExamples.length >= 1, `${roomId} Section 5 (seeExamples) must have at least 1 example`);
  r.seeExamples.forEach(e => {
    assert(e.title, `${roomId} example must have title`);
    assert(e.codeOrDiagram || e.code, `${roomId} example must have codeOrDiagram`);
  });

  // Section 06: Interactive Exercise
  assert(r.tryInteractive, `${roomId} Section 6 (tryInteractive) required`);
  assert(r.tryInteractive.prompt || r.tryInteractive.instruction, `${roomId} tryInteractive must have prompt`);

  // Section 07: TryHackMe-Style Questions
  assert(Array.isArray(r.questions) && r.questions.length >= 2, `${roomId} Section 7 (questions) must have at least 2 questions`);
  r.questions.forEach((q, qIdx) => {
    totalQuestions++;
    assert(q.id, `${roomId} question ${qIdx} must have id`);
    assert(q.question && q.question.length > 5, `${roomId} question ${qIdx} must have question text`);
    if (q.type === 'exact') {
      assert(Array.isArray(q.acceptedAnswers) && q.acceptedAnswers.length >= 1, `${roomId} question ${qIdx} must have acceptedAnswers`);
    } else if (q.type === 'multiple-choice') {
      assert(Array.isArray(q.options) && q.options.length >= 2, `${roomId} question ${qIdx} must have options`);
      assert(typeof q.correctIndex === 'number', `${roomId} question ${qIdx} must have correctIndex`);
    }
    assert(q.hint && q.hint.length > 3, `${roomId} question ${qIdx} must have hint`);
    assert(q.explanation && q.explanation.length > 5, `${roomId} question ${qIdx} must have explanation`);

    // Exact answer visual slot validation
    if (q.type === 'exact' && q.visualSlots) {
      const primaryAns = q.acceptedAnswers[0].trim();
      const slotCount = q.visualSlots.split(' ').filter(s => s !== '').length;
      if (slotCount > 0 && !primaryAns.includes(' ')) {
        assert.strictEqual(
          slotCount,
          primaryAns.length,
          `${roomId} question ${q.id} visual slots (${slotCount}) must match primary answer length (${primaryAns.length}: "${primaryAns}")`
        );
      }
    }
  });

  // Section 08: Practical Tasks
  assert(Array.isArray(r.tasks) && r.tasks.length >= 1, `${roomId} Section 8 (tasks) must have tasks array`);

  // Section 11: Security Connection
  assert(r.securityConnection && r.securityConnection.length >= 15, `${roomId} Section 11 (securityConnection) must be informative`);

  // Section 12: SVG Diagram
  assert(r.diagramSvg && r.diagramSvg.includes('<svg') && r.diagramSvg.includes('</svg>'), `${roomId} Section 12 (diagramSvg) must contain valid SVG`);
});

console.log(`✓ All 45 rooms verified against 12-section template.`);
console.log(`✓ Verified ${totalQuestions} knowledge questions and ${totalVocabulary} vocabulary definitions.`);
console.log('\n============================================================');
console.log('ALL PRE SECURITY CURRICULUM INTEGRITY TESTS PASSED!');
console.log('============================================================');
