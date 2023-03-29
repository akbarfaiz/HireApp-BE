const Pool = require('../config/db')

const selectUsers = () => {
    return Pool.query(
      `SELECT email,nama,phone,jabatan,photo FROM users`
    );
  };

const insertUsers = data => {
    const {id,email,password,nama,phone,jabatan,photo} = data
    let query = ''
    if (jabatan) {
      query = `INSERT INTO users(id,email,password,nama,phone,photo,jabatan) VALUES('${id}','${email}','${password}','${nama}','${phone}','${photo}','${jabatan}')`
    } else {
      query = `INSERT INTO users(id,email,password,nama,phone,photo) VALUES('${id}','${email}','${password}','${nama}','${phone}','${photo}')`
    }
    return new Promise((resolve,reject)=>
    Pool.query(query,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const insertRecruiter= data => {
  const {id,perusahaan} = data
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO detail_perusahaan(id_user,nama_perusahaan) VALUES('${id}','${perusahaan}')`,(err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
}

const selectUsersById = (data) => {
  return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE id='${data}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
  }))
}

const findUser = (email) => {
  return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const insertOTP = (email,otp) => {
  return new Promise((resolve,reject)=>
    Pool.query(`UPDATE users SET otp = '${otp}' WHERE email = '${email}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const getOTP = (email,otp) => {
  return new Promise((resolve,reject)=>
    Pool.query(`SELECT * FROM users WHERE email = '${email}' AND otp = '${otp}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const changePassword = (email,password) => {
  return new Promise((resolve,reject)=>
    Pool.query(`UPDATE users SET password = '${password}' WHERE email = '${email}'`,
    (err,result)=>{
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    }))
}

const updateNameUsers = (id, data) => {
    return new Promise((resolve,reject)=>
    Pool.query(`UPDATE users SET nama = '${data}' WHERE id = '${id}'`,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const updateEmailUsers = (id, data) => {
  return new Promise((resolve,reject)=>
  Pool.query(`UPDATE users SET email = '${data}' WHERE id = '${id}'`,(err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
}

const updatePhotoUsers = (id,data) => {
  return new Promise((resolve,reject)=>
  Pool.query(`UPDATE users SET photo = '${data}' WHERE id = '${id}'`,(err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
}

module.exports = {selectUsers,insertUsers,insertRecruiter,selectUsersById,findUser,insertOTP,getOTP,changePassword,updatePhotoUsers, updateNameUsers, updateEmailUsers}
