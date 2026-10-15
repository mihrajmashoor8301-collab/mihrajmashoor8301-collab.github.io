#!/usr/bin/env python3
"""
Authoritative Pre Security Curriculum Generator
Generates pre-security-data.js containing:
- 8 Progressive Levels (Levels 0 to 7)
- 45 Comprehensive, Beginner-First Rooms
- SVG Diagrams for every level
- TryHackMe-Style Question System:
  - Exact answers with visual character slots (_ _ _)
  - Multiple choice with detailed feedback
  - Hints and post-solve explanations
  - Case-insensitive trimming
- Seamless integration with simulated practice terminal & 13 practical labs
"""

import json
import os

LEVELS = [
    {
        "id": 0,
        "number": "00",
        "title": "Start Here",
        "tagline": "Welcome to Cybersecurity & Foundations",
        "description": "Zero prior experience required. Discover what ethical cybersecurity is, understand the legal boundaries, and execute your first shell command.",
        "color": "#0284c7",
        "icon": "flag",
        "roomCount": 2,
        "estimatedTime": "35 min",
        "difficulty": "Beginner"
    },
    {
        "id": 1,
        "number": "01",
        "title": "Computer Fundamentals",
        "tagline": "Hardware, Storage, Processes & Operating Systems",
        "description": "Understand the machine before defending it: CPU, RAM, motherboards, filesystems, processes, services, and operating system permissions.",
        "color": "#0ea5e9",
        "icon": "memory",
        "roomCount": 4,
        "estimatedTime": "1 hr 40 min",
        "difficulty": "Beginner"
    },
    {
        "id": 2,
        "number": "02",
        "title": "Linux Fundamentals",
        "tagline": "The Essential Operating System of Security",
        "description": "Master the Linux command line: filesystem navigation, file management, permissions, process monitoring, pipes, redirection, and bash basics.",
        "color": "#10b981",
        "icon": "terminal",
        "roomCount": 8,
        "estimatedTime": "3 hr 15 min",
        "difficulty": "Beginner"
    },
    {
        "id": 3,
        "number": "03",
        "title": "Windows Fundamentals",
        "tagline": "Enterprise Workstations, Processes & PowerShell",
        "description": "Explore the Windows operating system architecture, NTFS permissions, Task Manager, services, Command Prompt (CMD), and PowerShell essentials.",
        "color": "#3b82f6",
        "icon": "desktop_windows",
        "roomCount": 5,
        "estimatedTime": "2 hr 10 min",
        "difficulty": "Beginner"
    },
    {
        "id": 4,
        "number": "04",
        "title": "Networking Fundamentals",
        "tagline": "How Computers Communicate Across the Globe",
        "description": "The foundational backbone of cyber: LAN/WAN, IP & MAC addresses, subnets, CIDR, TCP/UDP 3-way handshake, ports, DNS, DHCP, and the OSI model.",
        "color": "#6366f1",
        "icon": "lan",
        "roomCount": 9,
        "estimatedTime": "4 hr",
        "difficulty": "Foundation"
    },
    {
        "id": 5,
        "number": "05",
        "title": "Internet & Web Fundamentals",
        "tagline": "Browsers, HTTP/S, Headers & Web Architecture",
        "description": "Learn how the modern web operates: client-server architecture, URLs, HTTP methods, status codes, headers, cookies, TLS/HTTPS, and APIs.",
        "color": "#8b5cf6",
        "icon": "public",
        "roomCount": 5,
        "estimatedTime": "2 hr 20 min",
        "difficulty": "Foundation"
    },
    {
        "id": 6,
        "number": "06",
        "title": "Cybersecurity Fundamentals",
        "tagline": "The CIA Triad, Threat Modeling & Defensive Controls",
        "description": "Understand core security principles: CIA triad, threats vs vulnerabilities vs risks, malware types, authentication vs authorization, hashing, and defense-in-depth.",
        "color": "#f59e0b",
        "icon": "security",
        "roomCount": 6,
        "estimatedTime": "2 hr 45 min",
        "difficulty": "Foundation"
    },
    {
        "id": 7,
        "number": "07",
        "title": "First Practical Security Labs",
        "tagline": "Hands-On Investigation in the Simulated Terminal",
        "description": "Put knowledge into action with hands-on guided exercises: Linux command-line auditing, file permissions, HTTP headers, network recon, and log analysis.",
        "color": "#ef4444",
        "icon": "biotech",
        "roomCount": 6,
        "estimatedTime": "3 hr 30 min",
        "difficulty": "Practical"
    }
]

