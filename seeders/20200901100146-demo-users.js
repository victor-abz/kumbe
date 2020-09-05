'use strict';

import { hashPassword } from '../helpers';

export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'users',
    [
      {
        names: 'Administrator',
        username: 'admin',
        gender: 'Male',
        password: hashPassword('MyPassword'),
        accessLevel: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        names: 'Modulator',
        username: 'modulator',
        gender: 'Male',
        accessLevel: '2',
        password: hashPassword('MyPassword'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        names: 'User',
        username: 'user',
        gender: 'Male',
        password: hashPassword('MyPassword'),
        accessLevel: '3',
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
