'use strict';
export default (sequelize, DataTypes) => {
	const Tag = sequelize.define(
		'Tag',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			color: DataTypes.STRING,
			name: DataTypes.STRING,
			type: {
				type: DataTypes.ENUM,
				values: ['blog', 'forum']
			}
		},
		{ tableName: 'tags' }
	);
	Tag.associate = (models) => {
		Tag.belongsTo(models.Language, {
			as: 'language',
			foreignKey: 'languageId'
		});
		Tag.belongsToMany(models.Blog, {
			as: 'blogs',
			through: 'blog_tags',
			foreignKey: 'tagId'
		});
		Tag.belongsToMany(models.Media, {
			as: 'medias',
			through: 'media_tags',
			foreignKey: 'tagId'
		});
		Tag.belongsToMany(models.Discussion, {
			as: 'questions',
			through: 'discussion_tags',
			foreignKey: 'tagId'
		});
	};
	return Tag;
};
