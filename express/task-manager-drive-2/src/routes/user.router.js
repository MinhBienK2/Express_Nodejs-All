const router = require('express').Router()
const {signup,login,forgotPassword,resetPassword,project,restrictTo,updateMyPassword,updateUser,deleteMe} = require('../../controllers/auth.controller')
const {allUsers} = require('../../controllers/user.controller')

router.get('/',allUsers)
router.post('/singup',signup)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.patch('/resetPassword/:token',resetPassword)
router.patch('/updateMyPassword',project,updateMyPassword)
router.patch('/updateUser',project,updateUser)
router.delete('/deleteMe',project,deleteMe)

module.exports = router
