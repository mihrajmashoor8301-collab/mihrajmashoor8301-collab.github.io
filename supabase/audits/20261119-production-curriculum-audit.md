# CALION production curriculum audit (read-only)

Audit target: linked Supabase project **CALION LEARNING / production**. All database queries used `supabase db query --remote --read-only`; CLI project and migration metadata commands were read-only. No production changes were made.

## Findings

## Final read-only progress reread

A later read-only query in this review found **8** `room_progress` rows, all completed: `room-01` through `room-07`, plus `room-11`. This supersedes the earlier five-row snapshot and its room-04 in-progress status above; that earlier snapshot remains in the historical section for provenance only. The reconciliation migration and its tests now use the later exact state and fingerprint `6dfbf291e77c51eef66de9a6c6144d48`.

The three additional rows are `room-05` (legacy title: Programs, Processes & Background Services; current title: Linux Fundamentals), `room-06` (Operating Systems & User Permissions; current title: Windows Fundamentals), and `room-07` (Introduction to Linux & The Command Line; current title: Command-Line Fundamentals). Production stores no lesson objectives or question content for the historical curriculum, and the current IDs do not prove topic equivalence. Preserve all three as legacy progress without transferring completion credit. This conservative decision avoids attributing historical work to current rooms without objective-level evidence.


- Application source `learning-data.js` has 47 rooms in four paths: Pre-Security 10, Cyber Security Foundations 10, Defensive Security 12, Offensive Security 15.
- Production has 45 room rows. IDs `room-01` through `room-45` exist; `room-46` and `room-47` are missing. There are no extra room IDs.
- All 45 production room rows are assigned to `pre-security`. All 45 titles differ from the authoritative title at the same stable room ID. The DB question threshold also differs on 41/45 existing rows (DB has 2 questions, app curriculum has 3 on every room). No remapping based on old topic names was inferred.
- Production path rows are `pre-security`, `cyber-security-101`, and `jr-pentester`; only `pre-security` matches a current application path ID. The proposed migration adds the other three app IDs and keeps the two retired rows inactive rather than deleting them.
- Production room records do not have `curriculum_id` or `stage_id`; the old 12-room curriculum migration is not reflected in schema. The `rooms.id` check only accepts `room-XX`, so the `ps-room-XX` compatibility map is application-side; no `ps-room-XX` progress rows were found.
- Five `room_progress` records reference canonical IDs (four completed, one in progress); no progress room ID is outside the 47-room application curriculum. They are `room-01`, `room-02`, `room-03`, `room-04` and `room-11`. The revised proposal assigns the five existing room_progress rows to `calion-legacy-45-v1`, snapshots their old room metadata, and leaves their status, answers, percentages and timestamps intact. Since their old topics are not substantially equivalent to the current topics at the same IDs, none receives current-curriculum completion credit. New app writes use `calion-academy-47-v1`, allowing a learner to complete the new room independently. task_progress receives the same curriculum version boundary; production had zero task_progress rows at audit time. XP and achievement rows are not edited by the migration.
- `room_progress.room_id` references `rooms.id` with `ON DELETE CASCADE`; `task_progress.room_id` also cascades. `rooms.path_id` references `learning_paths.id` with `ON DELETE SET NULL`. Per-user room progress is currently unique on `(user_id, room_id)`. The proposal changes uniqueness to `(user_id, room_id, curriculum_id)`, keeping the room FK intact while allowing legacy and current records to coexist. It performs no deletes.
- The current `pre-security-graduate` achievement row is correctly set to 10. The proposed milestone function counts only current-version room progress for current room milestones and requires exactly 10 current Pre-Security rooms completed out of exactly 10 catalog rooms. Existing user_achievements rows remain untouched and their unique `(user_id, achievement_id)` constraint prevents duplicate records.
- The existing client and server XP calculations disagree. The server function's current recalc is not a safe source of truth because it counts historical completions and omits the app's 25 XP per solved question. No historical question XP is inferred. The revised migration removes profile XP recalculation from milestone evaluation; it does not update `profiles.total_xp`. A separate XP ledger design treats each existing profile total as an immutable opening balance and awards only verified, unique post-cutover events.
- `supabase migration list --remote` shows zero recorded remote migration versions. This only describes migration history; it does not mean the schema is empty or that no SQL was manually run. Read-only catalog checks show the baseline schema and 45-room seed, security hardening, and the path-progress change reflected in production. The 47-room seed is not reflected. The 12-room `ps-room-XX` migration is not reflected. The SQL Editor migration therefore remains unrecorded. Two local files share version `202611190001`; the pre-security v2 migration is the un-applied conflicting file.

