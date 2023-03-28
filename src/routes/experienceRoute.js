const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const {createExperience,getExperience,getExperienceByUserId,updateExperience,deleteExperience} = require('../controller/experienceController')
const {protect} = require('./../middleware/authProtect')

router.get('/myExperience',protect,getExperienceByUserId)
=======
const {createExperience,getExperience,getExperienceByUserId,getExperienceById,getDetailExperienceUserId,updateExperience,deleteExperience} = require('../controller/experienceController')
const {protect} = require('./../middleware/authProtect')

router.get('/myExperience',protect,getExperienceByUserId)
router.get('/detail/:id',getExperienceById)
router.get('/show/:id',getDetailExperienceUserId)
>>>>>>> 5db94a36141cc9f6412aada6f32554b62eb19fda
router.get('/',getExperience)
router.post('/',protect,createExperience)
router.put('/update/:id',protect,updateExperience)
router.delete('/delete/:id',protect,deleteExperience)

module.exports = router