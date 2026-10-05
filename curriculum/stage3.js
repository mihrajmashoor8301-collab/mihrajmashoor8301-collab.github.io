// curriculum/stage3.js
module.exports = [
  {
    id: "room-11",
    stage: 3,
    stageTitle: "Stage 3 — How the Web Works",
    title: "How the Internet Delivers a Website",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "25 min",
    prerequisites: "Stage 2 (Networking Fundamentals)",
    whyAreYouHere: "You open your browser and type `https://endlessus.in`. Less than one second later, text, buttons, and animations appear on your screen. What actually happened behind the glass during that single second? This room synthesizes everything you've learned so far — DNS, IP routing, TCP handshakes, TLS encryption, and HTTP — into one complete, visually stunning end-to-end journey.",
    objectives: [
      "Follow the complete 8-step lifecycle of a web request",
      "Understand URL structure: Scheme, Domain, Port, Path, Query string, and Fragment",
      "Learn how TLS (Transport Layer Security) encrypts communication over public networks",
      "Understand the roles of Web Servers, Reverse Proxies, and CDN Edge Nodes",
      "Inspect the timing breakdown of a live web request"
    ],
    vocabulary: [
      { term: "URL (Uniform Resource Locator)", definition: "The complete web address used to locate a specific resource on the internet (e.g., `https://endlessus.in/learning.html?theme=normal`)." },
      { term: "TLS / SSL", definition: "Transport Layer Security: the cryptographic protocol that provides privacy and data integrity between two communicating computer applications." },
      { term: "HTTPS (Port 443)", definition: "HTTP layered over an encrypted TLS connection, preventing eavesdropping and tampering by network adversaries." },
      { term: "CDN (Content Delivery Network)", definition: "A geographically distributed network of proxy servers that cache content close to end users for high speed." },
      { term: "Reverse Proxy", definition: "A server (like Nginx or Cloudflare) positioned in front of web servers to handle TLS, caching, and load balancing." }
    ],
    lessons: [
      {
        title: "1. The 8-Step Web Request Odyssey",
        content: `What happens when you hit Enter on \`https://endlessus.in\`:
1. **URL Parsing**: Browser separates Scheme (\`https\`), Host (\`endlessus.in\`), Port (\`443\`), and Path (\`/\`).
2. **DNS Resolution**: Browser queries cache -> resolver -> authoritative server to discover destination IP (\`185.199.108.153\`).
3. **TCP 3-Way Handshake**: Client and server exchange SYN -> SYN-ACK -> ACK on port 443.
4. **TLS Key Exchange**: Client and server exchange cryptographic certificates, verify server identity, and negotiate an AES session key.
5. **HTTP Request**: Browser transmits \`GET / HTTP/2\` encrypted inside TLS.
6. **Server Processing**: Web server / reverse proxy routes request to application backend.
7. **HTTP Response**: Server transmits status \`200 OK\` with HTML content.
8. **Browser Rendering**: Browser parses HTML, constructs DOM, downloads CSS/JS, and paints pixels.`
      }
    ],
    seeExamples: [
      {
        title: "Complete Web Request Flowchart",
        codeOrDiagram: `[ Browser: User types URL ]
            ↓ Step 1 & 2
[ DNS Resolver: Resolves endlessus.in -> 185.199.108.153 ]
            ↓ Step 3
[ TCP Handshake: SYN -> SYN-ACK -> ACK on Port 443 ]
            ↓ Step 4
[ TLS Handshake: Certificate verified & Session Keys established ]
            ↓ Step 5 & 6
[ Encrypted HTTP GET / transmitted across ISP and Fiber ]
            ↓ Step 7
[ Web Server returns 200 OK + HTML payload ]
            ↓ Step 8
[ Browser renders DOM & executes JavaScript ]`,
        explanation: "Every modern website interaction traverses this exact pipeline before you see a single image."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Inspect the timing phases (DNS, TCP Connect, TLS Handshake, and First Byte) of connecting to `https://endlessus.in` using curl:",
      initialCommand: "",
      expectedCommand: "curl -w \"DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s | Total: %{time_total}s\\n\" -o /dev/null -s https://endlessus.in",
      simulatedOutput: "DNS: 0.012s | Connect: 0.038s | TLS: 0.076s | Total: 0.114s\n[+] Success! Complete request completed in 114ms: DNS (12ms) -> TCP (26ms) -> TLS (38ms) -> Content delivery (38ms).",
      explanation: "`curl -w` formats custom diagnostic metrics, allowing security analysts to profile connection latency and SSL handshakes."
    },
    questions: [
      {
        id: "r11-q1",
        type: "multiple-choice",
        question: "During which phase of delivering an HTTPS website are cryptographic certificates validated and symmetric encryption keys negotiated?",
        options: [
          "The DNS Resolution phase",
          "The TLS Handshake phase",
          "The ARP Broadcast phase",
          "The HTML Parsing phase"
        ],
        correctIndex: 1,
        explanation: "The TLS (Transport Layer Security) handshake negotiates ciphers and authenticates the server's public key certificate."
      },
      {
        id: "r11-q2",
        type: "multiple-choice",
        question: "If a website uses unencrypted HTTP on port 80 instead of HTTPS on port 443, what can a malicious actor on the same Wi-Fi network see?",
        options: [
          "Only the domain name, but all passwords are automatically masked",
          "The entire contents of requests and responses, including login passwords, session cookies, and private messages in plain text",
          "Nothing, because Wi-Fi routers automatically encrypt all web traffic with RSA",
          "Only the server's CPU temperature"
        ],
        correctIndex: 1,
        explanation: "Unencrypted HTTP sends everything in plain text over the air. Anyone running Wireshark or ARP spoofing can read all cookies and credentials."
      }
    ],
    tasks: [
      {
        title: "Task 1: Profile Web Latency Breakdown",
        instruction: "Execute the curl timing command to measure the real-world connection phases of `https://endlessus.in`.",
        hints: [
          "Concept: Measure DNS, Connect, TLS, and Total times.",
          "Direction: Use curl with the `-w` write-out parameter.",
          "Tool: `curl`",
          "Syntax: Run the provided timing command.",
          "Explanation: Demonstrates how fast modern web infrastructure operates."
        ]
      }
    ],
    explainResult: "The `curl` command opened a socket, resolved DNS via system getaddrinfo, initiated the TCP 3-way handshake, exchanged TLS client/server hellos, verified the certificate chain, and retrieved the web index.",
    securityConnection: "Every step in this delivery chain has a corresponding cyber attack: DNS Cache Poisoning at Step 2, TCP SYN Flooding at Step 3, Man-in-the-Middle SSL Stripping at Step 4, and Web Application Injection at Step 6. Understanding the delivery chain enables you to spot where security controls fail.",
    completion: {
      learned: [
        "The 8-step lifecycle of an internet web request",
        "The difference between HTTP (port 80) and encrypted HTTPS (port 443)",
        "The role of TLS handshakes in encrypting data in-flight",
        "How reverse proxies and CDNs protect origin servers"
      ],
      practiced: [
        "curl timing profiling",
        "Tracing request sequences from DNS to DOM",
        "Evaluating unencrypted vs encrypted transport"
      ]
    },
    nextRoomId: "room-12"
  },

  {
    id: "room-12",
    stage: 3,
    stageTitle: "Stage 3 — How the Web Works",
    title: "HTTP Fundamentals: Requests & Responses",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Room 11 (How the Internet Delivers a Website)",
    whyAreYouHere: "Web security testing is impossible without being able to read and construct raw HTTP traffic. Web applications do not operate on magic; they communicate via plain-text messages following the HTTP standard. In this room, you will dissect HTTP request methods (GET, POST, PUT, DELETE), understand status code ranges (200, 302, 403, 404, 500), and inspect request headers.",
    objectives: [
      "Understand the stateless nature of the Hypertext Transfer Protocol (HTTP)",
      "Dissect an HTTP Request: Method, Path, Version, Headers, and Body",
      "Master HTTP Methods: GET (retrieve), POST (submit), PUT (replace), DELETE (remove)",
      "Learn HTTP Response Status Code classes: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error)",
      "Send and analyze raw HTTP requests using curl and netcat"
    ],
    vocabulary: [
      { term: "HTTP (Hypertext Transfer Protocol)", definition: "The application-level protocol used for transmitting hypermedia documents across the World Wide Web." },
      { term: "GET Method", definition: "An HTTP method used to request data from a specified resource without altering server state." },
      { term: "POST Method", definition: "An HTTP method used to send data (such as login credentials or form inputs) to the server to create or update a resource." },
      { term: "Status Code", definition: "A 3-digit number returned by the server indicating the result of the client's request (e.g. 200 OK, 404 Not Found)." },
      { term: "HTTP Headers", definition: "Colon-separated key-value pairs (e.g. `User-Agent`, `Content-Type`) providing metadata about the request or response." },
      { term: "HTTP Body", definition: "The optional data payload sent after the headers, containing form parameters, JSON data, or file uploads." }
    ],
    lessons: [
      {
        title: "1. The Anatomy of an HTTP Request",
        content: `A raw HTTP request looks like this plain text:
\`\`\`http
POST /login HTTP/1.1
Host: endlessus.in
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 29

username=cadet&password=Secret123
\`\`\`
• Line 1: **Request Line** — Method (\`POST\`), Path (\`/login\`), Protocol (\`HTTP/1.1\`).
• Lines 2-5: **Headers** — Metadata specifying host, client type, and format.
• Line 6: **Blank Line** (\`\\r\\n\\r\\n\`) — Separates headers from body.
• Line 7: **Message Body** — The actual data sent to the server.`
      },
      {
        title: "2. Decoding HTTP Status Codes",
        content: `Status codes tell you what happened immediately:
• **2xx (Success)**: \`200 OK\` (Resource found and served), \`201 Created\` (New item added).
• **3xx (Redirection)**: \`301 Moved Permanently\`, \`302 Found / Temporary Redirect\` (Go to this other URL).
• **4xx (Client Error)**: \`400 Bad Request\` (Malformed syntax), \`401 Unauthorized\` (Login required), \`403 Forbidden\` (Permission denied), \`404 Not Found\` (Resource does not exist).
• **5xx (Server Error)**: \`500 Internal Server Error\` (Backend code crashed), \`502 Bad Gateway\` (Upstream proxy failed).`
      }
    ],
    seeExamples: [
      {
        title: "Anatomy of an HTTP Response",
        codeOrDiagram: `HTTP/1.1 200 OK
Date: Sun, 05 Oct 2026 16:35:00 GMT
Server: Apache/2.4.52 (Ubuntu)
Content-Type: text/html; charset=UTF-8
Content-Length: 142

<!DOCTYPE html>
<html>
  <head><title>Dashboard</title></head>
  <body><h1>Welcome Cadet</h1></body>
</html>`,
        explanation: "Status line, response headers (metadata), a mandatory blank line, followed by the HTML body."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Send a raw HTTP GET request to our lab web server and inspect the status line and headers using `curl -v http://localhost:8080/api/status`:",
      initialCommand: "",
      expectedCommand: "curl -v http://localhost:8080/api/status",
      simulatedOutput: "> GET /api/status HTTP/1.1\n> Host: localhost:8080\n> User-Agent: curl/8.5.0\n> Accept: */*\n>\n< HTTP/1.1 200 OK\n< Content-Type: application/json\n< Content-Length: 32\n<\n{\"status\":\"operational\",\"auth\":false}\n[+] Success! You inspected both outgoing request headers (>) and incoming response headers (<).",
      explanation: "`curl -v` (verbose) displays the exact HTTP dialogue: lines starting with `>` are what you sent; lines with `<` are what the server returned."
    },
    questions: [
      {
        id: "r12-q1",
        type: "multiple-choice",
        question: "Which HTTP status code indicates that the requested file or endpoint could not be found on the server?",
        options: [
          "200 OK",
          "302 Found",
          "404 Not Found",
          "500 Internal Server Error"
        ],
        correctIndex: 2,
        explanation: "`404 Not Found` is the standard status code indicating the server cannot locate the requested URI."
      },
      {
        id: "r12-q2",
        type: "multiple-choice",
        question: "What character sequence is required in raw HTTP to separate the headers from the body payload?",
        options: [
          "An empty blank line (Carriage Return + Line Feed: `\\r\\n\\r\\n`)",
          "Three semicolons `;;;`",
          "An XML tag `<end-headers>`",
          "A null byte `\\x00`"
        ],
        correctIndex: 0,
        explanation: "RFC 7230 strictly mandates a double CRLF (an empty blank line) to signal the end of HTTP headers."
      }
    ],
    tasks: [
      {
        title: "Task 1: Analyze Verbose HTTP Headers",
        instruction: "Run `curl -v http://localhost:8080/api/status` to view the request and response handshake.",
        hints: [
          "Concept: Verbose HTTP inspection.",
          "Direction: Use the `-v` flag with curl.",
          "Tool: `curl`",
          "Syntax: `curl -v http://localhost:8080/api/status`",
          "Explanation: Displays full headers and payload."
        ]
      }
    ],
    explainResult: "The `curl` command opened a TCP connection to localhost:8080, transmitted formatted HTTP request lines, received the `200 OK` header block, and parsed the JSON body.",
    securityConnection: "Every web vulnerability scanner (Burp Suite, OWASP ZAP, ffuf) is fundamentally an HTTP crafting tool! When testing for SQL injection, XSS, or IDOR, you will modify headers, change methods from GET to POST, and inject payloads directly into the request body.",
    completion: {
      learned: [
        "The anatomy of an HTTP request (Method, Path, Version, Headers, Body)",
        "The anatomy of an HTTP response (Status Line, Headers, Payload)",
        "Standard status codes: 200, 301/302, 400, 401, 403, 404, 500",
        "Using curl -v to analyze raw HTTP headers"
      ],
      practiced: [
        "curl -v",
        "Inspecting request and response headers",
        "Differentiating client errors from server errors"
      ]
    },
    nextRoomId: "room-13"
  },

  {
    id: "room-13",
    stage: 3,
    stageTitle: "Stage 3 — How the Web Works",
    title: "Browsers, Cookies & Sessions",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "25 min",
    prerequisites: "Room 12 (HTTP Fundamentals)",
    whyAreYouHere: "HTTP has a profound quirk: it is completely **stateless**. This means when you click from page 1 to page 2 on a website, the server has no memory of who you are or that you just logged in three seconds ago! How do modern web apps keep you logged in as you browse? The answer is **Cookies and Sessions**. In this room, you will learn how browsers store state, how session tokens work, and why cookies are prime targets for cyber attackers.",
    objectives: [
      "Understand why HTTP is stateless and how state is maintained",
      "Learn how the server issues cookies using the `Set-Cookie` header",
      "Understand Session Identifiers (Session IDs) and server-side session stores",
      "Master critical cookie security flags: `HttpOnly`, `Secure`, and `SameSite`",
      "Understand session hijacking and how attackers steal login tokens"
    ],
    vocabulary: [
      { term: "Stateless Protocol", definition: "A communication protocol in which the receiver retains no memory or session state between independent requests." },
      { term: "HTTP Cookie", definition: "A small piece of data stored by the user's web browser, automatically sent back to the server with subsequent requests." },
      { term: "Session ID", definition: "A random, high-entropy unique string generated by the server upon successful authentication to track a user's session." },
      { term: "HttpOnly Flag", definition: "A cookie attribute that blocks JavaScript (`document.cookie`) from accessing the cookie, protecting it from theft via XSS." },
      { term: "Secure Flag", definition: "A cookie attribute ensuring the cookie is only transmitted over encrypted HTTPS connections, never over unencrypted HTTP." },
      { term: "SameSite Flag", definition: "A cookie attribute (`Strict`, `Lax`, or `None`) that controls whether cookies are sent with cross-site requests, mitigating CSRF." }
    ],
    lessons: [
      {
        title: "1. The Coat Check Analogy",
        content: `When you check your coat at a theater:
1. You give the attendant your coat.
2. They hand you a small ticket with a random number: **#4092**.
3. When you return, you don't re-explain who you are; you simply show ticket **#4092**, and they hand back your coat.

That ticket is a **Session Cookie**! When you log in with your username and password, the server verifies them, generates a random session ticket (\`SESSIONID=a8f9c2d1...\`), and sends it back in a \`Set-Cookie\` header. For every future click, your browser automatically attaches that cookie.`
      },
      {
        title: "2. The Essential Cookie Security Flags",
        content: `Because session cookies grant complete account access, browsers provide three crucial defense flags:
• \`HttpOnly\`: Tells the browser: *"Never let JavaScript scripts read this cookie."* If a hacker finds an XSS bug, they still cannot steal an HttpOnly cookie!
• \`Secure\`: Tells the browser: *"Never transmit this cookie over unencrypted HTTP."* Prevents coffee-shop Wi-Fi eavesdroppers from sniffing the session token.
• \`SameSite=Lax/Strict\`: Tells the browser: *"Do not send this cookie when requests originate from external third-party websites."* Prevents CSRF attacks.`
      }
    ],
    seeExamples: [
      {
        title: "Setting and Sending a Session Cookie",
        codeOrDiagram: `[ Step 1: User logs in ]
POST /api/login HTTP/1.1
Host: endlessus.in
username=cadet&password=ValidPassword123

[ Step 2: Server responds with Set-Cookie ]
HTTP/1.1 200 OK
Set-Cookie: session_id=x99aK10zP9q; Path=/; Secure; HttpOnly; SameSite=Lax

[ Step 3: Browser automatically attaches Cookie on next request ]
GET /profile HTTP/1.1
Host: endlessus.in
Cookie: session_id=x99aK10zP9q`,
        explanation: "Notice the three flags: `Secure`, `HttpOnly`, and `SameSite=Lax`. This is an enterprise-hardened session cookie."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate a login request that returns a session cookie, storing it into a local cookie jar using `curl -c cookies.txt -d \"user=cadet&pass=letmein\" http://localhost:8080/login`:",
      initialCommand: "",
      expectedCommand: "curl -c cookies.txt -d \"user=cadet&pass=letmein\" http://localhost:8080/login",
      simulatedOutput: "HTTP/1.1 200 OK\nSet-Cookie: auth_token=e4d9b26a8f110c7e; Path=/; HttpOnly; Secure\n{\"message\":\"Login successful. Session established.\"}\n[+] Success! Cookie stored in cookies.txt: auth_token=e4d9b26a8f110c7e.",
      explanation: "`curl -c <file>` instructs curl to act like a web browser's cookie storage engine, capturing any `Set-Cookie` headers for future requests."
    },
    questions: [
      {
        id: "r13-q1",
        type: "multiple-choice",
        question: "Which cookie security attribute prevents client-side JavaScript (such as `document.cookie`) from reading or extracting the session token?",
        options: [
          "SameSite",
          "HttpOnly",
          "Max-Age",
          "Domain"
        ],
        correctIndex: 1,
        explanation: "The `HttpOnly` flag restricts cookie access strictly to HTTP headers, blocking JavaScript access and preventing session theft via XSS."
      },
      {
        id: "r13-q2",
        type: "multiple-choice",
        question: "If an attacker manages to obtain a legitimate user's active session cookie, what can they do?",
        options: [
          "Nothing, because cookies can only be used on the physical computer that created them",
          "They can impersonate the victim and perform actions as that user without ever knowing their password (Session Hijacking)",
          "They can only view the server's public IP address",
          "They must crack the password hash before using the cookie"
        ],
        correctIndex: 1,
        explanation: "Since the server trusts the session cookie as proof of authentication, possessing the cookie allows complete account takeover (Session Hijacking)."
      }
    ],
    tasks: [
      {
        title: "Task 1: Capture and Save Session Cookie",
        instruction: "Use curl with `-c cookies.txt` to capture the authenticated session cookie from the lab login endpoint.",
        hints: [
          "Concept: Store incoming cookies in a cookie jar file.",
          "Direction: Use the `-c` flag with curl.",
          "Tool: `curl`",
          "Syntax: `curl -c cookies.txt -d \"user=cadet&pass=letmein\" http://localhost:8080/login`",
          "Explanation: Saves cookie for session reuse."
        ]
      }
    ],
    explainResult: "The server validated the credentials, generated a 64-bit session token, and passed it in the `Set-Cookie` header. Curl captured this into `cookies.txt`.",
    securityConnection: "Cookie theft is one of the most lucrative objectives for cyber adversaries. Malware like 'Infostealers' specifically scan Chrome and Firefox profile folders on infected computers to extract stored session cookies, allowing hackers to bypass Multi-Factor Authentication (MFA) on corporate accounts!",
    completion: {
      learned: [
        "Why HTTP is stateless and how cookies preserve session state",
        "How servers generate and issue Session IDs via Set-Cookie",
        "The critical defense flags: HttpOnly, Secure, and SameSite",
        "The mechanism and danger of Session Hijacking"
      ],
      practiced: [
        "curl -c cookies.txt",
        "Inspecting cookie jar structures",
        "Evaluating cookie security flags"
      ]
    },
    nextRoomId: "room-14"
  }
];
