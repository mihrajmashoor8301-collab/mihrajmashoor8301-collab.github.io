/**
 * The Ethical Hacker's Command Handbook - Client Engine
 * Handles: Copy-to-clipboard, Mobile Navigation, Instant Documentation Search, and Scrollspy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Copy-to-Clipboard Functionality
  document.querySelectorAll('.command').forEach(cmdBox => {
    const pre = cmdBox.querySelector('pre');
    if (!pre) return;

    // Check if copy button already exists
    let btn = cmdBox.querySelector('.copy');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'copy';
      btn.setAttribute('aria-label', 'Copy command to clipboard');
      btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span><span>Copy</span>';
      cmdBox.appendChild(btn);
    }

    btn.addEventListener('click', async () => {
      // Clean leading '$ ' or '# ' prompts if present in copied text
      const cleanText = pre.textContent
        .split('\n')
        .map(line => line.replace(/^\s*[\$#]\s+/, ''))
        .join('\n')
        .trim();

      const showSuccess = () => {
        btn.classList.add('copied');
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 14px;">check</span><span>Copied!</span>';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span><span>Copy</span>';
        }, 1500);
      };

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(cleanText);
          showSuccess();
        } else {
          throw new Error('Clipboard API unavailable');
        }
      } catch (err) {
        // Fallback using textarea for headless or non-HTTPS contexts
        const textArea = document.createElement('textarea');
        textArea.value = cleanText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          showSuccess();
        } catch (fallbackErr) {
          console.error('Fallback copy failed:', fallbackErr);
        }
        document.body.removeChild(textArea);
      }
    });
  });

  // 2. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isOpen ? 'close' : 'menu';
      }
    });

    // Close on navigation click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // 3. Instant Client-Side Documentation Search
  const searchInput = document.getElementById('handbook-search');
  const searchResults = document.getElementById('search-results');

  // Search Index for all 15 modules
  const handbookIndex = [
    {
      num: '01',
      title: 'Nmap Reconnaissance & Scanning',
      category: 'Reconnaissance',
      url: 'nmap.html',
      keywords: 'nmap port scan syn ping discovery sV sC oA timing T4 network reconnaissance services scripts nse',
      desc: 'Discover live hosts, port states, service versions, NSE scripts, and scanning workflows.'
    },
    {
      num: '02',
      title: 'Linux Essentials for Practitioners',
      category: 'Operating Systems',
      url: 'linux.html',
      keywords: 'linux bash filesystem permissions chmod chown navigation processes systemctl grep find top ps',
      desc: 'Linux filesystem hierarchy, file operations, permissions, process control, and system administration.'
    },
    {
      num: '03',
      title: 'Metasploit Framework Fundamentals',
      category: 'Frameworks',
      url: 'metasploit.html',
      keywords: 'metasploit msfconsole msfvenom exploit payload auxiliary listener meterpreter workspace lab validation',
      desc: 'Exploit modules, payloads, auxiliary scanners, Meterpreter basics, and organized testing workspaces.'
    },
    {
      num: '04',
      title: 'Searchsploit & Vulnerability Research',
      category: 'Vulnerability Research',
      url: 'searchsploit.html',
      keywords: 'searchsploit exploit-db cve research poc proof of concept filters offline exploit database',
      desc: 'Query Exploit-DB locally, examine public proof-of-concept code, and research CVE applicability.'
    },
    {
      num: '05',
      title: 'Web Application Security Fundamentals',
      category: 'Web Security',
      url: 'modules/web-security.html',
      keywords: 'owasp top 10 sql injection sqli xss cross site scripting idor burp suite repeater ffuf fuzzing endpoints',
      desc: 'OWASP vulnerability classes, parameter tampering, session flaws, Burp proxy interception, and ffuf fuzzing.'
    },
    {
      num: '06',
      title: 'Network Security & Packet Analysis',
      category: 'Network Security',
      url: 'modules/network-security.html',
      keywords: 'wireshark tcpdump packets traffic tcp ip udp icmp dns dhcp subnetting vlsm 3-way handshake filters',
      desc: 'Protocol structures, packet inspection, Wireshark display filters, and network communication fundamentals.'
    },
    {
      num: '07',
      title: 'Privilege Escalation (Educational Labs)',
      category: 'In-Progress Learning',
      url: 'modules/privilege-escalation.html',
      keywords: 'privilege escalation suid sgid sudo permissions cron jobs linux hardening enumeration linpeas in progress',
      desc: 'Foundational Linux privilege escalation vectors in authorized educational environments.'
    },
    {
      num: '08',
      title: 'Credential Security & Hash Analysis',
      category: 'Credential Security',
      url: 'modules/credential-security.html',
      keywords: 'passwords hashes hashing encryption john the ripper hashid hydra dictionary attacks rockyou security',
      desc: 'Cryptographic hash identification, offline dictionary testing with John, and defensive authentication controls.'
    },
    {
      num: '09',
      title: 'Controlled Exploitation & Post-Exploitation',
      category: 'Exploitation',
      url: 'modules/exploitation.html',
      keywords: 'exploitation post-exploitation netcat reverse shell bind shell listener payload delivery loot cleanup',
      desc: 'Safe validation of vulnerabilities, reverse shell handling, post-exploitation discovery, and lab cleanup.'
    },
    {
      num: '10',
      title: 'Reconnaissance & Surface Enumeration',
      category: 'Reconnaissance',
      url: 'modules/reconnaissance.html',
      keywords: 'reconnaissance enumeration passive active whois dig dns whatweb ffuf attack surface discovery',
      desc: 'Structured methodology contrasting passive intelligence gathering with active surface enumeration.'
    },
    {
      num: '11',
      title: 'Linux System Security & Defensive Hardening',
      category: 'System Defense',
      url: 'modules/linux-security.html',
      keywords: 'hardening ufw iptables sshd ssh security logs auth.log journalctl service least privilege defense',
      desc: 'Hardening Linux hosts, firewall rules, SSH configuration, authentication log analysis, and least privilege.'
    },
    {
      num: '12',
      title: 'Security Automation with Python & Scripting',
      category: 'Automation',
      url: 'modules/security-automation.html',
      keywords: 'python scripting automation requests socket regex re argparse log parsing security tools',
      desc: 'Custom security tooling, socket probes, HTTP verification scripts, regex parsers, and CLI automation.'
    },
    {
      num: '13',
      title: 'AI & Agentic Workflows in Cybersecurity',
      category: 'AI Security',
      url: 'modules/ai-cybersecurity.html',
      keywords: 'ai llm ollama qwen3-coder sentinelai autonomous agent triage threat intelligence local compute stack',
      desc: 'Local offline LLMs, automated vulnerability triage, agentic security workflows, and LLM prompt defense.'
    },
    {
      num: '14',
      title: 'Security Tools Command Index & Quick Reference',
      category: 'Master Reference',
      url: 'modules/tools-reference.html',
      keywords: 'cheat sheet commands syntax flags tools nmap gobuster ffuf sqlmap hydra hashcat john searchsploit msfconsole msfvenom netcat socat chisel linpeas winpeas pspy wireshark tshark tcpdump mimikatz secretsdump whatweb scenarios workflows active directory pivoting',
      desc: 'Master lookup cheat sheet covering 25+ offensive tools, usage parameters, and 5 practical real-world scenarios.'
    },
    {
      num: '15',
      title: 'Penetration Testing Methodology & Authorization',
      category: 'Methodology',
      url: 'modules/pentest-methodology.html',
      keywords: 'methodology ethics authorization rules of engagement roe ptes scope reporting cvss documentation',
      desc: 'Structured assessment framework, rules of engagement, authorized boundaries, CVSS, and technical reporting.'
    },
    {
      num: 'LAB',
      title: 'Interactive Terminal Sandbox & 6-Stage Roadmap',
      category: 'Interactive Practice',
      url: '../terminal-lab.html',
      keywords: 'terminal lab practice kali sandbox nmap gobuster hydra sqlmap privesc roadmap stages interactive commands',
      desc: 'Hands-on browser-based Kali Linux terminal workstation with live command simulation and practitioner feedback.'
    },
    {
      num: 'HUB',
      title: 'Offensive Payloads & Exploitation Cheatsheet',
      category: 'Interactive Payloads',
      url: '../payloads.html',
      keywords: 'payloads rce lfi cmdi command injection reverse shell bash php netcat socat filter bypass log poisoning encoder',
      desc: 'Dynamic TryHackMe-style cheatsheet with interactive LHOST/LPORT configurator, WAF bypasses, and live encoder.'
    }
  ];

  if (searchInput && searchResults) {
    // Detect if we are in a subdirectory like /modules/
    const isSubdir = window.location.pathname.includes('/modules/');
    const basePath = isSubdir ? '../' : '';

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
      }

      const matches = handbookIndex.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.keywords.toLowerCase().includes(query) ||
               item.desc.toLowerCase().includes(query) ||
               item.category.toLowerCase().includes(query);
      });

      if (matches.length === 0) {
        searchResults.innerHTML = `
          <div style="padding: 1.25rem; text-align: center; color: var(--text-subtle); font-size: 0.85rem;">
            No matching modules or commands found for "${query}".
          </div>`;
        searchResults.classList.add('active');
        return;
      }

      searchResults.innerHTML = matches.map(item => {
        let targetUrl = basePath + item.url;
        return `
          <a class="search-item" href="${targetUrl}">
            <div class="search-item-title">
              <span>${item.title}</span>
              <span class="search-item-mod">[MOD // ${item.num}]</span>
            </div>
            <div class="search-item-desc">${item.desc}</div>
          </a>
        `;
      }).join('');

      searchResults.classList.add('active');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchResults.classList.remove('active');
        if (mobileDrawer) mobileDrawer.classList.remove('open');
      }
    });
  }

  // 4. Scrollspy for in-page Table of Contents
  const tocLinks = document.querySelectorAll('.toc-nav a');
  if (tocLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            tocLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });

    document.querySelectorAll('.article h2[id], .article h3[id]').forEach(h => {
      observer.observe(h);
    });
  }

  // 5. Handbook Operational Tool Filters
  const toolFilterBtns = document.querySelectorAll('#handbook-tool-filters .tool-filter-btn');
  const toolCards = document.querySelectorAll('#handbook-tools-grid .tool-card');

  if (toolFilterBtns.length > 0 && toolCards.length > 0) {
    toolFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        toolFilterBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = 'var(--line)';
          b.style.background = 'var(--surface-raised)';
          b.style.color = 'var(--text-muted)';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--primary)';
        btn.style.background = 'var(--primary-dim)';
        btn.style.color = 'var(--primary)';

        toolCards.forEach(card => {
          const cardCat = card.getAttribute('data-cat');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
