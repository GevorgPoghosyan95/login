// NPM modules
import Joi from 'joi';

// Local Modules
// const ID = Joi.string().hex().length(24);

const AuthSchema = {
  loginSchema: {
    body: Joi.object({
      password: Joi.string().min(8).required(),
      email: Joi.string().email().required()
    })
  },

  refreshSchema: {
    body: Joi.object({
      refreshToken: Joi.string().required()
    })
  }

};

export default AuthSchema;
