const {selectUsers,insertUsers,selectUsersById} = require('../models/usersModel')
const {v4:uuidv4} = require('uuid')

const usersController = {
    createUsers: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.password || !req.body.nama || !req.body.phone || !req.body.jabatan ) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else if (req.body.password.length < 6) {
                res.status(404).json({status:404,message:`Your password must at least 6 characters`})
            } else {
                let id = uuidv4()

                let data = {
                    id: id,
                    email: req.body.email,
                    password: req.body.password,
                    nama: req.body.nama,
                    phone: req.body.phone,
                    jabatan: req.body.jabatan
                }

                let register = await insertUsers(data)

                if (!register) {
                    res.status(401).json({status:401,message:`Register failed`})
                } else {
                    res.status(201).json({status:201,message:`Register success`})
                }
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Register failed`})
        }
    },
    getUsers: async (req,res,next)=>{
        try {
            let showUser = await selectUsers()
            if (!showUser.rows[0]) {
                res.status(400).json({status:400,message:`data user not found`})
            } else {
                res.status(200).json({status:200,message:`data found`,data:showUser.rows})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = usersController