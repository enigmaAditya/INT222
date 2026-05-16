import http from 'http'
import url from 'url'

function isArmstrong(num) {
    const digits = num.toString().split('')
    const n = digits.length
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), n), 0)
    return sum === num
}

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let result = '';
    if (q.num) {
        const num = parseInt(q.num);
        if (!isNaN(num)) {
            const check = isArmstrong(num);
            result = `<h3>${num} is ${check ? '' : 'NOT '}an Armstrong number.</h3>`;
        }
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Armstrong Number Verifier</h2>
            <form action="/" method="GET">
                <input type="number" name="num" placeholder="Enter number" required style="padding: 8px;">
                <button type="submit" style="padding: 8px 15px; cursor: pointer;">Verify</button>
            </form>
            <div style="margin-top: 20px;">${result}</div>
        </body>
        </html>
    `);
});

server.listen(4004, () => {
    console.log('Server running at http://localhost:4004/');
});
