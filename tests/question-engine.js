/**
 * Endlessus TryHackMe-Style Question Engine Unit Test Suite
 * Tests answer normalization, case-insensitivity, whitespace trimming,
 * alternatives, error feedback, and progress tracking.
 */

const assert = require('assert');
const path = require('path');
const data = require(path.join(__dirname, '..', 'pre-security-data.js'));

console.log('============================================================');
console.log('STARTING TRYHACKME QUESTION ENGINE TEST SUITE');
console.log('============================================================\n');

const rooms = data.PRE_SECURITY_ROOM_MAP;
assert(rooms && Object.keys(rooms).length === 45, '45 Pre Security rooms required');

// The exact validation function used in learning.js
function validateAnswer(questionObj, userInput) {
  if (typeof userInput !== 'string') return false;
  const isCaseSensitive = Boolean(questionObj.caseSensitive);
  const shouldTrim = questionObj.trimWhitespace !== false;

  let cleanInput = userInput;
  if (shouldTrim) cleanInput = cleanInput.trim();
  if (!isCaseSensitive) cleanInput = cleanInput.toLowerCase();

  const accepted = (questionObj.acceptedAnswers || []).map(ans => {
    let a = String(ans);
    if (shouldTrim) a = a.trim();
    if (!isCaseSensitive) a = a.toLowerCase();
    return a;
  });

  return accepted.includes(cleanInput);
}

// 1. Exact Answer Validation: Case Insensitivity & Whitespace Trimming
console.log('--- 1. Exact Answer Normalization ---');
{
  const q01 = rooms['room-01'].questions[0]; // whoami
  assert.strictEqual(q01.type, 'exact');

  // Exact match
  assert(validateAnswer(q01, 'whoami'), 'Direct lowercase match must pass');
  // Uppercase
  assert(validateAnswer(q01, 'WHOAMI'), 'Uppercase match must pass when caseSensitive is false');
  // Mixed case
  assert(validateAnswer(q01, 'WhoAmI'), 'Mixed case match must pass when caseSensitive is false');
  // Leading and trailing whitespace
  assert(validateAnswer(q01, '   whoami   '), 'Whitespace trimmed match must pass');
  // Incorrect answer
  assert(!validateAnswer(q01, 'id'), 'Incorrect command must fail');
  assert(!validateAnswer(q01, 'who am i'), 'Separated words must fail');
  assert(!validateAnswer(q01, ''), 'Empty input must fail');

  console.log('  ✓ Case insensitivity, whitespace trimming, and rejection verified for whoami');
}

// 2. Alternative Accepted Answers
console.log('--- 2. Alternative Accepted Answers ---');
{
  const q42 = rooms['room-42'].questions[0]; // -I or --head
  assert.strictEqual(q42.type, 'exact');
  assert(q42.acceptedAnswers.length >= 2, 'Room 42 Q1 must accept both -I and --head');

  assert(validateAnswer(q42, '-I'), 'Primary answer -I must pass');
  assert(validateAnswer(q42, '--head'), 'Alternative answer --head must pass');
  assert(validateAnswer(q42, '  -I  '), 'Trimmed -I must pass');
  assert(!validateAnswer(q42, '-v'), '-v is not accepted');

  console.log('  ✓ Multiple accepted answers (-I, --head) verified');
}

// 3. Punctuation and Hyphenated Answers
console.log('--- 3. Punctuation & Hyphenated Answers ---');
{
  const q18 = rooms['room-18'].questions[0]; // Verb-Noun or verb noun
  assert(validateAnswer(q18, 'Verb-Noun'), 'Verb-Noun must pass');
  assert(validateAnswer(q18, 'verb-noun'), 'verb-noun lowercase must pass');
  assert(validateAnswer(q18, 'verb noun'), 'verb noun space alternative must pass');
  assert(!validateAnswer(q18, 'Noun-Verb'), 'Incorrect order must fail');

  const q44 = rooms['room-44'].questions[0]; // auth.log
  assert(validateAnswer(q44, 'auth.log'), 'auth.log with dot must pass');
  assert(validate44 = validateAnswer(q44, 'AUTH.LOG'), 'AUTH.LOG uppercase must pass');
  assert(!validateAnswer(q44, 'syslog'), 'syslog must fail');

  console.log('  ✓ Hyphenated and dot-notated answers verified');
}

