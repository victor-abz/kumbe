'use strict';
export default (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
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
    { tableName: 'services' }
  );
  Service.associate = (models) => {};
  return Service;
};
