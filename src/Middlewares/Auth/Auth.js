import {User,Developer} from "../../Models/Models.js";
import bcrypt from "bcryptjs";
const login=(req, res, next) => {
    const {userName,password,role}=req.body
    
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