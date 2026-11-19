-- PROPOSED ONLY. Do not execute until explicit approval and migration history is reconciled.
-- Four-path catalog reconciliation from learning-data.js.
-- Existing room progress is versioned and retained; no user progress or achievement rows are deleted.
-- This migration does not update profiles.total_xp or award achievements during apply.
-- Its milestone function contains no XP writer; verified XP is handled by a separate migration.
begin;

-- Freeze writes to all snapshotted/reconciled tables until the fingerprints and postconditions pass.
lock table public.room_progress, public.task_progress, public.rooms, public.learning_paths,
  public.user_achievements, public.profiles, public.achievements
  in share row exclusive mode;

do $$
begin
  if exists (select 1 from public.rooms where id not in ('room-01', 'room-02', 'room-03', 'room-04', 'room-05', 'room-06', 'room-07', 'room-08', 'room-09', 'room-10', 'room-11', 'room-12', 'room-13', 'room-14', 'room-15', 'room-16', 'room-17', 'room-18', 'room-19', 'room-20', 'room-21', 'room-22', 'room-23', 'room-24', 'room-25', 'room-26', 'room-27', 'room-28', 'room-29', 'room-30', 'room-31', 'room-32', 'room-33', 'room-34', 'room-35', 'room-36', 'room-37', 'room-38', 'room-39', 'room-40', 'room-41', 'room-42', 'room-43', 'room-44', 'room-45', 'room-46', 'room-47')) then
    raise exception 'Unexpected room IDs exist; stop and audit before reconciling';
  end if;
  if not exists (
    select 1 from public.achievements
    where id='pre-security-graduate' and required_count=10
  ) then
    raise exception 'Expected pre-security-graduate achievement with required_count=10';
  end if;
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name in ('room_progress','task_progress')
      and column_name='curriculum_id'
  ) then
    raise exception 'Progress version column already exists; stop and audit partial or changed schema';
  end if;
  if (select count(*) from public.room_progress)<>8
     or (select count(distinct room_id) from public.room_progress)<>8
     or exists (select 1 from public.room_progress where room_id not in ('room-01','room-02','room-03','room-04','room-05','room-06','room-07','room-11'))
     or exists (select 1 from public.room_progress where status not in ('completed','in_progress')) then
    raise exception 'The audited eight-row progress set changed; refresh the historical review before reconciling';
  end if;
  if (select count(*) from public.room_progress where status='completed')<>8
     or (select count(*) from public.room_progress where status='in_progress')<>0 then
    raise exception 'Progress state differs from the reviewed baseline; refresh checksums and review';
  end if;
  if exists (
    select 1
    from (values
      ('room-01','completed'),('room-02','completed'),('room-03','completed'),
      ('room-04','completed'),('room-05','completed'),('room-06','completed'),
      ('room-07','completed'),('room-11','completed')
    ) expected(room_id,status)
    left join public.room_progress rp on rp.room_id=expected.room_id
    where rp.id is null or rp.status<>expected.status
  ) then
    raise exception 'Reviewed room-specific progress states changed; refresh historical review';
  end if;
  -- Exact production catalog and schema fingerprints captured read-only on 2026-11-19.
  -- Any changed row, column, constraint, index, trigger, function or achievement stops this migration.
  if (select count(*) from public.rooms)<>45
     or (select md5(coalesce(string_agg(concat_ws(E'\x1f',id,path_id,level_number::text,title,coalesce(description,''),xp_reward::text,total_questions::text,display_order::text,is_active::text,created_at::text),'|' order by id),'')) from public.rooms)<>'102a55759ea05d5fff4681472d8e9afb' then
    raise exception 'Room catalog differs from the reviewed production baseline';
  end if;
  if (select count(*) from public.learning_paths)<>3
     or (select md5(coalesce(string_agg(concat_ws(E'\x1f',id,title,description,coalesce(badge_icon,''),display_order::text,is_active::text,created_at::text),'|' order by id),'')) from public.learning_paths)<>'e3f21808e2ee78a31b633dbf8ef0ac15' then
    raise exception 'Learning path catalog differs from the reviewed production baseline';
  end if;
  if (select md5(coalesce(string_agg(concat_ws(E'\x1f',user_id::text,room_id,status,progress_pct::text,questions_solved::text,started_at::text,coalesce(completed_at::text,''),last_accessed_at::text),'|' order by user_id,room_id),'')) from public.room_progress)<>'6dfbf291e77c51eef66de9a6c6144d48' then
    raise exception 'Room progress differs from the reviewed row-state baseline';
  end if;
  if (select count(*) from public.task_progress)<>0
     or (select md5(coalesce(string_agg(concat_ws(E'\x1f',user_id::text,room_id,task_index::text,is_completed::text,completed_at::text),'|' order by user_id,room_id,task_index),'')) from public.task_progress)<>'d41d8cd98f00b204e9800998ecf8427e' then
    raise exception 'Task progress differs from the reviewed empty baseline';
  end if;
  if (select count(*) from information_schema.columns where table_schema='public' and table_name in ('learning_paths','rooms','room_progress','task_progress','achievements'))<>40
     or (select md5(coalesce(string_agg(concat_ws(E'\x1f',table_name,ordinal_position::text,column_name,data_type,is_nullable,coalesce(column_default,'')),'|' order by table_name,ordinal_position),'')) from information_schema.columns where table_schema='public' and table_name in ('learning_paths','rooms','room_progress','task_progress','achievements'))<>'b45d4c16160624d89c4ddd0d2f862e1b' then
    raise exception 'Relevant public table columns differ from the reviewed schema';
  end if;
  if (select count(*) from (
        select conrelid::regclass::text as relation,conname as name,pg_get_constraintdef(oid) as definition
        from pg_constraint where connamespace='public'::regnamespace and contype<>'n' and conrelid in
          ('public.learning_paths'::regclass,'public.rooms'::regclass,'public.room_progress'::regclass,'public.task_progress'::regclass,'public.achievements'::regclass)
        union all
        select schemaname||'.'||tablename,indexname,indexdef
        from pg_indexes where schemaname='public' and tablename in ('learning_paths','rooms','room_progress','task_progress','achievements')
      ) objects)<>39
     or (with objects as (
        select 'constraint'::text as kind,conrelid::regclass::text as relation,conname as name,pg_get_constraintdef(oid) as definition
        from pg_constraint where connamespace='public'::regnamespace and contype<>'n' and conrelid in
          ('public.learning_paths'::regclass,'public.rooms'::regclass,'public.room_progress'::regclass,'public.task_progress'::regclass,'public.achievements'::regclass)
        union all
        select 'index',schemaname||'.'||tablename,indexname,indexdef
        from pg_indexes where schemaname='public' and tablename in ('learning_paths','rooms','room_progress','task_progress','achievements')
      ) select md5(coalesce(string_agg(concat_ws(E'\x1f',kind,relation,name,definition),'|' order by kind,relation,name),'')) from objects)<>'92847896992f7e999f5bc1ffa6d071a9' then
    raise exception 'Relevant constraints or indexes differ from the reviewed production baseline';
  end if;
  if (select md5(prosrc) from pg_proc where oid='public.protect_room_completion()'::regprocedure)<>'828fd6f9e9b569b2c09e65d447437d13'
     or (select md5(prosrc) from pg_proc where oid='public.on_room_progress_update()'::regprocedure)<>'66a51c11eeb95e731d02671895472b99'
     or (select md5(prosrc) from pg_proc where oid='public.evaluate_user_milestones(uuid)'::regprocedure)<>'d386d11d907dfb3230e00ddedd4b0738' then
    raise exception 'A reviewed room progress function definition changed';
  end if;
  if (select count(*) from pg_trigger where tgrelid='public.room_progress'::regclass and not tgisinternal)<>2
     or not exists(select 1 from pg_trigger where tgrelid='public.room_progress'::regclass and tgname='trg_protect_room_completion' and tgenabled='O' and pg_get_triggerdef(oid)='CREATE TRIGGER trg_protect_room_completion BEFORE INSERT OR UPDATE ON public.room_progress FOR EACH ROW EXECUTE FUNCTION protect_room_completion()')
     or not exists(select 1 from pg_trigger where tgrelid='public.room_progress'::regclass and tgname='trg_room_progress_update' and tgenabled='O' and pg_get_triggerdef(oid)='CREATE TRIGGER trg_room_progress_update AFTER INSERT OR UPDATE OF status ON public.room_progress FOR EACH ROW EXECUTE FUNCTION on_room_progress_update()') then
    raise exception 'Room progress trigger definitions or enabled states changed';
  end if;
  if (select count(*) from public.achievements)<>9
     or (select md5(coalesce(string_agg(concat_ws(E'\x1f',id,title,description,icon,category,required_count::text,xp_bonus::text),'|' order by id),'')) from public.achievements)<>'caab64e9a4572b5efb54b1f591cd55dc'
     or not exists(select 1 from public.achievements where id='pre-security-graduate' and required_count=10 and description='Achieve 100% completion across all 10 Pre-Security rooms.' and icon='shield-check' and category='path' and xp_bonus=500) then
    raise exception 'Achievement data or Pre-Security threshold differs from reviewed baseline';
  end if;
