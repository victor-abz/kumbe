'use strict';

import { hashPassword } from '../helpers';

export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'users',
    [
      {
        firstName: 'Administrator',
        lastName: 'Admin',
        username: 'admin',
        gender: 'Male',
        phone: '0783543016',
        password: hashPassword('MyPassword'),
        accessLevel: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Modulator',
        lastName: 'Modular',
        username: 'modulator',
        gender: 'Male',
        accessLevel: '2',
        phone: '0738533018',
        password: hashPassword('MyPassword'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'System',
        lastName: 'User',
        username: 'user',
        gender: 'Male',
        phone: '0728533016',
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
