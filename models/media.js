'use strict';
export default (sequelize, DataTypes) => {
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
  Media.associate = (models) => {
    Media.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId',
    });
  };
  return Media;
};
