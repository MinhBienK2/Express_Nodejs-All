const mongoose = require('mongoose')

const mogodb = process.env.MONGODB_DATABASE
    .replace(`<username>`,process.env.MONGODB_USERNAME)
    .replace(`<password>`,process.env.MONGODB_PASSWORD)

const connectDB =() => {
    mongoose.connect(mogodb, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log('connect database successfully');
        })
        .catch(err =>{
            console.log(err)
        })
}

module.exports = connectDB