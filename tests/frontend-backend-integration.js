'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('============================================================');
console.log('STARTING CALION ACADEMY FRONTEND-BACKEND INTEGRATION TEST');
console.log('============================================================\n');

// -----------------------------------------------------------------------------
// 1. Four Independent Learning Paths Verification
// -----------------------------------------------------------------------------
console.log('--- 1. Testing Four Independent Learning Paths (47 Rooms) ---');

const { CALION_STAGES, CALION_ROOMS } = require(path.join(ROOT_DIR, 'learning-data.js'));

assert.strictEqual(CALION_STAGES.length, 4, 'Must have exactly 4 learning stages');
assert.strictEqual(CALION_ROOMS.length, 47, 'Must have exactly 47 rooms');

const stageMap = {
  'pre-security': { expectedRooms: 10, title: 'Pre-Security', order: 1 },
  'cyber-security': { expectedRooms: 10, title: 'Cyber Security Foundations', order: 2 },
  'defensive-security': { expectedRooms: 12, title: 'Defensive Security', order: 3 },
  'offensive-security': { expectedRooms: 15, title: 'Offensive Security', order: 4 }
};

for (const [stageId, meta] of Object.entries(stageMap)) {
  const stageObj = CALION_STAGES.find(s => s.id === stageId);
  assert(stageObj, `Stage ${stageId} must exist in CALION_STAGES`);
  assert.strictEqual(stageObj.roomCount, meta.expectedRooms, `${stageId} metadata roomCount must be ${meta.expectedRooms}`);
  assert.strictEqual(stageObj.order, meta.order, `${stageId} order must be ${meta.order}`);

  const actualRooms = CALION_ROOMS.filter(r => r.stageId === stageId);
  assert.strictEqual(actualRooms.length, meta.expectedRooms, `${stageId} must contain exactly ${meta.expectedRooms} actual rooms`);
  console.log(`  ✓ ${stageObj.title} (${stageId}): exactly ${actualRooms.length} rooms verified`);
}

// -----------------------------------------------------------------------------
// 2. Script Load Order & AcademyXP Client Inclusion
// -----------------------------------------------------------------------------
console.log('\n--- 2. Testing Script Load Order & AcademyXP Integration on All Pages ---');

const CORE_PAGES = [
  'learning.html',
  'room.html',
  'lesson.html',
  'profile.html',
  'terminal-lab.html',
  'labs.html',
  'roadmap.html',
  'auth.html',
  'glossary.html'
];

CORE_PAGES.forEach(page => {
  const htmlPath = path.join(ROOT_DIR, page);
  assert(fs.existsSync(htmlPath), `${page} must exist`);
  const html = fs.readFileSync(htmlPath, 'utf8');

  const authIdx = html.indexOf('academy-auth.js');
  const xpIdx = html.indexOf('academy-xp-client.js');
  const syncIdx = html.indexOf('academy-sync.js');

  assert(authIdx !== -1, `${page} must include academy-auth.js`);
  assert(xpIdx !== -1, `${page} must include academy-xp-client.js`);
  assert(syncIdx !== -1, `${page} must include academy-sync.js`);

  assert(authIdx < xpIdx, `${page}: academy-auth.js must precede academy-xp-client.js`);
  assert(xpIdx < syncIdx, `${page}: academy-xp-client.js must precede academy-sync.js`);
  console.log(`  ✓ ${page}: Verified academy-auth.js -> academy-xp-client.js -> academy-sync.js order`);
});

// -----------------------------------------------------------------------------
// 3. Authoritative Contract & XP Module Verification
// -----------------------------------------------------------------------------
console.log('\n--- 3. Testing Authoritative Contract in academy-xp-client.js ---');

const AcademyXP = require(path.join(ROOT_DIR, 'academy-xp-client.js'));
assert(AcademyXP, 'AcademyXP client module must export cleanly');
assert.strictEqual(AcademyXP.CURRICULUM_ID, 'calion-academy-47-v1', 'Curriculum ID must be calion-academy-47-v1');
assert.strictEqual(typeof AcademyXP.submitAnswer, 'function', 'submitAnswer must be a function');
assert.strictEqual(typeof AcademyXP.submitLabFlag, 'function', 'submitLabFlag must be a function');
assert.strictEqual(typeof AcademyXP.getAuthoritativeTotal, 'function', 'getAuthoritativeTotal must be a function');

console.log('  ✓ Authoritative methods exported: submitAnswer, submitLabFlag, getAuthoritativeTotal');

// -----------------------------------------------------------------------------
// 4. Room & Lesson Interface Answer Handlers
// -----------------------------------------------------------------------------
console.log('\n--- 4. Testing Room and Lesson Answer Handling Architecture ---');

const roomHtml = fs.readFileSync(path.join(ROOT_DIR, 'room.html'), 'utf8');
const lessonHtml = fs.readFileSync(path.join(ROOT_DIR, 'lesson.html'), 'utf8');

