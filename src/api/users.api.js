// NPM Modules
import express from 'express';

import UsersController from '../controllers/users.controller';
import AuthMiddleware from '../auth/auth.middleware';
import { UsersValidationMiddleware } from '../middlewares/validation';
import permit from '../middlewares/checkRoles';

const router = express.Router();

router.post('/',
  UsersValidationMiddleware.validateSignupArgs,
  UsersController.signup);

router.get('/verify',
  UsersValidationMiddleware.validateVerifyArgs,
  UsersController.verify);

router.post('/verify-phone',
  UsersValidationMiddleware.validatePhoneVerifyArgs,
  UsersController.verifyPhone);

router.post('/forgot-password',
  UsersValidationMiddleware.validateForgotPasswordArgs,
  UsersController.forgotPassword);

router.post('/reset-password',
  UsersValidationMiddleware.validateResetPasswordArgs,
  UsersController.resetPassword);

router.put('/change-password',
  AuthMiddleware.authenticate,
  UsersValidationMiddleware.validateChangePasswordArgs,
  UsersController.changePassword);

router.get('/current',
  AuthMiddleware.authenticate,
  permit('admin'),
  UsersController.getCurrentUser);

export default router;
