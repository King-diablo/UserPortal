require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUND;
const User = require("../model/userModel");

async function createUser(name, email, gender, password) {
    const userId = uuidv4();

    const salt = bcrypt.genSaltSync(+saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
        userId,
        name,
        email,
        gender,
        password: hash,
    });

    try {
        const data = await newUser.save();
        if (data) {
            return {
                statusCode: 201,
                message: "userCreated successfuly",
                data
            }
        }
    } catch (error) {
        return {
            statusCode: 409,
            message: `the info '${error?.keyValue?.email}' already exist`,
            error
        };
    }
}

async function findUser(email, password) {

    const user = await User.findOne({ email });

    if (user === null || user === undefined) {
        return {
            statusCode: 404,
            message: "User Not Found",
        }
    }

    const info = bcrypt.compareSync(password, user.password);

    if (info) {
        return {
            statusCode: 200,
            message: "User found",
            user
        };
    } else {
        return {
            statusCode: 404,
            message: "Incorrect password",
        }
    }
}

module.exports = {
    createUser,
    findUser,
}