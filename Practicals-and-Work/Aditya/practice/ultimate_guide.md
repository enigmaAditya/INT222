# The Master Guide to Node.js, Express, & MongoDB Practical Development
## (Comprehensive 600+ Line Edition)

---

## 🏛️ SECTION 1: INTRODUCTION TO WEB ARCHITECTURE
Web development is fundamentally about communication between a client (the browser) and a server (Node.js). 

### 1.1 The Request-Response Cycle
Every interaction starts with a **Request**:
1.  **Method**: GET (fetch data), POST (send data), PUT (update), DELETE (remove).
2.  **URL**: The path to the resource (e.g., `/api/students`).
3.  **Headers**: Metadata about the request (e.g., `Content-Type: application/json`).
4.  **Body**: The actual data (used in POST/PUT).

And ends with a **Response**:
1.  **Status Code**: 200 (OK), 404 (Not Found), 500 (Server Error).
2.  **Headers**: Metadata about the response.
3.  **Body**: The HTML, JSON, or File sent back.

---

## 🏗️ SECTION 2: CLIENT-SIDE JAVASCRIPT & DOM
The Document Object Model (DOM) is the programming interface for web documents.

### 2.1 Event Listeners Deep Dive
Events are actions that happen in the system you are programming, which the system tells you about so your code can react to them.

#### 2.1.1 Mouse Event Implementation
```javascript
// Example: Tracking mouse movement for a custom hover effect
const element = document.getElementById('hoverBox');

element.addEventListener('mouseover', function(event) {
    // 'this' refers to the element
    this.style.backgroundColor = 'yellow';
    this.style.border = '2px solid red';
    console.log('Mouse entered at coordinates:', event.clientX, event.clientY);
});

element.addEventListener('mouseout', function() {
    this.style.backgroundColor = 'white';
    this.style.border = '1px solid black';
});
```

#### 2.1.2 Keyboard Event Implementation
```javascript
// Example: Detecting 'Enter' key to submit a search
const searchInput = document.getElementById('search');

searchInput.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);
    if (event.key === 'Enter') {
        performSearch(searchInput.value);
    }
});
```

### 2.2 Advanced Form Validation logic
When validating forms, it's best to create a dedicated validation object or function.

```javascript
/**
 * Validates a registration form.
 * Patterns: 
 * - Username: Min 6 chars
 * - Password: Min 8, 1 Upper, 1 Digit, 1 Special
 * - Phone: Exactly 10 digits
 */
function validateRegistration(data) {
    const errors = [];
    
    // Pattern 1: Length check
    if (data.username.length < 6) {
        errors.push("Username must be at least 6 characters long.");
    }

    // Pattern 2: Regex Complex Password
    // (?=.*[A-Z]) -> Must contain 1 uppercase
    // (?=.*\d) -> Must contain 1 digit
    // (?=.*[@$!%*?&]) -> Must contain 1 special char
    const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passRegex.test(data.password)) {
        errors.push("Password must be 8+ chars with Upper, Digit, and Special character.");
    }

    // Pattern 3: Phone number digits only
    if (!/^\d{10}$/.test(data.phone)) {
        errors.push("Phone number must be exactly 10 numeric digits.");
    }

    return errors;
}
```

---

## 📂 SECTION 3: NODE.JS CORE MODULES
Core modules are pre-installed with Node.js and require no extra setup.

### 3.1 The `fs` (File System) Module
One of the most versatile modules for server-side tasks.

#### 3.1.1 File Operations Catalog
| Operation | Asynchronous (Recommended) | Synchronous |
| :--- | :--- | :--- |
| Read | `fs.readFile(path, enc, cb)` | `fs.readFileSync(path, enc)` |
| Write | `fs.writeFile(path, data, cb)` | `fs.writeFileSync(path, data)` |
| Append | `fs.appendFile(path, data, cb)` | `fs.appendFileSync(path, data)` |
| Copy | `fs.copyFile(src, dest, cb)` | `fs.copyFileSync(src, dest)` |
| Rename | `fs.rename(old, new, cb)` | `fs.renameSync(old, new)` |
| Delete | `fs.unlink(path, cb)` | `fs.unlinkSync(path)` |

#### 3.1.2 Real-world Task: Duplicating a personal info file
```javascript
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'original.txt');
const dest = path.join(__dirname, 'backup.txt');

// 1. Create original if not exists
fs.writeFileSync(src, "Name: Aditya\nRoll: 12211045");

// 2. Perform Duplication
fs.copyFile(src, dest, (err) => {
    if (err) {
        console.error("Duplication failed:", err);
    } else {
        console.log("Successfully duplicated original.txt to backup.txt");
        
        // 3. Read back to verify
        const content = fs.readFileSync(dest, 'utf8');
        console.log("Backup Content:\n", content);
    }
});
```

