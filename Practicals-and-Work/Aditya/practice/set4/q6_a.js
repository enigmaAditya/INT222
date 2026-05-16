import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

let visitorCount = 0;

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Odd Visitor Tracker</h1>
            <h2 id="count">Waiting for odd count...</h2>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket = io();
                socket.on('oddCountUpdate', (count) => {
                    document.getElementById('count').innerText = "Total Odd Visitors: " + count;
                    document.getElementById('count').style.color = "orange";
                });
            </script>
        </body>
        </html>
    `);
});

io.on('connection', (socket) => {
    // a) Display student details in server console
    console.log("\n[NEW CONNECTION]");
    console.log("Student Name: Aditya");
    console.log("Roll No: 12211045");
    
    visitorCount++;

    // Broadcast only odd visitor count
    if (visitorCount % 2 !== 0) {
        console.log(`Broadcasting odd count: ${visitorCount}`);
        io.emit('oddCountUpdate', visitorCount);
    } else {
        console.log(`Current count is even (${visitorCount}), skipping broadcast.`);
    }

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 5007;
server.listen(PORT, () => {
    console.log(`Socket.io server running at http://localhost:${PORT}`);
});
