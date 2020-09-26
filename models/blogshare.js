'use strict';
export default (sequelize, DataTypes) => {
  const BlogShare = sequelize.define(
    'BlogShare',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      }
    },
    { tableName: 'blog_shares' }
  );
  BlogShare.associate = (models) => {
    BlogShare.belongsTo(models.Blog, {
      as: 'blog',
      foreignKey: 'blogId'
    });
    BlogShare.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return BlogShare;
};
