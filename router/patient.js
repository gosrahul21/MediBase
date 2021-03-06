const router = require('express').Router()
const auth = require('../middlewares/auth')
const Patient = require('../models/Patient')

//adding patient details
router.post('/',auth,async (req,res)=>{
    try {
        const user = req.user
        req.user.name = req.body.name
        await req.user.save();
        let patient = new Patient({...req.body,userId:user.id})
        
        patient = await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
})


//getting the login user account details
router.get('/',auth,async (req,res) => {
    try {
        console.log("getting the login patient /normal user account details")
        const user = req.user
        const patient = await Patient.findOne({userId:user.id})
        if(patient)
        return res.status(201).send(patient);
        res.status(404).send({
            message:"Patient Details not found"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:error.message
        })
    }
})


router.put('/:id',auth,async (req,res)=>{
    try {
        //find the patient with this id
        const id = req.params.id
        const patient = await Patient.findByIdAndUpdate(id,req.body,{new:true});
        res.send(patient);
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
})


module.exports = router