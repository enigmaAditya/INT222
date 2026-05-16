# Paper-Writing Memorization Guide (The "Skeletons")
Use these ultra-short versions for your answer sheet. They are designed to be easy to write by hand.

---

### 1. Basic Express Server (5 Lines)
```javascript
import express from 'express';
const app = express();
app.use(express.json()); 

app.get('/', (req, res) => res.send('OK'));
app.listen(3000);
```

### 2. MongoDB / Mongoose (4 Lines)
```javascript
mongoose.connect('mongodb://localhost/db');
const User = mongoose.model('User', { name: String });
// Inside route:
await User.create(req.body);
const data = await User.find();
```

### 3. JWT Auth (The Middleware)
```javascript
const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    req.user = jwt.verify(token, 'secret');
    next();
};
```

### 4. File System (Simplest Way)
*Don't write streams on paper unless asked. Use Sync methods:*
```javascript
fs.writeFileSync('file.txt', 'data');
const data = fs.readFileSync('file.txt', 'utf8');
```

### 5. Zlib Compression (The Pipe)
```javascript
const rs = fs.createReadStream('in.txt');
const ws = fs.createWriteStream('out.gz');
rs.pipe(zlib.createGzip()).pipe(ws);
```

### 6. Socket.io (The Setup)
```javascript
const io = new Server(httpServer);
io.on('connection', socket => {
    socket.on('msg', data => io.emit('msg', data));
});
```

### 7. Pagination (The Math)
```javascript
const page = req.query.page || 1;
const limit = 2;
const skip = (page - 1) * limit;
const data = await Model.find().skip(skip).limit(limit);
```

### 8. Global Error Handler
```javascript
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
```

---

### 💡 Paper Tip:
If you forget the exact syntax for a complex library, **write a simple version.** Examiners give 90% marks for logic. For example, if you forget `createReadStream`, just use `fs.readFileSync`—it still proves you know how to handle files!
