'use strict';
export default (sequelize, DataTypes) => {
  const Share = sequelize.define(
    'Share',
    {
      type: {
        type: DataTypes.ENUM,
        values: ['blog', 'forum'],
      },
    },
    { tableName: 'shares' }
  );
  Share.associate = (models) => {
    Share.belongsTo(models.Blog, {
      as: 'blog',
      foreignKey: 'blogId',
    });
    Share.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };
  return Share;
};
