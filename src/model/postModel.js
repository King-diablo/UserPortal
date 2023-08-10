const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    Article: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    }
});

const Post = new mongoose.model("post", postSchema);

module.exports = Post;
