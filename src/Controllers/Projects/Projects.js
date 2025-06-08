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
            status: 'open' // Default status
        });

        // Save the project to the database
        await newProject.save();

        return res.status(201).json({ message: 'Project created successfully', project: newProject });
    }catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export {createProject}