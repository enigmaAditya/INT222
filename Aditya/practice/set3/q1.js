import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 4000

// a) Create a text file with student information
const studentFile = path.join(__dirname, 'student_info.txt')
const studentData = "Reg. No.: 12211045, Name: Aditya, Grade: A+\nReg. No.: 12211046, Name: Rahul, Grade: A"
fs.writeFileSync(studentFile, studentData)

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>Download Student Records</h2>
            <p>Enter filename to download (try: <b>student_info.txt</b>)</p>
            <form action="/download" method="GET">
                <input type="text" name="filename" placeholder="Enter filename" required style="padding: 8px;">
                <button type="submit" style="padding: 8px 15px; cursor: pointer;">Download</button>
            </form>
        </body>
        </html>
    `)
});

// b) Accept file name and transfer requested file using download function
app.get('/download', (req, res) => {
    const filename = req.query.filename
    const filePath = path.join(__dirname, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).send("Error downloading file.");
            }
        });
    } else {
        res.status(404).send("File not found! Make sure you entered 'student_info.txt'");
    }
});

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
