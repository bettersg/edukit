const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.TEXT,
                validate: {
                    isEmail: true
                }
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            organisation: {
                type: DataTypes.TEXT
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        })
        await queryInterface.createTable('tutees', {
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
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        })
        await queryInterface.createTable('tutors', {
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
            },
            end_date: {
                type: DataTypes.DATE,
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users')
        await queryInterface.dropTable('tutees')
        await queryInterface.dropTable('tutors')
      },
}