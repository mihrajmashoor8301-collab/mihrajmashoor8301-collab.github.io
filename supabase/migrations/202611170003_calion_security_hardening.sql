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
security definer
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
