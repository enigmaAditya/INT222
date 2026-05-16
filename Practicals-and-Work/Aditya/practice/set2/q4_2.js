import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const filePath = path.join(__dirname, 'data.json');

// Ensure file exists (using the one from Q1_2 or creating new)
if (!fs.existsSync(filePath)) {
    const defaultData = { message: "This was created for synchronous reading demonstration." };
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
}

console.log("Reading file synchronously...");

try {
    // Read from a JSON file synchronously
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);

    console.log("Sync Read Complete. File Content:");
    console.log(jsonData);
} catch (err) {
    console.error("Error reading file synchronously:", err.message);
}

console.log("Program continues after sync read...");
