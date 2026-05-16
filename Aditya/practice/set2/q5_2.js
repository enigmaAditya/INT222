import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3004;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
    const search = req.query.search || '';
    res.send(`
        <html>
        <body style="font-family: sans-serif; padding: 2rem;">
            <h2>GET & POST Demonstration</h2>
            
            <section style="background: #f0f4f8; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <h3>GET Method (Query Params)</h3>
                <form action="/" method="GET">
                    <input type="text" name="search" placeholder="Search something..." value="${search}">
                    <button type="submit">GET Search</button>
                </form>
                ${search ? `<p style="color: blue;">Searching for: <strong>${search}</strong></p>` : ''}
            </section>

            <section style="background: #e6fffa; padding: 1.5rem; border-radius: 10px;">
                <h3>POST Method (Body)</h3>
                <form action="/submit" method="POST">
                    <input type="text" name="username" placeholder="Username" required><br><br>
                    <input type="password" name="password" placeholder="Password" required><br><br>
                    <button type="submit">POST Submit</button>
                </form>
            </section>
        </body>
        </html>
    `);
});

// 2. POST Method - Handling form submission
app.post('/submit', (req, res) => {
    const { username, password } = req.body;
    console.log("POST Data received:", { username, password });
    res.send(`
        <div style="font-family: sans-serif; padding: 2rem;">
            <h2 style="color: green;">POST Request Successful!</h2>
            <p>Welcome, <strong>${username}</strong>.</p>
            <p>We received your password (it's safe in the logs!).</p>
            <a href="/">Back to Home</a>
        </div>
    `);
});

app.listen(port, () => {
    console.log(`Demo server running at http://localhost:${port}`);
});
