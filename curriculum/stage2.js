// curriculum/stage2.js
module.exports = [
  {
    id: "room-06",
    stage: 2,
    stageTitle: "Stage 2 — Networking Fundamentals",
    title: "What Is a Network?",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "20 min",
    prerequisites: "Stage 1 (Computer Fundamentals)",
    whyAreYouHere: "A standalone computer cannot be hacked remotely; it is only vulnerable to physical tampering. Cybersecurity exists primarily because computers talk to each other across vast networks. In this room, you will learn how two devices connect, what routers and switches do, and how a local home network connects to the global Internet.",
    objectives: [
      "Define what a computer network is and how devices communicate",
      "Understand the Client-Server relationship",
      "Differentiate between Local Area Networks (LAN) and Wide Area Networks (WAN)",
      "Learn the core hardware devices: Switches, Routers, and Access Points"
    ],
    vocabulary: [
      { term: "Network", definition: "Two or more interconnected computing devices sharing data and resources over communication links." },
      { term: "Client", definition: "A device or software program (like your smartphone or browser) that initiates requests for data or services." },
      { term: "Server", definition: "A dedicated computer or process waiting to listen for incoming client requests and serve back responses." },
      { term: "LAN (Local Area Network)", definition: "A network contained within a small geographic area (like your home, office, or university lab)." },
      { term: "WAN (Wide Area Network)", definition: "A large network connecting multiple LANs across cities or continents — the Internet is the ultimate WAN." },
      { term: "Router", definition: "A network device that forwards data packets between different networks (e.g. between your LAN and the Internet)." },
      { term: "Switch", definition: "A hardware device operating inside a LAN that directs data directly between local devices using their MAC addresses." }
    ],
    lessons: [
      {
        title: "1. The Client-Server Architecture",
        content: `Almost every interaction you perform online follows the **Client-Server model**:
• You (the **Client**) open your browser and click a link to \`endlessus.in\`.
• Your machine formulates a request asking for the web page.
• The web host (the **Server**) receives the request, processes it, and transmits the HTML page back to you.`
      },
      {
        title: "2. How Data Travels: Switches vs Routers",
        content: `• Inside your house, all your devices connect to a **Switch** (or Wi-Fi Access Point). If your laptop wants to print to your wireless printer, data stays purely inside your **LAN**.
• When you want to visit a website across the world, your data must leave your LAN. It travels to your **Router**, which acts as the gateway to your ISP (Internet Service Provider) and the wider **WAN**.`
      }
    ],
    seeExamples: [
      {
        title: "Home LAN to Internet Web Server Flow",
        codeOrDiagram: `[ Phone / Laptop (Client) ]
            ↓ Wi-Fi
[ Access Point / Switch ]
            ↓ Local LAN Traffic
[ Default Gateway (Router) ]
            ↓ Public WAN Link
[ Internet Service Provider (ISP) ]
            ↓ Global Fiber Backbones
[ Web Server (endlessus.in) ]`,
        explanation: "Notice the boundary: inside your house is your private LAN. Once packets cross your router, they enter the public Internet WAN."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Test connectivity from your lab machine to our simulated gateway using the network utility `ping -c 3 192.168.1.1`:",
      initialCommand: "",
      expectedCommand: "ping -c 3 192.168.1.1",
      simulatedOutput: "PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.412 ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.388 ms\n64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.401 ms\n--- 192.168.1.1 ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2004ms\n[+] Success! Target gateway is alive with ~0.4ms round-trip latency.",
      explanation: "`ping` sends ICMP Echo Request packets. When the remote device is online and reachable, it answers with ICMP Echo Replies."
    },
    questions: [
      {
        id: "r6-q1",
        type: "multiple-choice",
        question: "Which device is responsible for forwarding data packets between entirely different networks, such as routing your home traffic onto the Internet?",
        options: [
          "Network Switch",
          "Router",
          "Ethernet Cable",
          "HDMI Splitter"
        ],
        correctIndex: 1,
        explanation: "A router operates at Layer 3 (Network Layer) and connects distinct networks together using IP routing tables."
      },
      {
        id: "r6-q2",
        type: "multiple-choice",
        question: "In the Client-Server model, which entity initiates the connection request?",
        options: [
          "The Server",
          "The Client",
          "The Router firewall",
          "The DNS Registrar"
        ],
        correctIndex: 1,
        explanation: "Clients initiate communication by sending requests; servers listen passively and respond."
      }
    ],
    tasks: [
      {
        title: "Task 1: Verify Gateway Reachability",
        instruction: "Run `ping -c 3 192.168.1.1` to confirm your connection to the local gateway.",
        hints: [
          "Concept: Send ICMP echo requests.",
          "Direction: Use the ping utility.",
          "Tool: `ping`",
          "Syntax: `ping -c 3 192.168.1.1` (`-c 3` stops after 3 packets).",
          "Explanation: 0% packet loss confirms the network path is operational."
        ]
      }
    ],
    explainResult: "The `ping` command generated three ICMP (Internet Control Message Protocol) packets, transmitted them across the virtual network interface, and calculated the round-trip latency when replies arrived.",
    securityConnection: "Network discovery and reconnaissance always begin with understanding network topology. Attackers perform 'ping sweeps' or ARP scans to discover active IP addresses on a target subnet.",
    completion: {
      learned: [
        "Network fundamentals and client-server communication",
        "LAN (Local Area Network) vs WAN (Wide Area Network)",
        "The roles of Switches (local switching) and Routers (inter-network routing)",
        "Using ICMP ping to test network reachability"
      ],
      practiced: [
        "ping -c 3 192.168.1.1",
        "Interpreting round-trip latency and packet loss"
      ]
    },
    nextRoomId: "room-07"
  },

  {
    id: "room-07",
    stage: 2,
    stageTitle: "Stage 2 — Networking Fundamentals",
    title: "IP Addresses & MAC Addresses",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "25 min",
    prerequisites: "Room 06 (What Is a Network?)",
    whyAreYouHere: "For two computers to exchange messages, each must know where to send the data. Just as sending postal mail requires both a street address and a recipient name, networks rely on two distinct addresses: physical MAC addresses for local hardware links, and logical IP addresses for internet routing. In this room, you will master IPv4, IPv6, private vs public addresses, and the ARP protocol.",
    objectives: [
      "Understand IPv4 (32-bit dotted-decimal) and IPv6 (128-bit hexadecimal) addresses",
      "Differentiate between Public (globally routable) and Private (RFC 1918) IP addresses",
      "Understand Loopback / Localhost (`127.0.0.1`)",
      "Learn physical MAC addresses (Layer 2) and how ARP maps IP addresses to MACs",
      "Inspect your network interfaces using `ip addr`"
    ],
    vocabulary: [
      { term: "IPv4 Address", definition: "A 32-bit numerical label written as four octets separated by dots (e.g., `192.168.1.10`), uniquely identifying a device on a network." },
      { term: "IPv6 Address", definition: "A 128-bit address written in hexadecimal (e.g., `2001:0db8::1`), created to replace IPv4 due to global address exhaustion." },
      { term: "Private IP (RFC 1918)", definition: "Non-routable IP ranges reserved for local internal networks: `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`." },
      { term: "Public IP", definition: "A globally unique IP assigned to your router by your ISP that can be reached from anywhere on the public Internet." },
      { term: "Localhost (`127.0.0.1`)", definition: "The loopback address that refers back to the local machine you are currently operating on." },
      { term: "MAC Address", definition: "Media Access Control address: a permanent 48-bit hardware identifier burned into your network card (e.g. `00:1A:2B:3C:4D:5E`)." },
      { term: "ARP (Address Resolution Protocol)", definition: "The protocol used to discover the physical MAC address associated with a known IP address on a local network." }
    ],
    lessons: [
      {
        title: "1. The Postal Analogy: IP vs MAC",
        content: `• **IP Address (Logical)**: Like your postal mailing address: *Building 4, Sector 7, New Delhi*. If you move your laptop to a coffee shop, your IP address changes because your network location changed.
• **MAC Address (Physical)**: Like your fingerprint or national identity number. It is physically burned into your Network Interface Card (NIC) during manufacturing and never changes, regardless of where you plug in.`
      },
      {
        title: "2. The Private IP Ranges (RFC 1918)",
        content: `Because IPv4 only has ~4.3 billion possible addresses, engineers reserved three blocks for internal use:
1. \`10.0.0.0\` to \`10.255.255.255\` (Large corporate enterprise networks)
2. \`172.16.0.0\` to \`172.31.255.255\` (Medium business networks)
3. \`192.168.0.0\` to \`192.168.255.255\` (Home Wi-Fi routers and small labs)
Routers on the public internet immediately drop any packets carrying a private RFC 1918 address!`
      }
    ],
    seeExamples: [
      {
        title: "Private LAN vs Public Internet Addressing",
        codeOrDiagram: `[ Device: Laptop ]  Private IP: 192.168.1.15 | MAC: 00:1A:2B:3C:4D:5E
         ↓ Local LAN
[ Home Router ]     LAN IP: 192.168.1.1    | Public WAN IP: 203.0.113.45 (via NAT)
         ↓ Public Internet
[ Remote Server ]   Public IP: 104.21.55.2 | Web Server (endlessus.in)`,
        explanation: "Your home devices share one single public IP address through NAT (Network Address Translation). Remote websites only see the public IP of your router."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Inspect all network interfaces and IP addresses on this lab system using `ip addr`:",
      initialCommand: "",
      expectedCommand: "ip addr",
      simulatedOutput: "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP\n    link/ether 02:42:0a:0a:0a:05 brd ff:ff:ff:ff:ff:ff\n    inet 10.10.10.5/24 brd 10.10.10.255 scope global eth0\n[+] Success! Interfaces identified: lo (127.0.0.1) and eth0 (10.10.10.5, MAC 02:42:0a:0a:0a:05).",
      explanation: "Interface `lo` is loopback. Interface `eth0` is the virtual Ethernet card with IP `10.10.10.5` on subnet `/24`."
    },
    questions: [
      {
        id: "r7-q1",
        type: "multiple-choice",
        question: "Which of the following IP addresses is a private (RFC 1918) address used for internal local networks?",
        options: [
          "8.8.8.8",
          "192.168.1.45",
          "142.250.190.46",
          "1.1.1.1"
        ],
        correctIndex: 1,
        explanation: "`192.168.1.45` falls squarely within the RFC 1918 Class C private range (`192.168.0.0/16`). The others are public IP addresses."
      },
      {
        id: "r7-q2",
        type: "multiple-choice",
        question: "What protocol is used on a local network to discover the Layer 2 hardware MAC address that corresponds to an IP address?",
        options: [
          "DNS (Domain Name System)",
          "DHCP (Dynamic Host Configuration Protocol)",
          "ARP (Address Resolution Protocol)",
          "BGP (Border Gateway Protocol)"
        ],
        correctIndex: 2,
        explanation: "ARP broadcasts a query asking 'Who has this IP? Tell your MAC address.' Devices cache these responses in their ARP table."
      }
    ],
    tasks: [
      {
        title: "Task 1: Inspect Lab Interface Addresses",
        instruction: "Run `ip addr` in the terminal to view your configured network interfaces.",
        hints: [
          "Concept: Linux modern network configuration command.",
          "Direction: Replaced the older `ifconfig` command.",
          "Tool: `ip` utility.",
          "Syntax: `ip addr` (or `ip a`).",
          "Explanation: Output reveals IP and MAC addresses."
        ]
      }
    ],
    explainResult: "The `ip addr` utility made netlink calls to the Linux kernel to dump network device state and addresses registered to each interface.",
    securityConnection: "Because ARP does not authenticate responses, local attackers can send fraudulent ARP packets claiming that the router's IP belongs to the attacker's MAC address. This is called 'ARP Poisoning' or 'ARP Spoofing', and allows a local adversary to perform Man-in-the-Middle (MitM) attacks.",
    completion: {
      learned: [
        "The difference between IPv4 and IPv6",
        "Private RFC 1918 address ranges vs globally routable Public IPs",
        "The role of the loopback interface (127.0.0.1)",
        "How ARP translates Layer 3 IP addresses into Layer 2 MAC addresses"
      ],
      practiced: [
        "ip addr",
        "Differentiating IP and MAC addresses",
        "Identifying local subnet interfaces"
      ]
    },
    nextRoomId: "room-08"
  },

  {
    id: "room-08",
    stage: 2,
    stageTitle: "Stage 2 — Networking Fundamentals",
    title: "Ports, Services & Protocols",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Room 07 (IP Addresses & MAC Addresses)",
    whyAreYouHere: "An IP address tells you which computer to connect to, but a computer runs dozens of programs at once. How does incoming data know whether it belongs to a web server, a database, or an email service? The answer is **Ports**. Understanding standard ports and network services is one of the most critical foundational skills in cybersecurity.",
    objectives: [
      "Understand what a network port is (range 0 to 65535)",
      "Learn the three port ranges: Well-Known (0-1023), Registered (1024-49151), and Ephemeral (49152-65535)",
      "Master the most common standard service ports (SSH, HTTP, HTTPS, DNS, SMB, MySQL, RDP)",
      "Understand the difference between open, closed, and filtered port states",
      "Inspect listening services on a system using `ss -tulpn`"
    ],
    vocabulary: [
      { term: "Port", definition: "A 16-bit virtual endpoint (number 0 to 65535) that directs network traffic to a specific software service running on a machine." },
      { term: "Network Service", definition: "A daemon program (like Apache, OpenSSH, or MySQL) bound to a port, listening for incoming network connections." },
      { term: "Well-Known Ports", definition: "Ports 0 through 1023 reserved by IANA for standard core internet protocols and services." },
      { term: "Ephemeral Ports", definition: "Temporary, high-numbered ports (49152-65535) dynamically chosen by client operating systems to receive return traffic." },
      { term: "Open Port", definition: "A port where an active service is listening and willing to accept incoming network connections." }
    ],
    lessons: [
      {
        title: "1. The Apartment Analogy",
        content: `Think of an IP address as the street address of an apartment building: *42 Cyber Street*.
The building has 65,536 individual apartments numbered **0 to 65535**.
• Apartment **80** is the Web concierge (HTTP).
• Apartment **443** is the Secure encrypted concierge (HTTPS).
• Apartment **22** is the Building Administrator's private maintenance door (SSH).
• Apartment **53** is the building directory phonebook (DNS).
When you send a packet, you specify both the destination IP *and* the destination Port!`
      },
      {
        title: "2. The Essential Security Reference Table",
        content: `You do not need to memorize all 65,536 ports. You must know these fundamental ports by heart:
• **21**: FTP (File Transfer Protocol — unencrypted)
• **22**: SSH (Secure Shell — encrypted remote terminal)
• **25**: SMTP (Simple Mail Transfer Protocol)
• **53**: DNS (Domain Name System)
• **80**: HTTP (Hypertext Transfer Protocol — unencrypted web)
• **110**: POP3 (Post Office Protocol email retrieval)
• **143**: IMAP (Internet Message Access Protocol)
• **443**: HTTPS (HTTP over TLS/SSL — encrypted web)
• **445**: SMB (Server Message Block — Windows file sharing)
• **3306**: MySQL (Database engine)
• **3389**: RDP (Remote Desktop Protocol — Windows graphical remote access)`
      }
    ],
    seeExamples: [
      {
        title: "Socket Combination: IP + Port",
        codeOrDiagram: `Client (Your Laptop)                            Target Server
IP: 192.168.1.15                                IP: 104.21.55.2
Ephemeral Port: 54321  =====================>   Destination Port: 443 (HTTPS)
(Dynamic temporary port)                        (Well-known web service)

Return Traffic:
Server (104.21.55.2:443) ===============>       Client (192.168.1.15:54321)`,
        explanation: "The combination of an IP address and a Port number is called a 'Socket' (e.g. `104.21.55.2:443`)."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Find all network services currently listening for incoming connections on this system using `ss -tulpn`:",
      initialCommand: "",
      expectedCommand: "ss -tulpn",
      simulatedOutput: "Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process\ntcp    LISTEN  0       128            0.0.0.0:22            0.0.0.0:*      users:((\"sshd\",pid=842))\ntcp    LISTEN  0       511            0.0.0.0:80            0.0.0.0:*      users:((\"nginx\",pid=1104))\ntcp    LISTEN  0       128          127.0.0.1:3306          0.0.0.0:*      users:((\"mysqld\",pid=1250))\n[+] Success! Discovered listening services: SSH (port 22), Nginx Web (port 80), and MySQL (port 3306 on localhost).",
      explanation: "`ss -tulpn` (Socket Statistics: TCP, UDP, Listening, Process Names, Numeric) is the standard modern utility for auditing active sockets."
    },
    questions: [
      {
        id: "r8-q1",
        type: "matching",
        question: "Match the standard default port number to its corresponding network service:",
        options: [
          "Port 22 -> SSH, Port 80 -> HTTP, Port 443 -> HTTPS, Port 445 -> SMB",
          "Port 22 -> HTTP, Port 80 -> SSH, Port 443 -> DNS, Port 445 -> MySQL",
          "Port 22 -> FTP, Port 80 -> HTTPS, Port 443 -> HTTP, Port 445 -> RDP",
          "Port 22 -> SMB, Port 80 -> MySQL, Port 443 -> RDP, Port 445 -> SSH"
        ],
        correctIndex: 0,
        explanation: "Port 22 is SSH (Secure Shell), Port 80 is unencrypted HTTP, Port 443 is encrypted HTTPS, and Port 445 is Microsoft SMB file sharing."
      },
      {
        id: "r8-q2",
        type: "multiple-choice",
        question: "Looking at the `ss -tulpn` output above, MySQL is listening on `127.0.0.1:3306`. Can a remote attacker on another network connect directly to this database port?",
        options: [
          "Yes, because port 3306 is open to the entire internet",
          "No, because it is bound exclusively to loopback (127.0.0.1), so only local processes on the server can connect to it",
          "Yes, but only if they use an unencrypted FTP client",
          "No, because MySQL only runs on Windows operating systems"
        ],
        correctIndex: 1,
        explanation: "Binding to `127.0.0.1` is a security best-practice. It restricts socket access exclusively to programs running locally on the machine."
      }
    ],
    tasks: [
      {
        title: "Task 1: Audit Open Ports",
        instruction: "Execute `ss -tulpn` in the terminal to inspect listening network services.",
        hints: [
          "Concept: Socket statistics command.",
          "Direction: Use flags `-t` (TCP), `-u` (UDP), `-l` (listening), `-p` (processes), `-n` (numeric).",
          "Tool: `ss`",
          "Syntax: `ss -tulpn`",
          "Explanation: Lists all listening sockets."
        ]
      }
    ],
    explainResult: "The `ss` command queried the Linux kernel socket diagnostic API (`sock_diag`) to retrieve all TCP and UDP transmission control blocks currently in the `LISTEN` state.",
    securityConnection: "Every open port on a server represents attack surface! If a server exposes port 21 (FTP), attackers will test for anonymous logins. If it exposes port 3389 (RDP), they will test for brute-force passwords or BlueKeep vulnerabilities. Hardening a server begins with shutting down every port that is not strictly necessary.",
    completion: {
      learned: [
        "What network ports are and why they exist (0-65535)",
        "The standard common service ports (21, 22, 53, 80, 443, 445, 3306, 3389)",
        "How sockets combine an IP address with a port number",
        "The security implication of binding to 127.0.0.1 vs 0.0.0.0"
      ],
      practiced: [
        "ss -tulpn",
        "Auditing listening sockets",
        "Matching ports to service daemons"
      ]
    },
    nextRoomId: "room-09"
  },

  {
    id: "room-09",
    stage: 2,
    stageTitle: "Stage 2 — Networking Fundamentals",
    title: "TCP/IP & Packet Encapsulation",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Room 08 (Ports, Services & Protocols)",
    whyAreYouHere: "When you download a file or stream a video, the file is not transmitted as one giant continuous block of data. Instead, it is chopped up into thousands of tiny envelopes called **Packets**. In this room, you will learn how data is encapsulated as it moves down the network stack, how the famous TCP 3-Way Handshake establishes reliable connections, and when UDP is chosen instead of TCP.",
    objectives: [
      "Understand Packet Encapsulation and the 4-layer TCP/IP Model",
      "Understand the difference between Frames (Layer 2), Packets (Layer 3), and Segments (Layer 4)",
      "Master the TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK",
      "Compare connection-oriented TCP (reliable) with connectionless UDP (fast, streaming)",
      "Follow an interactive packet visualization"
    ],
    vocabulary: [
      { term: "Packet", definition: "A formatted unit of data carried across a packet-switched network, containing control headers and user payload." },
      { term: "Encapsulation", definition: "The process where each network layer wraps the data from the layer above it with its own header." },
      { term: "TCP (Transmission Control Protocol)", definition: "A reliable, connection-oriented transport protocol that guarantees ordered, error-checked packet delivery." },
      { term: "UDP (User Datagram Protocol)", definition: "A lightweight, connectionless transport protocol that sends datagrams without handshakes or delivery guarantees." },
      { term: "TCP 3-Way Handshake", definition: "The three-message exchange (SYN, SYN-ACK, ACK) required to establish a TCP session before data can flow." },
      { term: "SYN (Synchronize)", definition: "The first TCP packet sent by a client to request a connection and negotiate initial sequence numbers." },
      { term: "ACK (Acknowledge)", definition: "A TCP flag acknowledging receipt of previous packets." }
    ],
    lessons: [
      {
        title: "1. The Russian Nesting Dolls: Encapsulation",
        content: `When your browser sends an HTTP request:
1. **Application Layer**: Contains raw HTTP text: \`GET / HTTP/1.1\`.
2. **Transport Layer (TCP)**: Wraps it in a **TCP Segment** adding Source Port and Destination Port.
3. **Network Layer (IP)**: Wraps that in an **IP Packet** adding Source IP and Destination IP.
4. **Data Link Layer (Ethernet)**: Wraps that in an **Ethernet Frame** adding Source MAC and Destination MAC.
Each layer only cares about its own header!`
      },
      {
        title: "2. The TCP 3-Way Handshake",
        content: `Before a single byte of web data can transfer over TCP, client and server must agree to communicate:
1. **SYN**: Client sends: *"Hello! I want to connect. My sequence number is 1000."*
2. **SYN-ACK**: Server replies: *"I hear you! I agree to connect. I received 1000, and my sequence number is 5000."*
3. **ACK**: Client confirms: *"Understood! Connection established."*
Now data begins flowing. If a packet gets dropped along the way, TCP automatically detects the missing sequence number and re-transmits it!`
      },
      {
        title: "3. TCP vs UDP: Which to Use?",
        content: `• **Use TCP** when **accuracy is essential**: Websites (HTTP/HTTPS), file downloads, SSH, and databases. If a byte is missing in a bank transfer, it corrupts the file.
• **Use UDP** when **speed is essential**: Voice/video calls (VoIP, Zoom), multiplayer online games, and DNS queries. If one audio frame drops in a voice call, nobody wants the call to pause for re-transmission!`
      }
    ],
    seeExamples: [
      {
        title: "The TCP 3-Way Handshake Sequence",
        codeOrDiagram: `Client                                 Server
  |                                      |
  | ------------ [ SYN ] --------------> | (Step 1: Request connection)
  |                                      |
  | <--------- [ SYN-ACK ] ------------- | (Step 2: Acknowledge & offer sync)
  |                                      |
  | ------------ [ ACK ] --------------> | (Step 3: Acknowledge & ready)
  |                                      |
  | ======== [ DATA STREAM ] ==========> | (Step 4: HTTP Request / Payload)`,
        explanation: "Every single web request, SSH login, and database query begins with these exact three packets."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate a TCP handshake to a remote web server using `curl -I https://endlessus.in`:",
      initialCommand: "",
      expectedCommand: "curl -I https://endlessus.in",
      simulatedOutput: "HTTP/2 200 \nserver: GitHub.com\ncontent-type: text/html; charset=utf-8\nstrict-transport-security: max-age=31536000\n[+] Success! Full TCP handshake + TLS negotiation + HTTP/2 HEAD request completed in 42ms.",
      explanation: "`curl -I` performs the TCP handshake, negotiates TLS encryption, sends an HTTP HEAD request, and prints only the response headers."
    },
    questions: [
      {
        id: "r9-q1",
        type: "multiple-choice",
        question: "What are the three steps of the TCP connection establishment handshake in correct chronological order?",
        options: [
          "SYN -> ACK -> FIN",
          "SYN -> SYN-ACK -> ACK",
          "PING -> PONG -> OK",
          "HELLO -> READY -> GO"
        ],
        correctIndex: 1,
        explanation: "The client sends a SYN, the server responds with SYN-ACK, and the client finishes with ACK."
      },
      {
        id: "r9-q2",
        type: "multiple-choice",
        question: "Why does live online multiplayer gaming or VoIP voice chat typically rely on UDP rather than TCP?",
        options: [
          "UDP automatically encrypts all passwords with AES-256",
          "UDP prioritizes real-time low latency over re-transmitting lost packets",
          "UDP requires physical fiber-optic cables to function",
          "UDP is only supported on Windows operating systems"
        ],
        correctIndex: 1,
        explanation: "UDP does not retransmit dropped packets, avoiding stutter and delay during real-time streaming."
      }
    ],
    tasks: [
      {
        title: "Task 1: Execute TCP Connection Probe",
        instruction: "Run `curl -I https://endlessus.in` to complete a handshake and retrieve server headers.",
        hints: [
          "Concept: Perform an HTTP HEAD request via TCP/TLS.",
          "Direction: Use the client URL utility.",
          "Tool: `curl`",
          "Syntax: `curl -I https://endlessus.in`",
          "Explanation: Performs handshake and prints response headers."
        ]
      }
    ],
    explainResult: "The `curl` command initiated a TCP socket, triggered the SYN/SYN-ACK/ACK sequence, negotiated cryptographic ciphers over TLS, and retrieved HTTP status `200 OK`.",
    securityConnection: "Understanding the TCP handshake is the secret behind network scanning! In Stage 5, you will learn about the **SYN Stealth Scan** (`nmap -sS`), where an attacker sends a SYN packet to test if a port is open, but intentionally sends a RST (Reset) before completing the final ACK. This detects open ports without establishing full connections in server application logs!",
    completion: {
      learned: [
        "The 4-layer TCP/IP encapsulation process",
        "Frames (L2), Packets (L3), Segments (L4), and Application Payloads",
        "The mechanics of the TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK)",
        "When to use reliable TCP vs low-latency UDP"
      ],
      practiced: [
        "curl -I",
        "Tracing TCP connection stages",
        "Analyzing header responses"
      ]
    },
    nextRoomId: "room-10"
  },

  {
    id: "room-10",
    stage: 2,
    stageTitle: "Stage 2 — Networking Fundamentals",
    title: "DNS & DHCP Fundamentals",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "25 min",
    prerequisites: "Room 09 (TCP/IP & Packets)",
    whyAreYouHere: "Humans remember names like `endlessus.in` or `google.com`, but routers and switches only understand numerical IP addresses like `104.21.55.2`. How does your computer bridge that gap in a fraction of a millisecond? That is the job of **DNS**, the phonebook of the Internet. In this room, you will learn how DNS resolution works and how **DHCP** automatically configures your device the instant you join a network.",
    objectives: [
      "Understand what the Domain Name System (DNS) does and how it resolves names to IPs",
      "Learn the core DNS record types: A (IPv4), AAAA (IPv6), CNAME (Alias), MX (Mail), and TXT (Verification)",
      "Understand Recursive Resolvers, Root Nameservers, and Authoritative Nameservers",
      "Understand the DHCP 4-step DORA process (Discover, Offer, Request, Acknowledge)",
      "Query DNS records in the terminal using `dig`"
    ],
    vocabulary: [
      { term: "DNS (Domain Name System)", definition: "The distributed hierarchical database system that translates human-readable domain names into numerical IP addresses." },
      { term: "A Record", definition: "A DNS record that maps a domain name directly to an IPv4 address (e.g. `endlessus.in` -> `185.199.108.153`)." },
      { term: "AAAA Record", definition: "A DNS record that maps a domain name to an IPv6 address." },
      { term: "CNAME Record", definition: "Canonical Name record: an alias that points one domain name to another domain name." },
      { term: "MX Record", definition: "Mail Exchange record: specifies the mail servers responsible for accepting email on behalf of a domain." },
      { term: "DHCP (Dynamic Host Configuration Protocol)", definition: "A network protocol that automatically assigns IP addresses, subnet masks, and default gateways to joining devices." }
    ],
    lessons: [
      {
        title: "1. The 4-Step DNS Hierarchy",
        content: `When you type a domain into your browser:
1. **Local / Recursive Resolver** (e.g., your ISP or Cloudflare \`1.1.1.1\`): Checks if the answer is in cache.
2. **Root Nameservers (\`.\`)**: Directs the query to the Top-Level Domain (TLD) servers.
3. **TLD Nameservers (\`.in\` or \`.com\`)**: Directs the query to the domain's Authoritative Nameserver.
4. **Authoritative Nameserver**: Holds the true, official DNS records and returns the final IP address.`
      },
      {
        title: "2. DHCP: The DORA Process",
        content: `When your phone joins a Wi-Fi network, how does it get an IP address without manual configuration?
• **Discover**: Phone broadcasts: *"Is there a DHCP server here? I need an address!"*
• **Offer**: Router replies: *"I have 192.168.1.105 available for you."*
• **Request**: Phone answers: *"Great, I would like to lease 192.168.1.105."*
• **Acknowledge**: Router confirms: *"Lease granted! Your gateway is 192.168.1.1 and DNS is 1.1.1.1."*`
      }
    ],
    seeExamples: [
      {
        title: "Querying DNS Records with dig",
        codeOrDiagram: `cadet@endlessus:~$ dig endlessus.in +short
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

cadet@endlessus:~$ dig endlessus.in MX +short
10 mail.endlessus.in.`,
        explanation: "`dig` (Domain Information Groper) is the ultimate tool for security analysts to query DNS infrastructure."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Query the official IPv4 address of `endlessus.in` using `dig endlessus.in +short`:",
      initialCommand: "",
      expectedCommand: "dig endlessus.in +short",
      simulatedOutput: "185.199.108.153\n185.199.109.153\n185.199.110.153\n185.199.111.153\n[+] Success! Resolved 4 GitHub Pages Anycast IPv4 A-records.",
      explanation: "The query returned the four global Anycast IP addresses serving the static website."
    },
    questions: [
      {
        id: "r10-q1",
        type: "multiple-choice",
        question: "Which DNS record type is responsible for mapping a domain name to a standard 32-bit IPv4 address?",
        options: [
          "MX Record",
          "CNAME Record",
          "A Record",
          "TXT Record"
        ],
        correctIndex: 2,
        explanation: "The 'A' record (Address record) maps hostnames to IPv4 addresses. The 'AAAA' record maps to IPv6."
      },
      {
        id: "r10-q2",
        type: "multiple-choice",
        question: "What is the acronym for the 4-step sequence a device executes with a DHCP server to receive an automatic IP address?",
        options: [
          "DORA (Discover, Offer, Request, Acknowledge)",
          "SYN, ACK, FIN, RST",
          "GET, POST, PUT, DELETE",
          "SCAN, PROBE, IDENTIFY, MAP"
        ],
        correctIndex: 0,
        explanation: "DORA: Discover -> Offer -> Request -> Acknowledge."
      }
    ],
    tasks: [
      {
        title: "Task 1: Query Domain A-Records",
        instruction: "Use `dig endlessus.in +short` to resolve the platform's public IP addresses.",
        hints: [
          "Concept: Query DNS servers for A records.",
          "Direction: Use the standard dig tool with the short flag.",
          "Tool: `dig`",
          "Syntax: `dig endlessus.in +short`",
          "Explanation: Returns IP addresses."
        ]
      }
    ],
    explainResult: "The `dig` utility constructed a UDP datagram on port 53 containing an RFC 1035 DNS Question section for `endlessus.in IN A`, transmitted it to the system resolver, and unpacked the Answer section.",
    securityConnection: "DNS is a prime target for reconnaissance and exploitation. Attackers use 'Subdomain Enumeration' to discover hidden development servers (`dev.company.com`, `admin-portal.company.com`). Additionally, attackers execute 'DNS Spoofing / Cache Poisoning' to redirect banking users to fake phishing websites.",
    completion: {
      learned: [
        "How DNS maps domain names to numerical IP addresses",
        "The hierarchy: Root -> TLD -> Authoritative nameservers",
        "Core record types: A, AAAA, CNAME, MX, and TXT",
        "How DHCP's DORA process assigns network addresses"
      ],
      practiced: [
        "dig endlessus.in +short",
        "Resolving domain names",
        "Understanding DNS answers"
      ]
    },
    nextRoomId: "room-11"
  }
];
