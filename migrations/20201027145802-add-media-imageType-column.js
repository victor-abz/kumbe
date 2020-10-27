'use strict';

module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.addColumn('medias', 'imageType', {
			type: Sequelize.ENUM,
			allowNull: true,
			values: ['Comic', 'Fact Factory']
		}),

	down: (queryInterface, Sequelize) =>
		queryInterface.removeColumn('medias', 'imageType')
};
