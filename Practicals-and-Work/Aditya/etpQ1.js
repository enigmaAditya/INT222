import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


const app = express();
const port = 3005;

// Connect to MongoDB once at startup
mongoose.connect('mongodb://127.0.0.1:27017/etp_aditya')

// Define Schema and Model
const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model('Data', DataSchema);

app.get('/process', (req, res) => {
    const inputPath = path.join(__dirname, 'raw_data.json')
    const outputPath = path.join(__dirname, 'readable_data.json')
    
    // 1. Read Stream
    const rs = fs.createReadStream(inputPath, 'utf8');
    const ws = fs.createWriteStream(outputPath);

    let rawData = '';

    rs.on('data', (chunk) => {
        rawData += chunk;
    });

    rs.on('end', () => {
        try {
            // 2. Parse and format
            const obj = JSON.parse(rawData);
            const formatted = JSON.stringify(obj, null, 4);

            // 3. Write Stream
            ws.write(formatted);
            ws.end();
        } catch (error) {
            if (!res.headersSent) {
                res.status(500).send('JSON Parse Error: ' + error.message);
            }
        }
    });

    ws.on('finish', async () => {
        try {
            // 4. Upload to MongoDB
            const fileContent = fs.readFileSync(outputPath, 'utf8');
            const jsonData = JSON.parse(fileContent);

            await DataModel.insertMany(jsonData);
            if (!res.headersSent) {
                res.send('<h1>Success!</h1><p>File parsed using streams and data uploaded to MongoDB.</p>');
            }
        } catch (err) {
            if (!res.headersSent) {
                res.status(500).send('MongoDB Upload Error: ' + err.message);
            }
        }
    });

    rs.on('error', (err) => {
        if (!res.headersSent) res.status(500).send('Read Error: ' + err.message);
    });
    ws.on('error', (err) => {
        if (!res.headersSent) res.status(500).send('Write Error: ' + err.message);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/process`);
});
