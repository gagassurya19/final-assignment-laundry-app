const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const transaction = require("../../models/index").transaction

// Berikan akses 'request-body'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("../middleware/customer/auth_verify")
app.use(verify)

// middleware, autentikasi role [admin, kasir, owner]
const authGetAccess = require("../permissions/auth_management").authGetAccess
app.use(authGetAccess)

// Get data by id
app.get('/:invoice_code', async (req, res) => {
    let params = {
        invoice_code: req.params.invoice_code
    }
    transaction.findAll({where: params, include: [{ all: true, nested: true }] })
        .then(result => {
            if(result.length == 0) {
                res.json({
                    data_invoice: "Data not found",
                    found: false
                })
            } else {
                res.json({
                    data_invoice: result,
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

module.exports = app