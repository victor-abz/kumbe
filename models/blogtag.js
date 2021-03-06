'use strict';
export default (sequelize, DataTypes) => {
  const BlogTag = sequelize.define(
    'BlogTag',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      tagId: DataTypes.NUMBER,
      blogId: DataTypes.NUMBER
    },
    { tableName: 'blog_tags' }
  );
  BlogTag.associate = (models) => {
    // associations can be defined here
  };
  return BlogTag;
};
