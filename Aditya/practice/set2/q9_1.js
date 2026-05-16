import http from 'http'
import socketIo from 'socket.io'

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Socket.io Timer Demo</title>
            <script src="/socket.io/socket.io.js"></script>
        </head>
        <body style="font-family: sans-serif; text-align: center; background: #121212; color: #fff;">
            <h1>Socket.io Interval Messaging</h1>
            <div id="status" style="font-size: 1.5rem; margin: 20px; color: #00ff88;">Ready...</div>
            <div id="logs" style="height: 300px; overflow-y: auto; background: #222; padding: 10px; border-radius: 10px; text-align: left;"></div>

            <script>
                const socket = io();
                const logDiv = document.getElementById('logs');
                const statusDiv = document.getElementById('status');

                function log(msg) {
                    const p = document.createElement('p');
                    p.innerText = "[" + new Date().toLocaleTimeString() + "] " + msg;
                    logDiv.prepend(p);
                }

                function startMessaging() {
                    statusDiv.innerText = "Phase: SENDING EVERY 2s";
                    statusDiv.style.color = "#00ff88";
                    
                    let count = 0;
                    const interval = setInterval(() => {
                        count += 2;
                        socket.emit('message', 'wow server');
                        log("Sent: wow server");

                        if (count >= 12) {
                            clearInterval(interval);
                            statusDiv.innerText = "Phase: STOPPED (Waiting 5s)";
                            statusDiv.style.color = "#ff4444";
                            log("Stopped sending after 12 seconds.");
                            
                            setTimeout(() => {
                                log("Restarting cycle...");
                                startMessaging();
                            }, 5000);
                        }
                    }, 2000);
                }

                socket.on('connect', () => {
                    log("Connected to server.");
                    startMessaging();
                });
            </script>
        </body>
        </html>
    `);
});

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A client connected.');
    
    socket.on('message', (data) => {
        console.log('Client says:', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
});

const PORT = 3008;
server.listen(PORT, () => {
    console.log(`Socket.io server running at http://localhost:${PORT}`);
});
