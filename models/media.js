'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      type: {
        type: DataTypes.ENUM,
        values: ['image', 'video', 'pdf', 'audio'],
      },
      mediaLink: DataTypes.STRING,
    },
    { tableName: 'medias' }
  );
  Media.associate = (models) => {};
  return Media;
};
