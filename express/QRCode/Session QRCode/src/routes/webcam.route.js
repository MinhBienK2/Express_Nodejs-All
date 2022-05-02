const express = require('express')
const router = express.Router()
const {webcamController} = require('../controllers')

router
    .route('/webcam')
    .get(webcamController)

module.exports = router