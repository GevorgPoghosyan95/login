// NPM Modules
import express from 'express';

import AuthController from '../auth/auth.controller';
import AuthMiddleware from '../auth/auth.middleware';
import { AuthValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

router.get('/', AuthMiddleware.authenticate, (req, res) => {
  res.json('home');
});

export default router;
