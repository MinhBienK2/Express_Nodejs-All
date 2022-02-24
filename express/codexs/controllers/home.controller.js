module.exports.pageHome = async(req, res) => {
    res.send(`<a href = "/user">To user</a>
              <br>
              <a href = "/product">To product</a>          
    `)
}