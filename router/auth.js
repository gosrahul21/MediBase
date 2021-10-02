const bcryptjs = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const router = require('express').Router();
const {hash} = bcryptjs



//get user details from token
router.get('/',auth,(req,res) => {
    try{
        const {id,email,role,roleId} = req.user;
        // console.log(req.user)
        res.send({userId:id,email,role,roleId});
    }catch({message}){
        res.status(500).send({
            message
        });
    }
})


//register user
router.post('/register',async (req,res)=>{
    try{

        //implement in future to authenticate by email signin
        const {email,password,role} = req.body;
        console.log(role)
        if(!email || !password)
            throw new Error("Email or password not present")

        const hashedPassword = await hash(password,10);
        console.log(hashedPassword)
        const user = new User({
            email,password:hashedPassword,role
        })
        await user.save();
    
        res.send({
            email,
            role,
            success:true
        });
    }catch(err){
        res.status(500).send(err.message);
    }
})

//sign in
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        if( !email || !password){
            throw new Error("No email or password")
        }

        const user = await User.findOne({email});
        const isEqual = await bcryptjs.compare(password,user.password);
        if(isEqual){   //authenticated

             //generate jwt token
        const {id,role,roleId} = user;
        const token = jwt.sign({id},"sfdw@3#&^/df",{expiresIn:'140h'})
        // user.tokens = [...user.tokens,token];
        await user.save();
            res.send({
                userId:id,
                email:user.email,
                token,
                success:true,
                role,
                roleId,
                message:"user logged in"
            });
        }else {
            res.status(404).send({
                success:false,
                message:"Wrong credentials"
            })
        }
    }catch(err){
        res.status(500).send(err.message);
    }
})

//get all the users
router.get('/all',async (req,res)=>{
  try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        res.status(501).send(err);
    }
})

//update user password
router.put('/',async (req,res)=>{
    try{
        const {oldPassword,newPassword,email} = req.body;
         
    }catch(err){
        
    }
})


module.exports = router;