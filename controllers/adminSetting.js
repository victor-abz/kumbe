import { Faq } from '../models';
import { getLang, QueryHelper, serverResponse } from '../helpers';
import { translate } from '../config';

const faqDb = new QueryHelper(Faq);
export const addFAQuestion = async (req, res) => {
	const newFaq = await faqDb.create(req.body);

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 201, message, newFaq);
};
export const getFAQuestions = async (req, res) => {
	const { languageId } = req.body;

	const questions = await faqDb.findAll({ languageId });
	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message, questions);
};
export const editFAQuestion = async (req, res) => {
	const { questionId: id } = req.params;

	await faqDb.update(req.body, { id });

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};
export const deleteFAQuestion = async (req, res) => {
	const { questionId: id } = req.params;

	await faqDb.delete({ id });

	const lang = getLang(req);
	const message = translate[lang].success;
	return serverResponse(res, 200, message);
};
