const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const userRouter = require('./src/routes/user.router');
const tourRouter = require('./src/routes/tour.router');

const AppError = require('./utils/appError');
const errorHandler = require('./controllers/error.controller');

process.on('uncaughtUnexception', err => {
    console.log(err.name, err.message)
    console.log('uncaughtUnexception ', 'shutdowning ...')
    process.exit(1)  
})

dotenv.config({path : './config.env'})
require('./src/db/db')
const app = express();
const port = process.env.PORT || 3000


const Tour = require('./src/models/tour')

app.use(express.json())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

console.log(process.env.NODE_ENV)

app.use('/users',userRouter)
app.use('/',tourRouter)

app.all('*',(req,res,next)=>{
    // const err = new Error (`Can not find ${req.originalUrl} on this server ! `)
    // err.status = 'fail'
    // err.statusCode = 404
    // next(err)

    // res.status(404).json({
    //     status : 'fail',
    //     message : 'Page not found'
    // })

    next(new AppError(`Can not find ${req.originalUrl} on this server ! `,404))
})

app.use(errorHandler)
const server = app.listen(port,()=>{
    console.log('......................')
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('unhandledRejection ', 'shutdowning ...')
     server.close(() => {
         process.exit(1)
     })   
})
