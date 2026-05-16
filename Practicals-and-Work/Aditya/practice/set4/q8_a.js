const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Even Number Series (Socket.io)</h1>
            <div id="numbers" style="font-size: 3rem; color: #10b981; margin-top: 20px;">0</div>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket = io();
                const container = document.getElementById('numbers');
                socket.on('evenNum', (num) => {
                    container.innerText = num;
                });
            </script>
        </body>
        </html>
    `);
});

io.on('connection', (socket) => {
    // a) Display student details
    console.log("\n[CLIENT CONNECTED]");
    console.log("Details: Aditya | 12211045");

    let count = 0;
    const interval = setInterval(() => {
        count += 2;
        socket.emit('evenNum', count);
    }, 2000);

    socket.on('disconnect', () => {
        clearInterval(interval);
        // Display Thank you in server console
        console.log("Thank you - Client disconnected");
    });
});

const PORT = 5011;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