## Migration review: revised proposal (not executed)

The local application changes version Supabase reads/upserts and browser progress keys. Existing unversioned `calion_*` and older `endlessus_*` progress keys remain stored but are not imported into current progress because their source curriculum cannot be proven. XP/lab totals remain retained. Apply app and schema as a coordinated release with a short room-progress write freeze: old clients target the old conflict key, while new clients require `curriculum_id`. Local progress remains saved for later safe attribution; after the database migration, only newly versioned progress syncs as current.

`202611200001_calion_four_path_reconciliation.sql` is a local proposal only. It uses a transaction and aborts if room IDs outside room-01..room-47 exist or the known 10-room achievement threshold is absent. It:

- Adds `curriculum_id` and legacy metadata snapshots to room_progress, assigning existing rows to `calion-legacy-45-v1` before catalog metadata changes. Existing row status, progress percentage, question JSON, and timestamps are not updated.
- Changes progress uniqueness to include `curriculum_id`, retaining the `room_progress.room_id -> rooms.id` FK. It also versions task_progress and preserves existing task rows; the audited production table had zero such rows.
- Upserts four canonical learning paths; keeps retired path rows but deactivates them. It upserts all 47 authoritative room IDs/titles/descriptions/path assignments/question counts and adds missing room-46/47. It deletes no rooms or paths.
- Replaces the room completion guard to use the snapshotted legacy question threshold for legacy rows and the current room's threshold for current rows. It does not promote legacy in-progress rows based on current content.
- Replaces milestone evaluation so new room/path awards require current curriculum completions. Historical `user_achievements` are not removed. The Pre-Security graduation branch explicitly requires 10 catalog rooms and 10 distinct current completed rooms.
- Replaces milestone eligibility with current-curriculum filtering, and removes profile XP recomputation from that function. XP awards are paused pending the separate trusted-ledger implementation. Before assigning legacy metadata, it disables the two progress triggers only after verifying their definitions and enabled states; the transaction rolls back trigger state if any operation fails, and explicit postconditions require original enabled states. It does not invoke milestone evaluation or update profile rows.
- Asserts exactly 47 rooms and the 10/10/12/15 path split before commit.

The migration's metadata updates change what a shared room ID means in `rooms`, but every existing progress record keeps a historical curriculum label and title/path/question-count snapshot on the same row. The progress UPDATE is performed with the XP and completion triggers disabled, and only version/snapshot columns are assigned. New UI reads are filtered to `calion-academy-47-v1`; no old completion is converted into a current completion. Historical progress remains queryable under the legacy label.

## Same-ID historical topic comparison

The live database has room metadata, not lesson/question bodies. This comparison uses the old database title and the current application title only; it is not a cross-ID mapping. A topic overlap is not evidence that a learner completed the current content.

