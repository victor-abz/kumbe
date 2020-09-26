'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'categories',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['blog', 'forum'],
        },
        languageId: {
          type: Sequelize.UUID,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'languages',
            key: 'id',
            as: 'languageId',
          },
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
            fields: ['name', 'languageId'],
          },
        },
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  },
};
