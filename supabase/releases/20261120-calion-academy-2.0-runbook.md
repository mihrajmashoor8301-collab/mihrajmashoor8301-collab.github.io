# CALION Academy 2.0 controlled release

Prepared on the local integration branch `feature/calion-academy-ui-polish`. This is a runbook only; it has not run against production.

## Before the release window

Build and scan the production assets:

```sh
node scripts/build-pages.js
node tests/browser-answer-key-exposure.js
```

The local build used the safe unconfigured fallback because `CALION_SUPABASE_URL` and `CALION_SUPABASE_ANON_KEY` were not present in this workspace. For publication, rebuild in the authorized Pages/CI environment with its existing public Supabase URL and anon key variables; do not commit generated runtime config or paste credentials into the repository.

Run the regression suite. The PostgreSQL security test needs a disposable local database with the four baseline migrations installed; the full Chromium tests run through their existing test scripts.

```sh
for test_file in tests/*.js; do node "$test_file" || exit 1; done
```

Capture current production evidence without writes:

```sh
npx supabase migration list --remote
npx supabase db query --remote --read-only --output json --file supabase/releases/20261120-calion-academy-2.0-preflight.sql
```

The last observed migration list had six local versions and no recorded remote versions. Do not run `db push`: it would treat the four baseline versions and both release versions as pending.

## Migration history and SQL order

The baseline schema/data/security effects for `202611170001`, `202611170002`, `202611170003`, and `202611190001` are present in production, but the empty remote ledger does not prove when or how they were applied. Confirm the read-only preflight against the live project and have the database owner approve recording those four versions as the existing baseline. This history-only operation does not run their SQL:

```sh
npx supabase migration repair --status applied --remote=lrpiwkkqbghfkqkwesmj 202611170001 202611170002 202611170003 202611190001
npx supabase migration list --remote
```

Proceed only when the remote list shows exactly those four versions applied and exactly `202611200001`, `202611200002` pending. Then run the guarded SQL file through `psql` using a database URL for project `lrpiwkkqbghfkqkwesmj`:

```sh
psql "$CALION_DATABASE_URL" -X -v ON_ERROR_STOP=1 -f supabase/releases/20261120-calion-academy-2.0-deploy.psql
```

The file checks the migration-history gate and applies the two migrations in order. It does not apply or replay any baseline migration. If either migration fails, stop; do not retry blindly. `202611200001` is transactional and preserves the existing XP snapshot. If the second migration fails after the first commits, keep the UI release paused and resolve forward from the recorded schema state.

After both SQL files succeed, reconcile only their migration-history records, then verify the list:

```sh
npx supabase migration repair --status applied --remote=lrpiwkkqbghfkqkwesmj 202611200001 202611200002
npx supabase migration list --remote
```

Run the single-result read-only release validation:

```sh
npx supabase db query --remote --read-only --output json --file supabase/releases/20261120-calion-academy-2.0-postflight.sql
```

Require `room_count=47`, `path_counts=10/10/12/15`, and zero room, XP, event, legacy-award, or private-RLS mismatch counts. Verify `authenticated_can_execute_answer_rpc=true` and all three milestone-execution flags are false. The preflight and postflight SQL each return one JSON row so the CLI does not discard earlier result sets.

## Recovery

- Before each migration commits, PostgreSQL rolls back that migration’s transaction on error.
- If curriculum reconciliation commits but ledger installation fails, leave the site on the previous UI, preserve all data, and apply a reviewed forward fix. Do not rerun the curriculum migration; it is guarded against replay.
- If the XP ledger commits, preserve its opening balances and event rows. Disable new writes through a reviewed forward SQL change if the app release must pause; do not drop the ledger or recompute profile XP.
- After a published UI regression, restore the prior Pages build using the platform’s deployment rollback. Do not reverse database changes by deleting rooms, progress, achievements, XP events, or opening balances. Use a separately reviewed compensating migration if schema recovery is required.
