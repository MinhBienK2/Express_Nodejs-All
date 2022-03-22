const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const UrlShort = require('../models/urlShort.model');
const {nanoid} = require('nanoid')

exports.AllUrlShort = CatchAsync(async (req,res,next)=>{
    const urlShort = await UrlShort.find()
    let html=''
    urlShort.forEach(el => {
        return (
            html+= `   
                <a href="${el.url}">${el.url}</a>
                <span>urlShort</span>
                <a href="localhost:3000/urlShorts/${el.urlShort}">${el.urlShort}</a>
            `
        )
    })
    res.set('Content-Type', 'text/html');
    res.status(200).send(html)
})

exports.getUrlShort  = CatchAsync(async (req,res,next) => {
    console.log(req.params.short)
    const urlShorts = await UrlShort.findOne({urlShort :req.params.short});
    if(!urlShorts) return next(new AppError('Url not found',404));
    res.redirect(urlShorts.url);
})

exports.sendUrlRoot = CatchAsync(async (req,res,next) => {
    req.body.urlShort = nanoid()
    await UrlShort.create(req.body)
    res.redirect(`/urlShorts`)
})


