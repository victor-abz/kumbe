'use strict';
export default (sequelize, DataTypes) => {
  const MediaTag = sequelize.define(
    'MediaTag',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      mediaId: DataTypes.UUID,
      tagId: DataTypes.UUID
    },
    { tableName: 'media_tags' }
  );
  MediaTag.associate = (models) => {
    // associations can be defined here
  };
  return MediaTag;
};
