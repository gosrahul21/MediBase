const router = require('express').Router()
const Doctor = require('../models/Doctor')
const auth = require('../middlewares/auth');


router.get('/',auth,async (req,res)=>{
    try{
        res.send(await Doctor.find());
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


router.post('/',async(req,res) => {
    try {
        
        const doctor = new  Doctor(req.body);
        await doctor.save();
        res.send(doctor);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;