// curriculum/stage7-9.js
module.exports = [
  // =========================================================================
  // STAGE 7 — LINUX SECURITY
  // =========================================================================
  {
    id: "room-31",
    stage: 7,
    stageTitle: "Stage 7 — Linux Security",
    title: "Linux Privilege Escalation: SUID & Sudo",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "40 min",
    prerequisites: "Room 05 (Linux Permissions) & Stage 5 (Security Tools)",
    whyAreYouHere: "When an attacker exploits a web vulnerability (like a web shell or remote code execution), they rarely land as the supreme administrator (`root`). Instead, they land as an unprivileged service account like `www-data` or `cadet`. To gain full control of the machine, they must escalate their privileges! In this room, you will learn the mechanics of Linux Privilege Escalation, focusing on Setuid (SUID) binaries and misconfigured sudo rules.",
    objectives: [
      "Understand the Privilege Escalation lifecycle (Foothold -> Enumeration -> Exploitation -> Root)",
      "Understand the SUID (Set User ID) permission bit and why it exists",
      "Scan the entire filesystem for misconfigured SUID binaries using the `find` command",
      "Learn the GTFOBins methodology for turning legitimate system binaries into root shells",
      "Escalate from user `cadet` to `root` using an interactive terminal sandbox"
    ],
    vocabulary: [
      { term: "Privilege Escalation (Privesc)", definition: "The act of exploiting a bug, design flaw, or configuration error to gain elevated access to resources normally protected from an application or user." },
      { term: "SUID (Set User ID)", definition: "A special Linux file permission bit that allows a program to execute with the privileges of the file owner (usually root) rather than the user running it." },
      { term: "SGID (Set Group ID)", definition: "Similar to SUID, but executes with the permissions of the file's group owner." },
      { term: "GTFOBins", definition: "A curated open-source repository of Unix binaries that can be exploited by an attacker to bypass local security restrictions and escalate privileges." },
      { term: "sudo (Superuser Do)", definition: "A program that allows a permitted user to execute a command as superuser or another user, as specified by the security policy." }
    ],
    lessons: [
      {
        title: "1. The Purpose and Danger of SUID",
        content: `Why does SUID exist?
Consider the \`/usr/bin/passwd\` command: when a regular user wants to change their password, the program must write their new hash into \`/etc/shadow\`. But only \`root\` can write to \`/etc/shadow\`!
To solve this, Linux marks \`/usr/bin/passwd\` with the **SUID bit** (\`-rwsr-xr-x\`).
When a user runs it, the process temporarily runs with \`root\` power.

**The Danger**: If a developer or administrator sets the SUID bit on a program that can execute external commands (like \`find\`, \`vim\`, \`bash\`, or \`python\`), a standard user can trick that program into launching a root shell!`
      },
      {
        title: "2. Finding SUID Binaries",
        content: `To search the entire hard drive for every file with the SUID bit set:
\`\`\`bash
find / -perm -4000 -type f 2>/dev/null
\`\`\`
• \`/\`: Search starting at root.
• \`-perm -4000\`: Filter for the SUID permission bit (octal 4000).
• \`-type f\`: Only look for regular files.
• \`2>/dev/null\`: Discard all 'Permission denied' error messages so output remains clean.`
      }
    ],
    seeExamples: [
      {
        title: "The SUID find Root Drop",
        codeOrDiagram: `cadet@endlessus:~$ ls -l /usr/bin/find
-rwsr-xr-x 1 root root 198240 Oct 5 16:30 /usr/bin/find

cadet@endlessus:~$ /usr/bin/find . -exec /bin/sh -p \\; -quit
# whoami
root`,
        explanation: "Notice the `-p` (privileged) flag: because `find` had SUID root permissions, launching `/bin/sh -p` dropped directly into a root `#` shell!"
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Search the filesystem for SUID binaries using `find /usr/bin -perm -4000 -type f 2>/dev/null`:",
      initialCommand: "",
      expectedCommand: "find /usr/bin -perm -4000 -type f 2>/dev/null",
      simulatedOutput: "/usr/bin/passwd\n/usr/bin/chsh\n/usr/bin/newgrp\n/usr/bin/find    <-- Misconfiguration detected! find should never be SUID root.\n[+] Success! SUID binary /usr/bin/find identified.",
      explanation: "Auditing SUID permissions revealed `/usr/bin/find`, which allows arbitrary command execution via the `-exec` flag."
    },
    questions: [
      {
        id: "r31-q1",
        type: "multiple-choice",
        question: "When inspecting file permissions in `ls -l`, which letter replaces the standard `x` in the owner's triplet to indicate that the SUID bit is set (e.g. `-rwsr-xr-x`)?",
        options: [
          "The letter 's'",
          "The letter 'z'",
          "An exclamation mark '!'",
          "An asterisk '*'"
        ],
        correctIndex: 0,
        explanation: "A lowercase 's' in the owner execute position indicates that both execute and SUID permissions are enabled."
      },
      {
        id: "r31-q2",
        type: "multiple-choice",
        question: "Why is setting the SUID permission on binary utilities like `find`, `vim`, or `python` considered an emergency-level security misconfiguration?",
        options: [
          "Because these utilities run slower under SUID",
          "Because these utilities contain features designed to execute subcommands or spawn shells, which will run with full root privileges",
          "Because SUID deletes the user's home folder",
          "Because it crashes the network card"
        ],
        correctIndex: 1,
        explanation: "Any binary capable of executing arbitrary commands (like find -exec) will spawn those commands as root if SUID is set."
      }
    ],
    tasks: [
      {
        title: "Task 1: Locate Misconfigured SUID Binary",
        instruction: "Run `find /usr/bin -perm -4000 -type f 2>/dev/null` to discover the escalation vector.",
        hints: [
          "Concept: Search for SUID permission bit.",
          "Direction: Use find with `-perm -4000`.",
          "Tool: `find`",
          "Syntax: `find /usr/bin -perm -4000 -type f 2>/dev/null`",
          "Explanation: Locates vulnerable SUID binaries."
        ]
      }
    ],
    explainResult: "The `find` utility traversed directory inodes, examined the `st_mode` mask for `S_ISUID (04000)`, and highlighted `/usr/bin/find`.",
    securityConnection: "Privilege escalation is the critical middle phase of every penetration test. Without escalating to root, a tester cannot access credentials in `/etc/shadow`, dump physical RAM, install monitoring agents, or establish persistent backdoors.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical Linux SUID Privilege Escalation Lab",
      url: "labs.html?lab=suid"
    },
    completion: {
      learned: [
        "The purpose and danger of the Linux SUID permission bit",
        "How to audit the filesystem for SUID files using find",
        "The GTFOBins methodology for exploiting Unix binaries",
        "Hardening SUID permissions to prevent local privilege escalation"
      ],
      practiced: [
        "find /usr/bin -perm -4000 -type f",
        "Analyzing file permission bits",
        "Identifying root escalation vectors"
      ]
    },
    nextRoomId: "room-32"
  },

  // =========================================================================
  // STAGE 8 — NETWORK SECURITY
  // =========================================================================
  {
    id: "room-32",
    stage: 8,
    stageTitle: "Stage 8 — Network Security",
    title: "SMB & Network Share Enumeration",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Stage 2 (Networking) & Stage 5 (Nmap)",
    whyAreYouHere: "In enterprise corporate networks, employees need to share files, spreadsheets, and backups across internal networks. The protocol that powers this in Windows (and Linux Samba) is **SMB (Server Message Block)** on port 445. Because SMB is so ubiquitous, misconfigured file permissions or Anonymous / Null sessions frequently expose confidential spreadsheets, database backups, and cleartext passwords to any network visitor. In this room, you will learn how to enumerate SMB shares and audit file permissions.",
    objectives: [
      "Understand Server Message Block (SMB / CIFS) on ports 445 and 139",
      "Learn what Null Sessions and Anonymous guest logins are",
      "Enumerate network shares using `smbclient` and Nmap NSE scripts",
      "Download and inspect exposed files from unauthenticated shares",
      "Remediate SMB exposure by enforcing signing and authentication"
    ],
    vocabulary: [
      { term: "SMB (Server Message Block)", definition: "A network file sharing protocol used for sharing files, printers, and serial ports between computers on a network (primarily Windows and Samba)." },
      { term: "Port 445", definition: "The standard TCP port used for Direct Host SMB over TCP/IP without requiring NetBIOS." },
      { term: "Null Session", definition: "An unauthenticated connection to an SMB service using an empty username and empty password." },
      { term: "smbclient", definition: "A command-line tool with an FTP-like interface used to interact with and download files from SMB/CIFS network shares." },
      { term: "Samba", definition: "The standard open-source software suite that provides seamless file and print services to SMB/CIFS clients on Linux and Unix." }
    ],
    lessons: [
      {
        title: "1. The Structure of an SMB Share",
        content: `SMB shares are named network folders exposed over the network:
\`\\\\10.10.10.25\\shared_folder\` (Windows UNC path)
or
\`//10.10.10.25/shared_folder\` (Linux smbclient path)

Common default shares:
• \`C$\` & \`ADMIN$\`: Default administrative shares (restricted to Domain Admins).
• \`IPC$\`: Inter-Process Communication share used for RPC and anonymous enumeration.
• Custom shares: \`Public\`, \`Finance\`, \`Backups\` (frequently misconfigured with anonymous read access!).`
      },
      {
        title: "2. Enumerating Shares with smbclient",
        content: `To test whether a target server allows anonymous enumeration:
\`\`\`bash
smbclient -L //10.10.10.25 -N
\`\`\`
• \`-L\`: List available shares on the target.
• \`-N\`: No password (tests for anonymous null session access).
If the server returns a share list, you can connect directly into accessible shares!`
      }
    ],
    seeExamples: [
      {
        title: "Listing SMB Shares with smbclient",
        codeOrDiagram: `cadet@endlessus:~$ smbclient -L //10.10.10.25 -N
Anonymous login successful

	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	public          Disk      Public Department Share
	finance_backup  Disk      Restricted Internal Financials
	IPC$            IPC       IPC Service (Samba Server)`,
        explanation: "Notice the `public` and `finance_backup` shares. An ethical hacker will immediately audit their permissions for sensitive files."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "List accessible SMB shares on lab host `10.10.10.25` without a password using `smbclient -L //10.10.10.25 -N`:",
      initialCommand: "",
      expectedCommand: "smbclient -L //10.10.10.25 -N",
      simulatedOutput: "Anonymous login successful\n\n\tSharename       Type      Comment\n\t---------       ----      -------\n\tpublic          Disk      Department Read Share\n\tbackups         Disk      Internal Systems Backups\n\tIPC$            IPC       IPC Service\n[+] Success! Anonymous share enumeration successful on port 445.",
      explanation: "`smbclient -N` confirmed that the SMB daemon permits anonymous null sessions, exposing shared directory names."
    },
    questions: [
      {
        id: "r32-q1",
        type: "multiple-choice",
        question: "Which TCP port is standard for direct SMB communication over modern TCP/IP networks?",
        options: [
          "Port 445",
          "Port 22",
          "Port 80",
          "Port 53"
        ],
        correctIndex: 0,
        explanation: "Port 445 is the direct SMB port over TCP. (Older NetBIOS-over-TCP implementations also used ports 137-139)."
      },
      {
        id: "r32-q2",
        type: "multiple-choice",
        question: "What is an SMB 'Null Session'?",
        options: [
          "A session that terminates the computer immediately",
          "An unauthenticated connection established using an empty username and empty password",
          "A session encrypted with zero-length RSA keys",
          "A session restricted to local printers only"
        ],
        correctIndex: 1,
        explanation: "A Null Session connects without supplying credentials (username='' and password=''), allowed by legacy or misconfigured SMB servers."
      }
    ],
    tasks: [
      {
        title: "Task 1: Enumerate SMB Target Shares",
        instruction: "Run `smbclient -L //10.10.10.25 -N` to inspect anonymous network shares.",
        hints: [
          "Concept: SMB network share discovery.",
          "Direction: Use smbclient with list and no-pass flags.",
          "Tool: `smbclient`",
          "Syntax: `smbclient -L //10.10.10.25 -N`",
          "Explanation: Lists shares without authentication."
        ]
      }
    ],
    explainResult: "The `smbclient` binary negotiated SMB protocol dialect with Samba on port 445, requested share tree descriptors, and printed the directory table.",
    securityConnection: "SMB vulnerabilities have fueled some of the most destructive cyber attacks in history (including the EternalBlue exploit CVE-2017-0144 used in the WannaCry ransomware outbreak). Auditing SMB configurations is a core phase of internal network penetration tests.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical SMB & Network Share Enumeration Lab",
      url: "labs.html?lab=smb"
    },
    completion: {
      learned: [
        "The role of the Server Message Block (SMB) protocol on port 445",
        "The risks of Null Sessions and Anonymous Guest access",
        "Using smbclient to enumerate available shares and permissions",
        "Hardening file servers against unauthorized network discovery"
      ],
      practiced: [
        "smbclient -L //10.10.10.25 -N",
        "Enumerating network shares",
        "Analyzing Windows/Samba file sharing security"
      ]
    },
    nextRoomId: "room-33"
  },

  // =========================================================================
  // STAGE 9 — MODERN SECURITY
  // =========================================================================
  {
    id: "room-33",
    stage: 9,
    stageTitle: "Stage 9 — Modern Security",
    title: "JSON Web Tokens (JWT) & Token Security",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 13 (Cookies & Sessions) & Room 18 (Cryptography)",
    whyAreYouHere: "Traditional web apps stored session state in a server database. Modern cloud, microservices, and mobile apps use **JSON Web Tokens (JWTs)** instead. A JWT is a self-contained, stateless identity token containing claims about the user. But when developers misconfigure JWT libraries — such as accepting the infamous `none` algorithm or using weak secret keys — attackers can forge administrator tokens at will! In this room, you will dissect JWT tokens and exploit common signature vulnerabilities.",
    objectives: [
      "Understand the architecture of JSON Web Tokens: Header, Payload, and Signature",
      "Learn how JWTs are encoded using Base64Url (three parts separated by dots)",
      "Understand how cryptographic signatures guarantee token integrity",
      "Explore the classic `alg: none` signature bypass vulnerability",
      "Inspect and decode JWT tokens in the terminal"
    ],
    vocabulary: [
      { term: "JWT (JSON Web Token)", definition: "An open standard (RFC 7519) that defines a compact, URL-safe means for securely transmitting assertions between parties as a JSON object." },
      { term: "Header", definition: "The first part of a JWT, specifying the token type and cryptographic signing algorithm (e.g. `HS256` or `RS256`)." },
      { term: "Payload (Claims)", definition: "The second part of a JWT, containing user identity data, role permissions, and expiration timestamps." },
      { term: "Signature", definition: "The third part of a JWT, generated by hashing the header and payload with a secret key, used to verify the token has not been tampered with." },
      { term: "alg: none", definition: "A legacy algorithm specification in early JWT libraries that disables signature verification entirely." }
    ],
    lessons: [
      {
        title: "1. The Anatomy of a JWT",
        content: `A JWT looks like three strings joined by dots:
\`\`\`text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2FkZXQiLCJyb2xlIjoidXNlciJ9.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
\`\`\`
• **Part 1 (Header - Red)**: Base64Url decoded: \`{"alg":"HS256","typ":"JWT"}\`
• **Part 2 (Payload - Purple)**: Base64Url decoded: \`{"user":"cadet","role":"user"}\`
• **Part 3 (Signature - Blue)**: \`HMACSHA256(Base64Url(Header) + "." + Base64Url(Payload), secret_key)\`
Because the parts are only Base64Url encoded, **anyone can read the payload**! The signature only prevents *modifying* it.`
      },
      {
        title: "2. The 'None' Algorithm Flaw",
        content: `In some vulnerable JWT libraries, the backend trusts whatever algorithm is declared in the token header:
If an attacker changes the header to:
\`{"alg":"none","typ":"JWT"}\`
and changes the payload to:
\`{"user":"admin","role":"administrator"}\`
and strips the signature:
\`Header.Payload.\`
The vulnerable server sees \`alg: none\`, skips signature verification, and logs the attacker in as administrator! Modern libraries explicitly reject \`none\`.`
      }
    ],
    seeExamples: [
      {
        title: "Decoding a JWT in Bash",
        codeOrDiagram: `cadet@endlessus:~$ echo "eyJ1c2VyIjoiY2FkZXQiLCJyb2xlIjoidXNlciJ9" | base64 -d
{"user":"cadet","role":"user"}`,
        explanation: "JWT payloads are not encrypted! They are simply Base64Url strings. Never store sensitive secrets or plaintext passwords inside a JWT."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate submitting a tampered JWT with role escalated to administrator against the lab validation API: `curl -H \"Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9.\" http://localhost:8080/api/admin`:",
      initialCommand: "",
      expectedCommand: "curl -H \"Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9.\" http://localhost:8080/api/admin",
      simulatedOutput: "HTTP/1.1 200 OK\n{\"access\":\"GRANTED\",\"user\":\"admin\",\"secret_flag\":\"flag{jwt_none_algorithm_exploited}\"}\n[+] Success! Vulnerable server accepted unsigned 'none' algorithm token.",
      explanation: "The vulnerable server read the header algorithm, observed `none`, skipped the cryptographic verification, and granted admin access."
    },
    questions: [
      {
        id: "r33-q1",
        type: "multiple-choice",
        question: "Is the data payload inside a standard JSON Web Token (JWT) encrypted so that third parties cannot read its contents?",
        options: [
          "Yes, all JWTs are encrypted with AES-256 by default",
          "No; JWT payloads are merely Base64Url encoded, meaning anyone who intercepts the token can read all claims and user data inside it",
          "Yes, provided the token uses HTTPS",
          "No, because JWTs can only contain numbers"
        ],
        correctIndex: 1,
        explanation: "JWTs are signed, NOT encrypted (unless using JWE). The payload is plain Base64Url that anyone can decode."
      },
      {
        id: "r33-q2",
        type: "multiple-choice",
        question: "How does a secure backend properly defend against the `alg: none` JWT vulnerability?",
        options: [
          "By allowing the client to specify any algorithm they want",
          "By hardcoding the expected signing algorithm on the server (e.g. enforcing HS256) and rejecting tokens that specify unexpected algorithms",
          "By restarting the web server every hour",
          "By removing the signature from all tokens"
        ],
        correctIndex: 1,
        explanation: "Servers should never trust the client's header algorithm; they must enforce an expected algorithm whitelist on the backend."
      }
    ],
    tasks: [
      {
        title: "Task 1: Exploit Unsigned JWT Token",
        instruction: "Submit the forged `alg: none` JWT bearer token to access `/api/admin`.",
        hints: [
          "Concept: JWT signature bypass via none algorithm.",
          "Direction: Send bearer token in Authorization header.",
          "Tool: `curl`",
          "Syntax: Run the provided curl command.",
          "Explanation: Bypasses token verification."
        ]
      }
    ],
    explainResult: "The JWT library lacked an algorithm whitelist, executing `jwt.verify(token, secret, { algorithms: ['HS256'] })` improperly without algorithm constraints.",
    securityConnection: "JWT attacks are common in modern Single Page Applications (SPAs) and mobile APIs. Attackers crack weak HMAC secrets using dictionary wordlists with tools like `jwt_tool` or `john`, and test for Key Confusion attacks (swapping RS256 public keys into HS256 symmetric HMAC keys).",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical JSON Web Token (JWT) Lab",
      url: "labs.html?lab=jwt"
    },
    completion: {
      learned: [
        "The three-part structure of JSON Web Tokens (Header.Payload.Signature)",
        "Why JWTs are encoded rather than encrypted",
        "The mechanics of the `alg: none` signature bypass flaw",
        "How to enforce strict algorithm whitelisting in backend token handlers"
      ],
      practiced: [
        "curl -H \"Authorization: Bearer ...\"",
        "Decoding Base64Url JWT structures",
        "Testing stateless token authorization controls"
      ]
    },
    nextRoomId: "room-34"
  },

  {
    id: "room-34",
    stage: 9,
    stageTitle: "Stage 9 — Modern Security",
    title: "Cryptanalysis Basics & Cipher Analysis",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 18 (Cryptography Fundamentals)",
    whyAreYouHere: "Cryptography is the science of making secret codes; **Cryptanalysis** is the science of breaking them without possessing the key. While modern AES-256 cannot be cracked by brute force, developers constantly make the mistake of creating their own 'custom ciphers' or using weak XOR keys. In this room, you will explore classical cipher analysis, understand letter frequency distributions in English, and break single-byte XOR encryption.",
    objectives: [
      "Understand the difference between Cryptography and Cryptanalysis",
      "Learn classical ciphers: Caesar Substitution and Vigenère polyalphabetic ciphers",
      "Understand Frequency Analysis and the characteristic distribution of letters in human language (ETAOIN SHRDLU)",
      "Master the XOR (Exclusive OR) logical operation in cryptography",
      "Crack a single-byte XOR encrypted message using python/cli"
    ],
    vocabulary: [
      { term: "Cryptanalysis", definition: "The study of analyzing information systems in order to study the hidden aspects of the systems and decipher ciphertext without knowing the secret key." },
      { term: "Frequency Analysis", definition: "The study of the frequency of letters or groups of letters in a ciphertext to break substitution ciphers based on linguistic patterns." },
      { term: "Substitution Cipher", definition: "A method of encryption by which units of plaintext are replaced with ciphertext according to a fixed system or key." },
      { term: "XOR (Exclusive OR)", definition: "A bitwise logical operation where the output is 1 if and only if the inputs differ. It is reversible: `(A ⊕ B) ⊕ B = A`." },
      { term: "Kerckhoffs's Principle", definition: "The cryptographic axiom stating that a cryptosystem should be secure even if everything about the system, except the key, is public knowledge." }
    ],
    lessons: [
      {
        title: "1. Frequency Analysis: English Has a Fingerprint",
        content: `In the English language, letters do not appear with equal probability:
• **'E'** is the most common letter (~12.7% of all text).
• **'T'**, **'A'**, **'O'**, **'I'**, **'N'** come next.
• **'Z'**, **'Q'**, **'X'** are extremely rare.

If you analyze an encrypted book where every letter is shifted, and the letter **'P'** appears 13% of the time, 'P' is almost certainly the encrypted substitution for **'E'**! By matching frequencies, simple substitution ciphers unravel in minutes.`
      },
      {
        title: "2. The Magic of XOR (Exclusive OR)",
        content: `XOR (\`^\` or \`⊕\`) is the most fundamental building block in modern cryptography:
\`\`\`text
0 ⊕ 0 = 0
1 ⊕ 1 = 0
1 ⊕ 0 = 1
0 ⊕ 1 = 1
\`\`\`
The beauty of XOR is that it is its own inverse:
\`Plaintext ⊕ Key = Ciphertext\`
\`Ciphertext ⊕ Key = Plaintext\`
If a weak developer encrypts data by XORing every byte with a single repeating character (e.g. \`0x55\`), an analyst only needs to test 256 possible byte keys to find the plaintext!`
      }
    ],
    seeExamples: [
      {
        title: "Frequency of Letters in English",
        codeOrDiagram: `Letter   Frequency (%)
  E      █████████████ 12.7%
  T      █████████ 9.1%
  A      ████████ 8.2%
  O      ███████ 7.5%
  I      ███████ 7.0%
  N      ███████ 6.7%
  S      ██████ 6.3%
  H      ██████ 6.1%`,
        explanation: "Frequency analysis relies on this mathematical curve to crack substitution ciphers."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Decrypt a single-byte XOR encrypted hex string (`1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736`) by scoring English character frequencies in python: `python3 -c \"ct = bytes.fromhex('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'); print(''.join([chr(b ^ 0x58) for b in ct]))\"`:",
      initialCommand: "",
      expectedCommand: "python3 -c \"ct = bytes.fromhex('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'); print(''.join([chr(b ^ 0x58) for b in ct]))\"",
      simulatedOutput: "Cooking MC's like a pound of bacon\n[+] Success! XOR key 0x58 (character 'X') recovered cleartext message.",
      explanation: "Testing single-byte keys from 0 to 255 quickly recovers the plaintext because 256 keys can be brute-forced in under 1 millisecond."
    },
    questions: [
      {
        id: "r34-q1",
        type: "multiple-choice",
        question: "What is Kerckhoffs's Principle in cryptography?",
        options: [
          "Security must rely on keeping the mathematical algorithm top-secret",
          "A cryptosystem must be secure even if everything about the design and algorithm is public, provided the cryptographic key remains secret",
          "All encryption keys must be exactly 10 characters long",
          "Computers should never use binary numbers"
        ],
        correctIndex: 1,
        explanation: "Kerckhoffs's Principle establishes that 'security through obscurity' of algorithms fails; true security depends solely on the secrecy of the key."
      },
      {
        id: "r34-q2",
        type: "multiple-choice",
        question: "Why is single-byte XOR encryption trivially broken by cryptanalysts?",
        options: [
          "Because XOR only works on uppercase letters",
          "Because there are only 256 possible single-byte keys (0x00 to 0xFF), allowing a computer to test every key in milliseconds and score the output for readable English words",
          "Because XOR destroys the hard drive",
          "Because single-byte keys are illegal"
        ],
        correctIndex: 1,
        explanation: "A single byte has only 256 possible permutations, making exhaustive key space search instantaneous."
      }
    ],
    tasks: [
      {
        title: "Task 1: Recover XOR Ciphertext",
        instruction: "Run the Python one-liner to decrypt the single-byte XOR string.",
        hints: [
          "Concept: Single-byte XOR key recovery.",
          "Direction: Apply key 0x58 against ciphertext bytes.",
          "Tool: `python3`",
          "Syntax: Run the complete python command.",
          "Explanation: Reverses XOR transformation."
        ]
      }
    ],
    explainResult: "The Python script converted the hex string into raw bytes, applied the bitwise XOR operator (`^`) with key `0x58` against each byte, and decoded the ASCII characters.",
    securityConnection: "Malware authors frequently use single-byte XOR or simple Caesar ciphers to obfuscate command-and-control IP addresses or API keys inside their malware binaries to evade antivirus string matching. Reverse engineers use cryptanalysis to extract these strings in seconds.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical Cryptography & Ciphertext Analysis Lab",
      url: "labs.html?lab=crypto"
    },
    completion: {
      learned: [
        "The distinction between Cryptography (making) and Cryptanalysis (breaking)",
        "How letter frequency analysis breaks monoalphabetic substitution ciphers",
        "The mathematical properties and reversibility of the XOR operation",
        "Kerckhoffs's Principle and the fallacy of 'security through obscurity'"
      ],
      practiced: [
        "python3 -c \"...\"",
        "Decrypting XOR ciphertexts",
        "Evaluating cryptographic key spaces"
      ]
    },
    nextRoomId: "room-35"
  }
];
