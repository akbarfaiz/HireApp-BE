const Pool = require('../config/db')

const insertSkill = data => {
    const {id_user,nama_skill} = data
    return new Promise((resolve,reject)=>
    Pool.query(`INSERT INTO skill(id_user,nama_skill) VALUES('${id_user}','${nama_skill}')`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const getSkill = () => {
    return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT
        users.nama,
        skill.nama_skill
    FROM 
        skill
    JOIN
        users ON users.id = skill.id_user`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

const getSkillbyIdUser = (id) => {
    return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT
        users.nama,
        skill.nama_skill
    FROM 
        skill
    JOIN
        users ON users.id = skill.id_user
    WHERE skill.id_user = '${id}'`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

const getSkillbyName = (nama,pagination) => {
    const {page,limit} = pagination
    return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT
        us.nama,
        dp.id_user, 
        us.photo, 
        us.email, 
        us.phone, 
        dp.provinsi,
        dp.provinsi_id, 
        dp.kota, 
        dp.kota_id, 
        dp.deskripsi, 
        dp.job,
        skill.nama_skill
    FROM 
        skill
    JOIN
        users as us ON us.id = skill.id_user
    JOIN
        detail_pekerja as dp ON dp.id_user = skill.id_user
    WHERE LOWER(nama_skill) LIKE LOWER('%${nama}%')
    OFFSET ${(page-1)*limit} LIMIT ${limit};`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
};

const updateSkill = data => {
    const {id_user,nama_skill} = data
    return new Promise((resolve,reject)=>
    Pool.query(`UPDATE skill SET nama_skill = '${nama_skill}' WHERE id_user = '${id_user}'`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

module.exports = {insertSkill,getSkill,getSkillbyName,getSkillbyIdUser,updateSkill}