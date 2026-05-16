import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// a) Create source.txt with personal information
const sourceFile = path.join(__dirname, 'source.txt')
const duplicateFile = path.join(__dirname, 'duplicate.txt');
fs.writeFileSync(sourceFile, "Name: Aditya, City: Delhi, State: Delhi");

const server = http.createServer((req, res) => {
    if (req.url === '/duplicate') {
        // Use fs module to duplicate
        fs.copyFile(sourceFile, duplicateFile, (err) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (err) {
                res.end("<h3>Error duplicating file</h3>");
            } else {
                res.end(`<h3>File duplicated successfully!</h3><p>Check <b>duplicate.txt</b> in the server folder.</p>`);
                console.log('Duplication Task Completed');
            }
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h3>Welcome to File Duplicator</h3><p><a href="/duplicate">Click here to duplicate source.txt</a></p>`);
    }
});

server.listen(5000, () => {
    console.log('Duplicator server running at http://localhost:5000');
});
