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

function ProductBodyValidation(req, res, next) {
    const { Article, Image, Title, Price } = req.body;

    if (!expressValidations.isLength(Article, 4, 20)) {
        return res.status(404).json({
            statusCode: 404,
            message: "Article is too short"
        })
    }

    if (!expressValidations.isLength(Image, 4, 20)) {
        return res.status(404).json({
            statusCode: 404,
            message: "invalid image"
        })
    }

    if (!expressValidations.isLength(Title, 4, 20)) {
        return res.status(404).json({
            statusCode: 404,
            message: "Title is too short"
        })
    }

    if (!expressValidations.isNumeric(Price)) {
        return res.status(404).json({
            statusCode: 404,
            message: "Price must be a number"
        })
    }

    next();
}

function PostBodyValidation(req, res, next) {
    const { Article, Image, Title, Price } = req.body;

    if (!expressValidations.isLength(Article, 4, 20)) {
        return res.status(404).json({
            statusCode: 404,
            message: "Article is too short"
        })
    }

    if (!expressValidations.isLength(Image, 4, 20)) {
        return res.status(404).json({
            statusCode: 404,
            message: "invalid image"
        })
    }

    if (!expressValidations.isLength(Title, 4, 20)) {
        return res.status(404).json({
            statusCode: 404,
            message: "Title is too short"
        })
    }

    next();
}

function JobValidation(req, res, next) {
    const { title, amount, description, workPlaceType, companyInfo, salary, companyLogo, } = req.body;

    if (!expressValidations.isLength(title, 4, 200)) {
        return res.status(404).json({
            statusCode: 404,
            message: "title is invalid"
        });
    }

    if (!expressValidations.isNumeric(amount)) {
        return res.status(404).json({
            statusCode: 404,
            message: "amount is invalid"
        });
    }

    if (!expressValidations.isLength(description, 8, 200)) {
        return res.status(404).json({
            statusCode: 404,
            message: "description is invalid"
        });
    }

    if (!expressValidations.isLength(workPlaceType, 4, 200)) {
        return res.status(404).json({
            statusCode: 404,
            message: "workPlaceType is invalid"
        });
    }

    if (!expressValidations.isLength(companyInfo, 8, 200)) {
        return res.status(404).json({
            statusCode: 404,
            message: "companyinfo is invalid"
        });
    }

    if (!expressValidations.isNumeric(salary)) {
        return res.status(404).json({
            statusCode: 404,
            message: "salary is invalid"
        });
    }

    if (!expressValidations.isLength(companyLogo, 4, 200)) {
        return res.status(404).json({
            statusCode: 404,
            message: "companyLogo is invalid"
        });
    }

    next();
    return;
}

module.exports = {
    signUpValidation,
    TokenVerfication,
    ProductBodyValidation,
    PostBodyValidation,
    JobValidation,
}