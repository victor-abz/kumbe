import { Category, BlogShare, Comment, BlogReact } from '../models';

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
  }
];
