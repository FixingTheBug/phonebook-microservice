const Company = require('../models/company.js');
const Contacts = require('../models/contact.js')

module.exports.getIncludes = function (req, res) {
    include = []

    if(req.param('include')) {

        includes = req.param('include').split(',')

        includes.forEach(element => {
            if(element === 'contacts') {
                include.push(
                    {
                        model: Contacts,
                        as: 'Contacts'
                    }
                )
            }
        })
    }

    return include
};
