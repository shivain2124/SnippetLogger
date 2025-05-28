import mongoose from "mongoose";

const connectDB= async (): Promise<void> =>{
    try{
       await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB connected");

    } catch(e){
        const error=e as Error;
        console.error("MongoDB connection error:",error.message);
        throw error;
    }

};

export default connectDB;
