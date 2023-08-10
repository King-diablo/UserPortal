require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Product = require('../model/productModel');

async function CreateProduct(userId, Article, Image, Title, Price) {
    const productId = uuidv4();

    const newProduct = new Product({
        productId,
        userId,
        Article,
        Image,
        Title,
        Price: parseInt(Price),
    });

    const result = await newProduct.save();

    if (result) {
        return {
            statusCode: 201,
            message: "product created successfuly",
            result
        }
    }
}

async function GetAllProduct() {
    const products = await Product.find({});

    if (products.length <= 0) {
        return {
            statusCode: 200,
            message: "no product avaliable",
            products
        }
    } else {
        //console.log(products);
        return {
            statusCode: 200,
            products
        };
    }

}

async function GetSingleProduct(productId) {

    const product = await Product.findOne({ productId: productId });

    console.log(product);

    if (product === null) {
        return {
            statusCode: 400,
            message: "product not found"
        }
    } else {
        return {
            statusCode: 200,
            message: "product found",
            product
        }
    }
}

async function DeleteProduct(productId) {
    const currentProduct = await Product.findOneAndDelete({ productId });

    //console.log(currentProduct);

    if (currentProduct === null) {
        return {
            statusCode: 400,
            message: "product does not exist"
        }
    } else {
        return {
            statusCode: 200,
            message: "product deleted successfuly",
        };
    }

}

module.exports = {
    CreateProduct,
    DeleteProduct,
    GetAllProduct,
    GetSingleProduct
}