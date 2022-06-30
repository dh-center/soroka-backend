'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('UserRoles', [{
        id: 1,
        name: 'ADMIN',
        key: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: 'EDITOR',
        key: 'EDITOR',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        name: 'USER',
        key: 'USER',
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
