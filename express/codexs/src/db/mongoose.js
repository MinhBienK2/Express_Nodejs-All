const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-codersX')


   
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-codersX", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (e) {
//     console.log(e);
//   }
// };

// module.exports = connectDB;