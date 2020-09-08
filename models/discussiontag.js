'use strict';
export default (sequelize, DataTypes) => {
  const DiscussionTag = sequelize.define(
    'DiscussionTag',
    {
      discussionId: DataTypes.NUMBER,
      tagId: DataTypes.NUMBER
    },
    { tableName: 'discussion_tags' }
  );
  DiscussionTag.associate = (models) => {
    // associations can be defined here
  };
  return DiscussionTag;
};
