'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const proposal = fs.readFileSync(path.join(__dirname, '../supabase/proposals/20261120-xp-consistency-proposal.md'), 'utf8');
const curriculumMigration = fs.readFileSync(path.join(__dirname, '../supabase/migrations/202611200001_calion_four_path_reconciliation.sql'), 'utf8');

const rates = { room:50, question:25, lab:75, achievement:null };
function total(openingBalance, events) {
  const seen = new Set();
  return openingBalance + events.reduce((sum, event) => {
    if (!event.verified || event.curriculumId === 'calion-legacy-45-v1' || seen.has(event.key)) return sum;
    const amount = event.type === 'achievement' ? event.amount : rates[event.type];
    if (!Number.isInteger(amount) || amount < 0) return sum;
    seen.add(event.key);
    return sum + amount;
  }, 0);
}

const opening = 250;
assert.equal(total(opening, []), opening, 'cutover preserves exact existing total');
assert.equal(total(opening, [
  { key:'legacy-room-01', type:'room', curriculumId:'calion-legacy-45-v1', verified:true },
  { key:'fake-question', type:'question', curriculumId:'calion-academy-47-v1', verified:false }
]), opening, 'legacy completion and unverified input add no XP');
const valid = { key:'room:room-01', type:'room', curriculumId:'calion-academy-47-v1', verified:true };
const question = { key:'question:room-01:q1', type:'question', curriculumId:'calion-academy-47-v1', verified:true };
assert.equal(total(opening, [valid,valid,question,question]), 325, 'idempotency prevents repeat room and question awards');
assert.equal(total(opening, [
  { key:'lab:headers', type:'lab', curriculumId:null, verified:true },
  { key:'achievement:first-steps', type:'achievement', curriculumId:null, verified:true, amount:50 },
  { key:'achievement:first-steps', type:'achievement', curriculumId:null, verified:true, amount:50 }
]), 375, 'lab and achievement events are awarded once');
assert(proposal.includes('authoritative_total_xp = opening_balance + SUM(append_only_xp_events.xp_amount)'));
assert(proposal.includes('user identity always comes from `auth.uid()`'));
assert(proposal.includes('private per-answer salted digest'));
assert(proposal.includes('profile total for authenticated display'));
assert(!/update\s+public\.profiles/i.test(curriculumMigration), 'curriculum migration must not recalculate XP');
assert(curriculumMigration.includes('calion_reconcile_profiles_snapshot'), 'curriculum migration verifies profile XP preservation');
console.log('✓ XP model preserves opening balances, excludes legacy/unverified activity and deduplicates source events');
