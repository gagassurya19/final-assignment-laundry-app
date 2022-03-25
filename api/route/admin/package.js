const express = require('express')
const app = express()

// Panggil Model dari sequelize db:migrate
const package = require("../../models/index").package

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

// Get data by id
app.get('/:id', async (req, res) => {
    let params = {
        id_package: req.params.id
    }
    package.findAll({ where: params, include: [{ all: true, nested: true }] })
        .then(result => {
            if(result.length == 0) {
                res.json({
                    data_package: "Data not found",
                    found: false
                })
            } else {
                res.json({
                    data_package: result,
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
        name: req.body.name,
        price: req.body.price,
        notes: req.body.notes
    }

    package.create(data)
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
        name: req.body.name,
        price: req.body.price,
        notes: req.body.notes
    }

    let id = {
        id_package: req.params.id
    }

    package.update(data, { where: id })
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
        id_package: req.params.id
    }

    package.destroy({ where: id })
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