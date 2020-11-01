'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('f_a_qs', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			question: {
				type: Sequelize.STRING
			},
			answer: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			languageId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'languages',
					key: 'id',
					as: 'languageId'
				}
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('f_a_qs');
	}
};
