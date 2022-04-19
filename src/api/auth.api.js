// NPM Modules
import express from 'express';

import AuthController from '../auth/auth.controller';
import AuthMiddleware from '../auth/auth.middleware';
import { AuthValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

router.post('/login',
  AuthValidationMiddleware.validateLoginArgs,
  AuthController.login);

router.get('/logout',
  AuthMiddleware.authenticate,
  AuthController.logout);

router.post('/refresh',
  AuthValidationMiddleware.validateRefreshArgs,
  AuthController.refresh);

export default router;
