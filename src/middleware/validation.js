var expressValidations = require('express-validations');

const { EmailAndPasswordValidation, SendStatus } = require("../helper/helpers");

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

module.exports = {
    signUpValidation,
}