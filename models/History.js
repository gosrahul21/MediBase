const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    docId:{
        type:mongoose.Schema.ObjectId,
        ref:"Doctor",
        required:true
    },
    disease:{
        type:String,
        required:true
    },
    allergies:{
        type:String
    },
    prescription_image:[
        {
            public_id:String,
            url:String
        }
    ],
    medicines:[
        {
            type:String
        }
    ],
    
    haemoglobin:{
        type:String,
        default:null
    },
    bloodPressure:{
        type:String
    },
    bloodGroup:{
        type:String,
        enum:[
            'A+',
            'A-','B+','B-', 'O+','O-','AB+','AB-'
        ]
    },
    date:{
        type:Date,
        default:Date.now()
    }

});


module.exports = mongoose.model('History',historySchema)