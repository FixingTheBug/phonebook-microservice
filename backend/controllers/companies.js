const Company = require('../models/company.js')
const CompanyService = require('../services/companyService.js')

exports.read = (req, res) => {
    include = CompanyService.getIncludes(req, res)

    where = { id: req.params.id }

    options = {
        include: include,
        where: where
    }

    Company.findOne(options)
    .then(companies => {
        res.status(200).send({
            status: "success",
            data: { companies }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message,
            code: "CMP-001"
        });
    });
};

exports.create = async (req, res) => {
    Company.create(
        req.body
    )
    .then(company => {
        res.status(201).send({
            status: "success",
            data: { company }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message,
            code: "CMP-002"
        });
    });
}
