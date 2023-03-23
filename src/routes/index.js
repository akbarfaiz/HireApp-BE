const express = require('express')
const router = express.Router()
const Users =   require('./usersRoute')
const Perusahaan = require('./perusahaanRoute')
const Pekerja = require('./pekerjaRoute')

router.use('/users',Users)
router.use('/company',Perusahaan)
router.use('/pekerja', Pekerja)

router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Hire App API !!!' });   
})

module.exports = router