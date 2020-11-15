'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('medias', 'parentId', {
				type: Sequelize.UUID,
				allowNull: true,
				onDelete: 'CASCADE',
				references: {
					model: 'medias',
					key: 'id',
					as: 'parentId'
				}
			})
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([queryInterface.removeColumn('medias', 'parentId')]);
	}
};
