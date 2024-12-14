import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000

app.use(express.json()); // to parse the incoming request with JSON payloads 
app.use(cookieParser()); // to parse the incoming request with cookie payloads 

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/message",messageRoutes)



app.listen( PORT,()=>{
    connectToMongoDB()
    console.log(`run on port ${PORT}`)
});