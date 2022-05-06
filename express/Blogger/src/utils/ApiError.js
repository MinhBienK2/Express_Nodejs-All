class ApiError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        Error.captureStackTrace(this,this.constructor)
        // if (stack) {
        //     this.stack = stack;
        // } else {
        //     Error.captureStackTrace(this, this.constructor);
        // }
    }
}

module.exports = ApiError;