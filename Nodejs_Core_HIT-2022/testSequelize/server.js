const express = require('express')
const app = express()

app.get('/',(req,res,next) => {
    res.send('hel;lo ban nhi')
})

app.listen(3000,() => {
    console.log('hello')
})