const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    title: String,
    img: String,
    overview: String,
    release: String,
    movieId: String,
});

module.exports = mongoose.model('Favorite', favoriteSchema);