-- Single-statement, read-only release snapshot. Review every field before
-- reconciling migration history or applying either release migration.
select jsonb_build_object(
  'project',current_database(),
  'pgcrypto_schema',(select n.nspname from pg_extension e join pg_namespace n on n.oid=e.extnamespace where e.extname='pgcrypto'),
  'tables',(select coalesce(jsonb_agg(jsonb_build_object('name',c.relname,'rls',c.relrowsecurity) order by c.relname),'[]'::jsonb)
    from pg_class c join pg_namespace n on n.oid=c.relnamespace
    where n.nspname='public' and c.relname in ('profiles','learning_paths','rooms','room_progress','labs','lab_progress','task_progress','achievements','user_achievements','user_activity','lab_secrets')),
  'profiles',(select jsonb_build_object('count',count(*),'xp_sum',coalesce(sum(total_xp),0),
      'xp_fingerprint',md5(coalesce(string_agg(id::text||':'||total_xp::text,'|' order by id),''))) from public.profiles),
  'rooms',(select jsonb_build_object('count',count(*),
      'fingerprint',md5(coalesce(string_agg(concat_ws(E'\x1f',id,path_id,level_number::text,title,coalesce(description,''),xp_reward::text,total_questions::text,display_order::text,is_active::text,created_at::text),'|' order by id),'')),
      'by_path',(select coalesce(jsonb_object_agg(path_id,n),'{}'::jsonb) from (select path_id,count(*) n from public.rooms group by path_id) p)) from public.rooms),
  'paths',(select jsonb_build_object('count',count(*),
      'fingerprint',md5(coalesce(string_agg(concat_ws(E'\x1f',id,title,description,coalesce(badge_icon,''),display_order::text,is_active::text,created_at::text),'|' order by id),''))) from public.learning_paths),
  'room_progress',(select jsonb_build_object('count',count(*),
      'fingerprint',md5(coalesce(string_agg(concat_ws(E'\x1f',user_id::text,room_id,status,progress_pct::text,questions_solved::text,started_at::text,coalesce(completed_at::text,''),last_accessed_at::text),'|' order by user_id,room_id),'')),
      'by_status',(select coalesce(jsonb_object_agg(status,n),'{}'::jsonb) from (select status,count(*) n from public.room_progress group by status) s),
      'versioned',exists(select 1 from information_schema.columns where table_schema='public' and table_name='room_progress' and column_name='curriculum_id')) from public.room_progress),
  'task_progress_count',(select count(*) from public.task_progress),
  'lab_catalog_count',(select count(*) from public.labs),
  'lab_secrets_count',(select count(*) from public.lab_secrets),
  'achievements',(select jsonb_build_object('count',count(*),
      'fingerprint',md5(coalesce(string_agg(concat_ws(E'\x1f',id,title,description,icon,category,required_count::text,xp_bonus::text),'|' order by id),'')),
      'pre_security_graduate_required_count',max(required_count) filter(where id='pre-security-graduate')) from public.achievements),
  'room_progress_triggers',(select coalesce(jsonb_agg(jsonb_build_object('name',tgname,'enabled',tgenabled,'definition',pg_get_triggerdef(oid)) order by tgname),'[]'::jsonb)
    from pg_trigger where tgrelid='public.room_progress'::regclass and not tgisinternal),
  'milestone_function',(select jsonb_build_object('source_fingerprint',md5(p.prosrc),'security_definer',p.prosecdef,'config',p.proconfig,
      'anon_execute',has_function_privilege('anon',p.oid,'execute'),
      'authenticated_execute',has_function_privilege('authenticated',p.oid,'execute'),
      'public_execute',has_function_privilege('public',p.oid,'execute'))
    from pg_proc p where p.oid='public.evaluate_user_milestones(uuid)'::regprocedure),
  'client_write_guards',jsonb_build_object(
      'authenticated_can_update_total_xp',has_column_privilege('authenticated','public.profiles','total_xp','update'),
      'anon_can_insert_achievements',has_table_privilege('anon','public.user_achievements','insert'),
      'authenticated_can_insert_achievements',has_table_privilege('authenticated','public.user_achievements','insert'),
      'anon_can_read_lab_secrets',has_table_privilege('anon','public.lab_secrets','select'),
      'authenticated_can_read_lab_secrets',has_table_privilege('authenticated','public.lab_secrets','select'))
) as release_preflight;
