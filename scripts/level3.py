# scripts/level3.py
# Level 3: Windows Fundamentals (Rooms 15 - 19)

from generate_pre_security import DIAGRAMS

def get_rooms():
    return [
        # Room 15: Windows Architecture & Filesystem
        {
            "stage": 3,
            "level": 3,
            "levelTitle": "Level 3 — Windows Fundamentals",
            "title": "Windows Architecture & The NTFS Filesystem",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Level 2: Linux Fundamentals",
            "whyAreYouHere": "While web servers and security tools often run on Linux, over 80% of enterprise corporate workstations and Active Directory networks run on Microsoft Windows. Penetration testers and incident responders must understand Windows internal architecture, drive volumes, system directories, and the Windows Registry.",
            "objectives": [
                "Understand Windows architecture: User Mode vs Kernel Mode (ntoskrnl.exe)",
                "Learn the NTFS filesystem features: Access Control Lists (ACLs) and Alternate Data Streams (ADS)",
                "Explore essential Windows directories: `C:\\Windows`, `System32`, `Program Files`, and `AppData`",
                "Understand the Windows Registry: Hives (HKLM, HKCU, HKCR), keys, and values",
                "Navigate Windows filesystem basics from the command line"
            ],
            "vocabulary": [
                {"term": "NTFS (New Technology File System)", "definition": "The proprietary journaling filesystem used by modern Windows operating systems, supporting fine-grained permissions, encryption, and Alternate Data Streams."},
                {"term": "Alternate Data Streams (ADS)", "definition": "An NTFS feature allowing files to contain multiple streams of data under a single filename (often abused by malware to hide payloads)."},
                {"term": "Windows Registry", "definition": "A central hierarchical database that stores low-level settings for the operating system, hardware devices, and installed applications."},
                {"term": "System32", "definition": "The critical core Windows directory (`C:\\Windows\\System32`) containing core DLLs, executables, and system drivers."},
                {"term": "HKLM (HKEY_LOCAL_MACHINE)", "definition": "The Registry hive containing hardware and system-wide software configuration settings affecting all users on the machine."}
            ],
            "diagramSvg": DIAGRAMS["hardware"],
            "lessons": [
                {
                    "title": "1. Windows Architecture: User Mode vs Kernel Mode",
                    "content": "Windows separates software into two execution rings:\n\n• **User Mode**: Applications, Explorer shell, and background services run here. If a user application crashes, it cannot take down the operating system.\n• **Kernel Mode (`ntoskrnl.exe`)**: The core OS kernel, Hardware Abstraction Layer (HAL), and kernel device drivers (`.sys` files) run here. Flaws here trigger the infamous Blue Screen of Death (BSOD).\n\nWindows subsystems (like Win32, POSIX, and WSL) translate application API calls into kernel system calls."
                },
                {
                    "title": "2. Essential System Directories",
                    "content": "• `C:\\Windows\\System32`: The heart of Windows. Contains vital binaries (`cmd.exe`, `powershell.exe`, `svchost.exe`, `net.exe`) and core Dynamic Link Libraries (DLLs).\n• `C:\\Program Files` & `C:\\Program Files (x86)`: Default installation directories for 64-bit and 32-bit third-party applications.\n• `C:\\Users\\[Username]\\AppData`: Hidden directory where applications store user-specific configuration, browser history, cache, and session tokens. Malware frequently installs itself here because writing to AppData does not require Administrator privileges!"
                },
                {
                    "title": "3. The Windows Registry",
                    "content": "In Linux, configuration settings are stored in plain text files in `/etc`. In Windows, almost all system settings are stored in a centralized binary database called the **Windows Registry**.\n\nThe Registry is organized into 5 primary **Hives**:\n\n1. **HKLM (HKEY_LOCAL_MACHINE)**: Settings for the entire computer (boot settings, installed software, security policies).\n2. **HKCU (HKEY_CURRENT_USER)**: Settings specific to the currently logged-in user (desktop background, personal app preferences).\n3. **HKCR (HKEY_CLASSES_ROOT)**: File association mappings (which program opens `.pdf` or `.docx`).\n4. **HKU (HKEY_USERS)**: Profiles of all user accounts on the machine.\n5. **HKCC (HKEY_CURRENT_CONFIG)**: Hardware profile data gathered at system boot."
                }
            ],
            "seeExamples": [
                {
                    "title": "Querying the Registry via Command Line",
                    "codeOrDiagram": "C:\\> reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\" /v ProductName\n\nHKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\n    ProductName    REG_SZ    Windows 11 Pro",
                    "explanation": "The `reg query` command extracts configuration values directly from the Windows Registry without opening the graphical `regedit.exe` tool."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo %SYSTEMROOT%` to simulate querying the Windows system root environment variable:",
                "initialCommand": "",
                "expectedCommand": "echo %SYSTEMROOT%",
                "simulatedOutput": "C:\\Windows\n[+] Variable resolved: The Windows system root directory is C:\\Windows.",
                "explanation": "In Windows CMD, environment variables are enclosed in percent signs (e.g., `%SYSTEMROOT%`)."
            },
            "questions": [
                {
                    "id": "q-15-1",
                    "type": "exact",
                    "question": "What is the standard filesystem used by modern Windows operating systems that supports Access Control Lists and Alternate Data Streams?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["NTFS"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "New Technology File System abbreviation.",
                    "explanation": "NTFS stands for New Technology File System."
                },
                {
                    "id": "q-15-2",
                    "type": "multiple-choice",
                    "question": "Which Windows Registry hive holds configuration settings that apply machine-wide to all users and hardware devices?",
                    "options": [
                        "HKCU (HKEY_CURRENT_USER)",
                        "HKLM (HKEY_LOCAL_MACHINE)",
                        "HKCR (HKEY_CLASSES_ROOT)",
                        "HKCC (HKEY_CURRENT_CONFIG)"
                    ],
                    "correctIndex": 1,
                    "hint": "HKEY_LOCAL_MACHINE.",
                    "explanation": "HKLM stores settings applicable to the local machine across all user accounts."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Query Windows root directory variable",
                    "instruction": "Run `echo %SYSTEMROOT%` in the terminal.",
                    "hints": ["Type: `echo %SYSTEMROOT%`"]
                }
            ],
            "securityConnection": "Attackers establish persistence on Windows machines by adding registry run keys (e.g. `HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`). When Windows boots up, any executable path registered in that key runs automatically as a background process!"
        },

        # Room 16: Windows Users, Groups & Permissions
        {
            "stage": 3,
            "level": 3,
            "levelTitle": "Level 3 — Windows Fundamentals",
            "title": "Windows Users, Groups & Access Controls",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Room 15: Windows Architecture & The NTFS Filesystem",
            "whyAreYouHere": "User account management is the foundation of enterprise Windows security. In corporate environments, Windows computers are joined to an Active Directory domain where identity, passwords, and permissions are managed centrally. In this room, you will learn the difference between Local Accounts and Domain Accounts, User Account Control (UAC), and NTFS Access Control Lists.",
            "objectives": [
                "Differentiate between Local User Accounts and Active Directory Domain Accounts",
                "Understand the special built-in accounts: Administrator, Guest, and NT AUTHORITY\\SYSTEM",
                "Learn how User Account Control (UAC) prompts protect against unauthorized administrative changes",
                "Understand NTFS Discretionary Access Control Lists (DACLs) and ACEs",
                "Audit user accounts and group memberships using `net user` and `net localgroup`"
            ],
            "vocabulary": [
                {"term": "Local Account", "definition": "A user account stored on the local machine's SAM (Security Account Manager) database, valid only on that specific computer."},
                {"term": "Domain Account", "definition": "A centralized enterprise account stored in Active Directory on a Domain Controller, valid across thousands of corporate workstations."},
                {"term": "NT AUTHORITY\\SYSTEM", "definition": "The supreme operating system account on Windows, possessing higher privileges than a local Administrator."},
                {"term": "UAC (User Account Control)", "definition": "A security feature that prompts users for confirmation or credentials before allowing an app to run with administrative tokens."},
                {"term": "DACL (Discretionary Access Control List)", "definition": "A list of Access Control Entries (ACEs) attached to every Windows object defining which users have Read, Write, or Full Control permissions."}
            ],
            "diagramSvg": DIAGRAMS["hardware"],
            "lessons": [
                {
                    "title": "1. Local Accounts vs Domain Accounts",
                    "content": "• **Local Accounts**: Managed on the individual computer. Credentials live in `C:\\Windows\\System32\\config\\SAM`. A local account named `alice` on Workstation-1 cannot log into Workstation-2.\n• **Domain Accounts (Active Directory)**: In enterprise networks, computers join a **Domain**. A Domain Controller (DC) running Kerberos authenticates users. You can log into any workstation in the building with your single corporate username and password (`CORP\\alice`)."
                },
                {
                    "title": "2. Administrator vs NT AUTHORITY\\SYSTEM",
                    "content": "Windows has two levels of supreme power:\n\n• **Administrator**: The administrative user account. Can install software, manage users, and modify system settings.\n• **NT AUTHORITY\\SYSTEM**: The operating system identity itself. Even local Administrators cannot access certain registry keys or kernel memory without elevating to SYSTEM privileges!\n\nIn penetration testing, achieving `NT AUTHORITY\\SYSTEM` on a Windows host is the equivalent of getting `root` on Linux."
                },
                {
                    "title": "3. User Account Control (UAC)",
                    "content": "In older Windows versions (Windows XP), logging in as an administrator meant every program ran with full administrative rights. If you opened a malicious email attachment, it instantly infected the whole system!\n\nWindows Vista introduced **User Account Control (UAC)**. Even when an Administrator logs in, Windows gives their everyday processes an **unprivileged token**. Only when a program needs administrative changes does Windows display a UAC prompt asking for permission."
                }
            ],
            "seeExamples": [
                {
                    "title": "Enumerating Users with the 'net' command",
                    "codeOrDiagram": "C:\\> net user\nUser accounts for \\\\WORKSTATION-01\n-------------------------------------------------------------------\nAdministrator            DefaultAccount           Guest\nHelpAssistant            cadet                    WDAGUtilityAccount\n\nC:\\> net localgroup Administrators\nMembers\n-------------------------------------------------------------------\nAdministrator",
                    "explanation": "`net user` lists all local user accounts; `net localgroup Administrators` reveals who possesses administrative rights."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `whoami /groups` to simulate inspecting active group memberships and security identifiers (SIDs):",
                "initialCommand": "",
                "expectedCommand": "whoami /groups",
                "simulatedOutput": "GROUP INFORMATION\n-----------------\nGroup Name                                  Type             SID\nMandatory Label\\Medium Mandatory Level      Label            S-1-16-8192\n[+] Integrity Level verified: Running at Medium Mandatory Level (Standard User).",
                "explanation": "`whoami /groups` reveals the security token groups and integrity level assigned to the active shell."
            },
            "questions": [
                {
                    "id": "q-16-1",
                    "type": "exact",
                    "question": "What is the supreme Windows operating system account name that has higher privileges than a local Administrator (format: SYSTEM)?",
                    "visualSlots": "_ _ _ _ _ _",
                    "acceptedAnswers": ["SYSTEM", "NT AUTHORITY\\SYSTEM"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Six letters: S-Y-S-T-E-M.",
                    "explanation": "NT AUTHORITY\\SYSTEM is the highest privilege account in Windows."
                },
                {
                    "id": "q-16-2",
                    "type": "multiple-choice",
                    "question": "Which Windows security mechanism prompts users with a dialog box when an application requests elevated administrative tokens?",
                    "options": [
                        "BitLocker",
                        "User Account Control (UAC)",
                        "Windows Defender",
                        "AppLocker"
                    ],
                    "correctIndex": 1,
                    "hint": "UAC abbreviation.",
                    "explanation": "User Account Control (UAC) gates administrative privilege elevation behind user confirmation."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect group token information",
                    "instruction": "Run `whoami /groups` in the terminal.",
                    "hints": ["Type: `whoami /groups`"]
                }
            ],
            "securityConnection": "Attackers who gain an initial foothold as a standard user search for 'UAC Bypass' vulnerabilities or unquoted service path misconfigurations to elevate their privileges to `NT AUTHORITY\\SYSTEM`."
        },

        # Room 17: Windows Processes & Task Manager
        {
            "stage": 3,
            "level": 3,
            "levelTitle": "Level 3 — Windows Fundamentals",
            "title": "Windows Processes, Services & Task Manager",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Room 16: Windows Users, Groups & Access Controls",
            "whyAreYouHere": "Malware does not announce itself with a flashing banner; it hides among legitimate Windows operating system processes like `svchost.exe`, `explorer.exe`, or `lsass.exe`. Security analysts and incident responders must know what normal Windows processes look like so they can immediately spot abnormal processes or rogue background services.",
            "objectives": [
                "Navigate the Windows Task Manager (Processes, Performance, Startup apps, Services tabs)",
                "Identify core legitimate Windows system processes (smss, csrss, wininit, lsass, svchost)",
                "Understand Windows Services and manage them using `services.msc` and `sc.exe`",
                "Learn about Dynamic Link Libraries (DLLs) and DLL Search Order Hijacking",
                "Inspect running processes from the command line using `tasklist` and terminate with `taskkill`"
            ],
            "vocabulary": [
                {"term": "svchost.exe (Service Host)", "definition": "A shared system host process for Windows services that run from Dynamic Link Libraries (.dll files). Multiple instances run simultaneously."},
                {"term": "lsass.exe (Local Security Authority)", "definition": "The critical security subsystem process responsible for verifying user logins, handling password changes, and storing active Kerberos/NTLM authentication tickets in memory."},
                {"term": "Task Manager", "definition": "The built-in Windows GUI utility used to monitor system performance, view running processes, and inspect resource consumption."},
                {"term": "tasklist", "definition": "The Windows command-line utility that displays all currently running applications and processes."},
                {"term": "DLL (Dynamic Link Library)", "definition": "A shared library of compiled code and functions that multiple programs can load into memory simultaneously to save RAM."}
            ],
            "diagramSvg": DIAGRAMS["hardware"],
            "lessons": [
                {
                    "title": "1. Core Legitimate Windows Processes",
                    "content": "Every Windows system runs several critical core processes:\n\n• **`smss.exe` (Session Manager)**: The very first userspace process started by the kernel.\n• **`csrss.exe` (Client/Server Runtime Subsystem)**: Manages console windows and creates/deletes threads.\n• **`wininit.exe`**: Starts background services and the Local Security Authority.\n• **`lsass.exe` (Local Security Authority Subsystem Service)**: Extremely high-value security process! It validates credentials, enforces security policies, and caches login tokens in RAM. (Attackers love dumping LSASS memory using tools like Mimikatz to extract plain-text passwords!).\n• **`svchost.exe` (Generic Host for Services)**: You will see 20 to 80 instances of `svchost.exe` running. Each instance hosts different background Windows services (Windows Update, Audio, Networking)."
                },
                {
                    "title": "2. Windows Services: services.msc and sc.exe",
                    "content": "Windows services run in the background without needing a user to log in:\n\n• Startup types include: **Automatic** (starts with OS), **Manual** (starts when requested), and **Disabled**.\n• In the GUI, view services using `services.msc`.\n• In the command line, query and configure services using `sc.exe`:\n  `sc query Spooler` (checks the Print Spooler service status).\n  `sc stop Spooler` (stops the service)."
                },
                {
                    "title": "3. Command-Line Process Management: tasklist and taskkill",
                    "content": "• **`tasklist`**: Lists all active processes with their Image Name, PID, Session, and Memory usage:\n  `tasklist /FI \"IMAGENAME eq svchost.exe\"` (filters for all svchost processes).\n\n• **`taskkill`**: Terminates a process:\n  `taskkill /PID 4210 /F` (the `/F` flag forces termination)."
                }
            ],
            "seeExamples": [
                {
                    "title": "Listing processes with tasklist",
                    "codeOrDiagram": "C:\\> tasklist /FI \"USERNAME eq cadet\"\n\nImage Name                     PID Session Name        Session#    Mem Usage\n========================= ======== ================ =========== ============\ncmd.exe                       3040 Console                    1      4,820 K\nconhost.exe                   3048 Console                    1      8,112 K\ntasklist.exe                  4588 Console                    1      7,940 K",
                    "explanation": "Filtered `tasklist` showing only processes running under the 'cadet' user session."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `tasklist` in the terminal to inspect the active Windows process list:",
                "initialCommand": "",
                "expectedCommand": "tasklist",
                "simulatedOutput": "Image Name                     PID Session Name        Session#    Mem Usage\n========================= ======== ================ =========== ============\nSystem Idle Process              0 Services                   0          8 K\nSystem                           4 Services                   0        140 K\nsvchost.exe                    840 Services                   0     22,140 K\ncmd.exe                       3040 Console                    1      4,820 K\n[+] Process enumeration complete: 4 active processes identified.",
                "explanation": "`tasklist` displays the Windows image names and PIDs."
            },
            "questions": [
                {
                    "id": "q-17-1",
                    "type": "exact",
                    "question": "Which Windows security process is responsible for enforcing security policies, verifying logins, and storing credential tickets in memory?",
                    "visualSlots": "_ _ _ _ _ _ _ _ _",
                    "acceptedAnswers": ["lsass.exe", "lsass"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Local Security Authority Subsystem Service (lsass.exe).",
                    "explanation": "lsass.exe handles user authentication and session security tokens."
                },
                {
                    "id": "q-17-2",
                    "type": "multiple-choice",
                    "question": "Which generic host process name is used in Windows to run services compiled as Dynamic Link Libraries (.dll files)?",
                    "options": [
                        "explorer.exe",
                        "svchost.exe",
                        "notepad.exe",
                        "winlogon.exe"
                    ],
                    "correctIndex": 1,
                    "hint": "Service Host executable.",
                    "explanation": "svchost.exe hosts shared Windows services loaded from DLLs."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect active tasks",
                    "instruction": "Execute `tasklist` in the terminal.",
                    "hints": ["Type: `tasklist`"]
                }
            ],
            "securityConnection": "Attackers dump the memory of `lsass.exe` using tools like Mimikatz or Task Manager to extract cached password hashes (NTLM) and Kerberos tickets, which they then use in 'Pass-the-Hash' attacks to move laterally across enterprise networks."
        },

        # Room 18: CMD vs PowerShell
        {
            "stage": 3,
            "level": 3,
            "levelTitle": "Level 3 — Windows Fundamentals",
            "title": "Command Prompt (CMD) vs PowerShell",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "30 min",
            "prerequisites": "Room 17: Windows Processes, Services & Task Manager",
            "whyAreYouHere": "Windows provides two primary command-line environments: the legacy Command Prompt (`cmd.exe`) and the modern, object-oriented PowerShell (`powershell.exe`). In this room, you will learn the core syntax differences between them, why PowerShell is an indispensable automation and administration tool, and how penetration testers use PowerShell cmdlets for post-exploitation.",
            "objectives": [
                "Understand the difference between legacy text-based CMD and object-oriented PowerShell",
                "Learn PowerShell Cmdlet syntax: Verb-Noun pairs (e.g., `Get-Process`, `Set-ExecutionPolicy`)",
                "Understand PowerShell pipeline objects vs Linux plain-text streams",
                "Compare common commands between CMD and PowerShell (`dir` vs `Get-ChildItem`)",
                "Learn about PowerShell Execution Policies and script execution"
            ],
            "vocabulary": [
                {"term": "Command Prompt (CMD)", "definition": "The legacy Windows command-line interpreter, rooted in MS-DOS, outputting raw text streams."},
                {"term": "PowerShell", "definition": "A modern task automation and configuration framework consisting of a command-line shell and scripting language built on .NET."},
                {"term": "Cmdlet", "definition": "A lightweight PowerShell command adhering to a standard Verb-Noun naming pattern (e.g. Get-Service, Stop-Process)."},
                {"term": ".NET Object Pipeline", "definition": "Unlike Linux pipes that pass unstructured raw text, PowerShell pipes pass rich .NET objects with properties and methods."},
                {"term": "Execution Policy", "definition": "A safety feature in PowerShell that controls the conditions under which configuration files and scripts are permitted to run."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Text Streams (CMD) vs Objects (PowerShell)",
                    "content": "• **CMD / Linux Bash**: When a command outputs data, it outputs **plain text characters**. If you want to extract just the IP address or process memory from a command, you have to write complex text-filtering regexes using `grep`, `awk`, or `sed`.\n• **PowerShell**: Pipes pass **rich .NET objects**! When you run `Get-Process`, PowerShell does not output text—it outputs an array of Process Objects. Each object has structured properties like `.ProcessName`, `.Id`, `.CPU`, and `.Handles`.\n\nYou can filter directly by property without text parsing:\n`Get-Process | Where-Object { $_.CPU -gt 100 }`"
                },
                {
                    "title": "2. Cmdlet Syntax: Verb-Noun",
                    "content": "PowerShell commands are called **Cmdlets** (pronounced 'command-lets') and use a consistent **Verb-Noun** naming standard:\n\n• `Get-Service`: Retrieve services.\n• `Start-Service -Name \"wuauserv\"`: Start the Windows Update service.\n• `Get-NetIPAddress`: Query network interface IP addresses.\n• `Get-Content C:\\notes.txt`: Read file contents (equivalent to `cat`).\n• `Set-Content C:\\out.txt -Value \"Done\"`: Write to file."
                },
                {
                    "title": "3. CMD vs PowerShell Comparison Table",
                    "content": "| Action | Legacy CMD (`cmd.exe`) | Modern PowerShell | Linux Equivalent |\n|---|---|---|---|\n| List files | `dir` | `Get-ChildItem` (alias `ls` / `dir`) | `ls -la` |\n| Current path | `cd` | `Get-Location` (alias `pwd`) | `pwd` |\n| View file | `type file.txt` | `Get-Content file.txt` (alias `cat`) | `cat file.txt` |\n| Current user | `whoami` | `whoami` / `[System.Security.Principal.WindowsIdentity]::GetCurrent().Name` | `whoami` |\n| IP Config | `ipconfig /all` | `Get-NetIPConfiguration` | `ip a` |"
                }
            ],
            "seeExamples": [
                {
                    "title": "PowerShell Object Filtering",
                    "codeOrDiagram": "PS C:\\> Get-Service | Where-Object { $_.Status -eq \"Running\" } | Select-Object -First 3\n\nStatus   Name               DisplayName\n------   ----               -----------\nRunning  Appinfo            Application Information\nRunning  AudioEndpointBuild Windows Audio Endpoint Builder\nRunning  Audiosrv           Windows Audio",
                    "explanation": "Piping structured objects into `Where-Object` allows instant property filtering without regex text parsing."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `Get-Service` to simulate querying the Windows service status via PowerShell:",
                "initialCommand": "",
                "expectedCommand": "Get-Service",
                "simulatedOutput": "Status   Name               DisplayName\n------   ----               -----------\nRunning  EventLog           Windows Event Log\nRunning  MpsSvc             Windows Defender Firewall\nStopped  Spooler            Print Spooler\n[+] PowerShell cmdlet executed: Active services enumerated.",
                "explanation": "`Get-Service` returns .NET service controller objects."
            },
            "questions": [
                {
                    "id": "q-18-1",
                    "type": "exact",
                    "question": "What standard Verb-Noun naming convention does PowerShell use for its built-in commands (e.g. Get-Process)?",
                    "visualSlots": "_ _ _ _ - _ _ _ _",
                    "acceptedAnswers": ["Verb-Noun", "verb noun"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Action word followed by object word: Verb-Noun.",
                    "explanation": "PowerShell commands strictly follow the Verb-Noun naming convention."
                },
                {
                    "id": "q-18-2",
                    "type": "multiple-choice",
                    "question": "What is the primary technical difference between Linux/CMD pipes and PowerShell pipes?",
                    "options": [
                        "Linux pipes are faster because they use 64-bit encryption",
                        "PowerShell pipes pass structured .NET objects with properties rather than raw text streams",
                        "PowerShell pipes can only be used by the Administrator account",
                        "CMD pipes cannot write output to files"
                    ],
                    "correctIndex": 1,
                    "hint": "PowerShell passes structured objects.",
                    "explanation": "PowerShell pipes pass fully formed .NET objects rather than unparsed character streams."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Query services with PowerShell",
                    "instruction": "Execute `Get-Service` in the terminal.",
                    "hints": ["Type: `Get-Service`"]
                }
            ],
            "securityConnection": "Attackers heavily leverage 'Living off the Land' (LotL) techniques—using built-in administrative tools like PowerShell instead of uploading malicious binaries. Because PowerShell is digitally signed by Microsoft, its execution often flies under the radar of traditional signature-based antivirus!"
        },

        # Room 19: Windows Security & Defensive Controls
        {
            "stage": 3,
            "level": 3,
            "levelTitle": "Level 3 — Windows Fundamentals",
            "title": "Windows Security Controls & Event Logs",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Room 18: Command Prompt (CMD) vs PowerShell",
            "whyAreYouHere": "Windows includes a comprehensive suite of defensive technologies: Windows Defender Antivirus, the Windows Filtering Platform (Firewall), BitLocker drive encryption, and Windows Event Logs. In this room, you will learn how these defensive layers protect workstations and discover the critical Event IDs that security operations center (SOC) analysts monitor to detect intrusions.",
            "objectives": [
                "Understand Windows Defender Antivirus, Real-Time Protection, and Cloud-Delivered Protection",
                "Learn Windows Defender Firewall rules (Inbound vs Outbound filtering)",
                "Understand BitLocker full-disk encryption and the Trusted Platform Module (TPM)",
                "Explore the Windows Event Viewer (`eventvwr.msc`) and key security event logs",
                "Identify high-priority Windows Security Event IDs (4624 Logon, 4625 Failed Logon, 4688 Process Creation)"
            ],
            "vocabulary": [
                {"term": "Microsoft Defender Antivirus", "definition": "The built-in next-generation antimalware component of Windows that provides real-time protection, behavioral monitoring, and heuristic scanning."},
                {"term": "Windows Event Viewer", "definition": "The administrative tool (`eventvwr.msc`) used to browse and view system, security, and application event logs stored in .evtx format."},
                {"term": "Event ID 4624", "definition": "The Windows Security Event Log identifier generated whenever an account successfully logs onto the computer."},
                {"term": "Event ID 4625", "definition": "The Windows Security Event Log identifier generated when an account fails to log on (vital for detecting brute-force attacks)."},
                {"term": "BitLocker", "definition": "The native Windows full-disk encryption feature that encrypts entire hard drive volumes to prevent data theft if a laptop is physically stolen."}
            ],
            "diagramSvg": DIAGRAMS["hardware"],
            "lessons": [
                {
                    "title": "1. Windows Defender & Endpoint Security",
                    "content": "Windows Defender has evolved into a formidable security suite:\n\n• **Real-Time Protection**: Intercepts every file downloaded, extracted, or executed, scanning it against known virus signatures and cloud intelligence.\n• **AMSI (Antimalware Scan Interface)**: An interface that allows applications (like PowerShell or Office macros) to pass scripts to Defender *after* they are de-obfuscated in memory before execution!\n• **Attack Surface Reduction (ASR)**: Blocks common malware techniques, such as Office documents launching executable child processes."
                },
                {
                    "title": "2. Windows Event Logs: The Security Flight Recorder",
                    "content": "Whenever an event occurs on Windows—a user logs in, a password fails, a new service is installed—an entry is written to an event log in `C:\\Windows\\System32\\winevt\\Logs\\` in binary XML format (`.evtx`).\n\nThe 3 primary logs are:\n1. **Application Log**: Events logged by applications or programs (database errors, crashes).\n2. **System Log**: Events logged by Windows operating system components (driver failures, reboots).\n3. **Security Log**: Auditing events (logins, privilege rights usage, file access)."
                },
                {
                    "title": "3. The Must-Know Windows Security Event IDs",
                    "content": "Every SOC analyst and incident responder memorizes these Event IDs:\n\n| Event ID | Description | Security Significance |\n|---|---|---|\n| **4624** | Successful Logon | Tracks who logged in, when, and logon type (Type 2 = Interactive console, Type 3 = Network share, Type 10 = Remote Desktop RDP). |\n| **4625** | Failed Logon | A sudden surge of 4625 events indicates an active password brute-force or password-spraying attack! |\n| **4688** | A new process has been created | Tracks the full command-line of newly spawned programs. |\n| **4672** | Special privileges assigned to new logon | Indicates a user logged in with Administrator rights. |\n| **4720** | A user account was created | Detects unauthorized backdoor account creation by an attacker. |"
                }
            ],
            "seeExamples": [
                {
                    "title": "Querying Event Logs via PowerShell",
                    "codeOrDiagram": "PS C:\\> Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 2\n\n   ProviderName: Microsoft-Windows-Security-Auditing\nTimeCreated                     Id LevelDisplayName Message\n-----------                     -- ---------------- -------\n10/15/2026 11:22:10 AM        4625 Information      An account failed to log on.\n                                                    Account: admin\n                                                    Failure Reason: Unknown user name or bad password.",
                    "explanation": "`Get-WinEvent` queries the binary Security log for failed logon events (Event ID 4625)."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `wevtutil qe Security /c:1 /rd:true /f:text` to simulate reading the latest security audit event:",
                "initialCommand": "",
                "expectedCommand": "wevtutil qe Security /c:1 /rd:true /f:text",
                "simulatedOutput": "Event[0]:\n  Log Name: Security\n  Source: Microsoft-Windows-Security-Auditing\n  Event ID: 4624\n  Task: Logon\n  Level: Information\n  Description: An account was successfully logged on. TargetUserName: cadet\n[+] Log inspection complete: Successful logon (Event ID 4624) recorded.",
                "explanation": "`wevtutil` is the Windows command-line utility for querying and managing event logs."
            },
            "questions": [
                {
                    "id": "q-19-1",
                    "type": "exact",
                    "question": "Which Windows Security Event ID is logged when an authentication attempt fails due to an invalid password or username?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["4625"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Four digits: 4625.",
                    "explanation": "Event ID 4625 records failed logon attempts in the Windows Security Log."
                },
                {
                    "id": "q-19-2",
                    "type": "multiple-choice",
                    "question": "Which Windows security component provides an interface allowing antivirus solutions to scan scripts and macros inside memory after they are unpacked?",
                    "options": [
                        "BitLocker",
                        "AMSI (Antimalware Scan Interface)",
                        "Syskey",
                        "NTFS Journal"
                    ],
                    "correctIndex": 1,
                    "hint": "Antimalware Scan Interface abbreviation.",
                    "explanation": "AMSI allows applications like PowerShell to pass dynamic in-memory code directly to antivirus scanners."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Read latest security audit event",
                    "instruction": "Execute `wevtutil qe Security /c:1 /rd:true /f:text` in the terminal.",
                    "hints": ["Type: `wevtutil qe Security /c:1 /rd:true /f:text`"]
                }
            ],
            "securityConnection": "Attackers frequently attempt to clear Windows event logs using `wevtutil cl Security` to hide evidence of their intrusions. SOC detection rules trigger high-severity alerts whenever the event log service is stopped or when Event ID 1102 ('The audit log was cleared') is detected!"
        }
    ]
