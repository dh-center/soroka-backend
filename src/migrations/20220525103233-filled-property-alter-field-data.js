'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('FilledProperties', 'data', {
        type: Sequelize.STRING,
        allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('FilledProperties', 'data', {
        type: Sequelize.STRING,
        allowNull: false
    })
  }
};
