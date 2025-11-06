import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRoutes from './routes/user.route.js';
import EventRoutes from './routes/event.route.js';
import SwapRoutes from './routes/swap.route.js';
import cors from 'cors';

const app = express()
// const app = mongoose.connection;
app.use(cors());
app.use(express.json())

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/slotswap',{

        })
        console.log("MongoDB connected Successfully!");
    } catch (error) {
        console.error("MongoDB connection Failed:", error.message);
        process.exit(1);
    }
}

connectDB()

UserRoutes(app);
EventRoutes(app);
SwapRoutes(app);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})