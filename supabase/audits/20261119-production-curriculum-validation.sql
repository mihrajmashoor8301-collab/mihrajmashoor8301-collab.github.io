-- READ ONLY validation queries for the proposed 202611200001 reconciliation.
-- Run with: supabase db query --remote --read-only --file <this-file>

-- Expected 47 rows, 10/10/12/15 by canonical path, and no missing/title/path mismatches.
with expected(id,path_id,title) as (values
  ('room-01', 'pre-security', 'Introduction to Computers'),
  ('room-02', 'pre-security', 'How the Internet Works'),
  ('room-03', 'pre-security', 'Networking Fundamentals'),
  ('room-04', 'pre-security', 'Network Protocols and Ports'),
  ('room-05', 'pre-security', 'Linux Fundamentals'),
  ('room-06', 'pre-security', 'Windows Fundamentals'),
  ('room-07', 'pre-security', 'Command-Line Fundamentals'),
  ('room-08', 'pre-security', 'Web Fundamentals'),
  ('room-09', 'pre-security', 'Introduction to Virtualization'),
  ('room-10', 'pre-security', 'Introduction to Cybersecurity'),
  ('room-11', 'cyber-security', 'Security Fundamentals'),
  ('room-12', 'cyber-security', 'CIA Triad and Security Principles'),
  ('room-13', 'cyber-security', 'Threats, Vulnerabilities and Risks'),
  ('room-14', 'cyber-security', 'Authentication and Access Control'),
  ('room-15', 'cyber-security', 'Cryptography Fundamentals'),
  ('room-16', 'cyber-security', 'Malware and Attack Concepts'),
  ('room-17', 'cyber-security', 'Security Architecture'),
  ('room-18', 'cyber-security', 'Vulnerability Management'),
  ('room-19', 'cyber-security', 'Security Monitoring Fundamentals'),
  ('room-20', 'cyber-security', 'Introduction to Incident Response'),
  ('room-21', 'defensive-security', 'Introduction to Blue Team Operations'),
  ('room-22', 'defensive-security', 'Security Operations Centre Fundamentals'),
  ('room-23', 'defensive-security', 'Log Analysis Fundamentals'),
  ('room-24', 'defensive-security', 'Windows Event Logs'),
  ('room-25', 'defensive-security', 'Linux Log Analysis'),
  ('room-26', 'defensive-security', 'Network Traffic Analysis'),
  ('room-27', 'defensive-security', 'SIEM Fundamentals'),
  ('room-28', 'defensive-security', 'Threat Intelligence'),
  ('room-29', 'defensive-security', 'Incident Detection and Response'),
  ('room-30', 'defensive-security', 'Digital Forensics Fundamentals'),
  ('room-31', 'defensive-security', 'Endpoint Security'),
  ('room-32', 'defensive-security', 'Defensive Security Capstone'),
  ('room-33', 'offensive-security', 'Introduction to Ethical Hacking'),
  ('room-34', 'offensive-security', 'Rules of Engagement and Legal Boundaries'),
  ('room-35', 'offensive-security', 'Reconnaissance Fundamentals'),
  ('room-36', 'offensive-security', 'Network Enumeration'),
  ('room-37', 'offensive-security', 'Service Enumeration'),
  ('room-38', 'offensive-security', 'Web Application Fundamentals'),
  ('room-39', 'offensive-security', 'OWASP Top 10'),
  ('room-40', 'offensive-security', 'Web Vulnerability Assessment'),
  ('room-41', 'offensive-security', 'Authentication Security Testing'),
  ('room-42', 'offensive-security', 'Vulnerability Validation in a Lab'),
  ('room-43', 'offensive-security', 'Linux Privilege Escalation Fundamentals'),
  ('room-44', 'offensive-security', 'Windows Privilege Escalation Fundamentals'),
  ('room-45', 'offensive-security', 'Exploitation Concepts in Controlled Labs'),
  ('room-46', 'offensive-security', 'Reporting and Remediation'),
  ('room-47', 'offensive-security', 'Offensive Security Capstone')
), comparison as (
 select e.id,e.path_id as expected_path,r.path_id as actual_path,e.title as expected_title,r.title as actual_title
 from expected e left join public.rooms r on r.id=e.id
)
select id,expected_path,actual_path,expected_title,actual_title,
       case when actual_path is null then 'missing'
            when actual_path<>expected_path then 'wrong_path'
            when actual_title<>expected_title then 'wrong_title'
       end as issue
