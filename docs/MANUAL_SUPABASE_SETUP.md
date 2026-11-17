# Manual Supabase Setup Guide — CALION Academy

Follow this step-by-step guide to configure the **NEW, dedicated Supabase project** for CALION Academy.

> [!IMPORTANT]
> **Do not use the existing Quiz Platform Supabase project.**  
> Create a brand-new Supabase project strictly for CALION Academy.

---

## 1. Create a New Supabase Project

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**.
3. Fill in the details:
   - **Name:** `CALION Academy` (or `calion-academy-prod`)
   - **Database Password:** Choose a strong password and save it securely.
   - **Region:** Select your nearest region (e.g., `ap-south-1` / Mumbai or closest to your users).
   - **Pricing Plan:** Free tier is suitable.
4. Wait for database provisioning to finish.

---

## 2. Execute SQL Migrations (In Strict Sequential Order)

Navigate to the **SQL Editor** in your new Supabase project dashboard.

### Step 2.1: Run Schema Migration
1. Open [`supabase/migrations/202611170001_endlessus_academy_schema.sql`](file:///home/mihraj/mihrajmashoor8301-collab.github.io/supabase/migrations/202611170001_endlessus_academy_schema.sql).
2. Copy the full SQL contents.
3. Paste into the Supabase SQL Editor and click **Run**.
4. Confirm success:
   - Tables created: `profiles`, `learning_paths`, `rooms`, `room_progress`, `labs`, `lab_progress`, `task_progress`, `achievements`, `user_achievements`, `user_activity`.
   - RLS enabled on all 10 tables.
   - Functions & triggers created: `handle_new_user()`, `evaluate_user_milestones()`, `on_room_progress_update()`, `on_lab_progress_update()`.

### Step 2.2: Run Seed Data Migration
1. Open [`supabase/migrations/202611170002_endlessus_academy_seed_data.sql`](file:///home/mihraj/mihrajmashoor8301-collab.github.io/supabase/migrations/202611170002_endlessus_academy_seed_data.sql).
2. Copy the SQL contents.
3. Paste into the Supabase SQL Editor and click **Run**.
4. Confirm success:
   - 3 Learning Paths seeded (`pre-security`, `cyber-security-101`, `jr-pentester`).
   - 45 Pre-Security Rooms seeded (`room-01` through `room-45`).
   - 13 Practical Labs seeded (`lab-headers` through `lab-capstone`).
   - 9 Milestone Achievements seeded (`first-steps`, `explorer`, `dedicated-learner`, `security-enthusiast`, `lab-practitioner`, `lab-specialist`, `lab-master`, `pre-security-graduate`, `streak-week`).

### Step 2.3: Run Security Hardening & Lab Verification Migration
1. Open [`supabase/migrations/202611170003_calion_security_hardening.sql`](file:///home/mihraj/mihrajmashoor8301-collab.github.io/supabase/migrations/202611170003_calion_security_hardening.sql).
2. Copy the SQL contents.
3. Paste into the Supabase SQL Editor and click **Run**.
4. Confirm success:
   - Table created: `lab_secrets` with revoked direct client permissions.
   - 13 Canonical SHA-256 lab flag hashes seeded into `lab_secrets`.
   - RPC function created: `verify_lab_flag(p_lab_id, p_submitted_flag)` (SECURITY DEFINER with restricted search_path).
   - Anti-forgery triggers activated: `trg_protect_lab_verification` on `lab_progress`, `trg_protect_room_completion` on `room_progress`.
   - Column privileges verified for authenticated role.

---

## 3. Configure Supabase Authentication

1. In the Supabase Dashboard, navigate to **Authentication → URL Configuration**.
2. **Site URL:**
   - Set to your production domain: `https://learning.endlessus.in`
   - (For local testing: `http://localhost:8089` or `http://127.0.0.1:8089`)
3. **Redirect URLs:**
   - Add: `https://learning.endlessus.in/profile.html`
   - Add: `https://learning.endlessus.in/auth.html`
   - Add: `https://learning.endlessus.in/learning.html`
   - (For local development: `http://localhost:8089/profile.html`, `http://localhost:8089/auth.html`, `http://127.0.0.1:8089/profile.html`, `http://127.0.0.1:8089/auth.html`)
4. **Email Auth:**
   - Under **Authentication → Providers → Email**, ensure Email is enabled.
   - Configure "Confirm email" based on your preference (disabled for frictionless onboarding or enabled for verified communications).
5. **Google OAuth (Optional):**
   - Under **Authentication → Providers → Google**, configure OAuth client ID and Secret if enabled.

---

## 4. Obtain Public API Credentials

1. In the Supabase Dashboard, navigate to **Project Settings → API**.
2. Copy:
   - **Project URL** (e.g., `https://abcdefghijkl.supabase.co`)
   - **Project API Anon Key** (public `anon` key — NOT `service_role`)

> [!CAUTION]
> **NEVER expose or configure the `service_role` key in frontend code, git, or client configuration.** Only use the public `anon` key.

---

## 5. Connect Credentials to CALION Academy

### Method A: Runtime UI Configuration (Instant)
1. Open `https://learning.endlessus.in/auth.html` (or open it locally).
2. Click **Configure Supabase Keys**.
3. Paste your **Supabase Project URL** and **Anon Key**.
4. Click **Save Credentials & Reload**. Your browser will securely store them in `localStorage`.

### Method B: Static Global Configuration
Update [`academy-config.js`](file:///home/mihraj/mihrajmashoor8301-collab.github.io/academy-config.js) or define `window.CALION_SUPABASE_URL` and `window.CALION_SUPABASE_ANON_KEY`:

```javascript
window.CALION_SUPABASE_URL = "https://your-project-id.supabase.co";
window.CALION_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsIn...";
```
