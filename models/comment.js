'use strict';
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      content: DataTypes.STRING,
      approved: DataTypes.BOOLEAN,
    },
    { tableName: 'comments' }
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Blog, {
      as: 'blog',
      foreignKey: 'blogId',
    });
    Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return Comment;
};
