const express = require('express')
const app = express()
const CryptoJS = require("crypto-js");

// Panggil Model dari sequelize db:migrate
const customer = require("../../models/index").customer

// Berikan akses 'request-body'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("../middleware/customer/auth_verify")
app.use(verify)

// middleware, autentikasi role [admin, kasir, owner]
const authGetAccess = require("../permissions/auth_management").authGetAccess
app.use(authGetAccess)

// Ambil konfig
const secretKey = process.env.SECRETKEY;

// Password Encryption dengan menggunakan library crypto-js
// Encrypt
const encrypt = (nakedText) => {
    return hash = CryptoJS.HmacSHA256(nakedText, secretKey).toString()
}

// Get data by id
app.get('/:id', async (req, res) => {
    let params = {
        id_customer: req.params.id
    }
    customer.findAll({where: params, include: [{ all: true, nested: true }] })
        .then(result => {
            if(result.length == 0) {
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
    // Deklarasi semua variable dalam table database member
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        telephone: req.body.telephone,
        email: req.body.email,
        password: encrypt(req.body.password),
        photo_profile: req.body.photo_profile,
        status: req.body.status
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

// Update data
app.put('/:id', async (req, res) => {
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        telephone: req.body.telephone,
        email: req.body.email,
        password: encrypt(req.body.password),
        photo_profile: req.body.photo_profile,
        register_date: req.body.register_date,
        status: req.body.status
    }

    let id = {
        id_customer: req.params.id
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
app.delete('/:id', async (req, res) => {
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