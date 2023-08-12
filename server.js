require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const { openDatabase } = require("./src/config/database");
const { createUser, findUser } = require("./src/controller/userController");
const { signUpValidation } = require("./src/middleware/validation");
const { CreateToken } = require("./src/helper/helpers");

const productRoute = require("./src/routes/productRoute");
const postRoute = require("./src/routes/postRoute");
const jobRoute = require("./src/routes/jobRoute");
const app = express();

const port = process.env.PORT;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

//#region DatabaseConnection

app.get("/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/22983759/2s9Xy3tC1D");
})
openDatabase
//#endregion

app.post("/api/auth", signUpValidation, async (req, res) => {
    const { Name, Email, Gender, password } = req.body;

    const result = await createUser(Name, Email, Gender, password);

    const token = CreateToken(Email, result.userId);

    res.status(result.statusCode).json({
        result,
        token
    });
})
app.post("/api/login", async (req, res) => {
    const { Email, password } = req.body;


    const result = await findUser(Email, password);


    if (result.statusCode !== 200) {
        res.status(result.statusCode).json({
            statusCode: result.statusCode,
            message: result.message,
        })
    }

    console.log(result);

    const token = CreateToken(Email, result.user.userId);

    if (result) {
        res.status(result.statusCode).json({
            result,
            token
        })
    }
});

//#region Routes

app.use("/api/product", productRoute);
app.use("/api/post", postRoute);
app.use("/api/job", jobRoute);

//#endregion

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});