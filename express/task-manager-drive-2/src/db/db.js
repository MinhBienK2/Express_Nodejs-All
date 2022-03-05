const mongoose = require('mongoose')

const db = process.env.DATABASE.replace('<password>',`${process.env.DATABASE_PASSWORD}`)
module.exports = mongoose
    .connect(db,{
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful'))

