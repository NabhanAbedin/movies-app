const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    title: String,
    img: String,
    overview: String,
    release: String
});

module.exports = mongoose.model('Favorite', favoriteSchema);