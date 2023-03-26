const Pool = require('../config/db')

const insertExperience = data => {
    const {id_user,posisi,nama_perusahaan,start_at,end_at,deskripsi} = data
    let created_at = new Date()
    return new Promise((resolve,reject)=>
    Pool.query(`
    INSERT INTO 
        experience(id_user,posisi,nama_perusahaan,start_at,end_at,deskripsi,created_at) 
    VALUES('${id_user}','${posisi}','${nama_perusahaan}','${start_at}','${end_at}','${deskripsi}','${created_at}')`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const getExperience = () => {
    return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM experience`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const getExperienceByUserId = (id) => {
    return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM experience WHERE id_user = '${id}'`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const getExperienceById = (id) => {
    return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM experience WHERE id = '${id}'`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const updateExperience = (id,data) => {
    const {posisi,nama_perusahaan,start_at,end_at,deskripsi} = data
    return new Promise((resolve,reject)=>
    Pool.query(`
    UPDATE 
        experience
    SET 
        posisi = '${posisi}', 
        nama_perusahaan = '${nama_perusahaan}', 
        start_at = '${start_at}', 
        end_at = '${end_at}', 
        deskripsi = '${deskripsi}' 
    WHERE id = ${id}`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const deleteExperience = (id) => {
    return new Promise((resolve,reject)=>
    Pool.query(`DELETE FROM experience WHERE id = ${id}`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

module.exports = {insertExperience,getExperience,getExperienceById,getExperienceByUserId,updateExperience,deleteExperience}