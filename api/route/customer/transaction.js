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
app.get('/:id', async (req, res) => {
    let params = {
        id_customer: req.params.id
    }
    transaction.findAll({where: params, include: [{ all: true, nested: true }] })
        .then(result => {
            if(result.length == 0) {
                res.json({
                    data_transaction: "Data not found",
                    found: false
                })
            } else {
                res.json({
                    data_transaction: result,
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
        id_customer: req.body.id_customer,
        id_administrator: req.body.id_administrator,
        id_address_customer: req.body.id_address_customer,
        id_package: req.body.id_package,
        id_outlet: req.body.id_outlet,
        id_payment_customer: req.body.id_payment_customer,
        invoice_code: req.body.invoice_code,
        pickup_date: req.body.pickup_date,
        drop_date: req.body.drop_date,
        pickup_time: req.body.pickup_time,
        drop_time: req.body.drop_time,
        notes_laundry: req.body.notes_laundry,
        notes_driver: req.body.notes_driver,
        status: req.body.status
    }

    transaction.create(data)
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
        id_customer: req.body.id_customer,
        id_administrator: req.body.id_administrator,
        id_address_customer: req.body.id_address_customer,
        id_package: req.body.id_package,
        id_outlet: req.body.id_outlet,
        id_payment_customer: req.body.id_payment_customer,
        invoice_code: req.body.invoice_code,
        pickup_date: req.body.pickup_date,
        drop_date: req.body.drop_date,
        pickup_time: req.body.pickup_time,
        drop_time: req.body.drop_time,
        notes_laundry: req.body.notes_laundry,
        notes_driver: req.body.notes_driver,
        status: req.body.status
    }

    let id = {
        id_transaction: req.params.id
    }

    transaction.update(data, { where: id })
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
        id_transaction: req.params.id
    }

    transaction.destroy({ where: id })
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