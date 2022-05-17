var express = require('express');
var router = express.Router();
const {createPaymentUrl,vnpayIpn,vnpayReturn,createOrder} = require('../controllers/vnpay.controller');

router.get('/create-order', createOrder);

/* GET users listing. */
router.post('/create_payment_url',createPaymentUrl);

router.get('/vnpay_ipn', vnpayIpn);

router.get('/vnpay_return',vnpayReturn);

module.exports = router;
