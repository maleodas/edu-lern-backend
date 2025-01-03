import express from 'express';
import { router as dashboardRoutes } from './dashboardRoutes';
import { router as userRoutes } from './userRoutes';
const router = express.Router();

// router.use(accessTokenRoutes);
router.use(userRoutes);
router.use(dashboardRoutes);

export { router };
