const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/searchController');

router.get('/', ctrl.searchMovies);

router.get('/:id', ctrl.searchById);

router.get('/favorites', ctrl.checkFavorited);

module.exports = router;