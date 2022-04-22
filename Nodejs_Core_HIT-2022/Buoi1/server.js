const express = require('express')
const morgan = require('morgan')
const path = require('path')
const dotenv = require('dotenv')

const userRouter = require('./routers/user')
dotenv.config({path : './config/config.env'})

require('./src/db/db')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())

app.use('/static',express.static(path.join(__dirname, 'public')))
app.use('/users',userRouter)

app.listen(port,() => {
    console.log(`Server is listening on port ${port}`)
})

const chalk = require('chalk');

console.log(chalk.red('Hello world!!! 🎉🎉🎉'));