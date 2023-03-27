const {selectPekerja,selectPekerjaById,insertPekerja,updateDataPekerja,deleteDataPekerja} = require('../models/pekerjaModels')
const {updateNameUsers} = require('../models/usersModel')

const pekerjaController = {
    getPekerja: async (req,res,next)=>{
        try {
            let showUser = await selectPekerja()
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
            let id = req.id_user
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

   
    editProfilePekerja: async (req,res,next)=>{
        try {
            if (!req.body.nama || !req.body.provinsi|| !req.body.provinsi_id || !req.body.kota || !req.body.kota_id || !req.body.tempatkerja || !req.body.deskripsi) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let name = req.body.nama;
                let data = {
                    id_user: req.payload.id,
                    provinsi: req.body.provinsi,
                    provinsi_id: req.body.provinsi_id,
                    kota: req.body.kota,
                    kota_id: req.body.kota_id,
                    tempatkerja: req.body.tempatkerja,
                    deskripsi: req.body.deskripsi
                }

                let insert = await updateDataPekerja(data)
                let insName = await updateNameUsers(name)

                if (insert && insName) {
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

module.exports = pekerjaController;