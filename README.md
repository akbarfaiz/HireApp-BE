
<h1 align="center">Hire App API</h1>
<p align="center">
  <img width="250" src="https://github.com/yosuanovry/HireApp-FE/blob/dev/src/Assets/LandingPage/hireapp_logo.png"  />
</p>

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#route">Route</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#our-team">Our Team</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project
The Hire app API is an API that functions as a backend consisting of data users who have 2 roles, namely Workers (Pekerja) and Companies (Perusahaan). Each role has its own detailed profile. Users also have experience, skill, and portfolio data. This API also supports chat functions between companies and workers where companies creating chat rooms. This API is built with <a href="https://expressjs.com">ExpressJs</a> which is a simple and flexible web application framework that uses <a href="https://nodejs.org/en/about/">NodeJs<a/>.

![DB Diagram](https://user-images.githubusercontent.com/87055460/229475516-3b5260fd-25f7-4cb4-8b09-2f2ad05b95a2.png)

### Built With

This app was built with some technologies below:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Requirements
1. <a href="https://nodejs.org/en/">Node Js</a>
2. <a href="https://www.postman.com/downloads/">Postman</a>
3. Database (<a href="https://www.postgresql.org/download/">PostgreSQL</a>)
4. Server (Localhost or Online Server)
5. <a href="https://cloudinary.com">Cloudinary</a>


## Installation

1. Clone the repo to your project directory

```bash
  git clone git@github.com:akbarfaiz/HireApp-BE.git
```
2. Open your project directory in CMD or terminal
3. Run command 'npm i' or 'npm install' to download the package on this API
```bash
  npm install
```
4. Make <a href='https://cloudinary.com'>Cloudinary</a> account to get cloud storage for recipe photo
5. Turn on your server like Xampp for localhost
6. Create database in your database
7. Make new file in your project directory callad '.env' and copy this code to that file :
```bash
  DB_USER= //Your User Database name
  DB_HOST=localhost //Your Database Server
  DB_NAME= //Your Database Name
  DB_PASS= //Your User Database Password
  DB_PORT=8080

  JWT_KEY= //Your JWT key or Random Number

  EMAIL_NAME= //Your Admin Email
  EMAIL_PASSWORD= //Your Admin Email Password

  PHOTO_NAME= //Your Cloudinary CLoud Name
  PHOTO_KEY= //Your Cloudinary API Key
  PHOTO_SECRET= //Your Cloudinary API Secret
```
8. Run your project with command below
```bash
  nodemon //To Start Development
```
9. Open Postman, choose HTTP request method and  request URL like localhost:4000/
    
## Route

* **Users**

    * **GET /users** → Get all users

    * **GET /users/profile** → Get users by id in token (Need Bearer Token)

    * **POST /users/login** → Login to Users

    * **POST /users/register** → Create User (Pekerja) 
        
        ```Body{email,password,confirm_password,nama,phone}```

    * **POST /users/register/recruiter** → Create User (Perusahaan/Rekruter) 
        ```Body{email,password,confirm_password,nama,phone,jabatan,perusahaan}```

    * **POST /users/otp** → For send otp to email
        
        ```Body{email}```

    * **POST /users/otp/confirm** → For email verification 
        
        ```Body{email,otp}```

    * **POST /users/reset** → Reset password
        
        ```Body{email,password,confirm_password}```

* **Detail Perusahaan (Company Detail)**
    * **GET /company** → Get detail perusahaan + user email (Need Bearer Token)

    * **PUT /company/editProfile** → Edit or Insert detail perusahaan data (Need Bearer Token) 
        ```Body{nama_perusahaan,bidang_perusahaan,provinsi,kota,deskripsi,email_perusahaan,phone,email}```

* **Detail Pekerja (Worker Detail)**
    * **GET /pekerja** → Get detail all pekerja | query?page=1&limit=4

    * **GET /pekerja/myProfile** → Get detail by User id (Need Bearer Token)

    * **GET /pekerja/detail/:id** → Get detail pekerja by params id

    * **GET /pekerja/search** → Get detail pekerja by name | query?nama=budi&page=1&limit=4

    * **PUT /pekerja** →  Edit atau Insert data detail perusahaan (Need Bearer Token) 
        
        ```Body{provinsi,kota.tempatkerja,deskripsi,nama,job}```

* **SKILL**
    * **GET /skill** → Get all skill

    * **GET /skill/search** → Get skill by name | query?nama=budi&page=1&limit=4

    * **GET /skill/mySkill** → Get skill by user id |  (Need Bearer Token)

    * **GET /skill/detail/:id** → Get skill by user id in params

    * **POST /skill** → Insert skill (Need Bearer Token)            
        ```Body{nama_skill}```

* **EXPERIENCE**
    * **GET /experience** → Get all experience

    * **GET /experience/myExperience** → Get experience by token id (Need Bearer Token)

    * **GET /experience/detail/:id** → Get experience by id

    * **GET /experience/show/:id** → Get experience by user id with params

    * **POST /experience** → Create experience (Need Bearer Token) 
        
        ```Body{posisi,nama_perusahaan,start_at,end_at,deskripsi}```

    * **PUT /experience/update/:id** → Update experience (Need Token) 
        
        ```Body{posisi,nama_perusahaan,start_at,end_at,deskripsi}```

    * **DELETE /experience/delete/:id** → Delete experience (Need Bearer Token)

* **PORTOFOLIO**
    * **GET /portofolio/myPortofolio** → Get Portofolio by token id (Need Bearer Token)

    * **GET /portofolio/detail/:id** → Get portofolio by id

    * **GET /portofolio/show/:id** → Get portofolio by user id in params

    * **POST /portofolio** → Create portofolio (Need Bearer Token) 
        
        ```Body{link_repo,nama_perusahaan,tipe,photo(FILE JPEG dan sepupu nya)}```

    * **UPDATE /portofolio/update/:id** → Update experience (Need Bearer Token) 
        
        ```Body{link_repo,nama_perusahaan,tipe,photo(FILE JPEG)}```

    * **DELETE /portofolio/delete/:id** → Delete portofolio (Need Bearer Token)

* **MESSAGE**
    * **GET /chat** → Get all room chat

    * **GET /chat/detail/:id** → Get all message by id room chat

    * **GET /chat/myChat** → Get room chat by User id (Need Bearer Token)

    * **POST /chat/:id** → Create room chat from hiring with params id pekerja (Need Bearer Token) 
        
        ```Body{position,description,chat}```

    * **POST /chat/messages/:id** → insert message with params id room chat (Need Bearer Token) 
        
        ```Body{receiver_id,chat}```

# Related Project
:rocket: [API](https://odd-lime-dibbler-ring.cyclic.app/)<br>
:rocket: [HireApp Website](https://github.com/yosuanovry/HireApp-FE)<br>

## Our Team

<center>
  <table>
    <tr>
      <th>Frontend Lead</th>
      <th>Frontend</th>
      <th>Backend Lead</th>
      <th>Backend</th>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/yosuanovry">
          <img width="150" style="background-size: contain;" src="https://avatars.githubusercontent.com/u/123917032?v=4" alt="Yosua Novry Susilo"><br/>
          <b>Yosua Novry Susilo</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/revofarissaifuddin">
          <img width="150" src="https://avatars.githubusercontent.com/u/47625301?v=4" alt="Revo Faris Saifuddin"><br/>
          <b>Revo Faris Saifuddin</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/akbarfaiz">
          <img width="150" src="https://avatars.githubusercontent.com/u/87055460?v=4" alt="Akbar Faiz"><br/>
          <b>Akbar Faiz</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/fauzanilmi220">
          <img width="150" src="https://avatars.githubusercontent.com/u/126861853?v=4" alt="Fauzan Ilmi"><br/>
          <b>Fauzan Ilmi</b>
        </a>
      </td>
    </tr>
  </table>
</center>

## License
Distributed under the [MIT](/LICENSE) License.
