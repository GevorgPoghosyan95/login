import { ErrorsUtil } from '../utils';

const { Forbidden } = ErrorsUtil;

export default function permit(...allowed) {
    const isAllowed = (role) => allowed.indexOf(role) > -1;
    return (req, res, next) => {
        if (req.user && isAllowed(req.user.role)) {
            next();
        } else {
            throw new Forbidden();
        }
    };
}