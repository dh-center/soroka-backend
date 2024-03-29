'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserRoles', [{
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
        name: 'AUTHOR',
        key: 'AUTHOR',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        name: 'USER',
        key: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    // Осторожно: удаляет все содержимое таблицы.
    await queryInterface.bulkDelete('UserRoles', {}, {}, true);
  }
};