// Assert both room and lesson integrate with AcademyXP
assert(roomHtml.includes('AcademyXP.submitAnswer'), 'room.html must wire up AcademyXP.submitAnswer');
assert(lessonHtml.includes('AcademyXP.submitAnswer'), 'lesson.html must wire up AcademyXP.submitAnswer');

// Assert rate limiting handling
assert(roomHtml.includes('rate_limited'), 'room.html must handle rate_limited response code');
assert(lessonHtml.includes('rate_limited'), 'lesson.html must handle rate_limited response code');

// Assert server check failure handling
assert(roomHtml.includes('serverCheckFailed'), 'room.html must handle server check failures gracefully');
assert(lessonHtml.includes('serverCheckFailed'), 'lesson.html must handle server check failures gracefully');
for (const [page, html] of [['room.html', roomHtml], ['lesson.html', lessonHtml]]) {
  assert(html.includes("'auth_required'") && html.includes('Your sign-in session expired'), `${page} must explain expired sessions without treating them as wrong answers`);
  assert(html.includes("'auth_changed'") && html.includes('Your account changed while the answer was being checked'), `${page} must not apply a response to a different account`);
}

// Assert button busy / disabled state during submission
assert(roomHtml.includes('aria-busy'), 'room.html must set aria-busy / disable button during RPC');
assert(lessonHtml.includes('aria-busy'), 'lesson.html must set aria-busy / disable button during RPC');

// Assert authoritative total XP update
assert(roomHtml.includes('AcademyState.KEYS.XP, checked.totalXP'), 'room.html must update state XP from checked.totalXP');
assert(lessonHtml.includes('AcademyState.KEYS.XP, checked.totalXP'), 'lesson.html must update state XP from checked.totalXP');

console.log('  ✓ room.html: AcademyXP submission, rate limit guards, server check feedback, and button loading verified');
console.log('  ✓ lesson.html: AcademyXP submission, rate limit guards, server check feedback, and button loading verified');

// -----------------------------------------------------------------------------
// 5. Navigation & Path Isolation Guards
// -----------------------------------------------------------------------------
console.log('\n--- 5. Testing Navigation Isolation & Redirects ---');

// Assert pathRoom bounds in room.html
assert(roomHtml.includes('const pathRooms = allRooms.filter(r => r.stageId === room.stageId);'), 'room.html must scope prev/next navigation to current path');
assert(roomHtml.includes('const prevRoom = pathIdx > 0 ? pathRooms[pathIdx - 1] : null;'), 'room.html prevRoom must only traverse within path');
assert(roomHtml.includes('const nextRoom = pathIdx >= 0 && pathIdx < pathRooms.length - 1 ? pathRooms[pathIdx + 1] : null;'), 'room.html nextRoom must only traverse within path');

// Assert redirects configuration in _redirects
const redirectsContent = fs.readFileSync(path.join(ROOT_DIR, '_redirects'), 'utf8');
assert(redirectsContent.includes('/modules       / 301'), '_redirects must redirect /modules to /');
assert(redirectsContent.includes('/modules.html  / 301'), '_redirects must redirect /modules.html to /');
assert(redirectsContent.includes('/module.html   / 301'), '_redirects must redirect /module.html to /');
assert(redirectsContent.includes('/roadmap.html  / 301'), '_redirects must redirect /roadmap.html to /');

console.log('  ✓ Intra-path navigation bounds strictly isolate each of the 4 learning paths');
console.log('  ✓ Legacy /modules and legacy roadmap routes strictly redirect to Academy home');

// -----------------------------------------------------------------------------
// 6. Authoritative XP Display & Sync Integration
// -----------------------------------------------------------------------------
console.log('\n--- 6. Testing Authoritative XP Display & Synchronization ---');

const navJs = fs.readFileSync(path.join(ROOT_DIR, 'academy-nav.js'), 'utf8');
assert(navJs.includes('syncHeaderStats'), 'academy-nav.js must export syncHeaderStats');
assert(navJs.includes('profiles') && navJs.includes('total_xp'), 'academy-nav.js must query profiles.total_xp for authenticated cadets');

const syncJs = fs.readFileSync(path.join(ROOT_DIR, 'academy-sync.js'), 'utf8');
assert(syncJs.includes('xpState.total_xp'), 'academy-sync.js pullServerProgress must store authoritative total_xp');
assert(syncJs.includes('calion-progress-updated'), 'academy-sync.js must emit calion-progress-updated event');

console.log('  ✓ academy-nav.js reflects authoritative profiles.total_xp for authenticated users');
console.log('  ✓ academy-sync.js syncs authoritative total_xp on pullServerProgress');

console.log('\n============================================================');
console.log('ALL FRONTEND-BACKEND INTEGRATION TESTS PASSED (100%)!');
console.log('============================================================\n');
