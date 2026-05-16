import fs from 'fs';
import zlib from 'zlib';

// 1. Compression (Gzip)
const compress = () => {
    fs.createReadStream('input.txt')
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream('input.txt.gz'));
};

// 2. Decompression (Gunzip)
const decompress = () => {
    fs.createReadStream('input.txt.gz')
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream('output.txt'));
};
