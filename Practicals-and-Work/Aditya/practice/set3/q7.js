import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = socketIo(server);

let visitorCount = 0;

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Visitor Tracker</h1>
            <h2 id="count">Waiting for even count...</h2>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket = io();
                socket.on('evenCountUpdate', (count) => {
                    document.getElementById('count').innerText = "Total Even Visitors: " + count;
                    document.getElementById('count').style.color = "green";
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
    console.log("Reg No: 12211045");
    
    visitorCount++;

    // b) Broadcast only even visitor count
    if (visitorCount % 2 === 0) {
        console.log(`Broadcasting even count: ${visitorCount}`);
        io.emit('evenCountUpdate', visitorCount);
    } else {
        console.log(`Current count is odd (${visitorCount}), skipping broadcast.`);
    }

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 4006;
server.listen(PORT, () => {
    console.log(`Socket.io server running at http://localhost:${PORT}`);
});
