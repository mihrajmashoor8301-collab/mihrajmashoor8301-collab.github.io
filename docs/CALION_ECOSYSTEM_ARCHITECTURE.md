# CALION Ecosystem Architecture Specification
**Document Version:** 2.0.0  
**Parent Brand:** CALION  
**Status:** Approved Architectural Target  
**Audience:** Core Platform Engineers, Security Team, and Release Operations

---

## 1. Executive Summary & Vision

The **CALION** ecosystem represents a modern, modular cybersecurity platform providing education, technical documentation, and practical offensive/defensive tooling. Rather than building a monolithic application with shared sessions and brittle cross-dependencies, CALION strictly adheres to **shared-nothing, domain-isolated micro-frontends**.

The three core products comprising the CALION ecosystem are:
1. **CALION Academy (`learning.calion.in`)**: Interactive cybersecurity curriculum, TryHackMe-style rooms, practical in-browser labs, flag captures, achievements, and persistent learning progress.
2. **CALION Library (`notes.calion.in`)**: High-performance searchable knowledge repository, technical cheatsheets, command references, and downloadable PDF research manuals.
3. **CALION Tools (`tools.calion.in`)**: Zero-telemetry client-side security utilities, packet analyzers, payload synthesizers, encoder/decoder workbenches, and offline calculation engines.

The root domain **`calion.in`** serves as the public gateway, hub, and organizational landing page.

```
                         ┌─────────────────────────┐
                         │   calion.in (Hub/Root)  │
                         │ Cloudflare Edge / Static│
                         └────────────┬────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            │                         │                         │
            ▼                         ▼                         ▼
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│   CALION Academy      │ │   CALION Library      │ │   CALION Tools        │
│  (learning.calion.in) │ │   (notes.calion.in)   │ │   (tools.calion.in)   │
├───────────────────────┤ ├───────────────────────┤ ├───────────────────────┤
│ • Static HTML5/CSS/JS │ │ • Statically Generated│ │ • Pure Client-Side    │
│ • Academy Supabase    │ │ • Search Index / R2   │ │ • Zero Telemetry      │
│ • User Progress & XP  │ │ • Dedicated Read Auth │ │ • No Auth Required    │
│ • Private Session     │ │ • Independent Session │ │ • Sandboxed Execution │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘
```

---

## 2. Platform Separation & Security Isolation

### 2.1 The Shared-Nothing Principle
A foundational tenet of CALION security architecture is **Zero Cross-Platform Blast Radius**:
- A compromise of one application's credentials, API keys, or database tables has **zero effect** on the other products.
- No application shares database connection pools, PostgreSQL databases, or Supabase projects with any other application.
- The external **Endlessus Quiz Platform** (`quiz-platform-cloudflare`) remains completely separate and untouched.

| Dimension | CALION Academy | CALION Library | CALION Tools | Quiz Platform (Legacy/External) |
| :--- | :--- | :--- | :--- | :--- |
| **Domain** | `learning.calion.in` | `notes.calion.in` | `tools.calion.in` | `quiz.endlessus.in` / Cloudflare Worker |
| **Repository** | `mihrajmashoor8301-collab.github.io` | `calion-library` (New) | `calion-tools` (New) | `quiz-platform-cloudflare` |
| **Database** | Supabase Project: `calion-academy-prod` | Independent / Headless CMS / None | None (Client Memory Only) | Supabase Project: `quiz-prod` |
| **Auth System** | Dedicated Academy Auth | Optional Read-Only Auth | None | Quiz Platform Auth |
| **Session Scope** | Host-only (`learning.calion.in`) | Host-only (`notes.calion.in`) | None | Host-only (`quiz.endlessus.in`) |

### 2.2 Cookie & Session Isolation
To prevent cross-site session hijacking, token theft, and cookie pollution across subdomains:
1. **No Wildcard Cookie Domain:** Cookies and session tokens must **never** be set with `Domain=.calion.in`. All cookies must be scoped strictly to the host origin (e.g., `Domain=learning.calion.in` or omitted to default to the exact host).
2. **Secure Token Storage:** In CALION Academy, Supabase Auth tokens are maintained in browser `localStorage` keyed under `calion_auth_token` (with legacy fallback to `sb-<project-id>-auth-token`). Because browser `localStorage` is partitioned strictly by origin (`https://learning.calion.in`), other subdomains have zero programmatic access to these tokens.
3. **Session Attributes:** Where cookies are utilized (e.g., future SSR or Cloudflare Workers), they must enforce:
   ```http
   Set-Cookie: __Host-calion-session=...; Secure; HttpOnly; SameSite=Lax; Path=/
   ```
   The `__Host-` prefix guarantees that the cookie cannot be set or overwritten by subdomains or parent domains.

---

## 3. Product Specifications

### 3.1 CALION Academy (`learning.calion.in`)
- **Mission:** Structured cybersecurity education, interactive rooms, practical hands-on labs, CTF challenges, and TryHackMe-style learning paths.
- **Current Stack:** Pure static HTML5, semantic CSS (`academy.css`), Tailwind CSS compiler, vanilla JavaScript ES6+.
- **Backend Architecture:**
  - Dedicated Supabase PostgreSQL project (`calion-academy-prod`).
  - Row Level Security (RLS) policies enforce least privilege.
  - Server-side SQL triggers enforce XP awards and achievement unlocks (`SECURITY DEFINER` with fixed `search_path`).
