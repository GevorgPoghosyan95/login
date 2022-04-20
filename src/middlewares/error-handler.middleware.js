import http from 'http';

import { HttpStatusCodesUtil } from '../utils';

export default class ErrorHandlerMiddleware {
  /**
   * @param {Object} error
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Initialize error handler.
   */
  static init(error, request, response, next) {

    const ERROR_CASE = ErrorHandlerMiddleware.ERROR_CASES[error.status]
      || ErrorHandlerMiddleware.ERROR_CASES[error.code]
      || ErrorHandlerMiddleware.ERROR_CASES[error.name]
      || ErrorHandlerMiddleware.ERROR_CASES.DEFAULT;

    const { status, code, message } = ERROR_CASE;

    const result = {
      status, code, message: message || error.message, data: error.data
    };
    // if (status === 400) {
    //   const { body, query, params } = request;
    //   console.log(JSON.stringify({
    //     body, query, params, message: error.message
    //   }, null, 2));
    // }

    // temp. log to explore and add more cases.
    if (result.status === 500) {
      console.log('Case: ', error.status, error.code, error.name, error.message);
    }
    if (result.status >= 500) console.log(error);

    response.status(result.status).json(result);
  }
}

ErrorHandlerMiddleware.ERROR_CASES = {
  400: { // microservice, error status is used
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  UniqueViolationError:{
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST],
    message:'Duplicate entries!'
  },
  ExpiredTokenConfirmError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  ExpiredEmailConfirmError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  InputValidationError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  InvalidEmailConfirmError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  InvalidOtpConfirmError:{
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  InvalidPasswordError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  SyntaxError: { // body-parser
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  11000: { // mongodb
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST],
    message: 'Duplicate entry.'
  },
  DocumentNotFoundError: { // mongodb
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND],
    message: 'Document Not Found.'
  },
  CastError: { // mongodb
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  ValidationError: { // mongodb
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
  },
  401: { // microservice, error status is used
    status: HttpStatusCodesUtil.UNAUTHORIZED,
    code: http.STATUS_CODES[HttpStatusCodesUtil.UNAUTHORIZED]
  },
  UnauthorizedError: {
    status: HttpStatusCodesUtil.UNAUTHORIZED,
    code: http.STATUS_CODES[HttpStatusCodesUtil.UNAUTHORIZED]
  },
  Forbidden: {
    status: HttpStatusCodesUtil.FORBIDDEN,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]
  },
  ForbiddenError: {
    status: HttpStatusCodesUtil.FORBIDDEN,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]
  },
  PermissionError: {
    status: HttpStatusCodesUtil.FORBIDDEN,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]
  },
  404: { // microservice, error status is used
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND]
  },
  ResourceNotFoundError: {
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND]
  },
  ConflictError: {
    status: HttpStatusCodesUtil.CONFLICT,
    code: http.STATUS_CODES[HttpStatusCodesUtil.CONFLICT]
  },
  MicroserviceError: {
    status: HttpStatusCodesUtil.FAILED_DEPENDENCY,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FAILED_DEPENDENCY]
  },
  DEFAULT: {
    status: HttpStatusCodesUtil.INTERNAL_SERVER_ERROR,
    code: http.STATUS_CODES[HttpStatusCodesUtil.INTERNAL_SERVER_ERROR],
    message: 'The server encountered an internal error. Try again later.'
  }
};
