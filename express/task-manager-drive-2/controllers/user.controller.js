const User = require('../src/models/user')
const CatchAsync = require('../utils/CatchAsync')

exports.allUsers =CatchAsync(async (req,res,next) => {
    const user = await User.find()
    res.status(200).json({
        status : 'success',
        results : user.length,
        data : {
            user
        }
    })
})
