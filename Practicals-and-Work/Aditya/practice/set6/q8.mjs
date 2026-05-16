import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
/*
Q8. A delivery company needs a system to track paackages. Use EventEmitter to trigger a "Package Moved" event and broadcast the location to a Socket.IO Chat Server for the customer to see. The tracking history must be stored in PostgreSQL using Prisma ORM, and a custom middleware should check if the user has the "Driver" role via RBAC
*/
import EventEmitter from 'events';
import { PrismaClient } from '@prisma/client';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const prisma = new PrismaClient();
const myEmitter = new EventEmitter();

// 1. RBAC Middleware
const checkDriver = (req, res, next) => {
    const role = req.headers.role;
    if (role === 'Driver') next();
    else res.status(403).send("Only drivers can move packages!");
};

// 2. EventEmitter listener
myEmitter.on('Package Moved', async (data) => {
    // Broadcast to Socket.IO
    io.emit('trackingUpdate', data);
    
    // 3. Store in PostgreSQL via Prisma
    await prisma.tracking.create({
        data: { packageId: data.id, location: data.loc }
    });
    console.log(`Log saved for Package ${data.id}`);
});

app.post('/move', checkDriver, (req, res) => {
    const eventData = { id: 'P123', loc: 'Warehouse A' };
    myEmitter.emit('Package Moved', eventData);
    res.send("Event Triggered and Broadcasted!");
});

httpServer.listen(7008, () => console.log("Q8 Delivery Tracking at 7008"));
