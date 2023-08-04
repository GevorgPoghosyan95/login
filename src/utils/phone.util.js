// Local Modules
import config from '../config/variables.config';

const { PHONE } = config;
const {
  ACCOUNT_SID, AUTH_TOKEN
} = PHONE;

export default class PhoneUtil {
  static generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  static sendMessage(phone) {
    const accountSid = ACCOUNT_SID;
    const authToken = AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const otp = this.generateOTP();
    try {
      client.messages
        .create({
          body: otp,
          messagingServiceSid: 'MGa4057748820afc8e9ff6d31cee58d5ef',
          to: phone
        })
        .then((message) => console.log(message.sid));
    } catch (e) {
      throw new Error(e.message);
    }

    return otp;
  }
}
