import { validate } from 'uuid';
import { translate } from '../config';
import { getLang, QueryHelper, serverResponse, Validator } from '../helpers';
import { Discussion, Reply } from '../models';

const discussionDb = new QueryHelper(Discussion);
const replyDb = new QueryHelper(Reply);
export const doesQuestionExist = async (req, res, next) => {
	const { questionId } = req.params;
	const { type = 'question' } = req.query;
	let discussion = null;
	const lang = getLang(req);

	const message = translate[lang].dataNotFound('Discution');
	if (!validate(questionId)) return serverResponse(res, 400, message);

	if (type === 'reply') {
		discussion = await replyDb.findOne({ id: questionId });
	} else {
		discussion = await discussionDb.findOne({ id: questionId });
	}
	if (discussion) return next();
	return serverResponse(res, 404, message);
};
export const isQuestionInfoValid = (req, res, next) => {
	const validateAction = req.method === 'POST' ? 'create' : 'update';
	let validator = new Validator(req.body);

	const error = validator.validateInput('question', validateAction);
	if (!error) return next();
	return serverResponse(res, 400, error);
};
export const isReplyInfoValid = (req, res, next) => {
	const validateAction = req.method === 'POST' ? 'create' : 'update';
	let validator = new Validator(req.body);

	const error = validator.validateInput('reply', validateAction);
	if (error) return serverResponse(res, 400, error);
	let { type } = req.body;
	const { questionId } = req.params;
	req.body.parentId = type === 'reply' ? questionId : null;
	req.body.discussionId = type === 'question' ? questionId : null;
	if (req.body.parentId || req.body.discussionId) {
		return next();
	}
	const lang = getLang(req);

	const message = translate[lang].invalidReply;
	return serverResponse(res, 400, message);
};
