'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      names: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      profilePic: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      tableName: 'users',
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      as: 'role',
      foreignKey: 'roleId',
    });
  };
  return User;
};
