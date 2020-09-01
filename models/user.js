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
      gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female', 'Other'],
      },
      accessLevel: {
        type: DataTypes.ENUM,
        values: ['1', '2', '3', '4'],
      },
      password: DataTypes.STRING,
      password: Sequelize.STRING,
      isActive: Sequelize.BOOLEAN,
      resetToken: Sequelize.STRING,
    },
    {
      tableName: 'users',
    }
  );
  User.associate = (models) => {};
  return User;
};
