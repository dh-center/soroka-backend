'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('FilledProperties', 'data', {
        type: Sequelize.STRING(100000),
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('FilledProperties', 'data', {
        type: Sequelize.STRING(255)
    })
  }
};
