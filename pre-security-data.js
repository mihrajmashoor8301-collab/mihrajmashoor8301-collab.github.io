/**
 * Endlessus Learning Hub - Pre Security Authoritative Curriculum Database
 * 
 * Auto-generated canonical database covering Levels 0 through 7 (45 Core Rooms).
 * Features:
 * - Real educational content, worked examples, and SVG diagrams
 * - TryHackMe-style Question System (exact answers with visual character slots, multiple choice, hints, explanations)
 * - Practice terminal integration and lab engine deep links
 */

const PRE_SECURITY_LEVELS = [
  {
    "id": 0,
    "number": "00",
    "title": "Start Here",
    "tagline": "Welcome to Cybersecurity & Foundations",
    "description": "Zero prior experience required. Discover what ethical cybersecurity is, understand the legal boundaries, and execute your first shell command.",
    "color": "#0284c7",
    "icon": "flag",
    "roomCount": 2,
    "estimatedTime": "35 min",
    "difficulty": "Beginner"
  },
  {
    "id": 1,
    "number": "01",
    "title": "Computer Fundamentals",
    "tagline": "Hardware, Storage, Processes & Operating Systems",
    "description": "Understand the machine before defending it: CPU, RAM, motherboards, filesystems, processes, services, and operating system permissions.",
    "color": "#0ea5e9",
    "icon": "memory",
    "roomCount": 4,
    "estimatedTime": "1 hr 40 min",
    "difficulty": "Beginner"
  },
  {
    "id": 2,
    "number": "02",
    "title": "Linux Fundamentals",
    "tagline": "The Essential Operating System of Security",
    "description": "Master the Linux command line: filesystem navigation, file management, permissions, process monitoring, pipes, redirection, and bash basics.",
    "color": "#10b981",
    "icon": "terminal",
    "roomCount": 8,
    "estimatedTime": "3 hr 15 min",
    "difficulty": "Beginner"
  },
  {
    "id": 3,
    "number": "03",
    "title": "Windows Fundamentals",
    "tagline": "Enterprise Workstations, Processes & PowerShell",
    "description": "Explore the Windows operating system architecture, NTFS permissions, Task Manager, services, Command Prompt (CMD), and PowerShell essentials.",
    "color": "#3b82f6",
    "icon": "desktop_windows",
    "roomCount": 5,
    "estimatedTime": "2 hr 10 min",
    "difficulty": "Beginner"
  },
  {
    "id": 4,
    "number": "04",
    "title": "Networking Fundamentals",
    "tagline": "How Computers Communicate Across the Globe",
    "description": "The foundational backbone of cyber: LAN/WAN, IP & MAC addresses, subnets, CIDR, TCP/UDP 3-way handshake, ports, DNS, DHCP, and the OSI model.",
    "color": "#6366f1",
    "icon": "lan",
    "roomCount": 9,
    "estimatedTime": "4 hr",
    "difficulty": "Foundation"
  },
  {
    "id": 5,
    "number": "05",
    "title": "Internet & Web Fundamentals",
    "tagline": "Browsers, HTTP/S, Headers & Web Architecture",
    "description": "Learn how the modern web operates: client-server architecture, URLs, HTTP methods, status codes, headers, cookies, TLS/HTTPS, and APIs.",
    "color": "#8b5cf6",
    "icon": "public",
    "roomCount": 5,
    "estimatedTime": "2 hr 20 min",
    "difficulty": "Foundation"
  },
  {
    "id": 6,
    "number": "06",
    "title": "Cybersecurity Fundamentals",
    "tagline": "The CIA Triad, Threat Modeling & Defensive Controls",
    "description": "Understand core security principles: CIA triad, threats vs vulnerabilities vs risks, malware types, authentication vs authorization, hashing, and defense-in-depth.",
    "color": "#f59e0b",
    "icon": "security",
    "roomCount": 6,
    "estimatedTime": "2 hr 45 min",
    "difficulty": "Foundation"
  },
  {
    "id": 7,
    "number": "07",
    "title": "First Practical Security Labs",
    "tagline": "Hands-On Investigation in the Simulated Terminal",
    "description": "Put knowledge into action with hands-on guided exercises: Linux command-line auditing, file permissions, HTTP headers, network recon, and log analysis.",
    "color": "#ef4444",
    "icon": "biotech",
    "roomCount": 6,
    "estimatedTime": "3 hr 30 min",
    "difficulty": "Practical"
  }
];

