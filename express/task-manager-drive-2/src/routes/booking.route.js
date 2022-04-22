const router = require('express').Router()
const {protect,restrictTo} = require('../../controllers/auth.controller')
const {checkoutSessions} = require('../../controllers/booking.controller')

router
    .route('/checkout-session/:tourId')
    .get(protect,checkoutSessions)

module.exports = router 