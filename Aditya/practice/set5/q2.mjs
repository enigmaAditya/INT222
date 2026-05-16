/*
2. Create a file compression app using Node.js fs and zlib where users upload a text file and download the compressed version.
*/
import express from 'express';
import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.urlencoded({ extended: true })); // To handle HTML form data
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.send(`
        <h3>Upload Text Content to Compress</h3>
        <form action="/compress" method="POST">
            <textarea name="content" rows="10" cols="30" placeholder="Paste text here..."></textarea><br>
            <button type="submit">Upload & Download Compressed</button>
        </form>
    `);
});

// Since we are not using multer, we accept the content from a textarea or body
app.post('/compress', (req, res) => {
    const textContent = req.body.content;
    if (!textContent) return res.send("No content provided!");

    const tempFile = path.join(__dirname, 'temp.txt');
    const compressedFile = path.join(__dirname, 'temp.txt.gz');

    fs.writeFileSync(tempFile, textContent);

    const gzip = zlib.createGzip();
    const source = fs.createReadStream(tempFile);
    const destination = fs.createWriteStream(compressedFile);

    source.pipe(gzip).pipe(destination).on('finish', () => {
        res.download(compressedFile, 'compressed.txt.gz', () => {
            // Cleanup
            if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
            if (fs.existsSync(compressedFile)) fs.unlinkSync(compressedFile);
        });
    });
});

app.listen(6002, () => console.log("Q2 Compression App at 6002"));
