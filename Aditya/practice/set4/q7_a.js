const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const port = 5009;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; background: #f8fafc; padding: 2rem; display: flex; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); width: 400px;">
                <h2 style="text-align: center;">Student Registration</h2>
                <form action="/register" method="POST">
                    <div style="margin-bottom: 1rem;">
                        <label>Name</label><br>
                        <input type="text" name="name" style="width: 100%; padding: 8px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label>Reg. No.</label><br>
                        <input type="text" name="regNo" style="width: 100%; padding: 8px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label>Roll. No.</label><br>
                        <input type="text" name="rollNo" style="width: 100%; padding: 8px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label>Mobile No.</label><br>
                        <input type="text" name="mobile" style="width: 100%; padding: 8px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label>Mail Id</label><br>
                        <input type="email" name="email" style="width: 100%; padding: 8px;">
                    </div>
                    <button type="submit" style="width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer;">Submit</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.post('/register', [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 20 }).withMessage('Name must be 3-20 chars'),
    body('regNo').notEmpty().withMessage('Reg No is required').isLength({ min: 5, max: 10 }).withMessage('Reg No must be 5-10 chars'),
    body('rollNo').notEmpty().withMessage('Roll No is required'),
    body('mobile').notEmpty().withMessage('Mobile is required').isLength({ min: 10, max: 10 }).withMessage('Mobile must be 10 digits'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let warningMessages = errors.array().map(err => `<p style="color: red;">⚠️ ${err.msg}</p>`).join('');
        return res.send(`
            <div style="font-family: sans-serif; padding: 2rem; text-align: center;">
                <h2>Validation Warnings:</h2>
                ${warningMessages}
                <br><a href="/">Go Back</a>
            </div>
        `);
    }

    res.send(`<h2 style="text-align: center; color: green; font-family: sans-serif;">✅ Registration Successful for ${req.body.name}!</h2>`);
});

app.listen(port, () => {
    console.log(`Validation server running at http://localhost:${port}`);
});
