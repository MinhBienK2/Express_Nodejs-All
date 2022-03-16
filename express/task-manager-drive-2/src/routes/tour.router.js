const router = require('express').Router()
const {getAllTours,getTour,createTour,updateTour,deleteTour,filterTours,getTourStats,getMonthlyPlan,getTourWithin,getDistances} = require('../../controllers/tour.controller')
const {protect,restrictTo} = require('../../controllers/auth.controller')
const reviewRouter = require('./review.router')

router.use('/:tourId/reviews',reviewRouter)

router.get('/tour-stats',protect,getTourStats)
router.get('/monthly-plan/:year',protect,restrictTo('admin,guide,lead-guide'),getMonthlyPlan)
router
    .route('/tours-within/:distance/center/:latLng/unit/:unit')
    .get(getTourWithin)
router
    .route('/distances/:latlng/unit/:unit')
    .get(getDistances)

router
    .route('/')
    .get(getAllTours)
    .post(protect,restrictTo('admin' , 'lead-guide'),createTour)

router
    .route('/:id')
    .get(getTour)
    .patch(protect,restrictTo('admin','lead-guide'),updateTour)
    .delete(protect,restrictTo('admin','lead-guide'),deleteTour)

// POST /tours/:id/reviews
// GET /tours/:id/reviews
// GET /tours/:id/reviews/:reviewId
// PUT /tours/:id/reviews/:reviewId
module.exports = router 