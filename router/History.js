const router = require('express').Router()
const History = require('../models/History')
const auth = require('../middlewares/auth')
const doctorCheck = require('../middlewares/doctorCheck')
const Doctor = require('../models/Doctor')
const Request = require('../models/PermissionGrant')
router.get('/medDetail/:id',auth,async (req,res)=>{
    try{
        res.send(await History.findById(req.params.id).populate('docId'));
    }catch(err){
        res.status(404).send(err.message)
    }  
})



//current user is doctor and prescribing to user
router.post('/:user_id',auth,doctorCheck,async(req,res)=>{
    /***************** ******************************************
    if all of this condition exist then only add Medical History
    check whehter the current user is doctor 
    check whether the doctor is verified or not
    check whether the request for prescribing has been approved by the patient
    *************************************************************/
    try {
        console.log("request to post records")
        const user = req.user
        const doctor = req.doctor
        const precribingUser = req.params.user_id
        const request = await Request.findOne({userId:precribingUser,to:user.id});
        if(!request|| !request.status|| request.type!=='write'){
            console.log("Either the request's status is false or request is not present")
            return res.status(404).send({message:"Doctor has to generate prescribe request",success:false})}
        const history = new History({...req.body,userId:precribingUser,docId:doctor.id});
        await history.save();
        res.send(history);
    } catch (error) {
        console.log(error.message)
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
        const history = await History.find({userId:user.id}).sort({date:'desc'}).populate('docId').limit(4);
        console.log(history)
        res.send(history)
    } catch (error) {
        res.send({message:error.message})
    }
})

//fecthing the medical history of user by id
router.get('/:userId',auth,async (req,res)=>{
    //if there is request b/w login user and the this user
    //and if the status is true 
    try {
        const user = req.user
        const request = await Request.findOne({userId:req.params.userId,to:user.id});
        //checking whether there is success request between login user and the profle user
        if(req.params.userId !== user.id &&(!request|| !request.status)){
            console.log(request)
            console.log("Either the request's status is false or request is not present")
            return res.status(404).send({message:"Doctor has to generate prescribe request",success:false})
        }
        //now you are logined user is egligle to access the history
        const histories = await History.find({userId:req.params.userId}).populate('docId');
        if(!histories.length)
            return res.status(404).send({message:"no history found",success:false});
        res.send(histories);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
   



})


module.exports = router;