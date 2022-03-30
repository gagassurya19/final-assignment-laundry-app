const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const package = require("../../models/index").package

// Berikan akses 'request-body'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("../middleware/customer/auth_verify")
app.use(verify)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async (req, res) => {
    package.findAll({ include: [{ all: true, nested: true }] })
        .then(result => {
            res.json({
                data_package: result,
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

module.exports = app