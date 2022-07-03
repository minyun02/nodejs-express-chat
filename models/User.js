const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_num : {
        type : Number
    },
    email : {
        type : String,
        trim : true
    },
    nick : {
        type : String,
        maxlength : 30,
        trim : true
    },
    password : {
        type : String,
        minlength : 5
    },
    phone : {
        type : Number,
        trim : true
    },
    role : {
        type : Number,
        default : 0 //일반유저 0, 관리자 1
    },
    reg_date : {
        type : Date,
        default: Date.now
    }
    
})

const User = mongoose.model('User', userSchema)
module.exports = { User } 