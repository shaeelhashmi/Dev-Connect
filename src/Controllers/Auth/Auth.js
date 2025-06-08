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
    console.log("UserName:", userName);
    console.log("Role:", role);

    if (role == "developer") {
        const hashedPassword = await Developer.findOne({ userName: userName }).select('password');
        if (!hashedPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, hashedPassword.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token =jwt.sign({ user:userName, role: "developer" }, process.env.JWT_SECRET, { expiresIn: '15m' })
       
        return res.status(200).json({ message: "Login successful", token: token });

    }
    if (role === "user") {
        const hashedPassword = await Developer.findOne({ userName: userName }).select('password');
        if (!hashedPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, hashedPassword.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token =jwt.sign({ user:userName, role: "user" }, process.env.JWT_SECRET, { expiresIn: '15m' })
       
        return res.status(200).json({ message: "Login successful", token: token });
    }
    return res.status(400).json({ message: "Invalid role" });
}
const DeveloperSignUp=async (req, res, next) => {
    const {userName,password,fullName}=req.body
    try {
        const existingUser = await Developer.find({ userName });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Developer({
            userName:userName,
            password: hashedPassword,
            fullName: fullName
        });
        await newUser.save();
     
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const UserSignUp=async (req, res, next) => {
    const {userName,password,fullName}=req.body
    try {
        const existingUser = await User.find({ userName });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName:userName,
            password: hashedPassword,
            fullName: fullName
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {login,DeveloperSignUp,UserSignUp};