const express = require('express');
const QRCode = require('qrcode');
const app = express();
var toSJIS = require('qrcode/helper/to-sjis')

app.set('view engine', 'ejs') // register the template engine
    app.set('views', '../views') // specify the views directory
    app.use(express.static('public'))

// app.get('/',async(req,res)=>{
//     // let img='';
//     // let qr= await QRCode.toDataURL('I am Cuamotcang!');
//     // const qr = await QRCode.toDataURL('some text', { errorCorrectionLevel: 'H' }) 
//     // console.log(qr);
//     // img = `<image src= " `+qr+ `" />`
//     // return res.send(img);
//     // QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
//     //     console.log(url)
//     //   })
//     const kanjiString= '123'
//     const qr =await QRCode.toDataURL(kanjiString, { toSJISFunc: toSJIS })
//     return res.send(`<image src= " `+qr+ `" />`);
// });

app.listen(3000, ()=>{
    console.log("app is running at port 3000")
})