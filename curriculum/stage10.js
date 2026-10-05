// curriculum/stage10.js
module.exports = [
  // =========================================================================
  // STAGE 10 — JUNIOR PENTESTER
  // =========================================================================
  {
    id: "room-35",
    stage: 10,
    stageTitle: "Stage 10 — Junior Pentester",
    title: "Reconnaissance & OSINT",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Stage 2 (Networking) & Stage 5 (Tools)",
    whyAreYouHere: "Before a military general attacks a castle, they send scouts to study the gates, guard rotations, and supply lines. In cybersecurity, this is **Reconnaissance**. Over 70% of a successful penetration test is thorough reconnaissance. In this room, you will learn the difference between Passive and Active Reconnaissance, master Open Source Intelligence (OSINT), and uncover subdomains and technology stacks without alerting target defenses.",
    objectives: [
      "Differentiate between Passive Reconnaissance (undetectable) and Active Reconnaissance (touching the target)",
      "Master Open Source Intelligence (OSINT) gathering methodologies",
      "Learn Subdomain Enumeration techniques (Certificate Transparency, DNS brute force)",
      "Perform Search Engine Dorking to discover leaked documents and backup files",
      "Identify target web technology stacks using `whatweb` and `wappalyzer`"
    ],
    vocabulary: [
      { term: "Reconnaissance (Recon)", definition: "The preliminary phase of an engagement where the tester gathers as much intelligence as possible about the target's infrastructure, people, and technologies." },
      { term: "Passive Reconnaissance", definition: "Gathering information without directly transmitting packets to or touching the target's servers (e.g. searching WHOIS, Certificate Transparency logs, public GitHub repositories)." },
      { term: "Active Reconnaissance", definition: "Directly probing or interacting with the target's systems (e.g. port scanning with Nmap, web fuzzing, banner grabbing)." },
      { term: "OSINT (Open Source Intelligence)", definition: "Intelligence collected from publicly available sources including domain registries, social networks, archived web pages, and government records." },
      { term: "Google Dorking (Dork)", definition: "Using advanced search engine operators (e.g. `site:`, `filetype:`, `intitle:`) to locate exposed files, database dumps, and sensitive directories." }
    ],
    lessons: [
      {
        title: "1. Passive vs Active Recon",
        content: `• **Passive Reconnaissance**: You query third-party public registries. You check **crt.sh** for TLS Certificate Transparency logs, examine archived snapshots on the **Wayback Machine**, or search **Shodan**. The target server's logs show *zero* traffic from you!
• **Active Reconnaissance**: You send Nmap probes, scan ports with \`masscan\`, and send HTTP GET requests. The target's firewall and intrusion detection systems immediately see your IP address.`
      },
      {
        title: "2. The Art of Search Engine Dorking",
        content: `Search engines index millions of inadvertently exposed files:
• \`site:target.com filetype:pdf "confidential"\`: Finds leaked internal executive briefings.
• \`site:target.com filetype:sql "INSERT INTO"\`: Finds accidentally published database backup dumps!
• \`site:target.com inurl:admin\`: Uncovers hidden administrative login portals.`
      }
    ],
    seeExamples: [
      {
        title: "Subdomain Enumeration using crt.sh",
        codeOrDiagram: `cadet@endlessus:~$ curl -s "https://crt.sh/?q=%.endlessus.in&output=json" | jq -r '.[].name_value' | sort -u
endlessus.in
admin.endlessus.in
api.endlessus.in
dev-staging.endlessus.in    <-- Prime target! Staging environments often have outdated code.
vpn.endlessus.in`,
        explanation: "Because certificate authorities must publicly log every issued TLS certificate, querying Certificate Transparency logs discovers hidden subdomains passively."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate passive web technology fingerprinting against lab host `https://endlessus.in` using whatweb: `whatweb https://endlessus.in`:",
      initialCommand: "",
      expectedCommand: "whatweb https://endlessus.in",
      simulatedOutput: "https://endlessus.in [200 OK] Country[UNITED STATES], HTML5, HTTPS[TLSv1.3], IP[185.199.108.153], Script, Title[Mihraj Mashhoor K | Security Knowledge Base], GitHub-Pages\n[+] Success! Technology profile generated: GitHub-Pages, TLS 1.3, HTML5.",
      explanation: "`whatweb` analyzes HTTP headers, cookies, HTML source tags, and script references to identify the underlying CMS and web platform."
    },
    questions: [
      {
        id: "r35-q1",
        type: "multiple-choice",
        question: "A penetration tester searches the Wayback Machine (Internet Archive) and Certificate Transparency logs (crt.sh) to find previous versions of a company's website. Which reconnaissance category is this?",
        options: [
          "Active Reconnaissance",
          "Passive Reconnaissance",
          "Denial of Service",
          "Privilege Escalation"
        ],
        correctIndex: 1,
        explanation: "Because the tester queries third-party public caches without sending any network traffic to the target company's servers, it is strictly Passive Recon."
      },
      {
        id: "r35-q2",
        type: "multiple-choice",
        question: "Which Google Dork operator restricts search results exclusively to files of a specific extension, such as finding leaked spreadsheets or configuration files?",
        options: [
          "site:",
          "filetype:",
          "cache:",
          "related:"
        ],
        correctIndex: 1,
        explanation: "The `filetype:` (or `ext:`) search operator restricts results to specific file types (e.g. `filetype:env` or `filetype:xls`)."
      }
    ],
    tasks: [
      {
        title: "Task 1: Profile Target Technology",
        instruction: "Run `whatweb https://endlessus.in` to fingerprint server technologies and frameworks.",
        hints: [
          "Concept: Web technology fingerprinting.",
          "Direction: Use whatweb against the target URL.",
          "Tool: `whatweb`",
          "Syntax: `whatweb https://endlessus.in`",
          "Explanation: Identifies CMS and server headers."
        ]
      }
    ],
    explainResult: "The `whatweb` utility performed banner analysis and signature matching against hundreds of web technology heuristics to profile the hosting environment.",
    securityConnection: "Reconnaissance dictates the attack path. If passive recon discovers an outdated staging server (`dev.company.com`) running an old version of WordPress with known vulnerabilities, the tester can focus their active efforts there rather than attacking the hardened production load balancer.",
    completion: {
      learned: [
        "The difference between Passive and Active Reconnaissance",
        "How OSINT gathers intelligence without alerting target security teams",
        "Subdomain enumeration via Certificate Transparency logs (crt.sh)",
        "Search engine dorking operators and technology fingerprinting"
      ],
      practiced: [
        "whatweb https://endlessus.in",
        "Fingerprinting web technologies",
        "Analyzing public reconnaissance vectors"
      ]
    },
    nextRoomId: "room-36"
  },

  {
    id: "room-36",
    stage: 10,
    stageTitle: "Stage 10 — Junior Pentester",
    title: "Penetration Testing Methodology & Execution",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "30 min",
    prerequisites: "Room 35 (Reconnaissance & OSINT)",
    whyAreYouHere: "A common misconception is that a penetration tester randomly opens a terminal and starts throwing random exploits at a server. In the professional world, that is the fastest way to get fired, crash production servers, or get sued! Real penetration testing is a disciplined, systematic engineering methodology guided by established industry standards (such as PTES and NIST SP 800-115). In this room, you will learn the 6-phase penetration testing lifecycle from initial scope to the final executive security report.",
    objectives: [
      "Understand the 6 distinct phases of the Penetration Testing Execution Standard (PTES)",
      "Learn the importance of Pre-engagement, Rules of Engagement (RoE), and Scope Definition",
      "Understand the progression: Recon -> Enumerate -> Identify -> Exploit -> Post-Exploit -> Report",
      "Learn how vulnerabilities are classified and scored using the Common Vulnerability Scoring System (CVSS)",
      "Understand the structure of a professional pentest deliverable report"
    ],
    vocabulary: [
      { term: "PTES", definition: "Penetration Testing Execution Standard: a widely adopted framework defining the standardized phases of a penetration testing engagement." },
      { term: "Rules of Engagement (RoE)", definition: "The legal contract specifying approved testing hours, prohibited attack vectors (e.g. no DDoS, no physical break-ins), emergency contacts, and IP whitelists." },
      { term: "CVSS", definition: "Common Vulnerability Scoring System: an open industry standard for assessing the severity of computer system security vulnerabilities on a scale from 0.0 to 10.0." },
      { term: "Proof of Concept (PoC)", definition: "A minimal demonstration or code snippet showing that a vulnerability exists and can be realistically exploited." },
      { term: "Executive Summary", definition: "The opening section of a pentest report written in non-technical business language, explaining overall risk, business impact, and strategic recommendations." }
    ],
    lessons: [
      {
        title: "1. The 6-Phase PTES Methodology",
        content: `Professional engagements follow a repeatable cycle:
1. **Pre-engagement Interactions**: Define scope, legal contracts, IP boundaries, and emergency contact procedures.
2. **Intelligence Gathering (Recon)**: OSINT, domain mapping, network ranges.
3. **Threat Modeling & Enumeration**: Port scanning, service fingerprinting, web fuzzing.
4. **Vulnerability Analysis**: Identifying specific CVEs, misconfigurations, or logic flaws.
5. **Controlled Exploitation**: Executing verified PoC exploits to gain an initial foothold without corrupting client data.
6. **Post-Exploitation**: Assessing business impact (privilege escalation, sensitive data access), cleaning up artifacts, and documenting evidence.`
      },
      {
        title: "2. The Ultimate Deliverable: The Report",
        content: `Clients do not pay for your exploitation skills; **they pay for your report**.
A professional report contains:
• **Executive Summary**: Clear, non-technical risk overview for the CEO and board of directors.
• **Technical Findings**: Each vulnerability with: Title, CVSS Score, Affected Asset, Reproduction Steps (PoC), Business Impact, and Concrete Remediation Guidance.`
      }
    ],
    seeExamples: [
      {
        title: "The Professional Pentest Progression",
        codeOrDiagram: `[ Phase 1: SCOPE & AUTHORIZATION ]
                 ↓
[ Phase 2: RECONNAISSANCE & OSINT ]
                 ↓
[ Phase 3: SERVICE ENUMERATION (Nmap / Ffuf) ]
                 ↓
[ Phase 4: VULNERABILITY IDENTIFICATION (CVE / Logic Flaws) ]
                 ↓
[ Phase 5: CONTROLLED EXPLOITATION (Initial Foothold) ]
                 ↓
[ Phase 6: PRIVILEGE ESCALATION & IMPACT VALIDATION ]
                 ↓
[ Phase 7: REPORTING & REMEDIATION GUIDANCE ]`,
        explanation: "Each phase feeds data systematically into the next phase. Random guessing is replaced by structured methodology."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate calculating a CVSS v3.1 base score for an unauthenticated Remote Code Execution vulnerability in the terminal: `python3 -c \"print('Vulnerability: Apache RCE | Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | Base Score: 9.8 (CRITICAL)')\"`:",
      initialCommand: "",
      expectedCommand: "python3 -c \"print('Vulnerability: Apache RCE | Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | Base Score: 9.8 (CRITICAL)')\"",
      simulatedOutput: "Vulnerability: Apache RCE | Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | Base Score: 9.8 (CRITICAL)\n[+] Success! CVSS vector string evaluated: Network exploitable, Low complexity, No privileges required, High C/I/A impact.",
      explanation: "CVSS vectors provide an objective, standardized metric for communicating vulnerability severity to engineering teams."
    },
    questions: [
      {
        id: "r36-q1",
        type: "multiple-choice",
        question: "During a penetration test, a tester discovers that a production server has a severe vulnerability that could be exploited to wipe customer transaction records. What should the tester do?",
        options: [
          "Wipe the database immediately to prove the vulnerability exists",
          "Follow the agreed Rules of Engagement (RoE): document the finding, capture minimal non-destructive PoC evidence, and immediately notify the primary client emergency contact",
          "Post the vulnerability on social media",
          "Ignore the finding because it is too dangerous to test"
        ],
        correctIndex: 1,
        explanation: "Ethical testers never cause intentional data loss. The RoE dictates immediate notification and non-destructive PoC validation."
      },
      {
        id: "r36-q2",
        type: "multiple-choice",
        question: "What is the primary target audience of the 'Executive Summary' section of a professional penetration test report?",
        options: [
          "Senior business leadership, executives, and board members who need to understand business risk and budget priorities without deep technical jargon",
          "Junior database developers only",
          "The hardware manufacturer of the network switches",
          "External law enforcement officers"
        ],
        correctIndex: 0,
        explanation: "Executive summaries translate technical findings into high-level business risk and strategic remediation roadmaps for executives."
      }
    ],
    tasks: [
      {
        title: "Task 1: Calculate CVSS Vector Severity",
        instruction: "Run the CVSS evaluation command to review the metrics of a Critical remote exploit.",
        hints: [
          "Concept: Vulnerability scoring metrics.",
          "Direction: Execute the python evaluation string.",
          "Tool: `python3`",
          "Syntax: Run the complete command string.",
          "Explanation: Explains CVSS metric components."
        ]
      }
    ],
    explainResult: "The script printed a standard CVSS v3.1 vector string where Attack Vector: Network, Attack Complexity: Low, Privileges: None, and Impact: High result in a 9.8 Critical score.",
    securityConnection: "Mastering methodology is what separates script kiddies from professional security consultants. Clients hire testers who can be trusted inside their most sensitive production environments without causing downtime or breaking regulatory compliance.",
    completion: {
      learned: [
        "The standard phases of the Penetration Testing Execution Standard (PTES)",
        "The legal role of the Rules of Engagement (RoE) and Scope documents",
        "How the Common Vulnerability Scoring System (CVSS) calculates severity",
        "The structure and components of a professional security deliverable report"
      ],
      practiced: [
        "Evaluating CVSS vector strings",
        "Structuring penetration test phases",
        "Analyzing executive vs technical reporting requirements"
      ]
    },
    nextRoomId: "room-37"
  },

  {
    id: "room-37",
    stage: 10,
    stageTitle: "Stage 10 — Junior Pentester",
    title: "Web Recon & Directory Fuzzing",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 12 (HTTP Fundamentals) & Room 35 (Reconnaissance)",
    whyAreYouHere: "Websites rarely have links on their homepage pointing to their most sensitive folders. You will never see a button in the navigation bar that says: *'Click here for /admin_backup or /database.sql'*. Yet developers leave test scripts, phpMyAdmin panels, and `.git` repositories on servers every day! How do penetration testers discover these hidden endpoints? The answer is **Directory Fuzzing (Content Discovery)**. In this room, you will master tools like `ffuf` and `gobuster` to brute-force hidden web paths.",
    objectives: [
      "Understand Web Content Discovery and Directory Fuzzing",
      "Learn how wordlists (SecLists) power brute-force endpoint discovery",
      "Master `ffuf` (Fast Web Fuzzer) command syntax and flags",
      "Filter responses by status code (`-mc`), size (`-fs`), and word count (`-fw`)",
      "Discover hidden administrative endpoints on the lab web server"
    ],
    vocabulary: [
      { term: "Directory Fuzzing / Brute Forcing", definition: "An automated web enumeration technique of sending hundreds of requests per second with words from a wordlist to discover unlinked files and directories." },
      { term: "ffuf", definition: "Fast Web Fuzzer: a high-performance web fuzzer written in Go, used for directory discovery, virtual host fuzzing, and parameter fuzzing." },
      { term: "Gobuster", definition: "A popular directory and DNS brute-forcing tool written in Go." },
      { term: "SecLists", definition: "The security tester's companion collection of wordlists (usernames, passwords, URLs, sensitive files) curated by Daniel Miessler." },
      { term: "FUZZ Keyword", definition: "The placeholder keyword used by ffuf in the target URL (e.g. `http://target/FUZZ`) that is replaced by each word from the wordlist." }
    ],
    lessons: [
      {
        title: "1. How Directory Fuzzing Works",
        content: `A fuzzer takes a wordlist containing 5,000 common directory names:
\`\`\`text
admin
login
backup
api
test
uploads
\`\`\`
It sends rapid requests:
\`GET /admin HTTP/1.1\` -> Returns \`403 Forbidden\` (Exists!)
\`GET /login HTTP/1.1\` -> Returns \`200 OK\` (Exists!)
\`GET /backup HTTP/1.1\` -> Returns \`301 Redirect\` (Exists!)
\`GET /random123 HTTP/1.1\` -> Returns \`404 Not Found\` (Discarded)
Within 2 seconds, you have a complete map of the server's hidden folders!`
      },
      {
        title: "2. Filtering Noise in ffuf",
        content: `Modern websites often return a custom \`200 OK\` error page for *every* missing URL. If a fuzzer shows 10,000 results, your scan is useless.
You filter the noise:
• \`-mc 200,301,302,403\`: Match only interesting status codes.
• \`-fs 1042\`: Filter out any response whose byte size is exactly 1,042 (the size of the generic custom 404 page).
• \`-e .php,.txt,.bak\`: Test file extensions in addition to directories.`
      }
    ],
    seeExamples: [
      {
        title: "Sample ffuf Execution Syntax",
        codeOrDiagram: `cadet@endlessus:~$ ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u http://10.10.10.25/FUZZ -mc 200,301,403

        /'___\\  /'___\\           /'___\\       
       /\\ \\__/ /\\ \\__/  __  __  /\\ \\__/       
       \\ \\ ,__\\\\ \\ ,__\\/\\ \\/\\ \\ \\ \\ ,__\\      
        \\ \\ \\_/ \\ \\ \\_/\\ \\ \\_\\ \\ \\ \\ \\_/      
         \\ \\_\\   \\ \\_\\  \\ \\____/  \\ \\_\\       
          \\/_/    \\/_/   \\/___/    \\/_/       

:: Method           : GET
:: URL              : http://10.10.10.25/FUZZ
:: Wordlist         : common.txt
:: Match Codes      : [200, 301, 403]

admin                   [Status: 403, Size: 277, Words: 20]
api                     [Status: 301, Size: 178, Words: 8]
backup                  [Status: 200, Size: 1420, Words: 89]`,
        explanation: "Notice the findings: `/admin` (403), `/api` (301 redirect), and `/backup` (200 OK, 1420 bytes). The `/backup` folder is an immediate investigation priority."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Run a simulated directory fuzz against our lab web server using curl and a wordlist: `for w in images css js admin backup secret; do code=$(curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8080/$w); if [ \"$code\" != \"404\" ]; then echo \"/$w -> HTTP $code\"; fi; done`:",
      initialCommand: "",
      expectedCommand: "for w in images css js admin backup secret; do code=$(curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8080/$w); if [ \"$code\" != \"404\" ]; then echo \"/$w -> HTTP $code\"; fi; done",
      simulatedOutput: "/images -> HTTP 301\n/admin -> HTTP 403\n/backup -> HTTP 200\n/secret -> HTTP 200\n[+] Success! Hidden directories /admin (403), /backup (200), and /secret (200) enumerated.",
      explanation: "Iterating words against the web root uncovers sensitive endpoints that have no visible links on the homepage."
    },
    questions: [
      {
        id: "r37-q1",
        type: "multiple-choice",
        question: "In the web fuzzing tool `ffuf`, what does the placeholder keyword `FUZZ` inside a URL like `http://target.com/FUZZ` indicate?",
        options: [
          "It instructs ffuf to fuzz the CPU clock",
          "It marks the exact injection point where ffuf will substitute each word from the supplied wordlist",
          "It encrypts the URL with AES",
          "It enables the webcam"
        ],
        correctIndex: 1,
        explanation: "`FUZZ` is the placeholder keyword replaced dynamically with lines from the wordlist during each request."
      },
      {
        id: "r37-q2",
        type: "multiple-choice",
        question: "When running a directory fuzzer, every single request returns HTTP status 200 with the exact same response size of 4,096 bytes because the target web server uses a custom 'Page Not Found' design. How do you filter out this noise?",
        options: [
          "By increasing the number of threads to 1,000",
          "By using the `-fs 4096` flag to filter out and hide any response that has a size of exactly 4,096 bytes",
          "By switching your network cable",
          "By deleting the wordlist"
        ],
        correctIndex: 1,
        explanation: "The `-fs` (filter size) flag discards responses with the specified byte size, hiding custom 404 error pages."
      }
    ],
    tasks: [
      {
        title: "Task 1: Fuzz Hidden Endpoints",
        instruction: "Execute the shell fuzzing loop to locate hidden web directories.",
        hints: [
          "Concept: Directory brute-forcing.",
          "Direction: Submit requests and check HTTP status codes.",
          "Tool: Bash loop with `curl`",
          "Syntax: Run the complete provided shell loop.",
          "Explanation: Discovers /backup and /secret."
        ]
      }
    ],
    explainResult: "The script transmitted six sequential HEAD requests, captured the HTTP status code variable `%{http_code}`, filtered out 404s, and highlighted endpoints `/backup` and `/secret`.",
    securityConnection: "Content discovery is where penetration testers find their easiest wins. Developers frequently leave database backup dumps (`db_backup.sql.tar.gz`), `.env` configuration files with AWS root keys, and unprotected development portals (`/staging`) sitting directly in web roots.",
    completion: {
      learned: [
        "The methodology of web content discovery and directory fuzzing",
        "Using wordlists (SecLists) for endpoint brute-forcing",
        "Command syntax and filtering in ffuf (-mc, -fs, -fw)",
        "Analyzing response status codes to map application attack surfaces"
      ],
      practiced: [
        "Iterative directory fuzzing",
        "Filtering 404 error responses",
        "Identifying hidden web directories"
      ]
    },
    nextRoomId: "room-38"
  },

  {
    id: "room-38",
    stage: 10,
    stageTitle: "Stage 10 — Junior Pentester",
    title: "Burp Suite & Web Proxy Fundamentals",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "40 min",
    prerequisites: "Room 12 (HTTP Fundamentals) & Room 23 (Web Security)",
    whyAreYouHere: "If you ask any professional web penetration tester which single tool they keep open 8 hours a day, the answer is always **Burp Suite**. Burp Suite is the industry-standard intercepting HTTP proxy for security assessments. It sits directly between your web browser and the internet, allowing you to intercept, pause, view, modify, and replay every single HTTP request and response in real-time. In this room, you will learn how intercepting proxies work, how to install the Burp CA certificate, and how to master the **Proxy**, **Repeater**, and **Intruder** tabs.",
    objectives: [
      "Understand how an Intercepting HTTP Proxy operates (Man-in-the-Middle by design)",
      "Learn how to configure your browser to route traffic through `127.0.0.1:8080`",
      "Understand the Burp Suite CA Certificate and how it decrypts HTTPS traffic locally",
      "Master the **Proxy Intercept** tab (pausing and tampering with requests in-flight)",
      "Master the **Repeater** tab (crafting, modifying, and re-issuing custom HTTP requests)",
      "Understand the **Intruder** tab for automated fuzzing and parameter testing"
    ],
    vocabulary: [
      { term: "Burp Suite", definition: "The premier integrated platform for performing security testing of web applications, developed by PortSwigger." },
      { term: "Intercepting Proxy", definition: "A proxy server that captures web traffic between browser and server, allowing the analyst to pause, inspect, and modify requests before transmission." },
      { term: "Burp Repeater", definition: "A core Burp Suite tool used for manually modifying and re-issuing individual HTTP requests and analyzing the resulting responses." },
      { term: "Burp Intruder", definition: "An automated tool for customizing and executing attacks against web applications (e.g. brute-forcing, fuzzing, parameter cycling)." },
      { term: "Root CA Certificate", definition: "A cryptographic certificate installed in the browser's trust store, allowing Burp Suite to generate on-the-fly TLS certificates to decrypt HTTPS traffic." }
    ],
    lessons: [
      {
        title: "1. The Man-in-the-Middle Architecture",
        content: `Normally, your browser speaks directly to the web server:
\`Browser -------------------------> Web Server\`

With Burp Suite configured:
\`Browser ----> [ Burp Suite: 127.0.0.1:8080 ] ----> Web Server\`
When you click 'Submit' on a form:
1. The request leaves your browser.
2. Burp intercepts it and pauses it.
3. You can change \`role=user\` to \`role=admin\` or change \`price=100\` to \`price=1\`.
4. You click 'Forward'. The server receives your modified request without knowing it was altered!`
      },
      {
        title: "2. The Magic of Burp Repeater",
        content: `Right-click any intercepted request and select **Send to Repeater** (\`Ctrl+R\`).
Repeater is your laboratory. You don't have to fill out web forms again and again in a browser. You can:
• Edit headers, payloads, or cookies.
• Press **Send** (\`Ctrl+Space\`).
• Immediately inspect the server's raw response side-by-side.
This is where 90% of vulnerability verification (SQLi, IDOR, XSS) actually happens!`
      }
    ],
    seeExamples: [
      {
        title: "Burp Suite Repeater Layout",
        codeOrDiagram: `[ LEFT PANE: Request (Editable) ]        [ RIGHT PANE: Response (Live) ]
POST /api/user/role HTTP/1.1              HTTP/1.1 200 OK
Host: target.corp                         Content-Type: application/json
Cookie: session=AliceToken                
                                          {
{"user_id": 102, "role": "admin"}          "success": true,
                                            "role": "admin",
                                            "message": "Role elevated"
                                          }`,
        explanation: "In Repeater, you modify the JSON payload from 'user' to 'admin', click Send, and immediately verify if the server accepted the unauthorized role change."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate a Burp Repeater request by sending a manually crafted HTTP request with a modified `X-Forwarded-For` header using curl: `curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status`:",
      initialCommand: "",
      expectedCommand: "curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status",
      simulatedOutput: "HTTP/1.1 200 OK\n{\"admin_portal\":\"OPEN\",\"client_ip\":\"127.0.0.1\",\"access\":\"GRANTED_LOCAL_IP\"}\n[+] Success! Custom header accepted. Access granted via IP spoofing.",
      explanation: "Manipulating HTTP headers directly demonstrates the exact workflow performed inside Burp Repeater."
    },
    questions: [
      {
        id: "r38-q1",
        type: "multiple-choice",
        question: "Why must a penetration tester install the Burp Suite CA Certificate into their web browser before they can intercept HTTPS web traffic?",
        options: [
          "To speed up the internet connection",
          "Because HTTPS encrypts traffic; without the trusted Burp certificate, the browser will display severe SSL/TLS security warning errors when Burp decrypts and inspects the traffic",
          "Because Burp Suite only works on Windows computers",
          "To disable the computer's firewall"
        ],
        correctIndex: 1,
        explanation: "Burp performs an authorized Man-in-the-Middle on local HTTPS traffic. The browser must trust Burp's root CA to prevent SSL error warnings."
      },
      {
        id: "r38-q2",
        type: "multiple-choice",
        question: "Which core tool within Burp Suite is specifically designed for manually modifying and repeatedly re-sending individual HTTP requests while analyzing responses?",
        options: [
          "Burp Decoder",
          "Burp Repeater",
          "Burp Comparer",
          "Burp Extender"
        ],
        correctIndex: 1,
        explanation: "Burp Repeater is the primary manual testing tool for crafting and re-issuing modified HTTP requests."
      }
    ],
    tasks: [
      {
        title: "Task 1: Send Modified HTTP Header Probe",
        instruction: "Execute `curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status` to simulate Burp header tampering.",
        hints: [
          "Concept: Manual request tampering via headers.",
          "Direction: Inject X-Forwarded-For header.",
          "Tool: `curl`",
          "Syntax: `curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status`",
          "Explanation: Simulates Repeater request modification."
        ]
      }
    ],
    explainResult: "The application checked the `X-Forwarded-For` header, trusted the client-supplied value, and granted access assuming the request originated from localhost.",
    securityConnection: "Burp Suite is the primary tool used by professional application penetration testers and bug bounty hunters. Mastering Burp Suite allows you to identify vulnerabilities that automated scanners completely miss (such as multi-step business logic flaws and multi-tenant authorization bypasses).",
    completion: {
      learned: [
        "How an intercepting HTTP proxy captures and inspects web traffic",
        "Configuring browser proxy settings and the Burp Root CA certificate",
        "Using the Proxy Intercept tab to alter requests in-flight",
        "Mastering Burp Repeater for iterative vulnerability verification"
      ],
      practiced: [
        "curl -H \"X-Forwarded-For: ...\"",
        "Tampering with request headers",
        "Analyzing server response changes"
      ]
    },
    nextRoomId: "room-39"
  },

  {
    id: "room-39",
    stage: 10,
    stageTitle: "Stage 10 — Junior Pentester",
    title: "Advanced Linux Privilege Escalation",
    difficulty: "Advanced",
    difficultyBadge: "🔴 Advanced",
    estimatedTime: "45 min",
    prerequisites: "Room 31 (Linux Privilege Escalation: SUID)",
    whyAreYouHere: "In Room 31, you learned how SUID binaries allow privilege escalation. But what happens on modern, hardened servers where no SUID binaries are misconfigured? A professional penetration tester does not stop there! In this advanced room, you will learn the full spectrum of Linux privilege escalation vectors: Scheduled Cron Jobs with writable scripts, Linux Kernel Capabilities (`getcap`), Wildcard Injections, Insecure PATH manipulation, and Shared Library Hijacking (`LD_PRELOAD`).",
    objectives: [
      "Understand Scheduled Cron Jobs (`/etc/crontab`, `/etc/cron.d/`) and writable script abuse",
      "Learn Linux Capabilities: replacing SUID with fine-grained privileges (`cap_setuid`)",
      "Master PATH Variable manipulation when scripts execute commands without absolute paths",
      "Learn Wildcard Injection techniques (e.g. `tar *` exploiting `--checkpoint`)",
      "Audit automated enumeration tools like LinPEAS to find privilege escalation paths"
    ],
    vocabulary: [
      { term: "Cron Job", definition: "A time-based job scheduler in Unix-like operating systems that runs shell scripts automatically at fixed times or intervals as designated users." },
      { term: "Linux Capabilities", definition: "A security feature that divides traditional root privileges into distinct, fine-grained units (e.g. `cap_net_bind_service`, `cap_setuid`) assigned directly to binaries." },
      { term: "PATH Variable Hijacking", definition: "An attack where an attacker modifies the `$PATH` environment variable or writes to an earlier directory in the search path to trick a root process into running a malicious binary." },
      { term: "Wildcard Injection", definition: "Exploiting shell expansion (such as `*`) to inject command-line arguments into Unix commands like `tar` or `chown`." },
      { term: "LinPEAS", definition: "Linux Privilege Escalation Awesome Script: the industry-standard bash script that automates enumeration of hundreds of local privesc vectors." }
    ],
    lessons: [
      {
        title: "1. The Insecure Cron Job Vector",
        content: `Inspect \`/etc/crontab\`:
\`\`\`text
* * * * * root /opt/scripts/backup.sh
\`\`\`
Every single minute, \`root\` runs \`/opt/scripts/backup.sh\`.
Now check the file permissions on that script:
\`ls -l /opt/scripts/backup.sh\`
\`-rwxrwxrwx 1 root root 84 Oct 5 16:30 /opt/scripts/backup.sh\`
The script is **world-writable**! Any low-privilege user can simply append a reverse shell or user-creation command:
\`echo "cp /bin/bash /tmp/rootbash; chmod +s /tmp/rootbash" >> /opt/scripts/backup.sh\`
Sixty seconds later, root runs the script and creates a root SUID shell!`
      },
      {
        title: "2. Linux Capabilities: The Modern SUID",
        content: `To avoid the danger of full SUID root binaries, modern Linux introduces **Capabilities**:
Inspect binaries with capabilities using:
\`\`\`bash
getcap -r / 2>/dev/null
\`\`\`
If you find: \`/usr/bin/python3.10 = cap_setuid+ep\`
This binary is NOT SUID, but it has the specific kernel permission to change its UID to 0!
You can spawn root with:
\`python3.10 -c 'import os; os.setuid(0); os.system("/bin/bash")'\``
      }
    ],
    seeExamples: [
      {
        title: "Insecure PATH Hijacking Example",
        codeOrDiagram: `Vulnerable root script (/usr/local/bin/maintenance):
#!/bin/bash
backup   <-- Notice: calls 'backup' instead of '/usr/bin/backup'!

Attacker exploits:
1. echo "/bin/sh -p" > /tmp/backup
2. chmod +x /tmp/backup
3. export PATH=/tmp:$PATH
4. Run maintenance -> Root executes /tmp/backup!`,
        explanation: "Because the script did not specify the absolute path `/usr/bin/backup`, the shell searched `/tmp` first due to the modified `$PATH`."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Audit Linux capabilities on the lab system using `getcap -r /usr/bin 2>/dev/null`:",
      initialCommand: "",
      expectedCommand: "getcap -r /usr/bin 2>/dev/null",
      simulatedOutput: "/usr/bin/ping = cap_net_raw+ep\n/usr/bin/python3 = cap_setuid+ep   <-- CRITICAL PRIVILEGE ESCALATION VECTOR!\n[+] Success! cap_setuid identified on python3. Immediate root escalation possible.",
      explanation: "`getcap` identified `cap_setuid+ep` on Python 3, allowing any user to invoke `os.setuid(0)` to obtain a root shell."
    },
    questions: [
      {
        id: "r39-q1",
        type: "multiple-choice",
        question: "When auditing a Linux system, you discover that `/usr/bin/python3` has the capability `cap_setuid+ep`. How can a standard low-privilege user escalate to root?",
        options: [
          "They cannot, because capabilities are purely decorative",
          "By running Python and calling `os.setuid(0)` to change the process UID to root, then spawning a shell",
          "By rebooting the server into safe mode",
          "By deleting the Python binary"
        ],
        correctIndex: 1,
        explanation: "The `cap_setuid` capability grants the process permission to call the `setuid()` system call with UID 0 (root)."
      },
      {
        id: "r39-q2",
        type: "multiple-choice",
        question: "A root cron job executes a bash script every 5 minutes: `/opt/cleanup.sh`. You check permissions and see `-rwxrwxr-x 1 admin developers`. You are a member of the `developers` group. What is the attack vector?",
        options: [
          "None, because the file is owned by admin",
          "Because your group has write permissions (`w`), you can edit the script to add a command that spawns a root reverse shell or adds your user to `/etc/sudoers`",
          "You must crack admin's password with Hydra",
          "You must exploit a buffer overflow in cron"
        ],
        correctIndex: 1,
        explanation: "Because your group has write access to the script executed by root, appending commands executes them as root on the next cron cycle."
      }
    ],
    tasks: [
      {
        title: "Task 1: Identify Dangerous Capability",
        instruction: "Execute `getcap -r /usr/bin 2>/dev/null` to locate binaries with elevated kernel capabilities.",
        hints: [
          "Concept: Linux capability enumeration.",
          "Direction: Run getcap recursively on /usr/bin.",
          "Tool: `getcap`",
          "Syntax: `getcap -r /usr/bin 2>/dev/null`",
          "Explanation: Locates cap_setuid vector."
        ]
      }
    ],
    explainResult: "The `getcap` command inspected extended filesystem attributes (`security.capability`) on inodes in `/usr/bin`, exposing the `cap_setuid` bit.",
    securityConnection: "Privilege escalation is often where penetration tests demonstrate catastrophic business impact. A compromised web application allows access to public assets; root access allows complete exfiltration of all company data, intellectual property, and system secrets.",
    completion: {
      learned: [
        "Advanced Linux privilege escalation vectors",
        "Auditing scheduled Cron Jobs for writable script dependencies",
        "Enumerating and abusing Linux Kernel Capabilities (`cap_setuid`)",
        "PATH environment variable hijacking and GTFOBins techniques"
      ],
      practiced: [
        "getcap -r /usr/bin 2>/dev/null",
        "Auditing extended file attributes",
        "Mapping privilege escalation vectors"
      ]
    },
    nextRoomId: "room-40"
  },

  {
    id: "room-40",
    stage: 10,
    stageTitle: "Stage 10 — Junior Pentester",
    title: "Capstone Penetration Test: The Final Assessment",
    difficulty: "Advanced",
    difficultyBadge: "🔴 Advanced",
    estimatedTime: "60 min",
    prerequisites: "Rooms 01 through 39 (All stages)",
    whyAreYouHere: "You started this journey with zero knowledge: you learned what a computer is, how operating systems manage memory, how networks route packets, how web servers process HTTP requests, how vulnerabilities arise, and how security tools operate. Now, all training wheels come off! In this Capstone Room, you are assigned an isolated, realistic enterprise target: `10.10.10.100`. You must execute a complete, professional, multi-phase penetration test from reconnaissance to root, retrieve proof-of-compromise flags, and document your findings in a mini security report.",
    objectives: [
      "Phase 1: Perform active network reconnaissance and port scanning using Nmap",
      "Phase 2: Enumerate discovered web services and perform directory fuzzing",
      "Phase 3: Identify and exploit an authentication / injection flaw to gain an initial foothold shell",
      "Phase 4: Perform local Linux enumeration to discover a privilege escalation vector",
      "Phase 5: Escalate privileges to supreme `root` and retrieve the final evidence flag",
      "Phase 6: Synthesize your technical findings and remediation advice into a professional executive summary"
    ],
    vocabulary: [
      { term: "Capstone", definition: "A culminating project that synthesizes all knowledge, skills, and methodologies acquired throughout a curriculum into a realistic final practical test." },
      { term: "Initial Foothold", definition: "The very first point of unauthorized interactive access established on a target system (typically an unprivileged web shell or SSH session)." },
      { term: "Proof of Concept (PoC)", definition: "Demonstrable evidence (such as a screenshot, flag hash, or command output) verifying that an exploited vulnerability successfully achieved its intended effect." },
      { term: "Remediation", definition: "The technical steps, patches, configuration changes, or architectural redesigns prescribed to fix a vulnerability and prevent re-exploitation." }
    ],
    lessons: [
      {
        title: "1. The Capstone Mission Briefing",
        content: `Target Assigned: **Enterprise Intranet Server (\`10.10.10.100\`)**
Scope: Only \`10.10.10.100\` is authorized for testing.
Your Objective:
1. **Recon**: Run Nmap to discover open ports and service versions.
2. **Web Enumeration**: Fuzz endpoints to discover the hidden administrative interface.
3. **Exploitation**: Bypass login authentication via SQL Injection to obtain developer API credentials.
4. **Foothold**: Connect to the server terminal.
5. **Privilege Escalation**: Identify the misconfigured SUID / Sudo binary and drop a root shell.
6. **Capture the Flags**: Retrieve \`user.txt\` and \`root.txt\`.
7. **Report**: Document the remediation advice for each finding.`
      },
      {
        title: "2. The Pentester's Mindset",
        content: `Never rush straight into exploiting. When you find an open port, enumerate thoroughly:
• Read headers.
• Inspect source code comments.
• Test inputs systematically.
• Document every step with exact commands so the developers can reproduce and verify your fix.`
      }
    ],
    seeExamples: [
      {
        title: "The Multi-Stage Engagement Roadmap",
        codeOrDiagram: `[ 10.10.10.100: Scanned with Nmap ]
  ├── Port 22 (SSH)
  └── Port 80 (HTTP Apache 2.4.52)
          ↓
[ Web Recon: ffuf discovers /api/v2/auth ]
          ↓
[ Web Exploitation: SQLi bypass yields API token ]
          ↓
[ SSH Login: cadet@10.10.10.100 -> user.txt captured! ]
          ↓
[ Local Privesc: SUID find exploited via GTFOBins ]
          ↓
[ ROOT SHELL: whoami -> root -> root.txt captured! ]`,
        explanation: "The complete journey connects every single room you completed in this curriculum."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Initiate Phase 1 of the Capstone: Scan the target `10.10.10.100` using `nmap -sV -p 22,80 10.10.10.100`:",
      initialCommand: "",
      expectedCommand: "nmap -sV -p 22,80 10.10.10.100",
      simulatedOutput: "Starting Nmap 7.94\nNmap scan report for 10.10.10.100\nHost is up (0.0012s latency).\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.52 ((Ubuntu))\n[+] Phase 1 Complete! Target enumerated. Ports 22 and 80 active.",
      explanation: "Nmap successfully confirmed live services. Port 80 web application is your initial attack vector."
    },
    questions: [
      {
        id: "r40-q1",
        type: "multiple-choice",
        question: "In the complete penetration testing lifecycle, what is the correct and logical sequence of actions an ethical hacker executes against a target?",
        options: [
          "Exploit immediately -> Guess passwords -> Scan ports -> Delete logs",
          "Reconnaissance -> Service Enumeration -> Vulnerability Identification -> Controlled Exploitation -> Privilege Escalation -> Documentation & Reporting",
          "Write the executive report -> Run Nmap -> Shut down the server",
          "Install malware -> Demand ransom -> Format hard drive"
        ],
        correctIndex: 1,
        explanation: "Methodical testing follows: Recon -> Enumeration -> Vulnerability Analysis -> Exploitation -> Privilege Escalation -> Professional Reporting."
      },
      {
        id: "r40-q2",
        type: "multiple-choice",
        question: "Once an ethical penetration tester achieves root access and verifies proof of concept on an engagement, what is the most important final responsibility?",
        options: [
          "Bragging on public forums with client data",
          "Leaving backdoors so they can access the server in the future",
          "Cleaning up any test files, removing testing accounts, restoring modified configurations, and delivering a comprehensive remediation report to the client",
          "Installing cryptocurrency mining software"
        ],
        correctIndex: 2,
        explanation: "Professionalism requires complete cleanup of all testing artifacts and delivering a clear, actionable remediation report."
      }
    ],
    tasks: [
      {
        title: "Task 1: Execute Capstone Phase 1 Scan",
        instruction: "Scan the capstone target using `nmap -sV -p 22,80 10.10.10.100`.",
        hints: [
          "Concept: Phase 1 service enumeration.",
          "Direction: Specify ports 22 and 80 with -sV.",
          "Tool: `nmap`",
          "Syntax: `nmap -sV -p 22,80 10.10.10.100`",
          "Explanation: Initiates Capstone engagement."
        ]
      }
    ],
    explainResult: "You have verified active target services, initiating the final practical penetration testing assessment of the Endlessus curriculum.",
    securityConnection: "Completing an end-to-end penetration test simulates the daily responsibilities of a professional Junior Penetration Tester, Security Consultant, or Red Team Analyst.",
    practicalRoomLink: {
      label: "Ready for the complete hands-on engagement?",
      buttonText: "Launch Capstone Pentest in Practical Labs",
      url: "labs.html?lab=capstone"
    },
    completion: {
      learned: [
        "Synthesizing all 40 rooms into a unified professional methodology",
        "Executing multi-phase penetration testing from recon to root",
        "Extracting evidence flags and validating business risk",
        "Writing actionable remediation guidance for engineering teams"
      ],
      practiced: [
        "nmap -sV -p 22,80 10.10.10.100",
        "End-to-end penetration testing workflow",
        "Professional reporting and remediation"
      ]
    },
    nextRoomId: "room-01"
  }
];
