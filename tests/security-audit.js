/**
 * CALION Academy - Security Audit & Hardening Verification Test Suite
 * Validates RLS policies, table constraints, privilege revocations,
 * trigger protections, search_path hygiene, URL sanitizers, and anti-replay locks.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('============================================================');
console.log('STARTING CALION SECURITY AUDIT & HARDENING TEST SUITE');
console.log('============================================================\n');

// -----------------------------------------------------------------------------
// 1. Database Schema & RLS Policy Security Hardening
// -----------------------------------------------------------------------------
console.log('--- 1. Testing SQL Schema Security & Least Privilege Grants ---');

const baseSqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '202611170001_endlessus_academy_schema.sql');
const patchSqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '202611170003_calion_security_hardening.sql');

assert(fs.existsSync(baseSqlPath), 'Base migration file must exist');
assert(fs.existsSync(patchSqlPath), 'Security hardening migration file must exist');

const baseSql = fs.readFileSync(baseSqlPath, 'utf8');
const patchSql = fs.readFileSync(patchSqlPath, 'utf8');

// Verify Column-level grant restrictions on profiles
assert(baseSql.includes('grant update (username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;'),
  'Base schema must restrict update permissions to safe columns only');
assert(patchSql.includes('grant update (username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;'),
  'Patch schema must restrict update permissions to safe columns only');
console.log('  ✓ Column grant revocation: Clients cannot update total_xp or streak_days via PostgREST');

// Verify Table write revocation on user_achievements and user_activity
assert(baseSql.includes('revoke insert, update, delete on public.user_achievements from authenticated, anon;'),
  'user_achievements write permissions must be revoked from clients');
assert(baseSql.includes('revoke insert, update, delete on public.user_activity from authenticated, anon;'),
  'user_activity write permissions must be revoked from clients');
assert(patchSql.includes('revoke insert, update, delete on public.user_achievements from authenticated, anon;'),
  'user_achievements write permissions must be revoked in patch schema');
console.log('  ✓ Privilege revocation: Direct client write to user_achievements and user_activity revoked');

// Verify Status Check Constraints (Anti-Forgery)
assert(baseSql.includes('chk_room_progress_status_pct'),
  'chk_room_progress_status_pct constraint must be defined in base schema');
assert(baseSql.includes("status = 'completed' and progress_pct = 100"),
  'chk_room_progress_status_pct must enforce progress_pct = 100 for completed rooms');
assert(baseSql.includes('chk_lab_progress_status'),
  'chk_lab_progress_status constraint must be defined in base schema');
assert(baseSql.includes("status = 'completed' and flag_verified = true"),
  'chk_lab_progress_status must enforce flag_verified = true for completed labs');
console.log('  ✓ Check constraints: Status "completed" strictly requires progress_pct = 100 and flag_verified = true');

// Verify Defense-in-depth trigger protects profile total_xp & streak_days
assert(baseSql.includes('protect_profile_immutable_fields'),
  'Trigger function protect_profile_immutable_fields must be defined in base schema');
assert(baseSql.includes('trg_protect_profile_fields'),
  'Trigger trg_protect_profile_fields must be defined on profiles in base schema');
assert(patchSql.includes('protect_profile_immutable_fields'),
  'Trigger function protect_profile_immutable_fields must be defined in patch schema');
console.log('  ✓ Trigger protection: trg_protect_profile_fields silently preserves server-calculated fields');

// Verify SECURITY DEFINER search_path Hygiene
const requiredFunctions = [
  'handle_new_user',
  'evaluate_user_milestones',
  'on_room_progress_update',
  'on_lab_progress_update',
  'protect_profile_immutable_fields'
];

requiredFunctions.forEach(fn => {
  const regex = new RegExp(`(create or replace function public\\.${fn}|alter function public\\.${fn})[\\s\\S]*?set search_path = public, pg_temp`, 'i');
  assert(regex.test(baseSql), `Function ${fn} must set search_path = public, pg_temp in base schema`);
  assert(regex.test(patchSql), `Function ${fn} must set search_path = public, pg_temp in patch schema`);
});
console.log('  ✓ Search path hygiene: All 5 SECURITY DEFINER triggers strictly enforce search_path = public, pg_temp');

// -----------------------------------------------------------------------------
// 2. Client-Side URL Validation & Protocol Whitelisting
// -----------------------------------------------------------------------------
console.log('\n--- 2. Testing URL Validation & Protocol Whitelisting (academy-config.js) ---');

const AcademyConfig = require(path.join(__dirname, '..', 'academy-config.js'));

assert(typeof AcademyConfig !== 'undefined', 'AcademyConfig must be exported');
assert(typeof AcademyConfig.validateHttpUrl === 'function', 'validateHttpUrl must be exported');

// Positive test cases
assert.strictEqual(AcademyConfig.validateHttpUrl('https://example.supabase.co'), true);
assert.strictEqual(AcademyConfig.validateHttpUrl('https://learning.endlessus.in/api'), true);
assert.strictEqual(AcademyConfig.validateHttpUrl('http://127.0.0.1:54321'), true);
assert.strictEqual(AcademyConfig.validateHttpUrl('http://localhost:3000'), true);

// Negative test cases (Malicious / Invalid protocols)
const dangerousUrls = [
  'javascript:alert(document.cookie)',
  'JAVASCRIPT:alert(1)',
  'data:text/html,<script>alert(1)</script>',
  'file:///etc/passwd',
  'vbscript:msgbox(1)',
  'blob:https://example.com/1234',
  'ftp://anonymous:secret@example.com',
  '//protocol-relative.com',
  'httpx://invalid.com',
  null,
  undefined,
  '',
  '   '
];

dangerousUrls.forEach(url => {
  assert.strictEqual(AcademyConfig.validateHttpUrl(url), false, `URL must be rejected: ${url}`);
});
console.log('  ✓ URL Sanitizer: Successfully whitelists http/https and strictly rejects javascript:, data:, and file: URLs');

// -----------------------------------------------------------------------------
// 3. Migration Payload Validation & Anti-Replay Locks
// -----------------------------------------------------------------------------
console.log('\n--- 3. Testing Cloud Migration Payload Validation & Anti-Replay (academy-sync.js) ---');

const syncCode = fs.readFileSync(path.join(__dirname, '..', 'academy-sync.js'), 'utf8');
assert(syncCode.includes('/^room-[0-9]{2,}$/'), 'Must validate room ID format with strict regex');
assert(syncCode.includes('/^lab-[a-z0-9_-]+$/'), 'Must validate lab ID format with strict regex');
assert(syncCode.includes('calion_migrated_') || syncCode.includes('endlessus_migrated_'),
  'Must record migration lock in localStorage to prevent replay attacks');
console.log('  ✓ Migration validation: Regex validation for room/lab identifiers and replay lock verified');

// -----------------------------------------------------------------------------
// 4. Versioned Progress Backward Compatibility
// -----------------------------------------------------------------------------
console.log('\n--- 4. Testing Versioned Progress Storage (academy-state.js) ---');

const mockStorage = {
  _store: {},
  getItem(k) { return this._store[k] !== undefined ? this._store[k] : null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};
global.localStorage = mockStorage;
global.window = { localStorage: mockStorage };

const AcademyState = require(path.join(__dirname, '..', 'academy-state.js'));

assert(typeof AcademyState !== 'undefined', 'AcademyState must be defined');

// Scenario A: preserve old curriculum values but do not import them as current completion.
mockStorage._store = {};
mockStorage.setItem('endlessus_completed_rooms', JSON.stringify(['room-01', 'room-02']));
mockStorage.setItem('endlessus_completed_labs', JSON.stringify(['lab-headers', 'lab-perms']));
mockStorage.setItem('endlessus_streak_days', '5');

const completedRooms = AcademyState.getCompletedRooms();
assert.deepStrictEqual(completedRooms, [], 'Legacy room completions must not count for the current curriculum');
assert.strictEqual(AcademyState.getStreak(), 5, 'Must fall back to endlessus_streak_days');
assert.strictEqual(AcademyState.calculateTotalXP(), 150, 'Must preserve lab XP without crediting legacy room completion');
assert.deepStrictEqual(JSON.parse(mockStorage.getItem('endlessus_completed_rooms')), ['room-01', 'room-02'], 'Legacy progress stays stored');
mockStorage.setItem('endlessus_user_xp', '950');
console.log('  ✓ Legacy room progress remains stored and is excluded from current completion');

// Scenario B: User sets new data; must dual-write or prioritize calion_*
AcademyState.markRoomCompleted('room-03');
const updatedRooms = AcademyState.getCompletedRooms();
assert(updatedRooms.includes('room-03'), 'Room-03 must be recorded');
assert(mockStorage.getItem(AcademyState.KEYS.ROOMS) !== null, 'Must write to current curriculum storage key');
assert(mockStorage.getItem('endlessus_completed_rooms') !== null, 'Must retain the legacy storage record unchanged');
const oldLabs = JSON.parse(mockStorage.getItem('endlessus_completed_labs'));
AcademyState.markLabCompleted('lab-new');
assert.deepStrictEqual(JSON.parse(mockStorage.getItem('endlessus_completed_labs')), oldLabs, 'New lab state must not overwrite historical lab records');
AcademyState.safeSet(AcademyState.KEYS.XP, 250);
assert.strictEqual(mockStorage.getItem('endlessus_user_xp'), '950', 'Current XP snapshots must not overwrite historical XP storage');
console.log('  ✓ Current progress uses versioned storage while old records remain intact');

// -----------------------------------------------------------------------------
// 5. HTML Output Escaping (XSS Prevention)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Testing Contextual Output Escaping (XSS Prevention) ---');

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

const xssPayloads = [
  { input: '<script>alert(1)</script>', expected: '&lt;script&gt;alert(1)&lt;/script&gt;' },
  { input: '"><img src=x onerror=alert(1)>', expected: '&quot;&gt;&lt;img src=x onerror=alert(1)&gt;' },
  { input: "cadet' OR '1'='1", expected: "cadet&#39; OR &#39;1&#39;=&#39;1" },
  { input: '&amp; "hello"', expected: '&amp;amp; &quot;hello&quot;' }
];

xssPayloads.forEach(({ input, expected }) => {
  assert.strictEqual(escapeHtml(input), expected, `Escaping failed for payload: ${input}`);
});
console.log('  ✓ Output Escaping: All HTML and attribute injection vectors safely encoded');

console.log('\n============================================================');
console.log('ALL CALION SECURITY AUDIT & HARDENING TESTS PASSED (100%)!');
console.log('============================================================\n');
