/*
8. Build a log saver application using the fs module that stores server activity logs into a text file whenever a user visits a route.
*/
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.join(__dirname, 'activity.log');

// Log Middleware
app.use((req, res, next) => {
    const entry = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;
    fs.appendFileSync(logFile, entry);
    next();
});

app.get('/', (req, res) => res.send("Home Page Logged"));
app.get('/about', (req, res) => res.send("About Page Logged"));

app.listen(6008, () => console.log("Q8 Log Saver (FS) at 6008"));
