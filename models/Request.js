const mongoose = require('mongoose')
//pending request record
const RequestSchema = new mongoose.Schema ({
    from:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    to:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    type:{
        type:String,
        enum:["read","write"]   //read for just seeing the profile and write for adding presription
    },
    status:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

RequestSchema.index({from:1,to:1},{unique:true});


module.exports = mongoose.model('Request',RequestSchema);