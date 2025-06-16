const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/commentsController');

router.post('/:id', ctrl.commentOnReview);

module.exports = router;