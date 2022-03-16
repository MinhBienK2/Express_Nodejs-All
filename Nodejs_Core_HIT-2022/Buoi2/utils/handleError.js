const AppError = require('./AppError')
const handleError = (err,req,res,next) =>{
    console.log(err.statusCode)
    console.log(err)
     res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    })
}

module.exports = handleError 