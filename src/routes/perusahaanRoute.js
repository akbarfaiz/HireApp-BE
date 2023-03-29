const express = require('express')
const router = express.Router()
const {editProfile,getProfile} = require('../controller/perusahaanController')
const {protect} = require('./../middleware/authProtect')
const upload = require('../middleware/uploadPhoto')

router.get('/',protect,getProfile)
router.put('/editProfile',protect,upload.single('photo'),editProfile)

module.exports = router