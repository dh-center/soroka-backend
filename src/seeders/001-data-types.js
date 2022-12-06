'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DataTypes', [{
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
    },
    {
      id: 4,
      name: 'FILE',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      name: 'RICH_TEXT',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      name: 'MEASURMENT',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    // Осторожно: удаляет все содержимое таблицы.
    await queryInterface.bulkDelete('DataTypes', {}, {}, true);
  }
};
