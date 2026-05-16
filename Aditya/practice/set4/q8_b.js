const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let result = '';
    if (q.temp && q.type) {
        const t = parseFloat(q.temp);
        if (!isNaN(t)) {
            if (q.type === 'CtoF') {
                const f = (t * 9/5) + 32;
                result = `<h3>${t}°C = ${f.toFixed(2)}°F</h3>`;
            } else {
                const c = (t - 32) * 5/9;
                result = `<h3>${t}°F = ${c.toFixed(2)}°C</h3>`;
            }
        }
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Temperature Converter</h2>
            <form action="/" method="GET">
                <input type="number" name="temp" placeholder="Enter Value" step="0.1" required style="padding: 8px;"><br><br>
                <select name="type" style="padding: 8px;">
                    <option value="CtoF">Celsius to Fahrenheit</option>
                    <option value="FtoC">Fahrenheit to Celsius</option>
                </select><br><br>
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Convert</button>
            </form>
            <div style="margin-top: 20px;">${result}</div>
        </body>
        </html>
    `);
});

server.listen(5012, () => {
    console.log('Converter server running at http://localhost:5012');
});
