const https = require('https')

const url = 'https://dog.ceo/api/breeds/list/all'

const request = https.request(url, (response)=>{
    let data = ''
    response.on('data', (chunk)=>{
        // console.log(data.toString());
        data +=chunk.toString()
    })
    response.on('end', ()=>{
        console.log(JSON.parse(data))  
    })
})

request.on('error', (err)=>{
    console.log(err)
})

request.end()