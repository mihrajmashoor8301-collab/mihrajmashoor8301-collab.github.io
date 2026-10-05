// curriculum/practical-labs.js
module.exports = [
  {
    id: "lab-sqli",
    title: "Practical SQL Injection Lab",
    tagline: "Authentication Bypass & UNION Extraction",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-25",
    description: "Target a vulnerable e-commerce and administrative portal. Exploit SQL injection in the login field using boolean logic, then perform a multi-column UNION injection to dump user password hashes.",
    flag: "flag{sqli_admin_bypass_union_success_99}",
    tasks: [
      { id: "t1", title: "Bypass Login Authentication", instruction: "Inject `' OR '1'='1--` into the administrator username field to achieve authentication without a password." },
      { id: "t2", title: "Determine Column Count", instruction: "Use `ORDER BY` or `UNION SELECT NULL, NULL...` to identify that the query returns 3 columns." },
      { id: "t3", title: "Extract User Credentials", instruction: "Extract table records using `' UNION SELECT 1, username || ':' || password, 3 FROM users--`." }
    ],
    hints: [
      "Concept: SQL injection alters backend query logic.",
      "Direction: Test single quotes in input fields.",
      "Tool: Web browser form or curl.",
      "Syntax: `' OR '1'='1--`",
      "Explanation: The `--` characters comment out trailing password checks."
    ]
  },
  {
    id: "lab-xss",
    title: "Practical Cross-Site Scripting (XSS) Lab",
    tagline: "Stored & Reflected Execution Sandbox",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-26",
    description: "Exploit reflected parameters in search bars and stored XSS inside a live comment feed. Craft JavaScript payloads to steal simulated session cookies and bypass basic client-side filters.",
    flag: "flag{xss_stored_cookie_exfiltration_77}",
    tasks: [
      { id: "t1", title: "Trigger Reflected Alert", instruction: "Submit `<script>alert('XSS')</script>` into the query parameter to verify lack of HTML entity encoding." },
      { id: "t2", title: "Deploy Stored Payload", instruction: "Post a comment containing an image tag with an onerror handler: `<img src=x onerror=alert(document.domain)>`." },
      { id: "t3", title: "Simulate Cookie Exfiltration", instruction: "Execute payload to read simulated `document.cookie` and capture the session flag." }
    ],
    hints: [
      "Concept: Injected JavaScript executes within the victim's browser DOM.",
      "Direction: If `<script>` is blocked, test event handlers like `<img src=x onerror=...>`.",
      "Tool: Browser DevTools or curl.",
      "Syntax: `<img src=x onerror=alert(1)>`",
      "Explanation: Broken image source triggers the onerror JavaScript handler immediately."
    ]
  },
  {
    id: "lab-idor",
    title: "Practical Insecure Direct Object References (IDOR) Lab",
    tagline: "Parameter Tampering & Account Takeover",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-27",
    description: "Analyze a customer profile dashboard. Intercept outgoing API requests, manipulate user object IDs, and extract private account tokens belonging to administrative accounts.",
    flag: "flag{idor_horizontal_account_takeover_42}",
    tasks: [
      { id: "t1", title: "Map Profile API Endpoint", instruction: "Identify the user identifier in the URL: `/api/users/profile?id=102`." },
      { id: "t2", title: "Test Horizontal IDOR", instruction: "Change ID parameter from `102` to `101` and verify that another student's profile is returned." },
      { id: "t3", title: "Access Administrative Object", instruction: "Request `id=100` (root admin) to extract the secret API flag." }
    ],
    hints: [
      "Concept: The server trusts user-supplied database IDs without checking authorization.",
      "Direction: Inspect HTTP requests in DevTools Network tab.",
      "Tool: curl or browser URL bar.",
      "Syntax: Modify `?id=102` to `?id=100`.",
      "Explanation: The server validates authentication but omits authorization checks."
    ]
  },
  {
    id: "lab-csrf",
    title: "Practical Cross-Site Request Forgery (CSRF) Lab",
    tagline: "Forged Transactions & SameSite Bypass",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-28",
    description: "Construct a third-party HTML proof-of-concept page that exploits ambient cookie authority to force an authenticated banking user to transfer simulated funds.",
    flag: "flag{csrf_ambient_cookie_forgery_81}",
    tasks: [
      { id: "t1", title: "Analyze State-Changing Form", instruction: "Inspect the fund transfer form to verify whether any anti-CSRF token exists in the parameters." },
      { id: "t2", title: "Craft Malicious HTML PoC", instruction: "Create an auto-submitting form targeting `/api/transfer` with attacker recipient." },
      { id: "t3", title: "Execute Cross-Origin Forgery", instruction: "Submit the request with simulated active session to trigger the unauthorized transaction." }
    ],
    hints: [
      "Concept: The victim's browser automatically includes cookies on cross-origin requests.",
      "Direction: Look for missing CSRF tokens in state-changing POST endpoints.",
      "Tool: HTML form generator.",
      "Syntax: `<form action='...' method='POST'>`",
      "Explanation: Without tokens or SameSite=Strict, the server processes the request."
    ]
  },
  {
    id: "lab-auth",
    title: "Practical Authentication & Brute Force Lab",
    tagline: "Rate Limit Evasion & Credential Stuffing",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-29",
    description: "Audit an authentication gateway. Test password dictionary spraying against user accounts, evade basic rate-limiting filters using header rotation, and crack the target account.",
    flag: "flag{auth_dictionary_lockout_bypass_63}",
    tasks: [
      { id: "t1", title: "Identify Lockout Thresholds", instruction: "Observe after how many failed attempts the server responds with HTTP 429 Too Many Requests." },
      { id: "t2", title: "Test Header Spoofing", instruction: "Add `X-Forwarded-For: 10.0.0.X` headers to test if IP rate limiting can be circumvented." },
      { id: "t3", title: "Recover Valid Credentials", instruction: "Iterate candidate passwords from the lab wordlist to unlock user `cadet`." }
    ],
    hints: [
      "Concept: Brute force automated dictionary attacks.",
      "Direction: Watch response status codes (401 vs 429 vs 200).",
      "Tool: Bash curl loop or Hydra.",
      "Syntax: `curl -d 'user=...&pass=...' ...`",
      "Explanation: Valid password returns HTTP 200 with an authorization session token."
    ]
  },
  {
    id: "lab-headers",
    title: "Practical HTTP Security Headers Lab",
    tagline: "CSP Evaluation & Header Configuration",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Web Security",
    estimatedTime: "25 min",
    foundationalRoomId: "room-30",
    description: "Audit a live web server's HTTP response headers. Identify missing defense-in-depth headers, craft custom Content-Security-Policy (CSP) rules, and eliminate Clickjacking risks.",
    flag: "flag{headers_csp_hsts_hardening_complete_14}",
    tasks: [
      { id: "t1", title: "Inspect Raw Headers", instruction: "Execute `curl -I` against the target to catalog all active response headers." },
      { id: "t2", title: "Detect Clickjacking Exposure", instruction: "Verify that `X-Frame-Options` and CSP `frame-ancestors` are missing, allowing iframe embedding." },
      { id: "t3", title: "Configure Hardened Policy", instruction: "Apply compliant CSP and HSTS header directives in the lab web configuration." }
    ],
    hints: [
      "Concept: Browser security headers instruct the client to enforce defensive restrictions.",
      "Direction: Look for missing X-Frame-Options and Content-Security-Policy.",
      "Tool: `curl -I`",
      "Syntax: `curl -I http://localhost:8080`",
      "Explanation: Proper headers prevent clickjacking and inline script injection."
    ]
  },
  {
    id: "lab-suid",
    title: "Practical Linux SUID Privilege Escalation Lab",
    tagline: "Binary Analysis & Root Shell Drop",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Linux Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-31",
    description: "Gain an interactive shell as unprivileged user `cadet`. Enumerate the filesystem for SUID binaries, discover an improperly configured administrative binary, and spawn an elevated root shell.",
    flag: "flag{suid_gtfobins_root_shell_pwned_55}",
    tasks: [
      { id: "t1", title: "Locate SUID Binaries", instruction: "Run `find / -perm -4000 -type f 2>/dev/null` to discover non-standard SUID files." },
      { id: "t2", title: "Consult GTFOBins", instruction: "Identify that `/usr/bin/find` has SUID permissions and supports the `-exec` shell spawn parameter." },
      { id: "t3", title: "Spawn Root Shell", instruction: "Execute `/usr/bin/find . -exec /bin/sh -p \\; -quit` to achieve UID 0 and read `/root/root.txt`." }
    ],
    hints: [
      "Concept: SUID allows binaries to execute with the permissions of the file owner (root).",
      "Direction: Look for `/usr/bin/find` in the find output.",
      "Tool: `find` and `/bin/sh -p`",
      "Syntax: `/usr/bin/find . -exec /bin/sh -p \\; -quit`",
      "Explanation: The `-p` flag preserves root privileges during subshell creation."
    ]
  },
  {
    id: "lab-smb",
    title: "Practical SMB & Network Share Enumeration Lab",
    tagline: "Null Sessions & Sensitive Share Extraction",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Network Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-32",
    description: "Interact with an exposed Windows / Samba network file server. Exploit anonymous Null Sessions on port 445, navigate hidden network shares, and retrieve cleartext credentials.",
    flag: "flag{smb_null_session_share_exfiltrated_38}",
    tasks: [
      { id: "t1", title: "Enumerate Shares Anonymously", instruction: "Execute `smbclient -L //10.10.10.25 -N` to list all exposed network shares." },
      { id: "t2", title: "Connect to Unprotected Share", instruction: "Connect to the `backups` share using `smbclient //10.10.10.25/backups -N`." },
      { id: "t3", title: "Exfiltrate Credentials File", instruction: "Use the `get` command to download `system_credentials.txt`." }
    ],
    hints: [
      "Concept: SMB null sessions allow unauthenticated share listing.",
      "Direction: Use the `-N` flag with smbclient.",
      "Tool: `smbclient`",
      "Syntax: `smbclient -L //10.10.10.25 -N`",
      "Explanation: Connects with blank username and password."
    ]
  },
  {
    id: "lab-jwt",
    title: "Practical JSON Web Token (JWT) Exploitation Lab",
    tagline: "Alg: None & Weak Secret Key Cracking",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Modern Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-33",
    description: "Audit an authentication token issued to a standard user. Decode the token, tamper with claims to elevate role to `administrator`, and exploit the `alg: none` vulnerability to bypass signature verification.",
    flag: "flag{jwt_token_forged_none_algorithm_91}",
    tasks: [
      { id: "t1", title: "Decode Token Parts", instruction: "Decode the Header and Payload using Base64Url to inspect declared claims." },
      { id: "t2", title: "Tamper Payload Claims", instruction: "Change `\"role\": \"cadet\"` to `\"role\": \"administrator\"`." },
      { id: "t3", title: "Strip Signature with None Alg", instruction: "Update header to `{\"alg\":\"none\",\"typ\":\"JWT\"}` and submit unsigned token to `/api/admin`." }
    ],
    hints: [
      "Concept: JWT payloads are not encrypted; signatures protect against tampering.",
      "Direction: If the server accepts `none`, you can strip the signature completely.",
      "Tool: Base64 decode/encode or curl.",
      "Syntax: `Header.Payload.` (trailing dot with empty signature).",
      "Explanation: Vulnerable libraries skip signature checks when alg is none."
    ]
  },
  {
    id: "lab-crypto",
    title: "Practical Cryptography & Ciphertext Analysis Lab",
    tagline: "XOR Cracking & Frequency Breakdown",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Modern Security",
    estimatedTime: "30 min",
    foundationalRoomId: "room-34",
    description: "Analyze intercepted ciphertext from an obsolete custom encryption routine. Apply letter frequency analysis and brute-force single-byte XOR keys to recover the secret plaintext communication.",
    flag: "flag{crypto_xor_frequency_cracked_73}",
    tasks: [
      { id: "t1", title: "Calculate Character Frequencies", instruction: "Analyze byte distribution to verify non-randomness characteristic of simple substitution." },
      { id: "t2", title: "Brute-Force Single-Byte Keys", instruction: "Iterate all 256 possible byte keys (0x00 to 0xFF) and score output using English letter frequencies." },
      { id: "t3", title: "Recover Plaintext Flag", instruction: "Locate the key producing legible English text and extract the secret key flag." }
    ],
    hints: [
      "Concept: Single-byte XOR has only 256 possible keys.",
      "Direction: Test byte keys from 0 to 255 against the hex stream.",
      "Tool: Python script.",
      "Syntax: `[b ^ key for b in ciphertext]`",
      "Explanation: The correct key reveals recognizable English words."
    ]
  },
  {
    id: "lab-nmap",
    title: "Practical Network Recon & Port Scanning Lab",
    tagline: "Nmap Flags & Service Fingerprinting",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Security Tools",
    estimatedTime: "30 min",
    foundationalRoomId: "room-20",
    description: "Perform real-time network enumeration against a multi-service lab target (`10.10.10.25`). Execute SYN stealth scans, fingerprint service banners, detect underlying OS versions, and save reports.",
    flag: "flag{nmap_service_fingerprint_master_29}",
    tasks: [
      { id: "t1", title: "Perform Fast TCP Sweep", instruction: "Run `nmap -sS -T4 -p 1-1000 10.10.10.25` to locate all open ports." },
      { id: "t2", title: "Fingerprint Software Versions", instruction: "Run `nmap -sV -p 22,80,445 10.10.10.25` to detect exact daemon versions." },
      { id: "t3", title: "Run Safe NSE Scripts", instruction: "Execute `nmap -sC -p 80,445 10.10.10.25` to discover web title and Samba configuration." }
    ],
    hints: [
      "Concept: Port scanning detects active listening network services.",
      "Direction: Combine `-sS` for stealth with `-sV` for version detection.",
      "Tool: `nmap`",
      "Syntax: `nmap -sV -p- 10.10.10.25`",
      "Explanation: Scans all ports and extracts banners."
    ]
  },
  {
    id: "lab-packets",
    title: "Practical Packet Inspection & Traffic Analysis Lab",
    tagline: "PCAP Stream Following & Credential Interception",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    category: "Security Tools",
    estimatedTime: "30 min",
    foundationalRoomId: "room-21",
    description: "Load an intercepted `.pcap` capture file recorded during an internal network breach. Apply Wireshark display filters to isolate HTTP POST traffic, follow TCP streams, and reconstruct plaintext passwords.",
    flag: "flag{pcap_stream_followed_credentials_extracted_64}",
    tasks: [
      { id: "t1", title: "Filter for Web Traffic", instruction: "Apply the display filter `http` to isolate Hypertext Transfer Protocol packets." },
      { id: "t2", title: "Filter Login Submissions", instruction: "Apply `http.request.method == \"POST\"` to isolate form submissions." },
      { id: "t3", title: "Follow TCP Conversation", instruction: "Follow the TCP stream of the authentication handshake to read the cleartext password payload." }
    ],
    hints: [
      "Concept: Unencrypted HTTP packets expose all application data in plain text.",
      "Direction: Use Wireshark display filters or tcpdump.",
      "Tool: `wireshark` or `tcpdump`",
      "Syntax: `http.request.method == \"POST\"`",
      "Explanation: Following the TCP stream reassembles all packet fragments into readable text."
    ]
  },
  {
    id: "lab-capstone",
    title: "Capstone Pentest: Final Enterprise Target",
    tagline: "End-to-End Penetration Test Engagement",
    difficulty: "Advanced",
    difficultyBadge: "🔴 Advanced",
    category: "Junior Pentester",
    estimatedTime: "60 min",
    foundationalRoomId: "room-40",
    description: "A complete multi-stage penetration testing engagement against an isolated enterprise target (`10.10.10.100`). Execute reconnaissance, web fuzzing, SQL injection exploitation, initial shell access, local enumeration, SUID privilege escalation, and executive reporting.",
    flag: "flag{endlessus_capstone_certified_junior_pentester_2026}",
    tasks: [
      { id: "t1", title: "Phase 1: Recon & Nmap Scan", instruction: "Scan 10.10.10.100 to discover open ports (22, 80)." },
      { id: "t2", title: "Phase 2: Directory Fuzzing", instruction: "Fuzz endpoints to discover hidden administrative login at `/api/v2/auth`." },
      { id: "t3", title: "Phase 3: SQLi Exploitation", instruction: "Exploit SQL injection in login to extract API access token." },
      { id: "t4", title: "Phase 4: SSH Initial Foothold", instruction: "Connect to target shell as user `cadet` and retrieve `user.txt`." },
      { id: "t5", title: "Phase 5: SUID Privilege Escalation", instruction: "Locate SUID `/usr/bin/find` and escalate privileges to root." },
      { id: "t6", title: "Phase 6: Executive Reporting", instruction: "Capture `root.txt` and review the generated security remediation summary." }
    ],
    hints: [
      "Concept: Full methodology synthesis across all 10 stages.",
      "Direction: Follow PTES: Recon -> Enum -> Exploit -> Privesc -> Report.",
      "Tool: Nmap, curl, ffuf, SUID find.",
      "Syntax: Step-by-step multi-stage execution.",
      "Explanation: Successful completion awards the Endlessus Junior Pentester Certificate badge."
    ]
  }
];
