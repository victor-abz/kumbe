'use strict';
export default (sequelize, DataTypes) => {
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
      foreignKey: 'parentId',
    });
    Reply.hasMany(models.Reply, {
      as: 'replies',
    });
  };
  return Reply;
};
