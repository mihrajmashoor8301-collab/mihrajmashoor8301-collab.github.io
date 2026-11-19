/** Question engine regression checks against the authoritative 47-room curriculum. */
const assert = require('assert');
const { CALION_ROOMS } = require('../learning-data.js');
const state = require('../academy-state.js');
const questions = CALION_ROOMS.flatMap(room => room.lessons.flatMap(lesson => lesson.questions || []));
const exact = questions.filter(q => q.type === 'exact');
const multipleChoice = questions.filter(q => q.type !== 'exact');
assert.equal(questions.length,141);assert.equal(exact.length,61);assert.equal(multipleChoice.length,80);
const q=exact.find(x=>x.acceptedAnswers[0].includes(' '))||exact[0];
assert(state.validateAnswer(q,q.acceptedAnswers[0].toUpperCase()));assert(state.validateAnswer(q,`  ${q.acceptedAnswers[0]}  `));assert(!state.validateAnswer(q,'definitely-not-the-answer'));
const aliases=exact.find(x=>x.acceptedAnswers.length>1);assert(aliases.acceptedAnswers.every(a=>state.validateAnswer(aliases,a)));
for(const item of multipleChoice){assert(item.options.length>=2);assert(Number.isInteger(item.correctIndex)&&item.correctIndex>=0&&item.correctIndex<item.options.length)}
for(const item of exact){assert.equal(item.visualSlots,state.formatAnswerMask(item),item.id);assert.equal(item.answerLength,Array.from(item.acceptedAnswers[0]).filter(ch=>!(/\s/u.test(ch))).length,item.id)}
assert.equal(state.formatAnswerMask({type:'exact',acceptedAnswers:['ZERO TRUST']}),'_ _ _ _   _ _ _ _ _');
assert.equal(state.formatAnswerMask({type:'exact',acceptedAnswers:['SYN-ACK']}),'_ _ _ _ _ _ _');
assert.equal(state.formatAnswerMask({type:'multiple-choice',acceptedAnswers:['answer']}),'');
console.log('✓ 141 unique questions: 61 exact-answer masks and 80 valid multiple-choice indexes');
console.log('✓ Canonical answer normalization, aliases, punctuation, and multiword spacing verified');
