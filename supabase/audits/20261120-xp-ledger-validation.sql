-- Read-only post-deployment validation; run only after separately approved migrations.
-- This file contains SELECT statements only.

-- Authoritative total must equal captured opening balance plus ledger sum (expect no rows).
select p.id, p.total_xp as profile_total,
       b.opening_xp + coalesce(sum(e.xp_amount),0) as computed_total,
       p.total_xp = b.opening_xp + coalesce(sum(e.xp_amount),0) as matches
from public.profiles p
join calion_private.xp_opening_balances b on b.user_id=p.id
left join calion_private.xp_events e on e.user_id=p.id
group by p.id,p.total_xp,b.opening_xp
having p.total_xp <> b.opening_xp + coalesce(sum(e.xp_amount),0);

-- Must return no rows: duplicate user/event identity or incompatible award amount.
select user_id,event_key,count(*) as duplicates
from calion_private.xp_events
group by user_id,event_key
having count(*)>1;
select event_id,event_type,xp_amount,curriculum_id
from calion_private.xp_events
where curriculum_id<>'calion-academy-47-v1'
   or (event_type='room' and xp_amount<>50)
   or (event_type='question' and xp_amount<>25)
   or (event_type='lab' and xp_amount<>75);

-- Every room award must be supported by all distinct question events for that room.
select r.user_id,r.room_id,count(q.event_id) as verified_questions,rooms.total_questions
from calion_private.xp_events r
join public.rooms on rooms.id=r.room_id
left join calion_private.xp_events q on q.user_id=r.user_id and q.room_id=r.room_id
  and q.curriculum_id=r.curriculum_id and q.event_type='question'
where r.event_type='room'
group by r.user_id,r.room_id,rooms.total_questions
having count(q.event_id)<rooms.total_questions;

-- No event may duplicate a completed lab or achievement that existed at rollout.
select e.* from calion_private.xp_events e
join calion_private.xp_legacy_labs l on e.user_id=l.user_id and e.source_id=l.lab_id
where e.event_type='lab';
select e.* from calion_private.xp_events e
join calion_private.xp_legacy_achievements a on e.user_id=a.user_id and e.source_id=a.achievement_id
where e.event_type='achievement';
select rp.user_id,rp.room_id,rp.curriculum_id,e.event_id
from public.room_progress rp
left join calion_private.xp_events e on e.user_id=rp.user_id and e.room_id=rp.room_id
  and e.curriculum_id=rp.curriculum_id and e.event_type='room'
where rp.status='completed' and rp.curriculum_id='calion-legacy-45-v1' and e.event_id is not null;

-- Confirm answer-vault isolation and RPC execution grants.
select n.nspname as schema_name,c.relname as table_name,c.relrowsecurity
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname='calion_private' and c.relname in ('xp_events','question_answer_keys','xp_opening_balances');
select has_table_privilege('anon','calion_private.xp_events','select') as anon_can_read_ledger,
       has_table_privilege('anon','calion_private.xp_events','insert') as anon_can_insert_ledger,
       has_table_privilege('authenticated','calion_private.xp_events','select') as learner_can_read_ledger,
       has_table_privilege('authenticated','calion_private.xp_events','insert') as learner_can_insert_ledger,
       has_function_privilege('anon','public.submit_calion_answer(text,text,text,text)','execute') as anon_can_answer_rpc,
       has_function_privilege('authenticated','public.submit_calion_answer(text,text,text,text)','execute') as authenticated_can_answer_rpc,
       has_function_privilege('anon','public.evaluate_user_milestones(uuid)','execute') as anon_can_call_milestone_internal,
       has_function_privilege('authenticated','public.evaluate_user_milestones(uuid)','execute') as authenticated_can_call_milestone_internal,
       has_function_privilege('public','public.evaluate_user_milestones(uuid)','execute') as public_can_call_milestone_internal,
       has_function_privilege('authenticated','calion_private.append_xp_event(uuid,text,text,text,text,integer)','execute') as learner_can_call_internal_awarder;
select tgname,tgenabled,pg_get_triggerdef(oid) as definition
from pg_trigger
where tgrelid='public.room_progress'::regclass
  and tgname='trg_calion_preserve_verified_completion';

-- Every profile must have an opening balance.
select count(*) as profiles_without_opening_balance
from public.profiles p left join calion_private.xp_opening_balances b on b.user_id=p.id
where b.user_id is null;
