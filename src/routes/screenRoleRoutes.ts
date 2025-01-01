import express from 'express';
import { body } from 'express-validator';
import {
  addRole,
  deleteRole,
  getAllRole,
  getRoleById,
  updateRole,
} from '../controllers/screenRoleControllers';
import { validationHandler } from '../middleware/validation';
const router = express.Router();

const validateAddRoles = [
  body('name').isString(),
  body('code').isString(),
  body('description').isString(),
  body('application').isString(),
  body('validFrom').isDate({ format: 'YYYY-MM-DD' }),
  body('validTill').isDate({ format: 'YYYY-MM-DD' }),
];

router.post('/role/add', validateAddRoles, validationHandler, addRole);
router.patch('/role/update/:id', updateRole);
router.delete('/role/delete/:id', deleteRole);
router.post('/role/getAll', getAllRole);
router.get('/role/getById/:id', getRoleById);

export { router };
