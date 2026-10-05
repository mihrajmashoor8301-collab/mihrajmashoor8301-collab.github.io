// curriculum/stage5.js
module.exports = [
  {
    id: "room-19",
    stage: 5,
    stageTitle: "Stage 5 — Security Tools",
    title: "Linux Security Practitioner Toolkit",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Stage 4 (Cybersecurity Fundamentals)",
    whyAreYouHere: "Before installing specialized hacking frameworks, professional security engineers and incident responders rely heavily on native Linux command-line utilities. These tools exist on almost every server worldwide. In this room, you will master the security analyst's core toolkit: `grep` (pattern search), `find` (locating files), `strings` (binary analysis), `curl` (request crafting), and process auditing utilities.",
    objectives: [
      "Master text searching and log carving using `grep` with regular expressions",
      "Find sensitive files and misconfigurations using the powerful `find` command",
      "Extract human-readable strings from compiled binary malware using `strings`",
      "Automate network and file downloads using `curl` and `wget`",
      "Audit active processes and resource consumption using `ps aux` and `top`"
    ],
    vocabulary: [
      { term: "grep", definition: "A Unix command-line utility used to search plain-text data sets for lines that match a regular expression or keyword." },
      { term: "find", definition: "A command-line utility that searches one or more directory trees for files meeting specific criteria (size, permissions, name, time)." },
      { term: "strings", definition: "A utility that scans binary executable files and outputs sequences of printable characters at least 4 characters long." },
      { term: "Piping (`|`)", definition: "A shell operator that feeds the standard output of one command directly into the standard input of another command." },
      { term: "ps aux", definition: "A command that lists every active running process on the system along with owner, PID, CPU/RAM usage, and command path." }
    ],
    lessons: [
      {
        title: "1. The Big Three: grep, find, and strings",
        content: `• \`grep -rn "password" /var/www/\`: Searches recursively (\`-r\`) with line numbers (\`-n\`) through all web source code for hardcoded passwords.
• \`find / -name "*.conf" 2>/dev/null\`: Searches the entire drive for configuration files, hiding error messages (\`2>/dev/null\`).
• \`strings suspicious.bin | grep -i "http"\`: Extracts text embedded inside an unknown compiled binary and filters for network URLs or C2 domains.`
      },
      {
        title: "2. The Power of Unix Pipes (`|`)",
        content: `The Unix philosophy is: *Build small programs that do one thing well, and connect them together with pipes*.
Example: \`ps aux | grep "python" | awk '{print $2}'\`
This lists all processes, filters for Python scripts, and extracts only their Process IDs!`
      }
    ],
    seeExamples: [
      {
        title: "Carving Secrets with grep and find",
        codeOrDiagram: `cadet@endlessus:~$ grep -rEi "api[_-]?key" /etc/webapp/
/etc/webapp/config.py:  AWS_API_KEY = "AKIAIOSFODNN7EXAMPLE"
/etc/webapp/db.json:    "api_key": "sec_live_99214a8"

cadet@endlessus:~$ find /home -type f -perm -0400 2>/dev/null
/home/cadet/.ssh/id_rsa`,
        explanation: "Combining recursive grep with case-insensitive search (`-i`) quickly locates hardcoded credentials left behind by developers."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Search the `/var/log/audit.log` file for all occurrences of 'FAILED_LOGIN' using grep: `grep \"FAILED_LOGIN\" /var/log/audit.log`:",
      initialCommand: "",
      expectedCommand: "grep \"FAILED_LOGIN\" /var/log/audit.log",
      simulatedOutput: "Oct  5 16:30:12 auth-svc: FAILED_LOGIN user=admin src=192.168.1.99 port=44122\nOct  5 16:30:14 auth-svc: FAILED_LOGIN user=root src=192.168.1.99 port=44124\nOct  5 16:30:16 auth-svc: FAILED_LOGIN user=test src=192.168.1.99 port=44126\n[+] Success! 3 failed login attempts isolated from IP 192.168.1.99.",
      explanation: "`grep` quickly extracts only the lines of interest out of thousands of log entries."
    },
    questions: [
      {
        id: "r19-q1",
        type: "multiple-choice",
        question: "Which Linux utility scans a compiled, unreadable binary file and prints out all ASCII and UTF-8 printable text strings embedded inside it?",
        options: [
          "strings",
          "cat",
          "rm",
          "fdisk"
        ],
        correctIndex: 0,
        explanation: "`strings` extracts readable sequences from binary code, often revealing hardcoded passwords, IP addresses, or author names."
      },
      {
        id: "r19-q2",
        type: "command-interpretation",
        question: "In the command `grep -rn \"SECRET\" /home/cadet/`, what does the `-r` flag specify?",
        options: [
          "Remove matching files",
          "Search recursively through all subdirectories",
          "Reverse the search results",
          "Restart the computer after completion"
        ],
        correctIndex: 1,
        explanation: "The `-r` (or `-R`) flag instructs grep to search recursively into all subdirectories."
      }
    ],
    tasks: [
      {
        title: "Task 1: Search Audit Log with Grep",
        instruction: "Execute `grep \"FAILED_LOGIN\" /var/log/audit.log` to identify failed authentication events.",
        hints: [
          "Concept: Filter text lines matching a string.",
          "Direction: Use grep with target string and filepath.",
          "Tool: `grep`",
          "Syntax: `grep \"FAILED_LOGIN\" /var/log/audit.log`",
          "Explanation: Isolates brute-force indicators."
        ]
      }
    ],
    explainResult: "The `grep` command buffered the log file line by line, evaluated each against the regex pattern, and printed matches to standard output.",
    securityConnection: "During incident triage, attackers may delete source code or replace system binaries with trojans. Incident responders use `strings`, `grep`, and `find -mtime` to reconstruct timelines and extract command-and-control server IPs without needing high-end commercial forensics software.",
    completion: {
      learned: [
        "How to use grep for rapid log analysis and credential hunting",
        "How to use find to locate sensitive or misconfigured files",
        "Extracting ASCII artifacts from compiled binaries using strings",
        "Chaining commands together using Unix pipes"
      ],
      practiced: [
        "grep \"FAILED_LOGIN\" /var/log/audit.log",
        "Piping command outputs",
        "Carving forensic log evidence"
      ]
    },
    nextRoomId: "room-20"
  },

  {
    id: "room-20",
    stage: 5,
    stageTitle: "Stage 5 — Security Tools",
    title: "Nmap & Network Enumeration",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 08 (Ports & Services) & Room 19 (Linux Toolkit)",
    whyAreYouHere: "You now know what IP addresses, ports, and TCP handshakes are. How does a penetration tester discover what services and vulnerabilities are live on a target network? The undisputed industry standard tool is **Nmap (Network Mapper)**. In this room, you will learn how Nmap scans ports, detects service versions, identifies operating systems, and uses the Nmap Scripting Engine (NSE).",
    objectives: [
      "Understand what network port scanning is and how Nmap functions",
      "Learn the difference between a TCP Connect scan (`-sT`) and a TCP SYN Stealth scan (`-sS`)",
      "Perform Service and Version detection using `-sV`",
      "Use the Nmap Scripting Engine (`-sC` / `--script`) to automate vulnerability checks",
      "Interpret Nmap scan results to build a target attack profile"
    ],
    vocabulary: [
      { term: "Nmap (Network Mapper)", definition: "An open-source network scanner used to discover hosts, open ports, running services, and operating systems on a network." },
      { term: "SYN Stealth Scan (`-sS`)", definition: "A default Nmap scan that sends SYN packets and tears down the connection with RST upon receiving SYN-ACK, avoiding full session completion." },
      { term: "Connect Scan (`-sT`)", definition: "An unprivileged TCP scan that completes the full 3-way handshake via the operating system's `connect()` system call." },
      { term: "Version Detection (`-sV`)", definition: "Nmap sends protocol-specific probes to listening ports to determine the exact software product and version (e.g. Apache 2.4.52)." },
      { term: "NSE (Nmap Scripting Engine)", definition: "A Lua-based scripting framework that allows Nmap to automate vulnerability detection, brute forcing, and advanced enumeration." }
    ],
    lessons: [
      {
        title: "1. The Anatomy of an Nmap Scan",
        content: `A standard professional Nmap command:
\`\`\`bash
nmap -sC -sV -p- -T4 -oN target_scan.txt 10.10.10.25
\`\`\`
• \`-sC\`: Runs default safe NSE enumeration scripts.
• \`-sV\`: Interrogates open ports to extract service banners and software versions.
• \`-p-\`: Scans all 65,535 ports (instead of just the top 1,000 defaults).
• \`-T4\`: Sets aggressive timing template (faster scanning).
• \`-oN\`: Saves output to a normal text file for your pentest report.
• \`10.10.10.25\`: The target host IP.`
      },
      {
        title: "2. Port States: Open, Closed, Filtered",
        content: `• **Open**: Target replied with \`SYN-ACK\`. An active service is accepting connections.
• **Closed**: Target replied with \`RST\` (Reset). The host is alive, but no program is listening on that port.
• **Filtered**: No response received (or ICMP unreachable). A firewall dropped or blocked your probe.`
      }
    ],
    seeExamples: [
      {
        title: "Sample Nmap Output Breakdown",
        codeOrDiagram: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 10.10.10.25
Host is up (0.0021s latency).
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    Apache httpd 2.4.52 ((Ubuntu))
|_http-server-header: Apache/2.4.52 (Ubuntu)
|_http-title: Corporate Intranet Portal
445/tcp  open  netbios Samba smbd 4.6.2`,
        explanation: "Notice the detail: Nmap reveals exact software versions (OpenSSH 8.9p1, Apache 2.4.52, Samba 4.6.2). These versions can be looked up in vulnerability databases!"
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Run an Nmap service version scan against lab target `10.10.10.25` using `nmap -sV -p 22,80,445 10.10.10.25`:",
      initialCommand: "",
      expectedCommand: "nmap -sV -p 22,80,445 10.10.10.25",
      simulatedOutput: "Starting Nmap 7.94\nNmap scan report for 10.10.10.25\nPORT    STATE SERVICE VERSION\n22/tcp  open  ssh     OpenSSH 8.9p1 Ubuntu\n80/tcp  open  http    Apache httpd 2.4.52\n445/tcp open  smb     Samba smbd 4.6.2\nService Info: OS: Linux\n[+] Success! Target services fingerprinted.",
      explanation: "Nmap sent protocol probes and matched banners against its fingerprint database (`nmap-service-probes`)."
    },
    questions: [
      {
        id: "r20-q1",
        type: "multiple-choice",
        question: "Why is an Nmap TCP SYN scan (`-sS`) often referred to as a 'Stealth' or 'Half-Open' scan?",
        options: [
          "It uses AES encryption to hide packets from routers",
          "It sends a RST packet immediately upon receiving a SYN-ACK, closing the connection before the target application layer logs a completed session",
          "It changes the MAC address of the target server",
          "It only scans closed ports"
        ],
        correctIndex: 1,
        explanation: "Because the 3-way handshake is never completed, older application firewalls did not log the event in service connection logs."
      },
      {
        id: "r20-q2",
        type: "multiple-choice",
        question: "When Nmap reports a port state as 'Filtered', what does this indicate?",
        options: [
          "The port is running a web filter proxy",
          "A firewall or packet filter is dropping probes, preventing Nmap from determining if the port is open or closed",
          "The port is definitely open and running an FTP service",
          "The target machine is turned off"
        ],
        correctIndex: 1,
        explanation: "Filtered means Nmap received no reply, typically because a firewall dropped the probe silently."
      }
    ],
    tasks: [
      {
        title: "Task 1: Perform Version Enumeration",
        instruction: "Execute `nmap -sV -p 22,80,445 10.10.10.25` against the lab host to fingerprint active services.",
        hints: [
          "Concept: Service version scanning.",
          "Direction: Specify `-sV` and target ports.",
          "Tool: `nmap`",
          "Syntax: `nmap -sV -p 22,80,445 10.10.10.25`",
          "Explanation: Returns version fingerprints."
        ]
      }
    ],
    explainResult: "Nmap generated custom Layer 4 probes, analyzed banner responses, and calculated fingerprint hashes to accurately match Apache 2.4.52 and Samba 4.6.2.",
    securityConnection: "Enumeration is the foundation of exploitation. Once you know the exact version (e.g. Samba 4.6.2), you can query CVE databases and Searchsploit to discover known Remote Code Execution (RCE) exploits for that version.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical Network Recon & Port Scanning Lab",
      url: "labs.html?lab=nmap"
    },
    completion: {
      learned: [
        "How Nmap discovers open ports and running services",
        "The difference between SYN stealth scans and TCP connect scans",
        "Service version fingerprinting using `-sV`",
        "The meaning of Open, Closed, and Filtered port states"
      ],
      practiced: [
        "nmap -sV -p 22,80,445 10.10.10.25",
        "Interpreting port tables",
        "Evaluating firewall filtering behaviors"
      ]
    },
    nextRoomId: "room-21"
  },

  {
    id: "room-21",
    stage: 5,
    stageTitle: "Stage 5 — Security Tools",
    title: "Wireshark & Packet Analysis",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 09 (TCP/IP & Packets) & Room 20 (Nmap)",
    whyAreYouHere: "A doctor uses an X-ray to look inside a human body; a cybersecurity analyst uses **Wireshark** to look inside network traffic. Wireshark is the world's most widely used network protocol analyzer. In this room, you will learn how to capture raw packets, apply display filters to isolate suspicious activity, follow TCP conversations, and extract unencrypted passwords from cleartext traffic.",
    objectives: [
      "Understand Packet Capture (PCAP) and how network sniffers work",
      "Learn the Wireshark 3-pane interface: Packet List, Packet Details, and Packet Bytes",
      "Master Wireshark Display Filters (`ip.addr == ...`, `http`, `tcp.port == ...`)",
      "Follow TCP Streams to reconstruct full conversational transcripts",
      "Identify plaintext credentials and security leaks in network captures"
    ],
    vocabulary: [
      { term: "Wireshark", definition: "A graphical network packet analyzer used for network troubleshooting, protocol analysis, and security auditing." },
      { term: "PCAP (Packet Capture)", definition: "The standard file format (usually `.pcap` or `.pcapng`) containing raw network data frames recorded from a network interface." },
      { term: "Promiscuous Mode", definition: "A network card configuration that causes the controller to pass all incoming traffic to the CPU, not just frames addressed to its own MAC." },
      { term: "Display Filter", definition: "An expression syntax used inside Wireshark to filter visible packets based on protocols, IP addresses, ports, or content." },
      { term: "Follow TCP Stream", definition: "A Wireshark feature that reassembles all out-of-order packets of a session into a continuous readable text stream." }
    ],
    lessons: [
      {
        title: "1. Essential Wireshark Display Filters",
        content: `A raw capture can contain millions of packets. Filters let you find needles in the haystack:
• \`ip.addr == 10.10.10.25\`: Shows only packets where the source OR destination is 10.10.10.25.
• \`tcp.port == 80\`: Shows web traffic.
• \`http.request.method == "POST"\`: Shows login submissions and form posts!
• \`dns\`: Filters only domain name queries and answers.
• \`frame contains "password"\`: Searches the entire payload of all packets for the keyword 'password'.`
      },
      {
        title: "2. Following the TCP Stream",
        content: `Instead of reading hundreds of individual 1,500-byte packets, right-click any packet and select **Follow -> TCP Stream**.
Wireshark reassembles all sequence numbers, strips headers, and displays the exact dialogue:
• **Red text**: Data sent by the client.
• **Blue text**: Data returned by the server.`
      }
    ],
    seeExamples: [
      {
        title: "Wireshark Packet Stream Reconstruction",
        codeOrDiagram: `[ Client Stream - RED ]
POST /login.php HTTP/1.1
Host: internal-portal.corp
Content-Type: application/x-www-form-urlencoded

username=administrator&password=SuperSecretPassword2026!

[ Server Stream - BLUE ]
HTTP/1.1 302 Found
Location: /admin/dashboard.php
Set-Cookie: PHPSESSID=991a0c8b21ef`,
        explanation: "Because HTTP was unencrypted, Wireshark reconstructed the administrator's password in plain clear text."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate packet capture analysis using `tcpdump` to capture 3 HTTP packets with ASCII payload on loopback interface: `tcpdump -i lo -c 3 -A port 8080`:",
      initialCommand: "",
      expectedCommand: "tcpdump -i lo -c 3 -A port 8080",
      simulatedOutput: "tcpdump: verbose output suppressed, listening on lo\n16:36:01.102 IP 127.0.0.1.54320 > 127.0.0.1.8080: Flags [P.], seq 1:92, ack 1\nE..h..@.@.....\nPOST /api/auth HTTP/1.1..Host: localhost..user=cadet&token=lab_pcap_key_88\n[+] Success! 3 packets captured and ASCII payload rendered.",
      explanation: "`tcpdump -A` is the command-line equivalent of Wireshark, printing payload bytes as readable ASCII text."
    },
    questions: [
      {
        id: "r21-q1",
        type: "multiple-choice",
        question: "Which Wireshark display filter will show only HTTP requests where the client submitted data using the POST method?",
        options: [
          "http.request.method == \"POST\"",
          "post.traffic == true",
          "tcp.method == POST",
          "ip.proto == http_post"
        ],
        correctIndex: 0,
        explanation: "`http.request.method == \"POST\"` filters the capture down to HTTP POST requests."
      },
      {
        id: "r21-q2",
        type: "multiple-choice",
        question: "When inspecting an HTTPS capture in Wireshark without possessing the server's private cryptographic key, what will the packet payload show?",
        options: [
          "Plaintext HTML documents",
          "Unencrypted passwords",
          "Opaque, encrypted ciphertext application data that cannot be read",
          "Cleartext SQL queries"
        ],
        correctIndex: 2,
        explanation: "Because HTTPS uses TLS encryption, third-party packet sniffers only see encrypted application data."
      }
    ],
    tasks: [
      {
        title: "Task 1: Capture Loopback HTTP Packet Stream",
        instruction: "Execute `tcpdump -i lo -c 3 -A port 8080` to inspect live packets passing over the local loopback interface.",
        hints: [
          "Concept: Command-line packet sniffer.",
          "Direction: Use flags `-i` (interface), `-c` (count), `-A` (ASCII).",
          "Tool: `tcpdump`",
          "Syntax: `tcpdump -i lo -c 3 -A port 8080`",
          "Explanation: Dumps 3 packets in ASCII."
        ]
      }
    ],
    explainResult: "The `tcpdump` engine configured the AF_PACKET raw socket interface in the kernel to tap incoming frames before delivery to the TCP stack.",
    securityConnection: "Packet analysis is used in malware reverse engineering, network threat hunting, and data exfiltration detection. Attackers often transmit sensitive stolen files over DNS tunnels or ICMP packets; network defenders detect these covert channels using Wireshark.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical Packet Inspection Lab",
      url: "labs.html?lab=packets"
    },
    completion: {
      learned: [
        "How packet sniffers capture network frames using promiscuous mode",
        "Wireshark interface layout and PCAP file structures",
        "Writing effective display filters (ip.addr, tcp.port, http.request.method)",
        "Following TCP streams to extract plaintext credentials"
      ],
      practiced: [
        "tcpdump -i lo -c 3 -A port 8080",
        "Inspecting raw packet payloads",
        "Analyzing packet stream transcripts"
      ]
    },
    nextRoomId: "room-22"
  },

  {
    id: "room-22",
    stage: 5,
    stageTitle: "Stage 5 — Security Tools",
    title: "Logs & Security Event Analysis",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Room 19 (Linux Toolkit)",
    whyAreYouHere: "Every single time an attacker enters a system, types a bad password, downloads a file, or crashes a service, the computer leaves a digital footprint: a **Log Entry**. Cybersecurity analysts in Security Operations Centers (SOCs) spend their careers investigating these logs to catch attackers before data is stolen. In this room, you will learn the format of system and web logs, how to spot brute-force attacks, and how to correlate events across multiple systems.",
    objectives: [
      "Understand the purpose of system logging and the Syslog standard",
      "Learn the location and structure of Linux logs (`/var/log/auth.log`, `syslog`, `nginx/access.log`)",
      "Dissect web server Combined Access Log formats (IP, Timestamp, Method, URI, Status, User-Agent)",
      "Detect brute-force password attacks and web scanning activity from log artifacts",
      "Correlate events using timestamps and source IP addresses"
    ],
    vocabulary: [
      { term: "Log File", definition: "A chronological record of events, operations, and transactions generated by operating systems, services, and applications." },
      { term: "Syslog", definition: "A standardized protocol and architecture for logging system messages on Unix and Linux systems." },
      { term: "auth.log / secure", definition: "The system log file recording all authentication events, user logins, sudo executions, and SSH connection attempts." },
      { term: "SIEM", definition: "Security Information and Event Management: enterprise software that aggregates, correlates, and analyzes logs from hundreds of servers." },
      { term: "Log Correlation", definition: "The analytical process of linking related events across multiple systems to reconstruct an adversary's complete attack timeline." }
    ],
    lessons: [
      {
        title: "1. The Web Server Access Log Format",
        content: `Web servers like Apache and Nginx record every single incoming request:
\`\`\`text
192.168.1.105 - - [05/Oct/2026:16:30:45 +0000] "GET /admin.php HTTP/1.1" 404 196 "-" "Nikto/2.1.6"
\`\`\`
• **IP**: \`192.168.1.105\` (Who sent the request).
• **Timestamp**: \`05/Oct/2026:16:30:45\`.
• **Request**: \`GET /admin.php HTTP/1.1\`.
• **Status Code**: \`404\` (Not Found).
• **User-Agent**: \`Nikto/2.1.6\` (Dead giveaway: this is an automated vulnerability scanner!).`
      },
      {
        title: "2. Spotting an SSH Brute-Force Attack",
        content: `When someone launches a dictionary attack against SSH, \`/var/log/auth.log\` fills with repeated failures:
\`\`\`text
Oct 5 16:32:01 server sshd[1420]: Failed password for root from 203.0.113.88 port 48122 ssh2
Oct 5 16:32:02 server sshd[1422]: Failed password for admin from 203.0.113.88 port 48124 ssh2
Oct 5 16:32:03 server sshd[1424]: Failed password for user from 203.0.113.88 port 48126 ssh2
Oct 5 16:32:05 server sshd[1426]: Accepted password for support from 203.0.113.88 port 48128 ssh2
\`\`\`
Notice: 3 rapid failed attempts followed by an accepted password on line 4! The attacker guessed the password for \`support\`.`
      }
    ],
    seeExamples: [
      {
        title: "Analyzing Web Scanner Logs with awk and sort",
        codeOrDiagram: `cadet@endlessus:~$ awk '{print $1}' access.log | sort | uniq -c | sort -nr
   1420 192.168.1.105   <-- Sent 1,420 requests in 30 seconds!
     12 10.0.0.4
      4 10.0.0.8`,
        explanation: "Piping awk, sort, and uniq counts requests per IP, immediately exposing aggressive vulnerability scanners and denial-of-service bots."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Find the top IP addresses sending requests in our lab web log using `awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr`:",
      initialCommand: "",
      expectedCommand: "awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr",
      simulatedOutput: "   1842 192.168.1.99\n     24 10.10.10.5\n      3 127.0.0.1\n[+] Success! Attacker IP 192.168.1.99 identified with 1,842 requests.",
      explanation: "A single IP sending thousands of requests in seconds indicates automated directory fuzzing or vulnerability scanning."
    },
    questions: [
      {
        id: "r22-q1",
        type: "multiple-choice",
        question: "In standard Linux systems, which log file records SSH connection attempts, failed logins, and sudo command invocations?",
        options: [
          "/var/log/auth.log (or /var/log/secure)",
          "/var/log/dpkg.log",
          "/etc/resolv.conf",
          "/tmp/session.log"
        ],
        correctIndex: 0,
        explanation: "`/var/log/auth.log` (on Debian/Ubuntu) and `/var/log/secure` (on RHEL/CentOS) log authentication activity."
      },
      {
        id: "r22-q2",
        type: "multiple-choice",
        question: "When auditing web server logs, why is the `User-Agent` string valuable for detecting automated attacks?",
        options: [
          "It encrypts the database server",
          "Automated vulnerability scanners (like sqlmap, Nikto, or Gobuster) often advertise their tool name in the default User-Agent header",
          "It provides the user's home Wi-Fi password",
          "It changes the client's MAC address"
        ],
        correctIndex: 1,
        explanation: "Unless customized, tools like sqlmap or Nikto identify themselves directly in the User-Agent header, making detection straightforward."
      }
    ],
    tasks: [
      {
        title: "Task 1: Isolate High-Frequency Request IP",
        instruction: "Run `awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr` to isolate the attacker's IP.",
        hints: [
          "Concept: Log aggregation and frequency counting.",
          "Direction: Pipe awk to sort and uniq.",
          "Tool: `awk`, `sort`, `uniq`",
          "Syntax: Run the complete command string.",
          "Explanation: Reveals anomalous volume."
        ]
      }
    ],
    explainResult: "The pipeline parsed field 1 (client IP), sorted the list, grouped identical values with frequency counts, and sorted in reverse numerical order.",
    securityConnection: "Log analysis bridges offensive and defensive cybersecurity. Attackers attempt to clear logs (`shred -u /var/log/auth.log`) to hide their tracks. In response, modern enterprises forward logs in real-time to write-once, append-only SIEM systems so evidence cannot be deleted!",
    completion: {
      learned: [
        "The purpose of system and application logging",
        "The location and formatting of `/var/log/auth.log` and web access logs",
        "How to detect brute-force attacks and scanner fingerprints",
        "Using shell utilities (`awk`, `sort`, `uniq`) for incident triage"
      ],
      practiced: [
        "awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c",
        "Carving attacker IP addresses",
        "Correlating security events"
      ]
    },
    nextRoomId: "room-23"
  }
];
