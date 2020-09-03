'use strict';
export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['blog', 'forum'],
      },
    },
    { tableName: 'categories' }
  );
  Category.associate = (models) => {
    Category.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId',
    });
  };
  return Category;
};
