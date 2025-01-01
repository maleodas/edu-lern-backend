import express from 'express';
import { body } from 'express-validator';
import {
  addPermission,
  deletePermission,
  getAllPermission,
  getPermissionById,
  updatePermission,
} from '../controllers/screenPermissionController';
import { validationHandler } from '../middleware/validation';
const router = express.Router();

const validateAddPermission = [
  body('name').isString(),
  body('key').isString(),
  body('description').isString(),
  body('application').isString(),
  body('validFrom').isDate({ format: 'YYYY-MM-DD' }),
  body('validTill').isDate({ format: 'YYYY-MM-DD' }),
];

router.post(
  '/permission/add',
  validateAddPermission,
  validationHandler,
  addPermission,
);
router.patch('/permission/update/:id', validateAddPermission, updatePermission);
router.delete('/permission/delete/:id', deletePermission);
router.post('/permission/getAll', getAllPermission);
router.get('/permission/getById/:id', getPermissionById);

export { router };
