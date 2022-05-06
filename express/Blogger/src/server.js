if (process.env.NODE_ENV === "development") {
    const dotenv = require("dotenv");
    dotenv.config();
    console.log(process.env.NODE_ENV);
}

const express = require('express')
const cors = require('cors')

const connectDB = require('./config/database')
const configViewEngine = require('./config/viewEngine')
import handleError from './middlewares/error.middleware'
import ApiError from './utils/ApiError'
import {reviewRoute,postRoute,userRoute,categoryRoute,viewRoute} from './routes/v1'

const app = express()
const port = process.env.PORT || 3000
connectDB()

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
