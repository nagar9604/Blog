import mongoose from "mongoose";

const connectDB= async()=>{{
    try{
       await mongoose.connect(process.env.MONGO_URL);
       console.log("mongodb connected successfully");
    }catch(error){
        console.log("MOngoDB connection error",error);
    }
}}

export default connectDB;