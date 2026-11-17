-- Seed Learning Paths
insert into public.learning_paths (id, title, description, badge_icon, display_order) values
  ('pre-security', 'Pre Security', 'Master fundamental computing, networking, Linux, Windows, and web concepts before offensive security.', 'shield', 1),
  ('cyber-security-101', 'Cyber Security 101', 'Foundations of defensive and offensive cyber operations, security operations, and digital forensics.', 'terminal', 2),
  ('jr-pentester', 'Jr Penetration Tester', 'Hands-on practical exploitation, vulnerability assessment, network penetration, and privilege escalation.', 'swords', 3)
on conflict (id) do update set title = excluded.title, description = excluded.description;

-- Seed 45 Pre-Security Rooms
insert into public.rooms (id, path_id, level_number, title, description, xp_reward, total_questions, display_order) values
  ('room-01', 'pre-security', 0, 'Welcome to Cybersecurity & Ethical Hacking', '', 50, 3, 1),
  ('room-02', 'pre-security', 0, 'How Computers & The Internet Work', '', 50, 2, 2),
  ('room-03', 'pre-security', 1, 'Computer Hardware & System Architecture', '', 50, 2, 3),
  ('room-04', 'pre-security', 1, 'Filesystems, Folders & File Types', '', 50, 2, 4),
  ('room-05', 'pre-security', 1, 'Programs, Processes & Background Services', '', 50, 2, 5),
  ('room-06', 'pre-security', 1, 'Operating Systems & User Permissions', '', 50, 2, 6),
  ('room-07', 'pre-security', 2, 'Introduction to Linux & The Command Line', '', 50, 2, 7),
  ('room-08', 'pre-security', 2, 'Navigating the Filesystem (pwd, ls, cd)', '', 50, 3, 8),
  ('room-09', 'pre-security', 2, 'Creating, Moving & Deleting Files (touch, mkdir, cp, mv, rm)', '', 50, 3, 9),
  ('room-10', 'pre-security', 2, 'Viewing & Searching Files (cat, head, tail, grep, find)', '', 50, 2, 10),
  ('room-11', 'pre-security', 2, 'Linux Permissions & Ownership (chmod, chown, sudo)', '', 50, 2, 11),
  ('room-12', 'pre-security', 2, 'Processes & System Monitoring (ps, top, kill)', '', 50, 2, 12),
  ('room-13', 'pre-security', 2, 'Pipes, Redirection & Command Chaining (>, >>, |, &&)', '', 50, 2, 13),
  ('room-14', 'pre-security', 2, 'Environment Variables & Basic Bash Scripting', '', 50, 2, 14),
  ('room-15', 'pre-security', 3, 'Windows Architecture & The NTFS Filesystem', '', 50, 2, 15),
  ('room-16', 'pre-security', 3, 'Windows Users, Groups & Access Controls', '', 50, 2, 16),
  ('room-17', 'pre-security', 3, 'Windows Processes, Services & Task Manager', '', 50, 2, 17),
  ('room-18', 'pre-security', 3, 'Command Prompt (CMD) vs PowerShell', '', 50, 2, 18),
  ('room-19', 'pre-security', 3, 'Windows Security Controls & Event Logs', '', 50, 2, 19),
  ('room-20', 'pre-security', 4, 'What is a Network? Topologies & Physical Devices', '', 50, 2, 20),
  ('room-21', 'pre-security', 4, 'IP Addresses, IPv4 & Physical MAC Addresses', '', 50, 2, 21),
  ('room-22', 'pre-security', 4, 'Private vs Public IP Addresses & NAT', '', 50, 2, 22),
  ('room-23', 'pre-security', 4, 'Subnetting & CIDR Notation Demystified', '', 50, 2, 23),
  ('room-24', 'pre-security', 4, 'TCP vs UDP & The 3-Way Handshake', '', 50, 2, 24),
  ('room-25', 'pre-security', 4, 'Ports & Common Network Services', '', 50, 3, 25),
  ('room-26', 'pre-security', 4, 'DNS & Domain Name Resolution', '', 50, 2, 26),
  ('room-27', 'pre-security', 4, 'DHCP & Automatic Address Assignment (DORA)', '', 50, 2, 27),
  ('room-28', 'pre-security', 4, 'The OSI & TCP/IP Models & Network Troubleshooting', '', 50, 2, 28),
  ('room-29', 'pre-security', 5, 'How the World Wide Web Works', '', 50, 2, 29),
  ('room-30', 'pre-security', 5, 'HTTP Requests, Methods & Status Codes', '', 50, 2, 30),
  ('room-31', 'pre-security', 5, 'HTTP Headers, Cookies & Stateful Sessions', '', 50, 2, 31),
  ('room-32', 'pre-security', 5, 'TLS, HTTPS & Cryptographic Trust Chains', '', 50, 2, 32),
  ('room-33', 'pre-security', 5, 'Web Architecture: HTML, Client vs Server & APIs', '', 50, 2, 33),
  ('room-34', 'pre-security', 6, 'The CIA Triad & Core Security Principles', '', 50, 2, 34),
  ('room-35', 'pre-security', 6, 'Threats, Vulnerabilities, Risks & Impacts', '', 50, 2, 35),
  ('room-36', 'pre-security', 6, 'Malware & Common Attack Types', '', 50, 2, 36),
  ('room-37', 'pre-security', 6, 'Authentication vs Authorization & Modern Identity', '', 50, 2, 37),
  ('room-38', 'pre-security', 6, 'Encoding vs Hashing vs Encryption', '', 50, 2, 38),
  ('room-39', 'pre-security', 6, 'Defensive Controls, Security Logs & Incident Response', '', 50, 2, 39),
  ('room-40', 'pre-security', 7, 'Linux Command-Line Investigation', '', 50, 2, 40),
  ('room-41', 'pre-security', 7, 'File & Permission Auditing (Practical Lab 02)', '', 50, 2, 41),
  ('room-42', 'pre-security', 7, 'HTTP Security Headers Auditing (Practical Lab 01)', '', 50, 2, 42),
  ('room-43', 'pre-security', 7, 'Network Service & Port Reconnaissance (Practical Lab 08)', '', 50, 2, 43),
  ('room-44', 'pre-security', 7, 'Security Incident Log Analysis (Practical Lab 09)', '', 50, 2, 44),
  ('room-45', 'pre-security', 7, 'Pre Security Capstone Challenge (Practical Lab 13)', '', 50, 2, 45)
