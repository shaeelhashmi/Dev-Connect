import express from 'express';
import router from './Routes/AuthRoute.js';
import projectRouter from './Routes/ProjectRoute.js';
const app = express();
app.use(express.json());
app.use('/auth', router);
app.use('/projects', projectRouter);
export default app;