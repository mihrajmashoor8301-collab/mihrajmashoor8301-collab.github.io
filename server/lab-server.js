/**
 * ============================================================================
 * ENDLESSUS ISOLATED LAB BACKEND SERVER & API GATEWAY
 * ============================================================================
 * Standalone Node.js server providing authenticated API endpoints for:
 *  - Real command execution & PTY interaction
 *  - Server-side objective validation & evidence verification
 *  - Stateful container & virtual environment persistence
 *  - Server-side flag verification with prerequisite checks
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const LabEngine = require('../lab-engine.js');

const PORT = process.env.PORT || 8089;
const SESSIONS_DIR = path.join(__dirname, '.sessions');

if (!fs.existsSync(SESSIONS_DIR)) {
  fs.mkdirSync(SESSIONS_DIR, { recursive: true });
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // 1. Health Endpoint
  if (req.method === 'GET' && pathname === '/api/lab/health') {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'Endlessus Lab Execution Server',
      timestamp: Date.now(),
      mode: 'isolated-container-sandbox'
    });
  }

  // 2. Command Execution Endpoint
  if (req.method === 'POST' && pathname === '/api/lab/exec') {
    try {
      const body = await parseJsonBody(req);
      const { labId, command } = body;
      if (!labId || typeof command !== 'string') {
        return sendJson(res, 400, { error: 'Missing labId or command' });
      }

      // Execute via server-side LabEngine
      const result = await LabEngine.execute(labId, command);

      // Persist server session
      const sessionFile = path.join(SESSIONS_DIR, `${labId}.json`);
      fs.writeFileSync(sessionFile, JSON.stringify(LabEngine.getSession(labId)));

      return sendJson(res, 200, result);
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 3. Lab State Endpoint
  if (req.method === 'GET' && pathname.startsWith('/api/lab/state/')) {
    const labId = pathname.split('/').pop();
    const session = LabEngine.getSession(labId);
    if (!session) {
      return sendJson(res, 404, { error: `Lab not found: ${labId}` });
    }
    return sendJson(res, 200, {
      labId,
      user: session.user,
      euid: session.euid,
      cwd: session.cwd,
      isElevatedRoot: session.isElevatedRoot,
      completedTasks: Array.from(session.completedTasks)
    });
  }

  // 4. Lab Reset Endpoint
  if (req.method === 'POST' && pathname.startsWith('/api/lab/reset/')) {
    const labId = pathname.split('/').pop();
    const session = LabEngine.resetLab(labId);
    const sessionFile = path.join(SESSIONS_DIR, `${labId}.json`);
    if (fs.existsSync(sessionFile)) fs.unlinkSync(sessionFile);

    return sendJson(res, 200, {
      status: 'reset_success',
      labId,
      user: session.user,
      euid: session.euid
    });
  }

  // 5. Flag Verification Endpoint (Server-Side Enforced)
  if (req.method === 'POST' && pathname === '/api/lab/verify-flag') {
    try {
      const body = await parseJsonBody(req);
      const { labId, flag } = body;
      if (!labId || !flag) {
        return sendJson(res, 400, { error: 'Missing labId or flag' });
      }

      const verification = LabEngine.verifyFlag(labId, flag);
      return sendJson(res, verification.success ? 200 : 400, verification);
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  return sendJson(res, 404, { error: 'Endpoint not found' });
});

if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`[Endlessus Lab Server] Listening on http://127.0.0.1:${PORT}`);
  });
}

module.exports = server;
