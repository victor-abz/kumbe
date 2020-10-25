'use strict';
export default (sequelize, DataTypes) => {
	const ReplyDisLike = sequelize.define(
		'ReplyDisLike',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			dislike: DataTypes.BOOLEAN
		},
		{ tableName: 'reply_dislikes' }
	);
	ReplyDisLike.associate = (models) => {
		// associations can be defined here
		ReplyDisLike.belongsTo(models.Reply, {
			as: 'reply',
			foreignKey: 'replyId'
		});
		ReplyDisLike.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'userId'
		});
	};
	return ReplyDisLike;
};
