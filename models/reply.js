'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    'Reply',
    {
      content: DataTypes.STRING,
      anonymous: DataTypes.BOOLEAN,
    },
    { tableName: 'replies' }
  );
  Reply.associate = (models) => {
    Reply.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    Reply.belongsTo(models.Discussion, {
      as: 'discussion',
      foreignKey: 'descussionId',
    });
    Reply.belongsTo(models.Reply, {
      as: 'parent',
      foreignKey: 'replyId',
    });
  };
  return Reply;
};
