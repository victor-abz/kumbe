'use strict';
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
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
