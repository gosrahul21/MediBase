const router = require('express').Router()
const History = require('../models/History')

router.get('/',async (req,res)=>{
    try{
        res.send(await History.find());
    }catch(err){
        res.status(404).send(err.message)
    }
    
})


router.post('/',async(req,res)=>{
    
})


module.exports = router;