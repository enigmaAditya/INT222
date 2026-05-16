import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function isPrime(num) {
    if (num <= 1) return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false
    }
    return true
}

const filePath = path.join(__dirname, 'sample.txt')
const writableStream = fs.createWriteStream(filePath)

console.log("Computing primes up to 100...");

let primes = [];
for (let i = 2; i <= 100; i++) {
    if (isPrime(i)) {
        primes.push(i);
    }
}

// Write to stream
writableStream.write("Prime numbers up to 100:\n");
writableStream.write(primes.join(', '));
writableStream.end();

writableStream.on('finish', () => {
    console.log("Task Completed");
    console.log(`Primes written to ${filePath}`);
});
