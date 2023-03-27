const express = require('express')
const router = express.Router()
const {createSkill,getSkill,getSkillByname,getSkillByUserId,getSkillByParams} = require('../controller/skillController')
const {protect} = require('./../middleware/authProtect')

router.get('/search',getSkillByname)
router.get('/mySkill',protect,getSkillByUserId)
router.get('/detail/:id',getSkillByParams)
router.get('/',getSkill)
router.post('/',protect,createSkill)

module.exports = router