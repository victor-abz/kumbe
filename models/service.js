'use strict';
export default (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      name: DataTypes.STRING,
      coverImage: DataTypes.STRING,
    },
    { tableName: 'services' }
  );
  Service.associate = (models) => {};
  return Service;
};
