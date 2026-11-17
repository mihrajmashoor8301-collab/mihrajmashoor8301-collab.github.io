# Endlessus Academy 2.0 Deployment Checklist & Acceptance Verification

Follow this checklist when reviewing and rolling out Endlessus Academy 2.0.

---

## Pre-Deployment Verification

- [x] **Branch Isolation:** All changes created strictly on branch `feature/endlessus-2.0-accounts` in repository `/home/mihraj/mihrajmashoor8301-collab.github.io`.
- [x] **Quiz Platform Protection:** Repository `/home/mihraj/Projects/quiz-platform-cloudflare` is completely untouched on `cloudflare-deployment`.
- [x] **Zero Regressions:** All 45 pre-security rooms, 13 practical labs, and question engines continue to function.
- [x] **Automated Tests:** All 11 automated test suites pass with 100% success rate:
  * `tests/curriculum-integrity.js`
  * `tests/learning-architecture.js`
  * `tests/progress-idempotency.js`
  * `tests/flag-verification.js`
  * `tests/header-lab.js`
  * `tests/header-lab-regress.js`
  * `tests/question-engine.js`
  * `tests/security-tools.js`
  * `tests/xss-terminal.js`
  * `tests/accounts-and-progress.js`
  * `tests/browser-verification.js`

---

## Manual Supabase Setup (By User)

- [ ] Create a **NEW** Supabase project named `Endlessus Academy`.
- [ ] Run migration `supabase/migrations/202611170001_endlessus_academy_schema.sql` in SQL Editor.
- [ ] Run migration `supabase/migrations/202611170002_endlessus_academy_seed_data.sql` in SQL Editor.
- [ ] Configure Site URL to `https://endlessus.in` and add redirect URLs for `/profile.html` and `/auth.html`.
- [ ] Copy the Project URL and public `anon` key.

---

## Post-Deployment Functional Smoke Test

1. **Guest Browsing:** Open `learning.html` in an Incognito window. Verify that rooms, lessons, and labs are accessible without requiring immediate login.
2. **Account Registration:** Navigate to `auth.html`. Fill in a cadet handle, display name, email, and password. Confirm successful registration and profile redirection.
3. **Automatic Profile Creation:** Verify that `profile.html` displays the new cadet's handle, 0/45 rooms, 0/13 labs, and 0 XP.
4. **Room Completion:** Open `room.html?id=room-01`, navigate to lesson, answer questions, and complete the room.
5. **Cross-Device Persistence:** Log into the same account on a second device or browser tab. Confirm that Room 01 appears marked as completed, Pre Security progress shows 2%, and XP is updated to 50 XP.
6. **Milestone Unlocking:** Check that the `first-steps` achievement badge is unlocked with an illumination highlight.
7. **Public Profile Sharing:** Check that `https://endlessus.in/profile.html?u=<username>` displays stats when public, and hides private details when toggled to private.
8. **Local Data Migration:** Complete a room in guest mode, then sign in with a different test account. Verify that local progress is seamlessly migrated to the cloud profile.
