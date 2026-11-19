-- Proposed local implementation only. Depends on 202611200001 curriculum versioning.
-- No existing XP, progress, or achievement is backfilled or recalculated.
begin;

-- Freeze all sources/profile totals while capturing the opening balance and legacy exclusions.
lock table public.profiles, public.room_progress, public.lab_progress,
  public.user_achievements, public.achievements, public.rooms
  in share row exclusive mode;

create temporary table calion_xp_profile_rollout_snapshot on commit drop as
select id,total_xp from public.profiles;

do $$
begin
  if to_regclass('public.rooms') is null or to_regclass('public.room_progress') is null
     or to_regclass('public.lab_progress') is null or to_regclass('public.lab_secrets') is null
     or to_regclass('public.profiles') is null or to_regclass('public.achievements') is null
     or to_regclass('public.user_achievements') is null then
    raise exception 'Required CALION tables are missing';
  end if;
  if not exists (select 1 from information_schema.columns where table_schema='public' and table_name='room_progress' and column_name='curriculum_id') then
    raise exception 'Apply and validate curriculum versioning before the XP ledger';
  end if;
  if to_regclass('calion_private.xp_events') is not null then
    raise exception 'XP ledger already exists; inspect the existing rollout instead of replaying';
  end if;
  if (select count(*) from public.rooms where is_active and id between 'room-01' and 'room-47')<>47 then
    raise exception 'Expected all 47 current rooms before loading answer keys';
  end if;
end $$;

create schema calion_private;
revoke all on schema calion_private from public, anon, authenticated;

create table calion_private.xp_opening_balances (
  user_id uuid primary key,
  opening_xp bigint not null check (opening_xp >= 0),
  captured_at timestamptz not null default clock_timestamp()
);
-- This is a read-only snapshot. In particular, it does not normalize profiles.total_xp.
insert into calion_private.xp_opening_balances(user_id, opening_xp)
select id, total_xp from public.profiles
on conflict (user_id) do nothing;

create table calion_private.xp_legacy_labs (
  user_id uuid not null,
  lab_id text not null,
  captured_at timestamptz not null default clock_timestamp(),
  primary key(user_id, lab_id)
);
insert into calion_private.xp_legacy_labs(user_id, lab_id)
select user_id, lab_id from public.lab_progress
where status='completed' or flag_verified=true
on conflict do nothing;

create table calion_private.xp_legacy_achievements (
  user_id uuid not null,
  achievement_id text not null,
  captured_at timestamptz not null default clock_timestamp(),
  primary key(user_id, achievement_id)
);
insert into calion_private.xp_legacy_achievements(user_id, achievement_id)
select user_id, achievement_id from public.user_achievements
on conflict do nothing;

create table calion_private.xp_events (
  event_id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  event_type text not null check (event_type in ('room','question','lab','achievement')),
  curriculum_id text not null check (curriculum_id='calion-academy-47-v1'),
  room_id text,
  source_id text not null,
  event_key text not null,
  xp_amount integer not null check (xp_amount >= 0),
  created_at timestamptz not null default clock_timestamp(),
  unique(user_id, event_key),
  check (
    (event_type='room' and room_id is not null and source_id=room_id and xp_amount=50) or
    (event_type='question' and room_id is not null and xp_amount=25) or
    (event_type='lab' and room_id is null and xp_amount=75) or
    (event_type='achievement' and room_id is null)
  )
);
create index xp_events_user_type_idx on calion_private.xp_events(user_id,event_type,curriculum_id);
create index xp_events_room_idx on calion_private.xp_events(user_id,curriculum_id,room_id,event_type);

create table calion_private.question_answer_keys (
  curriculum_id text not null check (curriculum_id='calion-academy-47-v1'),
  room_id text not null references public.rooms(id),
  question_id text not null,
  answer_salt text not null,
  answer_digest bytea not null,
  case_sensitive boolean not null,
  trim_whitespace boolean not null,
  primary key(curriculum_id,room_id,question_id,answer_digest)
);
create index question_answer_keys_question_idx on calion_private.question_answer_keys(curriculum_id,room_id,question_id);

create table calion_private.question_attempt_limits (
  user_id uuid not null,
  room_id text not null,
  question_id text not null,
  window_started_at timestamptz not null,
  attempt_count integer not null check (attempt_count between 0 and 10),
  primary key(user_id,room_id,question_id)
);

-- Guest answer checks never award XP. Rate limits use a keyed hash of the
-- gateway-provided client IP, so the raw address is not persisted.
create table calion_private.guest_question_attempt_limits (
  client_fingerprint bytea not null,
  room_id text not null,
  question_id text not null,
  window_started_at timestamptz not null,
  attempt_count integer not null check (attempt_count between 0 and 10),
  primary key(client_fingerprint,room_id,question_id)
);
create table calion_private.guest_attempt_fingerprint_secret (
  singleton boolean primary key default true check(singleton),
  secret bytea not null
);
insert into calion_private.guest_attempt_fingerprint_secret(singleton,secret)
values(true,extensions.gen_random_bytes(32));

alter table calion_private.xp_events enable row level security;
alter table calion_private.xp_opening_balances enable row level security;
alter table calion_private.xp_legacy_labs enable row level security;
alter table calion_private.xp_legacy_achievements enable row level security;
alter table calion_private.question_answer_keys enable row level security;
alter table calion_private.question_attempt_limits enable row level security;
alter table calion_private.guest_question_attempt_limits enable row level security;
alter table calion_private.guest_attempt_fingerprint_secret enable row level security;
revoke all on all tables in schema calion_private from public, anon, authenticated;
revoke all on all sequences in schema calion_private from public, anon, authenticated;

-- Guard against privileged application mistakes as well as ordinary client writes.
create function calion_private.reject_xp_event_mutation()
returns trigger language plpgsql set search_path=pg_catalog,calion_private as $$
begin
  raise exception 'XP events are append-only';
end;
$$;
create trigger xp_events_no_update_delete before update or delete on calion_private.xp_events
for each row execute function calion_private.reject_xp_event_mutation();
create function calion_private.reject_xp_event_truncate()
returns trigger language plpgsql set search_path=pg_catalog,calion_private as $$
begin
  raise exception 'XP events are append-only';
end;
$$;
create trigger xp_events_no_truncate before truncate on calion_private.xp_events
for each statement execute function calion_private.reject_xp_event_truncate();

-- Used only by the public RPCs below; callers cannot supply an award amount.
create function calion_private.append_xp_event(
  p_user_id uuid, p_event_type text, p_room_id text, p_source_id text,
  p_event_key text, p_xp_amount integer
) returns table(event_id uuid, was_inserted boolean, total_xp bigint)
language plpgsql security definer set search_path=pg_catalog,public,calion_private as $$
declare
  v_event_id uuid;
  v_inserted boolean := false;
  v_amount integer;
  v_total bigint;
begin
  if p_user_id is null or p_event_key is null or length(p_event_key)>300 then
    raise exception 'Invalid XP event identity';
  end if;
  if p_event_type='room' then
    if p_xp_amount<>50 or p_room_id is null or p_source_id<>p_room_id then raise exception 'Invalid room award'; end if;
  elsif p_event_type='question' then
    if p_xp_amount<>25 or p_room_id is null then raise exception 'Invalid question award'; end if;
  elsif p_event_type='lab' then
    if p_xp_amount<>75 or p_room_id is not null then raise exception 'Invalid lab award'; end if;
  elsif p_event_type='achievement' then
    if p_room_id is not null or not exists(select 1 from public.achievements where id=p_source_id and xp_bonus=p_xp_amount) then
      raise exception 'Invalid achievement award';
    end if;
  else
    raise exception 'Unsupported XP event type';
  end if;

  -- Lock profile before snapshot/update; concurrent distinct awards serialize here.
  select p.total_xp into v_total from public.profiles p where p.id=p_user_id for update;
  if not found then raise exception 'Learner profile does not exist'; end if;
  insert into calion_private.xp_opening_balances(user_id,opening_xp)
  values(p_user_id,v_total) on conflict(user_id) do nothing;

  insert into calion_private.xp_events as inserted_event(user_id,event_type,curriculum_id,room_id,source_id,event_key,xp_amount)
  values(p_user_id,p_event_type,'calion-academy-47-v1',p_room_id,p_source_id,p_event_key,p_xp_amount)
  on conflict(user_id,event_key) do nothing
  returning inserted_event.event_id into v_event_id;
  v_inserted := v_event_id is not null;
  if v_inserted then
    v_amount := p_xp_amount;
    update public.profiles p set total_xp=p.total_xp+v_amount, updated_at=now()
    where p.id=p_user_id returning p.total_xp into v_total;
  else
    select e.event_id,e.xp_amount into v_event_id,v_amount from calion_private.xp_events e
    where e.user_id=p_user_id and e.event_key=p_event_key;
    if v_amount<>p_xp_amount then raise exception 'Idempotency key reused with a different award'; end if;
    select p.total_xp into v_total from public.profiles p where p.id=p_user_id;
  end if;
  return query select v_event_id,v_inserted,v_total;
end;
$$;

create function calion_private.award_achievement(p_user_id uuid,p_achievement_id text)
returns void language plpgsql security definer set search_path=pg_catalog,public,calion_private as $$
declare v_bonus integer; v_added boolean := false;
begin
  if exists(select 1 from calion_private.xp_legacy_achievements where user_id=p_user_id and achievement_id=p_achievement_id) then return; end if;
  insert into public.user_achievements(user_id,achievement_id)
  values(p_user_id,p_achievement_id) on conflict(user_id,achievement_id) do nothing
  returning true into v_added;
  if coalesce(v_added,false) then
    select xp_bonus into v_bonus from public.achievements where id=p_achievement_id;
    if coalesce(v_bonus,0)>0 then
      perform * from calion_private.append_xp_event(
        p_user_id,'achievement',null,p_achievement_id,
        'achievement:calion-academy-47-v1:'||p_achievement_id,v_bonus
      );
    end if;
  end if;
