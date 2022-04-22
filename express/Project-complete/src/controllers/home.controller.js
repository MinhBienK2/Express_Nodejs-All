import db from '../models/index'

exports.homeWeb = async (req,res,next) => {
    try{
        const data = await db.User.findAll()
        res.render('homePage',{
            data : JSON.stringify(data)
        })
    }catch (err) {
        console.log(err)
    }
}