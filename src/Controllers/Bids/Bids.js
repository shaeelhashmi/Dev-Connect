import Bids from '../../Models/Bids/BidsModel.js';
import Project from '../../Models/Project/ProjectModel.js';
import {Developer} from '../../Models/Users/User.js';
const SetBids = async (req, res) => {
    try{
        const { projectId,  bidAmount, message } = req.body;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }
        console.log("Project found:", project);
        if (!req.user)
        {
            return res.status(401).json({ message: "Unauthorized access." });
        }
        const user= await Developer.findOne({userName:req.user});
        if (!user) {
            return res.status(404).json({ message: "Developer not found." });
        }
        if (!projectId  || !bidAmount || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBid = new Bids({
            projectId,
            bidderName: user,
            bidAmount,
            message,
        });

        await newBid.save();

        res.status(201).json({ message: "Bid placed successfully.", bid: newBid });
    }
    catch (error) {
        console.error("Error in SetBids:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export { SetBids };