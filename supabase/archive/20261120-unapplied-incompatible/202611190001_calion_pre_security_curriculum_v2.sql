-- CALION Academy — Independent Pre-Security Curriculum Manifest (v2) Migration
-- Preserves existing user accounts, progress, and historical records.

-- 1. Relax or update room ID check constraint to support both legacy and new 'ps-room-XX' format
alter table public.rooms drop constraint if exists rooms_id_check;
alter table public.rooms add constraint rooms_id_check check (id ~ '^(room|ps-room)-[0-9]{2,}$');

-- 2. Add curriculum tracking columns if not already present
alter table public.rooms add column if not exists curriculum_id text default 'calion-pre-sec-v2';
alter table public.rooms add column if not exists stage_id text;

alter table public.room_progress add column if not exists curriculum_id text default 'calion-pre-sec-v2';
alter table public.room_progress add column if not exists stage_id text;

alter table public.task_progress add column if not exists curriculum_id text default 'calion-pre-sec-v2';
alter table public.task_progress add column if not exists stage_id text;
alter table public.task_progress add column if not exists xp_earned integer default 25;

-- 3. Seed the 12 New Pre-Security Curriculum Rooms
insert into public.rooms (id, path_id, level_number, title, description, xp_reward, total_questions, display_order, curriculum_id, stage_id) values
  ('ps-room-01', 'pre-security', 1, 'Introduction to Computers & Von Neumann Architecture', 'Understand computer hardware, CPU execution cycles, memory hierarchies, and hardware privilege rings.', 50, 3, 1, 'calion-pre-sec-v2', 'ps-stage-01'),
  ('ps-room-02', 'pre-security', 1, 'Digital Logic, Data Representation & Bitwise Operations', 'Master binary arithmetic, two''s complement, bitwise logic (AND, OR, XOR), and hexadecimal representation.', 50, 3, 2, 'calion-pre-sec-v2', 'ps-stage-01'),
  ('ps-room-03', 'pre-security', 1, 'Virtualization, Hypervisors & Sandboxing', 'Explore Type-1 vs Type-2 Hypervisors, hardware VT-x isolation, and Linux container namespaces.', 50, 2, 3, 'calion-pre-sec-v2', 'ps-stage-01'),
  ('ps-room-04', 'pre-security', 2, 'Linux Filesystem Hierarchy & Permission Architecture', 'Master the Linux filesystem (FHS), inode metadata, octal permissions (755/644), and SUID execution bits.', 50, 2, 4, 'calion-pre-sec-v2', 'ps-stage-02'),
  ('ps-room-05', 'pre-security', 2, 'Linux Command-Line Mastery, Text Wrangling & Pipes', 'Master stdin/stdout/stderr streams, pipeline redirection, grep pattern searching, and awk/sed utilities.', 50, 2, 5, 'calion-pre-sec-v2', 'ps-stage-02'),
  ('ps-room-06', 'pre-security', 2, 'Windows Architecture, Registry & Access Control', 'Explore the Windows NT kernel, Registry hives (HKLM, HKCU), Security Identifiers (SIDs), and DACLs.', 50, 2, 6, 'calion-pre-sec-v2', 'ps-stage-02'),
  ('ps-room-07', 'pre-security', 3, 'The OSI Reference Model & TCP/IP Architecture', 'Master the 7-Layer OSI model, 4-layer TCP/IP stack, packet encapsulation/decapsulation, and ARP.', 50, 2, 7, 'calion-pre-sec-v2', 'ps-stage-03'),
  ('ps-room-08', 'pre-security', 3, 'Transport Layer Protocols: TCP, UDP & Port Mechanics', 'Demystify TCP connection states, the 3-Way Handshake, TCP control flags, and UDP datagrams.', 50, 2, 8, 'calion-pre-sec-v2', 'ps-stage-03'),
  ('ps-room-09', 'pre-security', 3, 'Subnetting, Routing & Perimeter Firewalls', 'Master IPv4 addressing, CIDR notation (/24, /16), RFC 1918 private spaces, NAT, and stateful firewalls.', 50, 2, 9, 'calion-pre-sec-v2', 'ps-stage-03'),
  ('ps-room-10', 'pre-security', 4, 'Web Architecture, HTTP Protocol & Session Security', 'Understand the stateless HTTP protocol, status codes, request methods, cookies, and HttpOnly/Secure flags.', 50, 2, 10, 'calion-pre-sec-v2', 'ps-stage-04'),
  ('ps-room-11', 'pre-security', 4, 'Applied Cryptography, Hashes & Public Key Infrastructure', 'Master symmetric AES, asymmetric RSA/ECC, cryptographic hashing (SHA-256), and PKI digital certificates.', 50, 2, 11, 'calion-pre-sec-v2', 'ps-stage-04'),
  ('ps-room-12', 'pre-security', 4, 'The CIA Triad, Threat Landscape & Defensive Posture', 'Synthesize core security principles: Confidentiality, Integrity, Availability, Least Privilege, and Zero Trust.', 50, 2, 12, 'calion-pre-sec-v2', 'ps-stage-04')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  xp_reward = excluded.xp_reward,
  total_questions = excluded.total_questions,
  display_order = excluded.display_order,
  curriculum_id = excluded.curriculum_id,
  stage_id = excluded.stage_id;
