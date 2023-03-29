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
        ORDER BY cm.created_at;`,
        (err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    };

    const selectChatById = (id) => {
        return new Promise((resolve,reject)=>
        Pool.query(`SELECT r.id,cm.sender, cm.receiver ,r.id_pekerja , r.id_perusahaan, cm.chat, cm.created_at
        FROM chatmessage as cm 
        JOIN roomchat as r on r.id = cm.chat_id
        WHERE r.id = '${id}'
        ORDER BY cm.created_at ASC;`,
        (err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    }

    const selectChatByUserId = (id) => {
        return new Promise((resolve,reject)=>
        Pool.query(`SELECT rc.id,rc.id_pekerja, us.nama, us.photo, rc.id_perusahaan, dp.nama_perusahaan, rc.position, rc.description
        FROM roomchat as rc
        JOIN users as us ON us.id = rc.id_pekerja
        JOIN detail_perusahaan as dp ON dp.id_user = rc.id_perusahaan
        WHERE id_pekerja = '${id}' OR id_perusahaan = '${id}';`,
        (err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    }

    const insertRoomChat = data => {
        let {id, id_perusahaan, id_pekerja, position,description} = data
        let created_at = new Date();
        return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO roomchat(id, id_perusahaan, id_pekerja, position, description, created_at)
        VALUES ('${id}','${id_perusahaan}','${id_pekerja}','${position}','${description}','${created_at}')`,(err,result)=>{
            if(!err){
            resolve(result)
            } else {
            reject(err)
            }
        }))
    };      
    
    const insertChatMessage = data => {
        let {chat_id, sender, receiver, chat} = data
        let created_at = new Date();
        return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO chatmessage(chat_id, sender, receiver, chat,created_at)
        VALUES ('${chat_id}','${sender}','${receiver}','${chat}','${created_at}')`,(err,result)=>{
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



  module.exports = {selectAllChat,selectChatById,selectChatByUserId,insertRoomChat,insertChatMessage, selectChat, deleteRoomChat}