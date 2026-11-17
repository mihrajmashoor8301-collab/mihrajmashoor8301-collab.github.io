# Manual Cloudflare Setup & Deployment Guide — Endlessus Academy 2.0

This guide explains how Cloudflare DNS, caching, and security headers are configured for `endlessus.in` to support Endlessus Academy 2.0.

---

## 1. Cloudflare DNS & Pages / GitHub Pages Routing

Endlessus Academy is hosted statically and proxied through Cloudflare.

1. In the **Cloudflare Dashboard**, navigate to **DNS → Records** for `endlessus.in`.
2. Ensure the standard CNAME/A records for GitHub Pages or Cloudflare Pages are orange-cloud proxied (`Proxied`).
3. SSL/TLS encryption mode must be set to **Full (strict)** under **SSL/TLS → Overview**.

---

## 2. HTTP Security Headers (Cloudflare Transform Rules)

To ensure high-grade cybersecurity compliance for the Academy, add HTTP response headers via Cloudflare:

1. In Cloudflare, navigate to **Rules → Transform Rules → Modify Response Header**.
2. Create a rule named `Academy Security Headers`:
   - Match criteria: `(http.host eq "endlessus.in")`
   - Set static response headers:
     * `X-Content-Type-Options`: `nosniff`
     * `X-Frame-Options`: `SAMEORIGIN`
     * `Referrer-Policy`: `strict-origin-when-cross-origin`
     * `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`

---

## 3. Caching & Edge TTL Rules

Static HTML and JS files in Endlessus Academy are cached by Cloudflare edge nodes:

1. **Pages (`*.html`):**
   - Edge Cache TTL: 2 hours (or bypass cache in development).
2. **Vendored Assets (`vendor/supabase.min.js`, `tailwind.cdn.js`):**
   - Edge Cache TTL: 1 month (`cache-control: public, max-age=2592000`).
3. **Curriculum Data (`learning-data.js`):**
   - Edge Cache TTL: 1 day.

---

## 4. Redirect Rules

Ensure all requests resolve to HTTPS and canonical URL:
- Enforce **Always Use HTTPS** in **SSL/TLS → Edge Certificates**.
- Optional: Redirect `www.endlessus.in/*` to `https://endlessus.in/$1`.