| ID | Production title before reconciliation | Current application title | Same-ID topic assessment |
|---|---|---|---|
| room-01 | Welcome to Cybersecurity & Ethical Hacking | Introduction to Computers | Different topic at this ID based on available titles. |
| room-02 | How Computers & The Internet Work | How the Internet Works | Partial overlap: Internet is common; the legacy title also includes computers. |
| room-03 | Computer Hardware & System Architecture | Networking Fundamentals | Different topic at this ID based on available titles. |
| room-04 | Filesystems, Folders & File Types | Network Protocols and Ports | Different topic at this ID based on available titles. |
| room-05 | Programs, Processes & Background Services | Linux Fundamentals | Partial overlap: legacy processes/services can overlap broad Linux material. |
| room-06 | Operating Systems & User Permissions | Windows Fundamentals | Partial overlap: legacy OS permissions overlap broad Windows fundamentals. |
| room-07 | Introduction to Linux & The Command Line | Command-Line Fundamentals | Partial overlap: Linux CLI vs general command-line fundamentals. |
| room-08 | Navigating the Filesystem (pwd, ls, cd) | Web Fundamentals | Different topic at this ID based on available titles. |
| room-09 | Creating, Moving & Deleting Files (touch, mkdir, cp, mv, rm) | Introduction to Virtualization | Different topic at this ID based on available titles. |
| room-10 | Viewing & Searching Files (cat, head, tail, grep, find) | Introduction to Cybersecurity | Different topic at this ID based on available titles. |
| room-11 | Linux Permissions & Ownership (chmod, chown, sudo) | Security Fundamentals | Different topic at this ID based on available titles. |
| room-12 | Processes & System Monitoring (ps, top, kill) | CIA Triad and Security Principles | Different topic at this ID based on available titles. |
| room-13 | Pipes, Redirection & Command Chaining (>, >>, \|, &&) | Threats, Vulnerabilities and Risks | Different topic at this ID based on available titles. |
| room-14 | Environment Variables & Basic Bash Scripting | Authentication and Access Control | Different topic at this ID based on available titles. |
| room-15 | Windows Architecture & The NTFS Filesystem | Cryptography Fundamentals | Different topic at this ID based on available titles. |
| room-16 | Windows Users, Groups & Access Controls | Malware and Attack Concepts | Different topic at this ID based on available titles. |
| room-17 | Windows Processes, Services & Task Manager | Security Architecture | Different topic at this ID based on available titles. |
| room-18 | Command Prompt (CMD) vs PowerShell | Vulnerability Management | Different topic at this ID based on available titles. |
| room-19 | Windows Security Controls & Event Logs | Security Monitoring Fundamentals | Partial overlap: Windows security controls/event logs vs security monitoring. |
| room-20 | What is a Network? Topologies & Physical Devices | Introduction to Incident Response | Different topic at this ID based on available titles. |
| room-21 | IP Addresses, IPv4 & Physical MAC Addresses | Introduction to Blue Team Operations | Different topic at this ID based on available titles. |
| room-22 | Private vs Public IP Addresses & NAT | Security Operations Centre Fundamentals | Different topic at this ID based on available titles. |
| room-23 | Subnetting & CIDR Notation Demystified | Log Analysis Fundamentals | Different topic at this ID based on available titles. |
| room-24 | TCP vs UDP & The 3-Way Handshake | Windows Event Logs | Different topic at this ID based on available titles. |
| room-25 | Ports & Common Network Services | Linux Log Analysis | Different topic at this ID based on available titles. |
| room-26 | DNS & Domain Name Resolution | Network Traffic Analysis | Different topic at this ID based on available titles. |
| room-27 | DHCP & Automatic Address Assignment (DORA) | SIEM Fundamentals | Different topic at this ID based on available titles. |
| room-28 | The OSI & TCP/IP Models & Network Troubleshooting | Threat Intelligence | Different topic at this ID based on available titles. |
| room-29 | How the World Wide Web Works | Incident Detection and Response | Different topic at this ID based on available titles. |
| room-30 | HTTP Requests, Methods & Status Codes | Digital Forensics Fundamentals | Different topic at this ID based on available titles. |
| room-31 | HTTP Headers, Cookies & Stateful Sessions | Endpoint Security | Different topic at this ID based on available titles. |
| room-32 | TLS, HTTPS & Cryptographic Trust Chains | Defensive Security Capstone | Different topic at this ID based on available titles. |
| room-33 | Web Architecture: HTML, Client vs Server & APIs | Introduction to Ethical Hacking | Different topic at this ID based on available titles. |
| room-34 | The CIA Triad & Core Security Principles | Rules of Engagement and Legal Boundaries | Different topic at this ID based on available titles. |
| room-35 | Threats, Vulnerabilities, Risks & Impacts | Reconnaissance Fundamentals | Different topic at this ID based on available titles. |
| room-36 | Malware & Common Attack Types | Network Enumeration | Different topic at this ID based on available titles. |
| room-37 | Authentication vs Authorization & Modern Identity | Service Enumeration | Different topic at this ID based on available titles. |
| room-38 | Encoding vs Hashing vs Encryption | Web Application Fundamentals | Different topic at this ID based on available titles. |
| room-39 | Defensive Controls, Security Logs & Incident Response | OWASP Top 10 | Different topic at this ID based on available titles. |
| room-40 | Linux Command-Line Investigation | Web Vulnerability Assessment | Different topic at this ID based on available titles. |
| room-41 | File & Permission Auditing (Practical Lab 02) | Authentication Security Testing | Different topic at this ID based on available titles. |
| room-42 | HTTP Security Headers Auditing (Practical Lab 01) | Vulnerability Validation in a Lab | Partial overlap: HTTP header auditing vs generic lab vulnerability validation. |
| room-43 | Network Service & Port Reconnaissance (Practical Lab 08) | Linux Privilege Escalation Fundamentals | Different topic at this ID based on available titles. |
| room-44 | Security Incident Log Analysis (Practical Lab 09) | Windows Privilege Escalation Fundamentals | Different topic at this ID based on available titles. |
| room-45 | Pre Security Capstone Challenge (Practical Lab 13) | Exploitation Concepts in Controlled Labs | Different topic at this ID based on available titles. |

