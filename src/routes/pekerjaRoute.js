const express = require('express')
const router = express.Router()
const { getPekerja, 
        getPekerjaById,
        getDetailPekerjaById,
        getPekerjaByName
    } = require ('../controller/pekerjaController.js')
const{editProfilePekerja} = require('../controller/pekerjaController')
const {protect} = require('./../middleware/authProtect')
const upload = require('../middleware/uploadPhoto')

router.get('/myProfile',protect,getPekerjaById);
router.get('/detail/:id',getDetailPekerjaById);
router.get('/search',getPekerjaByName)
router.get('/',getPekerja);
router.put('/',protect,upload.single('photo'), editProfilePekerja)


module.exports = router