const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Pairing extends Model {}

Pairing.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true      
    },
    tuteeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tutees', key: 'id' }
    },
    tutorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tutors', key: 'id' }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    level: {
        type: DataTypes.TEXT
    },
    strengths: {
        type: DataTypes.TEXT
    },
    weaknesses: {
        type: DataTypes.TEXT
    },
    goals: {
        type: DataTypes.TEXT
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    location: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'pairing'
})

module.exports = Pairing