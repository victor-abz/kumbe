import {
	Category,
	BlogShare,
	Comment,
	BlogReact,
	Tag,
	User,
	Blog
} from '../models';

export const blogOneIncludes = [
	{
		model: Blog,
		as: 'blog',
		attributes: ['id', 'title']
	}
];
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
		attributes: ['id']
	},
	{
		model: BlogReact,
		as: 'likes',
		attributes: ['userId']
	},
	{
		model: Comment,
		as: 'comments',
		attributes: ['blogId']
	}
];
export const commentIncludes = [
	...blogOneIncludes,
	{
		model: User,
		as: 'user',
		attributes: ['firstName', 'lastName', 'username', 'profilePic']
	}
];
