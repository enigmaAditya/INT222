import os from 'os';

const totalMemoryBytes = os.totalmem();

const kb = totalMemoryBytes / 1024;
const mb = kb / 1024;
const gb = mb / 1024;

console.log(`--- System Memory Info ---`);
console.log(`Total Memory (Bytes): ${totalMemoryBytes}`);
console.log(`Total Memory (KB):    ${kb.toFixed(2)} KB`);
console.log(`Total Memory (MB):    ${mb.toFixed(2)} MB`);
console.log(`Total Memory (GB):    ${gb.toFixed(2)} GB`);

console.log(`\nFree Memory: ${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`);
