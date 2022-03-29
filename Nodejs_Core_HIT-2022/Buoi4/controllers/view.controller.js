exports.overViews = (req, res, next)=> {
    if(!req.user){
        res.redirect('/login')
    }
    res.render('overViews')
}

exports.getLogin = (req, res, next)=> {
    res.render('login')
}

exports.login = (req, res, next)=> {
    console.log(req.body)
}