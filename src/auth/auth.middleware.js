import AuthService from './auth.service';
import { ErrorsUtil } from '../utils';

const { UnauthorizedError } = ErrorsUtil;

export default class AuthMiddleware {
  static authenticate(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) throw new UnauthorizedError();

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) throw new UnauthorizedError();

      // if (!req.cookies.userCookie || req.cookies.userCookie === 'undefined') {
      //   throw new UnauthorizedError();
      // }

      // const { refreshToken } = JSON.parse(req.cookies.userCookie);
      // if (!refreshToken) throw new UnauthorizedError();

      const user = AuthService.validateAccessToken(accessToken);
      if (!user) throw new UnauthorizedError();

      res.locals.auth = { user };
      req.user = user
      next();
    } catch (error) {
      next(error);
    }
  }
}
