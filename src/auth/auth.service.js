import jwt from 'jsonwebtoken';
import parse from 'parse-duration';
import { UsersModel, AuthModel } from '../models';
import { ErrorsUtil, CryptoUtil } from '../utils';
import {formatDate } from '../helpers/dateHelper'

import config from '../config/variables.config';

const { AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_ACTIVE_TIME,
  ACCESS_TOKEN_ACTIVE_TIME
} = AUTH;

const { ResourceNotFoundError, UnauthorizedError } = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const atSignOption = { expiresIn: ACCESS_TOKEN_ACTIVE_TIME };
    const rtSignOptions = { expiresIn: REFRESH_TOKEN_ACTIVE_TIME };

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, atSignOption);
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, rtSignOptions);

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      // TODO use expired at for current range
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  static validateRefreshToken(refreshToken) {
    try {
      // TODO use expired at for current range
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }


  static async refresh(token) {
    const user = AuthService.validateRefreshToken(token);
    const { email, userId, role } = user;
    const authData = await AuthModel.findOne({ refreshToken: token });
    if (!authData) throw new UnauthorizedError('Invalid Refresh Token');

    const tokens = AuthService.generateTokens({ email, userId, role });
    const { accessToken, refreshToken } = tokens;

    const accessTokenExpiresAt = new Date().getTime() + parse(ACCESS_TOKEN_ACTIVE_TIME);
    const refreshTokenExpiresAt = new Date().getTime() + parse(REFRESH_TOKEN_ACTIVE_TIME);
    const scope = `access:${role}`;
    const payload = {
      accessToken, refreshToken, userId, scope, accessTokenExpiresAt, refreshTokenExpiresAt
    };
    await AuthModel.delete(token);
    return AuthModel.create(payload);
  }

  static async login(email, password) {
    const user = await UsersModel.query().where({email}).first();

    if (!user) throw new ResourceNotFoundError(`User not exists with email: ${email}`);

    if (!user.verified) throw new UnauthorizedError('The user is not verified');
    if (!CryptoUtil.isValidPassword(password, user.password)) {
      throw new UnauthorizedError('Invalid password');
    }

    const { id: userId, role } = user;
    const { accessToken, refreshToken } = AuthService.generateTokens({ email, userId, role });

    const accessTokenExpiresAt = formatDate(new Date(new Date().getTime() + parse(ACCESS_TOKEN_ACTIVE_TIME)));
    const refreshTokenExpiresAt = formatDate(new Date(new Date().getTime() + parse(REFRESH_TOKEN_ACTIVE_TIME)));
    const scope = `access:${role}`;
    const payload = {
      accessToken, refreshToken, userId, scope, accessTokenExpiresAt, refreshTokenExpiresAt
    };
    const auth = await AuthModel.getByParams({userId})
    const result = auth ?  await AuthModel.update({userId},payload) : AuthModel.create(payload)
    return result;

  }

}
