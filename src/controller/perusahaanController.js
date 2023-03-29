const {insertDetailPerusahaan,getDetailPerusahaan} = require('../models/perusahaanModel')
const {updateEmailUsers,selectUsersById,updatePhotoUsers} = require('../models/usersModel')
const cloudinary = require("../config/cloudinary")

const perusahaanController = {
    editProfile: async (req,res,next)=>{
        try {
            if (!req.body.email || !req.body.nama_perusahaan|| !req.body.bidang_perusahaan || !req.body.provinsi || !req.body.kota || !req.body.deskripsi || !req.body.email_perusahaan || !req.body.phone) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                if (req.file) {
                    let oldData = await selectUsersById(req.payload.id)
                    const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'HireApp/Users'})

                    if (!imageUrl) {
                        res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
                    }else{
                        let data = {
                            id_user: req.payload.id,
                            nama_perusahaan:req.body.nama_perusahaan || oldData.rows[0].nama_perusahaan,
                            email_perusahaan:req.body.email_perusahaan || oldData.rows[0].email_perusahaan,
                            phone_perusahaan:req.body.phone || oldData.rows[0].phone_perusahaan,
                            bidang_perusahaan:req.body.bidang_perusahaan || oldData.rows[0].bidang_perusahaan,
                            info_perusahaan:req.body.deskripsi || oldData.rows[0].info_perusahaan,
                            provinsi:req.body.provinsi || oldData.rows[0].provinsi,
                            kota:req.body.kota || oldData.rows[0].kota
                        }

                        let inPhoto = await updatePhotoUsers(data.id_user,imageUrl.secure_url)
                        let insert = await insertDetailPerusahaan(data)
                        let upEmail = await updateEmailUsers(data.id_user,req.body.email)

                        if (insert && upEmail && inPhoto) {
                            res.status(201).json({status:201,message:`Edit profile success`})
                        } else {
                            res.status(401).json({status:401,message:`Edit profile failed`})
                        }
                    }   
                } else {
                    let data = {
                        id_user: req.payload.id,
                        nama_perusahaan:req.body.nama_perusahaan || oldData.rows[0].nama_perusahaan,
                        email_perusahaan:req.body.email_perusahaan || oldData.rows[0].email_perusahaan,
                        phone_perusahaan:req.body.phone || oldData.rows[0].phone_perusahaan,
                        bidang_perusahaan:req.body.bidang_perusahaan || oldData.rows[0].bidang_perusahaan,
                        info_perusahaan:req.body.deskripsi || oldData.rows[0].info_perusahaan,
                        provinsi:req.body.provinsi || oldData.rows[0].provinsi,
                        kota:req.body.kota || oldData.rows[0].kota
                    }

                    let insert = await insertDetailPerusahaan(data)
                    let upEmail = await updateEmailUsers(data.id_user,req.body.email)

                    if (insert && upEmail) {
                        res.status(201).json({status:201,message:`Edit profile success`})
                    } else {
                        res.status(401).json({status:401,message:`Edit profile failed`})
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    },
    getProfile: async (req,res,next)=>{
        try {
            let showDetail = await getDetailPerusahaan(req.payload.id)
            if (!showDetail.rows[0]) {
                res.status(400).json({status:400,message:`data detail not found`})
            } else {
                res.status(200).json({status:200,message:`data found`,data:showDetail.rows})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = perusahaanController