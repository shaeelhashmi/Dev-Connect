import express from 'express';
import router from './Routes/AuthRoute.js';
const app = express();
app.use(express.json());
app.use('/auth', router);
export default app;