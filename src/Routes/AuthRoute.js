import express from 'express';
import { login,DeveloperSignUp,UserSignUp } from '../Middlewares/Auth/Auth.js';
const router = express.Router();
router.post('/login', login);
router.post('/signup/developer', DeveloperSignUp);
router.post('/signup/user', UserSignUp); 
export default router;