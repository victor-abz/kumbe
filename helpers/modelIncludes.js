import { Category, Share, Comment, BlogReact } from '../models';

export const blogIncludes = [
  {
    model: Category,
    as: 'category',
    attributes: ['name']
  },
  {
    model: Share,
    // where: { type: 'blog' },
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
