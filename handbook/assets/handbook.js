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

  // 3. Instant Client-Side Documentation & Theory Search (Grouped by Theory, Concepts, Commands, Tools, Vulnerabilities, Labs)
  const searchInput = document.getElementById('handbook-search');
  const searchResults = document.getElementById('search-results');

  // Search Index covering all 15 modules, practical labs, and comprehensive theory concepts
  const handbookIndex = [
    // 1. THEORY GROUP
    {
      num: 'TH-01',
      group: 'Theory',
      title: 'TCP & Networking Protocols Theory',
      category: 'Theory',
      url: '../theory.html#networking-fundamentals',
      keywords: 'tcp ip udp network theory connection 3-way handshake transmission reliable stream addresses ports protocols',
      desc: 'Why TCP works: Connection-oriented reliability, sequence numbers, flow control, and OSI Layer 4 architecture.'
    },
    {
      num: 'TH-02',
      group: 'Theory',
      title: 'The OSI 7-Layer Interactive Model',
      category: 'Theory',
      url: '../theory.html#osi-model',
      keywords: 'osi model 7 layers application presentation session transport network data link physical encapsulation',
      desc: 'Complete 7-layer breakdown: Protocol data units, addressing, security implications, and attack surfaces.'
    },
    {
      num: 'TH-03',
      group: 'Theory',
      title: 'TCP/IP 4-Layer Model Architecture',
      category: 'Theory',
      url: '../theory.html#tcp-ip-model',
      keywords: 'tcp ip model internet transport application link dod network access protocol suite',
      desc: 'The functional 4-layer architecture of the Internet: Application, Transport, Internet, and Link layers.'
    },
    {
      num: 'TH-04',
      group: 'Theory',
      title: 'Packet Journey: "What Happens When I Visit a Website?"',
      category: 'Theory',
      url: '../theory.html#packet-journey',
      keywords: 'packet journey website dns arp default gateway tcp handshake tls handshake http request response browser dom',
      desc: '10-step complete visual trace from typing a URL to browser DOM rendering and TLS key exchange.'
    },
    {
      num: 'TH-05',
      group: 'Theory',
      title: 'Computer Hardware & Process Internals',
      category: 'Theory',
      url: '../theory.html#computer-fundamentals',
      keywords: 'computer cpu ram storage motherboard process thread kernel user space system calls registers memory',
      desc: 'Von Neumann architecture, CPU registers, RAM addressability, process address spaces, and thread execution.'
    },
    {
      num: 'TH-06',
      group: 'Theory',
      title: 'Operating System Internals & Memory Architecture',
      category: 'Theory',
      url: '../theory.html#operating-systems',
      keywords: 'os kernel ring 0 ring 3 virtual memory mmu paging stack heap vfs inodes permissions environment variables',
      desc: 'CPU privilege rings, virtual memory paging, stack vs heap, inodes, system calls, and privilege boundaries.'
    },
    {
      num: 'TH-07',
      group: 'Theory',
      title: 'Web & HTTP Request / Response Anatomy',
      category: 'Theory',
      url: '../theory.html#web-fundamentals',
      keywords: 'http request response headers get post methods status codes cookies sessions sop cors csp',
      desc: 'Interactive breakdown of HTTP headers, request verbs, response status codes, cookie security flags, and CORS.'
    },
    {
      num: 'TH-08',
      group: 'Theory',
      title: 'Database Theory & SQL Grammar Foundations',
      category: 'Theory',
      url: '../theory.html#database-theory',
      keywords: 'database sql rdbms tables rows columns primary foreign keys select insert update delete where join',
      desc: 'Relational database architecture, SQL parser grammar, and the fundamental mechanics of syntax evaluation.'
    },
    {
      num: 'TH-09',
      group: 'Theory',
      title: 'Cryptography, Ciphers, Hashes & PKI',
      category: 'Theory',
      url: '../theory.html#cryptography-theory',
      keywords: 'cryptography aes rsa ecc sha-256 hashing encryption symmetric asymmetric pki certificates tls salts entropy',
      desc: 'Mathematical guarantees: Symmetric AES, Asymmetric RSA/ECC, one-way hashing, salts, entropy, and digital signatures.'
    },
    {
      num: 'TH-10',
      group: 'Theory',
      title: 'Detection Theory: SIEM, EDR & Telemetry',
      category: 'Theory',
      url: '../theory.html#detection-theory',
      keywords: 'detection telemetry siem edr ids ips logs syslog auth.log correlation rules blue team defense',
      desc: 'Defender perspective: How offensive reconnaissance and exploitation appear in system logs, SIEM, and EDR.'
    },
    {
      num: 'TH-11',
      group: 'Theory',
      title: 'Enterprise Security Architecture & Zero Trust',
      category: 'Theory',
      url: '../theory.html#defensive-architecture',
      keywords: 'architecture dmz reverse proxy waf defense in depth zero trust segmentation bastion hosts',
      desc: 'Enterprise network segmentation, DMZ tiers, microsegmentation, and NIST Zero Trust Architecture (ZTA).'
    },
    {
      num: 'TH-12',
      group: 'Theory',
      title: 'Active Directory & Kerberos Protocol Architecture',
      category: 'Theory',
      url: '../theory.html#active-directory',
      keywords: 'active directory kerberos domain controller forest ou gpo tgt tgs kdc ntlm spn roasting',
      desc: 'Enterprise identity: Domain Controllers, Forests, GPOs, and Kerberos ticket-granting authentication mechanics.'
    },
    {
      num: 'TH-13',
      group: 'Theory',
      title: 'Cloud Computing & Container Isolation Theory',
      category: 'Theory',
      url: '../theory.html#cloud-containers',
      keywords: 'cloud container docker namespaces cgroups capabilities isolation iaas paas saas shared responsibility aws gcp azure',
      desc: 'IaaS/PaaS/SaaS models, Linux kernel namespaces (pid, net, mnt), cgroups resource limits, and container escape surfaces.'
    },
    {
      num: 'TH-14',
      group: 'Theory',
      title: 'Authentication, Session & JWT Architecture',
      category: 'Theory',
      url: '../theory.html#auth-authorization',
      keywords: 'authentication authorization jwt json web token session cookies mfa tokens rbac abac oauth alg none',
      desc: 'Stateless JWT signature verification, cookie security flags (HttpOnly/SameSite), session management, and RBAC/ABAC models.'
    },
    {
      num: 'TH-15',
      group: 'Theory',
      title: 'Cybersecurity Fundamentals: CIA, CVE, CWE & MITRE',
      category: 'Theory',
      url: '../theory.html#security-fundamentals',
      keywords: 'security fundamentals cia triad threat vulnerability exploit risk cve cwe cvss ioc ttp mitre attack defense in depth',
      desc: 'Core cybersecurity vocabulary: CIA Triad, CVSS scoring formulas, MITRE ATT&CK matrix, IOCs, and zero-trust controls.'
    },
    {
      num: 'TH-16',
      group: 'Theory',
      title: 'Attack vs Defense Lifecycle Methodology',
      category: 'Theory',
      url: '../theory.html#attack-defense-theory',
      keywords: 'attack defense lifecycle vulnerability exploit payload impact detection mitigation blue team red team',
      desc: 'The complete security progression: Vulnerability -> Exploit -> Payload -> Impact -> Detection -> Mitigation.'
    },

    // 2. CONCEPTS GROUP (Comparisons & Primitives)
    {
      num: 'CP-01',
      group: 'Concepts',
      title: 'TCP vs UDP Transport Comparison',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'tcp vs udp transport layer connection oriented connectionless streaming reliability',
      desc: 'Side-by-side comparison: Handshake overhead, sequence verification, flow control, and speed trade-offs.'
    },
    {
      num: 'CP-02',
      group: 'Concepts',
      title: 'OSI vs TCP/IP Suite Comparison',
      category: 'Concepts',
      url: '../theory.html#tcp-ip-model',
      keywords: 'osi vs tcp ip comparison 7 layers 4 layers practical theoretical differences',
      desc: 'Academic 7-layer model vs practical 4-layer internet protocol implementation comparison matrix.'
    },
    {
      num: 'CP-03',
      group: 'Concepts',
      title: 'Authentication vs Authorization (AuthN vs AuthZ)',
      category: 'Concepts',
      url: '../theory.html#auth-authorization',
      keywords: 'authentication vs authorization authn authz identity permissions rbac abac idor',
      desc: '"Who are you?" vs "What are you allowed to do?": Identity verification vs permission boundaries.'
    },
    {
      num: 'CP-04',
      group: 'Concepts',
      title: 'Encryption vs Encoding vs Hashing',
      category: 'Concepts',
      url: '../theory.html#cryptography-theory',
      keywords: 'encryption vs encoding vs hashing comparison base64 aes sha256 reversible one way',
      desc: 'Reversibility with key vs data formatting without key vs one-way mathematical digest comparison.'
    },
    {
      num: 'CP-05',
      group: 'Concepts',
      title: 'Symmetric vs Asymmetric Encryption',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'symmetric vs asymmetric aes rsa ecc public private key shared secret throughput',
      desc: 'Shared secret efficiency vs dual-key pair distribution: Algorithms, speeds, and hybrid TLS combination.'
    },
    {
      num: 'CP-06',
      group: 'Concepts',
      title: 'Network Firewall vs Web Application Firewall (WAF)',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'firewall vs waf layer 3 4 layer 7 packet filtering http inspection deep payload',
      desc: 'Layer 3/4 IP/port packet filtering vs Layer 7 HTTP application-payload inspection.'
    },
    {
      num: 'CP-07',
      group: 'Concepts',
      title: 'Intrusion Detection (IDS) vs Intrusion Prevention (IPS)',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'ids vs ips sensor inline passive active packet drop suricata snort',
      desc: 'Out-of-band passive alerting sensors vs active inline traffic-dropping prevention appliances.'
    },
    {
      num: 'CP-08',
      group: 'Concepts',
      title: 'Passive vs Active Reconnaissance',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'passive vs active reconnaissance osint footprinting scanning whois dns nmap',
      desc: 'Zero-touch external intelligence gathering vs direct packet transmission against target systems.'
    },
    {
      num: 'CP-09',
      group: 'Concepts',
      title: 'CVE vs CWE vs CVSS Evaluation Framework',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'cve vs cwe vs cvss vulnerability identifier weakness taxonomy severity scoring',
      desc: 'Instance name (CVE) vs flaw taxonomy (CWE) vs severity calculator (CVSS) matrix.'
    },
    {
      num: 'CP-10',
      group: 'Concepts',
      title: 'Vulnerability vs Exploit vs Payload',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'vulnerability vs exploit payload impact bug weaponization execution code',
      desc: 'Weakness in code vs weaponized deliverable vs post-exploitation command execution payload.'
    },
    {
      num: 'CP-11',
      group: 'Concepts',
      title: 'Process vs Thread Internals',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'process vs thread execution virtual address space shared memory lightweight scheduling',
      desc: 'Independent virtual memory address space vs shared memory thread execution contexts.'
    },
    {
      num: 'CP-12',
      group: 'Concepts',
      title: 'TCP Scan (-sS) vs UDP Scan (-sU)',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'tcp scan vs udp scan syn ack icmp port unreachable rate limiting nmap',
      desc: 'Deterministic SYN/ACK handshake replies vs silence-or-ICMP-port-unreachable scanning mechanics.'
    },
    {
      num: 'CP-13',
      group: 'Concepts',
      title: 'Black Box vs White Box vs Grey Box Testing',
      category: 'Concepts',
      url: '../theory.html#comparisons',
      keywords: 'black box vs white box grey box penetration testing source code credentials visibility',
      desc: 'Zero prior knowledge vs full architectural/source visibility vs standard authenticated user perspective.'
    },

    // 3. COMMANDS GROUP
    {
      num: 'CMD-01',
      group: 'Commands',
      title: 'Nmap TCP SYN Port Scan (-sS)',
      category: 'Commands',
      url: 'nmap.html',
      keywords: 'nmap tcp syn scan port -ss half open stealth discovery',
      desc: 'High-speed half-open TCP SYN scanning with root raw sockets: $ sudo nmap -sS -p- 192.168.1.10'
    },
    {
      num: 'CMD-02',
      group: 'Commands',
      title: 'tcpdump Raw Packet Capture & Filter',
      category: 'Commands',
      url: 'modules/network-security.html',
      keywords: 'tcpdump packet capture cli tcp port 80 -i eth0 pcap packet sniffing',
      desc: 'Command-line packet sniffer: $ sudo tcpdump -nn -i eth0 "tcp[tcpflags] & tcp-syn != 0"'
    },
    {
      num: 'CMD-03',
      group: 'Commands',
      title: 'Linux Permissions, chmod & SUID Bit Configuration',
      category: 'Commands',
      url: 'linux.html',
      keywords: 'chmod chown suid 4755 permissions octal modes ls -la find',
      desc: 'Audit and configure permissions: $ chmod 4755 binary, $ find / -perm -u=s -type f 2>/dev/null'
    },
    {
      num: 'CMD-04',
      group: 'Commands',
      title: 'ffuf Web Directory & Parameter Fuzzing',
      category: 'Commands',
      url: 'modules/web-security.html',
      keywords: 'ffuf web fuzzing directory discovery wordlist -w -u endpoints',
      desc: 'High-speed web fuzzing: $ ffuf -w common.txt -u http://TARGET/FUZZ -mc 200,301,302'
    },
    {
      num: 'CMD-05',
      group: 'Commands',
      title: 'John the Ripper Offline Hash Cracking',
      category: 'Commands',
      url: 'modules/credential-security.html',
      keywords: 'john the ripper hash cracking dictionary wordlist rockyou format',
      desc: 'Dictionary-based credential verification: $ john --wordlist=rockyou.txt --format=raw-sha256 hashes.txt'
    },
    {
      num: 'CMD-06',
      group: 'Commands',
      title: 'Curl HTTP Request & Header Inspection',
      category: 'Commands',
      url: 'modules/web-security.html',
      keywords: 'curl http request headers verbosity -i -v -s -x post cookies',
      desc: 'Inspect raw HTTP response headers & cookies: $ curl -ivs https://example.com/api/login'
    },

    // 4. TOOLS GROUP
    {
      num: '01',
      group: 'Tools',
      title: 'Nmap Network Scanner & NSE Script Engine',
      category: 'Tools',
      url: 'nmap.html',
      keywords: 'nmap scanner port discovery nse scripts host services versions os',
      desc: 'Network discovery and vulnerability scanning: Service detection (-sV), NSE scripts (--script), and timing templates.'
    },
    {
      num: '02',
      group: 'Tools',
      title: 'Linux System CLI & Administration Suite',
      category: 'Tools',
      url: 'linux.html',
      keywords: 'linux bash filesystem permissions ps top systemctl grep find journalctl',
      desc: 'Essential administrative and auditing CLI utilities for operating system navigation and process control.'
    },
    {
      num: '03',
      group: 'Tools',
      title: 'Metasploit Framework (MSF) & Meterpreter',
      category: 'Tools',
      url: 'metasploit.html',
      keywords: 'metasploit msfconsole msfvenom exploit framework payload auxiliary meterpreter',
      desc: 'Exploitation framework: Workspaces, auxiliary scanners, verified exploits, and staged payloads.'
    },
    {
      num: '04',
      group: 'Tools',
      title: 'Searchsploit & Local Exploit-DB Archive',
      category: 'Tools',
      url: 'searchsploit.html',
      keywords: 'searchsploit exploit-db cve research poc proof of concept offline',
      desc: 'Offline vulnerability research utility querying the Exploit-DB catalog by service and version.'
    },
    {
      num: '05',
      group: 'Tools',
      title: 'Burp Suite Community Web Security Proxy',
      category: 'Tools',
      url: 'modules/web-security.html',
      keywords: 'burp suite proxy repeater intruder intercept web scanner browser',
      desc: 'Industry standard HTTP interception proxy, manual request repeater, and parameter manipulation toolkit.'
    },
    {
      num: '06',
      group: 'Tools',
      title: 'Wireshark Packet Analysis & Display Filters',
      category: 'Tools',
      url: 'modules/network-security.html',
      keywords: 'wireshark packet analyzer capture pcap protocols filters inspection',
      desc: 'Graphical network protocol analyzer: Deep packet inspection, TCP stream reassembly, and filter expressions.'
    },
    {
      num: '14',
      group: 'Tools',
      title: 'Security Tools Master Command Index (25+ Tools)',
      category: 'Tools',
      url: 'modules/tools-reference.html',
      keywords: 'tools index nmap burp wireshark hydra gobuster sqlmap netcat tcpdump john hashcat',
      desc: 'Comprehensive lookup reference covering 25+ essential offensive and defensive security tools.'
    },

    // 5. VULNERABILITIES GROUP
    {
      num: 'VULN-01',
      group: 'Vulnerabilities',
      title: 'SQL Injection (SQLi) CWE-89',
      category: 'Vulnerabilities',
      url: 'modules/web-security.html',
      keywords: 'sqli sql injection cwe-89 authentication bypass database union boolean error',
      desc: 'Untrusted input concatenated into SQL queries alters execution logic; cured by prepared statements.'
    },
    {
      num: 'VULN-02',
      group: 'Vulnerabilities',
      title: 'Cross-Site Scripting (XSS) CWE-79',
      category: 'Vulnerabilities',
      url: 'modules/web-security.html',
      keywords: 'xss cross site scripting cwe-79 reflected stored dom session cookie theft',
      desc: 'Injected malicious JavaScript executes in victim browsers; mitigated by context-aware encoding & CSP.'
    },
    {
      num: 'VULN-03',
      group: 'Vulnerabilities',
      title: 'Insecure Direct Object Reference (IDOR) CWE-639',
      category: 'Vulnerabilities',
      url: 'modules/web-security.html',
      keywords: 'idor broken object level authorization parameter tampering user id access control',
      desc: 'User-controlled parameter accesses private database objects without server-side ownership authorization.'
    },
    {
      num: 'VULN-04',
      group: 'Vulnerabilities',
      title: 'Linux SUID Binary Privilege Escalation',
      category: 'Vulnerabilities',
      url: 'modules/privilege-escalation.html',
      keywords: 'suid privilege escalation root gtfobins binary permissions misconfiguration',
      desc: 'Executable files with SUID bit set run with owner (root) privileges, enabling shell escapes via GTFOBins.'
    },
    {
      num: 'VULN-05',
      group: 'Vulnerabilities',
      title: 'TCP SYN Flood Denial of Service',
      category: 'Vulnerabilities',
      url: 'modules/network-security.html',
      keywords: 'tcp syn flood ddos denial of service half open backlog exhaustion rst',
      desc: 'Overwhelming target host with half-open TCP connection requests to exhaust memory connection backlogs.'
    },

    // 6. LABS GROUP (Hands-On Interactive Practice)
    {
      num: 'LAB-01',
      group: 'Labs',
      title: 'Network Service & Port Enumeration Lab',
      category: 'Labs',
      url: '../labs.html#lab-network',
      keywords: 'lab network tcp udp ports service enumeration nmap interactive workstation',
      desc: 'Practice real TCP/UDP port scanning, service banner grabbing, and firewall state identification.'
    },
    {
      num: 'LAB-02',
      group: 'Labs',
      title: 'Security Incident Log Analysis Lab',
      category: 'Labs',
      url: '../labs.html#lab-logs',
      keywords: 'lab logs analysis siem auth.log brute force incident triage edr forensics',
      desc: 'Analyze simulated Linux auth.log, Apache access logs, and correlate brute-force & web attacks.'
    },
    {
      num: 'LAB-03',
      group: 'Labs',
      title: 'SQL Injection Authentication Bypass & Extraction Lab',
      category: 'Labs',
      url: '../labs.html#lab-sqli',
      keywords: 'lab sqli sql injection authentication bypass union select extraction practice',
      desc: 'Interactive database injection lab: Bypass login portals, extract schemas, and test prepared statements.'
    },
    {
      num: 'LAB-04',
      group: 'Labs',
      title: 'Linux File Permissions & Octal Modes Lab',
      category: 'Labs',
      url: '../labs.html#lab-permissions',
      keywords: 'lab permissions linux chmod chown octal 755 644 rwx interactive terminal',
      desc: 'Interactive POSIX sandbox: Inspect file attributes, calculate octal masks, and resolve permission denials.'
    },
    {
      num: 'LAB-05',
      group: 'Labs',
      title: 'SUID Binary Privilege Escalation Lab',
      category: 'Labs',
      url: '../labs.html#lab-suid',
      keywords: 'lab suid privesc root escalation linux gtfobins interactive terminal',
      desc: 'Discover misconfigured SUID binaries on Linux workstations and escalate to root via GTFOBins.'
    },
    {
      num: 'LAB-06',
      group: 'Labs',
      title: 'HTTP Security Headers Analysis Lab',
      category: 'Labs',
      url: '../labs.html#lab-headers',
      keywords: 'lab headers http security csp hsts x-frame-options clickjacking mitigation',
      desc: 'Analyze missing browser defensive headers, audit live HTTP responses, and deploy secure configurations.'
    },
    {
      num: 'LAB-07',
      group: 'Labs',
      title: 'Interactive Terminal Sandbox & Tool Workspace',
      category: 'Labs',
      url: '../terminal-lab.html',
      keywords: 'terminal lab practice kali sandbox nmap gobuster hydra sqlmap interactive commands',
      desc: 'Hands-on browser-based Kali Linux terminal workstation with simulated outputs and live practitioner feedback.'
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
               item.category.toLowerCase().includes(query) ||
               item.group.toLowerCase().includes(query);
      });

      if (matches.length === 0) {
        searchResults.innerHTML = `
          <div style="padding: 1.25rem; text-align: center; color: var(--text-subtle); font-size: 0.85rem;">
            No matching theory, concepts, commands, tools, or labs found for "${query}".
          </div>`;
        searchResults.classList.add('active');
        return;
      }

      // Group matches by category: Theory, Concepts, Commands, Tools, Vulnerabilities, Labs
      const groupOrder = ['Theory', 'Concepts', 'Commands', 'Tools', 'Vulnerabilities', 'Labs'];
      const grouped = {};
      groupOrder.forEach(grp => { grouped[grp] = []; });

      matches.forEach(item => {
        const grp = item.group || 'Tools';
        if (!grouped[grp]) grouped[grp] = [];
        grouped[grp].push(item);
      });

      let html = '';
      groupOrder.forEach(grpName => {
        const items = grouped[grpName];
        if (items && items.length > 0) {
          html += `
            <div class="search-group-header">
              <span>${grpName.toUpperCase()}</span>
              <span>(${items.length})</span>
            </div>
          `;
          items.forEach(item => {
            let targetUrl = item.url.startsWith('../') && !isSubdir ? item.url.replace('../', '') : item.url;
            if (isSubdir && !item.url.startsWith('../') && !item.url.startsWith('http')) {
              targetUrl = basePath + item.url;
            }
            html += `
              <a class="search-item" href="${targetUrl}">
                <div class="search-item-title">
                  <span>${item.title}</span>
                  <span class="search-item-mod">[${item.num}]</span>
                </div>
                <div class="search-item-desc">${item.desc}</div>
              </a>
            `;
          });
        }
      });

      searchResults.innerHTML = html;
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
