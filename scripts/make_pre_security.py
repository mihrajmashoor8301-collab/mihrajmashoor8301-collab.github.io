#!/usr/bin/env python3
"""
Pre Security Room Definitions Builder
Generates pre-security-data.js with complete educational rigor.
"""

import json
import os

from generate_pre_security import LEVELS, DIAGRAMS

ROOMS = []

def add_room(room_dict):
    room_id = f"room-{len(ROOMS) + 1:02d}"
    room_dict["id"] = room_id
    ROOMS.append(room_dict)

# =========================================================================
# LEVEL 0: START HERE (Rooms 01 - 02)
# =========================================================================
add_room({
    "stage": 0,
    "level": 0,
    "levelTitle": "Level 0 — Start Here",
    "title": "Welcome to Cybersecurity & Ethical Hacking",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "15 min",
    "prerequisites": "None (Absolute zero knowledge required)",
    "whyAreYouHere": "You have arrived at the start of your journey. Cybersecurity can feel intimidating with hundreds of confusing abbreviations, dark terminal windows, and complex tools. In this room, you will demystify what cybersecurity really is, understand how ethical hackers think, and execute your very first command in the Endlessus interactive terminal with zero fear.",
    "objectives": [
        "Understand what cybersecurity is and why it protects the modern digital world",
        "Differentiate between Offensive Security (Red Team) and Defensive Security (Blue Team)",
        "Learn what makes ethical hacking legal, authorized, and professional",
        "Understand Rules of Engagement (RoE) and Scope in security testing",
        "Run your first interactive shell command (`whoami`) and interpret the output",
        "Learn how to use progressive hints when you get stuck"
    ],
    "vocabulary": [
        {"term": "Cybersecurity", "definition": "The practice of protecting systems, networks, devices, and data from digital attacks, damage, or unauthorized access."},
        {"term": "Offensive Security (Red Team)", "definition": "Ethical hackers who simulate adversarial attacks to find security weaknesses before malicious actors do."},
        {"term": "Defensive Security (Blue Team)", "definition": "Security engineers and analysts who build defenses, monitor logs, detect intrusions, and respond to incidents."},
        {"term": "Ethical Hacker", "definition": "A security professional who hacks with explicit written permission to help organizations fix vulnerabilities."},
        {"term": "Scope", "definition": "The precise list of systems, domains, and IP addresses you are legally authorized to test."},
        {"term": "Command Shell / Terminal", "definition": "A text-based interface that lets you communicate directly with a computer by typing commands."}
    ],
    "diagramSvg": DIAGRAMS["terminal"],
    "lessons": [
        {
            "title": "1. What is Cybersecurity?",
            "content": "At its core, cybersecurity is about **trust**. Every day, hospitals manage patient vitals, banks process billions in wire transfers, and electrical grids supply power to millions. All of these run on computers connected together.\n\nWhen these systems have flaws, malicious hackers (often called 'black hats') can steal private records, disrupt power, or hold businesses for ransom. Cybersecurity professionals exist to identify and fix these flaws first."
        },
        {
            "title": "2. Red Team vs Blue Team: Two Sides of the Shield",
            "content": "Cybersecurity is broadly divided into two cooperative sides:\n\n• **Offensive Security (Red Team)**: You think like an adversary. You test systems, search for configuration mistakes, verify whether software bugs can be exploited, and report your findings.\n• **Defensive Security (Blue Team)**: You design secure architectures, monitor network traffic, set up firewalls, investigate suspicious activity, and patch vulnerabilities.\n\nBoth teams need the exact same foundational knowledge: **you cannot defend or test what you do not understand**."
        },
        {
            "title": "3. The Law: Authorization & Scope",
            "content": "What separates an ethical hacker from a cybercriminal is not technical skill — it is **authorization**.\n\nTesting or probing a system without explicit, written permission from the owner is illegal under computer misuse legislation worldwide. In Endlessus, every lab target is run in a secure, sandboxed environment specifically created for your education. You have full authorization here!"
        }
    ],
    "seeExamples": [
        {
            "title": "Interactive Shell: How Commands Work",
            "codeOrDiagram": "cadet@endlessus:~$ whoami\ncadet\n\ncadet@endlessus:~$ date\nSun Oct 05 16:30:00 UTC 2026\n\ncadet@endlessus:~$ echo \"Hello, Cybersecurity!\"\nHello, Cybersecurity!",
            "explanation": "In a terminal, you type a command next to the prompt ($), press Enter, and the operating system responds with text output. Here, `whoami` asks the computer: 'What is my current username?'"
        }
    ],
    "tryInteractive": {
        "type": "terminal",
        "prompt": "Type `whoami` below and press Enter to see your current identity in the Endlessus sandbox:",
        "initialCommand": "",
        "expectedCommand": "whoami",
        "simulatedOutput": "cadet\n[+] Success! Your terminal identity is 'cadet'. You just executed your first shell command.",
        "explanation": "The command `whoami` is one of the simplest utilities in Unix/Linux. It tells you your active user account name."
    },
    "questions": [
        {
            "id": "q-01-1",
            "type": "exact",
            "question": "Which Linux/Unix command returns the active session username?",
            "visualSlots": "_ _ _ _ _ _",
            "acceptedAnswers": ["whoami"],
            "caseSensitive": False,
            "trimWhitespace": True,
            "hint": "It literally asks 'who am I' as a single lowercase word.",
            "explanation": "The `whoami` command prints the effective user ID (username) of the current shell session."
        },
        {
            "id": "q-01-2",
            "type": "multiple-choice",
            "question": "What is the single most critical factor that distinguishes an ethical penetration tester from an unauthorized attacker?",
            "options": [
                "Ethical hackers only use open-source operating systems",
                "Ethical hackers have explicit written authorization and an agreed scope from the system owner",
                "Ethical hackers never look at application source code",
                "Ethical hackers only test web browsers and never networks"
            ],
            "correctIndex": 1,
            "hint": "Think about legal permission and boundaries.",
            "explanation": "Authorization is paramount. Without explicit, written permission and clear scope, testing any computer system is illegal."
        },
        {
            "id": "q-01-3",
            "type": "multiple-choice",
            "question": "A company hires you to simulate an attack against their customer portal to find vulnerabilities before launch. Which security role are you performing?",
            "options": [
                "Defensive Security (Blue Team)",
                "Offensive Security (Red Team)",
                "Hardware Technician",
                "Database Administrator"
            ],
            "correctIndex": 1,
            "hint": "Offensive testing simulates adversarial attacks.",
            "explanation": "Simulating attacks to discover vulnerabilities is the definition of offensive security (Red Teaming / penetration testing)."
        }
    ],
    "tasks": [
        {
            "title": "Task 1: Execute your first shell command",
            "instruction": "Use the interactive terminal below to query your active session user by typing `whoami`.",
            "hints": [
                "Concept: You are querying your session's user identity.",
                "Direction: Type into the terminal input box directly.",
                "Tool: Use the standard POSIX username utility.",
                "Syntax: `whoami` (all lowercase, no spaces).",
                "Explanation: Typing `whoami` will output 'cadet', proving your terminal works."
            ]
        }
    ],
    "securityConnection": "Whenever a penetration tester gains access to an unknown server or terminal, the first command they run is almost always `whoami` or `id`. It instantly tells them whether they landed as an unprivileged user (requiring privilege escalation) or as the supreme administrator (root / SYSTEM)."
})

