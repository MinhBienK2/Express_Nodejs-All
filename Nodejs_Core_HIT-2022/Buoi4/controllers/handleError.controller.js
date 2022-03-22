const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');

const handleFunctionError = (error,message,statusCode) => {
    return new AppError(message,statusCode)
}

const handleValidationErrorDB = (error) =>{
    const message = 'validation Error : ' + Object.values(error.errors).map(el => el.message).join(' -.- ')
    return new AppError(message,400)
}

const sendErrorDevelopment = (err,res) => {
    // console.log(err.statusCode)
    res.status(err.statusCode).json({
        statusCode : err.statusCode,
        status : err.status,
        err : err,
        message : err.message,
        stack : err.stack
    })
}

const sendErrorProduction = (err,res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        })
    }else{
        res.status(500).json({
            status : 500,
            message : 'Something went wrong !'
        })
    }
    
}

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.status = err.status ||'error' 
    if(process.env.NODE_ENV ==='development'){  
        sendErrorDevelopment(err,res)
    } 
    else if(process.env.NODE_ENV === 'production'){
        let error = {...err}  
        error.message = err.message //fix bug not found error.mesage
        // error : not login
        if(error.name ==='JsonWebTokenError'){
            error = handleFunctionError(error,'invalid token ! please Login again ! ',401)
        }
        // error : validation error
        if(err.name === 'ValidationError'){
            error = handleValidationErrorDB(error)
        }
        // error duplicate field
        if(err.code === 11000) {
            error = handleFunctionError(error,`Duplicate field value: ${Object.values(error.keyValue)}. Please use another value!`,400)
        }
        //error cast error
        if(err.name ==='CastError'){
            error = handleFunctionError(error,`Invalid ${error.path}: ${error.value}.`,400)
        }
        sendErrorProduction(error,res)
    }
}