end;
$$;

-- Do not let a stale in-progress client upsert downgrade a room completed by the
-- authoritative ledger while that upsert was in flight.
create function calion_private.preserve_verified_room_completion()
returns trigger language plpgsql security definer set search_path=pg_catalog,public,calion_private as $$
declare v_question_ids jsonb;
begin
  if exists(select 1 from calion_private.xp_events e where e.user_id=new.user_id
      and e.event_type='room' and e.curriculum_id='calion-academy-47-v1' and e.room_id=new.room_id) then
    select coalesce(jsonb_agg(e.source_id order by e.source_id),'[]'::jsonb) into v_question_ids
    from calion_private.xp_events e where e.user_id=new.user_id and e.event_type='question'
      and e.curriculum_id='calion-academy-47-v1' and e.room_id=new.room_id;
    new.curriculum_id:='calion-academy-47-v1';
    new.status:='completed';
    new.progress_pct:=100;
    new.questions_solved:=v_question_ids;
    new.completed_at:=coalesce(case when tg_op='UPDATE' then old.completed_at end,new.completed_at,now());
  end if;
  return new;
end;
$$;
create trigger trg_calion_preserve_verified_completion
before insert or update on public.room_progress
for each row execute function calion_private.preserve_verified_room_completion();

-- Milestones are based on ledger evidence, never client-writable progress rows.
create or replace function public.evaluate_user_milestones(target_user_id uuid)
returns void language plpgsql security definer set search_path=pg_catalog,public,calion_private as $$
declare v_rooms integer; v_pre_total integer; v_pre_done integer; v_labs integer;
begin
  if target_user_id is null then return; end if;
  select count(*) into v_rooms from calion_private.xp_events
  where user_id=target_user_id and event_type='room' and curriculum_id='calion-academy-47-v1';
  if v_rooms>=1 then perform calion_private.award_achievement(target_user_id,'first-steps'); end if;
  if v_rooms>=5 then perform calion_private.award_achievement(target_user_id,'explorer'); end if;
  if v_rooms>=10 then perform calion_private.award_achievement(target_user_id,'dedicated-learner'); end if;
  if v_rooms>=25 then perform calion_private.award_achievement(target_user_id,'security-enthusiast'); end if;

  select count(*) into v_pre_total from public.rooms where path_id='pre-security' and is_active;
  select count(*) into v_pre_done from calion_private.xp_events e join public.rooms r on r.id=e.room_id
  where e.user_id=target_user_id and e.event_type='room' and e.curriculum_id='calion-academy-47-v1'
    and r.path_id='pre-security' and r.is_active;
  if v_pre_total=10 and v_pre_done=10 then perform calion_private.award_achievement(target_user_id,'pre-security-graduate'); end if;

  select count(*) into v_labs from calion_private.xp_events
  where user_id=target_user_id and event_type='lab' and curriculum_id='calion-academy-47-v1';
  if v_labs>=1 then perform calion_private.award_achievement(target_user_id,'lab-practitioner'); end if;
  if v_labs>=5 then perform calion_private.award_achievement(target_user_id,'lab-specialist'); end if;
  if v_labs>=13 then perform calion_private.award_achievement(target_user_id,'lab-master'); end if;
end;
$$;
revoke all on function public.evaluate_user_milestones(uuid) from public,anon,authenticated;

-- Read model used by authenticated clients. It exposes only the caller's accepted
-- ledger events, never arbitrary user IDs or answer keys.
create function public.get_calion_xp_state()
returns jsonb language plpgsql security definer set search_path=pg_catalog,public,calion_private as $$
declare v_user uuid; v_total bigint; v_rooms jsonb; v_questions jsonb; v_labs jsonb;
begin
  v_user:=auth.uid();
  if v_user is null then return jsonb_build_object('success',false,'code','auth_required'); end if;
  select p.total_xp into v_total from public.profiles p where p.id=v_user;
  select coalesce(jsonb_agg(room_id order by room_id),'[]'::jsonb) into v_rooms
  from calion_private.xp_events where user_id=v_user and event_type='room' and curriculum_id='calion-academy-47-v1';
  select coalesce(jsonb_agg(jsonb_build_object('room_id',room_id,'question_id',source_id) order by room_id,source_id),'[]'::jsonb) into v_questions
  from calion_private.xp_events where user_id=v_user and event_type='question' and curriculum_id='calion-academy-47-v1';
  select coalesce(jsonb_agg(lab_id order by lab_id),'[]'::jsonb) into v_labs
  from public.lab_progress where user_id=v_user and (status='completed' or flag_verified=true);
  return jsonb_build_object('success',true,'total_xp',coalesce(v_total,0),
    'rooms_completed',v_rooms,'questions_solved',v_questions,'labs_completed',v_labs);
end;
$$;

create function calion_private.finalize_current_room(p_user_id uuid,p_room_id text)
returns table(room_completed boolean,room_xp_awarded integer,room_event_id uuid,total_xp bigint)
language plpgsql security definer set search_path=pg_catalog,public,calion_private as $$
  declare v_required integer; v_count integer; v_ids jsonb; v_event_id uuid; v_total bigint; v_inserted boolean;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text||':'||p_room_id,0));
  select total_questions into v_required from public.rooms
  where id=p_room_id and is_active and path_id in ('pre-security','cyber-security','defensive-security','offensive-security');
  if v_required is null then raise exception 'Unknown current room'; end if;
  select count(*),coalesce(jsonb_agg(source_id order by source_id),'[]'::jsonb) into v_count,v_ids
  from calion_private.xp_events where user_id=p_user_id and event_type='question'
    and curriculum_id='calion-academy-47-v1' and room_id=p_room_id;
  if v_count<v_required then
    select p.total_xp into v_total from public.profiles p where p.id=p_user_id;
    return query select false,0,null::uuid,v_total; return;
  end if;
  select e.event_id into v_event_id from calion_private.xp_events e
  where e.user_id=p_user_id and e.event_type='room' and e.curriculum_id='calion-academy-47-v1'
    and e.event_key='room:calion-academy-47-v1:'||p_room_id;
  if v_event_id is null then
    select a.event_id,a.was_inserted,a.total_xp into v_event_id,v_inserted,v_total
    from calion_private.append_xp_event(p_user_id,'room',p_room_id,p_room_id,
      'room:calion-academy-47-v1:'||p_room_id,50) a;
  else select p.total_xp into v_total from public.profiles p where p.id=p_user_id; end if;

  insert into public.room_progress(user_id,room_id,curriculum_id,status,progress_pct,questions_solved,completed_at,last_accessed_at)
  values(p_user_id,p_room_id,'calion-academy-47-v1','completed',100,v_ids,now(),now())
  on conflict(user_id,room_id,curriculum_id) do update set
    status='completed',progress_pct=100,questions_solved=excluded.questions_solved,
    completed_at=coalesce(public.room_progress.completed_at,excluded.completed_at),last_accessed_at=now();
  perform public.evaluate_user_milestones(p_user_id);
  select p.total_xp into v_total from public.profiles p where p.id=p_user_id;
  return query select true,case when coalesce(v_inserted,false) then 50 else 0 end,v_event_id,v_total;
end;
$$;

create function public.submit_calion_answer(
  p_curriculum_id text,p_room_id text,p_question_id text,p_answer text
) returns jsonb language plpgsql security definer set search_path=pg_catalog,public,calion_private,extensions as $$
declare v_user uuid; v_correct boolean := false; v_event uuid; v_added boolean; v_total bigint; v_done boolean; v_room_awarded integer;
        v_attempt_count integer; v_window_started timestamptz;
begin
  v_user:=auth.uid();
  if v_user is null then return jsonb_build_object('success',false,'code','auth_required'); end if;
  if p_curriculum_id is distinct from 'calion-academy-47-v1'
     or p_room_id !~ '^room-(0[1-9]|[1-3][0-9]|4[0-7])$'
     or p_question_id !~ '^q-[0-9]{2}-[0-9]+$'
     or p_answer is null or length(p_answer)>512 then
    return jsonb_build_object('success',false,'code','invalid_input');
  end if;
  if not exists(select 1 from calion_private.question_answer_keys k where k.curriculum_id=p_curriculum_id
      and k.room_id=p_room_id and k.question_id=p_question_id) then
    return jsonb_build_object('success',false,'correct',false,'code','incorrect');
  end if;
  select event_id into v_event from calion_private.xp_events
  where user_id=v_user and event_type='question' and curriculum_id=p_curriculum_id
    and room_id=p_room_id and source_id=p_question_id;
  if v_event is not null then
    select p.total_xp into v_total from public.profiles p where p.id=v_user;
    return jsonb_build_object('success',true,'correct',true,'xp_awarded',0,'event_id',v_event,
      'room_completed',exists(select 1 from calion_private.xp_events where user_id=v_user
        and event_type='room' and room_id=p_room_id and curriculum_id=p_curriculum_id),
      'room_xp_awarded',0,'total_xp',v_total);
  end if;
  insert into calion_private.question_attempt_limits(user_id,room_id,question_id,window_started_at,attempt_count)
  values(v_user,p_room_id,p_question_id,clock_timestamp(),0) on conflict(user_id,room_id,question_id) do nothing;
  select attempt_count,window_started_at into v_attempt_count,v_window_started
  from calion_private.question_attempt_limits where user_id=v_user and room_id=p_room_id and question_id=p_question_id for update;
  if v_window_started < clock_timestamp()-interval '1 minute' then
    update calion_private.question_attempt_limits set window_started_at=clock_timestamp(),attempt_count=0
    where user_id=v_user and room_id=p_room_id and question_id=p_question_id;
    v_attempt_count:=0;
  end if;
  if v_attempt_count>=10 then return jsonb_build_object('success',false,'correct',false,'code','rate_limited'); end if;
  update calion_private.question_attempt_limits set attempt_count=attempt_count+1
  where user_id=v_user and room_id=p_room_id and question_id=p_question_id;
  -- Compare only inside the private database table; never return an expected answer.
  select exists(
    select 1 from calion_private.question_answer_keys k
    where k.curriculum_id=p_curriculum_id and k.room_id=p_room_id and k.question_id=p_question_id
      and k.answer_digest=digest(convert_to(
        (case when k.trim_whitespace then btrim(case when k.case_sensitive then p_answer else lower(p_answer) end)
              else (case when k.case_sensitive then p_answer else lower(p_answer) end) end)||k.answer_salt,'UTF8'),'sha256')
  ) into v_correct;
  if not v_correct then return jsonb_build_object('success',false,'correct',false,'code','incorrect'); end if;

  select a.event_id,a.was_inserted,a.total_xp into v_event,v_added,v_total
  from calion_private.append_xp_event(v_user,'question',p_room_id,p_question_id,
    'question:calion-academy-47-v1:'||p_room_id||':'||p_question_id,25) a;
  select f.room_completed,f.room_xp_awarded,f.total_xp into v_done,v_room_awarded,v_total
  from calion_private.finalize_current_room(v_user,p_room_id) f;
  perform public.evaluate_user_milestones(v_user);
  select p.total_xp into v_total from public.profiles p where p.id=v_user;
  return jsonb_build_object('success',true,'correct',true,'xp_awarded',case when v_added then 25 else 0 end,
    'room_xp_awarded',coalesce(v_room_awarded,0),'event_id',v_event,
    'room_completed',coalesce(v_done,false),'total_xp',v_total);
