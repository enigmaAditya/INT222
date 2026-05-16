import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, 'large_file.txt')

// 1. Create a file with some content to read
const data = "Node.js Streams allow reading data from a source or writing data to a destination in continuous fashion.\n".repeat(50);
fs.writeFileSync(filePath, data);

// 2. Create a readable stream
const readableStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
    highWaterMark: 128 // Small buffer size to demonstrate chunks
});

console.log("--- Starting Readable Stream ---");

// 3. Listen for data events (Working of the stream)
readableStream.on('data', (chunk) => {
    console.log("-------------------- RECEIVED CHUNK --------------------");
    console.log(chunk);
});

// 4. Listen for the end of the stream
readableStream.on('end', () => {
    console.log("\n--- Stream Finished Reading ---");
});

// 5. Listen for errors
readableStream.on('error', (err) => {
    console.error("Stream Error:", err.message);
});
