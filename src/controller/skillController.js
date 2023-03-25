const {insertSkill,getSkill,getSkillbyName} = require('../models/skillModel')

const skillController = {
    createSkill: async (req,res,next)=>{
        try {
            if (!req.body.nama_skill) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    id_user: req.payload.id,
                    nama_skill: req.body.nama_skill
                }

                let addSkill = await insertSkill(data)

                if (!addSkill) {
                    res.status(401).json({status:401,message:`Add skill failed`})
                } else {
                    res.status(201).json({status:201,message:`Add skill success`})
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
            let showSkill = await getSkillbyName(req.body.nama_skill)

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