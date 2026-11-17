-- CALION Academy — Hardened Supabase Database Schema & Migration
-- Author: CALION Lead Security Engineer & Full-Stack Architect
-- Target: Dedicated NEW Supabase project for CALION Academy

-- Enable pgcrypto for UUID generation
create extension if not exists pgcrypto;

-- ============================================================================
-- 1. PROFILES (Learner account identities, preferences, and aggregate XP)
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) between 3 and 30 and username ~ '^[a-zA-Z0-9_-]+$'),
  display_name text not null default '' check (char_length(display_name) <= 60),
  avatar_url text default '',
  bio text default '' check (char_length(bio) <= 500),
  is_public boolean not null default true,
  total_xp integer not null default 0 check (total_xp >= 0),
  streak_days integer not null default 1 check (streak_days >= 0),
  last_active_date date default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_username_idx on public.profiles (lower(username));
create index if not exists profiles_public_idx on public.profiles (is_public);

-- ============================================================================
-- 2. LEARNING PATHS (Pre Security, Cyber Security 101, Jr Penetration Tester)
-- ============================================================================
create table if not exists public.learning_paths (
  id text primary key,
  title text not null check (char_length(title) between 2 and 100),
  description text not null default '',
  badge_icon text default '',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- 3. ROOMS (Canonical 45 rooms with levels and progression order)
-- ============================================================================
create table if not exists public.rooms (
  id text primary key check (id ~ '^room-[0-9]{2,}$'),
  path_id text references public.learning_paths(id) on delete set null,
  level_number integer not null default 0 check (level_number >= 0),
  title text not null check (char_length(title) between 2 and 150),
  description text default '',
  xp_reward integer not null default 50 check (xp_reward >= 0),
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists rooms_path_level_idx on public.rooms (path_id, level_number, display_order);

-- ============================================================================
-- 4. ROOM PROGRESS (Persistent per-user room completion & question progress)
-- ============================================================================
create table if not exists public.room_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  room_id text not null references public.rooms(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  progress_pct integer not null default 0 check (progress_pct between 0 and 100),
  questions_solved jsonb not null default '[]'::jsonb check (jsonb_typeof(questions_solved) = 'array'),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  last_accessed_at timestamptz not null default now(),
  unique (user_id, room_id),
  -- SECURITY ENFORCEMENT: Completed status strictly requires 100% progress
  constraint chk_room_progress_status_pct check (
    (status = 'completed' and progress_pct = 100) or
    (status = 'in_progress' and progress_pct >= 0 and progress_pct <= 100) or
    (status = 'not_started' and progress_pct = 0)
  )
);

create index if not exists room_progress_user_status_idx on public.room_progress (user_id, status);
create index if not exists room_progress_user_room_idx on public.room_progress (user_id, room_id);
create index if not exists room_progress_completed_at_idx on public.room_progress (user_id, completed_at desc);

-- ============================================================================
-- 5. PRACTICAL LABS (13 Canonical Interactive POSIX Labs)
-- ============================================================================
create table if not exists public.labs (
  id text primary key check (id ~ '^lab-[a-z0-9_-]+$'),
  title text not null check (char_length(title) between 2 and 150),
  difficulty text not null default 'Easy' check (difficulty in ('Easy', 'Medium', 'Hard', 'Capstone')),
  estimated_time text default '25 mins',
  total_tasks integer not null default 5 check (total_tasks >= 1),
  xp_reward integer not null default 75 check (xp_reward >= 0),
  created_at timestamptz not null default now()
);

-- ============================================================================
-- 6. LAB PROGRESS (Lab execution, completed tasks, flag verification)
-- ============================================================================
create table if not exists public.lab_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lab_id text not null references public.labs(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completed_tasks jsonb not null default '[]'::jsonb check (jsonb_typeof(completed_tasks) = 'array'),
  flag_verified boolean not null default false,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  last_accessed_at timestamptz not null default now(),
  unique (user_id, lab_id),
  -- SECURITY ENFORCEMENT: Lab completed status strictly requires verified flag
  constraint chk_lab_progress_status check (
    (status = 'completed' and flag_verified = true) or
    (status != 'completed')
  )
);

create index if not exists lab_progress_user_status_idx on public.lab_progress (user_id, status);
create index if not exists lab_progress_user_lab_idx on public.lab_progress (user_id, lab_id);

-- ============================================================================
-- 7. TASK PROGRESS (Sub-task completion records within rooms)
-- ============================================================================
create table if not exists public.task_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  room_id text not null references public.rooms(id) on delete cascade,
  task_index integer not null check (task_index >= 0),
  is_completed boolean not null default true,
  completed_at timestamptz not null default now(),
  unique (user_id, room_id, task_index)
);

create index if not exists task_progress_lookup_idx on public.task_progress (user_id, room_id, task_index);

-- ============================================================================
-- 8. ACHIEVEMENTS (Milestones, badges, certifications)
-- ============================================================================
create table if not exists public.achievements (
  id text primary key,
  title text not null check (char_length(title) between 2 and 100),
  description text not null default '',
  icon text not null default 'award',
  category text not null default 'milestone' check (category in ('room', 'lab', 'path', 'streak', 'milestone')),
  required_count integer not null default 1 check (required_count >= 1),
  xp_bonus integer not null default 50 check (xp_bonus >= 0),
  created_at timestamptz not null default now()
);

-- ============================================================================
-- 9. USER ACHIEVEMENTS (Unlocked user achievement records)
-- ============================================================================
create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

create index if not exists user_achievements_user_idx on public.user_achievements (user_id, unlocked_at desc);

-- ============================================================================
-- 10. USER ACTIVITY (Activity audit log for GitHub-style calendar)
-- ============================================================================
create table if not exists public.user_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null check (activity_type in (
    'room_completed', 'lab_completed', 'question_solved', 'task_completed', 'achievement_unlocked', 'daily_streak'
  )),
  entity_id text not null,
  xp_earned integer not null default 0 check (xp_earned >= 0),
  details jsonb not null default '{}'::jsonb,
  activity_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists user_activity_calendar_idx on public.user_activity (user_id, activity_date);
create index if not exists user_activity_timeline_idx on public.user_activity (user_id, created_at desc);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES — HARDENED
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.learning_paths enable row level security;
alter table public.rooms enable row level security;
alter table public.room_progress enable row level security;
alter table public.labs enable row level security;
alter table public.lab_progress enable row level security;
alter table public.task_progress enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.user_activity enable row level security;

-- 1. Profiles RLS
drop policy if exists "Profiles visible to public if public or own" on public.profiles;
create policy "Profiles visible to public if public or own" on public.profiles
  for select
  using (is_public = true or id = auth.uid());

drop policy if exists "Users manage their own profile" on public.profiles;
drop policy if exists "Users update their own profile" on public.profiles;
drop policy if exists "Users insert their own profile" on public.profiles;

create policy "Users insert their own profile" on public.profiles
  for insert to authenticated
  with check (id = auth.uid());

create policy "Users update their own profile" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Column Privilege Hardening: Browser users CANNOT update total_xp or streak_days directly
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;

grant select on public.profiles to anon, authenticated;
grant insert (id, username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;
grant update (username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;

-- 2. Curriculum Metadata RLS (Public read-only)
drop policy if exists "Learning paths readable by anyone" on public.learning_paths;
create policy "Learning paths readable by anyone" on public.learning_paths
  for select using (true);

drop policy if exists "Rooms readable by anyone" on public.rooms;
create policy "Rooms readable by anyone" on public.rooms
  for select using (true);

drop policy if exists "Labs readable by anyone" on public.labs;
create policy "Labs readable by anyone" on public.labs
  for select using (true);

drop policy if exists "Achievements readable by anyone" on public.achievements;
create policy "Achievements readable by anyone" on public.achievements
  for select using (true);

-- 3. Room Progress RLS
drop policy if exists "Room progress visible if own or public profile" on public.room_progress;
create policy "Room progress visible if own or public profile" on public.room_progress
  for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = room_progress.user_id and p.is_public = true
    )
  );

drop policy if exists "Users manage their own room progress" on public.room_progress;
create policy "Users manage their own room progress" on public.room_progress
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 4. Lab Progress RLS
drop policy if exists "Lab progress visible if own or public profile" on public.lab_progress;
create policy "Lab progress visible if own or public profile" on public.lab_progress
  for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = lab_progress.user_id and p.is_public = true
    )
  );

