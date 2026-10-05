// curriculum/stage4.js
module.exports = [
  {
    id: "room-14",
    stage: 4,
    stageTitle: "Stage 4 — Cybersecurity Fundamentals",
    title: "What Are We Protecting? Assets, Threats & Risk",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "20 min",
    prerequisites: "Stage 3 (How the Web Works)",
    whyAreYouHere: "You now understand computers, operating systems, networks, and the web. But what are we actually trying to defend? Cybersecurity is not about installing antivirus and hoping for the best; it is a rigorous discipline of risk management. In this room, you will learn the fundamental equation that governs all enterprise security: how Assets, Threats, Vulnerabilities, and Controls determine business Risk.",
    objectives: [
      "Define the four core pillars: Assets, Threats, Vulnerabilities, and Risk",
      "Master the fundamental Risk Equation: Risk = Threat × Vulnerability × Asset Impact",
      "Understand what constitutes an organization's Attack Surface",
      "Differentiate between Preventative, Detective, and Corrective security controls",
      "Calculate risk scores in a simulated enterprise scenario"
    ],
    vocabulary: [
      { term: "Asset", definition: "Anything of value to an organization that must be protected, including customer data, intellectual property, financial records, and hardware servers." },
      { term: "Threat", definition: "Any potential circumstance or event that could exploit a vulnerability to cause harm (e.g. ransomware gangs, rogue insiders, power outages)." },
      { term: "Vulnerability", definition: "A flaw or weakness in system design, implementation, or operation that could be leveraged by a threat." },
      { term: "Risk", definition: "The potential for loss, damage, or destruction of an asset resulting from a threat exploiting a vulnerability." },
      { term: "Attack Surface", definition: "The total sum of all possible points (endpoints, ports, web forms, employees) where an unauthorized user can try to enter or extract data." },
      { term: "Security Control", definition: "A safeguard or countermeasure prescribed to reduce risk and protect confidentiality, integrity, or availability." }
    ],
    lessons: [
      {
        title: "1. The Fundamental Risk Equation",
        content: `Many beginners confuse threats with vulnerabilities. Here is how they connect:
• An unpatched web server with an open SQL injection bug is a **Vulnerability**.
• A criminal hacking group seeking financial gain is a **Threat**.
• If that web server contains the credit card records of 500,000 customers, that is the **Asset**.
• **Risk** is what happens when the Threat finds the Vulnerability to compromise the Asset!`
      },
      {
        title: "2. The Three Control Categories",
        content: `Security teams deploy three layers of defense:
1. **Preventative Controls**: Block attacks before they happen (e.g. firewalls, strong passwords, input validation).
2. **Detective Controls**: Identify attacks while or after they happen (e.g. intrusion detection systems, security audit logs, file integrity monitors).
3. **Corrective Controls**: Minimize damage and restore normal operations after an incident (e.g. daily offline backups, incident response plans).`
      }
    ],
    seeExamples: [
      {
        title: "Risk Calculation Matrix",
        codeOrDiagram: `Likelihood   Impact      Risk Level   Recommended Action
High         Critical    CRITICAL     Fix immediately (Emergency patch)
High         Low         MEDIUM       Schedule in next sprint
Low          Critical    HIGH         Deploy mitigating controls
Low          Low         LOW          Accept or monitor`,
        explanation: "Organizations prioritize vulnerabilities based on likelihood and impact, not just theoretical severity."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Audit an asset inventory file to identify exposed critical assets using `cat /etc/endlessus/assets.json`:",
      initialCommand: "",
      expectedCommand: "cat /etc/endlessus/assets.json",
      simulatedOutput: "{\n  \"asset_id\": \"DB-PRIMARY-01\",\n  \"asset_type\": \"Production PostgreSQL Database\",\n  \"data_classification\": \"CONFIDENTIAL - PCI/Customer Records\",\n  \"vulnerability\": \"CVE-2024-Unpatched Remote Code Execution\",\n  \"exposure\": \"Publicly accessible on port 5432\",\n  \"calculated_risk\": \"CRITICAL\"\n}\n[+] Success! Critical unpatched asset identified with public exposure.",
      explanation: "Auditing asset registries allows security architects to spot misconfigured public database servers immediately."
    },
    questions: [
      {
        id: "r14-q1",
        type: "multiple-choice",
        question: "A company operates an internal accounting server that has a severe unpatched vulnerability, but the server is completely disconnected from the internet and inside a locked vault. Why is the actual risk considered low?",
        options: [
          "Because accounting data has zero value to attackers",
          "Because the threat cannot reach the vulnerability, making the likelihood of remote exploitation near zero",
          "Because unpatched bugs fix themselves over time",
          "Because Linux kernels are immune to malware"
        ],
        correctIndex: 1,
        explanation: "Risk requires both vulnerability and threat likelihood. If an asset is isolated from threats, the risk of exploitation drops dramatically."
      },
      {
        id: "r14-q2",
        type: "multiple-choice",
        question: "Which of the following is an example of a Detective security control?",
        options: [
          "A steel security door with a biometric fingerprint scanner",
          "A web application firewall that blocks SQL injection requests",
          "A Security Information and Event Management (SIEM) system analyzing login logs for unusual nighttime spikes",
          "An automated daily offline backup tape"
        ],
        correctIndex: 2,
        explanation: "A SIEM analyzes logs to detect ongoing or past intrusions, making it a detective control."
      }
    ],
    tasks: [
      {
        title: "Task 1: Inspect Asset Risk Profile",
        instruction: "Read the asset inventory file using `cat /etc/endlessus/assets.json` to inspect classification levels.",
        hints: [
          "Concept: Inspect asset management database.",
          "Direction: Use the cat command.",
          "Tool: `cat`",
          "Syntax: `cat /etc/endlessus/assets.json`",
          "Explanation: Displays asset metadata and risk."
        ]
      }
    ],
    explainResult: "The `cat` utility read the JSON object defining asset classification, exposure vector, and calculated risk level.",
    securityConnection: "Every commercial penetration test begins with scoping assets. Testers do not attack random servers; they focus testing on high-value assets (customer databases, payment gateways) where vulnerabilities create the highest business risk.",
    completion: {
      learned: [
        "The core concepts: Asset, Threat, Vulnerability, and Risk",
        "The risk formula: Risk = Threat × Vulnerability × Asset Value",
        "The concept of Attack Surface and exposure vectors",
        "Preventative, Detective, and Corrective security controls"
      ],
      practiced: [
        "cat /etc/endlessus/assets.json",
        "Evaluating asset risk rankings",
        "Differentiating control types"
      ]
    },
    nextRoomId: "room-15"
  },

  {
    id: "room-15",
    stage: 4,
    stageTitle: "Stage 4 — Cybersecurity Fundamentals",
    title: "The CIA Triad: Confidentiality, Integrity & Availability",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "25 min",
    prerequisites: "Room 14 (What Are We Protecting?)",
    whyAreYouHere: "If you ask a seasoned Chief Information Security Officer (CISO) what their ultimate mission is, they will not say 'stopping hackers'. They will say: 'protecting the CIA Triad'. The CIA Triad is the bedrock mental model of all information security worldwide. In this room, you will explore Confidentiality, Integrity, and Availability, and learn how to categorize any cyber incident in seconds.",
    objectives: [
      "Master the three pillars of the CIA Triad: Confidentiality, Integrity, and Availability",
      "Understand Confidentiality (preventing unauthorized disclosure of data)",
      "Understand Integrity (preventing unauthorized modification, tampering, or destruction)",
      "Understand Availability (ensuring systems and data are accessible to authorized users when needed)",
      "Analyze real-world breach scenarios and map them accurately to C, I, or A impacts"
    ],
    vocabulary: [
      { term: "CIA Triad", definition: "The foundational model of information security composed of Confidentiality, Integrity, and Availability." },
      { term: "Confidentiality", definition: "Ensuring that sensitive information is accessible only to authorized individuals, entities, or processes." },
      { term: "Integrity", definition: "Safeguarding the accuracy, completeness, and trustworthiness of data and systems from unauthorized alterations." },
      { term: "Availability", definition: "Ensuring that authorized parties have timely, reliable access to critical information and computing resources." },
      { term: "Non-Repudiation", definition: "The assurance that the sender or actor cannot deny having performed a transaction or message." }
    ],
    lessons: [
      {
        title: "1. The Three Pillars in Everyday Life",
        content: `Consider a modern hospital's patient records system:
• **Confidentiality**: Only the patient's doctors should view their medical diagnosis and prescription history. If a nurse sells celebrity health records to a tabloid, **Confidentiality is breached**.
• **Integrity**: If an attacker alters the patient's blood type in the database from O-positive to B-negative, the patient could die from a transfusion error. **Integrity is breached**.
• **Availability**: If an ambulance rushes an emergency stroke victim into the trauma ward, but a DDoS attack has knocked the medical records system offline, doctors cannot look up allergies. **Availability is breached**.`
      },
      {
        title: "2. The Security Tradeoff",
        content: `Security is often a delicate balancing act.
If you maximize Confidentiality to the extreme (disconnect the server, lock it in concrete, encrypt with a 1,000-character key), you destroy **Availability** because nobody can get their work done! Security professionals strive for the optimal balance tailored to each organization's risk tolerance.`
      }
    ],
    seeExamples: [
      {
        title: "Mapping Incidents to the CIA Triad",
        codeOrDiagram: `Scenario                                  Primary Impact
Data breach leaks 100,000 passwords       → CONFIDENTIALITY
Attacker alters financial balance ledger  → INTEGRITY
Ransomware encrypts hospital drives       → AVAILABILITY & INTEGRITY
DDoS flood takes banking app offline      → AVAILABILITY`,
        explanation: "Security analysts immediately categorize security alerts under C, I, or A to determine incident response priority."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate an integrity check by calculating the SHA-256 cryptographic checksum of our system's ledger using `sha256sum ledger.csv`:",
      initialCommand: "",
      expectedCommand: "sha256sum ledger.csv",
      simulatedOutput: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08  ledger.csv\n[+] Success! Cryptographic hash generated. If anyone changes a single character, this hash completely changes!",
      explanation: "Cryptographic hashing is the primary technical tool used to guarantee Data Integrity."
    },
    questions: [
      {
        id: "r15-q1",
        type: "multiple-choice",
        question: "A malicious actor launches a Distributed Denial of Service (DDoS) attack that overwhelms an online banking website with junk traffic, preventing customers from logging in. Which pillar of the CIA Triad is directly compromised?",
        options: [
          "Confidentiality",
          "Integrity",
          "Availability",
          "Non-repudiation"
        ],
        correctIndex: 2,
        explanation: "The attack prevents legitimate users from accessing the service when needed, directly violating Availability."
      },
      {
        id: "r15-q2",
        type: "multiple-choice",
        question: "An insider employee secretly modifies an audit log file to erase their own user ID from a record of unauthorized wire transfers. Which pillar of the CIA Triad has been compromised?",
        options: [
          "Availability",
          "Confidentiality",
          "Integrity",
          "Scalability"
        ],
        correctIndex: 2,
        explanation: "Tampering with or modifying records undermines the accuracy and trustworthiness of the data, violating Integrity."
      }
    ],
    tasks: [
      {
        title: "Task 1: Verify Ledger Integrity",
        instruction: "Calculate the SHA-256 checksum of `ledger.csv` using `sha256sum ledger.csv`.",
        hints: [
          "Concept: Cryptographic verification of data integrity.",
          "Direction: Use the sha256sum utility.",
          "Tool: `sha256sum`",
          "Syntax: `sha256sum ledger.csv`",
          "Explanation: Generates a 64-character hex hash."
        ]
      }
    ],
    explainResult: "The `sha256sum` utility processed the entire file contents through the SHA-256 cryptographic algorithm, producing a unique 256-bit fingerprint.",
    securityConnection: "Every security standard (ISO 27001, NIST SP 800-53, SOC 2) evaluates controls through the lens of Confidentiality, Integrity, and Availability. When writing penetration test reports, you will classify every discovered finding under the CIA pillar it harms.",
    completion: {
      learned: [
        "The three pillars: Confidentiality, Integrity, and Availability",
        "Real-world consequences of breaches in each pillar",
        "The concept of Non-Repudiation and auditability",
        "Using SHA-256 cryptographic hashing to verify data integrity"
      ],
      practiced: [
        "sha256sum ledger.csv",
        "Classifying security incidents into CIA categories",
        "Evaluating security trade-offs"
      ]
    },
    nextRoomId: "room-16"
  },

  {
    id: "room-16",
    stage: 4,
    stageTitle: "Stage 4 — Cybersecurity Fundamentals",
    title: "Authentication, Authorization & Accounting (AAA)",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "25 min",
    prerequisites: "Room 15 (The CIA Triad)",
    whyAreYouHere: "Beginners often treat 'login' and 'permissions' as the exact same thing. In reality, they are completely separate security mechanisms! If an application confuses them, catastrophe strikes. In this room, you will master the AAA security framework: Identification ('Who are you?'), Authentication ('Prove it!'), Authorization ('What are you allowed to do?'), and Accounting ('What did you do?').",
    objectives: [
      "Understand the difference between Identification, Authentication, and Authorization",
      "Learn the three core factors of authentication: Something you know, have, and are",
      "Understand Multi-Factor Authentication (MFA) and why it stops credential attacks",
      "Explore Role-Based Access Control (RBAC) and the Principle of Least Privilege",
      "Inspect user permission scopes in the lab terminal"
    ],
    vocabulary: [
      { term: "Identification", definition: "The assertion of an identity to a system (e.g. typing your username or email address)." },
      { term: "Authentication (AuthN)", definition: "The process of verifying that an asserted identity is genuine (e.g. validating a password or biometric)." },
      { term: "Authorization (AuthZ)", definition: "The process of determining what actions, resources, or files an authenticated identity is permitted to access." },
      { term: "Accounting / Auditing", definition: "The recording and tracking of user actions, timestamps, and resource access for accountability." },
      { term: "Multi-Factor Authentication (MFA)", definition: "Requiring two or more distinct authentication factors before granting access." },
      { term: "Principle of Least Privilege (PoLP)", definition: "Giving users and processes only the absolute minimum permissions necessary to complete their job." }
    ],
    lessons: [
      {
        title: "1. The Boarding Pass Analogy",
        content: `When you travel on an airplane:
1. **Identification**: You walk up and say: *"I am Mihraj."*
2. **Authentication**: You hand over your government passport with your photo. The agent verifies: *"Yes, you are indeed who you claim to be."*
3. **Authorization**: The agent looks at your boarding pass: *Seat 14B*. You are authorized to sit in 14B; you are **not** authorized to walk into the cockpit or sit in First Class!

Notice: Just because you successfully **authenticated** does not mean you are **authorized** to access everything.`
      },
      {
        title: "2. The Three Factors of Authentication",
        content: `• **Something You Know**: Password, PIN, security answer (easily phished or guessed).
• **Something You Have**: Hardware YubiKey, Authenticator app TOTP code, smartphone SMS (harder to steal).
• **Something You Are**: Fingerprint, facial recognition, iris scan (biometrics).
True **Multi-Factor Authentication** requires credentials from *two different categories*!`
      }
    ],
    seeExamples: [
      {
        title: "Role-Based Access Control (RBAC) Matrix",
        codeOrDiagram: `Role       View Products   Edit Profile   Delete User   Access DB
Guest            ✓               ✗              ✗           ✗
Customer         ✓               ✓ (Self only)  ✗           ✗
Support Staff    ✓               ✓ (All)        ✗           ✗
Administrator    ✓               ✓ (All)        ✓           ✓`,
        explanation: "RBAC maps fine-grained permissions to roles rather than configuring every user manually."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Inspect the sudo privileges granted to your current session using `sudo -l`:",
      initialCommand: "",
      expectedCommand: "sudo -l",
      simulatedOutput: "Matching Defaults entries for cadet on endlessus-box:\n    env_reset, mail_badpass\n\nUser cadet may run the following commands on endlessus-box:\n    (ALL : ALL) ALL\n[+] Success! Audited sudoers rules. User cadet has full root escalation privileges.",
      explanation: "`sudo -l` (list privileges) asks the kernel authorization engine which commands you are allowed to run as root."
    },
    questions: [
      {
        id: "r16-q1",
        type: "multiple-choice",
        question: "A user successfully logs into a corporate HR portal using their username and password. However, when they attempt to view the CEO's salary table, the system displays 'Access Denied: Administrator Role Required'. Which security control triggered this denial?",
        options: [
          "Authentication",
          "Authorization",
          "Identification",
          "DHCP Lease check"
        ],
        correctIndex: 1,
        explanation: "The user was already authenticated; the failure occurred during Authorization when checking permissions against the requested resource."
      },
      {
        id: "r16-q2",
        type: "multiple-choice",
        question: "Which of the following setups constitutes genuine Multi-Factor Authentication (MFA)?",
        options: [
          "Entering a password and then entering a backup secondary password",
          "Entering a password (something you know) and a 6-digit code from an Authenticator app (something you have)",
          "Entering your username and an email address",
          "Logging in from two different browser tabs at the same time"
        ],
        correctIndex: 1,
        explanation: "Password (knowledge factor) + Authenticator app token (possession factor) spans two distinct categories, satisfying MFA."
      }
    ],
    tasks: [
      {
        title: "Task 1: Audit Sudo Authorization",
        instruction: "Run `sudo -l` to query what administrative privileges your account holds.",
        hints: [
          "Concept: Query sudo privilege authorization.",
          "Direction: Use the sudo utility with the list flag.",
          "Tool: `sudo`",
          "Syntax: `sudo -l`",
          "Explanation: Lists allowed sudo commands."
        ]
      }
    ],
    explainResult: "The `sudo` binary read `/etc/sudoers`, authenticated the calling UID against the local PAM subsystem, and evaluated the user's privilege specification.",
    securityConnection: "Broken Object Level Authorization (BOLA / IDOR) and Broken Authentication consistently rank in the top 3 of the OWASP Top 10 vulnerabilities! Attackers continually exploit flaws where servers verify identity (authN) but forget to verify permissions (authZ).",
    completion: {
      learned: [
        "The critical distinction between Authentication and Authorization",
        "The three authentication factor types (knowledge, possession, inherence)",
        "The AAA model: Identification, Authentication, Authorization, Accounting",
        "The Principle of Least Privilege (PoLP) and RBAC"
      ],
      practiced: [
        "sudo -l",
        "Auditing authorization rules",
        "Evaluating multi-factor configurations"
      ]
    },
    nextRoomId: "room-17"
  },

  {
    id: "room-17",
    stage: 4,
    stageTitle: "Stage 4 — Cybersecurity Fundamentals",
    title: "Common Cyber Threats & Attack Vectors",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "25 min",
    prerequisites: "Room 16 (Authentication & Authorization)",
    whyAreYouHere: "To defend a fortress, you must study the weapons of the siege. Cyber threats are not science-fiction monsters; they are structured, predictable methods used by adversaries to gain access, steal assets, or extort victims. In this room, you will learn the major categories of cyber threats: malware varieties, social engineering, phishing, ransomware, credential stuffing, and insider threats.",
    objectives: [
      "Understand the primary malware categories: Viruses, Worms, Trojans, Spyware, and Ransomware",
      "Learn how Phishing and Social Engineering manipulate human psychology",
      "Understand Credential Stuffing, Brute-Force, and Password Spraying attacks",
      "Learn how Denial of Service (DoS / DDoS) disrupts availability",
      "Identify the anatomy of a real-world phishing attack"
    ],
    vocabulary: [
      { term: "Malware", definition: "Malicious software: any program or code intentionally designed to harm, exploit, or steal data from a computer system." },
      { term: "Trojan Horse", definition: "Malware disguised as legitimate, harmless software (like a game or utility) that secretly executes a malicious payload." },
      { term: "Ransomware", definition: "A type of malware that encrypts a victim's files and demands payment (usually cryptocurrency) in exchange for the decryption key." },
      { term: "Phishing", definition: "A social engineering attack where adversaries pose as trusted institutions to trick victims into revealing sensitive information or clicking malicious links." },
      { term: "Credential Stuffing", definition: "An automated attack where lists of leaked username/password pairs are tested against hundreds of websites hoping for password reuse." },
      { term: "DDoS (Distributed Denial of Service)", definition: "An attack that floods a server or network with traffic from thousands of compromised botnet devices to take it offline." }
    ],
    lessons: [
      {
        title: "1. The Malware Family Tree",
        content: `• **Virus**: Attaches to legitimate executable files and spreads when users run infected files.
• **Worm**: Self-propagating malware that spreads automatically across networks by exploiting unpatched vulnerabilities without any human interaction!
• **Trojan**: Masquerades as a useful tool (e.g. *free_photoshop.exe*) but installs a hidden backdoor.
• **Ransomware**: Silently traverses shared drives, encrypts every document using strong AES/RSA encryption, and leaves a \`README_RECOVER_FILES.txt\` ransom note.`
      },
      {
        title: "2. The Human Element: Social Engineering",
        content: `Attackers often target the human rather than the firewall because humans can be rushed, intimidated, or deceived:
• **Phishing**: Mass deceptive emails claiming your account is suspended.
• **Spear Phishing**: Highly tailored phishing targeting a specific individual using details from their LinkedIn or company role.
• **Baiting**: Leaving infected USB drives in a company parking lot waiting for curious employees to plug them in.`
      }
    ],
    seeExamples: [
      {
        title: "Anatomy of a Suspicious Phishing Email",
        codeOrDiagram: `From: IT Support <security@support-endlessus-update.com>   <-- Spoofed lookalike domain!
To: employee@endlessus.in
Subject: URGENT: Your password expires in 15 minutes!       <-- Artificial urgency & fear!

Dear User,
Your email access will be terminated immediately unless you
verify your identity right now:

>> [ Click Here to Keep Your Account ]                      <-- Link points to malicious IP!

IT Help Desk Team`,
        explanation: "Key red flags: lookalike domain, artificial urgency, threat of termination, and a link pointing outside the real domain."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Inspect an unknown downloaded script file using the Linux `file` utility to determine what it actually is before running it:",
      initialCommand: "",
      expectedCommand: "file update_utility.bin",
      simulatedOutput: "update_utility.bin: ELF 64-bit LSB executable, x86-64, dynamically linked, stripped [Reverse Shell / Backdoor payload]\n[+] Success! The file claimed to be an update, but is an ELF binary backdoor.",
      explanation: "The `file` command inspects internal magic bytes instead of trusting the file extension, revealing disguised executables."
    },
    questions: [
      {
        id: "r17-q1",
        type: "multiple-choice",
        question: "Which type of malware can spread automatically across internal network devices without requiring any user to click a link or run a program?",
        options: [
          "A Worm",
          "A Phishing email",
          "A Keylogger",
          "A Cookie"
        ],
        correctIndex: 0,
        explanation: "Worms are self-replicating and self-propagating across network vulnerabilities without human intervention."
      },
      {
        id: "r17-q2",
        type: "multiple-choice",
        question: "Why do attackers perform 'Credential Stuffing' attacks using public databases of passwords leaked from older company breaches?",
        options: [
          "Because people frequently reuse the exact same password across dozens of different websites",
          "Because old passwords automatically decrypt new SSL certificates",
          "Because web servers keep passwords in public DNS records",
          "Because credential stuffing crashes web browsers"
        ],
        correctIndex: 0,
        explanation: "Massive password reuse across services makes leaked password lists highly effective against other websites."
      }
    ],
    tasks: [
      {
        title: "Task 1: Inspect Suspicious Binary",
        instruction: "Run `file update_utility.bin` to determine the true MIME and executable type of the file.",
        hints: [
          "Concept: File magic byte inspection.",
          "Direction: Use the file command.",
          "Tool: `file`",
          "Syntax: `file update_utility.bin`",
          "Explanation: Identifies the binary header."
        ]
      }
    ],
    explainResult: "The `file` utility examined the first 16 bytes of the file, identified the `\\x7fELF` magic number header, and confirmed it is a compiled Linux ELF binary.",
    securityConnection: "Threat modeling is the first phase of any security program. Penetration testers emulate these exact threats (Red Team adversary emulation) so defensive teams (Blue Team) can test whether their endpoint detection and response (EDR) software catches the attack.",
    completion: {
      learned: [
        "The malware taxonomy (Viruses, Worms, Trojans, Ransomware, Spyware)",
        "How social engineering and phishing exploit psychological urgency",
        "The mechanics of Credential Stuffing and Password Spraying",
        "How to inspect file headers using the Linux `file` utility"
      ],
      practiced: [
        "file update_utility.bin",
        "Dissecting phishing email indicators",
        "Evaluating threat attack surfaces"
      ]
    },
    nextRoomId: "room-18"
  },

  {
    id: "room-18",
    stage: 4,
    stageTitle: "Stage 4 — Cybersecurity Fundamentals",
    title: "Cryptography Fundamentals: Encryption, Hashing & Encoding",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Room 17 (Common Cyber Threats)",
    whyAreYouHere: "There is one fundamental concept that trips up almost every single beginner in cybersecurity: the difference between Encoding, Encryption, and Hashing. If you mix these up in a job interview or report, your credibility vanishes. In this room, you will learn the Golden Rule: **Encoding is NOT Encryption, and Encryption is NOT Hashing**. You will master symmetric keys, asymmetric public/private keys, and irreversible cryptographic hashes.",
    objectives: [
      "Master the Golden Rule: Encoding ≠ Encryption ≠ Hashing",
      "Understand Encoding: reversible formatting for data transmission (Base64, URL encoding) with ZERO secrets",
      "Understand Hashing: irreversible, fixed-size mathematical fingerprints (SHA-256, bcrypt)",
      "Understand Symmetric Encryption: one shared secret key for encryption and decryption (AES)",
      "Understand Asymmetric Encryption: public key encrypts, private key decrypts (RSA, ECC)",
      "Encode and hash data using command-line utilities"
    ],
    vocabulary: [
      { term: "Plaintext", definition: "Unencrypted, human-readable clear text data before being processed by a cryptographic algorithm." },
      { term: "Ciphertext", definition: "The encrypted, unintelligible scrambled output produced by an encryption algorithm." },
      { term: "Encoding", definition: "Transforming data into a different format using a public standard (e.g. Base64) for safe transmission. It provides ZERO security!" },
      { term: "Hashing", definition: "A one-way mathematical function that transforms any input into a unique, fixed-length string that CANNOT be reversed." },
      { term: "Symmetric Encryption", definition: "Encryption that uses the exact same secret key to both encrypt and decrypt data (e.g. AES-256)." },
      { term: "Asymmetric Encryption", definition: "Encryption using a mathematically linked key pair: a Public Key (distributed freely) and a Private Key (kept strictly secret)." }
    ],
    lessons: [
      {
        title: "1. The Golden Rule: The Three Pillars Compared",
        content: `• **Encoding (Base64)**:
  - *Purpose*: Format data so systems don't corrupt it during transit (e.g. sending binary images inside JSON).
  - *Key*: None! Anyone with a standard decoder can instantly reverse it.
  - *Security*: **ZERO**. Never use Base64 to 'hide' passwords!
• **Hashing (SHA-256)**:
  - *Purpose*: Verify integrity and store passwords safely.
  - *Key*: None.
  - *Reversible?*: **NEVER**. You cannot mathematically convert a hash back to its input.
• **Encryption (AES / RSA)**:
  - *Purpose*: Maintain confidentiality so only authorized key holders can read data.
  - *Key*: Required secret cryptographic key.
  - *Reversible?*: **YES**, but only if you hold the correct secret key!`
      },
      {
        title: "2. Symmetric vs Asymmetric Encryption",
        content: `• **Symmetric (AES)**: Fast and efficient. Both parties share the same secret key.
  - *Problem*: How do two people on opposite sides of the world exchange the secret key safely without eavesdroppers copying it?
• **Asymmetric (Public Key Cryptography)**:
  - You publish your **Public Key** to the whole world. Anyone can use it to encrypt a message for you.
  - Only your private, guarded **Private Key** can decrypt and read that message!
  - Modern web security (HTTPS) combines both: it uses Asymmetric encryption to safely exchange a temporary Symmetric AES key!`
      }
    ],
    seeExamples: [
      {
        title: "Encoding vs Hashing vs Encryption Example",
        codeOrDiagram: `Original String: "EndlessusPassword123"

1. Base64 Encoded (Reversible with no key!):
   → RW5kbGVzc3VzUGFzc3dvcmQxMjM=

2. SHA-256 Hashed (One-way mathematical digest, never reversible!):
   → 6e580e22f28b788a03222da87b328a6f3b0e3532655bd44b26099dfbe36d1b77

3. AES-256 Encrypted (Reversible ONLY with the secret password key):
   → U2FsdGVkX1+vGz348xJ3aP0lQ/98d+F2hRk=`,
        explanation: "Notice the difference: Base64 can be decoded by anyone in 1 millisecond. SHA-256 is permanent. AES requires the secret key."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Demonstrate that Base64 encoding is not encryption by decoding a secret token: `echo 'SGFja2VyVmlld1JlYWR5' | base64 -d`:",
      initialCommand: "",
      expectedCommand: "echo 'SGFja2VyVmlld1JlYWR5' | base64 -d",
      simulatedOutput: "HackerViewReady\n[+] Success! Decoded in 0.001s without any key. Never treat encoding as security!",
      explanation: "Base64 is an encoding standard, not encryption. It contains no secret key and provides zero confidentiality."
    },
    questions: [
      {
        id: "r18-q1",
        type: "multiple-choice",
        question: "A developer stores user passwords in a database by converting them to Base64 strings. Is this database secure against password theft?",
        options: [
          "Yes, because Base64 uses a 256-bit military key",
          "No, because Base64 is an encoding scheme that anyone can instantly decode without needing a key or password",
          "Yes, provided the database is running on Linux",
          "No, because Base64 strings expire after 24 hours"
        ],
        correctIndex: 1,
        explanation: "Base64 is merely a data representation format, not encryption. Anyone who accesses the database can reverse all passwords instantly."
      },
      {
        id: "r18-q2",
        type: "multiple-choice",
        question: "In Asymmetric Public-Key Cryptography, if Alice wants to send a secret message to Bob, which key should she use to encrypt the message?",
        options: [
          "Alice's own Private Key",
          "Bob's Public Key",
          "Bob's Private Key",
          "Alice's Public Key"
        ],
        correctIndex: 1,
        explanation: "Alice encrypts using Bob's freely available Public Key. Once encrypted, only Bob's Private Key can decrypt and read the message."
      }
    ],
    tasks: [
      {
        title: "Task 1: Decode Base64 Payload",
        instruction: "Use `echo 'SGFja2VyVmlld1JlYWR5' | base64 -d` to decode the unencrypted string.",
        hints: [
          "Concept: Base64 decoding.",
          "Direction: Pipe the string into base64 with the decode flag.",
          "Tool: `base64`",
          "Syntax: `echo 'SGFja2VyVmlld1JlYWR5' | base64 -d`",
          "Explanation: Output will show the clear text."
        ]
      }
    ],
    explainResult: "The `base64 -d` utility translated the 6-bit ASCII characters back into their original 8-bit byte representation without needing any cryptographic key.",
    securityConnection: "Cryptographic failures are #2 on the OWASP Top 10. Attackers frequently discover web applications that transmit sensitive session tokens in Base64 or use outdated hashing algorithms (like MD5 or SHA-1) that can be broken using precomputed rainbow tables or GPU hash-cracking rigs.",
    completion: {
      learned: [
        "The fundamental rule: Encoding ≠ Encryption ≠ Hashing",
        "How Base64 encoding works and why it offers zero security",
        "One-way cryptographic hashing for data integrity and password storage",
        "Symmetric encryption (AES) vs Asymmetric encryption (RSA/ECC)"
      ],
      practiced: [
        "base64 -d",
        "Differentiating encoding from encryption",
        "Identifying public vs private key usage"
      ]
    },
    nextRoomId: "room-19"
  }
];
