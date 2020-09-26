'use strict';
export default (sequelize, DataTypes) => {
  const Partner = sequelize.define(
    'Partner',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      coverImage: DataTypes.STRING,
    },
    { tableName: 'partners' }
  );
  Partner.associate = (models) => {};
  return Partner;
};
