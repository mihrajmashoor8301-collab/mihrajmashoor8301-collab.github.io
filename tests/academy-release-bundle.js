'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const releaseDir = path.join(__dirname, '../supabase/releases');
const deploy = fs.readFileSync(path.join(releaseDir, '20261120-calion-academy-2.0-deploy.psql'), 'utf8');
const runbook = fs.readFileSync(path.join(releaseDir, '20261120-calion-academy-2.0-runbook.md'), 'utf8');
const preflight = fs.readFileSync(path.join(releaseDir, '20261120-calion-academy-2.0-preflight.sql'), 'utf8');
const postflight = fs.readFileSync(path.join(releaseDir, '20261120-calion-academy-2.0-postflight.sql'), 'utf8');
const curriculum = deploy.indexOf('202611200001_calion_four_path_reconciliation.sql');
const xp = deploy.indexOf('202611200002_calion_authoritative_xp_ledger.sql');

assert(deploy.startsWith('\\set ON_ERROR_STOP on'));
assert(deploy.includes("to_regclass('supabase_migrations.schema_migrations')"));
for (const version of ['202611170001','202611170002','202611170003','202611190001']) {
  assert(deploy.includes(version), `deployment gate must require reconciled baseline ${version}`);
}
assert(curriculum >= 0 && xp > curriculum, 'curriculum migration must run before XP ledger migration');
assert(deploy.includes('Expected exactly four reconciled baseline versions'));
assert(deploy.includes('A CALION 2.0 release migration is already recorded'));
assert(runbook.includes('migration list --remote'));
assert(runbook.includes('--read-only'));
assert(runbook.includes('does not run their SQL'));
assert(runbook.includes('does not apply or replay any baseline migration'));
assert(preflight.includes('as release_preflight'));
assert(postflight.includes('as release_postflight'));
assert(postflight.includes("'profile_xp_mismatch_count'"));
assert(postflight.includes("'legacy_room_award_count'"));
assert(!/db push|db reset/.test(deploy.toLowerCase()));
console.log('✓ Release bundle gates baseline history and orders the two new migrations without replaying baselines');
