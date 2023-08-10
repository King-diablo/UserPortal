require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const Post = require('../model/postModel');

async function GetAllPost() {
    const posts = await Post.find({});

    if (posts.length <= 0) {
        return {
            statusCode: 200,
            message: "no post(s) avaliable",
            posts
        }
    } else {
        return {
            statusCode: 200,
            message: "post(s) found",
            posts
        }
    }
}

async function GetSinglePost(postId) {
    const post = await Post.findOne({ postId });

    if (post === null) {
        return {
            statusCode: 400,
            message: "post not found",
        }
    } else {
        return {
            statusCode: 200,
            message: "post found",
            post
        }
    }
}

async function CreatePost(userId, Article, Image, Title) {
    const postId = uuidv4();
    const newPost = new Post({
        postId,
        userId,
        Article,
        Image,
        Title
    })

    const post = await newPost.save();

    if (post) {
        return {
            statusCode: 201,
            message: "product created successfuly",
            post
        }
    }
}

async function DeletePost(postId) {
    const post = await Post.findOneAndDelete({ postId });

    console.log(post);

    if (post === null) {
        return {
            statusCode: 400,
            message: "post does not exist"
        }
    } else {
        return {
            statusCode: 200,
            message: "post deleted successfuly",
        };
    }
}

module.exports = {
    GetAllPost,
    GetSinglePost,
    CreatePost,
    DeletePost,
}