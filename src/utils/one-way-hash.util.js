import crypto from 'crypto';

export default class OneWayHashUtil {
  /**
   * @constructor
   * @param {string} secret
   */
  constructor(secret) {
    this.secret = secret;
  }

  /**
   * @param {string} username
   * @param {number} expiryDate
   * @description Create registration confirmation hash.
   */
  registrationConfirmationHash(username, expiryDate) {
    const text = username + expiryDate;

    return this._generateOneWayHash(text);
  }

  /**
   * @param {string} username
   * @param {number} expiryDate
   * @description Create forgot password hash.
   */
  forgotPasswordHash(username, expiryDate) {
    const text = username + expiryDate;

    return this._generateOneWayHash(text);
  }

  /**
   * @private
   * @param {string} text
   * @return {string}
   * @description Generate one-way-hash.
   */
  _generateOneWayHash(text) {
    return OneWayHashUtil._createHMAC(text, this.secret);
  }

  /**
   * @private
   * @param {string} text
   * @param {string} key
   * @returns {string}
   * @description Create HMAC.
   */
  static _createHMAC(text, key) {
    return crypto
      .createHmac('sha512', key)
      .update(text)
      .digest('hex');
  }
}
