import { validate } from 'uuid';
import { Validator, serverResponse, QueryHelper, getLang } from '../helpers';
import { Category, Blog, Tag, Comment } from '../models';
import { translate } from '../config';

const categoryDb = new QueryHelper(Category);
const blogDb = new QueryHelper(Blog);
const tagDb = new QueryHelper(Tag);
const commentDb = new QueryHelper(Comment);
export const isCategoryValid = (req, res, next) => {
	let validator = new Validator(req.body);
	const error = validator.validateInput('category');

	if (!error) return next();
	return serverResponse(res, 400, error);
};
export const isBlogInfoValid = async (req, res, next) => {
	let validator = new Validator(req.body);
	let validateAction = 'create';
	if (req.method === 'PATCH') {
		validateAction = 'update';
	}
	if (req.method === 'PUT') {
		validateAction = 'publish';
	}
	const error = validator.validateInput('blog', validateAction);

	if (error) return serverResponse(res, 400, error);
	return next();
};
export const areTagsValid = async (req, res, next) => {
	let tags = [];
	await Promise.all(
		req.body.tags.map(async (tag) => {
			const thisTag = await tagDb.findOne({ id: tag });
			if (thisTag) tags.push(tag);
		})
	);
	if (tags.length) {
		req.body.tags = tags;
		return next();
	}
	const lang = getLang(req);
	const message = translate[lang].invalidTag;
	return serverResponse(res, 404, message);
};
export const doesCategoryExist = async (req, res, next) => {
	const categoryIdOrSlug = req.params.categoryId || req.body.categoryId;
	if (categoryIdOrSlug) {
		const attribute = validate(categoryIdOrSlug) ? 'id' : 'slug';
		const category = await categoryDb.findOne({
			[attribute]: categoryIdOrSlug
		});
		if (category) {
			req.params.categoryId = category.id;
			req.body.categoryId = category.id;
			return next();
		}
	}
	if (req.method === 'POST' && !categoryIdOrSlug) return next();
	const lang = getLang(req);
	const message = translate[lang].dataNotFound('Category');
	return serverResponse(res, 404, message);
};
export const doSliderCategoriesExist = async (req, res, next) => {
	const { textContents } = req.body;
	let exists = [];
	if (textContents) {
		await Promise.all(
			textContents.map(async (item) => {
				const category = await categoryDb.findOne({ id: item.categoryId });
				if (category) {
					exists.push(item.categoryId);
				}
			})
		);
		if (exists.length === textContents.length) {
			return next();
		}
	}
	const lang = getLang(req);
	const message = translate[lang].dataNotFound('Category');
	return serverResponse(res, 404, message);
};
export const doesBlogExist = async (req, res, next) => {
	const blogIdOrSlug = req.params.blogId || req.body.blogId;
	if (blogIdOrSlug) {
		const attribute = validate(blogIdOrSlug) ? 'id' : 'slug';
		const blog = await blogDb.findOne({
			[attribute]: blogIdOrSlug
		});
		if (blog) {
			req.params.blogId = blog.id;
			req.body.blogId = blog.id;
			return next();
		}
	}
	if (req.method === 'POST' && !blogIdOrSlug) return next();
	const lang = getLang(req);
	const message = translate[lang].dataNotFound('Blog');
	return serverResponse(res, 404, message);
};
export const isTagValid = async (req, res, next) => {
	let validator = new Validator(req.body);
	const error = validator.validateInput('tag');

	if (!error) return next();
	return serverResponse(res, 400, error);
};
export const isCommentValid = (req, res, next) => {
	let validator = new Validator(req.body);
	const error = validator.validateInput('comment');

	if (!error) return next();
	return serverResponse(res, 400, error);
};
export const doesCommitExist = async (req, res, next) => {
	const { commentId } = req.params;
	if (commentId && validate(commentId)) {
		const comment = await commentDb.findOne({ id: commentId });
		if (comment) return next();
	}
	const lang = getLang(req);
	const message = translate[lang].dataNotFound('Comment');
	return serverResponse(res, 404, message);
};
