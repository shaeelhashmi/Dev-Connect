import database from "../../Configuration/DB.js";
const { Schema } = database;
const projectSchema = new Schema({
    userName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    estimatedBudget: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['open', 'in progress', 'completed'], 
        default: 'open' 
    }
}, {
    timestamps: true,
});

const ProjectModel = database.model('Project', projectSchema);
export default ProjectModel;