**Conclusion:** the database's 45-room curriculum is a different, differently ordered historical course. I compared the source lessons from the legacy 45-room version and current application lessons for each affected record. None of the five meets the substantial-equivalence threshold. Do not map completion credit based on shared IDs.

| ID | Old database topic and objectives | Current topic and objectives | Decision |
|---|---|---|---|
| room-01 | Cybersecurity introduction, red/blue teams and legal scope | Computer architecture: CPU, memory and hardware | Not equivalent; preserve completed record as legacy only. |
| room-02 | Computer/client-server basics, Internet versus Web and introductory packet concepts | Internet packet switching, routing, AS/BGP and ICMP | Partial overlap only; not equivalent enough for completion transfer. |
| room-03 | Computer hardware and system architecture | Networking fundamentals, addressing and subnet masks | Not equivalent; preserve completed record as legacy only. |
| room-04 | Filesystems, folders, file types and metadata | TCP/UDP transport, handshake and ports | Not equivalent; preserve the 50% in-progress state as legacy only. |
| room-11 | Linux permissions, chmod/chown and sudo | Security assets, attack surface, threats and security fundamentals | Not equivalent; preserve completed record as legacy only. |

Historical progress preserved without current completion credit:

| ID | Current DB title | Current title/path after reconciliation | Existing state |
|---|---|---|---|
| room-01 | Welcome to Cybersecurity & Ethical Hacking | Introduction to Computers · Pre-Security | Completed |
| room-02 | How Computers & The Internet Work | How the Internet Works · Pre-Security | Completed |
| room-03 | Computer Hardware & System Architecture | Networking Fundamentals · Pre-Security | Completed |
| room-04 | Filesystems, Folders & File Types | Network Protocols and Ports · Pre-Security | In progress |
| room-11 | Linux Permissions & Ownership (chmod, chown, sudo) | Security Fundamentals · Cyber Security Foundations | Completed |

