const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Request = require('../models/Request')
const User = require('../models/User')

//save the request
router.post('/',auth,async (req,res)=>{
    try {
        const from = req.user.id
        console.log(req.body)
        const {to,type} = req.body
        const {id} = await User.findOne({email:to});
        let request = new Request({
            from,
            to:id,
            type
        });
    await request.save();
        if(request){
            return res.status(201).send(request)
        }
        
        res.status(404).send({sent:false});
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
})

router.post('/:email',auth,async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;