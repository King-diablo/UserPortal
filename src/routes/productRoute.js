const express = require("express");
const { TokenVerfication, ProductBodyValidation } = require("../middleware/validation");
const { CreateProduct, DeleteProduct, GetAllProduct, GetSingleProduct } = require("../controller/productController");
const productRoute = express.Router();


productRoute.get("/fetch", TokenVerfication, async (req, res) => {
    const response = await GetAllProduct();

    res.status(response.statusCode).json({ response });
});

productRoute.get("/fetch/:productId", TokenVerfication, async (req, res) => {
    const productId = req.params.productId;

    const product = await GetSingleProduct(productId);

    res.status(product.statusCode).json({ product });
});

productRoute.post("/add", TokenVerfication, ProductBodyValidation, async (req, res) => {
    const user = req.user;

    const { Article, Image, Title, Price } = req.body;

    const product = await CreateProduct(user.userId, Article, Image, Title, Price);

    res.status(product.statusCode).json({ product });
});

productRoute.delete("/delete/:productId", TokenVerfication, async (req, res) => {
    const productId = req.params.productId;

    const product = await DeleteProduct(productId);

    res.status(product.statusCode).json({ product })
});

module.exports = productRoute;