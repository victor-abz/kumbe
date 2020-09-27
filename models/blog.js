'use strict';
export default (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    'Blog',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        unique: true
      },
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      coverImage: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN
    },
    { tableName: 'blogs' }
  );
  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      as: 'editor',
      foreignKey: 'userId'
    });
    Blog.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    });
    Blog.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId'
    });
    Blog.belongsToMany(models.Tag, {
      as: 'tags',
      through: 'blog_tags',
      foreignKey: 'blogId'
    });
    Blog.hasMany(models.BlogReact, {
      as: 'likes',
      foreignKey: 'blogId'
    });
    Blog.hasMany(models.BlogShare, {
      as: 'shares',
      foreignKey: 'blogId'
    });
    Blog.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'blogId'
    });
  };
  return Blog;
};
