'use strict';
export default (sequelize, DataTypes) => {
  const Discussion = sequelize.define(
    'Discussion',
    {
      content: DataTypes.STRING,
      anonymous: DataTypes.BOOLEAN,
    },
    { tableName: 'discussions' }
  );
  Discussion.associate = (models) => {
    Discussion.hasMany(models.Tag, { as: 'tags' });
    Discussion.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    Discussion.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId',
    });
    Discussion.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });
    Discussion.hasMany(models.Reply, {
      as: 'replies',
    });
  };
  return Discussion;
};
