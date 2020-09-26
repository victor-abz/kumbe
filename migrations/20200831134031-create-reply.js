'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('replies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      content: {
        type: Sequelize.STRING,
      },
      anonymous: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'userId',
        },
      },
      discussionId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'discussions',
          key: 'id',
          as: 'discussionId',
        },
      },
      parentId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'replies',
          key: 'id',
          as: 'replyId',
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('replies');
  },
};
