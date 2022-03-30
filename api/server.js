require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

// deklarasi autentikasi user/admin
const auth_admin = require('./route/middleware/admin/auth');
const auth_customer = require('./route/middleware/customer/auth');

// deklarasi router admin section
const customer = require('./route/admin/customer')
const administrator = require('./route/admin/administrator')
const package = require('./route/admin/package')
const outlet = require('./route/admin/outlet')
const payment_customer = require('./route/admin/payment_customer')
const address_customer = require('./route/admin/address_customer')
const transaction = require('./route/admin/transaction')

// deklrasi router customer section
const c_payment_customer = require('./route/customer/payment_customer')
const c_address_customer = require('./route/customer/address_customer')
const c_transaction = require('./route/customer/transaction')
const c_customer = require('./route/customer/customer')
const c_outlet = require('./route/customer/outlet')
const c_package = require('./route/customer/package')
const c_invoice = require('./route/customer/invoice')

// use autentikasi
app.use('/auth_admin', auth_admin)
app.use('/auth_customer', auth_customer)

// use router admin section
app.use("/admin_customer", customer)
app.use("/admin_administrator", administrator)
app.use("/admin_package", package)
app.use("/admin_outlet", outlet)
app.use("/admin_payment_customer", payment_customer)
app.use("/admin_address_customer", address_customer)
app.use("/admin_transaction", transaction)

// use router customer section
app.use("/customer_payment_customer", c_payment_customer)
app.use("/customer_address_customer", c_address_customer)
app.use("/customer_transaction", c_transaction)
app.use("/customer_crud", c_customer)
app.use("/customer_outlet", c_outlet)
app.use("/customer_package", c_package)
app.use("/customer_invoice", c_invoice)

app.listen(process.env.PORT, () => {
    console.log("server start: " + process.env.PORT)
})