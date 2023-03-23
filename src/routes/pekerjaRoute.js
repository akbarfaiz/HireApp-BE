const express = require('express')
const router = express.Router()
const { getPekerja, 
        getPekerjaById
    } = require ('../controller/pekerjaController.js')

router.get('/',getPekerja);
router.get('/:id',getPekerjaById);


module.exports = router