end $$;

-- Temporary snapshots prove exact XP and user-progress preservation after all DDL/data work.
create temporary table calion_reconcile_profiles_snapshot on commit drop as
  select id,total_xp from public.profiles;
create temporary table calion_reconcile_room_progress_snapshot on commit drop as
  select id,user_id,room_id,status,progress_pct,questions_solved,started_at,completed_at,last_accessed_at
  from public.room_progress;
create temporary table calion_reconcile_task_progress_snapshot on commit drop as
  select id,user_id,room_id,task_index,is_completed,completed_at from public.task_progress;
create temporary table calion_reconcile_user_achievements_snapshot on commit drop as
  select id,user_id,achievement_id,unlocked_at from public.user_achievements;

-- Snapshot old room metadata on each existing progress row before room metadata changes.
-- The metadata-only UPDATE would normally fire XP and completion triggers. Disable both
-- around this metadata-only assignment so neither XP recalculation nor progress normalization
-- occurs. Status, progress_pct, answers and timestamps are not assignment targets.
alter table public.room_progress add column curriculum_id text;
alter table public.room_progress add column legacy_room_title text;
alter table public.room_progress add column legacy_room_path_id text;
alter table public.room_progress add column legacy_room_description text;
alter table public.room_progress add column legacy_room_level_number integer;
alter table public.room_progress add column legacy_room_total_questions integer;
alter table public.room_progress add column legacy_room_xp_reward integer;
alter table public.room_progress add column legacy_room_display_order integer;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgrelid='public.room_progress'::regclass and tgname='trg_room_progress_update' and not tgisinternal
  ) or not exists (
    select 1 from pg_trigger
    where tgrelid='public.room_progress'::regclass and tgname='trg_protect_room_completion' and not tgisinternal
  ) then
    raise exception 'Expected room progress triggers were not found; stop and audit';
  end if;
