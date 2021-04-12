'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('slider_contents', 'uniqueSign', {
				type: Sequelize.STRING,
				allowNull: true
			})
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn('slider_contents', 'uniqueSign')
		]);
	}
};
