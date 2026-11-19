'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const migration = fs.readFileSync(path.join(__dirname, '../supabase/migrations/202611200001_calion_four_path_reconciliation.sql'), 'utf8');
const preflight = fs.readFileSync(path.join(__dirname, '../supabase/audits/20261120-reconciliation-preflight.sql'), 'utf8');

const expectedFingerprints = [
  '102a55759ea05d5fff4681472d8e9afb', // all 45 room rows and metadata, including created_at
  'e3f21808e2ee78a31b633dbf8ef0ac15', // all path rows and metadata, including created_at
  '6dfbf291e77c51eef66de9a6c6144d48', // final read-only reread: eight completed records
  'd41d8cd98f00b204e9800998ecf8427e', // empty task_progress table
  'b45d4c16160624d89c4ddd0d2f862e1b', // relevant schema columns
  '92847896992f7e999f5bc1ffa6d071a9', // constraints and indexes
  '828fd6f9e9b569b2c09e65d447437d13', // completion trigger function
  '66a51c11eeb95e731d02671895472b99', // room progress trigger function
  'd386d11d907dfb3230e00ddedd4b0738', // milestone function
  'caab64e9a4572b5efb54b1f591cd55dc'  // achievement metadata
];
for (const fingerprint of expectedFingerprints) {
  assert(migration.includes(fingerprint), `migration must abort when reviewed fingerprint ${fingerprint} drifts`);
}
assert(preflight.includes('room_metadata_fingerprint') && preflight.includes('path_metadata_fingerprint'));
assert(preflight.includes('room_progress_fingerprint') && preflight.includes('task_progress_fingerprint'));
assert(preflight.includes('constraint_index_fingerprint') && preflight.includes('source_fingerprint'));
assert(migration.startsWith('-- PROPOSED ONLY') && /\bbegin\s*;/i.test(migration) && /\bcommit\s*;\s*$/i.test(migration));
assert(migration.indexOf('lock table public.room_progress') < migration.indexOf('do $$'), 'writes must be frozen before drift checks and snapshots');
assert(migration.includes("tgenabled='O'"), 'precondition must require the audited enabled state');
assert(migration.includes('pg_get_triggerdef(oid)'), 'precondition must compare exact trigger definitions');
assert(migration.includes('disable trigger trg_protect_room_completion'));
assert(migration.includes('enable trigger trg_protect_room_completion'));
assert(migration.includes('disable trigger trg_room_progress_update'));
assert(migration.includes('enable trigger trg_room_progress_update'));
assert(migration.includes('Profile XP changed during curriculum reconciliation'));
assert(migration.includes('Historical room progress changed during curriculum reconciliation'));
assert(migration.includes('Historical task progress changed during curriculum reconciliation'));
assert(migration.includes('Earned achievements changed during curriculum reconciliation'));
const lowerMigration = migration.toLowerCase();
assert(lowerMigration.includes('room catalog differs from the reviewed production baseline'));
assert(lowerMigration.includes('learning path catalog differs from the reviewed production baseline'));
assert(lowerMigration.includes('relevant constraints or indexes differ from the reviewed production baseline'));
assert(migration.includes('A reviewed room progress function definition changed'));
assert(!/update\s+public\.profiles/i.test(migration), 'migration must not execute XP recalculation');
assert(!/drop\s+table|truncate\s+table|delete\s+from/i.test(migration), 'drift migration must not destructively remove data');
console.log('✓ Drift guards cover catalog, schema, progress, constraints, indexes, triggers, functions and achievements');