end $$;
alter table public.room_progress disable trigger trg_room_progress_update;
alter table public.room_progress disable trigger trg_protect_room_completion;
update public.room_progress rp
set curriculum_id='calion-legacy-45-v1',
    legacy_room_title=r.title,
    legacy_room_path_id=r.path_id,
    legacy_room_description=r.description,
    legacy_room_level_number=r.level_number,
    legacy_room_total_questions=r.total_questions,
    legacy_room_xp_reward=r.xp_reward,
    legacy_room_display_order=r.display_order
from public.rooms r
where rp.room_id=r.id;
alter table public.room_progress enable trigger trg_protect_room_completion;
alter table public.room_progress enable trigger trg_room_progress_update;
alter table public.room_progress alter column curriculum_id set default 'calion-academy-47-v1';
alter table public.room_progress alter column curriculum_id set not null;

-- Allow one historical and one current progress row for a user's stable room ID.
do $$
begin
  if exists (
    select 1 from pg_constraint
    where conrelid='public.room_progress'::regclass
      and conname='room_progress_user_id_room_id_key'
  ) then
    alter table public.room_progress drop constraint room_progress_user_id_room_id_key;
  end if;
  alter table public.room_progress
    add constraint room_progress_user_room_curriculum_key
    unique (user_id,room_id,curriculum_id);
  alter table public.room_progress
    add constraint room_progress_curriculum_id_check
    check (curriculum_id in ('calion-legacy-45-v1','calion-academy-47-v1'));
end $$;

