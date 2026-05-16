import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Feedback Form</title>
                <style>
                    body { font-family: sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    form { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 300px; }
                    input, textarea { width: 100%; padding: 0.5rem; margin: 0.5rem 0; box-sizing: border-box; }
                    button { width: 100%; padding: 0.75rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
                </style>
            </head>
            <body>
                <form id="feedbackForm">
                    <h2>Feedback Form</h2>
                    <input type="text" placeholder="Name" required>
                    <input type="text" placeholder="Contact Number" required>
                    <textarea placeholder="Your Feedback" rows="4" required></textarea>
                    <button type="submit">Submit</button>
                </form>
                <script>
                    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
                        e.preventDefault();
                        alert("Thankyou for your feedback");
                        this.reset();
                    });
                </script>
            </body>
            </html>
        `);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
