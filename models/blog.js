'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    'Blog',
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      coverImage: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN,
    },
    { tableName: 'blogs' }
  );
  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      as: 'editor',
      foreignKey: 'userId',
    });
    Blog.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId',
    });
    Blog.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });
    Blog.hasMany(models.Tag, {
      as: 'tags',
      through: 'blog_tags',
    });
  };
  return Blog;
};
