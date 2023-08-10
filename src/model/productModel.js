const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    Article: {
        type: String,
    },
    Image: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
});

const Product = new mongoose.model("product", productSchema);

module.exports = Product;