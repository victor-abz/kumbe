'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      access_level: {
        type: DataTypes.NUMBER,
        unique: true,
      },
    },
    { tableName: 'roles' }
  );
  Role.associate = (models) => {};
  return Role;
};
