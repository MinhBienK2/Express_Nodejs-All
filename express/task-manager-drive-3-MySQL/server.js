const express = require('express')
const app = express()
const port = 3000
const Path = require('./utils/Path')

const db = require('./models')
const {insertInto} = require('./controllers/insertInto.controller')

const Product = db.product
const User  = db.user

app.use(async (req,res,next) => {
    try {
        const user = await User.findOne({
            where: {
                id : '176e2204-4174-4ef2-a39e-3622a08c4e3f'
            }
        })
        req.user = user
        next()
    }catch(err) {
        console.log(err)
    }
})

db.sequelize
    .sync({
        // force:true
    }) 
    // .then( result => {
    //     return U
    // })

app.use(express.json())

app.get('/',async (req, res) =>{
    const product = req.user.createProduct({
        name: 'ab',  
        price: 12,
        userId : req.user.id
    })
    // console.log(req.user)
    // const user = await User.create({
    //     username: 'test123',
    //     email: 'pham1@gmail.com',
    //     password: '123456'
    // })
    // const product = await Product.create({
    //     name: 'ab',  
    //     price: 12,
    // })
    // console.log(product)
    res.json({
        product
    })
})

// app.post('/insert',insertInto)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
