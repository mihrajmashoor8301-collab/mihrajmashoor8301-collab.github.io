'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { CALION_STAGES, CALION_ROOMS } = require('../learning-data.js');

const migration = fs.readFileSync(path.join(__dirname, '../supabase/migrations/202611200001_calion_four_path_reconciliation.sql'), 'utf8');
const validation = fs.readFileSync(path.join(__dirname, '../supabase/audits/20261119-production-curriculum-validation.sql'), 'utf8');
const sync = fs.readFileSync(path.join(__dirname, '../academy-sync.js'), 'utf8');
const xpProposal = fs.readFileSync(path.join(__dirname, '../supabase/proposals/20261120-xp-consistency-proposal.md'), 'utf8');

assert.equal(CALION_STAGES.length, 4);
assert.deepEqual(CALION_STAGES.map(s => s.roomCount), [10, 10, 12, 15]);
assert.equal(CALION_ROOMS.length, 47);
assert.equal(CALION_ROOMS.filter(r => r.id === 'room-46').length, 1);
assert.equal(CALION_ROOMS.filter(r => r.id === 'room-47').length, 1);

const body = migration.split('insert into public.rooms')[1].split('on conflict (id)')[0];
const rows = [...body.matchAll(/\('([^']+)', '([^']+)', '([^']+)', '((?:[^']|'')*)', '((?:[^']|'')*)', '([^']+)', '([^']+)', '([^']+)', '([^']+)'\)/g)]
  .map(m => ({ id:m[1], path_id:m[2], level:Number(m[3]), title:m[4].replaceAll("''", "'"), description:m[5].replaceAll("''", "'"), xp:Number(m[6]), questions:Number(m[7]), order:Number(m[8]), active:m[9] }));
assert.equal(rows.length, 47, 'migration must seed exactly 47 explicit canonical rows');
const pathBody = migration.split('insert into public.learning_paths')[1].split('on conflict (id)')[0];
const pathRows = [...pathBody.matchAll(/\('([^']+)', '((?:[^']|'')*)', '((?:[^']|'')*)', '([^']+)', '([^']+)', '([^']+)'\)/g)]
  .map(m => ({ id:m[1], title:m[2].replaceAll("''", "'"), description:m[3].replaceAll("''", "'"), icon:m[4], order:Number(m[5]), active:m[6] }));
assert.equal(pathRows.length, 4, 'migration must seed exactly four canonical paths');
for (const stage of CALION_STAGES) {
  const sqlPath = pathRows.find(p => p.id === stage.id);
  assert(sqlPath, `missing path ${stage.id}`);
  assert.equal(sqlPath.title, stage.title, `${stage.id} title`);
  assert.equal(sqlPath.description, stage.description, `${stage.id} description`);
  assert.equal(sqlPath.icon, stage.icon, `${stage.id} icon`);
  assert.equal(sqlPath.order, stage.order, `${stage.id} order`);
}
for (const appRoom of CALION_ROOMS) {
  const sqlRoom = rows.find(r => r.id === appRoom.id);
  assert(sqlRoom, `missing ${appRoom.id}`);
  assert.equal(sqlRoom.path_id, appRoom.stageId, `${appRoom.id} path`);
  assert.equal(sqlRoom.level, appRoom.stageOrder, `${appRoom.id} stage`);
  assert.equal(sqlRoom.title, appRoom.title, `${appRoom.id} title`);
  assert.equal(sqlRoom.description, appRoom.description, `${appRoom.id} description`);
  assert.equal(sqlRoom.xp, appRoom.xpReward, `${appRoom.id} XP metadata`);
  assert.equal(sqlRoom.questions, appRoom.questions.length, `${appRoom.id} question count`);
  assert.equal(sqlRoom.order, appRoom.roomNumber, `${appRoom.id} display order`);
}

for (const [version, expected] of [['calion-legacy-45-v1', 'legacy_room_title'], ['calion-academy-47-v1', 'room_progress_user_room_curriculum_key']]) {
  assert(migration.includes(version), `migration must version ${version}`);
  assert(migration.includes(expected), `migration missing ${expected}`);
}
assert(migration.includes('legacy_room_total_questions'), 'legacy question threshold snapshot must be retained');
assert(migration.includes('disable trigger trg_room_progress_update') && migration.includes('enable trigger trg_room_progress_update'), 'migration must suppress XP recalculation while assigning legacy metadata');
assert(migration.includes('disable trigger trg_protect_room_completion') && migration.includes('enable trigger trg_protect_room_completion'), 'metadata assignment must not change progress through completion guard side effects');
assert(migration.includes('Historical curriculum progress is immutable'), 'legacy rows must not be edited by clients');
assert(!/update\s+public\.room_progress[^;]*status\s*=/is.test(migration), 'migration must not alter historical completion state');
assert(migration.includes("req_questions:=coalesce(new.legacy_room_total_questions,2)"), 'legacy completion must use its old threshold');
assert(migration.includes("rp.curriculum_id='calion-academy-47-v1'"), 'new room awards must require current curriculum progress');
assert(migration.includes('pre_security_total=10 and pre_security_completed=10'), 'graduation requires all 10 actual Pre-Security rooms');
assert(migration.includes('The audited eight-row progress set changed'), 'migration must stop if production progress changes after audit');
assert(!/update\s+public\.profiles/i.test(migration), 'curriculum migration must never recalculate profile XP');
assert(migration.includes('calion_reconcile_profiles_snapshot'), 'migration must compare opening XP before and after');
assert(migration.includes('Profile XP changed during curriculum reconciliation'), 'XP drift must abort the transaction');
assert(!/questions_solved[^;]*25/i.test(migration), 'curriculum migration must not add question XP');
assert(!/perform\s+public\.evaluate_user_milestones/i.test(migration), 'migration must not invoke milestone recalculation');
assert(!/insert\s+into\s+public\.(room_progress|task_progress)/i.test(migration), 'migration must not create learner progress');
assert(!/insert\s+into\s+public\.user_achievements/i.test(migration.split('create or replace function public.evaluate_user_milestones')[0]), 'migration must not award achievements outside a function definition');
assert(migration.includes('Historical room progress changed during curriculum reconciliation'), 'progress drift must abort the transaction');
assert(migration.includes('Earned achievements changed during curriculum reconciliation'), 'achievement drift must abort the transaction');
assert(!/\b(delete\s+from|truncate\s+table|drop\s+table)\b/i.test(migration), 'migration must not delete data or tables');
assert(validation.includes('profile_xp_checksum'), 'validation must compare XP before and after');
assert(validation.includes('room_progress_checksum') || validation.includes('legacy_progress_checksum'), 'validation must check progress preservation');
assert(validation.includes('legacy-45-v1'), 'validation must distinguish historical rows');
assert(sync.includes("const CURRICULUM_ID = 'calion-academy-47-v1'"));
assert(sync.includes("onConflict: 'user_id,room_id,curriculum_id'"));
assert(xpProposal.includes('authoritative_total_xp = opening_balance + SUM(append_only_xp_events.xp_amount)'));
const state = fs.readFileSync(path.join(__dirname, '../academy-state.js'), 'utf8');
assert(state.includes('calion_47_completed_rooms'));
assert(!state.includes('PRE_VERSIONED_CURRENT_KEYS'), 'ambiguous unversioned browser completions must not be auto-credited');
assert(xpProposal.includes('question:calion-academy-47-v1:<room_id>:<question_id>'));
console.log('✓ Reconciliation proposal matches all 47 canonical rooms and preserves versioned historical progress');
