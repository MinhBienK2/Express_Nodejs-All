import express from 'express';
import bodyParser from "body-parser"
import connectDB from './config/connectDB';

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000

connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

import viewEngine from "./config/viewEngine"
import initWebRoutes from './router/web'


viewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
