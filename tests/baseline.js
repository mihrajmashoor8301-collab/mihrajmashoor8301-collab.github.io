// Baseline verification test suite for Endlessus Learning Hub
// This suite runs alongside the existing test-terminals.js but does NOT modify production code.
// It uses only Node's built-in assert module.

const assert = require('assert');
const LabEngine = require('../lab-engine.js'); // engine singleton
const fs = require('fs');
const path = require('path');

// Helper to run async LabEngine.execute and return result
async function run(labId, cmd) {
  return await LabEngine.execute(labId, cmd);
}

(async () => {
  console.log('\n=== Baseline Test Suite ===');

  let failures = 0;
  const recordFail = (msg) => { failures++; console.error(msg); };

  // 1. Flag validation bypass test (expected to FAIL if bypass exists)
  try {
    const res = LabEngine.verifyFlag('lab-permissions', '600');
    // Expect success to be false; if true, this is a bypass.
    assert.strictEqual(res.success, false, 'Flag bypass should NOT succeed for generic alias');
    console.log('  ✓ Flag validation bypass test passed');
  } catch (err) {
    console.error('  ✗ Flag validation bypass test FAILED');
    recordFail('    ' + err.message);
  }

  // 2. Correct flag verification (sanity check)
  try {
    const res = LabEngine.verifyFlag('lab-headers', 'flag{strict_transport_security_csp}');
    assert.strictEqual(res.success, true, 'Correct flag should be accepted');
    console.log('  ✓ Correct flag verification test passed');
  } catch (err) {
    console.error('  ✗ Correct flag verification test FAILED');
    recordFail('    ' + err.message);
  }

  // 3. Parser operator edge cases
  const parserTests = [
    { cmd: 'echo "Hello World"', expectOut: 'Hello World' },
    { cmd: 'echo Hello\\ World', expectOut: 'Hello World' },
    { cmd: 'echo foo && echo bar', expectOut: 'foo\nbar' },
    { cmd: 'false || echo ok', expectTool: 'false' }, // false not allowed, expect tool_restricted
    { cmd: 'echo out > out.txt', expectOut: '' },
    { cmd: 'echo more >> out.txt', expectOut: '' },
    { cmd: 'cat out.txt', expectOut: 'out\nmore' },
    { cmd: 'echo foo | wc -c', expectTool: 'wc' } // wc not allowed
  ];

  for (const { cmd, expectOut, expectTool } of parserTests) {
    try {
      const res = await run('lab-permissions', cmd);
      if (expectTool) {
        // Restricted tools should provide a feedback object with type 'tool_restricted'.
        assert.ok(res.feedback && res.feedback.type === 'tool_restricted', `Tool '${expectTool}' should be restricted`);
        console.log(`  ✓ Restricted tool test passed for '${cmd}'`);
      } else {
        assert.strictEqual(res.stdout.trim(), expectOut, `Output mismatch for '${cmd}'`);
        console.log(`  ✓ Parser test passed for '${cmd}'`);
      }
    } catch (err) {
      console.error(`  ✗ Parser test FAILED for '${cmd}'`);
      recordFail('    ' + err.message);
    }
  }

  // 4. Lab specification count consistency (source-level regex)
  try {
    const labEngineSrc = fs.readFileSync(path.resolve(__dirname, '../lab-engine.js'), 'utf8');
    const specMatches = labEngineSrc.match(/'lab-[^']+':\s*\{/g) || [];
    const specCount = specMatches.length;
    assert.strictEqual(specCount, 13, `LAB_SPECIFICATIONS count should be 13, found ${specCount}`);
    console.log('  ✓ LAB_SPECIFICATIONS count consistency test passed');
  } catch (err) {
    console.error('  ✗ LAB_SPECIFICATIONS count consistency test FAILED');
    recordFail('    ' + err.message);
  }

  // 5. ROOM_TO_PRACTICAL_LAB mapping consistency (source regex)
  try {
    const learningSrc = fs.readFileSync(path.resolve(__dirname, '../learning.js'), 'utf8');
    const mapMatches = learningSrc.match(/'room-\d+':\s*\{[^}]*id:\s*'([^']+)'/g) || [];
    const mappedIds = mapMatches.map(m => m.match(/id:\s*'([^']+)'/)[1]);
    const labEngineSrc = fs.readFileSync(path.resolve(__dirname, '../lab-engine.js'), 'utf8');
    const specIds = (labEngineSrc.match(/'lab-[^']+':/g) || []).map(s => s.match(/'([^']+)'/)[1]);
    const missing = mappedIds.filter(id => !specIds.includes(id));
    assert.deepStrictEqual(missing, [], `Mapped labs missing from specifications: ${missing.join(', ')}`);
    console.log('  ✓ ROOM_TO_PRACTICAL_LAB mapping consistency test passed');
  } catch (err) {
    console.error('  ✗ ROOM_TO_PRACTICAL_LAB mapping consistency test FAILED');
    recordFail('    ' + err.message);
  }

  // 6. Progress idempotency (cannot test without DOM/localStorage)
  console.log('  ⚠ Progress idempotency test not executed – requires browser DOM/localStorage environment.');

  // 7. Terminal command-card rendering XSS test (requires DOM)
  console.log('  ⚠ Command‑card XSS rendering test not executed – requires a DOM environment (jsdom).');

  // 8. Reproduce existing HTTP‑header failures (tasks 2 & 3 of lab-headers)
  try {
    LabEngine.resetLab('lab-headers');
    const res2 = await run('lab-headers', 'curl -I https://staging.acmefin.local | grep -i strict');
    // Expect task index 1 (Task 2) to be newly completed.
    assert.deepStrictEqual(res2.newlyCompleted.map(t => t.index), [1], 'Task 2 should complete');
    console.log('  ✓ Lab‑headers Task 2 completion test passed');
  } catch (err) {
    console.error('  ✗ Lab‑headers Task 2 completion test FAILED (expected failure)');
    recordFail('    ' + err.message);
  }

  try {
    const res3 = await run('lab-headers', 'curl -I https://staging.acmefin.local | grep -i frame');
    assert.deepStrictEqual(res3.newlyCompleted.map(t => t.index), [2], 'Task 3 should complete');
    console.log('  ✓ Lab‑headers Task 3 completion test passed');
  } catch (err) {
    console.error('  ✗ Lab‑headers Task 3 completion test FAILED (expected failure)');
    recordFail('    ' + err.message);
  }

  console.log('\nBaseline test suite completed.');

  if (failures > 0) {
    console.error(`\n${failures} test(s) failed.`);
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
