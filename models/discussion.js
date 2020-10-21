'use strict';
export default (sequelize, DataTypes) => {
	const Discussion = sequelize.define(
		'Discussion',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			content: DataTypes.STRING,
			anonymous: DataTypes.BOOLEAN
		},
		{ tableName: 'discussions' }
	);
	Discussion.associate = (models) => {
		Discussion.belongsToMany(models.Tag, {
			as: 'tags',
			through: 'discussion_tags',
			foreignKey: 'discussionId'
		});
		Discussion.belongsTo(models.User, {
			as: 'author',
			foreignKey: 'userId'
		});
		Discussion.belongsTo(models.Language, {
			as: 'language',
			foreignKey: 'languageId'
		});
		Discussion.belongsTo(models.Category, {
			as: 'category',
			foreignKey: 'categoryId'
		});
		Discussion.hasMany(models.Reply, {
			as: 'replies',
			foreignKey: 'discussionId'
		});
	};
	return Discussion;
};
