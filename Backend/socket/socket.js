import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

const UserMap = new Map();

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        UserMap.set(userId, socket.id);
        console.log('userId mapped', UserMap);
    }

    socket.on('disconnect', () => {
        console.log('user disconnected');
        UserMap.delete(userId);
    });

});

export { server, io, app, UserMap };