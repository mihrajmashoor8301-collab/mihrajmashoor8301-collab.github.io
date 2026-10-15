/**
 * Endlessus Browser Verification Suite via Chrome DevTools Protocol (CDP)
 * Launches Headless Chromium and verifies interactive UI, map toggle,
 * TryHackMe question engine, and security tools.
 */

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

console.log('============================================================');
console.log('STARTING ENDLESSUS BROWSER VERIFICATION SUITE');
console.log('============================================================\n');

// 1. Start a simple static HTTP server
const PORT = 8089;
const ROOT_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/learning.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`✓ Local test server running on http://127.0.0.1:${PORT}`);
  try {
    await runBrowserTests();
  } catch (err) {
    console.error('Browser verification failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});

// Helper for CDP JSON RPC over WebSocket
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 0;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error('Evaluation exception: ' + JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  async close() {
    if (this.ws) this.ws.close();
  }
}

async function runBrowserTests() {
  const DEBUG_PORT = 9223;
  const tmpProfileDir = `/tmp/chrome-test-profile-${Date.now()}`;
  console.log('--- 1. Launching Headless Chromium ---');
  const chromeProcess = spawn('/usr/bin/chromium', [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tmpProfileDir}`,
    '--window-size=1280,960'
  ]);

  // Wait for remote debugging endpoint
  let pageTarget = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const targets = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json`);
      if (targets && targets.length > 0) {
        pageTarget = targets.find(t => t.type === 'page') || targets[0];
        break;
      }
    } catch (e) {}
  }

  assert(pageTarget && pageTarget.webSocketDebuggerUrl, 'Chromium debugging target required');
  console.log(`  ✓ Connected to Chromium DevTools: ${pageTarget.title || 'Page'}`);

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('DOM.enable');

  try {
    async function navigate(url) {
      await client.send('Page.navigate', { url });
      for (let i = 0; i < 40; i++) {
        await new Promise(r => setTimeout(r, 100));
        const ready = await client.evaluate('document.readyState === "complete"');
        if (ready) break;
      }
      await new Promise(r => setTimeout(r, 300));
    }

    // -------------------------------------------------------------
    // TEST 1: learning.html Map View, Nodes, and List View Toggle
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Learning Hub & Connected Room Map ---');
    await navigate(`http://127.0.0.1:${PORT}/learning.html`);

    // Verify Title & Hero
    const title = await client.evaluate('document.title');
    console.log(`  ✓ Page title: "${title}"`);
    assert(title.includes('Endlessus Cybersecurity Academy'));

    // Verify 45 Room Nodes rendered with polling
    let nodeCount = 0;
    for (let i = 0; i < 30; i++) {
      nodeCount = await client.evaluate('document.querySelectorAll(".lh-map-node-card").length');
      if (nodeCount === 45) break;
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(`  ✓ Rendered map node cards: ${nodeCount}`);
    assert.strictEqual(nodeCount, 45, 'Must render exactly 45 connected room node cards');

    // Verify 8 Level sections
    const levelSectionCount = await client.evaluate('document.querySelectorAll(".lh-map-level-section").length');
    console.log(`  ✓ Rendered level sections: ${levelSectionCount}`);
    assert.strictEqual(levelSectionCount, 8, 'Must render exactly 8 Pre Security levels (Levels 0-7)');

    // Test List View toggle
    const toggleToList = await client.evaluate(`
      const listBtn = document.getElementById('toggle-view-list');
      if (listBtn) {
        listBtn.click();
        true;
      } else false;
    `);
    assert(toggleToList, 'List view toggle button must exist and be clicked');
    await new Promise(r => setTimeout(r, 300));

    const accessibleItemsCount = await client.evaluate('document.querySelectorAll(".lh-accessible-item").length');
    console.log(`  ✓ Accessible list items rendered: ${accessibleItemsCount}`);
    assert.strictEqual(accessibleItemsCount, 45, 'Accessible list must contain 45 items');

    // Switch back to Map Mode
    await client.evaluate(`document.getElementById('toggle-view-map').click();`);
    await new Promise(r => setTimeout(r, 300));
    const activeViewMode = await client.evaluate('window.LEARNING_STATE.mapViewMode');
    assert.strictEqual(activeViewMode, 'map', 'window.LEARNING_STATE.mapViewMode must be "map"');

    // -------------------------------------------------------------
    // TEST 2: Interactive Room Player & Question Engine (Room 01)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Room Player & TryHackMe Question Engine ---');
    // Open Room 01
    await client.evaluate('openRoom("room-01")');
    await new Promise(r => setTimeout(r, 500));

    const isModalOpen = await client.evaluate('document.getElementById("room-modal").classList.contains("open")');
    assert(isModalOpen, 'Room modal must have .open class');

    const modalTitle = await client.evaluate('document.getElementById("modal-room-title").textContent');
    console.log(`  ✓ Opened Room Player: "${modalTitle}"`);
    assert(modalTitle.includes('Welcome to Cybersecurity'));

    // Verify Section 7 Question 1 Visual Slots
    const slotBoxes = await client.evaluate('document.querySelectorAll("[data-q-id=\\"q-01-1\\"] .lh-slot-box").length');
    console.log(`  ✓ Visual character slots rendered for Q1 (whoami): ${slotBoxes}`);
    assert.strictEqual(slotBoxes, 6, 'whoami must have 6 visual character slots');

    // Submit INCORRECT Answer "pwd"
    const incorrectSubmission = await client.evaluate(`
      const card = document.querySelector('[data-q-id="q-01-1"]');
      const input = card.querySelector('.lh-exact-input');
      const submitBtn = card.querySelector('.lh-btn-submit-answer');
      input.value = 'pwd';
      submitBtn.click();
      const feedback = card.querySelector('.lh-feedback-banner');
      feedback ? feedback.textContent.trim() : '';
    `);
    console.log(`  ✓ Incorrect answer feedback: "${incorrectSubmission}"`);
    assert(incorrectSubmission.includes('Incorrect') || incorrectSubmission.includes('Try again'));

    // Verify Question is NOT solved in window.LEARNING_STATE
    const isSolvedBefore = await client.evaluate('Boolean(window.LEARNING_STATE.questionProgress["q-01-1"])');
    assert.strictEqual(isSolvedBefore, false, 'Question must NOT be marked solved upon incorrect answer');

    // Submit CORRECT Answer "whoami" (with leading/trailing spaces to test trimming)
    const correctSubmission = await client.evaluate(`
      (() => {
        const card = document.querySelector('[data-q-id="q-01-1"]');
        const input = card.querySelector('.lh-exact-input');
        const submitBtn = card.querySelector('.lh-btn-submit-answer');
        input.value = '  whoami  ';
        submitBtn.click();
        const feedback = card.querySelector('.lh-feedback-banner');
        const explanation = card.querySelector('.lh-explanation-box');
        return {
          feedback: feedback ? feedback.textContent.trim() : '',
          explanationVisible: explanation ? window.getComputedStyle(explanation).display !== 'none' : false
        };
      })()
    `);
    console.log(`  ✓ Correct answer feedback: "${correctSubmission.feedback}"`);
    assert(correctSubmission.feedback.includes('Correct'), 'Must display Correct! feedback');
    assert(correctSubmission.explanationVisible, 'Explanation box must be displayed after solving');

    // Verify Question IS solved in window.LEARNING_STATE & LocalStorage
    const isSolvedAfter = await client.evaluate('Boolean(window.LEARNING_STATE.questionProgress["q-01-1"])');
    assert.strictEqual(isSolvedAfter, true, 'Question must be marked solved in window.LEARNING_STATE');

    const storedProgress = await client.evaluate('localStorage.getItem("endlessus_question_progress")');
    assert(storedProgress && storedProgress.includes('q-01-1'), 'Progress must be persisted into localStorage');
    console.log('  ✓ Question progress accurately persisted to localStorage');

    // Close room modal
    await client.evaluate('closeModal()');
    await new Promise(r => setTimeout(r, 300));

    // -------------------------------------------------------------
    // TEST 3: Security Tools Page (security-tools.html)
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Dedicated Security Tools Page ---');
    await navigate(`http://127.0.0.1:${PORT}/security-tools.html`);

    const toolsTitle = await client.evaluate('document.title');
    console.log(`  ✓ Page title: "${toolsTitle}"`);
    assert(toolsTitle.includes('Security Tools'));

    // Test Encoders/Decoders
    const encodeResult = await client.evaluate(`
      (() => {
        const input = document.getElementById('enc-input');
        const encodeBtn = document.getElementById('btn-encode');
        const output = document.getElementById('enc-output');
        input.value = 'EndlessusPreSecurity2026';
        encodeBtn.click();
        return output.textContent.trim();
      })()
    `);
    console.log(`  ✓ Base64 encode test output: "${encodeResult}"`);
    assert.strictEqual(encodeResult, 'RW5kbGVzc3VzUHJlU2VjdXJpdHkyMDI2');

    // Test Subnet Calculator Tab
    const subnetResult = await client.evaluate(`
      (() => {
        // Switch to subnet tab
        document.querySelector('[data-tab="tab-subnet"]').click();
        const ipIn = document.getElementById('subnet-ip');
        const cidrIn = document.getElementById('subnet-cidr');
        const calcBtn = document.getElementById('btn-calc-subnet');
        ipIn.value = '192.168.10.50';
        cidrIn.value = '24';
        calcBtn.click();

        const rows = document.querySelectorAll('#subnet-table-body tr');
        return {
          netmask: rows[1] ? rows[1].children[1].textContent.trim() : '',
          network: rows[2] ? rows[2].children[1].textContent.trim() : '',
          hosts: rows[5] ? rows[5].children[1].textContent.trim() : '',
          scope: rows[6] ? rows[6].children[1].textContent.trim() : ''
        };
      })()
    `);
    console.log(`  ✓ Subnet Calculation: Netmask=${subnetResult.netmask}, Network=${subnetResult.network}, Hosts=${subnetResult.hosts}, Scope=${subnetResult.scope}`);
    assert.strictEqual(subnetResult.netmask, '255.255.255.0');
    assert.strictEqual(subnetResult.network, '192.168.10.0');
    assert.strictEqual(subnetResult.hosts, '254');
    assert(subnetResult.scope.includes('Class C') || subnetResult.scope.includes('Private'));

    // Capture screenshot of Security Tools
    const screenshot = await client.send('Page.captureScreenshot', { format: 'png' });
    const screenshotPath = path.join(__dirname, '..', 'security-tools-verification.png');
    fs.writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    console.log(`  ✓ Saved visual verification screenshot to: ${screenshotPath}`);

  } finally {
    await client.close();
    chromeProcess.kill('SIGTERM');
  }

  console.log('\n============================================================');
  console.log('ALL BROWSER HEADLESS VERIFICATION TESTS PASSED (100%)!');
  console.log('============================================================');
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}
