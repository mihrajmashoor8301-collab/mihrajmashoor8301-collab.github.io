-- CALION Academy — Security Hardening Patch Migration
-- Apply this migration to enforce strict column privileges, trigger search_path fixes,
-- and prevent client-side XP manipulation or forged achievements.

-- 1. Ensure search_path is restricted on all functions
alter function public.handle_new_user() set search_path = public, pg_temp;
alter function public.evaluate_user_milestones(uuid) set search_path = public, pg_temp;
alter function public.on_room_progress_update() set search_path = public, pg_temp;
alter function public.on_lab_progress_update() set search_path = public, pg_temp;

-- 2. Enforce Check Constraints on Progress Records
alter table public.room_progress drop constraint if exists chk_room_progress_status_pct;
alter table public.room_progress add constraint chk_room_progress_status_pct check (
  (status = 'completed' and progress_pct = 100) or
  (status = 'in_progress' and progress_pct >= 0 and progress_pct <= 100) or
  (status = 'not_started' and progress_pct = 0)
);

alter table public.lab_progress drop constraint if exists chk_lab_progress_status;
alter table public.lab_progress add constraint chk_lab_progress_status check (
  (status = 'completed' and flag_verified = true) or
  (status != 'completed')
);

alter table public.labs drop constraint if exists labs_difficulty_check;
alter table public.labs add constraint labs_difficulty_check check (difficulty in ('Beginner', 'Intermediate', 'Advanced', 'Capstone', 'Easy', 'Medium', 'Hard'));

-- 3. Revoke direct write permissions on user_achievements and user_activity
drop policy if exists "Users manage their own achievements" on public.user_achievements;
revoke insert, update, delete on public.user_achievements from authenticated, anon;
grant select on public.user_achievements to authenticated, anon;

drop policy if exists "Users record their own activity" on public.user_activity;
revoke insert, update, delete on public.user_activity from authenticated, anon;
grant select on public.user_activity to authenticated, anon;

grant select on public.learning_paths to anon, authenticated;
grant select on public.rooms to anon, authenticated;
grant select on public.labs to anon, authenticated;
grant select on public.achievements to anon, authenticated;

grant select, insert, update, delete on public.room_progress to authenticated;
grant select on public.room_progress to anon;

grant select, insert, update, delete on public.lab_progress to authenticated;
grant select on public.lab_progress to anon;

grant select, insert, update, delete on public.task_progress to authenticated;

-- 4. Restrict Profile Column Updates (Revoke direct total_xp & streak_days manipulation)
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;

