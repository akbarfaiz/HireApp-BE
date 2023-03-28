const express = require('express')
const router = express.Router()
const {postRoomChat,getChat} = require ('../controller/mesageController')

router.get('/',getChat);


module.exports = router