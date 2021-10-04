const express = require('express')
require('./models');

const app = express();

const port = process.env.PORT ||8000

app.use(require('cors')());
app.use(express.json());
app.use('/user',require('./router/User'));
app.use('/doctor',require('./router/Doctor'));
app.use('/patient',require('./router/patient'));
app.use('/history',require('./router/history'));
app.use('/auth',require('./router/auth'))
app.use('/request',require('./router/request'))
app.use('/notification',require('./router/Notification'))

app.get('/',(req,res)=>{
    console.log("hello");
    res.send("helo");
});
// for(let i=0;i<10;i++)




app.listen(port,(err)=>{
    console.log("connection established at port:",port)
})