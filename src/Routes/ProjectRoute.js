import { createProject,openProject } from "../Controllers/Projects/Projects.js";
import { Router } from "express";
import Authenticate from "../Middlewares/Authenticate.js";
import {GetBids} from "../Controllers/Bids/Bids.js";
const router = Router();
// Route to create a new project
router.post("/create", Authenticate, createProject);
router.get('/open',Authenticate, openProject);
router.get('/:id/bids', Authenticate, GetBids);
export default router;