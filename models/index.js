const mongoose = require('mongoose');
// const URI= 'mongodb+srv://gosrahul21:rahul@321@dcorner.b3k0e.mongodb.net/medicalHistory?retryWrites=true&w=majority'
const URI = 'mongodb://localhost:27017/medicalHistory'

mongoose.connect(URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true
}
).then(()=>{ 
    console.log("database connected")
}).catch((err)=>{
    console.log("error in connecting to database" , err);
})

