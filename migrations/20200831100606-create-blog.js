'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'blogs',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false
        },
        coverImage: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.TEXT
        },
        isPublished: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ['title', 'languageId']
          }
        }
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blogs');
  }
};
