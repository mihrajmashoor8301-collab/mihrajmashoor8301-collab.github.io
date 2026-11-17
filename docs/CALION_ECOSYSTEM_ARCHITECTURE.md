# CALION Ecosystem Architecture Specification
**Document Version:** 2.1.0  
**Parent Brand:** CALION  
**Primary Domain:** `endlessus.in` (Active for ~1 Year)  
**Status:** Approved Architectural Baseline  
**Audience:** Core Platform Engineers, Security Team, and Release Operations

---

## 1. Executive Summary & Brand Hierarchy

The **CALION** ecosystem is a modular cybersecurity platform providing education, documentation, offensive/defensive tooling, and professional portfolio showcases. 

**Brand & Domain Alignment:**
- **Public-Facing Brand:** **CALION**
- **Active Production Domain:** **`endlessus.in`** (maintained as the active root domain for approximately one year).
- **Core Principle:** Shared-nothing, domain-isolated micro-frontends with host-only session boundaries and independent databases.

```
                         ┌─────────────────────────────┐
                         │   endlessus.in (Hub/Root)   │
                         │   CALION Main Landing Page  │
                         └──────────────┬──────────────┘
                                        │
     ┌───────────────────┬──────────────┴───────┬───────────────────┐
     │                   │                      │                   │
     ▼                   ▼                      ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ CALION Academy  │ │ CALION Library  │ │  CALION Tools   │ │Portfolio (Dev)  │
│learning.        │ │notes.           │ │tools.           │ │portfolio.       │
│endlessus.in     │ │endlessus.in     │ │endlessus.in     │ │endlessus.in     │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│• Static HTML/JS │ │• Statically Gen │ │• Client-Side    │ │• Personal Bio & │
│• Dedicated      │ │• Search Index   │ │• Zero Telemetry │ │  Certifications │
│  Academy DB     │ │• Independent DB │ │• No Database /  │ │• Independent    │
│• User Progress  │ │• Read-Only Auth │ │  No Auth        │ │  Static Asset   │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

The Quiz Platform (`quiz-platform-cloudflare`) is a separate product and is not part of the CALION application suite.

---

## 2. Product Specifications & Subdomain Topology

| Application | Domain | Purpose | Tech Stack | Persistence / Auth |
| :--- | :--- | :--- | :--- | :--- |
| **CALION Landing Hub** | `endlessus.in` | Main organizational portal, product switcher, brand introduction | Static HTML5 / CSS / Vanilla JS | None (Static) |
| **CALION Academy** | `learning.endlessus.in` | Cybersecurity curriculum, 45 rooms, 13 labs, XP, achievements | Static HTML5/JS + Supabase JS Client | Dedicated Supabase Project (`calion-academy-prod`) |
| **CALION Library** | `notes.endlessus.in` | Searchable cybersecurity notes, cheatsheets, research PDFs | Static Site Generator (Astro/Hugo) + Cloudflare R2 | Dedicated Read Auth / Headless CMS (Independent) |
| **CALION Tools** | `tools.endlessus.in` | Client-side security utilities, encoders, CIDR, hash identifier | Sandboxed Client JS / PWA | None (Zero Telemetry, In-Memory Only) |
| **Developer Portfolio** | `portfolio.endlessus.in`| Independent developer portfolio, resume, verifiable credentials | Static HTML5 / CSS / Portfolio engine | None (Static) |

---

## 3. Session & Database Isolation

### 3.1 Strict Subdomain Boundaries
- **No Wildcard Cookies:** Tokens and cookies must **never** be scoped to `Domain=.endlessus.in`. All cookies and tokens must default to the exact host origin:
  ```http
  Set-Cookie: __Host-calion-session=...; Secure; HttpOnly; SameSite=Lax; Path=/
  ```
- **Origin-Isolated LocalStorage:** In CALION Academy (`learning.endlessus.in`), Supabase Auth tokens and offline curriculum progress are stored in `localStorage`. Because browser storage is partitioned strictly by origin (`https://learning.endlessus.in`), neither `notes.endlessus.in` nor `tools.endlessus.in` has programmatic access to student authentication tokens or progress states.

### 3.2 Database & Credential Independence
- **Dedicated Supabase Project:** CALION Academy utilizes its own dedicated Supabase project with its own PostgreSQL database.
- **Zero Cross-Querying:** CALION Library and CALION Tools cannot connect to or query the Academy database.
- **Quiz Platform Separation:** The external Quiz Platform (`quiz-platform-cloudflare`) connects to its own database. It shares zero tables, zero secrets, zero user accounts, and zero sessions with CALION Academy.

---

## 4. Cloudflare DNS & Network Topology

All DNS records for `endlessus.in` are managed via Cloudflare edge proxy (`Orange Cloud` enabled):

| Type | Subdomain / Name | Target / Origin | Proxy Status | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME / A** | `@` (`endlessus.in`) | GitHub Pages / Edge Origin | Proxied | CALION Main Landing Portal |
| **CNAME** | `learning` | `mihrajmashoor8301-collab.github.io` | Proxied | CALION Academy |
| **CNAME** | `notes` | Cloudflare Pages / R2 | Proxied | CALION Library |
| **CNAME** | `tools` | Cloudflare Pages / Static Edge | Proxied | CALION Tools |
| **CNAME** | `portfolio` | GitHub Pages / Static Hosting | Proxied | Developer Portfolio |

### Cross-Origin Resource Sharing (CORS) Policy
- Direct cross-origin XMLHttpRequests or `fetch` requests between subdomains are disallowed.
- PostgREST endpoints on the Academy Supabase backend strictly whitelist:
  ```http
  Access-Control-Allow-Origin: https://learning.endlessus.in
  ```
- No redirects to `calion.in` are configured. `endlessus.in` remains the canonical active domain.
