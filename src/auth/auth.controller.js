// import parse from 'parse-duration';
import AuthService from './auth.service';
import { SuccessHandlerUtil, ErrorsUtil } from '../utils';
// import config from '../config/variables.config';

// const { AUTH } = config;
// const { REFRESH_TOKEN_ACTIVE_TIME } = AUTH;
const { UnauthorizedError } = ErrorsUtil;

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const loginResult = await AuthService.login(email, password);

      // const userCookie = JSON.stringify({ refreshToken: loginResult.refreshToken });
      // res.cookie('userCookie', userCookie, {
      //   maxAge: parse(REFRESH_TOKEN_ACTIVE_TIME),
      //   httpOnly: true
      // });

      SuccessHandlerUtil.handleAdd(res, next, loginResult);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      // const userCookie_ = req.cookies?.userCookie;
      // if (!userCookie_ || userCookie_ === 'undefined') throw new UnauthorizedError();
      // const { refreshToken } = JSON.parse(userCookie_);

      const { refreshToken } = req.body;
      if (!refreshToken) throw new UnauthorizedError();
      const refreshResult = await AuthService.refresh(refreshToken);

      // const userCookie = JSON.stringify({ refreshToken: refreshResult.refreshToken });
      // res.cookie('userCookie', userCookie, {
      //   maxAge: parse(REFRESH_TOKEN_ACTIVE_TIME),
      //   httpOnly: true
      // });

      SuccessHandlerUtil.handleAdd(res, next, refreshResult);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      // const userCookie = req.cookies?.userCookie;
      // if (!userCookie) throw new UnauthorizedError();
      // const { refreshToken } = JSON.parse(userCookie);
      const { user: { email } } = res.locals.auth;

      await AuthService.logout(email);
      // res.clearCookie('userCookie');
      SuccessHandlerUtil.handleUpdate(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }
}
