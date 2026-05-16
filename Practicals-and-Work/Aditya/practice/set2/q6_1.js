import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Define the new directory path using path module
const dirName = 'new_demo_folder';
const fullPath = path.join(__dirname, dirName);

console.log(`Target Path: ${fullPath}`);

// 2. Create the directory
if (!fs.existsSync(fullPath)) {
    fs.mkdir(fullPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            console.log(`Directory "${dirName}" created successfully using path module logic.`);
            
            // Create a file inside it to prove it exists
            fs.writeFileSync(path.join(fullPath, 'readme.txt'), 'Directory created by Node.js Path/FS script.');
        }
    });
} else {
    console.log(`Directory "${dirName}" already exists.`);
}
