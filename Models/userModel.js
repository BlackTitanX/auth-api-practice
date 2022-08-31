const mongoose = require('mongoose');


let userSchema = new mongoose.Schema;

userSchema = {
    name: {String},

    username: {String},

    email:{String},

    password: {Number}
}

const User = mongoose.model('User', userSchema);

module.exports = User;