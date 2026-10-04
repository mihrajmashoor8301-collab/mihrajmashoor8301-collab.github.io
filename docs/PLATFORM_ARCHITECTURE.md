# Endlessus Cybersecurity Platform & Learning Hub Architecture Guide

## 1. Executive Overview

This repository powers **[endlessus.in](https://endlessus.in)**, the technical engineering portfolio and educational cybersecurity platform for **Mihraj Mashhoor K** (Top 2% globally on TryHackMe, Google Cybersecurity Certified).

The platform unites five foundational pillars without external build-step dependencies:
1. **Recruiter Portfolio & Verified Case Studies**: Highlighting production-grade security systems (`SentinelAI`, `Autonomous Pentesting Agent`, `OpenCode Persistent Memory`, `Local AI Compute Stack`).
2. **Cybersecurity Learning Hub**: 12 structured foundational and advanced domains, structured around the 11-part pedagogy (Concept, Why It Matters, Commands, Mistakes, Detection, Defense, Labs, Knowledge Graph).
3. **Interactive Client-Side Security Toolkit**: 13 zero-egress browser utilities (Encoders, Hash ID, Subnet Calculator, CSP Evaluator, Regex Tester, JWT Inspector) plus an educational Nmap Command Builder.
4. **Practical Interactive Lab Hub**: 12 self-contained, browser-executable simulation scenarios covering Web, Network, Linux PrivEsc, and Cryptographic analysis.
5. **Methodology, Matrix & Skill Roadmap**: 12-stage offensive lifecycle, 10-vulnerability Attack/Detection/Defense Matrix, and interactive localStorage skill tracker.

---

## 2. Directory Structure & Information Architecture

```
/
├── index.html                  # Main portfolio entry with Dual Portals (Recruiters vs Practitioners)
├── learning.html               # 12-category Cybersecurity Learning Hub (11-part pedagogical model)
├── tools.html                  # 13 client-side tools + Nmap Builder + 20-tool reference database
├── labs.html                   # 12 simulated hands-on security challenge scenarios
├── methodology.html            # 12-stage Pentest Methodology & 10-vuln Attack/Detection/Defense Matrix
├── roadmap.html                # Interactive localStorage skill progression tracker
├── glossary.html               # 60+ cross-linked cybersecurity terms & acronyms
├── terminal-lab.html           # Full-screen interactive terminal sandbox & target simulator
├── payloads.html               # Offensives payloads cheatsheet & encoder
├── resume.html                 # Comprehensive web resume & PDF export
├── certificates.html           # Verified credentials & TryHackMe achievements
├── certificate-viewer.html     # Interactive modal previewer for certificates
├── portfolio-interactive.js    # Global Command Palette (Cmd+K), Terminal drawer (~), Search index
├── sitemap.xml                 # Search engine index with prioritized routes
├── robots.txt                  # Crawl directives pointing to sitemap
├── projects/                   # In-depth technical case studies (13-parameter standardized cards)
│   ├── sentinelai.html
│   ├── autonomous-pentesting-agent.html
│   ├── cyberai.html
│   ├── opencode-persistent-memory.html
│   ├── local-ai-compute-stack.html
│   ├── ai-application-platform.html
│   └── cybersecurity-handbook.html
├── handbook/                   # 15-module static reference guide with 30 companion PDFs
│   ├── index.html
│   ├── library.html
│   └── modules/
└── docs/                       # Platform documentation and developer guides
    └── PLATFORM_ARCHITECTURE.md
```

---

## 3. Core Architectural Decisions

### Zero-Build Deployment
- Deployed directly via **GitHub Pages**.
- Styles utilize Tailwind CSS via CDN with customized dark-mode hex palettes (`#090D12` canvas, `#4EDEA3` mint, `#4CD7F6` cyan, `#F43F5E` critical danger).
- Native Vanilla JavaScript ES6+ without bundling overhead, ensuring instant loading, zero supply-chain vulnerabilities, and maximum transparency.

### Zero-Egress Client-Side Security Model
- All tools in [`tools.html`](../tools.html) (Base64, JWT parsing, Hash ID, CIDR calculations, regex testing) execute **100% locally within the browser DOM**.
- No sensitive user input, tokens, or hashes are transmitted across the network.
- The **Nmap Command Builder** is strictly educational: it generates authorized scan syntax and explains individual flags without initiating network packets.

### Persistent Local Storage
- The **Cybersecurity Roadmap** uses standard `window.localStorage` to persist topic statuses (`Not Started`, `Learning`, `Practicing`, `Completed`).
- Users can export progress as JSON or reset metrics with zero server authentication required.

---

## 4. How to Extend the Platform

### Adding a New Learning Topic (`learning.html`)
Every learning module adheres to the 11-step pedagogical structure:
1. Category badge & Icon
2. Title & Short Definition
3. Why It Matters
4. Prerequisites
5. Core Concepts
6. Practical Examples & Real-World Context
7. Standard Commands & Tools
8. Common Pitfalls & Mistakes
9. Detection Perspective (Blue Team / SIEM / Logs)
10. Defensive Hardening & Mitigation
11. Practice Lab & Connected Knowledge Flow

To add a new article:
1. Locate the appropriate category in `learning.html`.
2. Duplicate an existing `<article class="learning-card ...">` block.
3. Update `data-category` and search keywords.
4. Add the entry to `SEARCH_ITEMS` in `portfolio-interactive.js`.

### Adding a New Tool (`tools.html`)
1. Create a card container in the `#tools-grid` section with an interactive ID.
2. Implement the utility function inside the `<script>` tag. Ensure all inputs are sanitized via `escapeHtml()` and outputs use `.textContent` or `DOMParser` to eliminate DOM XSS risks.
3. Add search keywords in `portfolio-interactive.js`.

### Adding a New Lab Scenario (`labs.html`)
Follow the 10-point lab template:
- `Objective`
- `Difficulty` (`Beginner`, `Intermediate`, `Advanced`)
- `Estimated Time`
- `Scenario Context`
- `Specific Task`
- `Progressive Hints` (3 collapsed hint levels)
- `Answer Reveal` (with confirmation toggle)
- `Technical Explanation`
- `Defensive Remediation`
- `Related Tools & Next Steps`

---

## 5. Security & Verification Standards

1. **DOM Sanitization**: Never inject unescaped user inputs into `.innerHTML`. Use the global `escapeHtml()` helper or native `document.createTextNode()`.
2. **Path Resolution**: Root files reference siblings via direct relative names (`labs.html`), while nested directories (e.g. `projects/` or `handbook/`) reference parent directories via `../`.
3. **No Active Scanning**: Any interactive generator must prominently show ethical testing boundaries: *"Use only against systems you own or are explicitly authorized to test."*
