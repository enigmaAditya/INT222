import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'data.json');

// Sample data to create if not exists
const sampleData = {
    "project": "INT222 Practice",
    "student": "Aditya",
    "topic": "JSON Parsing",
    "tasks": ["Read File", "Parse JSON", "Print Output"]
};

// Create the JSON file for demonstration
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(sampleData, null, 2));
}

// Read and Parse the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    try {
        const parsedData = JSON.parse(data);
        console.log("Successfully parsed JSON content:");
        console.log(parsedData);
        
        // Accessing specific fields
        console.log("\nProject Name:", parsedData.project);
        console.log("Student Name:", parsedData.student);
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
    }
});
