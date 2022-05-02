const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const path = require('path')
const http = require('http');
const QRCode = require('qrcode');
var bodyParser = require('body-parser')

var toSJIS = require('qrcode/helper/to-sjis')
const connectDB = require('./config/database')
const {registerRoute,webcamRoute} = require('./routes')
const ApiError = require('./utils/ApiError')
const {handleErrorController} = require('./controllers')
const handleQrCodeWS = require('./services/handleQrCodeWS.service')

const port = process.env.PORT || 3000
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

connectDB()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views')) // specify the views directory
app.set('view engine', 'ejs') // register the template engine
app.use(express.static(path.join(__dirname + '/public')))
// app.use(express.json())

app.use('/',registerRoute)
app.use('/',webcamRoute)

handleQrCodeWS(io)

app.all('*', (req, res) => {
    return new ApiError('page not found', 404)
})

app.use(handleErrorController)

server.listen(port, ()=>{
    console.log("app is running at port 3000")
})