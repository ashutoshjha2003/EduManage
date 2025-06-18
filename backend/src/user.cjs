const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true
    }
});

const UserData = mongoose.model('userdata', userSchema); 
module.exports = UserData;