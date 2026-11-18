#!/usr/bin/env python3
import json

# Define the curriculum catalog
CATALOG = [
    # STAGE 1 (Pre-Security)
    (1, "room-01", "pre-security", "Pre-Security", 1, "Introduction to Computers",
     "Understand computer hardware, CPU execution cycles, memory hierarchies, and hardware privilege rings.",
     "Beginner", "25 mins", 50, "None",
     ["Explain von Neumann architecture", "Differentiate RAM from persistent storage", "Understand CPU registers and caches", "Identify Ring 0 vs Ring 3 privileges"],
     ["Hardware Architecture", "Memory Hierarchy", "CPU Rings", "Syscall Interface"],
     ["lscpu", "free -h", "lsblk", "uname -r"],
     "room-02",
     [
         ("Von Neumann Architecture & The Execution Cycle",
          "Modern computers operate on the von Neumann model where program instructions and data share the same addressable memory. The CPU continuously cycles: Fetch from RAM into the Instruction Register, Decode opcode, and Execute inside the ALU. Buffer overflows exploit this model by overwriting the instruction pointer.",
          "Exploits alter the execution flow by controlling the instruction pointer (EIP/RIP).",
          ["Fetch: Read machine code at RIP into IR", "Decode: Translate opcode 0x90 to NOP", "Execute: Arithmetic logic unit computes result"],
          [{"cmd": "lscpu", "desc": "Inspect CPU topology and hardware security flags"}, {"cmd": "cat /proc/cpuinfo", "desc": "Check instruction extensions and mitigations"}],
          "Execute lscpu to identify processor architecture and security mitigations.",
          [{"id": "q-01-1", "type": "exact", "question": "Which CPU register points to the memory address of the next instruction to execute?", "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _", "acceptedAnswers": ["Instruction Pointer", "program counter", "RIP", "EIP", "PC"], "caseSensitive": False, "trimWhitespace": True, "hint": "Often abbreviated as PC, or RIP/EIP in x86/x64.", "explanation": "The Program Counter (PC / RIP) points to the next instruction in memory."}]
         ),
         ("Memory Hierarchy & Volatile Forensics",
          "Computers use a hierarchy: Registers (<1ns), L1-L3 Cache (1-10ns), RAM (60-80ns), and Persistent Storage (NVMe/SSD/HDD). Data in RAM is volatile but holds plaintext credentials, decrypted encryption keys, and active malware payloads. Live memory acquisition is essential during forensic investigation.",
          "Attackers often reside strictly in memory to bypass static disk antivirus scanners.",
          ["Registers: RAX, RBX, RCX directly inside CPU core", "RAM: Dynamic RAM holding running process pages", "Storage: ext4/NTFS file systems on disk"],
          [{"cmd": "free -h", "desc": "Display memory and swap allocation"}, {"cmd": "lsblk", "desc": "List block storage devices"}],
          "Run free -h to check available physical RAM and swap space.",
          [{"id": "q-01-2", "type": "multiple-choice", "question": "Why is RAM critical during incident response investigations?", "options": ["RAM is permanent and never cleared on reboot", "RAM contains running process memory, decrypted keys, and injected code not found on disk", "RAM cannot be analyzed by forensic tools", "RAM only contains operating system files"], "correctIndex": 1, "hint": "Running programs decrypt passwords and secrets in memory.", "explanation": "Volatile memory contains active process artifacts, decrypted keys, and memory-only malware."}]
         ),
         ("Privilege Rings & Final Knowledge Review",
          "Modern processors enforce hardware privilege rings: Ring 0 (Kernel Mode) has complete hardware control; Ring 3 (User Mode) runs user applications with restricted instructions. To access hardware or network sockets, Ring 3 apps invoke System Calls (syscalls).",
          "Privilege escalation attacks seek to elevate execution from Ring 3 to Ring 0.",
          ["Ring 0: Linux kernel and device drivers", "Ring 3: Browser, shell, user applications", "Syscalls: open(), read(), write(), socket()"],
          [{"cmd": "id", "desc": "Print active user ID and group permissions"}, {"cmd": "uname -a", "desc": "Print complete system kernel information"}],
          "Run id to view your current effective UID and group memberships.",
          [{"id": "q-01-3", "type": "exact", "question": "What is the CPU ring number corresponding to Kernel Mode in x86 architecture?", "visualSlots": "_", "acceptedAnswers": ["0", "Ring 0", "Ring0"], "caseSensitive": False, "trimWhitespace": True, "hint": "The most privileged inner ring.", "explanation": "Ring 0 is the highest privilege level, reserved exclusively for the OS kernel."}]
         )
     ],
     {"mainConcepts": "Von Neumann model, memory hierarchy, volatility, and CPU privilege rings.", "technicalTakeaways": "Processors enforce hardware rings; user space code cannot touch hardware without kernel system calls. RAM holds live decrypted secrets.", "commandsCovered": ["lscpu", "free -h", "lsblk", "uname -r", "id"], "commonMistakes": "Assuming RAM is permanent or thinking user applications can directly write to raw disk sectors.", "learningOutcome": "You can describe physical computer components, explain how CPU privilege rings protect the operating system, and trace how code executes."}
    ),

    (2, "room-02", "pre-security", "Pre-Security", 1, "How the Internet Works",
     "Explore the global packet-switched Internet, IP routing, Autonomous Systems, and BGP peering.",
     "Beginner", "30 mins", 50, "room-01",
     ["Differentiate packet switching from circuit switching", "Trace how packets traverse routers and Autonomous Systems", "Understand BGP peering mechanics", "Use traceroute and ping for path diagnosis"],
     ["Packet Switching", "Global Routing", "BGP Mechanics", "Path Diagnostics"],
     ["ping -c 4", "traceroute", "ip route", "whois"],
     "room-03",
     [
         ("Packet Switching & The Decentralized Internet",
          "The Internet breaks messages into discrete packets with standardized IP headers and payloads. Unlike old circuit-switched telephone lines that locked a dedicated wire, packets route independently across different intermediate routers and are reassembled at the destination.",
          "Packet switching ensures network survival even if intermediate nodes or cables fail.",
          ["A 1 MB file splits into ~700 packets", "Packets take varied physical routes", "TCP reassembles packets using sequence numbers"],
          [{"cmd": "ping -c 4 8.8.8.8", "desc": "Send ICMP Echo requests to verify reachability and latency"}, {"cmd": "ip route", "desc": "Display local routing table"}],
          "Use ping to measure round-trip time to a remote gateway.",
          [{"id": "q-02-1", "type": "exact", "question": "What networking paradigm breaks data into chunks that route independently?", "visualSlots": "_ _ _ _ _ _   _ _ _ _ _ _ _ _ _", "acceptedAnswers": ["packet switching", "packet-switching"], "caseSensitive": False, "trimWhitespace": True, "hint": "Contrasted with circuit switching.", "explanation": "Packet switching allows packets to traverse independent paths across the network."}]
         ),
         ("Autonomous Systems & BGP Routing",
          "The Internet is a federation of over 70,000 Autonomous Systems (AS) managed by ISPs, universities, and tech enterprises. AS networks peer at Internet Exchange Points (IXPs) and exchange path reachability using the Border Gateway Protocol (BGP). Because traditional BGP lacks authentication, adversaries can perform BGP hijacking.",
          "BGP route leaks can intercept or disrupt global network traffic.",
          ["AS15169: Google", "AS13335: Cloudflare", "BGP prefix announcement: 'AS13335 reaches 1.1.1.0/24'"],
          [{"cmd": "whois -h whois.radb.net 1.1.1.1", "desc": "Query routing registries for ASN info"}, {"cmd": "traceroute -n 8.8.8.8", "desc": "Trace intermediate router hops"}],
          "Run traceroute -n 8.8.8.8 to observe the sequence of router hops.",
          [{"id": "q-02-2", "type": "exact", "question": "Which routing protocol is used by Autonomous Systems to exchange routing data across the Internet?", "visualSlots": "_ _ _", "acceptedAnswers": ["BGP", "Border Gateway Protocol"], "caseSensitive": False, "trimWhitespace": True, "hint": "Three-letter acronym for Border Gateway Protocol.", "explanation": "BGP is the core routing protocol coordinating Autonomous Systems globally."}]
         ),
         ("ICMP Diagnostics & Final Knowledge Review",
          "Network diagnostics rely on the Internet Control Message Protocol (ICMP). Ping checks reachability via Echo Request/Reply. Traceroute works by sending packets with incrementing Time-To-Live (TTL) values; each router decrements TTL, and when TTL hits 0, it replies with an ICMP Time Exceeded packet, exposing its IP address.",
          "Network defenders monitor ICMP anomalies to spot network mapping and host sweeps.",
          ["TTL=1: First router responds", "TTL=2: Second router responds", "TTL reaches destination: Echo reply returned"],
          [{"cmd": "traceroute -m 10 1.1.1.1", "desc": "Trace up to 10 hops toward 1.1.1.1"}, {"cmd": "ping -c 1 127.0.0.1", "desc": "Verify local TCP/IP stack"}],
          "Trace hops toward a public DNS resolver and note the latency changes.",
          [{"id": "q-02-3", "type": "multiple-choice", "question": "How does traceroute discover intermediate router addresses?",
            "options": ["It asks the destination server to email a log of visited routers",
                        "It sends packets with incrementing TTL values, triggering ICMP Time Exceeded packets from each hop",
                        "It queries DNS for every router hostname",
                        "It intercepts the local ISP's administrative password"],
            "correctIndex": 1, "hint": "TTL decrements at each hop until it hits zero.",
            "explanation": "Traceroute increments TTL from 1 upward, causing each intermediate hop to return an ICMP Time Exceeded message."}]
         )
     ],
     {"mainConcepts": "Packet switching, Autonomous Systems (AS), BGP peering, and ICMP diagnostics.", "technicalTakeaways": "Packets route independently across Autonomous Systems. Routers decrement TTL; traceroute uses ICMP TTL expiration to map hops.", "commandsCovered": ["ping", "traceroute", "ip route", "whois"], "commonMistakes": "Confusing packet switching with circuit switching or assuming packets all take an identical physical path.", "learningOutcome": "You can explain how packets traverse the global Internet, define Autonomous Systems, and use traceroute to audit network paths."}
    ),

    (3, "room-03", "pre-security", "Pre-Security", 1, "Networking Fundamentals",
     "Master Local Area Networks (LAN), MAC addresses, IPv4 vs IPv6 addressing, and subnet masks.",
     "Beginner", "30 mins", 50, "room-02",
     ["Differentiate Layer 2 MAC addresses from Layer 3 IP addresses", "Understand IPv4 32-bit dot-decimal structure and private ranges", "Calculate subnet masks and network boundaries", "Inspect network interface configurations"],
     ["Layer 2 vs Layer 3", "IPv4 Addressing", "Subnet Calculations", "Interface Configuration"],
     ["ip addr", "ip link", "arp -a", "route -n"],
     "room-04",
     [
         ("MAC Addresses & Layer 2 Ethernet",
          "Every Network Interface Card (NIC) possesses a globally unique 48-bit physical address called a Media Access Control (MAC) address (e.g. 00:1A:2B:3C:4D:5E). The first 24 bits represent the Organizationally Unique Identifier (OUI) assigned to the manufacturer. Within a Local Area Network (LAN), switches forward Ethernet frames based strictly on MAC addresses.",
          "Adversaries use MAC spoofing to bypass network access controls and perform ARP poisoning attacks.",
          ["OUI: 00:1A:2B (Manufacturer)", "Device Identifier: 3C:4D:5E", "Broadcast MAC: FF:FF:FF:FF:FF:FF"],
          [{"cmd": "ip link show", "desc": "Display network interfaces and physical MAC addresses"}, {"cmd": "arp -n", "desc": "Display local ARP cache mapping IP addresses to MAC addresses"}],
          "Run ip link show to view your system's network interface names and MAC addresses.",
          [{"id": "q-03-1", "type": "exact", "question": "How many bits are in a standard physical Ethernet MAC address?", "visualSlots": "_ _", "acceptedAnswers": ["48", "48 bits", "48-bit"], "caseSensitive": False, "trimWhitespace": True, "hint": "Six hexadecimal octets (6 x 8 bits).", "explanation": "A standard MAC address is 48 bits (6 bytes) long, represented as 12 hexadecimal characters."}]
         ),
         ("IPv4 Addressing & Private Ranges (RFC 1918)",
          "An Internet Protocol version 4 (IPv4) address is a 32-bit numerical label written as four octets in dot-decimal notation (e.g., 192.168.1.1). RFC 1918 defines non-routable private IP ranges reserved for local networks: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Network Address Translation (NAT) maps private IPs to a public IP at the router boundary.",
          "Recognizing RFC 1918 private ranges is critical for scoping internal versus external penetration tests.",
          ["10.0.0.0 to 10.255.255.255 (Class A private)", "172.16.0.0 to 172.31.255.255 (Class B private)", "192.168.0.0 to 192.168.255.255 (Class C private)"],
          [{"cmd": "ip -br addr", "desc": "Show brief table of active network interfaces and IP addresses"}, {"cmd": "hostname -I", "desc": "Print host IP addresses"}],
          "Execute ip -br addr to view the local IP assigned to your interface.",
          [{"id": "q-03-2", "type": "multiple-choice", "question": "Which of the following IP addresses belongs to an RFC 1918 private network range?",
            "options": ["8.8.8.8", "192.168.1.50", "1.1.1.1", "151.101.1.69"],
            "correctIndex": 1, "hint": "Look for the common home router default subnet.",
            "explanation": "192.168.0.0/16 is explicitly defined by RFC 1918 as a private non-routable range."}]
         ),
         ("Subnets & Final Knowledge Review",
          "A Subnet Mask separates the network portion of an IP address from the host portion. In CIDR notation (Classless Inter-Domain Routing), /24 indicates 24 network bits (255.255.255.0), leaving 8 bits for hosts (256 addresses, with 254 usable after subtracting network and broadcast).",
          "Subnetting restricts broadcast domains and enables defensive network segmentation.",
          ["IP: 192.168.1.10/24", "Network: 192.168.1.0", "Broadcast: 192.168.1.255", "Usable hosts: 192.168.1.1 to 192.168.1.254"],
          [{"cmd": "ip route show", "desc": "Display local routing table and subnet scope"}, {"cmd": "ifconfig", "desc": "Legacy interface configuration display"}],
          "Calculate the number of usable hosts on a /24 subnet.",
          [{"id": "q-03-3", "type": "exact", "question": "How many usable host IP addresses are available on an IPv4 /24 subnet?", "visualSlots": "_ _ _", "acceptedAnswers": ["254"], "caseSensitive": False, "trimWhitespace": True, "hint": "2^8 minus 2 reserved addresses (network and broadcast).", "explanation": "A /24 subnet provides 256 addresses minus 2 reserved (network and broadcast) = 254 usable hosts."}]
         )
     ],
     {"mainConcepts": "Layer 2 MAC addresses, Layer 3 IPv4 addresses, RFC 1918 private ranges, and CIDR subnet masks.", "technicalTakeaways": "Switches use MAC addresses locally; routers use IP addresses globally. Subnet masks define local broadcast domains.", "commandsCovered": ["ip addr", "ip link", "arp -n", "ip route"], "commonMistakes": "Confusing a physical MAC address with an IP address, or forgetting to subtract 2 for usable hosts.", "learningOutcome": "You can inspect network interfaces, identify private vs public IP ranges, and calculate subnet capacities."}
    ),

    (4, "room-04", "pre-security", "Pre-Security", 1, "Network Protocols and Ports",
     "Demystify Layer 4 transport protocols: TCP reliable connections, the 3-Way Handshake, UDP datagrams, and standardized network ports.",
     "Beginner", "30 mins", 50, "room-03",
     ["Differentiate connection-oriented TCP from connectionless UDP", "Trace the TCP 3-Way Handshake (SYN, SYN-ACK, ACK)", "Memorize common standard service ports (22, 53, 80, 443)", "Inspect listening network sockets using ss and netstat"],
     ["TCP Mechanics", "UDP Characteristics", "Port Mapping", "Socket Inspection"],
     ["ss -tulpn", "netstat -tulpn", "nc -zv", "curl -I"],
     "room-05",
     [
         ("TCP vs UDP & The 3-Way Handshake",
          "At the Transport Layer (Layer 4), two primary protocols carry network data:\n- **TCP (Transmission Control Protocol):** Connection-oriented, guaranteed in-order delivery, flow control. Before sending data, TCP establishes a session via the **3-Way Handshake**: 1) Client sends SYN, 2) Server replies with SYN-ACK, 3) Client returns ACK.\n- **UDP (User Datagram Protocol):** Connectionless, lightweight, low-latency, no retransmission (fire-and-forget). Ideal for DNS, DHCP, and live video streaming.",
          "SYN Flood attacks exploit TCP handshake half-open states to exhaust server resources.",
          ["TCP: HTTP, SSH, FTP, HTTPS", "UDP: DNS queries, VoIP, DHCP, NTP", "SYN -> SYN-ACK -> ACK establishes state"],
          [{"cmd": "ss -ta", "desc": "List all active TCP sockets and connection states (ESTABLISHED, LISTEN, TIME_WAIT)"}, {"cmd": "ss -ua", "desc": "List active UDP sockets"}],
          "Use ss -ta to view currently established TCP connections on your machine.",
          [{"id": "q-04-1", "type": "exact", "question": "What flag does a server send back in response to an initial TCP SYN packet?", "visualSlots": "_ _ _ - _ _ _", "acceptedAnswers": ["SYN-ACK", "SYN/ACK", "SYN ACK"], "caseSensitive": False, "trimWhitespace": True, "hint": "Synchronize-Acknowledgment flag combination.", "explanation": "The server acknowledges the client's SYN and synchronizes its own sequence number with SYN-ACK."}]
         ),
         ("Common Ports & Service Identification",
          "Port numbers (0 to 65535) direct incoming network packets to the specific application listening on a host. Ports 0–1023 are Well-Known System Ports; 1024–49151 are Registered Ports; 49152–65535 are Ephemeral/Dynamic Ports.\nCommon core security ports include:\n- **21:** FTP (File Transfer Protocol)\n- **22:** SSH (Secure Shell)\n- **25:** SMTP (Mail routing)\n- **53:** DNS (Domain Name System)\n- **80:** HTTP (Web unencrypted)\n- **443:** HTTPS (Web encrypted with TLS)\n- **3389:** RDP (Remote Desktop)",
          "Penetration testers perform port scanning (e.g. Nmap) to discover open doors and running services.",
          ["Port 22: Remote administrative shell", "Port 53: UDP name resolution", "Port 443: Web traffic secured with TLS"],
          [{"cmd": "ss -tulpn", "desc": "Show listening TCP/UDP ports with associated process names and PIDs"}, {"cmd": "nc -zv 1.1.1.1 53", "desc": "Check if port 53 is open on 1.1.1.1"}],
          "Run ss -tulpn to check what network services are listening locally.",
          [{"id": "q-04-2", "type": "exact", "question": "Which standard port number is assigned to Secure Shell (SSH) remote administrative access?", "visualSlots": "_ _", "acceptedAnswers": ["22"], "caseSensitive": False, "trimWhitespace": True, "hint": "The default port for secure command-line administration.", "explanation": "Port 22 is the standard IANA assigned port for SSH."}]
         ),
         ("Port Security & Final Knowledge Review",
          "Every open port is a potential attack surface. If an outdated daemon (like OpenSSH or Apache) with a known vulnerability listens on an open port, an attacker can send exploit payloads directly over the network. Firewalls (like iptables, nftables, or UFW) block unauthorized ports at the perimeter.",
          "Defenders minimize attack surface by closing all unnecessary listening ports.",
          ["UFW allow 22/tcp: Allow SSH only", "UFW default deny incoming: Drop unsolicited traffic", "Nmap -sS: Half-open stealth SYN scan"],
          [{"cmd": "sudo ufw status", "desc": "Check host firewall status and port rules"}, {"cmd": "cat /etc/services | grep -E 'ssh|http'", "desc": "Look up official IANA port numbers"}]
         )
     ],
     {"mainConcepts": "TCP 3-way handshake, UDP connectionless datagrams, well-known port numbers, and listening socket inspection.", "technicalTakeaways": "TCP guarantees reliable delivery; UDP prioritizes speed. Open ports represent listening software services and potential attack vectors.", "commandsCovered": ["ss -tulpn", "nc -zv", "netstat", "ufw status"], "commonMistakes": "Thinking UDP performs a handshake, or confusing IP addresses with application port numbers.", "learningOutcome": "You can explain the TCP 3-way handshake, identify standard security ports (22, 53, 80, 443), and inspect listening services."}
    ),

    (5, "room-05", "pre-security", "Pre-Security", 1, "Linux Fundamentals",
     "Master the operating system of cybersecurity: the hierarchical Linux filesystem, core directory roles, and essential file commands.",
     "Beginner", "30 mins", 50, "room-04",
     ["Navigate the inverted tree filesystem from root (/)", "Explain the roles of /etc, /var/log, /home, /bin, and /proc", "Manage files and directories (touch, mkdir, cp, mv, rm)", "Inspect file contents with cat, head, tail, and less"],
     ["Filesystem Architecture", "Linux Directory Structure", "File Operations", "Log Inspection"],
     ["ls -la", "cd", "pwd", "cat", "tail -n 20"],
     "room-06",
     [
         ("The Linux Filesystem Hierarchy Standard (FHS)",
          "In Linux, everything is organized under a single inverted tree starting at the root directory (`/`). Unlike Windows drive letters (`C:\\`, `D:\\`), all partitions and virtual filesystems mount into directories under `/`.\nKey security directories include:\n- `/etc`: System-wide configuration files (e.g. `/etc/passwd`, `/etc/shadow`)\n- `/var/log`: System, authentication, and service log files\n- `/bin` & `/sbin`: Essential executable binaries and system management utilities\n- `/home`: User home directories where personal files and shell history reside\n- `/proc` & `/sys`: Pseudo-filesystems exposing kernel memory, process states, and hardware parameters in real-time.",
          "Cybersecurity professionals spend most of their time examining /etc configurations and /var/log forensic evidence.",
          ["/etc/passwd: Lists all system accounts and login shells", "/var/log/auth.log: Records SSH login attempts and sudo events", "/proc/version: Live kernel version running in RAM"],
          [{"cmd": "pwd", "desc": "Print Current Working Directory"}, {"cmd": "ls -la /", "desc": "List all root directories with hidden files, permissions, and owners"}],
          "Run ls -la / to inspect the primary directories of the Linux filesystem.",
          [{"id": "q-05-1", "type": "exact", "question": "Which directory stores system configuration files such as user accounts and network settings?", "visualSlots": "/ _ _ _", "acceptedAnswers": ["/etc", "etc"], "caseSensitive": False, "trimWhitespace": True, "hint": "Short three-letter folder under root.", "explanation": "/etc contains all core system and service configuration files in Linux."}]
         ),
         ("File Manipulation & Navigation",
          "Working in Linux requires rapid filesystem manipulation. Essential commands include:\n- `cd <path>`: Change directory (`cd ..` moves up one level; `cd ~` goes home)\n- `mkdir -p <dir>`: Create directories (creates parent paths if missing)\n- `touch <file>`: Create an empty file or update timestamps\n- `cp -r <src> <dest>`: Copy files or directories recursively\n- `mv <src> <dest>`: Move or rename files\n- `rm -rf <path>`: Remove files or directories recursively (use with caution!).",
          "Attackers stage malware payloads in writable directories like `/tmp` or `/dev/shm`.",
          ["mkdir -p /tmp/recon/scans: Create nested folders", "cp /etc/hosts /tmp/hosts.bak: Backup a configuration file", "mv old.txt new.txt: Rename a file"],
          [{"cmd": "touch /tmp/testfile", "desc": "Create a dummy file in the volatile temporary directory"}, {"cmd": "rm /tmp/testfile", "desc": "Delete the temporary test file"}],
          "Navigate to /tmp and create a directory named calion-test.",
          [{"id": "q-05-2", "type": "exact", "question": "Which command-line command is used to display your current working directory path?", "visualSlots": "_ _ _", "acceptedAnswers": ["pwd"], "caseSensitive": False, "trimWhitespace": True, "hint": "Stands for Print Working Directory.", "explanation": "pwd prints the absolute path of your current location in the filesystem."}]
         ),
         ("Viewing File Contents & Final Knowledge Review",
          "Linux provides specialized utilities to inspect file content without GUI editors:\n- `cat <file>`: Print the entire file to terminal output\n- `head -n 10 <file>`: View the first 10 lines of a file\n- `tail -n 10 <file>`: View the last 10 lines of a file (use `-f` to follow live log appends)\n- `less <file>`: Interactive terminal pager allowing forward and backward scrolling with `/` search.",
          "Monitoring authentication logs in real time with `tail -f` reveals live brute-force attacks.",
          ["tail -f /var/log/auth.log: Watch incoming SSH authentication attempts live", "head -n 5 /etc/passwd: Check root and daemon system account entries"],
          [{"cmd": "head -n 5 /etc/passwd", "desc": "View first 5 system accounts"}, {"cmd": "tail -n 5 /etc/services", "desc": "View last 5 port mappings"}]
         )
     ],
     {"mainConcepts": "Inverted tree filesystem (/), FHS directory roles (/etc, /var/log, /proc), and basic file management commands.", "technicalTakeaways": "Linux treats everything as a file. Knowing where logs (/var/log) and configs (/etc) reside is crucial for both security auditing and incident investigation.", "commandsCovered": ["pwd", "ls -la", "cd", "mkdir", "touch", "cp", "mv", "rm", "cat", "tail"], "commonMistakes": "Confusing relative paths with absolute paths starting with '/', or accidentally deleting files with unverified rm commands.", "learningOutcome": "You can navigate the Linux directory tree, locate system configurations and logs, and manipulate files cleanly from the shell."}
    ),

    (6, "room-06", "pre-security", "Pre-Security", 1, "Windows Fundamentals",
     "Explore Windows operating system architecture, the Registry, NTFS security permissions, and core administrative services.",
     "Beginner", "35 mins", 50, "room-05",
     ["Understand Windows architecture (User Mode vs Kernel Mode, Win32 subsystem)", "Navigate the Windows Registry hierarchy (HKLM, HKCU, HKU)", "Explain NTFS Access Control Lists (ACLs) and security descriptors", "Inspect active processes and Windows Services"],
     ["Windows Architecture", "Registry Analysis", "NTFS Permissions", "Windows Services"],
     ["whoami /priv", "systeminfo", "net user", "sc query"],
     "room-07",
     [
         ("Windows Architecture & The Registry",
          "The Windows NT architecture divides into User Mode (subsystems, service processes, applications) and Kernel Mode (Executive, microkernel, Hardware Abstraction Layer / HAL). The central repository for all Windows configuration settings is the **Windows Registry**, structured into hives:\n- `HKEY_LOCAL_MACHINE (HKLM)`: System-wide hardware and OS configurations\n- `HKEY_CURRENT_USER (HKCU)`: Settings for the currently logged-in user\n- `HKEY_USERS (HKU)`: Profiles for all user accounts on the machine\n- `HKEY_CLASSES_ROOT (HKCR)`: File extension associations and COM registrations.",
          "Adversaries establish persistence on Windows by writing malicious executables into Registry Run keys (`HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`).",
          ["Run Key: Starts malware automatically upon user login", "SAM Hive: Security Account Manager storing local password hashes"],
          [{"cmd": "whoami", "desc": "Display domain or computer name and current username"}, {"cmd": "systeminfo", "desc": "Output OS build version, hotfixes, and system architecture"}],
          "Inspect basic system properties and user context.",
          [{"id": "q-06-1", "type": "exact", "question": "Which Windows Registry hive contains hardware, driver, and system-wide security settings applied to all users?", "visualSlots": "_ _ _ _", "acceptedAnswers": ["HKLM", "HKEY_LOCAL_MACHINE"], "caseSensitive": False, "trimWhitespace": True, "hint": "Four-letter acronym starting with HK.", "explanation": "HKLM (HKEY_LOCAL_MACHINE) stores configuration data common to all users and hardware."}]
         ),
         ("NTFS Permissions & Access Control Lists",
          "The NT File System (NTFS) secures files and folders using **Discretionary Access Control Lists (DACLs)** consisting of Access Control Entries (ACEs). Each ACE grants or denies specific permissions (Read, Write, Execute, Full Control) to a Security Identifier (SID). In Windows, User Account Control (UAC) ensures administrators run in standard user tokens until elevated privileges are explicitly approved.",
          "Misconfigured folder permissions (e.g., Everyone: Full Control on service binaries) allow low-privilege users to replace legitimate services with malware.",
          ["SID S-1-5-18: LocalSystem (highest OS privilege)", "SID S-1-5-32-544: Administrators group", "icacls: Windows utility to view and modify folder ACLs"],
          [{"cmd": "whoami /priv", "desc": "List Windows security tokens and user privileges (e.g. SeDebugPrivilege)"}, {"cmd": "net user", "desc": "List all local Windows user accounts"}],
          "Execute whoami /priv to view the privilege tokens assigned to your session.",
          [{"id": "q-06-2", "type": "multiple-choice", "question": "What is the highest-privileged local security identity in the Windows operating system?",
            "options": ["Standard User", "NT AUTHORITY\\SYSTEM (LocalSystem)", "Guest", "Remote Desktop Users"],
            "correctIndex": 1, "hint": "The operating system core runs under this account.",
            "explanation": "NT AUTHORITY\\SYSTEM has complete control over the local Windows machine, higher than a normal Administrator."}]
         ),
         ("Windows Services & Final Knowledge Review",
          "Windows Services are long-running background executables managed by the Service Control Manager (SCM). Services run without an interactive user login, frequently running under the powerful `SYSTEM` identity. If a service binary path is unquoted with spaces (e.g., `C:\\Program Files\\My Service\\run.exe`), an attacker can place an executable at `C:\\Program.exe` to achieve privilege escalation.",
          "Service persistence and unquoted service paths are among the most common Windows attack techniques.",
          ["sc query: Check status of running Windows services", "Get-Service: PowerShell cmdlet to query service states"],
          [{"cmd": "sc query type= service", "desc": "Enumerate active Windows services"}, {"cmd": "net start", "desc": "List running Windows network services"}]
         )
     ],
     {"mainConcepts": "Windows NT kernel vs user mode, Registry hives (HKLM/HKCU), NTFS DACLs/SIDs, and Windows Services.", "technicalTakeaways": "Registry Run keys and misconfigured service permissions are primary vectors for persistence and privilege escalation on Windows.", "commandsCovered": ["whoami /priv", "systeminfo", "net user", "sc query"], "commonMistakes": "Confusing HKLM with HKCU, or assuming local Administrator has higher kernel privilege than SYSTEM.", "learningOutcome": "You can navigate Windows architecture, explain Registry persistence mechanisms, and audit user privilege tokens."}
    ),

    (7, "room-07", "pre-security", "Pre-Security", 1, "Command-Line Fundamentals",
     "Unlock the full power of the shell: input/output redirection, pipes, grep pattern filtering, and command chaining.",
     "Beginner", "35 mins", 50, "room-05",
     ["Master Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr)", "Chain commands using pipes (|) to build data analysis pipelines", "Filter and search text streams using grep and regular expressions", "Automate workflows with command chaining (&&, ||, ;)"],
     ["I/O Redirection", "UNIX Pipelines", "Text Filtering with Grep", "Command Chaining"],
     ["grep -i", "cut -d", "sort", "uniq -c", "wc -l"],
     "room-08",
     [
         ("Standard Streams & Redirection (<, >, >>, 2>)",
          "In POSIX operating systems, every process starts with three standardized I/O streams:\n- `0 (stdin)`: Standard Input (keyboard/input stream)\n- `1 (stdout)`: Standard Output (normal output stream)\n- `2 (stderr)`: Standard Error (diagnostic/error stream).\nYou can redirect streams using shell operators:\n- `>`: Overwrite file with stdout (e.g. `ls > list.txt`)\n- `>>`: Append stdout to file without destroying existing contents\n- `2>`: Redirect stderr specifically (e.g. `find / -name flag 2>/dev/null` silences Permission Denied errors)\n- `&>`: Redirect both stdout and stderr simultaneously.",
          "Suppressing error messages with `2>/dev/null` is standard practice when searching restricted filesystems.",
          ["command > out.log: Overwrite out.log with stdout", "command >> out.log: Append to out.log", "command 2>/dev/null: Discard errors to the null device"],
          [{"cmd": "echo 'CALION Academy' > /tmp/academy.txt", "desc": "Write text to file using redirection"}, {"cmd": "cat /tmp/academy.txt", "desc": "Verify written file contents"}],
          "Redirect command output to /tmp/test.txt and inspect it with cat.",
          [{"id": "q-07-1", "type": "exact", "question": "Which redirection operator appends command output to the end of a file without overwriting it?", "visualSlots": "> >", "acceptedAnswers": [">>"], "caseSensitive": False, "trimWhitespace": True, "hint": "Two greater-than symbols side by side.", "explanation": ">> appends output to the destination file, while > overwrites it."}]
         ),
         ("Pipes (|) & The Grep Pattern Matcher",
          "The pipe operator (`|`) routes the stdout of one program directly into the stdin of the next. This enables complex data pipelines from simple tools. The essential tool in any pipeline is `grep` (Global Regular Expression Print), which filters lines matching a pattern:\n- `grep -i <pattern>`: Case-insensitive search\n- `grep -v <pattern>`: Invert match (show lines that do NOT match)\n- `grep -r <pattern> <dir>`: Recursively search files inside a directory\n- `wc -l`: Count total output lines.",
          "Security analysts use grep pipelines to sift through millions of log lines in seconds.",
          ["cat /var/log/auth.log | grep -i 'failed password': Find failed logins", "ps aux | grep python: Locate running Python processes", "ss -tulpn | grep ':80': Check if port 80 is listening"],
          [{"cmd": "cat /etc/passwd | grep -i 'root'", "desc": "Find lines mentioning root in account file"}, {"cmd": "ls /bin | wc -l", "desc": "Count total binaries in /bin"}],
          "Use a pipe to filter and count running processes with ps aux | wc -l.",
          [{"id": "q-07-2", "type": "exact", "question": "Which grep flag inverts the search to return only lines that do NOT match the specified pattern?", "visualSlots": "- _", "acceptedAnswers": ["-v", "v"], "caseSensitive": False, "trimWhitespace": True, "hint": "Single letter flag for inVerted match.", "explanation": "grep -v inverts matching, displaying all lines that do not contain the pattern."}]
         ),
         ("Command Chaining (&&, ||, ;) & Final Knowledge Review",
          "You can chain multiple commands on a single line:\n- `;`: Sequential execution regardless of success or failure (`cmd1 ; cmd2`)\n- `&&`: Logical AND; runs `cmd2` only if `cmd1` exited successfully with status 0 (`make && sudo make install`)\n- `||`: Logical OR; runs `cmd2` only if `cmd1` failed with non-zero exit status (`ping -c 1 host || echo 'Host down'`).",
          "Command injection vulnerabilities occur when web apps concatenate user inputs directly into shell chaining operators.",
          ["mkdir /tmp/lab && cd /tmp/lab: Only change directory if creation succeeded", "curl -s http://target || echo 'Offline': Fallback notification on failure"],
          [{"cmd": "echo 'Step 1' && echo 'Step 2'", "desc": "Execute chained commands conditionally"}, {"cmd": "false || echo 'Fallback executed'", "desc": "Execute fallback after failed exit code"}]
         )
     ],
     {"mainConcepts": "Standard streams (stdin, stdout, stderr), redirection operators (>, >>, 2>), pipelines (|), and grep filtering.", "technicalTakeaways": "Redirecting stderr to /dev/null suppresses clutter during searches. Piping into grep, sort, and uniq enables rapid log triage.", "commandsCovered": ["grep", "wc -l", "sort", "uniq", "cut"], "commonMistakes": "Accidentally overwriting a critical file with '>' instead of appending with '>>'.", "learningOutcome": "You can construct shell pipelines, redirect streams cleanly, and extract actionable indicators from raw log streams."}
    ),

    (8, "room-08", "pre-security", "Pre-Security", 1, "Web Fundamentals",
     "Master the foundations of the World Wide Web: HTTP request/response cycles, headers, cookies, and client-server architectures.",
     "Beginner", "30 mins", 50, "room-07",
     ["Explain the HTTP stateless request-response model", "Differentiate HTTP methods: GET, POST, PUT, DELETE", "Understand HTTP status code categories (2xx, 3xx, 4xx, 5xx)", "Analyze HTTP headers, cookies, and session state persistence"],
     ["HTTP Architecture", "RESTful Methods", "Status Codes", "Session Cookies"],
     ["curl -I", "curl -v", "curl -X POST", "curl -s"],
     "room-09",
     [
         ("The HTTP Request/Response Architecture",
          "The World Wide Web runs on the HyperText Transfer Protocol (HTTP), a stateless application-layer protocol operating over TCP port 80 (or port 443 with TLS/HTTPS). The client (browser or CLI like `curl`) sends an **HTTP Request** consisting of:\n1. **Request Line:** Method, URI path, and HTTP version (e.g. `GET /index.html HTTP/1.1`)\n2. **Headers:** Key-value metadata (Host, User-Agent, Accept, Authorization)\n3. **Body:** Optional data payload (used in POST, PUT submissions).\nThe web server processes the request and returns an **HTTP Response** with a status code and content.",
          "Web application security assessments begin by inspecting raw HTTP request and response headers.",
          ["GET: Retrieve data without modifying server state", "POST: Submit data (credentials, forms, uploads) to server", "PUT: Create or overwrite a target resource"],
          [{"cmd": "curl -I https://httpbin.org/get", "desc": "Perform HEAD request to inspect HTTP response headers without downloading body"}, {"cmd": "curl -v http://example.com", "desc": "Verbose output showing raw TCP connection and HTTP headers"}],
          "Run curl -I https://httpbin.org/get to inspect live server response headers.",
          [{"id": "q-08-1", "type": "exact", "question": "Which HTTP method is designed to retrieve data from a web server without altering server state?", "visualSlots": "_ _ _", "acceptedAnswers": ["GET"], "caseSensitive": False, "trimWhitespace": True, "hint": "Three-letter word for retrieving.", "explanation": "GET is safe and idempotent, meant strictly for retrieving resources."}]
         ),
         ("HTTP Status Codes & Categorization",
          "HTTP servers indicate the result of a request using three-digit numeric status codes:\n- **1xx (Informational):** Request received, continuing process (e.g. 101 Switching Protocols)\n- **2xx (Success):** Action was received, understood, and accepted (e.g. 200 OK, 201 Created)\n- **3xx (Redirection):** Further action required to complete request (e.g. 301 Moved Permanently, 302 Found)\n- **4xx (Client Error):** The request contains bad syntax or unauthorized access (e.g. 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)\n- **5xx (Server Error):** The server failed to fulfill a valid request (e.g. 500 Internal Server Error, 502 Bad Gateway).",
          "Status codes 401 (unauthenticated) vs 403 (authenticated but unauthorized) are critical distinctions in access control testing.",
          ["200 OK: Standard successful web page response", "403 Forbidden: Server understands identity but denies permission", "500 Internal Server Error: Application crash or database error"],
          [{"cmd": "curl -s -o /dev/null -w '%{http_code}\\n' https://httpbin.org/status/200", "desc": "Print only the HTTP status code returned by the server"}],
          "Query a test endpoint to verify the returned HTTP response status code.",
          [{"id": "q-08-2", "type": "exact", "question": "Which HTTP status code signifies that a requested resource was not found on the server?", "visualSlots": "_ _ _", "acceptedAnswers": ["404"], "caseSensitive": False, "trimWhitespace": True, "hint": "The most famous error code on the internet.", "explanation": "404 Not Found indicates the server cannot locate the requested URI."}]
         ),
         ("Cookies, Sessions & Final Knowledge Review",
          "Because HTTP is inherently stateless, servers use the `Set-Cookie` header to store a session identifier in the client's browser. On subsequent requests, the browser automatically sends the `Cookie: session_id=...` header to maintain login state. Secure cookies must include security flags:\n- `HttpOnly`: Prevents client-side JavaScript from accessing the cookie, mitigating Cross-Site Scripting (XSS) cookie theft\n- `Secure`: Ensures the cookie is only transmitted over encrypted HTTPS\n- `SameSite=Strict/Lax`: Protects against Cross-Site Request Forgery (CSRF).",
          "Stealing unflagged session cookies via XSS gives attackers immediate authenticated session takeover.",
          ["Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict", "Cookie theft: document.cookie read by malicious injected JS"],
          [{"cmd": "curl -c cookies.txt https://httpbin.org/cookies/set?user=cadet", "desc": "Save session cookies returned by server into a cookie jar file"}, {"cmd": "cat cookies.txt", "desc": "Inspect stored cookie attributes"}]
         )
     ],
     {"mainConcepts": "HTTP request/response structure, standard methods (GET, POST), status code classes (2xx-5xx), and stateful session cookies.", "technicalTakeaways": "HTTP is stateless; cookies track sessions. Security flags (HttpOnly, Secure, SameSite) protect session cookies from XSS and CSRF.", "commandsCovered": ["curl -I", "curl -v", "curl -c", "curl -X"], "commonMistakes": "Confusing 401 Unauthorized (unauthenticated) with 403 Forbidden (insufficient permission).", "learningOutcome": "You can inspect HTTP traffic, interpret status codes, and analyze cookie security attributes."}
    ),

    (9, "room-09", "pre-security", "Pre-Security", 1, "Introduction to Virtualization",
     "Explore virtualization technology: Type-1 vs Type-2 Hypervisors, containers vs virtual machines, and snapshot rollbacks for safe security testing.",
     "Beginner", "30 mins", 50, "room-08",
     ["Differentiate Type-1 (Bare-Metal) from Type-2 (Hosted) Hypervisors", "Compare Virtual Machines (hardware emulation) with Containers (OS kernel namespaces)", "Understand snapshot trees and isolation barriers for malware analysis", "Configure virtual networking (Bridged, NAT, Host-Only)"],
     ["Hypervisor Architecture", "VMs vs Containers", "Snapshot Forensics", "Virtual Networking"],
     ["docker ps", "virsh list", "ip link", "systemctl status"],
     "room-10",
     [
         ("Hypervisors: Type-1 Bare-Metal vs Type-2 Hosted",
          "Virtualization allows multiple independent Operating Systems (Guests) to share physical hardware (Host) securely. The software managing this is a **Hypervisor** (Virtual Machine Monitor / VMM):\n- **Type-1 (Bare-Metal):** Runs directly on physical server silicon without an underlying OS (e.g. VMware ESXi, Proxmox VE, KVM). Delivers high performance and minimal attack surface.\n- **Type-2 (Hosted):** Runs as an application on top of a standard host OS (e.g. VirtualBox, VMware Workstation). Ideal for local student labs, testing, and penetration testing distributions (like Kali Linux).",
          "Cybersecurity labs rely entirely on virtualization to safely detonate malware and isolate test networks.",
          ["Type-1: Enterprise cloud hypervisors (AWS Nitro, Proxmox, ESXi)", "Type-2: Desktop hypervisors (VirtualBox, VMware Fusion)", "Hardware assist: Intel VT-x and AMD-V silicon virtualization flags"],
          [{"cmd": "grep -E '(vmx|svm)' /proc/cpuinfo", "desc": "Verify hardware virtualization support in CPU flags (vmx for Intel, svm for AMD)"}],
          "Check if your processor supports hardware-accelerated virtualization.",
          [{"id": "q-09-1", "type": "multiple-choice", "question": "Which type of hypervisor installs directly onto physical server hardware without a host operating system?",
            "options": ["Type-2 Hosted Hypervisor", "Type-1 Bare-Metal Hypervisor", "Web Browser Extension", "Container Daemon"],
            "correctIndex": 1, "hint": "Bare-metal hypervisors run directly on the physical hardware.",
            "explanation": "Type-1 hypervisors interface directly with physical CPU and memory without an intermediary operating system."}]
         ),
         ("Virtual Machines vs Containers (Docker)",
          "While a Virtual Machine virtualizes an entire hardware computer (including a complete guest OS kernel, virtual BIOS, and virtual disks), **Containers** virtualize the operating system kernel itself. Containers use Linux **Namespaces** (isolating PID, Mount, Network, IPC) and **Control Groups (cgroups)** (limiting CPU, RAM, IO). Containers start in milliseconds and share the host kernel, while VMs provide stronger hardware-level isolation.",
          "Container escape attacks exploit kernel vulnerabilities or misconfigured docker.sock permissions.",
          ["VM: Complete OS kernel + virtual hardware (heavy isolation)", "Container: User-space process isolated by cgroups and namespaces (lightweight)"],
          [{"cmd": "uname -a", "desc": "Check shared kernel version"}, {"cmd": "ls /sys/fs/cgroup", "desc": "Inspect Linux kernel control group resource controllers"}],
          "Inspect Linux cgroups and namespace isolation structures.",
          [{"id": "q-09-2", "type": "exact", "question": "Which Linux kernel feature is used by container engines to restrict and meter CPU and memory usage per container?",
            "options": [], "type": "exact", "visualSlots": "_ _ _ _ _ _ _", "acceptedAnswers": ["cgroups", "control groups", "cgroup"], "caseSensitive": False, "trimWhitespace": True, "hint": "Short for Control Groups.", "explanation": "Control Groups (cgroups) limit and isolate resource usage (CPU, memory, disk I/O) for processes."}]
         ),
         ("Virtual Networking, Snapshots & Final Review",
          "Virtual machines connect to networks through virtual adapters:\n- **NAT (Network Address Translation):** VM accesses external Internet through host IP; external machines cannot initiate connections to VM\n- **Host-Only:** Completely isolated network shared only between host and VMs; zero Internet access (safest for malware detonation)\n- **Bridged:** VM connects directly to the physical LAN as an independent host with its own DHCP IP.\n**Snapshots** capture the complete state of a VM (disk and RAM) at a point in time, enabling instantaneous rollbacks after executing dangerous tools.",
          "Always take a baseline snapshot before testing exploits or installing unknown packages in a lab VM.",
          ["Malware Lab: Host-Only network + read-only snapshot restore", "Penetration Testing: Bridged or NAT network to reach target subnet"],
          [{"cmd": "ip link show", "desc": "List virtual bridge interfaces (e.g. docker0, virbr0)"}]
         )
     ],
     {"mainConcepts": "Type-1 vs Type-2 hypervisors, VM hardware emulation vs container kernel isolation (namespaces/cgroups), and snapshot rollbacks.", "technicalTakeaways": "Hypervisors isolate guest systems. Host-Only networking and snapshots provide a secure sandbox for dangerous security testing.", "commandsCovered": ["grep vmx /proc/cpuinfo", "ip link", "ls /sys/fs/cgroup"], "commonMistakes": "Confusing lightweight container process isolation with full hypervisor hardware virtualization.", "learningOutcome": "You can explain virtualization architectures, select appropriate virtual network modes, and utilize snapshots safely."}
    ),

    (10, "room-10", "pre-security", "Pre-Security", 1, "Introduction to Cybersecurity",
     "Synthesize your pre-security foundations into modern cybersecurity: the threat landscape, adversary motivations, and defense in depth.",
     "Beginner", "35 mins", 50, "room-09",
     ["Define cybersecurity and the threat landscape", "Categorize threat actors (script kiddies, cybercriminals, nation-states, insiders)", "Explain the Defense in Depth security model", "Understand ethical responsibilities and legal boundaries"],
     ["Threat Actors", "Attack Surface Analysis", "Defense in Depth", "Ethics & CFAA"],
     ["whoami", "id", "uname -a", "history"],
     "room-11",
     [
         ("The Cybersecurity Landscape & Threat Actors",
          "Cybersecurity is the practice of protecting systems, networks, programs, devices, and data from digital attacks, damage, or unauthorized access. Threats arise from diverse threat actor tiers:\n- **Script Kiddies / Opportunists:** Low technical skill, using automated public exploit scripts without understanding underlying mechanics\n- **Cybercrime Syndicates (FIN):** Financially motivated, operating Ransomware-as-a-Service (RaaS), credential harvesting, and business email compromise (BEC)\n- **Nation-State Advanced Persistent Threats (APTs):** Highly sophisticated, well-funded government teams conducting long-term cyber espionage and critical infrastructure disruption\n- **Insiders:** Employees or contractors with legitimate access who abuse privileges maliciously or accidentally.",
          "Threat modeling begins by identifying which adversary tier has motivation to target your organization.",
          ["APT28 / APT29: Nation-state espionage groups", "Ransomware groups: Financial extortion through automated encryption", "Insider threat: Leaking proprietary trade secrets"],
          [{"cmd": "uptime", "desc": "Check system operational uptime"}],
          "Reflect on adversary motivations: financial gain, espionage, ideological disruption, or accidental error.",
          [{"id": "q-10-1", "type": "exact", "question": "What four-letter acronym designates sophisticated, well-resourced nation-state adversary groups?", "visualSlots": "_ _ _", "acceptedAnswers": ["APT", "APTs"], "caseSensitive": False, "trimWhitespace": True, "hint": "Advanced Persistent Threat.", "explanation": "APT stands for Advanced Persistent Threat, representing elite nation-state threat groups."}]
         ),
         ("Defense in Depth (Layered Security)",
          "No single security tool can guarantee 100% protection. **Defense in Depth** is an architectural strategy that deploys multiple overlapping defensive controls across the entire computing stack:\n1. **Physical Security:** Biometric locks, security guards, datacenter surveillance\n2. **Perimeter / Network:** Next-Gen Firewalls, DDoS mitigation, network segmentation\n3. **Host / Endpoint:** EDR (Endpoint Detection & Response), hardened OS configurations, patch management\n4. **Application:** Input validation, secure coding, WAF, dependency vulnerability scanning\n5. **Data:** Encryption at rest (AES-256), encryption in transit (TLS 1.3), access controls\n6. **Human:** Security awareness training, phishing simulations, dual-authorization policies.\nIf an adversary breaches the perimeter firewall, host-level EDR and data encryption still protect the asset.",
          "Single-point-of-failure architectures guarantee catastrophic compromise when one control fails.",
          ["Layer 1: Edge firewall blocks unauthorized ports", "Layer 2: WAF inspects HTTP payloads for SQL injection", "Layer 3: App uses parameterized queries", "Layer 4: DB runs as unprivileged user with encrypted tables"],
          [{"cmd": "sudo iptables -L -n", "desc": "Inspect host firewall packet filtering rules"}],
          "Review how layered controls prevent single points of failure.",
          [{"id": "q-10-2", "type": "multiple-choice", "question": "What is the core philosophy behind the Defense in Depth security architecture?",
            "options": ["Install a single powerful firewall and disable all internal host security",
                        "Deploy multiple layered and independent defensive controls so failure of one does not compromise the entire system",
                        "Only protect physical server rooms while leaving networks unencrypted",
                        "Ensure all software runs with root administrator privileges"],
            "correctIndex": 1, "hint": "Layered barriers make compromise exponentially harder.",
            "explanation": "Defense in Depth implements layered controls so that if one security mechanism fails, others step in to halt the attack."}]
         ),
         ("Ethics, Authorization & Pre-Security Capstone Review",
          "You have completed Stage 1 (Pre-Security)! Before entering specialized foundations, remember the golden rule of cybersecurity: **Authorization is Paramount**. Testing any computer, network, or application without explicit, written permission is a serious criminal offense under laws like the US Computer Fraud and Abuse Act (CFAA) and the UK Computer Misuse Act.\nEthical hackers always establish a signed **Rules of Engagement (RoE)** defining exact scope, testing hours, and contact channels.",
          "The skills you learn can secure critical infrastructure or cause severe harm. Always operate strictly within authorized scopes.",
          ["CFAA: Criminalizes unauthorized access to protected computers", "Scope Document: Explicitly lists target IPs and prohibited actions"],
          [{"cmd": "echo 'Pre-Security Complete!'", "desc": "Celebrate completing Stage 1 Foundations"}],
          "Complete your final Pre-Security knowledge review."
         )
     ],
     {"mainConcepts": "Threat actor tiers (script kiddies, cybercriminals, APTs), Defense in Depth layers, and ethical/legal boundaries (CFAA).", "technicalTakeaways": "Security is layered; never rely on a single defensive tool. Always possess explicit written authorization before testing any system.", "commandsCovered": ["whoami", "id", "uptime", "iptables -L"], "commonMistakes": "Thinking an antivirus alone provides security, or testing external IP addresses without written authorization.", "learningOutcome": "You have mastered computing, networking, Linux, Windows, and web basics, and are fully prepared for Cyber Security Foundations!"}
    )
]

print(f"Loaded {len(CATALOG)} catalog rooms.")
