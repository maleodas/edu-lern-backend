import express from 'express';
import { body } from 'express-validator';
import {
  deleteAdmin,
  forgotPasswordAdmin,
  getAdminById,
  getAllAdmin,
  getAllAdminName,
  loginAdmin,
  signUpAdmin,
  updateAdmin,
  updateForgotPasswordAdmin,
  updatePasswordAdmin,
} from '../controllers/adminController';
import { auth } from '../middleware/auth';
import { validationHandler } from '../middleware/validation';
const router = express.Router();

const validateDataSignup = [
  body('name').isString(),
  body('status').isBoolean(),
  body('email').isString(),
];

const validateDataLogin = [
  body('email').isString(),
  body('password').isString(),
];

router.post('/admins/login', validateDataLogin, validationHandler, loginAdmin);
router.post('/admins/updatePassword', auth, updatePasswordAdmin);
router.post('/admins/forgotPassword', forgotPasswordAdmin);
router.post('/admins/updateForgotPassword', updateForgotPasswordAdmin);
router.post('/admins/add', validateDataSignup, validationHandler, signUpAdmin);
router.post('/admins', auth, getAllAdmin);
router.patch('/admins/edit/:id', updateAdmin);
router.delete('/admins/delete/:id', deleteAdmin);
router.get('/admins/get/:id', getAdminById);
router.get('/admins/getAllAdminName', getAllAdminName);

export { router };
