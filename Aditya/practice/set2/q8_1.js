import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3007

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next(); // Pass control to the next middleware/route handler
};

// 2. Middleware to check for a secret key in header
const authCheck = (req, res, next) => {
    const key = req.headers['x-api-key'];
    if (key === 'secret123') {
        next();
    } else {
        res.status(403).send("Forbidden: Invalid API Key. Add 'x-api-key: secret123' to your headers.");
    }
};

// Applying logger globally
app.use(logger);

app.get('/', (req, res) => {
    res.send("Welcome! This page uses a logger middleware. Check your console.");
});

// Applying authCheck only to this route
app.get('/admin', authCheck, (req, res) => {
    res.send("Welcome to the Admin Dashboard! (Authorized)");
});

// 3. Error-handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Middleware demo running at http://localhost:${port}`);
    console.log(`Try accessing /admin with headers or just / to see logs.`);
});
