/*
Q3. Write a program to compresses and decompressed file using zlib.
*/
import zlib from 'zlib';
import fs from 'fs';

const input = 'sample.txt';
const compressed = 'sample.txt.gz';
const decompressed = 'restored.txt';

fs.writeFileSync(input, "Zlib Compression/Decompression Test Content.");

// 1. Compress
const gzip = zlib.createGzip();
fs.createReadStream(input).pipe(gzip).pipe(fs.createWriteStream(compressed))
    .on('finish', () => {
        console.log("File Compressed!");

        // 2. Decompress
        const gunzip = zlib.createGunzip();
        fs.createReadStream(compressed).pipe(gunzip).pipe(fs.createWriteStream(decompressed))
            .on('finish', () => console.log("File Decompressed!"));
    });
