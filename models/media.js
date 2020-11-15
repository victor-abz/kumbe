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
			imageType: {
				type: DataTypes.ENUM,
				allowNull: true,
				values: ['Comic', 'Fact Factory']
			},
			mediaLink: DataTypes.STRING,
			thumbnail: DataTypes.STRING
		},
		{ tableName: 'medias' }
	);
	Media.associate = (models) => {
		Media.belongsTo(models.Language, {
			as: 'language',
			foreignKey: 'languageId'
		});
		Media.belongsTo(models.Media, {
			as: 'parent',
			foreignKey: 'parentId'
		});
		Media.hasMany(models.Media, {
			as: 'children',
			foreignKey: 'parentId'
		});
		Media.belongsToMany(models.Tag, {
			as: 'tags',
			through: 'media_tags',
			foreignKey: 'mediaId'
		});
	};
	return Media;
};
