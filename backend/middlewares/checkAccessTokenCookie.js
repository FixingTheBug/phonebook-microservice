const JWT = require('jsonwebtoken')
const SECRET = 'secretString'

const checkAccess = (req, res, next) => {
    const token = req.cookies.access_token

    try {
        const decoded = JWT.verify(token, SECRET)
    } catch(err) {
        res.status(400).send({
            "status": "error",
            "message": err.message,
            "code": "TKN-001"
        })
    }

    next()
}

module.exports = checkAccess