from comparison
where actual_path is null or actual_path<>expected_path or actual_title<>expected_title
order by id;

with expected_questions(id,expected_questions) as (values
('room-01', 3),
  ('room-02', 3),
  ('room-03', 3),
  ('room-04', 3),
  ('room-05', 3),
  ('room-06', 3),
  ('room-07', 3),
  ('room-08', 3),
  ('room-09', 3),
  ('room-10', 3),
  ('room-11', 3),
  ('room-12', 3),
  ('room-13', 3),
  ('room-14', 3),
  ('room-15', 3),
  ('room-16', 3),
  ('room-17', 3),
  ('room-18', 3),
  ('room-19', 3),
  ('room-20', 3),
  ('room-21', 3),
  ('room-22', 3),
  ('room-23', 3),
  ('room-24', 3),
  ('room-25', 3),
  ('room-26', 3),
  ('room-27', 3),
  ('room-28', 3),
  ('room-29', 3),
  ('room-30', 3),
  ('room-31', 3),
  ('room-32', 3),
  ('room-33', 3),
  ('room-34', 3),
  ('room-35', 3),
  ('room-36', 3),
  ('room-37', 3),
  ('room-38', 3),
  ('room-39', 3),
  ('room-40', 3),
  ('room-41', 3),
  ('room-42', 3),
  ('room-43', 3),
  ('room-44', 3),
  ('room-45', 3),
  ('room-46', 3),
  ('room-47', 3)
)
select e.id,e.expected_questions,r.total_questions as actual_questions
from expected_questions e join public.rooms r on r.id=e.id
where r.total_questions<>e.expected_questions
order by e.id;

with expected_levels(id,expected_level) as (values
('room-01', 1),
  ('room-02', 1),
  ('room-03', 1),
  ('room-04', 1),
  ('room-05', 1),
  ('room-06', 1),
  ('room-07', 1),
  ('room-08', 1),
  ('room-09', 1),
  ('room-10', 1),
  ('room-11', 2),
  ('room-12', 2),
  ('room-13', 2),
  ('room-14', 2),
  ('room-15', 2),
  ('room-16', 2),
  ('room-17', 2),
  ('room-18', 2),
  ('room-19', 2),
  ('room-20', 2),
  ('room-21', 3),
  ('room-22', 3),
  ('room-23', 3),
  ('room-24', 3),
  ('room-25', 3),
  ('room-26', 3),
  ('room-27', 3),
  ('room-28', 3),
  ('room-29', 3),
  ('room-30', 3),
  ('room-31', 3),
  ('room-32', 3),
  ('room-33', 4),
  ('room-34', 4),
  ('room-35', 4),
  ('room-36', 4),
  ('room-37', 4),
  ('room-38', 4),
  ('room-39', 4),
  ('room-40', 4),
  ('room-41', 4),
  ('room-42', 4),
  ('room-43', 4),
  ('room-44', 4),
  ('room-45', 4),
  ('room-46', 4),
  ('room-47', 4)
)
select e.id,e.expected_level,r.level_number as actual_level
from expected_levels e join public.rooms r on r.id=e.id
where r.level_number<>e.expected_level
order by e.id;

select path_id,count(*)::int as room_count
from public.rooms where id ~ '^room-[0-9]{2}$'
group by path_id order by path_id;

select count(*)::int as room_count,
       count(*) filter(where id='room-46')::int as room_46,
       count(*) filter(where id='room-47')::int as room_47
from public.rooms;

-- These should remain unchanged by the metadata migration; no user IDs are returned.
select status,count(*)::int as progress_rows,count(distinct room_id)::int as rooms
from public.room_progress group by status order by status;
select count(*)::int as task_progress_rows,count(distinct room_id)::int as rooms
from public.task_progress;

select id,required_count,description from public.achievements
where id='pre-security-graduate';

-- Validate FK structure and delete behavior without exposing learner identities.
select conrelid::regclass::text as table_name,conname,pg_get_constraintdef(oid) as definition
from pg_constraint
where contype='f' and connamespace='public'::regnamespace
  and conrelid in ('public.rooms'::regclass,'public.room_progress'::regclass,'public.task_progress'::regclass)
order by table_name,conname;

