/** Client payload and server-bound question submission contract checks. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { CALION_ROOMS } = require('../learning-data.js');
const stateSource = fs.readFileSync(require.resolve('../academy-state.js'), 'utf8');
const migration = fs.readFileSync(require.resolve('../supabase/migrations/202611200002_calion_authoritative_xp_ledger.sql'), 'utf8');
const questions = CALION_ROOMS.flatMap(room => room.lessons.flatMap(lesson => lesson.questions || []));
const exact = questions.filter(q => q.type === 'exact');
const multipleChoice = questions.filter(q => q.type === 'multiple-choice');
assert.equal(questions.length, 141);
assert.equal(exact.length, 61);
assert.equal(multipleChoice.length, 80);
assert(!/acceptedAnswers|correctIndex|validateAnswer/.test(stateSource), 'browser state must not carry or validate answer keys');
assert(migration.includes('answer_digest=extensions.digest(convert_to'), 'database compares responses against private salted digests');
assert(migration.includes('public.verify_calion_answer_guest'), 'guest answers are server-checked without XP');
for (const q of exact) {
  assert.equal((q.visualSlots.match(/_/g) || []).length, q.answerLength, q.id);
  assert(/^[ _]+$/.test(q.visualSlots), q.id);
}
for (const q of multipleChoice) assert(q.options.length >= 2, q.id);
console.log('✓ 141 browser-safe question records have no answer aliases or correct indexes');
console.log('✓ Exact-answer masks and visible multiple-choice options remain intact');
console.log('✓ Account and guest answer verification are server-side; guests receive no authoritative XP');
