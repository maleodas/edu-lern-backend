import express from 'express';
import { addDashboard, getDashboard } from '../controllers/dashboardController';
const router = express.Router();

router.post('/dashboard/addDashboard', addDashboard);
router.get('/dashboard/getDashboard', getDashboard);

export { router };
