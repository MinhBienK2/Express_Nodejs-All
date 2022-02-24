const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const {Schema} = mongoose

const AccountSchema = new Schema({
    name: String,
    age: String,
    address: String,
    course : {
        type : String,
        ref : 'Courses'
    },
    card : {
        type : String,
        ref : 'Card'
    }
},{collection : 'Accounts'});

const courseSchema = new Schema({
      name: String,
      teacher: {
          type : String,
          ref : 'Accounts'
      },
      lesson: [],
      salary : {}
  },{collection : 'Courses'});

const cardSchema = new Schema({
    name: String,
    card : String,
    user : {
        account : {
            type : String,
            ref : 'Accounts'
        }
    }
},{collection : 'Card'})

const AccountModel = mongoose.model('Accounts',AccountSchema)
const CourseModel = mongoose.model('Courses',courseSchema)
const CardModel = mongoose.model('Card',cardSchema)

// AccountModel.create({
//     name : 'Minh Chien',
//     age : 50,
//     address : 'Quang Ninh',
//     course : ''
// },(error , data ) => {
//     if(error)
//         console.log(error)
//     console.log(data)
// })

// CardModel.updateOne({
//     name:'register'
// },{ user : {
//     account : '61cc3c4f05ca1dfd25c9b34d'
//     }
// },
// (err,data) => {
//     if( err)
//         console.log(err)
//     console.log(data)
// })

AccountModel.findOne({name : 'Kien'})
.populate('course')
.populate({
    path: 'course',
    populate: {path : 'teacher'}
})
.populate('card')
// .populate('card.user')
.populate({
    path : 'card',
    populate : {path: 'user.account'}
})
.then( (data) => {
    console.log(data)
}).catch(error => {
    console.log(error)
})