end;
$$;

-- Public guest checks retain the learning flow but never create progress, events,
-- achievements, or XP. Only a correct/incorrect result crosses the API boundary.
create function public.verify_calion_answer_guest(
  p_curriculum_id text,p_room_id text,p_question_id text,p_answer text
) returns jsonb language plpgsql security definer
set search_path=pg_catalog,public,calion_private,extensions,auth as $$
declare
  v_headers jsonb;
  v_ip text;
  v_fingerprint bytea;
  v_attempt_count integer;
  v_window_started timestamptz;
  v_correct boolean := false;
begin
  if p_curriculum_id is distinct from 'calion-academy-47-v1'
     or p_room_id !~ '^room-(0[1-9]|[1-3][0-9]|4[0-7])$'
     or p_question_id !~ '^q-[0-9]{2}-[0-9]+$'
     or p_answer is null or length(p_answer)>512 then
    return jsonb_build_object('success',false,'code','invalid_input');
  end if;
  if not exists(select 1 from calion_private.question_answer_keys k where k.curriculum_id=p_curriculum_id
      and k.room_id=p_room_id and k.question_id=p_question_id) then
    return jsonb_build_object('success',false,'correct',false,'code','incorrect');
  end if;

  begin
    v_headers:=nullif(current_setting('request.headers',true),'')::jsonb;
    v_ip:=coalesce(v_headers->>'cf-connecting-ip',v_headers->>'x-real-ip',
      split_part(coalesce(v_headers->>'x-forwarded-for',''),',',1));
    v_ip:=host(btrim(v_ip)::inet);
  exception when others then
    return jsonb_build_object('success',false,'correct',false,'code','verification_unavailable');
  end;
  select extensions.digest(convert_to(v_ip,'UTF8')||s.secret,'sha256') into v_fingerprint
  from calion_private.guest_attempt_fingerprint_secret s where s.singleton;
  if v_fingerprint is null then
    return jsonb_build_object('success',false,'correct',false,'code','verification_unavailable');
  end if;

  insert into calion_private.guest_question_attempt_limits(client_fingerprint,room_id,question_id,window_started_at,attempt_count)
  values(v_fingerprint,p_room_id,p_question_id,clock_timestamp(),0)
  on conflict(client_fingerprint,room_id,question_id) do nothing;
  select attempt_count,window_started_at into v_attempt_count,v_window_started
  from calion_private.guest_question_attempt_limits
  where client_fingerprint=v_fingerprint and room_id=p_room_id and question_id=p_question_id for update;
  if v_window_started < clock_timestamp()-interval '1 minute' then
    update calion_private.guest_question_attempt_limits
    set window_started_at=clock_timestamp(),attempt_count=0
    where client_fingerprint=v_fingerprint and room_id=p_room_id and question_id=p_question_id;
    v_attempt_count:=0;
  end if;
  if v_attempt_count>=10 then
    return jsonb_build_object('success',false,'correct',false,'code','rate_limited');
  end if;
  update calion_private.guest_question_attempt_limits set attempt_count=attempt_count+1
  where client_fingerprint=v_fingerprint and room_id=p_room_id and question_id=p_question_id;

  select exists(
    select 1 from calion_private.question_answer_keys k
    where k.curriculum_id=p_curriculum_id and k.room_id=p_room_id and k.question_id=p_question_id
      and k.answer_digest=extensions.digest(convert_to(
        (case when k.trim_whitespace then btrim(case when k.case_sensitive then p_answer else lower(p_answer) end)
              else (case when k.case_sensitive then p_answer else lower(p_answer) end) end)||k.answer_salt,'UTF8'),'sha256')
  ) into v_correct;
  return jsonb_build_object('success',v_correct,'correct',v_correct,
    'code',case when v_correct then 'verified' else 'incorrect' end);
end;
$$;

-- Existing lab flag verification remains the only completion gate. A pre-cutover
-- completed lab is snapshotted above and can never produce a second lab award.
create or replace function public.verify_lab_flag(p_lab_id text,p_submitted_flag text)
returns jsonb language plpgsql security definer set search_path=pg_catalog,public,calion_private,extensions as $$
declare v_user uuid; v_stored text; v_hash text; v_added boolean; v_total bigint; v_event uuid;
begin
  v_user:=auth.uid();
  if v_user is null then return jsonb_build_object('success',false,'message','Authentication required'); end if;
  if p_lab_id is null or p_lab_id !~ '^lab-[a-z0-9_-]+$' or p_submitted_flag is null or length(p_submitted_flag)>512 then
    return jsonb_build_object('success',false,'message','Invalid lab submission');
  end if;
  select flag_hash into v_stored from public.lab_secrets where lab_id=p_lab_id;
  if v_stored is null then return jsonb_build_object('success',false,'message','Lab not found'); end if;
  v_hash:=encode(digest(convert_to(lower(btrim(p_submitted_flag)),'UTF8'),'sha256'),'hex');
  if v_hash<>v_stored then return jsonb_build_object('success',false,'message','Incorrect flag token'); end if;

  if not exists(select 1 from calion_private.xp_legacy_labs where user_id=v_user and lab_id=p_lab_id) then
    select a.event_id,a.was_inserted,a.total_xp into v_event,v_added,v_total
    from calion_private.append_xp_event(v_user,'lab',null,p_lab_id,
      'lab:calion-academy-47-v1:'||p_lab_id,75) a;
  end if;
  insert into public.lab_progress(user_id,lab_id,status,flag_verified,completed_at,last_accessed_at)
  values(v_user,p_lab_id,'completed',true,now(),now())
  on conflict(user_id,lab_id) do update set status='completed',flag_verified=true,
    completed_at=coalesce(public.lab_progress.completed_at,excluded.completed_at),last_accessed_at=now();
  perform public.evaluate_user_milestones(v_user);
  select p.total_xp into v_total from public.profiles p where p.id=v_user;
  return jsonb_build_object('success',true,'message','Flag verified! Challenge solved.',
    'xp_awarded',case when coalesce(v_added,false) then 75 else 0 end,'event_id',v_event,'total_xp',v_total);
end;
$$;

revoke all on function public.submit_calion_answer(text,text,text,text) from public,anon;
grant execute on function public.submit_calion_answer(text,text,text,text) to authenticated;
revoke all on function public.verify_calion_answer_guest(text,text,text,text) from public;
grant execute on function public.verify_calion_answer_guest(text,text,text,text) to anon,authenticated;
revoke all on function public.get_calion_xp_state() from public,anon;
grant execute on function public.get_calion_xp_state() to authenticated;
revoke all on function public.verify_lab_flag(text,text) from public,anon;
grant execute on function public.verify_lab_flag(text,text) to authenticated;

-- Remove execute access to internal ledger helpers. SECURITY DEFINER RPCs call them as owner.
revoke all on function calion_private.append_xp_event(uuid,text,text,text,text,integer) from public,anon,authenticated;
revoke all on function calion_private.award_achievement(uuid,text) from public,anon,authenticated;
revoke all on function calion_private.finalize_current_room(uuid,text) from public,anon,authenticated;
revoke all on function calion_private.preserve_verified_room_completion() from public,anon,authenticated;
revoke all on function calion_private.reject_xp_event_mutation() from public,anon,authenticated;
revoke all on function calion_private.reject_xp_event_truncate() from public,anon,authenticated;
revoke all on function public.evaluate_user_milestones(uuid) from public,anon,authenticated;