# SVG Visuals
DIAGRAMS = {
    "terminal": '''<svg viewBox="0 0 600 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0b0f19;border-radius:8px;font-family:monospace;">
  <rect x="20" y="25" width="160" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
  <text x="100" y="65" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Learner (You)</text>
  <text x="100" y="90" fill="#94a3b8" font-size="11" text-anchor="middle">Input Command</text>
  <text x="100" y="110" fill="#38bdf8" font-size="12" text-anchor="middle">whoami</text>
  
  <path d="M 180 80 L 230 80" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="230,80 220,75 220,85" fill="#38bdf8"/>
  
  <rect x="230" y="25" width="150" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="305" y="65" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Shell (Bash)</text>
  <text x="305" y="90" fill="#94a3b8" font-size="11" text-anchor="middle">Parses Command</text>
  <text x="305" y="110" fill="#10b981" font-size="11" text-anchor="middle">Executes /usr/bin</text>

  <path d="M 380 80 L 430 80" stroke="#10b981" stroke-width="2"/>
  <polygon points="430,80 420,75 420,85" fill="#10b981"/>
  
  <rect x="430" y="25" width="150" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="505" y="65" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Linux Kernel</text>
  <text x="505" y="90" fill="#94a3b8" font-size="11" text-anchor="middle">Queries User ID</text>
  <text x="505" y="110" fill="#f59e0b" font-size="12" text-anchor="middle">Output: cadet</text>
</svg>''',

    "hardware": '''<svg viewBox="0 0 600 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;border-radius:8px;font-family:sans-serif;">
  <rect x="30" y="30" width="140" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
  <text x="100" y="70" fill="#38bdf8" font-size="16" font-weight="bold" text-anchor="middle">CPU</text>
  <text x="100" y="95" fill="#94a3b8" font-size="11" text-anchor="middle">Arithmetic &amp; Logic</text>
  <text x="100" y="115" fill="#cbd5e1" font-size="10" text-anchor="middle">Executes instructions</text>

  <path d="M 170 90 L 230 90" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4"/>
  <text x="200" y="80" fill="#38bdf8" font-size="10" text-anchor="middle">BUS</text>

  <rect x="230" y="30" width="140" height="120" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="300" y="70" fill="#10b981" font-size="16" font-weight="bold" text-anchor="middle">RAM</text>
  <text x="300" y="95" fill="#94a3b8" font-size="11" text-anchor="middle">Volatile Memory</text>
  <text x="300" y="115" fill="#cbd5e1" font-size="10" text-anchor="middle">Fast working set</text>

  <path d="M 370 90 L 430 90" stroke="#10b981" stroke-width="3" stroke-dasharray="4"/>
  <text x="400" y="80" fill="#10b981" font-size="10" text-anchor="middle">NVMe</text>

  <rect x="430" y="30" width="140" height="120" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="500" y="70" fill="#f59e0b" font-size="16" font-weight="bold" text-anchor="middle">SSD / Storage</text>
  <text x="500" y="95" fill="#94a3b8" font-size="11" text-anchor="middle">Non-Volatile</text>
  <text x="500" y="115" fill="#cbd5e1" font-size="10" text-anchor="middle">Permanent files</text>
</svg>''',

    "handshake": '''<svg viewBox="0 0 600 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;border-radius:8px;font-family:monospace;">
  <line x1="120" y1="30" x2="120" y2="180" stroke="#38bdf8" stroke-width="3"/>
  <text x="120" y="22" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Client (You)</text>
  
  <line x1="480" y1="30" x2="480" y2="180" stroke="#10b981" stroke-width="3"/>
  <text x="480" y="22" fill="#10b981" font-size="13" font-weight="bold" text-anchor="middle">Target Server</text>

  <!-- Step 1 SYN -->
  <line x1="120" y1="60" x2="480" y2="80" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="480,80 470,75 470,85" fill="#f59e0b"/>
  <text x="300" y="65" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">1. SYN (Synchronize seq=100)</text>

  <!-- Step 2 SYN-ACK -->
  <line x1="480" y1="105" x2="120" y2="125" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="120,125 130,120 130,130" fill="#38bdf8"/>
  <text x="300" y="110" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">2. SYN-ACK (ack=101 seq=300)</text>

  <!-- Step 3 ACK -->
  <line x1="120" y1="150" x2="480" y2="170" stroke="#10b981" stroke-width="2"/>
  <polygon points="480,170 470,165 470,175" fill="#10b981"/>
  <text x="300" y="155" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">3. ACK (Connection Established)</text>
</svg>''',

    "cia": '''<svg viewBox="0 0 600 180" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;border-radius:8px;font-family:sans-serif;">
  <polygon points="300,25 150,150 450,150" fill="none" stroke="#0284c7" stroke-width="3"/>
  <circle cx="300" cy="25" r="16" fill="#38bdf8"/>
  <text x="300" y="10" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Confidentiality</text>
  <text x="300" y="30" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">C</text>

  <circle cx="150" cy="150" r="16" fill="#10b981"/>
  <text x="100" y="172" fill="#10b981" font-size="13" font-weight="bold" text-anchor="middle">Integrity</text>
  <text x="150" y="154" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">I</text>

  <circle cx="450" cy="150" r="16" fill="#f59e0b"/>
  <text x="500" y="172" fill="#f59e0b" font-size="13" font-weight="bold" text-anchor="middle">Availability</text>
  <text x="450" y="154" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">A</text>

  <text x="300" y="100" fill="#f8fafc" font-size="15" font-weight="bold" text-anchor="middle">The CIA Triad</text>
  <text x="300" y="120" fill="#94a3b8" font-size="11" text-anchor="middle">Core Pillars of Cybersecurity</text>
</svg>''',

    "dns": '''<svg viewBox="0 0 600 170" width="100%" height="170" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;border-radius:8px;font-family:sans-serif;">
  <rect x="20" y="55" width="120" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
  <text x="80" y="80" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Your Browser</text>
  <text x="80" y="100" fill="#94a3b8" font-size="10" text-anchor="middle">endlessus.in?</text>

  <path d="M 140 85 L 220 85" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="220,85 210,80 210,90" fill="#38bdf8"/>
  
  <rect x="220" y="30" width="160" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="300" y="60" fill="#10b981" font-size="13" font-weight="bold" text-anchor="middle">DNS Resolver (53)</text>
  <text x="300" y="80" fill="#cbd5e1" font-size="10" text-anchor="middle">1. Root Server (.)</text>
  <text x="300" y="100" fill="#cbd5e1" font-size="10" text-anchor="middle">2. TLD Server (.in)</text>
  <text x="300" y="120" fill="#cbd5e1" font-size="10" text-anchor="middle">3. Authoritative DNS</text>

  <path d="M 380 85 L 450 85" stroke="#10b981" stroke-width="2"/>
  <polygon points="450,85 440,80 440,90" fill="#10b981"/>

  <rect x="450" y="55" width="130" height="60" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="515" y="80" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Web Server</text>
  <text x="515" y="100" fill="#f59e0b" font-size="10" text-anchor="middle">104.21.75.12</text>
</svg>''',

    "osi": '''<svg viewBox="0 0 600 230" width="100%" height="230" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;border-radius:8px;font-family:sans-serif;">
  <g transform="translate(50, 15)">
    <rect x="0" y="0" width="500" height="24" rx="4" fill="#38bdf8"/><text x="250" y="16" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">7. Application (HTTP, DNS, SSH, FTP)</text>
    <rect x="0" y="28" width="500" height="24" rx="4" fill="#0ea5e9"/><text x="250" y="44" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">6. Presentation (SSL/TLS, ASCII, Encryption)</text>
    <rect x="0" y="56" width="500" height="24" rx="4" fill="#0284c7"/><text x="250" y="72" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">5. Session (Sockets, Connection State)</text>
    <rect x="0" y="84" width="500" height="24" rx="4" fill="#10b981"/><text x="250" y="100" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">4. Transport (TCP, UDP, Ports)</text>
    <rect x="0" y="112" width="500" height="24" rx="4" fill="#059669"/><text x="250" y="128" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">3. Network (IP Addressing, Routers, Packets)</text>
    <rect x="0" y="140" width="500" height="24" rx="4" fill="#f59e0b"/><text x="250" y="156" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">2. Data Link (MAC, Switches, Ethernet Frames)</text>
    <rect x="0" y="168" width="500" height="24" rx="4" fill="#ef4444"/><text x="250" y="184" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">1. Physical (Cables, Radio Waves, Bits)</text>
  </g>
</svg>''',

    "http": '''<svg viewBox="0 0 600 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a;border-radius:8px;font-family:monospace;">
  <rect x="30" y="30" width="150" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
  <text x="105" y="70" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">Web Browser</text>
  <text x="105" y="95" fill="#38bdf8" font-size="11" text-anchor="middle">(Client)</text>

  <!-- Request -->
  <line x1="180" y1="60" x2="420" y2="60" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="420,60 410,55 410,65" fill="#38bdf8"/>
  <text x="300" y="52" fill="#38bdf8" font-size="11" text-anchor="middle">GET /login.html HTTP/1.1</text>

  <!-- Response -->
  <line x1="420" y1="100" x2="180" y2="100" stroke="#10b981" stroke-width="2"/>
  <polygon points="180,100 190,95 190,105" fill="#10b981"/>
  <text x="300" y="118" fill="#10b981" font-size="11" text-anchor="middle">HTTP/1.1 200 OK (HTML Payload)</text>

  <rect x="420" y="30" width="150" height="100" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="495" y="70" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">Nginx Server</text>
  <text x="495" y="95" fill="#10b981" font-size="11" text-anchor="middle">Port 80 / 443</text>
</svg>'''
}