-- Version task records too so old task completion cannot collide with a new room version.
-- Production had zero task_progress rows at audit time.
alter table public.task_progress add column curriculum_id text;
alter table public.task_progress add column legacy_room_title text;
alter table public.task_progress add column legacy_room_path_id text;
update public.task_progress tp
set curriculum_id='calion-legacy-45-v1',
    legacy_room_title=r.title,
    legacy_room_path_id=r.path_id
from public.rooms r
where tp.room_id=r.id;
alter table public.task_progress alter column curriculum_id set default 'calion-academy-47-v1';
alter table public.task_progress alter column curriculum_id set not null;
do $$
begin
  if exists (
    select 1 from pg_constraint
    where conrelid='public.task_progress'::regclass
      and conname='task_progress_user_id_room_id_task_index_key'
  ) then
    alter table public.task_progress drop constraint task_progress_user_id_room_id_task_index_key;
  end if;
  alter table public.task_progress add constraint task_progress_user_room_task_curriculum_key
    unique (user_id,room_id,task_index,curriculum_id);
  alter table public.task_progress add constraint task_progress_curriculum_id_check
    check (curriculum_id in ('calion-legacy-45-v1','calion-academy-47-v1'));
end $$;

insert into public.learning_paths (id,title,description,badge_icon,display_order,is_active)
values
  ('pre-security', 'Pre-Security', 'Essential computing architecture, network protocols, Linux/Windows operating systems, and command-line mechanics required before offensive and defensive security.', 'shield', '1', 'true'),
  ('cyber-security', 'Cyber Security Foundations', 'Master the core principles of cybersecurity: the CIA Triad, threat modeling, authentication architectures, applied cryptography, malware classification, and incident response frameworks.', 'lock', '2', 'true'),
  ('defensive-security', 'Defensive Security', 'Specialized defensive security training: SOC operations, Windows/Linux log analysis, Wireshark traffic inspection, SIEM detection engineering, digital forensics, and incident containment.', 'security', '3', 'true'),
  ('offensive-security', 'Offensive Security', 'Specialized offensive security training: Rules of engagement, network reconnaissance, service enumeration, OWASP Top 10 web exploitation, privilege escalation, and executive remediation reporting.', 'swords', '4', 'true')
on conflict (id) do update set
  title=excluded.title, description=excluded.description, badge_icon=excluded.badge_icon,
  display_order=excluded.display_order, is_active=true;

-- Keep retired path records for referential/history compatibility.
update public.learning_paths set is_active=false
where id in ('cyber-security-101','jr-pentester');

