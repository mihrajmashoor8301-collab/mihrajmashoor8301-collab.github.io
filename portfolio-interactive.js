/**
 * Portfolio Interactive System · Mihraj Mashhoor K
 * Version: 3.0.0
 * 
 * Features:
 *  1. Global Command Palette (Cmd+K / Ctrl+K / /)
 *  2. Supercharged Cyber Terminal Emulator (~ / toggle button)
 *     - Tab Autocompletion
 *     - History Navigation (Up/Down)
 *     - Simulated Nmap Scans (ports 22, 80, 443, 8000, 11434)
 *     - Real HTML5 Canvas Digital Matrix Rain
 *     - CVE Vulnerability Intelligence Briefings
 *     - Dynamic Site Accent Theme Switcher (Emerald, Cyan, Amber, Rose, Purple)
 *     - Telemetry (uptime, date, sudo, whoami, skills, projects, tryhackme, cat resume)
 *  3. Global Reading Progress Indicator (Fixed 2.5px Top Bar)
 *  4. Floating Cyber Dock (Terminal Quick Launcher, Command Search, Back to Top)
 *  5. Toast Notification Engine (showToast)
 *  6. 1-Click Code Copy with Syntax Line Stripping
 *  7. Dynamic Project Category Filtering (index.html)
 *  8. Numbers & Metrics Count-Up Animation
 */

