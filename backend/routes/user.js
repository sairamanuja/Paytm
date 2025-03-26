import express from "express";
import { UserModel } from "../DB.js";
import bcrypt from "bcrypt";
import {authMiddleware} from "../middleware.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import zod from "zod";
dotenv.config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const signupBody = zod.object({
            username: zod.string().min(3).max(30),
            password: zod.string().min(6),
            firstName: zod.string().min(3).max(50),
            lastName: zod.string().min(3).max(50)
        });
        
        const result = signupBody.safeParse(req.body);
        console.log(result);
        if (!result.success) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: result.error.errors 
            });
        }

        const { username, password, firstName, lastName } = result.data;
        
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ 
            username,
            password: hashedPassword,
            firstName,
            lastName
         });
            console.log(user);
            
            if(!user){
                return res.status(400).json({ message: "Failed to create user" });
            }
    
            res.status(201).json({ message: "User created successfully", user });
      }catch(error){
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
});

userRouter.post("/login", async (req, res) => {
    try {
        const loginBody = zod.object({
            username: zod.string().min(3).max(30),
            password: zod.string().min(6)
        });

        const result = loginBody.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: result.error.errors 
            });
        }

        const { username, password } = result.data;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }   

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }   

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


userRouter.put("/update", authMiddleware, async (req, res) => {
    try {
        const updateBody = zod.object({
            firstName: zod.string().min(3).max(50),
            lastName: zod.string().min(3).max(50)
        });

        const result = updateBody.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ 
                message: "Validation failed", 
                errors: result.error.errors 
            });
        }

        
        const { firstName, lastName } = result.data;

        const user = await UserModel.findByIdAndUpdate(req.userId, { firstName, lastName });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});




export default userRouter;
