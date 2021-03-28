const { DataTypes } = require('sequelize')
const sequelize = require('./connection.js')

const Company = sequelize.define('companies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('phone')
            return rawValue.replace(/-|1-| /g, '')
        }
    }
}, {
    timestamps: false
});

module.exports = Company

const Contact = require('./contact')

Company.hasMany(Contact, {
    foreignKey: 'company_id',
    as: 'Contacts'
})
