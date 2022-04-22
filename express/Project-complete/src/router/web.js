import express from 'express';
let router = express.Router()

import {homeWeb} from '../controllers/home.controller'

let initWebRoutes = (app) => {
    router.get('/',homeWeb)

    return app.use('/',router)
}

module.exports = initWebRoutes