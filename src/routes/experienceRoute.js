const express = require('express')
const router = express.Router()
const {createExperience,getExperience,getExperienceByUserId,getExperienceById,updateExperience,deleteExperience} = require('../controller/experienceController')
const {protect} = require('./../middleware/authProtect')

router.get('/myExperience',protect,getExperienceByUserId)
router.get('/detail/:id',getExperienceById)
router.get('/',getExperience)
router.post('/',protect,createExperience)
router.put('/update/:id',protect,updateExperience)
router.delete('/delete/:id',protect,deleteExperience)

module.exports = router