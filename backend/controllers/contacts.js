const Contact = require('../models/contact.js')
const Company = require('../models/company.js')
const ContactService = require('../services/contactService.js')
const CsvParser = require('json2csv').Parser

exports.create = async (req, res) => {
    Contact.create(
        req.body
    )
    .then(contact => {
        res.status(201).send({
            status: "success",
            data: { contact }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message,
            code: "CNT-001"
        });
    });
}

exports.update = async(req, res) => {
    contact = Contact.update(
        { cell_number: req.body.cell_number },
        {
            where: { id: req.params.id },
            returning: true,
            plain: true
        }
    )
    .then(contact => {
        res.status(200).send({
            status: "success",
            data: {
                "contact": contact[1]
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message,
            code: "CNT-002"
        });
    });


}

exports.read = (req, res) => {
    Contact.findAll(
        ContactService.getParam(req, res)
    )
    .then(contact => {
        res.status(200).send({
            status: "success",
            data: { contact }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message,
            code: "CNT-003"
        });
    });
};

exports.download = (req, res) => {
    Contact.findAll({
        include: [
            {
                model: Company,
                as: 'company'
            }
        ]
    }).then((items) => {
        let contacts = [];


        items.forEach((contact) => {
            const { id, first_name, last_name, email, cell_number } = contact
            const { name, phone } = contact.company

            contacts.push({
                "ID": id,
                "First Name": first_name,
                "Last Name": last_name,
                "Email": email,
                "Cell Number": cell_number,
                "Company Name": name,
                "Company Phone": phone
            })
        })


        const CsvFields = ['ID', 'First Name', 'Last Name', 'Email', 'Cell Number', 'Company Name', 'Company Phone'];
        const CsvParse = new CsvParser( CsvFields )
        const CsvData = CsvParse.parse(contacts)

        Filename = "contacts" + Date.now() + ".csv"

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader("Content-Disposition", "attachment; filename=" + Filename);
        res.status(200).end(CsvData)
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message,
            code: "CNT-004"
        });
    });
}
