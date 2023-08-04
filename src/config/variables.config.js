const config = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT || 3040,
  ONE_WAY_HASH_SECRET: process.env.ONE_WAY_HASH_SECRET || 'secret',
  DISABLE_REQUEST_LOG: process.env.DISABLE_REQUEST_LOG,
  CORS: process.env.CORS || '*',

  MONGODB: {
    URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/quiz_maker'
  },

  AUTH: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
    ACCESS_TOKEN_ACTIVE_TIME: process.env.ACCESS_TOKEN_ACTIVE_TIME || '1h',
    REFRESH_TOKEN_ACTIVE_TIME: process.env.REFRESH_TOKEN_ACTIVE_TIME || '12h'
  },

  EMAIL: {
    WEBSITE_HOST: process.env.EMAIL_WEBSITE_HOST || 'http://localhost:5001',
    SERVICE: process.env.EMAIL_SERVICE || 'gmail',
    USERNAME: process.env.EMAIL_USERNAME || 'email',
    PASSWORD: process.env.EMAIL_PASSWORD || 'password',
    EXPIRE: process.env.EMAIL_EXPIRE || 60 * 60 * 1000,
    ENDPOINTS: {
      FORGOT_PASSWORD: process.env.EMAIL_ENDPOINTS_FORGOT_PASSWORD || 'forgot-password',
      RESET_PASSWORD: process.env.EMAIL_ENDPOINTS_RESET_PASSWORD || 'reset-password',
      SIGNUP: process.env.EMAIL_ENDPOINTS_SIGNUP || '/users/verify'
    },
    TEMPLATES: {
      FORGOT_PASSWORD: process.env.EMAIL_TEMPLATES_FORGOT_PASSWORD || 'templates/forgot_password.html',
      SIGNUP: process.env.EMAIL_TEMPLATES_SIGNUP || 'templates/signup.html'
    }
  },
  PHONE: {
    ACCOUNT_SID: process.env.PHONE_ACCOUNT_SID,
    AUTH_TOKEN: process.env.PHONE_AUTH_TOKEN
  }
};

// TODO validate all required configs
// const required = {
//   ONE_WAY_HASH_SECRET: 1,
//   AUTH: {
//     JWT_ACCESS_SECRET: 1,
//     JWT_REFRESH_SECRET: 1
//   },
//   EMAIL: {
//     WEBSITE_HOST: 1,
//     SERVICE: 1,
//     USERNAME: 1,
//     PASSWORD: 1,
//     EXPIRE: 1,
//     ENDPOINTS: {
//       FORGOT_PASSWORD: 1,
//       SIGNUP: 1
//     },
//     TEMPLATES: {
//       FORGOT_PASSWORD: 1,
//       SIGNUP: 1
//     }
//   }
// };

export default config;
