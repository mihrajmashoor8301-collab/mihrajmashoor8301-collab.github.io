-- READ ONLY. Capture this report before any approved reconciliation.
-- Fingerprints contain no learner identifiers; retain output privately for comparison.
select count(*)::int as profile_count,
       coalesce(sum(total_xp),0)::bigint as xp_sum,
       md5(coalesce(string_agg(id::text || ':' || total_xp::text, '|' order by id),'')) as profile_xp_fingerprint
from public.profiles;

select count(*)::int as room_count,
       md5(coalesce(string_agg(concat_ws(E'\x1f',id,path_id,level_number::text,title,
         coalesce(description,''),xp_reward::text,total_questions::text,display_order::text,
         is_active::text,created_at::text),'|' order by id),'')) as room_metadata_fingerprint
from public.rooms;

select count(*)::int as path_count,
       md5(coalesce(string_agg(concat_ws(E'\x1f',id,title,description,coalesce(badge_icon,''),
         display_order::text,is_active::text,created_at::text),'|' order by id),'')) as path_metadata_fingerprint
from public.learning_paths;

select count(*)::int as room_progress_count,
       md5(coalesce(string_agg(concat_ws(E'\x1f',user_id::text,room_id,status,progress_pct::text,
         questions_solved::text,started_at::text,coalesce(completed_at::text,''),last_accessed_at::text),
         '|' order by user_id,room_id),'')) as room_progress_fingerprint
from public.room_progress;

select count(*)::int as task_progress_count,
       md5(coalesce(string_agg(concat_ws(E'\x1f',user_id::text,room_id,task_index::text,
         is_completed::text,completed_at::text),'|' order by user_id,room_id,task_index),'')) as task_progress_fingerprint
from public.task_progress;

select count(*)::int as relevant_column_count,
       md5(coalesce(string_agg(concat_ws(E'\x1f',table_name,ordinal_position::text,column_name,
         data_type,is_nullable,coalesce(column_default,'')),'|' order by table_name,ordinal_position),'')) as schema_column_fingerprint
from information_schema.columns
where table_schema='public' and table_name in
  ('learning_paths','rooms','room_progress','task_progress','achievements');

with objects as (
  select 'constraint'::text as kind,conrelid::regclass::text as relation,conname as name,
         pg_get_constraintdef(oid) as definition
  from pg_constraint where connamespace='public'::regnamespace and contype<>'n' and conrelid in
    ('public.learning_paths'::regclass,'public.rooms'::regclass,'public.room_progress'::regclass,
     'public.task_progress'::regclass,'public.achievements'::regclass)
  union all
  select 'index',schemaname||'.'||tablename,indexname,indexdef
  from pg_indexes where schemaname='public' and tablename in
    ('learning_paths','rooms','room_progress','task_progress','achievements')
)
select count(*)::int as constraint_index_count,
       md5(coalesce(string_agg(concat_ws(E'\x1f',kind,relation,name,definition),
         '|' order by kind,relation,name),'')) as constraint_index_fingerprint
from objects;

select tgname,tgenabled,pg_get_triggerdef(oid) as definition
from pg_trigger where tgrelid='public.room_progress'::regclass and not tgisinternal
order by tgname;

select p.proname,md5(p.prosrc) as source_fingerprint,
       md5(pg_get_functiondef(p.oid)) as definition_fingerprint
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in
  ('protect_room_completion','on_room_progress_update','evaluate_user_milestones')
order by p.proname;

select count(*)::int as achievement_count,
       md5(coalesce(string_agg(concat_ws(E'\x1f',id,title,description,icon,category,
         required_count::text,xp_bonus::text),'|' order by id),'')) as achievement_fingerprint
from public.achievements;
select id,title,description,icon,category,required_count,xp_bonus
from public.achievements where id='pre-security-graduate';
