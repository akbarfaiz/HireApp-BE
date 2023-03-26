const express = require('express')
const router = express.Router()
const {createSkill,getSkill,getSkillByname} = require('../controller/skillController')
const {protect} = require('./../middleware/authProtect')

router.get('/search',getSkillByname)
router.get('/',getSkill)
router.post('/',protect,createSkill)

module.exports = router