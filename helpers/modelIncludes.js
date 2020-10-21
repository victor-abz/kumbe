import {
	Category,
	BlogShare,
	Comment,
	BlogReact,
	Tag,
	User,
	Reply
} from '../models';

export const tagsIncludes = [
	{
		model: Tag,
		as: 'tags',
		through: { attributes: [] },
		attributes: ['id', 'name', 'color']
	}
];
export const categoryIncludes = [
	{
		model: Category,
		as: 'category',
		attributes: ['name']
	}
];
export const userIncludes = [
	{
		model: User,
		as: 'author',
		attributes: ['firstName', 'lastName', 'username', 'profilePic']
	}
];
export const blogIncludes = [
	...tagsIncludes,
	...categoryIncludes,
	...userIncludes,
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
export const questionIncludes = [
	...userIncludes,
	...categoryIncludes,
	{
		model: Reply,
		as: 'replies',
		attributes: ['id']
	}
];
