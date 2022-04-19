import { UsersSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class UsersValidation {
  static validateSignupArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchemes.signupSchema, next);
  }

  static validateForgotPasswordArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchemes.forgotPasswordSchema, next);
  }

  static validateResetPasswordArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchemes.resetPasswordSchema, next);
  }

  static validateChangePasswordArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchemes.changePasswordSchema, next);
  }

  static validateVerifyArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchemes.verifySchema, next);
  }


  static validatePhoneVerifyArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchemes.verifyPhoneSchema, next);
  }
}

export default UsersValidation;
