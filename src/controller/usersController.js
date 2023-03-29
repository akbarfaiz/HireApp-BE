const {selectUsers,insertUsers,insertRecruiter,selectUsersById,findUser,insertOTP,getOTP,changePassword} = require('../models/usersModel')
const {createPekerja} = require('../models/pekerjaModels')
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2');
const generateToken = require('./../helper/generateToken');
const { NULL } = require('sass');
const email = require("../middleware/emailOTP")

const usersController = {
    createUsers: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.password || !req.body.confirm_password || !req.body.nama || !req.body.phone) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else if (req.body.password != req.body.confirm_password) {
                res.status(404).json({status:404,message:`Your password and confirm password are different`})
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
                        photo: 'https://res.cloudinary.com/dfwx7ogug/image/upload/v1679895162/HireApp/Users/WhatsApp_Image_2023-03-27_at_12.31.39_rrka4g.jpg'
                    }
    
                    let register = await insertUsers(data)
                    let create = await createPekerja(id)
    
                    if (!register || !create) {
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
            if (!req.body.email || !req.body.password || !req.body.confirm_password || !req.body.nama || !req.body.phone || !req.body.jabatan || !req.body.perusahaan) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else if (req.body.password != req.body.confirm_password) {
                res.status(404).json({status:404,message:`Your password and confirm password are different`})
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
                        photo: 'https://res.cloudinary.com/dfwx7ogug/image/upload/v1679895162/HireApp/Users/WhatsApp_Image_2023-03-27_at_12.31.39_rrka4g.jpg'
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
    },
    getOTPforEmail: async (req,res,next)=>{
        try {
            if (!req.body.email) {
                res.status(404).json({status:404,message:`Please fill your email`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)
                if (users) {
                    let otp = Math.floor(100000 + Math.random() * 900000)

                    let inOTP = await insertOTP(req.body.email,otp)
                    if (!inOTP) {
                        res.status(404).json({status:404,message:`Failed to get OTP`})
                    } else {
                        try {
                            let sendEmail =  email(req.body.email,otp)
                            if(sendEmail == 'email not send'){
                                res.status(404).json({status:404,message:`Failed to send email`})                
                            } else {
                                res.status(200).json({status:200,message:`Please check your email`})
                            }
                        } catch (error) {
                            res.status(404).json({status:404,error:error.message})
                        }
                    }
                } else {
                    res.status(404).json({status:404,message:`User not found`})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    verifyChangePassword: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.otp) {
                res.status(404).json({status:404,message:`Please fill your email and OTP`})
            } else {
                let findEmail = await getOTP(req.body.email,req.body.otp)
                if (!findEmail.rows[0]) {
                    res.status(404).json({status:404,message:`Your email or OTP wrong`})
                } else {
                    res.status(200).json({status:200,message:`Confirm success`,data:findEmail.rows})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    resetPassword: async (req,res,next)=>{
        try {
            if (!req.body.password || !req.body.confirm_password || !req.body.email) {
                res.status(404).json({status:404,message:`Please fill all column`})
            } else if (req.body.password != req.body.confirm_password) {
                res.status(404).json({status:404,message:`Your password and confirm password are different`})
            } else if (req.body.password.length < 6 || req.body.password.length > 12) {
                res.status(404).json({status:404,message:`Your password must in between 6 - 12 characters`})
            } else {
                let password = await argon2.hash(req.body.password)
                let reset = await changePassword(req.body.email,password)

                if (!reset) {
                    res.status(404).json({status:404,message:`Reset password failed`})
                } else {
                    res.status(200).json({status:200,message:`Reset password success`})
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = usersController