const express = require('express')
const app = express()
const CryptoJS = require("crypto-js");

const multer = require("multer"); //multer digunakan untuk membaca data request dari form-data
const path = require("path"); //path untuk menage alamat direktori file
const fs = require("fs"); // fs atau fole stream digunakan untuk manage file

// Panggil Model dari sequelize db:migrate
const administrator = require("../../models/index").administrator

// Berikan akses 'request-body'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Ambil konfig
const secretKey = process.env.SECRETKEY;

// Password Encryption dengan menggunakan library crypto-js
// Encrypt
const encrypt = (nakedText) => {
    return hash = CryptoJS.HmacSHA256(nakedText, secretKey).toString()
}

// Middleware, Autentikasi user
const verify = require("../middleware/admin/auth_verify")
app.use(verify)

// middleware, autentikasi role [admin, kasir, owner]
const authGetAccess = require("../permissions/auth_management").authGetAccess
app.use(authGetAccess)

// manage image storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/image/admin");
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async (req, res) => {
    administrator.findAll({ include: [{ all: true, nested: true }] })
        .then(result => {
            res.json({
                data_administrator: result,
                found: true
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                found: false
            })
        })
})

// Get data by id
app.get('/:id', async (req, res) => {
    let params = {
        id_administrator: req.params.id
    }
    administrator.findAll({ where: params, include: [{ all: true, nested: true }] })
        .then(result => {
            if (result.length == 0) {
                res.json({
                    data_administrator: "Data not found",
                    found: false
                })
            } else {
                res.json({
                    data_administrator: result,
                    found: true
                })
            }
        })
        .catch(error => {
            res.json({
                message: error.message,
                found: false
            })
        })
})

// Add data
app.post('/', upload.single("photo_profile"), async (req, res) => {
    // Deklarasi semua variable dalam table database member
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: encrypt(req.body.password),
        email: req.body.email,
        telephone: req.body.telephone,
        role: req.body.role,
        status: req.body.status
    }

    if (req.file) {
        data.photo_profile = req.file.filename
    }

    administrator.create(data)
        .then(result => {
            res.json({
                message: "Data inserted",
                isSuccess: true,
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                isSuccess: false
            })
        })
})

// Update data
app.put('/:id', upload.single("photo_profile"), async (req, res) => {
    let params = {
        id_administrator: req.params.id
    }

    let data = {}

    if (req.body.first_name ||
        req.body.last_name ||
        req.body.username ||
        req.body.password ||
        req.body.email ||
        req.body.telephone ||
        req.body.role ||
        req.body.status) {
        data.first_name = req.body.first_name,
            data.last_name = req.body.last_name,
            data.username = req.body.username,
            data.email = req.body.email,
            data.telephone = req.body.telephone,
            data.role = req.body.role,
            data.status = req.body.status
    }

    if (req.body.password) {
        data.password = encrypt(req.body.password)
    }

    if (req.file) {
        // get data by id
        const row = await administrator.findOne({ where: params })
        let oldFileName = row.photo_profile

        if(oldFileName !== null){
            // // delete old file
            let dir = path.join(__dirname, "../../public/image/admin/", oldFileName)
            fs.unlink(dir, err => console.log(err))
        }

        // set new filename
        data.photo_profile = req.file.filename
    }

    administrator.update(data, { where: params })
        .then(result => {
            res.json({
                message: "Data updated",
                isSuccess: true
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                isSuccess: false
            })
        })
})

// Delete data
app.delete('/:id', async (req, res) => {
    let id = {
        id_administrator: req.params.id
    }

    administrator.destroy({ where: id })
        .then(result => {
            res.json({
                message: "Data deleted",
                isSuccess: true
            })
        })
        .catch(error => {
            res.json({
                message: error.message,
                isSuccess: false
            })
        })
})

module.exports = app