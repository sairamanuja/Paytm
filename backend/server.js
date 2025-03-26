import express from "express";
import { connectDB } from "./DB.js";
import rootRouter from "./routes/index.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/v1", rootRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

