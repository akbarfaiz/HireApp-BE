const express = require('express')
const router = express.Router()
const Users =   require('./usersRoute')

router.use('/users',Users)
router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Hire App API !!!' });   
})

module.exports = router