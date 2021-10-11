const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        default:"patient",
        enum:["doctor","patient",'admin'],
    },
    tokens:[]

});

module.exports = mongoose.model('User',userSchema);