const {selectPekerja,selectPekerjaById,selectPekerjaByName,insertPekerja,updateDataPekerja,deleteDataPekerja} = require('../models/pekerjaModels')
const {updateNameUsers} = require('../models/usersModel')

const pekerjaController = {
    getPekerja: async (req,res,next)=>{
        try {
            let data = {
                page: req.query.page || 1,
                limit: req.query.limit || 4
            }
            let showUser = await selectPekerja(data)
            if (!showUser.rows[0]) {
                res.status(400).json({status:400,message:`data pekerja not found`})
            } else {
                res.status(200).json({status:200,message:`data found`,data:showUser.rows})
            }
        } catch (error) {
            next(error)
        }
    },

    getPekerjaById: async (req, res, next) => {
        try {
            let id = req.payload.id
            let data = await selectPekerjaById(id)
        
            if(data.rows[0]){
                res.status(200).json({status:200,message:`data pekerja found`,data:data.rows})
            } else {
                res.status(400).json({status:400,message:`data pekerja not found`})
            }
        } catch (error) {
            next(error)
        }
    },

    getDetailPekerjaById: async (req, res, next) => {
        try {
            let id = req.params.id
            let data = await selectPekerjaById(id)
        
            if(data.rows[0]){
                res.status(200).json({status:200,message:`data pekerja found`,data:data.rows})
            } else {
                res.status(400).json({status:400,message:`data pekerja not found`})
            }
        } catch (error) {
            next(error)
        }
    },

    getPekerjaByName: async (req, res, next) => {
        try {
            let name = req.query.nama
            let pagination = {
                page: req.query.page || 1,
                limit: req.query.limit || 4
            }
            let data = await selectPekerjaByName(name,pagination)
        
            if(data.rows[0]){
                res.status(200).json({status:200,message:`data pekerja found`,data:data.rows})
            } else {
                res.status(400).json({status:400,message:`data pekerja not found`})
            }
        } catch (error) {
            next(error)
        }
    },

    // id_user,provinsi,provinsi_id,kota,kota_id,tempatkerja,deskripsi
    
    editProfilePekerja: async (req,res,next)=>{
        try {
            if (!req.body.nama || !req.body.provinsi|| !req.body.kota || !req.body.tempatkerja || !req.body.deskripsi || !req.body.job) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let id = req.payload.id
                let oldData = await selectPekerjaById(id)
                let nama = req.body.nama;
                let data = {
                    id_user: req.payload.id,
                    provinsi: req.body.provinsi,
                    kota: req.body.kota,
                    tempatkerja: req.body.tempatkerja,
                    deskripsi: req.body.deskripsi,
                    job: req.body.job
                }
                
                if (oldData.rows[0]) {
                    let insert = await updateDataPekerja(data)
                    let insName = await updateNameUsers(data.id_user,nama)

                    if (insert && insName) {
                        res.status(201).json({status:201,message:`Edit profile success`})
                    } else {
                        res.status(401).json({status:401,message:`Edit profile failed`})
                    }
                } else {
                    let insert = await insertPekerja(data)
                    let insName = await updateNameUsers(data.id_user,nama)

                    if (insert && insName) {
                        res.status(201).json({status:201,message:`Create profile success`})
                    } else {
                        res.status(401).json({status:401,message:`Create profile failed`})
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    }
    
   
}

module.exports = pekerjaController;