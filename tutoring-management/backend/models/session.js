const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true      
    },
    pairingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'pairings', key: 'id' }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    overview: {
        type: DataTypes.TEXT
    },
    problems: {
        type: DataTypes.TEXT
    },
    nextSession: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'session'
})

module.exports = Session