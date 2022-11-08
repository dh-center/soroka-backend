'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Properties', [{
        id: 1,
        dataTypeId: 1,
        name: 'julianDate',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },{
        id: 2,
        dataTypeId: 5,
        name: 'address',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 3,
        dataTypeId: 5,
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
        dataTypeId: 5,
        name: 'annotation',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 6,
        dataTypeId: 5,
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
        dataTypeId: 5,
        name: 'sources',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 9,
        dataTypeId: 3,
        name: 'geoPoint',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 10,
        dataTypeId: 4,
        name: 'media',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 11,
        dataTypeId: 5,
        name: 'creator',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 12,
        dataTypeId: 5,
        name: 'creationPlace',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 13,
        dataTypeId: 5,
        name: 'copyrightHolder',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 14,
        dataTypeId: 5,
        name: 'originalText',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 15,
        dataTypeId: 5,
        name: 'bibliography',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 16,
        dataTypeId: 5,
        name: 'refutation',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 17,
        dataTypeId: 5,
        name: 'url',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 18,
        dataTypeId: 5,
        name: 'participants',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 19,
        dataTypeId: 5,
        name: 'family',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 20,
        dataTypeId: 5,
        name: 'profession',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 21,
        dataTypeId: 5,
        name: 'format',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 22,
        dataTypeId: 5,
        name: 'storage',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 23,
        dataTypeId: 5,
        name: 'socialNetworks',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 24,
        dataTypeId: 5,
        name: 'place',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    },
    {
        id: 25,
        dataTypeId: 6,
        name: 'size',
        createdAt: new Date(),
        updatedAt: new Date(),
        isLink: false
    }]);
  },

  async down (queryInterface, Sequelize) {
    // Осторожно: удаляет все содержимое таблицы.
    await queryInterface.bulkDelete('Properties', {}, {}, true);
  }
};
