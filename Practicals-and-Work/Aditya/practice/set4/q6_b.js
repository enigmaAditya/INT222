import http from 'http'
import url from 'url'

function sumOfDigits(num) {
    return num.toString().split('')
        .filter(d => !isNaN(d))
        .reduce((sum, d) => sum + parseInt(d), 0);
}

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let result = '';
    if (q.num) {
        const num = q.num;
        const sum = sumOfDigits(num);
        result = `
            <div style="margin-top: 20px; padding: 15px; background: #faf5ff; border: 1px solid #e9d5ff;">
                <h3>Result:</h3>
                <p>Number: ${num}</p>
                <p><b>Sum of Digits:</b> ${sum}</p>
            </div>
        `;
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Sum of Digits Calculator</h2>
            <form action="/" method="GET">
                <input type="number" name="num" placeholder="Enter number" required style="padding: 8px;">
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Calculate Sum</button>
            </form>
            ${result}
        </body>
        </html>
    `);
});

server.listen(5008, () => {
    console.log('Sum of digits server running at http://localhost:5008');
});
