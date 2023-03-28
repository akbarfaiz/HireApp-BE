const express = require('express')
const router = express.Router()
const Users =   require('./usersRoute')
const Perusahaan = require('./perusahaanRoute')
const Skill = require('./skillRoute')
const Experience = require('./experienceRoute')
const Pekerja = require('./pekerjaRoute')
<<<<<<< HEAD
const Chat = require('./messagesRoute')
=======
const Portofolio = require('./portofolioRoute')
>>>>>>> 5db94a36141cc9f6412aada6f32554b62eb19fda

router.use('/users',Users)
router.use('/company',Perusahaan)
router.use('/skill',Skill)
router.use('/experience',Experience)
router.use('/pekerja', Pekerja)
<<<<<<< HEAD
router.use('/chat', Chat)
=======
router.use('/portofolio', Portofolio)
>>>>>>> 5db94a36141cc9f6412aada6f32554b62eb19fda

router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Hire App API !!!' });   
})

module.exports = router