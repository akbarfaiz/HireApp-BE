-- Active: 1679554972670@@149.129.241.190@5432@b9k2
-- Active: 1679554972670@@149.129.241.190@5432@b9k2
-- Active: 1679554972670@@149.129.241.190@5432@b9k2

--User
CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    nama VARCHAR,
    phone VARCHAR,
    jabatan VARCHAR NULL,
    otp VARCHAR NULL,
    photo VARCHAR NULL
);

ALTER TABLE users ADD photo VARCHAR NULL;

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
    tempat_kerja VARCHAR,
    deskripsi VARCHAR
);

DROP TABLE detail_pekerja;