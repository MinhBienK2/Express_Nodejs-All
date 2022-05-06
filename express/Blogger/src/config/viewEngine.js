import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
var cookieParser = require('cookie-parser')

const configViewEngine = (app) => {
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname,'../views'));
    app.use(express.static(path.join(__dirname,'../public')))

}

module.exports = configViewEngine