drop policy if exists "Users manage their own lab progress" on public.lab_progress;
create policy "Users manage their own lab progress" on public.lab_progress
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 5. Task Progress RLS
drop policy if exists "Task progress readable by owner" on public.task_progress;
create policy "Task progress readable by owner" on public.task_progress
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users manage their own task progress" on public.task_progress;
create policy "Users manage their own task progress" on public.task_progress
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 6. User Achievements RLS (SECURITY HARDENED: READ-ONLY FOR BROWSER)
drop policy if exists "User achievements visible if own or public profile" on public.user_achievements;
create policy "User achievements visible if own or public profile" on public.user_achievements
  for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = user_achievements.user_id and p.is_public = true
    )
  );

-- STRICT: Drop client insert/update policy. Only internal server triggers can award achievements!
drop policy if exists "Users manage their own achievements" on public.user_achievements;
revoke insert, update, delete on public.user_achievements from authenticated, anon;
grant select on public.user_achievements to authenticated, anon;

-- 7. User Activity RLS (SECURITY HARDENED: READ-ONLY FOR BROWSER)
drop policy if exists "User activity visible if own or public profile" on public.user_activity;
create policy "User activity visible if own or public profile" on public.user_activity
  for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = user_activity.user_id and p.is_public = true
    )
  );

-- STRICT: Drop client insert policy. Activity is exclusively written by verified system triggers!
drop policy if exists "Users record their own activity" on public.user_activity;
revoke insert, update, delete on public.user_activity from authenticated, anon;
grant select on public.user_activity to authenticated, anon;

