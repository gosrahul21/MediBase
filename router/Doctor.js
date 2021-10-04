const router = require('express').Router()
const Doctor = require('../models/Doctor')
const auth = require('../middlewares/auth');


router.get('/',auth,async (req,res)=>{
    try{
        const userId = req.user.id;
        const doctor = await Doctor.findOne({userId});
        if(!doctor) throw new Error("Doctor Profile does not exist")
        res.status(201).send(doctor)
    }catch(err){
        res.status(404).send(err);
    }
})


//get doctor by id
router.get('/:id',auth,async (req,res) => {
    try{
        const doctor = await Doctor.findById(req.params.id);
        res.send(doctor);
    }catch(err){
        res.status(404).send(err)
    }
})


router.post('/',auth,async(req,res) => {
    try {
        
        console.log(req.user.id)
        const doctor = new  Doctor({userId:req.user.id,...req.body});
        
        await doctor.save();
        res.send(doctor);
    } catch (error) {
        res.status(404).send(error);
    }
})


router.put('/:id',auth,async (req,res)=>{
    try {
        //find the doctor with this id
        const id = req.params.id
        const doctor = await Doctor.findByIdAndUpdate(id,req.body,{new:true});
        res.send(doctor);
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
})

module.exports = router;