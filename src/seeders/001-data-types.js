'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('DataTypes', [{
        id: 1,
        name: 'JULIAN_DATE',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: 'TEXT',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        name: 'GEO_POINT',
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