- **Core Persistence Tables:**
  - `public.profiles`: Learner handles, display names, avatars, bios, public/private toggles, platform XP, streaks.
  - `public.user_room_progress`: Room status (`not_started`, `in_progress`, `completed`), task completion bitmasks, timestamps.
  - `public.user_lab_progress`: Practical lab states, flag verifications, captured flags.
  - `public.user_achievements`: Milestone badges unlocked strictly via server triggers.
  - `public.user_activity`: 52-week activity heatmap logs and telemetry events.

### 3.2 CALION Library (`notes.calion.in`)
- **Mission:** High-density, fast-loading repository for cybersecurity notes, penetration testing cheat sheets, vulnerability briefs, and research PDFs.
- **Recommended Stack:**
  - Static Site Generator (e.g., Hugo, Astro, or VitePress) producing pre-rendered, search-optimized static HTML.
  - Client-side search powered by Pagefind or MiniSearch (zero server latency, complete privacy).
  - Binary assets (large PDFs, sample PCAPs, vulnerability lab bundles) hosted on Cloudflare R2 object storage with edge caching.
- **Access Model:** Completely public by default. If premium or private research notes are introduced later, they will utilize a dedicated Supabase/Cloudflare Worker auth layer without touching Academy accounts.

### 3.3 CALION Tools (`tools.calion.in`)
- **Mission:** Standalone client-side utilities for security professionals: base64/hex/URL encoders, CIDR subnet calculators, JWT analyzers, port lookups, hash identifiers, and reverse shell generators.
- **Recommended Stack:**
  - Zero-dependency client-side vanilla JavaScript or lightweight Preact/Svelte.
  - Zero server-side persistence, zero telemetry, zero logging of user inputs (crucial for sensitive operations like decoding tokens or analyzing hashes).
  - Sandboxed execution (`Content-Security-Policy: default-src 'self'`).
  - Progressive Web App (PWA) with Service Worker for 100% offline capability.

---

## 4. Network, DNS & Cloudflare Topology

### 4.1 DNS Records Configuration (Cloudflare DNS)
All DNS entries for `calion.in` are managed via Cloudflare with edge proxying (`Orange Cloud` enabled):

| Type | Name | Target / Origin | Proxy Status | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A / CNAME** | `@` (`calion.in`) | GitHub Pages / Edge Hosting | Proxied | Hub & Brand Gateway |
| **CNAME** | `learning` | `mihrajmashoor8301-collab.github.io` | Proxied | CALION Academy |
| **CNAME** | `notes` | Cloudflare Pages / R2 Custom Domain | Proxied | CALION Library |
| **CNAME** | `tools` | Cloudflare Pages / Static Edge | Proxied | CALION Tools |

### 4.2 Cross-Origin Resource Sharing (CORS) Policy
Because all three products are decoupled:
- Direct cross-origin fetch requests between subdomains are **blocked by default**.
- PostgREST endpoints on `calion-academy-prod.supabase.co` are restricted to:
  ```http
  Access-Control-Allow-Origin: https://learning.calion.in
  ```
- If CALION Library or Tools need to embed widgets or badges from Academy:
  - Allowed origin header must explicitly list `https://learning.calion.in`.
  - Sensitive operations (profile updates, XP awards) remain restricted strictly to the Academy origin.

### 4.3 Security Headers
Every response served by Cloudflare edge or origin servers must include standard defense headers:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; connect-src 'self' https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 5. Domain Migration Roadmap (`endlessus.in` -> `calion.in`)

To migrate gracefully from legacy `endlessus.in` to `calion.in` without data loss or broken links:

### Phase 1: Dual-Key Client Storage (Active)
- The Academy codebase supports transparent dual-read and dual-write:
  - Writes to `calion_room_progress`, `calion_streak`, `calion_total_xp`, `calion_learning_theme`.
  - Reads from `calion_*` first; if absent, falls back to legacy `endlessus_*` keys.
  - Ensures existing users lose zero offline progress during the rebrand.

### Phase 2: Staging & Supabase Provisioning
1. Provision dedicated Supabase project `calion-academy-prod`.
2. Execute migration SQL:
   - `supabase/migrations/202611170001_endlessus_academy_schema.sql` (hardened base schema).
   - `supabase/migrations/202611170002_endlessus_initial_data.sql` (achievements and room metadata).
   - `supabase/migrations/202611170003_calion_security_hardening.sql` (RLS and trigger protections).
3. Connect credentials into `academy-config.js` or deployment environment.

### Phase 3: Cloudflare Edge Redirects (When Domain is Ready)
When DNS for `calion.in` is delegated to Cloudflare:
1. Configure Cloudflare Bulk Redirects or Page Rules:
   - `https://endlessus.in/learning.html` -> `301 Moved Permanently` -> `https://learning.calion.in/learning.html`
   - `https://endlessus.in/room.html?*` -> `301 Moved Permanently` -> `https://learning.calion.in/room.html?*`
   - `https://endlessus.in/profile.html?*` -> `301 Moved Permanently` -> `https://learning.calion.in/profile.html?*`
2. Keep `endlessus.in` 301 redirects active for a minimum of 12 months to preserve search indexing, backlinks, and user bookmarks.
