const router = require('express').Router();
const User = require('../models/user.model');
const {login,forgetPassword,resetPassword} = require('../controllers/auth.controller');
const {protect,reStrictTo} = require('../middlewares/auth.middleware');
const {createUser, deleteUser, getAllUsers, getUser, updateUser,getAgeOfUser} = require('../controllers/user.controller');
const {getLogin} = require('../controllers/view.controller')



router
    .route('/forgetPassword')
    .post(forgetPassword)

router
    .route('/resetPassword/:token')
    .patch(resetPassword)

router
    .route('/login')
    .get(getLogin)
    .post(login)

router
    .route('/')
    .get(protect,reStrictTo('admin'),getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(protect,getUser)
    .patch(protect,updateUser)
    .delete(protect,reStrictTo('admin'),deleteUser)


module.exports = router;