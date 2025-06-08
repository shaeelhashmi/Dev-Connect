import { createProject,openProject } from "../Controllers/Projects/Projects.js";
import { Router } from "express";
import Authenticate from "../Middlewares/Authenticate.js";
const router = Router();
// Route to create a new project
router.post("/create", Authenticate, createProject);
router.get('/open',Authenticate, openProject);
export default router;