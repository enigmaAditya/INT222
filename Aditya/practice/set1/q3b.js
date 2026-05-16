import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'demo.txt');

// Ensure the file exists for demonstration
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, ''); // Create empty file initially
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    if (data.trim().length === 0) {
        console.log("File is empty");
    } else {
        console.log("File Content:");
        console.log(data);
    }
});

// To test with content, you can manually add text to demo.txt or uncomment below:
// fs.writeFileSync(filePath, 'Hello, this is demo content!');
