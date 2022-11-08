'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Users', [{
        id: 1,
        name: 'admin',
        email: 'admin@admin.admin',
        password: '$2a$08$lsctrPb626TTiwHiMS9BBufMYz608XuwDKZ5ZHvU1pjBHfTnEoNFO',
        timezone: 'GMT+6',
        userRole: 1,
        organization: 1,
        hasAcceptTermsOfUse: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
    } catch(e) {
      console.log("user seeder error: ", e)
    }
    
  },

  async down (queryInterface, Sequelize) {
    // Осторожно: удаляет все содержимое таблицы.
    await queryInterface.bulkDelete('Users', {}, {}, true);
  }
};
