'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define(
    'Partner',
    {
      name: DataTypes.STRING,
      coverImage: DataTypes.STRING,
    },
    { tableName: 'partners' }
  );
  Partner.associate = (models) => {};
  return Partner;
};