add_room({
    "stage": 0,
    "level": 0,
    "levelTitle": "Level 0 — Start Here",
    "title": "How Computers & The Internet Work",
    "difficulty": "Beginner",
    "difficultyBadge": "🟢 Beginner",
    "estimatedTime": "20 min",
    "prerequisites": "Room 01: Welcome to Cybersecurity",
    "whyAreYouHere": "Before you can secure a system or spot security flaws, you must understand how computers send and receive information across the world. When you click a link, billions of electrical and optical signals travel through undersea cables, routers, and switches in milliseconds. In this room, you will learn the high-level picture of digital communication.",
    "objectives": [
        "Understand the difference between hardware, software, and firmware",
        "Learn the Client-Server model of computing",
        "Differentiate the Internet (the physical highway) from the World Wide Web (the traffic)",
        "Understand how data is split into small packets for transmission",
        "Recognize basic internet infrastructure: Clients, Servers, Routers, and Undersea Cables"
    ],
    "vocabulary": [
        {"term": "Client", "definition": "A device (like your phone or laptop) that requests information or services from a server."},
        {"term": "Server", "definition": "A powerful computer dedicated to storing data, hosting applications, and responding to client requests 24/7."},
        {"term": "Packet", "definition": "A small segment of a larger message sent across a network, containing both data and routing headers."},
        {"term": "Router", "definition": "A specialized networking device that inspects packet destination addresses and routes them along the fastest path."},
        {"term": "Internet", "definition": "The global physical network of interconnected computers, cables, and satellites."},
        {"term": "World Wide Web (WWW)", "definition": "An information system of interlinked hypertext documents and multimedia accessed via the Internet using HTTP."}
    ],
    "diagramSvg": DIAGRAMS["http"],
    "lessons": [
        {
            "title": "1. The Client-Server Architecture",
            "content": "Most of the internet operates on the **Client-Server model**:\n\n1. **The Client**: Your web browser (Chrome, Firefox, Safari) running on your computer or phone. It sends a **Request**.\n2. **The Server**: A machine in a datacenter running software like Nginx, Apache, or Node.js. It receives your request, processes it, and returns a **Response**.\n\nEvery time you load Endlessus, your browser is the client, and our hosting server provides the web pages."
        },
        {
            "title": "2. The Internet vs The World Wide Web",
            "content": "Many beginners confuse the Internet and the Web, but they are not the same thing:\n\n• **The Internet** is the massive physical and logical infrastructure: undersea fiber-optic cables, satellites, copper wires, and routers connecting billions of computers together (the highway).\n• **The World Wide Web (Web)** is just one service that runs on top of the Internet: websites, HTML pages, and web applications accessed via browsers (the cars driving on the highway).\n\nOther services that run on the Internet include email (SMTP/IMAP), file transfer (FTP/SFTP), gaming servers, and streaming."
        },
        {
            "title": "3. How Data Travels: Packets",
            "content": "When you download a 10MB image, the server doesn't send it as one giant continuous block. If even a single byte were lost, the whole file would need to be retransmitted!\n\nInstead, the operating system chops the image into thousands of tiny chunks called **packets** (typically 1500 bytes each). Each packet gets a label with the source IP address, the destination IP address, and a sequence number. Routers inspect each packet and steer it across the network, and your computer reassembles them back into the image."
        }
    ],
    "seeExamples": [
        {
            "title": "Inspecting Packet Routing with Traceroute",
            "codeOrDiagram": "cadet@endlessus:~$ traceroute endlessus.in\ntraceroute to endlessus.in (104.21.75.12), 30 hops max\n 1  192.168.1.1 (Home Gateway Router)  1.2 ms\n 2  10.200.0.1 (ISP Local Office)       8.4 ms\n 3  172.16.4.1 (Regional Backbone)      14.1 ms\n 4  104.21.75.12 (Destination Edge)     22.3 ms",
            "explanation": "The `traceroute` utility shows every router (hop) a packet passes through on its way from your computer to the destination server."
        }
    ],
    "tryInteractive": {
        "type": "terminal",
        "prompt": "Run `echo \"Clients request, servers respond\"` in the terminal to reinforce the client-server concept:",
        "initialCommand": "",
        "expectedCommand": "echo \"Clients request, servers respond\"",
        "simulatedOutput": "Clients request, servers respond\n[+] Concept verified: Clients initiate requests; servers process and reply.",
        "explanation": "The `echo` command prints whatever text argument you give it back to standard output."
    },
    "questions": [
        {
            "id": "q-02-1",
            "type": "exact",
            "question": "What is the technical term for the small chunks of data into which files and messages are divided before network transmission?",
            "visualSlots": "_ _ _ _ _ _ _",
            "acceptedAnswers": ["packets", "packet"],
            "caseSensitive": False,
            "trimWhitespace": True,
            "hint": "Starts with 'pack'.",
            "explanation": "Packets are the discrete units of data transmitted across IP networks."
        },
        {
            "id": "q-02-2",
            "type": "multiple-choice",
            "question": "Which of the following correctly describes the relationship between the Internet and the World Wide Web?",
            "options": [
                "The Internet and the World Wide Web are identical terms for the exact same technology",
                "The World Wide Web is the physical hardware cabling, while the Internet is web pages",
                "The Internet is the global physical infrastructure, while the Web is an application service that runs on top of it",
                "The World Wide Web was invented before computers were connected via networks"
            ],
            "correctIndex": 2,
            "hint": "Think of the highway vs the cars.",
            "explanation": "The Internet is the underlying global network of connected computers; the Web (HTTP/HTTPS) is one service operating on top of that infrastructure."
        }
    ],
    "tasks": [
        {
            "title": "Task 1: Understand client-server communication",
            "instruction": "Test output generation in the terminal by echoing a packet status string.",
            "hints": [
                "Type: `echo packet`"
            ]
        }
    ],
    "securityConnection": "In cybersecurity, attackers often target the client-server boundary. For example, Distributed Denial of Service (DDoS) attacks flood a server with millions of bogus packets so legitimate clients cannot connect. Similarly, packet sniffing tools like Wireshark allow security analysts (and attackers) to inspect raw packets passing across an unencrypted network."
})

print("Generated Level 0 (2 rooms)")
