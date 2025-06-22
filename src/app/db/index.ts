import mongoose from "mongoose";

export async function dbConnect(): Promise<any> {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/LibraryManagement`)
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("DB connection failed! ", error)
        process.exit(1)
    }
}