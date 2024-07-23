import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

import messageRoutes from './routes/messageRoutes.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import groupRoute from './routes/groupRoute.js';

import { app, server } from './socket/socket.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error("The error is --> ", err));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors({
    origin: ["http://localhost:3000","https://chat-app-client-phi.vercel.app","https://chimechat-app.vercel.app"],
    credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);

app.get('/', (req, res) => {
    res.send('API is running....');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