(function () {
  'use strict';

  // Determine relative root based on current URL path
  let root = './';
  if (window.location.pathname.includes('/handbook/modules/')) {
    root = '../../';
  } else if (window.location.pathname.includes('/projects/') || window.location.pathname.includes('/handbook/')) {
    root = '../';
  }

  // =========================================================================
  // 1. DATASET FOR COMMAND PALETTE SEARCH
  // =========================================================================
  const SEARCH_ITEMS = [
    // Case Studies
    { title: 'OpenCode Persistent Memory', type: 'CASE STUDY', url: root + 'projects/opencode-persistent-memory.html', desc: 'SQLite-authoritative local persistent memory & dual-engine retrieval for OpenCode', keywords: 'memory opencode sqlite chroma ollama local ai gemma nomic vector source verified' },
    { title: 'SentinelAI: Vuln Intelligence', type: 'CASE STUDY', url: root + 'projects/sentinelai.html', desc: 'AI-powered vulnerability intelligence & knowledge platform with MITRE ATT&CK', keywords: 'sentinelai cve mitre attack rag knowledge graphs triage security' },
    { title: 'Autonomous Pentesting Agent', type: 'CASE STUDY', url: root + 'projects/autonomous-pentesting-agent.html', desc: 'AI-assisted authorized security testing framework on owned targets', keywords: 'pentest offensive agent kali ollama nmap burp qwen autonomous' },
    { title: 'CyberAI: Local Security Platform', type: 'CASE STUDY', url: root + 'projects/cyberai.html', desc: 'Local AI cybersecurity agent platform with Qwen3-Coder 30B & Kali Linux', keywords: 'cyberai local inference ollama qwen security automation agents' },
    { title: 'Local AI Compute Stack', type: 'CASE STUDY', url: root + 'projects/local-ai-compute-stack.html', desc: 'Dedicated private AI inference architecture with zero telemetry', keywords: 'compute stack inference local ai hardware vram quantization ollama' },
    { title: 'AI Application Platform', type: 'CASE STUDY', url: root + 'projects/ai-application-platform.html', desc: 'Full-stack AI developer ecosystem with private local models', keywords: 'ai application platform fullstack developer local models api' },
    { title: 'Cybersecurity Handbook (Case Study)', type: 'CASE STUDY', url: root + 'projects/cybersecurity-handbook.html', desc: 'Case study of the Ethical Hacker Command Handbook documentation system', keywords: 'handbook case study documentation knowledge base' },

    // Core Pages & Sections
    { title: 'Browser Resume', type: 'PAGE', url: root + 'resume.html', desc: 'Interactive browser resume with certifications, experience & skills', keywords: 'resume cv experience education tryhackme credentials' },
    { title: 'Certificates & Credentials', type: 'PAGE', url: root + 'certificates.html', desc: 'Verified security certificates: Google Cyber, TryHackMe Pre-Security & Cyber 101', keywords: 'certificates credentials google tryhackme coursera verify' },
    { title: 'Digital Certificate Viewer', type: 'PAGE', url: root + 'certificate-viewer.html', desc: 'Interactive digital credential inspection viewer with high-res zoom', keywords: 'certificate viewer zoom verification credential id' },
    { title: 'Cybersecurity Handbook (KB)', type: 'KNOWLEDGE BASE', url: root + 'handbook/index.html', desc: '15-module reference handbook covering Nmap, Linux, Metasploit & Web Security', keywords: 'handbook commands cheat sheet nmap metasploit linux reference' },
    { title: 'Handbook Library & Catalog', type: 'KNOWLEDGE BASE', url: root + 'handbook/library.html', desc: 'Full modular catalog of cybersecurity references, tools and scripts', keywords: 'library handbook modules catalog references' },
    { title: 'About & Security Philosophy', type: 'SECTION', url: root + 'index.html#about', desc: 'Engineering background, student journey & security philosophy', keywords: 'about bio profile philosophy background' },
    { title: 'TryHackMe Achievements', type: 'SECTION', url: root + 'index.html#achievements', desc: 'Global Top 2% ranking, 140+ rooms completed, badges', keywords: 'tryhackme thm achievements ranking stats top 2% rooms' },
    { title: 'Skills & Technical Domains', type: 'SECTION', url: root + 'index.html#skills', desc: '9 specialized security domains across offensive & defensive tech', keywords: 'skills recon web network privesc wireless python ai' },
    { title: 'Operational Toolkit', type: 'SECTION', url: root + 'index.html#toolkit', desc: 'Categorized tools: Nmap, Burp Suite, Hydra, Metasploit, Wireshark', keywords: 'toolkit tools nmap burp hydra hashcat metasploit wireshark' },
    { title: 'Practical Lab & Workflows', type: 'SECTION', url: root + 'index.html#lab', desc: 'Hands-on methodology pipeline & personal lab setup', keywords: 'lab workflow methodology practical recon enum exploit' },
    { title: 'Projects Showcase', type: 'SECTION', url: root + 'index.html#projects', desc: 'Explore all major security engineering and AI systems', keywords: 'projects showcase portfolio sentinelai cyberai' },
    { title: 'Contact & Transmit Inquiries', type: 'SECTION', url: root + 'index.html#contact', desc: 'Get in touch for internships, security research & collaboration', keywords: 'contact email linkedin github message transmit' },

    // Handbook Modules
    { title: 'Nmap Scanning Reference', type: 'MODULE', url: root + 'handbook/nmap.html', desc: 'Port discovery, service versioning & NSE script auditing guide', keywords: 'nmap port scan nse scripts banner syn recon' },
    { title: 'Linux Essentials for Practitioners', type: 'MODULE', url: root + 'handbook/linux.html', desc: 'Core Linux security commands, file permissions & SUID analysis', keywords: 'linux bash suid permissions terminal cli' },
    { title: 'Metasploit Framework Guide', type: 'MODULE', url: root + 'handbook/metasploit.html', desc: 'Exploitation concepts, payload generation & Meterpreter sessions', keywords: 'metasploit msfconsole payload meterpreter exploit' },
    { title: 'SearchSploit & Vuln Research', type: 'MODULE', url: root + 'handbook/searchsploit.html', desc: 'Offline CVE searching, exploit verification & CVSS evaluation', keywords: 'searchsploit cve exploit-db vuln research' },

    // Quick Actions
    { title: 'Download CV (PDF)', type: 'ACTION', url: root + 'CV_2026_UPDATED.pdf', desc: 'Download latest technical resume PDF', keywords: 'download cv resume pdf updated' },
    { title: 'Open Interactive Terminal', type: 'ACTION', action: 'terminal', desc: 'Launch browser-based hacker CLI terminal (~ / `)', keywords: 'terminal cli shell quake bash prompt console' },
    { title: 'GitHub Profile ↗', type: 'EXTERNAL', url: 'https://github.com/mihrajmashoor8301-collab', desc: 'Browse open-source security code and repositories', keywords: 'github repo code git source' },
    { title: 'TryHackMe Profile ↗', type: 'EXTERNAL', url: 'https://tryhackme.com/p/mihrajmashoor8301', desc: 'View live TryHackMe badges, room matrix & ranking', keywords: 'tryhackme live profile badges rooms' }
  ];

  // =========================================================================
  // 2. TOAST NOTIFICATION ENGINE
  // =========================================================================
  function showToast(message, type = 'info', duration = 3000) {
    let container = document.getElementById('cyber-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cyber-toast-container';
      container.style.cssText = 'position:fixed;bottom:1.5rem;left:1.5rem;z-index:999999;display:flex;flex-direction:column;gap:0.5rem;pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      pointer-events:auto;
      padding:0.65rem 1rem;
      border-radius:0.75rem;
      font-size:12px;
      font-family:'JetBrains Mono', monospace;
      display:flex;
      align-items:center;
      gap:0.5rem;
      backdrop-filter:blur(12px);
      -webkit-backdrop-filter:blur(12px);
      transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
      transform:translateY(20px);
      opacity:0;
    `;

    if (type === 'success') {
      toast.style.background = 'rgba(14, 19, 27, 0.95)';
      toast.style.border = '1px solid rgba(78, 222, 163, 0.5)';
      toast.style.color = '#4EDEA3';
      toast.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(78, 222, 163, 0.2)';
      toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">check_circle</span><span>${escapeHtml(message)}</span>`;
    } else if (type === 'warn') {
      toast.style.background = 'rgba(14, 19, 27, 0.95)';
      toast.style.border = '1px solid rgba(245, 158, 11, 0.5)';
      toast.style.color = '#F59E0B';
      toast.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(245, 158, 11, 0.2)';
      toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">warning</span><span>${escapeHtml(message)}</span>`;
    } else {
      toast.style.background = 'rgba(14, 19, 27, 0.95)';
      toast.style.border = '1px solid rgba(76, 215, 246, 0.5)';
      toast.style.color = '#4CD7F6';
      toast.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(76, 215, 246, 0.2)';
      toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px;">terminal</span><span>${escapeHtml(message)}</span>`;
    }

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(12px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  window.showToast = showToast;

  // =========================================================================
  // 3. GLOBAL READING PROGRESS BAR (FIXED TOP)
  // =========================================================================
  function initProgressBar() {
    if (document.getElementById('reading-progress-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'reading-progress-bar';
    bar.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      height:2.5px;
      width:0%;
      background:linear-gradient(90deg, #4EDEA3 0%, #4CD7F6 100%);
      z-index:999999;
      transition:width 0.08s ease-out;
      box-shadow:0 0 12px rgba(78, 222, 163, 0.8);
      pointer-events:none;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        bar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
      }
    }, { passive: true });
  }

  // =========================================================================
  // 4. FLOATING CYBER DOCK (BOTTOM RIGHT CONTROLS)
  // =========================================================================
  function initFloatingDock() {
    if (document.getElementById('cyber-floating-dock')) return;
    const dock = document.createElement('div');
    dock.id = 'cyber-floating-dock';
    dock.style.cssText = `
      position:fixed;
      bottom:1.25rem;
      right:1.25rem;
      z-index:90;
      display:flex;
      align-items:center;
      gap:0.5rem;
      font-family:'JetBrains Mono', monospace;
    `;

    dock.innerHTML = `
      <!-- Quick Terminal Pill -->
      <button data-trigger-term class="group relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-raised/90 hover:bg-surface-raised border border-primary/40 hover:border-primary shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md text-primary text-xs font-bold transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:-translate-y-0.5" title="Launch Interactive Cyber CLI (Press ~)">
        <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span class="material-symbols-outlined text-sm">terminal</span>
        <span class="hidden sm:inline">CLI (~)</span>
      </button>

      <!-- Quick Search Pill -->
      <button data-trigger-cmd class="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-surface-raised/90 hover:bg-surface-raised border border-border-hairline hover:border-secondary/50 shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md text-on-surface-variant hover:text-secondary text-xs transition-all cursor-pointer hover:-translate-y-0.5" title="Search Portfolio (Cmd+K or /)">
        <span class="material-symbols-outlined text-sm">search</span>
        <span class="hidden sm:inline text-[11px] text-outline">⌘K</span>
      </button>

      <!-- Scroll to Top Button -->
      <button id="scroll-to-top-btn" class="hidden items-center justify-center w-9 h-9 rounded-xl bg-surface-raised/90 hover:bg-surface-raised border border-border-hairline hover:border-primary shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md text-on-surface-variant hover:text-primary transition-all cursor-pointer hover:-translate-y-0.5" title="Back to Top">
        <span class="material-symbols-outlined text-base">arrow_upward</span>
      </button>
    `;

    document.body.appendChild(dock);

    const topBtn = document.getElementById('scroll-to-top-btn');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        topBtn.style.display = 'flex';
      } else {
        topBtn.style.display = 'none';
      }
    }, { passive: true });

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 5. COMMAND PALETTE MODAL
  // =========================================================================
  function initCommandPalette() {
    const paletteHtml = `
      <div id="cmd-palette" class="fixed inset-0 z-[100] hidden items-start justify-center pt-16 sm:pt-24 px-4 bg-canvas-base/80 backdrop-blur-md transition-opacity">
        <div class="w-full max-w-2xl rounded-2xl bg-surface-subtle border border-primary/40 shadow-[0_0_50px_rgba(78,222,163,0.15)] overflow-hidden flex flex-col max-h-[80vh]">
          <!-- Input Header -->
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-border-hairline bg-surface-raised">
            <span class="material-symbols-outlined text-primary text-xl">search</span>
            <input id="cmd-palette-input" type="text" placeholder="Type a command, project, tool, or section... (ESC to exit)" 
                   class="w-full bg-transparent border-0 outline-none text-on-surface font-mono text-sm placeholder:text-outline focus:ring-0 focus:outline-none"
                   autocomplete="off" spellcheck="false" />
            <span class="px-2 py-0.5 rounded bg-canvas-base border border-border-hairline font-mono text-[10px] text-outline">ESC</span>
          </div>
          <!-- Results List -->
          <div id="cmd-palette-results" class="overflow-y-auto p-2 space-y-1 divide-y divide-border-hairline/40 font-mono text-xs"></div>
          <!-- Footer -->
          <div class="px-4 py-2 border-t border-border-hairline bg-surface-raised/50 flex flex-wrap items-center justify-between text-[11px] font-mono text-outline">
            <div class="flex items-center gap-3">
              <span><kbd class="px-1.5 py-0.5 rounded bg-canvas-base border border-border-hairline text-on-surface">↑↓</kbd> Navigate</span>
              <span><kbd class="px-1.5 py-0.5 rounded bg-canvas-base border border-border-hairline text-on-surface">↵</kbd> Select</span>
            </div>
            <span>Mihraj Mashhoor K · Portfolio Search</span>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', paletteHtml);

    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-palette-input');
    const resultsContainer = document.getElementById('cmd-palette-results');
    let selectedIndex = 0;
    let filteredItems = [];

    function renderResults(query = '') {
      const q = query.trim().toLowerCase();
      filteredItems = SEARCH_ITEMS.filter(item => {
        if (!q) return true;
        return item.title.toLowerCase().includes(q) ||
               item.desc.toLowerCase().includes(q) ||
               item.type.toLowerCase().includes(q) ||
               item.keywords.toLowerCase().includes(q);
      });

      if (filteredItems.length === 0) {
        resultsContainer.innerHTML = `
          <div class="p-6 text-center text-outline">
            <span class="material-symbols-outlined text-2xl text-secondary mb-1">search_off</span>
            <div>No matching security assets or sections found for "${escapeHtml(query)}"</div>
          </div>
        `;
        return;
      }

      selectedIndex = 0;
      resultsContainer.innerHTML = filteredItems.map((item, idx) => {
        const typeBadge = {
          'CASE STUDY': 'text-primary border-primary/30 bg-primary/10',
          'PAGE': 'text-secondary border-secondary/30 bg-secondary/10',
          'SECTION': 'text-on-surface border-border-hairline bg-canvas-base',
          'MODULE': 'text-warning border-warning/30 bg-warning/10',
          'KNOWLEDGE BASE': 'text-secondary border-secondary/30 bg-secondary/10',
          'ACTION': 'text-primary border-primary/40 bg-canvas-base font-bold',
          'EXTERNAL': 'text-outline border-border-hairline bg-canvas-base'
        }[item.type] || 'text-outline border-border-hairline bg-canvas-base';

        return `
          <div class="cmd-item p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${idx === 0 ? 'bg-surface-raised border border-primary/40 text-on-surface' : 'hover:bg-surface-raised text-on-surface-variant'}"
               data-index="${idx}">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="material-symbols-outlined text-sm text-outline shrink-0">
                ${item.type === 'CASE STUDY' ? 'schema' : item.type === 'MODULE' || item.type === 'KNOWLEDGE BASE' ? 'menu_book' : item.type === 'ACTION' ? 'terminal' : 'arrow_right_alt'}
              </span>
              <div class="truncate">
                <div class="font-bold text-on-surface truncate">${item.title}</div>
                <div class="text-[11px] text-outline truncate">${item.desc}</div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded border text-[9px] font-mono shrink-0 uppercase tracking-wider ${typeBadge}">
              ${item.type}
            </span>
          </div>
        `;
      }).join('');

      resultsContainer.querySelectorAll('.cmd-item').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-index'), 10);
          selectItem(filteredItems[idx]);
        });
      });
    }

    function selectItem(item) {
      if (!item) return;
      closePalette();
      if (item.action === 'terminal') {
        openTerminal();
      } else if (item.url) {
        if (item.url.startsWith('http')) {
          window.open(item.url, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = item.url;
        }
      }
    }

    function openPalette() {
      palette.classList.remove('hidden');
      palette.classList.add('flex');
      input.value = '';
      renderResults('');
      setTimeout(() => input.focus(), 50);
    }

    function closePalette() {
      palette.classList.remove('flex');
      palette.classList.add('hidden');
    }

    input.addEventListener('input', (e) => renderResults(e.target.value));

    input.addEventListener('keydown', (e) => {
      const items = resultsContainer.querySelectorAll('.cmd-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length > 0) {
          items[selectedIndex]?.classList.remove('bg-surface-raised', 'border', 'border-primary/40');
          selectedIndex = (selectedIndex + 1) % items.length;
          items[selectedIndex]?.classList.add('bg-surface-raised', 'border', 'border-primary/40');
          items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length > 0) {
          items[selectedIndex]?.classList.remove('bg-surface-raised', 'border', 'border-primary/40');
          selectedIndex = (selectedIndex - 1 + items.length) % items.length;
          items[selectedIndex]?.classList.add('bg-surface-raised', 'border', 'border-primary/40');
          items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          selectItem(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        closePalette();
      }
    });

    palette.addEventListener('click', (e) => {
      if (e.target === palette) closePalette();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        palette.classList.contains('hidden') ? openPalette() : closePalette();
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openPalette();
      } else if (e.key === 'Escape' && !palette.classList.contains('hidden')) {
        closePalette();
      }
    });

    window.openCommandPalette = openPalette;

    document.addEventListener('click', (e) => {
      const cmdBtn = e.target.closest('[data-trigger-cmd]');
      if (cmdBtn) {
        e.preventDefault();
        openPalette();
      }
    });
  }

  // =========================================================================
  // 6. SUPERCHARGED CYBER TERMINAL EMULATOR
  // =========================================================================
  function initCyberTerminal() {
    const terminalHtml = `
      <div id="cyber-terminal-modal" class="fixed inset-0 z-[110] hidden items-center justify-center p-3 sm:p-4 bg-canvas-base/85 backdrop-blur-md">
        <div class="w-full max-w-3xl h-[520px] rounded-2xl bg-surface-subtle border border-primary/50 shadow-[0_0_60px_rgba(78,222,163,0.25)] flex flex-col overflow-hidden font-mono text-xs">
          <!-- Terminal Title Bar -->
          <div class="flex items-center justify-between px-4 py-2.5 bg-surface-raised border-b border-border-hairline select-none">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-danger-critical inline-block cursor-pointer hover:opacity-80" id="term-close-btn" title="Close Terminal"></span>
              <span class="w-3 h-3 rounded-full bg-warning inline-block opacity-75" title="Minimize"></span>
              <span class="w-3 h-3 rounded-full bg-primary inline-block opacity-75" title="Maximize"></span>
              <span class="text-on-surface text-xs font-bold ml-2 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-primary">terminal</span>
                <span>endlessus-term v3.0.0 · guest@sec-station:~$</span>
              </span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-outline">
              <span class="hidden sm:inline">Press <kbd class="px-1 rounded bg-canvas-base border border-border-hairline">TAB</kbd> autocomplete ·</span>
              <span><kbd class="px-1 rounded bg-canvas-base border border-border-hairline">~</kbd> or <kbd class="px-1 rounded bg-canvas-base border border-border-hairline">ESC</kbd> exit</span>
            </div>
          </div>
          <!-- Terminal Output Screen -->
          <div id="terminal-output" class="flex-1 overflow-y-auto p-4 space-y-2 text-on-surface-variant leading-relaxed">
            <div class="text-primary font-bold">
              ════════════════════════════════════════════════════════════════════════════════════<br/>
              &nbsp;&nbsp;MIHRAJ MASHOOR K // OFFENSIVE SECURITY &amp; LOCAL AI RESEARCH MAINFRAME<br/>
              &nbsp;&nbsp;TRYHACKME TOP 2% GLOBALLY (140+ ROOMS) · GOOGLE CYBERSECURITY CERTIFIED<br/>
              ════════════════════════════════════════════════════════════════════════════════════
            </div>
            <div class="text-outline">Type <span class="text-primary font-bold">help</span> to list commands, <span class="text-secondary font-bold">nmap</span> to run simulated network recon, or <span class="text-primary font-bold">matrix</span> for digital rain.</div>
          </div>
          <!-- Terminal Input Row -->
          <div class="flex items-center gap-2 px-4 py-3 bg-canvas-base border-t border-border-hairline">
            <span class="text-primary font-bold select-none shrink-0">guest@sec-station:~$</span>
            <input id="terminal-input" type="text" 
                   class="flex-1 bg-transparent border-0 outline-none text-on-surface font-mono text-xs focus:ring-0 focus:outline-none"
                   autocomplete="off" spellcheck="false" autofocus />
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', terminalHtml);

    const termModal = document.getElementById('cyber-terminal-modal');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const closeBtn = document.getElementById('term-close-btn');

    let history = [];
    let historyIndex = -1;
    let matrixInterval = null;
    let matrixCanvas = null;

    const AUTOCOMPLETE_COMMANDS = [
      'help', 'whoami', 'skills', 'projects', 'tryhackme', 'cat resume',
      'nmap', 'cve', 'matrix', 'theme', 'contact', 'uptime', 'date',
      'sudo', 'echo', 'clear', 'exit'
    ];

    function stopMatrixRain() {
      if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
      }
      if (matrixCanvas) {
        matrixCanvas = null;
      }
    }

    function startMatrixRain() {
      stopMatrixRain();
      appendOutput(`
        <div class="p-2 rounded bg-canvas-base border border-primary/50 relative overflow-hidden my-2" id="matrix-container" style="height: 220px;">
          <canvas id="matrix-canvas" style="position: absolute; inset: 0; width: 100%; height: 100%; display: block;"></canvas>
          <div style="position: absolute; top: 8px; right: 10px; z-index: 10; font-size: 10px; color: #4EDEA3; background: rgba(9,13,18,0.85); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(78,222,163,0.4);">
            DIGITAL RAIN ACTIVE · Type 'clear' to reset
          </div>
        </div>
      `);

      setTimeout(() => {
        const container = document.getElementById('matrix-container');
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas || !container) return;
        matrixCanvas = canvas;
        const ctx = canvas.getContext('2d');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        const characters = '0101010101MIHRAJMASHOOR0123456789ABCDEF$#@%&*<>{}[]';
        const fontSize = 12;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function draw() {
          ctx.fillStyle = 'rgba(9, 13, 18, 0.15)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = '#4EDEA3';
          ctx.font = fontSize + 'px monospace';

          for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }

        matrixInterval = setInterval(draw, 40);
      }, 60);
    }

    function appendOutput(html) {
      const line = document.createElement('div');
      line.innerHTML = html;
      termOutput.appendChild(line);
      termOutput.scrollTop = termOutput.scrollHeight;
    }

    function handleCommand(cmdRaw) {
      const cmd = cmdRaw.trim();
      if (!cmd) return;
      history.push(cmd);
      historyIndex = history.length;

      appendOutput(`<div class="flex items-center gap-2 mt-2"><span class="text-primary font-bold">guest@sec-station:~$</span> <span class="text-on-surface">${escapeHtml(cmd)}</span></div>`);

      const parts = cmd.split(/\s+/);
      const action = parts[0].toLowerCase();
      const arg = parts[1]?.toLowerCase();

      switch (action) {
        case 'help':
          appendOutput(`
            <div class="text-outline my-1">Available System Commands:</div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-on-surface font-mono text-[11px]">
              <div><span class="text-primary font-bold">whoami</span> - Identity &amp; credentials</div>
              <div><span class="text-primary font-bold">skills</span> - Domain capability matrix</div>
              <div><span class="text-primary font-bold">projects</span> - 7 verified case studies</div>
              <div><span class="text-primary font-bold">tryhackme</span> - Top 2% standing &amp; stats</div>
              <div><span class="text-primary font-bold">nmap</span> - Simulated network audit</div>
              <div><span class="text-primary font-bold">cve</span> - Vulnerability briefings</div>
              <div><span class="text-primary font-bold">cat resume</span> - Profile &amp; PDF download</div>
              <div><span class="text-primary font-bold">matrix</span> - Digital rain telemetry</div>
              <div><span class="text-primary font-bold">theme</span> - Change site accent color</div>
              <div><span class="text-primary font-bold">uptime</span> - Telemetry host uptime</div>
              <div><span class="text-primary font-bold">contact</span> - Secure communication routes</div>
              <div><span class="text-primary font-bold">clear</span> - Clear terminal buffer</div>
              <div><span class="text-primary font-bold">exit</span> - Close terminal window</div>
            </div>
            <div class="text-outline text-[10px] mt-1.5">Tip: Press <kbd class="px-1 rounded bg-canvas-base border border-border-hairline">TAB</kbd> to autocomplete commands.</div>
          `);
          break;

        case 'whoami':
        case 'id':
          appendOutput(`
            <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1">
              <div class="text-primary font-bold text-sm">Mihraj Mashhoor K</div>
              <div class="text-on-surface">B.Tech Cybersecurity Undergraduate · Offensive Security Practitioner &amp; Local AI Researcher</div>
              <div class="text-secondary text-[11px]">TryHackMe Top 2% Globally (140+ Rooms Completed) · Google Cybersecurity Professional</div>
              <div class="text-outline text-[11px]">Core Specializations: Network Reconnaissance, Web Application Auditing, Local LLM Tool Integration &amp; Persistent Memory Architectures.</div>
            </div>
          `);
          break;

        case 'skills':
          appendOutput(`
            <div class="space-y-1.5 my-1 text-xs">
              <div><span class="text-primary font-bold">Recon &amp; Web Security:</span> Nmap, Burp Suite, ffuf, OWASP Top 10, SQLi, XSS, Parameter Fuzzing</div>
              <div><span class="text-secondary font-bold">Password &amp; System:</span> Hydra, Hashcat, John the Ripper, SUID PrivEsc, Metasploit Framework</div>
              <div><span class="text-primary font-bold">Local AI &amp; Agents:</span> Ollama, Qwen3-Coder 30B, Gemma4:12b, nomic-embed-text, OpenCode Plugins</div>
              <div><span class="text-on-surface font-bold">Programming &amp; Storage:</span> Python 3, TypeScript, Bash Automation, SQLite 3, ChromaDB, C (Fundamentals)</div>
            </div>
          `);
          break;

        case 'projects':
          appendOutput(`
            <div class="text-secondary font-bold my-1">Engineered Technical Case Studies (Click to inspect):</div>
            <ol class="space-y-1 list-decimal list-inside text-[11px]">
              <li><a href="${root}projects/sentinelai.html" class="text-primary hover:underline font-bold">SentinelAI</a> - Vulnerability Intelligence &amp; Knowledge Platform</li>
              <li><a href="${root}projects/autonomous-pentesting-agent.html" class="text-secondary hover:underline font-bold">Autonomous Pentesting Agent</a> - Multi-Agent Authorized Security Testing</li>
              <li><a href="${root}projects/cyberai.html" class="text-primary hover:underline font-bold">CyberAI</a> - Local AI Cybersecurity Agent Platform</li>
              <li><a href="${root}projects/opencode-persistent-memory.html" class="text-secondary hover:underline font-bold">OpenCode Persistent Memory</a> - Source-Verified Dual-Engine Retrieval</li>
              <li><a href="${root}projects/local-ai-compute-stack.html" class="text-on-surface hover:underline font-bold">Local AI Compute Stack</a> - On-Premises Private Inference</li>
              <li><a href="${root}projects/ai-application-platform.html" class="text-primary hover:underline font-bold">AI Application Platform</a> - Full-Stack AI Ecosystem</li>
              <li><a href="${root}projects/cybersecurity-handbook.html" class="text-secondary hover:underline font-bold">Cybersecurity Handbook</a> - 15-Module Knowledge Base</li>
            </ol>
            <div class="text-outline text-[10px] mt-1">Each case study contains documented architecture, component breakdowns, and verified implementation workflows.</div>
          `);
          break;

        case 'tryhackme':
        case 'thm':
          appendOutput(`
            <div class="p-2.5 rounded bg-canvas-base border border-secondary/40 space-y-1">
              <div class="text-secondary font-bold flex items-center gap-2">
                <span>TryHackMe Competitive &amp; Lab Standing</span>
              </div>
              <div>• Global Percentile: <span class="text-primary font-bold">Top 2% Globally</span></div>
              <div>• Challenge Rooms: <span class="text-primary font-bold">140+ Rooms Completed</span></div>
              <div>• Certified Learning Paths: <span class="text-on-surface">Pre-Security, Cyber Security 101, Jr Penetration Tester Path</span></div>
              <div>• Profile URL: <a href="https://tryhackme.com/p/mihrajmashoor8301" target="_blank" class="text-secondary underline">tryhackme.com/p/mihrajmashoor8301 ↗</a></div>
            </div>
          `);
          break;

        case 'nmap':
        case 'scan': {
          const target = parts[1] || '127.0.0.1';
          appendOutput(`
            <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-xs">
              <div class="text-primary font-bold">Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-04 00:09 UTC</div>
              <div class="text-outline">Nmap scan report for ${escapeHtml(target)} (127.0.0.1)</div>
              <div class="text-outline">Host is up (0.00014s latency). Scanned at rate 1000 pkts/s.</div>
              <div class="text-on-surface mt-2 font-mono whitespace-pre text-[11px]">
<span class="text-outline">PORT      STATE SERVICE      VERSION</span>
<span class="text-primary font-bold">22/tcp    open</span>  ssh          OpenSSH 9.6p1 Debian 4
<span class="text-primary font-bold">80/tcp    open</span>  http         nginx 1.24.0 (Portfolio Gateway)
<span class="text-primary font-bold">443/tcp   open</span>  ssl/http     nginx 1.24.0 (TLS 1.3 / AES-256-GCM)
<span class="text-secondary font-bold">8000/tcp  open</span>  http-alt     ChromaDB Vector Store (OpenCode Persistent Memory)
<span class="text-secondary font-bold">11434/tcp open</span>  http         Ollama Local AI Engine (Qwen3-Coder 30B / Gemma4:12B)
              </div>
              <div class="text-outline text-[11px] mt-2">
                Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel:6.8.0-kali3-amd64<br/>
                Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds
              </div>
            </div>
          `);
          break;
        }

        case 'cve':
        case 'vuln':
        case 'advisories':
          appendOutput(`
            <div class="space-y-2 my-1.5 text-xs">
              <div class="p-2 rounded bg-canvas-base border border-danger-critical/40 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-danger-critical font-bold">[CVE-2024-3094] XZ Utils Embedded Backdoor</span>
                  <span class="px-1.5 py-0.2 rounded bg-danger-critical/20 text-danger-critical text-[10px] font-bold">CVSS 10.0 CRITICAL</span>
                </div>
                <div class="text-outline text-[11px]">Vector: Upstream tarball injection targeting sshd authentication on systemd-linked systems. Mitigation: Triaged and isolated across lab targets.</div>
              </div>
              <div class="p-2 rounded bg-canvas-base border border-warning/40 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-warning font-bold">[CVE-2024-6387] regreSSHion: OpenSSH Pre-Auth RCE</span>
                  <span class="px-1.5 py-0.2 rounded bg-warning/20 text-warning text-[10px] font-bold">CVSS 8.1 HIGH</span>
                </div>
                <div class="text-outline text-[11px]">Vector: Signal handler race condition (SIGALRM) in default OpenSSH server (sshd) on 32/64-bit glibc Linux. Audited in lab environment.</div>
              </div>
              <div class="p-2 rounded bg-canvas-base border border-secondary/40 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-bold">[CVE-2023-38606] Apple Kernel Zero-Day (Operation Triangulation)</span>
                  <span class="px-1.5 py-0.2 rounded bg-secondary/20 text-secondary text-[10px] font-bold">CVSS 7.8 HIGH</span>
                </div>
                <div class="text-outline text-[11px]">Vector: Hardware MMIO register manipulation bypassing page table protection. Cataloged in SentinelAI intelligence graph.</div>
              </div>
            </div>
          `);
          break;

        case 'matrix':
          startMatrixRain();
          break;

        case 'theme': {
          const validThemes = {
            'emerald': '#4EDEA3',
            'green': '#4EDEA3',
            'cyan': '#4CD7F6',
            'blue': '#4CD7F6',
            'amber': '#F59E0B',
            'orange': '#F59E0B',
            'rose': '#F43F5E',
            'red': '#F43F5E',
            'purple': '#A855F7',
            'reset': '#4EDEA3',
            'default': '#4EDEA3'
          };
          if (!arg || !validThemes[arg]) {
            appendOutput(`
              <div class="text-outline my-1">Usage: theme &lt;color&gt;</div>
              <div class="text-xs text-on-surface">Available themes: <span class="text-[#4EDEA3] font-bold">emerald</span>, <span class="text-[#4CD7F6] font-bold">cyan</span>, <span class="text-[#F59E0B] font-bold">amber</span>, <span class="text-[#F43F5E] font-bold">rose</span>, <span class="text-[#A855F7] font-bold">purple</span>, <span>reset</span></div>
            `);
          } else {
            const color = validThemes[arg];
            let styleTag = document.getElementById('dynamic-theme-override');
            if (!styleTag) {
              styleTag = document.createElement('style');
              styleTag.id = 'dynamic-theme-override';
              document.head.appendChild(styleTag);
            }
            styleTag.innerHTML = `
              :root { --primary-accent: ${color} !important; }
              .text-primary, [class*="text-primary"] { color: ${color} !important; }
              .border-primary, [class*="border-primary"] { border-color: ${color} !important; }
              .bg-primary, .bg-primary-container { background-color: ${color} !important; }
              #reading-progress-bar { background: linear-gradient(90deg, ${color}, #4CD7F6) !important; }
            `;
            appendOutput(`<div class="text-primary font-bold">Theme accent updated to: ${arg.toUpperCase()} (${color})</div>`);
            showToast(`Theme updated to ${arg.toUpperCase()}`, 'success');
          }
          break;
        }

        case 'cat':
          if (arg === 'resume' || arg === 'cv') {
            appendOutput(`
              <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-[11px]">
                <div class="text-primary font-bold">RESUME · MIHRAJ MASHOOR K</div>
                <div>Role: Offensive Security Student &amp; Security Automation Researcher</div>
                <div>Education: B.Tech Computer Science &amp; Cybersecurity (CGPA 7.9)</div>
                <div>Downloadable PDF: <a href="${root}CV_2026_UPDATED.pdf" target="_blank" class="text-secondary underline font-bold">CV_2026_UPDATED.pdf ↗</a></div>
                <div>Interactive Version: <a href="${root}resume.html" class="text-primary underline font-bold">Open Browser Resume ↗</a></div>
              </div>
            `);
          } else {
            appendOutput(`<div class="text-warning">Usage: cat resume</div>`);
          }
          break;

        case 'contact':
        case 'email':
          appendOutput(`
            <div class="space-y-1 text-[11px]">
              <div>• Email: <a href="mailto:mihrajmashoor8301@gmail.com" class="text-primary underline">mihrajmashoor8301@gmail.com</a></div>
              <div>• GitHub: <a href="https://github.com/mihrajmashoor8301-collab" target="_blank" class="text-secondary underline">github.com/mihrajmashoor8301-collab ↗</a></div>
              <div>• Portfolio: <a href="https://endlessus.in" class="text-on-surface underline">endlessus.in</a></div>
            </div>
          `);
          break;

        case 'uptime':
          appendOutput(`<div class="text-on-surface">system uptime: <span class="text-primary font-bold">142 days, 18:24</span>, load average: 0.12, 0.08, 0.04 (Kali Linux 6.8 / RTX 4070 / Ollama Active)</div>`);
          break;

        case 'date':
          appendOutput(`<div class="text-on-surface">${new Date().toUTCString()} (Host: sec-station-local)</div>`);
          break;

        case 'sudo':
          appendOutput(`<div class="text-danger-critical">guest is not in the sudoers file. This incident will be reported to Mihraj Mashhoor K.</div>`);
          break;

        case 'echo':
          appendOutput(`<div class="text-on-surface">${escapeHtml(parts.slice(1).join(' '))}</div>`);
          break;

        case 'clear':
        case 'cls':
          stopMatrixRain();
          termOutput.innerHTML = '';
          break;

        case 'exit':
        case 'quit':
          closeTerminal();
          break;

        default:
          appendOutput(`<div class="text-danger-critical">Command not recognized: '${escapeHtml(cmd)}'. Type <span class="text-primary font-bold">help</span> for valid commands.</div>`);
      }
    }

    function openTerminal() {
      termModal.classList.remove('hidden');
      termModal.classList.add('flex');
      setTimeout(() => {
        termInput.focus();
        termOutput.scrollTop = termOutput.scrollHeight;
      }, 50);
    }

    function closeTerminal() {
      stopMatrixRain();
      termModal.classList.remove('flex');
      termModal.classList.add('hidden');
    }

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTerminal();
    });

    termModal.addEventListener('click', (e) => {
      if (e.target === termModal) {
        closeTerminal();
      } else {
        termInput.focus();
      }
    });

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCommand(termInput.value);
        termInput.value = '';
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = termInput.value.trim().toLowerCase();
        if (!current) return;
        const matches = AUTOCOMPLETE_COMMANDS.filter(c => c.startsWith(current));
        if (matches.length === 1) {
          termInput.value = matches[0] + (matches[0] === 'cat resume' ? '' : ' ');
        } else if (matches.length > 1) {
          appendOutput(`<div class="text-outline text-[11px] my-1">${matches.join('&nbsp;&nbsp;&nbsp;&nbsp;')}</div>`);
          let prefix = current;
          while (true) {
            const nextChar = matches[0][prefix.length];
            if (!nextChar || !matches.every(m => m[prefix.length] === nextChar)) break;
            prefix += nextChar;
          }
          termInput.value = prefix;
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          termInput.value = history[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          termInput.value = history[historyIndex] || '';
        } else {
          historyIndex = history.length;
          termInput.value = '';
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeTerminal();
      }
    });

    // Toggle shortcut with backtick (`) or tilde (~)
    window.addEventListener('keydown', (e) => {
      if ((e.key === '`' || e.key === '~') && (document.activeElement !== termInput && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        termModal.classList.contains('hidden') ? openTerminal() : closeTerminal();
      } else if (e.key === 'Escape' && !termModal.classList.contains('hidden')) {
        closeTerminal();
      }
    });

    window.openTerminal = openTerminal;
    window.closeTerminal = closeTerminal;

    // Document-level event delegation for terminal triggers
    document.addEventListener('click', (e) => {
      const termBtn = e.target.closest('[data-trigger-term]');
      if (termBtn) {
        e.preventDefault();
        openTerminal();
      }
    });
  }

  // =========================================================================
  // 7. 1-CLICK CODE COPY HELPER
  // =========================================================================
  function initCodeCopy() {
    const blocks = document.querySelectorAll('pre, .code-container');
    blocks.forEach((block) => {
      if (block.querySelector('.copy-code-btn')) return;

      block.style.position = 'relative';

      const btn = document.createElement('button');
      btn.className = 'copy-code-btn absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-raised/90 hover:bg-surface-raised border border-border-hairline hover:border-primary/50 text-[10px] font-mono text-outline hover:text-primary transition-all shadow-sm z-10';
      btn.innerHTML = `
        <span class="material-symbols-outlined text-[13px]">content_copy</span>
        <span class="copy-label">Copy</span>
      `;

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const codeElement = block.querySelector('code') || block;
        const textToCopy = codeElement.innerText.replace(/^\s*\d+:\s/gm, '');

        try {
          await navigator.clipboard.writeText(textToCopy);
          btn.innerHTML = `
            <span class="material-symbols-outlined text-[13px] text-primary">check</span>
            <span class="copy-label text-primary font-bold">Copied!</span>
          `;
          btn.classList.add('border-primary');
          showToast('Code snippet copied to clipboard', 'success');
          setTimeout(() => {
            btn.innerHTML = `
              <span class="material-symbols-outlined text-[13px]">content_copy</span>
              <span class="copy-label">Copy</span>
            `;
            btn.classList.remove('border-primary');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code: ', err);
        }
      });

      block.appendChild(btn);
    });
  }

  // =========================================================================
  // 8. INTERACTIVE PROJECT FILTER (ON INDEX.HTML)
  // =========================================================================
  function initProjectFilters() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    if (document.getElementById('project-filter-bar')) return;

    const headingBlock = projectsSection.querySelector('h2')?.parentElement;
    if (!headingBlock) return;

    const filterBar = document.createElement('div');
    filterBar.id = 'project-filter-bar';
    filterBar.className = 'flex flex-wrap items-center gap-2 mb-8 font-mono text-xs';
    filterBar.innerHTML = `
      <span class="text-outline text-[11px] mr-1 hidden sm:inline">FILTER:</span>
      <button class="proj-filter-btn active px-3 py-1.5 rounded-lg border border-primary/50 bg-primary/10 text-primary font-bold transition-all" data-filter="all">
        All Projects (7)
      </button>
      <button class="proj-filter-btn px-3 py-1.5 rounded-lg border border-border-hairline bg-surface-subtle text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all" data-filter="offensive">
        Offensive Security (3)
      </button>
      <button class="proj-filter-btn px-3 py-1.5 rounded-lg border border-border-hairline bg-surface-subtle text-on-surface-variant hover:text-secondary hover:border-secondary/40 transition-all" data-filter="ai">
        Local AI &amp; Agents (4)
      </button>
      <button class="proj-filter-btn px-3 py-1.5 rounded-lg border border-border-hairline bg-surface-subtle text-on-surface-variant hover:text-on-surface hover:border-border-highlight transition-all" data-filter="infra">
        Infrastructure &amp; Systems (3)
      </button>
    `;

    headingBlock.parentElement.insertBefore(filterBar, headingBlock.nextElementSibling);

    const cards = projectsSection.querySelectorAll('.bg-surface-subtle.rounded-xl, .bg-surface-subtle.rounded-2xl');
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      let cats = ['all'];
      if (text.includes('sentinelai') || text.includes('pentesting') || text.includes('handbook')) cats.push('offensive');
      if (text.includes('agent') || text.includes('cyberai') || text.includes('opencode') || text.includes('ai application') || text.includes('local ai')) cats.push('ai');
      if (text.includes('compute stack') || text.includes('persistent memory') || text.includes('platform')) cats.push('infra');
      card.setAttribute('data-proj-cat', cats.join(' '));
    });

    const filterBtns = filterBar.querySelectorAll('.proj-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => {
          b.classList.remove('active', 'border-primary/50', 'bg-primary/10', 'text-primary', 'font-bold');
          b.classList.add('border-border-hairline', 'bg-surface-subtle', 'text-on-surface-variant');
        });
        btn.classList.add('active', 'border-primary/50', 'bg-primary/10', 'text-primary', 'font-bold');
        btn.classList.remove('border-border-hairline', 'bg-surface-subtle', 'text-on-surface-variant');

        cards.forEach(card => {
          const cats = card.getAttribute('data-proj-cat') || '';
          if (filter === 'all' || cats.includes(filter)) {
            card.style.display = '';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================================
  // 9. ANIMATED NUMBER COUNTERS
  // =========================================================================
  function initCounters() {
    const counterElements = document.querySelectorAll('[data-counter]');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.innerText = prefix + current + suffix;
          }, 25);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => observer.observe(el));
  }

  // =========================================================================
  // UTILITY HELPER
  // =========================================================================
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  // Initialize all interactive modules on DOM ready
  function initAll() {
    initProgressBar();
    initFloatingDock();
    initCommandPalette();
    initCyberTerminal();
    initCodeCopy();
    initProjectFilters();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
