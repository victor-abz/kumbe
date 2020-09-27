'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'languages',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        shortName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ['name', 'shortName'],
          },
        },
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('languages');
  },
};
