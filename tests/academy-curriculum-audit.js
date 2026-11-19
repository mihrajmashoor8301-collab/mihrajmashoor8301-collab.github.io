/** Structural regression audit for the authoritative CALION Academy curriculum. */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { CALION_STAGES: stages, CALION_ROOMS: rooms, CALION_ROOM_ID_ALIASES: aliases } = require('../learning-data.js');
const state = require('../academy-state.js');
const counts = Object.fromEntries(stages.map(s => [s.id, rooms.filter(r => r.stageId === s.id).length]));
assert.equal(rooms.length,47);assert.equal(stages.length,4);
assert.deepEqual(counts,{'pre-security':10,'cyber-security':10,'defensive-security':12,'offensive-security':15});
assert.equal(new Set(rooms.map(r=>r.id)).size,47);
assert.deepEqual(rooms.map(r=>r.id),Array.from({length:47},(_,i)=>`room-${String(i+1).padStart(2,'0')}`));
let lessonCount=0,exactCount=0,mcCount=0;const questionIds=new Set();
for(const room of rooms){assert(room.title&&room.description,`${room.id} metadata`);assert(room.objectives?.length,`${room.id} objectives`);assert(room.lessons?.length,`${room.id} lessons`);lessonCount+=room.lessons.length;for(const lesson of room.lessons){assert(lesson.title&&lesson.concept,`${room.id} lesson content`);for(const q of lesson.questions||[]){assert(!questionIds.has(q.id),`duplicate question ID ${q.id}`);questionIds.add(q.id);assert(q.question&&q.explanation,`${q.id} wording/explanation`);assert(Array.isArray(q.hints)&&q.hints.length===3,`${q.id} progressive hint tiers`);const possibleAnswers=q.type==='exact'?q.acceptedAnswers:q.options?.filter((_,i)=>i===q.correctIndex)||[];for(const answer of possibleAnswers){const token=String(answer).toLowerCase().replace(/[^a-z0-9]/g,'');if(token.length>=4)assert(!q.hints.some(h=>String(h).toLowerCase().replace(/[^a-z0-9]/g,'').includes(token)),`${q.id} hint must not reveal accepted answer`)}if(q.type==='exact'){exactCount++;assert(q.acceptedAnswers?.length,`${q.id} accepted answers`);const canonical=q.acceptedAnswers[0];const length=Array.from(canonical).filter(c=>!(/\s/u.test(c))).length;assert.equal(q.visualSlots,state.formatAnswerMask(q),`${q.id} answer mask`);assert.equal(q.answerLength,length,`${q.id} answer character count`);}else{mcCount++;assert(Array.isArray(q.options)&&q.options.length>=2,`${q.id} options`);assert(Number.isInteger(q.correctIndex)&&q.correctIndex>=0&&q.correctIndex<q.options.length,`${q.id} correct option index`);}}}}
assert.equal(lessonCount,141);assert.equal(questionIds.size,141);assert.equal(exactCount,61);assert.equal(mcCount,80);
for(const [legacy,canonical] of Object.entries(aliases)){assert(/^ps-room-\d{2}$/.test(legacy));assert(rooms.some(r=>r.id===canonical));assert.equal(state.normalizeRoomId(legacy),canonical)}
assert.equal(state.formatAnswerMask({type:'exact',acceptedAnswers:['ZERO TRUST']}),'_ _ _ _   _ _ _ _ _');
assert.equal(state.formatAnswerMask({type:'multiple-choice',acceptedAnswers:['A']}),'');
const memory=new Map();global.localStorage={getItem:k=>memory.has(k)?memory.get(k):null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)};
memory.set('calion_completed_rooms',JSON.stringify(['ps-room-01','room-01']));
memory.set('calion_question_progress',JSON.stringify({'ps-room-01_q0':true,'room-01_q0':true}));
assert.deepEqual(state.getCompletedRooms(),['room-01']);assert.equal(state.calculateTotalXP(),75,'legacy duplicate room/question aliases count once');
memory.set('calion_user_xp',JSON.stringify(3200));assert.equal(state.calculateTotalXP(),3200,'historical XP is never reduced during normalization');
assert.deepEqual(JSON.parse(memory.get('calion_completed_rooms')),['ps-room-01','room-01'],'raw progress records remain stored');delete global.localStorage;
const buildScript=fs.readFileSync(path.join(__dirname,'../scripts/build-pages.js'),'utf8');
assert(buildScript.includes("'calion-curriculum-pre-security.js'")&&buildScript.includes("'pre-security-data.js'"),'Retired curriculum bundles must stay out of production output');
console.log('✓ 47 rooms, 4 stage counts, 141 lessons and 141 unique questions audited');
console.log('✓ 61 exact-answer masks/counts, 80 MC indexes, legacy aliases and XP preservation verified');
