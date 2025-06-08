import { Router } from "express";
import { SetBids } from "../Controllers/Bids/Bids.js";
import Authenticate from "../Middlewares/Authenticate.js";
const router = Router();
router.post("/place",Authenticate, SetBids);
// Export the router
export default router;