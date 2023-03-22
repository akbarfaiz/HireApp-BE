const {selectUsers,insertUsers,insertRecruiter,selectUsersById,findUser} = require('../models/usersModel')
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2');
const generateToken = require('./../helper/generateToken');
const { NULL } = require('sass');

const usersController = {
    createUsers: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.password || !req.body.nama || !req.body.phone) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else if (req.body.password.length < 6) {
                res.status(404).json({status:404,message:`Your password must at least 6 characters`})
            } else if (req.body.password.length > 12) {
                res.status(404).json({status:404,message:`Maximum password is 12 characters`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)
                if (users) {
                    res.status(401).json({status:401,message:`Email has been registered`})
                } else {
                    let id = uuidv4()

                    let data = {
                        id: id,
                        email: req.body.email,
                        password: await argon2.hash(req.body.password),
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
            }
        } catch (error) {
            res.status(404).json({status:404,message:`Register failed`})
        }
    },
    createRecruiter: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.password || !req.body.nama || !req.body.phone || !req.body.jabatan || !req.body.perusahaan) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else if (req.body.password.length < 6) {
                res.status(404).json({status:404,message:`Your password must at least 6 characters`})
            } else if (req.body.password.length > 12) {
                res.status(404).json({status:404,message:`Maximum password is 12 characters`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)
                if (users) {
                    res.status(401).json({status:401,message:`Email has been registered`})
                } else {
                    let id = uuidv4()

                    let data = {
                        id: id,
                        email: req.body.email,
                        password: await argon2.hash(req.body.password),
                        nama: req.body.nama,
                        phone: req.body.phone,
                        jabatan: req.body.jabatan,
                    }

                    let dataPlus = {
                        id: id,
                        perusahaan: req.body.perusahaan
                    }
                    
                    let register = await insertUsers(data)
                    let registerPlus = await insertRecruiter(dataPlus)
    
                    if (!register || !registerPlus) {
                        res.status(401).json({status:401,message:`Register failed`})
                    } else {
                        res.status(201).json({status:201,message:`Register success`})
                    }
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
    },
    getUsersById: async (req,res,next)=>{
        try {
            let id = req.payload.id
            let data = await selectUsersById(id)
        
            if(data.rows[0]){
                res.status(200).json({status:200,message:`data user found`,data:data.rows})
            } else {
                res.status(400).json({status:400,message:`data user not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    loginUsers: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.password) {
                res.status(404).json({status:404,message:`Please fill Email or Password`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)

                if (!users) {
                    res.status(404).json({status:404,message:`Incorrect Email or Password`})
                } else {
                    let verifyPassword = await argon2.verify(users.password,req.body.password)

                    let data = users
                    delete data.password

                    let token = generateToken(users)

                    if (verifyPassword) {
                        users.token = token
                        delete users.password
                        res.status(200).json({status:200,message:`Login success`,data:users})
                    } else {
                        res.status(404).json({status:404,message:`Login failed`})
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = usersController