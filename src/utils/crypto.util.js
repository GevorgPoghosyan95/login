import bCrypt from 'bcrypt';

export default class CryptoUtil {
  /**
   * @param {string} password
   *  @return {string}
   * @description Creates hash password from a given string.
   */
  static createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

  /**
   * @param {string} password
   * @param {string} hashPassword
   * @returns {boolean}
   * @description Compares string password with hash password.
   */
  static isValidPassword(password, hashPassword) {
    return bCrypt.compareSync(password, hashPassword);
  }


  static createPassword(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
    }
    return result;
  }
}
