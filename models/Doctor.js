const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    
    gender:{
        type:String,
        enum:['male','female','others']
    },
    
    DOB:{
        type:String
    },
    verified:{         //edited by admin
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
        enum:['private','goverment',"public","others"],
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