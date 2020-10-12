import { validate } from 'uuid';
import { translate } from '../config';
import { getLang, QueryHelper, serverResponse, Validator } from '../helpers';
import { Discution } from '../models';

const discussionDb = new QueryHelper(Discution);
export const doesQuestionExist = async (req, res, next) => {
	const { questionId } = req.params;
	const lang = getLang(req);

	const message = translate[lang].dataNotFound('Discution');
	if (!validate(questionId)) return serverResponse(res, 400, message);

	const discussion = await discussionDb.findOne({ id: questionId });
	if (discussion) return next();
	return serverResponse(res, 404, message);
};
export const isQuestionInfoValid = (req, res, next) => {
	const validateAction = req.method === 'POST' ? 'create' : 'update';
	let validator = new Validator(req.body);

	const error = validator.getQuestionKeys(validateAction);
	if (!error) return next();
	return serverResponse(res, 400, error);
};
