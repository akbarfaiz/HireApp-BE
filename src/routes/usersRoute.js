const express = require('express')
const router = express.Router()
const {getUsers,createUsers} = require('../controller/usersController')

router.get('/',getUsers)
router.post('/',createUsers)

module.exports = router