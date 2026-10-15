# scripts/level6.py
# Level 6: Cybersecurity Fundamentals (Rooms 34 - 39)

from generate_pre_security import DIAGRAMS

def get_rooms():
    return [
        # Room 34: The CIA Triad & Core Principles
        {
            "stage": 6,
            "level": 6,
            "levelTitle": "Level 6 — Cybersecurity Fundamentals",
            "title": "The CIA Triad & Core Security Principles",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "25 min",
            "prerequisites": "Level 5: Internet & Web Fundamentals",
            "whyAreYouHere": "Every security policy, encryption standard, and risk assessment across the globe is built on a single timeless foundation: the **CIA Triad** (Confidentiality, Integrity, and Availability). In this room, you will learn the core pillars of information security, understand Defense-in-Depth, and discover why security is an ongoing lifecycle rather than a product you install once.",
            "objectives": [
                "Master the 3 pillars of the CIA Triad: Confidentiality, Integrity, and Availability",
                "Identify real-world cyberattacks that violate each specific pillar of the CIA Triad",
                "Understand the principle of Defense-in-Depth (Layered Security)",
                "Learn the concept of Non-Repudiation and Auditability",
                "Understand the Security vs Usability trade-off"
            ],
            "vocabulary": [
                {"term": "Confidentiality", "definition": "Ensuring that sensitive information is accessible only to authorized individuals, entities, or processes (protected by encryption and access controls)."},
                {"term": "Integrity", "definition": "Maintaining and assuring the accuracy, completeness, and uncorrupted state of data over its entire lifecycle (protected by cryptographic hashing and digital signatures)."},
                {"term": "Availability", "definition": "Ensuring that authorized users have reliable, timely access to information systems and data whenever needed (protected by redundancy, backups, and DDoS mitigation)."},
                {"term": "Defense-in-Depth", "definition": "A security strategy employing multiple redundant layers of defensive controls throughout an information system."},
                {"term": "Non-Repudiation", "definition": "The assurance that an individual cannot deny the authenticity of their signature on a document or the sending of a message that they originated."}
            ],
            "diagramSvg": DIAGRAMS["cia"],
            "lessons": [
                {
                    "title": "1. The Pillars of the CIA Triad",
                    "content": "• **Confidentiality (Privacy)**: Keeping secret data out of unauthorized hands. *Example breach*: An attacker steals a database of 10 million credit card numbers.\n• **Integrity (Accuracy)**: Ensuring data is never altered, tampered with, or faked in transit or at rest. *Example breach*: An attacker tampers with a hospital database to change a patient's blood type or medicine dosage!\n• **Availability (Uptime)**: Making sure services are online and accessible. *Example breach*: A Distributed Denial of Service (DDoS) attack or Ransomware attack freezes hospital computers, blocking emergency care."
                },
                {
                    "title": "2. Defense-in-Depth: Layered Security",
                    "content": "A medieval castle never relied on a single wooden gate: it had a moat, a drawbridge, outer curtain walls, watchtowers, and an inner keep. If attackers breached the gate, they were trapped in the courtyard!\n\nIn cybersecurity, **Defense-in-Depth** means deploying multiple independent security layers:\n1. **Edge**: Web Application Firewall (WAF) and DDoS filtering.\n2. **Network**: VLAN segmentation and internal firewalls.\n3. **Host**: Endpoint Detection and Response (EDR), disk encryption (BitLocker), and OS patching.\n4. **Application**: Strong authentication, MFA, and input validation.\n5. **Data**: Field-level encryption and strict database permissions.\n\nIf an attacker bypasses the firewall, the endpoint EDR and encryption still protect the crown jewels!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Mapping Attacks to the CIA Triad",
                    "codeOrDiagram": "Attack: Data Breach / Password Dump    ===> Violates: CONFIDENTIALITY\nAttack: SQL Injection / Tampering     ===> Violates: INTEGRITY\nAttack: Ransomware / DDoS Flood        ===> Violates: AVAILABILITY",
                    "explanation": "Every cyber incident damages one or more specific pillars of the CIA Triad."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo \"CIA: Confidentiality, Integrity, Availability\"` in the terminal to verify the foundational triad:",
                "initialCommand": "",
                "expectedCommand": "echo \"CIA: Confidentiality, Integrity, Availability\"",
                "simulatedOutput": "CIA: Confidentiality, Integrity, Availability\n[+] Foundations verified: The 3 core pillars of information security.",
                "explanation": "Outputs the CIA Triad principles."
            },
            "questions": [
                {
                    "id": "q-34-1",
                    "type": "exact",
                    "question": "Which pillar of the CIA Triad is directly violated when a Distributed Denial of Service (DDoS) attack takes down a banking website?",
                    "visualSlots": "_ _ _ _ _ _ _ _ _ _ _ _",
                    "acceptedAnswers": ["availability"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Ensuring systems are available when needed.",
                    "explanation": "Availability is compromised when legitimate users cannot access a service."
                },
                {
                    "id": "q-34-2",
                    "type": "multiple-choice",
                    "question": "An attacker intercepts a wire transfer request and changes the recipient account number from the vendor's bank to their personal overseas bank account. Which CIA Triad pillar was violated?",
                    "options": [
                        "Availability",
                        "Integrity",
                        "Speed",
                        "Portability"
                    ],
                    "correctIndex": 1,
                    "hint": "Data was tampered with and altered.",
                    "explanation": "Integrity guarantees that data has not been modified or corrupted by unauthorized parties."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Verify CIA Triad",
                    "instruction": "Run `echo \"CIA: Confidentiality, Integrity, Availability\"` in the terminal.",
                    "hints": ["Type: `echo \"CIA: Confidentiality, Integrity, Availability\"`"]
                }
            ],
            "securityConnection": "When writing penetration testing reports, findings are categorized by their CIA impact: an IDOR vulnerability that leaks user emails has high Confidentiality impact; a flaw allowing unauthorized balance adjustments has high Integrity impact."
        },

        # Room 35: Threats, Vulnerabilities & Risks
        {
            "stage": 6,
            "level": 6,
            "levelTitle": "Level 6 — Cybersecurity Fundamentals",
            "title": "Threats, Vulnerabilities, Risks & Impacts",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "25 min",
            "prerequisites": "Room 34: The CIA Triad & Core Security Principles",
            "whyAreYouHere": "Beginners often use the words 'threat', 'vulnerability', and 'risk' interchangeably, but in professional cybersecurity, they have precise, mathematically distinct definitions. A vulnerability without a threat is harmless; a threat without a vulnerability cannot harm you. In this room, you will learn the Risk Equation, the Common Vulnerabilities and Exposures (CVE) system, and CVSS severity scoring.",
            "objectives": [
                "Clearly distinguish between a Vulnerability (flaw), a Threat (danger), an Exploit (code), and a Risk (probability x impact)",
                "Master the foundational Risk Equation: $\\text{Risk} = \\text{Threat} \\times \\text{Vulnerability} \\times \\text{Impact}$",
                "Learn about the CVE (Common Vulnerabilities and Exposures) dictionary maintained by MITRE",
                "Understand CVSS (Common Vulnerability Scoring System) scores from 0.0 to 10.0",
                "Explore the 4 strategies of Risk Management: Mitigate, Transfer, Accept, and Avoid"
            ],
            "vocabulary": [
                {"term": "Vulnerability", "definition": "A weakness, flaw, or bug in software, hardware, or process that can be exploited by an adversary."},
                {"term": "Threat", "definition": "Any circumstance or event with the potential to adversely impact an information system through unauthorized access, destruction, or denial of service."},
                {"term": "Exploit", "definition": "A piece of software, payload, or technique that takes advantage of a vulnerability to cause unintended behavior on a computer system."},
                {"term": "Risk", "definition": "The likelihood and potential financial, operational, or reputational damage resulting from a threat exploiting a vulnerability."},
                {"term": "CVE (Common Vulnerabilities and Exposures)", "definition": "A standardized dictionary of publicly known cybersecurity vulnerabilities identified by unique IDs (e.g., CVE-2021-44228 for Log4Shell)."}
            ],
            "diagramSvg": DIAGRAMS["cia"],
            "lessons": [
                {
                    "title": "1. The Risk Equation: Threat, Vulnerability, and Impact",
                    "content": "Consider a locked bank vault with an open window:\n• **Vulnerability**: The open window (a flaw in design).\n• **Threat**: A burglar looking for money (an adversary with intent and capability).\n• **Impact**: Losing $10,000,000 (the damage if the event occurs).\n• **Risk**: The overall probability and consequence ($Risk = Threat \\times Vulnerability \\times Impact$).\n\nIf you have a critical software bug (Vulnerability) on a computer disconnected from all networks buried underground (No Threat), the overall **Risk is nearly zero**!"
                },
                {
                    "title": "2. CVEs and CVSS Scoring",
                    "content": "When a security researcher discovers a new bug in software like Apache or the Linux kernel, it is assigned a **CVE ID**:\n`CVE-[Year]-[Sequential Number]` (e.g. `CVE-2021-44228`).\n\nThe vulnerability is scored using the **CVSS (Common Vulnerability Scoring System)** from `0.0` to `10.0`:\n• `0.1 - 3.9`: **Low** severity.\n• `4.0 - 6.9`: **Medium** severity.\n• `7.0 - 8.9`: **High** severity.\n• `9.0 - 10.0`: **Critical** severity (e.g. remote code execution without authentication)!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Searching for Vulnerabilities via Searchsploit",
                    "codeOrDiagram": "cadet@endlessus:~$ searchsploit \"vsftpd 2.3.4\"\n--------------------------------------------------------- ---------------------------------\n Exploit Title                                           |  Path\n--------------------------------------------------------- ---------------------------------\nvsftpd 2.3.4 - Backdoor Command Execution                | unix/remote/49757.py",
                    "explanation": "`searchsploit` queries the local offline Exploit-DB database for known public exploits matching a software version."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"` to view a famous critical vulnerability identifier:",
                "initialCommand": "",
                "expectedCommand": "echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"",
                "simulatedOutput": "CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\n[+] CVE format verified: Standardized vulnerability tracking notation.",
                "explanation": "Illustrates the CVE naming standard."
            },
            "questions": [
                {
                    "id": "q-35-1",
                    "type": "exact",
                    "question": "What 3-letter acronym represents the international dictionary of standardized vulnerability identifiers (e.g. CVE-2021-44228)?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["CVE"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Common Vulnerabilities and Exposures.",
                    "explanation": "CVE stands for Common Vulnerabilities and Exposures."
                },
                {
                    "id": "q-35-2",
                    "type": "multiple-choice",
                    "question": "Under the CVSS v3.1 scoring framework, what qualitative severity rating is assigned to a vulnerability with a score between 9.0 and 10.0?",
                    "options": [
                        "Low",
                        "Medium",
                        "High",
                        "Critical"
                    ],
                    "correctIndex": 3,
                    "hint": "The highest severity tier.",
                    "explanation": "Scores from 9.0 to 10.0 represent Critical vulnerabilities."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect CVE notation",
                    "instruction": "Run `echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"` in the terminal.",
                    "hints": ["Type: `echo \"CVE-2021-44228: Log4Shell (CVSS 10.0 Critical)\"`"]
                }
            ],
            "securityConnection": "Enterprise vulnerability scanners (like Nessus or Qualys) scan thousands of servers across corporate networks, matching software versions to CVE databases to produce prioritized remediation lists for system administrators."
        },

        # Room 36: Malware & Common Attack Types
        {
            "stage": 6,
            "level": 6,
            "levelTitle": "Level 6 — Cybersecurity Fundamentals",
            "title": "Malware & Common Attack Types",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "30 min",
            "prerequisites": "Room 35: Threats, Vulnerabilities, Risks & Impacts",
            "whyAreYouHere": "Malicious software (malware) is any code designed to cause harm, steal data, or hijack computational resources. From self-replicating worms and deceptive trojans to devastating modern ransomware gangs, cybersecurity analysts must recognize the taxonomy of cyber threats. In this room, you will learn the primary categories of malware and understand common human-facing social engineering tactics.",
            "objectives": [
                "Understand the broad umbrella term 'Malware' (Malicious Software)",
                "Differentiate between Viruses (needs host file), Worms (self-propagating over networks), and Trojans (disguised as legitimate)",
                "Learn how Ransomware encrypts user files and demands cryptocurrency payments",
                "Understand Spyware, Keyloggers, Adware, and Rootkits",
                "Recognize Social Engineering and Phishing tactics (Spear Phishing, Whaling, Vishing)"
            ],
            "vocabulary": [
                {"term": "Malware", "definition": "Any software intentionally designed to cause damage to a computer, server, client, or computer network."},
                {"term": "Worm", "definition": "A standalone malware computer program that replicates itself automatically across computer networks without requiring human intervention or a host program."},
                {"term": "Trojan Horse", "definition": "Malicious code disguised as innocent, useful software (like a cracked game or PDF reader) that tricks users into executing it."},
                {"term": "Ransomware", "definition": "Malware that employs asymmetric/symmetric encryption to hold a victim's personal or enterprise data hostage until a ransom is paid."},
                {"term": "Phishing", "definition": "A social engineering attack where attackers impersonate trustworthy entities via email or messaging to deceive victims into revealing credentials or installing malware."}
            ],
            "diagramSvg": DIAGRAMS["cia"],
            "lessons": [
                {
                    "title": "1. The Primary Types of Malware",
                    "content": "• **Virus**: Attaches itself to a clean file on disk. When a user runs that file, the virus code runs, infects other files, and spreads.\n• **Worm**: Self-contained and automated! It scans local networks for vulnerable open ports, exploits them, and copies itself to new machines without ANY user interaction (e.g. WannaCry).\n• **Trojan Horse**: Deceives the victim. Looks like a legitimate utility, calculator, or game crack, but secretly opens a backdoor for an attacker.\n• **Ransomware**: Scans your hard drive, generates a strong AES-256 key, encrypts all documents, photos, and databases, and deletes the key unless you pay a ransom in Bitcoin.\n• **Rootkit**: Modifies the operating system kernel and drivers to hide processes, files, and network connections from Antivirus and Task Manager!"
                },
                {
                    "title": "2. Social Engineering & Phishing",
                    "content": "Over 90% of all successful corporate cyberattacks begin with a human, not a technical bug!\n\n• **Phishing**: Mass generic emails ('Your account is locked; click here to verify').\n• **Spear Phishing**: Highly targeted emails tailored specifically to an individual using research gathered from LinkedIn.\n• **Whaling**: Spear phishing targeting high-level executives (CEOs, CFOs).\n• **Vishing / Smishing**: Voice calls (phone scams) or SMS text messages."
                }
            ],
            "seeExamples": [
                {
                    "title": "Deconstructing a Phishing Email Header",
                    "codeOrDiagram": "From: \"IT Support Helpdesk\" <support@legitimate-company.com.attacker-domain.xyz>\nReply-To: evil-collector@gmail.com\nSubject: URGENT: Password Expiring in 1 Hour - Action Required\nLink Target: http://login-portal-verification.ru/login.php",
                    "explanation": "Notice the spoofed display name, urgency trigger, mismatched reply-to address, and suspicious foreign URL."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"` in the terminal:",
                "initialCommand": "",
                "expectedCommand": "echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"",
                "simulatedOutput": "Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\n[+] Taxonomy reviewed: The primary families of malicious software.",
                "explanation": "Summarizes the 5 primary malware classifications."
            },
            "questions": [
                {
                    "id": "q-36-1",
                    "type": "exact",
                    "question": "What category of malware self-replicates and spreads across computer networks automatically without requiring user interaction or a host program?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["worm", "worms"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Four letters: w-o-r-m.",
                    "explanation": "Worms spread across networks independently without human interaction."
                },
                {
                    "id": "q-36-2",
                    "type": "multiple-choice",
                    "question": "What is the term for a highly targeted phishing attack crafted specifically for high-profile executive leadership (CEOs, CFOs)?",
                    "options": [
                        "Smishing",
                        "Whaling",
                        "Vishing",
                        "Pharming"
                    ],
                    "correctIndex": 1,
                    "hint": "Hunting the biggest fish: Whales.",
                    "explanation": "Whaling targets senior executives and high-value decision-makers."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Review malware taxonomy",
                    "instruction": "Run `echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"` in the terminal.",
                    "hints": ["Type: `echo \"Malware Taxonomy: Virus, Worm, Trojan, Ransomware, Rootkit\"`"]
                }
            ],
            "securityConnection": "Security teams use 'Sandboxes' (isolated virtual environments like Cuckoo Sandbox or Any.Run) to safely execute suspicious malware samples and analyze their behavior: which files they create, which registry keys they alter, and which command-and-control (C2) servers they contact."
        },

        # Room 37: Authentication vs Authorization & Passwords
        {
            "stage": 6,
            "level": 6,
            "levelTitle": "Level 6 — Cybersecurity Fundamentals",
            "title": "Authentication vs Authorization & Modern Identity",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "25 min",
            "prerequisites": "Room 36: Malware & Common Attack Types",
            "whyAreYouHere": "Identity is the new perimeter in modern cloud security. But beginners frequently confuse two core access management concepts: **Authentication** (AuthN) and **Authorization** (AuthZ). Showing your passport at the airport proves *who you are* (Authentication); checking your boarding pass proves *which flight you are allowed to board* (Authorization). In this room, you will master identity controls, Multi-Factor Authentication (MFA), and password hashing.",
            "objectives": [
                "Clearly distinguish Authentication (AuthN - proving identity) from Authorization (AuthZ - verifying permissions)",
                "Understand the 3 core Authentication Factors: Something you know, Something you have, Something you are",
                "Learn Multi-Factor Authentication (MFA / 2FA) and why SMS verification is insecure compared to hardware keys (FIDO2)",
                "Understand how passwords are securely stored using one-way hashes and unique cryptographic salts",
                "Explore Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)"
            ],
            "vocabulary": [
                {"term": "Authentication (AuthN)", "definition": "The process of verifying the identity of a user, device, or system (answering: 'Who are you?')."},
                {"term": "Authorization (AuthZ)", "definition": "The process of verifying whether an authenticated user has permission to access a specific resource or perform an action (answering: 'What are you allowed to do?')."},
                {"term": "MFA (Multi-Factor Authentication)", "definition": "A security mechanism requiring two or more independent authentication factors to verify identity before granting access."},
                {"term": "Salt", "definition": "A unique, random string appended to passwords before hashing to ensure identical passwords produce completely different hash values, preventing rainbow table attacks."},
                {"term": "RBAC (Role-Based Access Control)", "definition": "An access control model where permissions are assigned to specific roles (e.g., Auditor, Editor, Admin) and users are assigned to roles."}
            ],
            "diagramSvg": DIAGRAMS["cia"],
            "lessons": [
                {
                    "title": "1. AuthN vs AuthZ: Identity vs Permissions",
                    "content": "• **Authentication (AuthN)**: *\"I am cadet, and here is my password and authenticator token.\"* The system validates your credentials against its database.\n• **Authorization (AuthZ)**: Now that the system knows you are cadet, can you click the red 'Format Production Database' button? The system checks your role: *\"No! Only Administrators have permission to do that (403 Forbidden).\"*\n\n**Common Vulnerability**: A system that authenticates users perfectly, but forgets to check authorization before returning data, is vulnerable to Broken Access Control (OWASP Top 10 #1)!"
                },
                {
                    "title": "2. The Three Factors of Authentication",
                    "content": "True MFA requires combining at least two **different categories**:\n\n1. **Something You Know**: Password, PIN, mother's maiden name.\n2. **Something You Have**: Smartphone with authenticator app (TOTP), physical FIDO2 YubiKey, smartcard.\n3. **Something You Are**: Biometrics—fingerprint scan, facial recognition, retina scan.\n\n*Entering your password and then answering a security question is NOT two-factor authentication—both are just things you know!*"
                },
                {
                    "title": "3. Storing Passwords: Salted Hashes",
                    "content": "Companies should **NEVER store passwords in plain text**! If an attacker breaches the database, every user's password is stolen.\n\nInstead, secure applications use modern cryptographic password-hashing algorithms (like `bcrypt`, `Argon2id`, or `PBKDF2`):\n\n`Password + Random Salt (16 bytes) ===> Argon2id ===> $argon2id$v=19$m=65536...`\n\nThe salt ensures that even if 500 users all pick `Password123!`, every single hash in the database is completely unique!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Viewing Linux Password Hashes in /etc/shadow",
                    "codeOrDiagram": "root@endlessus:~# cat /etc/shadow | grep \"cadet\"\ncadet:$6$randomsaltstring$abc123456789...:19600:0:99999:7:::\n\n[+] $6$ indicates SHA-512 hashing with a unique random salt string.",
                    "explanation": "Linux stores user passwords as salted hashes in the root-only `/etc/shadow` file."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo \"AuthN: Who are you? | AuthZ: What can you access?\"` in the terminal:",
                "initialCommand": "",
                "expectedCommand": "echo \"AuthN: Who are you? | AuthZ: What can you access?\"",
                "simulatedOutput": "AuthN: Who are you? | AuthZ: What can you access?\n[+] Access control boundary clarified: Authentication vs Authorization.",
                "explanation": "Contrasts Authentication and Authorization."
            },
            "questions": [
                {
                    "id": "q-37-1",
                    "type": "exact",
                    "question": "What is the security term for the random data added to a password before hashing to defeat precomputed rainbow table attacks?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["salt"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Four letters: s-a-l-t.",
                    "explanation": "A cryptographic salt ensures identical passwords produce distinct hashes."
                },
                {
                    "id": "q-37-2",
                    "type": "multiple-choice",
                    "question": "Which of the following represents a true Multi-Factor Authentication (MFA) combination?",
                    "options": [
                        "A password and a PIN number",
                        "A password and your mother's maiden name",
                        "A password (something you know) and a physical YubiKey hardware token (something you have)",
                        "A fingerprint scan and a facial recognition scan"
                    ],
                    "correctIndex": 2,
                    "hint": "Requires two distinct factor categories.",
                    "explanation": "Combining something you know (password) with something you have (YubiKey) constitutes true multi-factor authentication."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Contrast AuthN vs AuthZ",
                    "instruction": "Run `echo \"AuthN: Who are you? | AuthZ: What can you access?\"` in the terminal.",
                    "hints": ["Type: `echo \"AuthN: Who are you? | AuthZ: What can you access?\"`"]
                }
            ],
            "securityConnection": "In **Lab 03 (lab-auth)**, you investigate an authentication endpoint flawed by SQL Injection. Supplying `' OR 1=1 --` tricks the database query into authenticating as administrator without knowing the password, completely bypassing the authentication layer!"
        },

        # Room 38: Encoding vs Hashing vs Encryption
        {
            "stage": 6,
            "level": 6,
            "levelTitle": "Level 6 — Cybersecurity Fundamentals",
            "title": "Encoding vs Hashing vs Encryption",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "30 min",
            "prerequisites": "Room 37: Authentication vs Authorization & Passwords",
            "whyAreYouHere": "The single most common mistake made by junior developers and beginners is confusing **Encoding**, **Hashing**, and **Encryption**. Encoding transforms data for safe transmission (it provides ZERO security). Hashing turns data into a fixed-length fingerprint in ONE DIRECTION only (you cannot reverse it). Encryption scrambles data using a SECRET KEY so that ONLY someone with the key can unscramble it. In this room, you will learn to distinguish them effortlessly.",
            "objectives": [
                "Clearly distinguish the 3 core data transformation paradigms: Encoding, Hashing, and Encryption",
                "Understand Encoding (Base64, URL encoding, Hex): reversible by ANYONE without a key",
                "Understand Cryptographic Hashing (SHA-256, MD5): one-way, irreversible, deterministic, avalanche effect",
                "Understand Encryption (AES, RSA): two-way, reversible ONLY with the correct secret key",
                "Encode and decode data from the Linux terminal using `base64` and calculate hashes with `sha256sum`"
            ],
            "vocabulary": [
                {"term": "Encoding", "definition": "A reversible transformation of data into a different format (like Base64 or Hex) so it can be safely consumed by different systems. Provides zero confidentiality."},
                {"term": "Hashing", "definition": "A one-way mathematical algorithm that converts an arbitrary-length input into a fixed-length string of characters (digest). Irreversible by design."},
                {"term": "Encryption", "definition": "The process of scrambling plaintext into ciphertext using a mathematical algorithm and a secret key, reversible only with the decryption key."},
                {"term": "Base64", "definition": "A binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters (A-Z, a-z, 0-9, +, /)."},
                {"term": "SHA-256", "definition": "Secure Hash Algorithm generating a 256-bit (64 hexadecimal character) one-way hash digest widely used in SSL certificates and blockchain."}
            ],
            "diagramSvg": DIAGRAMS["cia"],
            "lessons": [
                {
                    "title": "1. The Definitive Comparison Table",
                    "content": "| Property | Encoding (e.g. Base64) | Hashing (e.g. SHA-256) | Encryption (e.g. AES-256) |\n|---|---|---|---|\n| **Purpose** | Data compatibility / format transfer | Data integrity & verification | Data confidentiality (privacy) |\n| **Key Required?** | **NO KEY** | **NO KEY** | **YES (Secret Key)** |\n| **Reversible?** | **YES** (Anyone can reverse) | **NO** (Strictly One-Way) | **YES** (Only with key) |\n| **Output Length** | Varies proportionally with input | **Fixed length** (always 64 hex chars for SHA-256) | Varies with input |\n| **Example** | `YWRtaW4=` -> `admin` | `8c6976e5b5410...` (Cannot reverse) | `U2FsdGVkX1...` (Decrypt with key) |"
                },
                {
                    "title": "2. The Avalanche Effect in Hashing",
                    "content": "A good cryptographic hash function exhibits the **Avalanche Effect**: if you change even a single bit in the input (e.g. changing an uppercase 'A' to lowercase 'a'), over 50% of the output hash digest bits flip randomly!\n\n`sha256(\"Hello World\")` -> `a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e`\n`sha256(\"hello World\")` -> `3b66474917a22cb15cf017c667e6962ac35c5c0d297ca2687c714392fec25b25`\n\nNotice how the output changed completely!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Encoding and Hashing in the Terminal",
                    "codeOrDiagram": "cadet@endlessus:~$ echo -n \"admin\" | base64\nYWRtaW4=\n\ncadet@endlessus:~$ echo -n \"admin\" | sha256sum\n8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918  -",
                    "explanation": "`base64` encodes reversibly; `sha256sum` produces a deterministic one-way 256-bit digest."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo -n \"secret\" | base64` in the terminal to encode the word 'secret' into Base64:",
                "initialCommand": "",
                "expectedCommand": "echo -n \"secret\" | base64",
                "simulatedOutput": "c2VjcmV0\n[+] Base64 encoded: c2VjcmV0 (Reversible with base64 -d).",
                "explanation": "`base64` encodes ASCII text into 64-character ASCII representation."
            },
            "questions": [
                {
                    "id": "q-38-1",
                    "type": "exact",
                    "question": "What 6-letter term describes a reversible data transformation (like Base64) that provides zero secrecy and requires no secret key?",
                    "visualSlots": "_ _ _ _ _ _ _ _",
                    "acceptedAnswers": ["encoding", "encode"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Encoding (not encryption).",
                    "explanation": "Encoding formats data for compatibility, not confidentiality."
                },
                {
                    "id": "q-38-2",
                    "type": "multiple-choice",
                    "question": "Which of the following statements about cryptographic hashing is true?",
                    "options": [
                        "A hash can be easily decrypted using a private key",
                        "Hashing is strictly a one-way mathematical function and cannot be reversed to recover original plaintext",
                        "Changing one letter in the input produces nearly the exact same hash output",
                        "Hashing algorithms are only used on Windows operating systems"
                    ],
                    "correctIndex": 1,
                    "hint": "Hashing is strictly one-way.",
                    "explanation": "Cryptographic hashes are one-way functions designed to be irreversible."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Encode string with base64",
                    "instruction": "Execute `echo -n \"secret\" | base64` in the terminal.",
                    "hints": ["Type: `echo -n \"secret\" | base64`"]
                }
            ],
            "securityConnection": "In **Lab 11 (lab-jwt)**, you inspect JSON Web Tokens (JWTs). Beginners often assume JWTs are encrypted; in reality, they are merely **Base64URL-encoded**! Anyone who intercepts the token can decode the payload instantly with `base64 -d`."
        },

        # Room 39: Defensive Controls, Security Logs & Incident Response
        {
            "stage": 6,
            "level": 6,
            "levelTitle": "Level 6 — Cybersecurity Fundamentals",
            "title": "Defensive Controls, Security Logs & Incident Response",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "30 min",
            "prerequisites": "Room 38: Encoding vs Hashing vs Encryption",
            "whyAreYouHere": "When a cyber incident strikes, the difference between a minor annoyance and a catastrophic corporate bankruptcy is how fast the security team detects, contains, and remediates the intrusion. In this room, you will learn about the 6-phase Incident Response lifecycle, explore Security Information and Event Management (SIEM) platforms, and practice analyzing real web server access logs to hunt down attacker payloads.",
            "objectives": [
                "Understand the 6 phases of the Incident Response lifecycle: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned",
                "Learn the role of SIEM (Security Information & Event Management) platforms like Splunk and Elastic",
                "Understand common web server log formats (Common Log Format / Nginx / Apache access logs)",
                "Identify attack signatures in web access logs: Path Traversal (`../`), Web Shells (`uploads`), and SQL Injection",
                "Investigate brute-force attacks in authentication logs (`auth.log`)"
            ],
            "vocabulary": [
                {"term": "Incident Response (IR)", "definition": "The structured methodology an organization uses to detect, respond to, contain, and recover from a cyberattack."},
                {"term": "SIEM (Security Information and Event Management)", "definition": "A security software system that aggregates, correlates, and analyzes log data from thousands of devices across an enterprise in real time."},
                {"term": "SOC (Security Operations Center)", "definition": "The centralized team of cybersecurity analysts responsible for monitoring, detecting, and responding to security incidents 24/7."},
                {"term": "IoC (Indicator of Compromise)", "definition": "Forensic evidence of a cyber intrusion on a network or host (e.g., a known malicious IP address, file hash, or domain)."},
                {"term": "Access Log", "definition": "A text log file maintained by web servers (Apache, Nginx) recording every HTTP request received (IP, timestamp, method, URL, status code, user agent)."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. The 6 Phases of Incident Response (NIST / SANS)",
                    "content": "1. **Preparation**: Train staff, configure logs, deploy EDR agents, create incident response playbooks.\n2. **Identification (Detection)**: A SOC analyst notices an alert: *\"10,000 failed SSH logins followed by a root shell!\"*\n3. **Containment**: Isolate the infected machine from the network (pull the network cable or revoke VLAN access) to prevent lateral movement.\n4. **Eradication**: Remove malware, delete backdoor accounts, patch the vulnerable software.\n5. **Recovery**: Restore clean data from offline backups, test system operations, return to production.\n6. **Lessons Learned**: Post-incident review: What happened? How do we update our defenses so this never happens again?"
                },
                {
                    "title": "2. Reading a Web Server Access Log",
                    "content": "An Nginx/Apache log line tells a complete forensic story:\n\n`192.168.1.100 - - [15/Oct/2026:10:14:02 +0000] \"GET /view?file=../../../../etc/passwd HTTP/1.1\" 200 1840`\n\n• `192.168.1.100`: Attacker's IP address.\n• `[15/Oct/2026...]`: Precise timestamp of the attack.\n• `GET /view?file=../../../../etc/passwd`: The attacker's payload (Path Traversal attempting to read password hashes!).\n• `200`: HTTP Status Code. **200 OK means the attack SUCCEEDED** and the server returned the file bytes!\n• `1840`: Number of bytes returned."
                }
            ],
            "seeExamples": [
                {
                    "title": "Hunting Path Traversal in Access Logs with grep",
                    "codeOrDiagram": "cadet@endlessus:~$ grep -E \"\\.\\./\" access.log\n192.168.1.105 - - [15/Oct/2026:14:02:11 +0000] \"GET /static/../../etc/passwd HTTP/1.1\" 200 2410\n\n[!] Incident Detected: Attacker IP 192.168.1.105 successfully downloaded /etc/passwd via directory traversal!",
                    "explanation": "`grep -E \"\\.\\./\"` isolates path traversal attempts containing dot-dot-slash patterns."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `grep -E \"\\.\\./\" access.log` in the terminal to isolate directory traversal attacks in the web log:",
                "initialCommand": "",
                "expectedCommand": "grep -E \"\\.\\./\" access.log",
                "simulatedOutput": "192.168.1.105 - - [15/Oct/2026:14:02:11 +0000] \"GET /static/../../etc/passwd HTTP/1.1\" 200 2410\n[+] Attack vector isolated: Path traversal identified from IP 192.168.1.105.",
                "explanation": "`grep -E` filters access logs for path traversal patterns."
            },
            "questions": [
                {
                    "id": "q-39-1",
                    "type": "exact",
                    "question": "What 4-letter acronym represents centralized software platforms that collect, aggregate, and analyze security logs from across an enterprise (e.g. Splunk)?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["SIEM"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Security Information and Event Management.",
                    "explanation": "SIEM stands for Security Information and Event Management."
                },
                {
                    "id": "q-39-2",
                    "type": "multiple-choice",
                    "question": "In which phase of the Incident Response lifecycle does the security team isolate an infected computer from the network to stop malware from spreading laterally?",
                    "options": [
                        "Preparation",
                        "Containment",
                        "Recovery",
                        "Eradication"
                    ],
                    "correctIndex": 1,
                    "hint": "Containing the damage.",
                    "explanation": "The Containment phase isolates compromised systems to limit the blast radius."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Search access log for attacks",
                    "instruction": "Execute `grep -E \"\\.\\./\" access.log` in the terminal.",
                    "hints": ["Type: `grep -E \"\\.\\./\" access.log`"]
                }
            ],
            "securityConnection": "In **Lab 09 (lab-logs)**, you act as an incident responder investigating a breached enterprise server. You analyze Apache `access.log` to track an attacker who exploited directory traversal to upload a web shell, and search `auth.log` for failed passwords to identify the attacker's external brute-force IP."
        }
    ]
