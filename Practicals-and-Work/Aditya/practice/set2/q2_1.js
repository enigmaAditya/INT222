import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output.txt.gz');

// Create a large input file for demonstration
const content = 'This is a demonstration of Node.js Streams and Zlib module. '.repeat(100);
fs.writeFileSync(inputFile, content);

// Create readable and writable streams
const readableStream = fs.createReadStream(inputFile);
const gzipStream = zlib.createGzip();
const writableStream = fs.createWriteStream(outputFile);

// Use pipeline for efficient streaming
console.log("Starting stream compression...");

pipeline(readableStream, gzipStream, writableStream, (err) => {
    if (err) {
        console.error('Pipeline failed:', err);
    } else {
        console.log('Pipeline succeeded. File compressed to:', outputFile);
        
        // Let's also demonstrate decompressing back to console
        const sourceGz = fs.createReadStream(outputFile);
        const unzipStream = zlib.createGunzip();
        
        console.log("\nDecompressing and piping to stdout:");
        sourceGz.pipe(unzipStream).pipe(process.stdout);
    }
});
