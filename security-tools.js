/**
 * Endlessus Security Tools Engine
 * Core client-side processing module for security-tools.html.
 * Handles encoders, decoders, subnet calculation, hash demo, and educational payloads.
 * Zero-telemetry, 100% in-browser processing.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SecurityTools = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. ENCODERS & DECODERS
  // =========================================================================

  // UTF-8 Safe Base64 Encoding
  function encodeBase64(str, urlSafe) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str) return '';
    try {
      // Use TextEncoder to get UTF-8 bytes
      const bytes = new TextEncoder().encode(str);
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      let b64 = btoa(binary);
      if (urlSafe) {
        b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
      return b64;
    } catch (e) {
      throw new Error('Base64 encoding error: ' + e.message);
    }
  }

  // UTF-8 Safe Base64 Decoding
  function decodeBase64(str) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str.trim()) return '';
    try {
      let b64 = str.trim().replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) {
        b64 += '=';
      }
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch (e) {
      throw new Error('Invalid Base64 string: ' + e.message);
    }
  }

  // URL Encode
  function encodeURL(str, fullComponent) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str) return '';
    try {
      if (fullComponent) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
          return '%' + c.charCodeAt(0).toString(16).toUpperCase();
        });
      }
      return encodeURI(str);
    } catch (e) {
      throw new Error('URL encoding error: ' + e.message);
    }
  }

  // URL Decode
  function decodeURL(str) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str) return '';
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
      throw new Error('Invalid URL encoding sequence: ' + e.message);
    }
  }

  // HTML Entity Encode
  function encodeHTML(str) {
    if (typeof str !== 'string') str = String(str || '');
    return str.replace(/[&<>"']/g, function (match) {
      switch (match) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return match;
      }
    });
  }

  // HTML Entity Decode
  function decodeHTML(str) {
    if (typeof str !== 'string') str = String(str || '');
    const entities = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&#x27;': "'",
      '&apos;': "'"
    };
    return str.replace(/&(?:amp|lt|gt|quot|#39|#x27|apos);/g, function (match) {
      return entities[match] || match;
    });
  }

  // Hex Encode
  function encodeHex(str, separator) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str) return '';
    const bytes = new TextEncoder().encode(str);
    const hexArr = [];
    for (let i = 0; i < bytes.length; i++) {
      hexArr.push(bytes[i].toString(16).padStart(2, '0'));
    }
    return hexArr.join(separator !== undefined ? separator : ' ');
  }

  // Hex Decode
  function decodeHex(str) {
    if (typeof str !== 'string') str = String(str || '');
    const clean = str.replace(/[^0-9a-fA-F]/g, '');
    if (!clean) return '';
    if (clean.length % 2 !== 0) {
      throw new Error('Hex string must have an even number of characters.');
    }
    const bytes = new Uint8Array(clean.length / 2);
    for (let i = 0; i < clean.length; i += 2) {
      bytes[i / 2] = parseInt(clean.substr(i, 2), 16);
    }
    return new TextDecoder().decode(bytes);
  }

  // Binary Encode (Text to 8-bit binary)
  function textToBinary(str, separator) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str) return '';
    const bytes = new TextEncoder().encode(str);
    const binArr = [];
    for (let i = 0; i < bytes.length; i++) {
      binArr.push(bytes[i].toString(2).padStart(8, '0'));
    }
    return binArr.join(separator !== undefined ? separator : ' ');
  }

  // Binary Decode (8-bit binary to Text)
  function binaryToText(str) {
    if (typeof str !== 'string') str = String(str || '');
    const clean = str.replace(/[^01]/g, '');
    if (!clean) return '';
    if (clean.length % 8 !== 0) {
      throw new Error('Binary string length must be a multiple of 8 bits.');
    }
    const bytes = new Uint8Array(clean.length / 8);
    for (let i = 0; i < clean.length; i += 8) {
      bytes[i / 8] = parseInt(clean.substr(i, 8), 2);
    }
    return new TextDecoder().decode(bytes);
  }

  // JSON Formatter & Validator
  function formatJSON(str, indentSpaces) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str.trim()) return '';
    const parsed = JSON.parse(str);
    return JSON.stringify(parsed, null, indentSpaces || 2);
  }

  function validateJSON(str, indentSpaces) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str.trim()) return { valid: false, error: 'Empty input string' };
    try {
      const parsed = JSON.parse(str);
      return {
        valid: true,
        formatted: JSON.stringify(parsed, null, indentSpaces || 2),
        parsed
      };
    } catch (err) {
      return {
        valid: false,
        error: err.message
      };
    }
  }

  // Shannon Entropy Calculation (0.0 to 8.0 bits per byte)
  function calculateEntropy(str) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str) return { entropy: 0, bitsPerByte: 0, totalBits: 0, uniqueBytes: 0, rating: 'Empty', description: 'No data to evaluate' };
    const bytes = new TextEncoder().encode(str);
    const len = bytes.length;
    if (len === 0) return { entropy: 0, bitsPerByte: 0, totalBits: 0, uniqueBytes: 0, rating: 'Empty', description: 'No data to evaluate' };

    const frequencies = {};
    for (let i = 0; i < len; i++) {
      const b = bytes[i];
      frequencies[b] = (frequencies[b] || 0) + 1;
    }

    let entropy = 0;
    for (const b in frequencies) {
      const p = frequencies[b] / len;
      entropy -= p * Math.log2(p);
    }
    const roundedEntropy = Math.round(entropy * 1000) / 1000;
    const totalBits = Math.round(entropy * len);

    let rating = 'Medium';
    let description = 'Typical natural language text or source code.';
    if (roundedEntropy === 0) {
      rating = 'Zero';
      description = 'All characters are identical; no randomness.';
    } else if (roundedEntropy < 2.5) {
      rating = 'Low';
      description = 'Highly repetitive, predictable structured data.';
    } else if (roundedEntropy > 7.2) {
      rating = 'High';
      description = 'Very high randomness; characteristic of encrypted or compressed data.';
    } else if (roundedEntropy > 5.5) {
      rating = 'Moderately High';
      description = 'Base64, hex encoded binaries, or randomized tokens.';
    }

    return {
      entropy: roundedEntropy,
      bitsPerByte: roundedEntropy,
      totalBits,
      uniqueBytes: Object.keys(frequencies).length,
      rating,
      description
    };
  }

  // Canonical Hex Dump Generation (16 bytes per row)
  function generateHexDump(str, maxBytes) {
    if (typeof str !== 'string') str = String(str || '');
    if (!str) return '';
    const limit = typeof maxBytes === 'number' ? maxBytes : 4096;
    const bytes = new TextEncoder().encode(str);
    const len = Math.min(bytes.length, limit);
    const lines = [];

    for (let offset = 0; offset < len; offset += 16) {
      const offsetHex = offset.toString(16).padStart(8, '0');
      const hexParts = [];
      let ascii = '';

      for (let i = 0; i < 16; i++) {
        const byteIndex = offset + i;
        if (byteIndex < len) {
          const b = bytes[byteIndex];
          hexParts.push(b.toString(16).padStart(2, '0'));
          ascii += (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
        } else {
          hexParts.push('  ');
        }
      }

      const block1 = hexParts.slice(0, 8).join(' ');
      const block2 = hexParts.slice(8, 16).join(' ');
      lines.push(`${offsetHex}  ${block1}  ${block2}  |${ascii}|`);
    }

    if (bytes.length > limit) {
      lines.push(`... [Truncated: showing first ${limit} of ${bytes.length} bytes]`);
    }

    return lines.join('\n');
  }

  // UTF-8 Text Inspector
  function inspectText(str) {
    if (typeof str !== 'string') str = String(str || '');
    const bytes = new TextEncoder().encode(str);
    const chars = Array.from(str);
    const lines = str ? str.split(/\r\n|\r|\n/).length : 0;
    const words = str.trim() ? str.trim().split(/\s+/).length : 0;
    const ent = calculateEntropy(str);
    return {
      characterCount: chars.length,
      byteLength: bytes.length,
      wordCount: words,
      lineCount: lines,
      chars: chars.length,
      bytes: bytes.length,
      words: words,
      lines: lines,
      isAsciiOnly: /^[\x00-\x7F]*$/.test(str),
      entropy: ent.entropy,
      entropyRating: ent.rating,
      entropyDescription: ent.description
    };
  }

  // =========================================================================
  // 2. IPV4 & CIDR SUBNET CALCULATOR
  // =========================================================================

  function calculateSubnet(ipStr, cidrPrefix) {
    ipStr = (ipStr || '').trim();
    let prefix = parseInt(cidrPrefix, 10);

    // If input is like 192.168.1.50/24
    if (ipStr.includes('/')) {
      const parts = ipStr.split('/');
      ipStr = parts[0].trim();
      prefix = parseInt(parts[1], 10);
    }

    if (isNaN(prefix) || prefix < 0 || prefix > 32) {
      throw new Error('Invalid CIDR prefix. Must be an integer between 0 and 32.');
    }

    const octets = ipStr.split('.').map(o => parseInt(o, 10));
    if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
      throw new Error('Invalid IPv4 address format. Expected 4 octets (0-255).');
    }

    // Convert IP to 32-bit unsigned integer
    const ipInt = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;

    // Subnet mask as 32-bit integer
    const maskInt = prefix === 0 ? 0 : ((0xFFFFFFFF << (32 - prefix)) >>> 0);
    const wildcardInt = (~maskInt) >>> 0;

    const netInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (netInt | wildcardInt) >>> 0;

    function intToIP(val) {
      return [
        (val >>> 24) & 255,
        (val >>> 16) & 255,
        (val >>> 8) & 255,
        val & 255
      ].join('.');
    }

    const totalAddresses = Math.pow(2, 32 - prefix);
    const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : Math.max(0, totalAddresses - 2);

    let firstUsable = 'N/A';
    let lastUsable = 'N/A';
    if (prefix <= 30) {
      firstUsable = intToIP(netInt + 1);
      lastUsable = intToIP(broadcastInt - 1);
    } else if (prefix === 31) {
      firstUsable = intToIP(netInt);
      lastUsable = intToIP(broadcastInt);
    } else {
      firstUsable = intToIP(netInt);
      lastUsable = intToIP(netInt);
    }

    // Check RFC 1918 Private range
    let scope = 'Public Internet';
    if (octets[0] === 10) {
      scope = 'Private (RFC 1918 Class A)';
    } else if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) {
      scope = 'Private (RFC 1918 Class B)';
    } else if (octets[0] === 192 && octets[1] === 168) {
      scope = 'Private (RFC 1918 Class C)';
    } else if (octets[0] === 127) {
      scope = 'Loopback (RFC 1122)';
    } else if (octets[0] === 169 && octets[1] === 254) {
      scope = 'Link-Local / APIPA (RFC 3927)';
    }

    return {
      ip: ipStr,
      cidr: '/' + prefix,
      subnetMask: intToIP(maskInt),
      netmask: intToIP(maskInt),
      wildcardMask: intToIP(wildcardInt),
      wildcard: intToIP(wildcardInt),
      networkAddress: intToIP(netInt),
      broadcastAddress: intToIP(broadcastInt),
      firstUsableHost: firstUsable,
      firstUsable: firstUsable,
      lastUsableHost: lastUsable,
      lastUsable: lastUsable,
      totalAddresses: totalAddresses,
      usableHosts: usableHosts,
      scope: scope,
      rfc1918Scope: scope,
      isPrivate: scope.startsWith('Private')
    };
  }

  // =========================================================================
  // 3. HASH IDENTIFIER GUIDANCE
  // =========================================================================

  function identifyHashCandidates(hashStr) {
    if (typeof hashStr !== 'string') hashStr = String(hashStr || '');
    const clean = hashStr.trim().toLowerCase();
    const len = clean.length;
    const isHex = /^[0-9a-f]+$/.test(clean);

    const results = {
      hashLength: len,
      isHex: isHex,
      candidates: [],
      caveat: 'Note: Hash identification is heuristic based on character length and encoding. Different algorithms can produce outputs of identical length, so certainty is impossible without algorithm context.'
    };

    if (!clean) return results;

    if (isHex) {
      if (len === 32) {
        results.candidates.push({ name: 'MD5', bitLength: 128, commonUsage: 'Legacy checksums, broken for collision resistance' });
        results.candidates.push({ name: 'NTLM', bitLength: 128, commonUsage: 'Windows authentication hash (MD4-based)' });
      } else if (len === 40) {
        results.candidates.push({ name: 'SHA-1', bitLength: 160, commonUsage: 'Git commit hashes, legacy SSL certificates' });
      } else if (len === 56) {
        results.candidates.push({ name: 'SHA-224', bitLength: 224, commonUsage: 'Truncated SHA-2 family' });
      } else if (len === 64) {
        results.candidates.push({ name: 'SHA-256', bitLength: 256, commonUsage: 'Standard TLS certificates, Bitcoin, modern integrity checksums' });
        results.candidates.push({ name: 'BLAKE2s', bitLength: 256, commonUsage: 'Fast modern cryptographic hash' });
      } else if (len === 96) {
        results.candidates.push({ name: 'SHA-384', bitLength: 384, commonUsage: 'NSA Suite B, high-security TLS' });
      } else if (len === 128) {
        results.candidates.push({ name: 'SHA-512', bitLength: 512, commonUsage: 'High-security cryptography, Linux /etc/shadow ($6$)' });
        results.candidates.push({ name: 'Whirlpool', bitLength: 512, commonUsage: '512-bit hash' });
      }
    }

    if (clean.startsWith('$2a$') || clean.startsWith('$2b$') || clean.startsWith('$2y$')) {
      results.candidates.push({ name: 'bcrypt', bitLength: 'Variable', commonUsage: 'Industry-standard salted password hash' });
    } else if (clean.startsWith('$6$')) {
      results.candidates.push({ name: 'SHA-512 Crypt', bitLength: 512, commonUsage: 'Linux shadow password file standard' });
    } else if (clean.startsWith('$argon2')) {
      results.candidates.push({ name: 'Argon2', bitLength: 'Variable', commonUsage: 'Password Hashing Competition winner (memory-hard)' });
    }

    return results;
  }

  // =========================================================================
  // 4. COMMON NETWORK PORTS REFERENCE
  // =========================================================================

  const COMMON_PORTS = [
    { port: 20, proto: 'TCP', service: 'FTP-DATA', desc: 'File Transfer Protocol data transfer channel', security: 'Unencrypted cleartext; credentials exposed on control port 21' },
    { port: 21, proto: 'TCP', service: 'FTP', desc: 'File Transfer Protocol command control', security: 'Plaintext authentication; check for anonymous login' },
    { port: 22, proto: 'TCP', service: 'SSH', desc: 'Secure Shell encrypted remote administration', security: 'Audit for weak passwords, outdated OpenSSH versions, and root login' },
    { port: 23, proto: 'TCP', service: 'Telnet', desc: 'Legacy unencrypted terminal shell', security: 'CRITICAL: Transmits all keystrokes and passwords in cleartext' },
    { port: 25, proto: 'TCP', service: 'SMTP', desc: 'Simple Mail Transfer Protocol (sending mail)', security: 'Check for open mail relay and VRFY/EXPN user enumeration' },
    { port: 53, proto: 'TCP/UDP', service: 'DNS', desc: 'Domain Name System name resolution', security: 'Audit for unauthorized DNS Zone Transfers (AXFR) and cache poisoning' },
    { port: 67, proto: 'UDP', service: 'DHCP (Server)', desc: 'Dynamic Host Configuration Protocol server', security: 'Susceptible to Rogue DHCP and DHCP Starvation attacks on LAN' },
    { port: 68, proto: 'UDP', service: 'DHCP (Client)', desc: 'Dynamic Host Configuration Protocol client endpoint', security: 'Receives DORA address parameters' },
    { port: 69, proto: 'UDP', service: 'TFTP', desc: 'Trivial File Transfer Protocol', security: 'No authentication; used for router firmware backups and PXE network boots' },
    { port: 80, proto: 'TCP', service: 'HTTP', desc: 'Hypertext Transfer Protocol (unencrypted web)', security: 'Cleartext web traffic; enforce HSTS and redirect to HTTPS port 443' },
    { port: 88, proto: 'TCP/UDP', service: 'Kerberos', desc: 'Enterprise Active Directory authentication ticket service', security: 'Target of Kerberoasting and AS-REP roasting attacks' },
    { port: 110, proto: 'TCP', service: 'POP3', desc: 'Post Office Protocol v3 (downloading email)', security: 'Plaintext credentials unless wrapped in SSL/TLS (port 995)' },
    { port: 123, proto: 'UDP', service: 'NTP', desc: 'Network Time Protocol (clock synchronization)', security: 'Used in NTP amplification DDoS attacks' },
    { port: 143, proto: 'TCP', service: 'IMAP', desc: 'Internet Message Access Protocol', security: 'Plaintext mail retrieval unless wrapped in SSL/TLS (port 993)' },
    { port: 389, proto: 'TCP/UDP', service: 'LDAP', desc: 'Lightweight Directory Access Protocol', security: 'Exposes directory structure and user attributes if anonymous bind enabled' },
    { port: 443, proto: 'TCP', service: 'HTTPS', desc: 'HTTP Secure over TLS encryption', security: 'Audit TLS versions (disable SSLv3, TLS 1.0/1.1), check certificate validity' },
    { port: 445, proto: 'TCP', service: 'SMB', desc: 'Server Message Block Windows file sharing', security: 'Target of EternalBlue (MS17-010), null sessions, and PsExec lateral movement' },
    { port: 636, proto: 'TCP', service: 'LDAPS', desc: 'LDAP over TLS encryption', security: 'Encrypted directory service querying' },
    { port: 993, proto: 'TCP', service: 'IMAPS', desc: 'IMAP over TLS encryption', security: 'Encrypted mail synchronization' },
    { port: 995, proto: 'TCP', service: 'POP3S', desc: 'POP3 over TLS encryption', security: 'Encrypted mail downloading' },
    { port: 1433, proto: 'TCP', service: 'MSSQL', desc: 'Microsoft SQL Server database', security: 'Check for default sa account credentials and xp_cmdshell command execution' },
    { port: 1521, proto: 'TCP', service: 'Oracle DB', desc: 'Oracle Database listener', security: 'Check for default SID names and brute-force credentials' },
    { port: 2049, proto: 'TCP/UDP', service: 'NFS', desc: 'Network File System Linux file sharing', security: 'Check for no_root_squash misconfigurations allowing root privilege escalation' },
    { port: 3306, proto: 'TCP', service: 'MySQL', desc: 'MySQL / MariaDB database engine', security: 'Audit remote root login and unauthenticated user access' },
    { port: 3389, proto: 'TCP', service: 'RDP', desc: 'Microsoft Remote Desktop Protocol', security: 'Target of BlueKeep (CVE-2019-0708) and credential brute force' },
    { port: 5432, proto: 'TCP', service: 'PostgreSQL', desc: 'PostgreSQL relational database', security: 'Check for default postgres superuser access' },
    { port: 5900, proto: 'TCP', service: 'VNC', desc: 'Virtual Network Computing remote desktop', security: 'Often deployed with missing or weak 8-character passwords' },
    { port: 6379, proto: 'TCP', service: 'Redis', desc: 'Redis in-memory data store', security: 'Frequently deployed without passwords, enabling SSH key write exploitation' },
    { port: 8080, proto: 'TCP', service: 'HTTP-Alt', desc: 'Common alternative HTTP proxy or web app port', security: 'Often hosts development or admin consoles (Tomcat, Jenkins)' }
  ];

  // =========================================================================
  // 5. EDUCATIONAL PAYLOAD WORKBENCH (SEARCHABLE & DOCUMENTED)
  // =========================================================================

  const EDUCATIONAL_PAYLOADS = [
    // Category: Harmless Test Strings
    {
      id: 'payload-canary-01',
      name: 'Alpha-Numeric Canary String',
      category: 'test-strings',
      categoryName: 'Harmless Test Strings',
      purpose: 'Verify application reflection and parameter boundaries without triggering security alarms',
      context: 'Input fields, search bars, URL parameters',
      payload: 'ENDLESSUS_TEST_Canary_7x9Q',
      description: 'A harmless unique alphanumeric token used to check whether user input is reflected in HTML response bodies without executing any script or query logic.',
      expectedLabResult: 'The literal string is reflected unmodified in the HTTP response.',
      mitigation: 'No mitigation required for harmless strings; ensure output encoding is maintained.',
      roomLink: 'learning.html#room-01'
    },
    {
      id: 'payload-boundary-02',
      name: 'Delimiter Boundary Probe',
      category: 'test-strings',
      categoryName: 'Harmless Test Strings',
      purpose: 'Test parser handling of quotes, angle brackets, and special punctuation',
      context: 'Input validation testing',
      payload: '\'"`><&;()%{}[]',
      description: 'A benign string containing common programming delimiters to observe whether an application safely escapes or sanitizes punctuation characters.',
      expectedLabResult: 'Special characters are converted to HTML entities (&quot;, &lt;, &gt;) in output.',
      mitigation: 'Contextual HTML entity encoding and strict input type validation.',
      roomLink: 'learning.html#room-33'
    },

    // Category: XSS Concepts
    {
      id: 'payload-xss-01',
      name: 'Classic Script Tag Alert',
      category: 'xss',
      categoryName: 'Cross-Site Scripting (XSS)',
      purpose: 'Demonstrate JavaScript execution in unescaped HTML body contexts',
      context: 'HTML body context (outside attributes or script tags)',
      payload: '<script>alert("Endlessus XSS")</script>',
      description: 'The canonical proof-of-concept payload testing whether raw HTML markup injected by a user is rendered directly by the victim browser without sanitization.',
      expectedLabResult: 'Triggers a non-destructive modal alert box in vulnerable web training applications (Lab 06).',
      mitigation: 'Context-aware output encoding (e.g. converting < to &lt;), and Content-Security-Policy (CSP) headers.',
      roomLink: 'learning.html#room-31'
    },
    {
      id: 'payload-xss-02',
      name: 'Input Attribute Escape Probe',
      category: 'xss',
      categoryName: 'Cross-Site Scripting (XSS)',
      purpose: 'Break out of HTML input value attributes using double quotes',
      context: '<input type="text" value="USER_INPUT">',
      payload: '"><script>alert(1)</script>',
      description: 'Closes the preceding input attribute tag with "> and injects an executable script element into the surrounding DOM.',
      expectedLabResult: 'Attribute is terminated early and script tag executes.',
      mitigation: 'HTML attribute encoding (e.g. converting " to &quot;).',
      roomLink: 'learning.html#room-33'
    },
    {
      id: 'payload-xss-03',
      name: 'Image onerror Event Handler',
      category: 'xss',
      categoryName: 'Cross-Site Scripting (XSS)',
      purpose: 'Execute JavaScript via inline event handlers when script tags are filtered',
      context: 'HTML body context where <script> tags are blacklisted',
      payload: '<img src=x onerror=alert(1)>',
      description: 'Forces the browser to load a non-existent image source ("x"), triggering the onerror event handler automatically without needing user interaction.',
      expectedLabResult: 'Browser fails to load image and executes onerror callback.',
      mitigation: 'Sanitize HTML with DOMPurify and enforce CSP directives disabling inline scripts (script-src \'self\').',
      roomLink: 'learning.html#room-31'
    },
    {
      id: 'payload-xss-04',
      name: 'SVG Onload Vector',
      category: 'xss',
      categoryName: 'Cross-Site Scripting (XSS)',
      purpose: 'Bypass legacy WAF filters that only inspect standard HTML tags',
      context: 'Modern XML/SVG rendering contexts',
      payload: '<svg onload=alert(document.domain)>',
      description: 'Utilizes XML SVG elements that trigger JavaScript execution upon element load.',
      expectedLabResult: 'SVG loads in DOM and displays the current origin domain.',
      mitigation: 'Disallow raw SVG uploads and use strict Content-Type headers.',
      roomLink: 'learning.html#room-33'
    },

    // Category: SQL Injection Concepts
    {
      id: 'payload-sqli-01',
      name: 'Classic Authentication Bypass',
      category: 'sqli',
      categoryName: 'SQL Injection (SQLi)',
      purpose: 'Demonstrate boolean tautology to bypass password verification queries',
      context: 'Login username parameter: SELECT * FROM users WHERE user=\'INPUT\' AND pass=\'...\'',
      payload: 'admin\' OR 1=1 --',
      description: 'Injects a single quote to terminate the string literal, adds a tautology (1=1 is always true), and uses comment dashes (--) to discard the password check.',
      expectedLabResult: 'Authenticates into the administrative dashboard without knowing the password (Lab 03 / Lab 05).',
      mitigation: 'Parameterized queries (Prepared Statements) with bound parameters in all SQL statements.',
      roomLink: 'learning.html#room-37'
    },
    {
      id: 'payload-sqli-02',
      name: 'UNION Column Count Enumeration',
      category: 'sqli',
      categoryName: 'SQL Injection (SQLi)',
      purpose: 'Determine the number of columns returned by the original database query',
      context: 'Vulnerable search or ID endpoint',
      payload: '\' ORDER BY 4 --',
      description: 'Uses ORDER BY clauses sequentially (1, 2, 3, 4...) until the database throws an error, revealing the exact column count needed for UNION-based data extraction.',
      expectedLabResult: 'Succeeds on valid column count; errors when exceeding columns.',
      mitigation: 'ORM frameworks or parameterized SQL execution preventing user-controlled query structure.',
      roomLink: 'learning.html#room-35'
    },
    {
      id: 'payload-sqli-03',
      name: 'UNION SELECT Database Version Probe',
      category: 'sqli',
      categoryName: 'SQL Injection (SQLi)',
      purpose: 'Extract database software version and environment details',
      context: 'Reflected column output in search results',
      payload: '\' UNION SELECT 1, 2, sqlite_version(), 4 --',
      description: 'Appends a second SELECT query to extract system information into the reflected application response.',
      expectedLabResult: 'Displays the underlying SQLite/MySQL database version on screen.',
      mitigation: 'Parameterized queries and suppressing detailed database error messages.',
      roomLink: 'learning.html#room-35'
    },

    // Category: Command Injection Concepts
    {
      id: 'payload-cmdi-01',
      name: 'Semicolon Command Chaining',
      category: 'cmdi',
      categoryName: 'Command Injection',
      purpose: 'Execute secondary operating system commands via command separators',
      context: 'Vulnerable ping/lookup diagnostic web inputs',
      payload: '127.0.0.1; whoami',
      description: 'Appends a semicolon shell command separator to terminate the first command and execute `whoami` under the web server user context.',
      expectedLabResult: 'Outputs web server user ID (e.g. www-data) following the ping result.',
      mitigation: 'Avoid passing user input to system shell execution functions (e.g. exec, system); use dedicated library APIs.',
      roomLink: 'learning.html#room-13'
    },
    {
      id: 'payload-cmdi-02',
      name: 'Logical AND Command Chain',
      category: 'cmdi',
      categoryName: 'Command Injection',
      purpose: 'Chain commands conditionally using boolean operators',
      context: 'Unix/Windows shell execution endpoints',
      payload: '127.0.0.1 && cat /etc/passwd',
      description: 'Executes the initial ping, and upon success, executes `cat /etc/passwd` to dump system accounts.',
      expectedLabResult: 'Displays the contents of /etc/passwd.',
      mitigation: 'Strict input whitelist validation allowing only valid IP address formats.',
      roomLink: 'learning.html#room-13'
    },
    {
      id: 'payload-cmdi-03',
      name: 'Command Substitution ($())',
      category: 'cmdi',
      categoryName: 'Command Injection',
      purpose: 'Execute inline subshells when standard separators (;, |) are filtered',
      context: 'Double-quoted shell arguments: ping "USER_INPUT"',
      payload: '$(whoami)',
      description: 'Bash subshell substitution evaluates the enclosed command first and passes its output as an argument.',
      expectedLabResult: 'Subshell command runs and output is embedded into execution flow.',
      mitigation: 'Never pass user strings directly to bash -c; execute binaries with fixed argument arrays.',
      roomLink: 'learning.html#room-14'
    },

    // Category: Path Traversal
    {
      id: 'payload-lfi-01',
      name: 'Standard Dot-Dot-Slash Traversal',
      category: 'traversal',
      categoryName: 'Path Traversal',
      purpose: 'Climb out of the web document root to access sensitive operating system files',
      context: 'File viewer endpoints: view.php?file=USER_INPUT',
      payload: '../../../../etc/passwd',
      description: 'Uses parent directory sequences (..) to escape `/var/www/html/` and access the Linux password configuration database.',
      expectedLabResult: 'Server returns the plain text contents of /etc/passwd (Lab 09).',
      mitigation: 'Validate file paths with realpath/chroot and map user inputs to strict whitelist indexes.',
      roomLink: 'learning.html#room-08'
    },
    {
      id: 'payload-lfi-02',
      name: 'URL-Encoded Traversal Sequence',
      category: 'traversal',
      categoryName: 'Path Traversal',
      purpose: 'Bypass naive string filters checking for literal "../" characters',
      context: 'Web parameters protected by flawed input filters',
      payload: '%2e%2e%2f%2e%2e%2fetc%2fpasswd',
      description: 'URL-encodes dots (%2e) and slashes (%2f) to bypass front-end filters before web server path decoding takes place.',
      expectedLabResult: 'Web server decodes characters and resolves file path.',
      mitigation: 'Perform path canonicalization and verification AFTER URL decoding.',
      roomLink: 'learning.html#room-29'
    },
    {
      id: 'payload-lfi-03',
      name: 'Windows System File Traversal',
      category: 'traversal',
      categoryName: 'Path Traversal',
      purpose: 'Verify path traversal on Windows-based IIS or ASP.NET web servers',
      context: 'Windows web application file parameters',
      payload: '..\\..\\..\\Windows\\win.ini',
      description: 'Uses Windows backslash directory separators to retrieve the standard system initialization file.',
      expectedLabResult: 'Displays Windows win.ini configuration file.',
      mitigation: 'Use strict whitelist filename checks; avoid user-controlled filesystem access.',
      roomLink: 'learning.html#room-15'
    },

    // Category: HTTP Header & Session Probes
    {
      id: 'payload-header-01',
      name: 'X-Forwarded-For IP Spoofing',
      category: 'headers',
      categoryName: 'HTTP Header Probes',
      purpose: 'Test whether reverse proxies or rate limiters trust client-supplied client IP headers',
      context: 'HTTP request headers',
      payload: 'X-Forwarded-For: 127.0.0.1',
      description: 'Simulates requests originating from the local loopback interface to bypass IP-based administration blocks or endpoint rate limits (Lab 03).',
      expectedLabResult: 'Bypasses rate limiting or grants access to internal administrative routes.',
      mitigation: 'Only trust X-Forwarded-For headers from verified, internal reverse proxy gateways.',
      roomLink: 'learning.html#room-31'
    },
    {
      id: 'payload-header-02',
      name: 'CRLF Injection Header Split',
      category: 'headers',
      categoryName: 'HTTP Header Probes',
      purpose: 'Inject arbitrary HTTP response headers or cookie values via newline characters',
      context: 'User input reflected in response headers (redirects, set-cookie)',
      payload: 'valid_param%0d%0aSet-Cookie:%20malicious_token=1',
      description: 'Uses carriage return (%0d) and line feed (%0a) to split HTTP response headers and force the browser to accept forged headers.',
      expectedLabResult: 'Browser sets an unauthorized cookie or renders an injected response.',
      mitigation: 'Strip or reject carriage return (\\r) and newline (\\n) characters in header generation.',
      roomLink: 'learning.html#room-31'
    },

    // Category: IDOR & Parameter Tampering
    {
      id: 'payload-idor-01',
      name: 'Horizontal Parameter Incrementation',
      category: 'idor',
      categoryName: 'IDOR & Parameter Tampering',
      purpose: 'Test whether API endpoints enforce ownership verification against sequential object IDs',
      context: 'REST API endpoint: /api/invoices/9482',
      payload: '/api/invoices/9481',
      description: 'Alters a user-owned invoice number to an adjacent numeric ID to verify if another customer\'s private billing records can be accessed (Lab 04).',
      expectedLabResult: 'Returns adjacent customer data if authorization checks are missing.',
      mitigation: 'Implement robust server-side authorization checks verifying that the authenticated session owns the requested object ID.',
      roomLink: 'learning.html#room-33'
    },
    {
      id: 'payload-idor-02',
      name: 'Privileged Object ID Enumeration',
      category: 'idor',
      categoryName: 'IDOR & Parameter Tampering',
      purpose: 'Probe higher-tier executive or system account records',
      context: 'User profile endpoints: /api/v1/user/10043',
      payload: '/api/v1/user/10043',
      description: 'Tests non-sequential executive account identifiers to extract administrative data.',
      expectedLabResult: 'Displays executive profile data and authorization flags.',
      mitigation: 'Enforce Role-Based Access Control (RBAC) and reject unauthorized cross-tenant requests.',
      roomLink: 'learning.html#room-37'
    }
  ];

  return {
    encodeBase64,
    decodeBase64,
    encodeURL,
    decodeURL,
    encodeHTML,
    decodeHTML,
    encodeHex,
    decodeHex,
    textToBinary,
    binaryToText,
    formatJSON,
    validateJSON,
    inspectText,
    calculateEntropy,
    generateHexDump,
    calculateSubnet,
    identifyHashCandidates,
    COMMON_PORTS,
    EDUCATIONAL_PAYLOADS
  };
});
