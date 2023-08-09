const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { database } = require("./src/config/database");
const { createUser, findUser } = require("./src/controller/userController");
const { signUpValidation } = require("./src/middleware/validation");

const app = express();

const port = 3000;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

/*
Database startup
*/
database


app.post("/api/auth", signUpValidation, async (req, res) => {
    const { Name, Email, Gender, password } = req.body;

    const result = await createUser(Name, Email, Gender, password);

    res.status(result.statusCode).json({
        result
    });
})

app.post("/api/login", async (req, res) => {
    const { Email, password } = req.body;

    const result = await findUser(Email, password);

    if (result) {
        res.status(result.statusCode).json({
            result
        })
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

