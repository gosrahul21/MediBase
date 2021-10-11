const express = require('express');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

//middleware for checking whether the user is admin and or not
//admin can access all the user information so that he can verify but only for doctors

const adminCheck = async (req,res,next)=>{
        if(req.user.role!=='admin')
            return res.status(404).send({
                message:"user is not admin"
            })
        next();
}

module.exports  = adminCheck;