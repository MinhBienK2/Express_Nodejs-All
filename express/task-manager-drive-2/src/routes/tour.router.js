const router = require('express').Router()
const {createTour,getTourById,deleteTour,filterTours,getTourStats,getMonthlyPlan} = require('../../controllers/tour.controller')
const {project,restrictTo} = require('../../controllers/auth.controller')

router.get('/',project,filterTours)
router.get('/stats',project,getTourStats)
router.get('/monthlyPlan/:year',project,getMonthlyPlan)
router
    .route('/tours')
    .post(project,createTour)
router
    .route('/tours/:id')
    .post(project,getTourById)
    .delete(project,restrictTo('admin','lead-guide'),deleteTour)

module.exports = router 