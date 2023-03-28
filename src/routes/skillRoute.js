const express = require('express')
const router = express.Router()
const {createSkill,getSkill,getSkillByname,getSkillById} = require('../controller/skillController')
const {protect} = require('./../middleware/authProtect')

router.get('/search',getSkillByname)
router.get('/mySkill',protect,getSkillById)
router.get('/',getSkill)
router.post('/',protect,createSkill)

module.exports = router