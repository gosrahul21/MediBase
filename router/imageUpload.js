const express = require('express')
const auth = require('../middlewares/auth')
const doctorCheck = require('../middlewares/doctorCheck')
const {upload,remove} = require('../controllers/imageUpload')
const router= express.Router()


//only doctor can upload image
router.post('/',auth,doctorCheck,upload)

router.delete('/:public_id',auth,doctorCheck,remove)


module.exports = router