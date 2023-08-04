// NPM modules
import Joi from 'joi';

// Local Modules
// const ID = Joi.string().hex().length(24);

const UsersSchema = {
  signupSchema: {
    body: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string(),
      email: Joi.string().email().required()
    })
  },

  changePasswordSchema: {
    body: Joi.object({
      oldPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).required()
    })
  },

  resetPasswordSchema: {
    query: Joi.object({
      key: Joi.string().required(),
      expiryDate: Joi.number().unsafe().required(),
      email: Joi.string().email().required()
      // password: Joi.string().min(8).required()
    })
  },

  forgotPasswordSchema: {
    body: Joi.object({
      email: Joi.string().email().required()
    })
  },

  verifySchema: {
    query: Joi.object({
      key: Joi.string().required(),
      expiryDate: Joi.number().required(),
      email: Joi.string().email().required()
    })
  },
  verifyPhoneSchema: {
    body: Joi.object({
      id: Joi.number(),
      otp: Joi.string().length(6).required()
    })
  }
};

export default UsersSchema;
