const router = require('express').Router()
const {signup,login} = require('../../controllers/auth.controller')
const {allUsers} = require('../../controllers/user.controller')

router.get('/',allUsers)
router.post('/singup',signup)
router.post('/login',login)

module.exports = router
