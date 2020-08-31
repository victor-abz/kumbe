'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      color: DataTypes.STRING,
      name: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ['blog', 'forum'],
      },
    },
    { tableName: 'tags' }
  );
  Tag.associate = (models) => {
    Tag.belogsToMany(models.Blog, {
      as: 'blogs',
      through: 'blog_tags',
    });
  };
  return Tag;
};
