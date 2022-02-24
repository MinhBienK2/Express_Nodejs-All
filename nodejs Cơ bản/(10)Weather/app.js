const request = require('request');

const url = 'https://dog.ceo/api/breeds/list/all'
// const url = 'http://www.google.com'

request({url,json:true}, (error, response) => {
    // if(error)
    //     console.log(error)
    const data = JSON.parse(response.body).toString()
    console.log(data)
})
