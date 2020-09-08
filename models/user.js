'use strict';
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      phone: {
        type: DataTypes.STRING
      },
      profilePic: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female', 'Other']
      },
      accessLevel: {
        type: DataTypes.ENUM,
        default: '4',
        values: ['1', '2', '3', '4']
      },
      password: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      isVerified: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      resetToken: DataTypes.STRING
    },
    {
      tableName: 'users'
    }
  );
  User.associate = (models) => {};
  return User;
};
