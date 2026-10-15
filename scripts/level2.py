# scripts/level2.py
# Level 2: Linux Fundamentals (Rooms 07 - 14)

from generate_pre_security import DIAGRAMS

def get_rooms():
    return [
        # Room 07: Linux Intro & Distributions
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Introduction to Linux & The Command Line",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "20 min",
            "prerequisites": "Level 1: Computer Fundamentals",
            "whyAreYouHere": "Linux is the lifeblood of cybersecurity. Over 96% of top web servers, virtually all supercomputers, Android smartphones, and nearly all cybersecurity testing platforms (like Kali Linux and Parrot OS) run on Linux. In this room, you will learn why Linux dominates cybersecurity and how to navigate the command line with confidence.",
            "objectives": [
                "Understand why cybersecurity and servers rely almost exclusively on Linux",
                "Learn about the Linux kernel, open-source licensing, and major distributions (Debian, Ubuntu, Kali, Arch, Red Hat)",
                "Understand the Command Line Interface (CLI) versus Graphical User Interface (GUI)",
                "Deconstruct the anatomy of a Linux shell prompt (`user@hostname:path$`)",
                "Understand command syntax: command, options (flags), and arguments"
            ],
            "vocabulary": [
                {"term": "Linux Kernel", "definition": "The monolithic core created by Linus Torvalds in 1991 that manages hardware, memory, and processes."},
                {"term": "Distribution (Distro)", "definition": "A complete operating system bundle combining the Linux kernel with GNU utilities, package managers, and software (e.g., Ubuntu, Kali, Debian)."},
                {"term": "CLI (Command Line Interface)", "definition": "A text-based interaction environment where commands are typed to execute programs and manage files."},
                {"term": "Shell (Bash)", "definition": "A command-language interpreter that takes user text commands, interprets them, and passes them to the kernel for execution."},
                {"term": "Argument / Flag", "definition": "Modifiers appended to a command (e.g., `-l` or `-a`) that alter its behavior or specify target files."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Why Does Cybersecurity Run on Linux?",
                    "content": "Why don't ethical hackers just use Windows for everything?\n\n1. **Total Control**: Linux gives you access to the source code of the entire operating system. There are no black-box secrets.\n2. **Scriptable & Automated**: Every action you perform in a Linux terminal can be scripted in Bash or Python to automate tasks across thousands of machines.\n3. **Low Resource Overhead**: A Linux server can run headless (no graphical desktop) using only 128MB of RAM, making it blazing fast and lightweight.\n4. **Security Tooling Ecosystem**: The world's top penetration testing distributions (Kali Linux, Parrot OS) come pre-installed with over 600 specialized security tools (Nmap, Metasploit, Wireshark, Burp Suite, John the Ripper)."
                },
                {
                    "title": "2. Anatomy of the Shell Prompt",
                    "content": "When you open a terminal in Linux, you are greeted by the shell prompt:\n\n`cadet@endlessus:~$ `\n\nLet's break down each component:\n• `cadet`: The currently logged-in username.\n• `@`: Separator ('at').\n• `endlessus`: The hostname of the computer or server.\n• `:`: Separator.\n• `~`: Your current working directory. The tilde symbol (`~`) is a universal shortcut for the current user's **home directory** (`/home/cadet`).\n• `$`: Indicates you are a **standard unprivileged user**. If you were the `root` superuser, this symbol would change to `#`!"
                },
                {
                    "title": "3. Command Syntax: Commands, Flags, and Arguments",
                    "content": "Linux commands follow a predictable sentence structure:\n\n`[command] [options/flags] [arguments]`\n\n• **Command**: What program do you want to run? (`ls` = list directory contents).\n• **Options/Flags**: How should it run? (e.g., `-l` for long detailed view, `-a` to show hidden files).\n• **Arguments**: What should it run against? (e.g., `/etc/nginx` to list that specific directory).\n\nExample: `ls -la /var/log` runs `ls` with flags `-l` and `-a` on directory `/var/log`."
                }
            ],
            "seeExamples": [
                {
                    "title": "Command with Flags and Arguments",
                    "codeOrDiagram": "cadet@endlessus:~$ ls\nDocuments  Downloads  notes.txt\n\ncadet@endlessus:~$ ls -l\ntotal 8\ndrwxr-xr-x 2 cadet cadet 4096 Oct 15 10:00 Documents\ndrwxr-xr-x 2 cadet cadet 4096 Oct 15 10:00 Downloads\n-rw-r--r-- 1 cadet cadet  142 Oct 15 10:05 notes.txt",
                    "explanation": "Adding the `-l` flag turns `ls` from a simple names list into a detailed view showing permissions, owner, file size, and timestamps."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Type `echo $SHELL` to print the name of your active shell interpreter:",
                "initialCommand": "",
                "expectedCommand": "echo $SHELL",
                "simulatedOutput": "/bin/bash\n[+] Active shell confirmed: You are running GNU Bash (/bin/bash).",
                "explanation": "`$SHELL` is an environment variable holding the path to the current user's shell program."
            },
            "questions": [
                {
                    "id": "q-07-1",
                    "type": "exact",
                    "question": "Which symbol at the end of a Linux shell prompt signifies that you are logged in as a standard unprivileged user rather than root?",
                    "visualSlots": "_",
                    "acceptedAnswers": ["$", "dollar", "dollar sign"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "The dollar sign ($).",
                    "explanation": "In standard Linux shells, '$' denotes an unprivileged user, while '#' denotes root."
                },
                {
                    "id": "q-07-2",
                    "type": "multiple-choice",
                    "question": "In the command `ls -la /home`, what does `-la` represent?",
                    "options": [
                        "The main command being executed",
                        "The target destination argument",
                        "Command-line flags/options that modify how the command behaves",
                        "A file path redirection"
                    ],
                    "correctIndex": 2,
                    "hint": "Dashes prefix optional modifiers (flags).",
                    "explanation": "Options (flags) like `-la` modify program behavior (here, long format `-l` and show hidden files `-a`)."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect active shell interpreter",
                    "instruction": "Print the current shell path using `echo $SHELL`.",
                    "hints": ["Type: `echo $SHELL`"]
                }
            ],
            "securityConnection": "Penetration testers frequently interact with compromised targets solely through remote 'reverse shells'—a raw terminal connection over a network with no graphics. Comfort with the Linux CLI is the single most essential skill in offensive cybersecurity."
        },

        # Room 08: Navigating the Filesystem
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Navigating the Filesystem (pwd, ls, cd)",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Room 07: Introduction to Linux & The Command Line",
            "whyAreYouHere": "In a GUI, you click folders to move around. In the terminal, you navigate using three foundational commands: `pwd`, `ls`, and `cd`. Understanding absolute versus relative paths is crucial—if you target the wrong directory during a penetration test, you could accidentally delete evidence or crash a system.",
            "objectives": [
                "Understand the Linux root directory (`/`) and hierarchical directory tree",
                "Print your current location with `pwd` (print working directory)",
                "List folder contents with `ls`, including hidden files (`ls -a`) and details (`ls -l`)",
                "Change directories using `cd`",
                "Master relative paths (`.`, `..`), home directory shortcuts (`~`), and absolute paths (`/var/log`)"
            ],
            "vocabulary": [
                {"term": "pwd (print working directory)", "definition": "Outputs the full, absolute path of the directory you are currently standing in."},
                {"term": "ls (list)", "definition": "Lists the files and folders inside a specified directory (or the current directory by default)."},
                {"term": "cd (change directory)", "definition": "Moves your terminal session into a different directory."},
                {"term": "Absolute Path", "definition": "A complete path starting from the root directory `/` (e.g., `/etc/passwd`). Works regardless of where you are."},
                {"term": "Relative Path", "definition": "A path relative to your current location (e.g., `../documents` or `./script.sh`)."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. The Linux Unified Directory Tree",
                    "content": "Unlike Windows, which uses separate drive letters (`C:\\`, `D:\\`), Linux organizes everything under a single unified root directory represented by a single forward slash: `/`.\n\nKey system directories include:\n• `/`: The root directory of the entire filesystem.\n• `/home`: Personal user directories (e.g., `/home/cadet`).\n• `/etc`: System configuration files (network settings, users, web server configs).\n• `/var/log`: System and application log files.\n• `/bin` & `/usr/bin`: Executable programs and utilities (`ls`, `cat`, `whoami`).\n• `/tmp`: Temporary files (anyone can write here; cleared on reboot)."
                },
                {
                    "title": "2. The Big Three: pwd, ls, and cd",
                    "content": "• **`pwd` (Print Working Directory)**: Tells you where you are right now.\n  `cadet@endlessus:~$ pwd` -> `/home/cadet`\n\n• **`ls` (List)**: Shows what is inside your current folder.\n  `ls -la`: The `-l` flag gives a long detailed list (permissions, size, date); `-a` shows all files including **hidden files** (files beginning with a dot like `.bashrc`).\n\n• **`cd` (Change Directory)**: Moves you to another folder.\n  `cd /etc`: Moves to `/etc`.\n  `cd ~` or just `cd`: Instantly brings you back to your home directory."
                },
                {
                    "title": "3. Absolute vs Relative Paths & The Special Dots",
                    "content": "Understanding paths is essential:\n\n• **Absolute Path**: Starts with a leading `/`. It points to an exact location on the filesystem no matter where you are:\n  `cd /var/log/nginx`\n\n• **Relative Path**: Does NOT start with `/`. It starts from wherever you are right now:\n  If you are in `/var`, typing `cd log` moves you into `/var/log`.\n\n• **The Dot (`.`)**: Represents the *current* directory.\n• **The Double Dot (`..`)**: Represents the *parent* directory (one level up).\n  `cd ..` moves up one level!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Navigating up and down the filesystem tree",
                    "codeOrDiagram": "cadet@endlessus:~$ pwd\n/home/cadet\n\ncadet@endlessus:~$ cd ..\ncadet@endlessus:/home$ pwd\n/home\n\ncadet@endlessus:/home$ cd /etc/nginx\ncadet@endlessus:/etc/nginx$ pwd\n/etc/nginx\n\ncadet@endlessus:/etc/nginx$ cd ~\ncadet@endlessus:~$ pwd\n/home/cadet",
                    "explanation": "Notice how `cd ..` steps up to `/home`, `cd /etc/nginx` jumps via absolute path, and `cd ~` returns home."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `pwd` in the terminal to print your current absolute directory location:",
                "initialCommand": "",
                "expectedCommand": "pwd",
                "simulatedOutput": "/home/cadet\n[+] Current directory identified: /home/cadet",
                "explanation": "`pwd` prints the absolute path of the current working directory."
            },
            "questions": [
                {
                    "id": "q-08-1",
                    "type": "exact",
                    "question": "Which Linux command displays the full absolute path of your current working directory?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["pwd"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Print Working Directory abbreviation.",
                    "explanation": "`pwd` stands for Print Working Directory."
                },
                {
                    "id": "q-08-2",
                    "type": "exact",
                    "question": "Which two-character relative path shorthand refers to the parent directory immediately one level up?",
                    "visualSlots": "_ _",
                    "acceptedAnswers": ["..", "dot dot"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Two periods together.",
                    "explanation": "'..' always refers to the parent directory in Unix/Linux."
                },
                {
                    "id": "q-08-3",
                    "type": "multiple-choice",
                    "question": "Which flag added to `ls` forces the display of hidden files (files beginning with a dot like `.bashrc`)?",
                    "options": [
                        "-h",
                        "-a",
                        "-r",
                        "-z"
                    ],
                    "correctIndex": 1,
                    "hint": "Short for 'all'.",
                    "explanation": "The `-a` (or `--all`) flag tells `ls` not to ignore entries starting with `.`."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Verify current directory",
                    "instruction": "Print your current working directory path with `pwd`.",
                    "hints": ["Type: `pwd`"]
                }
            ],
            "securityConnection": "Web vulnerabilities like **Path Traversal (Directory Traversal)** exploit relative paths. An attacker supplies `../../../../etc/passwd` in a vulnerable web file parameter to trick the web application into walking out of the web root folder into sensitive operating system configuration files!"
        },

        # Room 09: Creating, Moving & Deleting Files
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Creating, Moving & Deleting Files (touch, mkdir, cp, mv, rm)",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Room 08: Navigating the Filesystem",
            "whyAreYouHere": "Security professionals create exploit scripts, copy log files for evidence preservation, move binaries to temporary locations, and remove test artifacts after an assessment. In this room, you will master file manipulation commands and learn why `rm -rf` must be used with extreme caution.",
            "objectives": [
                "Create new empty files using `touch`",
                "Create single and nested directories using `mkdir` and `mkdir -p`",
                "Copy files and folders using `cp` and recursive `cp -r`",
                "Move and rename files using `mv`",
                "Safely delete files with `rm` and folders with `rm -r`",
                "Understand why there is no 'Recycle Bin' in the Linux terminal"
            ],
            "vocabulary": [
                {"term": "touch", "definition": "Creates a new empty file if it doesn't exist, or updates timestamps if it does."},
                {"term": "mkdir (make directory)", "definition": "Creates one or more new directories."},
                {"term": "cp (copy)", "definition": "Duplicates files or directories from a source to a destination."},
                {"term": "mv (move)", "definition": "Moves files or directories, and also used to rename files in place."},
                {"term": "rm (remove)", "definition": "Permanently deletes files from the filesystem."},
                {"term": "Recursive (-r / -R)", "definition": "An option that causes a command to apply to a directory AND all files/folders nested within it."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Creating Files and Directories",
                    "content": "• **`touch [filename]`**: Instantly creates an empty file.\n  `touch report.txt`\n\n• **`mkdir [dirname]`**: Creates a new folder.\n  `mkdir recon`\n  If you want to create a nested hierarchy of folders in one command, use the `-p` (parents) flag:\n  `mkdir -p targets/acmefin/nmap` creates `targets`, `acmefin` inside it, and `nmap` inside that!"
                },
                {
                    "title": "2. Copying and Moving (Renaming) Files",
                    "content": "• **`cp [source] [destination]`**: Copies a file.\n  `cp notes.txt backup_notes.txt`\n  To copy an entire directory and all its contents, you MUST use the recursive flag `-r`:\n  `cp -r tools/ /tmp/tools/`\n\n• **`mv [source] [destination]`**: Moves a file OR renames it.\n  In Linux, renaming is just moving a file to a new name in the same folder!\n  `mv old_name.txt new_name.txt`\n  `mv exploit.py /tmp/` (moves `exploit.py` into `/tmp` directory)."
                },
                {
                    "title": "3. Deleting Files with rm — There is No Recycle Bin!",
                    "content": "**CRITICAL WARNING**: In a graphical desktop, deleting a file moves it to the 'Trash' or 'Recycle Bin'. In the Linux terminal, `rm` deletes files **permanently and immediately**.\n\n• `rm notes.txt`: Deletes a single file.\n• `rm -r folder_name`: Recursively deletes a folder and everything inside it.\n• `rm -rf folder_name`: The `-f` (force) flag forces deletion without asking for confirmation, ignoring errors.\n\n*Never run `rm -rf /` or `rm -rf /*`—it will permanently wipe the entire operating system!*"
                }
            ],
            "seeExamples": [
                {
                    "title": "Workflow: Create, Copy, Rename, and Remove",
                    "codeOrDiagram": "cadet@endlessus:~$ touch test.txt\ncadet@endlessus:~$ cp test.txt copy.txt\ncadet@endlessus:~$ mv copy.txt renamed.txt\ncadet@endlessus:~$ ls\nrenamed.txt  test.txt\ncadet@endlessus:~$ rm test.txt renamed.txt\ncadet@endlessus:~$ ls\n(empty)",
                    "explanation": "This sequence shows creating, duplicating, renaming, and permanently removing files."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Create an empty file called `audit.log` using the `touch` command:",
                "initialCommand": "",
                "expectedCommand": "touch audit.log",
                "simulatedOutput": "[+] File created: audit.log successfully created in current directory.",
                "explanation": "`touch` creates a zero-byte file if it does not already exist."
            },
            "questions": [
                {
                    "id": "q-09-1",
                    "type": "exact",
                    "question": "Which Linux command is used to duplicate files or directories from one location to another?",
                    "visualSlots": "_ _",
                    "acceptedAnswers": ["cp", "copy"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Two-letter abbreviation for copy.",
                    "explanation": "`cp` stands for copy."
                },
                {
                    "id": "q-09-2",
                    "type": "exact",
                    "question": "Which command is used both to move files between directories and to rename a file in place?",
                    "visualSlots": "_ _",
                    "acceptedAnswers": ["mv", "move"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Two-letter abbreviation for move.",
                    "explanation": "`mv` stands for move."
                },
                {
                    "id": "q-09-3",
                    "type": "multiple-choice",
                    "question": "What flag must be passed to `cp` or `rm` to make the operation recursive through all nested subdirectories?",
                    "options": [
                        "-a",
                        "-r",
                        "-z",
                        "-k"
                    ],
                    "correctIndex": 1,
                    "hint": "Short for recursive.",
                    "explanation": "The `-r` (or `-R`) flag instructs commands to traverse directories recursively."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Create a file with touch",
                    "instruction": "Create `audit.log` using `touch audit.log`.",
                    "hints": ["Type: `touch audit.log`"]
                }
            ],
            "securityConnection": "During incident response cleanup or post-exploitation, ethical hackers must carefully record every file they create on a client system and delete them when testing completes (cleanup phase) to leave the client environment in its original state."
        },

        # Room 10: Viewing & Searching Files
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Viewing & Searching Files (cat, head, tail, grep, find)",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "30 min",
            "prerequisites": "Room 09: Creating, Moving & Deleting Files",
            "whyAreYouHere": "Security analysts spend hours reading configuration files, inspecting log files with millions of lines, and searching for stored credentials. Opening a 2GB log file in a graphical text editor will freeze your computer. In this room, you will master the essential command-line tools to view and filter text instantaneously.",
            "objectives": [
                "Print entire files with `cat` (concatenate)",
                "Inspect the beginning of files with `head` and the end with `tail`",
                "Monitor growing log files in real time using `tail -f`",
                "Search for words and patterns across files using `grep` and case-insensitive `grep -i`",
                "Locate files anywhere on the filesystem using `find`"
            ],
            "vocabulary": [
                {"term": "cat (concatenate)", "definition": "Reads one or more files and prints their entire contents sequentially to standard output."},
                {"term": "head", "definition": "Outputs the first N lines of a file (defaults to first 10 lines)."},
                {"term": "tail", "definition": "Outputs the last N lines of a file (defaults to last 10 lines)."},
                {"term": "tail -f (follow)", "definition": "Keeps the file open and displays new lines in real time as they are written by applications."},
                {"term": "grep", "definition": "Global Regular Expression Print. Searches text files for lines matching a specified string or regex pattern."},
                {"term": "find", "definition": "Searches directory trees for files matching criteria like filename, size, permissions, or modification date."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Reading Text Files: cat, head, and tail",
                    "content": "• **`cat [file]`**: Prints the whole file to your screen. Great for small files:\n  `cat /etc/issue`\n  *Warning*: Do not run `cat` on a massive 500,000-line log file, or your screen will scroll endlessly!\n\n• **`head -n [number] [file]`**: Shows just the top lines of a file:\n  `head -n 5 /etc/passwd` shows the first 5 user accounts.\n\n• **`tail -n [number] [file]`**: Shows just the bottom lines of a file:\n  `tail -n 10 /var/log/auth.log` shows the 10 most recent login attempts.\n\n• **`tail -f [file]` (Real-Time Monitoring)**: The `-f` flag 'follows' the file live! As web visitors hit a server, new log entries stream onto your screen instantly. Press `Ctrl + C` to stop."
                },
                {
                    "title": "2. Searching Inside Files with grep",
                    "content": "`grep` is one of the most powerful utilities in Linux. It searches files line-by-line and outputs only the lines containing your search term:\n\n`grep [options] \"search_term\" [filename]`\n\nEssential flags:\n• `-i`: **Case-insensitive** (matches 'admin', 'Admin', or 'ADMIN').\n• `-n`: Displays the **line number** where the match occurred.\n• `-v`: **Inverts the match** (prints all lines that do NOT contain the term).\n• `-r`: **Recursive** search through all files in a directory:\n  `grep -ri \"password\" /var/www/html/` searches every website file for the word 'password'!"
                },
                {
                    "title": "3. Locating Files with find",
                    "content": "`grep` searches *inside* file contents. `find` searches for the *files themselves* across the directory tree:\n\n• Find by name:\n  `find / -name \"*.conf\" 2>/dev/null`\n  Searches the entire disk (`/`) for files ending in `.conf`. (`2>/dev/null` silences permission denied warnings).\n\n• Find by type:\n  `find /home -type f -name \"notes.txt\"` (`-type f` for files, `-type d` for directories).\n\n• Find by permission (Privilege Escalation!):\n  `find / -perm -4000 -type f 2>/dev/null` searches for SUID executables that run with root privileges!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Searching /etc/passwd with grep",
                    "codeOrDiagram": "cadet@endlessus:~$ grep -i \"root\" /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\n\ncadet@endlessus:~$ grep -i \"cadet\" /etc/passwd\ncadet:x:1001:1001:Endlessus Cadet:/home/cadet:/bin/bash",
                    "explanation": "`grep -i` filters `/etc/passwd` to extract only lines mentioning the requested user account."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `cat /etc/passwd | head -n 3` to print the first 3 lines of the system password database:",
                "initialCommand": "",
                "expectedCommand": "cat /etc/passwd | head -n 3",
                "simulatedOutput": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\n[+] Inspection successful: First 3 system accounts displayed.",
                "explanation": "`cat` reads `/etc/passwd` and pipes the output into `head -n 3`."
            },
            "questions": [
                {
                    "id": "q-10-1",
                    "type": "exact",
                    "question": "Which Linux tool is used to search text for lines matching regular expressions or specific keyword strings?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["grep"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Global Regular Expression Print.",
                    "explanation": "`grep` searches file contents for matching string patterns."
                },
                {
                    "id": "q-10-2",
                    "type": "multiple-choice",
                    "question": "Which flag allows `tail` to continuously monitor and display new lines added to a log file in real time?",
                    "options": [
                        "-r",
                        "-f",
                        "-m",
                        "-v"
                    ],
                    "correctIndex": 1,
                    "hint": "Follow flag.",
                    "explanation": "`tail -f` (follow) monitors files in real time as new data is appended."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect password database",
                    "instruction": "Run `cat /etc/passwd | head -n 3` in the terminal.",
                    "hints": ["Type: `cat /etc/passwd | head -n 3`"]
                }
            ],
            "securityConnection": "During security audits, analysts use `grep -ri 'api_key\\|secret\\|password' /app/` to hunt for hardcoded credentials accidentally left in source code or backup files."
        },

        # Room 11: Linux Permissions & Ownership
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Linux Permissions & Ownership (chmod, chown, sudo)",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "30 min",
            "prerequisites": "Room 10: Viewing & Searching Files",
            "whyAreYouHere": "Linux permissions are the primary defense against unauthorized access. If a web server configuration file containing database credentials is set to 'world-readable' (`666` or `777`), any unprivileged attacker on the system can read it immediately. In this room, you will master the `rwx` permission triad and octal notation.",
            "objectives": [
                "Understand the 3 permission levels: User (Owner), Group, and Others (World)",
                "Deconstruct the `rwx` permission bits (Read = 4, Write = 2, Execute = 1)",
                "Calculate octal permission masks (755, 644, 600, 777)",
                "Change file permissions using `chmod`",
                "Change file ownership using `chown`",
                "Execute administrative commands safely using `sudo`"
            ],
            "vocabulary": [
                {"term": "rwx (Read, Write, Execute)", "definition": "The three permissions in Unix: Read (view content), Write (modify or delete), and Execute (run as a program)."},
                {"term": "chmod (change mode)", "definition": "Modifies the permission access bits on files and directories."},
                {"term": "chown (change owner)", "definition": "Changes the user owner and/or group owner of a file or directory."},
                {"term": "Octal Notation", "definition": "A 3-digit numeric representation of permissions where r=4, w=2, x=1 (e.g. 7 = rwx, 6 = rw-, 4 = r--, 0 = ---)."},
                {"term": "sudo (superuser do)", "definition": "Allows authorized users to execute a command with root security privileges."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Reading the Permission String: -rwxr-xr--",
                    "content": "When you run `ls -la`, the first column displays a 10-character string:\n\n`- rwx r-x r--`\n\n• **Character 1 (File Type)**: `-` means standard file; `d` means directory; `l` means symbolic link.\n• **Characters 2-4 (User/Owner)**: Permissions for the user who owns the file (`rwx` = can read, write, and execute).\n• **Characters 5-7 (Group)**: Permissions for members of the file's assigned group (`r-x` = can read and execute, but cannot modify).\n• **Characters 8-10 (Others/World)**: Permissions for EVERYONE else on the entire computer (`r--` = read-only)."
                },
                {
                    "title": "2. Octal Math: The Numbers Behind chmod",
                    "content": "In cybersecurity, permissions are almost always set using **octal numbers**:\n\n• **Read (`r`)** = 4\n• **Write (`w`)** = 2\n• **Execute (`x`)** = 1\n• **None (`-`)** = 0\n\nAdd the numbers together for each of the three tiers (User, Group, Others):\n\n• `rwx` = 4 + 2 + 1 = **7**\n• `rw-` = 4 + 2 + 0 = **6**\n• `r-x` = 4 + 0 + 1 = **5**\n• `r--` = 4 + 0 + 0 = **4**\n• `---` = 0 + 0 + 0 = **0**\n\nCommon combinations:\n• `chmod 755 script.sh`: Owner can read/write/run (7); everyone else can read/run (55).\n• `chmod 644 document.txt`: Owner can read/write (6); everyone else read-only (44).\n• `chmod 600 id_rsa`: Private SSH key! Owner only can read/write (6); NO ONE ELSE has any access (00)!\n• `chmod 777 file`: DANGEROUS! Everyone in the world can modify, execute, or delete it!"
                },
                {
                    "title": "3. Changing Ownership and Elevating with sudo",
                    "content": "• **`chown [user]:[group] [file]`**: Changes who owns the file. Only root can transfer ownership:\n  `sudo chown cadet:cadet config.php`\n\n• **`sudo [command]`**: Stands for 'Superuser Do'. It allows an authorized user to run a single command as `root` without permanently logging into the dangerous root shell.\n  `sudo systemctl restart nginx`"
                }
            ],
            "seeExamples": [
                {
                    "title": "Securing a world-writable configuration file",
                    "codeOrDiagram": "cadet@endlessus:~$ ls -l config.php\n-rw-rw-rw- 1 cadet cadet 840 Oct 15 11:00 config.php\n[!] Vulnerability: config.php is world-writable (666)!\n\ncadet@endlessus:~$ chmod 600 config.php\ncadet@endlessus:~$ ls -l config.php\n-rw------- 1 cadet cadet 840 Oct 15 11:00 config.php\n[+] Hardened: Only owner can read/write; others blocked.",
                    "explanation": "`chmod 600` strips group and other permissions, restricting access to the owner."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Audit permissions on config.php with `ls -la config.php`:",
                "initialCommand": "",
                "expectedCommand": "ls -la config.php",
                "simulatedOutput": "-rw-rw-rw- 1 cadet cadet 840 Oct 15 11:00 config.php\n[!] Notice: Permissions -rw-rw-rw- mean world-writable (octal 666).",
                "explanation": "`ls -la` reveals detailed permission flags."
            },
            "questions": [
                {
                    "id": "q-11-1",
                    "type": "exact",
                    "question": "What 3-digit octal permission value gives the file owner full read and write access while completely denying all access to group members and others?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["600"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Read (4) + Write (2) = 6 for owner; 0 for group; 0 for others.",
                    "explanation": "600 represents rw------- (read/write for owner only)."
                },
                {
                    "id": "q-11-2",
                    "type": "multiple-choice",
                    "question": "If a file has permissions `-rwxr-xr--`, what permission does a member of the file's assigned group possess?",
                    "options": [
                        "Read, write, and execute",
                        "Read and execute only (r-x)",
                        "Read only (r--)",
                        "No access (---)"
                    ],
                    "correctIndex": 1,
                    "hint": "Inspect characters 5-7: r-x.",
                    "explanation": "Characters 5-7 represent group permissions: 'r-x' equals read and execute."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Audit file permissions",
                    "instruction": "Inspect permissions of `config.php` using `ls -la config.php`.",
                    "hints": ["Type: `ls -la config.php`"]
                }
            ],
            "securityConnection": "In Linux Privilege Escalation, attackers search for world-writable system files (like `/etc/passwd` or `/etc/cron.d/job`). If an unprivileged user can edit a cron job that runs as root, they can inject malicious commands and gain root access!"
        },

        # Room 12: Processes & System Monitoring
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Processes & System Monitoring (ps, top, kill)",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "25 min",
            "prerequisites": "Room 11: Linux Permissions & Ownership",
            "whyAreYouHere": "When a server is sluggish, cryptocurrency mining malware may be consuming 100% of CPU cycles in the background. In this room, you will learn how to monitor system performance in real time using `top`, list all system processes with `ps aux`, and terminate rogue processes using `kill`.",
            "objectives": [
                "List all system processes with `ps aux` and understand the columns (USER, PID, %CPU, %MEM, COMMAND)",
                "Monitor real-time CPU, RAM, and process activity using `top` and `htop`",
                "Understand Linux signals (SIGTERM = 15, SIGKILL = 9)",
                "Terminate stuck or malicious processes using `kill` and `kill -9`",
                "Manage background tasks using the ampersand (`&`), `jobs`, and `fg`"
            ],
            "vocabulary": [
                {"term": "ps aux", "definition": "Displays a snapshot of every process running on the entire system for all users."},
                {"term": "top / htop", "definition": "An interactive real-time process viewer and system resource monitor."},
                {"term": "kill", "definition": "Sends an operating system signal to a process requesting or forcing its termination."},
                {"term": "SIGTERM (15)", "definition": "Graceful termination signal allowing a process to save data and close sockets before exiting."},
                {"term": "SIGKILL (9)", "definition": "Immediate, unconditional termination signal handled directly by the kernel. The process cannot catch or ignore it."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Inspecting All Processes: ps aux",
                    "content": "While `ps` only shows processes in your current terminal, **`ps aux`** reveals everything happening on the entire machine:\n\n• `a`: Show processes for **all users**.\n• `u`: Display in **user-oriented format** (shows username, CPU %, RAM %).\n• `x`: Include processes **without a controlling terminal** (background services, daemons).\n\nCombine with `grep` to find specific applications:\n`ps aux | grep nginx` checks if the Nginx web server is actively running."
                },
                {
                    "title": "2. Real-Time Monitoring: top",
                    "content": "Typing `top` opens an interactive dashboard that refreshes every 3 seconds:\n\n• **Header**: System uptime, active users, load average over 1, 5, and 15 minutes.\n• **Tasks**: Total running, sleeping, stopped, and zombie processes.\n• **CPU / Mem**: Percentage of CPU idle, user space, and kernel space; physical RAM usage.\n• **Process List**: Sorted by CPU consumption by default. If a process named `xmrig` is pegged at 99.8% CPU, you likely have a crypto-miner!\n\nPress `q` to exit `top`."
                },
                {
                    "title": "3. Terminating Rogue Processes with kill",
                    "content": "To stop a process, you send it a signal with its PID:\n\n• **Graceful Kill (`kill [PID]`)**: Sends `SIGTERM` (signal 15). The process closes database connections, flushes write buffers, and terminates cleanly.\n• **Force Kill (`kill -9 [PID]`)**: Sends `SIGKILL` (signal 9). The kernel immediately obliterates the process from RAM. Use this when malware or frozen processes refuse to respond to graceful termination!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Hunting and Killing a Rogue Process",
                    "codeOrDiagram": "cadet@endlessus:~$ ps aux | grep -i \"cryptominer\"\ncadet       4520  98.5  2.1 142084  8420 pts/1    R    10:15   5:20 /tmp/.hidden/cryptominer\n\ncadet@endlessus:~$ kill -9 4520\n[+] Process 4520 terminated successfully.",
                    "explanation": "Identified rogue PID 4520 consuming 98.5% CPU, then forcefully terminated it with `kill -9`."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `ps aux | head -n 4` to inspect the process table headers and first 3 system processes:",
                "initialCommand": "",
                "expectedCommand": "ps aux | head -n 4",
                "simulatedOutput": "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 168420 12040 ?        Ss   09:00   0:01 /sbin/init\nroot         2  0.0  0.0      0     0 ?        S    09:00   0:00 [kthreadd]\nroot         3  0.0  0.0      0     0 ?        I<   09:00   0:00 [rcu_gp]\n[+] Process snapshot verified: PID 1 is /sbin/init.",
                "explanation": "`ps aux` piped to `head -n 4` prints the column headers and first three processes."
            },
            "questions": [
                {
                    "id": "q-12-1",
                    "type": "exact",
                    "question": "Which signal number represents SIGKILL, forcing immediate unconditional process termination by the kernel?",
                    "visualSlots": "_",
                    "acceptedAnswers": ["9"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "The number 9.",
                    "explanation": "Signal 9 is SIGKILL."
                },
                {
                    "id": "q-12-2",
                    "type": "multiple-choice",
                    "question": "In the output of `ps aux`, what does the `%CPU` column indicate?",
                    "options": [
                        "The total number of CPU cores installed",
                        "The percentage of CPU time currently utilized by that specific process",
                        "The processor clock speed in Gigahertz",
                        "The temperature of the CPU"
                    ],
                    "correctIndex": 1,
                    "hint": "Percentage of processor usage.",
                    "explanation": "%CPU shows the fraction of CPU time consumed by the process."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: View process table",
                    "instruction": "Execute `ps aux | head -n 4` in the terminal.",
                    "hints": ["Type: `ps aux | head -n 4`"]
                }
            ],
            "securityConnection": "Malware frequently renames its process name or attempts to inject code into legitimate processes like `/usr/sbin/cron` to evade detection in `ps aux`. Blue teams use EDR (Endpoint Detection and Response) tools that track process execution trees and hash signatures rather than relying solely on process names."
        },

        # Room 13: Pipes, Redirection & Chaining
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Pipes, Redirection & Command Chaining (>, >>, |, &&)",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "30 min",
            "prerequisites": "Room 12: Processes & System Monitoring",
            "whyAreYouHere": "The core philosophy of Unix is: 'Write programs that do one thing and do it well. Write programs to work together.' Instead of building giant complex tools, Linux lets you chain simple utilities together using pipes and redirection to create powerful security automation one-liners. In this room, you will master standard input, output, redirection, and conditional operators.",
            "objectives": [
                "Understand the 3 Standard Streams: stdin (0), stdout (1), and stderr (2)",
                "Redirect output to files using overwrite (`>`) and append (`>>`)",
                "Chain utilities together using the pipe operator (`|`)",
                "Redirect error streams using `2>/dev/null`",
                "Execute conditional multi-command chains using `&&` (AND) and `||` (OR)"
            ],
            "vocabulary": [
                {"term": "Standard Output (stdout / 1)", "definition": "The default stream where normal program output is printed (usually the terminal screen)."},
                {"term": "Standard Error (stderr / 2)", "definition": "The default stream where error messages are printed, kept separate from normal output."},
                {"term": "Pipe (|)", "definition": "Connects the standard output of the command on the left directly into the standard input of the command on the right."},
                {"term": "Redirect Overwrite (>)", "definition": "Writes output to a file, replacing and wiping any existing contents."},
                {"term": "Redirect Append (>>)", "definition": "Writes output to a file, appending to the bottom without erasing existing contents."},
                {"term": "Conditional AND (&&)", "definition": "Runs the second command ONLY if the first command succeeded (returned exit code 0)."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. Standard Streams: stdin, stdout, and stderr",
                    "content": "Every command in Linux communicates through three standardized data streams:\n\n1. **Standard Input (`stdin` - File Descriptor 0)**: Input coming from keyboard or pipe.\n2. **Standard Output (`stdout` - File Descriptor 1)**: The regular results of the command.\n3. **Standard Error (`stderr` - File Descriptor 2)**: Error diagnostics and warnings.\n\nKeeping errors separate from normal output allows you to filter out errors while keeping useful results!"
                },
                {
                    "title": "2. File Redirection: > vs >> and /dev/null",
                    "content": "Instead of printing output to your screen, you can redirect it into a file:\n\n• **`>` (Overwrite)**: Overwrites the target file completely!\n  `echo \"10.10.10.50\" > target.txt`\n\n• **`>>` (Append)**: Appends new lines to the end of the file without deleting anything:\n  `echo \"10.10.10.51\" >> target.txt`\n\n• **Redirecting Errors (`2>/dev/null`)**: In Linux, `/dev/null` is the 'black hole'—any data sent there vanishes forever. When searching as an unprivileged user, `find` prints hundreds of 'Permission denied' errors. Mute them like this:\n  `find / -name flag.txt 2>/dev/null` (redirects stream 2 stderr to `/dev/null`)."
                },
                {
                    "title": "3. The Pipe (|) and Command Chaining (&&, ||)",
                    "content": "• **The Pipe (`|`)**: Feeds the output of one command into the input of the next:\n  `cat /var/log/auth.log | grep \"Failed password\" | wc -l`\n  (Reads auth log, filters for failed passwords, counts the lines!).\n\n• **Logical AND (`&&`)**: Run command 2 only if command 1 succeeds:\n  `mkdir project && cd project` (only changes directory if folder creation worked).\n\n• **Logical OR (`||`)**: Run command 2 only if command 1 fails:\n  `ping -c 1 10.10.10.1 || echo \"Host is DOWN\"`."
                }
            ],
            "seeExamples": [
                {
                    "title": "Piping and Redirection in Action",
                    "codeOrDiagram": "cadet@endlessus:~$ echo \"Server Alpha\" > servers.txt\ncadet@endlessus:~$ echo \"Server Beta\" >> servers.txt\ncadet@endlessus:~$ cat servers.txt | grep \"Beta\"\nServer Beta",
                    "explanation": "Output redirected with `>` and `>>`, then read and filtered through a pipe."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo \"Audit Passed\" > status.txt && cat status.txt`:",
                "initialCommand": "",
                "expectedCommand": "echo \"Audit Passed\" > status.txt && cat status.txt",
                "simulatedOutput": "Audit Passed\n[+] Chained command successful: Written to file and immediately printed.",
                "explanation": "Chains write redirection (`>`) with print (`cat`) using conditional AND (`&&`)."
            },
            "questions": [
                {
                    "id": "q-13-1",
                    "type": "exact",
                    "question": "Which redirection operator appends output to the end of an existing file without wiping its contents?",
                    "visualSlots": "_ _",
                    "acceptedAnswers": [">>"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Double greater-than symbol.",
                    "explanation": "The '>>' operator appends standard output to a file."
                },
                {
                    "id": "q-13-2",
                    "type": "multiple-choice",
                    "question": "What special device file is known as the Linux 'black hole', used to discard unwanted error messages (e.g. `2>/dev/null`)?",
                    "options": [
                        "/dev/zero",
                        "/dev/null",
                        "/dev/random",
                        "/dev/trash"
                    ],
                    "correctIndex": 1,
                    "hint": "Null device.",
                    "explanation": "`/dev/null` discards all data written to it."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Test command chaining",
                    "instruction": "Execute `echo \"Audit Passed\" > status.txt && cat status.txt`.",
                    "hints": ["Type: `echo \"Audit Passed\" > status.txt && cat status.txt`"]
                }
            ],
            "securityConnection": "In Command Injection vulnerabilities, attackers exploit command separators (`;`, `|`, `&&`, `||`) injected into web form inputs to execute arbitrary operating system commands (e.g. `127.0.0.1 && cat /etc/shadow`)."
        },

        # Room 14: Environment Variables & Basic Bash
        {
            "stage": 2,
            "level": 2,
            "levelTitle": "Level 2 — Linux Fundamentals",
            "title": "Environment Variables & Basic Bash Scripting",
            "difficulty": "Beginner",
            "difficultyBadge": "🟢 Beginner",
            "estimatedTime": "30 min",
            "prerequisites": "Room 13: Pipes, Redirection & Command Chaining",
            "whyAreYouHere": "Environment variables configure the behavior of programs and shells, storing information like your current username, home directory, and the search path for executable binaries. In this room, you will learn how environment variables work, how to write your first automated Bash script, and why the `$PATH` variable is a frequent target for privilege escalation.",
            "objectives": [
                "Understand what environment variables are and how to view them using `env` and `echo`",
                "Inspect key variables: `$USER`, `$HOME`, `$SHELL`, and `$PATH`",
                "Set temporary and permanent environment variables using `export`",
                "Write and execute a basic Bash shell script with a shebang (`#!/bin/bash`)",
                "Understand PATH hijacking and how attackers exploit insecure PATH settings"
            ],
            "vocabulary": [
                {"term": "Environment Variable", "definition": "A dynamic named value that affects the way running processes behave on a computer."},
                {"term": "PATH", "definition": "An environment variable containing a colon-separated list of directories the shell searches when you type a command without its full path."},
                {"term": "export", "definition": "Exports a shell variable so child processes inherit it in their environment."},
                {"term": "Shebang (#!/bin/bash)", "definition": "The very first line in a script, telling the kernel which interpreter to use to execute the file."},
                {"term": "Bash Script", "definition": "A plain text file containing a series of shell commands executed sequentially."}
            ],
            "diagramSvg": DIAGRAMS["terminal"],
            "lessons": [
                {
                    "title": "1. What Are Environment Variables?",
                    "content": "Environment variables are system-wide key-value pairs stored in memory:\n\n• `echo $USER` -> Prints current user (`cadet`).\n• `echo $HOME` -> Prints home directory (`/home/cadet`).\n• `echo $PWD` -> Prints current working directory.\n\nTo create your own variable in a session:\n`TARGET=\"10.10.10.15\"`\n`echo $TARGET`\n\nIf you want child processes (like Python scripts or subshells) to access it, use **`export`**:\n`export TARGET=\"10.10.10.15\"`"
                },
                {
                    "title": "2. The Critical Role of $PATH",
                    "content": "When you type `ls`, how does Linux know where the `ls` program is stored?\n\nIt searches every directory listed in the **`$PATH`** variable from left to right!\n\n`cadet@endlessus:~$ echo $PATH`\n`/usr/local/bin:/usr/bin:/bin:/usr/games`\n\n1. It looks for `/usr/local/bin/ls` (not found).\n2. It looks for `/usr/bin/ls` (FOUND! Runs it).\n\n**Security Alert**: If an administrator puts `.` (the current directory) at the front of `$PATH`, an attacker can place a malicious script named `ls` in a folder. When the admin types `ls`, the attacker's script runs instead!"
                },
                {
                    "title": "3. Writing Your First Bash Script",
                    "content": "A Bash script allows you to automate a series of commands:\n\n```bash\n#!/bin/bash\n# recon.sh - Simple reconnaissance script\nTARGET=\"10.10.10.15\"\necho \"[*] Starting scan on $TARGET...\"\nping -c 1 $TARGET\necho \"[+] Scan completed!\"\n```\n\nTo make it executable:\n`chmod +x recon.sh`\n`./recon.sh`"
                }
            ],
            "seeExamples": [
                {
                    "title": "Inspecting $PATH and User Variables",
                    "codeOrDiagram": "cadet@endlessus:~$ echo $USER\ncadet\n\ncadet@endlessus:~$ echo $PATH\n/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                    "explanation": "`echo $VARIABLE` prints the value of any loaded environment variable."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `echo $PATH` in the terminal to inspect your executable lookup search path:",
                "initialCommand": "",
                "expectedCommand": "echo $PATH",
                "simulatedOutput": "/usr/local/bin:/usr/bin:/bin\n[+] Path inspected: Executables in these directories run globally without typing full paths.",
                "explanation": "`$PATH` contains the colon-delimited list of directories searched for executable binaries."
            },
            "questions": [
                {
                    "id": "q-14-1",
                    "type": "exact",
                    "question": "Which environment variable stores the colon-separated list of directories searched by the shell when executing command names?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["PATH", "$PATH"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Four letters: P-A-T-H.",
                    "explanation": "$PATH holds the binary search directories."
                },
                {
                    "id": "q-14-2",
                    "type": "multiple-choice",
                    "question": "What is the two-character sequence '#!' at the beginning of a script called that specifies the interpreter to use?",
                    "options": [
                        "Comment tag",
                        "Shebang (or hashbang)",
                        "Magic header",
                        "Variable prefix"
                    ],
                    "correctIndex": 1,
                    "hint": "Hash (#) + Bang (!).",
                    "explanation": "#! is the shebang line indicating the script interpreter (e.g. #!/bin/bash)."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect $PATH variable",
                    "instruction": "Print the current `$PATH` variable using `echo $PATH`.",
                    "hints": ["Type: `echo $PATH`"]
                }
            ],
            "securityConnection": "In Linux Privilege Escalation, 'PATH Hijacking' is a common attack. If a privileged root script calls a command like `curl` without using an absolute path (`/usr/bin/curl`), an attacker who can modify `$PATH` can trick root into executing a malicious `curl` binary placed in a user-writable folder!"
        }
    ]
