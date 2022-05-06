const express = require('express');
const router = express.Router();
const {viewController,authController} = require('../../controllers')
const {protect,restrictTo,isLoggedIn} = require('../../middlewares/auth.middleware')


router
    .route('/signup')
    .get(viewController.getSignup)

router
    .route('/login')
    .get(viewController.getLogin)

router.use(isLoggedIn)
router
    .route('/')
    .get(viewController.getAllPosts)




// router.use(protect)

// router 
//     .route('/')
//     .get(restrictTo('admin'),userController.getAllUsers)
//     .post(restrictTo('admin'),userController.createUser)

// router
//     .route('/:id')
//     .get(restrictTo('user'),userController.getUser)
//     .patch(restrictTo('user'),userController.updateUser)
//     .delete(restrictTo('admin'),userController.deleteUser)

module.exports = router;