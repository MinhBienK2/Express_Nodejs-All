const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit') 
const helmet = require('helmet') 
const path = require('path')
const mongoSanitize = require('express-mongo-sanitize');    // against NoSQL injection
const xss = require('xss-clean')   // against XSS injection
const hpp = require('hpp')  // prevent http param pollution
const cors=require("cors")  // cross origin resource sharing

const userRouter = require('./src/routes/user.router');
const tourRouter = require('./src/routes/tour.router');
const reviewRouter = require('./src/routes/review.router');
const viewsRouter = require('./src/routes/views.route');

const AppError = require('./utils/appError');
const errorHandler = require('./controllers/error.controller');
const {project} = require('./controllers/auth.controller');

dotenv.config({path : './config.env'})
require('./src/db/db')
const app = express();
const port = process.env.PORT || 3000

// development logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
console.log(process.env.NODE_ENV)

// set security HTTP headers
app.use(helmet({
    contentSecurityPolicy: false,
    // referrerPolicy: { policy: "no-referrer" }
}))


// limit request from same API
const limiter = rateLimit({
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	windowMs: 60 * 60 * 1000, // 15 minutes
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again in an hour!'
})
app.use(limiter)

// body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

// set data sanitization against NoSQL query injection
app.use(mongoSanitize());
// set data sanitization against XSS
app.use(xss())
// prevent http param pollution
app.use(hpp({
    // allow list of http params to be passed
    whitelist: [
        'duration', 
        'ratingsQuantity', 
        'ratingsAverage', 
        'maxGroupSize', 
        'difficulty', 
        'price',
        'quantity'
    ]
}))

// serving static files
app.use(express.static(path.join(__dirname, "public")))

// pug template engine
// app.set('view engine','pug')
// app.set('views',path.join(__dirname, 'views/pug'))

// ejs template engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views/ejs'))


// cors middleware
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions)) // Use this after the variable declaration

// views router
app.use('/',viewsRouter)
// mount routers
app.use('/users',userRouter)
app.use('/tours',tourRouter)
app.use('/reviews',reviewRouter)

app.all('*',(req,res,next)=>{
    next(new AppError(`Can not find ${req.originalUrl} on this server ! `,404))
})


app.use(errorHandler)
const server = app.listen(port,()=>{
    console.log('......................')
})

process.on('uncaughtUnexception', err => {
    console.log(err.name, err.message)
    console.log('uncaughtUnexception ', 'shutdowning ...')
    process.exit(1)  
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('unhandledRejection ', 'shutdowning ...')
     server.close(() => {
         process.exit(1)
     })   
})
