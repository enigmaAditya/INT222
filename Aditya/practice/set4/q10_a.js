const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5015;

// Create student info file
const studentFile = path.join(__dirname, 'student_info_final.txt');
fs.writeFileSync(studentFile, "Reg. No.: 12211045, Name: Aditya, Grade: A+ (Set 4 Q10)");

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>SendFile System (Express)</h2>
            <p>Enter filename: <b>student_info_final.txt</b></p>
            <form action="/view-file" method="GET">
                <input type="text" name="filename" required style="padding: 10px;">
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">View File in Browser</button>
            </form>
        </body>
        </html>
    `);
});

app.get('/view-file', (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname, filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("File not found! Make sure to type 'student_info_final.txt'");
    }
});

app.listen(port, () => {
    console.log(`SendFile server running at http://localhost:${port}`);
});
