const {selectPortofolioByUserId,selectPortofolioById,createPortofolio,updatePortofolio,deletePortofolio} = require('../models/portofolioModel')
const cloudinary = require("../config/cloudinary")

const portofolioController = {
    getPortofolioUser: async (req,res,next)=>{
        try {
            let id = req.payload.id
            let data = await selectPortofolioByUserId(id)
             if (data.rows[0]) {
                res.status(200).json({status:200,message:`data portofolio found`,data:data.rows})
             } else {
                res.status(400).json({status:400,message:`data portofolio not found`})
             }
        } catch (error) {
            next(error)
        }
    },
    getPortofolioById: async (req,res,next)=>{
        try {
            let id = req.params.id
            let data = await selectPortofolioById(id)
             if (data.rows[0]) {
                res.status(200).json({status:200,message:`data portofolio found`,data:data.rows})
             } else {
                res.status(400).json({status:400,message:`data portofolio not found`})
             }
        } catch (error) {
            next(error)
        }
    },
    createPortofolio: async (req,res,next)=>{
        try {
            if (req.file) {
                if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpg' && req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/jfif') {
                    res.status(404).json({status:404,message:`Your file is not png or jpg type`})
                } else {
                    const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'HireApp/Portofolio'})

                    if (!imageUrl) {
                        res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
                    } else {
                        let data = {
                            id_user: req.payload.id,
                            link_repo: req.body.link_repo,
                            nama_perusahaan: req.body.nama_perusahaan,
                            tipe: req.body.tipe,
                            photo: imageUrl.secure_url
                        }

                        let insert = await createPortofolio(data)

                        if (insert) {
                            res.status(200).json({status:200,message:`Input data success`})
                        } else {
                            res.status(404).json({status:404,message:`Input data failed`})
                        }
                    }
                }
            } else {
                let data = {
                    id_user: req.payload.id,
                    link_repo: req.body.link_repo,
                    nama_perusahaan: req.body.nama_perusahaan,
                    tipe: req.body.tipe,
                    photo: 'https://res.cloudinary.com/dfwx7ogug/image/upload/v1677589653/food/image_404_kto6wz.jpg'
                }

                let insert = await createPortofolio(data)

                if (insert) {
                    res.status(200).json({status:200,message:`Input data success`})
                } else {
                    res.status(404).json({status:404,message:`Input data failed`})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    updatePortofolio: async (req,res,next)=>{
        try {
            let oldData = await selectPortofolioById(req.params.id)
            if (!oldData.rows[0]) {
                res.status(400).json({status:400,message:`False id`})
            } else if (oldData.rows[0].id_user != req.payload.id) {
                res.status(400).json({status:400,message:`This is not your data`})
            } else {
                let photo
                if (!req.file) {
                    photo = oldData.rows[0].photo
                } else {
                    const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'HireApp/Portofolio'})
                    photo = imageUrl.secure_url
                }

                let data = {
                    link_repo: req.body.link_repo || oldData.rows[0].link_repo,
                    nama_perusahaan: req.body.nama_perusahaan || oldData.rows[0].nama_perusahaan,
                    tipe: req.body.tipe || oldData.rows[0].tipe,
                    photo: photo
                }

                let update = await updatePortofolio(req.params.id,data)

                if (!update) {
                    res.status(400).json({status:400,message:`Update data failed`})
                } else {
                    res.status(200).json({status:200,message:`Update data success`})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    deletePortofolio: async (req,res,next)=>{
        try {
            let data = await selectPortofolioById(req.params.id)
            if (!data.rows[0]) {
                res.status(400).json({status:400,message:`Data not found`})
            } else if (data.rows[0].id_user != req.payload.id) {
                res.status(400).json({status:400,message:`This is not your data`})
            } else {
                let deleteData = await deletePortofolio(req.params.id)
                if (!deleteData) {
                    res.status(400).json({status:400,message:`Delete data failed`})
                } else {
                    res.status(200).json({status:200,message:`Delete data success`})
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = portofolioController;