-- ============================================================================
-- AUTOMATED TRIGGERS & BUSINESS LOGIC (WITH STRICT SEARCH_PATH)
-- ============================================================================

-- Defense-in-depth: Profile Immutable Fields Protection Trigger
create or replace function public.protect_profile_immutable_fields()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Prevent client-side manipulation of total_xp and streak_days
  if current_user in ('authenticated', 'anon') then
    new.total_xp := old.total_xp;
    new.streak_days := old.streak_days;
    new.created_at := old.created_at;
    new.id := old.id;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_protect_profile_fields on public.profiles;
create trigger trg_protect_profile_fields
  before update on public.profiles
  for each row execute function public.protect_profile_immutable_fields();

-- Function: Handle New User Registration -> Automatically Create Profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  raw_user text;
  clean_username text;
  display text;
begin
  -- Derive initial username from metadata or email
  raw_user := coalesce(
    new.raw_user_meta_data->>'username',
    split_part(new.email, '@', 1),
    'learner_' || substr(new.id::text, 1, 8)
  );
  -- Sanitize username to alphanumeric + underscore/dash
  clean_username := regexp_replace(raw_user, '[^a-zA-Z0-9_-]', '', 'g');
  if char_length(clean_username) < 3 then
    clean_username := 'learner_' || substr(new.id::text, 1, 8);
  end if;
  clean_username := substr(clean_username, 1, 30);

  display := coalesce(
    new.raw_user_meta_data->>'display_name',
    new.raw_user_meta_data->>'full_name',
    clean_username
  );

  insert into public.profiles (id, username, display_name, avatar_url, is_public)
  values (
    new.id,
    clean_username,
    display,
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    true
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function: Evaluate Milestones & Award Achievements
create or replace function public.evaluate_user_milestones(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  completed_room_count integer;
  completed_lab_count integer;
  pre_security_done boolean;
begin
  -- 1. Room milestones
  select count(*) into completed_room_count
  from public.room_progress
  where user_id = target_user_id and status = 'completed';

  if completed_room_count >= 1 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'first-steps')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  if completed_room_count >= 5 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'explorer')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  if completed_room_count >= 10 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'dedicated-learner')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  if completed_room_count >= 25 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'security-enthusiast')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  -- 2. Pre-Security complete pathway check (all 45 rooms)
  select not exists (
    select 1 from public.rooms r
    where r.path_id = 'pre-security'
      and not exists (
        select 1 from public.room_progress rp
        where rp.user_id = target_user_id
          and rp.room_id = r.id
          and rp.status = 'completed'
      )
  ) into pre_security_done;

  if pre_security_done and completed_room_count >= 45 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'pre-security-graduate')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  -- 3. Practical lab milestones
  select count(*) into completed_lab_count
  from public.lab_progress
  where user_id = target_user_id and (status = 'completed' or flag_verified = true);

  if completed_lab_count >= 1 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'lab-practitioner')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  if completed_lab_count >= 5 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'lab-specialist')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  if completed_lab_count >= 13 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'lab-master')
    on conflict (user_id, achievement_id) do nothing;
  end if;

  -- 4. Recompute total XP
  update public.profiles
  set total_xp = (
    coalesce((select count(*) * 50 from public.room_progress where user_id = target_user_id and status = 'completed'), 0) +
    coalesce((select count(*) * 75 from public.lab_progress where user_id = target_user_id and (status = 'completed' or flag_verified = true)), 0) +
    coalesce((select coalesce(sum(a.xp_bonus), 0) from public.user_achievements ua join public.achievements a on ua.achievement_id = a.id where ua.user_id = target_user_id), 0)
  ),
  updated_at = now()
  where id = target_user_id;
end;
$$;

-- Trigger: When room completion changes, evaluate milestones
create or replace function public.on_room_progress_update()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if (new.status = 'completed' and (old.status is null or old.status != 'completed')) then
    -- Log activity
    insert into public.user_activity (user_id, activity_type, entity_id, xp_earned, details)
    values (new.user_id, 'room_completed', new.room_id, 50, jsonb_build_object('progress_pct', 100));
    -- Evaluate milestones
    perform public.evaluate_user_milestones(new.user_id);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_room_progress_update on public.room_progress;
create trigger trg_room_progress_update
  after insert or update of status on public.room_progress
  for each row execute function public.on_room_progress_update();

-- Trigger: When lab completion changes, evaluate milestones
create or replace function public.on_lab_progress_update()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if ((new.status = 'completed' or new.flag_verified = true) and
      (old.status is null or (old.status != 'completed' and old.flag_verified = false))) then
    -- Log activity
    insert into public.user_activity (user_id, activity_type, entity_id, xp_earned, details)
    values (new.user_id, 'lab_completed', new.lab_id, 75, jsonb_build_object('flag_verified', new.flag_verified));
    -- Evaluate milestones
    perform public.evaluate_user_milestones(new.user_id);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_lab_progress_update on public.lab_progress;
create trigger trg_lab_progress_update
  after insert or update of status, flag_verified on public.lab_progress
  for each row execute function public.on_lab_progress_update();
