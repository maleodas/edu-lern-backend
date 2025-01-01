import express from 'express';
import { body } from 'express-validator';
import {
  addGroup,
  deleteGroup,
  getAllGroup,
  getGroupById,
  updateGroup,
} from '../controllers/screenGroupController';
import { validationHandler } from '../middleware/validation';
const router = express.Router();

const validateAddGroup = [
  body('name').isString(),
  body('code').isString(),
  body('description').isString(),
  body('application').isString(),
  body('validFrom').isDate({ format: 'YYYY-MM-DD' }),
  body('validTill').isDate({ format: 'YYYY-MM-DD' }),
];

router.post('/group/add', validateAddGroup, validationHandler, addGroup);
router.patch('/group/update/:id', updateGroup);
router.delete('/group/delete/:id', deleteGroup);
router.post('/group/getAll', getAllGroup);
router.get('/group/getById/:id', getGroupById);

export { router };
