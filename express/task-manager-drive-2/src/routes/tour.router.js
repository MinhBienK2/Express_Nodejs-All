const router = require('express').Router()
const {createTour,getTourById,filterTours,getTourStats,getMonthlyPlan} = require('../../controllers/tour.controller')

router.get('/',filterTours)
router.get('/stats',getTourStats)
router.get('/monthlyPlan/:year',getMonthlyPlan)
router.post('/tours',createTour)
router.post('/tours/:id',getTourById)

module.exports = router