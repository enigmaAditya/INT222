import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3003;

// Route 1: /node
app.get('/node', (req, res) => {
    res.send("This is ETP for INT222");
});

// Route 2: /Angular
app.get('/Angular', (req, res) => {
    res.send("This is ETP for INT219");
});

// Root route for convenience
app.get('/', (req, res) => {
    res.send('<h1>Express Routes Demo</h1><p>Try <a href="/node">/node</a> or <a href="/Angular">/Angular</a></p>');
});

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
