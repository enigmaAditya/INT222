const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5014;

// Create student info file
const studentFile = path.join(__dirname, 'student_info_v4.txt');
fs.writeFileSync(studentFile, "Reg. No.: 12211045, Name: Aditya, Grade: A+");

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>Download System (Express)</h2>
            <p>Enter filename: <b>student_info_v4.txt</b></p>
            <form action="/download" method="GET">
                <input type="text" name="filename" required style="padding: 10px;">
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Download File</button>
            </form>
        </body>
        </html>
    `);
});

app.get('/download', (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send("File not found! Make sure to type 'student_info_v4.txt'");
    }
});

app.listen(port, () => {
    console.log(`Download server running at http://localhost:${port}`);
});
