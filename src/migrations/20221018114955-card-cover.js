'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Cards', 'cover', {
        type: Sequelize.INTEGER
    })
    await queryInterface.addConstraint(
      'Cards',
      {
        type: 'foreign key',
        fields: ['cover'],
        references: {
          table: "Files",
          field: "id"
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cards', 'cover')
  }
};