on conflict (id) do update set title = excluded.title, level_number = excluded.level_number, total_questions = excluded.total_questions, display_order = excluded.display_order;

-- Seed 13 Practical Labs
insert into public.labs (id, title, difficulty, estimated_time, total_tasks, xp_reward) values
  ('lab-headers', 'Practical HTTP Security Headers Lab', 'Beginner', '20 min', 5, 75),
  ('lab-permissions', 'Practical Linux Permissions & Octal Masking Lab', 'Beginner', '20 min', 5, 75),
  ('lab-auth', 'Practical Authentication & Rate Limiting Bypass Lab', 'Beginner', '20 min', 5, 75),
  ('lab-idor', 'Practical Insecure Direct Object References (IDOR) Lab', 'Beginner', '20 min', 4, 75),
  ('lab-sqli', 'Practical UNION-Based SQL Injection Lab', 'Intermediate', '25 min', 5, 75),
  ('lab-xss', 'Practical Reflected XSS & Context Escaping Lab', 'Intermediate', '25 min', 4, 75),
  ('lab-csrf', 'Practical Cross-Site Request Forgery (CSRF) Lab', 'Intermediate', '25 min', 4, 75),
  ('lab-network', 'Practical Network Service & SMB Enumeration Lab', 'Intermediate', '30 min', 5, 75),
  ('lab-logs', 'Practical Security Incident Log Analysis Lab', 'Intermediate', '25 min', 5, 75),
  ('lab-suid', 'Practical Linux SUID Privilege Escalation Lab', 'Intermediate', '25 min', 5, 75),
  ('lab-jwt', 'Practical JSON Web Token (JWT) Exploitation Lab', 'Intermediate', '25 min', 5, 75),
  ('lab-crypto', 'Practical XOR & Frequency Analysis Decryption Lab', 'Intermediate', '25 min', 5, 75),
  ('lab-capstone', 'Capstone Pentest: Final Enterprise Target', 'Advanced', '60 min', 6, 75)
on conflict (id) do update set title = excluded.title, total_tasks = excluded.total_tasks;

-- Seed Standard Achievements
insert into public.achievements (id, title, description, icon, category, required_count, xp_bonus) values
  ('first-steps', 'First Steps', 'Complete your very first learning room.', 'flag', 'room', 1, 50),
  ('explorer', 'Explorer', 'Complete 5 learning rooms in the curriculum.', 'compass', 'room', 5, 100),
  ('dedicated-learner', 'Dedicated Learner', 'Complete 10 learning rooms.', 'book-open', 'room', 10, 150),
  ('security-enthusiast', 'Security Enthusiast', 'Complete 25 learning rooms across the academy.', 'award', 'room', 25, 250),
  ('lab-practitioner', 'Lab Practitioner', 'Successfully solve and verify your first practical terminal lab.', 'terminal', 'lab', 1, 100),
  ('lab-specialist', 'Lab Specialist', 'Complete 5 practical security labs.', 'cpu', 'lab', 5, 200),
  ('lab-master', 'Master of the Sandbox', 'Conquer all 13 practical security labs.', 'zap', 'lab', 13, 500),
  ('pre-security-graduate', 'Pre Security Graduate', 'Achieve 100% completion across all 45 rooms in the Pre Security pathway.', 'shield-check', 'path', 45, 500),
  ('streak-week', 'Consistent Operator', 'Maintain a 7-day daily learning streak.', 'flame', 'streak', 7, 150)
on conflict (id) do update set title = excluded.title, description = excluded.description;


