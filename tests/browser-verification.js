/**
 * Endlessus Browser Verification Suite via Chrome DevTools Protocol (CDP)
 * Launches Headless Chromium and verifies:
 * 1. Minimal Learning Dashboard (learning.html)
 * 2. Module Catalogue (modules.html)
 * 3. Module Overview (module.html)
 * 4. Room Overview (room.html)
 * 5. Focused Lesson Reader & Question Engine (lesson.html)
 * 6. Visual Career Roadmap (roadmap.html) & Mobile 375px responsiveness
 * 7. Dedicated Security Tools (security-tools.html)
 * 8. Error state handling for invalid module/room/lesson IDs
 */

const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

console.log('============================================================');
console.log('STARTING ENDLESSUS COMPLETE BROWSER VERIFICATION SUITE');
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
    const res = await clientEvaluate(this, expression);
    return res;
  }

  async close() {
    if (this.ws) this.ws.close();
  }
}

async function clientEvaluate(client, expression) {
  const res = await client.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (res.exceptionDetails) {
    throw new Error('Evaluation exception: ' + JSON.stringify(res.exceptionDetails));
  }
  return res.result ? res.result.value : undefined;
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function runBrowserTests() {
  const DEBUG_PORT = 9224;
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
      await new Promise(r => setTimeout(r, 200));
    }

    // -------------------------------------------------------------
    // TEST 1: Minimal Learning Dashboard (learning.html)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Minimal Learning Dashboard (learning.html) ---');
    await navigate(`http://127.0.0.1:${PORT}/learning.html`);

    const dashTitle = await client.evaluate('document.title');
    console.log(`  ✓ Dashboard title: "${dashTitle}"`);
    assert(dashTitle.includes('Learning Dashboard') || dashTitle.includes('Endlessus'));

    // Check primary "Start / Continue Learning" button
    const continueBtnHref = await client.evaluate('document.getElementById("dashboard-continue-btn").getAttribute("href")');
    const continueBtnText = await client.evaluate('document.getElementById("dashboard-continue-text").textContent.trim()');
    console.log(`  ✓ Continue action: "${continueBtnText}" -> ${continueBtnHref}`);
    assert(continueBtnHref.includes('room.html') || continueBtnHref.includes('lesson.html'), 'Continue button must link to room overview or lesson reader');

    // Check metrics cards
    const statsRooms = await client.evaluate('document.getElementById("stat-completed-rooms").textContent.trim()');
    const statsXP = await client.evaluate('document.getElementById("stat-user-xp").textContent.trim()');
    console.log(`  ✓ Dashboard stats: Completed=${statsRooms}/45, XP=${statsXP}`);

    // Check recommended activity card
    const recRoomTitle = await client.evaluate('document.getElementById("rec-room-title").textContent.trim()');
    console.log(`  ✓ Recommended room: "${recRoomTitle}"`);
    assert(recRoomTitle.includes('ROOM-01'), 'Default initial recommended room must be ROOM-01');

    // -------------------------------------------------------------
    // TEST 2: Module Catalogue (modules.html)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Module Catalogue (modules.html) ---');
    await navigate(`http://127.0.0.1:${PORT}/modules.html`);

    const modulesTitle = await client.evaluate('document.title');
    console.log(`  ✓ Module catalogue title: "${modulesTitle}"`);
    assert(modulesTitle.includes('Learning Modules'));

    // Check all 8 level cards rendered
    const levelCardsCount = await client.evaluate('document.querySelectorAll("#modules-grid article").length');
    console.log(`  ✓ Rendered module cards in grid: ${levelCardsCount}`);
    assert.strictEqual(levelCardsCount, 8, 'Must render exactly 8 curriculum module cards');

    // Test difficulty filter (e.g. "Practical")
    const practicalCount = await client.evaluate(`
      (() => {
        const btn = document.querySelector('[data-filter="Practical"]');
        if (btn) btn.click();
        return document.querySelectorAll('#modules-grid article').length;
      })()
    `);
    console.log(`  ✓ Practical filter results count: ${practicalCount}`);
    assert(practicalCount >= 1 && practicalCount < 8, 'Filter must narrow displayed cards');

    // Reset filter
    await client.evaluate('document.querySelector(\'[data-filter="all"]\').click()');

    // -------------------------------------------------------------
    // TEST 3: Module Overview (module.html?id=level-0)
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Module Overview (module.html?id=level-0) ---');
    await navigate(`http://127.0.0.1:${PORT}/module.html?id=level-0`);

    const modTitle = await client.evaluate('document.getElementById("module-title").textContent.trim()');
    console.log(`  ✓ Module title: "${modTitle}"`);
    assert.strictEqual(modTitle, 'Start Here');

    const outcomesCount = await client.evaluate('document.querySelectorAll("#module-outcomes-list li").length');
    console.log(`  ✓ Learning outcomes listed: ${outcomesCount}`);
    assert(outcomesCount >= 2, 'Module must list at least 2 real learning outcomes');

    const moduleRoomsCount = await client.evaluate('document.querySelectorAll("#rooms-list-container > div").length');
    console.log(`  ✓ Rooms listed in Level 00: ${moduleRoomsCount}`);
    assert.strictEqual(moduleRoomsCount, 2, 'Level 00 must contain exactly 2 rooms (room-01, room-02)');

    // -------------------------------------------------------------
    // TEST 4: Room Overview (room.html?id=room-01)
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Room Overview (room.html?id=room-01) ---');
    await navigate(`http://127.0.0.1:${PORT}/room.html?id=room-01`);

    const roomTitle = await client.evaluate('document.getElementById("room-title").textContent.trim()');
    console.log(`  ✓ Room title: "${roomTitle}"`);
    assert(roomTitle.includes('Welcome to Cybersecurity'));

    const roomObjectivesCount = await client.evaluate('document.querySelectorAll("#room-objectives-list li").length');
    console.log(`  ✓ Room objectives listed: ${roomObjectivesCount}`);
    assert(roomObjectivesCount >= 3, 'Room 01 must list at least 3 learning objectives');

    const lessonsOutlineCount = await client.evaluate('document.querySelectorAll("#lessons-outline-container > div").length');
    console.log(`  ✓ Lesson outline sections: ${lessonsOutlineCount}`);
    assert(lessonsOutlineCount >= 2, 'Room 01 must outline at least 2 lesson sections');

    const inRoomTasksCount = await client.evaluate('document.querySelectorAll(".task-card").length');
    const inRoomQuestionsCount = await client.evaluate('document.querySelectorAll(".q-submit-btn").length');
    const sidebarTaskLinksCount = await client.evaluate('document.querySelectorAll(".task-jump-link").length');
    console.log(`  ✓ TryHackMe room elements: Tasks=${inRoomTasksCount}, Questions=${inRoomQuestionsCount}, Quick-Jump Links=${sidebarTaskLinksCount}`);
    assert(inRoomTasksCount >= 3, 'Must render at least 3 task cards');
    assert(inRoomQuestionsCount >= 1, 'Must render in-room question submit buttons');
    assert(sidebarTaskLinksCount >= 3, 'Must render sidebar quick-jump task links');

    // -------------------------------------------------------------
    // TEST 5: Focused Lesson Reader & Question Engine (lesson.html)
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Focused Lesson Reader & Question Engine (lesson.html) ---');
    await navigate(`http://127.0.0.1:${PORT}/lesson.html?room=room-01&task=0`);

    const sectionTitle = await client.evaluate('document.getElementById("lesson-section-title").textContent.trim()');
    console.log(`  ✓ Lesson section title: "${sectionTitle}"`);
    assert(sectionTitle.includes('What is Cybersecurity'));

    // Check SVG diagram is rendered
    const hasSvg = await client.evaluate('Boolean(document.querySelector("#lesson-diagram-svg svg"))');
    console.log(`  ✓ Architectural diagram rendered: ${hasSvg}`);
    assert(hasSvg, 'Lesson section 1 must render architectural SVG diagram');

    // Test Question 1 (Exact Answer with character slots)
    const qCount = await client.evaluate('document.querySelectorAll("#questions-list > div").length');
    console.log(`  ✓ Interactive questions loaded: ${qCount}`);
    assert(qCount >= 1, 'Lesson reader must load interactive questions');

    // Submit INCORRECT Answer
    const incorrectCheck = await client.evaluate(`
      (() => {
        const input = document.getElementById('q-input-0');
        input.value = 'pwd';
        const btn = document.querySelector('.q-submit-btn[data-qidx="0"]');
        btn.click();
        const fb = document.getElementById('q-feedback-0');
        return fb ? fb.textContent.trim() : '';
      })()
    `);
    console.log(`  ✓ Incorrect feedback: "${incorrectCheck.substring(0, 30)}..."`);
    assert(incorrectCheck.includes('Incorrect'), 'Must display Incorrect Answer feedback');

    // Submit CORRECT Answer "whoami"
    const correctCheck = await client.evaluate(`
      (() => {
        const input = document.getElementById('q-input-0');
        input.value = '  whoami  ';
        const btn = document.querySelector('.q-submit-btn[data-qidx="0"]');
        btn.click();
        const fb = document.getElementById('q-feedback-0');
        return fb ? fb.textContent.trim() : '';
      })()
    `);
    console.log(`  ✓ Correct feedback: "${correctCheck.substring(0, 35)}..."`);
    assert(correctCheck.includes('Correct!'), 'Must display Correct! feedback');

    // Verify XP is awarded in localStorage
    const savedXP = await client.evaluate('AcademyState.calculateTotalXP()');
    console.log(`  ✓ User accrued XP in state: ${savedXP}`);
    assert(savedXP >= 25, 'Solving question must award XP');

    // -------------------------------------------------------------
    // TEST 6: Visual Career Roadmap & Mobile 375px Responsiveness
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Visual Career Roadmap (roadmap.html) & Mobile Layout ---');
    await navigate(`http://127.0.0.1:${PORT}/roadmap.html`);

    const stagesCount = await client.evaluate('document.querySelectorAll("#roadmap-stages-container > div").length');
    const roomsCount = await client.evaluate('document.querySelectorAll(".btn-toggle-room").length');
    console.log(`  ✓ Rendered levels: ${stagesCount}, rooms: ${roomsCount}`);
    assert.strictEqual(stagesCount, 8, 'Career roadmap must render all 8 levels');
    assert.strictEqual(roomsCount, 45, 'Career roadmap must render all 45 rooms');

    // Switch Viewport to Mobile (375px iPhone SE)
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 400));

    const mobileOverflow = await client.evaluate(`
      (() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        };
      })()
    `);
    console.log(`  ✓ Mobile 375px overflow test: ScrollWidth=${mobileOverflow.scrollWidth}, InnerWidth=${mobileOverflow.innerWidth}`);
    assert(!mobileOverflow.hasOverflow, 'Mobile layout must have zero horizontal overflow');

    // Reset Desktop Viewport (1280px)
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 200));

    // -------------------------------------------------------------
    // TEST 7: Security Tools Suite (security-tools.html)
    // -------------------------------------------------------------
    console.log('\n--- 8. Testing Security Tools Suite (security-tools.html) ---');
    await navigate(`http://127.0.0.1:${PORT}/security-tools.html`);

    const b64Test = await client.evaluate(`
      (() => {
        const input = document.getElementById('enc-input');
        input.value = 'EndlessusPreSecurity2026';
        document.getElementById('btn-encode').click();
        return document.getElementById('enc-output').textContent.trim();
      })()
    `);
    console.log(`  ✓ Base64 encode test: "${b64Test}"`);
    assert.strictEqual(b64Test, 'RW5kbGVzc3VzUHJlU2VjdXJpdHkyMDI2');

    // -------------------------------------------------------------
    // TEST 8: Invalid Query Parameters & Error States
    // -------------------------------------------------------------
    console.log('\n--- 9. Testing Invalid Query Parameter Handling & 404 States ---');

    // Invalid Module ID
    await navigate(`http://127.0.0.1:${PORT}/module.html?id=level-999`);
    const modNotFoundVisible = await client.evaluate('!document.getElementById("module-not-found").classList.contains("hidden")');
    console.log(`  ✓ Invalid module (level-999) shows clean error: ${modNotFoundVisible}`);
    assert(modNotFoundVisible, 'Invalid module ID must display Not Found container');

    // Invalid Room ID
    await navigate(`http://127.0.0.1:${PORT}/room.html?id=room-999`);
    const roomNotFoundVisible = await client.evaluate('!document.getElementById("room-not-found").classList.contains("hidden")');
    console.log(`  ✓ Invalid room (room-999) shows clean error: ${roomNotFoundVisible}`);
    assert(roomNotFoundVisible, 'Invalid room ID must display Not Found container');

    // Invalid Lesson Room
    await navigate(`http://127.0.0.1:${PORT}/lesson.html?room=room-999`);
    const lessonNotFoundVisible = await client.evaluate('!document.getElementById("lesson-not-found").classList.contains("hidden")');
    console.log(`  ✓ Invalid lesson (room-999) shows clean error: ${lessonNotFoundVisible}`);
    assert(lessonNotFoundVisible, 'Invalid lesson room must display Not Found container');

    console.log('\n============================================================');
    console.log('ALL BROWSER VERIFICATION TESTS PASSED (100%)!');
    console.log('============================================================\n');

  } finally {
    await client.close();
    chromeProcess.kill();
  }
}
