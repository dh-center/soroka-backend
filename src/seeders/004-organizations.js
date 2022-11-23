'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizations', [{
        id: 1,
        name: 'ITMO',
        address: 'SPB',
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    // Осторожно: удаляет все содержимое таблицы.
    await queryInterface.bulkDelete('Organizations', {}, {}, true);
  }
};
