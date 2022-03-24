const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const address_customer = require("../../models/index").address_customer

// Berikan akses 'request-body'
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middleware, Autentikasi user
const verify = require("../middleware/admin/auth_verify")
app.use(verify)

// middleware, autentikasi role [admin, kasir, owner]
const authGetAccess = require("../permissions/auth_management").authGetAccess
app.use(authGetAccess)

// Bagian CRUD [Create, Read, Update, Delete]
// Get data
app.get('/', async (req, res) => {
    address_customer.findAll()
        .then(result => {
            res.json({
                data_address_customer: result,
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
        id_address_customer: req.params.id
    }
    address_customer.findAll({where: params})
        .then(result => {
            if(result.length == 0) {
                res.json({
                    data_address_customer: "Data not found",
                    found: false
                })
            } else {
                res.json({
                    data_address_customer: result,
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
app.post('/', authGetAccess, async (req, res) => {
    // Deklarasi semua variable dalam table database member
    let data = {
        id_customer: req.body.id_customer,
        address_name: req.body.address_name,
        address_detail: req.body.address_detail,
        telephone: req.body.telephone,
        notes: req.body.notes
    }

    address_customer.create(data)
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
        address_name: req.body.address_name,
        address_detail: req.body.address_detail,
        telephone: req.body.telephone,
        notes: req.body.notes
    }

    let id = {
        id_address_customer: req.params.id
    }

    address_customer.update(data, { where: id })
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
        id_address_customer: req.params.id
    }

    address_customer.destroy({ where: id })
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