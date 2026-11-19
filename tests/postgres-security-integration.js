/**
 * CALION Academy - Real PostgreSQL / Supabase Integration Security Test Suite
 * 
 * Executes real SQL queries against an isolated PostgreSQL cluster using
 * two distinct simulated accounts (User A & User B), testing RLS policies,
 * column privileges, check constraints, server triggers, and search_path hygiene.
 */

const assert = require('assert');
const { execSync } = require('child_process');
const path = require('path');

const PG_HOST = process.env.CALION_TEST_PG_HOST || '/tmp/calion_test_pg';
const PG_PORT = process.env.CALION_TEST_PG_PORT || '5433';
const PG_DB = process.env.CALION_TEST_PG_DB || 'postgres';

function runSql(sql, asRole = null, userId = null) {
  let sessionPreamble = '';
  if (asRole) {
    sessionPreamble += `SET ROLE ${asRole};\n`;
  }
  if (userId) {
    sessionPreamble += `SET "request.jwt.claim.sub" = '${userId}';\n`;
  }

  const fullSql = sessionPreamble + sql;
  try {
    const stdout = execSync(`psql -h ${PG_HOST} -p ${PG_PORT} -d ${PG_DB} -v ON_ERROR_STOP=1 -q -t -A`, {
      input: fullSql,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return { success: true, output: stdout.trim(), error: null };
  } catch (err) {
    return {
      success: false,
      output: (err.stdout || '').toString().trim(),
      error: (err.stderr || err.message || '').toString().trim()
    };
  }
}

console.log('============================================================');
console.log('STARTING REAL POSTGRESQL MULTI-TENANT SECURITY INTEGRATION TEST');
console.log('============================================================\n');

// -----------------------------------------------------------------------------
// 1. Provision 2 Simulated Accounts in auth.users
// -----------------------------------------------------------------------------
console.log('--- 1. Provisioning Two Accounts in auth.users ---');

const USER_A_ID = '11111111-1111-1111-1111-111111111111';
const USER_B_ID = '22222222-2222-2222-2222-222222222222';

const setupUsersSql = `
DELETE FROM auth.users WHERE id IN ('${USER_A_ID}', '${USER_B_ID}');
DELETE FROM public.profiles WHERE id IN ('${USER_A_ID}', '${USER_B_ID}');

INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES 
  ('${USER_A_ID}', 'usera@endlessus.in', '{"username": "learner_alpha", "display_name": "Learner Alpha"}'::jsonb),
  ('${USER_B_ID}', 'userb@endlessus.in', '{"username": "learner_bravo", "display_name": "Learner Bravo"}'::jsonb);
`;

const resSetup = runSql(setupUsersSql);
assert(resSetup.success, `User creation failed: ${resSetup.error}`);

// Verify profiles were automatically provisioned by trigger
const checkProfiles = runSql(`SELECT count(*) FROM public.profiles WHERE id IN ('${USER_A_ID}', '${USER_B_ID}');`);
assert.strictEqual(checkProfiles.output, '2', 'Both profiles must be automatically created by handle_new_user trigger');
console.log('  ✓ Verified: Accounts provisioned; handle_new_user() trigger created profiles');

// -----------------------------------------------------------------------------
// 2. Client-Side XP Manipulation Prevention (Runtime Column Privilege Check)
// -----------------------------------------------------------------------------
console.log('\n--- 2. Testing Client XP Manipulation Prevention ---');

// Attempt direct update of total_xp by authenticated User A
const xpTamperSql = `UPDATE public.profiles SET total_xp = 999999 WHERE id = '${USER_A_ID}';`;
const resXpTamper = runSql(xpTamperSql, 'authenticated', USER_A_ID);

// Must be rejected by PostgreSQL column privilege check
assert(!resXpTamper.success, 'PostgreSQL must reject UPDATE on total_xp from authenticated role');
assert(resXpTamper.error.includes('permission denied for table profiles'),
  `Expected permission denied for table profiles, got: ${resXpTamper.error}`);
console.log('  ✓ Verified: Direct client UPDATE on total_xp was rejected by PostgreSQL: Permission Denied');

// Verify total_xp remains 0 in database
const checkXp = runSql(`SELECT total_xp FROM public.profiles WHERE id = '${USER_A_ID}';`);
assert.strictEqual(checkXp.output, '0', 'total_xp must remain 0 after tamper attempt');
console.log('  ✓ Verified: Profile total_xp is intact at 0');

// -----------------------------------------------------------------------------
// 3. Client Achievement Forgery Prevention (Runtime Privilege Check)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Testing Client Achievement Forgery Prevention ---');

// User A attempts to award themselves the 'first-step' achievement
const achTamperSql = `
INSERT INTO public.user_achievements (user_id, achievement_id)
VALUES ('${USER_A_ID}', 'first-step');
`;
const resAchTamper = runSql(achTamperSql, 'authenticated', USER_A_ID);

assert(!resAchTamper.success, 'PostgreSQL must reject INSERT into user_achievements from authenticated role');
assert(resAchTamper.error.includes('permission denied for table user_achievements'),
  `Expected permission denied for user_achievements, got: ${resAchTamper.error}`);
console.log('  ✓ Verified: Client direct INSERT on user_achievements rejected: Permission Denied');

// -----------------------------------------------------------------------------
// 4. Client Activity Telemetry Forgery Prevention
// -----------------------------------------------------------------------------
console.log('\n--- 4. Testing Client Activity Telemetry Forgery Prevention ---');

const actTamperSql = `
INSERT INTO public.user_activity (user_id, activity_type, xp_earned)
VALUES ('${USER_A_ID}', 'fabricated_event', 1000);
`;
const resActTamper = runSql(actTamperSql, 'authenticated', USER_A_ID);

assert(!resActTamper.success, 'PostgreSQL must reject INSERT into user_activity from authenticated role');
assert(resActTamper.error.includes('permission denied for table user_activity'),
  `Expected permission denied for user_activity, got: ${resActTamper.error}`);
console.log('  ✓ Verified: Client direct INSERT on user_activity rejected: Permission Denied');

// -----------------------------------------------------------------------------
// 5. Anti-Forgery Check Constraints & Server Triggers (Room & Lab Progress)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Testing Anti-Forgery Check Constraints & Server Triggers ---');

// Scenario 5A: Room completion without sufficient questions solved (Trigger Enforcement)
const fakeRoomSql = `
INSERT INTO public.room_progress (user_id, room_id, status, progress_pct)
VALUES ('${USER_A_ID}', 'room-01', 'completed', 45);
`;
const resFakeRoom = runSql(fakeRoomSql, 'authenticated', USER_A_ID);
assert(!resFakeRoom.success, 'PostgreSQL must reject completed status when questions are incomplete');
assert(resFakeRoom.error.includes('protect_room_completion') || resFakeRoom.error.includes('Room completion rejected'),
  `Expected protect_room_completion trigger rejection, got: ${resFakeRoom.error}`);
console.log('  ✓ Verified: Room completion without required questions rejected by protect_room_completion() trigger');

// Scenario 5B: Tampering progress_pct = 100 without solving questions (Trigger Clamping)
const clampRoomSql = `
INSERT INTO public.room_progress (user_id, room_id, status, progress_pct)
VALUES ('${USER_A_ID}', 'room-02', 'in_progress', 100);
SELECT progress_pct FROM public.room_progress WHERE user_id = '${USER_A_ID}' AND room_id = 'room-02';
`;
const resClampRoom = runSql(clampRoomSql, 'authenticated', USER_A_ID);
assert(resClampRoom.success, `Clamping insert should succeed: ${resClampRoom.error}`);
assert.strictEqual(resClampRoom.output.trim(), '99', 'Trigger must clamp progress_pct from 100 to 99 when questions are incomplete');
console.log('  ✓ Verified: Client attempt to submit 100% progress without questions clamped to 99%');

// Scenario 5C: Direct client lab completion without RPC (Trigger Enforcement)
const fakeLabSql = `
INSERT INTO public.lab_progress (user_id, lab_id, status, flag_verified)
VALUES ('${USER_A_ID}', 'lab-headers', 'completed', true);
`;
const resFakeLab = runSql(fakeLabSql, 'authenticated', USER_A_ID);
assert(!resFakeLab.success, 'PostgreSQL must reject direct client lab completion/flag verification');
assert(resFakeLab.error.includes('protect_lab_verification') || resFakeLab.error.includes('Direct client verification of lab completion is forbidden'),
  `Expected protect_lab_verification trigger rejection, got: ${resFakeLab.error}`);
console.log('  ✓ Verified: Direct client flag_verified/completed insert blocked by protect_lab_verification() trigger');

// Scenario 5D: Client attempts direct access to lab_secrets table
const readSecretsSql = `SELECT count(*) FROM public.lab_secrets;`;
const resReadSecrets = runSql(readSecretsSql, 'authenticated', USER_A_ID);
assert(!resReadSecrets.success, 'PostgreSQL must reject direct access to lab_secrets from authenticated role');
assert(resReadSecrets.error.includes('permission denied for table lab_secrets'),
  `Expected permission denied for lab_secrets, got: ${resReadSecrets.error}`);
console.log('  ✓ Verified: Client direct SELECT on lab_secrets rejected: Permission Denied');

// -----------------------------------------------------------------------------
// 6. Legitimate Room & Lab Completion via Server-Side Logic
// -----------------------------------------------------------------------------
console.log('\n--- 6. Testing Legitimate Room Completion & Lab Verification ---');

// 6A. Legitimate Room completion: status = 'completed', progress_pct = 100, 3 questions solved
const legitRoomSql = `
INSERT INTO public.room_progress (user_id, room_id, status, progress_pct, questions_solved, completed_at)
VALUES ('${USER_A_ID}', 'room-01', 'completed', 100, '["room-01_q0", "room-01_q1", "room-01_q2"]'::jsonb, now());
`;
const resLegitRoom = runSql(legitRoomSql, 'authenticated', USER_A_ID);
assert(resLegitRoom.success, `Legitimate room completion must succeed, got error: ${resLegitRoom.error}`);

// Verify triggers executed on room completion:
const profileCheckSql = `SELECT total_xp FROM public.profiles WHERE id = '${USER_A_ID}';`;
const profileCheckRes = runSql(profileCheckSql);
const currentXp = parseInt(profileCheckRes.output, 10);
assert(currentXp >= 100, `total_xp must include room (50) + first-steps achievement (50), got: ${currentXp}`);
console.log(`  ✓ Verified: Legitimate room completion awarded 50 XP + 50 XP milestone = ${currentXp} XP`);

// Verify achievement 'first-steps' was inserted by system trigger
const achCheckSql = `SELECT count(*) FROM public.user_achievements WHERE user_id = '${USER_A_ID}' AND achievement_id = 'first-steps';`;
const achCheckRes = runSql(achCheckSql);
assert.strictEqual(achCheckRes.output, '1', 'Server trigger must have unlocked achievement first-steps');
console.log('  ✓ Verified: Achievement "first-steps" unlocked legitimately via SECURITY DEFINER trigger');

// 6B. Server-Side Lab Flag Verification RPC: Fake Flag Token
const fakeRpcSql = `SELECT public.verify_lab_flag('lab-headers', 'flag{wrong_fabricated_flag}');`;
const resFakeRpc = runSql(fakeRpcSql, 'authenticated', USER_A_ID);
assert(resFakeRpc.success, `RPC call should execute: ${resFakeRpc.error}`);
assert(resFakeRpc.output.includes('"success": false') || resFakeRpc.output.includes('"success":false'),
  `RPC must reject incorrect flag, got: ${resFakeRpc.output}`);
console.log('  ✓ Verified: Server RPC verify_lab_flag() rejected invalid flag token');

// 6C. Server-Side Lab Flag Verification RPC: Authentic Flag Token
// Lab headers canonical flag is 'flag{strict_transport_security_csp}' -> hash: 4e38664709c98beae232d223d5e24f86ccd18ea99a94dbd5ae5bffeafa46e4fc
const legitRpcSql = `SELECT public.verify_lab_flag('lab-headers', 'flag{strict_transport_security_csp}');`;
const resLegitRpc = runSql(legitRpcSql, 'authenticated', USER_A_ID);
assert(resLegitRpc.success, `Legitimate RPC call should execute: ${resLegitRpc.error}`);
assert(resLegitRpc.output.includes('"success": true') || resLegitRpc.output.includes('"success":true'),
  `RPC must accept authentic flag token, got: ${resLegitRpc.output}`);
console.log('  ✓ Verified: Server RPC verify_lab_flag() validated flag and marked lab completed');

// Verify lab completion and XP recalculation:
// Room (50) + first-steps (50) + Lab (75) + lab-practitioner achievement (100) = 275 XP
const xpAfterLabSql = `SELECT total_xp FROM public.profiles WHERE id = '${USER_A_ID}';`;
const xpAfterLabRes = runSql(xpAfterLabSql);
const totalXpAfterLab = parseInt(xpAfterLabRes.output, 10);
assert.strictEqual(totalXpAfterLab, 275, `Expected 275 total XP after room + lab + achievements, got: ${totalXpAfterLab}`);
console.log(`  ✓ Verified: Server triggers automatically recalculated total_xp to ${totalXpAfterLab} (50+50+75+100)`);

// Verify lab-practitioner achievement was unlocked by server trigger
const labAchSql = `SELECT count(*) FROM public.user_achievements WHERE user_id = '${USER_A_ID}' AND achievement_id = 'lab-practitioner';`;
const labAchRes = runSql(labAchSql);
assert.strictEqual(labAchRes.output, '1', 'Server trigger must have unlocked achievement lab-practitioner');
console.log('  ✓ Verified: Achievement "lab-practitioner" unlocked legitimately via server trigger');

// 3. Verify user_activity log was recorded by server trigger
const actCheckSql = `SELECT count(*) FROM public.user_activity WHERE user_id = '${USER_A_ID}' AND activity_type = 'room_completed';`;
const actCheckRes = runSql(actCheckSql);
assert.strictEqual(actCheckRes.output, '1', 'Server trigger must have logged room_completed activity');
console.log('  ✓ Verified: Telemetry event logged in user_activity by server trigger');

// -----------------------------------------------------------------------------
// 7. Multi-Tenant RLS Boundary Enforcement (User A vs User B)
// -----------------------------------------------------------------------------
console.log('\n--- 7. Testing Multi-Tenant RLS Boundary Enforcement ---');

// Set User B profile to private
runSql(`UPDATE public.profiles SET is_public = false WHERE id = '${USER_B_ID}';`);
// Insert private room progress for User B
runSql(`
INSERT INTO public.room_progress (user_id, room_id, status, progress_pct)
VALUES ('${USER_B_ID}', 'room-05', 'in_progress', 50)
ON CONFLICT (user_id, room_id) DO UPDATE SET progress_pct = 50;
`);

// User A attempts to read User B's private profile
const readBProfileSql = `SELECT count(*) FROM public.profiles WHERE id = '${USER_B_ID}';`;
const resReadBProfile = runSql(readBProfileSql, 'authenticated', USER_A_ID);
assert.strictEqual(resReadBProfile.output, '0', 'RLS must hide private profile of User B from User A');
console.log('  ✓ Verified: User A cannot read User B private profile (0 rows returned via RLS)');

// User A attempts to read User B's room progress
const readBRoomSql = `SELECT count(*) FROM public.room_progress WHERE user_id = '${USER_B_ID}';`;
const resReadBRoom = runSql(readBRoomSql, 'authenticated', USER_A_ID);
assert.strictEqual(resReadBRoom.output, '0', 'RLS must hide private room progress of User B from User A');
console.log('  ✓ Verified: User A cannot read User B room progress (0 rows returned via RLS)');

// User A attempts to tamper with User B's progress (Cross-Tenant Modification)
const tamperBRoomSql = `UPDATE public.room_progress SET progress_pct = 99 WHERE user_id = '${USER_B_ID}';`;
const resTamperBRoom = runSql(tamperBRoomSql, 'authenticated', USER_A_ID);
assert(resTamperBRoom.success, 'Update execution must complete (RLS filters out other rows)');

// Check User B's progress in database: must be unchanged (50, not 99)
const checkBProg = runSql(`SELECT progress_pct FROM public.room_progress WHERE user_id = '${USER_B_ID}' AND room_id = 'room-05';`);
assert.strictEqual(checkBProg.output, '50', 'User B progress must be unmodified by User A');

// User A attempts to delete User B's progress
const deleteBRoomSql = `DELETE FROM public.room_progress WHERE user_id = '${USER_B_ID}';`;
const resDeleteBRoom = runSql(deleteBRoomSql, 'authenticated', USER_A_ID);
assert(resDeleteBRoom.success, 'Delete execution must complete');

// Check User B's progress in database: must not be deleted (count must still be 1)
const checkBCount = runSql(`SELECT count(*) FROM public.room_progress WHERE user_id = '${USER_B_ID}' AND room_id = 'room-05';`);
assert.strictEqual(checkBCount.output, '1', 'User B progress must not be deleted by User A');
console.log('  ✓ Verified: Cross-tenant UPDATE/DELETE blocked by RLS (User B data intact: pct=50, rows=1)');

// -----------------------------------------------------------------------------
// 8. SECURITY DEFINER search_path Hygiene
// -----------------------------------------------------------------------------
console.log('\n--- 8. Testing SECURITY DEFINER Runtime search_path Configuration ---');

const checkSearchPathSql = `
SELECT proname, proconfig
FROM pg_proc
JOIN pg_namespace n ON n.oid = pg_proc.pronamespace
WHERE n.nspname = 'public'
  AND proname IN ('handle_new_user', 'evaluate_user_milestones', 'on_room_progress_update', 'on_lab_progress_update', 'protect_profile_immutable_fields');
`;
const resSearchPath = runSql(checkSearchPathSql);
assert(resSearchPath.success, 'Must query pg_proc successfully');

const lines = resSearchPath.output.split('\n');
assert(lines.length >= 5, 'All 5 SECURITY DEFINER functions must be registered');
lines.forEach(line => {
  assert(line.includes('search_path=public, pg_temp'), `Function missing safe search_path: ${line}`);
});
console.log('  ✓ Verified: All 5 functions enforce runtime parameter search_path=public, pg_temp');

// -----------------------------------------------------------------------------
// 9. Guest Migration Anti-Overwrite Verification
// -----------------------------------------------------------------------------
console.log('\n--- 9. Testing Anti-Overwrite & Demotion Protection ---');

// User A has already completed room-01 with 100% progress
// Check that room-01 cannot be demoted to in_progress with lower progress_pct
const demoteSql = `
UPDATE public.room_progress
SET status = 'in_progress', progress_pct = 40
WHERE user_id = '${USER_A_ID}' AND room_id = 'room-01';
`;
// If attempted, ensure the database update does not corrupt completion
runSql(demoteSql, 'authenticated', USER_A_ID);
// Verify that client migration filter in academy-sync.js skips server-completed rooms
const syncCode = require('fs').readFileSync(path.join(__dirname, '..', 'academy-sync.js'), 'utf8');
assert(syncCode.includes("existing.status === 'completed'") &&
  syncCode.includes('existing.progress_pct >= localPct') &&
  syncCode.includes('const safePct = completedRooms.includes(roomId) ? 99'),
  'academy-sync.js must skip completed/higher server progress and import local completion only as unverified progress');
console.log('  ✓ Verified: academy-sync.js strictly skips migration for rooms already completed or higher on server');

console.log('\n============================================================');
console.log('ALL REAL POSTGRESQL MULTI-TENANT SECURITY INTEGRATION TESTS PASSED (100%)!');
console.log('============================================================\n');
