import http from 'http'
import url from 'url'

function factorial(n) {
    if (n === 0 || n === 1) return 1
    let res = 1
    for (let i = 2; i <= n; i++) res *= i
    return res
}

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    let result = '';
    if (q.num) {
        const num = parseInt(q.num);
        if (!isNaN(num) && num >= 0) {
            result = `<h3>Factorial of ${num} is: ${factorial(num)}</h3>`;
        } else {
            result = `<h3 style="color: red;">Please enter a valid non-negative number</h3>`;
        }
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Factorial Calculator (HTTP Module)</h2>
            <form action="/" method="GET">
                <input type="number" name="num" placeholder="Enter number" required style="padding: 8px;">
                <button type="submit" style="padding: 8px 15px; cursor: pointer;">Calculate Factorial</button>
            </form>
            <div style="margin-top: 20px;">${result}</div>
        </body>
        </html>
    `);
});

server.listen(4003, () => {
    console.log('Server running at http://localhost:4003/');
});
