'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogReact = sequelize.define(
    'BlogReact',
    {
      like: DataTypes.BOOLEAN,
    },
    { tableName: 'blog_reacts' }
  );
  BlogReact.associate = (models) => {
    BlogReact.belongsTo(models.Blog, {
      as: 'blog',
      foreignKey: 'blogId',
    });
    BlogReact.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return BlogReact;
};
