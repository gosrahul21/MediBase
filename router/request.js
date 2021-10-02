const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Request = require('../models/Request')

//save the request
router.post('/',auth,async (req,res)=>{
    try {
        const from = req.user.id
        const {to,type} = req.body
        let request = new Request({
            from,
            to,
            type
        });
    await request.save();
        if(request){
            return res.status(201).send(request)
        }
        
        res.status(404).send({sent:false});
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post('/:email',auth,async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;