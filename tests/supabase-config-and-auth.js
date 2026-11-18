/**
 * CALION Academy — Supabase Production Configuration & Auth Verification Test Suite
 * 
 * Verifies:
 * 1. Build-time generation of dist/calion-runtime-config.js from environment variables
 * 2. Strict rejection of service_role keys & secrets
 * 3. Script loading order (calion-runtime-config.js preceding academy-config.js) across all 9 pages
 * 4. Gitignore enforcement preventing credential leakage
 * 5. Complete removal of manual Supabase credential forms and config drawers
 * 6. Graceful unconfigured / offline state presentation (no credential prompts for visitors)
 * 7. AcademyConfig precedence (runtime globals > storage > defaults)
 * 8. Supabase Client Provider & Auth integration
 * 9. RLS Policy & SQL Schema security compliance across all 10 Academy tables
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('============================================================');
console.log('STARTING CALION SUPABASE CONFIG & AUTH VERIFICATION SUITE');
console.log('============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const builder = require('../scripts/build-pages.js');

// -----------------------------------------------------------------------------
// 1. Build-Time Runtime Config Generation
// -----------------------------------------------------------------------------
console.log('--- 1. Testing Build-Time Configuration Generation ---');

const testUrl = 'https://calion-academy-prod.supabase.co';
// Standard anon JWT mock (role = "anon")
const anonJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbGlvbiIsInJvbGUiOiJhbm9uIn0.signature';

const content = builder.generateRuntimeConfigContent({ url: testUrl, anonKey: anonJwt });
assert(content.includes('root.CALION_SUPABASE_URL = "https://calion-academy-prod.supabase.co"'), 'Runtime config must contain escaped URL');
assert(content.includes(`root.CALION_SUPABASE_ANON_KEY = "${anonJwt}"`), 'Runtime config must contain anon key');
assert(!content.includes('service_role'), 'Runtime config must not reference service_role');
console.log('  ✓ Runtime config file generation content verified');

// -----------------------------------------------------------------------------
// 2. Strict Rejection of service_role Keys & Secret Protection
// -----------------------------------------------------------------------------
console.log('\n--- 2. Testing Security Guards & service_role Key Rejection ---');

// Case A: Keyword check
assert.throws(() => {
  builder.assertNotServiceRoleKey('some-key-with-service_role-inside');
}, /CRITICAL SECURITY ERROR/, 'Must throw on service_role keyword');

// Case B: JWT claim check (role = "service_role")
const serviceRoleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbGlvbiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUifQ.signature';
assert.throws(() => {
  builder.assertNotServiceRoleKey(serviceRoleJwt);
}, /service_role JWT/, 'Must throw on service_role JWT claim');

// Case C: Valid anon key must pass
assert.doesNotThrow(() => {
  builder.assertNotServiceRoleKey(anonJwt);
}, 'Valid anon key must pass assertion');
console.log('  ✓ Strict anti-service_role defense-in-depth verified');

// -----------------------------------------------------------------------------
// 3. Local Development .env File Support
// -----------------------------------------------------------------------------
console.log('\n--- 3. Testing Local Dev .env Parsing ---');

const tempEnvPath = path.join(ROOT_DIR, '.env.test_tmp');
fs.writeFileSync(tempEnvPath, `
# Test comment
CALION_SUPABASE_URL="https://local-test.supabase.co"
CALION_SUPABASE_ANON_KEY='test_anon_key_single_quote'
UNRELATED_KEY=unrelated_value
`, 'utf8');

try {
  const parsed = builder.parseEnvFile(tempEnvPath);
  assert.strictEqual(parsed.CALION_SUPABASE_URL, 'https://local-test.supabase.co');
  assert.strictEqual(parsed.CALION_SUPABASE_ANON_KEY, 'test_anon_key_single_quote');
  assert.strictEqual(parsed.UNRELATED_KEY, 'unrelated_value');
  console.log('  ✓ Zero-dependency .env parser verified');
} finally {
  if (fs.existsSync(tempEnvPath)) fs.unlinkSync(tempEnvPath);
}

// -----------------------------------------------------------------------------
// 4. Gitignore Enforcement
// -----------------------------------------------------------------------------
console.log('\n--- 4. Testing Gitignore Policy Enforcement ---');

const gitignore = fs.readFileSync(path.join(ROOT_DIR, '.gitignore'), 'utf8');
assert(gitignore.includes('calion-runtime-config.js'), '.gitignore must ignore calion-runtime-config.js');
assert(gitignore.includes('/dist/'), '.gitignore must ignore /dist/');
assert(gitignore.includes('.env'), '.gitignore must ignore .env files');
console.log('  ✓ Gitignore policy strictly prevents credential tracking');

// -----------------------------------------------------------------------------
// 5. Script Load Order on All Relevant Academy Pages
// -----------------------------------------------------------------------------
console.log('\n--- 5. Testing Script Load Order on All 9 Academy Pages ---');

const ACADEMY_PAGES = [
  'auth.html',
  'learning.html',
  'lesson.html',
  'module.html',
  'modules.html',
  'profile.html',
  'roadmap.html',
  'room.html',
  'labs.html'
];

ACADEMY_PAGES.forEach(page => {
  const srcPath = path.join(ROOT_DIR, page);
  assert(fs.existsSync(srcPath), `${page} must exist in source root`);
  const srcContent = fs.readFileSync(srcPath, 'utf8');

  const runtimeIdx = srcContent.indexOf('calion-runtime-config.js');
  const academyIdx = srcContent.indexOf('academy-config.js');

  assert(runtimeIdx !== -1, `${page} must include calion-runtime-config.js`);
  assert(academyIdx !== -1, `${page} must include academy-config.js`);
  assert(runtimeIdx < academyIdx, `${page}: calion-runtime-config.js must load BEFORE academy-config.js`);
  console.log(`  ✓ ${page}: Verified calion-runtime-config.js precedes academy-config.js`);
});

// -----------------------------------------------------------------------------
// 6. Complete Removal of Public Credential Form in auth.html
// -----------------------------------------------------------------------------
console.log('\n--- 6. Testing Complete Removal of Public Credential Form ---');

const authHtml = fs.readFileSync(path.join(ROOT_DIR, 'auth.html'), 'utf8');

// The public credential entry drawer elements must be completely absent
const prohibitedElements = [
  'id="config-drawer"',
  'id="cfg-url"',
  'id="cfg-anon-key"',
  'id="btn-save-config"',
  'id="btn-toggle-config"',
  'Configure Supabase Keys'
];

prohibitedElements.forEach(item => {
  assert(!authHtml.includes(item), `auth.html must NOT contain "${item}"`);
});

// Status alert must be present
assert(authHtml.includes('id="unconfigured-alert"'), 'auth.html must have unconfigured status alert');
assert(authHtml.includes('Account Services Temporarily Offline'), 'auth.html must inform visitor of offline status');
assert(authHtml.includes('guest mode'), 'auth.html must inform visitor of guest mode availability');
console.log('  ✓ Public credential entry form and configuration drawer completely removed');

// -----------------------------------------------------------------------------
// 7. AcademyConfig Runtime Precedence & Verification
// -----------------------------------------------------------------------------
console.log('\n--- 7. Testing AcademyConfig Priority & Fallback Logic ---');

// Mock browser globals
const memoryStorage = {};
global.localStorage = {
  getItem: (k) => (Object.prototype.hasOwnProperty.call(memoryStorage, k) ? memoryStorage[k] : null),
  setItem: (k, v) => { memoryStorage[k] = String(v); },
  removeItem: (k) => { delete memoryStorage[k]; }
};

global.CustomEvent = function (name, opts) {
  this.name = name;
  this.detail = opts ? opts.detail : null;
};

global.window = {
  CALION_SUPABASE_URL: 'https://prod-runtime.supabase.co',
  CALION_SUPABASE_ANON_KEY: anonJwt,
  localStorage: global.localStorage,
  dispatchEvent: () => {},
  addEventListener: () => {}
};

// Clear require cache for fresh AcademyConfig
delete require.cache[require.resolve('../academy-config.js')];
const AcademyConfig = require('../academy-config.js');

// Runtime globals take precedence
assert.strictEqual(AcademyConfig.isConfigured(), true);
let cfg = AcademyConfig.getStoredConfig();
assert.strictEqual(cfg.url, 'https://prod-runtime.supabase.co');
assert.strictEqual(cfg.anonKey, anonJwt);
assert.strictEqual(cfg.source, 'runtime');
console.log('  ✓ Authoritative runtime configuration precedence verified');

// When runtime is absent, fallback to localStorage
delete global.window.CALION_SUPABASE_URL;
delete global.window.CALION_SUPABASE_ANON_KEY;
AcademyConfig.setConfig('https://storage-fallback.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.storage_anon_key_for_testing');
cfg = AcademyConfig.getStoredConfig();
assert.strictEqual(cfg.url, 'https://storage-fallback.supabase.co');
assert.strictEqual(cfg.source, 'storage');
console.log('  ✓ Local storage fallback for dev/testing verified');

// When both absent, isConfigured returns false
global.localStorage.removeItem('calion_supabase_url');
global.localStorage.removeItem('calion_supabase_anon_key');
global.localStorage.removeItem('endlessus_supabase_url');
global.localStorage.removeItem('endlessus_supabase_anon_key');
assert.strictEqual(AcademyConfig.isConfigured(), false);
console.log('  ✓ Clean unconfigured detection verified');

// -----------------------------------------------------------------------------
// 8. Supabase Auth Integration & Client Instantiation
// -----------------------------------------------------------------------------
console.log('\n--- 8. Testing Supabase Auth Provider Integration ---');

// Configure test environment with mock supabase library
let clientCreatedWith = null;
global.window.supabase = {
  createClient: (url, key, opts) => {
    clientCreatedWith = { url, key, opts };
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signUp: async (creds) => ({ data: { user: { id: 'usr-123', email: creds.email }, session: { user: { id: 'usr-123' } } }, error: null }),
        signInWithPassword: async (creds) => ({ data: { user: { id: 'usr-123', email: creds.email }, session: { user: { id: 'usr-123' } } }, error: null }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: (tbl) => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({
              data: {
                id: 'usr-123',
                username: 'cadet_test',
                display_name: 'Test Cadet',
                is_public: true,
                total_xp: 0,
                streak_days: 0
              },
              error: null
            })
          })
        }),
        insert: () => ({
          select: () => ({
            single: async () => ({
              data: {
                id: 'usr-123',
                username: 'cadet_test',
                display_name: 'Test Cadet',
                is_public: true,
                total_xp: 0,
                streak_days: 0
              },
              error: null
            })
          })
        })
      })
    };
  }
};

AcademyConfig.setConfig('https://auth-test.supabase.co', anonJwt);
delete require.cache[require.resolve('../academy-auth.js')];
const AcademyAuth = require('../academy-auth.js');

AcademyAuth.init().then(async () => {
  assert(clientCreatedWith !== null, 'Supabase client must be instantiated via createClient');
  assert.strictEqual(clientCreatedWith.url, 'https://auth-test.supabase.co');
  assert.strictEqual(clientCreatedWith.key, anonJwt);

  const signUpRes = await AcademyAuth.signUp({
    email: 'learner@example.com',
    password: 'Password123!',
    username: 'cadet_test',
    displayName: 'Test Cadet'
  });
  assert(signUpRes.success, 'SignUp must succeed through AcademyAuth');

  const signInRes = await AcademyAuth.signIn({
    email: 'learner@example.com',
    password: 'Password123!'
  });
  assert(signInRes.success, 'SignIn must succeed through AcademyAuth');
  console.log('  ✓ Supabase auth client provider integration verified');

  // -----------------------------------------------------------------------------
  // 9. SQL Schema & RLS Policy Enforcement
  // -----------------------------------------------------------------------------
  console.log('\n--- 9. Testing Database Schema & RLS Enforcement ---');

  const baseSchema = fs.readFileSync(path.join(ROOT_DIR, 'supabase', 'migrations', '202611170001_endlessus_academy_schema.sql'), 'utf8');
  const hardeningSchema = fs.readFileSync(path.join(ROOT_DIR, 'supabase', 'migrations', '202611170003_calion_security_hardening.sql'), 'utf8');

  const TABLES = [
    'profiles',
    'learning_paths',
    'rooms',
    'room_progress',
    'labs',
    'lab_progress',
    'task_progress',
    'achievements',
    'user_achievements',
    'user_activity'
  ];

  TABLES.forEach(tbl => {
    assert(baseSchema.includes(`alter table public.${tbl} enable row level security`), `RLS must be enabled on ${tbl}`);
  });

  // Verify column grants
  assert(hardeningSchema.includes('grant update (username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;'),
    'Authenticated users may only update self-profile safe fields');
  assert(hardeningSchema.includes('revoke insert, update, delete on public.user_achievements from authenticated, anon;'),
    'user_achievements direct write revoked');
  assert(hardeningSchema.includes('revoke insert, update, delete on public.user_activity from authenticated, anon;'),
    'user_activity direct write revoked');

  console.log('  ✓ All 10 tables have Row Level Security enabled');
  console.log('  ✓ Privilege revocation & column-level protections verified');

  console.log('\n============================================================');
  console.log('ALL CALION SUPABASE CONFIG & AUTH VERIFICATIONS PASSED (100%)!');
  console.log('============================================================\n');
}).catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
