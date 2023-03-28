const {insertExperience,getExperience,getExperienceById,getExperienceByUserId,updateExperience,deleteExperience} = require('../models/experienceModel')

const experienceController = {
    createExperience: async (req,res,next)=>{
        try {
            if (!req.body.posisi || !req.body.nama_perusahaan || !req.body.start_at || !req.body.end_at || !req.body.deskripsi) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    id_user: req.payload.id,
                    posisi: req.body.posisi,
                    nama_perusahaan: req.body.nama_perusahaan,
                    start_at: req.body.start_at,
                    end_at: req.body.end_at,
                    deskripsi: req.body.deskripsi
                }

                let insert = await insertExperience(data)

                if (!insert) {
                    res.status(404).json({status:404,message:`Create experience failed`})
                } else {
                    res.status(201).json({status:201,message:`Create experience success`})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    getExperience: async (req,res,next)=>{
        try {
            let show = await getExperience()

            if (show.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:show.rows})
            } else {
                res.status(400).json({status:400,message:`data not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    getExperienceByUserId: async (req,res,next)=> {
        try {
            let show = await getExperienceByUserId(req.payload.id)

            if (show.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:show.rows})
            } else {
                res.status(400).json({status:400,message:`data not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    getDetailExperienceUserId: async (req,res,next)=> {
        try {
            let show = await getExperienceByUserId(req.params.id)

            if (show.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:show.rows})
            } else {
                res.status(400).json({status:400,message:`data not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    getExperienceById: async (req,res,next)=> {
        try {
            let show = await getExperienceById(req.params.id)

            if (show.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:show.rows})
            } else {
                res.status(400).json({status:400,message:`data not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    updateExperience: async (req,res,next)=> {
        try {
            let oldData = await getExperienceById(req.params.id)
            if (!oldData) {
                res.status(400).json({status:400,message:`False id`})
            } else if (oldData.rows[0].id_user != req.payload.id) {
                res.status(400).json({status:400,message:`This is not your data`})
            } else {
                let data = {
                    posisi: req.body.posisi || oldData.rows[0].posisi,
                    nama_perusahaan: req.body.nama_perusahaan || oldData.rows[0].nama_perusahaan,
                    start_at: req.body.start_at || oldData.rows[0].start_at,
                    end_at: req.body.end_at || oldData.rows[0].end_at,
                    deskripsi: req.body.deskripsi || oldData.rows[0].deskripsi
                }

                let update = await updateExperience(req.params.id,data)

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
    deleteExperience: async (req,res,next)=> {
        try {
            let data = await getExperienceById(req.params.id)
            if (!data.rows[0]) {
                res.status(400).json({status:400,message:`Data not found`})
            } else if (data.rows[0].id_user != req.payload.id) {
                res.status(400).json({status:400,message:`This is not your data`})
            } else {
                let deleteData = await deleteExperience(req.params.id)
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

module.exports = experienceController