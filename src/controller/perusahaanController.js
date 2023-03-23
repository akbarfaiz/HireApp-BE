const {insertDetailPerusahaan} = require('../models/perusahaanModel')

const perusahaanController = {
    editProfile: async (req,res,next)=>{
        try {
            if (!req.body.nama_perusahaan|| !req.body.bidang_perusahaan || !req.body.provinsi || !req.body.kota || !req.body.deskripsi || !req.body.email_perusahaan || !req.body.phone) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    id_user: req.payload.id,
                    nama_perusahaan:req.body.nama_perusahaan,
                    email_perusahaan:req.body.email_perusahaan,
                    phone_perusahaan:req.body.phone,
                    bidang_perusahaan:req.body.bidang_perusahaan,
                    info_perusahaan:req.body.deskripsi,
                    provinsi:req.body.provinsi,
                    kota:req.body.kota
                }

                let insert = await insertDetailPerusahaan(data)

                if (insert) {
                    res.status(201).json({status:201,message:`Edit profile success`})
                } else {
                    res.status(401).json({status:401,message:`Edit profile failed`})
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = perusahaanController