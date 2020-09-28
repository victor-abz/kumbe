'use strict';
export default (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ['image', 'video', 'pdf', 'audio']
      },
      mediaLink: DataTypes.STRING
    },
    { tableName: 'medias' }
  );
  Media.associate = (models) => {
    Media.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    });
  };
  return Media;
};
