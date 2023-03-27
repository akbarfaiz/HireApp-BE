const express = require('express')
const router = express.Router()
const {getPortofolioUser,getPortofolioById,createPortofolio,deletePortofolio,updatePortofolio} = require('../controller/portofolioController')
const {protect} = require('./../middleware/authProtect')
const upload = require('../middleware/uploadPhoto')

router.get('/myPortofolio',protect,getPortofolioUser)
router.get('/detail/:id',getPortofolioById)
router.post('/',protect,upload.single('photo'),createPortofolio)
router.delete('/delete/:id',protect,deletePortofolio)
router.put('/update/:id',protect,upload.single('photo'),updatePortofolio)

module.exports = router