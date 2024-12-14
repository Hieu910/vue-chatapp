import mongoose from "mongoose";
import dotenv from "dotenv";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
    } catch (error) {
        console.error(error)
    }
}

export default connectToMongoDB;