import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3006

const fileToDownload = path.join(__dirname, 'practice_report.pdf')
if (!fs.existsSync(fileToDownload)) {
    fs.writeFileSync(fileToDownload, 'This is a sample document for the INT222 download demonstration.')
}

app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>File Download Center</h1>
            <p>Click the link below to download your practice report.</p>
            <a href="/Downloads" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Download File</a>
        </body>
    `);
});

// Endpoint to download the file
app.get('/Downloads', (req, res) => {
    console.log("Download request received.");
    res.download(fileToDownload, 'Report_INT222.txt', (err) => {
        if (err) {
            console.error("Error during download:", err);
            res.status(500).send("Could not download the file.");
        }
    });
});

app.listen(port, () => {
    console.log(`Express download server running at http://localhost:${port}`);
});
