import http from 'http'
import url from 'url'

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query
    res.writeHead(200, { 'Content-Type': 'text/html' })

    let result = ''
    if (q.series) {
        let values = q.series.split(',').map(v => v.trim())
        
        // Check if numeric or alpha
        const isNumeric = values.every(v => !isNaN(v) && v !== '');
        
        if (isNumeric) {
            values = values.map(Number).sort((a, b) => a - b);
        } else {
            values.sort();
        }

        result = `
            <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border: 1px solid #bfdbfe;">
                <h3>Sorted Result:</h3>
                <p>Original: ${q.series}</p>
                <p><b>Sorted:</b> ${values.join(', ')}</p>
            </div>
        `;
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Series Sort Operation</h2>
            <form action="/" method="GET">
                <p>Enter series (comma separated numbers or strings):</p>
                <input type="text" name="series" placeholder="e.g. 5, 2, 8, 1" required style="width: 300px; padding: 8px;"><br><br>
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Sort Values</button>
            </form>
            ${result}
        </body>
        </html>
    `);
});

server.listen(5004, () => {
    console.log('Sort server running at http://localhost:5004');
});
