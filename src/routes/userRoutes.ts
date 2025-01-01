import express from 'express';
import { body } from 'express-validator';
import { requestApproval } from '../controllers/adminController';
import {
  deleteUser,
  forgotPasswordUser,
  getAllUser,
  getUserById,
  getUserByRequest,
  loginUser,
  signUpUser,
  updateForgotPasswordUser,
  updatePasswordUser,
  updateUser,
} from '../controllers/userController';
import { auth } from '../middleware/auth';
import { validationHandler } from '../middleware/validation';
const router = express.Router();

const validateDataSignup = [
  body('dealerMaster').isString(),
  body('dealerID').isString(),
  body('dealerParent').isString(),
  body('locationCode').isString(),
  body('saleCode').isString(),
  body('outletCode').isString(),
  body('dealerMapCode').isString(),
  body('billSeriesNo').isString(),
  body('locationDescription').isString(),
  body('dealerName').isString(),
  body('dealerCity').isString(),
  body('email').isString(),
  body('dealerAdminName').isString(),
  body('dealerAdminContactNo').isString(),
  body('password').isString().optional(),
];

const validateDataLogin = [
  body('email').isString(),
  body('password').isString().optional(),
];

router.post('/user/add', validateDataSignup, validationHandler, signUpUser);
router.post('/user/login', validateDataLogin, validationHandler, loginUser);
router.patch('/user/update/:id', updateUser);
router.delete('/user/delete/:id', deleteUser);
router.post('/user/getAll', auth, getAllUser);
router.get('/user/getById/:id', getUserById);
router.post('/user/updatePassword', auth, updatePasswordUser);
router.post('/user/forgotPassword', forgotPasswordUser);
router.post('/user/updateForgotPassword', updateForgotPasswordUser);
router.get('/user/getByRequest', getUserByRequest);
router.post('/user/requestApproval/:id', requestApproval);

export { router };
