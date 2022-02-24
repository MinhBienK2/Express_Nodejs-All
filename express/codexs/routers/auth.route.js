const express = require('express')
const cookieParser = require('cookie-parser')
const router = express.Router()
router.use(cookieParser())

const User = require('../src/model/user.js')
const controllers = require('../controllers/auth.controller')

router.get('/login',controllers.login)

router.post('/login', controllers.postLogin)

module.exports = router