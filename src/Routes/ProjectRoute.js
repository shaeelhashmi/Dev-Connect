import { createProject } from "../Controllers/Projects/Projects.js";
import { Router } from "express";
import Authenticate from "../Middlewares/Authenticate.js";
const router = Router();
// Route to create a new project
router.post("/create", Authenticate, createProject);
export default router;