import { QueryHelper, serverResponse, Validator } from '../helpers';
import { Faq } from '../models';

const faqDb = new QueryHelper(Faq);
export const isFAQValid = (req, res, next) => {
	let validator = new Validator(req.body);
	let validateAction = req.method === 'POST' ? 'create' : 'update';
	const error = validator.validateInput('faq', validateAction);

	if (!error) return next();
	return serverResponse(res, 400, error);
};
export const doesFAQExit = async (req, res, next) => {
	const { questionId: id } = req.params;
	const question = await faqDb.findOne({ id });
	if (question) {
		return next();
	}
	const lang = getLang(req);
	return serverResponse(res, 400, translate[lang].dataNotFound('F-A-Q'));
};
