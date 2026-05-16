import zlib from 'zlib';
import fs from 'fs';
import { pipeline } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'demo.txt');
const compressedPath = path.join(__dirname, 'demo.txt.gz');
const decompressedPath = path.join(__dirname, 'demo_decompressed.txt');

// Ensure input file exists
if (!fs.existsSync(inputPath)) {
    fs.writeFileSync(inputPath, 'Node.js Zlib Compression and Decompression Demonstration Content.');
}

// 1. Compression
const gzip = zlib.createGzip();
const source = fs.createReadStream(inputPath);
const destination = fs.createWriteStream(compressedPath);

pipeline(source, gzip, destination, (err) => {
    if (err) {
        console.error('Compression failed:', err);
        return;
    }
    console.log('File successfully compressed to:', compressedPath);

    // 2. Decompression
    const gunzip = zlib.createGunzip();
    const sourceGz = fs.createReadStream(compressedPath);
    const destinationTxt = fs.createWriteStream(decompressedPath);

    pipeline(sourceGz, gunzip, destinationTxt, (err) => {
        if (err) {
            console.error('Decompression failed:', err);
            return;
        }
        console.log('File successfully decompressed to:', decompressedPath);

        // 3. Print contents to console
        fs.readFile(decompressedPath, 'utf8', (err, data) => {
            if (err) throw err;
            console.log('Decompressed Content:', data);
        });
    });
});
