import express from "express";
import { connectDB } from "./DB.js";
import rootRouter from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

