import ApiError from '../utils/ApiError'

const handleValidationErrorDB = err => {
    const message ='validation Error : ' +  Object.values(err.errors).map(el => el.message).join('. ')
    console.log(message)
    return new ApiError(message,400)
}

const handleDuplicateFieldsDB = err => {
    // console.log(err.keyValue.name)
    const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`
    return new ApiError(message,400)
}

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new ApiError(message,400)
}

const handleJsonWebTokenError = err => {
    const message = 'Invalid token. Please log in again !'
    return new ApiError(message,401)
}

const handleExpiredTokenDB = err => {
    const message = 'your token has expired !'
    return new ApiError(message,401)
}

const sendErrorDevelopment = (err,res)=>{
    console.log(err)
    res.status(err.statusCode).json({
        status : err.status,
        error : err,
        message : err.message,
        stack : err.stack
    })
}

const sendErrorProduction = (err,res)=>{
    // console.log(err)
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        })
    }else {
        res.status(500).json({
            status : 'error',
            message : 'Something went wrong'
        })
    }
}

module.exports = (err,req,res,next)=>{
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500
    err.status = err.status ||'error'   
    if(process.env.NODE_ENV === 'development'){
        sendErrorDevelopment(err,res)
    }else if(process.env.NODE_ENV === 'production'){
        let error = {...err}  
        console.log(err.name)
        // lỗi tìm kiếm trong mongoose
        if(err.name==='CastError')  error = handleCastErrorDB(error)
        // lỗi trùng tên
        if(err.code ===11000) error = handleDuplicateFieldsDB(error)
        //lỗi validation 
        if(err.name ==='ValidationError') error = handleValidationErrorDB(error)
        // error jsonwebtoken - sai token
        if(err.name ==='JsonWebTokenError') error = handleJsonWebTokenError(error)
         // jwt expired
         if(err.name ==='TokenExpiredError') error = handleExpiredTokenDB(error)
        sendErrorProduction(error,res)
    }
}