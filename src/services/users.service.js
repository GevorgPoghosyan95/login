import {UsersModel} from '../models';
import config from '../config/variables.config';
import {
    ErrorsUtil, OneWayHashUtil, CryptoUtil, EMailUtil, PhoneUtil
} from '../utils';

const {EMAIL, ONE_WAY_HASH_SECRET} = config;

const {
    InputValidationError, ResourceNotFoundError, ExpiredTokenConfirmError, InvalidEmailConfirmError,InvalidOtpConfirmError
} = ErrorsUtil;

export default class UsersService {
    static async signup(payload) {
        const {password, email, phone} = payload;
        payload.password = CryptoUtil.createHash(password);
        const user = await UsersModel.create(payload);
        if (phone) {
            let otp_code = PhoneUtil.sendMessage(phone)
            await UsersModel.update({id: user.id}, {otp_code})
        } else {
            // Send Email
            const expiryDate = Date.now() + EMAIL.EXPIRE;
            const oneWayHash = new OneWayHashUtil(ONE_WAY_HASH_SECRET);
            const key = oneWayHash.registrationConfirmationHash(email, expiryDate);
            await EMailUtil.sendSignupAccessViaGmail(email, expiryDate, key);
        }

        return user;
    }

    static async verify(email, expiryDate, key) {
        if (expiryDate < Date.now()) throw new ExpiredTokenConfirmError('Expired key is specified.');

        const oneWayHash = new OneWayHashUtil(ONE_WAY_HASH_SECRET);
        const _key = oneWayHash.registrationConfirmationHash(email, expiryDate);
        if (key !== _key) throw new InvalidEmailConfirmError('Invalid key is specified.');

        const update = {verified: true};
        return UsersModel.update({email}, update);
    }

    static async verifyPhone(otp, id) {
        const user = await UsersModel.getByParams({id})
        if (user.otp_code !== otp) throw new InvalidOtpConfirmError('Invalid otp.');
        const update = {verified: true};
        return UsersModel.update({id}, update);
    }

    static async changePassword(currentUserId, oldPassword, newPassword) {
        const user = await UsersModel.getByParams({id: currentUserId});
        if (!CryptoUtil.isValidPassword(oldPassword, user.password)) {
            throw new InputValidationError('Invalid password');
        }
        const update = {password: CryptoUtil.createHash(newPassword)};
        return UsersModel.update({id: currentUserId}, update);
    }

    static async resetPassword(email, key, expiryDate, password) {
        if (expiryDate < Date.now()) throw new ExpiredTokenConfirmError('Expired key is specified.');

        const oneWayHash = new OneWayHashUtil(ONE_WAY_HASH_SECRET);
        const _key = oneWayHash.registrationConfirmationHash(email, expiryDate);
        if (key !== _key) throw new InvalidEmailConfirmError('Invalid key is specified.');

        const update = {password: CryptoUtil.createHash(password)};
        return UsersModel.update({email}, update);
    }

    static async forgotPassword(email) {
        const user = await UsersModel.getByParams({email});
        if (!user) throw new ResourceNotFoundError();

        // Send Email
        const expiryDate = Date.now() + EMAIL.EXPIRE;
        const oneWayHash = new OneWayHashUtil(ONE_WAY_HASH_SECRET);
        const key = oneWayHash.forgotPasswordHash(email, expiryDate);

        return EMailUtil.sendForgotPasswordViaGmail(email, expiryDate, key);
    }

    static getCurrentUser(id) {
        return UsersModel.getByParams({id});
    }
}
