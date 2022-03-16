const router = require('express').Router();
const User = require('../models/user.model');
const {login} = require('../controllers/auth.controller');
const {protect,reStrictTo} = require('../middlewares/auth.middleware');
const {createUser, deleteUser, getAllUsers, getUser, updateUser,getAgeOfUser} = require('../controllers/user.controller');



router
    .route('/login')
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