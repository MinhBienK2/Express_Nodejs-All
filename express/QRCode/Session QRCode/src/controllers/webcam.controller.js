const catchAsync = require("../utils/catchAsync");
const { StudentInfo } = require("../models");

const webcamController = catchAsync(async (req, res, next) => {
  
  const students = await StudentInfo.find();
  res.render('webcam',{
    students
  })
});

module.exports = webcamController;
