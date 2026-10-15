// End-to-end verification for lab-headers (HTTP Security Headers Hardening)
const assert = require('assert');
const LabEngine = require('../lab-engine.js');

let failures = 0;
const recordFail = (msg) => { failures++; console.error(msg); };

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${e.message}`);
    recordFail(`    ${e.message}`);
  }
}

(async () => {
  console.log('\n=== HTTP Security Headers Lab (lab-headers) End-to-End Test ===');

  LabEngine.resetLab('lab-headers');

  await test('Task 1: curl -I inspects server response headers', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('HTTP/1.1 200 OK'));
    assert.ok(res.stdout.includes('Server: Apache/2.4.41'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await test('Task 2: curl -I | grep -i strict identifies missing HSTS', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i strict');
    assert.strictEqual(res.exitCode, 1, 'Absence of HSTS header causes grep to return exit code 1');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await test('Task 3: curl -I | grep -i frame identifies missing X-Frame-Options', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i frame');
    assert.strictEqual(res.exitCode, 1, 'Absence of X-Frame-Options causes grep to return exit code 1');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await test('Task 4: curl -I | grep -i set-cookie audits cookie flags', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i set-cookie');
    assert.strictEqual(res.exitCode, 0, 'Set-Cookie is present so grep returns exit code 0');
    assert.ok(res.stdout.includes('Set-Cookie: session_id=abc12345; Path=/'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  await test('Task 5: cat /etc/nginx/conf.d/security.conf retrieves compliance config and flag', async () => {
    const res = await LabEngine.execute('lab-headers', 'cat /etc/nginx/conf.d/security.conf');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{strict_transport_security_csp}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [4]);
  });

  await test('Flag Verification: submit authoritative flag token', () => {
    const res = LabEngine.verifyFlag('lab-headers', 'flag{strict_transport_security_csp}');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.xp, 75);
  });

  if (failures > 0) {
    console.error(`\n${failures} test(s) failed in header-lab.js`);
    process.exit(1);
  } else {
    console.log('\nAll lab-headers end-to-end tests passed.\n');
    process.exit(0);
  }
})();
