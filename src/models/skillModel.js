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

const getSkillbyName = (nama) => {
    return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT
        users.nama,
        skill.nama_skill
    FROM 
        skill
    JOIN
        users ON users.id = skill.id_user
    WHERE nama_skill LIKE '%${nama}%'`,
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