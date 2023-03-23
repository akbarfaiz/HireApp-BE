const Pool = require('../config/db')

const selectPekerja = () => {
    return Pool.query(
      `SELECT dp.id_user, us.nama, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.tempatkerja, dp.deskripsi 
      FROM detail_pekerja as dp
      join users as us on us.id = dp.id_user;`
    );
  };

  const selectPekerjaById = (id) => {
    return new Promise((resolve,reject)=>
      Pool.query(`SELECT dp.id_user, us.nama, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.tempatkerja, dp.deskripsi 
      FROM detail_pekerja as dp
      join users as us on us.id = dp.id_user
      WHERE id_user = ${id};`,
      (err,result)=>{
        if(!err){
          resolve(result)
        } else {
          reject(err)
        }
    }))
  };


const updateDataPekerja = (id, data) => {
  let {provinsi,provinsi_id,kota,kota_id,tempatkerja,deskripsi} = data;
  return Pool.query(`UPDATE detail_pekerja SET provinsi='${provinsi}',provinsi_id='${provinsi_id}',kota='${kota}',kota_id='${kota_id}',
                    tempatkerja =${tempatkerja},  deskripsi='${deskripsi}' WHERE id_user=${id}`
)};

const insertPekerja = data => {
  let {provinsi,provinsi_id,kota,kota_id,tempatkerja,deskripsi} = data
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO detail_pekerja(provinsi,provinsi_id,kota,kota_id,tempatkerja,deskripsi) VALUES('${id_user}','${provinsi}','${provinsi_id}',
            '${kota}','${kota_id}','${tempatkerja}','${deskripsi}')`,(err,result)=>{
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