-- The milestone function derives Pre-Security completion from assigned room membership.
select position('pre_security_total' in pg_get_functiondef('public.evaluate_user_milestones(uuid)'::regprocedure))>0 as derives_path_room_total;

-- Existing completions below the revised question threshold are grandfathered only
-- when their previous saved answers remain present.
select position('new.legacy_room_total_questions' in pg_get_functiondef('public.protect_room_completion()'::regprocedure))>0
       as validates_legacy_progress_against_snapshotted_threshold;

-- ---------------------------------------------------------------------------
-- Versioning, historical preservation, XP invariance and integrity checks
-- ---------------------------------------------------------------------------
-- Compare with values captured by supabase/audits/20261120-reconciliation-preflight.sql.
select count(*)::int as profile_count,
       coalesce(sum(total_xp),0)::bigint as xp_sum,
       md5(coalesce(string_agg(id::text || ':' || total_xp::text, '|' order by id),'')) as profile_xp_checksum
from public.profiles;

-- Run after migration: only legacy rows are compared to the pre-migration data.
select count(*)::int as legacy_progress_rows,
       md5(coalesce(string_agg(
         user_id::text || ':' || room_id || ':' || status || ':' || progress_pct::text || ':' ||
         questions_solved::text || ':' || started_at::text || ':' || coalesce(completed_at::text,'') || ':' ||
         coalesce(last_accessed_at::text,''),
         '|' order by user_id,room_id
       ),'')) as legacy_progress_checksum
from public.room_progress
where curriculum_id='calion-legacy-45-v1';

-- Existing rows must have snapshots and must not be silently relabeled current.
select curriculum_id,status,count(*)::int as row_count,
       count(*) filter(where legacy_room_title is null)::int as missing_legacy_title,
       count(*) filter(where status='in_progress')::int as in_progress_rows
from public.room_progress
group by curriculum_id,status
order by curriculum_id,status;

-- Immediate post-migration check, before learner traffic: must be zero. The
-- migration itself inserts no current-version progress records.
select count(*)::int as current_progress_rows_created_during_migration
from public.room_progress where curriculum_id='calion-academy-47-v1';

-- Exactly 47 catalog IDs and the requested path distribution.
select count(*)::int as catalog_rooms,
       count(*) filter(where path_id='pre-security')::int as pre_security,
       count(*) filter(where path_id='cyber-security')::int as foundations,
       count(*) filter(where path_id='defensive-security')::int as defensive,
       count(*) filter(where path_id='offensive-security')::int as offensive,
       count(*) filter(where id='room-46')::int as room_46,
       count(*) filter(where id='room-47')::int as room_47
from public.rooms;

-- No progress rows may be orphaned, and no duplicate per-version progress key.
select 'room_progress' as source,count(*)::int as orphan_count
from public.room_progress rp left join public.rooms r on r.id=rp.room_id where r.id is null
union all
select 'task_progress',count(*)::int
from public.task_progress tp left join public.rooms r on r.id=tp.room_id where r.id is null;
select curriculum_id,room_id,user_id,count(*)::int as duplicates
from public.room_progress
group by curriculum_id,room_id,user_id having count(*)>1;
select curriculum_id,room_id,user_id,task_index,count(*)::int as duplicates
from public.task_progress
group by curriculum_id,room_id,user_id,task_index having count(*)>1;

-- Existing earned achievement rows remain unique and are not rewritten.
select user_id,achievement_id,count(*)::int as duplicates
from public.user_achievements
group by user_id,achievement_id having count(*)>1;
select conname,pg_get_constraintdef(oid) as definition
from pg_constraint
where conrelid='public.user_achievements'::regclass
  and contype='u';

-- Graduation logic must explicitly require ten current Pre-Security completions.
select position('pre_security_total=10' in pg_get_functiondef('public.evaluate_user_milestones(uuid)'::regprocedure))>0
       and position('pre_security_completed=10' in pg_get_functiondef('public.evaluate_user_milestones(uuid)'::regprocedure))>0
       as requires_all_ten_current_pre_security_rooms;


select count(*)::int as legacy_task_rows,
       md5(coalesce(string_agg(
         user_id::text || ':' || room_id || ':' || task_index::text || ':' || is_completed::text || ':' || completed_at::text,
         '|' order by user_id,room_id,task_index
       ),'')) as legacy_task_progress_checksum
from public.task_progress where curriculum_id='calion-legacy-45-v1';
