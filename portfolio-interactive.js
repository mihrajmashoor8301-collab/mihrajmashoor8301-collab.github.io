/**
 * Portfolio Interactive System · Mihraj Mashhoor K
 * Features:
 *  1. Global Command Palette (Cmd+K / Ctrl+K)
 *  2. Interactive Cyber Terminal Emulator (~ / toggle button)
 *  3. 1-Click Code Copy Helper for code blocks & snippets
 *  4. Dynamic Project Category Filtering for index.html
 */

(function () {
  'use strict';

  // Determine relative root based on current URL path
  const isSubdir = window.location.pathname.includes('/projects/') || window.location.pathname.includes('/handbook/');
  const root = isSubdir ? '../' : './';

  // =========================================================================
  // 1. DATASET FOR COMMAND PALETTE SEARCH
  // =========================================================================
  const SEARCH_ITEMS = [
    // Case Studies
    { title: 'OpenCode Persistent Memory', type: 'CASE STUDY', url: root + 'projects/opencode-persistent-memory.html', desc: 'SQLite-authoritative local persistent memory & dual-engine retrieval for OpenCode', keywords: 'memory opencode sqlite chroma ollama local ai gemma nomic vector' },
    { title: 'SentinelAI: Vuln Intelligence', type: 'CASE STUDY', url: root + 'projects/sentinelai.html', desc: 'AI-powered vulnerability intelligence & knowledge platform with MITRE ATT&CK', keywords: 'sentinelai cve mitre attack rag knowledge graphs triage security' },
    { title: 'Autonomous Pentesting Agent', type: 'CASE STUDY', url: root + 'projects/autonomous-pentesting-agent.html', desc: 'AI-assisted authorized security testing framework on owned targets', keywords: 'pentest offensive agent kali ollama nmap burp qwen autonomous' },
    { title: 'CyberAI: Local Security Platform', type: 'CASE STUDY', url: root + 'projects/cyberai.html', desc: 'Local AI cybersecurity agent platform with Qwen3-Coder 30B & Kali Linux', keywords: 'cyberai local inference ollama qwen security automation agents' },
    { title: 'Local AI Compute Stack', type: 'CASE STUDY', url: root + 'projects/local-ai-compute-stack.html', desc: 'Dedicated private AI inference architecture with zero telemetry', keywords: 'compute stack inference local ai hardware vram quantization ollama' },
    { title: 'AI Application Platform', type: 'CASE STUDY', url: root + 'projects/ai-application-platform.html', desc: 'Full-stack AI developer ecosystem with private local models', keywords: 'ai application platform fullstack developer local models api' },
    { title: 'Cybersecurity Handbook', type: 'CASE STUDY', url: root + 'projects/cybersecurity-handbook.html', desc: 'Case study of the Ethical Hacker Command Handbook documentation system', keywords: 'handbook case study documentation knowledge base' },

    // Core Pages & Sections
    { title: 'Browser Resume', type: 'PAGE', url: root + 'resume.html', desc: 'Interactive browser resume with certifications, experience & skills', keywords: 'resume cv experience education tryhackme credentials' },
    { title: 'Certificates & Credentials', type: 'PAGE', url: root + 'certificates.html', desc: 'Verified security certificates: Google Cyber, TryHackMe Pre-Security & Cyber 101', keywords: 'certificates credentials google tryhackme coursera verify' },
    { title: 'Cybersecurity Handbook (KB)', type: 'KNOWLEDGE BASE', url: root + 'handbook/index.html', desc: '15-module reference handbook covering Nmap, Linux, Metasploit & Web Security', keywords: 'handbook commands cheat sheet nmap metasploit linux reference' },
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
    { title: 'Open Interactive Terminal', type: 'ACTION', action: 'terminal', desc: 'Launch browser-based hacker CLI terminal', keywords: 'terminal cli shell quake bash prompt console' },
    { title: 'GitHub Profile ↗', type: 'EXTERNAL', url: 'https://github.com/mihrajmashoor8301-collab', desc: 'Browse open-source security code and repositories', keywords: 'github repo code git source' },
    { title: 'TryHackMe Profile ↗', type: 'EXTERNAL', url: 'https://tryhackme.com/p/mihrajmashoor8301', desc: 'View live TryHackMe badges, room matrix & ranking', keywords: 'tryhackme live profile badges rooms' }
  ];

  // =========================================================================
  // 2. INJECT COMMAND PALETTE MODAL HTML & CSS
  // =========================================================================
  function initCommandPalette() {
    const paletteHtml = `
      <div id="cmd-palette" class="fixed inset-0 z-[100] hidden items-start justify-center pt-16 sm:pt-24 px-4 bg-canvas-base/80 backdrop-blur-md transition-opacity">
        <div class="w-full max-w-2xl rounded-2xl bg-surface-subtle border border-primary/40 shadow-[0_0_40px_rgba(78,222,163,0.15)] overflow-hidden flex flex-col max-h-[80vh]">
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
            <div>No matching security assets or sections found for "${query}"</div>
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
          'ACTION': 'text-primary border-primary/40 bg-canvas-base font-bold',
          'EXTERNAL': 'text-outline border-border-hairline bg-canvas-base'
        }[item.type] || 'text-outline border-border-hairline bg-canvas-base';

        return `
          <div class="cmd-item p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${idx === 0 ? 'bg-surface-raised border border-primary/40 text-on-surface' : 'hover:bg-surface-raised text-on-surface-variant'}"
               data-index="${idx}">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="material-symbols-outlined text-sm text-outline shrink-0">
                ${item.type === 'CASE STUDY' ? 'schema' : item.type === 'MODULE' ? 'menu_book' : item.type === 'ACTION' ? 'terminal' : 'arrow_right_alt'}
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

      // Add click listeners
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

    // Keyboard navigation
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

    // Close when clicking outside modal box
    palette.addEventListener('click', (e) => {
      if (e.target === palette) closePalette();
    });

    // Global Key Shortcut (Cmd+K / Ctrl+K / slash)
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

    // Expose opener globally
    window.openCommandPalette = openPalette;

    // Attach to existing or injected trigger buttons
    document.querySelectorAll('[data-trigger-cmd]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPalette();
      });
    });
  }

  // =========================================================================
  // 2. INTERACTIVE CYBER TERMINAL EMULATOR
  // =========================================================================
  function initCyberTerminal() {
    const terminalHtml = `
      <div id="cyber-terminal-modal" class="fixed inset-0 z-[110] hidden items-center justify-center p-4 bg-canvas-base/85 backdrop-blur-md">
        <div class="w-full max-w-3xl h-[480px] rounded-2xl bg-surface-subtle border border-primary/50 shadow-[0_0_50px_rgba(78,222,163,0.2)] flex flex-col overflow-hidden font-mono text-xs">
          <!-- Terminal Title Bar -->
          <div class="flex items-center justify-between px-4 py-2.5 bg-surface-raised border-b border-border-hairline select-none">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-danger-critical inline-block cursor-pointer" id="term-close-btn" title="Close Terminal"></span>
              <span class="w-3 h-3 rounded-full bg-warning inline-block" title="Minimize"></span>
              <span class="w-3 h-3 rounded-full bg-primary inline-block" title="Maximize"></span>
              <span class="text-on-surface text-xs font-bold ml-2 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-primary">terminal</span>
                <span>endlessus-term v2.6.4 · guest@endlessus:~$</span>
              </span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-outline">
              <span>Press <kbd class="px-1 rounded bg-canvas-base border border-border-hairline">`</kbd> or <kbd class="px-1 rounded bg-canvas-base border border-border-hairline">ESC</kbd> to exit</span>
            </div>
          </div>
          <!-- Terminal Output Screen -->
          <div id="terminal-output" class="flex-1 overflow-y-auto p-4 space-y-2 text-on-surface-variant leading-relaxed">
            <div class="text-primary font-bold">
              ════════════════════════════════════════════════════════════════════════════════════<br/>
              &nbsp;&nbsp;MIHRAJ MASHOOR K // OFFENSIVE SECURITY &amp; LOCAL AI RESEARCH MAINFRAME<br/>
              &nbsp;&nbsp;TRYHACKME TOP 2% GLOBALLY · GOOGLE CYBERSECURITY CERTIFIED<br/>
              ════════════════════════════════════════════════════════════════════════════════════
            </div>
            <div class="text-outline">Type <span class="text-primary font-bold">help</span> to list available commands or <span class="text-secondary font-bold">projects</span> to inspect case studies.</div>
          </div>
          <!-- Terminal Input Row -->
          <div class="flex items-center gap-2 px-4 py-3 bg-canvas-base border-t border-border-hairline">
            <span class="text-primary font-bold select-none">guest@endlessus:~$</span>
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

      appendOutput(`<div class="flex items-center gap-2 mt-2"><span class="text-primary font-bold">guest@endlessus:~$</span> <span class="text-on-surface">${escapeHtml(cmd)}</span></div>`);

      const parts = cmd.split(/\s+/);
      const action = parts[0].toLowerCase();
      const arg = parts[1]?.toLowerCase();

      switch (action) {
        case 'help':
          appendOutput(`
            <div class="text-outline my-1">Available System Commands:</div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-on-surface font-mono text-[11px]">
              <div><span class="text-primary font-bold">whoami</span> - Identity &amp; role summary</div>
              <div><span class="text-primary font-bold">skills</span> - Specialized domain matrix</div>
              <div><span class="text-primary font-bold">projects</span> - 7 verified case studies</div>
              <div><span class="text-primary font-bold">tryhackme</span> - Live rank &amp; 140+ rooms stats</div>
              <div><span class="text-primary font-bold">cat resume</span> - Technical profile view</div>
              <div><span class="text-primary font-bold">contact</span> - Secure communication routes</div>
              <div><span class="text-primary font-bold">matrix</span> - Digital rain telemetry</div>
              <div><span class="text-primary font-bold">clear</span> - Clear terminal buffer</div>
              <div><span class="text-primary font-bold">exit</span> - Close terminal window</div>
            </div>
          `);
          break;

        case 'whoami':
        case 'id':
          appendOutput(`
            <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1">
              <div class="text-primary font-bold">Mihraj Mashhoor K</div>
              <div class="text-on-surface">B.Tech Cybersecurity Undergraduate · Offensive Security &amp; Local AI Research</div>
              <div class="text-secondary text-[11px]">TryHackMe Top 2% Globally (140+ Rooms Completed) · Google Cybersecurity Professional</div>
              <div class="text-outline text-[11px]">Specialization: Network Recon, Web Exploitation Concepts, Local AI Automation &amp; Cross-Session Memory.</div>
            </div>
          `);
          break;

        case 'skills':
          appendOutput(`
            <div class="space-y-1 my-1">
              <div><span class="text-primary font-bold">Recon &amp; Web Security:</span> Nmap, Burp Suite, ffuf, OWASP Top 10, SQLi, XSS, Parameter Fuzzing</div>
              <div><span class="text-secondary font-bold">Password &amp; System:</span> Hydra, Hashcat, John the Ripper, SUID PrivEsc, Metasploit Framework</div>
              <div><span class="text-primary font-bold">Local AI &amp; Agents:</span> Ollama, Qwen3-Coder 30B, Gemma4:12b, nomic-embed-text, OpenCode Plugins</div>
              <div><span class="text-on-surface font-bold">Programming &amp; DB:</span> Python 3, TypeScript, Bash Automation, SQLite 3, ChromaDB, C (Fundamentals)</div>
            </div>
          `);
          break;

        case 'projects':
          appendOutput(`
            <div class="text-secondary font-bold my-1">Select or click a project case study:</div>
            <ol class="space-y-1 list-decimal list-inside text-[11px]">
              <li><a href="${root}projects/sentinelai.html" class="text-primary hover:underline font-bold">SentinelAI</a> - Vulnerability Intelligence &amp; Knowledge Platform</li>
              <li><a href="${root}projects/autonomous-pentesting-agent.html" class="text-secondary hover:underline font-bold">Autonomous Pentesting Agent</a> - Multi-Agent Authorized Security Testing</li>
              <li><a href="${root}projects/cyberai.html" class="text-primary hover:underline font-bold">CyberAI</a> - Local AI Cybersecurity Agent Platform</li>
              <li><a href="${root}projects/opencode-persistent-memory.html" class="text-secondary hover:underline font-bold">OpenCode Persistent Memory</a> - Source-Verified Dual-Engine Retrieval</li>
              <li><a href="${root}projects/local-ai-compute-stack.html" class="text-on-surface hover:underline font-bold">Local AI Compute Stack</a> - On-Premises Private Inference</li>
              <li><a href="${root}projects/ai-application-platform.html" class="text-primary hover:underline font-bold">AI Application Platform</a> - Full-Stack AI Ecosystem</li>
              <li><a href="${root}projects/cybersecurity-handbook.html" class="text-secondary hover:underline font-bold">Cybersecurity Handbook</a> - 15-Module Knowledge Base</li>
            </ol>
            <div class="text-outline text-[10px] mt-1">Tip: Click any link to navigate directly to the engineering case study.</div>
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

        case 'cat':
          if (arg === 'resume' || arg === 'cv') {
            appendOutput(`
              <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-[11px]">
                <div class="text-primary font-bold">RESUME · MIHRAJ MASHOOR K</div>
                <div>Role: Offensive Security Student &amp; Security Automation Researcher</div>
                <div>Education: B.Tech Computer Science &amp; Cybersecurity (CGPA 7.9)</div>
                <div>Downloadable PDF: <a href="${root}CV_2026_UPDATED.pdf" target="_blank" class="text-secondary underline">CV_2026_UPDATED.pdf ↗</a></div>
                <div>Interactive Version: <a href="${root}resume.html" class="text-primary underline">Open Browser Resume ↗</a></div>
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

        case 'clear':
        case 'cls':
          termOutput.innerHTML = '';
          break;

        case 'matrix':
          appendOutput(`<div class="text-primary font-bold">01001101 01001001 01001000 01010010 01000001 01001010 // ACCESS GRANTED // TELEMETRY ACTIVE</div>`);
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
      setTimeout(() => termInput.focus(), 50);
    }

    function closeTerminal() {
      termModal.classList.remove('flex');
      termModal.classList.add('hidden');
    }

    closeBtn?.addEventListener('click', closeTerminal);
    termModal.addEventListener('click', (e) => {
      if (e.target === termModal) closeTerminal();
    });

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCommand(termInput.value);
        termInput.value = '';
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
        closeTerminal();
      }
    });

    // Toggle shortcut with backtick key (`)
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        termModal.classList.contains('hidden') ? openTerminal() : closeTerminal();
      }
    });

    window.openTerminal = openTerminal;
    window.closeTerminal = closeTerminal;

    // Attach to any element with data-trigger-term
    document.querySelectorAll('[data-trigger-term]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openTerminal();
      });
    });
  }

  // =========================================================================
  // 3. 1-CLICK CODE COPY HELPER
  // =========================================================================
  function initCodeCopy() {
    const blocks = document.querySelectorAll('pre, .code-container');
    blocks.forEach((block) => {
      // Avoid duplicate buttons
      if (block.querySelector('.copy-code-btn')) return;

      // Ensure block is relative positioned
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
        const textToCopy = codeElement.innerText.replace(/^\s*\d+:\s/gm, ''); // Strip line numbers if present

        try {
          await navigator.clipboard.writeText(textToCopy);
          btn.innerHTML = `
            <span class="material-symbols-outlined text-[13px] text-primary">check</span>
            <span class="copy-label text-primary font-bold">Copied!</span>
          `;
          btn.classList.add('border-primary');
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
  // 4. INTERACTIVE PROJECT FILTER (ON INDEX.HTML)
  // =========================================================================
  function initProjectFilters() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    // Check if filter bar already exists
    if (document.getElementById('project-filter-bar')) return;

    // Find the header inside projects section
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

    // Tag the project cards with categories
    const cards = projectsSection.querySelectorAll('.bg-surface-subtle.rounded-xl, .bg-surface-subtle.rounded-2xl');
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      let cats = ['all'];
      if (text.includes('sentinelai') || text.includes('pentesting') || text.includes('handbook')) cats.push('offensive');
      if (text.includes('agent') || text.includes('cyberai') || text.includes('opencode') || text.includes('ai application') || text.includes('local ai')) cats.push('ai');
      if (text.includes('compute stack') || text.includes('persistent memory') || text.includes('platform')) cats.push('infra');
      card.setAttribute('data-proj-cat', cats.join(' '));
    });

    // Attach click listeners to filter buttons
    const filterBtns = filterBar.querySelectorAll('.proj-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button state
        filterBtns.forEach(b => {
          b.classList.remove('active', 'border-primary/50', 'bg-primary/10', 'text-primary', 'font-bold');
          b.classList.add('border-border-hairline', 'bg-surface-subtle', 'text-on-surface-variant');
        });
        btn.classList.add('active', 'border-primary/50', 'bg-primary/10', 'text-primary', 'font-bold');
        btn.classList.remove('border-border-hairline', 'bg-surface-subtle', 'text-on-surface-variant');

        // Show/hide cards
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
  // UTILITY HELPER
  // =========================================================================
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  // Initialize all interactive modules on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCommandPalette();
      initCyberTerminal();
      initCodeCopy();
      initProjectFilters();
    });
  } else {
    initCommandPalette();
    initCyberTerminal();
    initCodeCopy();
    initProjectFilters();
  }

})();
