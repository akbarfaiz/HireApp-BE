const {selectAllChat, insertRoomChat, insertChatMessage} = require ('../models/messageModel');

const messageController = {

    getChat: async (req,res,next)=>{
        try {
            let showUser = await selectAllChat()
            if (!showUser.rows[0]) {
                res.status(400).json({status:400,message:`data pekerja not found`})
            } else {
                res.status(200).json({status:200,message:`data found`,data:showUser.rows})
            }
        } catch (error) {
            next(error)
        }
    },

    createRoomChat: async (req,res,next)=>{
        try {
            if (!req.body.id_perusahaan || !req.body.id_pekerja || !req.body.position || !req.body.description ) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    id_perusahaan: req.payload.id,
                    id_pekerja: req.payload.id,
                    position: req.body.position,
                    description: req.body.deskription
                }

                let insert = await insertRoomChat(data)

                if (!insert) {
                    res.status(404).json({status:404,message:`Create Chat failed`})
                } else {
                    res.status(201).json({status:201,message:`Create Chat success`})
                }
            }
        } catch (error) {
            next(error)
        }
    },

    createMessage: async (req,res,next)=>{
        try {
                

            if (!req.body.id_perusahaan || !req.body.id_pekerja || !req.body.position || !req.body.description ) {
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                let data = {
                    id_perusahaan: req.payload.id,
                    id_pekerja: req.payload.id,
                    position: req.body.position,
                    description: req.body.deskription
                }

                let insert = await insertRoomChat(data)

                if (!insert) {
                    res.status(404).json({status:404,message:`Create Chat failed`})
                } else {
                    res.status(201).json({status:201,message:`Create Chat success`})
                }
            }
        } catch (error) {
            next(error)
        }
    },

}

module.exports = messageController;