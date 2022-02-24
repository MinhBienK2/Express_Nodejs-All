const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

// const connectDB=require('./src/db/mongoose')
require('./src/db/mongoose')

const userRouter = require('./routers/user.route.js')
const authRouter = require('./routers/auth.route.js')
const productRouter = require('./routers/product.router')
const cartRouter = require('./routers/cart.router')

const homepage = require('./controllers/home.controller')
const userControllers = require('./controllers/use.controller')
const authControllers = require('./controllers/auth.controller')
const checkAuthLogin = require('./check/auth.checkLogin')
const productControllers = require('./controllers/product.controller')
const sesstionMiddleware = require('./middlewares/session.middleware')
const app = express()

const pathTemplate = path.join(__dirname, './template/views')
const port = process.env.PORT || 3000


app.use(cookieParser('dsfjiddsoie23$kjfsi34@sa'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(sesstionMiddleware)

//connect DB
// connectDB();

// set views
app.set('view engine', 'pug')
app.set('views',pathTemplate)


app.get('/',homepage.pageHome)
app.get('/user',checkAuthLogin.checkLogin,userControllers.user)
// app.get('/product',productControllers.product)

app.use('/auth',authRouter)
app.use('/user',checkAuthLogin.checkLogin,userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)


app.listen(port, ()=> {
    console.log('----=======================------------')
})