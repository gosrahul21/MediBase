const express = require('express')
require('./models');
const socket = require('socket.io')
require('dotenv').config()
const mongoose = require('mongoose');
const Request = require('./models/PermissionGrant');
const eventEmitter = require('./EventEmitter')
const app = express();
app.disable('x-powered-by');
const port = process.env.PORT 
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(require('cors')());
app.use(express.json());
app.use('/user',require('./router/User'));
app.use('/doctor',require('./router/Doctor'));
app.use('/patient',require('./router/patient'));
app.use('/history',require('./router/History'));
app.use('/auth',require('./router/auth'))
app.use('/request',require('./router/request'))
app.use('/notification',require('./router/Notification'))
app.use('/requestRecord',require('./router/requestRecords'))
app.use('/image',require('./router/imageUpload'))

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to the Medibase Api's. </h1>");
});

app.put('/',(req,res)=>{
    console.log(req.body)
    res.send({message:"heleo"})
})
// for(let i=0;i<10;i++)

const http = require('http').Server(app)

const io = socket(http);

let onlineUsers=0;

io.on('connection',(socket)=>{
    console.log("socket connected");
    io.emit('onlineUsers',++onlineUsers);   
    socket.on("join",(data)=>{
        console.log(data,"joined")
        socket.join(`room-${data.id}`)
        console.log(socket.room)
        io.to(data.id).emit("room-welcome",{message:"welcome to room"});
        
    });

    socket.on('request',(data)=>{
        console.log(data)
    });

    socket.on('disconnect',()=>{
        io.emit('onlineUsers',--onlineUsers)
        console.log("disconnected")
    })


})


const requestWatch = Request.watch();

requestWatch.on('change',(change)=>{
        if(change.operationType==='insert'){
            console.log(change.fullDocument.userId)
            io.to(`room-${change.fullDocument.userId}`).emit("requestInserted",{message:"insert operation done"});
            io.to(`room-${change.fullDocument.to}`).emit("requestInserted",{message:"insert operation done"});
        }
        if(change.operationType=='update'){
            Request.findById(change.documentKey).then(({userId,to})=>{
                io.to(`room-${userId}`).emit("requestInserted",{message:"insert operation done"});
                io.to(`room-${to}`).emit("requestInserted",{message:"insert operation done"});
            })
        }

        // if(change.operationType==='delete')
        // {
        //     console.log(change)
        //     io.emit('requestInserted',{});
        // }
       
})

eventEmitter.on('recordDeleted',(record)=>{
    console.log("bunty your record deleted",record)
    const {userId,to} = record
    if(record){
        io.to(`room-${userId}`).emit("requestInserted",{message:"insert operation done"});
        io.to(`room-${to}`).emit("requestInserted",{message:"insert operation done"});
    }
 
});


http.listen(port,(err)=>{
    console.log("connection established at port:",port)
})

