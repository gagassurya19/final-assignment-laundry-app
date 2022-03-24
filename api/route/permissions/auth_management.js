const jwt = require("jsonwebtoken")

const { canAccess } = require('./role_endpoint')

function authGetAccess(req, res, next) {
    const roleFromToken = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRETKEY).data.role;

    if (canAccess(req.method, req.baseUrl, roleFromToken)) {
        next();
    } else {
        res.status(401)
        return res.send({
            "code": 401,
            "message": "Not authorized"
            })
    }
}

module.exports = {
    authGetAccess
}