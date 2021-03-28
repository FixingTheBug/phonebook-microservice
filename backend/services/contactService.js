const Contacts = require('../models/contact.js')

module.exports.getParam = function (req, res) {

    where = {}

    if(req.param('id')) {
        where.id = req.param('id')
    }

    if(req.param('email')) {
        where.email = req.param('email')
    }

    return { where }
};
