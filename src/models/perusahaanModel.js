const Pool = require('../config/db')

const insertDetailPerusahaan = data => {
    const {id_user,nama_perusahaan,email_perusahaan,phone_perusahaan,bidang_perusahaan,info_perusahaan,provinsi,kota} = data
    return new Promise((resolve,reject)=>
    Pool.query(`
    UPDATE 
        detail_perusahaan 
    SET 
        nama_perusahaan = '${nama_perusahaan}', 
        email_perusahaan = '${email_perusahaan}', 
        phone_perusahaan = '${phone_perusahaan}', 
        bidang_perusahaan = '${bidang_perusahaan}', 
        info_perusahaan = '${info_perusahaan}', 
        provinsi = '${provinsi}', 
        kota = '${kota}' 
    WHERE id_user = '${id_user}'`,
    (err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

const getDetailPerusahaan = id => {
    return new Promise((resolve,reject)=>
    Pool.query(`
    SELECT
        detail_perusahaan.nama_perusahaan,
        detail_perusahaan.bidang_perusahaan,
        detail_perusahaan.provinsi,
        detail_perusahaan.kota,
        detail_perusahaan.info_perusahaan as deskripsi,
        users.email,
        detail_perusahaan.email_perusahaan,
        detail_perusahaan.phone_perusahaan
    FROM 
        detail_perusahaan 
    JOIN
        users ON users.id = detail_perusahaan.id_user
    WHERE id_user='${id}'`,(err,result)=>{
        if(!err){
        resolve(result)
        } else {
        reject(err)
        }
    }))
}

module.exports = {insertDetailPerusahaan,getDetailPerusahaan}