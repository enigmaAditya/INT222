import http from 'http'
import url from 'url'
import querystring from 'querystring'

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url)
    
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`
            <html>
            <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding-top: 50px;">
                <h2>Registration Form (HTTP Module)</h2>
                <form action="/submit" method="POST" style="border: 1px solid #ccc; padding: 20px; border-radius: 10px;">
                    <div style="margin-bottom: 10px;">
                        <label>Name: </label>
                        <input type="text" name="name" required>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <label>Email: </label>
                        <input type="email" name="email" required>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <label>Course: </label>
                        <input type="text" name="course" required>
                    </div>
                    <button type="submit" style="width: 100%; padding: 8px; cursor: pointer;">Submit</button>
                </form>
            </body>
            </html>
        `);
    } else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h2 style="color: green;">Form Submitted Successfully!</h2>
                    <div style="display: inline-block; text-align: left; background: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                        <p><strong>Name:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Course:</strong> ${formData.course}</p>
                    </div>
                    <br><br>
                    <a href="/">Fill Again</a>
                </body>
                </html>
            `);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 3005;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
