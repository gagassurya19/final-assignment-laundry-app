const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const payment_customer = require("../../models/index").payment_customer

// Berikan akses 'request-body'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("../middleware/customer/auth_verify")
app.use(verify)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async (req, res) => {
    payment_customer.findAll()
        .then(result => {
            res.json({
                data_payment_customer: result,
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
        id_payment_customer: req.params.id
    }
    payment_customer.findAll({where: params})
        .then(result => {
            if(result.length == 0) {
                res.json({
                    data_payment_customer: "Data not found",
                    found: false
                })
            } else {
                res.json({
                    data_payment_customer: result,
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
        payment_name: req.body.payment_name,
        payment_number: req.body.payment_number,
        payment_bank_name: req.body.payment_bank_name,
        notes: req.body.notes
    }

    payment_customer.create(data)
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
        payment_name: req.body.payment_name,
        payment_number: req.body.payment_number,
        payment_bank_name: req.body.payment_bank_name,
        notes: req.body.notes
    }

    let id = {
        id_payment_customer: req.params.id
    }

    payment_customer.update(data, { where: id })
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
        id_payment_customer: req.params.id
    }

    payment_customer.destroy({ where: id })
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