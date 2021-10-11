const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    DocId:{
        type:mongoose.Schema.ObjectId,
        ref:"Doctor",
        required:true
    },
    Disease:{
        type:String,
        required:true
    },
    allergies:{
        type:String
    },
    prescription_image:[
        {
            type:String
        }
    ],
    medicines:[
        {
            name:String,
            instruction:String

        }
    ],
    
    haemoglobin:{
        type:String,
        default:null
    },
    date:{
        type:Date,
        default:Date.now()
    }

});


module.exports = mongoose.model('History',historySchema)