insert into public.rooms (id,path_id,level_number,title,description,xp_reward,total_questions,display_order,is_active)
values
  ('room-01', 'pre-security', '1', 'Introduction to Computers', 'Understand computer hardware, CPU execution cycles, memory hierarchies, and hardware privilege rings.', '50', '3', '1', 'true'),
  ('room-02', 'pre-security', '1', 'How the Internet Works', 'Explore the global packet-switched Internet, IP routing, Autonomous Systems, and BGP peering.', '50', '3', '2', 'true'),
  ('room-03', 'pre-security', '1', 'Networking Fundamentals', 'Master Local Area Networks (LAN), MAC addresses, IPv4 vs IPv6 addressing, and subnet masks.', '50', '3', '3', 'true'),
  ('room-04', 'pre-security', '1', 'Network Protocols and Ports', 'Demystify Layer 4 transport protocols: TCP reliable connections, the 3-Way Handshake, UDP datagrams, and standardized network ports.', '50', '3', '4', 'true'),
  ('room-05', 'pre-security', '1', 'Linux Fundamentals', 'Master the operating system of cybersecurity: the hierarchical Linux filesystem, core directory roles, and essential file commands.', '50', '3', '5', 'true'),
  ('room-06', 'pre-security', '1', 'Windows Fundamentals', 'Explore Windows operating system architecture, the Registry, NTFS security permissions, and core administrative services.', '50', '3', '6', 'true'),
  ('room-07', 'pre-security', '1', 'Command-Line Fundamentals', 'Unlock the full power of the shell: input/output redirection, pipes, grep pattern filtering, and command chaining.', '50', '3', '7', 'true'),
  ('room-08', 'pre-security', '1', 'Web Fundamentals', 'Master the foundations of the World Wide Web: HTTP request/response cycles, headers, cookies, and client-server architectures.', '50', '3', '8', 'true'),
  ('room-09', 'pre-security', '1', 'Introduction to Virtualization', 'Explore virtualization technology: Type-1 vs Type-2 Hypervisors, containers vs virtual machines, and snapshot rollbacks for safe security testing.', '50', '3', '9', 'true'),
  ('room-10', 'pre-security', '1', 'Introduction to Cybersecurity', 'Synthesize your pre-security foundations into modern cybersecurity: the threat landscape, adversary motivations, and defense in depth.', '50', '3', '10', 'true'),
  ('room-11', 'cyber-security', '2', 'Security Fundamentals', 'Establish the foundational security mindset: asset valuation, adversary attack surface calculation, and threat vectors.', '50', '3', '11', 'true'),
  ('room-12', 'cyber-security', '2', 'CIA Triad and Security Principles', 'Deep dive into the core guiding model of information security: Confidentiality, Integrity, and Availability.', '50', '3', '12', 'true'),
  ('room-13', 'cyber-security', '2', 'Threats, Vulnerabilities and Risks', 'Deconstruct the fundamental equation of cybersecurity: Risk = Threat × Vulnerability × Impact.', '50', '3', '13', 'true'),
  ('room-14', 'cyber-security', '2', 'Authentication and Access Control', 'Master identity security: password hygiene, Multi-Factor Authentication (MFA), and Access Control models (DAC, MAC, RBAC, ABAC).', '50', '3', '14', 'true'),
  ('room-15', 'cyber-security', '2', 'Cryptography Fundamentals', 'Master practical cryptography: symmetric ciphers (AES), asymmetric key pairs (RSA/ECC), cryptographic hashing, and digital certificates.', '50', '3', '15', 'true'),
  ('room-16', 'cyber-security', '2', 'Malware and Attack Concepts', 'Deconstruct malicious software: viruses, worms, trojans, ransomware, rootkits, command & control (C2), and the adversary attack lifecycle.', '50', '3', '16', 'true'),
  ('room-17', 'cyber-security', '2', 'Security Architecture', 'Design enterprise defensive architectures: Next-Gen Firewalls, Demilitarized Zones (DMZ), network micro-segmentation, and Zero Trust.', '50', '3', '17', 'true'),
  ('room-18', 'cyber-security', '2', 'Vulnerability Management', 'Master the vulnerability management lifecycle: asset discovery, automated vulnerability scanning, vulnerability triage, and patch verification.', '50', '3', '18', 'true'),
  ('room-19', 'cyber-security', '2', 'Security Monitoring Fundamentals', 'Explore enterprise security monitoring: telemetry collection, log aggregation, Intrusion Detection Systems (IDS/IPS), and SIEM integration.', '50', '3', '19', 'true'),
  ('room-20', 'cyber-security', '2', 'Introduction to Incident Response', 'Master the emergency management of cybersecurity: the NIST/SANS Incident Response lifecycle, containment strategies, and evidence preservation.', '50', '3', '20', 'true'),
  ('room-21', 'defensive-security', '3', 'Introduction to Blue Team Operations', 'Enter the world of enterprise defense: the blue team mission, defending business assets, and operational threat hunting.', '50', '3', '21', 'true'),
  ('room-22', 'defensive-security', '3', 'Security Operations Centre Fundamentals', 'Explore the engine room of enterprise defense: SOC tiers (Tier 1, Tier 2, Tier 3), alert triage, escalation workflows, and SLA metrics.', '50', '3', '22', 'true'),
  ('room-23', 'defensive-security', '3', 'Log Analysis Fundamentals', 'Master the language of digital evidence: syslog formats, timestamp normalization, regex parsing, and multi-source event correlation.', '50', '3', '23', 'true'),
  ('room-24', 'defensive-security', '3', 'Windows Event Logs', 'Master Windows forensic auditing: Event Viewer, essential Security Event IDs (4624, 4625, 4688, 7045), and Sysmon telemetry.', '50', '3', '24', 'true'),
  ('room-25', 'defensive-security', '3', 'Linux Log Analysis', 'Master Linux forensic investigation: /var/log hierarchy, auth.log brute-force detection, systemd journalctl querying, and auditd system auditing.', '50', '3', '25', 'true'),
  ('room-26', 'defensive-security', '3', 'Network Traffic Analysis', 'Master packet forensics: live packet capture with tcpdump, deep protocol inspection in Wireshark, TCP stream reassembly, and C2 beacon detection.', '50', '3', '26', 'true'),
  ('room-27', 'defensive-security', '3', 'SIEM Fundamentals', 'Explore enterprise Security Information and Event Management (SIEM): data ingestion pipelines, index parsing, SPL/KQL correlation queries, and alert tuning.', '50', '3', '27', 'true'),
  ('room-28', 'defensive-security', '3', 'Threat Intelligence', 'Master cyber threat intelligence (CTI): Strategic, Tactical, and Operational CTI, the Pyramid of Pain, STIX/TAXII standards, and OSINT threat feeds.', '50', '3', '28', 'true'),
  ('room-29', 'defensive-security', '3', 'Incident Detection and Response', 'Execute live incident response playbooks: host network isolation, credential revocation, artifact collection, and remediation validation.', '50', '3', '29', 'true'),
  ('room-30', 'defensive-security', '3', 'Digital Forensics Fundamentals', 'Master digital forensic acquisition: memory dumping, bit-stream disk imaging (dd/dcfldd), write-blockers, and file carving (scalpel/foremost).', '50', '3', '30', 'true'),
  ('room-31', 'defensive-security', '3', 'Endpoint Security', 'Master modern endpoint protection: Antivirus signatures vs Endpoint Detection & Response (EDR), behavioral heuristics, and memory injection detection.', '50', '3', '31', 'true'),
  ('room-32', 'defensive-security', '3', 'Defensive Security Capstone', 'Synthesize your complete defensive training: investigate a simulated enterprise breach across network, endpoint, and SIEM logs, contain the adversary, and formulate remediation.', '50', '3', '32', 'true'),
  ('room-33', 'offensive-security', '4', 'Introduction to Ethical Hacking', 'Enter the world of authorized security testing: ethical hacking mindsets, testing methodologies, and penetration testing phases.', '50', '3', '33', 'true'),
  ('room-34', 'offensive-security', '4', 'Rules of Engagement and Legal Boundaries', 'Master the legal framework of offensive security: CFAA, Computer Misuse Act, Rules of Engagement (RoE), and out-of-scope liabilities.', '50', '3', '34', 'true'),
  ('room-35', 'offensive-security', '4', 'Reconnaissance Fundamentals', 'Master open-source intelligence (OSINT): passive footprinting, WHOIS registration audits, DNS enumeration, and search engine dorking.', '50', '3', '35', 'true'),
  ('room-36', 'offensive-security', '4', 'Network Enumeration', 'Master active network mapping with Nmap: ping sweeps, TCP SYN stealth scans, full connect scans, UDP scanning, and port timing templates.', '50', '3', '36', 'true'),
  ('room-37', 'offensive-security', '4', 'Service Enumeration', 'Extract detailed service intelligence: banner grabbing, software version detection (-sV), Nmap Scripting Engine (NSE), and vulnerability mapping.', '50', '3', '37', 'true'),
  ('room-38', 'offensive-security', '4', 'Web Application Fundamentals', 'Analyze modern web applications through a security lens: client vs server architectures, DevTools DOM inspection, and Burp Suite HTTP proxying.', '50', '3', '38', 'true'),
  ('room-39', 'offensive-security', '4', 'OWASP Top 10', 'Explore the canonical web vulnerability benchmark: the OWASP Top 10 web application security risks and threat mitigation.', '50', '3', '39', 'true'),
  ('room-40', 'offensive-security', '4', 'Web Vulnerability Assessment', 'Master practical web vulnerability discovery: Cross-Site Scripting (Reflected, Stored, DOM), SQL Injection (SQLi), and Insecure Direct Object References (IDOR).', '50', '3', '40', 'true'),
  ('room-41', 'offensive-security', '4', 'Authentication Security Testing', 'Test authentication mechanisms: brute-force rate-limiting, credential stuffing with Hydra, JSON Web Token (JWT) signature flaws, and session fixation.', '50', '3', '41', 'true'),
  ('room-42', 'offensive-security', '4', 'Vulnerability Validation in a Lab', 'Master the safe construction of Proof-of-Concept (PoC) exploits in isolated lab containers without causing collateral disruption.', '50', '3', '42', 'true'),
  ('room-43', 'offensive-security', '4', 'Linux Privilege Escalation Fundamentals', 'Elevate privileges on Linux systems: SUID binaries, misconfigured sudo permissions (sudo -l), cron job hijacking, and readable /etc/shadow files.', '50', '3', '43', 'true'),
  ('room-44', 'offensive-security', '4', 'Windows Privilege Escalation Fundamentals', 'Elevate privileges on Windows systems: Unquoted Service Paths, weak service permissions, token impersonation (SeImpersonate), and SAM hash dumping.', '50', '3', '44', 'true'),
  ('room-45', 'offensive-security', '4', 'Exploitation Concepts in Controlled Labs', 'Master the mechanics of exploit payloads: shellcode execution, reverse shells vs bind shells, listener configuration, and Metasploit fundamentals.', '50', '3', '45', 'true'),
  ('room-46', 'offensive-security', '4', 'Reporting and Remediation', 'Transform technical findings into executive business value: writing penetration testing reports, severity risk ratings, and actionable remediation roadmaps.', '50', '3', '46', 'true'),
  ('room-47', 'offensive-security', '4', 'Offensive Security Capstone', 'Synthesize your complete offensive training: conduct a full-scope simulated authorized penetration test, chain vulnerabilities, and produce an executive remediation report.', '50', '3', '47', 'true')
