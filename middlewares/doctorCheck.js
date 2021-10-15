const express = require('express');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

//middleware for checking whether the user is doctor and verified one

const doctorCheck = async (req,res,next)=>{
    try {
        if(req.user.role==='doctor'){
            //find the doctor details
            const doctor = await Doctor.findOne({userId:req.user.id});
            if(!doctor || !doctor.verified)
              return res.status(404).send({
                  message:"Doctor profile not available or is not verified"
              });
              req.doctor = doctor
            next();
                
        }
        else{
            return res.status(404).send({
                message:"User is not doctor"
            })
        }

    } catch ({message}) {
        return res.status(501).send({
            message
        });
    }
    
}

module.exports  = doctorCheck;