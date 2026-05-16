const http = require('http');
const url = require('url');

function isArmstrong(num) {
    const digits = num.toString().split('');
    const n = digits.length;
    const sum = digits.reduce((acc, d) => acc + Math.pow(parseInt(d), n), 0);
    return sum === num;
}

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let result = '';
    if (q.num) {
        const n = parseInt(q.num);
        if (!isNaN(n) && n >= 0) {
            let series = [];
            for (let i = 0; i <= n; i++) {
                if (isArmstrong(i)) series.push(i);
            }
            result = `
                <div style="margin-top: 20px; padding: 15px; background: #fff1f2; border: 1px solid #fecdd3;">
                    <h3>Armstrong Numbers up to ${n}:</h3>
                    <p style="font-size: 1.25rem;">${series.join(', ')}</p>
                </div>
            `;
        }
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Armstrong Series Generator</h2>
            <form action="/" method="GET">
                <input type="number" name="num" placeholder="Enter Limit" required style="padding: 8px;">
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Generate Series</button>
            </form>
            ${result}
        </body>
        </html>
    `);
});

server.listen(5010, () => {
    console.log('Armstrong server running at http://localhost:5010');
});
