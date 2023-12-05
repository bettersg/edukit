const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class WaitingList extends Model {}

WaitingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true      
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'waiting_list'
})

module.exports = WaitingList