const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path : './config.env'})

const app = express();
const port = process.env.PORT || 3000

const db = process.env.DATABASE.replace('<password>',`${process.env.DATABASE_PASSWORD}`)
mongoose
    .connect(db,{
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful'))

const userSchema = new mongoose.Schema({
    username: {
        type : String ,
        required : true,
        unique : true,
    },
    password: {
        type : String ,
        required : true,
    }
})

const User = mongoose.model('Users',userSchema)

// const createUser = new User({
//     username : 'bineminipham',
//     password : '123456'
// })

// createUser
//     .save()
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

app.use(morgan('dev'))

app.get('/', (req, res) =>{
    // const object = {...req.query}
    const queryObject = req.query
    const excludedField = ['page','limit' ,'sort' ,'fields' ]
    excludedField.forEach(el => {
        delete queryObject[el]
    })
    let queryStr = JSON.stringify(queryObject)
    console.log(queryObject)
    console.log(queryStr)
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log('......................')
})