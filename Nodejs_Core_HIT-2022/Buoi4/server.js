const express = require('express');
const dotenv = require('dotenv');
var morgan = require('morgan')

const userRouter = require('./routes/user.route');
// const postRouter = require('./routes/post.route');
const urlShortRouter = require('./routes/urlShort.route');
const AppError = require('./utils/appError');
const handleError = require('./controllers/handleError.controller');

dotenv.config({ path : './config/config.env'})
require('./db/database');
const app = express()
const port = process.env.PORT || 3000

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'))
}
console.log(process.env.NODE_ENV)
app.use(express.json())

app.use('/users',userRouter)
app.use('/urlShorts',urlShortRouter)
// app.use('/posts',postRouter)

app.all('*',(req, res, next)=> {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(handleError)

app.listen(port)