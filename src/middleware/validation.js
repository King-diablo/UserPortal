var expressValidations = require('express-validations');

const { EmailAndPasswordValidation, SendStatus, VerfyToken } = require("../helper/helpers");

function signUpValidation(req, res, next) {

    const { Name, Email, Gender, password } = req.body;

    if (!expressValidations.isValidFirstname(Name)) {
        const response = SendStatus(400, "invalid firstName");

        return res.status(response.statusCode).json({
            response
        })
    }

    const response = EmailAndPasswordValidation(Email, password);

    if (response) {
        return res.status(response.statusCode).json({
            response
        })
    }

    next();
}

function TokenVerfication(req, res, next) {
    const token = req.headers.authorization;

    const user = VerfyToken(token);

    if (!user.email) {
        console.log("invalid");
        return res.status(409).json({
            message: "invalid token"
        });
    }

    if (user.email) {
        req.user = user;
        next();
        return;
    }
}

module.exports = {
    signUpValidation,
    TokenVerfication
}