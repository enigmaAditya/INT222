/*
Q4. Build a chat interface using Socket Services where messages are sent and reveived in real-time. Use an Express middleware to maintain user sessions via express-session and store the chat history in MongoDB documents
*/
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import mongoose from 'mongoose';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/chatDB');
const Chat = mongoose.model('Chat', { user: String, message: String });

// Session Middleware
app.use(session({
    secret: 'chatsecret',
    resave: false,
    saveUninitialized: true
}));

// Serve a basic Chat UI
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; padding: 20px;">
            <h3>Real-time Chat (Q4)</h3>
            <div id="msg-box" style="border: 1px solid #ddd; height: 300px; overflow: auto; padding: 10px; margin-bottom: 10px; background: #f9f9f9;"></div>
            <input id="txt" style="width: 80%; padding: 10px;" placeholder="Type a message..." />
            <button onclick="send()" style="padding: 10px;">Send</button>
        </div>

        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io();
            function send() {
                const msg = document.getElementById('txt').value;
                if(msg) {
                    socket.emit('chatMessage', msg);
                    document.getElementById('txt').value = '';
                }
            }
            socket.on('message', (msg) => {
                const box = document.getElementById('msg-box');
                box.innerHTML += '<p><b>User:</b> ' + msg + '</p>';
                box.scrollTop = box.scrollHeight;
            });
        </script>
    `);
});

// Socket logic
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chatMessage', async (msg) => {
        // Save to MongoDB (as per question)
        const chatEntry = new Chat({ user: "User", message: msg });
        await chatEntry.save();

        // Broadcast to everyone
        io.emit('message', msg);
    });
});

httpServer.listen(7004, () => console.log("Q4 Chat Server at http://localhost:7004"));
