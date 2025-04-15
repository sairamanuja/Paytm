import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    const headers = req.headers.authorization;
    if (!headers) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = headers.split(" ")[1];
    console.log(token);

    if (token === null  || !token) {
        return res.status(401).json({ 
            message: "Unauthorized - Token is null" 
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