Room-11 stays in the legacy curriculum bucket despite the new room-11 path assignment. `curriculum_id` is the discriminator; the app must only count `calion-academy-47-v1` for current progress. The old completion remains available for audit/history and is never auto-transferred.

## Migration review notes

- Room-02 and room-03 historical completions each have two saved answers while their current lessons have three questions. Their legacy rows keep the old threshold snapshot and answer list; new current rows require three questions.
- `room_progress` and `task_progress` are separated by curriculum version. The app sync code added locally filters legacy rows and upserts current records using the three-column conflict key.
- A current completion can only be earned by a current version record. The migration does not create any current progress rows. Historical completion and in-progress states remain untouched.
- No production action has been taken. Approval is still required before any migration-history mutation or deployment.

## Migration-history reconciliation procedure (prepared only)

Remote migration history currently records **zero versions**. Catalog and data evidence is consistent with effects from four baseline migrations (`202611170001`, `202611170002`, `202611170003`, and `202611190001_calion_academy_path_progress.sql`), but effects and matching function source do not prove which SQL operation ran, who ran it, or whether an entire migration completed. In particular, `IF NOT EXISTS`, upserts, policy replacement, grants, and extension creation do not retain execution provenance. Local checksums prove only the contents of local files, not remote execution. Therefore, no baseline is currently justified for marking applied.

The two local files with version `202611190001` have been separated locally: the unreflected, incompatible pre-security curriculum file and the unreflected older 47-room seed are archived under `supabase/archive/20261120-unapplied-incompatible/`. This resolves the duplicate local version without changing the remote ledger. The four baseline files remain pending locally; the new reconciliation migration must not be pushed while that remains true.

Safe history procedure, still preparation only:

1. Obtain trusted Supabase SQL Editor/audit-log evidence identifying each manually executed migration and successful completion, including the complete SQL or an immutable query/audit record. A matching schema alone is insufficient.
2. For every baseline without execution provenance, prepare an independently reviewed baseline reconciliation that documents the exact already-present effects and any unverified/non-idempotent operations. Do not call it applied based only on catalog resemblance.
3. Resolve unknown provenance with Supabase project owner/support and an explicitly approved history plan. Until provenance is established, do not run `migration repair`, `db push`, or a dry-run that could be mistaken for an approved deployment procedure. A normal `db push` would consider all four baseline files pending.
4. After separate approval and verified provenance, reconcile only versions backed by that evidence, then inspect the remote migration list. Do not proceed to the curriculum migration unless the pending set is proven to contain exactly the reviewed migration and the release has a write-freeze/rollback plan.

No migration repair, push, dry-run, or remote migration-history mutation has been executed.

This safely avoids replaying manually applied baseline SQL and avoids replaying the incompatible 12-room migration or older 47-room seed. Migration-history commands have not been executed.

## Rollback plan

Before approval, prepare a restricted backup of `learning_paths`, `rooms`, `room_progress`, `task_progress`, `profiles.total_xp`, `achievements`, `user_achievements`, plus `pg_get_functiondef` and relevant constraints/grants. Capture aggregate XP and progress checksums pre-change.

- If migration errors before commit, PostgreSQL rolls back its transaction.
- If validation fails after commit, restore prior path/room metadata and function/constraint definitions from the backup in a compensating transaction. Deactivate newly added paths and room-46/47 rather than deleting them. Do not delete historical progress, XP, or achievement records.
- Preserve `curriculum_id` and legacy snapshots during rollback; do not merge progress rows or restore the old two-column unique key if current-version duplicate room IDs have since been created. Keep version-aware app code active until a separately reviewed forward migration resolves the rollback state. Restore profile XP only from the exact pre-change backup if an unexpected change is proven, without recomputing it.
- Revert migration history only through an explicitly reviewed repair plan. Do not blindly mark the migration reverted if production objects/data remain.

No repair, push, or migration-history mutation was executed during this audit.
