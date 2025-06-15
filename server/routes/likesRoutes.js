const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/likesController');

router.post('/:id', ctrl.likeReview);

router.delete('/:id', ctrl.unLikeReview);

router.get('/overview/:id', ctrl.overviewLikes);

router.get('/', ctrl.getAll);

module.exports = router;