const Pool = require('../config/db')

const selectUsers = () => {
    return Pool.query(
      `SELECT * FROM users`
    );
  };

const insertUsers = data => {
    const {id,email,password,nama,phone,jabatan} = data
    return new Promise((resolve,reject)=>
    Pool.query(`INSERT INTO users(id,email,password,nama,phone,jabatan) VALUES('${id}','${email}','${password}','${nama}','${phone}','${jabatan}')`,(err,result)=>{
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

module.exports = {selectUsers,insertUsers,selectUsersById,findUser}