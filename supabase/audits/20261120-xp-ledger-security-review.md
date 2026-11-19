# CALION XP ledger — local security and deployment review

## Status

**Local implementation prepared; production deployment is NO-GO.** Nothing was executed against production. No remote migrations, profile XP, progress, achievements, or deployment settings were changed. No migration repair, db push, or push was run. Existing unrelated Supabase/archive/UI working changes were preserved.

## Implementation

- Separate migration: `202611200002_calion_authoritative_xp_ledger.sql` (requires the 47-room curriculum migration `202611200001`; it does not combine with or edit that migration).
- Browser API contract: `academy-xp-client.js` calls only `submit_calion_answer`, `verify_lab_flag`, and reads the caller's profile XP. It sends no XP amounts and cannot access the private ledger. Room and lesson answer forms call the server verifier; authenticated room completion waits for the server completion result. Lab completion remains integrated through the existing `AcademySync` flag-verification RPC.
- Validation queries: `20261120-xp-ledger-validation.sql` (read-only, for use only after approved local/production deployment).

The migration captures exact profile totals as immutable opening balances while locking profiles and progress sources. It creates no initial XP events and does not update `profiles.total_xp` during migration. Existing completed labs and achievements are snapshotted and cannot award again. Legacy room rows do not produce events. The append-only ledger stores a generated event UUID, user, event type, fixed amount, curriculum version, source, and unique per-user event key. Unique keys plus row/advisory transaction locks make retries and concurrent duplicate awards idempotent.

Question awards require an authenticated `auth.uid()`, current curriculum ID, valid room/question IDs, and an answer matching a salted digest stored in a private RLS-enabled schema. Attempts are limited to ten per learner/question in each one-minute window. Correct current questions award 25 XP. The server completes a room only after it counts the room's distinct verified question events, then inserts current-version progress and awards 50 XP once. A database trigger protects a ledger-verified completion from a stale in-progress client upsert. Lab awards remain behind the existing server flag hash verifier and award 75 XP once. Newly earned achievements are evaluated only from ledger-backed room/lab events; their configured bonuses are added once. The helper never accepts an award amount from a browser RPC.

## Security review

| Area | Local result | Remaining limit |
|---|---|---|
| RLS/private ledger | Private schema, RLS enabled, no browser schema/table grants | Must validate grants on the exact deployed Supabase version |
| Definer functions | Fixed search paths; only answer/lab public RPCs granted to authenticated; internal helpers revoked | SQL has not been run against local Postgres/Supabase |
| Authentication | Every award RPC derives user ID from `auth.uid()` and rejects null | Existing local-only guest flow receives no trusted XP; Supabase anonymous-auth users can use authenticated RPCs if that feature is enabled |
| Answers | Server compares salted digests and returns no expected answer | Current `learning-data.js` still exposes `acceptedAnswers` and `correctIndex`; digests do not conceal answers already shipped to browsers |
| Client XP | Answer awards and authenticated header/profile totals use server values; guests get explicitly labeled practice XP | Some progression summaries still calculate local curriculum XP for display; those values are not award inputs. Client-delivered question data still includes answers |
| Historical values | Exact `total_xp` is the opening balance; no historical question XP is inferred; no progress rows are modified | The account formula after rollout assumes all future profile increments use the private award helper |
| Migration history | New version is `202611200002`; separate from curriculum migration | Remote ledger remains unresolved/empty per prior audit, so the migration cannot safely be pushed yet |

Direct client writes to own `room_progress` remain possible under existing RLS, but the new evaluator deliberately ignores them for XP/achievement eligibility. Direct lab completion remains blocked by the existing protection trigger; XP is issued only by the server verifier. The current downloadable answer fields mean a user can inspect correct responses. To meet a stronger no-answer-exposure standard, remove answer keys/correct indexes from the browser bundle and route quiz correctness through the RPC before release.

## Tests and verification

Passed local Node suites:

- `tests/xp-ledger-architecture.js` — RPC shape, unique event keys, legacy isolation, opening balance, guest/unauthorized/invalid-answer cases, and concurrent retry model.
- `tests/xp-accounting.js`
- `tests/academy-curriculum-reconciliation.js`
- `tests/academy-reconciliation-drift.js`
- `tests/progress-idempotency.js`
- `tests/security-audit.js`
- `tests/learning-architecture.js`
- `tests/academy-curriculum-audit.js`

`git diff --check` passed. `tests/xp-ledger-architecture.js` includes a local concurrency model. In addition, the migration and RPC smoke flow were run against a disposable local PostgreSQL 18 database with a minimal fixture: migration completed, all three room questions were accepted, a wrong answer awarded nothing, duplicate question and lab requests returned zero XP, room completion was earned once, and a valid lab awarded once. Two simultaneous PostgreSQL requests for the same question produced exactly one question event and one 25 XP award. A stale in-progress upsert was also verified to retain completed status, 100% progress and the three server-confirmed question IDs. This fixture does not reproduce Supabase Auth/RLS or all production triggers.

## Deployment gates

1. Resolve migration history with trusted execution evidence before running either pending migration; checksums or matching catalog state alone are insufficient.
2. Apply and validate curriculum versioning before this dependent migration.
3. Run the new migration and concurrent RPC integration tests on a disposable local Supabase instance.
4. Run end-to-end tests in a disposable local Supabase instance with the real baseline migrations, Auth roles, RLS policies and existing triggers.
5. Remove `acceptedAnswers` and `correctIndex` from browser-delivered data if answer confidentiality is required.
6. Run the read-only validation SQL and confirm opening-balance plus ledger totals, no legacy events, no duplicate events, and correct function/table grants.

Do not deploy until those gates and migration-history reconciliation are complete.
