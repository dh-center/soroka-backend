'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Properties', [{
        id: 1,
        dataTypeId: 2,
        name: 'julianDate',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },{
        id: 2,
        dataTypeId: 2,
        name: 'address',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 3,
        dataTypeId: 2,
        name: 'artisticText',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 4,
        dataTypeId: 2,
        name: 'legalName',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 5,
        dataTypeId: 2,
        name: 'annotation',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 6,
        dataTypeId: 2,
        name: 'quote',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 7,
        dataTypeId: 2,
        name: 'tags',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 8,
        dataTypeId: 2,
        name: 'sources',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 9,
        dataTypeId: 2,
        name: 'geoPoint',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
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
