import Bids from '../../Models/Bids/BidsModel.js';
import Project from '../../Models/Project/ProjectModel.js';
import {Developer} from '../../Models/Users/User.js';
import mongoose from 'mongoose';
const SetBids = async (req, res) => {
    try{
        const { projectId,  bidAmount, message } = req.body;
        if (!projectId || !bidAmount || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        if (!req.user)
        {
            return res.status(401).json({ message: "Unauthorized access." });
        }
        const user= await Developer.findOne({userName:req.user});
        if (!user) {
            return res.status(404).json({ message: "Developer not found." });
        }
        const check=await Bids.findOne({bidderName:req.user, projectId: new mongoose.Types.ObjectId(projectId)});
        if (check) {
            return res.status(400).json({ message: "You have already placed a bid for this project." });
        }
        if (!projectId  || !bidAmount || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBid = new Bids({
            projectId,
            bidderName: req.user,
            bidAmount,
            message,
        });

        await newBid.save();

        res.status(201).json({ message: "Bid placed successfully.", bid: newBid });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const GetBids = async (req, res) => {
    try{
        const {id}=req.params;
        if (!id) {
            return res.status(400).json({ message: "Project ID is required." });
        }
        const bids=await Bids.find({ projectId: new mongoose.Types.ObjectId(id) })
        if (!bids || bids.length === 0) {
            return res.status(404).json({ message: "No bids found for this project." });
        }
        res.status(200).json({ message: "Bids retrieved successfully.", bids });
    }catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export { SetBids, GetBids };