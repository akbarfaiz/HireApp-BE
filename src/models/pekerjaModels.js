const Pool = require('../config/db')

const selectPekerja = (data) => {
    const {page,limit} = data
    return Pool.query(
      `SELECT dp.id_user, us.nama, us.photo, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.deskripsi, dp.job, skill.nama_skill
      FROM detail_pekerja as dp
      JOIN users as us on us.id = dp.id_user
      JOIN skill on dp.id_user = skill.id_user
      ORDER BY us.nama ASC
      OFFSET ${(page-1)*limit} LIMIT ${limit};`
    );
  };

  const selectPekerjaById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT dp.id_user, us.nama, us.photo, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.tempat_kerja, dp.deskripsi, dp.job, skill.nama_skill
      FROM detail_pekerja as dp
      JOIN users as us on us.id = dp.id_user
      JOIN skill on dp.id_user = skill.id_user
      WHERE dp.id_user = '${id}';`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
    }))
  };

  const selectPekerjaByName = (name,pagination) => {
    const {page,limit} = pagination
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT dp.id_user, us.nama, us.photo, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.tempat_kerja, dp.deskripsi, dp.job, skill.nama_skill
      FROM detail_pekerja as dp
      JOIN users as us on us.id = dp.id_user
      JOIN skill on dp.id_user = skill.id_user
      WHERE LOWER(us.nama) LIKE LOWER('%${name}%')
      ORDER BY us.nama ASC
      OFFSET ${(page-1)*limit} LIMIT ${limit};`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
    }))
  };


const updateDataPekerja = (data) => {
  let {provinsi,kota,tempatkerja,deskripsi,id_user,job} = data;
  return Pool.query(`UPDATE detail_pekerja SET provinsi='${provinsi}',kota='${kota}',
                    tempat_kerja ='${tempatkerja}',  deskripsi='${deskripsi}', job='${job}' WHERE id_user='${id_user}'`
)};

const insertPekerja = data => {
  let {provinsi,kota,tempatkerja,deskripsi,id_user,job} = data
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO detail_pekerja(provinsi,kota,tempat_kerja,deskripsi,id_user,job) VALUES('${provinsi}',
            '${kota}','${tempatkerja}','${deskripsi}','${id_user}','${job}')`,(err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
};

const createPekerja = id_user => {
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO detail_pekerja(id_user) VALUES('${id_user}')`,(err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
}

const deleteDataPekerja = (id) => {
  return Pool.query(
    `DELETE FROM datailpekerja WHERE id_user = ${id}`
  );
};





module.exports = {selectPekerja,selectPekerjaById,selectPekerjaByName,insertPekerja,createPekerja,updateDataPekerja,deleteDataPekerja}