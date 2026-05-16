/*
Q7. Your serverr logs are getting too large for memory. Write a script that uses createReadStream to read access.log and pipes it into zlib.createGzip() to save a compressed backup named access.log.gz
*/
import fs from 'fs';
import zlib from 'zlib';

const input = 'access.log';
const output = 'access.log.gz';

// Create a dummy log file first
fs.writeFileSync(input, "Server log entries... 10:00 AM - User logged in.");

// Stream logic
const readStream = fs.createReadStream(input);
const writeStream = fs.createWriteStream(output);
const gzip = zlib.createGzip();

// Pipe into zlib and then to destination
readStream.pipe(gzip).pipe(writeStream).on('finish', () => {
    console.log("Log successfully compressed to access.log.gz");
});
