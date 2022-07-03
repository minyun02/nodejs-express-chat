const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    room_num : {
        type : Number
    },
    room_name : {
        type : String,
        maxlength : 100
    },
    max_participants : {
        type : Number
    },
    owner : {
        type : user_num
    },
    number_participants : {
        type : Number
    },
    reg_date : {
        type : Date,
        default: Date.now
    }

})

const User = mongoose.model('Room', RoomSchema)
module.exports = { Room } 