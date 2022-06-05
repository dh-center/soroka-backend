'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DateCatalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filledPropertyId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: {
                tableName: 'FilledProperties',
            },
            key: 'id'
        },
        allowNull: false
      },
      dateStart: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      dateEnd: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DateCatalogs');
  }
};
