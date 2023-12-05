const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Subject extends Model {}

Subject.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true      
    },
    symbol: {
        type: DataTypes.TEXT
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    level: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'subject'
})

module.exports = Subject