on conflict (id) do update set
  path_id=excluded.path_id,
  level_number=excluded.level_number,
  title=excluded.title,
  description=excluded.description,
  xp_reward=excluded.xp_reward,
  total_questions=excluded.total_questions,
  display_order=excluded.display_order,
  is_active=true;

-- New-version completions must satisfy the current room's full question count.
create or replace function public.protect_room_completion()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  req_questions integer;
begin
  if current_user in ('authenticated','anon') then
    if tg_op='INSERT' then
      if new.curriculum_id='calion-legacy-45-v1' then
        raise exception 'Clients cannot create historical curriculum progress';
      end if;
    elsif tg_op='UPDATE' then
      if old.curriculum_id='calion-legacy-45-v1' then
        raise exception 'Historical curriculum progress is immutable';
      end if;
    end if;
  end if;

  if new.curriculum_id='calion-legacy-45-v1' then
    -- Preserve the legacy course's own completion threshold from the pre-update snapshot.
    req_questions:=coalesce(new.legacy_room_total_questions,2);
  else
    select coalesce(total_questions,2) into req_questions
    from public.rooms where id=new.room_id;
    if req_questions is null then req_questions:=2; end if;
  end if;

  if new.status='completed' then
    if jsonb_array_length(new.questions_solved)<req_questions then
      raise exception 'Room completion rejected: questions_solved count (%) is less than required (%)',
        jsonb_array_length(new.questions_solved),req_questions;
    end if;
    new.progress_pct:=100;
  elsif new.progress_pct=100 and new.status!='completed' then
    if jsonb_array_length(new.questions_solved)>=req_questions then
      new.status:='completed';
    else
      new.progress_pct:=99;
    end if;
  end if;
  return new;
