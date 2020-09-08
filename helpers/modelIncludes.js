import { Category, BlogShare, Comment, BlogReact, Tag } from '../models';

export const blogIncludes = [
  {
    model: Category,
    as: 'category',
    attributes: ['name']
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
  },
  {
    model: Tag,
    as: 'tags',
    through: { attributes: [] },
    attributes: ['name']
  }
];
