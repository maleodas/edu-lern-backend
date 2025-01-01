import express from 'express';
import { router as adminRoutes } from './adminRoutes';
import { router as applicationRoutes } from './applicationRoutes';
import { router as screenGroupRoutes } from './screenGroupRoutes';
import { router as screenPermissionRoutes } from './screenPermissionRoutes';
import { router as screenRoleRoutes } from './screenRoleRoutes';
import { router as dataUpload } from './serviceLeadsRoutes';
import { router as userRoutes } from './userRoutes';
const router = express.Router();

// router.use(accessTokenRoutes);
router.use(userRoutes);
router.use(dataUpload);
router.use(adminRoutes);
router.use(screenPermissionRoutes);
router.use(screenRoleRoutes);
router.use(screenGroupRoutes);
router.use(applicationRoutes);

export { router };