### 3.2 The `url` & `path` Modules
These modules are essential for navigating the file system and parsing web requests.

```javascript
const url = require('url');
const path = require('path');

// Scenario: A user requests /download/report.pdf?token=abc
const reqUrl = "/download/report.pdf?token=abc";
const parsed = url.parse(reqUrl, true);

console.log("Pathname:", parsed.pathname); // /download/report.pdf
console.log("Token:", parsed.query.token); // abc

// Resolve actual file path safely
const actualPath = path.join(__dirname, 'storage', parsed.pathname);
console.log("Absolute File Path:", actualPath);
```

### 3.3 The `zlib` Module: Data Compression
Compression reduces the size of files sent over the network.

```javascript
const zlib = require('zlib');
const fs = require('fs');

// Scenario: Compressing a log file
const source = fs.createReadStream('logs.txt');
const destination = fs.createWriteStream('logs.txt.gz');
const gzip = zlib.createGzip();

source.pipe(gzip).pipe(destination);

destination.on('finish', () => {
    console.log('File successfully compressed.');
});
```

---

## 🌊 SECTION 4: STREAMS, EVENTS, & BUFFERS
Node.js is built on an event-driven, non-blocking I/O model.

### 4.1 EventEmitter: Custom Logic Flow
```javascript
const EventEmitter = require('events');

class JobProcessor extends EventEmitter {
    start() {
        console.log("Job started...");
        this.emit('progress', 50);
        setTimeout(() => {
            this.emit('complete', { status: 'success' });
        }, 1000);
    }
}

const processor = new JobProcessor();

processor.on('progress', (percent) => {
    console.log(`Working... ${percent}%`);
});

processor.on('complete', (result) => {
    console.log("Job Done!", result);
});

processor.start();
```

### 4.2 Stream Processing Catalog
Streams are ideal for handling large files or continuous data.

#### 4.2.1 Reading Data in Chunks
```javascript
const stream = fs.createReadStream('bigdata.csv', {
    encoding: 'utf8',
    highWaterMark: 1024 // 1KB chunks
});

let chunkCount = 0;
stream.on('data', (chunk) => {
    chunkCount++;
    console.log(`Processing chunk #${chunkCount}...`);
});

stream.on('end', () => {
    console.log('Finished processing all chunks.');
});
```

---

## 🚀 SECTION 5: EXPRESS.JS (DEEP DIVE)
Express is the minimalist web framework for Node.js.

### 5.1 Middleware Mastery
Middleware functions are the backbone of Express.

#### 5.1.1 Anatomy of a Middleware
```javascript
const myMiddleware = (req, res, next) => {
    // 1. Check something
    console.log("Request Type:", req.method);
    
    // 2. Modify something
    req.requestTime = Date.now();
    
    // 3. Decide to proceed or stop
    if (req.query.block === 'true') {
        res.status(403).send("Blocked by middleware!");
    } else {
        next(); // Proceed to the next handler
    }
};

app.use(myMiddleware);
```

### 5.2 Dynamic Routing & Controllers
```javascript
// Pattern: GET and POST on the same resource
app.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'login.html'));
    })
    .post((req, res) => {
        const { username, password } = req.body;
        // Logic for auth...
        res.send(`Logged in as ${username}`);
    });
```

### 5.3 Working with Files
| Method | Use Case |
| :--- | :--- |
| `res.send()` | Send strings, objects, or buffers. |
| `res.json()` | Send JSON objects (sets correct headers). |
| `res.download()` | Prompt browser to save a file. |
| `res.sendFile()` | Render file content directly in browser. |

---

## 💾 SECTION 6: MONGODB & DATABASE LOGIC
MongoDB is a document-oriented NoSQL database.

### 6.1 Core CRUD Recipes
#### 6.1.1 Complex Querying
```javascript
// Find Employees in 'IT' dept earning between 50k and 100k
const itPros = await collection.find({
    dept: 'IT',
    salary: { $gte: 50000, $lte: 100000 }
}).sort({ salary: -1 }).toArray();
```

#### 6.1.2 Atomic Updates
```javascript
// Increment marks by 5 for everyone in Section A
await collection.updateMany(
    { section: 'A' },
    { $inc: { marks: 5 } }
);
```

---

## 📡 SECTION 7: REAL-TIME COMMUNICATION (SOCKET.IO)
Socket.io allows for two-way event-based communication.

### 7.1 Server Setup (HTTP + Express + Socket.io)
```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Event 1: Server to Client
    socket.emit('hello', 'Welcome!');

    // Event 2: Client to Server
    socket.on('chat', (msg) => {
        // Event 3: Broadcast to everyone
        io.emit('chat', msg);
    });

    socket.on('disconnect', () => {
        console.log('User left.');
    });
});

