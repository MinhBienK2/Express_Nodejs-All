const express = require('express')
const app = express()
const router = require('./routers/router.js')
const hbs = require('hbs')
const path = require('path')
//created path
const publicDirectoryPath = path.join(__dirname,'public') 
const pathTemplate = path.join(__dirname,'./templates/views')
const pathParials  = path.join(__dirname,'./templates/partials')
const port = process.env.PORT ||3000    //heroku

hbs.registerPartials(pathParials)
// hbs.registerPartials()

// set views
app.set('view engine', 'hbs')
app.set('views',pathTemplate)

//use path
app.use('/api',router)
app.use(express.static(publicDirectoryPath)) // dòng dưới giống dòng trên
//app.use(express.static("./public")) //cho cái public này là static


app.get('/myname', (req, res) => {
    if(!req.query.name)
        res.send({
            error : 'you must provide  a search term'
        })
    else 
        res.send({
            name : req.query.name,
            age : req.query.age
        })
    // console.log(req.querry.name,req.query.age)
})

app.get('',(req,res) =>{
    res.render('index',{
        title:'this is Index path',
        name:'my name is Bien dep zai'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'this is About path',
        name:'hello about'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title:'this is help web',
        name:'how can I help you'
    })
})  

// error
app.get('*', (req, res) =>{
    res.render('404',{
        errorMessage:'my 404 Error',
        description:'web no render'
    })
})

app.listen(port,() => {
    console.log('listening on port ', port)
})


