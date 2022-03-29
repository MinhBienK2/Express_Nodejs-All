const router = require('express').Router();
const User = require('../models/user.model');

const {overViews,login,getLogin} = require('../controllers/view.controller')
const {protect,reStrictTo} = require('../middlewares/auth.middleware');

router
    .route('/')
    .get(protect,overViews)


module.exports = router