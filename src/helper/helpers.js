var expressValidations = require('express-validations');

function EmailAndPasswordValidation(Email, password) {
    if (!expressValidations.isValidEmail(Email)) {
        return SendStatus(400, "invalid email");
    }

    if (!expressValidations.isStrongPassword(password)) {
        return SendStatus(400, "weak password");
    }
}

function SendStatus(code, message) {
    return {
        statusCode: code,
        message
    };
}

module.exports = {
    EmailAndPasswordValidation,
    SendStatus
}