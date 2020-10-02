import { Category, BlogShare, Comment, BlogReact, Tag, User } from '../models';

export const tagsIncludes = [
  {
    model: Tag,
    as: 'tags',
    through: { attributes: [] },
    attributes: ['id', 'name', 'color']
  }
];

export const blogIncludes = [
  ...tagsIncludes,
  {
    model: Category,
    as: 'category',
    attributes: ['name']
  },
  {
    model: User,
    as: 'editor',
    attributes: ['firstName', 'lastName', 'username', 'profilePic']
  },
  {
    model: BlogShare,
    as: 'shares',
    attributes: ['blogId']
  },
  {
    model: BlogReact,
    as: 'likes',
    attributes: ['like']
  },
  {
    model: Comment,
    as: 'comments',
    attributes: ['blogId']
  }
];
