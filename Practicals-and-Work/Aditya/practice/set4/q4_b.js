import http from 'http'
import url from 'url'

function factorial(n) {
    if (n === 0 || n === 1) return 1
    let res = 1
    for (let i = 2; i <= n; i++) res *= i
    return res;
}

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let result = '';
    if (q.num) {
        const n = parseInt(q.num);
        if (!isNaN(n) && n >= 0) {
            let series = [];
            for (let i = 1; i <= n; i++) {
                series.push(`${i}! = ${factorial(i)}`);
            }
            result = `
                <div style="margin-top: 20px; padding: 15px; background: #fffbeb; border: 1px solid #fde68a;">
                    <h3>Factorial Series up to ${n}:</h3>
                    <p>${series.join('<br>')}</p>
                </div>
            `;
        }
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Factorial Series Generator</h2>
            <form action="/" method="GET">
                <input type="number" name="num" placeholder="Enter N" required style="padding: 8px;">
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Generate Series</button>
            </form>
            ${result}
        </body>
        </html>
    `);
});

server.listen(5005, () => {
    console.log('Factorial series server running at http://localhost:5005');
});
