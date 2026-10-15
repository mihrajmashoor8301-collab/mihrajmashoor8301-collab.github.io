# scripts/level7.py
# Level 7: First Practical Security Labs (Rooms 40 - 45)

from generate_pre_security import DIAGRAMS

def get_rooms():
    return [
        # Room 40: Linux Command-Line Investigation
        {
            "stage": 7,
            "level": 7,
            "levelTitle": "Level 7 — First Practical Security Labs",
            "title": "Linux Command-Line Investigation",
            "difficulty": "Practical",
            "difficultyBadge": "🔴 Practical",
            "estimatedTime": "30 min",
            "prerequisites": "Level 6: Cybersecurity Fundamentals",
            "whyAreYouHere": "You have completed the theoretical foundations of computer architecture, operating systems, networking, web protocols, and cybersecurity principles. Now it is time to put your skills into practical action. In this room, you will conduct a simulated command-line investigation on a Linux system, navigating unfamiliar directory structures and extracting security evidence.",
            "objectives": [
                "Conduct a live terminal investigation using `whoami`, `pwd`, and `id`",
                "Navigate multi-level filesystem hierarchies using absolute and relative paths",
                "Inspect hidden configuration files using `ls -la` and `cat`",
                "Search and isolate specific indicator strings using `grep`",
                "Complete your first practical terminal challenge and extract verification tokens"
            ],
            "vocabulary": [
                {"term": "Triage", "definition": "The rapid assessment and initial inspection of a target system to determine its state, user context, and security posture."},
                {"term": "Artifact", "definition": "A piece of digital forensic evidence left on a computer (log entry, temporary file, bash history, downloaded script)."},
                {"term": "Flag Token", "definition": "A unique secret cryptographic string (e.g. flag{...}) hidden in practical labs to prove you successfully solved an objective."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. The 5-Step System Triage Methodology",
                    "content": "Whenever you land on an unknown terminal, execute this standard 5-step triage sequence:\n\n1. `whoami`: What user account am I running as?\n2. `id`: What groups and privileges do I possess?\n3. `pwd`: Where on the disk am I located?\n4. `uname -a`: What OS distribution and kernel version is running?\n5. `ls -la`: What files, hidden dots, and subfolders exist in my current location?"
                },
                {
                    "title": "2. Investigating Hidden Clues",
                    "content": "On Unix systems, files beginning with a dot (like `.bash_history` or `.env`) are hidden from standard `ls` output. Attackers and developers frequently hide API keys, credentials, and test notes in hidden files:\n\n`cadet@endlessus:~$ ls -la`\n\nAlways inspect the contents of `.bash_history`—it reveals what commands the previous administrator or attacker executed before you arrived!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Live Investigation Workflow",
                    "codeOrDiagram": "cadet@endlessus:~$ whoami\ncadet\ncadet@endlessus:~$ ls -la\ntotal 16\ndrwxr-xr-x 2 cadet cadet 4096 Oct 15 12:00 .\ndrwxr-xr-x 4 root  root  4096 Oct 15 11:00 ..\n-rw-r--r-- 1 cadet cadet  220 Oct 15 11:30 .bash_history\n-rw-r--r-- 1 cadet cadet  140 Oct 15 12:05 notes.txt\n\ncadet@endlessus:~$ cat notes.txt | grep -i \"secret\"\nFLAG: flag{linux_cli_investigation_complete}",
                    "explanation": "Stepping through triage, listing all files including hidden ones, and filtering for target secrets."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `whoami && pwd && ls -la` in the interactive terminal to perform standard initial triage:",
                "initialCommand": "",
                "expectedCommand": "whoami && pwd && ls -la",
                "simulatedOutput": "cadet\n/home/cadet\ntotal 8\n-rw-r--r-- 1 cadet cadet 140 Oct 15 12:05 notes.txt\n[+] Initial triage complete: Session identity and files cataloged.",
                "explanation": "Executes initial triage commands in sequence."
            },
            "questions": [
                {
                    "id": "q-40-1",
                    "type": "exact",
                    "question": "Which Linux utility prints the user's previously executed terminal commands, often examined by forensic investigators?",
                    "visualSlots": "_ _ _ _ _ _ _",
                    "acceptedAnswers": ["history"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "The word history.",
                    "explanation": "The `history` command (and `.bash_history` file) stores previous commands."
                },
                {
                    "id": "q-40-2",
                    "type": "multiple-choice",
                    "question": "What is the primary reason security practitioners run `ls -la` instead of just `ls` during system investigation?",
                    "options": [
                        "It runs faster by skipping file permissions",
                        "It displays hidden files (beginning with a dot) and full file metadata including permissions and modification dates",
                        "It automatically deletes temporary files",
                        "It reboots the computer if unauthorized files are found"
                    ],
                    "correctIndex": 1,
                    "hint": "Shows hidden files and permissions.",
                    "explanation": "`ls -la` exposes hidden dot-files and full permission/timestamp metadata essential for triage."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Complete initial triage sequence",
                    "instruction": "Execute `whoami && pwd && ls -la` in the terminal.",
                    "hints": ["Type: `whoami && pwd && ls -la`"]
                }
            ],
            "securityConnection": "In real-world incident response, capturing terminal history and inspecting current directory state without modifying file access times (preserving timestamps) is critical for courtroom admissibility of digital evidence."
        },

        # Room 41: File & Permission Auditing (lab-permissions)
        {
            "stage": 7,
            "level": 7,
            "levelTitle": "Level 7 — First Practical Security Labs",
            "title": "File & Permission Auditing (Practical Lab 02)",
            "difficulty": "Practical",
            "difficultyBadge": "🔴 Practical",
            "estimatedTime": "35 min",
            "prerequisites": "Room 40: Linux Command-Line Investigation",
            "whyAreYouHere": "A real-world Linux server stores thousands of sensitive files: database passwords in `config.php`, private SSH keys in `id_rsa`, and shadow password hashes. If a system administrator makes a configuration file world-writable or world-readable, any unprivileged user on the machine can read or tamper with it. In this lab, you audit and harden permissions on live files in the virtual environment.",
            "objectives": [
                "Audit directory permissions using `ls -la` to spot world-writable (`666` / `777`) security risks",
                "Inspect sensitive database credentials inside an insecure `config.php` file",
                "Harden the configuration file using `chmod 600 config.php` so only the owner has access",
                "Verify octal permission changes using `stat -c \"%a %n\" config.php`",
                "Extract the lab completion flag and verify it in the Endlessus engine"
            ],
            "vocabulary": [
                {"term": "World-Writable", "definition": "A file permission state where any user account on the entire system can modify or wipe the file contents (permissions ending in -w- or octal 2/6/7)."},
                {"term": "Hardening", "definition": "The defensive process of securing a system by reducing its vulnerability surface and enforcing strict least-privilege permissions."},
                {"term": "stat", "definition": "A Linux utility that displays detailed inode and status information about a file, including exact octal permission values."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Auditing config.php Permissions",
                    "content": "In this hands-on lab, your mission is to secure an enterprise web server:\n\n1. Type `ls -la config.php`.\n2. Notice the permissions: `-rw-rw-rw-` (octal `666`). This means *anyone* on the computer can view or modify the database credentials!\n3. Read the credentials using `cat config.php`.\n4. Apply least-privilege: Run `chmod 600 config.php` so only you can read and write to it.\n5. Verify with `stat -c \"%a %n\" config.php` to prove it is now `600`!"
                },
                {
                    "title": "2. Least Privilege and Credential Protection",
                    "content": "Configuration files like `config.php`, `.env`, and `database.yml` often contain high-value secrets: API keys, database credentials, and session tokens. If set to `666` or `777`, any local attacker or compromised web process can overwrite them or steal passwords. Hardening to `600` (`rw-------`) or `640` (`rw-r-----`) ensures that only the application service account or system administrator can access the file."
                }
            ],
            "seeExamples": [
                {
                    "title": "Expected Lab Commands",
                    "codeOrDiagram": "cadet@endlessus:~$ ls -la config.php\n-rw-rw-rw- 1 cadet cadet 840 Oct 15 11:00 config.php\n\ncadet@endlessus:~$ cat config.php\n// DB_PASS = SuperSecretDatabasePassword!\n\ncadet@endlessus:~$ chmod 600 config.php\ncadet@endlessus:~$ stat -c \"%a %n\" config.php\n600 config.php",
                    "explanation": "Auditing permissions, inspecting contents, and locking down with `chmod 600`."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `ls -la config.php && cat config.php` to audit the insecure configuration file:",
                "initialCommand": "",
                "expectedCommand": "ls -la config.php && cat config.php",
                "simulatedOutput": "-rw-rw-rw- 1 cadet cadet 840 Oct 15 11:00 config.php\nDB_HOST=10.10.10.50\nDB_USER=app_db\nDB_PASS=SuperSecretDatabasePass!123\n[+] Credentials exposed: Insecure world-writable file verified.",
                "explanation": "Exposes world-writable permissions and cleartext credentials."
            },
            "questions": [
                {
                    "id": "q-41-1",
                    "type": "exact",
                    "question": "What 3-digit octal permission value restricts a sensitive file to owner-read/write only (rw-------)?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["600"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Three digits: 600.",
                    "explanation": "Octal 600 enforces rw------- (owner read/write only)."
                },
                {
                    "id": "q-41-2",
                    "type": "multiple-choice",
                    "question": "Why is a file with octal permissions 777 considered a severe security vulnerability for configuration files?",
                    "options": [
                        "It makes the computer run 7 times slower",
                        "It grants read, write, and execute permissions to every single user on the system, allowing unprivileged accounts to tamper with it",
                        "It corrupts the SSD file tables",
                        "It disables all network adapters"
                    ],
                    "correctIndex": 1,
                    "hint": "Full access granted to all users.",
                    "explanation": "777 grants universal read, write, and execute rights to all users, violating the principle of least privilege."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Audit and harden config.php",
                    "instruction": "Open the Practice Terminal or Lab 02 to audit config.php and execute `chmod 600 config.php`.",
                    "hints": [
                        "Type: `ls -la config.php`",
                        "Type: `chmod 600 config.php`",
                        "Type: `stat -c \"%a %n\" config.php`"
                    ]
                }
            ],
            "securityConnection": "This lab directly mirrors **Lab 02: Linux Permissions & Octal Masking** (`lab-permissions`) in the Endlessus terminal engine. Completing it grants practical XP and reinforces system administration best practices."
        },

        # Room 42: HTTP Security Headers Auditing (lab-headers)
        {
            "stage": 7,
            "level": 7,
            "levelTitle": "Level 7 — First Practical Security Labs",
            "title": "HTTP Security Headers Auditing (Practical Lab 01)",
            "difficulty": "Practical",
            "difficultyBadge": "🔴 Practical",
            "estimatedTime": "35 min",
            "prerequisites": "Room 41: File & Permission Auditing",
            "whyAreYouHere": "Web browsers respect security policies sent by servers in HTTP headers. If an organization forgets to configure `Strict-Transport-Security` (HSTS), users are susceptible to SSL stripping attacks. If they omit `X-Frame-Options`, the website can be framed inside a malicious site to steal clicks (Clickjacking). In this lab, you audit a staging financial server using curl pipelines and inspect hardened Nginx configurations.",
            "objectives": [
                "Audit live server response headers using `curl -I https://staging.acmefin.local`",
                "Isolate missing HSTS headers using `curl -I https://staging.acmefin.local | grep -i strict`",
                "Audit iframe framing protection using `curl -I https://staging.acmefin.local | grep -i frame`",
                "Inspect session cookie security flags using `curl -I https://staging.acmefin.local | grep -i set-cookie`",
                "Review the production hardened Nginx configuration in `/etc/nginx/conf.d/security.conf` and submit the flag"
            ],
            "vocabulary": [
                {"term": "SSL Stripping", "definition": "An attack where an adversary intercepts HTTP traffic and prevents the browser from upgrading to secure HTTPS."},
                {"term": "Clickjacking", "definition": "A visual deception attack where an attacker overlays transparent iframes over legitimate buttons to trick users into clicking unintended links."},
                {"term": "Header Pipeline", "definition": "Piping curl header queries directly into grep filter expressions to automate compliance checks."}
            ],
            "diagramSvg": DIAGRAMS["http"],
            "lessons": [
                {
                    "title": "1. Auditing the Staging Server",
                    "content": "In Lab 01, you evaluate Acme Finance's staging web server:\n\n1. Run `curl -I https://staging.acmefin.local` to inspect all returned headers.\n2. Check HSTS: `curl -I https://staging.acmefin.local | grep -i strict` (Returns no match because HSTS is missing!).\n3. Check Framing: `curl -I https://staging.acmefin.local | grep -i frame` (Missing X-Frame-Options!).\n4. Inspect Cookies: `curl -I https://staging.acmefin.local | grep -i set-cookie`.\n5. Read the hardened configuration: `cat /etc/nginx/conf.d/security.conf` to discover the security configuration flag!"
                },
                {
                    "title": "2. Browser-Enforced Security Policies",
                    "content": "HTTP security headers are instructions given by web servers to web browsers. Without `Strict-Transport-Security`, an active network adversary can perform SSL stripping to downgrade requests to unencrypted HTTP. Without `X-Frame-Options` (or `Content-Security-Policy: frame-ancestors`), attackers can embed the target application in an iframe to execute Clickjacking attacks. Auditing these headers with `curl -I` is a standard step in every web security assessment."
                }
            ],
            "seeExamples": [
                {
                    "title": "Auditing with curl Pipelines",
                    "codeOrDiagram": "cadet@endlessus:~$ curl -I https://staging.acmefin.local | grep -i strict\n(Empty - HSTS Missing!)\n\ncadet@endlessus:~$ cat /etc/nginx/conf.d/security.conf\nadd_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;\nadd_header X-Frame-Options \"DENY\" always;\n# FLAG: flag{strict_transport_security_csp}",
                    "explanation": "Auditing staging headers and reviewing the hardened Nginx configuration file."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `curl -I https://staging.acmefin.local | grep -i strict` to audit HSTS:",
                "initialCommand": "",
                "expectedCommand": "curl -I https://staging.acmefin.local | grep -i strict",
                "simulatedOutput": "[!] Audit Check: Strict-Transport-Security header is MISSING on staging server.",
                "explanation": "Executes header audit pipeline."
            },
            "questions": [
                {
                    "id": "q-42-1",
                    "type": "exact",
                    "question": "What curl flag requests only the HTTP response headers, omitting the document body?",
                    "visualSlots": "- _",
                    "acceptedAnswers": ["-I", "--head"],
                    "caseSensitive": True,
                    "trimWhitespace": True,
                    "hint": "Capital letter I: -I.",
                    "explanation": "The `-I` flag tells curl to make a HEAD request and print response headers only."
                },
                {
                    "id": "q-42-2",
                    "type": "multiple-choice",
                    "question": "What is the primary security purpose of the Strict-Transport-Security (HSTS) header?",
                    "options": [
                        "It compresses HTML images using gzip",
                        "It forces web browsers to communicate exclusively over encrypted HTTPS, preventing SSL stripping downgrade attacks",
                        "It blocks SQL injection queries",
                        "It automatically deletes user cookies upon browser close"
                    ],
                    "correctIndex": 1,
                    "hint": "Forces HTTPS encryption.",
                    "explanation": "HSTS instructs browsers to strictly use HTTPS, permanently mitigating SSL stripping attacks."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Run HSTS and X-Frame audit",
                    "instruction": "Open Lab 01 in the Practice Terminal to audit staging headers.",
                    "hints": [
                        "Type: `curl -I https://staging.acmefin.local | grep -i strict`",
                        "Type: `curl -I https://staging.acmefin.local | grep -i frame`",
                        "Type: `cat /etc/nginx/conf.d/security.conf`"
                    ]
                }
            ],
            "securityConnection": "This lab directly maps to **Lab 01: HTTP Security Headers Hardening** (`lab-headers`), allowing you to practice real-world web server hardening and verify flags directly in the platform."
        },

        # Room 43: Network Service & Port Reconnaissance (lab-network)
        {
            "stage": 7,
            "level": 7,
            "levelTitle": "Level 7 — First Practical Security Labs",
            "title": "Network Service & Port Reconnaissance (Practical Lab 08)",
            "difficulty": "Practical",
            "difficultyBadge": "🔴 Practical",
            "estimatedTime": "35 min",
            "prerequisites": "Room 42: HTTP Security Headers Auditing",
            "whyAreYouHere": "Before an ethical hacker can test a server, they must discover what ports and services are listening across the network. Running an Nmap scan reveals open doors (SSH on port 22, web on port 80, SMB on port 445). Connecting to those ports allows you to grab service version banners and enumerate unauthenticated anonymous shares. In this room, you will perform active network reconnaissance.",
            "objectives": [
                "Perform an active network port scan using `nmap -sS -sV 10.10.20.15`",
                "Scan specific target ports using `nmap -sV -p 21 10.10.20.15`",
                "Perform banner grabbing using `nc -vn 10.10.20.15 21` to identify service versions",
                "Enumerate anonymous SMB network shares using `smbclient -L //10.10.20.15 -N`",
                "Download exposed files and submit the network lab flag"
            ],
            "vocabulary": [
                {"term": "Nmap (Network Mapper)", "definition": "The industry-standard open-source network scanner used for network discovery and vulnerability assessment."},
                {"term": "SYN Scan (-sS)", "definition": "A fast, stealthy port scanning technique that sends SYN packets and measures responses without completing the full TCP handshake."},
                {"term": "Version Detection (-sV)", "definition": "An Nmap scan feature that probes open ports to determine the exact software name and version number running."},
                {"term": "SMB (Server Message Block)", "definition": "A network file sharing protocol operating on port 445 widely used in Windows and Linux environments."}
            ],
            "diagramSvg": DIAGRAMS["handshake"],
            "lessons": [
                {
                    "title": "1. Active Network Reconnaissance with Nmap",
                    "content": "In Lab 08, your target is `10.10.20.15`:\n\n1. Scan open ports: `nmap -sS -sV 10.10.20.15`.\n   - Discovers Port 21 (FTP), Port 80 (HTTP), and Port 445 (SMB) are open!\n2. Grab the FTP version banner: `nc -vn 10.10.20.15 21`.\n3. Enumerate SMB shares without a password (`-N` null session):\n   `smbclient -L //10.10.20.15 -N`.\n   - Reveals an accessible share: `//10.10.20.15/public`!\n4. Access the share to download and inspect `flag.txt`!"
                },
                {
                    "title": "2. Port Scanning & Service Identification Principles",
                    "content": "A port scan is the digital equivalent of testing every door and window on a building to see which are unlocked. When Nmap finds an open port, service version detection (`-sV`) sends specialized probes to determine the daemon software and version (such as vsftpd 3.0.3). Banner grabbing with Netcat confirms this directly. Unauthenticated services like anonymous SMB or FTP frequently leak sensitive company documents and configuration backups."
                }
            ],
            "seeExamples": [
                {
                    "title": "Nmap Scanning and SMB Enumeration",
                    "codeOrDiagram": "cadet@endlessus:~$ nmap -sV -p 21 10.10.20.15\nPORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 3.0.3\n\ncadet@endlessus:~$ smbclient -L //10.10.20.15 -N\n        Sharename       Type      Comment\n        ---------       ----      -------\n        public          Disk      Public Department Share",
                    "explanation": "Scanning port 21 identifies FTP version; smbclient lists accessible anonymous file shares."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `nmap -sV -p 21 10.10.20.15` in the terminal to scan the target FTP port:",
                "initialCommand": "",
                "expectedCommand": "nmap -sV -p 21 10.10.20.15",
                "simulatedOutput": "Starting Nmap 7.94\nPORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 3.0.3\n[+] Scan complete: vsftpd 3.0.3 detected on port 21.",
                "explanation": "`nmap -sV` performs version detection on port 21."
            },
            "questions": [
                {
                    "id": "q-43-1",
                    "type": "exact",
                    "question": "What is the primary command-line tool used by cybersecurity professionals worldwide to perform network port scanning?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["nmap"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Network Mapper abbreviation.",
                    "explanation": "Nmap is the premier network scanning utility."
                },
                {
                    "id": "q-43-2",
                    "type": "multiple-choice",
                    "question": "Which Nmap flag instructs the scanner to probe open ports to identify running service software and version numbers?",
                    "options": [
                        "-sV",
                        "-p-",
                        "-O",
                        "-A"
                    ],
                    "correctIndex": 0,
                    "hint": "Version flag.",
                    "explanation": "The `-sV` flag enables service version detection."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Perform port scan with Nmap",
                    "instruction": "Open Lab 08 in the Practice Terminal to scan target 10.10.20.15.",
                    "hints": [
                        "Type: `nmap -sS -sV 10.10.20.15`",
                        "Type: `nc -vn 10.10.20.15 21`",
                        "Type: `smbclient -L //10.10.20.15 -N`"
                    ]
                }
            ],
            "securityConnection": "This lab directly maps to **Lab 08: Network Service & SMB Enumeration** (`lab-network`), providing safe hands-on experience scanning live targets and extracting information from unauthenticated network services."
        },

        # Room 44: Security Incident Log Analysis (lab-logs)
        {
            "stage": 7,
            "level": 7,
            "levelTitle": "Level 7 — First Practical Security Labs",
            "title": "Security Incident Log Analysis (Practical Lab 09)",
            "difficulty": "Practical",
            "difficultyBadge": "🔴 Practical",
            "estimatedTime": "35 min",
            "prerequisites": "Room 43: Network Service & Port Reconnaissance",
            "whyAreYouHere": "When a company experiences a breach, incident response analysts reconstruct the attacker's timeline by analyzing web and system logs. In this practical lab, you investigate a compromised web server by analyzing Apache `access.log` and Linux `auth.log` to track an attacker who exploited directory traversal to upload a web shell, and identify an ongoing SSH brute-force attack.",
            "objectives": [
                "Inspect web server access logs with `cat access.log | head -n 2`",
                "Isolate web directory traversal attacks using regex filters `grep -E \"\\.\\./\" access.log`",
                "Trace malicious web shell uploads using `grep uploads access.log`",
                "Identify external SSH brute-force attacks in `auth.log` using `grep \"Failed password\" auth.log`",
                "Synthesize findings in `incident_summary.txt` and verify the incident response flag"
            ],
            "vocabulary": [
                {"term": "Web Shell", "definition": "A malicious script (PHP, ASP, JSP) uploaded to a web server that provides an attacker with remote command execution capabilities through a web browser."},
                {"term": "Brute-Force Attack", "definition": "An automated trial-and-error attack that systematically attempts thousands of username and password combinations until the correct one is found."},
                {"term": "auth.log", "definition": "The standard Linux authentication log file (`/var/log/auth.log`) that records all user logins, failed passwords, and sudo executions."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Forensic Investigation Steps",
                    "content": "In Lab 09, you investigate an enterprise security incident:\n\n1. Inspect raw web traffic: `cat access.log | head -n 2`.\n2. Isolate directory traversal attempts: `grep -E \"\\.\\./\" access.log`.\n   - You spot an attacker testing `../../../../etc/passwd`!\n3. Search for malicious file uploads: `grep uploads access.log`.\n   - You identify the attacker uploading `shell.php` to `/uploads/shell.php`!\n4. Inspect SSH authentication logs: `grep \"Failed password\" auth.log`.\n   - Reveals thousands of failed login attempts against root from external IP `198.51.100.23`!\n5. Record findings in `incident_summary.txt` and retrieve the flag!"
                },
                {
                    "title": "2. Attack Reconstruction and Log Correlation",
                    "content": "Security incident response is digital detective work. By cross-referencing timestamps between web server access logs (`access.log`) and operating system authentication logs (`auth.log`), analysts prove an attacker's complete kill chain: from initial web directory traversal and web shell execution to brute-forcing SSH credentials from the exact same external IP address."
                }
            ],
            "seeExamples": [
                {
                    "title": "Isolating Attacks in Logs",
                    "codeOrDiagram": "cadet@endlessus:~$ grep -E \"\\.\\./\" access.log\n198.51.100.23 - - [15/Oct/2026:10:14:02] \"GET /view?file=../../etc/passwd HTTP/1.1\" 200 1840\n\ncadet@endlessus:~$ grep \"Failed password\" auth.log | head -n 2\nOct 15 10:15:01 server sshd[4201]: Failed password for root from 198.51.100.23 port 51240 ssh2\nOct 15 10:15:03 server sshd[4203]: Failed password for root from 198.51.100.23 port 51242 ssh2",
                    "explanation": "Filtering access and authentication logs proves attacker IP 198.51.100.23 performed both directory traversal and SSH brute force."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `grep \"Failed password\" auth.log | head -n 2` to inspect SSH brute-force attack attempts:",
                "initialCommand": "",
                "expectedCommand": "grep \"Failed password\" auth.log | head -n 2",
                "simulatedOutput": "Oct 15 10:15:01 server sshd[4201]: Failed password for root from 198.51.100.23 port 51240 ssh2\nOct 15 10:15:03 server sshd[4203]: Failed password for root from 198.51.100.23 port 51242 ssh2\n[+] Incident evidence isolated: SSH brute-force detected from IP 198.51.100.23.",
                "explanation": "Extracts failed authentication events from auth.log."
            },
            "questions": [
                {
                    "id": "q-44-1",
                    "type": "exact",
                    "question": "Which standard Linux log file (/var/log/...) records user logins, failed password attempts, and sudo authentication events?",
                    "visualSlots": "_ _ _ _ . _ _ _",
                    "acceptedAnswers": ["auth.log"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Eight characters: auth.log.",
                    "explanation": "/var/log/auth.log records system authentication activity."
                },
                {
                    "id": "q-44-2",
                    "type": "multiple-choice",
                    "question": "In a web access log, what does a pattern like `/view?file=../../../../etc/passwd` signify?",
                    "options": [
                        "A normal CSS stylesheet request",
                        "A Directory Traversal / Path Traversal attack attempting to access files outside the web root",
                        "A Denial of Service flood",
                        "An SQL database backup"
                    ],
                    "correctIndex": 1,
                    "hint": "Path traversal pattern: dot-dot-slash.",
                    "explanation": "Using '../' sequences to climb out of the web document root is a Path Traversal attack."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Complete log investigation",
                    "instruction": "Open Lab 09 in the Practice Terminal to analyze access.log and auth.log.",
                    "hints": [
                        "Type: `grep -E \"\\.\\./\" access.log`",
                        "Type: `grep uploads access.log`",
                        "Type: `grep \"Failed password\" auth.log`",
                        "Type: `cat incident_summary.txt`"
                    ]
                }
            ],
            "securityConnection": "This lab directly maps to **Lab 09: Security Incident Log Analysis** (`lab-logs`), giving you practical experience tracking real attack sequences through log files."
        },

        # Room 45: Pre Security Capstone Challenge (lab-capstone)
        {
            "stage": 7,
            "level": 7,
            "levelTitle": "Level 7 — First Practical Security Labs",
            "title": "Pre Security Capstone Challenge (Practical Lab 13)",
            "difficulty": "Practical",
            "difficultyBadge": "🔴 Practical",
            "estimatedTime": "45 min",
            "prerequisites": "Room 44: Security Incident Log Analysis",
            "whyAreYouHere": "Congratulations! You have arrived at the final culmination of the Endlessus Pre Security pathway. In this multi-step capstone challenge, you synthesize everything you have learned: network port scanning with Nmap, discovering web administration login endpoints, bypassing authentication via SQL Injection, investigating compromised systems from the command line, and escalating privileges to root. This room marks the completion of the Pre Security curriculum!",
            "objectives": [
                "Execute an end-to-end authorized penetration testing workflow against an enterprise target",
                "Scan target `10.10.10.100` using Nmap to discover open SSH and HTTP ports",
                "Discover hidden administrative endpoints at `/api/v2/auth` using curl",
                "Bypass administrative authentication using an SQL Injection payload",
                "Extract the initial access user flag from `user.txt`",
                "Identify SUID privilege escalation vectors and extract the root completion flag from `/root/root.txt`"
            ],
            "vocabulary": [
                {"term": "Capstone", "definition": "A comprehensive culminating project that integrates and tests all skills learned across an entire curriculum."},
                {"term": "Lateral Movement", "definition": "Techniques an attacker uses to extend access to other systems and accounts across a network."},
                {"term": "Privilege Escalation", "definition": "The act of exploiting a bug, design flaw, or configuration oversight in an operating system to gain elevated access (root / SYSTEM)."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. The 6-Step Capstone Pentest Workflow",
                    "content": "In Lab 13, you put all pieces together against enterprise host `10.10.10.100`:\n\n1. **Reconnaissance**: `nmap -sV -p 22,80 10.10.10.100` (discovers SSH and HTTP services).\n2. **Endpoint Discovery**: `curl -s http://10.10.10.100/` and discover `/api/v2/auth`.\n3. **Auth Bypass**: Test credentials with SQL Injection payload `admin'--`.\n4. **User Access**: Retrieve your initial access flag: `cat user.txt`.\n5. **Privilege Escalation**: Search for SUID binaries: `find / -perm -4000 -type f 2>/dev/null`.\n6. **Root Capture**: Elevate privileges and read `/root/root.txt` to capture the final flag!"
                },
                {
                    "title": "2. The Ethical Security Mindset & Continuous Learning",
                    "content": "Completing this Capstone challenge proves that you have mastered the fundamental building blocks of cybersecurity: from how computers store bits and execute CPU instructions, to how IP packets cross routers, how web applications process HTTP requests, and how vulnerabilities are responsibly identified. As you graduate from Pre Security to Junior Penetration Testing, remember the Golden Rule of Ethical Hacking: Authorization, Scope, and Professionalism."
                }
            ],
            "seeExamples": [
                {
                    "title": "Capstone Execution Steps",
                    "codeOrDiagram": "cadet@endlessus:~$ nmap -sV -p 22,80 10.10.10.100\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9\n80/tcp open  http    nginx/1.24.0\n\ncadet@endlessus:~$ cat user.txt\nFLAG: flag{capstone_user_access_granted}\n\ncadet@endlessus:~$ cat /root/root.txt\nFLAG: flag{capstone_enterprise_domain_compromised}",
                    "explanation": "Scanning, gaining initial user access, escalating privileges, and reading the root capstone flag."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `nmap -sV -p 22,80 10.10.10.100` in the terminal to initiate the Capstone reconnaissance scan:",
                "initialCommand": "",
                "expectedCommand": "nmap -sV -p 22,80 10.10.10.100",
                "simulatedOutput": "Starting Nmap 7.94\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9\n80/tcp open  http    nginx/1.24.0\n[+] Target profiled: Enterprise gateway active on ports 22 and 80.",
                "explanation": "Scans ports 22 and 80 on target 10.10.10.100."
            },
            "questions": [
                {
                    "id": "q-45-1",
                    "type": "exact",
                    "question": "Which Linux find flag searches for files with the SUID (Set User ID) permission bit set (e.g. -perm -4000)?",
                    "visualSlots": "- _ _ _ _",
                    "acceptedAnswers": ["-perm"],
                    "caseSensitive": True,
                    "trimWhitespace": True,
                    "hint": "Five characters: -perm.",
                    "explanation": "The `-perm` flag instructs `find` to filter by permission bits (e.g. `-perm -4000`)."
                },
                {
                    "id": "q-45-2",
                    "type": "multiple-choice",
                    "question": "What is the final stage of a penetration test after discovering vulnerabilities and escalating privileges?",
                    "options": [
                        "Deleting all client database backups",
                        "Reporting findings with actionable remediation steps, and cleaning up test artifacts",
                        "Publishing customer passwords on social media",
                        "Refusing to tell the client what was found"
                    ],
                    "correctIndex": 1,
                    "hint": "Professional reporting and remediation.",
                    "explanation": "Professional ethical hacking culminates in clear reporting, remediation guidance, and complete cleanup."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Complete Capstone Challenge",
                    "instruction": "Open Lab 13 in the Practice Terminal to execute the full capstone pentest workflow.",
                    "hints": [
                        "Type: `nmap -sV -p 22,80 10.10.10.100`",
                        "Type: `curl http://10.10.10.100/api/v2/auth`",
                        "Type: `cat user.txt`",
                        "Type: `cat /root/root.txt`"
                    ]
                }
            ],
            "securityConnection": "This capstone directly maps to **Lab 13: Capstone Pentest: Final Enterprise Target** (`lab-capstone`), bringing together all Pre Security foundations into a cohesive hands-on achievement!"
        }
    ]
