'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('FilledProperties', 'name')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('FilledProperties', 'name', {
        type: Sequelize.STRING,
        allowNull: false
    })
  }
};
