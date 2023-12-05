const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class SubjectPairing extends Model {}

SubjectPairing.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true      
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'subjects', key: 'id' }
    },
    pairingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'pairings', key: 'id' }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'subject_pairing'
})

module.exports = SubjectPairing