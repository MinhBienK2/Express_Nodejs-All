const router = require('express').Router({ mergeParams:true})
const {getAllReviews,getReview,createReview,deleteReview,updateReview,setTourUserIds} = require('../../controllers/review.controller')
const {protect,restrictTo} = require('../../controllers/auth.controller')

router.use(protect)

router
    .route('/')
        .get(getAllReviews)
        .post(
            restrictTo('user'),
            setTourUserIds,
            createReview
        )

router
    .route('/:id')
    .get(getReview)
    .patch(restrictTo('user','admin'),updateReview)
    .delete(restrictTo('user','admin'),deleteReview)

module.exports = router 