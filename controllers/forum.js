import { translate } from '../config';
import {
	getLang,
	paginator,
	QueryHelper,
	ROOM_NAME,
	serverResponse
} from '../helpers';
import { questionIncludes, replyIncludes } from '../helpers/modelIncludes';
import {
	Discussion,
	DiscussionLike,
	Reply,
	ReplyReact,
	ReplyDisLike,
	Sequelize
} from '../models';

const discussionDb = new QueryHelper(Discussion);
const replyDb = new QueryHelper(Reply);
const discussionLikeDb = new QueryHelper(DiscussionLike);
const replyLikeDb = new QueryHelper(ReplyReact);
const replyDisLikeDb = new QueryHelper(ReplyDisLike);
const { Op } = Sequelize;
export const createQuestion = async (req, res) => {
	req.body.userId = req.user.id;
	const newQuestion = await discussionDb.create(req.body);

	const lang = getLang(req);
	return serverResponse(res, 201, translate[lang].success, newQuestion);
};
export const getQuestions = async (req, res) => {
	const { languageId } = req.body;
	const { category } = req.query;
	const { offset, limit } = paginator(req.query);
	let whereConditions = { languageId };

	const attributes = ['id', 'content', 'anonymous', 'createdAt'];

	if (category) {
		whereConditions = {
			languageId,
			categoryId: category
		};
	}

	const questions = await discussionDb.findAll(
		whereConditions,
		questionIncludes,
		[['createdAt', 'DESC']],
		attributes,
		offset,
		limit
	);
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, questions);
};
export const getOneQuestion = async (req, res) => {
	const lang = getLang(req);
	const { questionId: id } = req.params;

	const blog = await discussionDb.findOne({ id }, questionIncludes);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, blog);
};
export const getReplies = async (req, res) => {
	const { type = 'question' } = req.query;
	const { questionId } = req.params;
	const conditions =
		type === 'reply'
			? { parentId: { [Op.ne]: null }, parentId: questionId }
			: { discussionId: questionId };
	const replies = await replyDb.findAll(conditions, replyIncludes);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, replies);
};
export const createReply = async (req, res) => {
	const { content, anonymous } = req.body;
	const { id, firstName, lastName, username, profilePic } = req.user;
	req.body.userId = id;
	const newReply = await replyDb.create(req.body);

	const reply = {
		id: newReply.id,
		content,
		anonymous,
		userNames: `${firstName} ${lastName}`,
		createdAt: newReply.createdAt,
		discussionId: newReply.discussionId,
		userId: id,
		parentId: newReply.parentId,
		author: {
			firstName,
			lastName,
			username,
			profilePic
		}
	};
	global.io.to(ROOM_NAME).emit('new-reply', reply);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newReply);
};
export const likeQuestion = async (req, res) => {
	const { questionId: discussionId } = req.params;
	const { id: userId, firstName, lastName } = req.user;
	const discussionParams = { discussionId, userId };
	const hasLiked = await discussionLikeDb.findOne(discussionParams);
	let like = 0;
	if (hasLiked) {
		await discussionLikeDb.delete(discussionParams);
		like = -1;
	} else {
		await discussionLikeDb.create({ ...discussionParams, like: true });
		like = 1;
	}
	const newLike = { discussionId, like, userNames: `${firstName} ${lastName}` };
	global.io.to(ROOM_NAME).emit('new-question-like', newLike);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newLike);
};
export const reactToReply = async (req, res) => {
	const { replyId, type } = req.params;
	const { id: userId, firstName, lastName } = req.user;
	const replyParams = { replyId, userId };
	const hasLiked = await replyLikeDb.findOne(replyParams);
	const hasDisLiked = await replyDisLikeDb.findOne(replyParams);

	let like = 0,
		dislike = 0;
	/**
	 * If has liked a reply; delete like
	 */
	if (type === 'like') {
		if (hasLiked) {
			await replyLikeDb.delete(replyParams);
			like = -1;
		} else if (hasDisLiked) {
			await replyDisLikeDb.delete(replyParams);
			dislike = -1;
			await replyLikeDb.create({ ...replyParams, like: true });
			like = 1;
		} else {
			await replyLikeDb.create({ ...replyParams, like: true });
			like = 1;
		}
	} else if (type === 'dislike') {
		if (hasLiked) {
			await replyLikeDb.delete(replyParams);
			like = -1;
			await replyDisLikeDb.create({ ...replyParams, dislike: true });
			dislike = 1;
		} else if (hasDisLiked) {
			await replyDisLikeDb.delete(replyParams);
			dislike = -1;
		} else {
			await replyDisLikeDb.create({ ...replyParams, dislike: true });
			dislike = 1;
		}
	}

	const newLike = {
		replyId,
		like,
		dislike,
		userNames: `${firstName} ${lastName}`
	};
	global.io.to(ROOM_NAME).emit('new-reply-react', newLike);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newLike);
};
