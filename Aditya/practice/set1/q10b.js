import express from 'express';
const app = express();
const port = 3002;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve a simple HTML form
app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh;">
            <form action="/submit-name" method="POST" style="padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
                <h3>Enter Student Name</h3>
                <input type="text" name="fullName" placeholder="Full Name" required style="padding: 8px; margin-bottom: 10px; width: 250px;"><br>
                <button type="submit" style="padding: 8px 20px; cursor: pointer;">Post to Server</button>
            </form>
        </body>
        </html>
    `);
});

// Handle POST request
app.post('/submit-name', (req, res) => {
    const fullName = req.body.fullName;
    console.log(`Received Full Name: ${fullName}`);
    res.send(`<h1>Successfully received name: ${fullName}</h1><a href="/">Go back</a>`);
});

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
