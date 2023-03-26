
select * from users;

SELECT * FROM detailpekerja;

SELECT dp.id_user, us.nama, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.tempatkerja, dp.deskripsi FROM detailpekerja as dp
join users as us on us.id = dp.id_user;

SELECT us.nama as NamaLengkap, dp.deskripsi as JobDesk, dp.kota as Domisili, dp.tempat_kerja as TempatKerja  FROM detail_pekerja as dp 
JOIN users AS us on us.id = dp.id_user;
