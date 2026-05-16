import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 4001

// Middleware to perform arithmetic operations
const calculateMiddleware = (req, res, next) => {
    if (req.query.num1 && req.query.num2) {
        const n1 = parseFloat(req.query.num1)
        const n2 = parseFloat(req.query.num2)
        
        req.results = {
            add: n1 + n2,
            sub: n1 - n2,
            mul: n1 * n2,
            div: n2 !== 0 ? (n1 / n2).toFixed(2) : 'Infinity'
        };
    }
    next();
};

app.get('/', calculateMiddleware, (req, res) => {
    let resultHtml = '';
    if (req.results) {
        resultHtml = `
            <div style="margin-top: 20px; padding: 15px; background: #e2f3f5; border-radius: 10px;">
                <h3>Results:</h3>
                <p>Addition: ${req.results.add}</p>
                <p>Subtraction: ${req.results.sub}</p>
                <p>Multiplication: ${req.results.mul}</p>
                <p>Division: ${req.results.div}</p>
            </div>
        `;
    }

    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>Arithmetic Middleware Calculator</h2>
            <form action="/" method="GET">
                <input type="number" name="num1" placeholder="Number 1" required style="padding: 8px;">
                <input type="number" name="num2" placeholder="Number 2" required style="padding: 8px;">
                <button type="submit" style="padding: 8px 15px; cursor: pointer;">Calculate</button>
            </form>
            ${resultHtml}
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
