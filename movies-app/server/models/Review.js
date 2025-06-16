const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: String,
    img: String,
    release: String,
    review: String,
    comments: [{
        user: String,
        comment: String
    }],
    likes: Number
});

module.exports = mongoose.model('Review', reviewSchema);