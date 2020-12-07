import { hashPassword } from '../helpers/utils';
import faker from 'faker';

export const up = (queryInterface, Sequelize) => {
	return queryInterface.bulkInsert(
		'users',
		[
			{
				id: faker.random.uuid(),
				firstName: 'Administrator',
				lastName: 'Admin',
				username: 'admin',
				gender: 'Male',
				phone: '0781234567',
				password: hashPassword(process.env.ADMIN_PASSWORD),
				accessLevel: '1',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: faker.random.uuid(),
				firstName: 'Modulator',
				lastName: 'Modular',
				username: 'modulator',
				gender: 'Male',
				accessLevel: '2',
				phone: '0731234567',
				password: hashPassword(process.env.ADMIN_PASSWORD),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: faker.random.uuid(),
				firstName: 'System',
				lastName: 'User',
				username: 'user',
				gender: 'Male',
				phone: '0721234567',
				password: hashPassword(process.env.ADMIN_PASSWORD),
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
