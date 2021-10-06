const express = require('express')
const router = express.Router()
const RequestRecord = require('../models/PermissionGrant')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const auth = require('../middlewares/auth')

//saving permission records for a user
//if user is doctor then only grant presribe permission
router.post('/',auth,async(req,res)=>{
    try {
        const user = req.user
        const {to,type} = req.body
        if(type == 'read')
        {
            const record = new RequestRecord({to,type,userId:user.id});
            await record.save();
            res.send(record);
        }else{
            //check whether that "to" user is doctor and is verified one
            const doctor = await Doctor.findOne({userId:to});
            if(!doctor.verified)
                throw new Error("Doctor is not verified")
            
            const record = new RequestRecord({userId:user.id,to,type});
            await record.save()
            res.send(record)
        }
    } catch (error) {
        res.status(501).send({
            message:error.message
        })
    }
})

// get all the permissions granted by the user
router.get('/granted',auth,async (req,res)=>{
    try {
        const user = req.user
        //find all the records which belongs to this user
        const request = await RequestRecord.find({userId:user.id,status:true}).populate('to');
        const fullRecord=[]
        for(let i=0;i<request.length;i++){
            if(request[i].to.role==='patient'){
                const {name} = await Patient.findOne({userId:request[i].to._id})
                fullRecord.push({...request[i]._doc,name})
            }else{
                const {name} = await Doctor.findOne({userId:request[i].to._id})
                fullRecord.push({...request[i]._doc,name})
            }
          
        }
        res.send(fullRecord);
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
})

//get all the pending request of the logined user
router.get('/pending',auth,async (req,res)=>{
    try {
        const user = req.user
        //find all the records which belongs to this user
        const request = await RequestRecord.find({userId:user.id,status:false}).populate('to');

        const fullRecord=[]
        for(let i=0;i<request.length;i++){
            if(request[i].to.role==='patient'){
                const {name} = await Patient.findOne({userId:request[i].to._id})
                fullRecord.push({...request[i]._doc,name})
            }else{
                const {name} = await Doctor.findOne({userId:request[i].to._id})
                fullRecord.push({...request[i]._doc,name})
            }
          
        }
        console.log(fullRecord)
        res.send(fullRecord);
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
})

//rejecting the request
router.delete('/',auth,async (req,res)=>{
    try {
        const userId = req.user.id
        const {to,type} = req.body
            await RequestRecord.findOneAndDelete({userId,to})
            res.send({
                message:"deleted",
                success:true
            });  
    } catch (error) {
        res.status(501).send({
            message:error.message,
            success:false
        })
    }
})

router.delete('/:id',auth,async (req,res)=>{
    try {
        await RequestRecord.findByIdAndDelete(req.params.id);
        res.send({
            message:"deleted request",
            success:true
        })
    } catch (error) {
        res.status(501).send({
            message:"delete request failed",
            success:false
        })
    }
})

// updating the read /write request by the loggined user
router.put('/allow',auth, async (req,res)=>{
    try {
        const user = req.user
        //overwrite the type of permission
        const {to,type} = req.body
        const record = await RequestRecord.findByOneAndUpdate({userId:user.id,to},{type,status:true},{new:true}); 
        res.send(record);
    } catch (error) {
        res.status(501).send({
            message:error.message,
            success:false
        })
    }
})

//grant permission for given request by request id
router.put('/allow/:id',auth,async (req,res)=>{
    try {
        console.log(req.params.id)
        const request = await RequestRecord.findByIdAndUpdate(req.params.id,{status:true});
        if(!request) 
            return res.status(404).send({message:"no request found for id provided"});
           
        
        res.send(request)

    } catch (error) {
        console.log(error.message)
        res.status(501).send({
            message:error.message
        })
    }

})







//find the record b/w logined user and the user at  profile
router.get('/record-status/:id',auth,async (req,res)=>{
    try {
        const user = req.user
        const record =await RequestRecord.findOne({userId:req.params.id,to:user.id});
        console.log(record)
        if(!record)
            return res.status(404).send({
                message:"No relation exist",
                success:false
            })
        res.send(record)
    } catch ({message}) {
        res.status(501).send({
            message
        })
    }
})


module.exports = router