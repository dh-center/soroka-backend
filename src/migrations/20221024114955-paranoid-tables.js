'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Cards',
      'deletedAt',
      {
          allowNull: true,
          type: Sequelize.DATE
    });

    await queryInterface.addColumn(
      'FilledProperties',
      'deletedAt',
      {
          allowNull: true,
          type: Sequelize.DATE
    });

    await queryInterface.addColumn(
      'FilledPropertyCards',
      'deletedAt',
      {
          allowNull: true,
          type: Sequelize.DATE
    });

    await queryInterface.addColumn(
      'DateCatalogs',
      'deletedAt',
      {
          allowNull: true,
          type: Sequelize.DATE
    });

    await queryInterface.addColumn(
      'GeoProperties',
      'deletedAt',
      {
          allowNull: true,
          type: Sequelize.DATE
    });

    await queryInterface.addColumn(
      'Files',
      'deletedAt',
      {
          allowNull: true,
          type: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeColumn(
        'Cards',
        'deletedAt');
  
      await queryInterface.removeColumn(
        'FilledProperties',
        'deletedAt');
  
      await queryInterface.removeColumn(
        'FilledPropertyCards',
        'deletedAt');
  
      await queryInterface.removeColumn(
        'DateCatalogs',
        'deletedAt');
  
      await queryInterface.removeColumn(
        'GeoProperties',
        'deletedAt');
  
      await queryInterface.removeColumn(
        'Files',
        'deletedAt');
  }
};
