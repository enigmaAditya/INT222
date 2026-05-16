import EventEmitter from 'events'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


class FileHandler extends EventEmitter {}

const handler = new FileHandler();

const oldPath = path.join(__dirname, 'original.txt');
const newPath = path.join(__dirname, 'renamed_final.txt');

// 1. Event for writing to file
handler.on('write', (content) => {
    fs.writeFile(oldPath, content, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log(`Successfully wrote to ${oldPath}`);
            // Trigger rename after writing is successful
            handler.emit('rename');
        }
    });
});

// 2. Event for renaming file
handler.on('rename', () => {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error("Error renaming file:", err);
        } else {
            console.log(`Successfully renamed ${oldPath} to ${newPath}`);
        }
    });
});

// Execute the process
console.log("Starting file operations using Event Emitter...");
handler.emit('write', 'This content was written via an Event Emitter and then the file was renamed.');
