const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    room_num : {
        type : room_num
    },
    participants : {
        type : user_num
    },
    reg_date : {
        type : Date,
        default: Date.now
    }

})

const User = mongoose.model('Chat', ChatSchema)
module.exports = { Chat } 