# CALION authoritative XP architecture

Status: local implementation prepared in `202611200002_calion_authoritative_xp_ledger.sql`; it is separate from curriculum reconciliation `202611200001`. It has not been applied anywhere.

## Formula

For each authenticated learner:

`authoritative_total_xp = opening_balance + SUM(append_only_xp_events.xp_amount)`

`opening_balance` is captured from the exact `profiles.total_xp` at ledger rollout. The migration does not update or recalculate profiles, does not create initial ledger events, and does not infer any historical question XP. Existing completed lab and achievement rows are snapshotted to prevent a retry from awarding their bonuses again.

Post-rollout awards are fixed by trusted RPC code:

| Event | XP | Server evidence | Idempotency key |
|---|---:|---|---|
| Room | 50 | Exactly the room's distinct question events were verified for `calion-academy-47-v1`; server writes the current-version completed progress row | `room:calion-academy-47-v1:<room_id>` |
| Question | 25 | Answer matches private per-answer salted digest for a question in that current room/version | `question:calion-academy-47-v1:<room_id>:<question_id>` |
| Lab | 75 | Existing `lab_secrets` flag digest matches; pre-rollout completed labs are excluded | `lab:calion-academy-47-v1:<lab_id>` |
| Achievement | Configured `xp_bonus` | A newly inserted achievement qualifies from ledger events; existing achievements are in the legacy snapshot and do not pay again | `achievement:calion-academy-47-v1:<achievement_id>` |

The table's unique `(user_id,event_key)` constraint, profile row lock, room advisory lock, and transactional event/profile update make retries and concurrent submissions idempotent. Event IDs are server-generated UUIDs. Question attempts are limited to ten per learner/question in a one-minute window. Browser roles have no table/schema privileges and cannot call internal award helpers. Authenticated users can call only answer and lab verification RPCs; user identity always comes from `auth.uid()`.

## Learners and curriculum versions

Authenticated accounts and Supabase anonymous-auth users have an `auth.uid()` and can use the verified RPCs. A guest without an authenticated Supabase identity can continue practice in local storage, but that score is provisional display data; it cannot create a server ledger event or be promoted to authoritative XP by a browser request. A guest must authenticate before server-awarded XP can be earned. Legacy progress and pre-rollout lab/achievement records are never backfilled into the ledger. Current question and room RPCs reject every curriculum ID except `calion-academy-47-v1`.

## Security findings and remaining frontend work

- Existing RLS permits authenticated users to manage their own `room_progress`, so that table is not XP evidence. The new evaluator uses ledger events only. Client writes may still affect non-XP progress display until the UI is migrated to RPC-driven completion.
- Existing lab completion is protected by `verify_lab_flag`; direct transitions to `flag_verified=true` or completed are rejected by its trigger. The migration wraps the verifier with unique XP event insertion and snapshots previously completed labs.
- `profiles.total_xp` has column-level write restrictions in the existing schema. The XP migration preserves them; only the security-definer award helper increments `total_xp`, in the same transaction as a new ledger event.
- The migration stores salted digests in a private RLS-enabled schema, and the answer RPC returns only correctness/award status, never an expected answer. However, current `learning-data.js` still ships `acceptedAnswers` and `correctIndex` to browsers. Those fields can be inspected and the existing `learning.js` still grades locally. The new `academy-xp-client.js` supplies safe RPC calls but is not wired into the current quiz UI. Hiding the answer key and routing quiz feedback through the RPC requires a separate frontend integration; without it, this implementation must not be represented as answer secrecy or enabled as the live quiz path.
- Browser/local XP calculations are display-only and are not accepted by the database. The new client helper reads the profile total for authenticated display and returns no authoritative total for a local-only guest. Integrate that helper into the UI before claiming its XP display is server-authoritative.

## Deployment sequencing

1. Resolve migration history independently. The remote ledger was previously observed empty; no migration repair or db push is authorized or performed by this proposal.
2. Review and deploy curriculum versioning `202611200001` in a controlled write window. The XP migration requires current version columns/catalog.
3. Re-audit current schema and apply this separate migration only after its answer key, lab, achievement, grants, and RLS preconditions pass.
4. Integrate frontend quiz and lab calls with `academy-xp-client.js`; remove `acceptedAnswers`/`correctIndex` from the browser bundle and avoid treating local XP as authoritative.
5. Verify profile totals match opening balance plus ledger sum; exercise duplicate and concurrent calls against a disposable local Supabase instance before production approval.

No production data or profile XP is changed by the local implementation.
