'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'blog_tags',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        tagId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        blogId: {
          type: Sequelize.INTEGER,
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
            fields: ['tagId', 'blogId'],
          },
        },
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blog_tags');
  },
};
