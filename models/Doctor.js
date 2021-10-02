const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        unique:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    contactNo:{
        type:String
    },
    address:{
        type:String
    },
    organization_type:{
        type:String,
        enum:['private','Goverment'],
        required:true
    },
    organization:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:null
    },
    DateOfRegister:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Doctor",doctorSchema);