const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reviewsController');

router.get('/', ctrl.getAll);

router.post('/', ctrl.postReview);

router.get('/:id', ctrl.getReviewById);

module.exports = router;