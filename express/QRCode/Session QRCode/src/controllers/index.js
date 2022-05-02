const {getRegisterController,registerController} = require('./register.controller')
const webcamController = require('./webcam.controller')
const handleErrorController = require('./handleError.controller')

module.exports = {
    getRegisterController,
    registerController,
    webcamController,
    handleErrorController
}