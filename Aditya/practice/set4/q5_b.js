import http from 'http'
import url from 'url'

function getFibonacci(n) {
    let series = [0, 1]
    while (true) {
        let next = series[series.length - 1] + series[series.length - 2]
        if (next > n) break;
        series.push(next);
    }
    return series;
}

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let result = '';
    if (q.num) {
        const n = parseInt(q.num);
        if (!isNaN(n) && n >= 0) {
            const series = getFibonacci(n);
            result = `
                <div style="margin-top: 20px; padding: 15px; background: #e0f2fe; border: 1px solid #7dd3fc;">
                    <h3>Fibonacci Series up to ${n}:</h3>
                    <p style="font-size: 1.25rem;">${series.join(', ')}</p>
                </div>
            `;
        }
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Fibonacci Series Generator</h2>
            <form action="/" method="GET">
                <input type="number" name="num" placeholder="Enter N" required style="padding: 8px;">
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Generate Series</button>
            </form>
            ${result}
        </body>
        </html>
    `);
});

server.listen(5006, () => {
    console.log('Fibonacci server running at http://localhost:5006');
});
