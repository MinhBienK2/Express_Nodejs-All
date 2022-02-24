const mongoose = require('mongoose')


const db = process.env.DATABASE.replace('<password>', `${process.env.DATABASE_PASSWORD}`)
module.exports = mongoose.connect(db)
    .then(() => console.log('DB connection successful'))
    .catch(err => console.error(err))