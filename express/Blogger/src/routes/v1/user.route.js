const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {userController,authController} = require('../../controllers')
const {protect,restrictTo} = require('../../middlewares/auth.middleware')


router
    .route('/signup')
    .post(authController.signup)

router
    .route('/login')
    .post(authController.login)

router
    .route('/logout')
    .get(authController.logout)


router.use(protect)

router 
    .route('/')
    .get(restrictTo('admin'),userController.getAllUsers)
    .post(restrictTo('admin'),userController.createUser)

router
    .route('/:id')
    .get(restrictTo('user'),userController.getUser)
    .patch(restrictTo('user'),userController.updateUser)
    .delete(restrictTo('admin'),userController.deleteUser)

module.exports = router;