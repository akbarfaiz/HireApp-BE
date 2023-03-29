const express = require('express')
const router = express.Router()
const {createRoomChat,getChat,getChatById,getChatByUserId,createMessage} = require ('../controller/mesageController')
const {protect} = require('./../middleware/authProtect')

router.get('/myChat',protect,getChatByUserId);
router.get('/detail/:id',getChatById);
router.get('/',getChat);
router.post('/:id',protect,createRoomChat)
router.post('/messages/:chat_id',protect,createMessage)


module.exports = router