const Pool = require('../config/db')

const selectPekerja = () => {
    return Pool.query(
      `SELECT dp.id_user, us.nama, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.deskripsi 
      FROM detail_pekerja as dp
      join users as us on us.id = dp.id_user;`
    );
  };

  const selectPekerjaById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT dp.id_user, us.nama, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.tempat_kerja, dp.deskripsi 
      FROM detail_pekerja as dp
      join users as us on us.id = dp.id_user
      WHERE id_user = '${id}';`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
    }))
  };


const updateDataPekerja = (data) => {
  let {provinsi,kota,tempatkerja,deskripsi,id_user} = data;
  return Pool.query(`UPDATE detail_pekerja SET provinsi='${provinsi}',kota='${kota}',
                    tempat_kerja ='${tempatkerja}',  deskripsi='${deskripsi}' WHERE id_user='${id_user}'`
)};

const insertPekerja = data => {
  let {provinsi,kota,tempatkerja,deskripsi,id_user} = data
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO detail_pekerja(provinsi,kota,tempat_kerja,deskripsi,id_user) VALUES('${provinsi}',
            '${kota}','${tempatkerja}','${deskripsi}','${id_user}')`,(err,result)=>{
      if(!err){
      resolve(result)
      } else {
      reject(err)
      }
  }))
};

const deleteDataPekerja = (id) => {
  return Pool.query(
    `DELETE FROM datailpekerja WHERE id_user = ${id}`
  );
};





module.exports = {selectPekerja,selectPekerjaById,insertPekerja,updateDataPekerja,deleteDataPekerja}