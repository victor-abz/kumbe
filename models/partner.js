'use strict';
export default (sequelize, DataTypes) => {
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
