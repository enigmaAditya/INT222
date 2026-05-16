import http from 'http'
import url from 'url'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// a) Create test.txt with personal information
const testFile = path.join(__dirname, 'test.txt');
fs.writeFileSync(testFile, "Name: Aditya\nRoll No: 12211045\nCourse: INT222 Practice Set 3");

const server = http.createServer((req, res) => {
    // c) Parse URL to get file name
    const q = url.parse(req.url, true);
    const filename = q.pathname.substring(1); // Remove leading slash

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (filename === '') {
        res.end(`
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h2>File Server</h2>
                <p>Request a file by appending it to the URL, e.g., <a href="/test.txt">/test.txt</a></p>
            </body>
        `);
        return;
    }

    const filePath = path.join(__dirname, filename);

    // d) Access and display content
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.end("<h3>Error reading file</h3>");
            } else {
                res.end(`<h3>Contents of ${filename}:</h3><pre style="background: #f4f4f4; padding: 20px;">${data}</pre>`);
            }
        });
    } else {
        res.end(`<h3 style="color: red;">File "${filename}" not found!</h3>`);
    }
});

server.listen(4005, () => {
    console.log('Server running at http://localhost:4005/test.txt');
});
