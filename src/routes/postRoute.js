const express = require("express");
const { TokenVerfication, PostBodyValidation } = require("../middleware/validation");
const { GetAllPost, GetSinglePost, DeletePost, CreatePost, PopulatePostDatabase } = require("../controller/postController");
const postRoute = express.Router();

postRoute.get("/find", TokenVerfication, async (req, res) => {
    const posts = await GetAllPost();

    res.status(posts.statusCode).json({ posts });
});

postRoute.get("/find/:postId", TokenVerfication, async (req, res) => {
    const postId = req.params.postId;

    const response = await GetSinglePost(postId);

    res.status(response.statusCode).json({
        response
    })
});

postRoute.post("/add", TokenVerfication, PostBodyValidation, async (req, res) => {
    const user = req.user;

    const { Article, Image, Title } = req.body;

    const response = await CreatePost(user.userId, Article, Image, Title);

    res.status(response.statusCode).json({
        response
    });
});

postRoute.delete("/delete/:postId", TokenVerfication, async (req, res) => {
    const postId = req.params.postId;

    const response = await DeletePost(postId);

    res.status(response.statusCode).json({
        response
    });
});

postRoute.get("/populate", async (req, res) => {
    const data = await PopulatePostDatabase();

    res.status(data.statusCode).json({
        data
    })
})

module.exports = postRoute;