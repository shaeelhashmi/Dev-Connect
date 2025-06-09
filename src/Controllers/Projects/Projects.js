import Autheticate from '../../Middlewares/Authenticate.js';
import ProjectModel from '../../Models/Project/ProjectModel.js';
const createProject = async(req, res) => {
    try{
        const { title, description, techStack, estimatedBudget } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!req.role || req.role !== 'user') {
            return res.status(403).json({ message: 'Forbidden: Only users can create projects' });
        }


        // Validate required fields
        if (!title || !description || !techStack || !estimatedBudget) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const User = req.user;
        // Create a new project instance
        const newProject = new ProjectModel({
            userName:User,
            title,
            description,
            techStack,
            estimatedBudget,
            status: 'open' 
        });

        // Save the project to the database
        await newProject.save();

        return res.status(201).json({ message: 'Project created successfully', project: newProject });
    }catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const openProject = async(req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!req.role || req.role !== 'developer') {
            return res.status(403).json({ message: 'Forbidden: Only developer can view open projects' });
        }
        const projects = await ProjectModel.find({ status: 'open' });
        return res.status(200).json({ message: 'Open projects retrieved successfully', projects });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export {createProject,openProject}