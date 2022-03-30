const express = require('express')
const app = express()
const CryptoJS = require("crypto-js");

const multer = require("multer"); //multer digunakan untuk membaca data request dari form-data
const path = require("path"); //path untuk menage alamat direktori file
const fs = require("fs"); // fs atau fole stream digunakan untuk manage file

// Panggil Model dari sequelize db:migrate
const customer = require("../../models/index").customer

// Berikan akses 'request-body'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("../middleware/customer/auth_verify")

// middleware, autentikasi role [admin, kasir, owner]
const authGetAccess = require("../permissions/auth_management").authGetAccess

// Ambil konfig
const secretKey = process.env.SECRETKEY;

// Password Encryption dengan menggunakan library crypto-js
// Encrypt
const encrypt = (nakedText) => {
    return hash = CryptoJS.HmacSHA256(nakedText, secretKey).toString()
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image/customer");
    },
    filename: (req, file, cb) => {
        cb(null, "image-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Get data by id
app.get('/:id', verify, authGetAccess, async (req, res) => {
    let params = {
        id_customer: req.params.id
    }
    customer.findAll({ where: params, include: [{ all: true, nested: true }] })
        .then(result => {
            if (result.length == 0) {
                res.json({
                    data_customer: "Data not found",
                    found: false
                })
            } else {
                res.json({
                    data_customer: result,
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
app.post('/', async (req, res) => {
    upload.single("image")(req, res, () => {
        // Deklarasi semua variable dalam table database member
        let data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            telephone: req.body.telephone,
            email: req.body.email,
            password: encrypt(req.body.password),
            status: req.body.status
        }

        if (req.body.photo_profile) {
            data.photo_profile = req.file.path
        }
        
        customer.create(data)
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
})

// Update data
app.put('/:id', verify, authGetAccess, async (req, res) => {
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        telephone: req.body.telephone,
        email: req.body.email,
        photo_profile: req.body.photo_profile,
        register_date: req.body.register_date,
        status: req.body.status
    }

    let id = {
        id_customer: req.params.id
    }

    if (req.body.password) {
        data.password = encrypt(req.body.password)
    }

    customer.update(data, { where: id })
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
app.delete('/:id', verify, authGetAccess, async (req, res) => {
    let id = {
        id_customer: req.params.id
    }

    customer.destroy({ where: id })
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