-- Per-answer salted digests were generated during server-side curriculum authoring.
-- Plain answer strings and option indexes are not copied into this migration.
insert into calion_private.question_answer_keys(curriculum_id,room_id,question_id,answer_salt,answer_digest,case_sensitive,trim_whitespace) values
('calion-academy-47-v1','room-01','q-01-1','7bb86bc2021deecda3e8e025410c84eb',decode('9a2a0e7790236306238946c0733117ab3b1f471c28501f15c8866d6262776d63','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-1','9802d9b8360f93e7c0c9eeef60572978',decode('6167d1cee33b31a052e1cf6c3a5f196bc3679cc83cf0bdb4fe107bab97fb5906','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-1','452838eb3b24de4450adbc9045cc34db',decode('919522c65ae8cd0bace5a855898004c693fec7ab4b0364803f82664c8c6e9c10','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-1','0db86dc84b6d988ed8968a4076403a3b',decode('74aac8f4abbdecf74149bfe477ec350b68bc80f8d45ebcef727075105f6fd05f','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-1','fbec88eeb8f6fc7aba917b298a29a4c4',decode('6f0d075bf9c1ed87ecccebef268cad984c9d67793690c635870aa8ad33c9c8f3','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-2','66a9353d3c1bab4d34ed3b7d41f54f0b',decode('8bda658384b54cb1d3e6ec96b3857de55b4b65a7dd94b8fdcece1e2571c297dc','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-3','543bb9c852c3dc993d1b0fe4e09ef55f',decode('4569921157a7afe4ac07f3fa18f2335e99924f4bf497da86851d987a67a2f8f8','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-3','9dff9f7b179f3f1c4b16aca1221d32fe',decode('c5e54d8a00d3cfc55ea88b03d45dacadabb7f7c87c63c86505dfd619ca620e6b','hex'),false,true),
('calion-academy-47-v1','room-01','q-01-3','633a6d0624dffba44db68e8c3724f7b3',decode('69f279ed4f41097330b6031aca7a42011396da74caaf22715919ab207b23bd39','hex'),false,true),
('calion-academy-47-v1','room-02','q-02-1','c19de773ec726b589405901aa1f2ae83',decode('3c08e8ba41fced79b4b4f92fb1491ec14b1d8689ea7198f89c6093cffebd621e','hex'),false,true),
('calion-academy-47-v1','room-02','q-02-1','85bef41818f785d4bf7d35e242a23c85',decode('83a1a4d45425e51967cc3e757d07955d67c86970abc6b565539453db480f130b','hex'),false,true),
('calion-academy-47-v1','room-02','q-02-2','56270fe2952f4a13bf4a30d0fd33b3a8',decode('4eae734155b9abb31ab89d20ed974657a8e15392042aae287316c36625b24abf','hex'),false,true),
('calion-academy-47-v1','room-02','q-02-2','48402af322cbe3a0009ef7062dfae4d0',decode('522387d85146d16a174ec0210d45454f34af6f3475f02d2663fc866bcfd19707','hex'),false,true),
('calion-academy-47-v1','room-02','q-02-3','64ca19f518487f7ebb319109e1d342c4',decode('a819d4e056fc6a8cabd94d3fbe89a0933c637f9461cab9d7cfa68fed440878a2','hex'),false,true),
('calion-academy-47-v1','room-03','q-03-1','4e1359705a85eb86ad9e0c7d37bc2dc3',decode('40890cc9ceb4c36813e10901bc91cc51f1f2c810ab0d35028b9c226b87aefd02','hex'),false,true),
('calion-academy-47-v1','room-03','q-03-1','4223a8c856781676bd746eee52ebf6a0',decode('e33d060c208185a6f9a8060e5bf8f717bcbf398bcc72e80dc72eac1538b314b6','hex'),false,true),
('calion-academy-47-v1','room-03','q-03-1','b06c950286fdc58d3120fcdc1a03e4ea',decode('8c986036e9c6fd114e90d3fdfca9ee7eabe47cd88684bce0a423841957c215c9','hex'),false,true),
('calion-academy-47-v1','room-03','q-03-2','041500fe1d7ae45262235b2420d3fc83',decode('20c2fc7d0eb09f17d4947b43ee50e7837442a0422894353ecfc1191f3c647656','hex'),false,true),
('calion-academy-47-v1','room-03','q-03-3','253706d7d5034678303fa87701c11fa2',decode('c30037d932737dfe489767efd4226f9b3fa7b87f08ed765adad1d790f6943d73','hex'),false,true),
('calion-academy-47-v1','room-04','q-04-1','64d72a5c4176ab76a974579d975ac36b',decode('eb77a84e5a124db147a635fdb06668c603f913f311dd02c1836013c7059eb2e2','hex'),false,true),
('calion-academy-47-v1','room-04','q-04-1','baca7d61e0dc2bde4bd0236441a09994',decode('d72336452cb3a22c653bc55ca54f823b7789af7813eebc0cab636d5a7fd6b403','hex'),false,true),
('calion-academy-47-v1','room-04','q-04-1','e5eb7d60bea112bf180e70b73d0e8287',decode('835703b0270d00f38c998387dbd99b12db35e11f6991420154bf995054fa94fa','hex'),false,true),
('calion-academy-47-v1','room-04','q-04-2','4bf7489eb5942fe383bc57758b5b6813',decode('dfeef60e2c542c0e9579281bbe7b167e0cdc37d8bd0ef1a08c0fad57d4b4d61a','hex'),false,true),
('calion-academy-47-v1','room-04','q-04-3','a2792422be9b1e4a3e02f0a09e661dc4',decode('96e1e50aa83303b812edfaca5139b62070e817ca351531c8aa312deeb17e1b0a','hex'),false,true),
('calion-academy-47-v1','room-05','q-05-1','4028ed3a993e868bf931322c2c3f2e02',decode('32db0ffe182e4d60d141bea70f9e53b6c86f59afd6bfa85bd8c3bcd7edda5790','hex'),false,true),
('calion-academy-47-v1','room-05','q-05-1','d6c06ab8f231b4e9d619e00fefe67db6',decode('cc345c6775e183836598851aaab0c2676c00b682c7f186885ad02d26676475a3','hex'),false,true),
('calion-academy-47-v1','room-05','q-05-2','4088ffb2a5f333016e6f7ee958ba3c1c',decode('35f29e4f22dff255c5060eb28111d95cadedfaeafa39112fb171bceda2764fee','hex'),false,true),
('calion-academy-47-v1','room-05','q-05-3','e1e7b528eab9b4ada960be1e3b83d39d',decode('bb01b80142be7cfabbd93daf17e611c0c0edfb8531eead966ed7897e6dabfda9','hex'),false,true),
('calion-academy-47-v1','room-06','q-06-1','f1f4b29966168c8c32f448edfd754de3',decode('b7e46d161d2d488d32306f90e9ef82cfd72d144f81e5fbeb52ac7f3aed60f5e0','hex'),false,true),
('calion-academy-47-v1','room-06','q-06-1','d3c9e4e7aaf3af0c0e783e288fd4fdad',decode('3ac1813e299ae41da9af4864f96868d71b4774cb6480b963b006388a20a4106e','hex'),false,true),
('calion-academy-47-v1','room-06','q-06-2','4e1e2d3c7fdf2c634a5a3bfbf2fc9a57',decode('1e7d2ff28c5360defeb8588de68d772b9aff3e7ed6a1fd87f89be47d64c997bf','hex'),false,true),
('calion-academy-47-v1','room-06','q-06-3','b3944bfe2d0579e6cccdf6e67caaaa9e',decode('2c9ba05c56047869f32d8698325dd152fc40080db60286c797513b9825f1bafb','hex'),false,true),
('calion-academy-47-v1','room-07','q-07-1','0f3bc29a567ddd4735e6be5d85db4808',decode('5d6d652a7e54e4b109c65ddf37fddfd2620edf045fbdb455036762b5d594ca2a','hex'),false,true),
('calion-academy-47-v1','room-07','q-07-2','d91a76611bdc56732998cd9d3aabc3af',decode('f44e71d1996d0b52e1365e33f1ced1f424d88c260e47836174473114714f35d0','hex'),false,true),
('calion-academy-47-v1','room-07','q-07-2','689ad733b9f8004dbfa170bfd6a443fd',decode('1d0f2725cd0ddb61b17a4398c837991d246f54c35d341101369b8a1751b865d5','hex'),false,true),
('calion-academy-47-v1','room-07','q-07-3','911a0522464f4026a2cf6d42248b07a7',decode('8bc70a63c045e5b7f205dc4e1a9228b90953e290681ec1ecf6974c40fc301c66','hex'),false,true),
('calion-academy-47-v1','room-08','q-08-1','dfba48a26cb13333c1e7fceaa6a61885',decode('3ee0237f1e126c788fec2b71f3c2682aa9ccb89161d872f53b7e880150bfce31','hex'),false,true),
('calion-academy-47-v1','room-08','q-08-2','ca6128be4fe13874bd23bcc9707e8a82',decode('22409cba8bdef6a31eaa05f081023f1c3ee3ca9476a44114f440c30eb6feffd2','hex'),false,true),
('calion-academy-47-v1','room-08','q-08-3','9bb9d413ef31d3c4637f680e6c7608cf',decode('b3101d5913d314d0f62ca2830b210b83ce10a00770f8b7e9695f3acdddb9bf58','hex'),false,true),
('calion-academy-47-v1','room-09','q-09-1','f9f20fb0cc24f67c3fccf24c8bc0fb1e',decode('963b0fed4eb24129ea116a6c464f5d197fada099799231c4f16a1924562525cc','hex'),false,true),
('calion-academy-47-v1','room-09','q-09-2','f1d858a9b082400c997a8f52e141bb41',decode('910798c99ead09c8f27acf6f421c7df5d8cf80977de834b4943ead5797b8b037','hex'),false,true),
('calion-academy-47-v1','room-09','q-09-2','a186d3fa3c882a7f71b9197b643d74bd',decode('e02a8c6415971333473826c19c925aa3350fd17ffb7c80e4d316884e61681f20','hex'),false,true),
('calion-academy-47-v1','room-09','q-09-2','4d28d24bdc577f8bc1df28b49ccb68b4',decode('82cf9b3e809f5253b8f86ab89bdc8242576726cd2b360795c4c2c276e7441657','hex'),false,true),
('calion-academy-47-v1','room-09','q-09-3','0c1148dff5ec40bf873560181ae8fa05',decode('0f206aace216beded5f71eceb09cdec35fc668d080b72b72dd1e227de10cebb2','hex'),false,true),
('calion-academy-47-v1','room-10','q-10-1','1e8a93630823ce098c140f009db0996c',decode('8d0bbff6854854c86e61f65b9e41710e3e2274232a576a4f844d069149e60f8c','hex'),false,true),
('calion-academy-47-v1','room-10','q-10-1','8b5c0b3118d13071c50007970f68e41f',decode('8f2f454f6afb32d00403f169200c1c26372d89d7d9f950327b878f5b5ed5739e','hex'),false,true),
('calion-academy-47-v1','room-10','q-10-2','36ddb7b9882c4d537d600ccab6743d11',decode('867112a4d29e42fabe3837b389a4bf28537b37765252dc299be51c3781ccb9d4','hex'),false,true),
('calion-academy-47-v1','room-10','q-10-3','f394382cc1930cb4ef42f20121d9891b',decode('71dc1c54c1a32cb679d2623b72cf7603722c2f0dce6c1d180abe5f37c89859b3','hex'),false,true),
('calion-academy-47-v1','room-11','q-11-1','85e465369a65867b7867c907b9df1fad',decode('f33e3f60fc12f116a95807f7b920181cc59c9127ffeb0129cd4abf607052d6e7','hex'),false,true),
('calion-academy-47-v1','room-11','q-11-1','dada63f64a0646a577e7b475f9c0f9f7',decode('877eb82f6f56b40490f362a8f198b180602a201676e45abe943772e6aff7f7ca','hex'),false,true),
('calion-academy-47-v1','room-11','q-11-1','537caf75807896aefdbed9306c0fdb3d',decode('92a2fbd9db0451caa5713f31643cef3cf8efee81bba34976012e640fd3395681','hex'),false,true),
('calion-academy-47-v1','room-11','q-11-2','9837e6d6755f57716f43e2955e5b37e5',decode('814476a06d64c59a45aca3797df13b11478ac89e722ec8efde3255912945d248','hex'),false,true),
('calion-academy-47-v1','room-11','q-11-3','7d266ef2e381074c5308f481a97aa8ad',decode('ce2dc788427394ff69064ecb61c74efdd4e85941c5ba10bfd542e0d0b1981a87','hex'),false,true),
('calion-academy-47-v1','room-12','q-12-1','dfc9799d3482c4a675673c9be787e246',decode('7d49bff69edcce59c916785c700d63894f437a6b24be2211395e1899557a8616','hex'),false,true),
('calion-academy-47-v1','room-12','q-12-2','1455fa97d166941ab8d937dc70e28d1f',decode('c2ce2b4d3b07dea35d371c46083dce8409284f5bc10019bd9e4fef63a8f8dc59','hex'),false,true),
('calion-academy-47-v1','room-12','q-12-2','e223ca660c475b053f642e6ab94adc38',decode('d5bcb80d5cd715b5f082037b5dc2323430b7f90e2e370c996a7652669fb21a32','hex'),false,true),
('calion-academy-47-v1','room-12','q-12-3','ef5558072e8b2c89366498ee2b026f9e',decode('91eddd2ca2a8af876c44a28c1683ba0d4701850b6b7967d00f81295d67ca9bc1','hex'),false,true),
('calion-academy-47-v1','room-13','q-13-1','6bfb71670e8af550ea4ca8c8bde8ebf0',decode('357a006f249ffcbe9b83b664a6a9597bbec7a7363342c78610e5ba1d44c1bd05','hex'),false,true),
('calion-academy-47-v1','room-13','q-13-1','31fe14061b2b9db8d11a15098980669a',decode('c6fdc5f9d061ac64674880a0f22862586e2fd3b24b8929595ac5985395a7c4a1','hex'),false,true),
('calion-academy-47-v1','room-13','q-13-2','e2b1b9ee89163ddd3b5c9651c2383362',decode('def6656a357a6d618aadcac377c8dcd541debf049bde7e702c8fc4017f453a05','hex'),false,true),
('calion-academy-47-v1','room-13','q-13-3','097b421e4377f2a22961e999bffd48f6',decode('d5153a08b2a4e9d6c790b8f7c68b30e5bef112a715aeb939172ff07e49954b11','hex'),false,true),
('calion-academy-47-v1','room-14','q-14-1','e0adca24861af5ae15a37e1e798c73f1',decode('1ae586d33be77f55cc8db77061a86d4144247fef290b954eb05ab3f761f0f217','hex'),false,true),
('calion-academy-47-v1','room-14','q-14-2','e223b413dfbc41afe3fa5f8950db0220',decode('8fc6bafc028252124228de5a0f5b0f38fbd015631bb97f9f4a01c4fcc0445ae1','hex'),false,true),
('calion-academy-47-v1','room-14','q-14-2','c12d5b870be5ab0bbef57f50d2807bb2',decode('947ccccade134766d16f64d8e49b97831252386bd9bbbe18e730b41907deae06','hex'),false,true),
('calion-academy-47-v1','room-14','q-14-3','781b1376d4bfb352018e3e976c3a279e',decode('ee6a2397d2b8c44adad8ef4b4c3b01dbb51ce26540402494ea880a091d65607b','hex'),false,true),
('calion-academy-47-v1','room-15','q-15-1','344ccb7c4e956c5316cda2089be350bd',decode('13721d5e665ae8f0b26bb0cea01bb424a0c1ca53b16f7eff631d62813a116280','hex'),false,true),
('calion-academy-47-v1','room-15','q-15-2','c64874f50f666dd720de865afc7f7042',decode('fba185ce46f8dc19231ca58804cc00df8fcef3acffbf3088a85e8fe150397a0a','hex'),false,true),
('calion-academy-47-v1','room-15','q-15-3','8bc1ca5393449630bd24dce76a45da15',decode('ddbc4ac6657c27c53f47069d7fd4d0792dab36fb7f6ed21b54c84c695e9c1939','hex'),false,true),
('calion-academy-47-v1','room-16','q-16-1','f18f50c9a09c5f696b47afa27b475e2a',decode('318e15962507ef0ec593c19dd55b0cf195a72b25ec1772e2b48b81a3e5cf19bf','hex'),false,true),
('calion-academy-47-v1','room-16','q-16-1','be07f15ec45578ef891cb7683a6821ea',decode('ac1a19c2c82d539745af891a06c50aa30f14e6f043ef18f8c9c6f207766f976b','hex'),false,true),
('calion-academy-47-v1','room-16','q-16-2','799655e447915682586746117a5d5ada',decode('b4bf8eab99732c36775f43d5e5d7ec37f6c1284f508d600a5883d3f37d206156','hex'),false,true),
('calion-academy-47-v1','room-16','q-16-3','b0b3bf4e36232682ffaecdb8bc85cdcd',decode('9ea901f2088456873ada88da607472c15c72cd413d4c37fac3610eee0b666f5b','hex'),false,true),
('calion-academy-47-v1','room-17','q-17-1','519b30031fee097f9b470cee8535bbd1',decode('b6142678d276daa7f5f6091e0cfa3640d550ea4013de87642025758be8fe54d1','hex'),false,true),
('calion-academy-47-v1','room-17','q-17-1','bca0b8e0f749a050b3bcbc3b209d32ad',decode('a06d6f1d16121f697cfe0065f967edfbebc5a285fd12b06c38cc2e96b554c85d','hex'),false,true),
('calion-academy-47-v1','room-17','q-17-2','77c28d8c3788a86f3ba03f2f62bbf3cb',decode('5f12d9de43772733823aff928fff41b562e60a4493894af7e90d158a7209e6ba','hex'),false,true),
('calion-academy-47-v1','room-17','q-17-3','f24afcccc3f011af40919ce63a1453f6',decode('3edd5c1e9b51ad6ab032202f4c999fe7a1217358c7a3c1750918d94e70d7b1e3','hex'),false,true),
('calion-academy-47-v1','room-18','q-18-1','2ab2372599b076c744571adab27fb0b4',decode('aa64423b7c34a6e9d57fc1cd274cc605be23486bf89f3a123f3fd1cf9cd105f8','hex'),false,true),
('calion-academy-47-v1','room-18','q-18-2','d55073152d43188b8670e89480bc55aa',decode('1396a69b6375f34fc7e909011f390194a70e620aa76065508cc96db8bbcb2f99','hex'),false,true),
('calion-academy-47-v1','room-18','q-18-2','9a2e32d1ddf4cba4f44d53395a3cb017',decode('b8d1d84fcbd0d0d31d0ab68c48229eddc830983aed8a48ad13fef634af79663d','hex'),false,true),
('calion-academy-47-v1','room-18','q-18-3','32aef34c94144c315b96d54d1bef47be',decode('10514f026423f80928112a4a5badef0fc0e9a8d0c36204b48e90fb8cfe8c2d86','hex'),false,true),
('calion-academy-47-v1','room-19','q-19-1','33060cbfc5edaea9df82ad05925014ee',decode('a5d6930faed4eda4287bc68689b9656c2e3de114d12d0d7864a93380711eccd0','hex'),false,true),
('calion-academy-47-v1','room-19','q-19-2','9eb02e885d0ebf5a5e5f1fba29a10825',decode('e7a9fedaa4738f7ee8bd366f0cbfe9687f5ddf94c4a8fa91c867a3a6b0f8871c','hex'),false,true),
('calion-academy-47-v1','room-19','q-19-2','e63a17d766b339d5e9c0ecd14d7b0b6f',decode('2404eab113ce1a25af51b0ac4a4723fb5dcebe482f7bccf5d6b79fdc1d11069c','hex'),false,true),
('calion-academy-47-v1','room-19','q-19-3','41ba20f8347f5036d88d5a8121577e4c',decode('c6dc813ada41547dd68c0bba46af9078dce078270ff7607098cbd8d8f1648e12','hex'),false,true),
('calion-academy-47-v1','room-20','q-20-1','fd0209ece716014db1060f273a4121e7',decode('d85f60a1663b0dd520d853ccb36a7d98cc2583ad7b3ef4065c787db2752c78eb','hex'),false,true),
('calion-academy-47-v1','room-20','q-20-2','fc0e3c71d4edfda08fbab571cd8a2c3c',decode('03fc97c84b95535e83b61fd4e186ca3f7f4e103da7d9f9d64b545368f70d10c1','hex'),false,true),
('calion-academy-47-v1','room-20','q-20-2','fe5c7ae85720cb53d31fdeb815abae60',decode('b83f8f43bb061b7d48954a081f10a94230ee1e6f20c5bb0273b47c174d809ef6','hex'),false,true),
('calion-academy-47-v1','room-20','q-20-3','08e5e37a9dc7b545746458579a2c9460',decode('00500bf168afc9f2c2678215838e90fe893669687131b4ffce67dbb1f12619cf','hex'),false,true),
('calion-academy-47-v1','room-21','q-21-1','6ac3600a30de4355a7f7c0d632dfece0',decode('ff2783e74ccbc3a6386d66774c8f7f8e7c97e806bcea8b91c7a6f91f6343569e','hex'),false,true),
('calion-academy-47-v1','room-21','q-21-2','79ef2f7c4add22822eed0a64455673b3',decode('5e851a570ccd149c6ae46a5528408d2cbc4b72316b990a746265b5ef3d765f34','hex'),false,true),
('calion-academy-47-v1','room-21','q-21-2','cfa4a385936679f67b942dba2b84e34b',decode('6e794732f1b3a9c26a5f304de15b146d7331a598125fe5d7b0ba96b4a361a475','hex'),false,true),
('calion-academy-47-v1','room-21','q-21-3','32f50e67fb5d663fecb7bb864f6d3dcc',decode('3b48c82b3390599c312e135c5be8e894157bcfd83db82350e0ceab05f8b4e882','hex'),false,true),
('calion-academy-47-v1','room-22','q-22-1','8515f2c500a09575b94b0f2e8573e3a7',decode('36b2c5c057a1db4b8ab2b008fffeef061959757f79a7e091f3a380a1600e4a60','hex'),false,true),
('calion-academy-47-v1','room-22','q-22-2','31a37f4b25861b5a5dce26be9a658b51',decode('7cc315d07bf15cb5eb252af9f8f59055060ad1162cf69a605ca65bde530762de','hex'),false,true),
('calion-academy-47-v1','room-22','q-22-2','2e19c8762f3ddd9035f0ff5a21c4c2b0',decode('6b0265bf89740274477dc64505cdca2c8edd84be2358365892d27bd132804c7f','hex'),false,true),
('calion-academy-47-v1','room-22','q-22-3','e962c7c27091a2793c4b74d6cae84b2f',decode('afc9a03231a90e50d5b7a454877fd2ee86cd9d779a1f84e62d57ab5a1e58f22d','hex'),false,true),
('calion-academy-47-v1','room-23','q-23-1','8591b85f66979a24d4feb879cc8bf456',decode('173ceaf9895ad4739adfa1cf30c91980b5559f93bd4249117ec9dc4cb7849139','hex'),false,true),
('calion-academy-47-v1','room-23','q-23-2','5e96aa75550c2bc98198c48a2a285e5f',decode('4eee1350f0dcca1196616d698f193b0542ac05839db79585d7febb7e9c09dbdc','hex'),false,true),
('calion-academy-47-v1','room-23','q-23-3','af37779756578100672fa00f68db83e5',decode('ca46626b79b71caec77d0a43698cc675a7203f99c206e2c2597921f0225c9066','hex'),false,true),
('calion-academy-47-v1','room-24','q-24-1','c8bea2bd040b9c207e8b392a35252ca4',decode('ba7864f81e973e3690fde3ce3eaa83b3be673cd8ebc5d71424196f5c59a093c5','hex'),false,true),
('calion-academy-47-v1','room-24','q-24-2','a417ed45b66cdc6c2e08f3fe1514ea68',decode('db7a4bdfa3dd1ae91a185a0d5874f74fc4f6b64b53e086b999158a3ff0eddc99','hex'),false,true),
('calion-academy-47-v1','room-24','q-24-2','c780a5d38209b9b82ef4c674897ec9b3',decode('58615cecae4bd66040df9a05fdca3a6be7b4aa5ac9cf5a59931175cbc42557ff','hex'),false,true),
('calion-academy-47-v1','room-24','q-24-3','1a65cb6a8d7b7fa1df326c950ea9413e',decode('2ca39b7e9a619bf7db5473c5c84079fa3fbc386e59ff9ba142178840fc1d2e6f','hex'),false,true),
('calion-academy-47-v1','room-25','q-25-1','d221f2553c04d72f880aba2bae301cc5',decode('1de2672c76d119d38ca0312acf91e210080d14dac6ef92dc71e245d5202bef4c','hex'),false,true),
('calion-academy-47-v1','room-25','q-25-2','0871ab13d66abaf9da658e5ae3f60ebc',decode('1fda73a8d5223045b7071f6d0291fb779d35f20b62544dc48058a152c99cb23d','hex'),false,true),
('calion-academy-47-v1','room-25','q-25-2','141a398b6fb466b53af7070043031e33',decode('086dbdb694f4f0db6fac1e7f384454546cfa0c0a995f17de905c77e0bc84f5b0','hex'),false,true),
('calion-academy-47-v1','room-25','q-25-3','26229bba0ca7c0d1c0fe23b81b92ef08',decode('3afefcee62de0787bc4da3da8e84bee294c4ff37813d176550d6d77a4a0fb4d1','hex'),false,true),
('calion-academy-47-v1','room-26','q-26-1','537cfd6e209f0bdfd82513c399f1158b',decode('3f0a3618b051b2012e7ce38d6185324f1170232a40499c0204b3da83793b9817','hex'),false,true),
('calion-academy-47-v1','room-26','q-26-1','3de40f59d62e8eaec9a75ac75a3c42b4',decode('9e0ed6dcaee7e68959cf3244715ba44db4e3f9541d0f59dfc734f8c36500f983','hex'),false,true),
('calion-academy-47-v1','room-26','q-26-2','4d6450d436a3fc5ef073e3c5d790f836',decode('960b6cfebdc860000c43f511400ebe259aedeb89cbd6d4fec8430c45e526dd38','hex'),false,true),
('calion-academy-47-v1','room-26','q-26-3','c20cbe8bcce43d682d905617a2ee7e49',decode('eac401243159a5361d30228e2533cf41178b1f1d2affff3de597fea100eb2b42','hex'),false,true),
('calion-academy-47-v1','room-27','q-27-1','5236c371f34a827bd397e2e1b163b0b4',decode('267f62b380f17254d0959f0ddda29a0fc8047b2c9b2b0978368479bea70f2e85','hex'),false,true),
('calion-academy-47-v1','room-27','q-27-1','8d6ece8bcb4fef3e0b44badf8f1f34ad',decode('80653de9bd65d10651f7e62ca3c009ac016757515943a3c40a71a04e99b7261c','hex'),false,true),
('calion-academy-47-v1','room-27','q-27-1','b1c40622aabbafd5434d743e0661e565',decode('e52118cd1b80a5226f75f0599c77d7b955bc804ec16f3319330cdd0e3a846889','hex'),false,true),
('calion-academy-47-v1','room-27','q-27-2','75b1522b4288ee15862f1452b72bd5b9',decode('4b83e608fd9fa4472d62b717e936dcbc46958596a445f68f7611fc11e1966c76','hex'),false,true),
('calion-academy-47-v1','room-27','q-27-3','7c46c451830eaa4186029c4b16fd6f43',decode('944b8771d8d57227dfcfcb6540516f3604d124830446f7d49b59085a2f51c5ef','hex'),false,true),
('calion-academy-47-v1','room-28','q-28-1','21277cdf25a75566b4d0637c55e7d49b',decode('53ef88e0932e04825059490cdc181858b3cbf363995fef8dddaa565f4e26d371','hex'),false,true),
('calion-academy-47-v1','room-28','q-28-2','7cc2f9fd4dbcd3f6515acf771a490e4c',decode('d5fd091c9107b60389e99419af2c2970b5776b02b863ba37f7b3500107fae732','hex'),false,true),
('calion-academy-47-v1','room-28','q-28-2','c947f277eeeeb0e0d1895538e30dc589',decode('bf8cb79f213a58093cd720312e9ea8e3ffa4359dcd33beb3d4f5b315bfb8009f','hex'),false,true),
('calion-academy-47-v1','room-28','q-28-2','4c5d4818d6aa754ca3a5c05ab999b0af',decode('d2023af76aa504566382feaf54c379a22302c32b4f5d471553e2b23090439223','hex'),false,true),
('calion-academy-47-v1','room-28','q-28-3','ac30dd8830d647432ecba43a237dd326',decode('1e30adb0b39ccaeb73e36e9016cda40bc5477d1a35a02e65e234f52cff80f33b','hex'),false,true),
('calion-academy-47-v1','room-29','q-29-1','70cbbed053eab70b235ed84285e743b7',decode('64c5d6ceb0d5b62ef640239243ac0035ad3112d09d37c814117210f7ab38f43c','hex'),false,true),
('calion-academy-47-v1','room-29','q-29-2','90d2b25b0dd29fa9812eb2969ccffb96',decode('2cafc398500be23534e8953fc08fefcd5212710e0528e12a84880a0c37679db5','hex'),false,true),
('calion-academy-47-v1','room-29','q-29-2','a8ac6733c85bfe9f95a7801f2d8d0742',decode('0b51cc572aba8adca71b567c6ff89d636e13aa9bedbd8014499f1be327b93023','hex'),false,true),
('calion-academy-47-v1','room-29','q-29-2','aa3372f0d314b9d8ce1a7b234d22d58a',decode('311ed663b025951db3311725464ecf1d6904dedc8c7aff1f1614b98705d55076','hex'),false,true),
('calion-academy-47-v1','room-29','q-29-2','02fde279bcf56a9bb949e320e798b019',decode('8d4ad97550ff6ee140d3c071d588bcad818f9f18440e3b460262b51fcef71c90','hex'),false,true),
('calion-academy-47-v1','room-29','q-29-3','b67fd440854f10cf68154124cff2a480',decode('263fe7f82e04d759f760896a1c591359728da285b37bb63e5ad29094e3411ec1','hex'),false,true),
('calion-academy-47-v1','room-30','q-30-1','7815df153a8c49cd923b5eeb0edff7c7',decode('823990392ab1f4d61199075c44cf14ab13d59c707ec300bc73441ff4ed2659af','hex'),false,true),
('calion-academy-47-v1','room-30','q-30-2','08dcdd9effb0cb31fdc29b2346b6ec96',decode('5fc1cbb2e70d650390eda4523cf78a178eac9746835dec4b470eb4c59b20084c','hex'),false,true),
('calion-academy-47-v1','room-30','q-30-2','ce52c1458e61c3d1afed8d127e1a6146',decode('f359cd5ee51254574b8d5ea62571a0156369f7a0fe2f264756ca23e2f695848c','hex'),false,true),
('calion-academy-47-v1','room-30','q-30-2','a4cb2e64c4a9ca594987ce75d2a72bf0',decode('b6b0ee88ca09eef093a7ff9d23b45353b2623a121d4bcd1edadf50cc5d384deb','hex'),false,true),
('calion-academy-47-v1','room-30','q-30-3','73f4e6a0a1f9c6059895279cd10ff40d',decode('dc56d3d8c3b11d5be17388f7909e3b16a0fe299b5c6cd4c637f576248265a101','hex'),false,true),
('calion-academy-47-v1','room-31','q-31-1','ad064dcd0ba026c80a2e716348621227',decode('fe70e11b69dca13ba2273edb1c9ee3cbb8441283585729c1be82490e10f0652b','hex'),false,true),
('calion-academy-47-v1','room-31','q-31-2','136a298e897e0b64332278c13f3b8580',decode('15a071ae3309973872d8de31699434e8521144249e3bd9d0c2e879d36de53aef','hex'),false,true),
('calion-academy-47-v1','room-31','q-31-2','80a8319af3c3750895e6538ecd7a8554',decode('be4c9fda80b819c261e364bcd1fea7bcb4082d47dc421bcabec413554262f4b1','hex'),false,true),
('calion-academy-47-v1','room-31','q-31-3','6e7fd6abf8ec649b74db1bee482bd5f7',decode('6b3a9692883165b6d7c8595574b00cfc9a819df5340be525e65a02ab07236590','hex'),false,true),
('calion-academy-47-v1','room-32','q-32-1','0c686d98e715be64d05e81a981d902a5',decode('c8a986275d28c8d171a4a9a269b45a50caf89e6b374ec8b5f55b9ce28d7c0be7','hex'),false,true),
('calion-academy-47-v1','room-32','q-32-2','131978343b5ba1accd3d347d6ee55f23',decode('ae0c3537ffdb4b355978bb43f28cf558bde6ad4b31c368a28addc2add290c897','hex'),false,true),
('calion-academy-47-v1','room-32','q-32-2','07c59fa7cec868a979b928980cbccac6',decode('227712c90cf7bbf4cb175a1878500cc96b45a2e0101729e461a5f7cb7498532f','hex'),false,true),
('calion-academy-47-v1','room-32','q-32-3','e55cb5d7f960fa5e5fa803d4a45cc1e6',decode('4134b91a77f9621a1e166cda72283cf7ce0434da03bd4788d51577a6b1674170','hex'),false,true),
('calion-academy-47-v1','room-33','q-33-1','addd8e9975f146f77b81443c25680ec3',decode('0ac86c5ea174d9351db1f63b33c7135a5ce4b06f48e4d4c797a5f454d30a8e87','hex'),false,true),
('calion-academy-47-v1','room-33','q-33-2','6ca567555550a9a3f5ff598c4723938d',decode('8102c1a0bd918a82229998e8a48eb48f336fa5408b3dc98a2952996dc082892b','hex'),false,true),
('calion-academy-47-v1','room-33','q-33-2','a6269435b1341638d214b420e2ec40c4',decode('8103883a01940868b2f3a0259e4effe98306c530bf36cf5ee24b32703c857f3b','hex'),false,true),
('calion-academy-47-v1','room-33','q-33-2','a5e33b916d6dd7d95344e2fc28df620e',decode('74b158651c4f4f032ed55d9e1acb8700ef4d74c7e282a31633433ff0ca905c79','hex'),false,true),
('calion-academy-47-v1','room-33','q-33-3','d3fff74771b21bfd0b2b2567f54d0286',decode('7560b35e31f5a6becc22624e1b8714173b6f786fd0a42e5e2919278f16f3125f','hex'),false,true),
('calion-academy-47-v1','room-34','q-34-1','8a38d7edd43e651d3f79164ed03d6768',decode('0753ff71c7de4a2510340c51aae532b2ba6257eb80dace8dc04277f64f589827','hex'),false,true),
('calion-academy-47-v1','room-34','q-34-1','491dc3e086f64027cfccd7b6eccd6338',decode('97d104290cc31b5ccfd71a0b3165356a8775ab6ea15f5c084c1783ee23666b9c','hex'),false,true),
('calion-academy-47-v1','room-34','q-34-2','c98311ad2c2db047159e4930ae995574',decode('b3c50ea071d8248b31dabb5d1d0716b81ec69c340ab40c3262fdc880467754a4','hex'),false,true),
('calion-academy-47-v1','room-34','q-34-3','7b9d7c2ad0a42973c8ce2e330d201782',decode('dda6eff30359ced0a40094defe351640439145556c0985ce28b6b19f5ad19a36','hex'),false,true),
('calion-academy-47-v1','room-35','q-35-1','c512f9df864080fc9a5e7765066675c4',decode('e1a4299b8a2d028efe53016f211f6093cade119f7d33c3540ab075400f4aaea5','hex'),false,true),
('calion-academy-47-v1','room-35','q-35-2','724e19e0084f9d98ec491aa6dcc30769',decode('4c30f0c6b1cf569199b351cbf144220f4977bd80b8d1e659e6475bd3a5c4a4cc','hex'),false,true),
('calion-academy-47-v1','room-35','q-35-2','132b7a99d40b6dd8e1de078258dc0631',decode('9079419f1c4ca5f4796a15015941db799e6eeffb1fee500cebf2e5fd688f955b','hex'),false,true),
('calion-academy-47-v1','room-35','q-35-3','42e56db5e9ee952724758b2e71cac74b',decode('f96e7a91b9ebe71c6b923d95d95f674c04d47bf9c283702d2aecf41769a5697e','hex'),false,true),
('calion-academy-47-v1','room-36','q-36-1','6d6ccaed3ec057128741981ad616b7a1',decode('1d3a4a358e25841a3cd5286328015cdfa62f575b7996cf0ba1da5e6eb37325c1','hex'),false,true),
('calion-academy-47-v1','room-36','q-36-1','56ec6a23d85dbfb054b3ff9a33c9717c',decode('e2fce40d7d7c423a393477580000934ac072d790f5f637b285a39d7b05b37d53','hex'),false,true),
('calion-academy-47-v1','room-36','q-36-2','12adc51218717b7b7e7e4d053aa8e527',decode('52516ed9279450255dd3133d390ed9b08ac322fc316d93ba4045d289df1f7240','hex'),false,true),
('calion-academy-47-v1','room-36','q-36-3','cd4b660e9c24323e595d138fbaf099de',decode('d3bb9482658300c6430e3731ea2fadf4f77b3b2828a185f263bcede563d7a3c1','hex'),false,true),
('calion-academy-47-v1','room-37','q-37-1','839bcbcfd5dae7017bfb927954670954',decode('68c5678edabada131283f462b032562519df73e522aa652255bf4141a4c73d07','hex'),false,true),
('calion-academy-47-v1','room-37','q-37-1','de55dfdef6c6214678baa3fa66f43ae8',decode('b51c4af24e4a3411d7158d1b9e543abfd5f07a5d89621ba4e7db4318059c2f68','hex'),false,true),
('calion-academy-47-v1','room-37','q-37-2','1403eddcc1beb3992fb02dc4248133e2',decode('a3150039be5aee679fceb9e48e825f1020db367bcbb6a3364b99df4d2bef8564','hex'),false,true),
('calion-academy-47-v1','room-37','q-37-2','dd27c541badd155fb32314417e7df142',decode('2b041a2791998e4fd17cf79e044caea1c45b54f73121387f9653e99a6f4a2929','hex'),false,true),
('calion-academy-47-v1','room-37','q-37-3','37b8ce82741b61531fa49bbea03d2264',decode('56f11784e5f322f774b3670068a0de7f8f996420d0e476c2acaeb6abfcdd03b9','hex'),false,true),
('calion-academy-47-v1','room-38','q-38-1','2c38bb8f8d46982985f337913cf8950b',decode('a60427df0c97a07ff86f904a3ad6259dfbfb9ff0d5027f7481c5c1f755b7ed82','hex'),false,true),
('calion-academy-47-v1','room-38','q-38-2','7b3ace9c72d7a6ed68b328e5774dc461',decode('fd193517ecffd324fcb62492c2304a217c09a7ee7a79ab262d71ac44bf1800d3','hex'),false,true),
('calion-academy-47-v1','room-38','q-38-3','ec022eb6290b4237a4a23f69b02aec13',decode('bad6238a0edb86bb06e6666e11d5fe81912479d986ca639a24997c8ae80512e2','hex'),false,true),
('calion-academy-47-v1','room-39','q-39-1','93602df731e4ae237d14404c59b542b9',decode('4fda1d5e0557f213d19821764ec80e8c9340da96b13b9b56d16fe93dbf30e9da','hex'),false,true),
('calion-academy-47-v1','room-39','q-39-1','cb08ccba17485b626b5f223e56077483',decode('7f7125722aa7930aad65d88d71c9044eea0214caf7bb96cd9e9255c3d2589e1d','hex'),false,true),
('calion-academy-47-v1','room-39','q-39-1','92fca167a96ed3e19c9d46ae52b8bfd6',decode('65f676c4b5eb5d9ef1adc31f8f40b8089298a0b79db61c5eb91a796bd13d6ed9','hex'),false,true),
('calion-academy-47-v1','room-39','q-39-2','5fd1079e9d6ab901474baee757af2399',decode('b819f12ad5325ed6defd95954f72efd1673c596bf04561f4900db079ca1b95dd','hex'),false,true),
('calion-academy-47-v1','room-39','q-39-2','cab3bc5625338ce65be019b95a86d0f1',decode('be1a3ac73bdd2fc7cee32fd1ae79794e4548e971781b0609352752610360deba','hex'),false,true),
('calion-academy-47-v1','room-39','q-39-3','6ddda3735bfc79e574e14ae118acf284',decode('dd41f8685b5f13b04881caf98e5313e23caaf1547f7fb75efed226606dae2e07','hex'),false,true),
('calion-academy-47-v1','room-40','q-40-1','efaeb63c8cdba770861424d2926e03a0',decode('cacbf3391c08948194d8228e8891b33360a5b0bb1e497af8f4bad9d07290197e','hex'),false,true),
('calion-academy-47-v1','room-40','q-40-2','0e319d39f4600f0589d128124124783d',decode('8074d7655629c515fb4ed5a06c9e07cc53cfc49e71dce065b5c6e6951021e0b0','hex'),false,true),
('calion-academy-47-v1','room-40','q-40-2','a16c3dd82f08a0b52935f86fd9c1964e',decode('3968f0d6dba190ac20501bab4f597fb18892746c77a96e546d71441f5b5455d4','hex'),false,true),
('calion-academy-47-v1','room-40','q-40-2','b313d682b9c7da3c7fcf287d08c097c0',decode('ea1e8823756d05aaaa85cbadd15c4d805a34665c1860ae7f028aa655f1547ad7','hex'),false,true),
('calion-academy-47-v1','room-40','q-40-2','285c3e55f51b4cb61ff50a63d84ffbc2',decode('3c4c7750e21c433e3ad96cd784d110b3331324cd2042b3424e64d62fb47ee8a7','hex'),false,true),
('calion-academy-47-v1','room-40','q-40-3','ec08029a24d18799281f6ecbd77e68d6',decode('7946685bd0288c66e17bec5586bec9a585e9fb68ee754f56ae63d35c171a454d','hex'),false,true),
('calion-academy-47-v1','room-41','q-41-1','d1f05752e795587a6be2f1c84cd56b76',decode('b8797963694066c7c569c12502a27136f60a37c7dc3e36754db0973ab25302ab','hex'),false,true),
('calion-academy-47-v1','room-41','q-41-1','8bab5bbf104da34449f5c5b7a628445b',decode('3ab6fc6e65e07a7b6b2e2fb9d0dd1327c1d88b4813252b9f9eef8f66332a622a','hex'),false,true),
('calion-academy-47-v1','room-41','q-41-2','4f1553509cf2a079fa26d01c58238d13',decode('4c0a58b44c1207cf1234b9b38983ecbd7ed6a799fe8dc4eafc0056beddaf6be1','hex'),false,true),
('calion-academy-47-v1','room-41','q-41-2','fee0cd11a7c467e39f11a1e4c91bc4ec',decode('45c6ce1a459a09354ce11a7d07d9231f8113ea1e84c6400d0eb8119fe16c1205','hex'),false,true),
('calion-academy-47-v1','room-41','q-41-3','88490cb237a14ce8315cd32fbca64a76',decode('da4482a5c99df613f5acfb1ff255242784afc7d147203c1d6228f12d7cb628b4','hex'),false,true),
('calion-academy-47-v1','room-42','q-42-1','6732689a915a6567ab68cdc0805bd700',decode('d268de5308a3c0f013374a6f52f0b8089a18f7b339aae71f47f0bdd4b3ba1fbf','hex'),false,true),
('calion-academy-47-v1','room-42','q-42-2','72a8adf744e09babdf4f5e6e2d686476',decode('ac681e009c016e747d8d380c8239137934251a6e4c255b22230999a252b297e6','hex'),false,true),
('calion-academy-47-v1','room-42','q-42-3','dc4cd672e978a421cf5700cfe21e8681',decode('a89744c2796b8d4398ad994507b951928fa910d3be0829a5e9c29f75a0a3f0c7','hex'),false,true),
('calion-academy-47-v1','room-43','q-43-1','c77ae7c067e136a4df4505964ed99d2c',decode('9146fdb5a5d03df6ddb9e5839010a96b0ea2148afcdbf6879991c7c8db1ee4a2','hex'),false,true),
('calion-academy-47-v1','room-43','q-43-2','b7f88e0b03ba0a5533a655d3dfd7a18c',decode('9dea4443c4e1f873f02c02f2e2986cddef321e1f9647a56419772006c1f5f62e','hex'),false,true),
('calion-academy-47-v1','room-43','q-43-2','72e11bd14cafccd6d149096b38fd777b',decode('57b2a77d029c4186ce2c9ce8afb0a1de24d31bfb6388a69cd28846ab53663298','hex'),false,true),
('calion-academy-47-v1','room-43','q-43-3','cc20aea24d1b3be61c0738d07380fa99',decode('7e878a9858bd870b50da8374d220735162380f07f2518c36a02a44170022ff06','hex'),false,true),
('calion-academy-47-v1','room-44','q-44-1','712d7b8b68ffe6ef360a3489763cd772',decode('57305ef41e4fd89297d150bdec4b8a9bd9e84a8cf4bc9f764c0c5db2f882aaaf','hex'),false,true),
('calion-academy-47-v1','room-44','q-44-1','17746086d6f324dd890990c6f4bf324d',decode('f2a471a50c09f67c88dd068b235a38c605cf8bc2bb4d46b78669f0fb8029edba','hex'),false,true),
('calion-academy-47-v1','room-44','q-44-2','4cacc58905d99edeceaf3760e19efec2',decode('048cf3c63e26fd0b9f4cdbd375f34b4bb2d68be817566ae2841ff53e17121131','hex'),false,true),
('calion-academy-47-v1','room-44','q-44-3','411a75c847b3e7ea7a3cde4acfddcec0',decode('ea5a3c71053d6bc681bbf616bf70e4f9a2fc0001dac723f8b14c5396334d87bb','hex'),false,true),
('calion-academy-47-v1','room-45','q-45-1','d5ff84a38e5e6813a6c167c2b5b2fe3c',decode('c1fdea5552f736a32360e2ee7556670818ddb12d91d9528d5454ef6e5a52a1d0','hex'),false,true),
('calion-academy-47-v1','room-45','q-45-2','76e8613883fcf2f9c5cac3fda2b93ec8',decode('e8f20d6e1cf8600f23018116bc60f3f9ce338a96171518defeebabb5aae56be2','hex'),false,true),
('calion-academy-47-v1','room-45','q-45-3','7a2a58b29c60323ce268722838855741',decode('63df1c5eb0d2c6c8ac490d45eee098c43467e71ae8377e00cd19d88df85fbb1b','hex'),false,true),
('calion-academy-47-v1','room-46','q-46-1','d2f4cbe03def5386b1f30cc94221c11a',decode('e0610cbef91391ac3abc640b66224b19c245caa3dbde1caf7607f67404ecb452','hex'),false,true),
('calion-academy-47-v1','room-46','q-46-2','6d9052194e9c0a32c47ff55d81722bac',decode('8c3239af67c5365e3c87e71edcf3a95fc54170b13fa9d2875ef16bc618de3b85','hex'),false,true),
('calion-academy-47-v1','room-46','q-46-2','c3f2f78d709c326552737378ab09cbd9',decode('bc1181112ef70cb18941fde53f378efcf5edc1d94de4a87b5cf746fe97ce107e','hex'),false,true),
('calion-academy-47-v1','room-46','q-46-2','09e5698449a3dbf1f7ec942b8b1ffc77',decode('63b851ef5f8f7b91f1ab8ea46c51f5b814140afa035a48b297cab522cadfb710','hex'),false,true),
('calion-academy-47-v1','room-46','q-46-2','a34910686589fefe794b8b9568efd898',decode('adef328720ce1664a8eb681b98ffd0b67b7f8f88d2b3f28f61941509d00f2c44','hex'),false,true),
('calion-academy-47-v1','room-46','q-46-3','2b521d74d52e9a4df76fde6f0e2f0648',decode('73749d47e04e0167ff6d8f6f1608942d5f643c7a5713f3e0ddc17bd9dca1efb8','hex'),false,true),
('calion-academy-47-v1','room-47','q-47-1','9135110a2a8595dabd455286cabfb63c',decode('14a88abecdde0a672f2a7e325fbfdd5ecadbdba46f6839b9e221ae3a81edc375','hex'),false,true),
('calion-academy-47-v1','room-47','q-47-2','b036318238605c9582a3b61da327edbb',decode('ee726aae21861807174c97931075351d9f1e4e01aec4182aae5d023c235f085f','hex'),false,true),
('calion-academy-47-v1','room-47','q-47-3','092264c6e2d214fe5bb3d528a3dd596b',decode('7f6744be98d111b6822187c76f52fb2e74cf3fbad63bfdb0c4dadf2d01717345','hex'),false,true)
on conflict do nothing;

-- Verify complete key coverage before leaving the transaction.
do $$
begin
  if (select count(distinct (room_id,question_id)) from calion_private.question_answer_keys where curriculum_id='calion-academy-47-v1')<>141 then
    raise exception 'Expected answer-key rows for all 141 current questions';
  end if;
  if exists(
    select r.id from public.rooms r
    left join (select room_id,count(distinct question_id) n from calion_private.question_answer_keys
      where curriculum_id='calion-academy-47-v1' group by room_id) q on q.room_id=r.id
    where r.is_active and coalesce(q.n,0)<>r.total_questions
  ) then raise exception 'Current room question totals differ from protected answer keys'; end if;
  if exists(select 1 from calion_private.xp_events) then raise exception 'Initial rollout must not create XP events'; end if;
  if exists(select id,total_xp from calion_xp_profile_rollout_snapshot except select id,total_xp from public.profiles)
     or exists(select id,total_xp from public.profiles except select id,total_xp from calion_xp_profile_rollout_snapshot) then
    raise exception 'profiles.total_xp changed during XP ledger installation';
  end if;
end $$;

commit;
