// Focused regression tests for LabEngine.verifyFlag
// These tests validate proper flag verification behavior across edge cases.

const assert = require('assert');
const LabEngine = require('../lab-engine.js');

let failures = 0;
const recordFail = (msg) => { failures++; console.error(msg); };

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name} FAILED`);
    recordFail(`    ${e.message}`);
  }
}

// 1. Bypass test (numeric alias)
test('Flag bypass numeric alias should be rejected', () => {
  const res = LabEngine.verifyFlag('lab-permissions', '600');
  assert.strictEqual(res.success, false, 'Numeric alias should not be accepted');
});

// 2. Correct primary flag accepted
test('Correct flag token should be accepted', () => {
  const res = LabEngine.verifyFlag('lab-permissions', 'flag{chmod_600_config_rw}');
  assert.strictEqual(res.success, true, 'Correct flag should be accepted');
});

// 3. Random incorrect flag
test('Random incorrect flag should be rejected', () => {
  const res = LabEngine.verifyFlag('lab-permissions', 'flag{random_invalid}');
  assert.strictEqual(res.success, false, 'Random flag should be rejected');
});

// 4. Empty flag input
test('Empty flag should be rejected', () => {
  const res = LabEngine.verifyFlag('lab-permissions', '');
  assert.strictEqual(res.success, false, 'Empty flag should be rejected');
});

// 5. Partial flag token
test('Partial flag token should be rejected', () => {
  const res = LabEngine.verifyFlag('lab-permissions', 'flag{chmod_600');
  assert.strictEqual(res.success, false, 'Partial flag should be rejected');
});

// 6. Flag from another lab should be rejected for this lab
test('Flag from another lab should be rejected', () => {
  const res = LabEngine.verifyFlag('lab-permissions', 'flag{strict_transport_security_csp}');
  assert.strictEqual(res.success, false, 'Flag from another lab should not be accepted');
});

// 7. Unknown lab ID should safely return failure
test('Unknown lab ID should return failure without throwing', () => {
  const res = LabEngine.verifyFlag('lab-unknown', 'flag{anything}');
  assert.strictEqual(res.success, false, 'Unknown lab should not succeed');
});

if (failures > 0) {
  console.error(`\n${failures} flag verification test(s) failed.`);
  process.exit(1);
} else {
  console.log('\nAll flag verification tests passed.');
  process.exit(0);
}
