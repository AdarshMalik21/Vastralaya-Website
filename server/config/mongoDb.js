import mongoose from "mongoose"

export const mongoDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    } catch (error) {
        console.log("Database error ",error)
    }
}