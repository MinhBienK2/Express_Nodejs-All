const mongoose = require('mongoose')
const requestParamsProductId = require('../../controllers/cart.controller')
// require('../db/mongoose')



const cartSchema = new mongoose.Schema({
    sessionId : {
        type: String,
        // require : true,
        unique : true
    },
    cart : [
        {
            count : Number,
            productId : {
                type : String ,
                ref : 'products'
            }
        }
    ]
})

module.exports =mongoose.model('carts',cartSchema);