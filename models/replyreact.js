'use strict';
export default (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'ReplyReact',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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
