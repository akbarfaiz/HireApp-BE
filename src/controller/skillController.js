const {insertSkill,getSkill,getSkillbyName,getSkillbyIdUser,updateSkill} = require('../models/skillModel')

const skillController = {
    createSkill: async (req,res,next)=>{
        try {
            if (!req.body.nama_skill) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let checkData = await getSkillbyIdUser(req.payload.id)

                let data = {
                    id_user: req.payload.id,
                    nama_skill: req.body.nama_skill
                }

                if (checkData.rows[0]) {
                    let upSkill = await updateSkill(data)

                    if (!upSkill) {
                        res.status(401).json({status:401,message:`Update skill failed`})
                    } else {
                        res.status(201).json({status:201,message:`Update skill success`})
                    }
                } else {
                    let addSkill = await insertSkill(data)

                    if (!addSkill) {
                        res.status(401).json({status:401,message:`Add skill failed`})
                    } else {
                        res.status(201).json({status:201,message:`Add skill success`})
                    }
                    
                }
            }
        } catch (error) {
            res.status(401).json({status:401,message:`Add skill failed`,error:error.message})
        }
    },
    getSkill: async (req,res,next)=>{
        try {
            let showSkill = await getSkill()

            if (showSkill.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:showSkill.rows})
            } else {
                res.status(400).json({status:400,message:`data skill not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    getSkillByname: async (req,res,next)=>{
        try {
            let pagination = {
                page: req.query.page || 1,
                limit: req.query.limit || 4
            }
            let showSkill = await getSkillbyName(req.body.nama_skill,pagination)

            if (showSkill.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:showSkill.rows})
            } else {
                res.status(400).json({status:400,message:`data skill not found`})
            }
        } catch (error) {
            res.status(401).json({status:401,error:error.message})
        }
    },
    getSkillByUserId: async (req,res,next)=>{
        try {
            let showSkill = await getSkillbyIdUser(req.payload.id)

            if (showSkill.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:showSkill.rows})
            } else {
                res.status(400).json({status:400,message:`data skill not found`})
            }
        } catch (error) {
            res.status(401).json({status:401,error:error.message})
        }
    },
    getSkillByParams: async (req,res,next)=>{
        try {
            let showSkill = await getSkillbyIdUser(req.params.id)

            if (showSkill.rows[0]) {
                res.status(200).json({status:200,message:`data found`,data:showSkill.rows})
            } else {
                res.status(400).json({status:400,message:`data skill not found`})
            }
        } catch (error) {
            res.status(401).json({status:401,error:error.message})
        }
    }
}

module.exports = skillController