'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('medias', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			title: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			type: {
				type: Sequelize.ENUM,
				allowNull: false,
				values: ['image', 'video', 'pdf', 'audio']
			},
			mediaLink: {
				type: Sequelize.STRING
			},
			thumbnail: {
				type: Sequelize.STRING
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
		return queryInterface.dropTable('medias');
	}
};
