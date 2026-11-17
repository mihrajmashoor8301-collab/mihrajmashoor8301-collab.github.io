# Manual Cloudflare Setup & Deployment Guide — Endlessus Academy 2.0

This guide explains how Cloudflare DNS, caching, and security headers are configured for `endlessus.in` to support Endlessus Academy 2.0.

---

## 1. Cloudflare DNS & Pages / GitHub Pages Routing

CALION Academy is hosted statically on Cloudflare Pages (or GitHub Pages proxied via Cloudflare) at:
- `https://learning.endlessus.in`

1. In the **Cloudflare Dashboard**, navigate to **DNS → Records** for `endlessus.in`.
2. Ensure the CNAME record for `learning.endlessus.in` is set to `Proxied` (orange cloud).
3. Ensure SSL/TLS encryption mode is set to **Full (strict)** under **SSL/TLS → Overview**.

---

## 2. HTTP Security Headers (Automatic via `_headers` or Transform Rules)

A native Cloudflare Pages `_headers` file is committed at the repository root containing:
- `Content-Security-Policy`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

If deploying outside Cloudflare Pages (e.g. standard Cloudflare CDN proxy in front of custom origin):
1. Navigate to **Rules → Transform Rules → Modify Response Header**.
2. Match criteria: `(http.host eq "learning.endlessus.in" or http.host eq "endlessus.in")`
3. Apply the security headers listed above.

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