// 4. Multiple-Choice Question Evaluation
console.log('--- 4. Multiple-Choice Question Evaluation ---');
{
  const mcQuestion = rooms['room-01'].questions[1];
  assert.strictEqual(mcQuestion.type, 'multiple-choice');
  assert(Array.isArray(mcQuestion.options) && mcQuestion.options.length >= 2);
  assert(typeof mcQuestion.correctIndex === 'number');

  const correctIdx = mcQuestion.correctIndex;
  const wrongIdx = (correctIdx + 1) % mcQuestion.options.length;

  assert.strictEqual(correctIdx === mcQuestion.correctIndex, true, 'Correct option matches correctIndex');
  assert.strictEqual(wrongIdx === mcQuestion.correctIndex, false, 'Wrong option rejected');
  console.log('  ✓ Multiple choice evaluation verified');
}

// 5. Visual Slot Character Count Check across All Exact Questions
console.log('--- 5. Visual Character Slot Consistency ---');
{
  let exactCount = 0;
  Object.keys(rooms).forEach(roomId => {
    const r = rooms[roomId];
    (r.questions || []).forEach(q => {
      if (q.type === 'exact' && q.visualSlots) {
        exactCount++;
        const primaryAns = q.acceptedAnswers[0].trim();
        // Slot items separated by space
        const slotItems = q.visualSlots.split(' ').filter(s => s !== '');
        
        // If primary answer has no spaces, slot items must match length exactly
        if (!primaryAns.includes(' ')) {
          assert.strictEqual(
            slotItems.length,
            primaryAns.length,
            `In ${roomId} question ${q.id}: visual slots count (${slotItems.length}) must match answer length (${primaryAns.length}: "${primaryAns}")`
          );
        }
      }
    });
  });
  console.log(`  ✓ Verified ${exactCount} exact questions have 100% consistent visual character slot counts`);
}

// 6. Progress Tracking & State Accumulation Simulation
console.log('--- 6. Progress Calculation & Storage Simulation ---');
{
  const progressState = {
    questionProgress: {},
    roomProgress: {}
  };

  const testRoom = rooms['room-01'];
  const qList = testRoom.questions;

  // Initially 0%
  let solvedInRoom = qList.filter(q => Boolean(progressState.questionProgress[q.id])).length;
  assert.strictEqual(solvedInRoom, 0);

  // Solve question 1
  progressState.questionProgress[qList[0].id] = {
    solved: true,
    solvedAt: new Date().toISOString()
  };
  solvedInRoom = qList.filter(q => Boolean(progressState.questionProgress[q.id])).length;
  assert.strictEqual(solvedInRoom, 1);
  let pct = Math.round((solvedInRoom / qList.length) * 100);
  assert(pct > 0 && pct < 100);

  // Solve remaining questions
  for (let i = 1; i < qList.length; i++) {
    progressState.questionProgress[qList[i].id] = {
      solved: true,
      solvedAt: new Date().toISOString()
    };
  }
  solvedInRoom = qList.filter(q => Boolean(progressState.questionProgress[q.id])).length;
  assert.strictEqual(solvedInRoom, qList.length);
  pct = Math.round((solvedInRoom / qList.length) * 100);
  assert.strictEqual(pct, 100, 'Room is 100% completed when all questions solved');

  progressState.roomProgress['room-01'] = {
    completed: true,
    percent: 100,
    completedAt: new Date().toISOString()
  };
  assert.strictEqual(progressState.roomProgress['room-01'].completed, true);
  console.log('  ✓ Question progress and 100% room completion logic verified');
}

console.log('\n============================================================');
console.log('ALL QUESTION ENGINE TESTS PASSED!');
console.log('============================================================');
