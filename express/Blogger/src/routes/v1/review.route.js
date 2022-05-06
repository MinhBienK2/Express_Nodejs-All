const express = require('express');
const router = express.Router();
const {reviewController} = require('../../controllers')
const {protect,restrictTo} = require('../../middlewares/auth.middleware')

router 
    .route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview)

module.exports = router;