'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      path: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isPublic: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      hash: {
        allowNull: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dimensions: {
        allowNull: true,
        type: Sequelize.STRING
      },
      field_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: {
                tableName: 'FilledProperties',
            },
            key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};
