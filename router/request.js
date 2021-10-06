const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Request = require('../models/PermissionGrant')
const User = require('../models/User')
const Doctor = require('../models/Doctor')

//save the request  of the user in terms of user id
router.post('/',auth,async (req,res)=>{
    try {
        const {to,type} = req.body
        const id = req.user.id
        //if user is doctor and verified then only request for write permission
        if(type === 'write'){
            const doctor = await Doctor.findOne({userId:id})
            if(!doctor || !doctor.verified){
                return res.status(404).send({
                    message:"Either Doctor not present or is not verified",
                    success:false
                })
            }
        }

        
        let request = await Request.findOne({userId:to,to:id})
        if(request){
            request.type = type
            await request.save()
            return res.send(request)
        }


        request = new Request({
            to:id,
            userId:to,
            type
        })

        await request.save();
        res.send(request);
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
})


router.delete('/',auth,async(req,res)=>{
    try {
        const id = req.user.id
        const {to} = req.body
            await Request.findOneAndDelete({userId:to,to:id})
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

router.post('/:email',auth,async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;