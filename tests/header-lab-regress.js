// Comprehensive regression test suite for HTTP security headers lab
const assert = require('assert');
const LabEngine = require('../lab-engine.js');

let failures = 0;
const recordFail = (msg) => { failures++; console.error(msg); };

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name} FAILED`);
    recordFail(`    ${e.message}`);
  }
}

(async () => {
  console.log('\n=== HTTP Security Headers Regression Suite (header-lab-regress.js) ===');

  // 1. Successful HSTS workflow
  await test('HSTS workflow: curl -I piped to grep -i strict completes task 2', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i strict');
    assert.strictEqual(res.exitCode, 1, 'Absent header produces grep exitCode 1');
    assert.strictEqual(res.stdout, '', 'No output when header is absent');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  // 2. Alternate valid syntax for HSTS
  await test('HSTS workflow: curl -I piped to grep -i hsts completes task 2', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i hsts');
    assert.strictEqual(res.exitCode, 1);
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  // 3. Successful X-Frame-Options workflow
  await test('X-Frame-Options workflow: curl -I piped to grep -i frame completes task 3', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i frame');
    assert.strictEqual(res.exitCode, 1, 'Absent header produces grep exitCode 1');
    assert.strictEqual(res.stdout, '', 'No output when header is absent');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  // 4. Matching grep pattern when header line exists
  await test('Matching grep pattern returns exit code 0 and matching lines', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'cat /etc/nginx/conf.d/security.conf | grep -i strict');
    assert.strictEqual(res.exitCode, 0, 'Matching lines produce exit code 0');
    assert.ok(res.stdout.includes('Strict-Transport-Security'));
  });

  // 5. Non-matching grep pattern against server headers
  await test('Non-matching grep pattern returns exit code 1 and empty stdout', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i non_existent_header');
    assert.strictEqual(res.exitCode, 1);
    assert.strictEqual(res.stdout, '');
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  // 6. Incorrect commands must not complete Task 2
  await test('Incorrect commands (echo strict) must not complete HSTS task', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'echo strict');
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await test('Reading audit notes with grep strict must not complete HSTS task', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'cat audit_notes.txt | grep -i strict');
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await test('curl without -I/headers flag must not complete HSTS task', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl https://staging.acmefin.local | grep -i strict');
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await test('curl to invalid target must not complete HSTS task', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl -I https://unknown.invalid.local | grep -i strict');
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await test('grep with missing pattern errors and does not complete task', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep');
    assert.strictEqual(res.exitCode, 2, 'Missing pattern produces exitCode 2');
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  // 7. Pipeline command restriction enforcement
  await test('Pipeline combining permitted tool with restricted tool is rejected', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | wc -l');
    assert.strictEqual(res.exitCode, 127);
    assert.ok(res.feedback && res.feedback.type === 'tool_restricted');
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await test('Chained operator with restricted tool on left is rejected before execution', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'nmap staging.acmefin.local && echo done');
    assert.strictEqual(res.exitCode, 127);
    assert.ok(res.feedback && res.feedback.type === 'tool_restricted');
  });

  await test('Chained operator with restricted tool on right is rejected when reached', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'echo ok && nmap staging.acmefin.local');
    assert.strictEqual(res.exitCode, 127);
    assert.ok(res.feedback && res.feedback.type === 'tool_restricted');
  });

  await test('Short-circuit OR (||) skips restricted tool when LHS succeeds', async () => {
    LabEngine.resetLab('lab-headers');
    const res = await LabEngine.execute('lab-headers', 'echo ok || nmap staging.acmefin.local');
    assert.strictEqual(res.exitCode, 0);
    assert.strictEqual(res.stdout.trim(), 'ok');
  });

  if (failures > 0) {
    console.error(`\n${failures} regression test(s) failed in header-lab-regress.js`);
    process.exit(1);
  } else {
    console.log('\nAll HTTP security headers regression tests passed.\n');
    process.exit(0);
  }
})();
