const mongoose = require('mongoose')
const nanoid = require('nanoid')

const urlShortSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true
    },
    urlShort : {
        type : String,
        required : true,
    }
})

const UrlShort = mongoose.model('UrlShort',urlShortSchema)

module.exports = UrlShort