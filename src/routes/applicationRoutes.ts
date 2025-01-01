import express from 'express';
import { body } from 'express-validator';
import {
  addApplication,
  deleteApplication,
  getAllApplication,
  getApplicationById,
  updateApplication,
} from '../controllers/applicationContoller';
import { validationHandler } from '../middleware/validation';
const router = express.Router();

const validateAddApplication = [
  body('name').isString(),
  body('key').isString(),
  body('status').isBoolean(),
  body('description').isString(),
  body('admin')
    .isArray()
    .custom(value => {
      if (!value.every(item => typeof item === 'string')) {
        throw new Error('admin must be an array of strings');
      }
      return true;
    }),
  body('redirectUrl')
    .isArray()
    .custom(value => {
      if (!value.every(item => typeof item === 'string')) {
        throw new Error('redirectUrl must be an array of strings');
      }
      return true;
    }),
];

router.post(
  '/application/add',
  validateAddApplication,
  validationHandler,
  addApplication,
);
router.patch(
  '/application/update/:id',
  validateAddApplication,
  updateApplication,
);
router.delete('/application/delete/:id', deleteApplication);
router.post('/application/getAll', getAllApplication);
router.get('/application/getById/:id', getApplicationById);

export { router };
