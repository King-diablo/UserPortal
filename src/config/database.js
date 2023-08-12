require('dotenv').config();
const mongoose = require("mongoose");


const url = process.env.DATABASE_MAIN_URL;
const connectionString = url;

const openDatabase = mongoose.connect(connectionString).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.log(error);
})


module.exports = { openDatabase };