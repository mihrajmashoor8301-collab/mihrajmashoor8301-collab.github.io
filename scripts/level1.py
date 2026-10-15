# scripts/level1.py
# Level 1: Computer Fundamentals (Rooms 03 - 06)

from generate_pre_security import DIAGRAMS

def get_rooms():
    return [
        # Room 03: Computer Hardware & Architecture
        {
            "stage": 1,
            "level": 1,
            "levelTitle": "Level 1 — Computer Fundamentals",
            "title": "Computer Hardware & System Architecture",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Level 0: Start Here",
            "whyAreYouHere": "To defend or test computers, you must understand physical architecture. Every cybersecurity concept—from buffer overflows and malware execution to disk forensics—ultimately runs on hardware components: CPU registers, RAM memory cells, motherboards, and persistent storage.",
            "objectives": [
                "Understand the primary hardware components: CPU, RAM, Storage (SSD/HDD), Motherboard, and Peripherals",
                "Learn the von Neumann computer architecture and the Fetch-Decode-Execute cycle",
                "Understand the difference between volatile memory (RAM) and non-volatile storage (SSD/HDD)",
                "Differentiate 32-bit (x86) and 64-bit (x64) architectures and memory addressing limits",
                "Recognize how hardware architecture impacts cybersecurity and forensic analysis"
            ],
            "vocabulary": [
                {"term": "CPU (Central Processing Unit)", "definition": "The 'brain' of the computer that carries out instructions from computer programs through arithmetic, logic, and control operations."},
                {"term": "RAM (Random Access Memory)", "definition": "High-speed, volatile temporary memory used by the CPU to store actively running programs and data. Wiped when powered down."},
                {"term": "SSD / HDD (Storage)", "definition": "Non-volatile storage that retains files, operating system code, and data even when power is turned off."},
                {"term": "Motherboard", "definition": "The main printed circuit board (PCB) connecting the CPU, memory, storage drives, and peripheral expansion cards together."},
                {"term": "Architecture (32-bit vs 64-bit)", "definition": "The width of the CPU registers and memory bus. 32-bit systems can address a maximum of 4 GB of RAM, while 64-bit systems can address billions of gigabytes."}
            ],
            "diagramSvg": DIAGRAMS["hardware"],
            "lessons": [
                {
                    "title": "1. The Core Hardware Triangle: CPU, RAM, and Storage",
                    "content": "A computer fundamentally consists of three interacting systems:\n\n1. **The CPU (Central Processing Unit)**: The computation powerhouse. It executes billions of machine instructions every second (arithmetic, logic, memory jumps).\n2. **RAM (Random Access Memory)**: Ultra-fast volatile memory. When you launch a browser, the binary code is copied from your slow SSD into fast RAM so the CPU can execute it without waiting.\n3. **Storage (NVMe SSD / Hard Disk)**: Permanent, non-volatile storage where your operating system, files, and downloaded tools live.\n\n**Key Forensics Concept**: Turning off a computer completely erases everything in RAM ('volatile memory'). Forensic investigators take 'memory dumps' of running computers before pulling the power cord!"
                },
                {
                    "title": "2. 32-Bit vs 64-Bit Architecture",
                    "content": "You will often see software labeled as `x86` (32-bit) or `x64` / `x86_64` (64-bit):\n\n• **32-Bit**: The CPU can only address $2^{32}$ bytes of memory, which equals exactly **4 Gigabytes (GB)** of RAM. Modern operating systems have moved away from 32-bit because modern software needs much more memory.\n• **64-Bit**: The CPU registers are 64 bits wide ($2^{64}$ memory addresses), allowing theoretically 16 exabytes of RAM. 64-bit systems also have stronger security features like hardware-enforced Data Execution Prevention (DEP / NX bit)."
                },
                {
                    "title": "3. The Fetch-Decode-Execute Cycle",
                    "content": "Every program—whether it is a calculator, a video game, or a piece of ransomware—is broken down into machine code. The CPU repeatedly performs three steps millions of times per second:\n\n1. **Fetch**: Read the next instruction from memory at the address pointed to by the Instruction Pointer (IP / PC register).\n2. **Decode**: Interpret what operation to perform (add numbers, compare strings, move bytes).\n3. **Execute**: Perform the operation and store the result in a CPU register or write it back to RAM."
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
                    "acceptedAnswers": ["RAM", "Random Access Memory"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `uname -m`"]
                }
            ],
            "securityConnection": "In reverse engineering and binary exploitation, understanding CPU registers (like RIP/EIP, RSP/ESP) is essential. Attackers exploit buffer overflows by corrupting CPU memory pointers to redirect execution to malicious code."
        },

        # Room 04: Filesystems, Folders & Extensions
        {
            "stage": 1,
            "level": 1,
            "levelTitle": "Level 1 — Computer Fundamentals",
            "title": "Filesystems, Folders & File Types",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
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
                {"term": "Filesystem", "definition": "The method and data structures an operating system uses to control how data is stored and retrieved on a disk (e.g., ext4, NTFS)."},
                {"term": "File Extension", "definition": "The suffix at the end of a filename (e.g., .txt, .exe, .pdf) indicating the intended format to the user and GUI."},
                {"term": "Magic Bytes (File Signature)", "definition": "A unique sequence of bytes at the very beginning of a file that identifies its true file format, regardless of the extension."},
                {"term": "Inode", "definition": "A data structure in Unix/Linux filesystems that stores all metadata about a file (size, owner, permissions, disk location) except its name."},
                {"term": "Metadata", "definition": "Data that describes other data, such as file author, creation date, GPS location in photos, and modification timestamps."}
            ],
            "diagramSvg": DIAGRAMS["hardware"],
            "lessons": [
                {
                    "title": "1. How Filesystems Work",
                    "content": "A raw hard drive or SSD is just a sequence of billions of binary magnetic or electrical cells. Without a filesystem, the computer would have no way to know where one file begins and another ends!\n\nA **filesystem** (like Linux's `ext4` or Windows' `NTFS`) divides the disk into blocks, maintains a master directory table, and tracks which blocks belong to which file.\n\n• Windows uses drive letters (`C:\\`, `D:\\`).\n• Linux uses a single unified tree starting at the root directory (`/`)."
                },
                {
                    "title": "2. File Extensions vs Magic Bytes (Signatures)",
                    "content": "Operating systems like Windows rely heavily on **file extensions** (like `.png` or `.docx`) to choose which application opens a file. But file extensions can be renamed with a single click!\n\nIf an attacker renames a malicious executable `malware.exe` to `invoice.pdf`, Windows may show a PDF icon, but the file is still an executable!\n\nSecurity professionals identify file types using **Magic Bytes** (File Signatures)—the first 2 to 8 bytes inside the file header:\n\n• `89 50 4E 47` (`.PNG` in hex) indicates a PNG image.\n• `25 50 44 46` (`%PDF` in hex) indicates an authentic PDF document.\n• `4D 5A` (`MZ` in hex) indicates a Windows Portable Executable (`.exe` or `.dll`)."
                },
                {
                    "title": "3. File Metadata and Timestamps (MACB)",
                    "content": "Every file contains metadata tracked by the filesystem:\n\n• **M**odified: When file content was last changed.\n• **A**ccessed: When the file was last opened or read.\n• **C**hanged: When file permissions or ownership metadata changed (Unix).\n• **B**irth (Created): When the file was originally created on the disk.\n\nDigital forensic investigators use these timestamps to reconstruct attacker timelines during incident response."
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
                    "acceptedAnswers": ["file"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `file sample.bin`"]
                }
            ],
            "securityConnection": "Attackers frequently attempt file upload bypasses on web servers (e.g. uploading a PHP shell named `shell.php.jpg`). Secure applications must check both MIME type and header magic bytes rather than trusting the user-supplied filename."
        },

        # Room 05: Programs, Processes & Services
        {
            "stage": 1,
            "level": 1,
            "levelTitle": "Level 1 — Computer Fundamentals",
            "title": "Programs, Processes & Background Services",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
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
                {"term": "Program", "definition": "A passive collection of compiled instructions stored as a file on persistent disk storage."},
                {"term": "Process", "definition": "An active instance of a computer program being executed by the CPU, with allocated RAM, open files, and a unique PID."},
                {"term": "PID (Process ID)", "definition": "A unique numeric identifier assigned by the operating system kernel to each active process."},
                {"term": "Daemon / Service", "definition": "A background process that runs continuously without a graphical interface or interactive user login (e.g., web servers, SSH server)."},
                {"term": "Process Tree", "definition": "The hierarchical parent-child structure showing which process spawned which subordinate processes."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Program vs Process",
                    "content": "• **Program**: Like a recipe printed in a cookbook on your bookshelf. It sits on your hard disk consuming storage bytes, but it is not doing anything.\n• **Process**: The chef actively cooking that recipe in the kitchen. When you double-click or type a command to run a program, the operating system copies its instructions into RAM, creates CPU execution threads, and gives it a **Process ID (PID)**.\n\nYou can launch 10 separate windows of a text editor: that is **1 program file** on disk creating **10 distinct processes** in RAM!"
                },
                {
                    "title": "2. Parent and Child Processes",
                    "content": "Every process in an operating system is spawned by another process (its **Parent Process**):\n\n1. In Linux, the very first process started by the kernel is `systemd` or `init` (PID 1).\n2. When you open a terminal, `systemd` launches the terminal emulator (PID 1050).\n3. Inside the terminal, you run `bash` (PID 1052).\n4. In bash, you type `whoami`. Bash spawns a child process for `whoami` (PID 1100).\n\nIf a parent process terminates, its child processes may become 'orphaned' or automatically closed."
                },
                {
                    "title": "3. Background Services (Daemons)",
                    "content": "Most operating system tasks do not have windows or icons. They run silently in the background as **services** (called **daemons** in Linux, usually ending with 'd' like `sshd` or `httpd`):\n\n• `sshd`: Listens for incoming Secure Shell remote administrator connections on port 22.\n• `cron`: Executes scheduled tasks at specific dates and times.\n• `systemd-resolved`: Handles DNS lookups for apps in the background.\n\nSecurity monitoring tools watch for newly created services, because malware often installs persistent background services to maintain access across reboots."
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
                    "acceptedAnswers": ["PID", "Process ID"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `ps`"]
                }
            ],
            "securityConnection": "Attackers hide malicious processes through 'process hollowing' or 'DLL injection' into legitimate system processes like `svchost.exe` (on Windows). Threat hunters analyze anomalous parent-child relationships (e.g. Word spawning PowerShell: `winword.exe` -> `powershell.exe`) to catch malware in action."
        },

        # Room 06: Operating Systems & User Permissions
        {
            "stage": 1,
            "level": 1,
            "levelTitle": "Level 1 — Computer Fundamentals",
            "title": "Operating Systems & User Permissions",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
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
                {"term": "Kernel", "definition": "The core program of the operating system that has complete control over everything in the system, managing CPU, memory, and hardware devices."},
                {"term": "Kernel Mode (Ring 0)", "definition": "The privileged execution mode where code has direct, unrestricted access to all hardware and memory."},
                {"term": "User Mode (Ring 3)", "definition": "The restricted execution mode where applications run. If an app crashes in User Mode, the system stays safe."},
                {"term": "Superuser / root", "definition": "The supreme administrative account in Unix/Linux with UID 0, having unrestricted permission to modify any file, process, or setting."},
                {"term": "Principle of Least Privilege (PoLP)", "definition": "The security best practice that every user, process, and program should only have the minimum permissions necessary to perform its job."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Kernel Space vs User Space",
                    "content": "Modern computer processors enforce hardware protection rings:\n\n• **Ring 0 (Kernel Mode)**: The OS kernel executes here. It directly talks to physical RAM, SSD controllers, network cards, and CPU cores. A bug in Kernel Mode causes a system crash (Blue Screen of Death / Kernel Panic).\n• **Ring 3 (User Mode)**: All your everyday programs—web browsers, text editors, games—run here. They cannot touch hardware directly. When Chrome wants to read a file from disk, it must ask the kernel nicely using a **System Call (syscall)**.\n\nThe kernel checks: *Does this user have permission to read this file?* If yes, the kernel reads the bytes and passes them to Chrome. If no, it returns 'Permission Denied'!"
                },
                {
                    "title": "2. The Privilege Hierarchy: Standard User vs Root",
                    "content": "Operating systems isolate different people and processes through user accounts:\n\n• **Standard User (e.g. `cadet`)**: Can read and write their own home directory files (`/home/cadet`), but cannot touch other users' files, modify system configuration in `/etc`, or install kernel drivers.\n• **Superuser (`root` in Linux, `SYSTEM` / `Administrator` in Windows)**: Can read and delete ANY file on the system, shut down servers, capture raw network traffic, and reset all passwords.\n\nRunning everyday tasks as `root` is dangerous: if you accidentally download malware while logged in as root, the malware inherits root powers!"
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
                    "acceptedAnswers": ["0", "zero"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `id`"]
                }
            ],
            "securityConnection": "When an attacker discovers a vulnerability in a web server, they typically gain an initial foothold as an unprivileged user (like `www-data` or `cadet`). From there, the attacker's main goal is **Privilege Escalation** (PrivEsc)—exploiting misconfigurations, kernel bugs, or vulnerable SUID binaries to elevate from unprivileged user to `root`."
        }
    ]
