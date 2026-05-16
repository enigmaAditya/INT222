import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for custom event
    socket.on('chatMessage', (msg) => {
        // Broadcast to all
        io.emit('broadcast', msg);
    });

    socket.on('disconnect', () => console.log('Disconnected'));
});

server.listen(3000);
