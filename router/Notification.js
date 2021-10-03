const express = require('express')

const router = express.Router()
const auth = require('../middlewares/auth')
const User = require('../models/User')
const Request = require('../models/Request')


router.get('/',auth,async (req,res)=>{
    try {
        //find requests for this user and send as response
        const id = req.user.id
        const requests = await Request.find({to:id,status:false})
        res.status(201).send(requests);
    } catch ({message}) {
        res.status(500).send({message});
    }
})


module.exports = router