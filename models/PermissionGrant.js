const  mongoose = require('mongoose')
//grant permission records
const PermissionGrantSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        index:true
    },
    to:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    type:{
        type:String,
        enum:['read','write']
    },
    status:{
        type:Boolean,
        default:false
    }
})

PermissionGrantSchema.index({userId:1,to:1},{unique:true});

module.exports = mongoose.model('RequestRecord',PermissionGrantSchema)