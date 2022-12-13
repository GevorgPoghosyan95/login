import UsersService from '../services/users.service';
import { SuccessHandlerUtil } from '../utils';

export default class UsersController {
  static async signup(req, res, next) {
    try {
      const payload = req.body;
      const user = await UsersService.signup(payload);
      SuccessHandlerUtil.handleAdd(res, next, user);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(req, res, next) {
    try {
      const { user: { userId } } = res.locals.auth;
      const user = await UsersService.getCurrentUser(userId);
      SuccessHandlerUtil.handleGet(res, next, user);
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const {
        email, key, expiryDate
      } = req.query;
      await UsersService.resetPassword(email, key, expiryDate);
      SuccessHandlerUtil.handleAdd(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { userId } = res.locals.auth.user;
      const { newPassword, oldPassword } = req.body;
      await UsersService.changePassword(userId, oldPassword, newPassword);
      SuccessHandlerUtil.handleUpdate(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await UsersService.forgotPassword(email);
      SuccessHandlerUtil.handleAdd(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async verify(req, res, next) {
    try {
      const { email, expiryDate, key } = req.query;
      await UsersService.verify(email, expiryDate, key);
      SuccessHandlerUtil.handleAdd(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async verifyPhone(req, res, next) {
    try {
      const { otp,id } = req.body;
      await UsersService.verifyPhone(otp,id);
      SuccessHandlerUtil.handleAdd(res, next, { success: true,message:`User verified successfully!` });
    } catch (error) {
        next(error);
    }
  }
}
