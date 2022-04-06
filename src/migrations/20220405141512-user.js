'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER
            },
            name: Sequelize.DataTypes.STRING,
            email: {
                type: Sequelize.DataTypes.STRING,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            },
            timezone: Sequelize.DataTypes.STRING,
            hasAcceptTermsOfUse: Sequelize.DataTypes.BOOLEAN,
            userRole: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'UserRoles',
                    },
                    key: 'id'
                },
                allowNull: false
            },
            organization: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Organizations',
                    },
                    key: 'id'
                },
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
