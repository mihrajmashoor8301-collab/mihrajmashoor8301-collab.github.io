'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const migration = fs.readFileSync(path.join(__dirname, '../supabase/migrations/202611200002_calion_authoritative_xp_ledger.sql'), 'utf8');
const proposal = fs.readFileSync(path.join(__dirname, '../supabase/proposals/20261120-xp-consistency-proposal.md'), 'utf8');
const clientSource = fs.readFileSync(path.join(__dirname, '../academy-xp-client.js'), 'utf8');
const roomPage = fs.readFileSync(path.join(__dirname, '../room.html'), 'utf8');
const syncSource = fs.readFileSync(path.join(__dirname, '../academy-sync.js'), 'utf8');
const navSource = fs.readFileSync(path.join(__dirname, '../academy-nav.js'), 'utf8');
const { CALION_ROOMS } = require('../learning-data.js');

assert.equal(CALION_ROOMS.length, 47);
assert.equal(CALION_ROOMS.reduce((n, r) => n + r.questions.length, 0), 141);
assert(migration.includes("unique(user_id, event_key)"), 'award event identity must be unique per user');
assert(migration.includes("p_event_type='room'" ) && migration.includes("p_xp_amount<>50"));
assert(migration.includes("p_event_type='question'" ) && migration.includes("p_xp_amount<>25"));
assert(migration.includes("p_event_type='lab'" ) && migration.includes("p_xp_amount<>75"));
assert(migration.includes('calion_private.xp_legacy_labs'), 'preexisting completed labs must not be re-awarded');
assert(migration.includes('calion_private.xp_legacy_achievements'), 'preexisting achievements must not be re-awarded');
assert(migration.includes('insert into calion_private.xp_opening_balances(user_id, opening_xp)') || migration.includes('insert into calion_private.xp_opening_balances(user_id,opening_xp)'), 'opening balances are captured');
assert(migration.includes('select id, total_xp from public.profiles') || migration.includes('select id,total_xp from public.profiles'));
assert(migration.includes('if v_user is null then return jsonb_build_object'), 'RPCs reject unauthenticated/guest award attempts');
assert(migration.includes("p_curriculum_id is distinct from 'calion-academy-47-v1'"), 'legacy curriculum cannot award question XP');
assert(migration.includes("event_type='question'" ) && migration.includes('count(*),coalesce(jsonb_agg(source_id'), 'room completion uses verified question events');
assert(migration.includes('pg_advisory_xact_lock'), 'room-finalization races are serialized');
assert(migration.includes('for update'), 'profile award updates serialize for a learner');
assert(migration.includes('answer_digest=extensions.digest(convert_to'), 'answers are verified against private salted digests');
assert(migration.includes('public.verify_calion_answer_guest'), 'guests use a server verifier without XP awards');
assert(migration.includes('room_xp_awarded'), 'server response reports whether room XP was newly awarded');
assert(migration.includes("v_attempt_count>=10") && migration.includes("interval '1 minute'"), 'question RPC limits brute-force retries per learner/question');
assert(migration.includes('xp_events_no_update_delete') && migration.includes('xp_events_no_truncate'), 'ledger is append-only');
assert(migration.includes('trg_calion_preserve_verified_completion'), 'stale client writes cannot downgrade ledger-verified room completion');
assert(migration.includes('alter table calion_private.question_answer_keys enable row level security'));
assert(migration.includes('revoke all on all tables in schema calion_private from public, anon, authenticated'));
assert(migration.includes('grant execute on function public.submit_calion_answer(text,text,text,text) to authenticated'));
assert(migration.includes('revoke all on function public.submit_calion_answer(text,text,text,text) from public,anon'));
assert(migration.includes('perform calion_private.award_achievement'), 'milestone awards route through unique ledger events');
assert(!/update\s+public\.profiles\s+set\s+total_xp\s*=\s*\(/i.test(migration), 'no rollout XP recomputation');
assert(migration.toLowerCase().includes('initial rollout must not create xp events'));
assert(migration.includes('calion_xp_profile_rollout_snapshot') && migration.includes('profiles.total_xp changed during XP ledger installation'));
assert.equal((migration.match(/\('calion-academy-47-v1','room-\d\d','q-\d\d-\d+'/g) || []).length, 205, 'answer alias hashes cover seeded current questions');
assert(!/acceptedAnswers|correctIndex|expectedAnswer|answerKey/i.test(migration), 'migration carries no plaintext answer values or correct indexes');
const questionMap = new Map(CALION_ROOMS.flatMap(room => room.questions.map(q => [`${room.id}:${q.id}`, q])));
const digestRows = [...migration.matchAll(/\('calion-academy-47-v1','(room-\d\d)','(q-\d\d-\d+)','([a-f0-9]{32})',decode\('([a-f0-9]{64})','hex'\),(true|false),(true|false)\)/g)];
assert.equal(digestRows.length, 205);
for (const [,roomId,questionId] of digestRows) {
  const q = questionMap.get(`${roomId}:${questionId}`);
  assert(q, `seed includes known question ${roomId}:${questionId}`);
  assert(!Object.hasOwn(q, 'acceptedAnswers') && !Object.hasOwn(q, 'correctIndex'));
}
assert(proposal.includes('opening_balance` is captured from the exact `profiles.total_xp`'));
assert(proposal.includes('A guest without an authenticated Supabase identity'));
assert(clientSource.includes("'verify_calion_answer_guest'"));
assert(roomPage.includes('<script src="academy-xp-client.js"></script>'));
assert(roomPage.includes('AcademyXP.submitAnswer({'), 'authenticated lesson answers use the server verifier');
assert(roomPage.includes('if (authenticatedLearner && !serverVerified) return'), 'room completion requires server-confirmed current progress');
const lessonPage = fs.readFileSync(path.join(__dirname, '../lesson.html'), 'utf8');
assert(lessonPage.includes('allSolved && (!authenticatedLearner || serverRoomCompleted)'), 'lesson completion cannot be inferred from local answer flags for authenticated learners');
assert(syncSource.includes("sb.rpc('get_calion_xp_state')"), 'authenticated state pull uses verified ledger events');
assert(syncSource.includes("questions_solved: []"), 'client sync never supplies solved-question evidence');
assert(syncSource.includes("status: 'in_progress'"), 'client progress sync cannot mark rooms completed');
assert(navSource.includes("select('total_xp')"), 'authenticated header XP comes from the server profile');
assert(!/from\(['"](?:xp_events|xp_opening_balances)['"]\)/.test(clientSource), 'browser never writes or reads private ledger tables');
assert(!/xp_amount|xpAwardAmount|awardXp\(/i.test(clientSource), 'client cannot supply an award amount');

const xpClient = require('../academy-xp-client.js');
(async () => {
  let guestRpc;
  global.window = { AcademyAuth: {
    isAuthenticated: () => false,
    getClient: () => ({ rpc: async (name, args) => { guestRpc = { name, args }; return { data: { success: true, correct: true, code: 'verified' }, error: null }; } })
  } };
  const guest = await xpClient.submitAnswer({ roomId: 'room-01', questionId: 'q-01-1', answer: 'IP' });
  assert.equal(guestRpc.name, 'verify_calion_answer_guest', 'guest correctness is checked server-side');
  assert.equal(guest.correct, true);
  assert.equal(guest.xpAwarded, 0);
  let rpcArgs;
  global.window = { AcademyAuth: {
    isAuthenticated: () => true,
    getUser: () => ({ id: 'test-user' }),
    getClient: () => ({ rpc: async (name, args) => { rpcArgs = { name, args }; return { data: { success: true, xp_awarded: 25, total_xp: 275 }, error: null }; } })
  } };
  const sent = await xpClient.submitAnswer({ roomId: 'room-01', questionId: 'q-01-1', answer: 'IP' });
  assert.equal(rpcArgs.name, 'submit_calion_answer');
  assert.deepEqual(Object.keys(rpcArgs.args).sort(), ['p_answer','p_curriculum_id','p_question_id','p_room_id'].sort());
  assert.equal(sent.xpAwarded, 25);
  assert.equal(sent.totalXP, 275);

// Model the unique-index/serialized RPC contract under concurrent retries.
const ledger = new Map();
let balance = 250;
let queue = Promise.resolve();
const protectedAnswers = new Map([['room-01:q-01-1', new Set(['sample answer'])]]);
async function award(key, amount) {
  let result;
  queue = queue.then(() => {
    if (!ledger.has(key)) { ledger.set(key, amount); balance += amount; result = { inserted: true, balance }; }
    else { assert.equal(ledger.get(key), amount); result = { inserted: false, balance }; }
  });
  await queue;
  return result;
}
async function submitAnswer(userId, curriculumId, roomId, questionId, answer) {
  if (!userId || curriculumId !== 'calion-academy-47-v1') return { correct:false,xp:0 };
  const accepted = protectedAnswers.get(`${roomId}:${questionId}`);
  if (!accepted || !accepted.has(String(answer || '').trim().toLowerCase())) return { correct:false,xp:0 };
  const result = await award(`question:${curriculumId}:${roomId}:${questionId}`,25);
  return { correct:true,xp:result.inserted?25:0 };
}
  assert.deepEqual(await submitAnswer(null,'calion-academy-47-v1','room-01','q-01-1','IP'),{correct:false,xp:0},'unauthorized requests cannot earn XP');
  assert.deepEqual(await submitAnswer('u1','calion-legacy-45-v1','room-01','q-01-1','IP'),{correct:false,xp:0},'legacy curriculum answer cannot earn XP');
  assert.deepEqual(await submitAnswer('u1','calion-academy-47-v1','room-01','q-01-1','wrong'),{correct:false,xp:0},'invalid answer cannot earn XP');
  assert.deepEqual(await submitAnswer('u1','calion-academy-47-v1','room-01','q-01-1','SAMPLE ANSWER'),{correct:true,xp:25});
  assert.deepEqual(await submitAnswer('u1','calion-academy-47-v1','room-01','q-01-1','sample answer'),{correct:true,xp:0},'question retry awards no duplicate XP');
  const [roomA, roomB] = await Promise.all([award('room:v1:room-01', 50), award('room:v1:room-01', 50)]);
  assert.equal([roomA.inserted, roomB.inserted].filter(Boolean).length, 1, 'duplicate room award is once-only');
  const questions = await Promise.all(Array.from({ length: 20 }, () => award('question:v1:room-01:q-01-2', 25)));
  assert.equal(questions.filter(x => x.inserted).length, 1, 'concurrent duplicate question award is once-only');
  const labs = await Promise.all([award('lab:v1:lab-logs', 75), award('lab:v1:lab-logs', 75)]);
  assert.equal(labs.filter(x => x.inserted).length, 1, 'duplicate lab award is once-only');
  const achievements = await Promise.all([award('achievement:v1:first-steps', 50), award('achievement:v1:first-steps', 50)]);
  assert.equal(achievements.filter(x => x.inserted).length, 1, 'duplicate achievement bonus is once-only');
  assert.equal(balance, 475, 'opening balance is preserved and only five unique events are added');
  console.log('✓ XP ledger covers deduplication, concurrency, server verification, version isolation, and opening-balance preservation');
})().catch(error => { console.error(error); process.exitCode = 1; });
