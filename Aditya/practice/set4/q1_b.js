import http from 'http'
import url from 'url'

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true).query
    res.writeHead(200, { 'Content-Type': 'text/html' })

    let result = ''
    if (q.series && q.search) {
        const values = q.series.split(',').map(v => v.trim())
        const searchTerm = q.search.trim()
        const found = values.includes(searchTerm)
        const index = values.indexOf(searchTerm)
        
        result = `
            <div style="margin-top: 20px; padding: 15px; background: #f0fdf4; border: 1px solid #bbf7d0;">
                <h3>Search Result:</h3>
                <p>Series: [ ${values.join(', ')} ]</p>
                <p>Search Term: <b>${searchTerm}</b></p>
                <p>Status: ${found ? `<span style="color: green;">FOUND at index ${index}</span>` : '<span style="color: red;">NOT FOUND</span>'}</p>
            </div>
        `
    }

    res.end(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h2>Series Search Operation</h2>
            <form action="/" method="GET">
                <p>Enter series (comma separated):</p>
                <input type="text" name="series" placeholder="e.g. 10, 20, 30" required style="width: 300px; padding: 8px;"><br><br>
                <p>Enter value to search:</p>
                <input type="text" name="search" placeholder="Value" required style="padding: 8px;"><br><br>
                <button type="submit" style="padding: 10px 20px; cursor: pointer;">Search</button>
            </form>
            ${result}
        </body>
        </html>
    `);
});

server.listen(5001, () => {
    console.log('Search server running at http://localhost:5001');
});
