const express = require('express')
const router = express.Router()
const { getPekerja, 
        getPekerjaById
    } = require ('../controller/pekerjaController.js')
const{editProfilePekerja} = require('../controller/pekerjaController')

router.get('/',getPekerja);
router.get('/:id',getPekerjaById);
router.put('/', editProfilePekerja)


module.exports = router