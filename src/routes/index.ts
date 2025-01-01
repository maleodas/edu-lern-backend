import express from 'express';
import { router as userRoutes } from './userRoutes';
const router = express.Router();

// router.use(accessTokenRoutes);
router.use(userRoutes);

export { router };
