# scripts/level4.py
# Level 4: Networking Fundamentals (Rooms 20 - 28)

from generate_pre_security import DIAGRAMS

def get_rooms():
    return [
        # Room 20: What is a Network? Topologies & Devices
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "What is a Network? Topologies & Physical Devices",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "LAN (Local Area Network)", "definition": "A network covering a small geographic area like a home, office, or school building."},
                {"term": "WAN (Wide Area Network)", "definition": "A network connecting multiple LANs across large geographical regions, cities, or continents (the Internet is the largest WAN)."},
                {"term": "Switch", "definition": "A Layer 2 networking device that forwards traffic intelligently between devices on the same local network using MAC addresses."},
                {"term": "Router", "definition": "A Layer 3 device that routes data packets between different independent networks using IP addresses."},
                {"term": "Firewall", "definition": "A security barrier that monitors and controls incoming and outgoing network traffic based on predetermined security rules."}
            ],
            "diagramSvg": DIAGRAMS["handshake"],
            "lessons": [
                {
                    "title": "1. What is a Network?",
                    "content": "A **computer network** is two or more computing devices connected by physical cables (copper Ethernet, glass fiber-optics) or wireless radio waves (Wi-Fi, cellular) to share data and resources.\n\n• **LAN (Local Area Network)**: Your home Wi-Fi network or corporate office floor.\n• **WAN (Wide Area Network)**: Connects distant LANs together over miles or oceans. The global Internet is a giant network of interconnected WANs.\n• **WLAN (Wireless LAN)**: A LAN that uses Wi-Fi radio frequencies (2.4 GHz, 5 GHz, 6 GHz) instead of physical cables."
                },
                {
                    "title": "2. Network Topologies: How Devices Are Arranged",
                    "content": "• **Star Topology**: The dominant modern standard. Every workstation connects directly to a central Switch. If one cable is severed, only that one computer loses connection; everyone else remains online.\n• **Mesh Topology**: Devices have multiple redundant links to each other. Used in the Internet backbone and high-security datacenters. If router A fails, traffic automatically reroutes through router B.\n• **Bus / Ring (Legacy)**: Older topologies where a single cable break took down the entire office network."
                },
                {
                    "title": "3. The Hardware: Hub vs Switch vs Router vs Firewall",
                    "content": "• **Hub (Obsolete/Insecure)**: Repeats incoming electrical signals to ALL ports simultaneously! Anyone plugged into a hub can sniff everyone else's passwords!\n• **Switch (Layer 2)**: Intelligent! Learns physical MAC addresses and sends frames ONLY to the specific port of the intended recipient.\n• **Router (Layer 3)**: The gateway between networks. Connects your home LAN (`192.168.1.0/24`) to the public Internet.\n• **Firewall**: The security gatekeeper. Inspects packets and drops unauthorized connections (e.g. blocking incoming port 445 SMB connections from the public web)."
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
                    "acceptedAnswers": ["switch"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `ip link`"]
                }
            ],
            "securityConnection": "In 'ARP Spoofing' or 'Man-in-the-Middle' (MitM) attacks, an attacker on a switched local network sends fake ARP responses to trick computers into routing their traffic through the attacker's machine before reaching the router, effectively converting a switch into an insecure hub."
        },

        # Room 21: IP Addresses, IPv4 & MAC Addresses
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "IP Addresses, IPv4 & Physical MAC Addresses",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "IPv4 Address", "definition": "A 32-bit logical numerical label assigned to each device participating in an IP computer network (e.g. 192.168.1.1)."},
                {"term": "Octet", "definition": "An 8-bit section of an IPv4 address, with values ranging from 0 to 255 in decimal notation."},
                {"term": "MAC Address (Media Access Control)", "definition": "A 48-bit unique physical hardware identifier permanently burned into a Network Interface Card (NIC)."},
                {"term": "OUI (Organizationally Unique Identifier)", "definition": "The first 3 bytes (24 bits) of a MAC address that identify the hardware manufacturer (e.g., Apple, Intel, Cisco)."},
                {"term": "ARP (Address Resolution Protocol)", "definition": "The protocol used to discover the physical MAC address corresponding to a known target IPv4 address on a local network."}
            ],
            "diagramSvg": DIAGRAMS["dns"],
            "lessons": [
                {
                    "title": "1. IPv4 Address Anatomy: 32 Bits in 4 Octets",
                    "content": "An IPv4 address is simply a **32-bit binary number** written as four 8-bit numbers (**octets**) separated by dots:\n\n`192.168.1.10`\n\nLet's convert to binary:\n• `192` = `11000000` ($128 + 64$)\n• `168` = `10101000` ($128 + 32 + 8$)\n• `1` = `00000001`\n• `10` = `00001010` ($8 + 2$)\n\nBecause each octet has 8 bits, the minimum value is `0` (`00000000`) and the maximum is `255` (`11111111`). You can NEVER have an IP like `192.168.1.300`!"
                },
                {
                    "title": "2. MAC Addresses: Physical Hardware Identity",
                    "content": "While your IP address changes whenever you move from home Wi-Fi to a coffee shop, your **MAC Address** is burned directly into your network chip:\n\n`B8:27:EB:A5:42:19`\n\n• **Length**: 48 bits, displayed as 6 pairs of hexadecimal numbers (0-9, A-F).\n• **First 3 pairs (`B8:27:EB`)**: The **OUI** identifying the hardware manufacturer (here, Raspberry Pi Foundation).\n• **Last 3 pairs (`A5:42:19`)**: The unique serial number for that individual network card."
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
                    "acceptedAnswers": ["32", "32 bits"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "4 octets times 8 bits per octet.",
                    "explanation": "An IPv4 address consists of 32 bits divided into 4 eight-bit octets."
                },
                {
                    "id": "q-21-2",
                    "type": "exact",
                    "question": "Which protocol resolves a known local IP address into its corresponding physical MAC hardware address?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["ARP", "Address Resolution Protocol"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Address Resolution Protocol abbreviation.",
                    "explanation": "ARP maps Layer 3 IP addresses to Layer 2 MAC addresses."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect ARP table",
                    "instruction": "Execute `arp -n` in the terminal.",
                    "hints": ["Type: `arp -n`"]
                }
            ],
            "securityConnection": "Because ARP has no authentication, attackers on a local network can send unsolicited fake ARP replies ('Gratuitous ARP') claiming *they* own the default gateway's IP address. All network computers then send their outbound traffic directly to the attacker!"
        },

        # Room 22: Private vs Public IPs & NAT
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "Private vs Public IP Addresses & NAT",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "Public IP Address", "definition": "A globally unique IP address registered with IANA and routable across the entire worldwide Internet."},
                {"term": "Private IP Address (RFC 1918)", "definition": "IP ranges reserved strictly for private internal networks. Routers on the public internet drop them immediately."},
                {"term": "NAT (Network Address Translation)", "definition": "A technique used by routers to translate multiple private internal IP addresses into a single public IP address using port numbers."},
                {"term": "Loopback Address (127.0.0.1)", "definition": "A special IP address that routes network traffic back into the local machine itself ('localhost')."},
                {"term": "Default Gateway", "definition": "The IP address of the local router interface that devices send traffic to when the destination is outside their local subnet."}
            ],
            "diagramSvg": DIAGRAMS["dns"],
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
                    "content": "The entire `127.0.0.0/8` range is reserved for **loopback testing**.\n\nWhen you send traffic to `127.0.0.1` (or the domain name `localhost`), packets never touch a physical network card or cable—the kernel loops the packets directly into internal memory. Web developers use localhost to test web servers privately before publishing them to the world."
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
                    "acceptedAnswers": ["127.0.0.1"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `ip route`"]
                }
            ],
            "securityConnection": "In SSRF (Server-Side Request Forgery) attacks against web applications, an attacker tricks a public web server into making requests to its own internal private IP (`http://192.168.1.10/admin` or `http://127.0.0.1:8080/metrics`), bypassing external firewall boundaries!"
        },

        # Room 23: Subnetting & CIDR Basics
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "Subnetting & CIDR Notation Demystified",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "Subnet Mask", "definition": "A 32-bit number with contiguous 1s followed by 0s that separates an IP address into Network and Host portions (e.g. 255.255.255.0)."},
                {"term": "CIDR (Classless Inter-Domain Routing)", "definition": "A shorthand notation representing the number of leading 1-bits in a subnet mask (e.g., /24 means 24 ones: 255.255.255.0)."},
                {"term": "Network Address", "definition": "The very first address in a subnet where all host bits are 0 (e.g., 192.168.1.0). Identifies the network itself and cannot be assigned to a host."},
                {"term": "Broadcast Address", "definition": "The very last address in a subnet where all host bits are 1 (e.g., 192.168.1.255). Used to send a packet to all hosts on the subnet."},
                {"term": "Usable Host Range", "definition": "All IP addresses between the Network Address and Broadcast Address that can be assigned to devices."}
            ],
            "diagramSvg": DIAGRAMS["dns"],
            "lessons": [
                {
                    "title": "1. Why Subnet? Network ID vs Host ID",
                    "content": "Imagine a phone number: `+1 (555) 123-4567`.\n• `+1 (555)` is the area code (Network ID)—everyone in that city shares it.\n• `123-4567` is your unique personal line (Host ID).\n\nIn IP networking, every IP address contains both a **Network portion** and a **Host portion**:\n• A **Subnet Mask** uses binary 1s to highlight the network bits and binary 0s for host bits:\n\n```\nIP:     192 . 168 .   1 . 100 -> 11000000.10101000.00000001.01100100\nMask:   255 . 255 . 255 .   0 -> 11111111.11111111.11111111.00000000\nNetwork:192 . 168 .   1 .   0 (First 24 bits are Network, last 8 bits are Host)\n```"
                },
                {
                    "title": "2. CIDR Prefix Notation (/24)",
                    "content": "Writing `255.255.255.0` is tedious. Network engineers use **CIDR notation** (slash notation) indicating how many 1s are in the mask:\n\n• `/24`: 24 ones (`255.255.255.0`). $32 - 24 = 8$ host bits -> $2^8 = 256$ IPs ($254$ usable hosts).\n• `/16`: 16 ones (`255.255.0.0`). $32 - 16 = 16$ host bits -> $2^{16} = 65,536$ IPs ($65,534$ usable hosts).\n• `/8`: 8 ones (`255.0.0.0`). $32 - 8 = 24$ host bits -> $2^{24} = 16.7$ million IPs."
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
                    "acceptedAnswers": ["255.255.255.0"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Three 255s followed by a 0.",
                    "explanation": "/24 equals 24 binary ones: 255.255.255.0."
                },
                {
                    "id": "q-23-2",
                    "type": "exact",
                    "question": "How many usable host IP addresses are available in a standard /24 subnet after subtracting the network and broadcast addresses?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["254"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "256 minus 2.",
                    "explanation": "256 total IP addresses minus 2 reserved (network and broadcast) = 254 usable hosts."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect CIDR subnet on eth0",
                    "instruction": "Execute `ip -4 addr show eth0` in the terminal.",
                    "hints": ["Type: `ip -4 addr show eth0`"]
                }
            ],
            "securityConnection": "In network penetration testing, defining your target scope involves CIDR notation (e.g. `nmap -sn 10.10.20.0/24`). Scanning a `/24` scans 256 IPs; scanning a `/16` scans 65,536 IPs! Scoping errors can result in accidentally scanning unauthorized client networks."
        },

        # Room 24: TCP vs UDP & The 3-Way Handshake
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "TCP vs UDP & The 3-Way Handshake",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "TCP (Transmission Control Protocol)", "definition": "A connection-oriented, reliable protocol that guarantees packet delivery in the correct sequence with error checking and retransmission."},
                {"term": "UDP (User Datagram Protocol)", "definition": "A lightweight, connectionless, 'best-effort' protocol with low latency, but no guarantee of delivery or ordering."},
                {"term": "SYN (Synchronize)", "definition": "The TCP flag sent by a client to initiate a connection and synchronize sequence numbers."},
                {"term": "ACK (Acknowledge)", "definition": "The TCP flag indicating receipt of transmitted packets or acknowledging a handshake step."},
                {"term": "RST (Reset)", "definition": "The TCP flag that abruptly closes a connection, often sent by firewalls or closed ports rejecting a connection."}
            ],
            "diagramSvg": DIAGRAMS["handshake"],
            "lessons": [
                {
                    "title": "1. TCP vs UDP: Reliable vs Fast",
                    "content": "• **TCP (Reliable & Orderly)**: Before any data is transmitted, a formal connection must be established. Every packet is tracked by a sequence number. If a packet is lost in transit, the sender automatically retransmits it. Used for: Web (HTTP/HTTPS), SSH, Email (SMTP), and File Transfer (FTP).\n• **UDP (Fire and Forget)**: No handshake, no sequence numbers, no retransmissions. Packets are fired like a stream of water. If a packet is dropped, it is gone forever! Used for: Live video streaming, VoIP voice calls, multiplayer gaming, and fast DNS queries."
                },
                {
                    "title": "2. The TCP 3-Way Handshake",
                    "content": "Before your browser downloads a single byte from a web server, the two devices perform a 3-step conversation:\n\n1. **Step 1: SYN (Synchronize)**: Client sends: *\"Hello server, I want to connect to port 443. My initial sequence number is 1000.\"*\n2. **Step 2: SYN-ACK (Synchronize-Acknowledge)**: Server replies: *\"I hear you! I acknowledge your 1000 (ACK=1001). My sequence number is 5000 (SYN=5000).\"*\n3. **Step 3: ACK (Acknowledge)**: Client sends: *\"Got it! I acknowledge your 5000 (ACK=5001). Let's begin transferring data!\"*\n\nThe connection is now **ESTABLISHED**."
                },
                {
                    "title": "3. The TCP Control Flags",
                    "content": "Every TCP packet header contains 1-bit flags that communicate connection state:\n\n• **SYN**: Initiates connection.\n• **ACK**: Acknowledges received data.\n• **FIN**: Gracefully terminates connection ('I am finished sending data').\n• **RST**: Abruptly aborts connection ('Port closed / Connection reset').\n• **PSH**: Push data to the application immediately without waiting for buffer."
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
                    "acceptedAnswers": ["SYN"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `netstat -tuln`"]
                }
            ],
            "securityConnection": "In network scanning, **SYN Stealth Scanning** (`nmap -sS`) sends only the initial SYN packet. If the server replies SYN-ACK, Nmap knows the port is open and immediately sends a RST packet to tear down the connection *without* completing the handshake, evading older application-level loggers!"
        },

        # Room 25: Ports & Common Network Services
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "Ports & Common Network Services",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "Port Number", "definition": "A 16-bit integer (0 to 65535) in transport layer headers that identifies a specific application endpoint or service on a host."},
                {"term": "Well-Known Ports (0-1023)", "definition": "Standard ports reserved for core system services and protocols (requires administrative privileges to bind on Unix)."},
                {"term": "Ephemeral Ports (49152-65535)", "definition": "Short-lived temporary ports assigned dynamically by the operating system for client outbound connections."},
                {"term": "Socket", "definition": "The combination of an IP address and a Port number (e.g. 10.10.20.15:22) identifying a unique communication endpoint."},
                {"term": "Banner Grabbing", "definition": "The reconnaissance technique of connecting to a network port and reading the welcoming text banner sent by the service to identify its software version."}
            ],
            "diagramSvg": DIAGRAMS["handshake"],
            "lessons": [
                {
                    "title": "1. What is a Port?",
                    "content": "Think of an IP address as the street address of an apartment complex, and the **Port Number** as the individual apartment unit number. Even though all mail goes to the same building, unit 22 gets SSH mail, unit 80 gets web mail, and unit 53 gets DNS mail!\n\nThere are **65,536 total ports** ($2^{16}$), divided into:\n• **Well-Known Ports (0 - 1023)**: Standardized services.\n• **Registered Ports (1024 - 49151)**: Vendor services (e.g. MySQL port 3306).\n• **Dynamic / Ephemeral Ports (49152 - 65535)**: Random outbound client ports."
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
                    "acceptedAnswers": ["443"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Three digits: 443.",
                    "explanation": "Port 443 is the standard port for HTTPS."
                },
                {
                    "id": "q-25-2",
                    "type": "exact",
                    "question": "Which port is used by Secure Shell (SSH) for encrypted Linux remote administration?",
                    "visualSlots": "_ _",
                    "acceptedAnswers": ["22"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `ss -tln`"]
                }
            ],
            "securityConnection": "Port scanning (using Nmap) is the foundation of network reconnaissance. Finding an open, unhardened port 445 (SMB) or an ancient port 23 (Telnet) provides penetration testers with immediate initial attack vectors."
        },

        # Room 26: DNS & Domain Name Resolution
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "DNS & Domain Name Resolution",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "DNS (Domain Name System)", "definition": "A hierarchical decentralized naming system that translates human-friendly domain names into numerical IP addresses."},
                {"term": "A Record", "definition": "An Address record that maps a domain name directly to a 32-bit IPv4 address."},
                {"term": "CNAME (Canonical Name)", "definition": "An alias record that redirects one domain name to another domain name."},
                {"term": "MX (Mail Exchange)", "definition": "Specifies the mail servers responsible for accepting incoming emails on behalf of a domain."},
                {"term": "Authoritative Name Server", "definition": "The definitive server that holds the actual DNS records for a specific domain name zone."}
            ],
            "diagramSvg": DIAGRAMS["dns"],
            "lessons": [
                {
                    "title": "1. The 4 Steps of DNS Resolution",
                    "content": "When you type `endlessus.in` into your browser, what happens?\n\n1. **Recursive Resolver**: Your browser asks your local ISP or public resolver (`8.8.8.8` / `1.1.1.1`).\n2. **Root Server (`.`)**: If not cached, the resolver asks one of the 13 global Root Servers: *\"Where is `.in`?\"* The root server points to the `.in` TLD server.\n3. **TLD Server (`.in`)**: The Top-Level Domain server replies: *\"The authoritative name server for `endlessus.in` is Cloudflare!\"*\n4. **Authoritative Name Server**: Cloudflare answers with the final record: *\"`endlessus.in` is at IP `104.21.75.12`!\"*\n\nYour browser caches this answer and connects directly to `104.21.75.12` on port 443!"
                },
                {
                    "title": "2. Essential DNS Record Types",
                    "content": "• **A Record**: Points a hostname to an **IPv4** address (`endlessus.in` -> `104.21.75.12`).\n• **AAAA Record**: Points a hostname to a 128-bit **IPv6** address.\n• **CNAME Record**: An **alias**. `www.google.com` is a CNAME pointing to `google.com`.\n• **MX Record**: Defines mail servers for email delivery.\n• **TXT Record**: Plain text data. Widely used for security verification: SPF (Sender Policy Framework) and DKIM to prevent email phishing and spoofing!"
                },
                {
                    "title": "3. Querying DNS with nslookup and dig",
                    "content": "Security analysts inspect DNS using command-line utilities:\n\n• **`nslookup [domain]`**: Simple cross-platform lookup tool.\n• **`dig [domain] [type]`**: Detailed Unix diagnostic tool (Domain Information Groper):\n  `dig endlessus.in A`\n  `dig endlessus.in MX` (checks mail servers)."
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
                    "acceptedAnswers": ["DNS", "Domain Name System"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Domain Name System abbreviation.",
                    "explanation": "DNS (Domain Name System) resolves domain names to IP addresses."
                },
                {
                    "id": "q-26-2",
                    "type": "exact",
                    "question": "Which specific DNS record type maps a domain name directly to an IPv4 address?",
                    "visualSlots": "_",
                    "acceptedAnswers": ["A", "A record"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "The single letter A.",
                    "explanation": "An 'A' record maps hostnames to 32-bit IPv4 addresses."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Resolve domain with nslookup",
                    "instruction": "Execute `nslookup endlessus.in` in the terminal.",
                    "hints": ["Type: `nslookup endlessus.in`"]
                }
            ],
            "securityConnection": "Attackers perform 'DNS Zone Transfers' (AXFR) against misconfigured authoritative name servers to dump an entire organization's internal network subdomains, server names, and private IP addresses in seconds!"
        },

        # Room 27: DHCP & Address Assignment
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "DHCP & Automatic Address Assignment (DORA)",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "DHCP (Dynamic Host Configuration Protocol)", "definition": "A network management protocol used to automatically assign IP addresses and network configuration parameters to client devices."},
                {"term": "DORA", "definition": "The 4-step handshake used by DHCP: Discover (broadcast), Offer (server reply), Request (client selection), and Acknowledge (server confirmation)."},
                {"term": "DHCP Lease", "definition": "The temporary duration for which a client is permitted to use an assigned IP address before needing to renew it."},
                {"term": "Rogue DHCP Server", "definition": "An unauthorized DHCP server deployed by an attacker on a LAN to hand out malicious DNS server IPs and default gateways to clients."}
            ],
            "diagramSvg": DIAGRAMS["handshake"],
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
                    "acceptedAnswers": ["DORA"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `echo \"D-O-R-A: Discover, Offer, Request, Acknowledge\"`"]
                }
            ],
            "securityConnection": "Enterprise switches use a defensive feature called **DHCP Snooping** to block rogue DHCP attacks: only switch ports designated by administrators as 'trusted' (where legitimate DHCP servers live) are allowed to send DHCP Offer and Ack packets."
        },

        # Room 28: The OSI & TCP/IP Models
        {
            "stage": 4,
            "level": 4,
            "levelTitle": "Level 4 — Networking Fundamentals",
            "title": "The OSI & TCP/IP Models & Network Troubleshooting",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
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
                {"term": "OSI 7-Layer Model", "definition": "A conceptual framework developed by ISO characterizing the functions of a telecommunication system into 7 distinct abstraction layers."},
                {"term": "Encapsulation", "definition": "The process of wrapping data with protocol headers as it travels down the protocol stack (Data -> Segment -> Packet -> Frame -> Bits)."},
                {"term": "PDU (Protocol Data Unit)", "definition": "The specific unit of data transferred at a given layer (Layer 1: Bits, Layer 2: Frames, Layer 3: Packets, Layer 4: Segments)."},
                {"term": "ping (ICMP)", "definition": "A network administration tool used to test reachability of a host using ICMP Echo Request and Echo Reply packets."},
                {"term": "traceroute", "definition": "A utility that records each router hop along the path between your computer and a destination host by incrementing IP TTL values."}
            ],
            "diagramSvg": DIAGRAMS["osi"],
            "lessons": [
                {
                    "title": "1. The 7 Layers of the OSI Model",
                    "content": "Memorize this classic mnemonic: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way!\n\n• **Layer 7 - Application**: Human-computer interaction (HTTP, DNS, SSH, FTP).\n• **Layer 6 - Presentation**: Data formatting, character encoding, SSL/TLS encryption.\n• **Layer 5 - Session**: Manages dialogues and persistent connections between devices.\n• **Layer 4 - Transport**: End-to-end transport, port numbers, reliability (TCP, UDP). **PDU: Segment**.\n• **Layer 3 - Network**: Logical IP addressing and routing between networks. **PDU: Packet**.\n• **Layer 2 - Data Link**: Physical MAC addressing and switching on local network. **PDU: Frame**.\n• **Layer 1 - Physical**: Raw transmission of electrical, optical, or radio binary pulses. **PDU: Bits**."
                },
                {
                    "title": "2. Data Encapsulation: The Envelopes Within Envelopes",
                    "content": "When you send a message, it is encapsulated like nesting Russian dolls:\n\n1. At Layer 7, you type an HTTP request (`Data`).\n2. At Layer 4, the kernel adds a **TCP header** with source & dest ports -> **Segment**.\n3. At Layer 3, the kernel adds an **IP header** with source & dest IP addresses -> **Packet**.\n4. At Layer 2, the network card adds an **Ethernet header** with source & dest MACs -> **Frame**.\n5. At Layer 1, the physical NIC pulses the frame as electrical 1s and 0s onto the wire -> **Bits**!\n\nWhen the server receives the bits, it does **Decapsulation**—stripping off the layers one by one until only the pure HTTP data remains."
                },
                {
                    "title": "3. Troubleshooting Down the Stack",
                    "content": "When a network fails, troubleshoot from Layer 1 up to Layer 7:\n\n• **Layer 1 (Physical)**: Is the Ethernet cable plugged in? Is Wi-Fi turned on?\n• **Layer 3 (Network)**: Can you reach your default gateway? Run `ping 192.168.1.1`.\n• **Layer 3 (Internet Routing)**: Can you reach Google's IP? Run `ping 8.8.8.8`.\n• **Layer 7 (DNS)**: Can you resolve names? Run `nslookup google.com`."
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
                    "acceptedAnswers": ["packet", "packets"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
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
                    "hints": ["Type: `ping -c 2 10.10.20.15`"]
                }
            ],
            "securityConnection": "Security controls map directly to OSI layers: Physical access control operates at Layer 1; 802.1X port security operates at Layer 2; Network firewalls filter at Layer 3/4; Web Application Firewalls (WAFs) like ModSecurity operate at Layer 7 by inspecting application HTTP payloads."
        }
    ]
