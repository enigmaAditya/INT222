import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Even Number Series</h1>
            <div id="numbers" style="font-size: 2rem; color: #6366f1; margin-top: 20px;"></div>
            <script src="/socket.io/socket.io.js"></script>
            <script>
                const socket = io();
                const container = document.getElementById('numbers');
                socket.on('nextEven', (num) => {
                    container.innerText = num;
                    container.style.transform = "scale(1.2)";
                    setTimeout(() => container.style.transform = "scale(1)", 200);
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

    let currentEven = 0;
    
    // b) Trigger series of even numbers every 2 seconds
    const intervalId = setInterval(() => {
        currentEven += 2;
        socket.emit('nextEven', currentEven);
    }, 2000);

    socket.on('disconnect', () => {
        clearInterval(intervalId);
        // c) Display Thank you in server console
        console.log("Thank you - Client disconnected");
    });
});

const PORT = 4007;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
