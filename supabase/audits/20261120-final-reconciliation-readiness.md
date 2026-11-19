# CALION four-path reconciliation — final readiness review

**Decision: NO-GO for production deployment.** The local reconciliation is guarded and the targeted regression suites pass, but XP is not yet implemented as an authoritative verified-event ledger, and remote migration history has no trustworthy execution records. No production writes, migration-history changes, deployment, or push were performed.

## Blocker 1 — XP accounting

The curriculum migration now removes the `profiles.total_xp` recomputation from `evaluate_user_milestones()`. It snapshots `(profile.id, total_xp)` and aborts unless the exact profile/XP set remains unchanged. Historical room progress is assigned the legacy curriculum version; current milestone counts filter to `calion-academy-47-v1`. Thus the proposed curriculum reconciliation itself neither re-counts legacy completions nor changes existing XP.

The separate design in `supabase/proposals/20261120-xp-consistency-proposal.md` defines:

`total_xp = immutable opening balance + sum of accepted unique server-verified XP events`

Opening balance is the exact pre-cutover `profiles.total_xp`; no historical room/question/lab/achievement XP is inferred or back-awarded. After cutover, award 50 for a verified current-version room completion, 25 for each distinct server-verified question, 75 for a verified lab, and a configured achievement bonus once when the trusted achievement award occurs. Unique event keys prevent replays. Client-supplied XP values, event types, and verification flags are not trusted. Legacy progress and historical achievements create no new events.

This is still a proposal, not an installed ledger or authoritative answer-verification service. `academy-sync.js` filters remote room-progress reads by current `curriculum_id`, but its offline/guest fallback still derives XP locally. The UI branch was intentionally left untouched. Consequently, server-authoritative XP for all modes and verified question XP are **not ready**. Implement the ledger and server validation as a separate reviewed migration and coordinate the client display/cutover before enabling XP awards.

## Blocker 2 — migration drift protection

`supabase/migrations/202611200001_calion_four_path_reconciliation.sql` starts a transaction and takes `SHARE ROW EXCLUSIVE` locks before checking the baseline. It fails closed unless it sees the audited room IDs/metadata, path metadata, eight room-progress states, empty task progress, relevant columns, 39 constraints/indexes, trigger function source, two enabled trigger definitions, and achievement catalog/threshold. Fingerprints were captured read-only from production on 2026-11-19 and are embedded as explicit equality checks. Unexpected changes abort instead of being upserted over.

The migration snapshots profiles, room progress, task progress, and achievements, then verifies the exact snapshots after reconciliation. It does not assign `status`, `progress_pct`, answers, progress timestamps, profile XP, or achievement rows. Existing progress rows and room IDs/FKs are retained; their same-ID historical topics are versioned as legacy and receive no current completion credit. The catalog assertion requires 47 rooms split 10/10/12/15.

Both relevant room-progress triggers are required to match their audited definition and `tgenabled='O'` before work begins. They are disabled only around legacy metadata assignment, then enabled explicitly; the final assertion requires both enabled. PostgreSQL transactional DDL restores the original trigger state automatically if any statement errors before commit. This is safe only for the reviewed original state `O`; any disabled/replica/always state causes preflight abort rather than normalization.

The static drift test passes. The migration has **not** been run against a disposable production clone or applied to production, so SQL execution and failure-injection behavior remain unverified. Re-capture and compare all fingerprints immediately before any approved execution; the baked-in snapshot is not a substitute for that live preflight.

## Blocker 3 — migration history

Read-only `supabase migration list --remote` returned no recorded versions. Four local baseline versions (`202611170001`, `202611170002`, `202611170003`, `202611190001`) are therefore all unrecorded remotely. Production catalog/data/function evidence resembles their effects, but cannot prove execution provenance or complete successful execution. `IF NOT EXISTS`, upserts, extension creation, policy replacement, grants, and SQL Editor execution may produce indistinguishable final states. Local checksums only identify local file contents; they do not establish remote execution.

The duplicate local version was resolved without touching remote history: the two unreflected/incompatible files are archived under `supabase/archive/20261120-unapplied-incompatible/`:

- `202611180001_calion_academy_47_rooms_seed.sql`
- `202611190001_calion_pre_security_curriculum_v2.sql`

The four baseline migration files remain active and all appear pending to the CLI. Do not run migration repair or db push. First obtain trusted execution evidence from project audit logs/SQL Editor records for each baseline. For any baseline without provenance, prepare an independently reviewed baseline reconciliation and a history plan; matching schema effects alone are insufficient to mark it applied. Only after that evidence and separate approval may migration history be reconciled. No command that mutates migration history was run.

## Read-only production evidence

Read-only CLI target: linked Supabase project `CALION LEARNING` (production).

| Evidence set | Observed result | Fingerprint |
|---|---:|---|
| Existing rooms | 45 rows | `102a55759ea05d5fff4681472d8e9afb` |
| Learning paths | 3 rows | `e3f21808e2ee78a31b633dbf8ef0ac15` |
| Room progress | 8 rows (8 completed, 0 in progress) | `6dfbf291e77c51eef66de9a6c6144d48` |
| Task progress | 0 rows | `d41d8cd98f00b204e9800998ecf8427e` |
| Relevant public columns | 40 | `b45d4c16160624d89c4ddd0d2f862e1b` |
| Relevant constraints/indexes | 39 | `92847896992f7e999f5bc1ffa6d071a9` |
| Completion/room-progress/milestone function sources | Three audited hashes | `828fd6f9e9b569b2c09e65d447437d13`, `66a51c11eeb95e731d02671895472b99`, `d386d11d907dfb3230e00ddedd4b0738` |
| Achievements | 9 rows; Pre-Security threshold 10 | `caab64e9a4572b5efb54b1f591cd55dc` |
| Profile XP | 1 profile, aggregate 250 | `7f5de953f8d43b1ae8df589a87d19d55` |

The fingerprints are audit evidence, not migration checksums or proof of who ran SQL. The production state was not re-read after the above audit, and no writes were made.

## Validation run

The following local suites passed:

- `tests/academy-curriculum-reconciliation.js`
- `tests/academy-reconciliation-drift.js`
- `tests/xp-accounting.js`
- `tests/academy-curriculum-audit.js`
- `tests/progress-idempotency.js`
- `tests/security-audit.js`
- `tests/learning-architecture.js`
- `tests/curriculum-integrity.js`

They verify the local curriculum data and static migration properties. They do not constitute a live database migration test, browser/mobile test, production deployment check, or execution-history proof. `git diff --check` passed. No frontend changes were made. Current branch is `feature/calion-academy-ui-polish`; existing UI work remains outside the files changed for this audit.

## Final decision

**NO-GO.** The curriculum migration is prepared with fail-closed drift checks and XP preservation assertions, but it is not ready to deploy because (1) verified-event XP and server-side answer validation are only designed, and guest XP remains locally calculated; and (2) the remote migration ledger is empty with no trusted provenance to safely reconcile the four pending baselines. Do not execute migration repair, db push, or deploy. Production schema, data, migration history, and deployment remain unchanged.
