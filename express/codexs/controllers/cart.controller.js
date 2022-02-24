const Cart = require('../src/model/cart')
module.exports.addToCart = async(req, res)=>{
    const sessionId= req.signedCookies.sessionId;
    const productId= req.params.productId;
    let countNumber = null;
    let isCheck = false
    const countProducts =await Cart.findOne({sessionId});
    countProducts.cart.forEach(ele => { 
        if(ele.productId === productId){
            isCheck = true;
            countNumber = parseInt(ele.count) + 1
            ele.count = countNumber
        }
    });
    if(isCheck){
        countProducts.save()
        res.redirect('/product/')
        return
    }
    await Cart.findOneAndUpdate(
                {sessionId},
                {
                    $push : {
                        cart : {
                            count : 1,
                            productId 
                        }
                    }
                }
            )
    res.redirect('/product/')
    
}
