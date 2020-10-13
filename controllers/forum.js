import { translate } from '../config';
import { getLang, paginator, QueryHelper, serverResponse } from '../helpers';
import { questionIncludes } from '../helpers/modelIncludes';
import { Discussion, DiscussionTag, Reply, Sequelize } from '../models';

const discussionDb = new QueryHelper(Discussion);
const discussionTagDb = new QueryHelper(DiscussionTag);
const replyDb = new QueryHelper(Reply);
const { Op } = Sequelize;
export const createQuestion = async (req, res) => {
	req.body.userId = req.user.id;
	const newQuestion = await discussionDb.create(req.body);
	const discussionTags = req.body.tags.map((tagId) => ({
		tagId,
		discussionId: newQuestion.id
	}));
	await discussionTagDb.bulkCreate(discussionTags);

	const lang = getLang(req);
	return serverResponse(res, 201, translate[lang].success);
};
export const getQuestions = async (req, res) => {
	const { languageId } = req.body;
	const { offset, limit } = paginator(req.query);

	const attributes = ['id', 'content', 'anonymous', 'createdAt'];
	const questions = await discussionDb.findAll(
		{ languageId },
		questionIncludes,
		null,
		attributes,
		offset,
		limit
	);
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, questions);
};
export const getReplies = async (req, res) => {
	const { type = 'question' } = req.query;
	const { questionId } = req.params;
	const conditions =
		type === 'reply'
			? { parentId: { [Op.ne]: null }, parentId: questionId }
			: { discussionId: questionId };
	const replies = await replyDb.findAll(conditions);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, replies);
};
