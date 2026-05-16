const express = require('express');
const app = express();
const port = 5013;

// Middleware for arithmetic operations
const arithmeticMiddleware = (req, res, next) => {
    if (req.query.num) {
        const n = parseFloat(req.query.num);
        if (!isNaN(n)) {
            req.calcResults = {
                original: n,
                increment: n + 1,
                decrement: n - 1,
                square: n * n
            };
        }
    }
    next();
};

app.get('/', arithmeticMiddleware, (req, res) => {
    let resultSection = '';
    if (req.calcResults) {
        resultSection = `
            <div style="margin-top: 20px; padding: 20px; background: #fdf4ff; border-radius: 12px; border: 1px solid #f5d0fe;">
                <h3>Middleware Calculations:</h3>
                <p>Original Number: ${req.calcResults.original}</p>
                <p>Increment (++): ${req.calcResults.increment}</p>
                <p>Decrement (--): ${req.calcResults.decrement}</p>
                <p>Square: ${req.calcResults.square}</p>
            </div>
        `;
    }

    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>Middleware Operations Demo</h2>
            <form action="/" method="GET">
                <input type="number" name="num" placeholder="Enter a number" required style="padding: 10px; font-size: 1rem;">
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Execute</button>
            </form>
            ${resultSection}
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Express middleware app running at http://localhost:${port}`);
});
