const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path : './config.env'})

const app = express();

const port = process.env.PORT || 3000

app.use(morgan('dev'))

app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log('......................')
})