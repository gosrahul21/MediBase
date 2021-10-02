const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        unique:true
    },
    address:{
        type:String,
    },
    DOB:{
        type:String
    },
    contactNo:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        required:true
    },
    presribedDoctors:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Doctor'
        }
    ]


},{
    timestamps:true
})


module.exports = mongoose.model("Patient",PatientSchema);