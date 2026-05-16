# Comprehensive Guide: Solving Node.js & Web Development Practical Questions

This guide breaks down the common patterns found in your practical sets (1–4) and provides a structured way to handle them.

---

## 1. HTML & JavaScript: Form Validations
**Common Tasks**: Validate username, password, phone number, and matching passwords.

### 💡 Strategy:
1.  **Prevent Default**: Always use `e.preventDefault()` on the form submit event.
2.  **Regex is King**: Use Regular Expressions for complex checks.
    -   Digit check: `/\d/`
    -   Uppercase check: `/[A-Z]/`
    -   Special char: `/[!@#$%^&*]/`
    -   Email: `/\S+@\S+\.\S+/`
3.  **Error Collection**: Store errors in an array and use `alert(errors.join("\n"))` at the end.

### 📝 Pattern:
```javascript
form.onsubmit = (e) => {
    e.preventDefault();
    let errors = [];
    if (user.value.length < 6) errors.push("Too short!");
    if (!/\d/.test(pass.value)) errors.push("Need a digit!");
    
    if (errors.length > 0) alert(errors.join("\n"));
    else alert("Success!");
};
```

---

## 2. Node.js Core Modules (HTTP, FS, URL, Path)
**Common Tasks**: Serving files, Factorial/Fibonacci series via URL, duplicate/rename files.

### 💡 Strategy:
1.  **URL Parsing**: Use `url.parse(req.url, true)` to get query parameters (`?num=5`).
2.  **Dynamic Content**: Always set `res.writeHead(200, {'Content-Type': 'text/html'})`.
3.  **File Operations**:
    -   `fs.readFile` / `fs.writeFile`: For small files.
    -   `fs.copyFile`: For duplication.
    -   `fs.rename`: For moving/renaming.

### 📝 Pattern (HTTP Search/Math):
```javascript
const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;
    const num = parseInt(q.num);
    // Logic for factorial/fibonacci here...
    res.end(`Result is: ${result}`);
});
```

---

## 3. Node.js Streams & Zlib
**Common Tasks**: Compress files, stream data to browser, write primes/series to files.

### 💡 Strategy:
1.  **Readable Streams**: Use for large files or sending data to response (`fs.createReadStream`).
2.  **Writable Streams**: Use for writing large data or series (`fs.createWriteStream`).
3.  **Pipeline**: Always use `pipeline()` or `.pipe()` to handle backpressure and errors properly.

### 📝 Pattern (Zlib Pipe):
```javascript
const { pipeline } = require('stream');
pipeline(
    fs.createReadStream('input.txt'),
    zlib.createGzip(),
    fs.createWriteStream('output.gz'),
    (err) => { if (err) console.error(err); }
);
```

---

## 4. Express.js: Routing, Middleware, and Validation
**Common Tasks**: URL Params, Custom Middleware, File Downloads, `express-validator`.

### 💡 Strategy:
1.  **Params vs Query**:
    -   Params: `app.get('/user/:id')` -> `req.params.id`
    -   Query: `app.get('/search')` -> `req.query.term`
2.  **Middleware**: Always call `next()` unless you are sending a response immediately.
3.  **Response Types**:
    -   `res.download(path)`: Prompts download.
    -   `res.sendFile(path)`: Displays file content (like PDF/Text).

### 📝 Pattern (Middleware):
```javascript
const myMiddleware = (req, res, next) => {
    req.customVal = req.query.n * 2;
    next();
};
app.get('/', myMiddleware, (req, res) => {
    res.send("Result: " + req.customVal);
});
```

---

## 5. MongoDB CRUD Operations
**Common Tasks**: Insert documents, find with conditions ($gt, $lt), sort results.

### 💡 Strategy:
1.  **Connect**: Use `await client.connect()`.
2.  **Database & Collection**: `db = client.db('name')`, `col = db.collection('name')`.
3.  **Operators**:
    -   `$gt`: Greater than.
    -   `$lt`: Less than.
4.  **Sorting**: `.find().sort({ field: 1 })` (1 for asc, -1 for desc).

### 📝 Pattern (Salary Query):
```javascript
const results = await collection.find({ salary: { $gt: 50000 } })
                                .sort({ name: 1 })
                                .toArray();
```

---

## 6. Socket.io: Real-time Communication
**Common Tasks**: Broadcasting visitor counts, emitting series at intervals.

### 💡 Strategy:
1.  **Connection**: Wrap the `http` server with `socketIo`.
2.  **Emitting**:
    -   `socket.emit`: To the specific client.
    -   `io.emit`: To **all** connected clients (Broadcasting).
3.  **Cleanup**: Always `clearInterval` on the `disconnect` event.

### 📝 Pattern (Interval Broadcast):
```javascript
io.on('connection', (socket) => {
    const timer = setInterval(() => {
        socket.emit('tick', Date.now());
    }, 2000);
    
    socket.on('disconnect', () => clearInterval(timer));
});
```

---

## 7. Math & Logic Algorithms (Common in Practicals)
-   **Factorial**: Loop from 1 to N, multiplying.
-   **Fibonacci**: `c = a + b`, then `a = b`, `b = c`.
-   **Armstrong**: Sum of (digits ^ number_of_digits).
-   **Prime**: Check divisibility from 2 to `sqrt(num)`.
-   **Sum of Digits**: `num.toString().split('').reduce(...)`.

---

## 🏆 Final Pro-Tip for Exams:
When you get a question, ask yourself:
1.  **Is it Browser or Server?** (HTML/JS vs Node/Express)
2.  **Is it core logic or data handling?** (Algorithms vs FS/DB)
3.  **Does it need real-time updates?** (Socket.io)
4.  **How should I receive input?** (Form, URL Params, or Query String)
