const express = require('express')
const router = express.Router()
const { getPekerja, 
        getPekerjaById,
        getDetailPekerjaById
    } = require ('../controller/pekerjaController.js')
const{editProfilePekerja} = require('../controller/pekerjaController')
const {protect} = require('./../middleware/authProtect')

router.get('/myProfile',protect,getPekerjaById);
router.get('/detail/:id',getDetailPekerjaById);
router.get('/',getPekerja);
router.put('/',protect, editProfilePekerja)


module.exports = router