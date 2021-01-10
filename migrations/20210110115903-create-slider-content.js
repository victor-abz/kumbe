'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('slider_contents', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			title: {
				type: Sequelize.STRING
			},
			caption: {
				type: Sequelize.STRING
			},
			position: {
				type: Sequelize.ENUM,
				allowNull: false,
				values: ['left', 'right']
			},
			bgColor: {
				type: Sequelize.STRING
			},
			titleColor: {
				type: Sequelize.STRING
			},
			captionColor: {
				type: Sequelize.STRING
			},
			imageLink: {
				type: Sequelize.STRING
			},
			clickText: {
				type: Sequelize.STRING
			},
			categoryId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'categories',
					key: 'id',
					as: 'categoryId'
				}
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
		return queryInterface.dropTable('slider_contents');
	}
};
