'use strict';
export default (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'ReplyReact',
    {
      like: DataTypes.BOOLEAN,
    },
    { tableName: 'reply_reacts' }
  );
  Like.associate = (models) => {
    Like.belongsTo(models.Reply, {
      as: 'reply',
      foreignKey: 'replyId',
    });
    Like.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return Like;
};
