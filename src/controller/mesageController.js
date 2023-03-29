const {selectAllChat, insertRoomChat, insertChatMessage} = require ('../models/messageModel');
const { v4: uuidv4 } = require("uuid");

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
           
                let id_perusahaan = req.payload.id
                let id_pekerja = req.params.id
                let position = req.body.position
                let description = req.body.description
                let chat = req.body.chat
                let id = uuidv4()

                let data_c = {id_perusahaan, id_pekerja, position, description, id}
                let data_m = {
                    chat_id : id,
                    sender : id_perusahaan,
                    receiver : id_pekerja,
                    chat 
                }

                let insertRoom = await insertRoomChat(data_c)
                let insertMessage = await insertChatMessage(data_m)

                if (!insertRoom && insertMessage) {
                    res.status(404).json({status:404,message:`Create Chat failed`})
                } else {
                    res.status(201).json({status:201,message:`Create Chat success`})
                }
    },

    createMessage: async (req,res,next)=>{
        insertMessage: async (req, res,next) => {
            try {   

              let sender = req.payload.id
              let receiver = req.body.receiver_id
              let chat_id = req.params.chat_id
              let chat = req.body.chat
              console.log("sender_id = " , sender)
              const data_message = {
                chat_id,
                sender,
                receiver,
                chat
              }
              let response_message = await insertChatMessage(data_message)
              if (!response_message) {
                  return res.status(400).json({msg: "Failed sending message"});
              }
              return res.status(200).json({msg: "Success sending message", data: chat});
            } catch (error) {
              return next(res.status(404).json({msg: error.message, data: error}));
            }
        }
    }

}

module.exports = messageController