const fs = require('fs')

const book = {
    title: 'hello ban nho',
    author: 'minh bien'
}

// const jsonBook = JSON.stringify(book)
// const tringBook = JSON.parse(jsonBook)
// fs.writeFileSync('1-json.json',jsonBook)

const readFile = fs.readFileSync('1-json.json')
const dataJson = JSON.parse(readFile.toString())
dataJson.name = 'bien'
dataJson.age = '19';
const useJSON = JSON.stringify(dataJson)
fs.writeFileSync('1-json.json',useJSON)

console.log(dataJson)
// console.log(jsonBook)
// console.log(JSON.parse(jsonBook).author)
