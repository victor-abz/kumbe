'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'Language',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      shortName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    { tableName: 'languages' }
  );
  Language.associate = (models) => {
    // associations can be defined here
  };
  return Language;
};