server.listen(3000);
```

---

## 🔢 SECTION 8: LOGICAL ALGORITHMS CATALOG
Practical exams often test core programming logic.

### 8.1 Prime Number Calculation
```javascript
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Generating a range
function getPrimesInRange(limit) {
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}
```

### 8.2 Armstrong Number Verification
```javascript
function isArmstrong(num) {
    const s = num.toString();
    const n = s.length;
    let sum = 0;
    for (let digit of s) {
        sum += Math.pow(parseInt(digit), n);
    }
    return sum === num;
}
```

### 8.3 Fibonacci Series Generator
```javascript
function fibonacci(n) {
    let a = 0, b = 1, temp;
    let series = [a, b];
    while (true) {
        temp = a + b;
        if (temp > n) break;
        series.push(temp);
        a = b;
        b = temp;
    }
    return series;
}
```

### 8.4 Sum of Digits
```javascript
function sumDigits(n) {
    return n.toString()
            .split('')
            .reduce((acc, d) => acc + parseInt(d), 0);
}
```

### 8.5 Factorial (Recursion vs Loop)
```javascript
// Loop (Recommended for servers)
function factLoop(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

// Recursion (Elegant but memory intensive)
function factRec(n) {
    if (n === 0) return 1;
    return n * factRec(n - 1);
}
```

---

## 🛠️ SECTION 9: INTEGRATION & SCENARIOS
How to combine everything into a cohesive solution.

### 9.1 Scenario: User Search & Sort Application
Requirement: Accept a CSV list of numbers, sort them, and return as HTML table.

```javascript
app.get('/process', (req, res) => {
    const rawData = req.query.data; // "10,5,20,1"
    if (!rawData) return res.send("No data provided");

    const numbers = rawData.split(',')
                           .map(Number)
                           .sort((a, b) => a - b);

    const rows = numbers.map(n => `<tr><td>${n}</td></tr>`).join('');
    
    res.send(`
        <h2>Sorted Data</h2>
        <table border="1">${rows}</table>
    `);
});
```

---

## 🏆 SECTION 10: BEST PRACTICES & COMMON ERRORS

### 10.1 Avoiding 'Callback Hell'
Always use Promises or `async/await` when working with Files or DBs.
```javascript
// BAD: Callback nesting
fs.readFile('a.txt', (err, data) => {
    fs.writeFile('b.txt', data, (err) => {
        // ...
    });
});

// GOOD: Async/Await
async function copy() {
    const data = await fs.promises.readFile('a.txt');
    await fs.promises.writeFile('b.txt', data);
}
```

### 10.2 Security Best Practices
-   **Never** trust user input. Use `express-validator` to sanitize strings.
-   **Always** escape HTML output if rendering user strings directly to prevent XSS.
-   **Secure** MongoDB connections using environment variables for the connection string.

### 10.3 Performance Tuning
-   Use `Compression` middleware in Express to shrink responses.
-   Use `Streams` for any file larger than 10MB.
-   Index your MongoDB fields (especially `email` or `empID`) for faster searches.

---

## 📜 SECTION 11: COMMON EXAM QUESTION BOILERPLATES

### 11.1 "Serve file content based on URL path"
```javascript
const server = http.createServer((req, res) => {
    const filename = url.parse(req.url).pathname.substring(1);
    if (filename === '') {
        res.end("Request a file like /test.txt");
        return;
    }
    
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("File Not Found");
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});
```

### 11.2 "Emit even number every 2 seconds to client"
```javascript
io.on('connection', (socket) => {
    let even = 0;
    const interval = setInterval(() => {
        even += 2;
        socket.emit('data', even);
    }, 2000);
    
    socket.on('disconnect', () => clearInterval(interval));
});
```

### 11.3 "Connect to MongoDB and show specific students"
```javascript
app.get('/top-students', async (req, res) => {
    const db = await connectDB();
    const students = await db.collection('students')
                             .find({ marks: { $gt: 90 } })
                             .toArray();
    res.json(students);
});
```

---

## 🏁 SECTION 12: FINAL WORDS OF WISDOM
Success in these practicals is 30% syntax and 70% logical structure. 
1.  **Define your goal**: What is the input? What is the output?
2.  **Sketch the path**: Do I need a middleware? Is this a GET or a POST?
3.  **Code incrementally**: Start with the server, then the route, then the logic.
4.  **Handle the Edge Cases**: What if the file is missing? What if the number is negative?

By following this guide and the patterns provided, you will be able to tackle even the most complex practical questions with ease.

**Happy Coding and Good Luck with your Practicals!**

---
*(Complete Guide - 600+ Lines Coverage)*
