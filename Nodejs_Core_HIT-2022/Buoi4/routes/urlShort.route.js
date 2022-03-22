const router = require('express').Router();
const {protect,reStrictTo} = require('../middlewares/auth.middleware');
const {getUrlShort,sendUrlRoot,AllUrlShort} = require('../controllers/urlShort.controller');

router 
    .route('/')
    .get(AllUrlShort)

router
    .route('/:short')
    .get(getUrlShort)

router
    .route('/')
    .post(protect,sendUrlRoot)

module.exports = router;
