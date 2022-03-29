const express = require('express');
const dotenv = require('dotenv');
var morgan = require('morgan')
const path = require('path');
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const AppError = require('./utils/appError');
const handleError = require('./controllers/handleError.controller');

const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const urlShortRouter = require('./routes/urlShort.route');
const viewRouter = require('./routes/view.route')

dotenv.config({ path : './config/config.env'})
require('./db/database');
const app = express()
const port = process.env.PORT || 3000

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'))
}
console.log(process.env.NODE_ENV)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'))

app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/urlShorts',urlShortRouter)
app.use('/',viewRouter)



app.all('*',(req, res, next)=> {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(handleError)
app.listen(port)
