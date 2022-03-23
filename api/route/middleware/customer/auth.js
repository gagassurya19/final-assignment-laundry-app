const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
var CryptoJS = require("crypto-js");

// Ambil konfig
const secretKey = process.env.SECRETKEY;

// Password Encryption dengan menggunakan library crypto-js
// Encrypt
const encrypt = (nakedText) => {
    return hash = CryptoJS.HmacSHA256(nakedText, secretKey).toString()
}

// call model
const customer = require("../../../models/index").customer

// allow request body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/', async (req,res) => {
    // put data
    let data = {
        telephone: req.body.telephone,
        password: encrypt(req.body.password)
    }
    
    // put result
    let result = await customer.findOne({where:data})

    if(result === null){
        res.json({
            message: "invalid username or password",
            isLogged: false
        })
    } else {
        // jwt
        let jwtHeader = {
            algorithm: "HS256",
            // expiresIn: exp.expToken // 1s 1h 1d 1w 1y
        }

        let payload = {
            data: result
        }

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token,
            isLogged: true
        })
    }
})

module.exports = app