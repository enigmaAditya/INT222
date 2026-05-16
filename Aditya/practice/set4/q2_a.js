import express from 'express'
const app = express()
const port = 5002

// a) access numbers from url using params and perform operations
app.get('/calc/:num1/:num2', (req, res) => {
    const n1 = parseFloat(req.params.num1);
    const n2 = parseFloat(req.params.num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.send("<h3>Please provide valid numbers in the URL: /calc/10/5</h3>");
    }

    const results = {
        Addition: n1 + n2,
        Subtraction: n1 - n2,
        Multiplication: n1 * n2,
        Division: n2 !== 0 ? (n1 / n2).toFixed(2) : 'Infinity'
    };

    let html = `<h2>Arithmetic Results for ${n1} and ${n2}</h2><ul>`;
    for (const [op, val] of Object.entries(results)) {
        html += `<li><b>${op}:</b> ${val}</li>`;
    }
    html += `</ul><button onclick="window.location.href='/'">Back to Input</button>`;

    res.send(html);
});

app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>Express Params Calculator</h2>
            <p>Enter numbers below to navigate to the params URL:</p>
            <input type="number" id="n1" placeholder="Num 1">
            <input type="number" id="n2" placeholder="Num 2">
            <button onclick="go()">Calculate</button>
            <script>
                function go() {
                    const v1 = document.getElementById('n1').value;
                    const v2 = document.getElementById('n2').value;
                    if(v1 && v2) window.location.href = '/calc/' + v1 + '/' + v2;
                }
            </script>
        </body>
    `);
});

app.listen(port, () => {
    console.log(`Express app running at http://localhost:${port}`);
});
