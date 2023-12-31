const ERRORS_NAME = [
    'ExpiredEmailConfirmError',
    'ExpiredTokenConfirmError',
    'ConflictError',
    'Forbidden',
    'PermissionError',
    'InputValidationError',
    'InvalidEmailConfirmError',
    'InvalidOtpConfirmError',
    'InvalidPasswordError',
    'MicroserviceError',
    'UnauthorizedError',
    'ResourceNotFoundError',
    'UniqueViolationError'
];

const ErrorsUtil = ERRORS_NAME.reduce((acc, className) => {
    acc[className] = (class extends Error {
            constructor(msg, status) {
                super();
                this.message = msg;
                this.status = status;
                this.name = className;
            }
    });
    return acc;
}, {});
export default ErrorsUtil;
