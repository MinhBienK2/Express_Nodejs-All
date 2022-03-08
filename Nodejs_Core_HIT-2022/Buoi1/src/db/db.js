const mongoose = require('mongoose')


const db = process.env.DATABASE.replace('<password>', `${process.env.DATABASE_PASSWORD}`) || process.env.DATABASE_LOCAL
module.exports = mongoose.connect(db)
    .then(() => console.log('DB connection successful'))
    .catch(err => console.error(err))