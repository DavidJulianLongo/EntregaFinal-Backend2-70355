import mongoose from "mongoose";
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL;

export const conectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connection established successfully');
    } catch (error) {
        console.log(error)
    }
}