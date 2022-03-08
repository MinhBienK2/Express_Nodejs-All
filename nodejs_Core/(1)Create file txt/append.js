const fs = require('fs')

fs.appendFile('test.txt','nối chuỗi bằng append ',function(err) {
    if(err) console.log(err)
})