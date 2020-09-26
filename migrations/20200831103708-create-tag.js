'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tags',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        color: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
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
    return queryInterface.dropTable('tags');
  },
};
