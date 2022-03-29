const router = require('express').Router()
const {signup,login,logout,forgotPassword,resetPassword,protect,restrictTo,updateMyPassword,} = require('../../controllers/auth.controller')
const {getAllUsers,getUser,getMe,createUser,updateMe,updateUser,deleteMe,deleteUser,uploadFile,upload,resizeUserPhoto} = require('../../controllers/user.controller')

router.post('/upload',protect,upload.single('photo'),resizeUserPhoto,uploadFile)

router.post('/singUp',signup)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.patch('/resetPassword/:token',resetPassword)

router.get('/logout',logout)

// set router private user (only login can access)
router.use(protect)

router.patch('/updateMyPassword',protect,updateMyPassword)

router.get('/me',getMe,getUser)
router.patch('/updateMe',updateMe)
router.delete('/deleteMe',deleteMe)

// show admin can access
router.use(restrictTo('admin'))

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)   

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router
