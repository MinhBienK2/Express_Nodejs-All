const mongoose = require('mongoose')

const db = process.env.DATABASE_MONGO_URL
    .replace('<password>',process.env.PASSWORD_MONGO_URL)
    .replace('<username>',process.env.USERNAME_MONGO_URL)

module.exports = mongoose.connect(db)
    .then(data => {
        console.log('connect database success')
    })
    .catch(err => console.error(err))