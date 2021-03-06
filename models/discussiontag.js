'use strict';
export default (sequelize, DataTypes) => {
  const DiscussionTag = sequelize.define(
    'DiscussionTag',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      discussionId: DataTypes.UUID,
      tagId: DataTypes.UUID
    },
    { tableName: 'discussion_tags' }
  );
  DiscussionTag.associate = (models) => {
    // associations can be defined here
  };
  return DiscussionTag;
};
