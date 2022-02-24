const express = require('express')
const router = express.Router()

router.get('/ho',(req,res) => {
    res.send('Hello ho')
})

router.get('/gau',(req,res) => {
    res.json('gau bong')
})

router.get('/trau', (req, res)=>{
    res.json([{
        name: 'con trau',
        age: 18
    },{
        name: 'trau bo',
        age: 18
    }])
})

router.get('/cat', (req, res) => {
    res.send('<h1>Cat beautiful 2</h1>')
})

module.exports = router