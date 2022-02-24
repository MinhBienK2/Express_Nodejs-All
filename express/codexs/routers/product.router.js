const express = require('express')
const router = express.Router()

const productControllers = require('../controllers/product.controller')

router.get('/',productControllers.product)

module.exports = router
