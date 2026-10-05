// curriculum/stage1.js
module.exports = [
  {
    id: "room-02",
    stage: 1,
    stageTitle: "Stage 1 — Computer Fundamentals",
    title: "How Computers Work",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "20 min",
    prerequisites: "Room 01 (Welcome to Cybersecurity)",
    whyAreYouHere: "You cannot secure or attack a computer if you don't know what happens inside the box. Before looking at exploits, you need to understand the physical and logical components: how binary data travels through the motherboard, how the CPU executes machine instructions, and why RAM is fundamentally different from hard drive storage.",
    objectives: [
      "Understand the primary hardware components: CPU, RAM, Storage, and Motherboard",
      "Learn how binary (0s and 1s) represents text, numbers, and machine instructions",
      "Differentiate between volatile memory (RAM) and non-volatile persistence (SSD/HDD)",
      "Understand what happens when a program is loaded from disk into memory to become a process"
    ],
    vocabulary: [
      { term: "CPU (Central Processing Unit)", definition: "The brain of the computer that fetches, decodes, and executes program instructions billions of times per second." },
      { term: "RAM (Random Access Memory)", definition: "Fast, temporary (volatile) workspace memory where active programs and data live while the computer is turned on." },
      { term: "Storage (SSD/HDD)", definition: "Persistent (non-volatile) storage that retains your files, operating system, and programs even when powered off." },
      { term: "Binary", definition: "The base-2 numbering system consisting only of 0s and 1s that digital circuits use to represent all information." },
      { term: "Program", definition: "A static collection of compiled instructions stored on disk waiting to be run." },
      { term: "Process", definition: "An actively executing instance of a program loaded into RAM with its own allocated memory space." }
    ],
    lessons: [
      {
        title: "1. The Core Architecture",
        content: `Every computing device — from a smart thermostat to a cloud server — relies on four primary components:
• **CPU (The Brain)**: Executes machine instructions in arithmetic, logic, and control loops.
• **RAM (The Desk)**: Fast working memory. When you open an app, its code and working variables are copied from your drive into RAM so the CPU can read them in nanoseconds. When power turns off, RAM is wiped clean!
• **Storage (The Filing Cabinet)**: Your NVMe SSD or hard drive. It is slower than RAM but remembers data permanently.
• **Motherboard (The Nervous System)**: The printed circuit board with high-speed buses connecting CPU, RAM, and storage together.`
      },
      {
        title: "2. From File on Disk to Active Process",
        content: `When you run a program like \`nmap\`:
1. **Disk**: The operating system reads the program binary file from storage.
2. **RAM Allocation**: The OS allocates a block of RAM for code, global variables, stack, and heap.
3. **CPU Execution**: The CPU's Instruction Pointer points to the program entry point and begins executing assembly instructions one by one.`
      }
    ],
    seeExamples: [
      {
        title: "Lifecycle of a Running Program",
        codeOrDiagram: `[ Storage: /bin/ls (Static File on SSD) ]
                 ↓ Loaded into RAM
[ RAM: Process PID #4092 (Virtual Memory Space) ]
                 ↓
[ CPU: Fetches opcodes -> Executes instructions -> Prints output ]`,
        explanation: "A file on storage becomes an active process once it is mapped into RAM and scheduled onto the CPU."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Check the current memory status of our lab system using the standard Linux command `free -m`:",
      initialCommand: "",
      expectedCommand: "free -m",
      simulatedOutput: "               total        used        free      shared  buff/cache   available\nMem:            7924        1840        4210         124        1874        5710\nSwap:           2048           0        2048\n[+] Success! You inspected system RAM. Total: 7924MB (~8GB), Free: 4210MB (~4.2GB).",
      explanation: "`free -m` displays memory usage in Megabytes (MB). This lets security analysts detect memory exhaustion or stealthy malware consuming RAM."
    },
    questions: [
      {
        id: "r2-q1",
        type: "multiple-choice",
        question: "When a computer loses electrical power abruptly, which component immediately loses all of its stored data?",
        options: [
          "NVMe Solid State Drive (SSD)",
          "Random Access Memory (RAM)",
          "Magnetic Hard Disk Drive (HDD)",
          "Motherboard BIOS / UEFI Flash Chip"
        ],
        correctIndex: 1,
        explanation: "RAM is volatile memory. Without electrical charge, dynamic RAM capacitors quickly discharge, clearing all active data."
      },
      {
        id: "r2-q2",
        type: "multiple-choice",
        question: "What is the technical term for a program that has been loaded into memory and is currently being executed by the CPU?",
        options: [
          "A Script",
          "A Process",
          "A Package",
          "A Driver"
        ],
        correctIndex: 1,
        explanation: "A static file on disk is a program; once loaded into RAM and scheduled for CPU execution, it is an active process with a Process ID (PID)."
      }
    ],
    tasks: [
      {
        title: "Task 1: Inspect System Memory",
        instruction: "Run `free -m` in the terminal to inspect available RAM on the lab machine.",
        hints: [
          "Concept: Memory utilization command.",
          "Direction: Use the Linux command for free memory.",
          "Tool: `free` command.",
          "Syntax: `free -m` (displays values in megabytes).",
          "Explanation: Output reveals total, used, and free memory."
        ]
      }
    ],
    explainResult: "The `free -m` command queried the Linux virtual kernel file `/proc/meminfo`, parsed the current physical memory pages, and presented the data in easy-to-read megabytes.",
    securityConnection: "In digital forensics and incident response, RAM holds unencrypted passwords, decrypted cryptographic keys, and running malware artifacts that may never touch the hard disk! Forensic examiners perform 'RAM acquisition' before powering down a compromised server.",
    completion: {
      learned: [
        "Hardware hierarchy: CPU, RAM, Storage, and Motherboard",
        "The difference between volatile memory and non-volatile storage",
        "How binary represents instructions and data",
        "The distinction between a static program file and an active process"
      ],
      practiced: [
        "free -m",
        "Interpreting memory tables",
        "Identifying volatile artifacts"
      ]
    },
    nextRoomId: "room-03"
  },

  {
    id: "room-03",
    stage: 1,
    stageTitle: "Stage 1 — Computer Fundamentals",
    title: "Operating Systems & The Kernel",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "25 min",
    prerequisites: "Room 02 (How Computers Work)",
    whyAreYouHere: "Applications cannot talk directly to raw silicon; doing so would allow any program to corrupt other programs or damage hardware. The Operating System (OS) is the master coordinator. In this room, you will learn how the kernel protects hardware, what system calls are, and why Linux powers the vast majority of cybersecurity infrastructure and cloud servers.",
    objectives: [
      "Understand what an Operating System does",
      "Learn the difference between Kernel Space and User Space",
      "Understand how applications make System Calls (syscalls) to request privileged actions",
      "Compare Windows architecture with Linux architecture",
      "Inspect the running kernel version on your system"
    ],
    vocabulary: [
      { term: "Kernel", definition: "The core program of the operating system that runs with supreme hardware privilege (Ring 0) and controls CPU, memory, and devices." },
      { term: "User Space", definition: "The restricted memory space (Ring 3) where regular user programs and applications run without direct hardware access." },
      { term: "System Call (syscall)", definition: "The controlled bridge an application uses to ask the kernel to perform a privileged action (like reading a file or sending a packet)." },
      { term: "Device Driver", definition: "A specialized kernel module that translates generic OS commands into hardware-specific signals for a particular device." },
      { term: "POSIX", definition: "A family of standards maintaining compatibility between Unix-like operating systems (including Linux, macOS, and BSD)." }
    ],
    lessons: [
      {
        title: "1. Kernel Space vs User Space",
        content: `Modern CPUs enforce hardware privilege rings:
• **Ring 0 (Kernel Space)**: Has direct, unrestricted access to all CPU instructions and physical memory. If code here crashes, the entire computer suffers a Blue Screen or Kernel Panic.
• **Ring 3 (User Space)**: Where your web browser, text editor, or game runs. If a program here crashes, only that single process terminates; the rest of the OS keeps running safely.`
      },
      {
        title: "2. How System Calls Protect the Machine",
        content: `When an app in User Space wants to read a file from the hard drive:
1. It cannot directly pulse the SSD controller.
2. It executes a **System Call** (such as \`sys_read\` in Linux).
3. The CPU transitions into Kernel Mode.
4. The kernel checks permissions: *Does this user have permission to open this file?*
5. If allowed, the kernel fetches the bytes and copies them back to the user app.`
      }
    ],
    seeExamples: [
      {
        title: "System Call Bridge Diagram",
        codeOrDiagram: `[ User Space (Ring 3) ]   User Application (e.g. cat secret.txt)
                                  ↓ syscall: open() & read()
====================== [ Protection Boundary ] ======================
[ Kernel Space (Ring 0) ] Linux Kernel checks permissions -> Reads Disk Controller`,
        explanation: "The OS boundary guarantees that malicious or broken programs cannot bypass filesystem permissions or access memory belonging to other users."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Find out which operating system and kernel version is running in your lab terminal using `uname -a`:",
      initialCommand: "",
      expectedCommand: "uname -a",
      simulatedOutput: "Linux endlessus-box 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux\n[+] Success! System identified: Linux 6.8.0 on x86_64 architecture.",
      explanation: "`uname -a` (Unix Name, all information) tells you the kernel name, hostname, kernel release version, architecture, and OS family."
    },
    questions: [
      {
        id: "r3-q1",
        type: "multiple-choice",
        question: "Why do modern operating systems strictly separate Kernel Space from User Space?",
        options: [
          "To allow web browsers to access physical memory directly for speed",
          "To prevent unprivileged user programs from crashing the entire system or bypassing security checks",
          "To eliminate the need for computer processors",
          "To make installing applications require physical USB keys"
        ],
        correctIndex: 1,
        explanation: "By isolating user programs from Ring 0, the OS ensures a bug or exploit in a user program cannot compromise the whole system without a kernel privilege escalation."
      },
      {
        id: "r3-q2",
        type: "multiple-choice",
        question: "When a user program needs to open a file or send data over the network, what mechanism does it use to request the kernel's assistance?",
        options: [
          "A System Call (syscall)",
          "A DNS query",
          "A BIOS flash",
          "An HTTP cookie"
        ],
        correctIndex: 0,
        explanation: "Applications use system calls (such as open, read, write, socket) to invoke privileged kernel services."
      }
    ],
    tasks: [
      {
        title: "Task 1: Query the Kernel Version",
        instruction: "Execute `uname -a` in the terminal to inspect the underlying kernel architecture.",
        hints: [
          "Concept: Command to print system information.",
          "Direction: Use `uname` with a flag.",
          "Tool: `uname` utility.",
          "Syntax: `uname -a` (the `-a` stands for 'all').",
          "Explanation: Output will show Linux kernel 6.8."
        ]
      }
    ],
    explainResult: "The `uname -a` utility executed the `uname()` system call, which retrieved the `utsname` structure directly from the active Linux kernel.",
    securityConnection: "Kernel version enumeration is a core step in vulnerability assessments. Outdated kernels often contain known privilege escalation vulnerabilities (like Dirty COW or Dirty Pipe) that allow a standard user to become root instantly.",
    completion: {
      learned: [
        "The purpose and responsibilities of the operating system",
        "Kernel Space (Ring 0) vs User Space (Ring 3)",
        "How system calls enforce security boundaries",
        "How to query operating system and kernel build details"
      ],
      practiced: [
        "uname -a",
        "Identifying kernel architecture",
        "Analyzing OS privilege levels"
      ]
    },
    nextRoomId: "room-04"
  },

  {
    id: "room-04",
    stage: 1,
    stageTitle: "Stage 1 — Computer Fundamentals",
    title: "Linux Fundamentals & Navigation",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "30 min",
    prerequisites: "Room 03 (Operating Systems)",
    whyAreYouHere: "Linux is the lingua franca of cybersecurity. Over 90% of the world's cloud servers, security tools (Nmap, Metasploit, Burp Suite), and testing platforms run on Linux. If you want to be a cybersecurity professional, navigating the Linux filesystem from a terminal must become second nature.",
    objectives: [
      "Understand the difference between a Terminal emulator and a Shell (Bash/Zsh)",
      "Master the Linux single-root filesystem hierarchy (`/`)",
      "Understand critical system directories: `/etc`, `/home`, `/var`, `/tmp`, and `/bin`",
      "Distinguish between Absolute Paths (`/home/cadet/file`) and Relative Paths (`./file`)",
      "Confidently use navigation commands: `pwd`, `ls`, `cd`, `cat`, `mkdir`, `cp`, `mv`, and `rm`"
    ],
    vocabulary: [
      { term: "Root Directory (`/`)", definition: "The top-most directory in the Linux hierarchy from which all other folders and mounted drives branch." },
      { term: "Absolute Path", definition: "A file path starting from the root directory (`/`), completely specifying location regardless of current working directory." },
      { term: "Relative Path", definition: "A path specified relative to where you currently are in the directory tree (e.g. `./notes.txt` or `../folder`)." },
      { term: "`/etc`", definition: "The system directory storing machine-wide configuration files (e.g. `/etc/passwd`)." },
      { term: "`/var/log`", definition: "The directory where system services write diagnostic and security event logs." },
      { term: "`/tmp`", definition: "A world-writable temporary directory wiped on reboot, often used by testers to stage scripts." }
    ],
    lessons: [
      {
        title: "1. The Inverted Tree Filesystem",
        content: `Unlike Windows with drive letters like \`C:\\\` or \`D:\\\`, Linux organizes everything under a single unified root slash: \`/\`.
• \`/bin\` & \`/usr/bin\`: Essential executable commands (ls, cat, ping).
• \`/etc\`: Configuration files for the OS and services.
• \`/home\`: Personal user folders (e.g., \`/home/cadet\`).
• \`/var\`: Variable data such as web roots (\`/var/www/html\`) and logs (\`/var/log\`).
• \`/tmp\`: Temporary files accessible by all users.`
      },
      {
        title: "2. Essential Command Vocabulary",
        content: `• \`pwd\`: *Print Working Directory* — tells you where you are standing right now.
• \`ls -la\`: *List files* — shows all files including hidden ones (starting with a dot \`.\`) with permissions and sizes.
• \`cd <dir>\`: *Change Directory* — moves your location. \`cd ..\` moves one level up; \`cd ~\` goes to your home folder.
• \`cat <file>\`: *Concatenate* — prints the entire contents of a file to your terminal screen.`
      }
    ],
    seeExamples: [
      {
        title: "Absolute vs Relative Navigation",
        codeOrDiagram: `cadet@endlessus:~$ pwd
/home/cadet

cadet@endlessus:~$ cd /etc/ssh     <-- Absolute path (starts with /)
cadet@endlessus:/etc/ssh$ pwd
/etc/ssh

cadet@endlessus:/etc/ssh$ cd ..    <-- Relative path (moves up one level)
cadet@endlessus:/etc$ pwd
/etc`,
        explanation: "Absolute paths work identically no matter where you are. Relative paths change meaning depending on your current working folder."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Print your current directory using `pwd`, then list all files in your home folder with `ls -la`:",
      initialCommand: "",
      expectedCommand: "ls -la",
      simulatedOutput: "total 28\ndrwxr-xr-x 4 cadet cadet 4096 Oct  5 16:30 .\ndrwxr-xr-x 3 root  root  4096 Oct  1 00:00 ..\n-rw-r--r-- 1 cadet cadet  220 Oct  5 16:30 .bash_logout\n-rw-r--r-- 1 cadet cadet 3771 Oct  5 16:30 .bashrc\n-rw-r--r-- 1 cadet cadet  807 Oct  5 16:30 .profile\ndrwxr-xr-x 2 cadet cadet 4096 Oct  5 16:30 mission_briefings\n-rw-r--r-- 1 cadet cadet   64 Oct  5 16:30 welcome.txt\n[+] Success! You listed directory contents including hidden dotfiles.",
      explanation: "Notice the files starting with `.` (like `.bashrc`). These are hidden configuration files in Linux."
    },
    questions: [
      {
        id: "r4-q1",
        type: "multiple-choice",
        question: "Which directory in a Linux system contains system-wide configuration files (such as network settings, installed service configs, and user databases)?",
        options: [
          "/tmp",
          "/bin",
          "/etc",
          "/dev"
        ],
        correctIndex: 2,
        explanation: "`/etc` (traditionally 'et cetera' or 'editable text configuration') contains host-specific configuration files."
      },
      {
        id: "r4-q2",
        type: "multiple-choice",
        question: "What does the special relative directory symbol `..` represent in Linux and Unix terminal navigation?",
        options: [
          "The user's home directory",
          "The parent directory (one level up in the hierarchy)",
          "The root directory `/`",
          "The current working directory"
        ],
        correctIndex: 1,
        explanation: "`..` points to the parent directory one level above your current location. A single dot `.` refers to the current directory."
      }
    ],
    tasks: [
      {
        title: "Task 1: Read a File",
        instruction: "Use `cat welcome.txt` in the terminal to view the contents of the introductory text file.",
        hints: [
          "Concept: Read a text file to standard output.",
          "Direction: Use the concatenate utility.",
          "Tool: `cat`",
          "Syntax: `cat welcome.txt`",
          "Explanation: `cat` reads the file and outputs its text lines."
        ]
      }
    ],
    explainResult: "The `cat` command opened `welcome.txt`, read its byte stream, and streamed it directly to standard output (STDOUT), displaying the text on your screen.",
    securityConnection: "Linux directory knowledge is critical in reconnaissance and exploitation. Security analysts frequently read `/etc/passwd` to enumerate system users, `/var/log/auth.log` to track brute-force attacks, and `/tmp` to stage penetration testing tools.",
    completion: {
      learned: [
        "The single-root Linux filesystem hierarchy",
        "The roles of `/etc`, `/var`, `/tmp`, and `/bin`",
        "The difference between absolute and relative paths",
        "Foundational commands: pwd, ls -la, cd, cat"
      ],
      practiced: [
        "pwd",
        "ls -la",
        "cat welcome.txt",
        "Reading directory listings"
      ]
    },
    nextRoomId: "room-05"
  },

  {
    id: "room-05",
    stage: 1,
    stageTitle: "Stage 1 — Computer Fundamentals",
    title: "Linux Users, Permissions & Processes",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Room 04 (Linux Fundamentals)",
    whyAreYouHere: "Linux is a multi-user operating system built around strict permissions. If every user could read every file, security would not exist. Understanding users, groups, read/write/execute permissions, and process management is the absolute foundation required for both system hardening and later Linux privilege escalation.",
    objectives: [
      "Understand User IDs (UIDs), Group IDs (GIDs), and the supreme `root` account",
      "Decode Linux permission strings (e.g., `-rwxr-xr--`)",
      "Learn octal permission values (Read = 4, Write = 2, Execute = 1)",
      "Modify permissions and ownership using `chmod` and `chown`",
      "Inspect and manage running processes using `ps aux` and `kill`"
    ],
    vocabulary: [
      { term: "root", definition: "The superuser account (UID 0) with unrestricted power to read/write/delete any file and execute any command on the system." },
      { term: "Permissions (rwx)", definition: "Access flags: Read (r=4), Write (w=2), and Execute (x=1) assigned to User (owner), Group, and Others." },
      { term: "chmod", definition: "The 'change mode' utility used to adjust read, write, and execute permissions on files and directories." },
      { term: "chown", definition: "The 'change owner' utility used to assign file ownership to another user or group." },
      { term: "PID (Process ID)", definition: "A unique numerical identifier assigned by the Linux kernel to every active running process." }
    ],
    lessons: [
      {
        title: "1. The Anatomy of a Permission String",
        content: `When you run \`ls -l\`, each file begins with a 10-character string:
\`- rwx r-x r--\`
• 1st char: File type (\`-\` for regular file, \`d\` for directory).
• Chars 2-4: **Owner (User)** permissions (\`rwx\` = read, write, execute).
• Chars 5-7: **Group** permissions (\`r-x\` = read and execute, no write).
• Chars 8-10: **Others (Everyone else)** permissions (\`r--\` = read-only).`
      },
      {
        title: "2. The Octal Numbering System",
        content: `Permissions are calculated using simple math:
• **Read (r)** = 4
• **Write (w)** = 2
• **Execute (x)** = 1
Add the numbers together for each triplet:
• \`rwx\` = 4 + 2 + 1 = **7**
• \`r-x\` = 4 + 0 + 1 = **5**
• \`r--\` = 4 + 0 + 0 = **4**
Therefore, \`chmod 754 script.sh\` gives Owner full control (7), Group read+execute (5), and Others read-only (4).`
      }
    ],
    seeExamples: [
      {
        title: "Permission Calculation Table",
        codeOrDiagram: `Binary   Octal   Symbolic   Meaning
  111      7       rwx      Read, Write, and Execute
  110      6       rw-      Read and Write
  101      5       r-x      Read and Execute
  100      4       r--      Read only
  000      0       ---      No permissions`,
        explanation: "Whenever you see `chmod 777`, it means everyone on the system can read, alter, or run that file — a massive security risk!"
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Inspect the permissions of a confidential report using `ls -l confidential.txt`, then restrict it so only the owner can read and write (`chmod 600 confidential.txt`):",
      initialCommand: "",
      expectedCommand: "chmod 600 confidential.txt",
      simulatedOutput: "-rw------- 1 cadet cadet 512 Oct  5 16:32 confidential.txt\n[+] Success! File restricted to owner only (Read + Write). Group and Others have zero access.",
      explanation: "Octal `600` means: Owner: 4+2=6 (rw-), Group: 0 (---), Others: 0 (---). Confidential files should always be protected this way."
    },
    questions: [
      {
        id: "r5-q1",
        type: "multiple-choice",
        question: "What numerical value corresponds to `chmod 755 filename`?",
        options: [
          "Owner: rwx, Group: r-x, Others: r-x",
          "Owner: rw-, Group: r--, Others: r--",
          "Owner: rwx, Group: rwx, Others: rwx",
          "Owner: ---, Group: rwx, Others: r-x"
        ],
        correctIndex: 0,
        explanation: "7 = 4+2+1 (rwx), 5 = 4+0+1 (r-x), 5 = 4+0+1 (r-x). This is the standard permission for public executables and scripts."
      },
      {
        id: "r5-q2",
        type: "multiple-choice",
        question: "What is the User ID (UID) of the `root` superuser on standard Linux systems?",
        options: [
          "UID 1000",
          "UID 1",
          "UID 0",
          "UID 999"
        ],
        correctIndex: 2,
        explanation: "UID 0 is hardcoded in the Unix/Linux kernel as the superuser `root`."
      }
    ],
    tasks: [
      {
        title: "Task 1: Fix Overly Permissive File",
        instruction: "Use `chmod 600 confidential.txt` to remove world permissions from the secret file.",
        hints: [
          "Concept: Use octal permissions to lock down access.",
          "Direction: 6 for user, 0 for group, 0 for others.",
          "Tool: `chmod`",
          "Syntax: `chmod 600 confidential.txt`",
          "Explanation: Sets -rw------- permissions."
        ]
      }
    ],
    explainResult: "The `chmod` command called the `chmod()` system call, modifying the file inode's permission bits in the ext4 filesystem metadata.",
    securityConnection: "Improper permissions are a primary cause of security compromises. Writable configuration files allow attackers to inject malicious commands, while world-readable private keys let adversaries impersonate administrators.",
    completion: {
      learned: [
        "The UID/GID user identity model and root superuser (UID 0)",
        "Decoding Linux permission strings (User, Group, Others)",
        "Calculating octal values (r=4, w=2, x=1)",
        "Using chmod to protect sensitive files"
      ],
      practiced: [
        "ls -l",
        "chmod 600",
        "Auditing file permissions"
      ]
    },
    nextRoomId: "room-06"
  }
];
