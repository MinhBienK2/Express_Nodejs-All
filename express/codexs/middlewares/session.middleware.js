const {nanoid} = require('nanoid');
const Cart = require('../src/model/cart')

module.exports = async function(req, res,next){
        if(!req.signedCookies.sessionId){
            const nanoId = nanoid()
            res.cookie('sessionId',nanoId,{
                signed:true
            })
            Cart.create({sessionId : nanoId})
        }
        // const text = await Cart.findOne(
        //     {sessionId : req.signedCookies.sessionId})
        //     .populate({
        //         path : 'cart',
        //         populate : {
        //             path : 'productId'
        //         }
        //     })
        // console.log(text.cart)
        next(); 
}
