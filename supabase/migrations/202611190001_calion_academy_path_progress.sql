-- Align server-side Pre-Security completion awards with the current 47-room,
-- four-path curriculum. Existing completion, XP, and achievement records remain intact.

update public.achievements
set description = 'Achieve 100% completion across all 10 Pre-Security rooms.',
    required_count = 10
where id = 'pre-security-graduate';

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
  where user_id = target_user_id and status = 'completed';

  if completed_room_count >= 1 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'first-steps') on conflict (user_id, achievement_id) do nothing;
  end if;
  if completed_room_count >= 5 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'explorer') on conflict (user_id, achievement_id) do nothing;
  end if;
  if completed_room_count >= 10 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'dedicated-learner') on conflict (user_id, achievement_id) do nothing;
  end if;
  if completed_room_count >= 25 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'security-enthusiast') on conflict (user_id, achievement_id) do nothing;
  end if;

  select count(*) into pre_security_total
  from public.rooms where path_id = 'pre-security';
  select count(*) into pre_security_completed
  from public.room_progress rp
  join public.rooms r on r.id = rp.room_id
  where rp.user_id = target_user_id and rp.status = 'completed'
    and r.path_id = 'pre-security';

  if pre_security_total > 0 and pre_security_completed = pre_security_total then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'pre-security-graduate') on conflict (user_id, achievement_id) do nothing;
  end if;

  select count(*) into completed_lab_count
  from public.lab_progress
  where user_id = target_user_id and (status = 'completed' or flag_verified = true);
  if completed_lab_count >= 1 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'lab-practitioner') on conflict (user_id, achievement_id) do nothing;
  end if;
  if completed_lab_count >= 5 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'lab-specialist') on conflict (user_id, achievement_id) do nothing;
  end if;
  if completed_lab_count >= 13 then
    insert into public.user_achievements (user_id, achievement_id)
    values (target_user_id, 'lab-master') on conflict (user_id, achievement_id) do nothing;
  end if;

  update public.profiles
  set total_xp = (
    coalesce((select count(*) * 50 from public.room_progress where user_id = target_user_id and status = 'completed'), 0) +
    coalesce((select count(*) * 75 from public.lab_progress where user_id = target_user_id and (status = 'completed' or flag_verified = true)), 0) +
    coalesce((select coalesce(sum(a.xp_bonus), 0) from public.user_achievements ua join public.achievements a on ua.achievement_id = a.id where ua.user_id = target_user_id), 0)
  ), updated_at = now()
  where id = target_user_id;
end;
$$;
