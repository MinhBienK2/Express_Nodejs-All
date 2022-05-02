const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');
const validator = require('validator');
const { StudentInfo } = require("../models");

const handleQrCodeWS = (io) => {
    try{
        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('qrcode',async (encode) => {
                const endcodeQR = JSON.parse(encode)
                if(!validator.isEmail(endcodeQR.email)){
                    socket.emit('errorScan', 'Email is not valid')
                    return
                }
                const existStudent = await StudentInfo.findOne({
                    name : endcodeQR.name,
                    email: endcodeQR.email,
                    className : endcodeQR.className,
                    phoneNumber : endcodeQR.phoneNumber
                })
                if(existStudent){
                    socket.emit('errorScan', 'exist Student')
                    return;
                }
    
                const studentInfo = await StudentInfo.create({
                    name: endcodeQR.name,
                    email: endcodeQR.email,
                    phoneNumber: endcodeQR.phoneNumber,
                    className: endcodeQR.className
                })
                studentInfo.save()
                const students = await StudentInfo.find();
                // console.log(students)
                io.emit('qrcode',JSON.stringify(students))
            })
    
            //disconnect
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        
        });
    }catch(err){
        // console.log(err)
    }
}

module.exports = handleQrCodeWS;
