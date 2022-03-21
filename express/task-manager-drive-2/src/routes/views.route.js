const router = require('express').Router()
const {overTours,login} = require('../../controllers/views.controller')

router
    .route('/overViews')
    .get(overTours)

router 
    .route('/login')
    .get(login)
    .post(login)
    
module.exports = router