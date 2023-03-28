const Pool = require('../config/db')

const selectPortofolioByUserId = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT *
      FROM portofolio
      WHERE id_user = '${id}';`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
    }))
};

const selectPortofolioById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT *
      FROM portofolio
      WHERE id = ${id};`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
    }))
};

const createPortofolio = (data) => {
    const {id_user,link_repo,nama_perusahaan,tipe,photo} = data
    let created_at = new Date()
    return new Promise((resolve,reject)=>
      Pool.query(`
        INSERT INTO 
            portofolio(id_user,link_repo,nama_perusahaan,tipe,photo,created_at) 
        VALUES('${id_user}','${link_repo}','${nama_perusahaan}','${tipe}','${photo}','${created_at}')`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
    }))
};

const updatePortofolio = (id,data) => {
  const {link_repo,nama_perusahaan,tipe,photo} = data
  return new Promise((resolve,reject)=>
  Pool.query(`
  UPDATE 
      portofolio
  SET 
      link_repo = '${link_repo}', 
      nama_perusahaan = '${nama_perusahaan}', 
      tipe = '${tipe}', 
      photo = '${photo}'
  WHERE id = ${id}`,
  (err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
}

const deletePortofolio = (id) => {
    return new Promise((resolve,reject)=>
    Pool.query(`DELETE FROM portofolio WHERE id = ${id}`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}


module.exports = {selectPortofolioByUserId,selectPortofolioById,createPortofolio,updatePortofolio,deletePortofolio}