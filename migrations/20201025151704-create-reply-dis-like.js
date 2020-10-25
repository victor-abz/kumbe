'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('reply_dislikes', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			dislike: {
				type: Sequelize.BOOLEAN
			},
			replyId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'replies',
					key: 'id',
					as: 'replyId'
				}
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'users',
					key: 'id',
					as: 'userId'
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
		return queryInterface.dropTable('reply_dislikes');
	}
};
