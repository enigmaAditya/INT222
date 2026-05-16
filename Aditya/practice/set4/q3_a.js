import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// a) Create employee.txt
const empFile = path.join(__dirname, 'employee.txt');
const details = "Employee Details\n----------------\nName: Aditya\nID: E101\nDept: Engineering\nLocation: Delhi";
fs.writeFileSync(empFile, details);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Create readable stream
    const readable = fs.createReadStream(empFile);
    
    // Pipe to response
    readable.pipe(res);

    readable.on('end', () => {
        console.log('Employee details streamed to client');
    });
});

server.listen(5003, () => {
    console.log('Employee stream server running at http://localhost:5003');
});
