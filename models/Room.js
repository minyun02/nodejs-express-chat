const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    room_num : Number,
    room_name : {
        type : String,
        maxlength : 100
    },
    max_participants : Number,
    owner : user_num,
    number_participants : Number,
    reg_date : {
        type : Date,
        default: Date.now
    }
})

const User = mongoose.model('Room', RoomSchema)
module.exports = { Room } 