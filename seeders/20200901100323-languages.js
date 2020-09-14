'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'languages',
      [
        {
          name: 'Kinyarwanda',
          shortName: 'kin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'English',
          shortName: 'en',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('languages', null, {});
  }
};
