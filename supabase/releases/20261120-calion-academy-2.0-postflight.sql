-- Single-statement, read-only post-deployment validation. Zero mismatch counts
-- and the exact four-path distribution are required for release sign-off.
with expected_rooms(id,path_id,title) as (values
  ('room-01','pre-security','Introduction to Computers'),('room-02','pre-security','How the Internet Works'),
  ('room-03','pre-security','Networking Fundamentals'),('room-04','pre-security','Network Protocols and Ports'),
  ('room-05','pre-security','Linux Fundamentals'),('room-06','pre-security','Windows Fundamentals'),
  ('room-07','pre-security','Command-Line Fundamentals'),('room-08','pre-security','Web Fundamentals'),
  ('room-09','pre-security','Introduction to Virtualization'),('room-10','pre-security','Introduction to Cybersecurity'),
  ('room-11','cyber-security','Security Fundamentals'),('room-12','cyber-security','CIA Triad and Security Principles'),
  ('room-13','cyber-security','Threats, Vulnerabilities and Risks'),('room-14','cyber-security','Authentication and Access Control'),
  ('room-15','cyber-security','Cryptography Fundamentals'),('room-16','cyber-security','Malware and Attack Concepts'),
  ('room-17','cyber-security','Security Architecture'),('room-18','cyber-security','Vulnerability Management'),
  ('room-19','cyber-security','Security Monitoring Fundamentals'),('room-20','cyber-security','Introduction to Incident Response'),
  ('room-21','defensive-security','Introduction to Blue Team Operations'),('room-22','defensive-security','Security Operations Centre Fundamentals'),
  ('room-23','defensive-security','Log Analysis Fundamentals'),('room-24','defensive-security','Windows Event Logs'),
  ('room-25','defensive-security','Linux Log Analysis'),('room-26','defensive-security','Network Traffic Analysis'),
  ('room-27','defensive-security','SIEM Fundamentals'),('room-28','defensive-security','Threat Intelligence'),
  ('room-29','defensive-security','Incident Detection and Response'),('room-30','defensive-security','Digital Forensics Fundamentals'),
  ('room-31','defensive-security','Endpoint Security'),('room-32','defensive-security','Defensive Security Capstone'),
  ('room-33','offensive-security','Introduction to Ethical Hacking'),('room-34','offensive-security','Rules of Engagement and Legal Boundaries'),
  ('room-35','offensive-security','Reconnaissance Fundamentals'),('room-36','offensive-security','Network Enumeration'),
  ('room-37','offensive-security','Service Enumeration'),('room-38','offensive-security','Web Application Fundamentals'),
  ('room-39','offensive-security','OWASP Top 10'),('room-40','offensive-security','Web Vulnerability Assessment'),
  ('room-41','offensive-security','Authentication Security Testing'),('room-42','offensive-security','Vulnerability Validation in a Lab'),
  ('room-43','offensive-security','Linux Privilege Escalation Fundamentals'),('room-44','offensive-security','Windows Privilege Escalation Fundamentals'),
  ('room-45','offensive-security','Exploitation Concepts in Controlled Labs'),('room-46','offensive-security','Reporting and Remediation'),
  ('room-47','offensive-security','Offensive Security Capstone')
), room_mismatches as (
  select e.id from expected_rooms e left join public.rooms r on r.id=e.id
  where r.id is null or r.path_id<>e.path_id or r.title<>e.title
), path_counts as (
  select jsonb_object_agg(path_id,room_count) as counts from (
    select path_id,count(*) as room_count from public.rooms where is_active group by path_id
  ) p
), xp_mismatches as (
  select p.id from public.profiles p
  join calion_private.xp_opening_balances b on b.user_id=p.id
  left join calion_private.xp_events e on e.user_id=p.id
  group by p.id,p.total_xp,b.opening_xp
  having p.total_xp<>b.opening_xp+coalesce(sum(e.xp_amount),0)
), event_duplicates as (
  select user_id,event_key from calion_private.xp_events group by user_id,event_key having count(*)>1
), legacy_room_awards as (
  select rp.user_id,rp.room_id from public.room_progress rp
  join calion_private.xp_events e on e.user_id=rp.user_id and e.room_id=rp.room_id
    and e.curriculum_id=rp.curriculum_id and e.event_type='room'
  where rp.curriculum_id='calion-legacy-45-v1'
), invalid_room_awards as (
  select r.event_id from calion_private.xp_events r
  join public.rooms room on room.id=r.room_id
  left join calion_private.xp_events q on q.user_id=r.user_id and q.room_id=r.room_id
    and q.curriculum_id=r.curriculum_id and q.event_type='question'
  where r.event_type='room'
  group by r.event_id,room.total_questions having count(q.event_id)<room.total_questions
)
select jsonb_build_object(
  'room_count',(select count(*) from public.rooms where is_active),
  'path_counts',(select counts from path_counts),
  'room_mismatch_count',(select count(*) from room_mismatches),
  'room_46_present',exists(select 1 from public.rooms where id='room-46' and is_active),
  'room_47_present',exists(select 1 from public.rooms where id='room-47' and is_active),
  'pre_security_graduation_required_count',(select required_count from public.achievements where id='pre-security-graduate'),
  'profile_count',(select count(*) from public.profiles),
  'opening_balance_count',(select count(*) from calion_private.xp_opening_balances),
  'profile_xp_mismatch_count',(select count(*) from xp_mismatches),
  'xp_event_count',(select count(*) from calion_private.xp_events),
  'duplicate_event_key_count',(select count(*) from event_duplicates),
  'invalid_event_count',(select count(*) from calion_private.xp_events where curriculum_id<>'calion-academy-47-v1' or (event_type='room' and xp_amount<>50) or (event_type='question' and xp_amount<>25) or (event_type='lab' and xp_amount<>75)),
  'unsupported_room_award_count',(select count(*) from invalid_room_awards),
  'legacy_room_award_count',(select count(*) from legacy_room_awards),
  'answer_key_count',(select count(*) from calion_private.question_answer_keys),
  'legacy_room_progress_count',(select count(*) from public.room_progress where curriculum_id='calion-legacy-45-v1'),
  'current_room_progress_count',(select count(*) from public.room_progress where curriculum_id='calion-academy-47-v1'),
  'profiles_missing_opening_balance',(select count(*) from public.profiles p left join calion_private.xp_opening_balances b on b.user_id=p.id where b.user_id is null),
  'private_tables_without_rls',(select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='calion_private' and c.relkind='r' and not c.relrowsecurity),
  'anon_can_execute_answer_rpc',has_function_privilege('anon','public.submit_calion_answer(text,text,text,text)','execute'),
  'authenticated_can_execute_answer_rpc',has_function_privilege('authenticated','public.submit_calion_answer(text,text,text,text)','execute'),
  'anon_can_execute_milestone_function',has_function_privilege('anon','public.evaluate_user_milestones(uuid)','execute'),
  'authenticated_can_execute_milestone_function',has_function_privilege('authenticated','public.evaluate_user_milestones(uuid)','execute'),
  'public_can_execute_milestone_function',has_function_privilege('public','public.evaluate_user_milestones(uuid)','execute')
) as release_postflight;
