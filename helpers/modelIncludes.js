import {
	Category,
	BlogShare,
	Comment,
	BlogReact,
	Tag,
	User,
	Blog,
	Reply,
	DiscussionLike,
	ReplyDisLike,
	ReplyReact,
	Media
} from '../models';

export const blogOneIncludes = [
	{
		model: Blog,
		as: 'blog',
		attributes: ['id', 'title']
	}
];
export const tagsIncludes = (whereTagIds = {}) => [
	{
		model: Tag,
		as: 'tags',
		through: { attributes: [], where: whereTagIds },
		attributes: ['id', 'name', 'color']
	}
];
export const categoryIncludes = [
	{
		model: Category,
		as: 'category',
		attributes: ['name', 'id']
	}
];
export const userIncludes = [
	{
		model: User,
		as: 'author',
		attributes: ['firstName', 'lastName', 'username', 'profilePic']
	}
];
export const blogIncludes = (whereTagIds = {}) => [
	...tagsIncludes(whereTagIds),
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
		attributes: ['userId']
	},
	{
		model: Comment,
		as: 'comments',
		attributes: ['blogId']
	}
];
export const commentIncludes = [...blogOneIncludes, ...userIncludes];
export const questionIncludes = [
	...userIncludes,
	...categoryIncludes,
	{
		model: Reply,
		as: 'replies',
		attributes: ['id']
	},
	{
		model: DiscussionLike,
		as: 'likes',
		attributes: ['userId']
	}
];
export const replyIncludes = [
	...userIncludes,
	{
		model: ReplyReact,
		as: 'likes',
		attributes: ['userId']
	},
	{
		model: ReplyDisLike,
		as: 'dislikes',
		attributes: ['userId']
	}
];
export const mediaIncludes = [
	{
		model: Media,
		as: 'children',
		attributes: ['mediaLink']
	}
];
