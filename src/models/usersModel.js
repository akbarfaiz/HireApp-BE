const Pool = require('../config/db')

const selectUsers = () => {
    return Pool.query(
      `SELECT * FROM users`
    );
  };

const insertUsers = data => {
    const {id,email,password,nama,phone,jabatan} = data
    let query = ''
    if (jabatan) {
      query = `INSERT INTO users(id,email,password,nama,phone,jabatan) VALUES('${id}','${email}','${password}','${nama}','${phone}','${jabatan}')`
    } else {
      query = `INSERT INTO users(id,email,password,nama,phone) VALUES('${id}','${email}','${password}','${nama}','${phone}')`
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

module.exports = {selectUsers,insertUsers,insertRecruiter,selectUsersById,findUser}