end;
$$;

-- Only current-version room completions qualify for current room/path achievements.
-- Keep historical XP intact, count distinct curriculum completions, and do not
-- add question XP here (that is a separate proposal).
create or replace function public.evaluate_user_milestones(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  completed_room_count integer;
  completed_lab_count integer;
  pre_security_total integer;
  pre_security_completed integer;
begin
  select count(*) into completed_room_count
  from public.room_progress
  where user_id=target_user_id and curriculum_id='calion-academy-47-v1' and status='completed';

  if completed_room_count>=1 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'first-steps') on conflict(user_id,achievement_id) do nothing;
  end if;
  if completed_room_count>=5 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'explorer') on conflict(user_id,achievement_id) do nothing;
  end if;
  if completed_room_count>=10 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'dedicated-learner') on conflict(user_id,achievement_id) do nothing;
  end if;
  if completed_room_count>=25 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'security-enthusiast') on conflict(user_id,achievement_id) do nothing;
  end if;

  select count(*) into pre_security_total from public.rooms where path_id='pre-security';
  select count(*) into pre_security_completed
  from public.room_progress rp join public.rooms r on r.id=rp.room_id
  where rp.user_id=target_user_id and rp.curriculum_id='calion-academy-47-v1'
    and rp.status='completed' and r.path_id='pre-security';
  if pre_security_total=10 and pre_security_completed=10 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'pre-security-graduate') on conflict(user_id,achievement_id) do nothing;
  end if;

  select count(*) into completed_lab_count from public.lab_progress
  where user_id=target_user_id and (status='completed' or flag_verified=true);
  if completed_lab_count>=1 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'lab-practitioner') on conflict(user_id,achievement_id) do nothing;
  end if;
  if completed_lab_count>=5 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'lab-specialist') on conflict(user_id,achievement_id) do nothing;
  end if;
  if completed_lab_count>=13 then
    insert into public.user_achievements(user_id,achievement_id)
    values(target_user_id,'lab-master') on conflict(user_id,achievement_id) do nothing;
  end if;

  -- XP totals are an immutable historical opening balance here. The separate XP ledger
  -- migration owns future awards; no completion trigger in this migration recalculates XP.
