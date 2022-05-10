if (process.env.NODE_ENV === "development") {
    const dotenv = require("dotenv");
    dotenv.config();
    console.log(process.env.NODE_ENV);
}

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const session = require('express-session');

const connectDB = require('./config/database')
const configViewEngine = require('./config/viewEngine')
import handleError from './middlewares/error.middleware'
import ApiError from './utils/ApiError'
import {reviewRoute,postRoute,userRoute,categoryRoute,viewRoute} from './routes/v1'

const app = express()
connectDB()

app.enable('trust proxy');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

const port = process.env.PORT || 3000

// cors middleware
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    // CrossOriginEmbedderPolicy: require-corp
 }
//  app.use(cors(corsOptions)) // Use this after the variable declaration

//config View Engine
configViewEngine(app)

app.use('/api/v1/users',userRoute)
app.use('/api/v1/posts',postRoute)
app.use('/api/v1/reviews',reviewRoute)
app.use('/api/v1/categories',categoryRoute)
app.use('/',viewRoute)



// middlewares found
app.all('*', (req, res, next) => {
    next(new ApiError('Not Found', 404))
})

//handle errors
app.use(handleError)

app.listen(port,() => {
    console.log('Server is running on port ' + port)
})
