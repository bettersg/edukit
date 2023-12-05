const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('pairings', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true      
            },
            tutee_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'tutees', key: 'id' }
            },
            tutor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'tutors', key: 'id' }
            },
            user_id: {
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
                default: true
            },
            location: {
                type: DataTypes.TEXT
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        })
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true      
            },
            pairing_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'pairings', key: 'id' }
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            hours: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            overview: {
                type: DataTypes.TEXT
            },
            problems: {
                type: DataTypes.TEXT
            },
            next_session: {
                type: DataTypes.TEXT
            }
        })
        await queryInterface.createTable('subjects', {
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
        })
        await queryInterface.createTable('subject_pairings', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true      
            },
            subject_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'subjects', key: 'id' }
            },
            pairing_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'pairings', key: 'id' }
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('pairings')
        await queryInterface.dropTable('sessions')
        await queryInterface.dropTable('subjects')
        await queryInterface.dropTable('subject_pairings')
    }
}