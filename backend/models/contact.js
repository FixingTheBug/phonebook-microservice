const { DataTypes } = require('sequelize')
const sequelize = require('./connection.js')

const Contact = sequelize.define('contacts', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    cell_number: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('cell_number')
            return rawValue.replace(/[-|.|(|)| |\/]/g, '')
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Contact

const Company = require('./company')

Contact.belongsTo(Company, {
    foreignKey: "company_id",
    as: "company"
})
