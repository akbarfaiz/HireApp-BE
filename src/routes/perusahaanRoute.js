const express = require('express')
const router = express.Router()
const {editProfile,getProfile} = require('../controller/perusahaanController')
const {protect} = require('./../middleware/authProtect')

router.get('/',protect,getProfile)
router.put('/editProfile',protect,editProfile)

module.exports = router