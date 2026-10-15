# scripts/level5.py
# Level 5: Internet & Web Fundamentals (Rooms 29 - 33)

from generate_pre_security import DIAGRAMS

def get_rooms():
    return [
        # Room 29: How the World Wide Web Works
        {
            "stage": 5,
            "level": 5,
            "levelTitle": "Level 5 — Internet & Web Fundamentals",
            "title": "How the World Wide Web Works",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "25 min",
            "prerequisites": "Level 4: Networking Fundamentals",
            "whyAreYouHere": "Web applications are the most attacked surface in modern cybersecurity. From online banking and social media to cloud infrastructure portals, almost everything runs through web browsers. In this room, you will learn how the World Wide Web functions, examine the anatomy of a URL, and understand web servers like Nginx and Apache.",
            "objectives": [
                "Understand the web's foundational technologies: URLs, HTTP, HTML, and Web Servers",
                "Deconstruct the anatomy of a Uniform Resource Locator (URL): scheme, host, port, path, and query parameters",
                "Learn the role of web server daemons (Nginx, Apache HTTP Server, Microsoft IIS)",
                "Understand web document roots (e.g. `/var/www/html/`) and virtual hosting",
                "Query web pages from the terminal using `curl`"
            ],
            "vocabulary": [
                {"term": "URL (Uniform Resource Locator)", "definition": "A standardized reference address specifying the location and access protocol of a resource on the web."},
                {"term": "Web Server", "definition": "Software (such as Nginx or Apache) that listens on ports 80/443, processes HTTP requests, and returns HTML, CSS, images, or JSON data."},
                {"term": "Document Root", "definition": "The filesystem directory on a server where website files are stored (typically /var/www/html on Linux)."},
                {"term": "Query String", "definition": "The portion of a URL following '?' containing key-value parameters passed to the server (e.g. ?search=cybersecurity&page=1)."},
                {"term": "curl", "definition": "A command-line tool used to transfer data to or from a network server using protocols like HTTP, HTTPS, and FTP."}
            ],
            "diagramSvg": DIAGRAMS["http"],
            "lessons": [
                {
                    "title": "1. Anatomy of a URL",
                    "content": "Every time you click a link, your browser parses a **Uniform Resource Locator (URL)**:\n\n`https://endlessus.in:443/labs/search.php?topic=linux#task2`\n\n• **Scheme/Protocol (`https://`)**: Defines how to communicate (HTTP vs HTTPS).\n• **Host / Domain (`endlessus.in`)**: The domain name resolved via DNS to an IP.\n• **Port (`:443`)**: The target network port (optional; defaults to 80 for HTTP, 443 for HTTPS).\n• **Path (`/labs/search.php`)**: The file path requested on the web server.\n• **Query String (`?topic=linux`)**: User-supplied input parameters passed to server backend scripts.\n• **Fragment (`#task2`)**: Internal anchor for the browser to scroll down to."
                },
                {
                    "title": "2. Web Server Daemons: Apache & Nginx",
                    "content": "When a web server receives an incoming HTTP request, software daemons handle the delivery:\n\n• **Nginx**: Lightweight, event-driven web server famous for high performance and reverse proxying.\n• **Apache HTTP Server**: The classic workhorse of the web, configured via `.htaccess` files and modules.\n• **Microsoft IIS**: Enterprise web server running on Windows Server with ASP.NET.\n\nWebsite files live in a **Document Root** (e.g. `/var/www/html/`). If a user requests `GET /about.html`, the web server looks for `/var/www/html/about.html` and streams its bytes back in an HTTP response!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Fetching a Web Page with curl",
                    "codeOrDiagram": "cadet@endlessus:~$ curl -s http://10.10.10.45/index.html | head -n 4\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Acme Finance Portal</title>",
                    "explanation": "`curl -s` fetches the raw HTML page directly over HTTP without a graphical browser."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `curl -s http://10.10.10.45/index.html | head -n 3` in the terminal to inspect the HTML response:",
                "initialCommand": "",
                "expectedCommand": "curl -s http://10.10.10.45/index.html | head -n 3",
                "simulatedOutput": "<!DOCTYPE html>\n<html>\n<head>\n[+] Web server contacted: HTML document received over HTTP port 80.",
                "explanation": "`curl` retrieves HTTP resources via the command line."
            },
            "questions": [
                {
                    "id": "q-29-1",
                    "type": "exact",
                    "question": "Which command-line utility is widely used in Linux to transmit data and make HTTP/HTTPS web requests?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["curl"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Four letters: c-u-r-l.",
                    "explanation": "`curl` is the standard tool for transferring data with URLs."
                },
                {
                    "id": "q-29-2",
                    "type": "multiple-choice",
                    "question": "In the URL `http://example.com/search.php?query=security`, what is the component `?query=security` called?",
                    "visualSlots": None,
                    "options": [
                        "The Scheme",
                        "The Query String",
                        "The Fragment Identifier",
                        "The TLD"
                    ],
                    "correctIndex": 1,
                    "hint": "Query parameters passed after question mark.",
                    "explanation": "Parameters after the '?' character form the Query String."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Fetch HTML via curl",
                    "instruction": "Execute `curl -s http://10.10.10.45/index.html | head -n 3` in the terminal.",
                    "hints": ["Type: `curl -s http://10.10.10.45/index.html | head -n 3`"]
                }
            ],
            "securityConnection": "Attackers probe web query parameters (like `?id=1` or `?search=admin`) for injection vulnerabilities like SQL Injection, Cross-Site Scripting (XSS), and Local File Inclusion (LFI)."
        },

        # Room 30: HTTP Requests, Methods & Status Codes
        {
            "stage": 5,
            "level": 5,
            "levelTitle": "Level 5 — Internet & Web Fundamentals",
            "title": "HTTP Requests, Methods & Status Codes",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "25 min",
            "prerequisites": "Room 29: How the World Wide Web Works",
            "whyAreYouHere": "HTTP (Hypertext Transfer Protocol) is a plain-text protocol. Every action you take on the web—submitting a password, viewing a photo, deleting an account—is an HTTP Request containing a **Method** (verb) that receives an HTTP **Status Code** (number). In this room, you will learn the primary HTTP methods and understand the 5 families of HTTP status codes.",
            "objectives": [
                "Understand the structure of a raw HTTP request and HTTP response",
                "Learn primary HTTP Methods: GET, POST, PUT, DELETE, and HEAD",
                "Differentiate between safe/idempotent GET and state-changing POST",
                "Master the 5 HTTP Status Code families: 1xx, 2xx, 3xx, 4xx, and 5xx",
                "Inspect response headers and status codes using `curl -I`"
            ],
            "vocabulary": [
                {"term": "HTTP Method (Verb)", "definition": "The action specified in an HTTP request indicating what operation should be performed on the target resource."},
                {"term": "GET", "definition": "The HTTP method used strictly to retrieve data without modifying server state."},
                {"term": "POST", "definition": "The HTTP method used to send data (passwords, form inputs, uploaded files) to the server to create or update resources."},
                {"term": "Status Code", "definition": "A 3-digit number returned by a server indicating the outcome of the requested HTTP operation."},
                {"term": "404 Not Found", "definition": "Client error status code indicating the requested URL path does not exist on the server."}
            ],
            "diagramSvg": DIAGRAMS["http"],
            "lessons": [
                {
                    "title": "1. Primary HTTP Methods (Verbs)",
                    "content": "• **`GET`**: Retrieve a resource. Parameters are sent visibly inside the URL query string. GET should never change server state!\n• **`POST`**: Submit data to be processed (e.g. login forms, credit card forms). Data is transmitted inside the HTTP request body.\n• **`PUT`**: Replace an existing resource or upload a file.\n• **`DELETE`**: Delete the specified resource on the server.\n• **`HEAD`**: Same as GET, but asks the server to return ONLY the response headers, omitting the body (used by `curl -I` to audit security headers!)."
                },
                {
                    "title": "2. The 5 Families of HTTP Status Codes",
                    "content": "Status codes are 3-digit numbers grouped by their first digit:\n\n• **`1xx Informational`**: Request received, protocol switching (e.g. `101 Switching Protocols` for WebSockets).\n• **`2xx Success`**: Everything worked perfectly!\n  - `200 OK`: Standard successful response.\n  - `201 Created`: Resource successfully created (common in REST APIs).\n• **`3xx Redirection`**: Further action needed; browser redirected.\n  - `301 Moved Permanently`: URL has permanently changed.\n  - `302 Found (Temporary Redirect)`: Temporarily redirected (e.g. redirecting to `/login` if not authenticated).\n• **`4xx Client Error`**: The browser sent a bad or unauthorized request!\n  - `400 Bad Request`: Malformed syntax.\n  - `401 Unauthorized`: Authentication required (missing login credentials).\n  - `403 Forbidden`: Authenticated, but you lack permission to view this resource!\n  - `404 Not Found`: File or endpoint does not exist.\n• **`5xx Server Error`**: The server crashed or encountered an unhandled exception!\n  - `500 Internal Server Error`: Web application bug or database crash (Goldmine for pentesting!).\n  - `502 Bad Gateway`: Upstream backend server unreachable."
                }
            ],
            "seeExamples": [
                {
                    "title": "Inspecting Status Codes with curl -I",
                    "codeOrDiagram": "cadet@endlessus:~$ curl -I http://10.10.10.45/login\nHTTP/1.1 200 OK\nServer: nginx/1.24.0\nDate: Sun, 15 Oct 2026 12:00:00 GMT\nContent-Type: text/html; charset=UTF-8",
                    "explanation": "`curl -I` issues an HTTP HEAD request, returning the status line (`HTTP/1.1 200 OK`) and response headers."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `curl -I http://10.10.10.45/login` to inspect the HTTP response status code and headers:",
                "initialCommand": "",
                "expectedCommand": "curl -I http://10.10.10.45/login",
                "simulatedOutput": "HTTP/1.1 200 OK\nServer: nginx/1.24.0\nContent-Type: text/html; charset=UTF-8\n[+] Status code verified: HTTP 200 OK received.",
                "explanation": "`curl -I` queries only the response headers."
            },
            "questions": [
                {
                    "id": "q-30-1",
                    "type": "exact",
                    "question": "What 3-digit HTTP status code indicates that the requested web page was successfully found and returned (OK)?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["200"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Three digits: 200.",
                    "explanation": "200 OK is the standard success status code."
                },
                {
                    "id": "q-30-2",
                    "type": "exact",
                    "question": "Which HTTP status code represents 'Forbidden', meaning the server understands the request but refuses to authorize access?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["403"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Four-zero-three.",
                    "explanation": "403 Forbidden indicates access to the resource is blocked."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Query HTTP headers with curl -I",
                    "instruction": "Execute `curl -I http://10.10.10.45/login` in the terminal.",
                    "hints": ["Type: `curl -I http://10.10.10.45/login`"]
                }
            ],
            "securityConnection": "When testing for Insecure Direct Object References (IDOR), changing an ID from `user/10` to `user/11` should return a `403 Forbidden` if authorization is properly enforced. If the server instead returns `200 OK` with another user's private data, you have found a critical security flaw!"
        },

        # Room 31: HTTP Headers, Cookies & Sessions
        {
            "stage": 5,
            "level": 5,
            "levelTitle": "Level 5 — Internet & Web Fundamentals",
            "title": "HTTP Headers, Cookies & Stateful Sessions",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "30 min",
            "prerequisites": "Room 30: HTTP Requests, Methods & Status Codes",
            "whyAreYouHere": "HTTP is inherently a 'stateless' protocol: once a web server sends a response, it forgets who you are! To keep you logged in as you click from page to page, websites use HTTP Headers and Cookies to track sessions. In this room, you will learn how headers transmit metadata, how session tokens work, and how security flags (`HttpOnly`, `Secure`, `SameSite`) protect cookies from theft.",
            "objectives": [
                "Understand the structure of HTTP Request and Response Headers (Key-Value pairs)",
                "Identify common request headers: `User-Agent`, `Host`, `Accept`, and `Authorization`",
                "Learn how websites maintain persistent logins using Session IDs stored in Cookies",
                "Deconstruct the `Set-Cookie` header and its security flags: `HttpOnly`, `Secure`, and `SameSite`",
                "Understand essential security headers: HSTS, Content-Security-Policy (CSP), and X-Frame-Options"
            ],
            "vocabulary": [
                {"term": "HTTP Header", "definition": "A field in an HTTP request or response that passes additional operating parameters, security policies, and authentication tokens."},
                {"term": "Cookie", "definition": "A small piece of data stored in the user's web browser by the server to identify user sessions and track preferences."},
                {"term": "Set-Cookie", "definition": "The HTTP response header sent by a server instructing the client browser to store a cookie."},
                {"term": "HttpOnly Flag", "definition": "A cookie security flag that blocks client-side JavaScript (document.cookie) from accessing the cookie, preventing XSS cookie theft."},
                {"term": "Secure Flag", "definition": "A cookie security flag ensuring the cookie is only transmitted over encrypted HTTPS connections, never plain HTTP."},
                {"term": "HSTS (Strict-Transport-Security)", "definition": "A response header forcing browsers to communicate strictly over encrypted HTTPS, preventing SSL stripping."}
            ],
            "diagramSvg": DIAGRAMS["http"],
            "lessons": [
                {
                    "title": "1. The Anatomy of HTTP Headers",
                    "content": "Headers are plain-text `Key: Value` lines sent before the HTML body:\n\n**Request Headers (Sent by Browser)**:\n• `Host: endlessus.in`: Tells the server which website you want (essential when one server hosts 50 websites!).\n• `User-Agent: Mozilla/5.0...`: Identifies the browser, version, and operating system.\n• `Cookie: session_id=abc123xyz`: Transmits your secret login token with every click!\n\n**Response Headers (Sent by Server)**:\n• `Server: nginx/1.24.0`: Identifies server software (often hidden to prevent version profiling).\n• `Set-Cookie: session_id=abc123xyz; Path=/; Secure; HttpOnly`: Creates a session cookie."
                },
                {
                    "title": "2. The Golden Triad of Cookie Security",
                    "content": "When a bank server assigns a session cookie, it MUST include three security flags:\n\n1. **`HttpOnly`**: Blocks JavaScript (`document.cookie`). If a hacker exploits a Cross-Site Scripting (XSS) vulnerability, they CANNOT steal the session cookie!\n2. **`Secure`**: Forces the browser to transmit the cookie ONLY over encrypted HTTPS. Prevents Wi-Fi eavesdroppers from intercepting your token.\n3. **`SameSite=Strict` or `Lax`**: Controls whether cookies are sent on cross-site requests. The primary defense against Cross-Site Request Forgery (CSRF)!"
                },
                {
                    "title": "3. Vital HTTP Security Headers",
                    "content": "Modern servers harden themselves by sending these response headers:\n\n• **`Strict-Transport-Security (HSTS)`**: Forces HTTPS connection encryption for a year.\n• **`X-Frame-Options: DENY`**: Prevents the website from being embedded inside an `<iframe>` on an attacker's site (stops Clickjacking!).\n• **`Content-Security-Policy (CSP)`**: Restricts which domains scripts, images, and styles can be loaded from (stops XSS execution)."
                }
            ],
            "seeExamples": [
                {
                    "title": "Auditing Cookie Flags with curl",
                    "codeOrDiagram": "cadet@endlessus:~$ curl -I http://10.10.10.45/login | grep -i \"set-cookie\"\nSet-Cookie: session=eyJhbGciOi...; Path=/; HttpOnly; SameSite=Strict\n\n[+] Security Audit: Cookie contains HttpOnly and SameSite=Strict flags!",
                    "explanation": "`curl -I` piped into `grep -i set-cookie` extracts cookie definitions to verify security flags."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `curl -I https://staging.acmefin.local | grep -i strict` to audit HSTS header enforcement:",
                "initialCommand": "",
                "expectedCommand": "curl -I https://staging.acmefin.local | grep -i strict",
                "simulatedOutput": "[!] Audit result: No Strict-Transport-Security header returned (HSTS missing!).",
                "explanation": "Absence of HSTS header indicates an HTTP downgrade vulnerability."
            },
            "questions": [
                {
                    "id": "q-31-1",
                    "type": "exact",
                    "question": "Which cookie security flag prevents client-side JavaScript code (document.cookie) from accessing or stealing the cookie?",
                    "visualSlots": "_ _ _ _ _ _ _ _",
                    "acceptedAnswers": ["HttpOnly"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Http + Only.",
                    "explanation": "HttpOnly blocks script access to cookies, mitigating XSS cookie theft."
                },
                {
                    "id": "q-31-2",
                    "type": "multiple-choice",
                    "question": "Which HTTP security response header prevents a web page from being rendered inside an iframe, protecting against Clickjacking attacks?",
                    "options": [
                        "Server",
                        "X-Frame-Options",
                        "User-Agent",
                        "Content-Type"
                    ],
                    "correctIndex": 1,
                    "hint": "Frame options header.",
                    "explanation": "X-Frame-Options (DENY / SAMEORIGIN) blocks iframe framing to prevent Clickjacking."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Audit HTTP headers with curl",
                    "instruction": "Execute `curl -I https://staging.acmefin.local | grep -i strict` in the terminal.",
                    "hints": ["Type: `curl -I https://staging.acmefin.local | grep -i strict`"]
                }
            ],
            "securityConnection": "In **Lab 01 (lab-headers)**, you audit a staging financial portal using `curl -I | grep -i strict` and `curl -I | grep -i frame` to identify missing HSTS and X-Frame-Options headers, then harden the Nginx configuration to achieve full security compliance."
        },

        # Room 32: TLS, HTTPS & Cryptographic Trust
        {
            "stage": 5,
            "level": 5,
            "levelTitle": "Level 5 — Internet & Web Fundamentals",
            "title": "TLS, HTTPS & Cryptographic Trust Chains",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "25 min",
            "prerequisites": "Room 31: HTTP Headers, Cookies & Stateful Sessions",
            "whyAreYouHere": "In plain HTTP, every password, session cookie, and credit card number travels across the network in clear unencrypted text. Anyone sitting on public coffee shop Wi-Fi or monitoring an ISP router can read your secrets. HTTPS solves this by wrapping HTTP inside Transport Layer Security (TLS) encryption. In this room, you will learn how symmetric and asymmetric encryption combine to protect data in transit.",
            "objectives": [
                "Understand why unencrypted HTTP is vulnerable to eavesdropping and tampering",
                "Learn the difference between Symmetric Encryption (fast, shared key) and Asymmetric Encryption (Public/Private key pairs)",
                "Understand the TLS Handshake: exchanging keys securely over an untrusted channel",
                "Learn about Digital Certificates (X.509) and Certificate Authorities (CAs)",
                "Understand browser certificate validation and warnings"
            ],
            "vocabulary": [
                {"term": "HTTPS (HTTP Secure)", "definition": "The secure, encrypted version of HTTP operating over TLS on port 443."},
                {"term": "TLS (Transport Layer Security)", "definition": "A cryptographic protocol designed to provide end-to-end communications security, privacy, and data integrity over a computer network (successor to SSL)."},
                {"term": "Symmetric Encryption", "definition": "Cryptographic method using the same single secret key to both encrypt and decrypt data (e.g. AES-256). Very fast."},
                {"term": "Asymmetric Encryption", "definition": "Cryptographic method using a mathematically linked Public Key (encrypts) and Private Key (decrypts) pair (e.g. RSA, ECC)."},
                {"term": "CA (Certificate Authority)", "definition": "A trusted third-party organization (like Let's Encrypt, DigiCert) that cryptographically signs digital certificates verifying domain ownership."}
            ],
            "diagramSvg": DIAGRAMS["handshake"],
            "lessons": [
                {
                    "title": "1. Symmetric vs Asymmetric Cryptography",
                    "content": "HTTPS uses the best of both worlds:\n\n• **Asymmetric Cryptography (Public/Private Keys)**: Anyone can take your **Public Key** and lock a message in a digital safe. But ONLY your secret **Private Key** can unlock it! It solves the key-exchange problem, but is computationally slow.\n• **Symmetric Cryptography (AES-GCM)**: Fast and efficient, but both parties must share the exact same secret key.\n\n**The Solution**: HTTPS uses Asymmetric encryption for the first 10 milliseconds of the connection just to safely agree on a random temporary 'Session Key'. Once agreed, both sides switch to fast Symmetric encryption for all web browsing!"
                },
                {
                    "title": "2. Digital Certificates & Certificate Authorities",
                    "content": "When your browser connects to `bank.com`, how does it know it is talking to the real bank and not an imposter?\n\nThe server presents an **X.509 Digital Certificate** containing its public key. Crucially, this certificate is digitally signed by a trusted **Certificate Authority (CA)** (like Let's Encrypt or DigiCert).\n\nYour operating system has a built-in 'Root CA Store' of trusted authorities. If a certificate is self-signed or expired, your browser flashes a massive red security warning!"
                }
            ],
            "seeExamples": [
                {
                    "title": "Inspecting TLS Certificates with openssl",
                    "codeOrDiagram": "cadet@endlessus:~$ openssl s_client -connect endlessus.in:443 -servername endlessus.in < /dev/null 2>/dev/null | openssl x509 -noout -dates -issuer\nnotBefore=Oct  1 00:00:00 2026 GMT\nnotAfter=Dec 30 23:59:59 2026 GMT\nissuer=C = US, O = Let's Encrypt, CN = R3",
                    "explanation": "`openssl` verifies that the TLS certificate is authentic, unexpired, and signed by Let's Encrypt."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"` to inspect TLS handshake protocol negotiation:",
                "initialCommand": "",
                "expectedCommand": "curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"",
                "simulatedOutput": "* ALPN: server accepted h2\n* TLSv1.3 (IN), TLS handshake, Finished (20)\n[+] TLS handshake verified: TLS 1.3 negotiated successfully.",
                "explanation": "`curl -v` prints verbose TLS handshake diagnostics."
            },
            "questions": [
                {
                    "id": "q-32-1",
                    "type": "exact",
                    "question": "Which modern cryptographic protocol replaced SSL to provide encryption and integrity for HTTPS traffic on port 443?",
                    "visualSlots": "_ _ _",
                    "acceptedAnswers": ["TLS", "Transport Layer Security"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "Transport Layer Security abbreviation.",
                    "explanation": "TLS replaced the deprecated SSL protocol."
                },
                {
                    "id": "q-32-2",
                    "type": "multiple-choice",
                    "question": "What type of cryptography uses mathematically linked Public and Private key pairs to securely exchange information?",
                    "options": [
                        "Symmetric Encryption",
                        "Asymmetric Encryption (Public Key Cryptography)",
                        "Base64 Encoding",
                        "One-Way Hashing"
                    ],
                    "correctIndex": 1,
                    "hint": "Asymmetric uses two different keys.",
                    "explanation": "Asymmetric encryption uses public/private key pairs for secure key exchange."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Inspect TLS handshake negotiation",
                    "instruction": "Execute `curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"` in the terminal.",
                    "hints": ["Type: `curl -Iv https://endlessus.in 2>&1 | grep -i \"alpn\\|tls\"`"]
                }
            ],
            "securityConnection": "Attackers on public Wi-Fi networks historically used tools like `sslstrip` to downgrade client connections from encrypted HTTPS to unencrypted HTTP, allowing them to read login credentials in cleartext. Websites enforce HSTS headers to permanently block downgrade attacks."
        },

        # Room 33: HTML, Client vs Server & APIs
        {
            "stage": 5,
            "level": 5,
            "levelTitle": "Level 5 — Internet & Web Fundamentals",
            "title": "Web Architecture: HTML, Client vs Server & APIs",
            "difficulty": "Foundation",
            "difficultyBadge": "🔵 Foundation",
            "estimatedTime": "25 min",
            "prerequisites": "Room 32: TLS, HTTPS & Cryptographic Trust",
            "whyAreYouHere": "A modern web application is not just a static text file; it is a distributed software system. Code runs in two completely separate environments: the **Client** (the browser executing HTML, CSS, and JavaScript) and the **Server** (Node.js, Python, or PHP executing backend queries against a database). In this room, you will learn the client-server boundary, REST APIs, and why client-side security checks can always be bypassed by attackers.",
            "objectives": [
                "Understand the core frontend building blocks: HTML (structure), CSS (styling), and JavaScript (interactivity)",
                "Differentiate between Client-Side code (executed in user browser) and Server-Side code (executed in datacenter)",
                "Understand the Golden Rule of AppSec: Never trust the client!",
                "Learn about RESTful APIs and the JSON (JavaScript Object Notation) data interchange format",
                "Inspect API responses and parameters using curl"
            ],
            "vocabulary": [
                {"term": "HTML (Hypertext Markup Language)", "definition": "The standard markup language used to structure web pages and their content (headings, paragraphs, forms, inputs)."},
                {"term": "DOM (Document Object Model)", "definition": "The tree-like programming interface representation of an HTML document created by the browser in memory."},
                {"term": "Client-Side Processing", "definition": "Code (JavaScript) that runs entirely inside the visitor's local web browser."},
                {"term": "Server-Side Processing", "definition": "Code (Node, Python, PHP, Java) that runs on the remote server, with access to databases and backend systems."},
                {"term": "JSON (JavaScript Object Notation)", "definition": "A lightweight, human-readable text format for storing and exchanging data across APIs using key-value pairs and arrays."}
            ],
            "diagramSvg": DIAGRAMS["http"],
            "lessons": [
                {
                    "title": "1. Client-Side vs Server-Side",
                    "content": "• **Client-Side (Your Browser)**: HTML builds the buttons and text boxes; CSS makes them look modern; JavaScript handles animations and client form validation. **Crucial Rule**: The user controls everything in their browser! Any validation done solely in JavaScript (e.g. 'Password must be 8 characters') can be disabled with browser developer tools!\n• **Server-Side (Datacenter)**: Code runs on the server (e.g., Python Flask, Express, Django). It connects to MySQL or MongoDB databases and checks business logic. **All critical security validation must happen on the server!**"
                },
                {
                    "title": "2. REST APIs and JSON",
                    "content": "Modern web apps (like React, Vue, or mobile apps) rarely download full HTML pages on every click. Instead, they talk to **REST APIs** (Application Programming Interfaces) that return raw data formatted as **JSON**:\n\n```json\n{\n  \"status\": \"success\",\n  \"userId\": 9482,\n  \"name\": \"Alice Cadet\",\n  \"role\": \"Security Auditor\"\n}\n```\n\nClient apps parse this JSON object and render it into the DOM."
                }
            ],
            "seeExamples": [
                {
                    "title": "Querying a REST API endpoint returning JSON",
                    "codeOrDiagram": "cadet@endlessus:~$ curl -s http://10.10.10.45/api/v1/user/10043\n{\n  \"status\": \"success\",\n  \"invoice_id\": \"INV-10043\",\n  \"client\": \"Executive Leadership\",\n  \"total\": \"$45,000.00\"\n}",
                    "explanation": "The API endpoint returns pure JSON data representing a database record."
                }
            ],
            "tryInteractive": {
                "type": "terminal",
                "prompt": "Run `curl -s http://10.10.10.45/api/v1/user/10043` in the terminal to inspect an API endpoint JSON response:",
                "initialCommand": "",
                "expectedCommand": "curl -s http://10.10.10.45/api/v1/user/10043",
                "simulatedOutput": "{\"status\":\"success\",\"invoice_id\":\"INV-10043\",\"client\":\"Executive Leadership\",\"total\":\"$45,000.00\"}\n[+] JSON payload parsed: REST API endpoint returned structured data.",
                "explanation": "`curl` retrieves API JSON payloads."
            },
            "questions": [
                {
                    "id": "q-33-1",
                    "type": "exact",
                    "question": "What standard lightweight text format uses key-value pairs (enclosed in curly braces) to exchange data across web APIs?",
                    "visualSlots": "_ _ _ _",
                    "acceptedAnswers": ["JSON"],
                    "caseSensitive": False,
                    "trimWhitespace": True,
                    "hint": "JavaScript Object Notation abbreviation.",
                    "explanation": "JSON stands for JavaScript Object Notation."
                },
                {
                    "id": "q-33-2",
                    "type": "multiple-choice",
                    "question": "Why is relying solely on client-side JavaScript for input validation (e.g. price calculations or permission checks) dangerous?",
                    "options": [
                        "JavaScript runs slower than Python",
                        "Users have full control over their browser and can modify or disable client-side JavaScript before sending requests to the server",
                        "HTML forms cannot transmit numbers",
                        "JSON only works on Linux machines"
                    ],
                    "correctIndex": 1,
                    "hint": "Users can bypass browser controls.",
                    "explanation": "Client-side checks can be bypassed by intercepting or altering requests before they reach the server."
                }
            ],
            "tasks": [
                {
                    "title": "Task 1: Query API JSON endpoint",
                    "instruction": "Execute `curl -s http://10.10.10.45/api/v1/user/10043` in the terminal.",
                    "hints": ["Type: `curl -s http://10.10.10.45/api/v1/user/10043`"]
                }
            ],
            "securityConnection": "In **Insecure Direct Object Reference (IDOR)** vulnerabilities (practiced in Lab 04), an application trusts the client-supplied user ID in an API URL (e.g. `GET /api/user/9482`). By changing the ID to `10043`, an unauthorized attacker accesses another customer's private invoices because the backend failed to perform server-side ownership checks!"
        }
    ]
