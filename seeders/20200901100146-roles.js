'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'Administrator',
          accessLevel: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Modulator',
          accessLevel: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'User',
          accessLevel: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
