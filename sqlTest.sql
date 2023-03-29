
select * from users;

SELECT * FROM detailpekerja;

SELECT dp.id_user, us.nama, us.email, us.phone, dp.provinsi,dp.provinsi_id, dp.kota, dp.kota_id, dp.tempatkerja, dp.deskripsi FROM detailpekerja as dp
join users as us on us.id = dp.id_user;

SELECT us.nama as NamaLengkap, dp.deskripsi as JobDesk, dp.kota as Domisili, dp.tempat_kerja as TempatKerja  FROM detail_pekerja as dp 
JOIN users AS us on us.id = dp.id_user;

SELECT md.message_id as chatid, m.id_user_perekrut, m.id_user_pekerja, m.created_at, md.chat, md.updated_at FROM messages as m
join messagedetail as md on md.message_id = m.message_detail_id;

SELECT md.message_id as chatid, m.id_user_perekrut, m.id_user_pekerja, m.created_at, md.chat, md.updated_at FROM messages as m
join messagedetail as md on md.message_id = m.message_detail_id
WHERE md.message_id = '';

SELECT r.id ,r.id_pekerja as sender, r.id_perusahaan as receiver, cm.chat, cm.created_at FROM chatmessage as cm 
JOIN roomchat as r on r.id = cm.chat_id
WHERE (sender = '' AND receiver ='') or (sender ='' AND receiver = '')
ORDER BY cm.created_at;

select * from roomchat;

INSERT INTO roomchat(id_perusahaan, id_pekerja, position, description) VALUES ('78d09fdb-bb4f-4e6c-b785-c9883617a451',
'd7876cd9-0cb6-4d33-a92d-a49feb2c02f4','sdaada','dasadadadaa' );

INSERT INTO chatmessage VALUES('1','d7876cd9-0cb6-4d33-a92d-a49feb2c02f4','78d09fdb-bb4f-4e6c-b785-c9883617a451','iya');


CREATE TABLE roomChat(
    id SERIAL PRIMARY KEY,
    id_perusahaan VARCHAR REFERENCES users(id),
    id_pekerja VARCHAR REFERENCES users(id),
    position VARCHAR,
    description TEXT,
    created_at TIMESTAMP
);

--chatMessage
CREATE TABLE chatMessage(
    chat_id SERIAL REFERENCES roomChat(id),
    sender VARCHAR REFERENCES users(id),
    receiver VARCHAR REFERENCES users(id),
    chat TEXT,
    created_at TIMESTAMP
);