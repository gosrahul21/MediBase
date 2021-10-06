const router = require('express').Router()
const History = require('../models/History')
const auth = require('../middlewares/auth')
const Doctor = require('../models/Doctor')
const Request = require('../models/PermissionGrant')
router.get('/all',async (req,res)=>{
    try{
        res.send(await History.find());
    }catch(err){
        res.status(404).send(err.message)
    }
    
})

//current user is doctor and prescribing to user
router.post('/:user_id',auth,async(req,res)=>{
    /***************** ******************************************
    if all of this condition exist then only add Medical History
    check whehter the current user is doctor 
    check whether the doctor is verified or not
    check whether the request for prescribing has been approved by the patient
    *************************************************************/
    try {
        const user = req.user
        const precribingUser = req.params.user_id
        const doctor = await Doctor.findOne({userId:user.id});
        if(!doctor||!doctor.verified)
            return res.status(404).send({message:"User is not doctor or not verified",success:false})
        const request = await Request.findOne({userId:prescribingUser,to:user.id});
        if(!request|| !request.status)
            return res.status(404).send({message:"Doctor has to generate prescribe request",success:false})
        const history = new History(req.body);
        await history.save();
        res.send(history);
    } catch (error) {
        res.status(501).send({
            message:error.message
        })
    }



})

// get all the history of current user
router.get('/',auth,async (req,res)=>{
    try {
        console.log("get history")
        const user = req.user
        const history = await History.find({userId:user.id}).sort({date:'desc'});
        res.send(history)
    } catch (error) {
        res.send({message:error.message})
    }
})




module.exports = router;