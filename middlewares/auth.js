const express = require('express')
const admin = require('../firebase')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async ( req,res,next) => {
    // try {
    //     // console.log("admin",admin)
    //     const firebaseUser = await admin
    //       .auth()
    //       .verifyIdToken(req.headers.authtoken);
    //     // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    //     req.user = firebaseUser;
    //     console.log(req.user)
    //     next();
    //   } catch (err) {
    //     // console.log(err);
    //     console.log({error:"firebase error"})
    //     res.status(401).json({
    //       err: "Invalid or expired token",
    //     });
    //   }

    try{
        const {token} = req.headers
        if(!token)
           throw new Error("Token not found");

        const {id}=jwt.verify(token,"sfdw@3#&^/df")
        
        //find user by id
        const user = await User.findById(id);
        
        if(user){
            req.user = user
            next();
        }else
         throw new Error("User not found")
        
    }catch(err){

        res.status(500).send({
            message:err.message
        })
    }
    
}

const role = async (req,res,next)=> {

}

module.exports  = auth;