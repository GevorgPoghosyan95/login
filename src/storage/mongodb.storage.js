import mongoose from 'mongoose';

import { LoggerUtil } from '../utils';

export default class MongodbStorage {
  /**
   * @description Initiate Mongoose connection and attach event listeners to it.
   */
  static async init(MONGODB_URL) {
    const options = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    // mongoose.set('useCreateIndex', true)

    mongoose.connection.on('connected', MongodbStorage._onConnected);
    mongoose.connection.on('error', MongodbStorage._onError);
    mongoose.connection.on('disconnected', MongodbStorage._onDisconnected);
    return mongoose.connect(MONGODB_URL, options).catch(MongodbStorage._onConnectionOpeningError);
  }

  /**
   * @description Connection opening error handler.
   */
  static _onConnectionOpeningError(error) {
    LoggerUtil.error(`Failed to init Mongoose connection: ${error.message}`);
  }

  /**
   * @description On connected event handler.
   */
  static _onConnected() {
    LoggerUtil.info('Mongoose connected.');
  }

  /**
   * @description On disconnected event handler.
   */
  static _onDisconnected() {
    LoggerUtil.error('Mongoose disconnected.');
  }

  /**
   * @description On error event handler.
   */
  static _onError(error) {
    LoggerUtil.error(`Mongoose connection error: ${error.message}`);
  }
}
