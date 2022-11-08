'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Files', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: true
    }),
    await queryInterface.addColumn('Files', 'type', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Files', 'duration'),
    await queryInterface.removeColumn('Files', 'mime_type')
  }
};