grant select on public.profiles to anon, authenticated;
grant insert (id, username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;
grant update (username, display_name, avatar_url, bio, is_public) on public.profiles to authenticated;

-- 5. Defense-in-depth trigger on profiles
create or replace function public.protect_profile_immutable_fields()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
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

-- ============================================================================
-- 6. SERVER-SIDE PRACTICAL LAB FLAG VERIFICATION & ANTI-FORGERY
-- ============================================================================

create table if not exists public.lab_secrets (
  lab_id text primary key references public.labs(id) on delete cascade,
  flag_hash text not null,
  created_at timestamptz not null default now()
);

-- STRICT SECURITY: Revoke direct client access to flag secrets
revoke all on public.lab_secrets from anon, authenticated;

-- Seed canonical flag hashes (SHA-256)
insert into public.lab_secrets (lab_id, flag_hash) values
  ('lab-headers', '4e38664709c98beae232d223d5e24f86ccd18ea99a94dbd5ae5bffeafa46e4fc'),
  ('lab-permissions', '3ec7c709383ff9a64db43a2d58fe19fbe9fbea66d7639789faac2a28c0434246'),
  ('lab-auth', 'db19b1e9a6ebc689d98e4520674cbe7467d9f774833910c3f03ea4a7b6803061'),
  ('lab-idor', 'bb77b01924a130d59ffff0329d57b1da56255de700336fb4af5a2af2db43b4fb'),
  ('lab-sqli', 'df8b94ec937e3e929094182a85df6d6015a27013eac66f6fa4223d561b3de94a'),
  ('lab-xss', '42d6f03590d1dd4ac5f0a41049e8802852af5bcc084a954eb9eb84ecf4ac0567'),
  ('lab-csrf', '6a0dd913bb4ccd97b965d3640debbd78868cfcae0fe58adf6e2973e363e4c606'),
  ('lab-network', 'eed123f3cdd72d6ea08919f9cd4a99457bef78c9048db73fe6af913051dffd0e'),
  ('lab-logs', '805149f4225fb9b54e12d1c3ec8d8d550b5d9afea3021076aec847c1eb451654'),
  ('lab-suid', 'cea22f61f530f4b9b6ca9110d64e50b5f77d4dce78abd8158cad2e7c7342f23a'),
  ('lab-jwt', '4ebe64939ef6cb4dab1a8ee75ae45cd008132fbd4c18c99f30b672636a5d9545'),
  ('lab-crypto', '59ae3356bc35ee48af042c3d15d5bb14b6f036c6dbdcf1ea69a497a264d1bac4'),
  ('lab-capstone', '4dd42b5812487aefd8f0f9400522560cfad23a885a695f8636499d6f05361a80')
on conflict (lab_id) do update set flag_hash = excluded.flag_hash;

-- RPC Function: Securely verify flag and mark lab completed on the server
create or replace function public.verify_lab_flag(p_lab_id text, p_submitted_flag text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  stored_hash text;
  input_hash text;
  v_user_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    return jsonb_build_object('success', false, 'message', 'Authentication required');
  end if;

  select flag_hash into stored_hash from public.lab_secrets where lab_id = p_lab_id;
  if stored_hash is null then
    return jsonb_build_object('success', false, 'message', 'Lab not found');
  end if;

  input_hash := encode(digest(lower(trim(p_submitted_flag))::bytea, 'sha256'), 'hex');

  if input_hash = stored_hash then
    -- Record verified lab completion legitimately on the server
    insert into public.lab_progress (user_id, lab_id, status, flag_verified, completed_at, last_accessed_at)
    values (v_user_id, p_lab_id, 'completed', true, now(), now())
    on conflict (user_id, lab_id) do update set
      status = 'completed',
      flag_verified = true,
      completed_at = coalesce(public.lab_progress.completed_at, now()),
      last_accessed_at = now();

    return jsonb_build_object('success', true, 'message', 'Flag verified! Challenge solved.');
  else
    return jsonb_build_object('success', false, 'message', 'Incorrect flag token.');
  end if;
end;
$$;

grant execute on function public.verify_lab_flag(text, text) to authenticated;

-- Protect Lab Progress Integrity Trigger: Clients cannot directly set flag_verified = true or status = 'completed'
create or replace function public.protect_lab_verification()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  if current_user in ('authenticated', 'anon') then
    if (new.flag_verified = true and (old.flag_verified is null or old.flag_verified = false)) or
       (new.status = 'completed' and (old.status is null or old.status != 'completed')) then
      raise exception 'Direct client verification of lab completion is forbidden. Use verify_lab_flag RPC.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_protect_lab_verification on public.lab_progress;
create trigger trg_protect_lab_verification
  before insert or update on public.lab_progress
  for each row execute function public.protect_lab_verification();

-- ============================================================================
-- 7. ROOM COMPLETION QUESTION INTEGRITY
-- ============================================================================

alter table public.rooms add column if not exists total_questions integer not null default 2 check (total_questions >= 1);

update public.rooms set total_questions = 3 where id in ('room-01', 'room-08', 'room-09', 'room-25');

create or replace function public.protect_room_completion()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  req_questions integer;
begin
  select coalesce(total_questions, 2) into req_questions from public.rooms where id = new.room_id;
  if req_questions is null then req_questions := 2; end if;

  if new.status = 'completed' then
    if jsonb_array_length(new.questions_solved) < req_questions then
      raise exception 'Room completion rejected: questions_solved count (%) is less than required (%)',
        jsonb_array_length(new.questions_solved), req_questions;
    end if;
    new.progress_pct := 100;
  elsif new.progress_pct = 100 and new.status != 'completed' then
    if jsonb_array_length(new.questions_solved) >= req_questions then
      new.status := 'completed';
    else
      new.progress_pct := 99;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_protect_room_completion on public.room_progress;
create trigger trg_protect_room_completion
  before insert or update on public.room_progress
  for each row execute function public.protect_room_completion();
