'use strict';
export default (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'Language',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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
