const express = require('express')
const router = express.Router()
const Users =   require('./usersRoute')
const Perusahaan = require('./perusahaanRoute')

router.use('/users',Users)
router.use('/company',Perusahaan)
router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Hire App API !!!' });   
})

module.exports = router