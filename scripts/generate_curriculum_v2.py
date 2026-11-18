#!/usr/bin/env python3
"""
CALION Academy — Authoritative Curriculum Generator (v2)
Generates the complete 4-stage, 47-room TryHackMe-style curriculum.
Stages:
  1. Pre-Security (10 Rooms)
  2. Cyber Security Foundations (10 Rooms)
  3. Defensive Security (12 Rooms)
  4. Offensive Security (15 Rooms)
Total: 47 comprehensive, fully-realized educational rooms.
"""

import json
import os

ROOMS_DATA = [
    # =========================================================================
    # STAGE 1: PRE-SECURITY (Rooms 01 to 10)
    # =========================================================================
    {
        "id": "room-01",
        "stageId": "pre-security",
        "stageTitle": "Pre-Security",
        "stageOrder": 1,
        "roomNumber": 1,
        "title": "Introduction to Computers",
        "description": "Understand how computer hardware, CPU architecture, memory hierarchies, and storage buses cooperate to execute code and process data.",
        "difficulty": "Beginner",
        "estimatedTime": "25 mins",
        "xpReward": 50,
        "prerequisites": "None",
        "objectives": [
            "Explain the von Neumann computer architecture and instruction fetch-decode-execute cycle",
            "Differentiate between volatile RAM and persistent storage (NVMe/SSD/HDD)",
            "Understand how CPU registers and cache levels (L1/L2/L3) mitigate the memory wall",
            "Identify how security boundaries depend on CPU privilege rings"
        ],
        "skillsGained": ["Hardware Architecture", "Memory Hierarchy", "CPU Execution Model", "Privilege Rings"],
        "toolsAndCommands": ["lscpu", "free -h", "lsblk", "dmidecode"],
        "tasks": [
            {
                "taskNumber": 1,
                "title": "Von Neumann Architecture & The Execution Cycle",
                "concept": "Modern general-purpose computers operate on the **von Neumann architecture**, where program instructions and data share the same addressable memory. The Central Processing Unit (CPU) continuously runs the **Instruction Cycle**: Fetching machine code instructions from RAM via the program counter, Decoding the opcode into micro-operations, and Executing the instruction inside the Arithmetic Logic Unit (ALU). Understanding this cycle is critical for cybersecurity because binary exploitation (such as buffer overflows) manipulates this exact execution flow to hijack the program counter.",
                "whyItMatters": "Every piece of software—including malicious code, kernel drivers, and cryptographic algorithms—ultimately executes on CPU silicon. Knowing how instructions cycle through registers explains how attackers hijack execution paths.",
                "examples": [
                    "Fetch: CPU reads instruction at address in RIP/EIP register into Instruction Register (IR)",
                    "Decode: Control unit decodes opcode (e.g., `0x89` for MOV)",
                    "Execute: ALU adds registers or transfers data across the internal bus"
                ],
                "commands": [
                    {"cmd": "lscpu", "desc": "Inspect CPU architecture, core topology, clock speeds, and hardware vulnerability mitigations"},
                    {"cmd": "cat /proc/cpuinfo", "desc": "Directly read Linux kernel CPU capabilities and feature flags (like NX/DEP, SSE, AVX)"}
                ],
                "guidedExercise": "Run `lscpu` in your terminal to view the physical architecture, byte ordering (endianness), and CPU flags.",
                "isFinalReview": False,
                "questions": [
                    {
                        "id": "q-01-1",
                        "type": "exact",
                        "question": "Which CPU register points to the memory address of the next instruction to be fetched and executed?",
                        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _",
                        "acceptedAnswers": ["Instruction Pointer", "program counter", "RIP", "EIP", "PC"],
                        "caseSensitive": False,
                        "trimWhitespace": True,
                        "hint": "Often abbreviated as PC or RIP/EIP in x86/x64 architecture.",
                        "explanation": "The Program Counter (PC), known as EIP in 32-bit x86 and RIP in 64-bit AMD64, holds the memory address of the next instruction to execute."
                    }
                ]
            },
            {
                "taskNumber": 2,
                "title": "Memory Hierarchy: Registers, Cache, RAM & Storage",
                "concept": "Computers rely on a strict memory hierarchy to balance speed and cost. At the fastest tier are **CPU Registers** (sub-nanosecond access), followed by **L1, L2, and L3 on-chip Caches**, **RAM (Random Access Memory)** (approx 60-80ns latency), and finally **Persistent Storage** (NVMe SSDs, SATA disks). In cybersecurity, data in RAM is volatile but often holds decrypted credentials, session tokens, and cryptographic keys. Cold-boot attacks and memory forensic acquisition (like Volatility) exploit the latency of DRAM decay to extract plaintext secrets.",
                "whyItMatters": "Security analysts constantly analyze physical memory dumps to find rootkits and active malware processes that never touch persistent disks.",
                "examples": [
                    "Registers: RAX, RBX, RCX, RDX directly inside the silicon core",
                    "L1/L2 Cache: Fast static RAM directly adjacent to execution pipelines",
                    "RAM: Dynamic RAM holding running processes and kernel pages",
                    "Disk: Non-volatile blocks where filesystems (ext4, NTFS) reside"
                ],
                "commands": [
                    {"cmd": "free -h", "desc": "Display total, used, and free physical RAM and swap space in human-readable units"},
                    {"cmd": "lsblk", "desc": "List block storage devices, partition tables, and mount points"}
                ],
                "guidedExercise": "Inspect memory usage with `free -h` to see how Linux categorizes cache and available memory.",
                "isFinalReview": False,
                "questions": [
                    {
                        "id": "q-01-2",
                        "type": "multiple-choice",
                        "question": "Why is volatile memory (RAM) critical during incident response investigations?",
                        "options": [
                            "RAM is permanent and never cleared when power is cut",
                            "RAM contains running process states, decrypted keys, and injected code not present on disk",
                            "RAM only stores operating system code, never user passwords",
                            "RAM is completely encrypted by hardware on all motherboards"
                        ],
                        "correctIndex": 1,
                        "hint": "Consider what happens to encrypted data when an application is running.",
                        "explanation": "When an application runs, encrypted data (passwords, keys, network buffers) must be decrypted in RAM to be processed by the CPU."
                    }
                ]
            },
            {
                "taskNumber": 3,
                "title": "CPU Privilege Rings & Isolation Architecture",
                "concept": "To prevent user applications from directly corrupting hardware or spying on other programs, modern CPUs implement hardware-enforced **Privilege Rings** (Ring 0 through Ring 3 in x86): \n- **Ring 0 (Kernel Mode):** Unrestricted access to hardware, device drivers, physical memory, and CPU control registers.\n- **Ring 3 (User Mode):** Restricted environment where user applications run. Any hardware access (disk, network, display) must be requested via a **System Call (syscall)** which triggers a context switch into Ring 0.",
                "whyItMatters": "Privilege escalation attacks seek to break out of Ring 3 and gain execution in Ring 0, where full system control is achieved.",
                "examples": [
                    "User Application (Browser) -> runs in Ring 3",
                    "OS Kernel (Linux / Windows Kernel) -> runs in Ring 0",
                    "Hypervisor (Type-1) -> runs in Ring -1 (VT-x / AMD-V)"
                ],
                "commands": [
                    {"cmd": "uname -r", "desc": "Print the currently running Linux kernel release version"},
                    {"cmd": "id", "desc": "Print real and effective user ID (UID) and group IDs (GID)"}
                ],
                "guidedExercise": "Verify user privilege levels by executing `id` to see if your session runs as root (UID 0) or standard user.",
                "isFinalReview": False,
                "questions": [
                    {
                        "id": "q-01-3",
                        "type": "exact",
                        "question": "What is the CPU privilege ring number associated with Kernel Mode in x86 architecture?",
                        "visualSlots": "_",
                        "acceptedAnswers": ["0", "Ring 0", "Ring0"],
                        "caseSensitive": False,
                        "trimWhitespace": True,
                        "hint": "The most privileged ring closest to the silicon.",
                        "explanation": "Ring 0 is the highest privilege level, reserved exclusively for the operating system kernel and core drivers."
                    }
                ]
            },
            {
                "taskNumber": 4,
                "title": "Task 4: Final Learning Review & Knowledge Synthesis",
                "concept": "You have completed your exploration of foundational computer architecture. Review the core pillars before advancing:\n- **Von Neumann Architecture:** Shared memory for instructions and data enables versatile software but requires strict boundaries (DEP/NX) to prevent code injection.\n- **Memory Latency vs Volatility:** Data travels from registers to cache, DRAM, and storage. Unsaved or ephemeral credentials reside in volatile memory.\n- **Hardware Isolation:** The CPU ring model enforces separation between user space (Ring 3) and kernel space (Ring 0) through vetted system calls.",
                "whyItMatters": "Mastering the physical substrate of computing ensures that future networking, operating system, and exploit concepts make immediate sense.",
                "examples": [
                    "Buffer Overflow: Overwriting saved instruction pointer on the call stack",
                    "Cold Boot Attack: Freezing DRAM chips to preserve volatile plaintext keys",
                    "Kernel Exploit: Bypassing Ring 3 restrictions to execute shellcode in Ring 0"
                ],
                "commands": [
                    {"cmd": "lscpu | grep Architecture", "desc": "Identify host CPU ISA (e.g. x86_64, aarch64)"},
                    {"cmd": "uptime", "desc": "Check system uptime, active sessions, and load averages"}
                ],
                "guidedExercise": "Perform a final synthesis check: review your understanding of privilege rings, execution cycles, and memory tiers.",
                "isFinalReview": True,
                "reviewSummary": {
                    "mainConcepts": "Von Neumann architecture, fetch-decode-execute cycle, memory hierarchy, volatility, and CPU privilege rings.",
                    "technicalTakeaways": "Processors enforce hardware rings; user space code cannot touch hardware without kernel system calls. RAM holds live decrypted secrets.",
                    "commandsCovered": ["lscpu", "free -h", "lsblk", "uname -r", "id"],
                    "commonMistakes": "Assuming RAM is permanent, or thinking user-mode applications can directly write to physical disk sectors without kernel mediation.",
                    "learningOutcome": "You can describe physical computer components, explain how CPU privilege rings protect the operating system, and trace how code executes."
                },
                "questions": [
                    {
                        "id": "q-01-4",
                        "type": "multiple-choice",
                        "question": "Which mechanism prevents a standard user-mode program from directly reading the master hard disk sectors?",
                        "options": [
                            "CPU Privilege Rings enforcing System Call mediation through Kernel Mode (Ring 0)",
                            "The computer's power supply limits voltage to user programs",
                            "Ethernet cables discard unauthorized packets",
                            "Hard drives only respond to USB input signals"
                        ],
                        "correctIndex": 0,
                        "hint": "Hardware rings block direct hardware IO instructions from Ring 3.",
                        "explanation": "Hardware privilege rings trap any privileged I/O instructions issued in Ring 3, forcing all storage access through operating system kernel drivers."
                    }
                ]
            }
        ]
    },

    # =========================================================================
    # ROOM 02: HOW THE INTERNET WORKS
    # =========================================================================
    {
        "id": "room-02",
        "stageId": "pre-security",
        "stageTitle": "Pre-Security",
        "stageOrder": 1,
        "roomNumber": 2,
        "title": "How the Internet Works",
        "description": "Demystify the global network: packet switching, IP routing, Autonomous Systems, BGP, DNS resolution, and undersea fiber-optic backbones.",
        "difficulty": "Beginner",
        "estimatedTime": "30 mins",
        "xpReward": 50,
        "prerequisites": "room-01",
        "objectives": [
            "Explain packet switching versus legacy circuit switching",
            "Trace how packets traverse local gateways, ISPs, and Autonomous Systems (AS)",
            "Understand the role of Border Gateway Protocol (BGP) in global path discovery",
            "Identify how traceroute measures network hops and latency using ICMP TTL expiration"
        ],
        "skillsGained": ["Packet Switching", "Global Routing", "BGP Mechanics", "Network Path Analysis"],
        "toolsAndCommands": ["traceroute", "ping -c 4", "dig", "whois"],
        "tasks": [
            {
                "taskNumber": 1,
                "title": "Packet Switching & The Decentralized Internet",
                "concept": "The Internet is a decentralized packet-switched network of interconnected networks. Unlike legacy telephone networks that dedicated a physical electrical wire for the duration of a call (circuit switching), the Internet breaks messages into small, standardized chunks called **Packets**. Each packet contains a header (source/destination IP addresses, sequence numbers) and a payload (data). Packets travel independently across multiple paths through intermediate routers and are reassembled at the destination.",
                "whyItMatters": "Packet switching allows high resilience: if one transatlantic fiber cable is cut, routers dynamically reroute packets across alternative paths.",
                "examples": [
                    "A 1 MB JPEG image is split into ~700 separate 1500-byte IP packets",
                    "Packet 1 might route via London while Packet 2 routes via Amsterdam",
                    "TCP reorders packets upon arrival using sequence numbers"
                ],
                "commands": [
                    {"cmd": "ping -c 4 8.8.8.8", "desc": "Send 4 ICMP Echo Request packets to verify IP connectivity and round-trip latency"},
                    {"cmd": "ip route", "desc": "Display local IP routing table and default gateway address"}
                ],
                "guidedExercise": "Run `ping -c 4 1.1.1.1` to measure the round-trip latency (RTT) of packets traveling to Cloudflare's public resolver.",
                "isFinalReview": False,
                "questions": [
                    {
                        "id": "q-02-1",
                        "type": "exact",
                        "question": "What fundamental networking paradigm divides data into discrete chunks that route independently?",
                        "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _ _ _ _",
                        "acceptedAnswers": ["packet switching", "packet-switching"],
                        "caseSensitive": False,
                        "trimWhitespace": True,
                        "hint": "Contrasted with circuit switching used by old telephone networks.",
                        "explanation": "Packet switching allows variable data packets to share communications links dynamically."
                    }
                ]
            },
            {
                "taskNumber": 2,
                "title": "Autonomous Systems, BGP & Global Routing",
                "concept": "The Internet is not a single entity; it is composed of over 70,000 distinct networks called **Autonomous Systems (AS)**, each identified by an ASN (Autonomous System Number) managed by Regional Internet Registries (RIRs like ARIN, RIPE). Internet Service Providers (ISPs), cloud hyperscalers (Google, AWS, Cloudflare), and telecommunications transit carriers connect at **Internet Exchange Points (IXPs)**. They exchange route information using the **Border Gateway Protocol (BGP)**. In cybersecurity, BGP lacks built-in cryptographic authentication by default, making it vulnerable to **BGP Hijacking**, where malicious AS announcements redirect entire nations' traffic.",
                "whyItMatters": "BGP route leaks and hijacking can redirect sensitive encrypted traffic to adversary infrastructure for passive decryption or analysis.",
                "examples": [
                    "AS15169: Google LLC",
                    "AS13335: Cloudflare Inc.",
                    "BGP Announcement: 'AS13335 can reach 1.1.1.0/24 with path length 1'"
                ],
                "commands": [
                    {"cmd": "whois -h whois.radb.net 1.1.1.1", "desc": "Query routing databases to find origin Autonomous System Number"},
                    {"cmd": "traceroute -n 8.8.8.8", "desc": "Trace the step-by-step router hops between your terminal and Google DNS"}
                ],
                "guidedExercise": "Execute `traceroute -n 8.8.8.8` to observe the sequence of intermediate IP router hops your traffic traverses.",
                "isFinalReview": False,
                "questions": [
                    {
                        "id": "q-02-2",
                        "type": "exact",
                        "question": "Which exterior gateway routing protocol is used by Autonomous Systems to exchange routing information across the Internet?",
                        "visualSlots": "_ _ _",
                        "acceptedAnswers": ["BGP", "Border Gateway Protocol"],
                        "caseSensitive": False,
                        "trimWhitespace": True,
                        "hint": "Three-letter acronym for Border Gateway Protocol.",
                        "explanation": "BGP (Border Gateway Protocol) is the postal service of the Internet, determining the most efficient paths between Autonomous Systems."
                    }
                ]
            },
            {
                "taskNumber": 3,
                "title": "Task 3: Final Learning Review & Knowledge Synthesis",
                "concept": "Review the core architecture of the global Internet:\n- **Decentralization:** No single switch controls the Internet. Routers inspect the destination IP address in the packet header and forward it toward the next hop.\n- **Autonomous Systems:** Large networks peer at IXPs and announce prefixes via BGP.\n- **Diagnostics with ICMP:** Tools like `ping` and `traceroute` rely on Internet Control Message Protocol (ICMP) and Time-To-Live (TTL) decrements to map path hops.",
                "whyItMatters": "Understanding global routing enables network security analysts to detect spoofing, intercept malicious traffic, and configure robust edge firewalls.",
                "examples": [
                    "TTL Expiration: Routers decrement the TTL field in IP headers by 1 at each hop; when TTL=0, an ICMP Time Exceeded packet is returned to sender",
                    "BGP Hijack: An attacker announces ownership of an IP block to eavesdrop on unencrypted communications"
                ],
                "commands": [
                    {"cmd": "ping -c 1 127.0.0.1", "desc": "Test loopback interface to verify local TCP/IP stack functionality"},
                    {"cmd": "traceroute -m 10 1.1.1.1", "desc": "Limit traceroute to 10 hops to inspect local ISP routing"}
                ],
                "guidedExercise": "Perform a final review of packet switching, BGP routing, and ICMP diagnostic mechanisms.",
                "isFinalReview": True,
                "reviewSummary": {
                    "mainConcepts": "Packet switching, IP packet headers, Autonomous Systems (AS), BGP peering, and ICMP diagnostic tools.",
                    "technicalTakeaways": "Packets route independently across Autonomous Systems. Routers decrement TTL; traceroute uses ICMP TTL expiration to map route hops.",
                    "commandsCovered": ["ping", "traceroute", "whois", "ip route"],
                    "commonMistakes": "Thinking the Internet is a continuous electrical circuit, or confusing local IP addressing with global BGP route propagation.",
                    "learningOutcome": "You can explain how packets travel across the global Internet, define Autonomous Systems, and use traceroute to audit network paths."
                },
                "questions": [
                    {
                        "id": "q-02-3",
                        "type": "multiple-choice",
                        "question": "How does `traceroute` determine the IP addresses of intermediate routers along a network path?",
                        "options": [
                            "It asks the destination server to email a log of visited routers",
                            "It sends packets with incrementally increasing Time-To-Live (TTL) values, capturing ICMP Time Exceeded responses from each hop",
                            "It uses GPS satellites to physically locate undersea fiber cables",
                            "It intercepts the local ISP's administrative password"
                        ],
                        "correctIndex": 1,
                        "hint": "Routers discard packets when TTL hits zero and notify the sender with an ICMP packet.",
                        "explanation": "Traceroute sends packets with TTL=1, TTL=2, TTL=3... Each subsequent router decrements TTL to 0, discards the packet, and sends back an ICMP Time Exceeded message, revealing its IP."
                    }
                ]
            }
        ]
    }
]

print("Script template ready.")
