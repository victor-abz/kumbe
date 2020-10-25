'use strict';
export default (sequelize, DataTypes) => {
	const DiscussionLike = sequelize.define(
		'DiscussionLike',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			like: DataTypes.BOOLEAN
		},
		{ tableName: 'discussion_likes' }
	);
	DiscussionLike.associate = (models) => {
		// associations can be defined here
		DiscussionLike.belongsTo(models.Discussion, {
			as: 'discussion',
			foreignKey: 'discussionId'
		});
		DiscussionLike.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'userId'
		});
	};
	return DiscussionLike;
};
