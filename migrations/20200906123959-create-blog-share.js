'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('blog_shares', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			userId: {
				type: Sequelize.UUID,
				onDelete: 'CASCADE',
				references: {
					model: 'users',
					key: 'id',
					as: 'userId'
				}
			},
			blogId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'blogs',
					key: 'id',
					as: 'blogId'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('blog_shares');
	}
};
