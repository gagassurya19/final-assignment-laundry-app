const express = require('express')
const app = express()
const CryptoJS = require("crypto-js");

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

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async (req, res) => {
    administrator.findAll()
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
    administrator.findAll({where: params})
        .then(result => {
            if(result.length == 0) {
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
app.post('/', async (req, res) => {
    // Deklarasi semua variable dalam table database member
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: encrypt(req.body.password),
        email: req.body.email,
        telephone: req.body.telephone,
        photo_profile: req.body.photo_profile,
        role: req.body.role,
        status: req.body.status
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
app.put('/:id', async (req, res) => {
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: encrypt(req.body.password),
        email: req.body.email,
        telephone: req.body.telephone,
        photo_profile: req.body.photo_profile,
        role: req.body.role,
        status: req.body.status
    }

    let id = {
        id_administrator: req.params.id
    }

    administrator.update(data, { where: id })
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