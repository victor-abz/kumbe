'use strict';
import faker from 'faker'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'languages',
      [
        {
          id: faker.random.uuid(),
          name: 'Kinyarwanda',
          shortName: 'kin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: faker.random.uuid(),
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
