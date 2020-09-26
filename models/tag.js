'use strict';
export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      color: DataTypes.STRING,
      name: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ['blog', 'forum']
      }
    },
    { tableName: 'tags' }
  );
  Tag.associate = (models) => {
    Tag.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    });
    Tag.belongsToMany(models.Blog, {
      as: 'blogs',
      through: 'blog_tags',
      foreignKey: 'tagId'
    });
    Tag.hasMany(models.BlogTag, {
      foreignKey: 'tagId'
    });
  };
  return Tag;
};
