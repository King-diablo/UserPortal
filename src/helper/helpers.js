const expressValidations = require('express-validations');
const jwt = require('jsonwebtoken');

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

function CreateToken(email, userId) {
    const payload = {
        email,
        userId
    }
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(payload, secretKey);

    return token;
}

function VerfyToken(token) {
    const secretKey = process.env.SECRET_KEY;

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return error.message;
    }

}

module.exports = {
    EmailAndPasswordValidation,
    SendStatus,
    CreateToken,
    VerfyToken,
}