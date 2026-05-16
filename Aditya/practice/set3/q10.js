import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// a) Create student.txt with basic details
const studentFile = path.join(__dirname, 'student.txt')
const details = "Student Report Card\n-------------------\nName: Aditya\nRoll: 12211045\nStatus: Professional Developer in Training\nDate: " + new Date().toDateString()
fs.writeFileSync(studentFile, details)

const server = http.createServer((req, res) => {
    console.log("Request received for student stream.")
    
    // Set headers
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // b) Create a readable stream and pipe to response
    const readableStream = fs.createReadStream(studentFile);

    readableStream.on('data', (chunk) => {
        console.log("Streaming chunk of data...");
        res.write(chunk);
    });

    readableStream.on('end', () => {
        console.log("Stream ended.");
        res.end();
    });

    readableStream.on('error', (err) => {
        console.error("Stream error:", err);
        res.end("Internal Server Error");
    });
});

const PORT = 4008;
server.listen(PORT, () => {
    console.log(`Server streaming at http://localhost:${PORT}`);
});
