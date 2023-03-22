const express = require('express')
const router = express.Router()
const {getUsers,getUsersById,createUsers,createRecruiter,loginUsers} = require('../controller/usersController')
const {protect} = require('./../middleware/authProtect')

router.get('/profile',protect,getUsersById)
router.get('/',getUsers)
router.post('/login',loginUsers)
router.post('/register',createUsers)
router.post('/register/recruiter',createRecruiter)

module.exports = router