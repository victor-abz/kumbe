'use strict';
export default (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  }
}, { tableName: 'shares' });
  Share.associate = (models) => {
    Share.belongsTo(models.Blog, {
      as: 'blog',
      foreignKey: 'blogId'
    });
    Share.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return Share;
};
