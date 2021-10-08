const express = require('express')
const User = require('../models/User')
const router = express.Router()
const auth = require('../middlewares/auth')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Request = require('../models/PermissionGrant')



//get user by id
router.get('/:id',async(req,res)=>{
   try{
      const user = await User.findById(req.params.id);
      if(!user)
         return res.status(404).send({message:"user not found", success:false})

      res.send(user);


   }catch(err){
      res.status(404).send(err);
   }
})


//get user and its details by email-id based on its access request
router.post('/email',auth,async (req,res)=>{
   try {
    
      const {email} = req.body
      const {role,id,avatar} = await User.findOne({email});
    
     
     

      //find the patient detail
      if(role === 'patient'){
         const patient = await Patient.findOne({userId:id});

         //if patient is null send error response
         if(!patient) throw new Error("Details not found")

         //check if there is any request b/w current user and the email user
         return res.send({
            id,
            role,
            avatar,
            patient
         });
         
      }
      const doctor = await Doctor.findOne({userId:id});
      if(!doctor) throw new Error("Details not found")
      
      res.send({
         id,role,doctor,avatar
      });

   } catch (error) {
      res.status(500).send({message:error.message});
   }
})


//list of all paitients
router.get('/',auth,async (req,res)=>{
   try{
        const users = await User.find();
        res.send(users);
   }catch(err){
      res.status(500).send(err);
   }
})


//add user
router.post('/',async(req,res)=>{
   try{
      const {name,email,password,address,DOB} = req.body
      const user = new User(req.body);
      await user.save();
      res.send(user);
   } catch(err){
      res.status(404).send(err);
   }
})


router.put('/',async (req,res)=>{
   try{
      //check if the login user matched with the updated value credentials
      //if not then send error 
      //get user id from middleware 
      const user = await User.findByIdAndUpdate(req.user,req.body,{new:true});
      res.send(user);

   }catch(err){
      res.status(501).send(err);
   }
})


module.exports = router;