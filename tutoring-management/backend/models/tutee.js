const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Tutee extends Model {} 

Tutee.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true      
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    number: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'tutee'
})

module.exports = Tutee