/**
 * Endlessus Academy - Unified Navigation, Search & Theme Controller
 * Authoritative global script for the Endlessus Cybersecurity Academy ecosystem.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. THEME CONTROLLER (ZERO-FLICKER + SYNC)
  // =========================================================================
  const THEME_KEY = 'endlessus_learning_theme';

  function getStoredTheme() {
    const val = localStorage.getItem(THEME_KEY) || localStorage.getItem('endlessus_view_mode') || localStorage.getItem('theme') || 'normal';
    if (val === 'hacker' || val === 'dark') return 'hacker';
    return 'normal';
  }

  function applyTheme(theme, persist) {
    const normalized = (theme === 'hacker' || theme === 'dark') ? 'hacker' : 'normal';
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, normalized);
      } catch (e) {
        console.warn('[Endlessus Theme] localStorage write failed:', e);
      }
    }

    const isHacker = normalized === 'hacker';
    const root = document.documentElement;
    const body = document.body;

    if (isHacker) {
      root.classList.add('dark', 'theme-hacker');
      root.classList.remove('theme-normal');
      if (body) {
        body.classList.add('dark', 'theme-hacker');
        body.classList.remove('theme-normal');
      }
    } else {
      root.classList.remove('dark', 'theme-hacker');
      root.classList.add('theme-normal');
      if (body) {
        body.classList.remove('dark', 'theme-hacker');
        body.classList.add('theme-normal');
      }
    }

    // Sync all theme button states across DOM
    syncThemeButtons(normalized);

    // Notify listeners
    window.dispatchEvent(new CustomEvent('endlessus-theme-changed', { detail: { theme: normalized } }));
  }

  function syncThemeButtons(theme) {
    const isNormal = theme === 'normal';

    // All Tailwind-style toggle buttons
    document.querySelectorAll('#theme-toggle-normal, .theme-toggle-normal').forEach(btn => {
      btn.className = isNormal
        ? 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold bg-primary text-white cursor-pointer transition-all'
        : 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold text-outline hover:text-on-surface cursor-pointer transition-all';
      btn.setAttribute('aria-pressed', isNormal ? 'true' : 'false');
    });

    document.querySelectorAll('#theme-toggle-hacker, .theme-toggle-hacker').forEach(btn => {
      btn.className = isNormal
        ? 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold text-outline hover:text-on-surface cursor-pointer transition-all'
        : 'px-2 py-1 rounded text-xs flex items-center gap-1 font-bold bg-primary text-black cursor-pointer transition-all';
      btn.setAttribute('aria-pressed', isNormal ? 'false' : 'true');
    });

    // Learning Hub CSS buttons
    document.querySelectorAll('#toggle-normal, .toggle-normal').forEach(btn => {
      btn.classList.toggle('active', isNormal);
    });
    document.querySelectorAll('#toggle-hacker, .toggle-hacker').forEach(btn => {
      btn.classList.toggle('active', !isNormal);
    });

    // Generic class-based buttons
    document.querySelectorAll('.academy-theme-btn').forEach(btn => {
      const mode = btn.dataset.theme;
      if (mode) {
        btn.classList.toggle('active', mode === theme);
      }
    });
  }

  // Cross-tab synchronization
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_KEY || e.key === 'endlessus_view_mode') {
      applyTheme(getStoredTheme(), false);
    }
  });

  // Initial immediate application
  applyTheme(getStoredTheme(), false);

  // =========================================================================
  // 2. MASTER ACADEMY SEARCH INDEX
  // =========================================================================
  const ACADEMY_SEARCH_INDEX = [
    // --- STAGES ---
    {
      title: "Stage 00: Absolute Zero",
      desc: "Zero experience required. Discover what cybersecurity is, ethical hacking, and your first terminal command.",
      url: "learning.html#stage-0",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["start", "beginner", "foundations", "zero", "welcome", "terminal", "intro"]
    },
    {
      title: "Stage 01: Computer Architecture & Hardware",
      desc: "CPUs, RAM, storage, motherboard, binary logic, and how computers process instructions.",
      url: "learning.html#stage-1",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["hardware", "cpu", "ram", "storage", "binary", "bus", "registers", "bits"]
    },
    {
      title: "Stage 02: Operating Systems (Linux & Windows)",
      desc: "Kernel vs user space, file systems, permissions, processes, CLI, Bash, and Windows PowerShell.",
      url: "learning.html#stage-2",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["linux", "windows", "kernel", "cli", "bash", "powershell", "processes", "permissions", "filesystem"]
    },
    {
      title: "Stage 03: Networking Foundations",
      desc: "Packets, IP addressing, subnets, ports, TCP/IP, UDP, DNS, DHCP, and Wireshark inspection.",
      url: "learning.html#stage-3",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["networking", "packets", "ip", "subnet", "cidr", "ports", "tcp", "udp", "dns", "dhcp", "wireshark"]
    },
    {
      title: "Stage 04: The Internet, Web Architecture & HTTP",
      desc: "Clients, web servers, HTTP/HTTPS methods, headers, status codes, cookies, sessions, and APIs.",
      url: "learning.html#stage-4",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["web", "http", "https", "headers", "status codes", "cookies", "sessions", "rest", "api", "json"]
    },
    {
      title: "Stage 05: Cybersecurity Fundamentals & Threat Models",
      desc: "The CIA triad, threat actors, vulnerabilities, CVEs, CVSS scoring, defense-in-depth, and attack surfaces.",
      url: "learning.html#stage-5",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["security", "cia triad", "threats", "cve", "cvss", "defense", "vulnerability", "risk", "attack surface"]
    },
    {
      title: "Stage 06: Offensive Security Tools & Scanners",
      desc: "Nmap port scanning, banner grabbing, service detection, Gobuster directory fuzzing, and Nikto.",
      url: "learning.html#stage-6",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["nmap", "tools", "scanners", "gobuster", "nikto", "fuzzing", "enumeration", "ports", "services"]
    },
    {
      title: "Stage 07: Web Application Penetration Testing",
      desc: "OWASP Top 10, SQL Injection, Reflected/Stored XSS, CSRF, IDOR, SSRF, and authentication bypass.",
      url: "learning.html#stage-7",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["web security", "owasp", "sqli", "xss", "csrf", "idor", "ssrf", "injection", "burp suite"]
    },
    {
      title: "Stage 08: Network & System Exploitation",
      desc: "SMB enumeration, Metasploit Framework, reverse vs bind shells, Netcat listeners, and password cracking.",
      url: "learning.html#stage-8",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["exploitation", "smb", "metasploit", "shells", "netcat", "hydra", "john", "hashcat", "passwords"]
    },
    {
      title: "Stage 09: Privilege Escalation & Persistence",
      desc: "Linux SUID binaries, sudo misconfigurations, capabilities, scheduled cron jobs, and LinPEAS enumeration.",
      url: "learning.html#stage-9",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["privesc", "privilege escalation", "suid", "sudo", "cron", "capabilities", "linpeas", "gtfobins"]
    },
    {
      title: "Stage 10: Practical Pentesting Capstone",
      desc: "End-to-end authorized penetration testing methodology, reporting, remediation, and enterprise assessment.",
      url: "learning.html#stage-10",
      type: "Stage",
      badgeClass: "badge-room",
      keywords: ["capstone", "pentest", "assessment", "ptes", "reporting", "remediation", "enterprise", "junior pentester"]
    },

    // --- 13 PRACTICAL LABS ---
    {
      title: "Lab 01: HTTP Security Headers Hardening",
      desc: "Analyze and remediate missing CSP, HSTS, X-Content-Type-Options, and X-Frame-Options headers.",
      url: "labs.html?lab=lab-headers",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["headers", "csp", "hsts", "xfo", "curl", "hardening", "web", "lab 1"]
    },
    {
      title: "Lab 02: Linux Permissions & Octal Masking",
      desc: "Audit UNIX file permissions, calculate octal masks (chmod/chown), and isolate sensitive credential stores.",
      url: "labs.html?lab=lab-permissions",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["linux", "permissions", "chmod", "chown", "octal", "umask", "rwx", "lab 2"]
    },
    {
      title: "Lab 03: Authentication & Rate Limiting Bypass",
      desc: "Analyze broken authentication endpoints, brute-force mitigation gaps, and spoof X-Forwarded-For headers.",
      url: "labs.html?lab=lab-auth",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["auth", "authentication", "rate limiting", "x-forwarded-for", "brute force", "login", "lab 3"]
    },
    {
      title: "Lab 04: Insecure Direct Object References (IDOR)",
      desc: "Identify horizontal privilege escalation vulnerabilities in REST APIs and tamper with user object IDs.",
      url: "labs.html?lab=lab-idor",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["idor", "access control", "api", "horizontal escalation", "object reference", "tampering", "lab 4"]
    },
    {
      title: "Lab 05: UNION-Based SQL Injection",
      desc: "Determine column counts with ORDER BY, identify reflected data types, and extract database records via UNION SELECT.",
      url: "labs.html?lab=lab-sqli",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["sqli", "sql injection", "union select", "order by", "database", "extraction", "payload", "lab 5"]
    },
    {
      title: "Lab 06: Reflected XSS & Context Escaping",
      desc: "Break out of attribute and script contexts, construct harmless alert payloads, and verify input sanitization.",
      url: "labs.html?lab=lab-xss",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["xss", "cross-site scripting", "context escaping", "javascript", "payload", "html", "lab 6"]
    },
    {
      title: "Lab 07: CSRF & SameSite Protections",
      desc: "Construct cross-origin request forging exploits and implement anti-CSRF token verification and SameSite cookies.",
      url: "labs.html?lab=lab-csrf",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["csrf", "cross-site request forgery", "samesite", "anti-csrf token", "cookies", "lab 7"]
    },
    {
      title: "Lab 08: Network Service & SMB Enumeration",
      desc: "Enumerate open ports with Nmap, query RPC endpoints, and extract null-session shared folders using smbclient.",
      url: "labs.html?lab=lab-network",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["network", "nmap", "smb", "smbclient", "shares", "null session", "enumeration", "ports", "lab 8"]
    },
    {
      title: "Lab 09: Security Incident Log Analysis",
      desc: "Investigate Apache access logs and auth.log to detect brute-force attacks, directory fuzzing, and web shells.",
      url: "labs.html?lab=lab-logs",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["logs", "siem", "grep", "auth.log", "access.log", "incident response", "forensics", "blue team", "lab 9"]
    },
    {
      title: "Lab 10: SUID Privilege Escalation",
      desc: "Locate SUID binaries with find, identify GTFOBins breakout techniques, and escalate privileges from cadet to root.",
      url: "labs.html?lab=lab-suid",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["suid", "privesc", "gtfobins", "find", "root", "privilege escalation", "linux", "lab 10"]
    },
    {
      title: "Lab 11: JWT 'None' Algorithm Exploitation",
      desc: "Deconstruct JSON Web Tokens, modify payload claims to admin, sign with 'alg': 'none', and bypass API auth.",
      url: "labs.html?lab=lab-jwt",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["jwt", "tokens", "json web token", "alg none", "signature bypass", "claims", "api", "lab 11"]
    },
    {
      title: "Lab 12: XOR & Frequency Analysis Decryption",
      desc: "Analyze ciphertext byte frequencies, deduce repeating XOR keys, and decrypt intercepted communications.",
      url: "labs.html?lab=lab-crypto",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["crypto", "cryptography", "xor", "frequency analysis", "cipher", "decryption", "keys", "lab 12"]
    },
    {
      title: "Lab 13: Capstone Pentest: Final Enterprise Target",
      desc: "Execute a full multi-stage engagement: Nmap enumeration, web reconnaissance, vulnerability exploitation, and SUID root.",
      url: "labs.html?lab=lab-capstone",
      type: "Practical Lab",
      badgeClass: "badge-lab",
      keywords: ["capstone", "pentest", "enterprise", "root", "nmap", "suid", "full assessment", "junior pentester", "lab 13"]
    },

    // --- INTERACTIVE HUBS ---
    {
      title: "Terminal Practice Sandbox",
      desc: "Interactive Linux and tools command sandbox with 6-stage guided scenarios for Nmap, Gobuster, Hydra, and SQLMap.",
      url: "terminal-lab.html",
      type: "Practice Hub",
      badgeClass: "badge-lab",
      keywords: ["terminal", "sandbox", "cli", "linux", "interactive shell", "hands-on"]
    },
    {
      title: "Interactive Payloads Tester",
      desc: "In-browser web exploit laboratory for SQLi, XSS, Command Injection, SSRF, LFI, and SSTI test probes.",
      url: "payloads.html",
      type: "Practice Hub",
      badgeClass: "badge-lab",
      keywords: ["payloads", "exploits", "sqli", "xss", "lfi", "ssrf", "injection", "tester"]
    },

    // --- REFERENCE & THEORY ---
    {
      title: "Theory & Concepts Reference",
      desc: "Foundational conceptual knowledge: CIA Triad, OSI 7-Layer model, packet journeys, cryptography, and SIEM telemetry.",
      url: "theory.html",
      type: "Reference",
      badgeClass: "badge-glossary",
      keywords: ["theory", "concepts", "osi", "tcp/ip", "cia triad", "cryptography", "packet journey", "threat modeling"]
    },
    {
      title: "The Ethical Hacker's Command Handbook",
      desc: "15 modular command guides covering Linux, Networking, Web, Nmap, Metasploit, PrivEsc, and Security Automation.",
      url: "handbook/index.html",
      type: "Handbook",
      badgeClass: "badge-tool",
      keywords: ["handbook", "commands", "cheatsheet", "linux commands", "nmap commands", "privesc guide", "metasploit"]
    },
    {
      title: "Cybersecurity Tools Encyclopedia & Nmap Builder",
      desc: "13 client-side analysis tools (JWT, CIDR, Base64, Hash ID) + 20 industry tools encyclopedia + interactive Nmap generator.",
      url: "tools.html",
      type: "Tools",
      badgeClass: "badge-tool",
      keywords: ["tools", "nmap builder", "jwt inspector", "cidr calculator", "hash identifier", "burp suite", "wireshark"]
    },
    {
      title: "Penetration Testing Methodology Framework",
      desc: "Structured 12-stage assessment lifecycle from Rules of Engagement to Reporting, plus Attack/Detection/Defense Matrix.",
      url: "methodology.html",
      type: "Methodology",
      badgeClass: "badge-methodology",
      keywords: ["methodology", "ptes", "framework", "lifecycle", "attack matrix", "defense matrix", "reporting", "rules of engagement"]
    },
    {
      title: "Cybersecurity Glossary & Terminology Reference",
      desc: "Comprehensive searchable definitions for 60+ key concepts: CVE, CVSS, CWE, Zero Trust, IDOR, SUID, Kerberos, SIEM.",
      url: "glossary.html",
      type: "Glossary",
      badgeClass: "badge-glossary",
      keywords: ["glossary", "dictionary", "terminology", "acronyms", "definitions", "cve", "cvss", "cwe", "zero trust"]
    },
    {
      title: "Interactive Cybersecurity Career Roadmap",
      desc: "Track your progress across 11 core disciplines: Networking, Linux, Web, Pentesting, PrivEsc, AD, Cloud, and SOC.",
      url: "roadmap.html",
      type: "Roadmap",
      badgeClass: "badge-room",
      keywords: ["roadmap", "career", "disciplines", "tracker", "milestones", "pathway", "skills"]
    }
  ];

  // Dynamically populate rooms into the search index if ENDLESSUS_ROOMS is available
  function enrichSearchIndex() {
    if (typeof ENDLESSUS_ROOMS !== 'undefined' && Array.isArray(ENDLESSUS_ROOMS)) {
      ENDLESSUS_ROOMS.forEach(r => {
        const vocabKeywords = r.vocabulary ? r.vocabulary.map(v => v.term.toLowerCase()) : [];
        const isAlreadyIndexed = ACADEMY_SEARCH_INDEX.some(item => item.url === `learning.html#${r.id}`);
        if (!isAlreadyIndexed) {
          ACADEMY_SEARCH_INDEX.push({
            title: `${r.id.toUpperCase()}: ${r.title}`,
            desc: r.whyAreYouHere ? (r.whyAreYouHere.substring(0, 95) + '...') : r.tagline,
            url: `learning.html#${r.id}`,
            roomId: r.id,
            type: `Room · Stage ${r.stage}`,
            badgeClass: 'badge-room',
            keywords: [r.id, r.title.toLowerCase(), ...vocabKeywords]
          });
        }
      });
    }
  }

  // =========================================================================
  // 3. SEARCH MODAL UI INJECTION & HANDLERS
  // =========================================================================
  let searchBackdrop = null;
  let searchInput = null;
  let searchResults = null;
  let activeIndex = -1;
  let currentMatchingItems = [];

  function ensureSearchModalExists() {
    let modal = document.getElementById('academy-search-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'academy-search-modal';
      modal.className = 'academy-search-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Endlessus Academy Global Search');
      modal.innerHTML = `
        <div class="academy-search-dialog">
          <div class="academy-search-input-wrap">
            <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 20px;">search</span>
            <input type="text" id="academy-search-input" placeholder="Search rooms, labs, tools, commands, concepts..." autocomplete="off">
            <button type="button" class="academy-search-close-btn" id="academy-search-close" title="Close (Esc)">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
          </div>
          <div class="academy-search-results" id="academy-search-results">
            <!-- Results populated dynamically -->
          </div>
          <div class="academy-search-footer">
            <div style="display: flex; gap: 0.75rem;">
              <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
              <span><kbd>Enter</kbd> open</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
            <div>
              <span style="color: var(--color-primary); font-weight: 700;">Endlessus Academy</span> Search
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    searchBackdrop = modal;
    searchInput = document.getElementById('academy-search-input');
    searchResults = document.getElementById('academy-search-results');

    // Close handlers
    const closeBtn = document.getElementById('academy-search-close');
    if (closeBtn) closeBtn.onclick = closeSearch;
    searchBackdrop.onclick = function (e) {
      if (e.target === searchBackdrop) closeSearch();
    };

    // Input handlers
    if (searchInput) {
      searchInput.oninput = function (e) {
        renderSearchResults(e.target.value.trim());
      };
      searchInput.onkeydown = handleSearchKeydown;
    }
  }

  function openSearch() {
    ensureSearchModalExists();
    enrichSearchIndex();
    searchBackdrop.classList.add('open');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    renderSearchResults('');
  }

  function closeSearch() {
    if (searchBackdrop) {
      searchBackdrop.classList.remove('open');
    }
  }

  function handleSearchKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
      return;
    }

    if (currentMatchingItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % currentMatchingItems.length;
      updateActiveSearchItem();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + currentMatchingItems.length) % currentMatchingItems.length;
      updateActiveSearchItem();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < currentMatchingItems.length) {
        navigateToItem(currentMatchingItems[activeIndex]);
      }
    }
  }

  function updateActiveSearchItem() {
    const items = searchResults.querySelectorAll('.academy-search-item');
    items.forEach((el, idx) => {
      el.classList.toggle('selected', idx === activeIndex);
      if (idx === activeIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function navigateToItem(item) {
    closeSearch();
    if (item.roomId && window.location.pathname.endsWith('learning.html') && typeof window.openRoom === 'function') {
      window.openRoom(item.roomId);
    } else {
      window.location.href = item.url;
    }
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    enrichSearchIndex();

    let items = [];
    if (!query) {
      // Default recommended starting rooms and practical labs
      items = ACADEMY_SEARCH_INDEX.slice(0, 8);
    } else {
      const q = query.toLowerCase();
      // Match and score
      items = ACADEMY_SEARCH_INDEX.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.desc && item.desc.toLowerCase().includes(q);
        const keywordMatch = item.keywords && item.keywords.some(k => k.toLowerCase().includes(q));
        return titleMatch || descMatch || keywordMatch;
      });
    }

    currentMatchingItems = items;
    activeIndex = items.length > 0 ? 0 : -1;

    if (items.length === 0) {
      searchResults.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--color-on-surface-variant);">
          <span class="material-symbols-outlined" style="font-size: 2.5rem; color: var(--color-outline); margin-bottom: 0.5rem;">search_off</span>
          <p style="font-size: 0.875rem; font-weight: 500;">No Academy resources found for "${escapeHtml(query)}"</p>
          <p style="font-size: 0.75rem; color: var(--color-outline); margin-top: 0.25rem;">Try searching for "nmap", "sqli", "linux", "headers", or "privesc"</p>
        </div>
      `;
      return;
    }

    const maxDisplay = 10;
    const displayedItems = items.slice(0, maxDisplay);

    let html = '';
    if (!query) {
      html += `<div class="academy-search-group-header">Recommended Foundations & Labs</div>`;
    } else {
      html += `<div class="academy-search-group-header">Found ${items.length} Match${items.length === 1 ? '' : 'es'}</div>`;
    }

    displayedItems.forEach((item, idx) => {
      html += `
        <div class="academy-search-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
          <div class="academy-search-item-left">
            <div class="academy-search-item-title">${escapeHtml(item.title)}</div>
            <div class="academy-search-item-desc">${escapeHtml(item.desc)}</div>
          </div>
          <div class="academy-search-item-right">
            <span class="academy-search-badge ${item.badgeClass || ''}">${escapeHtml(item.type)}</span>
          </div>
        </div>
      `;
    });

    if (items.length > maxDisplay) {
      html += `
        <div style="padding: 0.5rem; text-align: center; font-size: 0.75rem; color: var(--color-outline);">
          Showing top ${maxDisplay} of ${items.length} results. Refine your query for more specific matches.
        </div>
      `;
    }

    searchResults.innerHTML = html;

    // Attach click handlers
    searchResults.querySelectorAll('.academy-search-item').forEach((el, idx) => {
      el.onclick = function () {
        navigateToItem(items[idx]);
      };
      el.onmouseenter = function () {
        activeIndex = idx;
        updateActiveSearchItem();
      };
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 4. GLOBAL EVENT LISTENERS & DROPDOWNS
  // =========================================================================
  function initAcademyGlobalListeners() {
    // Keyboard shortcut Cmd+K or Ctrl+K or / (when not typing in an input)
    window.addEventListener('keydown', function (e) {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        openSearch();
      }
    });

    // Wire any element with data-trigger-cmd, #open-search-btn, or .academy-search-btn
    document.querySelectorAll('[data-trigger-cmd], #open-search-btn, .academy-search-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openSearch();
      });
    });

    // Global delegated theme toggle buttons wiring
    document.addEventListener('click', (e) => {
      const normalTarget = e.target.closest('#theme-toggle-normal, .theme-toggle-normal, #toggle-normal, [data-theme="normal"]');
      if (normalTarget) {
        e.preventDefault();
        applyTheme('normal', true);
        return;
      }
      const hackerTarget = e.target.closest('#theme-toggle-hacker, .theme-toggle-hacker, #toggle-hacker, [data-theme="hacker"]');
      if (hackerTarget) {
        e.preventDefault();
        applyTheme('hacker', true);
        return;
      }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn') || document.getElementById('mobile-drawer-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer') || document.getElementById('mobile-menu-drawer') || document.getElementById('academy-mobile-drawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileDrawer.classList.toggle('open');
        if (mobileDrawer.classList.contains('hidden')) {
          mobileDrawer.classList.remove('hidden');
        }
      });

      // Close mobile drawer on link click
      mobileDrawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Accessible Dropdown Click Toggles (for desktop navigation)
    document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(dropdown => {
      const toggle = dropdown.querySelector('button');
      if (toggle) {
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          const isOpen = dropdown.classList.contains('open');
          // Close others
          document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(d => d.classList.remove('open'));
          if (!isOpen) {
            dropdown.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          } else {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

    // Close open dropdowns on outside click or Esc
    document.addEventListener('click', function () {
      document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(d => {
        d.classList.remove('open');
        const b = d.querySelector('button');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lh-nav-dropdown, .academy-nav-dropdown').forEach(d => {
          d.classList.remove('open');
          const b = d.querySelector('button');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (mobileDrawer) mobileDrawer.classList.remove('open');
      }
    });
  }

  // =========================================================================
  // 5. INITIALIZE ON DOM READY
  // =========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAcademyGlobalListeners();
      syncThemeButtons(getStoredTheme());
    });
  } else {
    initAcademyGlobalListeners();
    syncThemeButtons(getStoredTheme());
  }

  // Expose global API
  window.EndlessusAcademy = {
    setTheme: applyTheme,
    getTheme: getStoredTheme,
    openSearch: openSearch,
    closeSearch: closeSearch,
    searchIndex: ACADEMY_SEARCH_INDEX
  };

})();
