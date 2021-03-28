const controllers = require('../../../controllers/')

module.exports = (app) => {
    app.get('/v1/companies/:id', (req, res) => {
        controllers.companies.read(req, res)
    })

    app.post('/v1/companies', (req, res) => {
        controllers.companies.create(req, res)
    })

    app.post('/v1/contacts', (req, res) => {
        controllers.contacts.create(req, res)
    })

    app.put('/v1/contacts/:id', (req, res) => {
        controllers.contacts.update(req, res)
    })

    app.get('/v1/contacts', (req, res) => {
        controllers.contacts.read(req, res)
    })

    app.post('/auth/login', (req, res) => {
        controllers.auth.login(req, res)
    })

    app.get('/v1/contacts/export', (req, res) => {
        controllers.contacts.download(req, res)
    })

}
