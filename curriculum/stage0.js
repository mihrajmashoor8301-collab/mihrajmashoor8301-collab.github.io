// curriculum/stage0.js
module.exports = [
  {
    id: "room-01",
    stage: 0,
    stageTitle: "Stage 0 — Start Here",
    title: "Welcome to Cybersecurity",
    difficulty: "Beginner",
    difficultyBadge: "🟢 Beginner",
    estimatedTime: "15 min",
    prerequisites: "None (Zero prior knowledge required)",
    whyAreYouHere: "You have arrived at the start of your journey. Cybersecurity can feel intimidating with hundreds of confusing abbreviations, dark terminal windows, and complex tools. In this room, you will demystify what cybersecurity really is, understand how ethical hackers think, and execute your very first command in the Endlessus interactive terminal with zero fear.",
    objectives: [
      "Understand what cybersecurity is and why it protects the modern digital world",
      "Differentiate between Offensive Security (Red Team) and Defensive Security (Blue Team)",
      "Learn what makes ethical hacking legal, authorized, and professional",
      "Understand Rules of Engagement (RoE) and Scope in security testing",
      "Run your first interactive shell command (`whoami`) and interpret the output",
      "Learn how to use progressive hints when you get stuck"
    ],
    vocabulary: [
      { term: "Cybersecurity", definition: "The practice of protecting systems, networks, devices, and data from digital attacks, damage, or unauthorized access." },
      { term: "Offensive Security (Red Team)", definition: "Ethical hackers who simulate adversarial attacks to find security weaknesses before malicious actors do." },
      { term: "Defensive Security (Blue Team)", definition: "Security engineers and analysts who build defenses, monitor logs, detect intrusions, and respond to incidents." },
      { term: "Ethical Hacker", definition: "A security professional who hacks with explicit written permission to help organizations fix vulnerabilities." },
      { term: "Scope", definition: "The precise list of systems, domains, and IP addresses you are legally authorized to test." },
      { term: "Command Shell / Terminal", definition: "A text-based interface that lets you communicate directly with a computer by typing commands." }
    ],
    lessons: [
      {
        title: "1. What is Cybersecurity?",
        content: `At its core, cybersecurity is about **trust**. Every day, hospitals manage patient vitals, banks process billions in wire transfers, and electrical grids supply power to millions. All of these run on computers connected together.

When these systems have flaws, malicious hackers (often called "black hats") can steal private records, disrupt power, or hold businesses for ransom. Cybersecurity professionals exist to identify and fix these flaws first.`
      },
      {
        title: "2. Red Team vs Blue Team: Two Sides of the Shield",
        content: `Cybersecurity is broadly divided into two cooperative sides:

• **Offensive Security (Red Team)**: You think like an adversary. You test systems, search for configuration mistakes, verify whether software bugs can be exploited, and report your findings.
• **Defensive Security (Blue Team)**: You design secure architectures, monitor network traffic, set up firewalls, investigate suspicious activity, and patch vulnerabilities.

Both teams need the exact same foundational knowledge: **you cannot defend or test what you do not understand**.`
      },
      {
        title: "3. The Law: Authorization & Scope",
        content: `What separates an ethical hacker from a cybercriminal is not technical skill — it is **authorization**.

Testing or probing a system without explicit, written permission from the owner is illegal under computer misuse legislation worldwide. In Endlessus, every lab target is run in a secure, sandboxed environment specifically created for your education. You have full authorization here!`
      }
    ],
    seeExamples: [
      {
        title: "Interactive Shell: How Commands Work",
        codeOrDiagram: `cadet@endlessus:~$ whoami
cadet

cadet@endlessus:~$ date
Sun Oct 05 16:30:00 UTC 2026

cadet@endlessus:~$ echo "Hello, Cybersecurity!"
Hello, Cybersecurity!`,
        explanation: "In a terminal, you type a command next to the prompt (`$`), press Enter, and the operating system responds with text output. Here, `whoami` asks the computer: 'What is my current username?'"
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Type `whoami` below and press Enter to see your current identity in the Endlessus sandbox:",
      initialCommand: "",
      expectedCommand: "whoami",
      simulatedOutput: "cadet\n[+] Success! Your terminal identity is 'cadet'. You just executed your first shell command.",
      explanation: "The command `whoami` is one of the simplest utilities in Unix/Linux. It tells you your active user account name."
    },
    questions: [
      {
        id: "r1-q1",
        type: "multiple-choice",
        question: "What is the single most critical factor that distinguishes an ethical penetration tester from an unauthorized attacker?",
        options: [
          "Ethical hackers only use open-source operating systems",
          "Ethical hackers have explicit written authorization and an agreed scope from the system owner",
          "Ethical hackers never look at application source code",
          "Ethical hackers only test web browsers and never networks"
        ],
        correctIndex: 1,
        explanation: "Authorization is paramount. Without explicit, written permission and clear scope, testing any computer system is illegal."
      },
      {
        id: "r1-q2",
        type: "multiple-choice",
        question: "A company hires you to simulate an attack against their customer portal to find vulnerabilities before launch. Which security role are you performing?",
        options: [
          "Defensive Security (Blue Team)",
          "Offensive Security (Red Team)",
          "Hardware Technician",
          "Database Administrator"
        ],
        correctIndex: 1,
        explanation: "Simulating attacks to discover vulnerabilities is the definition of offensive security (Red Teaming / penetration testing)."
      },
      {
        id: "r1-q3",
        type: "command-interpretation",
        question: "What does the command `whoami` return when run in a Linux or Windows terminal?",
        options: [
          "The current IP address of your network card",
          "The list of installed programs on the computer",
          "The username of the account currently running the shell",
          "The version of the Linux kernel"
        ],
        correctIndex: 2,
        explanation: "`whoami` prints the effective user ID (username) of the current shell session."
      }
    ],
    tasks: [
      {
        title: "Task 1: Execute your first shell command",
        instruction: "Use the interactive terminal below to query your active session user by typing `whoami`.",
        hints: [
          "Concept: You are querying your session's user identity.",
          "Direction: Type into the terminal input box directly.",
          "Tool: Use the standard POSIX username utility.",
          "Syntax: `whoami` (all lowercase, no spaces).",
          "Explanation: Typing `whoami` will output 'cadet', proving your terminal works."
        ]
      }
    ],
    explainResult: "You typed `whoami`. The operating system searched its system path (`/usr/bin/whoami`), ran the program, read the user ID associated with your session process (UID 1001: cadet), printed it to standard output, and closed the process.",
    securityConnection: "Whenever a penetration tester gains access to an unknown server or terminal, the first command they run is almost always `whoami` or `id`. It instantly tells them whether they landed as an unprivileged user (requiring privilege escalation) or as the supreme administrator (root / SYSTEM).",
    completion: {
      learned: [
        "The purpose and societal value of cybersecurity",
        "The division of labor between Red and Blue teams",
        "The vital legal boundary of authorization and scope",
        "How a shell prompt works and interprets commands"
      ],
      practiced: [
        "whoami",
        "Interactive terminal command execution",
        "Using the 5-stage hint system"
      ]
    },
    nextRoomId: "room-02"
  }
];
