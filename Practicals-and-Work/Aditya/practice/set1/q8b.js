import http from 'http';
import { MongoClient } from 'mongodb';
import querystring from 'querystring';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'practiceDB';

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <body style="font-family: sans-serif; padding: 20px;">
                <h2>Registration Form</h2>
                <form action="/register" method="POST">
                    <input type="text" name="username" placeholder="Username" required><br><br>
                    <input type="email" name="email" placeholder="Email" required><br><br>
                    <input type="password" name="password" placeholder="Password" required><br><br>
                    <button type="submit">Register</button>
                </form>
            </body>
            </html>
        `);
    } else if (req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const formData = querystring.parse(body);
            try {
                await client.connect();
                const db = client.db(dbName);
                await db.collection('users').insertOne(formData);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h3>Registration Successful! Data saved to MongoDB.</h3><a href="/">Back</a>');
            } catch (err) {
                res.writeHead(500);
                res.end('Error saving to database');
            }
        });
    }
});

server.listen(3001, () => {
    console.log('Server running at http://localhost:3001/');
});
