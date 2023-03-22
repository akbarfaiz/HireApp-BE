const express = require('express')
const router = express.Router()
const {editProfile} = require('../controller/perusahaanController')
const {protect} = require('./../middleware/authProtect')

router.put('/editProfile',protect,editProfile)

module.exports = router