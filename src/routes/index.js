const express = require('express')
const router = express.Router()
const Users =   require('./usersRoute')
const Perusahaan = require('./perusahaanRoute')
const Skill = require('./skillRoute')
const Experience = require('./experienceRoute')
const Pekerja = require('./pekerjaRoute')
const Portofolio = require('./portofolioRoute')

router.use('/users',Users)
router.use('/company',Perusahaan)
router.use('/skill',Skill)
router.use('/experience',Experience)
router.use('/pekerja', Pekerja)
router.use('/portofolio', Portofolio)

router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Hire App API !!!' });   
})

module.exports = router