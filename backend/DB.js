import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
}, { collection: "users" });  // Explicitly define collection name

export const UserModel = mongoose.model("User", userSchema);


export const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
}
