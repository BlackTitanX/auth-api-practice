const mongoose = require('mongoose');


const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true},

    email:{type: String,
        required: true},

    password: {type: Number,
        required: true}
})

const User = mongoose.model('user', userSchema);

module.exports = User;