// NPM Modules
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// Local modules
import config from './config/variables.config';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware';
import Api from './api';

import PostgresStorage from './storage/postgres.storage';

const { CORS, DISABLE_REQUEST_LOG } = config;

const cookieParser = require('cookie-parser');

class App {
  /**
     * @constructor
     */
  constructor() {
    this.app = express();
  }

  /**
     * @description Initialize the App.
     */

  async _init() {
    await App._initializeStorage();
    this._setRequestLogger();
    this._initCookieParser();
    this._setCors();
    this._setRequestParser();
    this._initializeApi();
    this._setErrorHandler();
  }

  /**
     * @private
     * @description Init cookie
     */

  _initCookieParser() {
    this.app.use(cookieParser());
  }

  /**
     * @private
     * @description Set request logger.
     */
  _setRequestLogger() {
    if (DISABLE_REQUEST_LOG !== '1') {
      this.app.use(morgan('dev'));
    }
  }

  /**
     * @private
     * @description Set Cross-origin resource sharing.
     *  Reflect any request that is coming from an origin ending with one specified in configs.
     */
  _setCors() {
    this.app.use(cors({
      origin: CORS,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: -1
    }));
  }

  /**
     * @private
     * @description Set body parser:
     *  1. Parses the text as JSON & exposes the resulting object on req.body (limit 1 mb).
     */
  _setRequestParser() {
    this.app.use(bodyParser.json());
  }

  /**
     * @private
     * @description Initialize storage.
     */
  static _initializeStorage() {
    // MongodbStorage.init(MONGODB.URL);
    PostgresStorage.init();
  }

  /**
     * @private
     * @description Initialize API.
     */
  _initializeApi() {
    this.app.use('/', Api);
  }

  /**
     * @private
     * @description General error handler.
     */
  _setErrorHandler() {
    this.app.use(ErrorHandlerMiddleware.init);
  }

  _initializePassport() {
   // this.app.use('/', PassportApi);
  }
}

export default new App();
