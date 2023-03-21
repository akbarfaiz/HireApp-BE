
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
CREATE TABLE detailPerusahaan(
    id_user VARCHAR REFERENCES users(id),
    emailPerusahaan VARCHAR,
    namaPerusahaan VARCHAR,
    phonePerusahaan VARCHAR,
    bidangPerusahaan VARCHAR,
    infoPerusahaan VARCHAR,
    provinsi VARCHAR,
    provinsi_id INT,
    kota VARCHAR,
    kota_id INT
);

--Pekerja
CREATE TABLE detailPekerja(
    id_user VARCHAR REFERENCES users(id),
    provinsi VARCHAR,
    provinsi_id INT,
    kota VARCHAR,
    kota_id INT,
    tempatKerja VARCHAR,
    deskripsi VARCHAR
);