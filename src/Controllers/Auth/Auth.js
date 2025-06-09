import {User,Developer} from "../../Models/Users/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const login=async (req, res) => {
    const {userName,password,role}=req.body
    if (!userName || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (role == "developer" || role === "user") {
        loginUser(res,Developer,userName,password,role)
        return
    }
    return res.status(400).json({ message: "Invalid role" });
}
const DeveloperSignUp=async (req, res) => {
    signUp(req,res,Developer)
}
const UserSignUp=async (req, res) => {
    signUp(req,res,User)
}
const loginUser=async(res,model,userName,password,role)=>{
    const hashedPassword = await model.findOne({ userName: userName }).select('password');
        if (!hashedPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, hashedPassword.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token =jwt.sign({ user:userName, role: role }, process.env.JWT_SECRET, { expiresIn: '4h' })
       
        return res.status(200).json({ message: "Login successful", token: token });
}
const signUp=async(req,res,model)=>{
    const {userName,password,fullName}=req.body
    if (
        !userName || !password || !fullName ||
        userName.trim() == "" || password.trim() == "" || fullName.trim() == ""
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await model.find({ userName });
        if (existingUser.length > 0) {
   
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new model({
            userName:userName,
            password: hashedPassword,
            fullName: fullName
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export {login,DeveloperSignUp,UserSignUp};