const Pool = require('../config/db')

    const selectAllChat = () => {
        return new Promise((resolve,reject)=>
        Pool.query(`SELECT * FROM roomchat;`,
        (err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    };

    const selectChat = (id1, id2) => {
        return new Promise((resolve,reject)=>
        Pool.query(`SELECT r.id ,r.id_pekerja as sender, r.id_perusahaan as receiver, cm.chat, cm.created_at FROM chatmessage as cm 
        JOIN roomchat as r on r.id = cm.chat_id
        WHERE (sender = '${id1}' AND receiver ='${id2}') or (sender ='${id2}' AND receiver = '${id1}')
        ORDER BY cm.created_at;;`,
        (err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    };

    const insertRoomChat = data => {
        let {perusahaan, pekerja, position,description} = data
        let created_at, updated_at = new date (now);
        return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO roomchat(id_perusahaan, id_pekerja, position, description, created_at, updated_at)
        VALUES (${perusahaan}','${pekerja}','${position}','${description}','${created_at}','${updated_at}')`,(err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    };      
    
    const insertChatMessage = data => {
        let {chat_id, sender, receiver, chat} = data
        let created_at = new date (now);
        return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO chatmessage(chat_id, sender, receiver, chat,created_at)
        VALUES ('${chat_id}',${sender}','${receiver}','${chat}''${created_at})`,(err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    };     
    
    const deleteRoomChat = (id) => {
        return new Promise((resolve,reject)=>
        Pool.query(`DELETE FROM roomchat WHERE id = ${id}`,
        (err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    };;



  module.exports = {selectAllChat,insertRoomChat,insertChatMessage, selectChat, deleteRoomChat}