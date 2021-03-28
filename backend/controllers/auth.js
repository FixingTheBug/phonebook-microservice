const User = require('../data/user.json')
const JWT = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'secretString'

module.exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if(email !== User.email || password !== User.password) {
        res.status(400).send({
            status: "error",
            data: "Wrong credentials",
            code: "AUT-001"
        })
    }

    const payload = {
        email: email
    }

    const token = JWT.sign(payload, SECRET)

    res.cookie('access_token', token, {
        maxAge: 3600,
        httpOnly: true,
    })

    res.status(200).send({
        status: "success",
        data: {
            token: {
                access_token: token
            }
        }
    })
}
