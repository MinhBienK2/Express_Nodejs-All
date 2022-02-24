const Product = require('../src/model/product')
// const Cart = require('../src/model/cart')

module.exports.product = async (req, res,next) => {
    try{
        let countNumber = 0
        // const countProducts = await Cart.find({})
        // countProducts.forEach(ele => { 
        //     ele.cart.forEach(e => {
        //         countNumber += parseInt(e.count) 
        //     })
        // });
        // console.log(countProducts)
        const page = req.query.page
        const begin = (parseInt(req.query.page)-1)*10
        const end = begin + 10
        if(!page){
            const products =await (await Product.find({})).slice(0,10)
            res.render('viewProduct/product',{
                products,
                countNumber
            })
            return
        }
        const products =await (await Product.find({})).slice(begin,end)
        res.render('viewProduct/product',{
            products,
            countNumber
        })
    }catch(err) {
        console.log(err)
    }
}