const PRE_SECURITY_ROOMS = [
  {
    "stage": 0,
    "level": 0,
    "levelTitle": "Level 0 \u2014 Start Here",
    "title": "Welcome to Cybersecurity & Ethical Hacking",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "15 min",
    "prerequisites": "None (Absolute zero knowledge required)",
    "whyAreYouHere": "You have arrived at the start of your journey. Cybersecurity can feel intimidating with hundreds of confusing abbreviations, dark terminal windows, and complex tools. In this room, you will demystify what cybersecurity really is, understand how ethical hackers think, and execute your very first command in the Endlessus interactive terminal with zero fear.",
    "objectives": [
      "Understand what cybersecurity is and why it protects the modern digital world",
      "Differentiate between Offensive Security (Red Team) and Defensive Security (Blue Team)",
      "Learn what makes ethical hacking legal, authorized, and professional",
      "Understand Rules of Engagement (RoE) and Scope in security testing",
      "Run your first interactive shell command (`whoami`) and interpret the output",
      "Learn how to use progressive hints when you get stuck"
    ],
    "vocabulary": [
      {
        "term": "Cybersecurity",
        "definition": "The practice of protecting systems, networks, devices, and data from digital attacks, damage, or unauthorized access."
      },
      {
        "term": "Offensive Security (Red Team)",
        "definition": "Ethical hackers who simulate adversarial attacks to find security weaknesses before malicious actors do."
      },
      {
        "term": "Defensive Security (Blue Team)",
        "definition": "Security engineers and analysts who build defenses, monitor logs, detect intrusions, and respond to incidents."
      },
      {
        "term": "Ethical Hacker",
        "definition": "A security professional who hacks with explicit written permission to help organizations fix vulnerabilities."
      },
      {
        "term": "Scope",
        "definition": "The precise list of systems, domains, and IP addresses you are legally authorized to test."
      },
      {
        "term": "Command Shell / Terminal",
        "definition": "A text-based interface that lets you communicate directly with a computer by typing commands."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. What is Cybersecurity?",
        "content": "At its core, cybersecurity is about **trust**. Every day, hospitals manage patient vitals, banks process billions in wire transfers, and electrical grids supply power to millions. All of these run on computers connected together.\n\nWhen these systems have flaws, malicious hackers (often called 'black hats') can steal private records, disrupt power, or hold businesses for ransom. Cybersecurity professionals exist to identify and fix these flaws first."
      },
      {
        "title": "2. Red Team vs Blue Team: Two Sides of the Shield",
        "content": "Cybersecurity is broadly divided into two cooperative sides:\n\n\u2022 **Offensive Security (Red Team)**: You think like an adversary. You test systems, search for configuration mistakes, verify whether software bugs can be exploited, and report your findings.\n\u2022 **Defensive Security (Blue Team)**: You design secure architectures, monitor network traffic, set up firewalls, investigate suspicious activity, and patch vulnerabilities.\n\nBoth teams need the exact same foundational knowledge: **you cannot defend or test what you do not understand**."
      },
      {
        "title": "3. The Law: Authorization & Scope",
        "content": "What separates an ethical hacker from a cybercriminal is not technical skill \u2014 it is **authorization**.\n\nTesting or probing a system without explicit, written permission from the owner is illegal under computer misuse legislation worldwide. In Endlessus, every lab target is run in a secure, sandboxed environment specifically created for your education. You have full authorization here!"
      }
    ],
    "seeExamples": [
      {
        "title": "Interactive Shell: How Commands Work",
        "codeOrDiagram": "cadet@endlessus:~$ whoami\ncadet\n\ncadet@endlessus:~$ date\nSun Oct 05 16:30:00 UTC 2026\n\ncadet@endlessus:~$ echo \"Hello, Cybersecurity!\"\nHello, Cybersecurity!",
        "explanation": "In a terminal, you type a command next to the prompt ($), press Enter, and the operating system responds with text output. Here, `whoami` asks the computer: 'What is my current username?'"
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Type `whoami` below and press Enter to see your current identity in the Endlessus sandbox:",
      "initialCommand": "",
      "expectedCommand": "whoami",
      "simulatedOutput": "cadet\n[+] Success! Your terminal identity is 'cadet'. You just executed your first shell command.",
      "explanation": "The command `whoami` is one of the simplest utilities in Unix/Linux. It tells you your active user account name."
    },
    "questions": [
      {
        "id": "q-01-1",
        "type": "exact",
        "question": "Which Linux/Unix command returns the active session username?",
        "visualSlots": "_ _ _ _ _ _",
        "acceptedAnswers": [
          "whoami"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "It literally asks 'who am I' as a single lowercase word.",
        "explanation": "The `whoami` command prints the effective user ID (username) of the current shell session."
      },
      {
        "id": "q-01-2",
        "type": "multiple-choice",
        "question": "What is the single most critical factor that distinguishes an ethical penetration tester from an unauthorized attacker?",
        "options": [
          "Ethical hackers only use open-source operating systems",
          "Ethical hackers have explicit written authorization and an agreed scope from the system owner",
          "Ethical hackers never look at application source code",
          "Ethical hackers only test web browsers and never networks"
        ],
        "correctIndex": 1,
        "hint": "Think about legal permission and boundaries.",
        "explanation": "Authorization is paramount. Without explicit, written permission and clear scope, testing any computer system is illegal."
      },
      {
        "id": "q-01-3",
        "type": "multiple-choice",
        "question": "A company hires you to simulate an attack against their customer portal to find vulnerabilities before launch. Which security role are you performing?",
        "options": [
          "Defensive Security (Blue Team)",
          "Offensive Security (Red Team)",
          "Hardware Technician",
          "Database Administrator"
        ],
        "correctIndex": 1,
        "hint": "Offensive testing simulates adversarial attacks.",
        "explanation": "Simulating attacks to discover vulnerabilities is the definition of offensive security (Red Teaming / penetration testing)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Execute your first shell command",
        "instruction": "Use the interactive terminal below to query your active session user by typing `whoami`.",
        "hints": [
          "Concept: You are querying your session's user identity.",
          "Direction: Type into the terminal input box directly.",
          "Tool: Use the standard POSIX username utility.",
          "Syntax: `whoami` (all lowercase, no spaces).",
          "Explanation: Typing `whoami` will output 'cadet', proving your terminal works."
        ]
      }
    ],
    "securityConnection": "Whenever a penetration tester gains access to an unknown server or terminal, the first command they run is almost always `whoami` or `id`. It instantly tells them whether they landed as an unprivileged user (requiring privilege escalation) or as the supreme administrator (root / SYSTEM).",
    "id": "room-01",
    "nextRoomId": "room-02"
  },
  {
    "stage": 0,
    "level": 0,
    "levelTitle": "Level 0 \u2014 Start Here",
    "title": "How Computers & The Internet Work",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "20 min",
    "prerequisites": "Room 01: Welcome to Cybersecurity & Ethical Hacking",
    "whyAreYouHere": "Before you can secure a system or spot security flaws, you must understand how computers send and receive information across the world. When you click a link, billions of electrical and optical signals travel through undersea cables, routers, and switches in milliseconds. In this room, you will learn the high-level picture of digital communication.",
    "objectives": [
      "Understand the difference between hardware, software, and firmware",
      "Learn the Client-Server model of computing",
      "Differentiate the Internet (the physical highway) from the World Wide Web (the traffic)",
      "Understand how data is split into small packets for transmission",
      "Recognize basic internet infrastructure: Clients, Servers, Routers, and Undersea Cables"
    ],
    "vocabulary": [
      {
        "term": "Client",
        "definition": "A device (like your phone or laptop) that requests information or services from a server."
      },
      {
        "term": "Server",
        "definition": "A powerful computer dedicated to storing data, hosting applications, and responding to client requests 24/7."
      },
      {
        "term": "Packet",
        "definition": "A small segment of a larger message sent across a network, containing both data and routing headers."
      },
      {
        "term": "Router",
        "definition": "A specialized networking device that inspects packet destination addresses and routes them along the fastest path."
      },
      {
        "term": "Internet",
        "definition": "The global physical network of interconnected computers, cables, and satellites."
      },
      {
        "term": "World Wide Web (WWW)",
        "definition": "An information system of interlinked hypertext documents and multimedia accessed via the Internet using HTTP."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <rect x=\"30\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"105\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Web Browser</text>\n  <text x=\"105\" y=\"95\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">(Client)</text>\n\n  <!-- Request -->\n  <line x1=\"180\" y1=\"60\" x2=\"420\" y2=\"60\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"420,60 410,55 410,65\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"52\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">GET /login.html HTTP/1.1</text>\n\n  <!-- Response -->\n  <line x1=\"420\" y1=\"100\" x2=\"180\" y2=\"100\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"180,100 190,95 190,105\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"118\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">HTTP/1.1 200 OK (HTML Payload)</text>\n\n  <rect x=\"420\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"495\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Nginx Server</text>\n  <text x=\"495\" y=\"95\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Port 80 / 443</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Client-Server Architecture",
        "content": "Most of the internet operates on the **Client-Server model**:\n\n1. **The Client**: Your web browser (Chrome, Firefox, Safari) running on your computer or phone. It sends a **Request**.\n2. **The Server**: A machine in a datacenter running software like Nginx, Apache, or Node.js. It receives your request, processes it, and returns a **Response**.\n\nEvery time you load Endlessus, your browser is the client, and our hosting server provides the web pages."
      },
      {
        "title": "2. The Internet vs The World Wide Web",
        "content": "Many beginners confuse the Internet and the Web, but they are not the same thing:\n\n\u2022 **The Internet** is the massive physical and logical infrastructure: undersea fiber-optic cables, satellites, copper wires, and routers connecting billions of computers together (the highway).\n\u2022 **The World Wide Web (Web)** is just one service that runs on top of the Internet: websites, HTML pages, and web applications accessed via browsers (the cars driving on the highway).\n\nOther services that run on the Internet include email (SMTP/IMAP), file transfer (FTP/SFTP), gaming servers, and streaming."
      },
      {
        "title": "3. How Data Travels: Packets",
        "content": "When you download a 10MB image, the server doesn't send it as one giant continuous block. If even a single byte were lost, the whole file would need to be retransmitted!\n\nInstead, the operating system chops the image into thousands of tiny chunks called **packets** (typically 1500 bytes each). Each packet gets a label with the source IP address, the destination IP address, and a sequence number. Routers inspect each packet and steer it across the network, and your computer reassembles them back into the image."
      }
    ],
    "seeExamples": [
      {
        "title": "Inspecting Packet Routing with Traceroute",
        "codeOrDiagram": "cadet@endlessus:~$ traceroute endlessus.in\ntraceroute to endlessus.in (104.21.75.12), 30 hops max\n 1  192.168.1.1 (Home Gateway Router)  1.2 ms\n 2  10.200.0.1 (ISP Local Office)       8.4 ms\n 3  172.16.4.1 (Regional Backbone)      14.1 ms\n 4  104.21.75.12 (Destination Edge)     22.3 ms",
        "explanation": "The `traceroute` utility shows every router (hop) a packet passes through on its way from your computer to the destination server."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo \"Clients request, servers respond\"` in the terminal to reinforce the client-server concept:",
      "initialCommand": "",
      "expectedCommand": "echo \"Clients request, servers respond\"",
      "simulatedOutput": "Clients request, servers respond\n[+] Concept verified: Clients initiate requests; servers process and reply.",
      "explanation": "The `echo` command prints whatever text argument you give it back to standard output."
    },
    "questions": [
      {
        "id": "q-02-1",
        "type": "exact",
        "question": "What is the technical term for the small chunks of data into which files and messages are divided before network transmission?",
        "visualSlots": "_ _ _ _ _ _ _",
        "acceptedAnswers": [
          "packets",
          "packet"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Starts with 'pack'.",
        "explanation": "Packets are the discrete units of data transmitted across IP networks."
      },
      {
        "id": "q-02-2",
        "type": "multiple-choice",
        "question": "Which of the following correctly describes the relationship between the Internet and the World Wide Web?",
        "options": [
          "The Internet and the World Wide Web are identical terms for the exact same technology",
          "The World Wide Web is the physical hardware cabling, while the Internet is web pages",
          "The Internet is the global physical infrastructure, while the Web is an application service that runs on top of it",
          "The World Wide Web was invented before computers were connected via networks"
        ],
        "correctIndex": 2,
        "hint": "Think of the highway vs the cars.",
        "explanation": "The Internet is the underlying global network of connected computers; the Web (HTTP/HTTPS) is one service operating on top of that infrastructure."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Understand client-server communication",
        "instruction": "Test output generation in the terminal by echoing a packet status string.",
        "hints": [
          "Type: `echo packet`"
        ]
      }
    ],
    "securityConnection": "In cybersecurity, attackers often target the client-server boundary. For example, Distributed Denial of Service (DDoS) attacks flood a server with millions of bogus packets so legitimate clients cannot connect. Similarly, packet sniffing tools like Wireshark allow security analysts (and attackers) to inspect raw packets passing across an unencrypted network.",
    "id": "room-02",
    "nextRoomId": "room-03"
  },
  {
    "stage": 1,
    "level": 1,
    "levelTitle": "Level 1 \u2014 Computer Fundamentals",
    "title": "Computer Hardware & System Architecture",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Level 0: Start Here",
    "whyAreYouHere": "To defend or test computers, you must understand physical architecture. Every cybersecurity concept\u2014from buffer overflows and malware execution to disk forensics\u2014ultimately runs on hardware components: CPU registers, RAM memory cells, motherboards, and persistent storage.",
    "objectives": [
      "Understand the primary hardware components: CPU, RAM, Storage (SSD/HDD), Motherboard, and Peripherals",
      "Learn the von Neumann computer architecture and the Fetch-Decode-Execute cycle",
      "Understand the difference between volatile memory (RAM) and non-volatile storage (SSD/HDD)",
      "Differentiate 32-bit (x86) and 64-bit (x64) architectures and memory addressing limits",
      "Recognize how hardware architecture impacts cybersecurity and forensic analysis"
    ],
    "vocabulary": [
      {
        "term": "CPU (Central Processing Unit)",
        "definition": "The 'brain' of the computer that carries out instructions from computer programs through arithmetic, logic, and control operations."
      },
      {
        "term": "RAM (Random Access Memory)",
        "definition": "High-speed, volatile temporary memory used by the CPU to store actively running programs and data. Wiped when powered down."
      },
      {
        "term": "SSD / HDD (Storage)",
        "definition": "Non-volatile storage that retains files, operating system code, and data even when power is turned off."
      },
      {
        "term": "Motherboard",
        "definition": "The main printed circuit board (PCB) connecting the CPU, memory, storage drives, and peripheral expansion cards together."
      },
      {
        "term": "Architecture (32-bit vs 64-bit)",
        "definition": "The width of the CPU registers and memory bus. 32-bit systems can address a maximum of 4 GB of RAM, while 64-bit systems can address billions of gigabytes."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"30\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"70\" fill=\"#38bdf8\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">CPU</text>\n  <text x=\"100\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Arithmetic &amp; Logic</text>\n  <text x=\"100\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Executes instructions</text>\n\n  <path d=\"M 170 90 L 230 90\" stroke=\"#38bdf8\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"200\" y=\"80\" fill=\"#38bdf8\" font-size=\"10\" text-anchor=\"middle\">BUS</text>\n\n  <rect x=\"230\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"70\" fill=\"#10b981\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">RAM</text>\n  <text x=\"300\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Volatile Memory</text>\n  <text x=\"300\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Fast working set</text>\n\n  <path d=\"M 370 90 L 430 90\" stroke=\"#10b981\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"400\" y=\"80\" fill=\"#10b981\" font-size=\"10\" text-anchor=\"middle\">NVMe</text>\n\n  <rect x=\"430\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"500\" y=\"70\" fill=\"#f59e0b\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">SSD / Storage</text>\n  <text x=\"500\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Non-Volatile</text>\n  <text x=\"500\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Permanent files</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Core Hardware Triangle: CPU, RAM, and Storage",
        "content": "A computer fundamentally consists of three interacting systems:\n\n1. **The CPU (Central Processing Unit)**: The computation powerhouse. It executes billions of machine instructions every second (arithmetic, logic, memory jumps).\n2. **RAM (Random Access Memory)**: Ultra-fast volatile memory. When you launch a browser, the binary code is copied from your slow SSD into fast RAM so the CPU can execute it without waiting.\n3. **Storage (NVMe SSD / Hard Disk)**: Permanent, non-volatile storage where your operating system, files, and downloaded tools live.\n\n**Key Forensics Concept**: Turning off a computer completely erases everything in RAM ('volatile memory'). Forensic investigators take 'memory dumps' of running computers before pulling the power cord!"
      },
      {
        "title": "2. 32-Bit vs 64-Bit Architecture",
        "content": "You will often see software labeled as `x86` (32-bit) or `x64` / `x86_64` (64-bit):\n\n\u2022 **32-Bit**: The CPU can only address $2^{32}$ bytes of memory, which equals exactly **4 Gigabytes (GB)** of RAM. Modern operating systems have moved away from 32-bit because modern software needs much more memory.\n\u2022 **64-Bit**: The CPU registers are 64 bits wide ($2^{64}$ memory addresses), allowing theoretically 16 exabytes of RAM. 64-bit systems also have stronger security features like hardware-enforced Data Execution Prevention (DEP / NX bit)."
      },
      {
        "title": "3. The Fetch-Decode-Execute Cycle",
        "content": "Every program\u2014whether it is a calculator, a video game, or a piece of ransomware\u2014is broken down into machine code. The CPU repeatedly performs three steps millions of times per second:\n\n1. **Fetch**: Read the next instruction from memory at the address pointed to by the Instruction Pointer (IP / PC register).\n2. **Decode**: Interpret what operation to perform (add numbers, compare strings, move bytes).\n3. **Execute**: Perform the operation and store the result in a CPU register or write it back to RAM."
      }
    ],
    "seeExamples": [
      {
        "title": "Querying System Hardware in the Terminal",
        "codeOrDiagram": "cadet@endlessus:~$ uname -m\nx86_64\n\ncadet@endlessus:~$ free -h\n               total        used        free      shared  buff/cache   available\nMem:           15Gi       3.2Gi       8.4Gi       320Mi       4.1Gi        12Gi\nSwap:         2.0Gi          0B       2.0Gi",
        "explanation": "`uname -m` reveals the machine processor architecture (`x86_64` = 64-bit). `free -h` displays human-readable RAM usage."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `uname -m` in the terminal to inspect the processor architecture of the simulated machine:",
      "initialCommand": "",
      "expectedCommand": "uname -m",
      "simulatedOutput": "x86_64\n[+] Architecture identified: 64-bit x86_64 CPU.",
      "explanation": "`uname` with the `-m` flag outputs the machine hardware architecture."
    },
    "questions": [
      {
        "id": "q-03-1",
        "type": "exact",
        "question": "Which volatile memory component holds the active working set of running programs and loses all data when power is lost?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "RAM",
          "Random Access Memory"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "3-letter abbreviation for Random Access Memory.",
        "explanation": "RAM (Random Access Memory) is volatile memory that requires continuous electric power to preserve state."
      },
      {
        "id": "q-03-2",
        "type": "multiple-choice",
        "question": "What is the maximum theoretical RAM capacity that a 32-bit (x86) operating system architecture can directly address?",
        "options": [
          "512 Megabytes (MB)",
          "4 Gigabytes (GB)",
          "16 Gigabytes (GB)",
          "64 Terabytes (TB)"
        ],
        "correctIndex": 1,
        "hint": "2 to the power of 32 bytes equals approximately 4.29 billion bytes.",
        "explanation": "Because 2^32 = 4,294,967,296 bytes, a 32-bit CPU can only address up to 4 GB of physical memory."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Query CPU architecture",
        "instruction": "Execute `uname -m` in the terminal to verify the 64-bit environment.",
        "hints": [
          "Type: `uname -m`"
        ]
      }
    ],
    "securityConnection": "In reverse engineering and binary exploitation, understanding CPU registers (like RIP/EIP, RSP/ESP) is essential. Attackers exploit buffer overflows by corrupting CPU memory pointers to redirect execution to malicious code.",
    "id": "room-03",
    "nextRoomId": "room-04"
  },
  {
    "stage": 1,
    "level": 1,
    "levelTitle": "Level 1 \u2014 Computer Fundamentals",
    "title": "Filesystems, Folders & File Types",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 03: Computer Hardware & Architecture",
    "whyAreYouHere": "Files are how operating systems organize information on persistent storage. But how does a computer know whether a file is a photo, an executable script, or a document? In this room, you will learn how filesystems work and discover why security analysts never trust file extensions alone.",
    "objectives": [
      "Understand hierarchical directory trees and filesystems (EXT4, NTFS, FAT32)",
      "Learn the difference between file extensions and file magic bytes (signatures)",
      "Understand file metadata: creation timestamps, modification times, and inode numbers",
      "Learn how attackers disguise malicious files by renaming extensions",
      "Use the `file` utility to identify true file types by signature"
    ],
    "vocabulary": [
      {
        "term": "Filesystem",
        "definition": "The method and data structures an operating system uses to control how data is stored and retrieved on a disk (e.g., ext4, NTFS)."
      },
      {
        "term": "File Extension",
        "definition": "The suffix at the end of a filename (e.g., .txt, .exe, .pdf) indicating the intended format to the user and GUI."
      },
      {
        "term": "Magic Bytes (File Signature)",
        "definition": "A unique sequence of bytes at the very beginning of a file that identifies its true file format, regardless of the extension."
      },
      {
        "term": "Inode",
        "definition": "A data structure in Unix/Linux filesystems that stores all metadata about a file (size, owner, permissions, disk location) except its name."
      },
      {
        "term": "Metadata",
        "definition": "Data that describes other data, such as file author, creation date, GPS location in photos, and modification timestamps."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"30\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"70\" fill=\"#38bdf8\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">CPU</text>\n  <text x=\"100\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Arithmetic &amp; Logic</text>\n  <text x=\"100\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Executes instructions</text>\n\n  <path d=\"M 170 90 L 230 90\" stroke=\"#38bdf8\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"200\" y=\"80\" fill=\"#38bdf8\" font-size=\"10\" text-anchor=\"middle\">BUS</text>\n\n  <rect x=\"230\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"70\" fill=\"#10b981\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">RAM</text>\n  <text x=\"300\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Volatile Memory</text>\n  <text x=\"300\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Fast working set</text>\n\n  <path d=\"M 370 90 L 430 90\" stroke=\"#10b981\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"400\" y=\"80\" fill=\"#10b981\" font-size=\"10\" text-anchor=\"middle\">NVMe</text>\n\n  <rect x=\"430\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"500\" y=\"70\" fill=\"#f59e0b\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">SSD / Storage</text>\n  <text x=\"500\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Non-Volatile</text>\n  <text x=\"500\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Permanent files</text>\n</svg>",
    "lessons": [
      {
        "title": "1. How Filesystems Work",
        "content": "A raw hard drive or SSD is just a sequence of billions of binary magnetic or electrical cells. Without a filesystem, the computer would have no way to know where one file begins and another ends!\n\nA **filesystem** (like Linux's `ext4` or Windows' `NTFS`) divides the disk into blocks, maintains a master directory table, and tracks which blocks belong to which file.\n\n\u2022 Windows uses drive letters (`C:\\`, `D:\\`).\n\u2022 Linux uses a single unified tree starting at the root directory (`/`)."
      },
      {
        "title": "2. File Extensions vs Magic Bytes (Signatures)",
        "content": "Operating systems like Windows rely heavily on **file extensions** (like `.png` or `.docx`) to choose which application opens a file. But file extensions can be renamed with a single click!\n\nIf an attacker renames a malicious executable `malware.exe` to `invoice.pdf`, Windows may show a PDF icon, but the file is still an executable!\n\nSecurity professionals identify file types using **Magic Bytes** (File Signatures)\u2014the first 2 to 8 bytes inside the file header:\n\n\u2022 `89 50 4E 47` (`.PNG` in hex) indicates a PNG image.\n\u2022 `25 50 44 46` (`%PDF` in hex) indicates an authentic PDF document.\n\u2022 `4D 5A` (`MZ` in hex) indicates a Windows Portable Executable (`.exe` or `.dll`)."
      },
      {
        "title": "3. File Metadata and Timestamps (MACB)",
        "content": "Every file contains metadata tracked by the filesystem:\n\n\u2022 **M**odified: When file content was last changed.\n\u2022 **A**ccessed: When the file was last opened or read.\n\u2022 **C**hanged: When file permissions or ownership metadata changed (Unix).\n\u2022 **B**irth (Created): When the file was originally created on the disk.\n\nDigital forensic investigators use these timestamps to reconstruct attacker timelines during incident response."
      }
    ],
    "seeExamples": [
      {
        "title": "Using the 'file' command to inspect true file type",
        "codeOrDiagram": "cadet@endlessus:~$ ls -l photo.jpg\n-rw-r--r-- 1 cadet cadet 45280 Oct 15 12:00 photo.jpg\n\ncadet@endlessus:~$ file photo.jpg\nphoto.jpg: ELF 64-bit LSB executable, x86-64, dynamically linked\n\n[!] ALERT: photo.jpg has an image extension, but file magic bytes prove it is a compiled Linux ELF binary!",
        "explanation": "The `file` utility ignores the filename suffix and reads the actual header magic bytes, immediately catching disguised malware."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `file sample.bin` in the terminal to inspect the real file type using its header bytes:",
      "initialCommand": "",
      "expectedCommand": "file sample.bin",
      "simulatedOutput": "sample.bin: ASCII text\n[+] Inspection complete: The file contains human-readable ASCII text.",
      "explanation": "The `file` command analyzes the byte sequence at the start of `sample.bin`."
    },
    "questions": [
      {
        "id": "q-04-1",
        "type": "exact",
        "question": "What Linux command determines a file's true format by examining its magic byte signature rather than its filename extension?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "file"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "A simple 4-letter command: f---.",
        "explanation": "The `file` utility examines file magic numbers and data structures to determine actual file type."
      },
      {
        "id": "q-04-2",
        "type": "multiple-choice",
        "question": "What hex characters appear at the start of all Windows executable (.exe) and dynamic link library (.dll) files as their magic byte signature?",
        "options": [
          "MZ (4D 5A)",
          "PNG (89 50)",
          "PDF (25 50)",
          "GIF (47 49)"
        ],
        "correctIndex": 0,
        "hint": "Named after Mark Zbikowski, an early MS-DOS architect.",
        "explanation": "Windows executables start with 'MZ' (hex 4D 5A), identifying them to the Windows PE loader."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect a file using the file utility",
        "instruction": "Run `file sample.bin` in the terminal to view file type detection in action.",
        "hints": [
          "Type: `file sample.bin`"
        ]
      }
    ],
    "securityConnection": "Attackers frequently attempt file upload bypasses on web servers (e.g. uploading a PHP shell named `shell.php.jpg`). Secure applications must check both MIME type and header magic bytes rather than trusting the user-supplied filename.",
    "id": "room-04",
    "nextRoomId": "room-05"
  },
  {
    "stage": 1,
    "level": 1,
    "levelTitle": "Level 1 \u2014 Computer Fundamentals",
    "title": "Programs, Processes & Background Services",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 04: Filesystems, Folders & Extensions",
    "whyAreYouHere": "A program sitting on your hard drive does nothing until it is executed. Once launched into RAM, it becomes a **process** with its own memory space, permissions, and Process ID (PID). In this room, you will learn how the operating system manages running processes, background services, and how security analysts detect suspicious activity.",
    "objectives": [
      "Understand the distinction between a program (dormant on disk) and a process (active in memory)",
      "Learn about Process IDs (PIDs), Parent-Child process relationships, and process trees",
      "Understand system services (daemons in Linux, Windows services)",
      "Learn how the OS schedules CPU time across hundreds of concurrent processes",
      "Inspect running processes using `ps` and terminate rogue processes with `kill`"
    ],
    "vocabulary": [
      {
        "term": "Program",
        "definition": "A passive collection of compiled instructions stored as a file on persistent disk storage."
      },
      {
        "term": "Process",
        "definition": "An active instance of a computer program being executed by the CPU, with allocated RAM, open files, and a unique PID."
      },
      {
        "term": "PID (Process ID)",
        "definition": "A unique numeric identifier assigned by the operating system kernel to each active process."
      },
      {
        "term": "Daemon / Service",
        "definition": "A background process that runs continuously without a graphical interface or interactive user login (e.g., web servers, SSH server)."
      },
      {
        "term": "Process Tree",
        "definition": "The hierarchical parent-child structure showing which process spawned which subordinate processes."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Program vs Process",
        "content": "\u2022 **Program**: Like a recipe printed in a cookbook on your bookshelf. It sits on your hard disk consuming storage bytes, but it is not doing anything.\n\u2022 **Process**: The chef actively cooking that recipe in the kitchen. When you double-click or type a command to run a program, the operating system copies its instructions into RAM, creates CPU execution threads, and gives it a **Process ID (PID)**.\n\nYou can launch 10 separate windows of a text editor: that is **1 program file** on disk creating **10 distinct processes** in RAM!"
      },
      {
        "title": "2. Parent and Child Processes",
        "content": "Every process in an operating system is spawned by another process (its **Parent Process**):\n\n1. In Linux, the very first process started by the kernel is `systemd` or `init` (PID 1).\n2. When you open a terminal, `systemd` launches the terminal emulator (PID 1050).\n3. Inside the terminal, you run `bash` (PID 1052).\n4. In bash, you type `whoami`. Bash spawns a child process for `whoami` (PID 1100).\n\nIf a parent process terminates, its child processes may become 'orphaned' or automatically closed."
      },
      {
        "title": "3. Background Services (Daemons)",
        "content": "Most operating system tasks do not have windows or icons. They run silently in the background as **services** (called **daemons** in Linux, usually ending with 'd' like `sshd` or `httpd`):\n\n\u2022 `sshd`: Listens for incoming Secure Shell remote administrator connections on port 22.\n\u2022 `cron`: Executes scheduled tasks at specific dates and times.\n\u2022 `systemd-resolved`: Handles DNS lookups for apps in the background.\n\nSecurity monitoring tools watch for newly created services, because malware often installs persistent background services to maintain access across reboots."
      }
    ],
    "seeExamples": [
      {
        "title": "Listing Processes with 'ps' in Linux",
        "codeOrDiagram": "cadet@endlessus:~$ ps -ef | head -n 5\nUID          PID    PPID  C STIME TTY          TIME CMD\nroot           1       0  0 09:00 ?        00:00:01 /sbin/init\nroot           2       0  0 09:00 ?        00:00:00 [kthreadd]\nroot         412       1  0 09:00 ?        00:00:00 /usr/sbin/sshd -D\ncadet       1024     412  0 09:15 pts/0    00:00:00 -bash",
        "explanation": "`ps -ef` shows the running user (UID), the Process ID (PID), the Parent Process ID (PPID), and the command path (CMD)."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `ps` in the terminal to inspect the active processes in your current shell session:",
      "initialCommand": "",
      "expectedCommand": "ps",
      "simulatedOutput": "  PID TTY          TIME CMD\n 1024 pts/0    00:00:00 bash\n 1089 pts/0    00:00:00 ps\n[+] Process table listed: You can see bash and the ps command itself.",
      "explanation": "`ps` without flags shows processes associated with the current terminal session."
    },
    "questions": [
      {
        "id": "q-05-1",
        "type": "exact",
        "question": "What 3-letter acronym represents the unique numeric identifier that an operating system kernel assigns to every running process?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "PID",
          "Process ID"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Process ID abbreviation.",
        "explanation": "PID stands for Process Identifier."
      },
      {
        "id": "q-05-2",
        "type": "multiple-choice",
        "question": "In Linux systems, what is the convention for the PID assigned to the very first userspace initialization process (e.g. systemd or init)?",
        "options": [
          "PID 0",
          "PID 1",
          "PID 100",
          "PID 65535"
        ],
        "correctIndex": 1,
        "hint": "The first process always gets number one.",
        "explanation": "PID 1 is reserved for the initial system manager process (init or systemd), which serves as ancestor to all other processes."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect active processes",
        "instruction": "Execute `ps` in the terminal to view running processes.",
        "hints": [
          "Type: `ps`"
        ]
      }
    ],
    "securityConnection": "Attackers hide malicious processes through 'process hollowing' or 'DLL injection' into legitimate system processes like `svchost.exe` (on Windows). Threat hunters analyze anomalous parent-child relationships (e.g. Word spawning PowerShell: `winword.exe` -> `powershell.exe`) to catch malware in action.",
    "id": "room-05",
    "nextRoomId": "room-06"
  },
  {
    "stage": 1,
    "level": 1,
    "levelTitle": "Level 1 \u2014 Computer Fundamentals",
    "title": "Operating Systems & User Permissions",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 05: Programs, Processes & Services",
    "whyAreYouHere": "An Operating System (OS) is the software intermediary between your physical hardware and all applications. Crucially, the OS enforces security boundaries: who can read a file, who can configure a network adapter, and who can install software. In this room, you will learn the principle of least privilege and user permission models.",
    "objectives": [
      "Understand the role of the OS Kernel and the boundary between Kernel Mode and User Mode",
      "Learn the security hierarchy: Standard Unprivileged Users vs Superusers (root / Administrator)",
      "Understand the Principle of Least Privilege (PoLP)",
      "Learn how Access Control Lists (ACLs) and file permission bits enforce security",
      "Recognize why privilege escalation is the primary objective of penetration testers"
    ],
    "vocabulary": [
      {
        "term": "Kernel",
        "definition": "The core program of the operating system that has complete control over everything in the system, managing CPU, memory, and hardware devices."
      },
      {
        "term": "Kernel Mode (Ring 0)",
        "definition": "The privileged execution mode where code has direct, unrestricted access to all hardware and memory."
      },
      {
        "term": "User Mode (Ring 3)",
        "definition": "The restricted execution mode where applications run. If an app crashes in User Mode, the system stays safe."
      },
      {
        "term": "Superuser / root",
        "definition": "The supreme administrative account in Unix/Linux with UID 0, having unrestricted permission to modify any file, process, or setting."
      },
      {
        "term": "Principle of Least Privilege (PoLP)",
        "definition": "The security best practice that every user, process, and program should only have the minimum permissions necessary to perform its job."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Kernel Space vs User Space",
        "content": "Modern computer processors enforce hardware protection rings:\n\n\u2022 **Ring 0 (Kernel Mode)**: The OS kernel executes here. It directly talks to physical RAM, SSD controllers, network cards, and CPU cores. A bug in Kernel Mode causes a system crash (Blue Screen of Death / Kernel Panic).\n\u2022 **Ring 3 (User Mode)**: All your everyday programs\u2014web browsers, text editors, games\u2014run here. They cannot touch hardware directly. When Chrome wants to read a file from disk, it must ask the kernel nicely using a **System Call (syscall)**.\n\nThe kernel checks: *Does this user have permission to read this file?* If yes, the kernel reads the bytes and passes them to Chrome. If no, it returns 'Permission Denied'!"
      },
      {
        "title": "2. The Privilege Hierarchy: Standard User vs Root",
        "content": "Operating systems isolate different people and processes through user accounts:\n\n\u2022 **Standard User (e.g. `cadet`)**: Can read and write their own home directory files (`/home/cadet`), but cannot touch other users' files, modify system configuration in `/etc`, or install kernel drivers.\n\u2022 **Superuser (`root` in Linux, `SYSTEM` / `Administrator` in Windows)**: Can read and delete ANY file on the system, shut down servers, capture raw network traffic, and reset all passwords.\n\nRunning everyday tasks as `root` is dangerous: if you accidentally download malware while logged in as root, the malware inherits root powers!"
      },
      {
        "title": "3. The Principle of Least Privilege (PoLP)",
        "content": "One of the most foundational principles in all of cybersecurity is the **Principle of Least Privilege**:\n\n*Every program, service, and user should possess only the bare minimum privileges required to do its job, and not a single permission more.*\n\nFor example, a web server process (`www-data`) only needs permission to read website HTML files in `/var/www/html`. It should never have permission to read `/etc/shadow` (password hashes) or run administrative commands."
      }
    ],
    "seeExamples": [
      {
        "title": "Checking User Identity and Permissions with 'id'",
        "codeOrDiagram": "cadet@endlessus:~$ id\nuid=1001(cadet) gid=1001(cadet) groups=1001(cadet),27(sudo)\n\nroot@endlessus:~# id\nuid=0(root) gid=0(root) groups=0(root)",
        "explanation": "`id` shows your User ID (UID), primary Group ID (GID), and group memberships. UID 0 always belongs to root."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `id` in the terminal to inspect your active user ID, group ID, and group memberships:",
      "initialCommand": "",
      "expectedCommand": "id",
      "simulatedOutput": "uid=1001(cadet) gid=1001(cadet) groups=1001(cadet)\n[+] Security boundary verified: You are unprivileged user 'cadet' (UID 1001).",
      "explanation": "`id` prints real and effective user and group IDs."
    },
    "questions": [
      {
        "id": "q-06-1",
        "type": "exact",
        "question": "What numeric User ID (UID) is permanently reserved for the root superuser account on Linux systems?",
        "visualSlots": "_",
        "acceptedAnswers": [
          "0",
          "zero"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The lowest possible non-negative integer.",
        "explanation": "On Unix and Linux systems, UID 0 is reserved for root."
      },
      {
        "id": "q-06-2",
        "type": "multiple-choice",
        "question": "Which fundamental security principle states that users, processes, and applications should only be granted the minimum permissions required to perform their intended tasks?",
        "options": [
          "Security through Obscurity",
          "Principle of Least Privilege (PoLP)",
          "Defense in Inaction",
          "The Open-Door Policy"
        ],
        "correctIndex": 1,
        "hint": "Least privilege ensures minimum necessary access.",
        "explanation": "The Principle of Least Privilege dictates giving only essential access, drastically limiting potential exploit impact."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect user identity and UID",
        "instruction": "Run `id` in the terminal to check your UID.",
        "hints": [
          "Type: `id`"
        ]
      }
    ],
    "securityConnection": "When an attacker discovers a vulnerability in a web server, they typically gain an initial foothold as an unprivileged user (like `www-data` or `cadet`). From there, the attacker's main goal is **Privilege Escalation** (PrivEsc)\u2014exploiting misconfigurations, kernel bugs, or vulnerable SUID binaries to elevate from unprivileged user to `root`.",
    "id": "room-06",
    "nextRoomId": "room-07"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Introduction to Linux & The Command Line",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "20 min",
    "prerequisites": "Level 1: Computer Fundamentals",
    "whyAreYouHere": "Linux is the lifeblood of cybersecurity. Over 96% of top web servers, virtually all supercomputers, Android smartphones, and nearly all cybersecurity testing platforms (like Kali Linux and Parrot OS) run on Linux. In this room, you will learn why Linux dominates cybersecurity and how to navigate the command line with confidence.",
    "objectives": [
      "Understand why cybersecurity and servers rely almost exclusively on Linux",
      "Learn about the Linux kernel, open-source licensing, and major distributions (Debian, Ubuntu, Kali, Arch, Red Hat)",
      "Understand the Command Line Interface (CLI) versus Graphical User Interface (GUI)",
      "Deconstruct the anatomy of a Linux shell prompt (`user@hostname:path$`)",
      "Understand command syntax: command, options (flags), and arguments"
    ],
    "vocabulary": [
      {
        "term": "Linux Kernel",
        "definition": "The monolithic core created by Linus Torvalds in 1991 that manages hardware, memory, and processes."
      },
      {
        "term": "Distribution (Distro)",
        "definition": "A complete operating system bundle combining the Linux kernel with GNU utilities, package managers, and software (e.g., Ubuntu, Kali, Debian)."
      },
      {
        "term": "CLI (Command Line Interface)",
        "definition": "A text-based interaction environment where commands are typed to execute programs and manage files."
      },
      {
        "term": "Shell (Bash)",
        "definition": "A command-language interpreter that takes user text commands, interprets them, and passes them to the kernel for execution."
      },
      {
        "term": "Argument / Flag",
        "definition": "Modifiers appended to a command (e.g., `-l` or `-a`) that alter its behavior or specify target files."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Why Does Cybersecurity Run on Linux?",
        "content": "Why don't ethical hackers just use Windows for everything?\n\n1. **Total Control**: Linux gives you access to the source code of the entire operating system. There are no black-box secrets.\n2. **Scriptable & Automated**: Every action you perform in a Linux terminal can be scripted in Bash or Python to automate tasks across thousands of machines.\n3. **Low Resource Overhead**: A Linux server can run headless (no graphical desktop) using only 128MB of RAM, making it blazing fast and lightweight.\n4. **Security Tooling Ecosystem**: The world's top penetration testing distributions (Kali Linux, Parrot OS) come pre-installed with over 600 specialized security tools (Nmap, Metasploit, Wireshark, Burp Suite, John the Ripper)."
      },
      {
        "title": "2. Anatomy of the Shell Prompt",
        "content": "When you open a terminal in Linux, you are greeted by the shell prompt:\n\n`cadet@endlessus:~$ `\n\nLet's break down each component:\n\u2022 `cadet`: The currently logged-in username.\n\u2022 `@`: Separator ('at').\n\u2022 `endlessus`: The hostname of the computer or server.\n\u2022 `:`: Separator.\n\u2022 `~`: Your current working directory. The tilde symbol (`~`) is a universal shortcut for the current user's **home directory** (`/home/cadet`).\n\u2022 `$`: Indicates you are a **standard unprivileged user**. If you were the `root` superuser, this symbol would change to `#`!"
      },
      {
        "title": "3. Command Syntax: Commands, Flags, and Arguments",
        "content": "Linux commands follow a predictable sentence structure:\n\n`[command] [options/flags] [arguments]`\n\n\u2022 **Command**: What program do you want to run? (`ls` = list directory contents).\n\u2022 **Options/Flags**: How should it run? (e.g., `-l` for long detailed view, `-a` to show hidden files).\n\u2022 **Arguments**: What should it run against? (e.g., `/etc/nginx` to list that specific directory).\n\nExample: `ls -la /var/log` runs `ls` with flags `-l` and `-a` on directory `/var/log`."
      }
    ],
    "seeExamples": [
      {
        "title": "Command with Flags and Arguments",
        "codeOrDiagram": "cadet@endlessus:~$ ls\nDocuments  Downloads  notes.txt\n\ncadet@endlessus:~$ ls -l\ntotal 8\ndrwxr-xr-x 2 cadet cadet 4096 Oct 15 10:00 Documents\ndrwxr-xr-x 2 cadet cadet 4096 Oct 15 10:00 Downloads\n-rw-r--r-- 1 cadet cadet  142 Oct 15 10:05 notes.txt",
        "explanation": "Adding the `-l` flag turns `ls` from a simple names list into a detailed view showing permissions, owner, file size, and timestamps."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Type `echo $SHELL` to print the name of your active shell interpreter:",
      "initialCommand": "",
      "expectedCommand": "echo $SHELL",
      "simulatedOutput": "/bin/bash\n[+] Active shell confirmed: You are running GNU Bash (/bin/bash).",
      "explanation": "`$SHELL` is an environment variable holding the path to the current user's shell program."
    },
    "questions": [
      {
        "id": "q-07-1",
        "type": "exact",
        "question": "Which symbol at the end of a Linux shell prompt signifies that you are logged in as a standard unprivileged user rather than root?",
        "visualSlots": "_",
        "acceptedAnswers": [
          "$",
          "dollar",
          "dollar sign"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The dollar sign ($).",
        "explanation": "In standard Linux shells, '$' denotes an unprivileged user, while '#' denotes root."
      },
      {
        "id": "q-07-2",
        "type": "multiple-choice",
        "question": "In the command `ls -la /home`, what does `-la` represent?",
        "options": [
          "The main command being executed",
          "The target destination argument",
          "Command-line flags/options that modify how the command behaves",
          "A file path redirection"
        ],
        "correctIndex": 2,
        "hint": "Dashes prefix optional modifiers (flags).",
        "explanation": "Options (flags) like `-la` modify program behavior (here, long format `-l` and show hidden files `-a`)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect active shell interpreter",
        "instruction": "Print the current shell path using `echo $SHELL`.",
        "hints": [
          "Type: `echo $SHELL`"
        ]
      }
    ],
    "securityConnection": "Penetration testers frequently interact with compromised targets solely through remote 'reverse shells'\u2014a raw terminal connection over a network with no graphics. Comfort with the Linux CLI is the single most essential skill in offensive cybersecurity.",
    "id": "room-07",
    "nextRoomId": "room-08"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Navigating the Filesystem (pwd, ls, cd)",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 07: Introduction to Linux & The Command Line",
    "whyAreYouHere": "In a GUI, you click folders to move around. In the terminal, you navigate using three foundational commands: `pwd`, `ls`, and `cd`. Understanding absolute versus relative paths is crucial\u2014if you target the wrong directory during a penetration test, you could accidentally delete evidence or crash a system.",
    "objectives": [
      "Understand the Linux root directory (`/`) and hierarchical directory tree",
      "Print your current location with `pwd` (print working directory)",
      "List folder contents with `ls`, including hidden files (`ls -a`) and details (`ls -l`)",
      "Change directories using `cd`",
      "Master relative paths (`.`, `..`), home directory shortcuts (`~`), and absolute paths (`/var/log`)"
    ],
    "vocabulary": [
      {
        "term": "pwd (print working directory)",
        "definition": "Outputs the full, absolute path of the directory you are currently standing in."
      },
      {
        "term": "ls (list)",
        "definition": "Lists the files and folders inside a specified directory (or the current directory by default)."
      },
      {
        "term": "cd (change directory)",
        "definition": "Moves your terminal session into a different directory."
      },
      {
        "term": "Absolute Path",
        "definition": "A complete path starting from the root directory `/` (e.g., `/etc/passwd`). Works regardless of where you are."
      },
      {
        "term": "Relative Path",
        "definition": "A path relative to your current location (e.g., `../documents` or `./script.sh`)."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Linux Unified Directory Tree",
        "content": "Unlike Windows, which uses separate drive letters (`C:\\`, `D:\\`), Linux organizes everything under a single unified root directory represented by a single forward slash: `/`.\n\nKey system directories include:\n\u2022 `/`: The root directory of the entire filesystem.\n\u2022 `/home`: Personal user directories (e.g., `/home/cadet`).\n\u2022 `/etc`: System configuration files (network settings, users, web server configs).\n\u2022 `/var/log`: System and application log files.\n\u2022 `/bin` & `/usr/bin`: Executable programs and utilities (`ls`, `cat`, `whoami`).\n\u2022 `/tmp`: Temporary files (anyone can write here; cleared on reboot)."
      },
      {
        "title": "2. The Big Three: pwd, ls, and cd",
        "content": "\u2022 **`pwd` (Print Working Directory)**: Tells you where you are right now.\n  `cadet@endlessus:~$ pwd` -> `/home/cadet`\n\n\u2022 **`ls` (List)**: Shows what is inside your current folder.\n  `ls -la`: The `-l` flag gives a long detailed list (permissions, size, date); `-a` shows all files including **hidden files** (files beginning with a dot like `.bashrc`).\n\n\u2022 **`cd` (Change Directory)**: Moves you to another folder.\n  `cd /etc`: Moves to `/etc`.\n  `cd ~` or just `cd`: Instantly brings you back to your home directory."
      },
      {
        "title": "3. Absolute vs Relative Paths & The Special Dots",
        "content": "Understanding paths is essential:\n\n\u2022 **Absolute Path**: Starts with a leading `/`. It points to an exact location on the filesystem no matter where you are:\n  `cd /var/log/nginx`\n\n\u2022 **Relative Path**: Does NOT start with `/`. It starts from wherever you are right now:\n  If you are in `/var`, typing `cd log` moves you into `/var/log`.\n\n\u2022 **The Dot (`.`)**: Represents the *current* directory.\n\u2022 **The Double Dot (`..`)**: Represents the *parent* directory (one level up).\n  `cd ..` moves up one level!"
      }
    ],
    "seeExamples": [
      {
        "title": "Navigating up and down the filesystem tree",
        "codeOrDiagram": "cadet@endlessus:~$ pwd\n/home/cadet\n\ncadet@endlessus:~$ cd ..\ncadet@endlessus:/home$ pwd\n/home\n\ncadet@endlessus:/home$ cd /etc/nginx\ncadet@endlessus:/etc/nginx$ pwd\n/etc/nginx\n\ncadet@endlessus:/etc/nginx$ cd ~\ncadet@endlessus:~$ pwd\n/home/cadet",
        "explanation": "Notice how `cd ..` steps up to `/home`, `cd /etc/nginx` jumps via absolute path, and `cd ~` returns home."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `pwd` in the terminal to print your current absolute directory location:",
      "initialCommand": "",
      "expectedCommand": "pwd",
      "simulatedOutput": "/home/cadet\n[+] Current directory identified: /home/cadet",
      "explanation": "`pwd` prints the absolute path of the current working directory."
    },
    "questions": [
      {
        "id": "q-08-1",
        "type": "exact",
        "question": "Which Linux command displays the full absolute path of your current working directory?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "pwd"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Print Working Directory abbreviation.",
        "explanation": "`pwd` stands for Print Working Directory."
      },
      {
        "id": "q-08-2",
        "type": "exact",
        "question": "Which two-character relative path shorthand refers to the parent directory immediately one level up?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "..",
          "dot dot"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Two periods together.",
        "explanation": "'..' always refers to the parent directory in Unix/Linux."
      },
      {
        "id": "q-08-3",
        "type": "multiple-choice",
        "question": "Which flag added to `ls` forces the display of hidden files (files beginning with a dot like `.bashrc`)?",
        "options": [
          "-h",
          "-a",
          "-r",
          "-z"
        ],
        "correctIndex": 1,
        "hint": "Short for 'all'.",
        "explanation": "The `-a` (or `--all`) flag tells `ls` not to ignore entries starting with `.`."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Verify current directory",
        "instruction": "Print your current working directory path with `pwd`.",
        "hints": [
          "Type: `pwd`"
        ]
      }
    ],
    "securityConnection": "Web vulnerabilities like **Path Traversal (Directory Traversal)** exploit relative paths. An attacker supplies `../../../../etc/passwd` in a vulnerable web file parameter to trick the web application into walking out of the web root folder into sensitive operating system configuration files!",
    "id": "room-08",
    "nextRoomId": "room-09"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Creating, Moving & Deleting Files (touch, mkdir, cp, mv, rm)",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 08: Navigating the Filesystem",
    "whyAreYouHere": "Security professionals create exploit scripts, copy log files for evidence preservation, move binaries to temporary locations, and remove test artifacts after an assessment. In this room, you will master file manipulation commands and learn why `rm -rf` must be used with extreme caution.",
    "objectives": [
      "Create new empty files using `touch`",
      "Create single and nested directories using `mkdir` and `mkdir -p`",
      "Copy files and folders using `cp` and recursive `cp -r`",
      "Move and rename files using `mv`",
      "Safely delete files with `rm` and folders with `rm -r`",
      "Understand why there is no 'Recycle Bin' in the Linux terminal"
    ],
    "vocabulary": [
      {
        "term": "touch",
        "definition": "Creates a new empty file if it doesn't exist, or updates timestamps if it does."
      },
      {
        "term": "mkdir (make directory)",
        "definition": "Creates one or more new directories."
      },
      {
        "term": "cp (copy)",
        "definition": "Duplicates files or directories from a source to a destination."
      },
      {
        "term": "mv (move)",
        "definition": "Moves files or directories, and also used to rename files in place."
      },
      {
        "term": "rm (remove)",
        "definition": "Permanently deletes files from the filesystem."
      },
      {
        "term": "Recursive (-r / -R)",
        "definition": "An option that causes a command to apply to a directory AND all files/folders nested within it."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Creating Files and Directories",
        "content": "\u2022 **`touch [filename]`**: Instantly creates an empty file.\n  `touch report.txt`\n\n\u2022 **`mkdir [dirname]`**: Creates a new folder.\n  `mkdir recon`\n  If you want to create a nested hierarchy of folders in one command, use the `-p` (parents) flag:\n  `mkdir -p targets/acmefin/nmap` creates `targets`, `acmefin` inside it, and `nmap` inside that!"
      },
      {
        "title": "2. Copying and Moving (Renaming) Files",
        "content": "\u2022 **`cp [source] [destination]`**: Copies a file.\n  `cp notes.txt backup_notes.txt`\n  To copy an entire directory and all its contents, you MUST use the recursive flag `-r`:\n  `cp -r tools/ /tmp/tools/`\n\n\u2022 **`mv [source] [destination]`**: Moves a file OR renames it.\n  In Linux, renaming is just moving a file to a new name in the same folder!\n  `mv old_name.txt new_name.txt`\n  `mv exploit.py /tmp/` (moves `exploit.py` into `/tmp` directory)."
      },
      {
        "title": "3. Deleting Files with rm \u2014 There is No Recycle Bin!",
        "content": "**CRITICAL WARNING**: In a graphical desktop, deleting a file moves it to the 'Trash' or 'Recycle Bin'. In the Linux terminal, `rm` deletes files **permanently and immediately**.\n\n\u2022 `rm notes.txt`: Deletes a single file.\n\u2022 `rm -r folder_name`: Recursively deletes a folder and everything inside it.\n\u2022 `rm -rf folder_name`: The `-f` (force) flag forces deletion without asking for confirmation, ignoring errors.\n\n*Never run `rm -rf /` or `rm -rf /*`\u2014it will permanently wipe the entire operating system!*"
      }
    ],
    "seeExamples": [
      {
        "title": "Workflow: Create, Copy, Rename, and Remove",
        "codeOrDiagram": "cadet@endlessus:~$ touch test.txt\ncadet@endlessus:~$ cp test.txt copy.txt\ncadet@endlessus:~$ mv copy.txt renamed.txt\ncadet@endlessus:~$ ls\nrenamed.txt  test.txt\ncadet@endlessus:~$ rm test.txt renamed.txt\ncadet@endlessus:~$ ls\n(empty)",
        "explanation": "This sequence shows creating, duplicating, renaming, and permanently removing files."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Create an empty file called `audit.log` using the `touch` command:",
      "initialCommand": "",
      "expectedCommand": "touch audit.log",
      "simulatedOutput": "[+] File created: audit.log successfully created in current directory.",
      "explanation": "`touch` creates a zero-byte file if it does not already exist."
    },
    "questions": [
      {
        "id": "q-09-1",
        "type": "exact",
        "question": "Which Linux command is used to duplicate files or directories from one location to another?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "cp",
          "copy"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Two-letter abbreviation for copy.",
        "explanation": "`cp` stands for copy."
      },
      {
        "id": "q-09-2",
        "type": "exact",
        "question": "Which command is used both to move files between directories and to rename a file in place?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "mv",
          "move"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Two-letter abbreviation for move.",
        "explanation": "`mv` stands for move."
      },
      {
        "id": "q-09-3",
        "type": "multiple-choice",
        "question": "What flag must be passed to `cp` or `rm` to make the operation recursive through all nested subdirectories?",
        "options": [
          "-a",
          "-r",
          "-z",
          "-k"
        ],
        "correctIndex": 1,
        "hint": "Short for recursive.",
        "explanation": "The `-r` (or `-R`) flag instructs commands to traverse directories recursively."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Create a file with touch",
        "instruction": "Create `audit.log` using `touch audit.log`.",
        "hints": [
          "Type: `touch audit.log`"
        ]
      }
    ],
    "securityConnection": "During incident response cleanup or post-exploitation, ethical hackers must carefully record every file they create on a client system and delete them when testing completes (cleanup phase) to leave the client environment in its original state.",
    "id": "room-09",
    "nextRoomId": "room-10"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Viewing & Searching Files (cat, head, tail, grep, find)",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "30 min",
    "prerequisites": "Room 09: Creating, Moving & Deleting Files",
    "whyAreYouHere": "Security analysts spend hours reading configuration files, inspecting log files with millions of lines, and searching for stored credentials. Opening a 2GB log file in a graphical text editor will freeze your computer. In this room, you will master the essential command-line tools to view and filter text instantaneously.",
    "objectives": [
      "Print entire files with `cat` (concatenate)",
      "Inspect the beginning of files with `head` and the end with `tail`",
      "Monitor growing log files in real time using `tail -f`",
      "Search for words and patterns across files using `grep` and case-insensitive `grep -i`",
      "Locate files anywhere on the filesystem using `find`"
    ],
    "vocabulary": [
      {
        "term": "cat (concatenate)",
        "definition": "Reads one or more files and prints their entire contents sequentially to standard output."
      },
      {
        "term": "head",
        "definition": "Outputs the first N lines of a file (defaults to first 10 lines)."
      },
      {
        "term": "tail",
        "definition": "Outputs the last N lines of a file (defaults to last 10 lines)."
      },
      {
        "term": "tail -f (follow)",
        "definition": "Keeps the file open and displays new lines in real time as they are written by applications."
      },
      {
        "term": "grep",
        "definition": "Global Regular Expression Print. Searches text files for lines matching a specified string or regex pattern."
      },
      {
        "term": "find",
        "definition": "Searches directory trees for files matching criteria like filename, size, permissions, or modification date."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Reading Text Files: cat, head, and tail",
        "content": "\u2022 **`cat [file]`**: Prints the whole file to your screen. Great for small files:\n  `cat /etc/issue`\n  *Warning*: Do not run `cat` on a massive 500,000-line log file, or your screen will scroll endlessly!\n\n\u2022 **`head -n [number] [file]`**: Shows just the top lines of a file:\n  `head -n 5 /etc/passwd` shows the first 5 user accounts.\n\n\u2022 **`tail -n [number] [file]`**: Shows just the bottom lines of a file:\n  `tail -n 10 /var/log/auth.log` shows the 10 most recent login attempts.\n\n\u2022 **`tail -f [file]` (Real-Time Monitoring)**: The `-f` flag 'follows' the file live! As web visitors hit a server, new log entries stream onto your screen instantly. Press `Ctrl + C` to stop."
      },
      {
        "title": "2. Searching Inside Files with grep",
        "content": "`grep` is one of the most powerful utilities in Linux. It searches files line-by-line and outputs only the lines containing your search term:\n\n`grep [options] \"search_term\" [filename]`\n\nEssential flags:\n\u2022 `-i`: **Case-insensitive** (matches 'admin', 'Admin', or 'ADMIN').\n\u2022 `-n`: Displays the **line number** where the match occurred.\n\u2022 `-v`: **Inverts the match** (prints all lines that do NOT contain the term).\n\u2022 `-r`: **Recursive** search through all files in a directory:\n  `grep -ri \"password\" /var/www/html/` searches every website file for the word 'password'!"
      },
      {
        "title": "3. Locating Files with find",
        "content": "`grep` searches *inside* file contents. `find` searches for the *files themselves* across the directory tree:\n\n\u2022 Find by name:\n  `find / -name \"*.conf\" 2>/dev/null`\n  Searches the entire disk (`/`) for files ending in `.conf`. (`2>/dev/null` silences permission denied warnings).\n\n\u2022 Find by type:\n  `find /home -type f -name \"notes.txt\"` (`-type f` for files, `-type d` for directories).\n\n\u2022 Find by permission (Privilege Escalation!):\n  `find / -perm -4000 -type f 2>/dev/null` searches for SUID executables that run with root privileges!"
      }
    ],
    "seeExamples": [
      {
        "title": "Searching /etc/passwd with grep",
        "codeOrDiagram": "cadet@endlessus:~$ grep -i \"root\" /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\n\ncadet@endlessus:~$ grep -i \"cadet\" /etc/passwd\ncadet:x:1001:1001:Endlessus Cadet:/home/cadet:/bin/bash",
        "explanation": "`grep -i` filters `/etc/passwd` to extract only lines mentioning the requested user account."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `cat /etc/passwd | head -n 3` to print the first 3 lines of the system password database:",
      "initialCommand": "",
      "expectedCommand": "cat /etc/passwd | head -n 3",
      "simulatedOutput": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\n[+] Inspection successful: First 3 system accounts displayed.",
      "explanation": "`cat` reads `/etc/passwd` and pipes the output into `head -n 3`."
    },
    "questions": [
      {
        "id": "q-10-1",
        "type": "exact",
        "question": "Which Linux tool is used to search text for lines matching regular expressions or specific keyword strings?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "grep"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Global Regular Expression Print.",
        "explanation": "`grep` searches file contents for matching string patterns."
      },
      {
        "id": "q-10-2",
        "type": "multiple-choice",
        "question": "Which flag allows `tail` to continuously monitor and display new lines added to a log file in real time?",
        "options": [
          "-r",
          "-f",
          "-m",
          "-v"
        ],
        "correctIndex": 1,
        "hint": "Follow flag.",
        "explanation": "`tail -f` (follow) monitors files in real time as new data is appended."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect password database",
        "instruction": "Run `cat /etc/passwd | head -n 3` in the terminal.",
        "hints": [
          "Type: `cat /etc/passwd | head -n 3`"
        ]
      }
    ],
    "securityConnection": "During security audits, analysts use `grep -ri 'api_key\\|secret\\|password' /app/` to hunt for hardcoded credentials accidentally left in source code or backup files.",
    "id": "room-10",
    "nextRoomId": "room-11"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Linux Permissions & Ownership (chmod, chown, sudo)",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "30 min",
    "prerequisites": "Room 10: Viewing & Searching Files",
    "whyAreYouHere": "Linux permissions are the primary defense against unauthorized access. If a web server configuration file containing database credentials is set to 'world-readable' (`666` or `777`), any unprivileged attacker on the system can read it immediately. In this room, you will master the `rwx` permission triad and octal notation.",
    "objectives": [
      "Understand the 3 permission levels: User (Owner), Group, and Others (World)",
      "Deconstruct the `rwx` permission bits (Read = 4, Write = 2, Execute = 1)",
      "Calculate octal permission masks (755, 644, 600, 777)",
      "Change file permissions using `chmod`",
      "Change file ownership using `chown`",
      "Execute administrative commands safely using `sudo`"
    ],
    "vocabulary": [
      {
        "term": "rwx (Read, Write, Execute)",
        "definition": "The three permissions in Unix: Read (view content), Write (modify or delete), and Execute (run as a program)."
      },
      {
        "term": "chmod (change mode)",
        "definition": "Modifies the permission access bits on files and directories."
      },
      {
        "term": "chown (change owner)",
        "definition": "Changes the user owner and/or group owner of a file or directory."
      },
      {
        "term": "Octal Notation",
        "definition": "A 3-digit numeric representation of permissions where r=4, w=2, x=1 (e.g. 7 = rwx, 6 = rw-, 4 = r--, 0 = ---)."
      },
      {
        "term": "sudo (superuser do)",
        "definition": "Allows authorized users to execute a command with root security privileges."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Reading the Permission String: -rwxr-xr--",
        "content": "When you run `ls -la`, the first column displays a 10-character string:\n\n`- rwx r-x r--`\n\n\u2022 **Character 1 (File Type)**: `-` means standard file; `d` means directory; `l` means symbolic link.\n\u2022 **Characters 2-4 (User/Owner)**: Permissions for the user who owns the file (`rwx` = can read, write, and execute).\n\u2022 **Characters 5-7 (Group)**: Permissions for members of the file's assigned group (`r-x` = can read and execute, but cannot modify).\n\u2022 **Characters 8-10 (Others/World)**: Permissions for EVERYONE else on the entire computer (`r--` = read-only)."
      },
      {
        "title": "2. Octal Math: The Numbers Behind chmod",
        "content": "In cybersecurity, permissions are almost always set using **octal numbers**:\n\n\u2022 **Read (`r`)** = 4\n\u2022 **Write (`w`)** = 2\n\u2022 **Execute (`x`)** = 1\n\u2022 **None (`-`)** = 0\n\nAdd the numbers together for each of the three tiers (User, Group, Others):\n\n\u2022 `rwx` = 4 + 2 + 1 = **7**\n\u2022 `rw-` = 4 + 2 + 0 = **6**\n\u2022 `r-x` = 4 + 0 + 1 = **5**\n\u2022 `r--` = 4 + 0 + 0 = **4**\n\u2022 `---` = 0 + 0 + 0 = **0**\n\nCommon combinations:\n\u2022 `chmod 755 script.sh`: Owner can read/write/run (7); everyone else can read/run (55).\n\u2022 `chmod 644 document.txt`: Owner can read/write (6); everyone else read-only (44).\n\u2022 `chmod 600 id_rsa`: Private SSH key! Owner only can read/write (6); NO ONE ELSE has any access (00)!\n\u2022 `chmod 777 file`: DANGEROUS! Everyone in the world can modify, execute, or delete it!"
      },
      {
        "title": "3. Changing Ownership and Elevating with sudo",
        "content": "\u2022 **`chown [user]:[group] [file]`**: Changes who owns the file. Only root can transfer ownership:\n  `sudo chown cadet:cadet config.php`\n\n\u2022 **`sudo [command]`**: Stands for 'Superuser Do'. It allows an authorized user to run a single command as `root` without permanently logging into the dangerous root shell.\n  `sudo systemctl restart nginx`"
      }
    ],
    "seeExamples": [
      {
        "title": "Securing a world-writable configuration file",
        "codeOrDiagram": "cadet@endlessus:~$ ls -l config.php\n-rw-rw-rw- 1 cadet cadet 840 Oct 15 11:00 config.php\n[!] Vulnerability: config.php is world-writable (666)!\n\ncadet@endlessus:~$ chmod 600 config.php\ncadet@endlessus:~$ ls -l config.php\n-rw------- 1 cadet cadet 840 Oct 15 11:00 config.php\n[+] Hardened: Only owner can read/write; others blocked.",
        "explanation": "`chmod 600` strips group and other permissions, restricting access to the owner."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Audit permissions on config.php with `ls -la config.php`:",
      "initialCommand": "",
      "expectedCommand": "ls -la config.php",
      "simulatedOutput": "-rw-rw-rw- 1 cadet cadet 840 Oct 15 11:00 config.php\n[!] Notice: Permissions -rw-rw-rw- mean world-writable (octal 666).",
      "explanation": "`ls -la` reveals detailed permission flags."
    },
    "questions": [
      {
        "id": "q-11-1",
        "type": "exact",
        "question": "What 3-digit octal permission value gives the file owner full read and write access while completely denying all access to group members and others?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "600"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Read (4) + Write (2) = 6 for owner; 0 for group; 0 for others.",
        "explanation": "600 represents rw------- (read/write for owner only)."
      },
      {
        "id": "q-11-2",
        "type": "multiple-choice",
        "question": "If a file has permissions `-rwxr-xr--`, what permission does a member of the file's assigned group possess?",
        "options": [
          "Read, write, and execute",
          "Read and execute only (r-x)",
          "Read only (r--)",
          "No access (---)"
        ],
        "correctIndex": 1,
        "hint": "Inspect characters 5-7: r-x.",
        "explanation": "Characters 5-7 represent group permissions: 'r-x' equals read and execute."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Audit file permissions",
        "instruction": "Inspect permissions of `config.php` using `ls -la config.php`.",
        "hints": [
          "Type: `ls -la config.php`"
        ]
      }
    ],
    "securityConnection": "In Linux Privilege Escalation, attackers search for world-writable system files (like `/etc/passwd` or `/etc/cron.d/job`). If an unprivileged user can edit a cron job that runs as root, they can inject malicious commands and gain root access!",
    "id": "room-11",
    "nextRoomId": "room-12"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Processes & System Monitoring (ps, top, kill)",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 11: Linux Permissions & Ownership",
    "whyAreYouHere": "When a server is sluggish, cryptocurrency mining malware may be consuming 100% of CPU cycles in the background. In this room, you will learn how to monitor system performance in real time using `top`, list all system processes with `ps aux`, and terminate rogue processes using `kill`.",
    "objectives": [
      "List all system processes with `ps aux` and understand the columns (USER, PID, %CPU, %MEM, COMMAND)",
      "Monitor real-time CPU, RAM, and process activity using `top` and `htop`",
      "Understand Linux signals (SIGTERM = 15, SIGKILL = 9)",
      "Terminate stuck or malicious processes using `kill` and `kill -9`",
      "Manage background tasks using the ampersand (`&`), `jobs`, and `fg`"
    ],
    "vocabulary": [
      {
        "term": "ps aux",
        "definition": "Displays a snapshot of every process running on the entire system for all users."
      },
      {
        "term": "top / htop",
        "definition": "An interactive real-time process viewer and system resource monitor."
      },
      {
        "term": "kill",
        "definition": "Sends an operating system signal to a process requesting or forcing its termination."
      },
      {
        "term": "SIGTERM (15)",
        "definition": "Graceful termination signal allowing a process to save data and close sockets before exiting."
      },
      {
        "term": "SIGKILL (9)",
        "definition": "Immediate, unconditional termination signal handled directly by the kernel. The process cannot catch or ignore it."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Inspecting All Processes: ps aux",
        "content": "While `ps` only shows processes in your current terminal, **`ps aux`** reveals everything happening on the entire machine:\n\n\u2022 `a`: Show processes for **all users**.\n\u2022 `u`: Display in **user-oriented format** (shows username, CPU %, RAM %).\n\u2022 `x`: Include processes **without a controlling terminal** (background services, daemons).\n\nCombine with `grep` to find specific applications:\n`ps aux | grep nginx` checks if the Nginx web server is actively running."
      },
      {
        "title": "2. Real-Time Monitoring: top",
        "content": "Typing `top` opens an interactive dashboard that refreshes every 3 seconds:\n\n\u2022 **Header**: System uptime, active users, load average over 1, 5, and 15 minutes.\n\u2022 **Tasks**: Total running, sleeping, stopped, and zombie processes.\n\u2022 **CPU / Mem**: Percentage of CPU idle, user space, and kernel space; physical RAM usage.\n\u2022 **Process List**: Sorted by CPU consumption by default. If a process named `xmrig` is pegged at 99.8% CPU, you likely have a crypto-miner!\n\nPress `q` to exit `top`."
      },
      {
        "title": "3. Terminating Rogue Processes with kill",
        "content": "To stop a process, you send it a signal with its PID:\n\n\u2022 **Graceful Kill (`kill [PID]`)**: Sends `SIGTERM` (signal 15). The process closes database connections, flushes write buffers, and terminates cleanly.\n\u2022 **Force Kill (`kill -9 [PID]`)**: Sends `SIGKILL` (signal 9). The kernel immediately obliterates the process from RAM. Use this when malware or frozen processes refuse to respond to graceful termination!"
      }
    ],
    "seeExamples": [
      {
        "title": "Hunting and Killing a Rogue Process",
        "codeOrDiagram": "cadet@endlessus:~$ ps aux | grep -i \"cryptominer\"\ncadet       4520  98.5  2.1 142084  8420 pts/1    R    10:15   5:20 /tmp/.hidden/cryptominer\n\ncadet@endlessus:~$ kill -9 4520\n[+] Process 4520 terminated successfully.",
        "explanation": "Identified rogue PID 4520 consuming 98.5% CPU, then forcefully terminated it with `kill -9`."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `ps aux | head -n 4` to inspect the process table headers and first 3 system processes:",
      "initialCommand": "",
      "expectedCommand": "ps aux | head -n 4",
      "simulatedOutput": "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 168420 12040 ?        Ss   09:00   0:01 /sbin/init\nroot         2  0.0  0.0      0     0 ?        S    09:00   0:00 [kthreadd]\nroot         3  0.0  0.0      0     0 ?        I<   09:00   0:00 [rcu_gp]\n[+] Process snapshot verified: PID 1 is /sbin/init.",
      "explanation": "`ps aux` piped to `head -n 4` prints the column headers and first three processes."
    },
    "questions": [
      {
        "id": "q-12-1",
        "type": "exact",
        "question": "Which signal number represents SIGKILL, forcing immediate unconditional process termination by the kernel?",
        "visualSlots": "_",
        "acceptedAnswers": [
          "9"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The number 9.",
        "explanation": "Signal 9 is SIGKILL."
      },
      {
        "id": "q-12-2",
        "type": "multiple-choice",
        "question": "In the output of `ps aux`, what does the `%CPU` column indicate?",
        "options": [
          "The total number of CPU cores installed",
          "The percentage of CPU time currently utilized by that specific process",
          "The processor clock speed in Gigahertz",
          "The temperature of the CPU"
        ],
        "correctIndex": 1,
        "hint": "Percentage of processor usage.",
        "explanation": "%CPU shows the fraction of CPU time consumed by the process."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: View process table",
        "instruction": "Execute `ps aux | head -n 4` in the terminal.",
        "hints": [
          "Type: `ps aux | head -n 4`"
        ]
      }
    ],
    "securityConnection": "Malware frequently renames its process name or attempts to inject code into legitimate processes like `/usr/sbin/cron` to evade detection in `ps aux`. Blue teams use EDR (Endpoint Detection and Response) tools that track process execution trees and hash signatures rather than relying solely on process names.",
    "id": "room-12",
    "nextRoomId": "room-13"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Pipes, Redirection & Command Chaining (>, >>, |, &&)",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "30 min",
    "prerequisites": "Room 12: Processes & System Monitoring",
    "whyAreYouHere": "The core philosophy of Unix is: 'Write programs that do one thing and do it well. Write programs to work together.' Instead of building giant complex tools, Linux lets you chain simple utilities together using pipes and redirection to create powerful security automation one-liners. In this room, you will master standard input, output, redirection, and conditional operators.",
    "objectives": [
      "Understand the 3 Standard Streams: stdin (0), stdout (1), and stderr (2)",
      "Redirect output to files using overwrite (`>`) and append (`>>`)",
      "Chain utilities together using the pipe operator (`|`)",
      "Redirect error streams using `2>/dev/null`",
      "Execute conditional multi-command chains using `&&` (AND) and `||` (OR)"
    ],
    "vocabulary": [
      {
        "term": "Standard Output (stdout / 1)",
        "definition": "The default stream where normal program output is printed (usually the terminal screen)."
      },
      {
        "term": "Standard Error (stderr / 2)",
        "definition": "The default stream where error messages are printed, kept separate from normal output."
      },
      {
        "term": "Pipe (|)",
        "definition": "Connects the standard output of the command on the left directly into the standard input of the command on the right."
      },
      {
        "term": "Redirect Overwrite (>)",
        "definition": "Writes output to a file, replacing and wiping any existing contents."
      },
      {
        "term": "Redirect Append (>>)",
        "definition": "Writes output to a file, appending to the bottom without erasing existing contents."
      },
      {
        "term": "Conditional AND (&&)",
        "definition": "Runs the second command ONLY if the first command succeeded (returned exit code 0)."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Standard Streams: stdin, stdout, and stderr",
        "content": "Every command in Linux communicates through three standardized data streams:\n\n1. **Standard Input (`stdin` - File Descriptor 0)**: Input coming from keyboard or pipe.\n2. **Standard Output (`stdout` - File Descriptor 1)**: The regular results of the command.\n3. **Standard Error (`stderr` - File Descriptor 2)**: Error diagnostics and warnings.\n\nKeeping errors separate from normal output allows you to filter out errors while keeping useful results!"
      },
      {
        "title": "2. File Redirection: > vs >> and /dev/null",
        "content": "Instead of printing output to your screen, you can redirect it into a file:\n\n\u2022 **`>` (Overwrite)**: Overwrites the target file completely!\n  `echo \"10.10.10.50\" > target.txt`\n\n\u2022 **`>>` (Append)**: Appends new lines to the end of the file without deleting anything:\n  `echo \"10.10.10.51\" >> target.txt`\n\n\u2022 **Redirecting Errors (`2>/dev/null`)**: In Linux, `/dev/null` is the 'black hole'\u2014any data sent there vanishes forever. When searching as an unprivileged user, `find` prints hundreds of 'Permission denied' errors. Mute them like this:\n  `find / -name flag.txt 2>/dev/null` (redirects stream 2 stderr to `/dev/null`)."
      },
      {
        "title": "3. The Pipe (|) and Command Chaining (&&, ||)",
        "content": "\u2022 **The Pipe (`|`)**: Feeds the output of one command into the input of the next:\n  `cat /var/log/auth.log | grep \"Failed password\" | wc -l`\n  (Reads auth log, filters for failed passwords, counts the lines!).\n\n\u2022 **Logical AND (`&&`)**: Run command 2 only if command 1 succeeds:\n  `mkdir project && cd project` (only changes directory if folder creation worked).\n\n\u2022 **Logical OR (`||`)**: Run command 2 only if command 1 fails:\n  `ping -c 1 10.10.10.1 || echo \"Host is DOWN\"`."
      }
    ],
    "seeExamples": [
      {
        "title": "Piping and Redirection in Action",
        "codeOrDiagram": "cadet@endlessus:~$ echo \"Server Alpha\" > servers.txt\ncadet@endlessus:~$ echo \"Server Beta\" >> servers.txt\ncadet@endlessus:~$ cat servers.txt | grep \"Beta\"\nServer Beta",
        "explanation": "Output redirected with `>` and `>>`, then read and filtered through a pipe."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo \"Audit Passed\" > status.txt && cat status.txt`:",
      "initialCommand": "",
      "expectedCommand": "echo \"Audit Passed\" > status.txt && cat status.txt",
      "simulatedOutput": "Audit Passed\n[+] Chained command successful: Written to file and immediately printed.",
      "explanation": "Chains write redirection (`>`) with print (`cat`) using conditional AND (`&&`)."
    },
    "questions": [
      {
        "id": "q-13-1",
        "type": "exact",
        "question": "Which redirection operator appends output to the end of an existing file without wiping its contents?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          ">>"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Double greater-than symbol.",
        "explanation": "The '>>' operator appends standard output to a file."
      },
      {
        "id": "q-13-2",
        "type": "multiple-choice",
        "question": "What special device file is known as the Linux 'black hole', used to discard unwanted error messages (e.g. `2>/dev/null`)?",
        "options": [
          "/dev/zero",
          "/dev/null",
          "/dev/random",
          "/dev/trash"
        ],
        "correctIndex": 1,
        "hint": "Null device.",
        "explanation": "`/dev/null` discards all data written to it."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Test command chaining",
        "instruction": "Execute `echo \"Audit Passed\" > status.txt && cat status.txt`.",
        "hints": [
          "Type: `echo \"Audit Passed\" > status.txt && cat status.txt`"
        ]
      }
    ],
    "securityConnection": "In Command Injection vulnerabilities, attackers exploit command separators (`;`, `|`, `&&`, `||`) injected into web form inputs to execute arbitrary operating system commands (e.g. `127.0.0.1 && cat /etc/shadow`).",
    "id": "room-13",
    "nextRoomId": "room-14"
  },
  {
    "stage": 2,
    "level": 2,
    "levelTitle": "Level 2 \u2014 Linux Fundamentals",
    "title": "Environment Variables & Basic Bash Scripting",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "30 min",
    "prerequisites": "Room 13: Pipes, Redirection & Command Chaining",
    "whyAreYouHere": "Environment variables configure the behavior of programs and shells, storing information like your current username, home directory, and the search path for executable binaries. In this room, you will learn how environment variables work, how to write your first automated Bash script, and why the `$PATH` variable is a frequent target for privilege escalation.",
    "objectives": [
      "Understand what environment variables are and how to view them using `env` and `echo`",
      "Inspect key variables: `$USER`, `$HOME`, `$SHELL`, and `$PATH`",
      "Set temporary and permanent environment variables using `export`",
      "Write and execute a basic Bash shell script with a shebang (`#!/bin/bash`)",
      "Understand PATH hijacking and how attackers exploit insecure PATH settings"
    ],
    "vocabulary": [
      {
        "term": "Environment Variable",
        "definition": "A dynamic named value that affects the way running processes behave on a computer."
      },
      {
        "term": "PATH",
        "definition": "An environment variable containing a colon-separated list of directories the shell searches when you type a command without its full path."
      },
      {
        "term": "export",
        "definition": "Exports a shell variable so child processes inherit it in their environment."
      },
      {
        "term": "Shebang (#!/bin/bash)",
        "definition": "The very first line in a script, telling the kernel which interpreter to use to execute the file."
      },
      {
        "term": "Bash Script",
        "definition": "A plain text file containing a series of shell commands executed sequentially."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. What Are Environment Variables?",
        "content": "Environment variables are system-wide key-value pairs stored in memory:\n\n\u2022 `echo $USER` -> Prints current user (`cadet`).\n\u2022 `echo $HOME` -> Prints home directory (`/home/cadet`).\n\u2022 `echo $PWD` -> Prints current working directory.\n\nTo create your own variable in a session:\n`TARGET=\"10.10.10.15\"`\n`echo $TARGET`\n\nIf you want child processes (like Python scripts or subshells) to access it, use **`export`**:\n`export TARGET=\"10.10.10.15\"`"
      },
      {
        "title": "2. The Critical Role of $PATH",
        "content": "When you type `ls`, how does Linux know where the `ls` program is stored?\n\nIt searches every directory listed in the **`$PATH`** variable from left to right!\n\n`cadet@endlessus:~$ echo $PATH`\n`/usr/local/bin:/usr/bin:/bin:/usr/games`\n\n1. It looks for `/usr/local/bin/ls` (not found).\n2. It looks for `/usr/bin/ls` (FOUND! Runs it).\n\n**Security Alert**: If an administrator puts `.` (the current directory) at the front of `$PATH`, an attacker can place a malicious script named `ls` in a folder. When the admin types `ls`, the attacker's script runs instead!"
      },
      {
        "title": "3. Writing Your First Bash Script",
        "content": "A Bash script allows you to automate a series of commands:\n\n```bash\n#!/bin/bash\n# recon.sh - Simple reconnaissance script\nTARGET=\"10.10.10.15\"\necho \"[*] Starting scan on $TARGET...\"\nping -c 1 $TARGET\necho \"[+] Scan completed!\"\n```\n\nTo make it executable:\n`chmod +x recon.sh`\n`./recon.sh`"
      }
    ],
    "seeExamples": [
      {
        "title": "Inspecting $PATH and User Variables",
        "codeOrDiagram": "cadet@endlessus:~$ echo $USER\ncadet\n\ncadet@endlessus:~$ echo $PATH\n/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        "explanation": "`echo $VARIABLE` prints the value of any loaded environment variable."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo $PATH` in the terminal to inspect your executable lookup search path:",
      "initialCommand": "",
      "expectedCommand": "echo $PATH",
      "simulatedOutput": "/usr/local/bin:/usr/bin:/bin\n[+] Path inspected: Executables in these directories run globally without typing full paths.",
      "explanation": "`$PATH` contains the colon-delimited list of directories searched for executable binaries."
    },
    "questions": [
      {
        "id": "q-14-1",
        "type": "exact",
        "question": "Which environment variable stores the colon-separated list of directories searched by the shell when executing command names?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "PATH",
          "$PATH"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four letters: P-A-T-H.",
        "explanation": "$PATH holds the binary search directories."
      },
      {
        "id": "q-14-2",
        "type": "multiple-choice",
        "question": "What is the two-character sequence '#!' at the beginning of a script called that specifies the interpreter to use?",
        "options": [
          "Comment tag",
          "Shebang (or hashbang)",
          "Magic header",
          "Variable prefix"
        ],
        "correctIndex": 1,
        "hint": "Hash (#) + Bang (!).",
        "explanation": "#! is the shebang line indicating the script interpreter (e.g. #!/bin/bash)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect $PATH variable",
        "instruction": "Print the current `$PATH` variable using `echo $PATH`.",
        "hints": [
          "Type: `echo $PATH`"
        ]
      }
    ],
    "securityConnection": "In Linux Privilege Escalation, 'PATH Hijacking' is a common attack. If a privileged root script calls a command like `curl` without using an absolute path (`/usr/bin/curl`), an attacker who can modify `$PATH` can trick root into executing a malicious `curl` binary placed in a user-writable folder!",
    "id": "room-14",
    "nextRoomId": "room-15"
  },
  {
    "stage": 3,
    "level": 3,
    "levelTitle": "Level 3 \u2014 Windows Fundamentals",
    "title": "Windows Architecture & The NTFS Filesystem",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Level 2: Linux Fundamentals",
    "whyAreYouHere": "While web servers and security tools often run on Linux, over 80% of enterprise corporate workstations and Active Directory networks run on Microsoft Windows. Penetration testers and incident responders must understand Windows internal architecture, drive volumes, system directories, and the Windows Registry.",
    "objectives": [
      "Understand Windows architecture: User Mode vs Kernel Mode (ntoskrnl.exe)",
      "Learn the NTFS filesystem features: Access Control Lists (ACLs) and Alternate Data Streams (ADS)",
      "Explore essential Windows directories: `C:\\Windows`, `System32`, `Program Files`, and `AppData`",
      "Understand the Windows Registry: Hives (HKLM, HKCU, HKCR), keys, and values",
      "Navigate Windows filesystem basics from the command line"
    ],
    "vocabulary": [
      {
        "term": "NTFS (New Technology File System)",
        "definition": "The proprietary journaling filesystem used by modern Windows operating systems, supporting fine-grained permissions, encryption, and Alternate Data Streams."
      },
      {
        "term": "Alternate Data Streams (ADS)",
        "definition": "An NTFS feature allowing files to contain multiple streams of data under a single filename (often abused by malware to hide payloads)."
      },
      {
        "term": "Windows Registry",
        "definition": "A central hierarchical database that stores low-level settings for the operating system, hardware devices, and installed applications."
      },
      {
        "term": "System32",
        "definition": "The critical core Windows directory (`C:\\Windows\\System32`) containing core DLLs, executables, and system drivers."
      },
      {
        "term": "HKLM (HKEY_LOCAL_MACHINE)",
        "definition": "The Registry hive containing hardware and system-wide software configuration settings affecting all users on the machine."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"30\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"70\" fill=\"#38bdf8\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">CPU</text>\n  <text x=\"100\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Arithmetic &amp; Logic</text>\n  <text x=\"100\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Executes instructions</text>\n\n  <path d=\"M 170 90 L 230 90\" stroke=\"#38bdf8\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"200\" y=\"80\" fill=\"#38bdf8\" font-size=\"10\" text-anchor=\"middle\">BUS</text>\n\n  <rect x=\"230\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"70\" fill=\"#10b981\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">RAM</text>\n  <text x=\"300\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Volatile Memory</text>\n  <text x=\"300\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Fast working set</text>\n\n  <path d=\"M 370 90 L 430 90\" stroke=\"#10b981\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"400\" y=\"80\" fill=\"#10b981\" font-size=\"10\" text-anchor=\"middle\">NVMe</text>\n\n  <rect x=\"430\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"500\" y=\"70\" fill=\"#f59e0b\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">SSD / Storage</text>\n  <text x=\"500\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Non-Volatile</text>\n  <text x=\"500\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Permanent files</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Windows Architecture: User Mode vs Kernel Mode",
        "content": "Windows separates software into two execution rings:\n\n\u2022 **User Mode**: Applications, Explorer shell, and background services run here. If a user application crashes, it cannot take down the operating system.\n\u2022 **Kernel Mode (`ntoskrnl.exe`)**: The core OS kernel, Hardware Abstraction Layer (HAL), and kernel device drivers (`.sys` files) run here. Flaws here trigger the infamous Blue Screen of Death (BSOD).\n\nWindows subsystems (like Win32, POSIX, and WSL) translate application API calls into kernel system calls."
      },
      {
        "title": "2. Essential System Directories",
        "content": "\u2022 `C:\\Windows\\System32`: The heart of Windows. Contains vital binaries (`cmd.exe`, `powershell.exe`, `svchost.exe`, `net.exe`) and core Dynamic Link Libraries (DLLs).\n\u2022 `C:\\Program Files` & `C:\\Program Files (x86)`: Default installation directories for 64-bit and 32-bit third-party applications.\n\u2022 `C:\\Users\\[Username]\\AppData`: Hidden directory where applications store user-specific configuration, browser history, cache, and session tokens. Malware frequently installs itself here because writing to AppData does not require Administrator privileges!"
      },
      {
        "title": "3. The Windows Registry",
        "content": "In Linux, configuration settings are stored in plain text files in `/etc`. In Windows, almost all system settings are stored in a centralized binary database called the **Windows Registry**.\n\nThe Registry is organized into 5 primary **Hives**:\n\n1. **HKLM (HKEY_LOCAL_MACHINE)**: Settings for the entire computer (boot settings, installed software, security policies).\n2. **HKCU (HKEY_CURRENT_USER)**: Settings specific to the currently logged-in user (desktop background, personal app preferences).\n3. **HKCR (HKEY_CLASSES_ROOT)**: File association mappings (which program opens `.pdf` or `.docx`).\n4. **HKU (HKEY_USERS)**: Profiles of all user accounts on the machine.\n5. **HKCC (HKEY_CURRENT_CONFIG)**: Hardware profile data gathered at system boot."
      }
    ],
    "seeExamples": [
      {
        "title": "Querying the Registry via Command Line",
        "codeOrDiagram": "C:\\> reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\" /v ProductName\n\nHKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\n    ProductName    REG_SZ    Windows 11 Pro",
        "explanation": "The `reg query` command extracts configuration values directly from the Windows Registry without opening the graphical `regedit.exe` tool."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo %SYSTEMROOT%` to simulate querying the Windows system root environment variable:",
      "initialCommand": "",
      "expectedCommand": "echo %SYSTEMROOT%",
      "simulatedOutput": "C:\\Windows\n[+] Variable resolved: The Windows system root directory is C:\\Windows.",
      "explanation": "In Windows CMD, environment variables are enclosed in percent signs (e.g., `%SYSTEMROOT%`)."
    },
    "questions": [
      {
        "id": "q-15-1",
        "type": "exact",
        "question": "What is the standard filesystem used by modern Windows operating systems that supports Access Control Lists and Alternate Data Streams?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "NTFS"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "New Technology File System abbreviation.",
        "explanation": "NTFS stands for New Technology File System."
      },
      {
        "id": "q-15-2",
        "type": "multiple-choice",
        "question": "Which Windows Registry hive holds configuration settings that apply machine-wide to all users and hardware devices?",
        "options": [
          "HKCU (HKEY_CURRENT_USER)",
          "HKLM (HKEY_LOCAL_MACHINE)",
          "HKCR (HKEY_CLASSES_ROOT)",
          "HKCC (HKEY_CURRENT_CONFIG)"
        ],
        "correctIndex": 1,
        "hint": "HKEY_LOCAL_MACHINE.",
        "explanation": "HKLM stores settings applicable to the local machine across all user accounts."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Query Windows root directory variable",
        "instruction": "Run `echo %SYSTEMROOT%` in the terminal.",
        "hints": [
          "Type: `echo %SYSTEMROOT%`"
        ]
      }
    ],
    "securityConnection": "Attackers establish persistence on Windows machines by adding registry run keys (e.g. `HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`). When Windows boots up, any executable path registered in that key runs automatically as a background process!",
    "id": "room-15",
    "nextRoomId": "room-16"
  },
  {
    "stage": 3,
    "level": 3,
    "levelTitle": "Level 3 \u2014 Windows Fundamentals",
    "title": "Windows Users, Groups & Access Controls",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 15: Windows Architecture & The NTFS Filesystem",
    "whyAreYouHere": "User account management is the foundation of enterprise Windows security. In corporate environments, Windows computers are joined to an Active Directory domain where identity, passwords, and permissions are managed centrally. In this room, you will learn the difference between Local Accounts and Domain Accounts, User Account Control (UAC), and NTFS Access Control Lists.",
    "objectives": [
      "Differentiate between Local User Accounts and Active Directory Domain Accounts",
      "Understand the special built-in accounts: Administrator, Guest, and NT AUTHORITY\\SYSTEM",
      "Learn how User Account Control (UAC) prompts protect against unauthorized administrative changes",
      "Understand NTFS Discretionary Access Control Lists (DACLs) and ACEs",
      "Audit user accounts and group memberships using `net user` and `net localgroup`"
    ],
    "vocabulary": [
      {
        "term": "Local Account",
        "definition": "A user account stored on the local machine's SAM (Security Account Manager) database, valid only on that specific computer."
      },
      {
        "term": "Domain Account",
        "definition": "A centralized enterprise account stored in Active Directory on a Domain Controller, valid across thousands of corporate workstations."
      },
      {
        "term": "NT AUTHORITY\\SYSTEM",
        "definition": "The supreme operating system account on Windows, possessing higher privileges than a local Administrator."
      },
      {
        "term": "UAC (User Account Control)",
        "definition": "A security feature that prompts users for confirmation or credentials before allowing an app to run with administrative tokens."
      },
      {
        "term": "DACL (Discretionary Access Control List)",
        "definition": "A list of Access Control Entries (ACEs) attached to every Windows object defining which users have Read, Write, or Full Control permissions."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"30\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"70\" fill=\"#38bdf8\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">CPU</text>\n  <text x=\"100\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Arithmetic &amp; Logic</text>\n  <text x=\"100\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Executes instructions</text>\n\n  <path d=\"M 170 90 L 230 90\" stroke=\"#38bdf8\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"200\" y=\"80\" fill=\"#38bdf8\" font-size=\"10\" text-anchor=\"middle\">BUS</text>\n\n  <rect x=\"230\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"70\" fill=\"#10b981\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">RAM</text>\n  <text x=\"300\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Volatile Memory</text>\n  <text x=\"300\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Fast working set</text>\n\n  <path d=\"M 370 90 L 430 90\" stroke=\"#10b981\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"400\" y=\"80\" fill=\"#10b981\" font-size=\"10\" text-anchor=\"middle\">NVMe</text>\n\n  <rect x=\"430\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"500\" y=\"70\" fill=\"#f59e0b\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">SSD / Storage</text>\n  <text x=\"500\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Non-Volatile</text>\n  <text x=\"500\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Permanent files</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Local Accounts vs Domain Accounts",
        "content": "\u2022 **Local Accounts**: Managed on the individual computer. Credentials live in `C:\\Windows\\System32\\config\\SAM`. A local account named `alice` on Workstation-1 cannot log into Workstation-2.\n\u2022 **Domain Accounts (Active Directory)**: In enterprise networks, computers join a **Domain**. A Domain Controller (DC) running Kerberos authenticates users. You can log into any workstation in the building with your single corporate username and password (`CORP\\alice`)."
      },
      {
        "title": "2. Administrator vs NT AUTHORITY\\SYSTEM",
        "content": "Windows has two levels of supreme power:\n\n\u2022 **Administrator**: The administrative user account. Can install software, manage users, and modify system settings.\n\u2022 **NT AUTHORITY\\SYSTEM**: The operating system identity itself. Even local Administrators cannot access certain registry keys or kernel memory without elevating to SYSTEM privileges!\n\nIn penetration testing, achieving `NT AUTHORITY\\SYSTEM` on a Windows host is the equivalent of getting `root` on Linux."
      },
      {
        "title": "3. User Account Control (UAC)",
        "content": "In older Windows versions (Windows XP), logging in as an administrator meant every program ran with full administrative rights. If you opened a malicious email attachment, it instantly infected the whole system!\n\nWindows Vista introduced **User Account Control (UAC)**. Even when an Administrator logs in, Windows gives their everyday processes an **unprivileged token**. Only when a program needs administrative changes does Windows display a UAC prompt asking for permission."
      }
    ],
    "seeExamples": [
      {
        "title": "Enumerating Users with the 'net' command",
        "codeOrDiagram": "C:\\> net user\nUser accounts for \\\\WORKSTATION-01\n-------------------------------------------------------------------\nAdministrator            DefaultAccount           Guest\nHelpAssistant            cadet                    WDAGUtilityAccount\n\nC:\\> net localgroup Administrators\nMembers\n-------------------------------------------------------------------\nAdministrator",
        "explanation": "`net user` lists all local user accounts; `net localgroup Administrators` reveals who possesses administrative rights."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `whoami /groups` to simulate inspecting active group memberships and security identifiers (SIDs):",
      "initialCommand": "",
      "expectedCommand": "whoami /groups",
      "simulatedOutput": "GROUP INFORMATION\n-----------------\nGroup Name                                  Type             SID\nMandatory Label\\Medium Mandatory Level      Label            S-1-16-8192\n[+] Integrity Level verified: Running at Medium Mandatory Level (Standard User).",
      "explanation": "`whoami /groups` reveals the security token groups and integrity level assigned to the active shell."
    },
    "questions": [
      {
        "id": "q-16-1",
        "type": "exact",
        "question": "What is the supreme Windows operating system account name that has higher privileges than a local Administrator (format: SYSTEM)?",
        "visualSlots": "_ _ _ _ _ _",
        "acceptedAnswers": [
          "SYSTEM",
          "NT AUTHORITY\\SYSTEM"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Six letters: S-Y-S-T-E-M.",
        "explanation": "NT AUTHORITY\\SYSTEM is the highest privilege account in Windows."
      },
      {
        "id": "q-16-2",
        "type": "multiple-choice",
        "question": "Which Windows security mechanism prompts users with a dialog box when an application requests elevated administrative tokens?",
        "options": [
          "BitLocker",
          "User Account Control (UAC)",
          "Windows Defender",
          "AppLocker"
        ],
        "correctIndex": 1,
        "hint": "UAC abbreviation.",
        "explanation": "User Account Control (UAC) gates administrative privilege elevation behind user confirmation."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect group token information",
        "instruction": "Run `whoami /groups` in the terminal.",
        "hints": [
          "Type: `whoami /groups`"
        ]
      }
    ],
    "securityConnection": "Attackers who gain an initial foothold as a standard user search for 'UAC Bypass' vulnerabilities or unquoted service path misconfigurations to elevate their privileges to `NT AUTHORITY\\SYSTEM`.",
    "id": "room-16",
    "nextRoomId": "room-17"
  },
  {
    "stage": 3,
    "level": 3,
    "levelTitle": "Level 3 \u2014 Windows Fundamentals",
    "title": "Windows Processes, Services & Task Manager",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 16: Windows Users, Groups & Access Controls",
    "whyAreYouHere": "Malware does not announce itself with a flashing banner; it hides among legitimate Windows operating system processes like `svchost.exe`, `explorer.exe`, or `lsass.exe`. Security analysts and incident responders must know what normal Windows processes look like so they can immediately spot abnormal processes or rogue background services.",
    "objectives": [
      "Navigate the Windows Task Manager (Processes, Performance, Startup apps, Services tabs)",
      "Identify core legitimate Windows system processes (smss, csrss, wininit, lsass, svchost)",
      "Understand Windows Services and manage them using `services.msc` and `sc.exe`",
      "Learn about Dynamic Link Libraries (DLLs) and DLL Search Order Hijacking",
      "Inspect running processes from the command line using `tasklist` and terminate with `taskkill`"
    ],
    "vocabulary": [
      {
        "term": "svchost.exe (Service Host)",
        "definition": "A shared system host process for Windows services that run from Dynamic Link Libraries (.dll files). Multiple instances run simultaneously."
      },
      {
        "term": "lsass.exe (Local Security Authority)",
        "definition": "The critical security subsystem process responsible for verifying user logins, handling password changes, and storing active Kerberos/NTLM authentication tickets in memory."
      },
      {
        "term": "Task Manager",
        "definition": "The built-in Windows GUI utility used to monitor system performance, view running processes, and inspect resource consumption."
      },
      {
        "term": "tasklist",
        "definition": "The Windows command-line utility that displays all currently running applications and processes."
      },
      {
        "term": "DLL (Dynamic Link Library)",
        "definition": "A shared library of compiled code and functions that multiple programs can load into memory simultaneously to save RAM."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"30\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"70\" fill=\"#38bdf8\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">CPU</text>\n  <text x=\"100\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Arithmetic &amp; Logic</text>\n  <text x=\"100\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Executes instructions</text>\n\n  <path d=\"M 170 90 L 230 90\" stroke=\"#38bdf8\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"200\" y=\"80\" fill=\"#38bdf8\" font-size=\"10\" text-anchor=\"middle\">BUS</text>\n\n  <rect x=\"230\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"70\" fill=\"#10b981\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">RAM</text>\n  <text x=\"300\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Volatile Memory</text>\n  <text x=\"300\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Fast working set</text>\n\n  <path d=\"M 370 90 L 430 90\" stroke=\"#10b981\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"400\" y=\"80\" fill=\"#10b981\" font-size=\"10\" text-anchor=\"middle\">NVMe</text>\n\n  <rect x=\"430\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"500\" y=\"70\" fill=\"#f59e0b\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">SSD / Storage</text>\n  <text x=\"500\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Non-Volatile</text>\n  <text x=\"500\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Permanent files</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Core Legitimate Windows Processes",
        "content": "Every Windows system runs several critical core processes:\n\n\u2022 **`smss.exe` (Session Manager)**: The very first userspace process started by the kernel.\n\u2022 **`csrss.exe` (Client/Server Runtime Subsystem)**: Manages console windows and creates/deletes threads.\n\u2022 **`wininit.exe`**: Starts background services and the Local Security Authority.\n\u2022 **`lsass.exe` (Local Security Authority Subsystem Service)**: Extremely high-value security process! It validates credentials, enforces security policies, and caches login tokens in RAM. (Attackers love dumping LSASS memory using tools like Mimikatz to extract plain-text passwords!).\n\u2022 **`svchost.exe` (Generic Host for Services)**: You will see 20 to 80 instances of `svchost.exe` running. Each instance hosts different background Windows services (Windows Update, Audio, Networking)."
      },
      {
        "title": "2. Windows Services: services.msc and sc.exe",
        "content": "Windows services run in the background without needing a user to log in:\n\n\u2022 Startup types include: **Automatic** (starts with OS), **Manual** (starts when requested), and **Disabled**.\n\u2022 In the GUI, view services using `services.msc`.\n\u2022 In the command line, query and configure services using `sc.exe`:\n  `sc query Spooler` (checks the Print Spooler service status).\n  `sc stop Spooler` (stops the service)."
      },
      {
        "title": "3. Command-Line Process Management: tasklist and taskkill",
        "content": "\u2022 **`tasklist`**: Lists all active processes with their Image Name, PID, Session, and Memory usage:\n  `tasklist /FI \"IMAGENAME eq svchost.exe\"` (filters for all svchost processes).\n\n\u2022 **`taskkill`**: Terminates a process:\n  `taskkill /PID 4210 /F` (the `/F` flag forces termination)."
      }
    ],
    "seeExamples": [
      {
        "title": "Listing processes with tasklist",
        "codeOrDiagram": "C:\\> tasklist /FI \"USERNAME eq cadet\"\n\nImage Name                     PID Session Name        Session#    Mem Usage\n========================= ======== ================ =========== ============\ncmd.exe                       3040 Console                    1      4,820 K\nconhost.exe                   3048 Console                    1      8,112 K\ntasklist.exe                  4588 Console                    1      7,940 K",
        "explanation": "Filtered `tasklist` showing only processes running under the 'cadet' user session."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `tasklist` in the terminal to inspect the active Windows process list:",
      "initialCommand": "",
      "expectedCommand": "tasklist",
      "simulatedOutput": "Image Name                     PID Session Name        Session#    Mem Usage\n========================= ======== ================ =========== ============\nSystem Idle Process              0 Services                   0          8 K\nSystem                           4 Services                   0        140 K\nsvchost.exe                    840 Services                   0     22,140 K\ncmd.exe                       3040 Console                    1      4,820 K\n[+] Process enumeration complete: 4 active processes identified.",
      "explanation": "`tasklist` displays the Windows image names and PIDs."
    },
    "questions": [
      {
        "id": "q-17-1",
        "type": "exact",
        "question": "Which Windows security process is responsible for enforcing security policies, verifying logins, and storing credential tickets in memory?",
        "visualSlots": "_ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "lsass.exe",
          "lsass"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Local Security Authority Subsystem Service (lsass.exe).",
        "explanation": "lsass.exe handles user authentication and session security tokens."
      },
      {
        "id": "q-17-2",
        "type": "multiple-choice",
        "question": "Which generic host process name is used in Windows to run services compiled as Dynamic Link Libraries (.dll files)?",
        "options": [
          "explorer.exe",
          "svchost.exe",
          "notepad.exe",
          "winlogon.exe"
        ],
        "correctIndex": 1,
        "hint": "Service Host executable.",
        "explanation": "svchost.exe hosts shared Windows services loaded from DLLs."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect active tasks",
        "instruction": "Execute `tasklist` in the terminal.",
        "hints": [
          "Type: `tasklist`"
        ]
      }
    ],
    "securityConnection": "Attackers dump the memory of `lsass.exe` using tools like Mimikatz or Task Manager to extract cached password hashes (NTLM) and Kerberos tickets, which they then use in 'Pass-the-Hash' attacks to move laterally across enterprise networks.",
    "id": "room-17",
    "nextRoomId": "room-18"
  },
  {
    "stage": 3,
    "level": 3,
    "levelTitle": "Level 3 \u2014 Windows Fundamentals",
    "title": "Command Prompt (CMD) vs PowerShell",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "30 min",
    "prerequisites": "Room 17: Windows Processes, Services & Task Manager",
    "whyAreYouHere": "Windows provides two primary command-line environments: the legacy Command Prompt (`cmd.exe`) and the modern, object-oriented PowerShell (`powershell.exe`). In this room, you will learn the core syntax differences between them, why PowerShell is an indispensable automation and administration tool, and how penetration testers use PowerShell cmdlets for post-exploitation.",
    "objectives": [
      "Understand the difference between legacy text-based CMD and object-oriented PowerShell",
      "Learn PowerShell Cmdlet syntax: Verb-Noun pairs (e.g., `Get-Process`, `Set-ExecutionPolicy`)",
      "Understand PowerShell pipeline objects vs Linux plain-text streams",
      "Compare common commands between CMD and PowerShell (`dir` vs `Get-ChildItem`)",
      "Learn about PowerShell Execution Policies and script execution"
    ],
    "vocabulary": [
      {
        "term": "Command Prompt (CMD)",
        "definition": "The legacy Windows command-line interpreter, rooted in MS-DOS, outputting raw text streams."
      },
      {
        "term": "PowerShell",
        "definition": "A modern task automation and configuration framework consisting of a command-line shell and scripting language built on .NET."
      },
      {
        "term": "Cmdlet",
        "definition": "A lightweight PowerShell command adhering to a standard Verb-Noun naming pattern (e.g. Get-Service, Stop-Process)."
      },
      {
        "term": ".NET Object Pipeline",
        "definition": "Unlike Linux pipes that pass unstructured raw text, PowerShell pipes pass rich .NET objects with properties and methods."
      },
      {
        "term": "Execution Policy",
        "definition": "A safety feature in PowerShell that controls the conditions under which configuration files and scripts are permitted to run."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Text Streams (CMD) vs Objects (PowerShell)",
        "content": "\u2022 **CMD / Linux Bash**: When a command outputs data, it outputs **plain text characters**. If you want to extract just the IP address or process memory from a command, you have to write complex text-filtering regexes using `grep`, `awk`, or `sed`.\n\u2022 **PowerShell**: Pipes pass **rich .NET objects**! When you run `Get-Process`, PowerShell does not output text\u2014it outputs an array of Process Objects. Each object has structured properties like `.ProcessName`, `.Id`, `.CPU`, and `.Handles`.\n\nYou can filter directly by property without text parsing:\n`Get-Process | Where-Object { $_.CPU -gt 100 }`"
      },
      {
        "title": "2. Cmdlet Syntax: Verb-Noun",
        "content": "PowerShell commands are called **Cmdlets** (pronounced 'command-lets') and use a consistent **Verb-Noun** naming standard:\n\n\u2022 `Get-Service`: Retrieve services.\n\u2022 `Start-Service -Name \"wuauserv\"`: Start the Windows Update service.\n\u2022 `Get-NetIPAddress`: Query network interface IP addresses.\n\u2022 `Get-Content C:\\notes.txt`: Read file contents (equivalent to `cat`).\n\u2022 `Set-Content C:\\out.txt -Value \"Done\"`: Write to file."
      },
      {
        "title": "3. CMD vs PowerShell Comparison Table",
        "content": "| Action | Legacy CMD (`cmd.exe`) | Modern PowerShell | Linux Equivalent |\n|---|---|---|---|\n| List files | `dir` | `Get-ChildItem` (alias `ls` / `dir`) | `ls -la` |\n| Current path | `cd` | `Get-Location` (alias `pwd`) | `pwd` |\n| View file | `type file.txt` | `Get-Content file.txt` (alias `cat`) | `cat file.txt` |\n| Current user | `whoami` | `whoami` / `[System.Security.Principal.WindowsIdentity]::GetCurrent().Name` | `whoami` |\n| IP Config | `ipconfig /all` | `Get-NetIPConfiguration` | `ip a` |"
      }
    ],
    "seeExamples": [
      {
        "title": "PowerShell Object Filtering",
        "codeOrDiagram": "PS C:\\> Get-Service | Where-Object { $_.Status -eq \"Running\" } | Select-Object -First 3\n\nStatus   Name               DisplayName\n------   ----               -----------\nRunning  Appinfo            Application Information\nRunning  AudioEndpointBuild Windows Audio Endpoint Builder\nRunning  Audiosrv           Windows Audio",
        "explanation": "Piping structured objects into `Where-Object` allows instant property filtering without regex text parsing."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `Get-Service` to simulate querying the Windows service status via PowerShell:",
      "initialCommand": "",
      "expectedCommand": "Get-Service",
      "simulatedOutput": "Status   Name               DisplayName\n------   ----               -----------\nRunning  EventLog           Windows Event Log\nRunning  MpsSvc             Windows Defender Firewall\nStopped  Spooler            Print Spooler\n[+] PowerShell cmdlet executed: Active services enumerated.",
      "explanation": "`Get-Service` returns .NET service controller objects."
    },
    "questions": [
      {
        "id": "q-18-1",
        "type": "exact",
        "question": "What standard Verb-Noun naming convention does PowerShell use for its built-in commands (e.g. Get-Process)?",
        "visualSlots": "_ _ _ _ - _ _ _ _",
        "acceptedAnswers": [
          "Verb-Noun",
          "verb noun"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Action word followed by object word: Verb-Noun.",
        "explanation": "PowerShell commands strictly follow the Verb-Noun naming convention."
      },
      {
        "id": "q-18-2",
        "type": "multiple-choice",
        "question": "What is the primary technical difference between Linux/CMD pipes and PowerShell pipes?",
        "options": [
          "Linux pipes are faster because they use 64-bit encryption",
          "PowerShell pipes pass structured .NET objects with properties rather than raw text streams",
          "PowerShell pipes can only be used by the Administrator account",
          "CMD pipes cannot write output to files"
        ],
        "correctIndex": 1,
        "hint": "PowerShell passes structured objects.",
        "explanation": "PowerShell pipes pass fully formed .NET objects rather than unparsed character streams."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Query services with PowerShell",
        "instruction": "Execute `Get-Service` in the terminal.",
        "hints": [
          "Type: `Get-Service`"
        ]
      }
    ],
    "securityConnection": "Attackers heavily leverage 'Living off the Land' (LotL) techniques\u2014using built-in administrative tools like PowerShell instead of uploading malicious binaries. Because PowerShell is digitally signed by Microsoft, its execution often flies under the radar of traditional signature-based antivirus!",
    "id": "room-18",
    "nextRoomId": "room-19"
  },
  {
    "stage": 3,
    "level": 3,
    "levelTitle": "Level 3 \u2014 Windows Fundamentals",
    "title": "Windows Security Controls & Event Logs",
    "difficulty": "Beginner",
    "difficultyBadge": "\ud83d\udfe2 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 18: Command Prompt (CMD) vs PowerShell",
    "whyAreYouHere": "Windows includes a comprehensive suite of defensive technologies: Windows Defender Antivirus, the Windows Filtering Platform (Firewall), BitLocker drive encryption, and Windows Event Logs. In this room, you will learn how these defensive layers protect workstations and discover the critical Event IDs that security operations center (SOC) analysts monitor to detect intrusions.",
    "objectives": [
      "Understand Windows Defender Antivirus, Real-Time Protection, and Cloud-Delivered Protection",
      "Learn Windows Defender Firewall rules (Inbound vs Outbound filtering)",
      "Understand BitLocker full-disk encryption and the Trusted Platform Module (TPM)",
      "Explore the Windows Event Viewer (`eventvwr.msc`) and key security event logs",
      "Identify high-priority Windows Security Event IDs (4624 Logon, 4625 Failed Logon, 4688 Process Creation)"
    ],
    "vocabulary": [
      {
        "term": "Microsoft Defender Antivirus",
        "definition": "The built-in next-generation antimalware component of Windows that provides real-time protection, behavioral monitoring, and heuristic scanning."
      },
      {
        "term": "Windows Event Viewer",
        "definition": "The administrative tool (`eventvwr.msc`) used to browse and view system, security, and application event logs stored in .evtx format."
      },
      {
        "term": "Event ID 4624",
        "definition": "The Windows Security Event Log identifier generated whenever an account successfully logs onto the computer."
      },
      {
        "term": "Event ID 4625",
        "definition": "The Windows Security Event Log identifier generated when an account fails to log on (vital for detecting brute-force attacks)."
      },
      {
        "term": "BitLocker",
        "definition": "The native Windows full-disk encryption feature that encrypts entire hard drive volumes to prevent data theft if a laptop is physically stolen."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"30\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"70\" fill=\"#38bdf8\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">CPU</text>\n  <text x=\"100\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Arithmetic &amp; Logic</text>\n  <text x=\"100\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Executes instructions</text>\n\n  <path d=\"M 170 90 L 230 90\" stroke=\"#38bdf8\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"200\" y=\"80\" fill=\"#38bdf8\" font-size=\"10\" text-anchor=\"middle\">BUS</text>\n\n  <rect x=\"230\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"70\" fill=\"#10b981\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">RAM</text>\n  <text x=\"300\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Volatile Memory</text>\n  <text x=\"300\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Fast working set</text>\n\n  <path d=\"M 370 90 L 430 90\" stroke=\"#10b981\" stroke-width=\"3\" stroke-dasharray=\"4\"/>\n  <text x=\"400\" y=\"80\" fill=\"#10b981\" font-size=\"10\" text-anchor=\"middle\">NVMe</text>\n\n  <rect x=\"430\" y=\"30\" width=\"140\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"500\" y=\"70\" fill=\"#f59e0b\" font-size=\"16\" font-weight=\"bold\" text-anchor=\"middle\">SSD / Storage</text>\n  <text x=\"500\" y=\"95\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Non-Volatile</text>\n  <text x=\"500\" y=\"115\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Permanent files</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Windows Defender & Endpoint Security",
        "content": "Windows Defender has evolved into a formidable security suite:\n\n\u2022 **Real-Time Protection**: Intercepts every file downloaded, extracted, or executed, scanning it against known virus signatures and cloud intelligence.\n\u2022 **AMSI (Antimalware Scan Interface)**: An interface that allows applications (like PowerShell or Office macros) to pass scripts to Defender *after* they are de-obfuscated in memory before execution!\n\u2022 **Attack Surface Reduction (ASR)**: Blocks common malware techniques, such as Office documents launching executable child processes."
      },
      {
        "title": "2. Windows Event Logs: The Security Flight Recorder",
        "content": "Whenever an event occurs on Windows\u2014a user logs in, a password fails, a new service is installed\u2014an entry is written to an event log in `C:\\Windows\\System32\\winevt\\Logs\\` in binary XML format (`.evtx`).\n\nThe 3 primary logs are:\n1. **Application Log**: Events logged by applications or programs (database errors, crashes).\n2. **System Log**: Events logged by Windows operating system components (driver failures, reboots).\n3. **Security Log**: Auditing events (logins, privilege rights usage, file access)."
      },
      {
        "title": "3. The Must-Know Windows Security Event IDs",
        "content": "Every SOC analyst and incident responder memorizes these Event IDs:\n\n| Event ID | Description | Security Significance |\n|---|---|---|\n| **4624** | Successful Logon | Tracks who logged in, when, and logon type (Type 2 = Interactive console, Type 3 = Network share, Type 10 = Remote Desktop RDP). |\n| **4625** | Failed Logon | A sudden surge of 4625 events indicates an active password brute-force or password-spraying attack! |\n| **4688** | A new process has been created | Tracks the full command-line of newly spawned programs. |\n| **4672** | Special privileges assigned to new logon | Indicates a user logged in with Administrator rights. |\n| **4720** | A user account was created | Detects unauthorized backdoor account creation by an attacker. |"
      }
    ],
    "seeExamples": [
      {
        "title": "Querying Event Logs via PowerShell",
        "codeOrDiagram": "PS C:\\> Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 2\n\n   ProviderName: Microsoft-Windows-Security-Auditing\nTimeCreated                     Id LevelDisplayName Message\n-----------                     -- ---------------- -------\n10/15/2026 11:22:10 AM        4625 Information      An account failed to log on.\n                                                    Account: admin\n                                                    Failure Reason: Unknown user name or bad password.",
        "explanation": "`Get-WinEvent` queries the binary Security log for failed logon events (Event ID 4625)."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `wevtutil qe Security /c:1 /rd:true /f:text` to simulate reading the latest security audit event:",
      "initialCommand": "",
      "expectedCommand": "wevtutil qe Security /c:1 /rd:true /f:text",
      "simulatedOutput": "Event[0]:\n  Log Name: Security\n  Source: Microsoft-Windows-Security-Auditing\n  Event ID: 4624\n  Task: Logon\n  Level: Information\n  Description: An account was successfully logged on. TargetUserName: cadet\n[+] Log inspection complete: Successful logon (Event ID 4624) recorded.",
      "explanation": "`wevtutil` is the Windows command-line utility for querying and managing event logs."
    },
    "questions": [
      {
        "id": "q-19-1",
        "type": "exact",
        "question": "Which Windows Security Event ID is logged when an authentication attempt fails due to an invalid password or username?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "4625"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four digits: 4625.",
        "explanation": "Event ID 4625 records failed logon attempts in the Windows Security Log."
      },
      {
        "id": "q-19-2",
        "type": "multiple-choice",
        "question": "Which Windows security component provides an interface allowing antivirus solutions to scan scripts and macros inside memory after they are unpacked?",
        "options": [
          "BitLocker",
          "AMSI (Antimalware Scan Interface)",
          "Syskey",
          "NTFS Journal"
        ],
        "correctIndex": 1,
        "hint": "Antimalware Scan Interface abbreviation.",
        "explanation": "AMSI allows applications like PowerShell to pass dynamic in-memory code directly to antivirus scanners."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Read latest security audit event",
        "instruction": "Execute `wevtutil qe Security /c:1 /rd:true /f:text` in the terminal.",
        "hints": [
          "Type: `wevtutil qe Security /c:1 /rd:true /f:text`"
        ]
      }
    ],
    "securityConnection": "Attackers frequently attempt to clear Windows event logs using `wevtutil cl Security` to hide evidence of their intrusions. SOC detection rules trigger high-severity alerts whenever the event log service is stopped or when Event ID 1102 ('The audit log was cleared') is detected!",
    "id": "room-19",
    "nextRoomId": "room-20"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "What is a Network? Topologies & Physical Devices",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Level 3: Windows Fundamentals",
    "whyAreYouHere": "Computer networking is the foundational backbone of cybersecurity. A standalone computer cannot be hacked remotely; attacks require a network connection. In this room, you will learn how networks connect devices, distinguish between LANs and WANs, understand network topologies (Star, Mesh), and identify core devices like Switches, Routers, and Firewalls.",
    "objectives": [
      "Define what a computer network is and why protocols are required",
      "Differentiate Local Area Networks (LAN), Wide Area Networks (WAN), and Wireless LANs (WLAN)",
      "Understand physical network topologies: Star, Mesh, Bus, and Ring",
      "Identify primary networking hardware: Hubs (legacy), Switches, Routers, Access Points, and Firewalls",
      "Understand the difference between Layer 2 switching (MAC) and Layer 3 routing (IP)"
    ],
    "vocabulary": [
      {
        "term": "LAN (Local Area Network)",
        "definition": "A network covering a small geographic area like a home, office, or school building."
      },
      {
        "term": "WAN (Wide Area Network)",
        "definition": "A network connecting multiple LANs across large geographical regions, cities, or continents (the Internet is the largest WAN)."
      },
      {
        "term": "Switch",
        "definition": "A Layer 2 networking device that forwards traffic intelligently between devices on the same local network using MAC addresses."
      },
      {
        "term": "Router",
        "definition": "A Layer 3 device that routes data packets between different independent networks using IP addresses."
      },
      {
        "term": "Firewall",
        "definition": "A security barrier that monitors and controls incoming and outgoing network traffic based on predetermined security rules."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 200\" width=\"100%\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <line x1=\"120\" y1=\"30\" x2=\"120\" y2=\"180\" stroke=\"#38bdf8\" stroke-width=\"3\"/>\n  <text x=\"120\" y=\"22\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Client (You)</text>\n  \n  <line x1=\"480\" y1=\"30\" x2=\"480\" y2=\"180\" stroke=\"#10b981\" stroke-width=\"3\"/>\n  <text x=\"480\" y=\"22\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Target Server</text>\n\n  <!-- Step 1 SYN -->\n  <line x1=\"120\" y1=\"60\" x2=\"480\" y2=\"80\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <polygon points=\"480,80 470,75 470,85\" fill=\"#f59e0b\"/>\n  <text x=\"300\" y=\"65\" fill=\"#f59e0b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. SYN (Synchronize seq=100)</text>\n\n  <!-- Step 2 SYN-ACK -->\n  <line x1=\"480\" y1=\"105\" x2=\"120\" y2=\"125\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"120,125 130,120 130,130\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"110\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. SYN-ACK (ack=101 seq=300)</text>\n\n  <!-- Step 3 ACK -->\n  <line x1=\"120\" y1=\"150\" x2=\"480\" y2=\"170\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"480,170 470,165 470,175\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"155\" fill=\"#10b981\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. ACK (Connection Established)</text>\n</svg>",
    "lessons": [
      {
        "title": "1. What is a Network?",
        "content": "A **computer network** is two or more computing devices connected by physical cables (copper Ethernet, glass fiber-optics) or wireless radio waves (Wi-Fi, cellular) to share data and resources.\n\n\u2022 **LAN (Local Area Network)**: Your home Wi-Fi network or corporate office floor.\n\u2022 **WAN (Wide Area Network)**: Connects distant LANs together over miles or oceans. The global Internet is a giant network of interconnected WANs.\n\u2022 **WLAN (Wireless LAN)**: A LAN that uses Wi-Fi radio frequencies (2.4 GHz, 5 GHz, 6 GHz) instead of physical cables."
      },
      {
        "title": "2. Network Topologies: How Devices Are Arranged",
        "content": "\u2022 **Star Topology**: The dominant modern standard. Every workstation connects directly to a central Switch. If one cable is severed, only that one computer loses connection; everyone else remains online.\n\u2022 **Mesh Topology**: Devices have multiple redundant links to each other. Used in the Internet backbone and high-security datacenters. If router A fails, traffic automatically reroutes through router B.\n\u2022 **Bus / Ring (Legacy)**: Older topologies where a single cable break took down the entire office network."
      },
      {
        "title": "3. The Hardware: Hub vs Switch vs Router vs Firewall",
        "content": "\u2022 **Hub (Obsolete/Insecure)**: Repeats incoming electrical signals to ALL ports simultaneously! Anyone plugged into a hub can sniff everyone else's passwords!\n\u2022 **Switch (Layer 2)**: Intelligent! Learns physical MAC addresses and sends frames ONLY to the specific port of the intended recipient.\n\u2022 **Router (Layer 3)**: The gateway between networks. Connects your home LAN (`192.168.1.0/24`) to the public Internet.\n\u2022 **Firewall**: The security gatekeeper. Inspects packets and drops unauthorized connections (e.g. blocking incoming port 445 SMB connections from the public web)."
      }
    ],
    "seeExamples": [
      {
        "title": "Viewing Local Network Interfaces in Linux",
        "codeOrDiagram": "cadet@endlessus:~$ ip link show\n1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP\n    link/ether 02:42:0a:0a:14:0f brd ff:ff:ff:ff:ff:ff",
        "explanation": "`ip link show` displays active physical and virtual network interfaces and their hardware MAC addresses."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `ip link` to list the physical and loopback network interfaces on the system:",
      "initialCommand": "",
      "expectedCommand": "ip link",
      "simulatedOutput": "1: lo: <LOOPBACK,UP> mtu 65536 state UP\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500 state UP link/ether 02:42:0a:0a:14:0f\n[+] Network interfaces listed: eth0 (Ethernet adapter) is UP.",
      "explanation": "`ip link` shows the Layer 2 status and MAC addresses of network devices."
    },
    "questions": [
      {
        "id": "q-20-1",
        "type": "exact",
        "question": "Which Layer 2 networking device forwards data frames between computers on the same local network using MAC addresses?",
        "visualSlots": "_ _ _ _ _ _",
        "acceptedAnswers": [
          "switch"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Six letters: s-w-i-t-c-h.",
        "explanation": "A network switch operates at Layer 2 to deliver frames to specific MAC addresses."
      },
      {
        "id": "q-20-2",
        "type": "multiple-choice",
        "question": "What is the primary difference between a network Hub and a network Switch?",
        "options": [
          "A switch transmits wireless signals while a hub uses cables",
          "A hub broadcasts all traffic to every connected port, whereas a switch directs traffic only to the destination MAC address port",
          "A hub encrypts traffic with AES-256 while a switch does not",
          "A switch is only used on Wide Area Networks"
        ],
        "correctIndex": 1,
        "hint": "Hubs repeat to all ports; switches send only to the intended recipient.",
        "explanation": "Hubs blindly broadcast all incoming frames to every port, creating security and collision risks; switches maintain a MAC address table to route frames selectively."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect network interfaces",
        "instruction": "Execute `ip link` in the terminal.",
        "hints": [
          "Type: `ip link`"
        ]
      }
    ],
    "securityConnection": "In 'ARP Spoofing' or 'Man-in-the-Middle' (MitM) attacks, an attacker on a switched local network sends fake ARP responses to trick computers into routing their traffic through the attacker's machine before reaching the router, effectively converting a switch into an insecure hub.",
    "id": "room-20",
    "nextRoomId": "room-21"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "IP Addresses, IPv4 & Physical MAC Addresses",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 20: What is a Network? Topologies & Physical Devices",
    "whyAreYouHere": "To send a physical letter, you need both a street address (logical location) and a name (physical recipient). In networking, these correspond to your **IP Address** (logical Layer 3 address) and your **MAC Address** (physical Layer 2 hardware address). In this room, you will learn how IPv4 addresses are structured in binary and how the Address Resolution Protocol (ARP) glues them together.",
    "objectives": [
      "Understand the structure of an IPv4 address (32 bits, 4 octets, dotted-decimal notation)",
      "Convert binary octets into decimal (e.g. `11000000` = `192`)",
      "Learn the structure of a MAC address (48 bits, 6 hexadecimal pairs, OUI vendor prefix)",
      "Understand why both MAC addresses and IP addresses are necessary",
      "Learn how the Address Resolution Protocol (ARP) maps IP addresses to MAC addresses"
    ],
    "vocabulary": [
      {
        "term": "IPv4 Address",
        "definition": "A 32-bit logical numerical label assigned to each device participating in an IP computer network (e.g. 192.168.1.1)."
      },
      {
        "term": "Octet",
        "definition": "An 8-bit section of an IPv4 address, with values ranging from 0 to 255 in decimal notation."
      },
      {
        "term": "MAC Address (Media Access Control)",
        "definition": "A 48-bit unique physical hardware identifier permanently burned into a Network Interface Card (NIC)."
      },
      {
        "term": "OUI (Organizationally Unique Identifier)",
        "definition": "The first 3 bytes (24 bits) of a MAC address that identify the hardware manufacturer (e.g., Apple, Intel, Cisco)."
      },
      {
        "term": "ARP (Address Resolution Protocol)",
        "definition": "The protocol used to discover the physical MAC address corresponding to a known target IPv4 address on a local network."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" width=\"100%\" height=\"170\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"20\" y=\"55\" width=\"120\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"80\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Your Browser</text>\n  <text x=\"80\" y=\"100\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">endlessus.in?</text>\n\n  <path d=\"M 140 85 L 220 85\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"220,85 210,80 210,90\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"220\" y=\"30\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"60\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">DNS Resolver (53)</text>\n  <text x=\"300\" y=\"80\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">1. Root Server (.)</text>\n  <text x=\"300\" y=\"100\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">2. TLD Server (.in)</text>\n  <text x=\"300\" y=\"120\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">3. Authoritative DNS</text>\n\n  <path d=\"M 380 85 L 450 85\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"450,85 440,80 440,90\" fill=\"#10b981\"/>\n\n  <rect x=\"450\" y=\"55\" width=\"130\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"515\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Web Server</text>\n  <text x=\"515\" y=\"100\" fill=\"#f59e0b\" font-size=\"10\" text-anchor=\"middle\">104.21.75.12</text>\n</svg>",
    "lessons": [
      {
        "title": "1. IPv4 Address Anatomy: 32 Bits in 4 Octets",
        "content": "An IPv4 address is simply a **32-bit binary number** written as four 8-bit numbers (**octets**) separated by dots:\n\n`192.168.1.10`\n\nLet's convert to binary:\n\u2022 `192` = `11000000` ($128 + 64$)\n\u2022 `168` = `10101000` ($128 + 32 + 8$)\n\u2022 `1` = `00000001`\n\u2022 `10` = `00001010` ($8 + 2$)\n\nBecause each octet has 8 bits, the minimum value is `0` (`00000000`) and the maximum is `255` (`11111111`). You can NEVER have an IP like `192.168.1.300`!"
      },
      {
        "title": "2. MAC Addresses: Physical Hardware Identity",
        "content": "While your IP address changes whenever you move from home Wi-Fi to a coffee shop, your **MAC Address** is burned directly into your network chip:\n\n`B8:27:EB:A5:42:19`\n\n\u2022 **Length**: 48 bits, displayed as 6 pairs of hexadecimal numbers (0-9, A-F).\n\u2022 **First 3 pairs (`B8:27:EB`)**: The **OUI** identifying the hardware manufacturer (here, Raspberry Pi Foundation).\n\u2022 **Last 3 pairs (`A5:42:19`)**: The unique serial number for that individual network card."
      },
      {
        "title": "3. The Bridge: Address Resolution Protocol (ARP)",
        "content": "When your computer wants to send data to `192.168.1.1` on the local network, the network switch doesn't understand IP addresses! The switch only understands MAC addresses.\n\nYour computer shouts an **ARP Request** broadcast to everyone on the LAN:\n*\"Who has IP 192.168.1.1? Tell 192.168.1.10!\"*\n\nThe router hears it and replies with an **ARP Reply**:\n*\"192.168.1.1 is at MAC B8:27:EB:A5:42:19!\"*\n\nYour computer stores this mapping in its **ARP Cache**."
      }
    ],
    "seeExamples": [
      {
        "title": "Viewing the ARP Cache in Linux",
        "codeOrDiagram": "cadet@endlessus:~$ arp -a\ngateway (192.168.1.1) at b8:27:eb:a5:42:19 [ether] on eth0\nprinter (192.168.1.50) at 00:1e:8f:12:44:90 [ether] on eth0",
        "explanation": "The `arp -a` command shows all known IP-to-MAC address bindings learned on the local network."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `arp -n` to inspect the local ARP table mapping IP addresses to physical MAC addresses:",
      "initialCommand": "",
      "expectedCommand": "arp -n",
      "simulatedOutput": "Address          HWtype  HWaddress           Flags Mask            Iface\n10.10.20.1       ether   00:50:56:ea:24:01   C                     eth0\n10.10.20.15      ether   00:50:56:ea:88:12   C                     eth0\n[+] ARP cache inspected: Resolved local IP 10.10.20.1 to MAC 00:50:56:ea:24:01.",
      "explanation": "`arp -n` lists the active Layer 2 to Layer 3 address resolution table."
    },
    "questions": [
      {
        "id": "q-21-1",
        "type": "exact",
        "question": "How many total bits make up an IPv4 address?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "32",
          "32 bits"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "4 octets times 8 bits per octet.",
        "explanation": "An IPv4 address consists of 32 bits divided into 4 eight-bit octets."
      },
      {
        "id": "q-21-2",
        "type": "exact",
        "question": "Which protocol resolves a known local IP address into its corresponding physical MAC hardware address?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "ARP",
          "Address Resolution Protocol"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Address Resolution Protocol abbreviation.",
        "explanation": "ARP maps Layer 3 IP addresses to Layer 2 MAC addresses."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect ARP table",
        "instruction": "Execute `arp -n` in the terminal.",
        "hints": [
          "Type: `arp -n`"
        ]
      }
    ],
    "securityConnection": "Because ARP has no authentication, attackers on a local network can send unsolicited fake ARP replies ('Gratuitous ARP') claiming *they* own the default gateway's IP address. All network computers then send their outbound traffic directly to the attacker!",
    "id": "room-21",
    "nextRoomId": "room-22"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "Private vs Public IP Addresses & NAT",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 21: IP Addresses, IPv4 & Physical MAC Addresses",
    "whyAreYouHere": "IPv4 has a fundamental problem: 32 bits only provides $2^{32} \\approx 4.29$ billion addresses. With billions of humans and tens of billions of smartphones, laptops, and IoT devices, the world ran out of unique IPv4 addresses years ago! In this room, you will learn about the RFC 1918 private IP address ranges and discover how Network Address Translation (NAT) saved the internet.",
    "objectives": [
      "Understand the IPv4 address exhaustion crisis",
      "Learn the three designated RFC 1918 Private IP address ranges (Class A, B, and C)",
      "Differentiate between Public (Globally Routable) and Private (Local-Only) IP addresses",
      "Understand how Network Address Translation (NAT) multiplexes multiple private devices over one public IP",
      "Learn about the loopback address (`127.0.0.1` / `localhost`)"
    ],
    "vocabulary": [
      {
        "term": "Public IP Address",
        "definition": "A globally unique IP address registered with IANA and routable across the entire worldwide Internet."
      },
      {
        "term": "Private IP Address (RFC 1918)",
        "definition": "IP ranges reserved strictly for private internal networks. Routers on the public internet drop them immediately."
      },
      {
        "term": "NAT (Network Address Translation)",
        "definition": "A technique used by routers to translate multiple private internal IP addresses into a single public IP address using port numbers."
      },
      {
        "term": "Loopback Address (127.0.0.1)",
        "definition": "A special IP address that routes network traffic back into the local machine itself ('localhost')."
      },
      {
        "term": "Default Gateway",
        "definition": "The IP address of the local router interface that devices send traffic to when the destination is outside their local subnet."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" width=\"100%\" height=\"170\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"20\" y=\"55\" width=\"120\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"80\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Your Browser</text>\n  <text x=\"80\" y=\"100\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">endlessus.in?</text>\n\n  <path d=\"M 140 85 L 220 85\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"220,85 210,80 210,90\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"220\" y=\"30\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"60\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">DNS Resolver (53)</text>\n  <text x=\"300\" y=\"80\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">1. Root Server (.)</text>\n  <text x=\"300\" y=\"100\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">2. TLD Server (.in)</text>\n  <text x=\"300\" y=\"120\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">3. Authoritative DNS</text>\n\n  <path d=\"M 380 85 L 450 85\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"450,85 440,80 440,90\" fill=\"#10b981\"/>\n\n  <rect x=\"450\" y=\"55\" width=\"130\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"515\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Web Server</text>\n  <text x=\"515\" y=\"100\" fill=\"#f59e0b\" font-size=\"10\" text-anchor=\"middle\">104.21.75.12</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Three Private IP Ranges (RFC 1918)",
        "content": "To prevent address exhaustion, the Internet Engineering Task Force (IETF) created **RFC 1918**, reserving three blocks of IP addresses for internal private networks:\n\n1. **Class A Range**: `10.0.0.0` to `10.255.255.255` (Prefix: `10.0.0.0/8`). Used in large enterprise datacenters (16.7 million addresses).\n2. **Class B Range**: `172.16.0.0` to `172.31.255.255` (Prefix: `172.16.0.0/12`). Used in universities and medium businesses (1 million addresses).\n3. **Class C Range**: `192.168.0.0` to `192.168.255.255` (Prefix: `192.168.0.0/16`). Used in almost all home Wi-Fi routers (65,536 addresses).\n\nMillions of homes all use `192.168.1.1` at the same time without conflict because private IPs never cross the public internet!"
      },
      {
        "title": "2. How NAT (Network Address Translation) Works",
        "content": "When your phone (`192.168.1.45`) wants to load a page from a server on the web (`104.21.75.12`), it sends the packet to your home router:\n\n1. The router rewrites the source IP from `192.168.1.45` to its single **Public IP** (e.g. `203.0.113.88`).\n2. The router assigns a unique source port number (e.g. `54210`) and notes this in its **NAT Translation Table**.\n3. When the web server replies to `203.0.113.88:54210`, the router checks its table, translates the destination back to `192.168.1.45`, and forwards the packet into your home Wi-Fi!\n\nThis is why 20 devices in a home share one single public IP address."
      },
      {
        "title": "3. The Loopback Address: 127.0.0.1 (Localhost)",
        "content": "The entire `127.0.0.0/8` range is reserved for **loopback testing**.\n\nWhen you send traffic to `127.0.0.1` (or the domain name `localhost`), packets never touch a physical network card or cable\u2014the kernel loops the packets directly into internal memory. Web developers use localhost to test web servers privately before publishing them to the world."
      }
    ],
    "seeExamples": [
      {
        "title": "Checking Default Gateway and IP in Linux",
        "codeOrDiagram": "cadet@endlessus:~$ ip route show\ndefault via 192.168.1.1 dev eth0 proto dhcp metric 100\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.10\n\ncadet@endlessus:~$ ping -c 1 127.0.0.1\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.045 ms",
        "explanation": "`ip route` shows the default gateway router (`192.168.1.1`). Pinging `127.0.0.1` tests the local TCP/IP stack."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `ip route` in the terminal to inspect the active routing table and default gateway:",
      "initialCommand": "",
      "expectedCommand": "ip route",
      "simulatedOutput": "default via 10.10.20.1 dev eth0\n10.10.20.0/24 dev eth0 proto kernel scope link src 10.10.20.15\n[+] Routing table inspected: Default gateway is 10.10.20.1.",
      "explanation": "`ip route` shows outbound routing paths and the gateway router IP."
    },
    "questions": [
      {
        "id": "q-22-1",
        "type": "exact",
        "question": "What standard IPv4 address is universally designated as the local loopback address (localhost)?",
        "visualSlots": "_ _ _ . _ . _ . _",
        "acceptedAnswers": [
          "127.0.0.1"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Starts with 127, ends with 1.",
        "explanation": "127.0.0.1 is the standard loopback address."
      },
      {
        "id": "q-22-2",
        "type": "multiple-choice",
        "question": "Which of the following IP addresses is a private, non-routable address under RFC 1918?",
        "options": [
          "8.8.8.8",
          "192.168.1.50",
          "1.1.1.1",
          "151.101.1.140"
        ],
        "correctIndex": 1,
        "hint": "192.168.x.x is private.",
        "explanation": "192.168.1.50 falls within the RFC 1918 Class C private range (192.168.0.0/16)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect default gateway",
        "instruction": "Execute `ip route` in the terminal.",
        "hints": [
          "Type: `ip route`"
        ]
      }
    ],
    "securityConnection": "In SSRF (Server-Side Request Forgery) attacks against web applications, an attacker tricks a public web server into making requests to its own internal private IP (`http://192.168.1.10/admin` or `http://127.0.0.1:8080/metrics`), bypassing external firewall boundaries!",
    "id": "room-22",
    "nextRoomId": "room-23"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "Subnetting & CIDR Notation Demystified",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 22: Private vs Public IP Addresses & NAT",
    "whyAreYouHere": "Subnetting is famously feared by beginners, but when broken down into binary logic, it is simple and elegant. A subnet mask tells your computer: 'Which part of this IP address is the Network ID (neighborhood), and which part is the Host ID (house number)?' In this room, you will master subnet masks, CIDR prefix notation (`/24`), network addresses, and broadcast addresses.",
    "objectives": [
      "Understand why networks are divided into smaller subnets (performance, security, organization)",
      "Learn how Subnet Masks work using binary AND logic",
      "Master CIDR (Classless Inter-Domain Routing) prefix notation (`/24`, `/16`, `/8`)",
      "Calculate the Network Address, Broadcast Address, and Usable Host Range for a given subnet",
      "Use the formula $2^{(32 - \\text{CIDR})} - 2$ to find total usable host capacities"
    ],
    "vocabulary": [
      {
        "term": "Subnet Mask",
        "definition": "A 32-bit number with contiguous 1s followed by 0s that separates an IP address into Network and Host portions (e.g. 255.255.255.0)."
      },
      {
        "term": "CIDR (Classless Inter-Domain Routing)",
        "definition": "A shorthand notation representing the number of leading 1-bits in a subnet mask (e.g., /24 means 24 ones: 255.255.255.0)."
      },
      {
        "term": "Network Address",
        "definition": "The very first address in a subnet where all host bits are 0 (e.g., 192.168.1.0). Identifies the network itself and cannot be assigned to a host."
      },
      {
        "term": "Broadcast Address",
        "definition": "The very last address in a subnet where all host bits are 1 (e.g., 192.168.1.255). Used to send a packet to all hosts on the subnet."
      },
      {
        "term": "Usable Host Range",
        "definition": "All IP addresses between the Network Address and Broadcast Address that can be assigned to devices."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" width=\"100%\" height=\"170\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"20\" y=\"55\" width=\"120\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"80\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Your Browser</text>\n  <text x=\"80\" y=\"100\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">endlessus.in?</text>\n\n  <path d=\"M 140 85 L 220 85\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"220,85 210,80 210,90\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"220\" y=\"30\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"60\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">DNS Resolver (53)</text>\n  <text x=\"300\" y=\"80\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">1. Root Server (.)</text>\n  <text x=\"300\" y=\"100\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">2. TLD Server (.in)</text>\n  <text x=\"300\" y=\"120\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">3. Authoritative DNS</text>\n\n  <path d=\"M 380 85 L 450 85\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"450,85 440,80 440,90\" fill=\"#10b981\"/>\n\n  <rect x=\"450\" y=\"55\" width=\"130\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"515\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Web Server</text>\n  <text x=\"515\" y=\"100\" fill=\"#f59e0b\" font-size=\"10\" text-anchor=\"middle\">104.21.75.12</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Why Subnet? Network ID vs Host ID",
        "content": "Imagine a phone number: `+1 (555) 123-4567`.\n\u2022 `+1 (555)` is the area code (Network ID)\u2014everyone in that city shares it.\n\u2022 `123-4567` is your unique personal line (Host ID).\n\nIn IP networking, every IP address contains both a **Network portion** and a **Host portion**:\n\u2022 A **Subnet Mask** uses binary 1s to highlight the network bits and binary 0s for host bits:\n\n```\nIP:     192 . 168 .   1 . 100 -> 11000000.10101000.00000001.01100100\nMask:   255 . 255 . 255 .   0 -> 11111111.11111111.11111111.00000000\nNetwork:192 . 168 .   1 .   0 (First 24 bits are Network, last 8 bits are Host)\n```"
      },
      {
        "title": "2. CIDR Prefix Notation (/24)",
        "content": "Writing `255.255.255.0` is tedious. Network engineers use **CIDR notation** (slash notation) indicating how many 1s are in the mask:\n\n\u2022 `/24`: 24 ones (`255.255.255.0`). $32 - 24 = 8$ host bits -> $2^8 = 256$ IPs ($254$ usable hosts).\n\u2022 `/16`: 16 ones (`255.255.0.0`). $32 - 16 = 16$ host bits -> $2^{16} = 65,536$ IPs ($65,534$ usable hosts).\n\u2022 `/8`: 8 ones (`255.0.0.0`). $32 - 8 = 24$ host bits -> $2^{24} = 16.7$ million IPs."
      },
      {
        "title": "3. The Two Reserved Addresses (-2 Rule)",
        "content": "In ANY subnet, two addresses can **NEVER be assigned to a computer**:\n\n1. **The First Address (Network ID)**: All host bits are 0 (e.g. `192.168.1.0`). Identifies the subnet.\n2. **The Last Address (Broadcast)**: All host bits are 1 (e.g. `192.168.1.255`). Packets sent here reach every device on the subnet.\n\n**Usable Hosts Formula**: $2^H - 2$ (where $H$ is the number of host bits).\nFor a `/24`: $2^8 - 2 = 256 - 2 = \\mathbf{254}$ usable addresses (`192.168.1.1` to `192.168.1.254`)."
      }
    ],
    "seeExamples": [
      {
        "title": "Calculating a /24 Subnet",
        "codeOrDiagram": "CIDR:             192.168.10.0/24\nSubnet Mask:      255.255.255.0\nNetwork Address:  192.168.10.0\nBroadcast:        192.168.10.255\nFirst Usable:     192.168.10.1\nLast Usable:      192.168.10.254\nTotal Usable:     254 hosts",
        "explanation": "Standard Class C /24 subnet breakdown showing network, broadcast, and host range."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `ip -4 addr show eth0` to view the IP and CIDR prefix of the eth0 network card:",
      "initialCommand": "",
      "expectedCommand": "ip -4 addr show eth0",
      "simulatedOutput": "2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 10.10.20.15/24 brd 10.10.20.255 scope global eth0\n[+] Subnet verified: IP is 10.10.20.15, subnet is /24 (255.255.255.0), broadcast is 10.10.20.255.",
      "explanation": "`ip -4 addr` shows the IPv4 address with its CIDR slash notation."
    },
    "questions": [
      {
        "id": "q-23-1",
        "type": "exact",
        "question": "What is the dotted-decimal subnet mask representation for a /24 CIDR prefix?",
        "visualSlots": "_ _ _ . _ _ _ . _ _ _ . _",
        "acceptedAnswers": [
          "255.255.255.0"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three 255s followed by a 0.",
        "explanation": "/24 equals 24 binary ones: 255.255.255.0."
      },
      {
        "id": "q-23-2",
        "type": "exact",
        "question": "How many usable host IP addresses are available in a standard /24 subnet after subtracting the network and broadcast addresses?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "254"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "256 minus 2.",
        "explanation": "256 total IP addresses minus 2 reserved (network and broadcast) = 254 usable hosts."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect CIDR subnet on eth0",
        "instruction": "Execute `ip -4 addr show eth0` in the terminal.",
        "hints": [
          "Type: `ip -4 addr show eth0`"
        ]
      }
    ],
    "securityConnection": "In network penetration testing, defining your target scope involves CIDR notation (e.g. `nmap -sn 10.10.20.0/24`). Scanning a `/24` scans 256 IPs; scanning a `/16` scans 65,536 IPs! Scoping errors can result in accidentally scanning unauthorized client networks.",
    "id": "room-23",
    "nextRoomId": "room-24"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "TCP vs UDP & The 3-Way Handshake",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 23: Subnetting & CIDR Basics",
    "whyAreYouHere": "At Transport Layer 4, all internet communications rely on one of two fundamental protocols: TCP (Transmission Control Protocol) or UDP (User Datagram Protocol). Understanding how TCP establishes trust through its 3-Way Handshake (SYN, SYN-ACK, ACK) is essential for mastering port scanning, network firewalls, and Denial of Service attacks.",
    "objectives": [
      "Differentiate between connection-oriented TCP and connectionless UDP",
      "Learn why web pages and file transfers use TCP, while gaming and DNS use UDP",
      "Master the TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK",
      "Understand TCP Control Flags: SYN, ACK, FIN, RST, PSH, URG",
      "Understand TCP teardown with FIN and abrupt resets with RST"
    ],
    "vocabulary": [
      {
        "term": "TCP (Transmission Control Protocol)",
        "definition": "A connection-oriented, reliable protocol that guarantees packet delivery in the correct sequence with error checking and retransmission."
      },
      {
        "term": "UDP (User Datagram Protocol)",
        "definition": "A lightweight, connectionless, 'best-effort' protocol with low latency, but no guarantee of delivery or ordering."
      },
      {
        "term": "SYN (Synchronize)",
        "definition": "The TCP flag sent by a client to initiate a connection and synchronize sequence numbers."
      },
      {
        "term": "ACK (Acknowledge)",
        "definition": "The TCP flag indicating receipt of transmitted packets or acknowledging a handshake step."
      },
      {
        "term": "RST (Reset)",
        "definition": "The TCP flag that abruptly closes a connection, often sent by firewalls or closed ports rejecting a connection."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 200\" width=\"100%\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <line x1=\"120\" y1=\"30\" x2=\"120\" y2=\"180\" stroke=\"#38bdf8\" stroke-width=\"3\"/>\n  <text x=\"120\" y=\"22\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Client (You)</text>\n  \n  <line x1=\"480\" y1=\"30\" x2=\"480\" y2=\"180\" stroke=\"#10b981\" stroke-width=\"3\"/>\n  <text x=\"480\" y=\"22\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Target Server</text>\n\n  <!-- Step 1 SYN -->\n  <line x1=\"120\" y1=\"60\" x2=\"480\" y2=\"80\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <polygon points=\"480,80 470,75 470,85\" fill=\"#f59e0b\"/>\n  <text x=\"300\" y=\"65\" fill=\"#f59e0b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. SYN (Synchronize seq=100)</text>\n\n  <!-- Step 2 SYN-ACK -->\n  <line x1=\"480\" y1=\"105\" x2=\"120\" y2=\"125\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"120,125 130,120 130,130\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"110\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. SYN-ACK (ack=101 seq=300)</text>\n\n  <!-- Step 3 ACK -->\n  <line x1=\"120\" y1=\"150\" x2=\"480\" y2=\"170\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"480,170 470,165 470,175\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"155\" fill=\"#10b981\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. ACK (Connection Established)</text>\n</svg>",
    "lessons": [
      {
        "title": "1. TCP vs UDP: Reliable vs Fast",
        "content": "\u2022 **TCP (Reliable & Orderly)**: Before any data is transmitted, a formal connection must be established. Every packet is tracked by a sequence number. If a packet is lost in transit, the sender automatically retransmits it. Used for: Web (HTTP/HTTPS), SSH, Email (SMTP), and File Transfer (FTP).\n\u2022 **UDP (Fire and Forget)**: No handshake, no sequence numbers, no retransmissions. Packets are fired like a stream of water. If a packet is dropped, it is gone forever! Used for: Live video streaming, VoIP voice calls, multiplayer gaming, and fast DNS queries."
      },
      {
        "title": "2. The TCP 3-Way Handshake",
        "content": "Before your browser downloads a single byte from a web server, the two devices perform a 3-step conversation:\n\n1. **Step 1: SYN (Synchronize)**: Client sends: *\"Hello server, I want to connect to port 443. My initial sequence number is 1000.\"*\n2. **Step 2: SYN-ACK (Synchronize-Acknowledge)**: Server replies: *\"I hear you! I acknowledge your 1000 (ACK=1001). My sequence number is 5000 (SYN=5000).\"*\n3. **Step 3: ACK (Acknowledge)**: Client sends: *\"Got it! I acknowledge your 5000 (ACK=5001). Let's begin transferring data!\"*\n\nThe connection is now **ESTABLISHED**."
      },
      {
        "title": "3. The TCP Control Flags",
        "content": "Every TCP packet header contains 1-bit flags that communicate connection state:\n\n\u2022 **SYN**: Initiates connection.\n\u2022 **ACK**: Acknowledges received data.\n\u2022 **FIN**: Gracefully terminates connection ('I am finished sending data').\n\u2022 **RST**: Abruptly aborts connection ('Port closed / Connection reset').\n\u2022 **PSH**: Push data to the application immediately without waiting for buffer."
      }
    ],
    "seeExamples": [
      {
        "title": "Inspecting Active TCP Connections with netstat",
        "codeOrDiagram": "cadet@endlessus:~$ netstat -tuln\nActive Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN\nudp        0      0 0.0.0.0:68              0.0.0.0:*",
        "explanation": "`netstat -tuln` shows listening TCP and UDP sockets and their port numbers."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `netstat -tuln` to view listening TCP and UDP ports on the machine:",
      "initialCommand": "",
      "expectedCommand": "netstat -tuln",
      "simulatedOutput": "Proto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN\n[+] Sockets enumerated: SSH (port 22) and HTTP (port 80) in LISTEN state.",
      "explanation": "`netstat` lists open network ports and connection states."
    },
    "questions": [
      {
        "id": "q-24-1",
        "type": "exact",
        "question": "What is the name of the TCP flag sent in the very first step of the 3-way handshake to initiate a connection?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "SYN"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Short for Synchronize.",
        "explanation": "SYN (Synchronize) initiates the TCP 3-way handshake."
      },
      {
        "id": "q-24-2",
        "type": "multiple-choice",
        "question": "What sequence of packets establishes a full TCP connection between a client and a server?",
        "options": [
          "SYN -> ACK -> FIN",
          "SYN -> SYN-ACK -> ACK",
          "ACK -> SYN -> RST",
          "PING -> PONG -> CONNECT"
        ],
        "correctIndex": 1,
        "hint": "Synchronize, Synchronize-Acknowledge, Acknowledge.",
        "explanation": "The standard TCP handshake sequence is SYN, then SYN-ACK, followed by ACK."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect listening network ports",
        "instruction": "Execute `netstat -tuln` in the terminal.",
        "hints": [
          "Type: `netstat -tuln`"
        ]
      }
    ],
    "securityConnection": "In network scanning, **SYN Stealth Scanning** (`nmap -sS`) sends only the initial SYN packet. If the server replies SYN-ACK, Nmap knows the port is open and immediately sends a RST packet to tear down the connection *without* completing the handshake, evading older application-level loggers!",
    "id": "room-24",
    "nextRoomId": "room-25"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "Ports & Common Network Services",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 24: TCP vs UDP & The 3-Way Handshake",
    "whyAreYouHere": "An IP address identifies a computer, but a server runs dozens of programs at the same time: a web server, an email server, an SSH terminal server, and a database. How does the server know which incoming packet belongs to which application? Through **Port Numbers**. In this room, you will learn the port hierarchy and memorize the essential ports every cybersecurity practitioner must know.",
    "objectives": [
      "Understand what a port number is (0 to 65,535) and how it directs traffic to applications",
      "Learn the 3 port ranges: Well-Known (0-1023), Registered (1024-49151), and Dynamic/Ephemeral (49152-65535)",
      "Memorize the essential well-known service ports: SSH (22), HTTP (80), HTTPS (443), DNS (53), SMB (445), RDP (3389)",
      "Understand Socket pairs: combining IP Address + Port Number (e.g. `192.168.1.10:443`)",
      "Identify open ports using `ss` and `nmap`"
    ],
    "vocabulary": [
      {
        "term": "Port Number",
        "definition": "A 16-bit integer (0 to 65535) in transport layer headers that identifies a specific application endpoint or service on a host."
      },
      {
        "term": "Well-Known Ports (0-1023)",
        "definition": "Standard ports reserved for core system services and protocols (requires administrative privileges to bind on Unix)."
      },
      {
        "term": "Ephemeral Ports (49152-65535)",
        "definition": "Short-lived temporary ports assigned dynamically by the operating system for client outbound connections."
      },
      {
        "term": "Socket",
        "definition": "The combination of an IP address and a Port number (e.g. 10.10.20.15:22) identifying a unique communication endpoint."
      },
      {
        "term": "Banner Grabbing",
        "definition": "The reconnaissance technique of connecting to a network port and reading the welcoming text banner sent by the service to identify its software version."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 200\" width=\"100%\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <line x1=\"120\" y1=\"30\" x2=\"120\" y2=\"180\" stroke=\"#38bdf8\" stroke-width=\"3\"/>\n  <text x=\"120\" y=\"22\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Client (You)</text>\n  \n  <line x1=\"480\" y1=\"30\" x2=\"480\" y2=\"180\" stroke=\"#10b981\" stroke-width=\"3\"/>\n  <text x=\"480\" y=\"22\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Target Server</text>\n\n  <!-- Step 1 SYN -->\n  <line x1=\"120\" y1=\"60\" x2=\"480\" y2=\"80\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <polygon points=\"480,80 470,75 470,85\" fill=\"#f59e0b\"/>\n  <text x=\"300\" y=\"65\" fill=\"#f59e0b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. SYN (Synchronize seq=100)</text>\n\n  <!-- Step 2 SYN-ACK -->\n  <line x1=\"480\" y1=\"105\" x2=\"120\" y2=\"125\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"120,125 130,120 130,130\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"110\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. SYN-ACK (ack=101 seq=300)</text>\n\n  <!-- Step 3 ACK -->\n  <line x1=\"120\" y1=\"150\" x2=\"480\" y2=\"170\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"480,170 470,165 470,175\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"155\" fill=\"#10b981\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. ACK (Connection Established)</text>\n</svg>",
    "lessons": [
      {
        "title": "1. What is a Port?",
        "content": "Think of an IP address as the street address of an apartment complex, and the **Port Number** as the individual apartment unit number. Even though all mail goes to the same building, unit 22 gets SSH mail, unit 80 gets web mail, and unit 53 gets DNS mail!\n\nThere are **65,536 total ports** ($2^{16}$), divided into:\n\u2022 **Well-Known Ports (0 - 1023)**: Standardized services.\n\u2022 **Registered Ports (1024 - 49151)**: Vendor services (e.g. MySQL port 3306).\n\u2022 **Dynamic / Ephemeral Ports (49152 - 65535)**: Random outbound client ports."
      },
      {
        "title": "2. The Essential Security Ports Cheatsheet",
        "content": "Memorize these critical ports for all cybersecurity exams and real-world testing:\n\n| Port | Protocol | Service | Purpose |\n|---|---|---|---|\n| **21** | TCP | FTP | File Transfer Protocol (Plain-text credentials!) |\n| **22** | TCP | SSH | Secure Shell encrypted remote administration |\n| **23** | TCP | Telnet | Obsolete unencrypted remote shell |\n| **25** | TCP | SMTP | Simple Mail Transfer Protocol (email sending) |\n| **53** | TCP/UDP | DNS | Domain Name System address resolution |\n| **80** | TCP | HTTP | Hypertext Transfer Protocol (unencrypted web) |\n| **443** | TCP | HTTPS | HTTP Secure over TLS encryption |\n| **445** | TCP | SMB | Windows Server Message Block file/printer sharing |\n| **3389** | TCP | RDP | Microsoft Remote Desktop Protocol |"
      },
      {
        "title": "3. Sockets: IP + Port",
        "content": "A network connection is uniquely defined by a pair of sockets:\n\n`[Client IP : Ephemeral Port] <=====> [Server IP : Service Port]`\n\nExample:\n`192.168.1.45:51240 <=====> 104.21.75.12:443`\nYour browser picks dynamic client port `51240` to talk to HTTPS port `443` on the server."
      }
    ],
    "seeExamples": [
      {
        "title": "Banner Grabbing with netcat (nc)",
        "codeOrDiagram": "cadet@endlessus:~$ nc -vn 10.10.20.15 21\n(UNKNOWN) [10.10.20.15] 21 (ftp) open\n220 (vsFTPd 3.0.3)\n\n[+] Service Identified: vsFTPd version 3.0.3 running on port 21!",
        "explanation": "Connecting to port 21 via `nc` returns the FTP service version string directly in the banner."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `ss -tln` to inspect listening TCP sockets with the modern socket statistics utility:",
      "initialCommand": "",
      "expectedCommand": "ss -tln",
      "simulatedOutput": "State      Recv-Q Send-Q Local Address:Port               Peer Address:Port\nLISTEN     0      128          0.0.0.0:22                      0.0.0.0:*\nLISTEN     0      511          0.0.0.0:80                      0.0.0.0:*\n[+] Sockets displayed: Port 22 (SSH) and Port 80 (HTTP) are listening.",
      "explanation": "`ss` is the modern replacement for `netstat`."
    },
    "questions": [
      {
        "id": "q-25-1",
        "type": "exact",
        "question": "Which port number is universally used for encrypted HTTPS web traffic?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "443"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three digits: 443.",
        "explanation": "Port 443 is the standard port for HTTPS."
      },
      {
        "id": "q-25-2",
        "type": "exact",
        "question": "Which port is used by Secure Shell (SSH) for encrypted Linux remote administration?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "22"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Two digits: 22.",
        "explanation": "Port 22 is the standard port for SSH."
      },
      {
        "id": "q-25-3",
        "type": "multiple-choice",
        "question": "What is the total number of TCP and UDP port numbers available per IP address?",
        "options": [
          "1,024",
          "65,536",
          "4,096",
          "16,777,216"
        ],
        "correctIndex": 1,
        "hint": "2 to the 16th power.",
        "explanation": "Port numbers are 16-bit integers, giving 65,536 total ports (0 to 65535)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect listening sockets with ss",
        "instruction": "Execute `ss -tln` in the terminal.",
        "hints": [
          "Type: `ss -tln`"
        ]
      }
    ],
    "securityConnection": "Port scanning (using Nmap) is the foundation of network reconnaissance. Finding an open, unhardened port 445 (SMB) or an ancient port 23 (Telnet) provides penetration testers with immediate initial attack vectors.",
    "id": "room-25",
    "nextRoomId": "room-26"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "DNS & Domain Name Resolution",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 25: Ports & Common Network Services",
    "whyAreYouHere": "Humans remember names (`endlessus.in`), but computers communicate using numbers (`104.21.75.12`). The Domain Name System (DNS) is the global decentralized phonebook of the internet. In this room, you will learn how DNS resolution works step-by-step from root servers down to authoritative name servers, understand common DNS record types (A, AAAA, CNAME, MX), and perform lookups using `nslookup` and `dig`.",
    "objectives": [
      "Understand why DNS is required to bridge human domain names and machine IP addresses",
      "Trace the 4 steps of recursive DNS resolution: Resolver -> Root Server -> TLD Server -> Authoritative DNS",
      "Learn essential DNS record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (verification)",
      "Query DNS records from the terminal using `nslookup` and `dig`",
      "Understand DNS cache poisoning and spoofing vulnerabilities"
    ],
    "vocabulary": [
      {
        "term": "DNS (Domain Name System)",
        "definition": "A hierarchical decentralized naming system that translates human-friendly domain names into numerical IP addresses."
      },
      {
        "term": "A Record",
        "definition": "An Address record that maps a domain name directly to a 32-bit IPv4 address."
      },
      {
        "term": "CNAME (Canonical Name)",
        "definition": "An alias record that redirects one domain name to another domain name."
      },
      {
        "term": "MX (Mail Exchange)",
        "definition": "Specifies the mail servers responsible for accepting incoming emails on behalf of a domain."
      },
      {
        "term": "Authoritative Name Server",
        "definition": "The definitive server that holds the actual DNS records for a specific domain name zone."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" width=\"100%\" height=\"170\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <rect x=\"20\" y=\"55\" width=\"120\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"80\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Your Browser</text>\n  <text x=\"80\" y=\"100\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">endlessus.in?</text>\n\n  <path d=\"M 140 85 L 220 85\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"220,85 210,80 210,90\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"220\" y=\"30\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"60\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">DNS Resolver (53)</text>\n  <text x=\"300\" y=\"80\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">1. Root Server (.)</text>\n  <text x=\"300\" y=\"100\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">2. TLD Server (.in)</text>\n  <text x=\"300\" y=\"120\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">3. Authoritative DNS</text>\n\n  <path d=\"M 380 85 L 450 85\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"450,85 440,80 440,90\" fill=\"#10b981\"/>\n\n  <rect x=\"450\" y=\"55\" width=\"130\" height=\"60\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"515\" y=\"80\" fill=\"#f8fafc\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Web Server</text>\n  <text x=\"515\" y=\"100\" fill=\"#f59e0b\" font-size=\"10\" text-anchor=\"middle\">104.21.75.12</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The 4 Steps of DNS Resolution",
        "content": "When you type `endlessus.in` into your browser, what happens?\n\n1. **Recursive Resolver**: Your browser asks your local ISP or public resolver (`8.8.8.8` / `1.1.1.1`).\n2. **Root Server (`.`)**: If not cached, the resolver asks one of the 13 global Root Servers: *\"Where is `.in`?\"* The root server points to the `.in` TLD server.\n3. **TLD Server (`.in`)**: The Top-Level Domain server replies: *\"The authoritative name server for `endlessus.in` is Cloudflare!\"*\n4. **Authoritative Name Server**: Cloudflare answers with the final record: *\"`endlessus.in` is at IP `104.21.75.12`!\"*\n\nYour browser caches this answer and connects directly to `104.21.75.12` on port 443!"
      },
      {
        "title": "2. Essential DNS Record Types",
        "content": "\u2022 **A Record**: Points a hostname to an **IPv4** address (`endlessus.in` -> `104.21.75.12`).\n\u2022 **AAAA Record**: Points a hostname to a 128-bit **IPv6** address.\n\u2022 **CNAME Record**: An **alias**. `www.google.com` is a CNAME pointing to `google.com`.\n\u2022 **MX Record**: Defines mail servers for email delivery.\n\u2022 **TXT Record**: Plain text data. Widely used for security verification: SPF (Sender Policy Framework) and DKIM to prevent email phishing and spoofing!"
      },
      {
        "title": "3. Querying DNS with nslookup and dig",
        "content": "Security analysts inspect DNS using command-line utilities:\n\n\u2022 **`nslookup [domain]`**: Simple cross-platform lookup tool.\n\u2022 **`dig [domain] [type]`**: Detailed Unix diagnostic tool (Domain Information Groper):\n  `dig endlessus.in A`\n  `dig endlessus.in MX` (checks mail servers)."
      }
    ],
    "seeExamples": [
      {
        "title": "Querying DNS with nslookup",
        "codeOrDiagram": "cadet@endlessus:~$ nslookup endlessus.in\nServer:         1.1.1.1\nAddress:        1.1.1.1#53\n\nNon-authoritative answer:\nName:   endlessus.in\nAddress: 104.21.75.12",
        "explanation": "`nslookup` resolves `endlessus.in` to IP `104.21.75.12` via DNS port 53."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `nslookup endlessus.in` in the terminal to resolve the domain to its IPv4 address:",
      "initialCommand": "",
      "expectedCommand": "nslookup endlessus.in",
      "simulatedOutput": "Server:         1.1.1.1\nAddress:        1.1.1.1#53\n\nNon-authoritative answer:\nName:   endlessus.in\nAddress: 104.21.75.12\n[+] DNS Resolution verified: endlessus.in maps to 104.21.75.12 via port 53.",
      "explanation": "`nslookup` contacts the configured DNS resolver on port 53."
    },
    "questions": [
      {
        "id": "q-26-1",
        "type": "exact",
        "question": "Which protocol translates human-readable domain names into numerical IP addresses?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "DNS",
          "Domain Name System"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Domain Name System abbreviation.",
        "explanation": "DNS (Domain Name System) resolves domain names to IP addresses."
      },
      {
        "id": "q-26-2",
        "type": "exact",
        "question": "Which specific DNS record type maps a domain name directly to an IPv4 address?",
        "visualSlots": "_",
        "acceptedAnswers": [
          "A",
          "A record"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The single letter A.",
        "explanation": "An 'A' record maps hostnames to 32-bit IPv4 addresses."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Resolve domain with nslookup",
        "instruction": "Execute `nslookup endlessus.in` in the terminal.",
        "hints": [
          "Type: `nslookup endlessus.in`"
        ]
      }
    ],
    "securityConnection": "Attackers perform 'DNS Zone Transfers' (AXFR) against misconfigured authoritative name servers to dump an entire organization's internal network subdomains, server names, and private IP addresses in seconds!",
    "id": "room-26",
    "nextRoomId": "room-27"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "DHCP & Automatic Address Assignment (DORA)",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "20 min",
    "prerequisites": "Room 26: DNS & Domain Name Resolution",
    "whyAreYouHere": "Imagine if every time you connected your phone to a coffee shop Wi-Fi network, you had to manually type in an available IP address, subnet mask, default gateway router, and DNS servers. You'd never get online! DHCP (Dynamic Host Configuration Protocol) automates all of this in under half a second through the 4-step DORA process.",
    "objectives": [
      "Understand why dynamic IP address assignment is necessary compared to static addressing",
      "Master the 4-step DHCP DORA process: Discover, Offer, Request, Acknowledge",
      "Learn the 4 core configuration parameters provided by DHCP: IP, Subnet Mask, Default Gateway, and DNS Servers",
      "Understand DHCP Leases and lease renewal cycles",
      "Recognize DHCP Starvation and Rogue DHCP Server attacks"
    ],
    "vocabulary": [
      {
        "term": "DHCP (Dynamic Host Configuration Protocol)",
        "definition": "A network management protocol used to automatically assign IP addresses and network configuration parameters to client devices."
      },
      {
        "term": "DORA",
        "definition": "The 4-step handshake used by DHCP: Discover (broadcast), Offer (server reply), Request (client selection), and Acknowledge (server confirmation)."
      },
      {
        "term": "DHCP Lease",
        "definition": "The temporary duration for which a client is permitted to use an assigned IP address before needing to renew it."
      },
      {
        "term": "Rogue DHCP Server",
        "definition": "An unauthorized DHCP server deployed by an attacker on a LAN to hand out malicious DNS server IPs and default gateways to clients."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 200\" width=\"100%\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <line x1=\"120\" y1=\"30\" x2=\"120\" y2=\"180\" stroke=\"#38bdf8\" stroke-width=\"3\"/>\n  <text x=\"120\" y=\"22\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Client (You)</text>\n  \n  <line x1=\"480\" y1=\"30\" x2=\"480\" y2=\"180\" stroke=\"#10b981\" stroke-width=\"3\"/>\n  <text x=\"480\" y=\"22\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Target Server</text>\n\n  <!-- Step 1 SYN -->\n  <line x1=\"120\" y1=\"60\" x2=\"480\" y2=\"80\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <polygon points=\"480,80 470,75 470,85\" fill=\"#f59e0b\"/>\n  <text x=\"300\" y=\"65\" fill=\"#f59e0b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. SYN (Synchronize seq=100)</text>\n\n  <!-- Step 2 SYN-ACK -->\n  <line x1=\"480\" y1=\"105\" x2=\"120\" y2=\"125\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"120,125 130,120 130,130\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"110\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. SYN-ACK (ack=101 seq=300)</text>\n\n  <!-- Step 3 ACK -->\n  <line x1=\"120\" y1=\"150\" x2=\"480\" y2=\"170\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"480,170 470,165 470,175\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"155\" fill=\"#10b981\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. ACK (Connection Established)</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The 4 Steps of DHCP: DORA",
        "content": "When a new device connects to a network without an IP, it executes the **DORA** sequence:\n\n1. **D - Discover**: Client broadcasts to `255.255.255.255`: *\"Is there a DHCP server here? I need an IP!\"*\n2. **O - Offer**: DHCP server hears the broadcast and replies: *\"I have `192.168.1.55` available for you with mask `255.255.255.0`!\"*\n3. **R - Request**: Client broadcasts: *\"Thank you! I formally request to lease `192.168.1.55`.\"*\n4. **A - Acknowledge**: DHCP server sends final confirmation: *\"Acknowledged! `192.168.1.55` is yours for 24 hours. Your gateway is `192.168.1.1` and your DNS is `1.1.1.1`!\"*"
      },
      {
        "title": "2. The 4 Things DHCP Gives You",
        "content": "Without all four of these settings, a computer cannot use the internet:\n\n1. **Your IP Address** (e.g. `192.168.1.55`): Your unique identity.\n2. **Your Subnet Mask** (e.g. `255.255.255.0`): Identifies local vs remote targets.\n3. **Your Default Gateway** (e.g. `192.168.1.1`): The router that connects you to the outside world.\n4. **Your DNS Servers** (e.g. `1.1.1.1`): Resolves website domain names to IPs."
      }
    ],
    "seeExamples": [
      {
        "title": "Inspecting DHCP Lease Status",
        "codeOrDiagram": "cadet@endlessus:~$ ip route\ndefault via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.55 metric 100",
        "explanation": "Notice the `proto dhcp` flag indicating that the default gateway and IP were dynamically assigned by DHCP."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo \"D-O-R-A: Discover, Offer, Request, Acknowledge\"` to test the DHCP sequence:",
      "initialCommand": "",
      "expectedCommand": "echo \"D-O-R-A: Discover, Offer, Request, Acknowledge\"",
      "simulatedOutput": "D-O-R-A: Discover, Offer, Request, Acknowledge\n[+] DHCP handshake steps verified.",
      "explanation": "DORA summarizes the 4 exchange messages in DHCP."
    },
    "questions": [
      {
        "id": "q-27-1",
        "type": "exact",
        "question": "What 4-letter acronym represents the four steps in the DHCP address assignment process?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "DORA"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Discover, Offer, Request, Acknowledge.",
        "explanation": "DORA stands for Discover, Offer, Request, Acknowledge."
      },
      {
        "id": "q-27-2",
        "type": "multiple-choice",
        "question": "What security risk occurs when an attacker launches a Rogue DHCP server on a local corporate network?",
        "options": [
          "The attacker can assign themselves as the default gateway and DNS server, intercepting all client traffic (Man-in-the-Middle)",
          "The attacker instantly burns out the switch power supplies",
          "The attacker forces all computers to format their hard drives",
          "The attacker reverses the CPU clock frequency"
        ],
        "correctIndex": 0,
        "hint": "Controlling gateway and DNS allows traffic interception.",
        "explanation": "A rogue DHCP server hands out malicious gateway and DNS settings to hijack and monitor traffic."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Verify DORA sequence",
        "instruction": "Run `echo \"D-O-R-A: Discover, Offer, Request, Acknowledge\"` in the terminal.",
        "hints": [
          "Type: `echo \"D-O-R-A: Discover, Offer, Request, Acknowledge\"`"
        ]
      }
    ],
    "securityConnection": "Enterprise switches use a defensive feature called **DHCP Snooping** to block rogue DHCP attacks: only switch ports designated by administrators as 'trusted' (where legitimate DHCP servers live) are allowed to send DHCP Offer and Ack packets.",
    "id": "room-27",
    "nextRoomId": "room-28"
  },
  {
    "stage": 4,
    "level": 4,
    "levelTitle": "Level 4 \u2014 Networking Fundamentals",
    "title": "The OSI & TCP/IP Models & Network Troubleshooting",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 27: DHCP & Address Assignment",
    "whyAreYouHere": "The OSI (Open Systems Interconnection) 7-Layer model and the 4-Layer TCP/IP model are the universal conceptual roadmaps of networking. Every security tool, attack vector, and defensive firewall operates at a specific layer. In this room, you will learn all 7 layers, understand data encapsulation/decapsulation, and use `ping` and `traceroute` for systematic network troubleshooting.",
    "objectives": [
      "Memorize the 7 Layers of the OSI Model from Physical (Layer 1) to Application (Layer 7)",
      "Map the 4 layers of the TCP/IP model to the 7 OSI layers",
      "Understand Encapsulation (adding headers) and Decapsulation (stripping headers)",
      "Understand Protocol Data Units (PDUs): Bits, Frames, Packets, Segments, and Data",
      "Troubleshoot connectivity systematically from Layer 1 to Layer 7 using `ping` and `traceroute`"
    ],
    "vocabulary": [
      {
        "term": "OSI 7-Layer Model",
        "definition": "A conceptual framework developed by ISO characterizing the functions of a telecommunication system into 7 distinct abstraction layers."
      },
      {
        "term": "Encapsulation",
        "definition": "The process of wrapping data with protocol headers as it travels down the protocol stack (Data -> Segment -> Packet -> Frame -> Bits)."
      },
      {
        "term": "PDU (Protocol Data Unit)",
        "definition": "The specific unit of data transferred at a given layer (Layer 1: Bits, Layer 2: Frames, Layer 3: Packets, Layer 4: Segments)."
      },
      {
        "term": "ping (ICMP)",
        "definition": "A network administration tool used to test reachability of a host using ICMP Echo Request and Echo Reply packets."
      },
      {
        "term": "traceroute",
        "definition": "A utility that records each router hop along the path between your computer and a destination host by incrementing IP TTL values."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 230\" width=\"100%\" height=\"230\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <g transform=\"translate(50, 15)\">\n    <rect x=\"0\" y=\"0\" width=\"500\" height=\"24\" rx=\"4\" fill=\"#38bdf8\"/><text x=\"250\" y=\"16\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">7. Application (HTTP, DNS, SSH, FTP)</text>\n    <rect x=\"0\" y=\"28\" width=\"500\" height=\"24\" rx=\"4\" fill=\"#0ea5e9\"/><text x=\"250\" y=\"44\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">6. Presentation (SSL/TLS, ASCII, Encryption)</text>\n    <rect x=\"0\" y=\"56\" width=\"500\" height=\"24\" rx=\"4\" fill=\"#0284c7\"/><text x=\"250\" y=\"72\" fill=\"#ffffff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">5. Session (Sockets, Connection State)</text>\n    <rect x=\"0\" y=\"84\" width=\"500\" height=\"24\" rx=\"4\" fill=\"#10b981\"/><text x=\"250\" y=\"100\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">4. Transport (TCP, UDP, Ports)</text>\n    <rect x=\"0\" y=\"112\" width=\"500\" height=\"24\" rx=\"4\" fill=\"#059669\"/><text x=\"250\" y=\"128\" fill=\"#ffffff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. Network (IP Addressing, Routers, Packets)</text>\n    <rect x=\"0\" y=\"140\" width=\"500\" height=\"24\" rx=\"4\" fill=\"#f59e0b\"/><text x=\"250\" y=\"156\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. Data Link (MAC, Switches, Ethernet Frames)</text>\n    <rect x=\"0\" y=\"168\" width=\"500\" height=\"24\" rx=\"4\" fill=\"#ef4444\"/><text x=\"250\" y=\"184\" fill=\"#ffffff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. Physical (Cables, Radio Waves, Bits)</text>\n  </g>\n</svg>",
    "lessons": [
      {
        "title": "1. The 7 Layers of the OSI Model",
        "content": "Memorize this classic mnemonic: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way!\n\n\u2022 **Layer 7 - Application**: Human-computer interaction (HTTP, DNS, SSH, FTP).\n\u2022 **Layer 6 - Presentation**: Data formatting, character encoding, SSL/TLS encryption.\n\u2022 **Layer 5 - Session**: Manages dialogues and persistent connections between devices.\n\u2022 **Layer 4 - Transport**: End-to-end transport, port numbers, reliability (TCP, UDP). **PDU: Segment**.\n\u2022 **Layer 3 - Network**: Logical IP addressing and routing between networks. **PDU: Packet**.\n\u2022 **Layer 2 - Data Link**: Physical MAC addressing and switching on local network. **PDU: Frame**.\n\u2022 **Layer 1 - Physical**: Raw transmission of electrical, optical, or radio binary pulses. **PDU: Bits**."
      },
      {
        "title": "2. Data Encapsulation: The Envelopes Within Envelopes",
        "content": "When you send a message, it is encapsulated like nesting Russian dolls:\n\n1. At Layer 7, you type an HTTP request (`Data`).\n2. At Layer 4, the kernel adds a **TCP header** with source & dest ports -> **Segment**.\n3. At Layer 3, the kernel adds an **IP header** with source & dest IP addresses -> **Packet**.\n4. At Layer 2, the network card adds an **Ethernet header** with source & dest MACs -> **Frame**.\n5. At Layer 1, the physical NIC pulses the frame as electrical 1s and 0s onto the wire -> **Bits**!\n\nWhen the server receives the bits, it does **Decapsulation**\u2014stripping off the layers one by one until only the pure HTTP data remains."
      },
      {
        "title": "3. Troubleshooting Down the Stack",
        "content": "When a network fails, troubleshoot from Layer 1 up to Layer 7:\n\n\u2022 **Layer 1 (Physical)**: Is the Ethernet cable plugged in? Is Wi-Fi turned on?\n\u2022 **Layer 3 (Network)**: Can you reach your default gateway? Run `ping 192.168.1.1`.\n\u2022 **Layer 3 (Internet Routing)**: Can you reach Google's IP? Run `ping 8.8.8.8`.\n\u2022 **Layer 7 (DNS)**: Can you resolve names? Run `nslookup google.com`."
      }
    ],
    "seeExamples": [
      {
        "title": "Testing Network Reachability with ping",
        "codeOrDiagram": "cadet@endlessus:~$ ping -c 3 1.1.1.1\nPING 1.1.1.1 (1.1.1.1) 56(84) bytes of data.\n64 bytes from 1.1.1.1: icmp_seq=1 ttl=58 time=12.4 ms\n64 bytes from 1.1.1.1: icmp_seq=2 ttl=58 time=11.8 ms\n64 bytes from 1.1.1.1: icmp_seq=3 ttl=58 time=12.1 ms\n\n--- 1.1.1.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss",
        "explanation": "`ping -c 3` transmits 3 ICMP echo request packets, proving Layer 3 connectivity with zero packet loss."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `ping -c 2 10.10.20.15` in the terminal to test Layer 3 ICMP reachability to the target server:",
      "initialCommand": "",
      "expectedCommand": "ping -c 2 10.10.20.15",
      "simulatedOutput": "PING 10.10.20.15 (10.10.20.15) 56(84) bytes of data.\n64 bytes from 10.10.20.15: icmp_seq=1 ttl=64 time=0.452 ms\n64 bytes from 10.10.20.15: icmp_seq=2 ttl=64 time=0.380 ms\n--- 10.10.20.15 ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss",
      "explanation": "`ping` verifies network path reachability via ICMP."
    },
    "questions": [
      {
        "id": "q-28-1",
        "type": "exact",
        "question": "What is the specific Protocol Data Unit (PDU) name used at Layer 3 (Network Layer) of the OSI model?",
        "visualSlots": "_ _ _ _ _ _",
        "acceptedAnswers": [
          "packet",
          "packets"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Six letters: p-a-c-k-e-t.",
        "explanation": "At Layer 3 (Network), the Protocol Data Unit is called a Packet."
      },
      {
        "id": "q-28-2",
        "type": "multiple-choice",
        "question": "At which layer of the OSI 7-Layer model do switches operate using physical MAC addresses?",
        "options": [
          "Layer 1 (Physical)",
          "Layer 2 (Data Link)",
          "Layer 3 (Network)",
          "Layer 4 (Transport)"
        ],
        "correctIndex": 1,
        "hint": "Data Link Layer.",
        "explanation": "Layer 2 (Data Link) handles physical framing and MAC addressing."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Test network connectivity with ping",
        "instruction": "Execute `ping -c 2 10.10.20.15` in the terminal.",
        "hints": [
          "Type: `ping -c 2 10.10.20.15`"
        ]
      }
    ],
    "securityConnection": "Security controls map directly to OSI layers: Physical access control operates at Layer 1; 802.1X port security operates at Layer 2; Network firewalls filter at Layer 3/4; Web Application Firewalls (WAFs) like ModSecurity operate at Layer 7 by inspecting application HTTP payloads.",
    "id": "room-28",
    "nextRoomId": "room-29"
  },
  {
    "stage": 5,
    "level": 5,
    "levelTitle": "Level 5 \u2014 Internet & Web Fundamentals",
    "title": "How the World Wide Web Works",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Level 4: Networking Fundamentals",
    "whyAreYouHere": "Web applications are the most attacked surface in modern cybersecurity. From online banking and social media to cloud infrastructure portals, almost everything runs through web browsers. In this room, you will learn how the World Wide Web functions, examine the anatomy of a URL, and understand web servers like Nginx and Apache.",
    "objectives": [
      "Understand the web's foundational technologies: URLs, HTTP, HTML, and Web Servers",
      "Deconstruct the anatomy of a Uniform Resource Locator (URL): scheme, host, port, path, and query parameters",
      "Learn the role of web server daemons (Nginx, Apache HTTP Server, Microsoft IIS)",
      "Understand web document roots (e.g. `/var/www/html/`) and virtual hosting",
      "Query web pages from the terminal using `curl`"
    ],
    "vocabulary": [
      {
        "term": "URL (Uniform Resource Locator)",
        "definition": "A standardized reference address specifying the location and access protocol of a resource on the web."
      },
      {
        "term": "Web Server",
        "definition": "Software (such as Nginx or Apache) that listens on ports 80/443, processes HTTP requests, and returns HTML, CSS, images, or JSON data."
      },
      {
        "term": "Document Root",
        "definition": "The filesystem directory on a server where website files are stored (typically /var/www/html on Linux)."
      },
      {
        "term": "Query String",
        "definition": "The portion of a URL following '?' containing key-value parameters passed to the server (e.g. ?search=cybersecurity&page=1)."
      },
      {
        "term": "curl",
        "definition": "A command-line tool used to transfer data to or from a network server using protocols like HTTP, HTTPS, and FTP."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <rect x=\"30\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"105\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Web Browser</text>\n  <text x=\"105\" y=\"95\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">(Client)</text>\n\n  <!-- Request -->\n  <line x1=\"180\" y1=\"60\" x2=\"420\" y2=\"60\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"420,60 410,55 410,65\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"52\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">GET /login.html HTTP/1.1</text>\n\n  <!-- Response -->\n  <line x1=\"420\" y1=\"100\" x2=\"180\" y2=\"100\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"180,100 190,95 190,105\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"118\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">HTTP/1.1 200 OK (HTML Payload)</text>\n\n  <rect x=\"420\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"495\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Nginx Server</text>\n  <text x=\"495\" y=\"95\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Port 80 / 443</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Anatomy of a URL",
        "content": "Every time you click a link, your browser parses a **Uniform Resource Locator (URL)**:\n\n`https://endlessus.in:443/labs/search.php?topic=linux#task2`\n\n\u2022 **Scheme/Protocol (`https://`)**: Defines how to communicate (HTTP vs HTTPS).\n\u2022 **Host / Domain (`endlessus.in`)**: The domain name resolved via DNS to an IP.\n\u2022 **Port (`:443`)**: The target network port (optional; defaults to 80 for HTTP, 443 for HTTPS).\n\u2022 **Path (`/labs/search.php`)**: The file path requested on the web server.\n\u2022 **Query String (`?topic=linux`)**: User-supplied input parameters passed to server backend scripts.\n\u2022 **Fragment (`#task2`)**: Internal anchor for the browser to scroll down to."
      },
      {
        "title": "2. Web Server Daemons: Apache & Nginx",
        "content": "When a web server receives an incoming HTTP request, software daemons handle the delivery:\n\n\u2022 **Nginx**: Lightweight, event-driven web server famous for high performance and reverse proxying.\n\u2022 **Apache HTTP Server**: The classic workhorse of the web, configured via `.htaccess` files and modules.\n\u2022 **Microsoft IIS**: Enterprise web server running on Windows Server with ASP.NET.\n\nWebsite files live in a **Document Root** (e.g. `/var/www/html/`). If a user requests `GET /about.html`, the web server looks for `/var/www/html/about.html` and streams its bytes back in an HTTP response!"
      }
    ],
    "seeExamples": [
      {
        "title": "Fetching a Web Page with curl",
        "codeOrDiagram": "cadet@endlessus:~$ curl -s http://10.10.10.45/index.html | head -n 4\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Acme Finance Portal</title>",
        "explanation": "`curl -s` fetches the raw HTML page directly over HTTP without a graphical browser."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `curl -s http://10.10.10.45/index.html | head -n 3` in the terminal to inspect the HTML response:",
      "initialCommand": "",
      "expectedCommand": "curl -s http://10.10.10.45/index.html | head -n 3",
      "simulatedOutput": "<!DOCTYPE html>\n<html>\n<head>\n[+] Web server contacted: HTML document received over HTTP port 80.",
      "explanation": "`curl` retrieves HTTP resources via the command line."
    },
    "questions": [
      {
        "id": "q-29-1",
        "type": "exact",
        "question": "Which command-line utility is widely used in Linux to transmit data and make HTTP/HTTPS web requests?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "curl"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four letters: c-u-r-l.",
        "explanation": "`curl` is the standard tool for transferring data with URLs."
      },
      {
        "id": "q-29-2",
        "type": "multiple-choice",
        "question": "In the URL `http://example.com/search.php?query=security`, what is the component `?query=security` called?",
        "visualSlots": null,
        "options": [
          "The Scheme",
          "The Query String",
          "The Fragment Identifier",
          "The TLD"
        ],
        "correctIndex": 1,
        "hint": "Query parameters passed after question mark.",
        "explanation": "Parameters after the '?' character form the Query String."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Fetch HTML via curl",
        "instruction": "Execute `curl -s http://10.10.10.45/index.html | head -n 3` in the terminal.",
        "hints": [
          "Type: `curl -s http://10.10.10.45/index.html | head -n 3`"
        ]
      }
    ],
    "securityConnection": "Attackers probe web query parameters (like `?id=1` or `?search=admin`) for injection vulnerabilities like SQL Injection, Cross-Site Scripting (XSS), and Local File Inclusion (LFI).",
    "id": "room-29",
    "nextRoomId": "room-30"
  },
  {
    "stage": 5,
    "level": 5,
    "levelTitle": "Level 5 \u2014 Internet & Web Fundamentals",
    "title": "HTTP Requests, Methods & Status Codes",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 29: How the World Wide Web Works",
    "whyAreYouHere": "HTTP (Hypertext Transfer Protocol) is a plain-text protocol. Every action you take on the web\u2014submitting a password, viewing a photo, deleting an account\u2014is an HTTP Request containing a **Method** (verb) that receives an HTTP **Status Code** (number). In this room, you will learn the primary HTTP methods and understand the 5 families of HTTP status codes.",
    "objectives": [
      "Understand the structure of a raw HTTP request and HTTP response",
      "Learn primary HTTP Methods: GET, POST, PUT, DELETE, and HEAD",
      "Differentiate between safe/idempotent GET and state-changing POST",
      "Master the 5 HTTP Status Code families: 1xx, 2xx, 3xx, 4xx, and 5xx",
      "Inspect response headers and status codes using `curl -I`"
    ],
    "vocabulary": [
      {
        "term": "HTTP Method (Verb)",
        "definition": "The action specified in an HTTP request indicating what operation should be performed on the target resource."
      },
      {
        "term": "GET",
        "definition": "The HTTP method used strictly to retrieve data without modifying server state."
      },
      {
        "term": "POST",
        "definition": "The HTTP method used to send data (passwords, form inputs, uploaded files) to the server to create or update resources."
      },
      {
        "term": "Status Code",
        "definition": "A 3-digit number returned by a server indicating the outcome of the requested HTTP operation."
      },
      {
        "term": "404 Not Found",
        "definition": "Client error status code indicating the requested URL path does not exist on the server."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <rect x=\"30\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"105\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Web Browser</text>\n  <text x=\"105\" y=\"95\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">(Client)</text>\n\n  <!-- Request -->\n  <line x1=\"180\" y1=\"60\" x2=\"420\" y2=\"60\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"420,60 410,55 410,65\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"52\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">GET /login.html HTTP/1.1</text>\n\n  <!-- Response -->\n  <line x1=\"420\" y1=\"100\" x2=\"180\" y2=\"100\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"180,100 190,95 190,105\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"118\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">HTTP/1.1 200 OK (HTML Payload)</text>\n\n  <rect x=\"420\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"495\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Nginx Server</text>\n  <text x=\"495\" y=\"95\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Port 80 / 443</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Primary HTTP Methods (Verbs)",
        "content": "\u2022 **`GET`**: Retrieve a resource. Parameters are sent visibly inside the URL query string. GET should never change server state!\n\u2022 **`POST`**: Submit data to be processed (e.g. login forms, credit card forms). Data is transmitted inside the HTTP request body.\n\u2022 **`PUT`**: Replace an existing resource or upload a file.\n\u2022 **`DELETE`**: Delete the specified resource on the server.\n\u2022 **`HEAD`**: Same as GET, but asks the server to return ONLY the response headers, omitting the body (used by `curl -I` to audit security headers!)."
      },
      {
        "title": "2. The 5 Families of HTTP Status Codes",
        "content": "Status codes are 3-digit numbers grouped by their first digit:\n\n\u2022 **`1xx Informational`**: Request received, protocol switching (e.g. `101 Switching Protocols` for WebSockets).\n\u2022 **`2xx Success`**: Everything worked perfectly!\n  - `200 OK`: Standard successful response.\n  - `201 Created`: Resource successfully created (common in REST APIs).\n\u2022 **`3xx Redirection`**: Further action needed; browser redirected.\n  - `301 Moved Permanently`: URL has permanently changed.\n  - `302 Found (Temporary Redirect)`: Temporarily redirected (e.g. redirecting to `/login` if not authenticated).\n\u2022 **`4xx Client Error`**: The browser sent a bad or unauthorized request!\n  - `400 Bad Request`: Malformed syntax.\n  - `401 Unauthorized`: Authentication required (missing login credentials).\n  - `403 Forbidden`: Authenticated, but you lack permission to view this resource!\n  - `404 Not Found`: File or endpoint does not exist.\n\u2022 **`5xx Server Error`**: The server crashed or encountered an unhandled exception!\n  - `500 Internal Server Error`: Web application bug or database crash (Goldmine for pentesting!).\n  - `502 Bad Gateway`: Upstream backend server unreachable."
      }
    ],
    "seeExamples": [
      {
        "title": "Inspecting Status Codes with curl -I",
        "codeOrDiagram": "cadet@endlessus:~$ curl -I http://10.10.10.45/login\nHTTP/1.1 200 OK\nServer: nginx/1.24.0\nDate: Sun, 15 Oct 2026 12:00:00 GMT\nContent-Type: text/html; charset=UTF-8",
        "explanation": "`curl -I` issues an HTTP HEAD request, returning the status line (`HTTP/1.1 200 OK`) and response headers."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `curl -I http://10.10.10.45/login` to inspect the HTTP response status code and headers:",
      "initialCommand": "",
      "expectedCommand": "curl -I http://10.10.10.45/login",
      "simulatedOutput": "HTTP/1.1 200 OK\nServer: nginx/1.24.0\nContent-Type: text/html; charset=UTF-8\n[+] Status code verified: HTTP 200 OK received.",
      "explanation": "`curl -I` queries only the response headers."
    },
    "questions": [
      {
        "id": "q-30-1",
        "type": "exact",
        "question": "What 3-digit HTTP status code indicates that the requested web page was successfully found and returned (OK)?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "200"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three digits: 200.",
        "explanation": "200 OK is the standard success status code."
      },
      {
        "id": "q-30-2",
        "type": "exact",
        "question": "Which HTTP status code represents 'Forbidden', meaning the server understands the request but refuses to authorize access?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "403"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-zero-three.",
        "explanation": "403 Forbidden indicates access to the resource is blocked."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Query HTTP headers with curl -I",
        "instruction": "Execute `curl -I http://10.10.10.45/login` in the terminal.",
        "hints": [
          "Type: `curl -I http://10.10.10.45/login`"
        ]
      }
    ],
    "securityConnection": "When testing for Insecure Direct Object References (IDOR), changing an ID from `user/10` to `user/11` should return a `403 Forbidden` if authorization is properly enforced. If the server instead returns `200 OK` with another user's private data, you have found a critical security flaw!",
    "id": "room-30",
    "nextRoomId": "room-31"
  },
  {
    "stage": 5,
    "level": 5,
    "levelTitle": "Level 5 \u2014 Internet & Web Fundamentals",
    "title": "HTTP Headers, Cookies & Stateful Sessions",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 30: HTTP Requests, Methods & Status Codes",
    "whyAreYouHere": "HTTP is inherently a 'stateless' protocol: once a web server sends a response, it forgets who you are! To keep you logged in as you click from page to page, websites use HTTP Headers and Cookies to track sessions. In this room, you will learn how headers transmit metadata, how session tokens work, and how security flags (`HttpOnly`, `Secure`, `SameSite`) protect cookies from theft.",
    "objectives": [
      "Understand the structure of HTTP Request and Response Headers (Key-Value pairs)",
      "Identify common request headers: `User-Agent`, `Host`, `Accept`, and `Authorization`",
      "Learn how websites maintain persistent logins using Session IDs stored in Cookies",
      "Deconstruct the `Set-Cookie` header and its security flags: `HttpOnly`, `Secure`, and `SameSite`",
      "Understand essential security headers: HSTS, Content-Security-Policy (CSP), and X-Frame-Options"
    ],
    "vocabulary": [
      {
        "term": "HTTP Header",
        "definition": "A field in an HTTP request or response that passes additional operating parameters, security policies, and authentication tokens."
      },
      {
        "term": "Cookie",
        "definition": "A small piece of data stored in the user's web browser by the server to identify user sessions and track preferences."
      },
      {
        "term": "Set-Cookie",
        "definition": "The HTTP response header sent by a server instructing the client browser to store a cookie."
      },
      {
        "term": "HttpOnly Flag",
        "definition": "A cookie security flag that blocks client-side JavaScript (document.cookie) from accessing the cookie, preventing XSS cookie theft."
      },
      {
        "term": "Secure Flag",
        "definition": "A cookie security flag ensuring the cookie is only transmitted over encrypted HTTPS connections, never plain HTTP."
      },
      {
        "term": "HSTS (Strict-Transport-Security)",
        "definition": "A response header forcing browsers to communicate strictly over encrypted HTTPS, preventing SSL stripping."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <rect x=\"30\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"105\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Web Browser</text>\n  <text x=\"105\" y=\"95\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">(Client)</text>\n\n  <!-- Request -->\n  <line x1=\"180\" y1=\"60\" x2=\"420\" y2=\"60\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"420,60 410,55 410,65\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"52\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">GET /login.html HTTP/1.1</text>\n\n  <!-- Response -->\n  <line x1=\"420\" y1=\"100\" x2=\"180\" y2=\"100\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"180,100 190,95 190,105\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"118\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">HTTP/1.1 200 OK (HTML Payload)</text>\n\n  <rect x=\"420\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"495\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Nginx Server</text>\n  <text x=\"495\" y=\"95\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Port 80 / 443</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Anatomy of HTTP Headers",
        "content": "Headers are plain-text `Key: Value` lines sent before the HTML body:\n\n**Request Headers (Sent by Browser)**:\n\u2022 `Host: endlessus.in`: Tells the server which website you want (essential when one server hosts 50 websites!).\n\u2022 `User-Agent: Mozilla/5.0...`: Identifies the browser, version, and operating system.\n\u2022 `Cookie: session_id=abc123xyz`: Transmits your secret login token with every click!\n\n**Response Headers (Sent by Server)**:\n\u2022 `Server: nginx/1.24.0`: Identifies server software (often hidden to prevent version profiling).\n\u2022 `Set-Cookie: session_id=abc123xyz; Path=/; Secure; HttpOnly`: Creates a session cookie."
      },
      {
        "title": "2. The Golden Triad of Cookie Security",
        "content": "When a bank server assigns a session cookie, it MUST include three security flags:\n\n1. **`HttpOnly`**: Blocks JavaScript (`document.cookie`). If a hacker exploits a Cross-Site Scripting (XSS) vulnerability, they CANNOT steal the session cookie!\n2. **`Secure`**: Forces the browser to transmit the cookie ONLY over encrypted HTTPS. Prevents Wi-Fi eavesdroppers from intercepting your token.\n3. **`SameSite=Strict` or `Lax`**: Controls whether cookies are sent on cross-site requests. The primary defense against Cross-Site Request Forgery (CSRF)!"
      },
      {
        "title": "3. Vital HTTP Security Headers",
        "content": "Modern servers harden themselves by sending these response headers:\n\n\u2022 **`Strict-Transport-Security (HSTS)`**: Forces HTTPS connection encryption for a year.\n\u2022 **`X-Frame-Options: DENY`**: Prevents the website from being embedded inside an `<iframe>` on an attacker's site (stops Clickjacking!).\n\u2022 **`Content-Security-Policy (CSP)`**: Restricts which domains scripts, images, and styles can be loaded from (stops XSS execution)."
      }
    ],
    "seeExamples": [
      {
        "title": "Auditing Cookie Flags with curl",
        "codeOrDiagram": "cadet@endlessus:~$ curl -I http://10.10.10.45/login | grep -i \"set-cookie\"\nSet-Cookie: session=eyJhbGciOi...; Path=/; HttpOnly; SameSite=Strict\n\n[+] Security Audit: Cookie contains HttpOnly and SameSite=Strict flags!",
        "explanation": "`curl -I` piped into `grep -i set-cookie` extracts cookie definitions to verify security flags."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `curl -I https://staging.acmefin.local | grep -i strict` to audit HSTS header enforcement:",
      "initialCommand": "",
      "expectedCommand": "curl -I https://staging.acmefin.local | grep -i strict",
      "simulatedOutput": "[!] Audit result: No Strict-Transport-Security header returned (HSTS missing!).",
      "explanation": "Absence of HSTS header indicates an HTTP downgrade vulnerability."
    },
    "questions": [
      {
        "id": "q-31-1",
        "type": "exact",
        "question": "Which cookie security flag prevents client-side JavaScript code (document.cookie) from accessing or stealing the cookie?",
        "visualSlots": "_ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "HttpOnly"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Http + Only.",
        "explanation": "HttpOnly blocks script access to cookies, mitigating XSS cookie theft."
      },
      {
        "id": "q-31-2",
        "type": "multiple-choice",
        "question": "Which HTTP security response header prevents a web page from being rendered inside an iframe, protecting against Clickjacking attacks?",
        "options": [
          "Server",
          "X-Frame-Options",
          "User-Agent",
          "Content-Type"
        ],
        "correctIndex": 1,
        "hint": "Frame options header.",
        "explanation": "X-Frame-Options (DENY / SAMEORIGIN) blocks iframe framing to prevent Clickjacking."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Audit HTTP headers with curl",
        "instruction": "Execute `curl -I https://staging.acmefin.local | grep -i strict` in the terminal.",
        "hints": [
          "Type: `curl -I https://staging.acmefin.local | grep -i strict`"
        ]
      }
    ],
    "securityConnection": "In **Lab 01 (lab-headers)**, you audit a staging financial portal using `curl -I | grep -i strict` and `curl -I | grep -i frame` to identify missing HSTS and X-Frame-Options headers, then harden the Nginx configuration to achieve full security compliance.",
    "id": "room-31",
    "nextRoomId": "room-32"
  },
  {
    "stage": 5,
    "level": 5,
    "levelTitle": "Level 5 \u2014 Internet & Web Fundamentals",
    "title": "TLS, HTTPS & Cryptographic Trust Chains",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 31: HTTP Headers, Cookies & Stateful Sessions",
    "whyAreYouHere": "In plain HTTP, every password, session cookie, and credit card number travels across the network in clear unencrypted text. Anyone sitting on public coffee shop Wi-Fi or monitoring an ISP router can read your secrets. HTTPS solves this by wrapping HTTP inside Transport Layer Security (TLS) encryption. In this room, you will learn how symmetric and asymmetric encryption combine to protect data in transit.",
    "objectives": [
      "Understand why unencrypted HTTP is vulnerable to eavesdropping and tampering",
      "Learn the difference between Symmetric Encryption (fast, shared key) and Asymmetric Encryption (Public/Private key pairs)",
      "Understand the TLS Handshake: exchanging keys securely over an untrusted channel",
      "Learn about Digital Certificates (X.509) and Certificate Authorities (CAs)",
      "Understand browser certificate validation and warnings"
    ],
    "vocabulary": [
      {
        "term": "HTTPS (HTTP Secure)",
        "definition": "The secure, encrypted version of HTTP operating over TLS on port 443."
      },
      {
        "term": "TLS (Transport Layer Security)",
        "definition": "A cryptographic protocol designed to provide end-to-end communications security, privacy, and data integrity over a computer network (successor to SSL)."
      },
      {
        "term": "Symmetric Encryption",
        "definition": "Cryptographic method using the same single secret key to both encrypt and decrypt data (e.g. AES-256). Very fast."
      },
      {
        "term": "Asymmetric Encryption",
        "definition": "Cryptographic method using a mathematically linked Public Key (encrypts) and Private Key (decrypts) pair (e.g. RSA, ECC)."
      },
      {
        "term": "CA (Certificate Authority)",
        "definition": "A trusted third-party organization (like Let's Encrypt, DigiCert) that cryptographically signs digital certificates verifying domain ownership."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 200\" width=\"100%\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <line x1=\"120\" y1=\"30\" x2=\"120\" y2=\"180\" stroke=\"#38bdf8\" stroke-width=\"3\"/>\n  <text x=\"120\" y=\"22\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Client (You)</text>\n  \n  <line x1=\"480\" y1=\"30\" x2=\"480\" y2=\"180\" stroke=\"#10b981\" stroke-width=\"3\"/>\n  <text x=\"480\" y=\"22\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Target Server</text>\n\n  <!-- Step 1 SYN -->\n  <line x1=\"120\" y1=\"60\" x2=\"480\" y2=\"80\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <polygon points=\"480,80 470,75 470,85\" fill=\"#f59e0b\"/>\n  <text x=\"300\" y=\"65\" fill=\"#f59e0b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. SYN (Synchronize seq=100)</text>\n\n  <!-- Step 2 SYN-ACK -->\n  <line x1=\"480\" y1=\"105\" x2=\"120\" y2=\"125\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"120,125 130,120 130,130\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"110\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. SYN-ACK (ack=101 seq=300)</text>\n\n  <!-- Step 3 ACK -->\n  <line x1=\"120\" y1=\"150\" x2=\"480\" y2=\"170\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"480,170 470,165 470,175\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"155\" fill=\"#10b981\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. ACK (Connection Established)</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Symmetric vs Asymmetric Cryptography",
        "content": "HTTPS uses the best of both worlds:\n\n\u2022 **Asymmetric Cryptography (Public/Private Keys)**: Anyone can take your **Public Key** and lock a message in a digital safe. But ONLY your secret **Private Key** can unlock it! It solves the key-exchange problem, but is computationally slow.\n\u2022 **Symmetric Cryptography (AES-GCM)**: Fast and efficient, but both parties must share the exact same secret key.\n\n**The Solution**: HTTPS uses Asymmetric encryption for the first 10 milliseconds of the connection just to safely agree on a random temporary 'Session Key'. Once agreed, both sides switch to fast Symmetric encryption for all web browsing!"
      },
      {
        "title": "2. Digital Certificates & Certificate Authorities",
        "content": "When your browser connects to `bank.com`, how does it know it is talking to the real bank and not an imposter?\n\nThe server presents an **X.509 Digital Certificate** containing its public key. Crucially, this certificate is digitally signed by a trusted **Certificate Authority (CA)** (like Let's Encrypt or DigiCert).\n\nYour operating system has a built-in 'Root CA Store' of trusted authorities. If a certificate is self-signed or expired, your browser flashes a massive red security warning!"
      }
    ],
    "seeExamples": [
      {
        "title": "Inspecting TLS Certificates with openssl",
        "codeOrDiagram": "cadet@endlessus:~$ openssl s_client -connect endlessus.in:443 -servername endlessus.in < /dev/null 2>/dev/null | openssl x509 -noout -dates -issuer\nnotBefore=Oct  1 00:00:00 2026 GMT\nnotAfter=Dec 30 23:59:59 2026 GMT\nissuer=C = US, O = Let's Encrypt, CN = R3",
        "explanation": "`openssl` verifies that the TLS certificate is authentic, unexpired, and signed by Let's Encrypt."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"` to inspect TLS handshake protocol negotiation:",
      "initialCommand": "",
      "expectedCommand": "curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"",
      "simulatedOutput": "* ALPN: server accepted h2\n* TLSv1.3 (IN), TLS handshake, Finished (20)\n[+] TLS handshake verified: TLS 1.3 negotiated successfully.",
      "explanation": "`curl -v` prints verbose TLS handshake diagnostics."
    },
    "questions": [
      {
        "id": "q-32-1",
        "type": "exact",
        "question": "Which modern cryptographic protocol replaced SSL to provide encryption and integrity for HTTPS traffic on port 443?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "TLS",
          "Transport Layer Security"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Transport Layer Security abbreviation.",
        "explanation": "TLS replaced the deprecated SSL protocol."
      },
      {
        "id": "q-32-2",
        "type": "multiple-choice",
        "question": "What type of cryptography uses mathematically linked Public and Private key pairs to securely exchange information?",
        "options": [
          "Symmetric Encryption",
          "Asymmetric Encryption (Public Key Cryptography)",
          "Base64 Encoding",
          "One-Way Hashing"
        ],
        "correctIndex": 1,
        "hint": "Asymmetric uses two different keys.",
        "explanation": "Asymmetric encryption uses public/private key pairs for secure key exchange."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect TLS handshake negotiation",
        "instruction": "Execute `curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"` in the terminal.",
        "hints": [
          "Type: `curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"`"
        ]
      }
    ],
    "securityConnection": "Attackers on public Wi-Fi networks historically used tools like `sslstrip` to downgrade client connections from encrypted HTTPS to unencrypted HTTP, allowing them to read login credentials in cleartext. Websites enforce HSTS headers to permanently block downgrade attacks.",
    "id": "room-32",
    "nextRoomId": "room-33"
  },
  {
    "stage": 5,
    "level": 5,
    "levelTitle": "Level 5 \u2014 Internet & Web Fundamentals",
    "title": "Web Architecture: HTML, Client vs Server & APIs",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 32: TLS, HTTPS & Cryptographic Trust",
    "whyAreYouHere": "A modern web application is not just a static text file; it is a distributed software system. Code runs in two completely separate environments: the **Client** (the browser executing HTML, CSS, and JavaScript) and the **Server** (Node.js, Python, or PHP executing backend queries against a database). In this room, you will learn the client-server boundary, REST APIs, and why client-side security checks can always be bypassed by attackers.",
    "objectives": [
      "Understand the core frontend building blocks: HTML (structure), CSS (styling), and JavaScript (interactivity)",
      "Differentiate between Client-Side code (executed in user browser) and Server-Side code (executed in datacenter)",
      "Understand the Golden Rule of AppSec: Never trust the client!",
      "Learn about RESTful APIs and the JSON (JavaScript Object Notation) data interchange format",
      "Inspect API responses and parameters using curl"
    ],
    "vocabulary": [
      {
        "term": "HTML (Hypertext Markup Language)",
        "definition": "The standard markup language used to structure web pages and their content (headings, paragraphs, forms, inputs)."
      },
      {
        "term": "DOM (Document Object Model)",
        "definition": "The tree-like programming interface representation of an HTML document created by the browser in memory."
      },
      {
        "term": "Client-Side Processing",
        "definition": "Code (JavaScript) that runs entirely inside the visitor's local web browser."
      },
      {
        "term": "Server-Side Processing",
        "definition": "Code (Node, Python, PHP, Java) that runs on the remote server, with access to databases and backend systems."
      },
      {
        "term": "JSON (JavaScript Object Notation)",
        "definition": "A lightweight, human-readable text format for storing and exchanging data across APIs using key-value pairs and arrays."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <rect x=\"30\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"105\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Web Browser</text>\n  <text x=\"105\" y=\"95\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">(Client)</text>\n\n  <!-- Request -->\n  <line x1=\"180\" y1=\"60\" x2=\"420\" y2=\"60\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"420,60 410,55 410,65\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"52\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">GET /login.html HTTP/1.1</text>\n\n  <!-- Response -->\n  <line x1=\"420\" y1=\"100\" x2=\"180\" y2=\"100\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"180,100 190,95 190,105\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"118\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">HTTP/1.1 200 OK (HTML Payload)</text>\n\n  <rect x=\"420\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"495\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Nginx Server</text>\n  <text x=\"495\" y=\"95\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Port 80 / 443</text>\n</svg>",
    "lessons": [
      {
        "title": "1. Client-Side vs Server-Side",
        "content": "\u2022 **Client-Side (Your Browser)**: HTML builds the buttons and text boxes; CSS makes them look modern; JavaScript handles animations and client form validation. **Crucial Rule**: The user controls everything in their browser! Any validation done solely in JavaScript (e.g. 'Password must be 8 characters') can be disabled with browser developer tools!\n\u2022 **Server-Side (Datacenter)**: Code runs on the server (e.g., Python Flask, Express, Django). It connects to MySQL or MongoDB databases and checks business logic. **All critical security validation must happen on the server!**"
      },
      {
        "title": "2. REST APIs and JSON",
        "content": "Modern web apps (like React, Vue, or mobile apps) rarely download full HTML pages on every click. Instead, they talk to **REST APIs** (Application Programming Interfaces) that return raw data formatted as **JSON**:\n\n```json\n{\n  \"status\": \"success\",\n  \"userId\": 9482,\n  \"name\": \"Alice Cadet\",\n  \"role\": \"Security Auditor\"\n}\n```\n\nClient apps parse this JSON object and render it into the DOM."
      }
    ],
    "seeExamples": [
      {
        "title": "Querying a REST API endpoint returning JSON",
        "codeOrDiagram": "cadet@endlessus:~$ curl -s http://10.10.10.45/api/v1/user/10043\n{\n  \"status\": \"success\",\n  \"invoice_id\": \"INV-10043\",\n  \"client\": \"Executive Leadership\",\n  \"total\": \"$45,000.00\"\n}",
        "explanation": "The API endpoint returns pure JSON data representing a database record."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `curl -s http://10.10.10.45/api/v1/user/10043` in the terminal to inspect an API endpoint JSON response:",
      "initialCommand": "",
      "expectedCommand": "curl -s http://10.10.10.45/api/v1/user/10043",
      "simulatedOutput": "{\"status\":\"success\",\"invoice_id\":\"INV-10043\",\"client\":\"Executive Leadership\",\"total\":\"$45,000.00\"}\n[+] JSON payload parsed: REST API endpoint returned structured data.",
      "explanation": "`curl` retrieves API JSON payloads."
    },
    "questions": [
      {
        "id": "q-33-1",
        "type": "exact",
        "question": "What standard lightweight text format uses key-value pairs (enclosed in curly braces) to exchange data across web APIs?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "JSON"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "JavaScript Object Notation abbreviation.",
        "explanation": "JSON stands for JavaScript Object Notation."
      },
      {
        "id": "q-33-2",
        "type": "multiple-choice",
        "question": "Why is relying solely on client-side JavaScript for input validation (e.g. price calculations or permission checks) dangerous?",
        "options": [
          "JavaScript runs slower than Python",
          "Users have full control over their browser and can modify or disable client-side JavaScript before sending requests to the server",
          "HTML forms cannot transmit numbers",
          "JSON only works on Linux machines"
        ],
        "correctIndex": 1,
        "hint": "Users can bypass browser controls.",
        "explanation": "Client-side checks can be bypassed by intercepting or altering requests before they reach the server."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Query API JSON endpoint",
        "instruction": "Execute `curl -s http://10.10.10.45/api/v1/user/10043` in the terminal.",
        "hints": [
          "Type: `curl -s http://10.10.10.45/api/v1/user/10043`"
        ]
      }
    ],
    "securityConnection": "In **Insecure Direct Object Reference (IDOR)** vulnerabilities (practiced in Lab 04), an application trusts the client-supplied user ID in an API URL (e.g. `GET /api/user/9482`). By changing the ID to `10043`, an unauthorized attacker accesses another customer's private invoices because the backend failed to perform server-side ownership checks!",
    "id": "room-33",
    "nextRoomId": "room-34"
  },
  {
    "stage": 6,
    "level": 6,
    "levelTitle": "Level 6 \u2014 Cybersecurity Fundamentals",
    "title": "The CIA Triad & Core Security Principles",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Level 5: Internet & Web Fundamentals",
    "whyAreYouHere": "Every security policy, encryption standard, and risk assessment across the globe is built on a single timeless foundation: the **CIA Triad** (Confidentiality, Integrity, and Availability). In this room, you will learn the core pillars of information security, understand Defense-in-Depth, and discover why security is an ongoing lifecycle rather than a product you install once.",
    "objectives": [
      "Master the 3 pillars of the CIA Triad: Confidentiality, Integrity, and Availability",
      "Identify real-world cyberattacks that violate each specific pillar of the CIA Triad",
      "Understand the principle of Defense-in-Depth (Layered Security)",
      "Learn the concept of Non-Repudiation and Auditability",
      "Understand the Security vs Usability trade-off"
    ],
    "vocabulary": [
      {
        "term": "Confidentiality",
        "definition": "Ensuring that sensitive information is accessible only to authorized individuals, entities, or processes (protected by encryption and access controls)."
      },
      {
        "term": "Integrity",
        "definition": "Maintaining and assuring the accuracy, completeness, and uncorrupted state of data over its entire lifecycle (protected by cryptographic hashing and digital signatures)."
      },
      {
        "term": "Availability",
        "definition": "Ensuring that authorized users have reliable, timely access to information systems and data whenever needed (protected by redundancy, backups, and DDoS mitigation)."
      },
      {
        "term": "Defense-in-Depth",
        "definition": "A security strategy employing multiple redundant layers of defensive controls throughout an information system."
      },
      {
        "term": "Non-Repudiation",
        "definition": "The assurance that an individual cannot deny the authenticity of their signature on a document or the sending of a message that they originated."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <polygon points=\"300,25 150,150 450,150\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"3\"/>\n  <circle cx=\"300\" cy=\"25\" r=\"16\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"10\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Confidentiality</text>\n  <text x=\"300\" y=\"30\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">C</text>\n\n  <circle cx=\"150\" cy=\"150\" r=\"16\" fill=\"#10b981\"/>\n  <text x=\"100\" y=\"172\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Integrity</text>\n  <text x=\"150\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">I</text>\n\n  <circle cx=\"450\" cy=\"150\" r=\"16\" fill=\"#f59e0b\"/>\n  <text x=\"500\" y=\"172\" fill=\"#f59e0b\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Availability</text>\n  <text x=\"450\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">A</text>\n\n  <text x=\"300\" y=\"100\" fill=\"#f8fafc\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">The CIA Triad</text>\n  <text x=\"300\" y=\"120\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Core Pillars of Cybersecurity</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Pillars of the CIA Triad",
        "content": "\u2022 **Confidentiality (Privacy)**: Keeping secret data out of unauthorized hands. *Example breach*: An attacker steals a database of 10 million credit card numbers.\n\u2022 **Integrity (Accuracy)**: Ensuring data is never altered, tampered with, or faked in transit or at rest. *Example breach*: An attacker tampers with a hospital database to change a patient's blood type or medicine dosage!\n\u2022 **Availability (Uptime)**: Making sure services are online and accessible. *Example breach*: A Distributed Denial of Service (DDoS) attack or Ransomware attack freezes hospital computers, blocking emergency care."
      },
      {
        "title": "2. Defense-in-Depth: Layered Security",
        "content": "A medieval castle never relied on a single wooden gate: it had a moat, a drawbridge, outer curtain walls, watchtowers, and an inner keep. If attackers breached the gate, they were trapped in the courtyard!\n\nIn cybersecurity, **Defense-in-Depth** means deploying multiple independent security layers:\n1. **Edge**: Web Application Firewall (WAF) and DDoS filtering.\n2. **Network**: VLAN segmentation and internal firewalls.\n3. **Host**: Endpoint Detection and Response (EDR), disk encryption (BitLocker), and OS patching.\n4. **Application**: Strong authentication, MFA, and input validation.\n5. **Data**: Field-level encryption and strict database permissions.\n\nIf an attacker bypasses the firewall, the endpoint EDR and encryption still protect the crown jewels!"
      }
    ],
    "seeExamples": [
      {
        "title": "Mapping Attacks to the CIA Triad",
        "codeOrDiagram": "Attack: Data Breach / Password Dump    ===> Violates: CONFIDENTIALITY\nAttack: SQL Injection / Tampering     ===> Violates: INTEGRITY\nAttack: Ransomware / DDoS Flood        ===> Violates: AVAILABILITY",
        "explanation": "Every cyber incident damages one or more specific pillars of the CIA Triad."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo \"CIA: Confidentiality, Integrity, Availability\"` in the terminal to verify the foundational triad:",
      "initialCommand": "",
      "expectedCommand": "echo \"CIA: Confidentiality, Integrity, Availability\"",
      "simulatedOutput": "CIA: Confidentiality, Integrity, Availability\n[+] Foundations verified: The 3 core pillars of information security.",
      "explanation": "Outputs the CIA Triad principles."
    },
    "questions": [
      {
        "id": "q-34-1",
        "type": "exact",
        "question": "Which pillar of the CIA Triad is directly violated when a Distributed Denial of Service (DDoS) attack takes down a banking website?",
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "availability"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Ensuring systems are available when needed.",
        "explanation": "Availability is compromised when legitimate users cannot access a service."
      },
      {
        "id": "q-34-2",
        "type": "multiple-choice",
        "question": "An attacker intercepts a wire transfer request and changes the recipient account number from the vendor's bank to their personal overseas bank account. Which CIA Triad pillar was violated?",
        "options": [
          "Availability",
          "Integrity",
          "Speed",
          "Portability"
        ],
        "correctIndex": 1,
        "hint": "Data was tampered with and altered.",
        "explanation": "Integrity guarantees that data has not been modified or corrupted by unauthorized parties."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Verify CIA Triad",
        "instruction": "Run `echo \"CIA: Confidentiality, Integrity, Availability\"` in the terminal.",
        "hints": [
          "Type: `echo \"CIA: Confidentiality, Integrity, Availability\"`"
        ]
      }
    ],
    "securityConnection": "When writing penetration testing reports, findings are categorized by their CIA impact: an IDOR vulnerability that leaks user emails has high Confidentiality impact; a flaw allowing unauthorized balance adjustments has high Integrity impact.",
    "id": "room-34",
    "nextRoomId": "room-35"
  },
  {
    "stage": 6,
    "level": 6,
    "levelTitle": "Level 6 \u2014 Cybersecurity Fundamentals",
    "title": "Threats, Vulnerabilities, Risks & Impacts",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 34: The CIA Triad & Core Security Principles",
    "whyAreYouHere": "Beginners often use the words 'threat', 'vulnerability', and 'risk' interchangeably, but in professional cybersecurity, they have precise, mathematically distinct definitions. A vulnerability without a threat is harmless; a threat without a vulnerability cannot harm you. In this room, you will learn the Risk Equation, the Common Vulnerabilities and Exposures (CVE) system, and CVSS severity scoring.",
    "objectives": [
      "Clearly distinguish between a Vulnerability (flaw), a Threat (danger), an Exploit (code), and a Risk (probability x impact)",
      "Master the foundational Risk Equation: $\\text{Risk} = \\text{Threat} \\times \\text{Vulnerability} \\times \\text{Impact}$",
      "Learn about the CVE (Common Vulnerabilities and Exposures) dictionary maintained by MITRE",
      "Understand CVSS (Common Vulnerability Scoring System) scores from 0.0 to 10.0",
      "Explore the 4 strategies of Risk Management: Mitigate, Transfer, Accept, and Avoid"
    ],
    "vocabulary": [
      {
        "term": "Vulnerability",
        "definition": "A weakness, flaw, or bug in software, hardware, or process that can be exploited by an adversary."
      },
      {
        "term": "Threat",
        "definition": "Any circumstance or event with the potential to adversely impact an information system through unauthorized access, destruction, or denial of service."
      },
      {
        "term": "Exploit",
        "definition": "A piece of software, payload, or technique that takes advantage of a vulnerability to cause unintended behavior on a computer system."
      },
      {
        "term": "Risk",
        "definition": "The likelihood and potential financial, operational, or reputational damage resulting from a threat exploiting a vulnerability."
      },
      {
        "term": "CVE (Common Vulnerabilities and Exposures)",
        "definition": "A standardized dictionary of publicly known cybersecurity vulnerabilities identified by unique IDs (e.g., CVE-2021-44228 for Log4Shell)."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <polygon points=\"300,25 150,150 450,150\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"3\"/>\n  <circle cx=\"300\" cy=\"25\" r=\"16\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"10\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Confidentiality</text>\n  <text x=\"300\" y=\"30\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">C</text>\n\n  <circle cx=\"150\" cy=\"150\" r=\"16\" fill=\"#10b981\"/>\n  <text x=\"100\" y=\"172\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Integrity</text>\n  <text x=\"150\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">I</text>\n\n  <circle cx=\"450\" cy=\"150\" r=\"16\" fill=\"#f59e0b\"/>\n  <text x=\"500\" y=\"172\" fill=\"#f59e0b\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Availability</text>\n  <text x=\"450\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">A</text>\n\n  <text x=\"300\" y=\"100\" fill=\"#f8fafc\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">The CIA Triad</text>\n  <text x=\"300\" y=\"120\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Core Pillars of Cybersecurity</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Risk Equation: Threat, Vulnerability, and Impact",
        "content": "Consider a locked bank vault with an open window:\n\u2022 **Vulnerability**: The open window (a flaw in design).\n\u2022 **Threat**: A burglar looking for money (an adversary with intent and capability).\n\u2022 **Impact**: Losing $10,000,000 (the damage if the event occurs).\n\u2022 **Risk**: The overall probability and consequence ($Risk = Threat \\times Vulnerability \\times Impact$).\n\nIf you have a critical software bug (Vulnerability) on a computer disconnected from all networks buried underground (No Threat), the overall **Risk is nearly zero**!"
      },
      {
        "title": "2. CVEs and CVSS Scoring",
        "content": "When a security researcher discovers a new bug in software like Apache or the Linux kernel, it is assigned a **CVE ID**:\n`CVE-[Year]-[Sequential Number]` (e.g. `CVE-2021-44228`).\n\nThe vulnerability is scored using the **CVSS (Common Vulnerability Scoring System)** from `0.0` to `10.0`:\n\u2022 `0.1 - 3.9`: **Low** severity.\n\u2022 `4.0 - 6.9`: **Medium** severity.\n\u2022 `7.0 - 8.9`: **High** severity.\n\u2022 `9.0 - 10.0`: **Critical** severity (e.g. remote code execution without authentication)!"
      }
    ],
    "seeExamples": [
      {
        "title": "Searching for Vulnerabilities via Searchsploit",
        "codeOrDiagram": "cadet@endlessus:~$ searchsploit \"vsftpd 2.3.4\"\n--------------------------------------------------------- ---------------------------------\n Exploit Title                                           |  Path\n--------------------------------------------------------- ---------------------------------\nvsftpd 2.3.4 - Backdoor Command Execution                | unix/remote/49757.py",
        "explanation": "`searchsploit` queries the local offline Exploit-DB database for known public exploits matching a software version."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"` to view a famous critical vulnerability identifier:",
      "initialCommand": "",
      "expectedCommand": "echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"",
      "simulatedOutput": "CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\n[+] CVE format verified: Standardized vulnerability tracking notation.",
      "explanation": "Illustrates the CVE naming standard."
    },
    "questions": [
      {
        "id": "q-35-1",
        "type": "exact",
        "question": "What 3-letter acronym represents the international dictionary of standardized vulnerability identifiers (e.g. CVE-2021-44228)?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "CVE"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Common Vulnerabilities and Exposures.",
        "explanation": "CVE stands for Common Vulnerabilities and Exposures."
      },
      {
        "id": "q-35-2",
        "type": "multiple-choice",
        "question": "Under the CVSS v3.1 scoring framework, what qualitative severity rating is assigned to a vulnerability with a score between 9.0 and 10.0?",
        "options": [
          "Low",
          "Medium",
          "High",
          "Critical"
        ],
        "correctIndex": 3,
        "hint": "The highest severity tier.",
        "explanation": "Scores from 9.0 to 10.0 represent Critical vulnerabilities."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect CVE notation",
        "instruction": "Run `echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"` in the terminal.",
        "hints": [
          "Type: `echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"`"
        ]
      }
    ],
    "securityConnection": "Enterprise vulnerability scanners (like Nessus or Qualys) scan thousands of servers across corporate networks, matching software versions to CVE databases to produce prioritized remediation lists for system administrators.",
    "id": "room-35",
    "nextRoomId": "room-36"
  },
  {
    "stage": 6,
    "level": 6,
    "levelTitle": "Level 6 \u2014 Cybersecurity Fundamentals",
    "title": "Malware & Common Attack Types",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 35: Threats, Vulnerabilities, Risks & Impacts",
    "whyAreYouHere": "Malicious software (malware) is any code designed to cause harm, steal data, or hijack computational resources. From self-replicating worms and deceptive trojans to devastating modern ransomware gangs, cybersecurity analysts must recognize the taxonomy of cyber threats. In this room, you will learn the primary categories of malware and understand common human-facing social engineering tactics.",
    "objectives": [
      "Understand the broad umbrella term 'Malware' (Malicious Software)",
      "Differentiate between Viruses (needs host file), Worms (self-propagating over networks), and Trojans (disguised as legitimate)",
      "Learn how Ransomware encrypts user files and demands cryptocurrency payments",
      "Understand Spyware, Keyloggers, Adware, and Rootkits",
      "Recognize Social Engineering and Phishing tactics (Spear Phishing, Whaling, Vishing)"
    ],
    "vocabulary": [
      {
        "term": "Malware",
        "definition": "Any software intentionally designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "term": "Worm",
        "definition": "A standalone malware computer program that replicates itself automatically across computer networks without requiring human intervention or a host program."
      },
      {
        "term": "Trojan Horse",
        "definition": "Malicious code disguised as innocent, useful software (like a cracked game or PDF reader) that tricks users into executing it."
      },
      {
        "term": "Ransomware",
        "definition": "Malware that employs asymmetric/symmetric encryption to hold a victim's personal or enterprise data hostage until a ransom is paid."
      },
      {
        "term": "Phishing",
        "definition": "A social engineering attack where attackers impersonate trustworthy entities via email or messaging to deceive victims into revealing credentials or installing malware."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <polygon points=\"300,25 150,150 450,150\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"3\"/>\n  <circle cx=\"300\" cy=\"25\" r=\"16\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"10\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Confidentiality</text>\n  <text x=\"300\" y=\"30\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">C</text>\n\n  <circle cx=\"150\" cy=\"150\" r=\"16\" fill=\"#10b981\"/>\n  <text x=\"100\" y=\"172\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Integrity</text>\n  <text x=\"150\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">I</text>\n\n  <circle cx=\"450\" cy=\"150\" r=\"16\" fill=\"#f59e0b\"/>\n  <text x=\"500\" y=\"172\" fill=\"#f59e0b\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Availability</text>\n  <text x=\"450\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">A</text>\n\n  <text x=\"300\" y=\"100\" fill=\"#f8fafc\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">The CIA Triad</text>\n  <text x=\"300\" y=\"120\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Core Pillars of Cybersecurity</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Primary Types of Malware",
        "content": "\u2022 **Virus**: Attaches itself to a clean file on disk. When a user runs that file, the virus code runs, infects other files, and spreads.\n\u2022 **Worm**: Self-contained and automated! It scans local networks for vulnerable open ports, exploits them, and copies itself to new machines without ANY user interaction (e.g. WannaCry).\n\u2022 **Trojan Horse**: Deceives the victim. Looks like a legitimate utility, calculator, or game crack, but secretly opens a backdoor for an attacker.\n\u2022 **Ransomware**: Scans your hard drive, generates a strong AES-256 key, encrypts all documents, photos, and databases, and deletes the key unless you pay a ransom in Bitcoin.\n\u2022 **Rootkit**: Modifies the operating system kernel and drivers to hide processes, files, and network connections from Antivirus and Task Manager!"
      },
      {
        "title": "2. Social Engineering & Phishing",
        "content": "Over 90% of all successful corporate cyberattacks begin with a human, not a technical bug!\n\n\u2022 **Phishing**: Mass generic emails ('Your account is locked; click here to verify').\n\u2022 **Spear Phishing**: Highly targeted emails tailored specifically to an individual using research gathered from LinkedIn.\n\u2022 **Whaling**: Spear phishing targeting high-level executives (CEOs, CFOs).\n\u2022 **Vishing / Smishing**: Voice calls (phone scams) or SMS text messages."
      }
    ],
    "seeExamples": [
      {
        "title": "Deconstructing a Phishing Email Header",
        "codeOrDiagram": "From: \"IT Support Helpdesk\" <support@legitimate-company.com.attacker-domain.xyz>\nReply-To: evil-collector@gmail.com\nSubject: URGENT: Password Expiring in 1 Hour - Action Required\nLink Target: http://login-portal-verification.ru/login.php",
        "explanation": "Notice the spoofed display name, urgency trigger, mismatched reply-to address, and suspicious foreign URL."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"` in the terminal:",
      "initialCommand": "",
      "expectedCommand": "echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"",
      "simulatedOutput": "Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\n[+] Taxonomy reviewed: The primary families of malicious software.",
      "explanation": "Summarizes the 5 primary malware classifications."
    },
    "questions": [
      {
        "id": "q-36-1",
        "type": "exact",
        "question": "What category of malware self-replicates and spreads across computer networks automatically without requiring user interaction or a host program?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "worm",
          "worms"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four letters: w-o-r-m.",
        "explanation": "Worms spread across networks independently without human interaction."
      },
      {
        "id": "q-36-2",
        "type": "multiple-choice",
        "question": "What is the term for a highly targeted phishing attack crafted specifically for high-profile executive leadership (CEOs, CFOs)?",
        "options": [
          "Smishing",
          "Whaling",
          "Vishing",
          "Pharming"
        ],
        "correctIndex": 1,
        "hint": "Hunting the biggest fish: Whales.",
        "explanation": "Whaling targets senior executives and high-value decision-makers."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Review malware taxonomy",
        "instruction": "Run `echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"` in the terminal.",
        "hints": [
          "Type: `echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"`"
        ]
      }
    ],
    "securityConnection": "Security teams use 'Sandboxes' (isolated virtual environments like Cuckoo Sandbox or Any.Run) to safely execute suspicious malware samples and analyze their behavior: which files they create, which registry keys they alter, and which command-and-control (C2) servers they contact.",
    "id": "room-36",
    "nextRoomId": "room-37"
  },
  {
    "stage": 6,
    "level": 6,
    "levelTitle": "Level 6 \u2014 Cybersecurity Fundamentals",
    "title": "Authentication vs Authorization & Modern Identity",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 36: Malware & Common Attack Types",
    "whyAreYouHere": "Identity is the new perimeter in modern cloud security. But beginners frequently confuse two core access management concepts: **Authentication** (AuthN) and **Authorization** (AuthZ). Showing your passport at the airport proves *who you are* (Authentication); checking your boarding pass proves *which flight you are allowed to board* (Authorization). In this room, you will master identity controls, Multi-Factor Authentication (MFA), and password hashing.",
    "objectives": [
      "Clearly distinguish Authentication (AuthN - proving identity) from Authorization (AuthZ - verifying permissions)",
      "Understand the 3 core Authentication Factors: Something you know, Something you have, Something you are",
      "Learn Multi-Factor Authentication (MFA / 2FA) and why SMS verification is insecure compared to hardware keys (FIDO2)",
      "Understand how passwords are securely stored using one-way hashes and unique cryptographic salts",
      "Explore Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)"
    ],
    "vocabulary": [
      {
        "term": "Authentication (AuthN)",
        "definition": "The process of verifying the identity of a user, device, or system (answering: 'Who are you?')."
      },
      {
        "term": "Authorization (AuthZ)",
        "definition": "The process of verifying whether an authenticated user has permission to access a specific resource or perform an action (answering: 'What are you allowed to do?')."
      },
      {
        "term": "MFA (Multi-Factor Authentication)",
        "definition": "A security mechanism requiring two or more independent authentication factors to verify identity before granting access."
      },
      {
        "term": "Salt",
        "definition": "A unique, random string appended to passwords before hashing to ensure identical passwords produce completely different hash values, preventing rainbow table attacks."
      },
      {
        "term": "RBAC (Role-Based Access Control)",
        "definition": "An access control model where permissions are assigned to specific roles (e.g., Auditor, Editor, Admin) and users are assigned to roles."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <polygon points=\"300,25 150,150 450,150\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"3\"/>\n  <circle cx=\"300\" cy=\"25\" r=\"16\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"10\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Confidentiality</text>\n  <text x=\"300\" y=\"30\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">C</text>\n\n  <circle cx=\"150\" cy=\"150\" r=\"16\" fill=\"#10b981\"/>\n  <text x=\"100\" y=\"172\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Integrity</text>\n  <text x=\"150\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">I</text>\n\n  <circle cx=\"450\" cy=\"150\" r=\"16\" fill=\"#f59e0b\"/>\n  <text x=\"500\" y=\"172\" fill=\"#f59e0b\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Availability</text>\n  <text x=\"450\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">A</text>\n\n  <text x=\"300\" y=\"100\" fill=\"#f8fafc\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">The CIA Triad</text>\n  <text x=\"300\" y=\"120\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Core Pillars of Cybersecurity</text>\n</svg>",
    "lessons": [
      {
        "title": "1. AuthN vs AuthZ: Identity vs Permissions",
        "content": "\u2022 **Authentication (AuthN)**: *\"I am cadet, and here is my password and authenticator token.\"* The system validates your credentials against its database.\n\u2022 **Authorization (AuthZ)**: Now that the system knows you are cadet, can you click the red 'Format Production Database' button? The system checks your role: *\"No! Only Administrators have permission to do that (403 Forbidden).\"*\n\n**Common Vulnerability**: A system that authenticates users perfectly, but forgets to check authorization before returning data, is vulnerable to Broken Access Control (OWASP Top 10 #1)!"
      },
      {
        "title": "2. The Three Factors of Authentication",
        "content": "True MFA requires combining at least two **different categories**:\n\n1. **Something You Know**: Password, PIN, mother's maiden name.\n2. **Something You Have**: Smartphone with authenticator app (TOTP), physical FIDO2 YubiKey, smartcard.\n3. **Something You Are**: Biometrics\u2014fingerprint scan, facial recognition, retina scan.\n\n*Entering your password and then answering a security question is NOT two-factor authentication\u2014both are just things you know!*"
      },
      {
        "title": "3. Storing Passwords: Salted Hashes",
        "content": "Companies should **NEVER store passwords in plain text**! If an attacker breaches the database, every user's password is stolen.\n\nInstead, secure applications use modern cryptographic password-hashing algorithms (like `bcrypt`, `Argon2id`, or `PBKDF2`):\n\n`Password + Random Salt (16 bytes) ===> Argon2id ===> $argon2id$v=19$m=65536...`\n\nThe salt ensures that even if 500 users all pick `Password123!`, every single hash in the database is completely unique!"
      }
    ],
    "seeExamples": [
      {
        "title": "Viewing Linux Password Hashes in /etc/shadow",
        "codeOrDiagram": "root@endlessus:~# cat /etc/shadow | grep \"cadet\"\ncadet:$6$randomsaltstring$abc123456789...:19600:0:99999:7:::\n\n[+] $6$ indicates SHA-512 hashing with a unique random salt string.",
        "explanation": "Linux stores user passwords as salted hashes in the root-only `/etc/shadow` file."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo \"AuthN: Who are you? | AuthZ: What can you access?\"` in the terminal:",
      "initialCommand": "",
      "expectedCommand": "echo \"AuthN: Who are you? | AuthZ: What can you access?\"",
      "simulatedOutput": "AuthN: Who are you? | AuthZ: What can you access?\n[+] Access control boundary clarified: Authentication vs Authorization.",
      "explanation": "Contrasts Authentication and Authorization."
    },
    "questions": [
      {
        "id": "q-37-1",
        "type": "exact",
        "question": "What is the security term for the random data added to a password before hashing to defeat precomputed rainbow table attacks?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "salt"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four letters: s-a-l-t.",
        "explanation": "A cryptographic salt ensures identical passwords produce distinct hashes."
      },
      {
        "id": "q-37-2",
        "type": "multiple-choice",
        "question": "Which of the following represents a true Multi-Factor Authentication (MFA) combination?",
        "options": [
          "A password and a PIN number",
          "A password and your mother's maiden name",
          "A password (something you know) and a physical YubiKey hardware token (something you have)",
          "A fingerprint scan and a facial recognition scan"
        ],
        "correctIndex": 2,
        "hint": "Requires two distinct factor categories.",
        "explanation": "Combining something you know (password) with something you have (YubiKey) constitutes true multi-factor authentication."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Contrast AuthN vs AuthZ",
        "instruction": "Run `echo \"AuthN: Who are you? | AuthZ: What can you access?\"` in the terminal.",
        "hints": [
          "Type: `echo \"AuthN: Who are you? | AuthZ: What can you access?\"`"
        ]
      }
    ],
    "securityConnection": "In **Lab 03 (lab-auth)**, you investigate an authentication endpoint flawed by SQL Injection. Supplying `' OR 1=1 --` tricks the database query into authenticating as administrator without knowing the password, completely bypassing the authentication layer!",
    "id": "room-37",
    "nextRoomId": "room-38"
  },
  {
    "stage": 6,
    "level": 6,
    "levelTitle": "Level 6 \u2014 Cybersecurity Fundamentals",
    "title": "Encoding vs Hashing vs Encryption",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 37: Authentication vs Authorization & Passwords",
    "whyAreYouHere": "The single most common mistake made by junior developers and beginners is confusing **Encoding**, **Hashing**, and **Encryption**. Encoding transforms data for safe transmission (it provides ZERO security). Hashing turns data into a fixed-length fingerprint in ONE DIRECTION only (you cannot reverse it). Encryption scrambles data using a SECRET KEY so that ONLY someone with the key can unscramble it. In this room, you will learn to distinguish them effortlessly.",
    "objectives": [
      "Clearly distinguish the 3 core data transformation paradigms: Encoding, Hashing, and Encryption",
      "Understand Encoding (Base64, URL encoding, Hex): reversible by ANYONE without a key",
      "Understand Cryptographic Hashing (SHA-256, MD5): one-way, irreversible, deterministic, avalanche effect",
      "Understand Encryption (AES, RSA): two-way, reversible ONLY with the correct secret key",
      "Encode and decode data from the Linux terminal using `base64` and calculate hashes with `sha256sum`"
    ],
    "vocabulary": [
      {
        "term": "Encoding",
        "definition": "A reversible transformation of data into a different format (like Base64 or Hex) so it can be safely consumed by different systems. Provides zero confidentiality."
      },
      {
        "term": "Hashing",
        "definition": "A one-way mathematical algorithm that converts an arbitrary-length input into a fixed-length string of characters (digest). Irreversible by design."
      },
      {
        "term": "Encryption",
        "definition": "The process of scrambling plaintext into ciphertext using a mathematical algorithm and a secret key, reversible only with the decryption key."
      },
      {
        "term": "Base64",
        "definition": "A binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters (A-Z, a-z, 0-9, +, /)."
      },
      {
        "term": "SHA-256",
        "definition": "Secure Hash Algorithm generating a 256-bit (64 hexadecimal character) one-way hash digest widely used in SSL certificates and blockchain."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:sans-serif;\">\n  <polygon points=\"300,25 150,150 450,150\" fill=\"none\" stroke=\"#0284c7\" stroke-width=\"3\"/>\n  <circle cx=\"300\" cy=\"25\" r=\"16\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"10\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Confidentiality</text>\n  <text x=\"300\" y=\"30\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">C</text>\n\n  <circle cx=\"150\" cy=\"150\" r=\"16\" fill=\"#10b981\"/>\n  <text x=\"100\" y=\"172\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Integrity</text>\n  <text x=\"150\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">I</text>\n\n  <circle cx=\"450\" cy=\"150\" r=\"16\" fill=\"#f59e0b\"/>\n  <text x=\"500\" y=\"172\" fill=\"#f59e0b\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Availability</text>\n  <text x=\"450\" y=\"154\" fill=\"#0f172a\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">A</text>\n\n  <text x=\"300\" y=\"100\" fill=\"#f8fafc\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">The CIA Triad</text>\n  <text x=\"300\" y=\"120\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Core Pillars of Cybersecurity</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The Definitive Comparison Table",
        "content": "| Property | Encoding (e.g. Base64) | Hashing (e.g. SHA-256) | Encryption (e.g. AES-256) |\n|---|---|---|---|\n| **Purpose** | Data compatibility / format transfer | Data integrity & verification | Data confidentiality (privacy) |\n| **Key Required?** | **NO KEY** | **NO KEY** | **YES (Secret Key)** |\n| **Reversible?** | **YES** (Anyone can reverse) | **NO** (Strictly One-Way) | **YES** (Only with key) |\n| **Output Length** | Varies proportionally with input | **Fixed length** (always 64 hex chars for SHA-256) | Varies with input |\n| **Example** | `YWRtaW4=` -> `admin` | `8c6976e5b5410...` (Cannot reverse) | `U2FsdGVkX1...` (Decrypt with key) |"
      },
      {
        "title": "2. The Avalanche Effect in Hashing",
        "content": "A good cryptographic hash function exhibits the **Avalanche Effect**: if you change even a single bit in the input (e.g. changing an uppercase 'A' to lowercase 'a'), over 50% of the output hash digest bits flip randomly!\n\n`sha256(\"Hello World\")` -> `a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e`\n`sha256(\"hello World\")` -> `3b66474917a22cb15cf017c667e6962ac35c5c0d297ca2687c714392fec25b25`\n\nNotice how the output changed completely!"
      }
    ],
    "seeExamples": [
      {
        "title": "Encoding and Hashing in the Terminal",
        "codeOrDiagram": "cadet@endlessus:~$ echo -n \"admin\" | base64\nYWRtaW4=\n\ncadet@endlessus:~$ echo -n \"admin\" | sha256sum\n8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918  -",
        "explanation": "`base64` encodes reversibly; `sha256sum` produces a deterministic one-way 256-bit digest."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `echo -n \"secret\" | base64` in the terminal to encode the word 'secret' into Base64:",
      "initialCommand": "",
      "expectedCommand": "echo -n \"secret\" | base64",
      "simulatedOutput": "c2VjcmV0\n[+] Base64 encoded: c2VjcmV0 (Reversible with base64 -d).",
      "explanation": "`base64` encodes ASCII text into 64-character ASCII representation."
    },
    "questions": [
      {
        "id": "q-38-1",
        "type": "exact",
        "question": "What 6-letter term describes a reversible data transformation (like Base64) that provides zero secrecy and requires no secret key?",
        "visualSlots": "_ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "encoding",
          "encode"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Encoding (not encryption).",
        "explanation": "Encoding formats data for compatibility, not confidentiality."
      },
      {
        "id": "q-38-2",
        "type": "multiple-choice",
        "question": "Which of the following statements about cryptographic hashing is true?",
        "options": [
          "A hash can be easily decrypted using a private key",
          "Hashing is strictly a one-way mathematical function and cannot be reversed to recover original plaintext",
          "Changing one letter in the input produces nearly the exact same hash output",
          "Hashing algorithms are only used on Windows operating systems"
        ],
        "correctIndex": 1,
        "hint": "Hashing is strictly one-way.",
        "explanation": "Cryptographic hashes are one-way functions designed to be irreversible."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Encode string with base64",
        "instruction": "Execute `echo -n \"secret\" | base64` in the terminal.",
        "hints": [
          "Type: `echo -n \"secret\" | base64`"
        ]
      }
    ],
    "securityConnection": "In **Lab 11 (lab-jwt)**, you inspect JSON Web Tokens (JWTs). Beginners often assume JWTs are encrypted; in reality, they are merely **Base64URL-encoded**! Anyone who intercepts the token can decode the payload instantly with `base64 -d`.",
    "id": "room-38",
    "nextRoomId": "room-39"
  },
  {
    "stage": 6,
    "level": 6,
    "levelTitle": "Level 6 \u2014 Cybersecurity Fundamentals",
    "title": "Defensive Controls, Security Logs & Incident Response",
    "difficulty": "Foundation",
    "difficultyBadge": "\ud83d\udd35 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 38: Encoding vs Hashing vs Encryption",
    "whyAreYouHere": "When a cyber incident strikes, the difference between a minor annoyance and a catastrophic corporate bankruptcy is how fast the security team detects, contains, and remediates the intrusion. In this room, you will learn about the 6-phase Incident Response lifecycle, explore Security Information and Event Management (SIEM) platforms, and practice analyzing real web server access logs to hunt down attacker payloads.",
    "objectives": [
      "Understand the 6 phases of the Incident Response lifecycle: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned",
      "Learn the role of SIEM (Security Information & Event Management) platforms like Splunk and Elastic",
      "Understand common web server log formats (Common Log Format / Nginx / Apache access logs)",
      "Identify attack signatures in web access logs: Path Traversal (`../`), Web Shells (`uploads`), and SQL Injection",
      "Investigate brute-force attacks in authentication logs (`auth.log`)"
    ],
    "vocabulary": [
      {
        "term": "Incident Response (IR)",
        "definition": "The structured methodology an organization uses to detect, respond to, contain, and recover from a cyberattack."
      },
      {
        "term": "SIEM (Security Information and Event Management)",
        "definition": "A security software system that aggregates, correlates, and analyzes log data from thousands of devices across an enterprise in real time."
      },
      {
        "term": "SOC (Security Operations Center)",
        "definition": "The centralized team of cybersecurity analysts responsible for monitoring, detecting, and responding to security incidents 24/7."
      },
      {
        "term": "IoC (Indicator of Compromise)",
        "definition": "Forensic evidence of a cyber intrusion on a network or host (e.g., a known malicious IP address, file hash, or domain)."
      },
      {
        "term": "Access Log",
        "definition": "A text log file maintained by web servers (Apache, Nginx) recording every HTTP request received (IP, timestamp, method, URL, status code, user agent)."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The 6 Phases of Incident Response (NIST / SANS)",
        "content": "1. **Preparation**: Train staff, configure logs, deploy EDR agents, create incident response playbooks.\n2. **Identification (Detection)**: A SOC analyst notices an alert: *\"10,000 failed SSH logins followed by a root shell!\"*\n3. **Containment**: Isolate the infected machine from the network (pull the network cable or revoke VLAN access) to prevent lateral movement.\n4. **Eradication**: Remove malware, delete backdoor accounts, patch the vulnerable software.\n5. **Recovery**: Restore clean data from offline backups, test system operations, return to production.\n6. **Lessons Learned**: Post-incident review: What happened? How do we update our defenses so this never happens again?"
      },
      {
        "title": "2. Reading a Web Server Access Log",
        "content": "An Nginx/Apache log line tells a complete forensic story:\n\n`192.168.1.100 - - [15/Oct/2026:10:14:02 +0000] \"GET /view?file=../../../../etc/passwd HTTP/1.1\" 200 1840`\n\n\u2022 `192.168.1.100`: Attacker's IP address.\n\u2022 `[15/Oct/2026...]`: Precise timestamp of the attack.\n\u2022 `GET /view?file=../../../../etc/passwd`: The attacker's payload (Path Traversal attempting to read password hashes!).\n\u2022 `200`: HTTP Status Code. **200 OK means the attack SUCCEEDED** and the server returned the file bytes!\n\u2022 `1840`: Number of bytes returned."
      }
    ],
    "seeExamples": [
      {
        "title": "Hunting Path Traversal in Access Logs with grep",
        "codeOrDiagram": "cadet@endlessus:~$ grep -E \"\\.\\./\" access.log\n192.168.1.105 - - [15/Oct/2026:14:02:11 +0000] \"GET /static/../../etc/passwd HTTP/1.1\" 200 2410\n\n[!] Incident Detected: Attacker IP 192.168.1.105 successfully downloaded /etc/passwd via directory traversal!",
        "explanation": "`grep -E \"\\.\\./\"` isolates path traversal attempts containing dot-dot-slash patterns."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run `grep -E \"\\.\\./\" access.log` in the terminal to isolate directory traversal attacks in the web log:",
      "initialCommand": "",
      "expectedCommand": "grep -E \"\\.\\./\" access.log",
      "simulatedOutput": "192.168.1.105 - - [15/Oct/2026:14:02:11 +0000] \"GET /static/../../etc/passwd HTTP/1.1\" 200 2410\n[+] Attack vector isolated: Path traversal identified from IP 192.168.1.105.",
      "explanation": "`grep -E` filters access logs for path traversal patterns."
    },
    "questions": [
      {
        "id": "q-39-1",
        "type": "exact",
        "question": "What 4-letter acronym represents centralized software platforms that collect, aggregate, and analyze security logs from across an enterprise (e.g. Splunk)?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "SIEM"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Security Information and Event Management.",
        "explanation": "SIEM stands for Security Information and Event Management."
      },
      {
        "id": "q-39-2",
        "type": "multiple-choice",
        "question": "In which phase of the Incident Response lifecycle does the security team isolate an infected computer from the network to stop malware from spreading laterally?",
        "options": [
          "Preparation",
          "Containment",
          "Recovery",
          "Eradication"
        ],
        "correctIndex": 1,
        "hint": "Containing the damage.",
        "explanation": "The Containment phase isolates compromised systems to limit the blast radius."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Search access log for attacks",
        "instruction": "Execute `grep -E \"\\.\\./\" access.log` in the terminal.",
        "hints": [
          "Type: `grep -E \"\\.\\./\" access.log`"
        ]
      }
    ],
    "securityConnection": "In **Lab 09 (lab-logs)**, you act as an incident responder investigating a breached enterprise server. You analyze Apache `access.log` to track an attacker who exploited directory traversal to upload a web shell, and search `auth.log` for failed passwords to identify the attacker's external brute-force IP.",
    "id": "room-39",
    "nextRoomId": "room-40"
  },
  {
    "stage": 7,
    "level": 7,
    "levelTitle": "Level 7 \u2014 First Practical Security Labs",
    "title": "Linux Command-Line Investigation",
    "difficulty": "Practical",
    "difficultyBadge": "\ud83d\udd34 Practical",
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
      {
        "term": "Triage",
        "definition": "The rapid assessment and initial inspection of a target system to determine its state, user context, and security posture."
      },
      {
        "term": "Artifact",
        "definition": "A piece of digital forensic evidence left on a computer (log entry, temporary file, bash history, downloaded script)."
      },
      {
        "term": "Flag Token",
        "definition": "A unique secret cryptographic string (e.g. flag{...}) hidden in practical labs to prove you successfully solved an objective."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
    "lessons": [
      {
        "title": "1. The 5-Step System Triage Methodology",
        "content": "Whenever you land on an unknown terminal, execute this standard 5-step triage sequence:\n\n1. `whoami`: What user account am I running as?\n2. `id`: What groups and privileges do I possess?\n3. `pwd`: Where on the disk am I located?\n4. `uname -a`: What OS distribution and kernel version is running?\n5. `ls -la`: What files, hidden dots, and subfolders exist in my current location?"
      },
      {
        "title": "2. Investigating Hidden Clues",
        "content": "On Unix systems, files beginning with a dot (like `.bash_history` or `.env`) are hidden from standard `ls` output. Attackers and developers frequently hide API keys, credentials, and test notes in hidden files:\n\n`cadet@endlessus:~$ ls -la`\n\nAlways inspect the contents of `.bash_history`\u2014it reveals what commands the previous administrator or attacker executed before you arrived!"
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
        "acceptedAnswers": [
          "history"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
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
        "hints": [
          "Type: `whoami && pwd && ls -la`"
        ]
      }
    ],
    "securityConnection": "In real-world incident response, capturing terminal history and inspecting current directory state without modifying file access times (preserving timestamps) is critical for courtroom admissibility of digital evidence.",
    "id": "room-40",
    "nextRoomId": "room-41"
  },
  {
    "stage": 7,
    "level": 7,
    "levelTitle": "Level 7 \u2014 First Practical Security Labs",
    "title": "File & Permission Auditing (Practical Lab 02)",
    "difficulty": "Practical",
    "difficultyBadge": "\ud83d\udd34 Practical",
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
      {
        "term": "World-Writable",
        "definition": "A file permission state where any user account on the entire system can modify or wipe the file contents (permissions ending in -w- or octal 2/6/7)."
      },
      {
        "term": "Hardening",
        "definition": "The defensive process of securing a system by reducing its vulnerability surface and enforcing strict least-privilege permissions."
      },
      {
        "term": "stat",
        "definition": "A Linux utility that displays detailed inode and status information about a file, including exact octal permission values."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
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
        "acceptedAnswers": [
          "600"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
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
    "securityConnection": "This lab directly mirrors **Lab 02: Linux Permissions & Octal Masking** (`lab-permissions`) in the Endlessus terminal engine. Completing it grants practical XP and reinforces system administration best practices.",
    "id": "room-41",
    "nextRoomId": "room-42"
  },
  {
    "stage": 7,
    "level": 7,
    "levelTitle": "Level 7 \u2014 First Practical Security Labs",
    "title": "HTTP Security Headers Auditing (Practical Lab 01)",
    "difficulty": "Practical",
    "difficultyBadge": "\ud83d\udd34 Practical",
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
      {
        "term": "SSL Stripping",
        "definition": "An attack where an adversary intercepts HTTP traffic and prevents the browser from upgrading to secure HTTPS."
      },
      {
        "term": "Clickjacking",
        "definition": "A visual deception attack where an attacker overlays transparent iframes over legitimate buttons to trick users into clicking unintended links."
      },
      {
        "term": "Header Pipeline",
        "definition": "Piping curl header queries directly into grep filter expressions to automate compliance checks."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <rect x=\"30\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"105\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Web Browser</text>\n  <text x=\"105\" y=\"95\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">(Client)</text>\n\n  <!-- Request -->\n  <line x1=\"180\" y1=\"60\" x2=\"420\" y2=\"60\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"420,60 410,55 410,65\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"52\" fill=\"#38bdf8\" font-size=\"11\" text-anchor=\"middle\">GET /login.html HTTP/1.1</text>\n\n  <!-- Response -->\n  <line x1=\"420\" y1=\"100\" x2=\"180\" y2=\"100\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"180,100 190,95 190,105\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"118\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">HTTP/1.1 200 OK (HTML Payload)</text>\n\n  <rect x=\"420\" y=\"30\" width=\"150\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"495\" y=\"70\" fill=\"#f8fafc\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Nginx Server</text>\n  <text x=\"495\" y=\"95\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Port 80 / 443</text>\n</svg>",
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
        "acceptedAnswers": [
          "-I",
          "--head"
        ],
        "caseSensitive": true,
        "trimWhitespace": true,
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
    "securityConnection": "This lab directly maps to **Lab 01: HTTP Security Headers Hardening** (`lab-headers`), allowing you to practice real-world web server hardening and verify flags directly in the platform.",
    "id": "room-42",
    "nextRoomId": "room-43"
  },
  {
    "stage": 7,
    "level": 7,
    "levelTitle": "Level 7 \u2014 First Practical Security Labs",
    "title": "Network Service & Port Reconnaissance (Practical Lab 08)",
    "difficulty": "Practical",
    "difficultyBadge": "\ud83d\udd34 Practical",
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
      {
        "term": "Nmap (Network Mapper)",
        "definition": "The industry-standard open-source network scanner used for network discovery and vulnerability assessment."
      },
      {
        "term": "SYN Scan (-sS)",
        "definition": "A fast, stealthy port scanning technique that sends SYN packets and measures responses without completing the full TCP handshake."
      },
      {
        "term": "Version Detection (-sV)",
        "definition": "An Nmap scan feature that probes open ports to determine the exact software name and version number running."
      },
      {
        "term": "SMB (Server Message Block)",
        "definition": "A network file sharing protocol operating on port 445 widely used in Windows and Linux environments."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 200\" width=\"100%\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0f172a;border-radius:8px;font-family:monospace;\">\n  <line x1=\"120\" y1=\"30\" x2=\"120\" y2=\"180\" stroke=\"#38bdf8\" stroke-width=\"3\"/>\n  <text x=\"120\" y=\"22\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Client (You)</text>\n  \n  <line x1=\"480\" y1=\"30\" x2=\"480\" y2=\"180\" stroke=\"#10b981\" stroke-width=\"3\"/>\n  <text x=\"480\" y=\"22\" fill=\"#10b981\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">Target Server</text>\n\n  <!-- Step 1 SYN -->\n  <line x1=\"120\" y1=\"60\" x2=\"480\" y2=\"80\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <polygon points=\"480,80 470,75 470,85\" fill=\"#f59e0b\"/>\n  <text x=\"300\" y=\"65\" fill=\"#f59e0b\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">1. SYN (Synchronize seq=100)</text>\n\n  <!-- Step 2 SYN-ACK -->\n  <line x1=\"480\" y1=\"105\" x2=\"120\" y2=\"125\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"120,125 130,120 130,130\" fill=\"#38bdf8\"/>\n  <text x=\"300\" y=\"110\" fill=\"#38bdf8\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">2. SYN-ACK (ack=101 seq=300)</text>\n\n  <!-- Step 3 ACK -->\n  <line x1=\"120\" y1=\"150\" x2=\"480\" y2=\"170\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"480,170 470,165 470,175\" fill=\"#10b981\"/>\n  <text x=\"300\" y=\"155\" fill=\"#10b981\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">3. ACK (Connection Established)</text>\n</svg>",
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
        "acceptedAnswers": [
          "nmap"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
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
    "securityConnection": "This lab directly maps to **Lab 08: Network Service & SMB Enumeration** (`lab-network`), providing safe hands-on experience scanning live targets and extracting information from unauthenticated network services.",
    "id": "room-43",
    "nextRoomId": "room-44"
  },
  {
    "stage": 7,
    "level": 7,
    "levelTitle": "Level 7 \u2014 First Practical Security Labs",
    "title": "Security Incident Log Analysis (Practical Lab 09)",
    "difficulty": "Practical",
    "difficultyBadge": "\ud83d\udd34 Practical",
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
      {
        "term": "Web Shell",
        "definition": "A malicious script (PHP, ASP, JSP) uploaded to a web server that provides an attacker with remote command execution capabilities through a web browser."
      },
      {
        "term": "Brute-Force Attack",
        "definition": "An automated trial-and-error attack that systematically attempts thousands of username and password combinations until the correct one is found."
      },
      {
        "term": "auth.log",
        "definition": "The standard Linux authentication log file (`/var/log/auth.log`) that records all user logins, failed passwords, and sudo executions."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
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
        "acceptedAnswers": [
          "auth.log"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
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
    "securityConnection": "This lab directly maps to **Lab 09: Security Incident Log Analysis** (`lab-logs`), giving you practical experience tracking real attack sequences through log files.",
    "id": "room-44",
    "nextRoomId": "room-45"
  },
  {
    "stage": 7,
    "level": 7,
    "levelTitle": "Level 7 \u2014 First Practical Security Labs",
    "title": "Pre Security Capstone Challenge (Practical Lab 13)",
    "difficulty": "Practical",
    "difficultyBadge": "\ud83d\udd34 Practical",
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
      {
        "term": "Capstone",
        "definition": "A comprehensive culminating project that integrates and tests all skills learned across an entire curriculum."
      },
      {
        "term": "Lateral Movement",
        "definition": "Techniques an attacker uses to extend access to other systems and accounts across a network."
      },
      {
        "term": "Privilege Escalation",
        "definition": "The act of exploiting a bug, design flaw, or configuration oversight in an operating system to gain elevated access (root / SYSTEM)."
      }
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" width=\"100%\" height=\"160\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#0b0f19;border-radius:8px;font-family:monospace;\">\n  <rect x=\"20\" y=\"25\" width=\"160\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <text x=\"100\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Learner (You)</text>\n  <text x=\"100\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Input Command</text>\n  <text x=\"100\" y=\"110\" fill=\"#38bdf8\" font-size=\"12\" text-anchor=\"middle\">whoami</text>\n  \n  <path d=\"M 180 80 L 230 80\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n  <polygon points=\"230,80 220,75 220,85\" fill=\"#38bdf8\"/>\n  \n  <rect x=\"230\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Shell (Bash)</text>\n  <text x=\"305\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Parses Command</text>\n  <text x=\"305\" y=\"110\" fill=\"#10b981\" font-size=\"11\" text-anchor=\"middle\">Executes /usr/bin</text>\n\n  <path d=\"M 380 80 L 430 80\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <polygon points=\"430,80 420,75 420,85\" fill=\"#10b981\"/>\n  \n  <rect x=\"430\" y=\"25\" width=\"150\" height=\"110\" rx=\"6\" fill=\"#1e293b\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"505\" y=\"65\" fill=\"#f8fafc\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Linux Kernel</text>\n  <text x=\"505\" y=\"90\" fill=\"#94a3b8\" font-size=\"11\" text-anchor=\"middle\">Queries User ID</text>\n  <text x=\"505\" y=\"110\" fill=\"#f59e0b\" font-size=\"12\" text-anchor=\"middle\">Output: cadet</text>\n</svg>",
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
        "acceptedAnswers": [
          "-perm"
        ],
        "caseSensitive": true,
        "trimWhitespace": true,
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
    "securityConnection": "This capstone directly maps to **Lab 13: Capstone Pentest: Final Enterprise Target** (`lab-capstone`), bringing together all Pre Security foundations into a cohesive hands-on achievement!",
    "id": "room-45",
    "nextRoomId": null
  }
];

const PRE_SECURITY_ROOM_MAP = {};
PRE_SECURITY_ROOMS.forEach(r => { PRE_SECURITY_ROOM_MAP[r.id] = r; });

const PRE_SECURITY_LAB_MAP = {
  "room-41": {
    "id": "lab-permissions",
    "title": "Lab 02: Linux Permissions & Octal Masking",
    "desc": "Audit permissions and isolate credential stores in a real Linux terminal."
  },
  "room-42": {
    "id": "lab-headers",
    "title": "Lab 01: HTTP Security Headers Hardening",
    "desc": "Configure CSP, HSTS, and X-Frame-Options headers on live web servers."
  },
  "room-43": {
    "id": "lab-network",
    "title": "Lab 08: Network Service & SMB Enumeration",
    "desc": "Enumerate open ports with Nmap and extract null-session SMB shares."
  },
  "room-44": {
    "id": "lab-logs",
    "title": "Lab 09: Security Incident Log Analysis",
    "desc": "Analyze Apache and auth.log to detect attacker brute-force activity."
  },
  "room-45": {
    "id": "lab-capstone",
    "title": "Lab 13: Capstone Pentest: Final Enterprise Target",
    "desc": "Execute a full-scope authorized penetration test on an enterprise target."
  }
};

// Maintain backward-compatibility aliases
const ENDLESSUS_STAGES = PRE_SECURITY_LEVELS;
const ENDLESSUS_ROOMS = PRE_SECURITY_ROOMS;
const ENDLESSUS_ROOM_MAP = PRE_SECURITY_ROOM_MAP;
const ROOM_TO_PRACTICAL_LAB = PRE_SECURITY_LAB_MAP;

if (typeof window !== 'undefined') {
  window.PRE_SECURITY_LEVELS = PRE_SECURITY_LEVELS;
  window.PRE_SECURITY_ROOMS = PRE_SECURITY_ROOMS;
  window.PRE_SECURITY_ROOM_MAP = PRE_SECURITY_ROOM_MAP;
  window.PRE_SECURITY_LAB_MAP = PRE_SECURITY_LAB_MAP;
  window.ENDLESSUS_STAGES = ENDLESSUS_STAGES;
  window.ENDLESSUS_ROOMS = ENDLESSUS_ROOMS;
  window.ENDLESSUS_ROOM_MAP = ENDLESSUS_ROOM_MAP;
  window.ROOM_TO_PRACTICAL_LAB = ROOM_TO_PRACTICAL_LAB;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PRE_SECURITY_LEVELS,
    PRE_SECURITY_ROOMS,
    PRE_SECURITY_ROOM_MAP,
    PRE_SECURITY_LAB_MAP,
    ENDLESSUS_STAGES,
    ENDLESSUS_ROOMS,
    ENDLESSUS_ROOM_MAP,
    ROOM_TO_PRACTICAL_LAB
  };
}
