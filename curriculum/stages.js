// curriculum/stages.js
module.exports = [
  {
    id: 0,
    number: "00",
    title: "Start Here",
    tagline: "Welcome & Foundations",
    description: "Zero experience required. Discover what cybersecurity is, how ethical hacking works, and run your very first terminal command.",
    color: "#10b981",
    roomCount: 1,
    estimatedTime: "15 min",
    difficulty: "Beginner"
  },
  {
    id: 1,
    number: "01",
    title: "Computer Fundamentals",
    tagline: "Hardware, OS & Linux",
    description: "Understand the machine before defending or testing it: CPU, RAM, OS kernels, Linux filesystem hierarchy, permissions, and process management.",
    color: "#06b6d4",
    roomCount: 4,
    estimatedTime: "1 hr 45 min",
    difficulty: "Beginner"
  },
  {
    id: 2,
    number: "02",
    title: "Networking Fundamentals",
    tagline: "How Computers Communicate",
    description: "The core backbone of cybersecurity: networks, IP & MAC addresses, ports, protocols, TCP 3-way handshakes, packets, DNS, and DHCP.",
    color: "#3b82f6",
    roomCount: 5,
    estimatedTime: "2 hr 10 min",
    difficulty: "Foundation"
  },
  {
    id: 3,
    number: "03",
    title: "How the Web Works",
    tagline: "Web Architecture, HTTP & Sessions",
    description: "Follow the full journey of a web request: DNS to TLS, HTTP methods, headers, status codes, cookies, and stateful session management.",
    color: "#6366f1",
    roomCount: 3,
    estimatedTime: "1 hr 20 min",
    difficulty: "Foundation"
  },
  {
    id: 4,
    number: "04",
    title: "Cybersecurity Fundamentals",
    tagline: "Security Principles, CIA & Threats",
    description: "The mental framework of security: assets, threats, vulnerabilities, the CIA triad, authentication vs authorization, threat types, and cryptography.",
    color: "#8b5cf6",
    roomCount: 5,
    estimatedTime: "2 hr 05 min",
    difficulty: "Foundation"
  },
  {
    id: 5,
    number: "05",
    title: "Security Tools",
    tagline: "Practitioner Toolset & Analysis",
    description: "Master the essential utilities: Linux security tools, Nmap network scanning, Wireshark packet capture, and security log analysis.",
    color: "#ec4899",
    roomCount: 4,
    estimatedTime: "2 hr 10 min",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    number: "06",
    title: "Web Security",
    tagline: "OWASP Top Flaws & Defenses",
    description: "Explore the most prevalent web application vulnerabilities: SQL Injection, XSS, IDOR, CSRF, authentication flaws, and security headers.",
    color: "#f59e0b",
    roomCount: 8,
    estimatedTime: "4 hr 30 min",
    difficulty: "Intermediate"
  },
  {
    id: 7,
    number: "07",
    title: "Linux Security",
    tagline: "Privilege Escalation & SUID",
    description: "Understand root privilege, SUID binaries, misconfigured sudoers, and how standard users identify escalation pathways.",
    color: "#ef4444",
    roomCount: 1,
    estimatedTime: "40 min",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    number: "08",
    title: "Network Security",
    tagline: "SMB & Network Services",
    description: "Audit enterprise network file shares, identify null sessions, and extract sensitive information from exposed SMB services.",
    color: "#14b8a6",
    roomCount: 1,
    estimatedTime: "35 min",
    difficulty: "Intermediate"
  },
  {
    id: 9,
    number: "09",
    title: "Modern Security",
    tagline: "Tokens, JWT & Cryptanalysis",
    description: "Inspect modern stateless authentication tokens (JWTs), identify algorithm flaws, and practice classical cipher cryptanalysis.",
    color: "#a855f7",
    roomCount: 2,
    estimatedTime: "1 hr 10 min",
    difficulty: "Intermediate"
  },
  {
    id: 10,
    number: "10",
    title: "Junior Pentester",
    tagline: "Methodology, Tooling & Capstone",
    description: "Synthesize all knowledge into a professional pentest methodology: OSINT recon, web directory fuzzing, Burp Suite, advanced privesc, and a complete capstone engagement.",
    color: "#e11d48",
    roomCount: 6,
    estimatedTime: "4 hr 05 min",
    difficulty: "Advanced"
  }
];
