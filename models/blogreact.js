'use strict';
export default (sequelize, DataTypes) => {
  const BlogReact = sequelize.define(
    'BlogReact',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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
