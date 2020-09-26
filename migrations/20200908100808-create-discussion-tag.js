'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('discussion_tags', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      discussionId: {
        type: Sequelize.UUID
      },
      tagId: {
        type: Sequelize.UUID
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
    return queryInterface.dropTable('discussion_tags');
  }
};
