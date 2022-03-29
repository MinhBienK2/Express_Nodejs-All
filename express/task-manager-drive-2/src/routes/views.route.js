const router = require('express').Router()
const {overViews,login,overTours} = require('../../controllers/views.controller')
const {protect,restrictTo,isLoggedIn} = require('../../controllers/auth.controller')

router.use(isLoggedIn)

router
    .route('/')
    .get(overViews)

router 
    .route('/overTours')
    .get(overTours)

router 
    .route('/login')
    .get(login)
    .post(login)
    
module.exports = router