import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import path from 'path';
import { app, server } from './socket/socket.js';

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000

app.use(express.json()); // to parse the incoming request with JSON payloads 
app.use(cookieParser()); // to parse the incoming request with cookie payloads 

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/message",messageRoutes)


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen( PORT,()=>{
    connectToMongoDB()
    console.log(`run on port ${PORT}`)
});