'use strict';

import { hashPassword } from '../helpers';

export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'users',
    [
      {
        names: 'Administrator',
        username: 'admin',
        password: hashPassword('MyPassword'),
        accessLevel: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        names: 'Modulator',
        username: 'modulator',
        accessLevel: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        names: 'User',
        username: 'user',
        password: hashPassword('MyPassword'),
        accessLevel: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  );
};
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('users', null, {});
}
