const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Create test.txt with personal info
const testFile = path.join(__dirname, 'test.txt');
fs.writeFileSync(testFile, "Name: Aditya, Roll No: 12211045 (Set 4)");

const server = http.createServer((req, res) => {
    // Include url module and parse url to get file name
    const q = url.parse(req.url, true);
    const filename = q.pathname.substring(1); // Remove '/'

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (filename === "") {
        res.end(`
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h2>URL Parser File Reader</h2>
                <p>Request: <a href="/test.txt">/test.txt</a></p>
            </body>
        `);
        return;
    }

    const filePath = path.join(__dirname, filename);

    // Access the file and display content
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.end("<h3>Error reading file</h3>");
            } else {
                res.end(`
                    <h3>Content of "${filename}":</h3>
                    <div style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
                        ${data}
                    </div>
                `);
            }
        });
    } else {
        res.end(`<h3 style="color: red;">File "${filename}" not found.</h3>`);
    }
});

server.listen(5016, () => {
    console.log('HTTP server running at http://localhost:5016');
});
