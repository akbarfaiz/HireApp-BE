
--User
CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    nama VARCHAR,
    phone VARCHAR,
    jabatan VARCHAR NULL
);

--Perusahaan/Perekrut
CREATE TABLE detail_perusahaan(
    id_user VARCHAR REFERENCES users(id),
    email_perusahaan VARCHAR NULL,
    nama_perusahaan VARCHAR,
    phone_perusahaan VARCHAR NULL,
    bidang_perusahaan VARCHAR NULL,
    info_perusahaan VARCHAR NULL,
    provinsi VARCHAR NULL,
    provinsi_id INT NULL,
    kota VARCHAR NULL,
    kota_id INT NULL
);

DROP TABLE detail_perusahaan;

--Pekerja
CREATE TABLE detail_pekerja(
    id_user VARCHAR REFERENCES users(id),
    provinsi VARCHAR,
    provinsi_id INT,
    kota VARCHAR,
    kota_id INT,
    tempat_kerja VARCHAR,
    deskripsi VARCHAR
);

DROP TABLE detail_pekerja;