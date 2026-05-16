import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, 'demo.txt');
const destination = path.join(__dirname, 'copy.txt');

// Ensure source exists
if (!fs.existsSync(source)) {
    fs.writeFileSync(source, 'This is the content to be copied and then deleted.');
}

// Copy file
fs.copyFile(source, destination, (err) => {
    if (err) {
        console.error("Error copying file:", err);
        return;
    }
    console.log(`Content copied from ${source} to ${destination}`);

    // Delete original file
    fs.unlink(source, (err) => {
        if (err) {
            console.error("Error deleting original file:", err);
            return;
        }
        console.log(`Original file ${source} deleted successfully.`);
    });
});
