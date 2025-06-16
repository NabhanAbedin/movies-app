const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/favoritesController');

router.post('/', ctrl.makeFavorite);

router.delete('/', ctrl.removeFavorite);

router.get('/', ctrl.getFavorites);

module.exports = router;