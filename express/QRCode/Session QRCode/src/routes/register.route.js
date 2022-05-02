const express = require('express')
const router = express.Router()
const {getRegisterController,registerController} = require('../controllers')

router
    .route('/register')
    .get(getRegisterController)
    .post(registerController)

module.exports = router