end;
$$;

-- Milestone evaluation is an internal trigger/server operation. Removing direct
-- client execution here closes the interval between curriculum reconciliation
-- and the XP-ledger migration without changing existing profiles.total_xp.
revoke all on function public.evaluate_user_milestones(uuid) from public,anon,authenticated;

do $$
declare pre_count integer; foundations_count integer; defensive_count integer; offensive_count integer;
begin
  if (select count(*) from public.rooms)<>47 then
    raise exception 'Expected exactly 47 canonical room rows after reconciliation';
  end if;
  select count(*) into pre_count from public.rooms where path_id='pre-security';
  select count(*) into foundations_count from public.rooms where path_id='cyber-security';
  select count(*) into defensive_count from public.rooms where path_id='defensive-security';
  select count(*) into offensive_count from public.rooms where path_id='offensive-security';
  if pre_count<>10 or foundations_count<>10 or defensive_count<>12 or offensive_count<>15 then
    raise exception 'Unexpected path distribution: %, %, %, %',pre_count,foundations_count,defensive_count,offensive_count;
  end if;
end $$;

do $$
begin
  if exists(select id,total_xp from calion_reconcile_profiles_snapshot except select id,total_xp from public.profiles)
     or exists(select id,total_xp from public.profiles except select id,total_xp from calion_reconcile_profiles_snapshot) then
    raise exception 'Profile XP changed during curriculum reconciliation';
  end if;
  if exists(select id,user_id,room_id,status,progress_pct,questions_solved,started_at,completed_at,last_accessed_at from calion_reconcile_room_progress_snapshot except select id,user_id,room_id,status,progress_pct,questions_solved,started_at,completed_at,last_accessed_at from public.room_progress)
     or exists(select id,user_id,room_id,status,progress_pct,questions_solved,started_at,completed_at,last_accessed_at from public.room_progress except select id,user_id,room_id,status,progress_pct,questions_solved,started_at,completed_at,last_accessed_at from calion_reconcile_room_progress_snapshot) then
    raise exception 'Historical room progress changed during curriculum reconciliation';
  end if;
  if exists(select id,user_id,room_id,task_index,is_completed,completed_at from calion_reconcile_task_progress_snapshot except select id,user_id,room_id,task_index,is_completed,completed_at from public.task_progress)
     or exists(select id,user_id,room_id,task_index,is_completed,completed_at from public.task_progress except select id,user_id,room_id,task_index,is_completed,completed_at from calion_reconcile_task_progress_snapshot) then
    raise exception 'Historical task progress changed during curriculum reconciliation';
  end if;
  if exists(select id,user_id,achievement_id,unlocked_at from calion_reconcile_user_achievements_snapshot except select id,user_id,achievement_id,unlocked_at from public.user_achievements)
     or exists(select id,user_id,achievement_id,unlocked_at from public.user_achievements except select id,user_id,achievement_id,unlocked_at from calion_reconcile_user_achievements_snapshot) then
    raise exception 'Earned achievements changed during curriculum reconciliation';
  end if;
  if exists(select 1 from pg_trigger where tgrelid='public.room_progress'::regclass and tgname in ('trg_protect_room_completion','trg_room_progress_update') and tgenabled<>'O') then
    raise exception 'Room progress triggers are not enabled after reconciliation';
  end if;
end $$;

commit;
