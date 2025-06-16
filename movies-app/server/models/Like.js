const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    title: String,
    img: String,
    release: String,
    review: String,
    comments: [{
        user: String,
        comment: String
    }],
    likes: Number,
    reviewId: String
})

module.exports = mongoose.model('Like', LikesSchema);